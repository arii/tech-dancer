import * as fs from 'fs';
import * as path from 'path';
import { ARTIFACTS_DIR, VISUAL_SUMMARY_PATH, MAX_ROUTES_TO_REVIEW } from './visualReviewConstants';
import { generateMarkdownReport, postPRComment, countExistingReviews } from './visualReviewUtils';
import type { RouteReview, VisualRouteSummary, VisualSummary } from './visualReviewTypes';

export interface LLMClientStrategy {
  botName: string;
  reportTitle: string;
  botTagline: string;
  reportFileName: string;
  invokeReview: (summary: VisualRouteSummary) => Promise<RouteReview>;
}

const MAX_REVIEWS_PER_PR = parseInt(process.env.MAX_AI_REVIEWS ?? '1', 10);

export async function orchestrateVisualReview(
  client: LLMClientStrategy,
  allReportTitles: string[] = []
): Promise<void> {
  const agentReportPath = path.join(ARTIFACTS_DIR, client.reportFileName);

  const existing = await countExistingReviews(allReportTitles);
  if (existing >= MAX_REVIEWS_PER_PR) {
    console.log(`⏭️  Skipping ${client.botName} — ${existing}/${MAX_REVIEWS_PER_PR} reviews already posted.`);
    fs.writeFileSync(
      agentReportPath,
      `## ${client.reportTitle}\n\nSkipped: review quota (${MAX_REVIEWS_PER_PR}) already met.\n`
    );
    return;
  }

  if (!fs.existsSync(VISUAL_SUMMARY_PATH)) {
    console.warn('⚠️  Skipping agent review — missing visual summary. Run pnpm impact:visual-diff first.');
    fs.writeFileSync(agentReportPath, `## ${client.reportTitle}\n\nSkipped: Missing visual summary.\n`);
    return;
  }

  const summary: VisualSummary = JSON.parse(fs.readFileSync(VISUAL_SUMMARY_PATH, 'utf8'));

  // Only review routes with actual visual changes
  // Limit to top N routes by difference percentage to manage costs
  let routesToReview = summary.routes
    .filter(r => r.differencePercent > 1.5)
    .sort((a, b) => b.differencePercent - a.differencePercent);

  const totalRoutes = routesToReview.length;
  if (routesToReview.length > MAX_ROUTES_TO_REVIEW) {
    console.log(`⚠️  Too many routes changed (${totalRoutes}). Limiting review to the top ${MAX_ROUTES_TO_REVIEW}.`);
    routesToReview = routesToReview.slice(0, MAX_ROUTES_TO_REVIEW);
  }

  if (routesToReview.length === 0) {
    console.log(`✅ No visual changes detected — skipping agent review.`);
    fs.writeFileSync(agentReportPath, `## ${client.reportTitle}\n\nNo visual changes detected.\n`);
    return;
  }

  console.log(`🤖 Reviewing ${routesToReview.length} route(s) with ${client.botName}...`);

  const reviews: RouteReview[] = [];

  for (const route of routesToReview) {
    console.log(`  → ${route.route} (${route.severity}, ${route.differencePercent.toFixed(2)}%)`);

    let retryCount = 0;
    const maxRetries = 3;
    let review: RouteReview | null = null;

    while (retryCount <= maxRetries) {
      try {
        review = await client.invokeReview(route);
        break;
      } catch (error) {
        retryCount++;
        if (retryCount > maxRetries) {
          console.error(`❌ Failed to review ${route.route} after ${maxRetries} retries:`, error);
          throw error;
        }
        const delay = Math.pow(2, retryCount) * 1000;
        console.warn(`⚠️ Review failed for ${route.route}, retrying in ${delay}ms... (Attempt ${retryCount}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    if (review) {
      console.log(`    Feedback: ${review.feedback}`);
      reviews.push(review);
    }
  }

  const report = generateMarkdownReport(reviews, client.botName, client.reportTitle, client.botTagline);

  // Write local report
  fs.writeFileSync(agentReportPath, report);
  console.log(`✅ Local report written to ${agentReportPath}`);

  // Post to GitHub PR
  await postPRComment(report, client.reportTitle);

  // Write a structured result file alongside the markdown
  const hasBlockingIssues = reviews.some(r =>
    r.llmVerdict === 'fail' || (r.severity === 'HIGH' && r.llmVerdict !== 'pass')
  );

  const verdictPath = path.join(ARTIFACTS_DIR, `${client.reportFileName.replace('.md', '')}-verdict.json`);
  fs.writeFileSync(verdictPath, JSON.stringify({
    passed: !hasBlockingIssues,
    highCount: reviews.filter(r => r.severity === 'HIGH').length,
    routes: reviews.map(r => ({ route: r.route, severity: r.severity, llmVerdict: r.llmVerdict }))
  }, null, 2));

  if (hasBlockingIssues) {
    console.error(`❌ Visual review found HIGH severity issues — failing CI.`);
    process.exit(1);
  }
}

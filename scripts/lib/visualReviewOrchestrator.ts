import * as fs from 'fs';
import * as path from 'path';
import { ARTIFACTS_DIR, VISUAL_SUMMARY_PATH, MAX_ROUTES_TO_REVIEW } from './visualReviewConstants';
import { generateMarkdownReport, postPRComment, countExistingReviews, getJulesSessionIdFromPR, sendJulesMessage } from './visualReviewUtils';
import type { RouteReview, VisualRouteSummary, VisualSummary } from './visualReviewTypes';

export interface LLMClientStrategy {
  botName: string;
  reportTitle: string;
  botTagline: string;
  reportFileName: string;
  invokeReview: (summary: VisualRouteSummary) => Promise<RouteReview>;
}

const MAX_REVIEWS_PER_PR = parseInt(process.env.MAX_AI_REVIEWS ?? '10', 10);

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
    fs.writeFileSync(path.join(ARTIFACTS_DIR, `${client.reportFileName.replace('.md', '')}-verdict.json`), JSON.stringify({ passed: true, highCount: 0, routes: [], llmVerdict: 'pass' }, null, 2));
    return;
  }

  if (!fs.existsSync(VISUAL_SUMMARY_PATH)) {
    console.warn('⚠️  Skipping agent review — missing visual summary. Run pnpm impact:visual-diff first.');
    fs.writeFileSync(agentReportPath, `## ${client.reportTitle}\n\nSkipped: Missing visual summary.\n`);
    fs.writeFileSync(path.join(ARTIFACTS_DIR, `${client.reportFileName.replace('.md', '')}-verdict.json`), JSON.stringify({ passed: true, highCount: 0, routes: [], llmVerdict: 'pass' }, null, 2));
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
    fs.writeFileSync(path.join(ARTIFACTS_DIR, `${client.reportFileName.replace('.md', '')}-verdict.json`), JSON.stringify({ passed: true, highCount: 0, routes: [], llmVerdict: 'pass' }, null, 2));
    return;
  }

  console.log(`🤖 Reviewing ${routesToReview.length} route(s) with ${client.botName}...`);

  const reviews: RouteReview[] = [];

  for (const route of routesToReview) {
    console.log(`  → ${route.route} (${route.severity}, ${route.differencePercent.toFixed(2)}%)`);
    const review = await client.invokeReview(route);
    console.log(`    Feedback: ${review.feedback}`);
    reviews.push(review);
  }

  const report = generateMarkdownReport(reviews, client.botName, client.reportTitle, client.botTagline);

  // Write local report
  fs.writeFileSync(agentReportPath, report);
  console.log(`✅ Local report written to ${agentReportPath}`);

  // Post to GitHub PR
  await postPRComment(report, client.reportTitle);

  // Also alert Jules if this PR is from a Jules session
  const julesSessionId = await getJulesSessionIdFromPR();
  if (julesSessionId) {
    const hasBlockingIssues = reviews.some(r =>
      r.llmVerdict === 'fail' || (r.severity === 'HIGH' && r.llmVerdict !== 'pass')
    );
    const passFailMsg = hasBlockingIssues ? "FAIL ❌" : "PASS ✅";
    const highCount = reviews.filter(r => r.severity === 'HIGH').length;
    const medCount = reviews.filter(r => r.severity === 'MEDIUM').length;
    const lowCount = reviews.filter(r => r.severity === 'LOW').length;
    const julesMessage = `[${client.reportTitle}] posted a visual UI review (${passFailMsg}). Summary: 🔴 ${highCount} high · 🟡 ${medCount} medium · 🟢 ${lowCount} low. Please read the review comments on the PR, analyze the diff context provided, and fix any failed or warned areas.`;
    await sendJulesMessage(julesSessionId, julesMessage);
  }

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

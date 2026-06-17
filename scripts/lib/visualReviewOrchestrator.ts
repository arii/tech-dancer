import * as fs from 'fs';
import * as path from 'path';
import { ARTIFACTS_DIR, VISUAL_SUMMARY_PATH } from './visualReviewConstants';
import { generateMarkdownReport, postPRComment } from './visualReviewUtils';
import type { RouteReview, VisualRouteSummary, VisualSummary } from './visualReviewTypes';

export interface LLMClientStrategy {
  botName: string;
  reportTitle: string;
  botTagline: string;
  reportFileName: string;
  invokeReview: (summary: VisualRouteSummary) => Promise<RouteReview>;
}

export async function orchestrateVisualReview(client: LLMClientStrategy): Promise<void> {
  const agentReportPath = path.join(ARTIFACTS_DIR, client.reportFileName);

  if (!fs.existsSync(VISUAL_SUMMARY_PATH)) {
    console.warn('⚠️  Skipping agent review — missing visual summary. Run pnpm impact:visual-diff first.');
    fs.writeFileSync(agentReportPath, `## ${client.reportTitle}\n\nSkipped: Missing visual summary.\n`);
    return;
  }

  const summary: VisualSummary = JSON.parse(fs.readFileSync(VISUAL_SUMMARY_PATH, 'utf8'));

  // Only review routes with actual visual changes
  // Limit to top 5 routes by difference percentage to manage costs
  const MAX_ROUTES = 5;
  let routesToReview = summary.routes
    .filter(r => r.differencePercent > 0)
    .sort((a, b) => b.differencePercent - a.differencePercent);

  const totalRoutes = routesToReview.length;
  if (routesToReview.length > MAX_ROUTES) {
    console.log(`⚠️  Too many routes changed (${totalRoutes}). Limiting review to the top ${MAX_ROUTES}.`);
    routesToReview = routesToReview.slice(0, MAX_ROUTES);
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
}

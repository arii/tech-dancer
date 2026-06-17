import { diffLines } from 'diff';
import fs from 'fs';
import path from 'path';
import {
  ARTIFACTS_DIR,
  DOM_REVIEW_DIR,
  DOM_SUMMARY_PATH,
  VISUAL_SUMMARY_PATH,
  domSeverity,
  ensureDirectory,
  readImpactAnalysis,
  routeToSlug,
  type VisualRouteSummary,
  type DomRouteSummary,
  DomRouteSummarySchema
} from './impact-review-utils';
import { normalizeHtmlForDiffing } from './impact/parser-sanitizer';
import { summarizeDomCompact } from './impact/metric-calculator';
import { generateDeploymentReport } from './impact/report-generator';

const deploymentReviewPath = path.join(ARTIFACTS_DIR, 'deployment-review.md');

function writeTextDiff(beforeHtml: string, afterHtml: string, outputPath: string): void {
  const parts = diffLines(beforeHtml, afterHtml);
  const lines = parts.flatMap(part => {
    const prefix = part.added ? '+' : part.removed ? '-' : ' ';
    return part.value
      .split('\n')
      .filter(Boolean)
      .map(line => `${prefix} ${line}`);
  });

  fs.writeFileSync(outputPath, lines.join('\n'));
}

function readVisualSummaries(): VisualRouteSummary[] {
  if (!fs.existsSync(VISUAL_SUMMARY_PATH)) return [];
  const parsed = JSON.parse(fs.readFileSync(VISUAL_SUMMARY_PATH, 'utf8')) as { routes?: VisualRouteSummary[] };
  return parsed.routes ?? [];
}

function main(): void {
  const impact = readImpactAnalysis();
  const routes = impact.routes.filter(route => !route.includes(':'));
  const summaries: DomRouteSummary[] = [];

  ensureDirectory(DOM_REVIEW_DIR);

  for (const route of routes) {
    const slug = routeToSlug(route);
    const routeDomDir = path.join(DOM_REVIEW_DIR, slug);
    const beforeHtmlPath = path.join(routeDomDir, 'before.html');
    const afterHtmlPath = path.join(routeDomDir, 'after.html');
    const diffPath = path.join(routeDomDir, 'diff.txt');
    const jsonPath = path.join(DOM_REVIEW_DIR, `${slug}.json`);

    if (!fs.existsSync(beforeHtmlPath) || !fs.existsSync(afterHtmlPath)) {
      throw new Error(`Missing DOM captures for ${route}. Run \`pnpm impact:visual-diff\` first.`);
    }

    const beforeHtml = normalizeHtmlForDiffing(fs.readFileSync(beforeHtmlPath, 'utf8'));
    const afterHtml = normalizeHtmlForDiffing(fs.readFileSync(afterHtmlPath, 'utf8'));
    const metrics = summarizeDomCompact(beforeHtml, afterHtml);
    writeTextDiff(beforeHtml, afterHtml, diffPath);

    const summaryObj = {
      route,
      slug,
      beforeHtmlPath: path.relative(process.cwd(), beforeHtmlPath),
      afterHtmlPath: path.relative(process.cwd(), afterHtmlPath),
      diffPath: path.relative(process.cwd(), diffPath),
      metrics,
      severity: domSeverity(metrics.nodesAdded + metrics.nodesRemoved)
    };

    const summary = DomRouteSummarySchema.parse(summaryObj);

    fs.writeFileSync(jsonPath, JSON.stringify(summary, null, 2));
    summaries.push(summary);
  }

  fs.writeFileSync(DOM_SUMMARY_PATH, JSON.stringify({ routes: summaries }, null, 2));
  generateDeploymentReport(summaries, readVisualSummaries());
  console.log(`✅ DOM diffs generated in ${DOM_REVIEW_DIR}`);
  console.log(`✅ Deployment review report generated at ${deploymentReviewPath}`);
}

try {
  main();
} catch (error) {
  console.error(`❌ DOM diff failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}

import { diffLines } from 'diff';
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import {
  ARTIFACTS_DIR,
  DOM_REVIEW_DIR,
  DOM_SUMMARY_PATH,
  VISUAL_SUMMARY_PATH,
  combinedSeverity,
  domSeverity,
  ensureDirectory,
  readImpactAnalysis,
  routeToSlug,
  type DomRouteSummary,
  type VisualRouteSummary
} from './impact-review-utils';

const deploymentReviewPath = path.join(ARTIFACTS_DIR, 'deployment-review.md');

function normalizeHtml(html: string): string {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  document.querySelectorAll('script, style, noscript').forEach(element => element.remove());
  document.querySelectorAll('*').forEach(element => {
    for (const attribute of Array.from(element.attributes) as Attr[]) {
      if (
        attribute.name === 'data-reactroot' ||
        attribute.name === 'data-testid' ||
        attribute.name === 'nonce' ||
        attribute.name.startsWith('data-vite') ||
        attribute.name.startsWith('data-radix') ||
        attribute.name.startsWith('aria-busy') ||
        /timestamp|hydration|^data-.*id$|^id$/.test(attribute.name)
      ) {
        element.removeAttribute(attribute.name);
      }
    }
  });

  return dom.serialize().replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
}

function countElements(html: string, selector = '*'): number {
  const dom = new JSDOM(html);
  return dom.window.document.querySelectorAll(selector).length;
}

function summarizeDom(beforeHtml: string, afterHtml: string): DomRouteSummary['metrics'] {
  const beforeNodes = countElements(beforeHtml);
  const afterNodes = countElements(afterHtml);
  const beforeImages = countElements(beforeHtml, 'img');
  const afterImages = countElements(afterHtml, 'img');
  const beforeLinks = countElements(beforeHtml, 'a');
  const afterLinks = countElements(afterHtml, 'a');

  return {
    nodesAdded: Math.max(0, afterNodes - beforeNodes),
    nodesRemoved: Math.max(0, beforeNodes - afterNodes),
    imagesAdded: Math.max(0, afterImages - beforeImages),
    imagesRemoved: Math.max(0, beforeImages - afterImages),
    linksAdded: Math.max(0, afterLinks - beforeLinks),
    linksRemoved: Math.max(0, beforeLinks - afterLinks)
  };
}

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

function formatDomMetrics(metrics: DomRouteSummary['metrics']): string[] {
  const rows = [
    ['Added nodes', metrics.nodesAdded],
    ['Removed nodes', metrics.nodesRemoved],
    ['Added images', metrics.imagesAdded],
    ['Removed images', metrics.imagesRemoved],
    ['Added links', metrics.linksAdded],
    ['Removed links', metrics.linksRemoved]
  ] as const;

  const changed = rows.filter(([, value]) => value > 0);
  return changed.length > 0 ? changed.map(([label, value]) => `- ${label}: ${value}`) : ['None'];
}

function generateDeploymentReport(domSummaries: DomRouteSummary[], visualSummaries: VisualRouteSummary[]): void {
  const impact = readImpactAnalysis();
  const visualByRoute = new Map(visualSummaries.map(summary => [summary.route, summary]));
  const changedFiles = impact.changedFiles ?? [];

  const routeSections = domSummaries.map(domSummary => {
    const visual = visualByRoute.get(domSummary.route);
    const severity = combinedSeverity(visual?.severity, domSummary.severity);
    const reviewRequired = severity !== 'LOW';

    return `### ${domSummary.route}

Visual Difference: ${(visual?.differencePercent ?? 0).toFixed(2)}%

DOM Changes:
${formatDomMetrics(domSummary.metrics).join('\n')}

Severity: ${severity}

Review Required: ${reviewRequired ? 'Yes' : 'No'}

Artifacts:
- Before screenshot: ${visual?.beforePath ?? 'Not captured'}
- After screenshot: ${visual?.afterPath ?? 'Not captured'}
- Visual diff: ${visual?.diffPath ?? 'Not captured'}
- DOM diff: ${domSummary.diffPath}
`;
  });

  const report = `# Deployment Review

## Summary

Impact Level: ${impact.impactLevel ?? 'LOW'}

Changed Files:
${changedFiles.length > 0 ? changedFiles.map(file => `- ${file}`).join('\n') : '- None detected'}

## Routes Reviewed

${routeSections.length > 0 ? routeSections.join('\n---\n\n') : '_No concrete routes required review._'}
`;

  fs.writeFileSync(deploymentReviewPath, report);
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

    const beforeHtml = normalizeHtml(fs.readFileSync(beforeHtmlPath, 'utf8'));
    const afterHtml = normalizeHtml(fs.readFileSync(afterHtmlPath, 'utf8'));
    const metrics = summarizeDom(beforeHtml, afterHtml);
    writeTextDiff(beforeHtml, afterHtml, diffPath);

    const summary: DomRouteSummary = {
      route,
      slug,
      beforeHtmlPath: path.relative(process.cwd(), beforeHtmlPath),
      afterHtmlPath: path.relative(process.cwd(), afterHtmlPath),
      diffPath: path.relative(process.cwd(), diffPath),
      metrics,
      severity: domSeverity(metrics.nodesAdded + metrics.nodesRemoved)
    };

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

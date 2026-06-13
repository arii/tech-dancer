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
  type VisualRouteSummary,
  DomRouteSummarySchema
} from './impact-review-utils';

const deploymentReviewPath = path.join(ARTIFACTS_DIR, 'deployment-review.md');

function normalizeHtml(html: string): string {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const technicalSelectors = ['script', 'style', 'link', 'meta', 'noscript', 'template'];
  technicalSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.remove());
  });

  const allElements = document.querySelectorAll('*');
  allElements.forEach(el => {
    ['data-reactroot', 'data-testid', 'nonce', 'data-discover'].forEach(attr => {
      el.removeAttribute(attr);
    });

    const cleanedAttrs: { name: string; value: string }[] = [];
    Array.from(el.attributes).forEach(attr => {
      if (attr.name.startsWith('data-v-')) {
        el.removeAttribute(attr.name);
        return;
      }

      let val = attr.value;
      if (attr.name === 'src' || attr.name === 'href' || attr.name === 'srcset') {
        val = val.replace(/-[a-zA-Z0-9]{8,12}\.(js|css|jpg|jpeg|png|svg|webp|avif)/g, '.$1');
      }
      cleanedAttrs.push({ name: attr.name, value: val });
      el.removeAttribute(attr.name);
    });

    cleanedAttrs.sort((a, b) => a.name.localeCompare(b.name));
    cleanedAttrs.forEach(attr => {
      el.setAttribute(attr.name, attr.value);
    });
  });

  const rawHtml = document.body ? document.body.innerHTML : dom.serialize();
  
  return rawHtml
    .replace(/\s+/g, ' ')       // Collapse duplicate spaces/newlines into single spaces
    .replace(/>\s*</g, '>\n<')   // Insert a clean newline between every tag boundary
    .trim();
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
    nodes: [Math.max(0, afterNodes - beforeNodes), Math.max(0, beforeNodes - afterNodes)],
    images: [Math.max(0, afterImages - beforeImages), Math.max(0, beforeImages - afterImages)],
    links: [Math.max(0, afterLinks - beforeLinks), Math.max(0, beforeLinks - afterLinks)]
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
    ['Added nodes', metrics.nodes[0]],
    ['Removed nodes', metrics.nodes[1]],
    ['Added images', metrics.images[0]],
    ['Removed images', metrics.images[1]],
    ['Added links', metrics.links[0]],
    ['Removed links', metrics.links[1]]
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

    const slug = routeToSlug(domSummary.route);
    const visualDir = `artifacts/visual-review/${slug}`;
    const domDir = `artifacts/dom-review/${slug}`;

    return `### ${domSummary.route}

Visual Difference: ${(visual?.metrics?.differencePercent ?? 0).toFixed(2)}%

DOM Changes:
${formatDomMetrics(domSummary.metrics).join('\n')}

Severity: ${severity}

Review Required: ${reviewRequired ? 'Yes' : 'No'}

Artifacts:
- Before screenshot: ${visual ? `${visualDir}/before.png` : 'Not captured'}
- After screenshot: ${visual ? `${visualDir}/after.png` : 'Not captured'}
- Visual diff: ${visual ? `${visualDir}/diff.png` : 'Not captured'}
- DOM diff: ${domDir}/diff.txt
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

    const summaryObj = {
      route,
      metrics,
      severity: domSeverity(metrics.nodes[0] + metrics.nodes[1])
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

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
      if (attr.name === 'src' || attr.name === 'href') {
        val = val.replace(/-[a-zA-Z0-9]{8,12}\.(js|css)/g, '.$1');
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

    const toRelative = (p: string | undefined) => p ? p.replace(/^artifacts\//, './') : undefined;
    const beforeRel = toRelative(visual?.beforePath);
    const afterRel = toRelative(visual?.afterPath);
    const diffRel = toRelative(visual?.diffPath);
    const domDiffRel = toRelative(domSummary.diffPath);

    return `### ${domSummary.route}

Visual Difference: ${(visual?.differencePercent ?? 0).toFixed(2)}%

DOM Changes:
${formatDomMetrics(domSummary.metrics).join('\n')}

Severity: ${severity}

Review Required: ${reviewRequired ? 'Yes' : 'No'}

Artifacts:
- Before screenshot: ${beforeRel ? `[${visual?.beforePath}](${beforeRel})` : 'Not captured'}
- After screenshot: ${afterRel ? `[${visual?.afterPath}](${afterRel})` : 'Not captured'}
- Visual diff: ${diffRel ? `[${visual?.diffPath}](${diffRel})` : 'Not captured'}
- DOM diff: ${domDiffRel ? `[${domSummary.diffPath}](${domDiffRel})` : 'Not captured'}

${diffRel ? `#### Visual Diff\n![Visual Diff](${diffRel})` : ''}
${beforeRel ? `#### Before\n![Before](${beforeRel})` : ''}
${afterRel ? `#### After\n![After](${afterRel})` : ''}
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

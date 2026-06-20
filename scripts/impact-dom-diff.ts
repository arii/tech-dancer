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
  const visualBySlug = new Map(visualSummaries.map(summary => [summary.slug, summary]));
  const changedFiles = impact.changedFiles ?? [];

  const routeSections = domSummaries.map(domSummary => {
    const visual = visualBySlug.get(domSummary.slug);
    const severity = combinedSeverity(visual?.severity, domSummary.severity);
    const reviewRequired = severity !== 'LOW';

    const visualArtifacts = [
      `- Before screenshot: ${visual?.beforePath ?? 'Not captured'}`,
      `- After screenshot: ${visual?.afterPath ?? 'Not captured'}`,
      `- Visual diff: ${visual?.diffPath ?? 'Not captured'}`
    ];

    if (visual?.beforeCroppedPath) visualArtifacts.push(`- Before (cropped): ${visual.beforeCroppedPath}`);
    if (visual?.afterCroppedPath) visualArtifacts.push(`- After (cropped): ${visual.afterCroppedPath}`);
    if (visual?.diffCroppedPath) visualArtifacts.push(`- Visual diff (cropped): ${visual.diffCroppedPath}`);

    visualArtifacts.push(`- DOM diff: ${domSummary.diffPath}`);

    return `<details>
<summary><b>${domSummary.route}</b> (Visual Diff: ${(visual?.differencePercent ?? 0).toFixed(2)}%)</summary>

<br/>

**Severity:** ${severity}
**Review Required:** ${reviewRequired ? 'Yes' : 'No'}

**DOM Changes:**
${formatDomMetrics(domSummary.metrics).join('\n')}

**Artifacts:**
${visualArtifacts.join('\n')}
</details>`;
  });

  const report = `# Deployment Review

## Summary

Impact Level: ${impact.impactLevel ?? 'LOW'}

<details>
<summary><b>📝 Changed Files (${changedFiles.length})</b></summary>

${changedFiles.length > 0 ? changedFiles.map(file => `- ${file}`).join('\n') : '- None detected'}
</details>

## Routes Reviewed

${routeSections.length > 0 ? routeSections.join('\n\n') : '_No concrete routes required review._'}
`;

  fs.writeFileSync(deploymentReviewPath, report);
}

function main(): void {
  const visualSummaries = readVisualSummaries();
  const domSummaries: DomRouteSummary[] = [];

  ensureDirectory(DOM_REVIEW_DIR);

  for (const visual of visualSummaries) {
    const { route, slug } = visual;
    const routeDomDir = path.join(DOM_REVIEW_DIR, slug);
    ensureDirectory(routeDomDir);

    const beforeHtmlPath = path.join(routeDomDir, 'before.html');
    const afterHtmlPath = path.join(routeDomDir, 'after.html');
    const diffPath = path.join(routeDomDir, 'diff.txt');
    const jsonPath = path.join(DOM_REVIEW_DIR, `${slug}.json`);

    if (!fs.existsSync(beforeHtmlPath) || !fs.existsSync(afterHtmlPath)) {
      console.warn(`[DOM Diff] Missing DOM captures for ${slug} (${route}). Skipping.`);
      continue;
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
    domSummaries.push(summary);
  }

  fs.writeFileSync(DOM_SUMMARY_PATH, JSON.stringify({ routes: domSummaries }, null, 2));
  generateDeploymentReport(domSummaries, visualSummaries);
  console.log(`✅ DOM diffs generated in ${DOM_REVIEW_DIR}`);
  console.log(`✅ Deployment review report generated at ${deploymentReviewPath}`);
}

try {
  main();
} catch (error) {
  console.error(`❌ DOM diff failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}

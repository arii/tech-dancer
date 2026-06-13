import { chromium } from '@playwright/test';
import { diffLines } from 'diff';
import fs from 'fs';
import { JSDOM } from 'jsdom';
import path from 'path';
import { exec } from 'child_process';

const WAIT_FOR_SERVER = 10000;

interface ImpactReport {
  changedFiles: string[];
  affectedPages: string[];
  visualReviewRequired: string[];
  impactLevel: string;
  routes: string[];
}

interface VisualMeta {
  diffPercentage: number;
  diffPixels: number;
  route: string;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startServer(cwd: string, port: number): Promise<import('child_process').ChildProcess> {
  const { spawn } = await import('child_process');

  const server = spawn('npx', ['vite', 'preview', '--port', port.toString()], {
    cwd,
    stdio: 'ignore',
    detached: true,
    env: { ...process.env, CI: 'true' }
  });

  server.unref();
  await sleep(WAIT_FOR_SERVER);
  return server;
}

function normalizeHtml(html: string): string {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Remove noise
  const selectorsToRemove = [
    'script',
    'style',
    'link',
    'meta',
    'noscript'
  ];

  selectorsToRemove.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.remove());
  });

  // Remove noisy attributes
  const walk = document.createTreeWalker(document.body, dom.window.NodeFilter.SHOW_ELEMENT, null);
  let node;
  while ((node = walk.nextNode() as Element)) {
    ['data-reactroot', 'data-testid', 'nonce'].forEach(attr => node.removeAttribute(attr));

    // Remove hydration-related attributes if any (e.g. starting with data-v-)
    Array.from(node.attributes).forEach(attr => {
      if (attr.name.startsWith('data-v-')) {
        node.removeAttribute(attr.name);
      }
    });
  }

  // Serialize and normalize whitespace
  let serialized = document.body.innerHTML;
  serialized = serialized.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();

  // Pretty print for better line diffing
  // A simple hacky pretty print:
  serialized = serialized.replace(/></g, '>\n<');

  return serialized;
}

async function captureHtml(baseUrl: string, route: string): Promise<string> {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const url = `${baseUrl}${route}`;
  try {
      await page.goto(url, { waitUntil: 'networkidle' });
  } catch {
      await page.goto(url);
  }

  const html = await page.content();
  await browser.close();

  return normalizeHtml(html);
}

function determineSeverity(visualDiff: number, domNodesAdded: number, domNodesRemoved: number): 'HIGH' | 'MEDIUM' | 'LOW' {
  const maxNodesChanged = Math.max(domNodesAdded, domNodesRemoved);

  let visualSeverity: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
  if (visualDiff > 5) visualSeverity = 'HIGH';
  else if (visualDiff > 1) visualSeverity = 'MEDIUM';

  let domSeverity: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
  if (maxNodesChanged >= 20) domSeverity = 'HIGH';
  else if (maxNodesChanged >= 5) domSeverity = 'MEDIUM';

  if (visualSeverity === 'HIGH' || domSeverity === 'HIGH') return 'HIGH';
  if (visualSeverity === 'MEDIUM' || domSeverity === 'MEDIUM') return 'MEDIUM';
  return 'LOW';
}

async function main() {
  const artifactsDir = path.join(process.cwd(), 'artifacts');
  const impactAnalysisPath = path.join(artifactsDir, 'impact-analysis.json');

  if (!fs.existsSync(impactAnalysisPath)) {
    console.error(`❌ Impact analysis not found at ${impactAnalysisPath}`);
    process.exit(1);
  }

  const report: ImpactReport = JSON.parse(fs.readFileSync(impactAnalysisPath, 'utf8'));
  const routes = report.routes || [];

  if (routes.length === 0) {
    console.log('✅ No routes require DOM review.');
    return;
  }

  console.log(`🚀 Starting DOM diff for ${routes.length} routes...`);

  console.log('🌐 Starting main branch preview server on port 4173...');
  const mainServer = await startServer(path.join(process.cwd(), '.tmp-main'), 4173);

  console.log('🌐 Starting PR branch preview server on port 4174...');
  const prServer = await startServer(process.cwd(), 4174);

  const domReviewDir = path.join(artifactsDir, 'dom-review');
  if (!fs.existsSync(domReviewDir)) {
    fs.mkdirSync(domReviewDir, { recursive: true });
  }

  const visualReviewDir = path.join(artifactsDir, 'visual-review');
  const finalReports: Record<string, unknown>[] = [];

  for (const route of routes) {
    console.log(`🔍 Diffing DOM for ${route} ...`);
    const beforeHtml = await captureHtml('http://localhost:4173', route);
    const afterHtml = await captureHtml('http://localhost:4174', route);

    const diff = diffLines(beforeHtml, afterHtml);

    let nodesAdded = 0;
    let nodesRemoved = 0;
    let imagesAdded = 0;
    let imagesRemoved = 0;
    let linksAdded = 0;
    let linksRemoved = 0;

    diff.forEach(part => {
      const isAdded = part.added;
      const isRemoved = part.removed;

      if (!isAdded && !isRemoved) return;

      const lines = part.value.split('\n').filter(Boolean);

      lines.forEach(line => {
        if (isAdded) {
          nodesAdded++;
          if (line.includes('<img')) imagesAdded++;
          if (line.includes('<a')) linksAdded++;
        }
        if (isRemoved) {
          nodesRemoved++;
          if (line.includes('<img')) imagesRemoved++;
          if (line.includes('<a')) linksRemoved++;
        }
      });
    });

    const slug = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-');
    const visualMetaPath = path.join(visualReviewDir, slug, 'meta.json');
    let visualDiffPercentage = 0;

    if (fs.existsSync(visualMetaPath)) {
      const visualMeta: VisualMeta = JSON.parse(fs.readFileSync(visualMetaPath, 'utf8'));
      visualDiffPercentage = visualMeta.diffPercentage;
    }

    const severity = determineSeverity(visualDiffPercentage, nodesAdded, nodesRemoved);

    const routeReport = {
      route,
      visualDifference: parseFloat(visualDiffPercentage.toFixed(2)),
      nodesAdded,
      nodesRemoved,
      imagesAdded,
      imagesRemoved,
      linksAdded,
      linksRemoved,
      severity
    };

    fs.writeFileSync(path.join(domReviewDir, `${slug}.json`), JSON.stringify(routeReport, null, 2));
    finalReports.push(routeReport);
  }

  console.log('🛑 Shutting down preview servers...');
  mainServer.kill();
  prServer.kill();

  try {
      exec('kill $(lsof -t -i :4173) 2>/dev/null || true');
      exec('kill $(lsof -t -i :4174) 2>/dev/null || true');
  } catch {
      // ignore errors during cleanup
  }

  // Generate markdown report
  let md = `# Deployment Review\n\n## Summary\n\nChanged Files\n\n`;
  report.changedFiles.forEach(f => {
    md += `- ${f}\n`;
  });

  md += `\n## Routes Reviewed\n\n`;

  finalReports.forEach(reportItem => {
    const r = reportItem as {
      route: string;
      visualDifference: number;
      nodesAdded: number;
      nodesRemoved: number;
      imagesAdded: number;
      imagesRemoved: number;
      linksAdded: number;
      linksRemoved: number;
      severity: string;
    };
    md += `### ${r.route}\n\n`;
    md += `Visual Difference: ${r.visualDifference.toFixed(2)}%\n\n`;
    md += `DOM Changes:\n`;

    if (r.nodesAdded === 0 && r.nodesRemoved === 0) {
      md += `None\n\n`;
    } else {
      if (r.nodesAdded > 0) md += `- Added ${r.nodesAdded} nodes\n`;
      if (r.nodesRemoved > 0) md += `- Removed ${r.nodesRemoved} nodes\n`;
      if (r.imagesAdded > 0) md += `- Added ${r.imagesAdded} image${r.imagesAdded > 1 ? 's' : ''}\n`;
      if (r.imagesRemoved > 0) md += `- Removed ${r.imagesRemoved} image${r.imagesRemoved > 1 ? 's' : ''}\n`;
      if (r.linksAdded > 0) md += `- Added ${r.linksAdded} link${r.linksAdded > 1 ? 's' : ''}\n`;
      if (r.linksRemoved > 0) md += `- Removed ${r.linksRemoved} link${r.linksRemoved > 1 ? 's' : ''}\n`;
      md += `\n`;
    }

    md += `Review Required:\n`;
    md += r.severity === 'HIGH' || r.severity === 'MEDIUM' ? `Yes\n\n` : `No\n\n`;
    md += `---\n\n`;
  });

  fs.writeFileSync(path.join(artifactsDir, 'deployment-review.md'), md);

  console.log('✅ DOM diffing complete.');
}

main().catch((err) => {
  console.error(err);
  try {
      exec('kill $(lsof -t -i :4173) 2>/dev/null || true');
      exec('kill $(lsof -t -i :4174) 2>/dev/null || true');
  } catch {
      // ignore errors during cleanup
  }
  process.exit(1);
});

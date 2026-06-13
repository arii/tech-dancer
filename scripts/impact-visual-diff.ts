import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import {
  ARTIFACTS_DIR,
  DOM_REVIEW_DIR,
  VISUAL_REVIEW_DIR,
  VISUAL_SUMMARY_PATH,
  ensureDirectory,
  readImpactAnalysis,
  routeToSlug,
  startPreview,
  stopPreview,
  visualSeverity,
  waitForServer,
  type VisualRouteSummary
} from './impact-review-utils';

const basePort = Number(process.env.IMPACT_BASE_PORT ?? 4173);
const headPort = Number(process.env.IMPACT_HEAD_PORT ?? 4174);
const baseUrl = process.env.IMPACT_BASE_URL ?? `http://127.0.0.1:${basePort}`;
const headUrl = process.env.IMPACT_HEAD_URL ?? `http://127.0.0.1:${headPort}`;
const baseWorktree = process.env.IMPACT_BASE_WORKTREE ?? path.join(process.cwd(), '.tmp-main');

function whiteCanvas(width: number, height: number): PNG {
  const image = new PNG({ width, height });
  for (let index = 0; index < image.data.length; index += 4) {
    image.data[index] = 255;
    image.data[index + 1] = 255;
    image.data[index + 2] = 255;
    image.data[index + 3] = 255;
  }
  return image;
}

function copyImage(source: PNG, target: PNG): void {
  PNG.bitblt(source, target, 0, 0, source.width, source.height, 0, 0);
}

async function captureRoute(base: string, route: string, imagePath: string, htmlPath: string): Promise<void> {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(new URL(route, base).toString(), { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {
      console.warn(`Network did not become idle for ${route}; continuing with captured DOM state.`);
    });
    await page.screenshot({ path: imagePath, fullPage: true });
    fs.writeFileSync(htmlPath, await page.content());
  } finally {
    await browser.close();
  }
}

function createVisualDiff(beforePath: string, afterPath: string, diffPath: string): Omit<VisualRouteSummary, 'route' | 'slug' | 'beforePath' | 'afterPath' | 'diffPath' | 'severity'> {
  const beforeRaw = PNG.sync.read(fs.readFileSync(beforePath));
  const afterRaw = PNG.sync.read(fs.readFileSync(afterPath));
  const width = Math.max(beforeRaw.width, afterRaw.width);
  const height = Math.max(beforeRaw.height, afterRaw.height);
  const before = whiteCanvas(width, height);
  const after = whiteCanvas(width, height);
  const diff = whiteCanvas(width, height);

  copyImage(beforeRaw, before);
  copyImage(afterRaw, after);

  const diffPixels = pixelmatch(before.data, after.data, diff.data, width, height, { threshold: 0.1 });
  const totalPixels = width * height;
  const differencePercent = totalPixels === 0 ? 0 : (diffPixels / totalPixels) * 100;

  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  return { diffPixels, totalPixels, differencePercent };
}

async function main(): Promise<void> {
  const impact = readImpactAnalysis();
  const routes = impact.routes.filter(route => !route.includes(':'));

  ensureDirectory(ARTIFACTS_DIR);
  ensureDirectory(VISUAL_REVIEW_DIR);
  ensureDirectory(DOM_REVIEW_DIR);

  if (routes.length === 0) {
    fs.writeFileSync(VISUAL_SUMMARY_PATH, JSON.stringify({ routes: [] }, null, 2));
    console.log('✅ No concrete routes require visual review.');
    return;
  }

  if (!fs.existsSync(path.join(baseWorktree, 'dist'))) {
    throw new Error('Missing built base worktree dist. Run `pnpm impact:build-main` first.');
  }

  if (!fs.existsSync(path.join(process.cwd(), 'dist'))) {
    throw new Error('Missing PR dist. Run `pnpm build` before visual diff.');
  }

  const basePreview = startPreview(baseWorktree, basePort);
  const headPreview = startPreview(process.cwd(), headPort);

  try {
    await Promise.all([waitForServer(baseUrl), waitForServer(headUrl)]);

    const summaries: VisualRouteSummary[] = [];
    for (const route of routes) {
      const slug = routeToSlug(route);
      const routeVisualDir = path.join(VISUAL_REVIEW_DIR, slug);
      const routeDomDir = path.join(DOM_REVIEW_DIR, slug);
      ensureDirectory(routeVisualDir);
      ensureDirectory(routeDomDir);

      const beforePath = path.join(routeVisualDir, 'before.png');
      const afterPath = path.join(routeVisualDir, 'after.png');
      const diffPath = path.join(routeVisualDir, 'diff.png');
      const beforeHtmlPath = path.join(routeDomDir, 'before.html');
      const afterHtmlPath = path.join(routeDomDir, 'after.html');

      console.log(`📸 Capturing ${route}`);
      await captureRoute(baseUrl, route, beforePath, beforeHtmlPath);
      await captureRoute(headUrl, route, afterPath, afterHtmlPath);

      const diff = createVisualDiff(beforePath, afterPath, diffPath);
      summaries.push({
        route,
        slug,
        beforePath: path.relative(process.cwd(), beforePath),
        afterPath: path.relative(process.cwd(), afterPath),
        diffPath: path.relative(process.cwd(), diffPath),
        ...diff,
        severity: visualSeverity(diff.differencePercent)
      });
    }

    fs.writeFileSync(VISUAL_SUMMARY_PATH, JSON.stringify({ routes: summaries }, null, 2));
    console.log(`✅ Visual diffs generated in ${VISUAL_REVIEW_DIR}`);
  } finally {
    stopPreview(basePreview);
    stopPreview(headPreview);
  }
}

main().catch(error => {
  console.error(`❌ Visual diff failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});

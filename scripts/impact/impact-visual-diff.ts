import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import sharp from 'sharp';
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
import { whiteCanvas, copyImage } from '../image-processing-utils';

const basePort = Number(process.env.IMPACT_BASE_PORT ?? 4173);
const headPort = Number(process.env.IMPACT_HEAD_PORT ?? 4174);
const baseUrl = process.env.IMPACT_BASE_URL ?? `http://127.0.0.1:${basePort}`;
const headUrl = process.env.IMPACT_HEAD_URL ?? `http://127.0.0.1:${headPort}`;
const baseWorktree = process.env.IMPACT_BASE_WORKTREE ?? path.join(process.cwd(), '.tmp-main');
const DEFAULT_CROP_PADDING = Number(process.env.IMPACT_CROP_PADDING ?? 20);

interface BoundingBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

function calculateBoundingBox(before: PNG, after: PNG): BoundingBox | null {
  const width = Math.min(before.width, after.width);
  const height = Math.min(before.height, after.height);
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let found = false;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;

      const r1 = before.data[idx];
      const g1 = before.data[idx + 1];
      const b1 = before.data[idx + 2];
      const a1 = before.data[idx + 3];

      const r2 = after.data[idx];
      const g2 = after.data[idx + 1];
      const b2 = after.data[idx + 2];
      const a2 = after.data[idx + 3];

      if (r1 !== r2 || g1 !== g2 || b1 !== b2 || a1 !== a2) {
        found = true;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  return found ? { minX, minY, maxX, maxY } : null;
}

async function cropImage(imagePath: string, outputPath: string, box: BoundingBox, padding = DEFAULT_CROP_PADDING): Promise<void> {
  const metadata = await sharp(imagePath).metadata();
  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;

  const left = Math.max(0, box.minX - padding);
  const top = Math.max(0, box.minY - padding);
  const extractWidth = Math.min(width - left, box.maxX - box.minX + 2 * padding);
  const extractHeight = Math.min(height - top, box.maxY - box.minY + 2 * padding);

  await sharp(imagePath)
    .extract({
      left: Math.floor(left),
      top: Math.floor(top),
      width: Math.floor(extractWidth),
      height: Math.floor(extractHeight)
    })
    .toFile(outputPath);
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

function createVisualDiff(beforePath: string, afterPath: string, diffPath: string): { diffPixels: number; totalPixels: number; differencePercent: number; before: PNG; after: PNG } {
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

  return { diffPixels, totalPixels, differencePercent, before, after };
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
    throw new Error('Missing PR dist. Run `pnpm run build:review` before visual diff.');
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

      const { before, after, ...diffMetrics } = createVisualDiff(beforePath, afterPath, diffPath);

      const boundingBox = calculateBoundingBox(before, after);
      let beforeCroppedPath: string | undefined;
      let afterCroppedPath: string | undefined;
      let diffCroppedPath: string | undefined;

      if (boundingBox) {
        const routeCroppedDir = path.join(routeVisualDir, 'cropped');
        ensureDirectory(routeCroppedDir);

        const bcp = path.join(routeCroppedDir, 'before.png');
        const acp = path.join(routeCroppedDir, 'after.png');
        const dcp = path.join(routeCroppedDir, 'diff.png');

        console.log(`✂️  Cropping changes for ${route}`);
        await Promise.all([
          cropImage(beforePath, bcp, boundingBox),
          cropImage(afterPath, acp, boundingBox),
          cropImage(diffPath, dcp, boundingBox)
        ]);

        beforeCroppedPath = path.relative(process.cwd(), bcp);
        afterCroppedPath = path.relative(process.cwd(), acp);
        diffCroppedPath = path.relative(process.cwd(), dcp);
      }

      summaries.push({
        route,
        slug,
        beforePath: path.relative(process.cwd(), beforePath),
        afterPath: path.relative(process.cwd(), afterPath),
        diffPath: path.relative(process.cwd(), diffPath),
        beforeCroppedPath,
        afterCroppedPath,
        diffCroppedPath,
        ...diffMetrics,
        severity: visualSeverity(diffMetrics.differencePercent)
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

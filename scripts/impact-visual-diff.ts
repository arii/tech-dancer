import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { exec } from 'child_process';

const WAIT_FOR_SERVER = 10000;

interface ImpactReport {
  routes: string[];
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

async function captureScreenshot(
  baseUrl: string,
  route: string,
  outputPath: string
) {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: {
      width: 1440,
      height: 900
    }
  });

  const url = `${baseUrl}${route}`;
  console.log(`📸 Capturing ${url} ...`);
  try {
      await page.goto(url, { waitUntil: 'networkidle' });
  } catch {
      console.warn(`Failed to go to ${url}. Trying again without waiting for networkidle.`);
      await page.goto(url);
  }

  await page.screenshot({
    path: outputPath,
    fullPage: true
  });

  await browser.close();
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
    console.log('✅ No routes require visual review.');
    return;
  }

  console.log(`🚀 Starting visual diff for ${routes.length} routes...`);

  // Start preview servers
  console.log('🌐 Starting main branch preview server on port 4173...');
  const mainServer = await startServer(path.join(process.cwd(), '.tmp-main'), 4173);

  console.log('🌐 Starting PR branch preview server on port 4174...');
  const prServer = await startServer(process.cwd(), 4174);

  const visualReviewDir = path.join(artifactsDir, 'visual-review');
  if (!fs.existsSync(visualReviewDir)) {
    fs.mkdirSync(visualReviewDir, { recursive: true });
  }

  for (const route of routes) {
    // Generate safe slug for route
    const slug = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-');
    const routeDir = path.join(visualReviewDir, slug);

    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    const beforePath = path.join(routeDir, 'before.png');
    const afterPath = path.join(routeDir, 'after.png');
    const diffPath = path.join(routeDir, 'diff.png');
    const metaPath = path.join(routeDir, 'meta.json');

    // Capture Base (Main)
    await captureScreenshot('http://localhost:4173', route, beforePath);

    // Capture PR (HEAD)
    await captureScreenshot('http://localhost:4174', route, afterPath);

    // Diff
    console.log(`🔍 Comparing ${route} ...`);
    const beforePng = PNG.sync.read(fs.readFileSync(beforePath));
    const afterPng = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = beforePng;

    // Ensure dimensions match. If not, fallback or resize logic would be needed.
    // Assuming Playwright's fullPage captures might differ slightly in height.
    const maxWidth = Math.max(beforePng.width, afterPng.width);
    const maxHeight = Math.max(beforePng.height, afterPng.height);

    const diffPng = new PNG({ width: maxWidth, height: maxHeight });

    // Handle height mismatches simply by comparing the overlapping region
    // Or pixelmatch can handle it if we pass the right dimensions.
    // For simplicity, we just use the beforePng dimensions, but let's be safer:
    let diffPixels;

    if (beforePng.width === afterPng.width && beforePng.height === afterPng.height) {
         diffPixels = pixelmatch(
            beforePng.data,
            afterPng.data,
            diffPng.data,
            width,
            height,
            { threshold: 0.1 }
          );
    } else {
        console.warn(`⚠️ Dimension mismatch for ${route}. Diff might be inaccurate.`);
        // Basic fallback: compare using the smallest dimensions
        const minWidth = Math.min(beforePng.width, afterPng.width);
        const minHeight = Math.min(beforePng.height, afterPng.height);

        diffPixels = pixelmatch(
            beforePng.data,
            afterPng.data,
            diffPng.data,
            minWidth,
            minHeight,
            { threshold: 0.1 }
        );
    }

    const totalPixels = maxWidth * maxHeight;
    const diffPercentage = (diffPixels / totalPixels) * 100;

    fs.writeFileSync(diffPath, PNG.sync.write(diffPng));

    fs.writeFileSync(metaPath, JSON.stringify({ diffPercentage, diffPixels, route }, null, 2));

    console.log(`📊 Difference for ${route}: ${diffPercentage.toFixed(2)}%`);
  }

  console.log('🛑 Shutting down preview servers...');
  mainServer.kill();
  prServer.kill();

  // Cleanup any lingering processes on ports
  try {
      exec('kill $(lsof -t -i :4173) 2>/dev/null || true');
      exec('kill $(lsof -t -i :4174) 2>/dev/null || true');
  } catch {
      // ignore
  }

  console.log('✅ Visual diffing complete.');
}

main().catch((err) => {
  console.error(err);
  // attempt cleanup
  try {
      exec('kill $(lsof -t -i :4173) 2>/dev/null || true');
      exec('kill $(lsof -t -i :4174) 2>/dev/null || true');
  } catch {
      // ignore
  }
  process.exit(1);
});

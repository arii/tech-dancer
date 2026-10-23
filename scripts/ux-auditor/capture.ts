import { chromium, type Browser, type Page } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';
import { spawn, type ChildProcess } from 'child_process';
import { pruneHtmlDom } from './domPruner';
import type { ViewportScanResult, AxeViolationSummary } from './types';

export const VIEWPORT_DEFINITIONS: Record<string, { width: number; height: number; isMobile?: boolean }> = {
  desktop: { width: 1440, height: 900, isMobile: false },
  laptop: { width: 1024, height: 768, isMobile: false },
  tablet: { width: 768, height: 1024, isMobile: true },
  mobile: { width: 375, height: 667, isMobile: true },
  ultrawide: { width: 1920, height: 1080, isMobile: false }
};

export interface CaptureOptions {
  baseUrl?: string;
  outputDir?: string;
  skipServer?: boolean;
}

let previewProcess: ChildProcess | null = null;

export async function ensureServerRunning(customBaseUrl?: string, skipServer = false): Promise<string> {
  if (customBaseUrl) return customBaseUrl;
  const preferredPorts = [3000, 4173, 4174];

  // Check if any port is already alive
  for (const port of preferredPorts) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}`);
      if (res.ok || res.status === 404 || res.status === 200 || res.status === 304) {
        return `http://127.0.0.1:${port}`;
      }
    } catch {
      // not alive, continue
    }
  }

  if (skipServer) {
    return 'http://127.0.0.1:3000';
  }

  // Start preview server
  console.log('🚀 Starting local preview server for UX audit on port 4173...');
  previewProcess = spawn('pnpm', ['run', 'preview', '--port', '4173', '--host', '127.0.0.1'], {
    cwd: process.cwd(),
    stdio: 'ignore',
    detached: false
  });

  const url = 'http://127.0.0.1:4173';
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      const res = await fetch(url);
      if (res.ok || res.status < 500) {
        return url;
      }
    } catch {
      // wait
    }
  }
  return url;
}

export function cleanupServer(): void {
  if (previewProcess) {
    try {
      previewProcess.kill('SIGTERM');
    } catch {
      // ignore
    }
    previewProcess = null;
  }
}

export async function captureViewport(
  route: string,
  viewportName: string,
  options: CaptureOptions = {}
): Promise<ViewportScanResult> {
  const baseUrl = await ensureServerRunning(options.baseUrl, options.skipServer);
  const vpConfig = VIEWPORT_DEFINITIONS[viewportName.toLowerCase()] || VIEWPORT_DEFINITIONS.desktop;
  const slug = route.replace(/\//g, '_').replace(/^_/, '') || 'home';
  const outDir = options.outputDir || path.join(process.cwd(), 'artifacts', 'ux-audit', slug);

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const screenshotPath = path.join(outDir, `${viewportName}.png`);
  const browser: Browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({
      viewport: { width: vpConfig.width, height: vpConfig.height },
      isMobile: Boolean(vpConfig.isMobile),
      hasTouch: Boolean(vpConfig.isMobile)
    });

    const page: Page = await context.newPage();
    const targetUrl = new URL(route, baseUrl).toString();

    console.log(`📸 Capturing ${route} on ${viewportName} (${vpConfig.width}x${vpConfig.height})...`);
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 20_000 });
    await page.waitForLoadState('networkidle', { timeout: 5_000 }).catch(() => {});
    await page.waitForTimeout(400);

    // Scroll down and up to trigger any lazy loaded sections
    await page.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise(r => setTimeout(r, 100));
      window.scrollTo(0, 0);
    }).catch(() => {});
    await page.waitForTimeout(200);

    // Take full page screenshot
    await page.screenshot({ path: screenshotPath, fullPage: true });

    // Run Axe accessibility check
    let axeViolations: AxeViolationSummary[] = [];
    try {
      const axeResults = await new AxeBuilder({ page }).analyze();
      axeViolations = axeResults.violations.map(v => ({
        id: v.id,
        impact: v.impact || 'minor',
        description: v.description,
        helpUrl: v.helpUrl,
        nodes: v.nodes.slice(0, 5).map(n => ({
          html: n.html,
          target: n.target.map(t => String(t)),
          failureSummary: n.failureSummary
        }))
      }));
    } catch (axeErr) {
      console.warn('⚠️ Axe check warning:', axeErr);
    }

    // Extract DOM metrics
    const rawMetrics = await page.evaluate((isMobile: boolean) => {
      const ctas = Array.from(document.querySelectorAll('button, a[href], input[type="submit"], input[type="button"]')).filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });

      let smallTapCount = 0;
      if (isMobile) {
        ctas.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.width < 44 || rect.height < 44) smallTapCount++;
        });
      }

      return {
        scrollWidth: document.body.scrollWidth,
        scrollHeight: document.body.scrollHeight,
        visibleCTACount: ctas.length,
        smallTapTargetsCount: smallTapCount
      };
    }, Boolean(vpConfig.isMobile));

    const rawHtml = await page.content();
    const prunedDom = pruneHtmlDom(rawHtml);

    await context.close();

    return {
      viewport: viewportName,
      width: vpConfig.width,
      height: vpConfig.height,
      screenshotPath,
      prunedDom,
      axeViolations,
      metrics: rawMetrics
    };
  } finally {
    await browser.close();
  }
}

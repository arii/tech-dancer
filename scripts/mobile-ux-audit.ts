import fs from 'fs';
import path from 'path';
import { chromium, type Page } from 'playwright';
import { disableAnimations } from '../tests/utils/playwright-helpers';

type MobileViewport = {
  name: string;
  width: number;
  height: number;
};

type OverflowFinding = {
  type: 'missing-viewport-meta' | 'document-overflow' | 'element-outside-viewport' | 'content-overflow';
  selector: string;
  message: string;
  viewportWidth: number;
  left?: number;
  right?: number;
  clientWidth?: number;
  scrollWidth?: number;
  text?: string;
};

type RouteResult = {
  route: string;
  url: string;
  viewport: MobileViewport;
  screenshot: string;
  findings: OverflowFinding[];
};

type MobileAuditReport = {
  status: 'success' | 'failure';
  baseUrl: string;
  routes: string[];
  results: RouteResult[];
  findingCount: number;
};

const MOBILE_VIEWPORTS: MobileViewport[] = [
  { name: 'mobile-360', width: 360, height: 800 },
  { name: 'mobile-390', width: 390, height: 844 },
];

function bundledChromiumCandidates(root: string): string[] {
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && /^chromium-\d+$/.test(entry.name))
    .flatMap(entry => [
      path.join(root, entry.name, 'chrome-linux', 'chrome'),
      path.join(root, entry.name, 'chrome-linux64', 'chrome'),
    ]);
}

function resolveChromiumExecutable(): string {
  const candidates = [
    process.env.CHROME_PATH,
    chromium.executablePath(),
    ...bundledChromiumCandidates('/ms-playwright'),
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ];
  const executablePath = candidates.find(candidate => candidate && fs.existsSync(candidate));
  if (!executablePath) {
    throw new Error('Chromium executable not found. Run `pnpm run setup:playwright`, set CHROME_PATH, or use PLAYWRIGHT_BROWSERS_PATH=/ms-playwright in a pre-baked container.');
  }
  return executablePath;
}

function readValues(args: string[], flag: string): string[] {
  return args.flatMap((arg, index) => arg === flag && args[index + 1] ? [args[index + 1]] : []);
}

function readValue(args: string[], flag: string, fallback?: string): string | undefined {
  return readValues(args, flag)[0] ?? fallback;
}

function buildUrl(baseUrl: string, route: string): string {
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return new URL(route.replace(/^\//, ''), normalizedBase).toString();
}

function artifactName(route: string, viewport: MobileViewport): string {
  const slug = route === '/' ? 'home' : route.replace(/^\//, '').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
  return `${slug || 'home'}-${viewport.name}.png`;
}

async function findOverflow(page: Page): Promise<OverflowFinding[]> {
  await page.evaluate('globalThis.__name = target => target');
  return page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const tolerance = 1;
    const findings: OverflowFinding[] = [];
    const seen = new Set<string>();

    function selectorFor(element: Element): string {
      if (element.id) return `#${CSS.escape(element.id)}`;
      const testId = element.getAttribute('data-testid');
      if (testId) return `[data-testid="${CSS.escape(testId)}"]`;
      const parts: string[] = [];
      let current: Element | null = element;
      while (current && current !== document.body && parts.length < 4) {
        let part = current.tagName.toLowerCase();
        const classes = Array.from(current.classList).slice(0, 2);
        if (classes.length) part += `.${classes.map(name => CSS.escape(name)).join('.')}`;
        const parent: Element | null = current.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter(sibling => sibling.tagName === current?.tagName);
          if (siblings.length > 1) part += `:nth-of-type(${siblings.indexOf(current) + 1})`;
        }
        parts.unshift(part);
        current = parent;
      }
      return parts.join(' > ');
    }

    function add(finding: OverflowFinding) {
      const key = `${finding.type}:${finding.selector}`;
      if (!seen.has(key) && findings.length < 40) {
        findings.push(finding);
        seen.add(key);
      }
    }

    if (!document.querySelector('meta[name="viewport"]')) {
      add({
        type: 'missing-viewport-meta',
        selector: 'head',
        message: 'Page is missing `<meta name="viewport">`; mobile browsers may use a wide layout viewport and hide containment bugs.',
        viewportWidth,
      });
    }

    const documentWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
    if (documentWidth > viewportWidth + tolerance) {
      add({
        type: 'document-overflow',
        selector: 'html',
        message: `Document is ${documentWidth - viewportWidth}px wider than the mobile viewport.`,
        viewportWidth,
        clientWidth: viewportWidth,
        scrollWidth: documentWidth,
      });
    }

    for (const element of Array.from(document.body.querySelectorAll('*'))) {
      if (element.matches('script, style, link, meta, noscript')) continue;
      const htmlElement = element as HTMLElement;
      const style = getComputedStyle(htmlElement);
      const rect = htmlElement.getBoundingClientRect();
      const visible = style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
      if (!visible) continue;

      const selector = selectorFor(element);
      const text = (htmlElement.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 120) || undefined;
      if (rect.left < -tolerance || rect.right > viewportWidth + tolerance) {
        add({
          type: 'element-outside-viewport',
          selector,
          message: `Visible element extends outside the ${viewportWidth}px viewport.`,
          viewportWidth,
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          text,
        });
      }

      const clipsOverflow = ['auto', 'scroll', 'hidden', 'clip'].includes(style.overflowX);
      if (!clipsOverflow && htmlElement.clientWidth > 0 && htmlElement.scrollWidth > htmlElement.clientWidth + tolerance) {
        add({
          type: 'content-overflow',
          selector,
          message: `Content is ${htmlElement.scrollWidth - htmlElement.clientWidth}px wider than its container and is not clipped or scrollable.`,
          viewportWidth,
          clientWidth: htmlElement.clientWidth,
          scrollWidth: htmlElement.scrollWidth,
          text,
        });
      }
    }

    return findings;
  });
}

async function main() {
  const args = process.argv.slice(2);
  const baseUrl = readValue(args, '--url', process.env.BASE_URL || 'http://localhost:4173/') as string;
  const routes = readValues(args, '--route');
  const routesToAudit = routes.length ? routes : ['/'];
  const outputDir = path.resolve(readValue(args, '--output-dir', 'test-results/mobile-ux-audit') as string);

  fs.mkdirSync(outputDir, { recursive: true });
  const executablePath = resolveChromiumExecutable();
  const browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false', executablePath });
  const results: RouteResult[] = [];

  try {
    for (const route of routesToAudit) {
      for (const viewport of MOBILE_VIEWPORTS) {
        const page = await browser.newPage({
          viewport: { width: viewport.width, height: viewport.height },
          isMobile: true,
          hasTouch: true,
        });
        const url = buildUrl(baseUrl, route);
        const screenshot = path.join(outputDir, artifactName(route, viewport));
        try {
          await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 });
          await disableAnimations(page);
          const findings = await findOverflow(page);
          await page.screenshot({ path: screenshot, fullPage: true });
          results.push({ route, url, viewport, screenshot, findings });
        } finally {
          await page.close();
        }
      }
    }
  } finally {
    await browser.close();
  }

  const findingCount = results.reduce((count, result) => count + result.findings.length, 0);
  const report: MobileAuditReport = {
    status: findingCount ? 'failure' : 'success',
    baseUrl,
    routes: routesToAudit,
    results,
    findingCount,
  };
  const reportPath = path.join(outputDir, 'report.json');
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ ...report, reportPath }, null, 2));
  if (findingCount) process.exitCode = 1;
}

main().catch(error => {
  console.error(`Mobile UX audit failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 2;
});

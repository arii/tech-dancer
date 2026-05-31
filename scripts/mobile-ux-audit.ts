import { chromium, devices, type Page } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { disableAnimations } from '../tests/utils/playwright-helpers';

const DEFAULT_ROUTES = ['/', '/research', '/merch', '/blog', '/gear', '/events', '/ux-auditor'];
const MOBILE_DEVICE = devices['iPhone 12'];

type FindingKind = 'document-overflow' | 'viewport-overflow' | 'clipped-content' | 'horizontal-scroll-region';
type FindingSeverity = 'error' | 'warning';

type Finding = {
  kind: FindingKind;
  severity: FindingSeverity;
  selector: string;
  text?: string;
  detail: string;
};

type RouteAudit = {
  route: string;
  url: string;
  screenshot: string;
  viewport: { width: number; height: number };
  findings: Finding[];
};

function readArgument(name: string) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function routeSlug(route: string) {
  return route === '/' ? 'home' : route.replace(/^\//, '').replace(/[^a-z0-9]+/gi, '-');
}

function joinUrl(baseUrl: string, route: string) {
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return new URL(route.replace(/^\//, ''), normalizedBase).toString();
}

async function inspectMobileLayout(page: Page): Promise<Finding[]> {
  return page.evaluate(() => {
    type BrowserFinding = {
      kind: 'document-overflow' | 'viewport-overflow' | 'clipped-content' | 'horizontal-scroll-region';
      severity: 'error' | 'warning';
      selector: string;
      text?: string;
      detail: string;
    };

    const findings: BrowserFinding[] = [];
    const viewportWidth = document.documentElement.clientWidth;
    const ignoredTags = new Set(['HTML', 'BODY', 'SCRIPT', 'STYLE', 'LINK', 'META', 'NOSCRIPT', 'SVG', 'PATH']);
    const interactiveSelector = 'a, button, input, select, textarea, [role="button"], [tabindex]';

    const selectorFor = (element: Element) => {
      if (element.id) return `#${CSS.escape(element.id)}`;
      const segments: string[] = [];
      let current: Element | null = element;
      while (current && current !== document.body && segments.length < 4) {
        let segment = current.tagName.toLowerCase();
        const classes = Array.from(current.classList).slice(0, 2).map(name => `.${CSS.escape(name)}`).join('');
        if (classes) segment += classes;
        const parent: Element | null = current.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter(sibling => sibling.tagName === current?.tagName);
          if (siblings.length > 1) segment += `:nth-of-type(${siblings.indexOf(current) + 1})`;
        }
        segments.unshift(segment);
        current = parent;
      }
      return segments.join(' > ');
    };

    const textFor = (element: Element) => {
      const text = (element.textContent || '').replace(/\s+/g, ' ').trim();
      return text ? text.slice(0, 120) : undefined;
    };

    const isVisible = (element: HTMLElement) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) !== 0 && rect.width > 0 && rect.height > 0;
    };

    const hasMeaningfulContent = (element: HTMLElement) => {
      return Boolean(textFor(element)) || element.matches(interactiveSelector) || ['IMG', 'VIDEO', 'IFRAME'].includes(element.tagName);
    };

    if (document.documentElement.scrollWidth > viewportWidth + 1) {
      findings.push({
        kind: 'document-overflow',
        severity: 'error',
        selector: 'html',
        detail: `Document width ${document.documentElement.scrollWidth}px exceeds the ${viewportWidth}px mobile viewport.`,
      });
    }

    for (const element of Array.from(document.querySelectorAll<HTMLElement>('body *'))) {
      if (ignoredTags.has(element.tagName) || !isVisible(element)) continue;
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      const overflowX = style.overflowX;
      const allowsHorizontalScroll = overflowX === 'auto' || overflowX === 'scroll';
      const contentOverflowsWidth = element.scrollWidth > element.clientWidth + 1;

      if (contentOverflowsWidth && allowsHorizontalScroll && hasMeaningfulContent(element)) {
        findings.push({
          kind: 'horizontal-scroll-region',
          severity: 'warning',
          selector: selectorFor(element),
          text: textFor(element),
          detail: `Scrollable region is ${element.scrollWidth}px wide inside a ${element.clientWidth}px container; confirm a visible scroll affordance.`,
        });
      }

      const isSkipLink = element.matches('a[href^="#"]') && element.textContent?.trim().toLowerCase().startsWith('skip');
      const isFormControl = element.matches('input, textarea, select');
      if (contentOverflowsWidth && (overflowX === 'hidden' || overflowX === 'clip') && hasMeaningfulContent(element) && !isSkipLink && !isFormControl) {
        findings.push({
          kind: 'clipped-content',
          severity: 'error',
          selector: selectorFor(element),
          text: textFor(element),
          detail: `Content is ${element.scrollWidth}px wide inside a ${element.clientWidth}px clipped container.`,
        });
      }

      const outsideViewport = rect.left < -1 || rect.right > viewportWidth + 1;
      if (outsideViewport && hasMeaningfulContent(element) && !element.closest('[data-mobile-overflow-ok="true"]')) {
        const insideScrollableParent = Array.from(element.parentElement?.closest('body')?.querySelectorAll('*') || [])
          .filter(candidate => candidate.contains(element) && candidate !== element)
          .some(candidate => {
            const candidateElement = candidate as HTMLElement;
            const candidateStyle = getComputedStyle(candidateElement);
            return candidateElement.scrollWidth > candidateElement.clientWidth + 1 && (candidateStyle.overflowX === 'auto' || candidateStyle.overflowX === 'scroll');
          });
        if (!insideScrollableParent) {
          findings.push({
            kind: 'viewport-overflow',
            severity: 'error',
            selector: selectorFor(element),
            text: textFor(element),
            detail: `Element bounds (${Math.round(rect.left)}px..${Math.round(rect.right)}px) extend beyond the ${viewportWidth}px viewport.`,
          });
        }
      }
    }

    const seen = new Set<string>();
    return findings.filter(finding => {
      const key = `${finding.kind}:${finding.selector}:${finding.detail}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  });
}

async function auditRoute(page: Page, baseUrl: string, route: string, outputDir: string): Promise<RouteAudit> {
  const url = joinUrl(baseUrl, route);
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle').catch(() => undefined);
  // tsx/esbuild can preserve its helper in serialized page.evaluate callbacks.
  await page.evaluate('globalThis.__name = target => target;');
  await disableAnimations(page);
  await page.waitForTimeout(250);

  const screenshot = path.join(outputDir, `${routeSlug(route)}-mobile.png`);
  await page.screenshot({ path: screenshot, fullPage: true });
  const findings = await inspectMobileLayout(page);
  return { route, url, screenshot, viewport: page.viewportSize() || { width: 390, height: 844 }, findings };
}

async function main() {
  const baseUrl = readArgument('--base-url') || 'http://localhost:3000/';
  const outputDir = path.resolve(readArgument('--output-dir') || '/tmp/tech-dancer-mobile-audit');
  const routes = (readArgument('--routes') || DEFAULT_ROUTES.join(','))
    .split(',')
    .map(route => route.trim())
    .filter(Boolean);

  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
  const context = await browser.newContext({ ...MOBILE_DEVICE, reducedMotion: 'reduce' });
  const page = await context.newPage();

  try {
    const audits: RouteAudit[] = [];
    for (const route of routes) {
      console.error(`Auditing ${route} with iPhone 12 emulation...`);
      audits.push(await auditRoute(page, baseUrl, route, outputDir));
    }

    const summary = {
      device: 'iPhone 12',
      baseUrl,
      routeCount: audits.length,
      errorCount: audits.flatMap(audit => audit.findings).filter(finding => finding.severity === 'error').length,
      warningCount: audits.flatMap(audit => audit.findings).filter(finding => finding.severity === 'warning').length,
      audits,
    };
    const reportPath = path.join(outputDir, 'mobile-ux-audit.json');
    fs.writeFileSync(reportPath, `${JSON.stringify(summary, null, 2)}\n`);
    console.log(JSON.stringify({ ...summary, reportPath }, null, 2));
  } finally {
    await browser.close();
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});

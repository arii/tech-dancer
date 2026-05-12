import { test, expect } from '@playwright/test';

function isInternal(url: string, baseUrl: string): boolean {
  try {
    const u = new URL(url, baseUrl);
    const b = new URL(baseUrl);
    return u.origin === b.origin && u.pathname.startsWith(b.pathname);
  } catch {
    return false;
  }
}

function cleanUrl(url: string): string {
  const u = new URL(url);
  u.hash = '';
  u.search = '';
  return u.toString();
}

const IGNORED_ERRORS = [
  "Vercel Web Analytics",
  "gtag is not defined",
  "chrome-extension",
];

function isIgnored(msg: string): boolean {
  return IGNORED_ERRORS.some(ignored => msg.includes(ignored));
}

test.describe('Automated UX/Console Error Crawler', () => {
  test('crawls routes and verifies no errors', async ({ page, baseURL }) => {
    if (!baseURL) throw new Error('baseURL is required for crawling');

    // State is local to the test to ensure isolation during retries
    const visited = new Set<string>();
    const toVisit: string[] = [baseURL];

    // Limit the number of pages to crawl to prevent excessive run times
    const MAX_PAGES = 50;
    let pageCount = 0;

    // Ensure newsletter banner doesn't interfere (added once per page instance)
    await page.addInitScript(() => {
      window.sessionStorage.setItem('td-newsletter-dismissed', 'true');
    });

    while (toVisit.length > 0 && pageCount < MAX_PAGES) {
      const currentUrl = toVisit.shift()!;
      const normalizedUrl = cleanUrl(currentUrl);

      if (visited.has(normalizedUrl)) continue;
      visited.add(normalizedUrl);
      pageCount++;

      console.log(`Crawling (${pageCount}/${MAX_PAGES}): ${normalizedUrl}`);

      const currentConsoleErrors: string[] = [];
      const currentPageErrors: string[] = [];

      page.on('console', msg => {
        if (msg.type() === 'error' && !isIgnored(msg.text())) {
          currentConsoleErrors.push(msg.text());
        }
      });

      page.on('pageerror', err => {
        if (!isIgnored(err.message)) {
          currentPageErrors.push(err.message);
        }
      });

      const response = await page.goto(normalizedUrl, { waitUntil: 'networkidle' });

      // Verify status code
      if (response) {
        expect(response.status(), `Page ${normalizedUrl} returned status ${response.status()}`).toBeLessThan(400);
      }

      // Verify main content is visible
      await expect(page.locator('main'), `Page ${normalizedUrl} does not have a <main> element`).toBeVisible({ timeout: 5000 });

      // Collect links for further crawling
      const links = await page.$$eval('a[href]', (anchors) =>
        anchors.map(a => (a as HTMLAnchorElement).href)
      );

      for (const link of links) {
        if (isInternal(link, baseURL)) {
          const cleanLink = cleanUrl(new URL(link, baseURL).toString());
          if (!visited.has(cleanLink) && !toVisit.includes(cleanLink)) {
            toVisit.push(cleanLink);
          }
        }
      }

      // Assert no errors for this page
      expect(currentConsoleErrors, `Console errors on ${normalizedUrl}:\n${currentConsoleErrors.join('\n')}`).toHaveLength(0);
      expect(currentPageErrors, `Page errors on ${normalizedUrl}:\n${currentPageErrors.join('\n')}`).toHaveLength(0);

      // Remove listeners for next page
      page.removeAllListeners('console');
      page.removeAllListeners('pageerror');
    }

    console.log(`Crawling complete. Visited ${pageCount} pages.`);
  });
});

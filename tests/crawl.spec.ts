import { test, expect } from '@playwright/test';
import { setupErrorMonitoring } from './fixtures/error-monitoring';

/**
 * Normalizes a URL for crawling.
 * Preserves essential query parameters while stripping tracking tokens.
 */
function cleanUrl(url: string): string {
  const u = new URL(url);
  u.hash = '';

  // Define tracking parameters to strip
  const trackingParams = ['utm_', 'fbclid', 'gclid', 'msclkid', '_hsenc', '_hsmi'];

  const params = new URLSearchParams(u.search);
  const keysToDelete: string[] = [];

  for (const key of params.keys()) {
    if (trackingParams.some(p => key.startsWith(p))) {
      keysToDelete.push(key);
    }
  }

  keysToDelete.forEach(key => params.delete(key));
  u.search = params.toString();

  return u.toString();
}

function isInternal(url: string, baseUrl: string): boolean {
  try {
    const u = new URL(url, baseUrl);
    const b = new URL(baseUrl);
    return u.origin === b.origin && u.pathname.startsWith(b.pathname);
  } catch {
    return false;
  }
}

test.describe('Automated UX/Console Error Crawler', () => {
  test('crawls routes and verifies no errors', async ({ page, baseURL }) => {
    if (!baseURL) throw new Error('baseURL is required for crawling');

    // Set a 5-minute timeout for the entire crawl test
    test.setTimeout(5 * 60 * 1000);

    // State is local to the test to ensure isolation during retries
    const visited = new Set<string>();
    const toVisit: string[] = [baseURL];

    // Limit the number of pages to crawl to prevent excessive run times
    const MAX_PAGES = 50;
    let pageCount = 0;

    const { consoleErrors, pageErrors, clearErrors } = setupErrorMonitoring(page);

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

      // Clear errors from previous navigation before going to next page
      clearErrors();

      const response = await page.goto(normalizedUrl, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });

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
      expect(consoleErrors, `Console errors on ${normalizedUrl}:\n${consoleErrors.join('\n')}`).toHaveLength(0);
      expect(pageErrors, `Page errors on ${normalizedUrl}:\n${pageErrors.join('\n')}`).toHaveLength(0);
    }

    console.log(`Crawling complete. Visited ${pageCount} pages.`);
  });
});

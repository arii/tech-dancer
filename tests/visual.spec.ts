import { test, expect } from './fixtures/visual';

const routes = [
  { name: 'home', path: './' },
  { name: 'blog', path: './blog' },
  { name: 'gear', path: './gear' },
  { name: 'research', path: './research' },
  { name: 'about', path: './about' },
  { name: 'contact', path: './contact' },
  { name: 'ux-auditor', path: './ux-auditor' },
  { name: 'preview', path: './preview' },
  { name: 'merch', path: './merch' },
  { name: 'event-guide', path: './events/boogie-by-the-bay' }
];

test.describe('Visual Regression Tests', () => {
  for (const route of routes) {
    test(`visual comparison for ${route.name}`, async ({ page }) => {
      await page.goto(route.path);

      // Wait for the main content to be visible as a base stability measure
      await expect(page.locator('main')).toBeVisible({ timeout: 30000 });

      // Wait for fonts to be loaded to prevent text-rendering flakiness
      await page.evaluate(() => document.fonts.ready);

      // Route-specific stability waits
      if (route.name === 'research') {
        // Wait for portfolio header to be visible
        await expect(page.getByRole('heading', { name: /DevAI.*Portfolio/ })).toBeVisible({ timeout: 30000 });
      }

      if (route.name === 'preview') {
        // Ensure preview components are visible
        await expect(page.getByText('Component Preview')).toBeVisible();
      }

      // Robust scroll-to-settle: triggers lazy loading without hardcoded sleep loops
      await page.evaluate(async () => {
        const scrollable = document.querySelector('main') || document.documentElement;

        const waitForScrollHeightToSettle = async () => {
          let lastHeight = -1;
          let unchangedCount = 0;

          while (unchangedCount < 3) {
            scrollable.scrollTo(0, scrollable.scrollHeight);
            const currentHeight = scrollable.scrollHeight;

            if (currentHeight === lastHeight) {
              unchangedCount++;
            } else {
              unchangedCount = 0;
              lastHeight = currentHeight;
            }

            // Minimal task yield to allow for layout/lazy-loading triggers
            await new Promise(requestAnimationFrame);
          }
        };

        await waitForScrollHeightToSettle();
        scrollable.scrollTo(0, 0);
        // Ensure paint settlement
        await new Promise(requestAnimationFrame);
      });

      // Snapshots use global maxDiffPixelRatio threshold defined in playwright.config.ts
      await expect(page).toHaveScreenshot(`${route.name}.png`, {
        fullPage: true,
        allowSizeMismatch: true,
        animations: 'disabled',
        mask: [
          page.getByTestId('content-date'),
          page.getByTestId('detail-metadata'),
          page.getByTestId('footer-copyright'),
          // Targeted masking for dynamic analysis snapshots
          page.getByTestId('ux-analysis-snapshot'),
          // Mask UX Auditor dynamic content
          page.locator('[class*="animate-pulse"]'),
          page.locator('text=/\\d{1,2}:\\d{2}:\\d{2}/'), // Matches timestamps like 12:00:00
          // Mask search input values
          page.getByTestId('search-input'),
          // Mask timeline rows which contain dates
          page.getByTestId('timeline-row'),
        ]
      });
    });
  }
});

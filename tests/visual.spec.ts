import { test, expect } from './fixtures/visual';
import { getVisualTestMasks } from './utils/playwright-helpers';

const routes = [
  { name: 'home', path: './' },
  { name: 'blog', path: './blog' },
  { name: 'gear', path: './gear' },
  { name: 'research', path: './research' },
  { name: 'about', path: './about' },
  { name: 'ux-auditor', path: './ux-auditor' },
  { name: 'preview', path: './preview' },
  { name: 'merch', path: './merch' },
  { name: 'halloween-costumes-mobile', path: './blog/2026-04-18-halloween-costumes', viewport: { width: 390, height: 844 } }
];

test.describe('Visual Regression Tests', () => {
  for (const route of routes) {
    test(`visual comparison for ${route.name}`, async ({ page }) => {
      if (route.viewport) {
        await page.setViewportSize(route.viewport);
      }
      await page.goto(route.path);

      // Wait for the main content to be visible as a base stability measure
      await expect(page.locator('main')).toBeVisible({ timeout: 30000 });

      // Route-specific stability waits
      if (route.name === 'research') {
        // Wait for portfolio header to be visible
        await expect(page.getByRole('heading', { name: /DevAI Portfolio/ })).toBeVisible({ timeout: 30000 });
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
        mask: getVisualTestMasks(page)
      });
    });
  }
});

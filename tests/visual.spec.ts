import { test, expect } from './fixtures/visual';

const routes = [
  { name: 'home', path: './' },
  { name: 'blog', path: './blog' },
  { name: 'gear', path: './gear' },
  { name: 'research', path: './research' },
  { name: 'about', path: './about' },
  { name: 'contact', path: './contact' }
];

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Use a fixed clock to ensure deterministic date/time rendering (e.g., in footer or events)
    await page.clock.setFixedTime(new Date('2024-01-01T12:00:00Z'));

    // Disable motion to stabilize non-deterministic CSS/JS animations
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // Ensure newsletter banner doesn't interfere with visual tests
    await page.addInitScript(() => {
      window.sessionStorage.setItem('td-newsletter-dismissed', 'true');
    });
  });

  for (const route of routes) {
    test(`visual comparison for ${route.name}`, async ({ page }) => {
      await page.goto(route.path);

      // Wait for initial load and fonts to prevent text-rendering flakiness
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => document.fonts.ready);

      // Ensure main content is visible before proceeding
      await expect(page.locator('main')).toBeVisible({ timeout: 15000 });

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

      // Use a strict 2% threshold to catch unintended UI regressions
      await expect(page).toHaveScreenshot(`${route.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.02,
        animations: 'disabled'
      });
    });
  }
});

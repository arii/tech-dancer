import { test, expect } from '@playwright/test';

const routes = [
  { name: 'home', path: './', height: 1780 },
  { name: 'blog', path: './blog', height: 1571 },
  { name: 'gear', path: './gear', height: 949 },
  { name: 'research', path: './research', height: 1319 },
  { name: 'about', path: './about', height: 3581 },
  { name: 'contact', path: './contact', height: 1261 }
];

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure newsletter banner doesn't interfere with visual tests
    await page.addInitScript(() => {
      window.sessionStorage.setItem('td-newsletter-dismissed', 'true');
    });
  });

  for (const route of routes) {
    test(`visual comparison for ${route.name}`, async ({ page }) => {
      await page.goto(route.path);
      await page.waitForLoadState('networkidle');

      // Ensure consistent viewport for snapshots matching the baseline height
      await page.setViewportSize({ width: 1280, height: route.height });

      // Ensure the main content is loaded and visible
      await expect(page.locator('main')).toBeVisible({ timeout: 10000 });

      // Robust scroll to bottom to trigger all lazy-loaded content
      await page.evaluate(async () => {
        const scrollable = document.querySelector('main') || document.documentElement;
        let lastHeight = scrollable.scrollHeight;
        while (true) {
          scrollable.scrollTo(0, scrollable.scrollHeight);
          await new Promise(r => setTimeout(r, 200));
          const newHeight = scrollable.scrollHeight;
          if (newHeight === lastHeight) break;
          lastHeight = newHeight;
        }
        scrollable.scrollTo(0, 0);
        await new Promise(r => setTimeout(r, 200));
      });

      // Use clip to ensure we capture exactly the height expected in the snapshot
      await expect(page).toHaveScreenshot(`${route.name}.png`, {
        fullPage: false,
        maxDiffPixelRatio: 0.05,
        animations: 'disabled',
        clip: { x: 0, y: 0, width: 1280, height: route.height }
      });
    });
  }
});

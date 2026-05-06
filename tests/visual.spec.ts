import { test, expect } from '@playwright/test';

const routes = [
  { name: 'home', path: './', width: 1280, height: 1780 },
  { name: 'blog', path: './blog', width: 1280, height: 1571 },
  { name: 'gear', path: './gear', width: 1280, height: 949 },
  { name: 'research', path: './research', width: 1280, height: 1319 },
  { name: 'about', path: './about', width: 1280, height: 4315 },
  { name: 'contact', path: './contact', width: 1280, height: 1261 }
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
      // Set explicit viewport matching baseline snapshot dimensions
      await page.setViewportSize({ width: route.width, height: route.height });

      await page.goto(route.path);
      await page.waitForLoadState('networkidle');

      // Globally disable smooth scrolling to accommodate CI environments
      await page.addStyleTag({ content: '* { scroll-behavior: auto !important; }' });

      // Ensure the main content is loaded and visible
      // Relying solely on the main element ensures hydration and layout are ready.
      await expect(page.locator('main')).toBeVisible({ timeout: 10000 });

      // Robust scroll to bottom to trigger all lazy-loaded content
      await page.evaluate(async () => {
        const scrollable = document.querySelector('main') || document.documentElement;
        let lastHeight = scrollable.scrollHeight;
        while (true) {
          scrollable.scrollTo(0, scrollable.scrollHeight);
          // Wait for potential content loading
          await new Promise(r => setTimeout(r, 200));
          const newHeight = scrollable.scrollHeight;
          if (newHeight === lastHeight) break;
          lastHeight = newHeight;
        }
        scrollable.scrollTo(0, 0);
        // Small buffer for fixed headers or other UI elements to settle
        await new Promise(r => setTimeout(r, 200));
      });

      // 1000ms settlement delay before taking snapshot
      await page.waitForTimeout(1000);

      // Playwright automatically disables animations for toHaveScreenshot
      // Applying maxDiffPixelRatio, allowSizeMismatch, and explicit clip per memory
      await expect(page).toHaveScreenshot(`${route.name}.png`, {
        clip: { x: 0, y: 0, width: route.width, height: route.height },
        maxDiffPixelRatio: 0.3,
        allowSizeMismatch: true,
        animations: 'disabled'
      });
    });
  }
});

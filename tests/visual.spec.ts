import { test, expect } from '@playwright/test';

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
    // Mock system time for consistent date rendering (e.g., in Lab tools)
    await page.clock.setFixedTime(new Date('2026-05-08T12:00:00Z'));

    // Enable reduced motion to stop particle animations and other non-deterministic UI
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // Ensure newsletter banner doesn't interfere with visual tests
    await page.addInitScript(() => {
      window.sessionStorage.setItem('td-newsletter-dismissed', 'true');
    });
  });

  for (const route of routes) {
    test(`visual comparison for ${route.name}`, async ({ page }) => {
      await page.goto(route.path);
      await page.waitForLoadState('networkidle');

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

      // Use a strict 2% threshold to catch unintended UI regressions
      // Playwright automatically disables animations for toHaveScreenshot
      await expect(page).toHaveScreenshot(`${route.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.02,
        animations: 'disabled'
      });
    });
  }
});

import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['iPhone 12'] });

test.describe('Mobile Layout & Navigation', () => {
  test('should show persistent bottom navigation', async ({ page }) => {
    // Navigate to the base path - using relative path to handle VITE_BASE_PATH
    await page.goto('./');

    // Bottom nav should be visible on mobile
    const bottomNav = page.locator('nav[aria-label="Mobile Bottom Navigation"]');
    await expect(bottomNav).toBeVisible();

    // Primary links should be present
    await expect(bottomNav.getByRole('link', { name: /Home/i })).toBeVisible();
    await expect(bottomNav.getByRole('link', { name: /Blog/i })).toBeVisible();
  });

  test('should have sticky FilterBar on mobile scroll', async ({ page }) => {
    // Navigate to Blog page
    await page.goto('./blog');

    // FilterBar should be visible initially
    const filterBar = page.locator('.sticky').filter({ hasText: /Posts/i });
    await expect(filterBar.first()).toBeVisible();

    // Scroll down significantly
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.wait_for_timeout(500);

    // FilterBar should still be visible due to sticky positioning
    await expect(filterBar.first()).toBeVisible();

    // Check its position - it should be at the top offset (16/64px)
    const box = await filterBar.first().boundingBox();
    if (box) {
      // It should be near the top of the viewport
      expect(box.y).toBeLessThanOrEqual(100);
    }
  });

  test('should support swipe-to-navigate gestures', async ({ page }) => {
    await page.goto('./');
    await page.wait_for_timeout(1000);

    // Initial check: on Home
    const initialUrl = page.url();

    // Simulate a swipe left to go to next page (Blog)
    // Using mouse drag to simulate touch swipe
    const viewport = page.viewportSize();
    if (viewport) {
      await page.mouse.move(viewport.width * 0.8, viewport.height / 2);
      await page.mouse.down();
      await page.mouse.move(viewport.width * 0.2, viewport.height / 2, { steps: 10 });
      await page.mouse.up();

      await page.wait_for_timeout(1000);
      expect(page.url()).not.toBe(initialUrl);
      expect(page.url()).toContain('/blog');
    }
  });
});

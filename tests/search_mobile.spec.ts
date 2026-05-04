import { test, expect } from '@playwright/test';

test.describe('Global Search Modal - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('./');
    await page.waitForLoadState('networkidle');
  });

  test('should open search modal via shortcut on mobile', async ({ page }) => {
    await page.keyboard.press('Meta+k');
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).toBeVisible();
  });
});

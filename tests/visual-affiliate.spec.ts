import { test, expect } from '@playwright/test';

test.describe('Affiliate Disclosure Spacing', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should have proper spacing on toolbox page', async ({ page }) => {
    await page.goto('/gear');

    const disclosure = page.locator('text=As an Amazon Associate').first();
    await expect(disclosure).toBeVisible();

    const box = await disclosure.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeGreaterThan(50);
  });
});

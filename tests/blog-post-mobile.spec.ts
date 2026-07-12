import { test, expect } from './fixtures/visual';

test('visual comparison for event-travel-packing mobile', async ({ page }) => {
  await page.goto('./blog/2026-06-01-event-travel-packing');
  await expect(page.locator('main')).toBeVisible({ timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot('event-travel-packing-mobile.png', {
    fullPage: true,
    allowSizeMismatch: true,
    animations: 'disabled',
  });
});

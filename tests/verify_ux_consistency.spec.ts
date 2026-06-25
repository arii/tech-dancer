import { test, expect } from './fixtures/visual';
import { getVisualTestMasks } from './utils/playwright-helpers';

test('verify homepage visual consistency', async ({ page }) => {
  await page.goto('./');
  await page.waitForLoadState('networkidle');

  await expect(page.locator('h1')).toContainText(/Look good/i);

  await expect(page).toHaveScreenshot('homepage-v2.png', {
    fullPage: true,
    mask: getVisualTestMasks(page)
  });
});

test('verify guide visual consistency', async ({ page }) => {
  await page.goto('./blog/2026-04-19-practical-tools-essentials');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/.*2026-04-19-practical-tools-essentials/);
  await expect(page.getByRole('heading', { name: /The WCS Travel Pack/i })).toBeVisible();

  await expect(page).toHaveScreenshot('detail-page-v2.png', {
    fullPage: true,
    mask: getVisualTestMasks(page)
  });
});

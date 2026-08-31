import { test, expect } from './fixtures/visual';
import { getVisualTestMasks, scrollToSettle } from './utils/playwright-helpers';

const GUIDE_URL = './blog/2026-04-19-practical-tools-essentials';

test('verify guide visual consistency', async ({ page }) => {
  await page.goto(GUIDE_URL);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(new RegExp(`.*${GUIDE_URL.replace('./', '')}`));
  await expect(page.getByRole('heading', { name: /The WCS Travel Pack/i })).toBeVisible();

  await scrollToSettle(page);

  await expect(page).toHaveScreenshot('detail-page-v2.png', {
    fullPage: true,
    allowSizeMismatch: true,
    animations: 'disabled',
    scale: 'css',
    maxDiffPixelRatio: 0.10,
    mask: getVisualTestMasks(page)
  });
});

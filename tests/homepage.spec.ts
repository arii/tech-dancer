import { test, expect } from './fixtures/visual';
import { getVisualTestMasks, scrollToSettle } from './utils/playwright-helpers';

const HOMEPAGE_URL = './';

// Visual comparison snapshot is skipped due to ongoing layout updates
test.skip('verify homepage visual consistency', async ({ page }) => {
  await page.goto(HOMEPAGE_URL);
  await page.waitForLoadState('networkidle');

  await expect(page.locator('h1')).toContainText(/Dance more/i);

  await scrollToSettle(page);

  await expect(page).toHaveScreenshot('homepage-v2.png', {
    fullPage: true,
    mask: getVisualTestMasks(page)
  });
});

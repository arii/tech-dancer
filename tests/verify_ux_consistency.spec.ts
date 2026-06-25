import { test, expect } from './fixtures/visual';
import { getVisualTestMasks } from './utils/playwright-helpers';

test('verify homepage and guide visual consistency', async ({ page, isMobile }) => {
  // 1. Homepage Mobile
  if (isMobile) {
    await page.setViewportSize({ width: 375, height: 812 });
  }
  await page.goto('./');
  const homeUrl = page.url();
  await page.waitForLoadState('networkidle');

  // On mobile, the FeaturedGuidePanel is hidden (display: none for base)
  // Just wait for the hero section to be stable
  await expect(page.locator('h1')).toContainText(/Look good/i);

  const screenshotOptions = {
    fullPage: true,
    mask: getVisualTestMasks(page)
  };

  if (isMobile) {
    await expect(page).toHaveScreenshot('homepage_mobile_v2.png', screenshotOptions);
  } else {
    await expect(page).toHaveScreenshot('homepage_desktop_v2.png', screenshotOptions);
  }

  // 2. WCS Travel Pack Guide
  const guideUrl = new URL('blog/2026-04-19-practical-tools-essentials', homeUrl).toString();
  await page.goto(guideUrl);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/.*2026-04-19-practical-tools-essentials/);
  await expect(page.getByRole('heading', { name: /The WCS Travel Pack/i })).toBeVisible();

  if (isMobile) {
    await expect(page).toHaveScreenshot('detail_page_mobile_v2.png', screenshotOptions);
  } else {
    await expect(page).toHaveScreenshot('detail_page_desktop_v2.png', screenshotOptions);
  }
});

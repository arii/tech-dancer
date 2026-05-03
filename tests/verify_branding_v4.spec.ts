import { test, expect } from '@playwright/test';

test('verify branding v4 desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  // Wait for the logo to be visible in the navigation (using first() to avoid strict mode violation if multiple exist)
  const logo = page.locator('nav svg').filter({ hasText: 'BoomTick Logo' }).first();
  await expect(logo).toBeVisible();

  // Take screenshot of the header
  await page.screenshot({
    path: '/home/jules/verification/screenshots/branding_v4_desktop.png',
    clip: { x: 0, y: 0, width: 1440, height: 80 }
  });

  // Verify footer branding
  const footerIcon = page.locator('footer svg').filter({ hasText: 'BoomTick Icon' });
  await expect(footerIcon).toBeVisible();

  await page.screenshot({
    path: '/home/jules/verification/screenshots/branding_v4_footer.png',
    fullPage: false,
    clip: { x: 0, y: 800, width: 1440, height: 100 }
  });
});

test('verify branding v4 mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');

  // On mobile, it might be in a header or nav. Let's be more generic but specific enough.
  const mobileLogo = page.getByLabel('BoomTick Logo').first();
  await expect(mobileLogo).toBeVisible();

  await page.screenshot({
    path: '/home/jules/verification/screenshots/branding_v4_mobile.png',
    clip: { x: 0, y: 0, width: 375, height: 60 }
  });
});

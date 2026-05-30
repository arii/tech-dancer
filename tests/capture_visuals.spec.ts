import { test, expect } from '@playwright/test';

test('capture screenshots', async ({ page }) => {
  await page.goto('http://localhost:3000/blog/2026-04-19-wcs-travel-pack');
  await page.waitForLoadState('networkidle');
  // Wait a bit more for images to load
  await page.waitForTimeout(2000);

  await page.setViewportSize({ width: 1280, height: 720 });
  await page.screenshot({ path: '/app/verification/screenshots/detail-desktop-v3.png' });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: '/app/verification/screenshots/detail-mobile-v3.png' });

  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  await page.setViewportSize({ width: 1280, height: 720 });
  await page.screenshot({ path: '/app/verification/screenshots/home-desktop-v3.png' });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: '/app/verification/screenshots/home-mobile-v3.png' });
});

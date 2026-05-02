import { test, expect } from '@playwright/test';

test('verify final branding across devices', async ({ page }) => {
  // Set viewport to desktop
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('http://localhost:3000');

  // Wait for logo to be visible in sidebar
  await expect(page.locator('nav >> svg').first()).toBeVisible();

  // Take desktop screenshot
  await page.screenshot({ path: 'verification/final_desktop.png' });

  // Mobile check
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('http://localhost:3000');

  // Header logo on mobile
  await expect(page.locator('header >> svg').first()).toBeVisible();

  // Take mobile screenshot
  await page.screenshot({ path: 'verification/final_mobile.png' });
});

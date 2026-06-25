import { test } from '@playwright/test';

test('verify mobile layout', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/blog/2026-04-18-halloween-costumes');
  // Wait for the grid to be visible
  await page.waitForSelector('.prose-counters');
  await page.screenshot({ path: 'mobile_verify.png' });
});

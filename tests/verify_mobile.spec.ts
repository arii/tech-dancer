import { test, expect } from '@playwright/test';

test('verify mobile layout', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/blog/2026-04-18-halloween-costumes');
  // Wait for the grid to be visible
  await page.waitForSelector('div[style*="grid-template-columns: repeat(1, minmax(0px, 1fr))"]');
  await page.screenshot({ path: 'mobile_verify.png' });
});

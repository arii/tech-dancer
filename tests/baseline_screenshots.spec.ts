import { test } from '@playwright/test';

test('capture baseline blog post screenshots', async ({ page, baseURL }) => {
  const url = `${baseURL}blog/2026-04-18-halloween-costumes`;

  // Desktop
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(url);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'baseline_desktop.png', fullPage: true });

  // Mobile
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto(url);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'baseline_mobile.png', fullPage: true });
});

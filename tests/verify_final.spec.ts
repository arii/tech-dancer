import { test, expect } from '@playwright/test';

test('capture home redesign final', async ({ page }) => {
  await page.goto('http://localhost:4173/tech-dancer/');
  await page.waitForLoadState('networkidle');

  // Set viewport to a common desktop size to verify 3-column layout
  await page.setViewportSize({ width: 1440, height: 900 });

  // Give it a moment for any animations to settle
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'home_redesign_final.png', fullPage: true });
});

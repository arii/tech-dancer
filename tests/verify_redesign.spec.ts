import { test, expect } from '@playwright/test';

test('capture redesign', async ({ page }) => {
  await page.goto('http://localhost:4174/tech-dancer/');
  await page.waitForLoadState('networkidle');

  // Full page screenshot to see everything
  await page.screenshot({ path: 'final_verify_full.png', fullPage: true });
});

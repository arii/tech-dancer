
import { test, expect } from '@playwright/test';

test('simple test', async ({ page }) => {
  await page.goto('http://localhost:4173/about');
  await page.screenshot({ path: '/home/jules/verification/simple_about.png' });
});

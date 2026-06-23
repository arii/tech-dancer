import { test } from '@playwright/test';

test('capture logo screenshots', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/home-v2.png', fullPage: true });

  await page.goto('/research');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/research-v2.png', fullPage: true });
});

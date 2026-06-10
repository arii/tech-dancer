import { test, expect } from '@playwright/test';

test('check for console errors on /events', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => {
    errors.push(err.message);
  });

  // The playwright config sets baseURL correctly using VITE_BASE_PATH
  // We can just use relative navigation which will automatically append to baseURL
  await page.goto('./events'); await page.waitForLoadState('networkidle');
  // Wait a bit for the app to load
  await page.waitForTimeout(2000);

  console.log('Console errors:', errors);

  const mainVisible = await page.locator('main').isVisible();
  console.log('Main visible:', mainVisible);

  if (errors.length > 0) {
    console.log('First error stack:', errors[0]);
  }

  expect(errors).toHaveLength(0);
});

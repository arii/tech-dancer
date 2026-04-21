import { test, expect } from '@playwright/test';

test('app should load without global console errors', async ({ page }) => {
  const errors: string[] = [];

  page.on('pageerror', (err) => errors.push(`Page Error: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (text.includes('Hydration failed') || text.includes('ReferenceError') || text.includes('Buffer')) {
        errors.push(`Console Error: ${text}`);
      }
    }
  });

  await page.goto('/');

  // Verify core app structure and content
  await expect(page.locator('#root')).toBeVisible({ timeout: 15000 });
  await expect(page.getByText(/The Roboticist's Guide to the West Coast Swing/i)).toBeVisible();
  await expect(page.locator('nav').filter({ visible: true }).first()).toBeVisible();

  expect(errors, `Detected critical errors:\n${errors.join('\n')}`).toHaveLength(0);
});

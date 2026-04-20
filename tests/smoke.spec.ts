import { test, expect } from '@playwright/test';

test('app should load without global console errors', async ({ page }) => {
  const errors: Error[] = [];
  page.on('pageerror', (err) => errors.push(err));

  await page.goto('/');

  // Verify core app structure and content
  await expect(page.locator('#root')).toBeVisible({ timeout: 15000 });

  // Check for the main headline
  await expect(page.getByText(/The Roboticist's Guide to the West Coast Swing/i)).toBeVisible();

  // Ensure navigation is visible (indicates successful React mount)
  await expect(page.locator('nav').filter({ visible: true }).first()).toBeVisible();

  expect(errors).toHaveLength(0);
});

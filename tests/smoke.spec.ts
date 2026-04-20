import { test, expect } from '@playwright/test';

/**
 * Smoke Test: Verifies that the app loads without fatal JS errors or blank pages.
 */
test('app should load without global console errors', async ({ page }) => {
  const errors: Error[] = [];
  page.on('pageerror', (err) => errors.push(err));

  await page.goto('/');

  // Ensure root container is visible
  await expect(page.locator('#root')).toBeVisible({ timeout: 15000 });

  // Ensure navigation is visible (indicates successful React mount)
  await expect(page.locator('nav').filter({ visible: true }).first()).toBeVisible();

  // Fail if any uncaught exceptions were detected
  expect(errors).toHaveLength(0);
});

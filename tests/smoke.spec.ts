import { test, expect } from '@playwright/test';

/**
 * Smoke Test: Verifies that the app loads without fatal JavaScript errors.
 * This specifically targets the "Buffer is not defined" and "ReferenceError"
 * failures that result in a blank white page.
 */
test('app should load without global console errors', async ({ page }) => {
  const runtimeErrors: string[] = [];

  // Catch uncaught exceptions
  page.on('pageerror', (exception) => {
    runtimeErrors.push(`Uncaught Exception: ${exception.message}`);
  });

  // Catch console errors (ReferenceError, etc)
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // We focus on errors that break the app execution
      if (text.includes('ReferenceError') || text.includes('Buffer') || text.includes('not defined')) {
        runtimeErrors.push(`Console Error: ${text}`);
      }
    }
  });

  // Navigate to the root path
  await page.goto('/');

  // Check if the root container actually renders content
  const root = page.locator('#root');
  await expect(root).toBeVisible({ timeout: 15000 });

  // Check for a known UI element to ensure the react tree mounted
  // Adjust this to an element present in your Navigation component
  // We look for a visible navigation element (mobile or desktop)
  const nav = page.locator('nav').filter({ visible: true }).first();
  await expect(nav).toBeVisible();

  // Fail if any critical errors were detected during the load
  if (runtimeErrors.length > 0) {
    throw new Error(
      `Smoke test failed! The app likely loaded a white page. Errors detected:\n${runtimeErrors.join('\n')}`
    );
  }
});

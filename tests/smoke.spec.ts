import { test, expect } from '@playwright/test';

test('landing page should load without console errors', async ({ page }) => {
  const errors: string[] = [];
  const failedResources: string[] = [];

  // Monitor for console errors (like JS execution crashes)
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  // Monitor for page-level errors
  page.on('pageerror', (err) => {
    errors.push(`Page Error: ${err.message}`);
  });

  // Monitor for 404s (the specific error you encountered)
  page.on('requestfailed', (request) => {
    const url = request.url();
    const failure = request.failure();
    failedResources.push(`${url}: ${failure?.errorText || 'Unknown error'}`);
  });

  // Navigate to the base path
  await page.goto('./');

  // Verify the main heading or a specific element exists
  await expect(page.locator('#root')).toBeVisible({ timeout: 15000 });
  await expect(page.getByText(/The Roboticist's Guide to the West Coast Swing/i)).toBeVisible();

  // Assert that no 404s or console errors occurred
  expect(failedResources, `Failed to load resources: ${failedResources.join(', ')}`).toHaveLength(0);
  expect(errors, `Console errors detected: ${errors.join(', ')}`).toHaveLength(0);
});

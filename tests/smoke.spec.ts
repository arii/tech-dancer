import { test, expect } from '@playwright/test';

test('landing page should load without console errors or 404s', async ({ page }) => {
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

  // Monitor for 4xx/5xx responses (the specific error you encountered)
  page.on('response', (response) => {
    const status = response.status();
    if (status >= 400) {
      failedResources.push(`${response.url()}: HTTP ${status}`);
    }
  });

  // Monitor for network failures (DNS, aborted, etc)
  page.on('requestfailed', (request) => {
    const url = request.url();
    const failure = request.failure();
    failedResources.push(`${url}: ${failure?.errorText || 'Unknown error'}`);
  });

  // Navigate to the base path
  await page.goto('./');

  // Verify the main heading or a specific element exists
  // We use body because #root might be empty before React hydrates, or Framer Motion
  // animations might make it difficult for playwright to detect #root visibility natively right away
  await expect(page.locator('body')).toBeVisible({ timeout: 15000 });

  // Wait for the app shell to fully mount and network idle to catch slow errors
  await expect(page.locator('main')).toBeVisible({ timeout: 5000 });
  await page.waitForLoadState('networkidle');

  // Assert that no 404s or console errors occurred
  expect(failedResources, `Failed to load resources:\n${failedResources.join('\n')}`).toHaveLength(0);
  expect(errors, `Console errors detected:\n${errors.join('\n')}`).toHaveLength(0);
});

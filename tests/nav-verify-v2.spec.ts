import { test, expect } from '@playwright/test';

test('navigation bar does not contain ignore comments as text', async ({ page }) => {
  await page.goto('/');
  // Wait for the navigation to be visible
  const nav = page.locator('nav[aria-label="Main Navigation"]');
  await expect(nav).toBeVisible();

  // Check the text content of the nav to ensure it doesn't contain the ignore string
  const text = await nav.textContent();
  expect(text).not.toContain('impeccable-ignore');

  // Capture a screenshot of the header
  await page.setViewportSize({ width: 1440, height: 900 });
  await nav.screenshot({ path: '/home/jules/verification/screenshots/desktop_header_fixed.png' });
});

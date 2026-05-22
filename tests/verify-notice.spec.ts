import { test, expect } from '@playwright/test';

test('Notice component renders correctly in competition metrics blog post', async ({ page }) => {
  await page.goto('/blog/2026-04-18-competition-metrics');

  // Check if the Notice component is rendered
  const notice = page.locator('div:has-text("Lab Notes: Data Science")').first();
  await expect(notice).toBeVisible();

  // Verify it's not raw markup
  const rawMarkup = page.locator('text="<Notice"');
  await expect(rawMarkup).not.toBeVisible();

  // Take a screenshot for verification
  await page.screenshot({ path: 'tests/screenshots/notice-component.png' });
});

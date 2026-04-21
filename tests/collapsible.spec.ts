import { test, expect } from '@playwright/test';

test('blog page should have collapsible header', async ({ page }) => {
  await page.goto('./blog');

  // Check if details and summary exist
  const details = page.locator('details.group');
  await expect(details).toBeVisible();

  const summary = page.locator('summary');
  await expect(summary).toBeVisible();

  // Check if it's open by default
  await expect(details).toHaveAttribute('open', '');

  // Click summary to close
  await summary.click();
  await expect(details).not.toHaveAttribute('open', '');

  // Click summary to open
  await summary.click();
  await expect(details).toHaveAttribute('open', '');
});

test('gear reviews page should have collapsible header', async ({ page }) => {
  await page.goto('./gear');

  // Check if details and summary exist
  const details = page.locator('details.group');
  await expect(details).toBeVisible();

  const summary = page.locator('summary');
  await expect(summary).toBeVisible();

  // Check if it's open by default
  await expect(details).toHaveAttribute('open', '');

  // Click summary to close
  await summary.click();
  await expect(details).not.toHaveAttribute('open', '');
});

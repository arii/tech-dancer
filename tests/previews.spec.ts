import { test, expect } from '@playwright/test';

test.describe('Preview Dashboard', () => {
  test('should load the dashboard and show initial elements', async ({ page }) => {
    // Navigate to the preview dashboard
    await page.goto('/previews/index.html');

    // Check title
    await expect(page).toHaveTitle(/Preview Environments/);

    // Check main heading
    await expect(page.locator('h1')).toContainText('Preview Environments');

    // Check for essential UI components
    await expect(page.locator('#search')).toBeVisible();
    await expect(page.locator('#status-filter')).toBeVisible();
    await expect(page.locator('#show-automated')).toBeVisible();

    // Check stats cards are present (even if empty initially)
    await expect(page.locator('#stat-prs')).toBeVisible();
    await expect(page.locator('#stat-active')).toBeVisible();
  });

  test('responsive layout check', async ({ page }) => {
    await page.goto('/previews/index.html');

    // Desktop view
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('h1')).toBeVisible();

    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toBeVisible();

    // Header buttons should be visible and smaller on mobile
    const trackingLink = page.locator('#tracking-link');
    await expect(trackingLink).toBeVisible();

    // Stats grid should handle mobile
    const statsGrid = page.locator('.grid-cols-2');
    await expect(statsGrid).toBeVisible();
  });
});

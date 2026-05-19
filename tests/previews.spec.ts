import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

async function gotoPreviewDashboard(page: Page) {
  const baseURL = page.context()._options.baseURL || 'http://localhost:4173/';
  // We resolve the previews path against the baseURL which includes the necessary VITE_BASE_PATH
  const targetUrl = new URL('previews/index.html', baseURL).href;
  await page.goto(targetUrl);
}

test.describe('Preview Dashboard', () => {
  test('should load the dashboard and show initial elements', async ({ page }) => {
    await gotoPreviewDashboard(page);

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
    await gotoPreviewDashboard(page);

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

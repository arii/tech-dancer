import { test, expect } from '@playwright/test';

test.describe('Preview Dashboard', () => {
  test('should load the dashboard and show initial elements', async ({ page }) => {
    // The previews dashboard is a static site independent of the React router.
    // It exists at the root of the server, not nested under the BASE_PATH like the main app.
    // We construct an absolute URL to avoid Playwright prepending the baseURL (which includes /tech-dancer/)
    const host = new URL(page.context()._options.baseURL || 'http://localhost:4173').origin;
    await page.goto(`${host}/previews/index.html`);
    await page.waitForLoadState('networkidle');

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
    const host = new URL(page.context()._options.baseURL || 'http://localhost:4173').origin;
    await page.goto(`${host}/previews/index.html`);
    await page.waitForLoadState('networkidle');

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

import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('main')).toBeVisible();
  });

  test('should display desktop navigation top links', async ({ page }) => {
    // Only looking at desktop links
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
    await expect(nav.locator('a[href="/events"]')).toBeVisible();
    await expect(nav.locator('a[href="/gear"]')).toBeVisible();
    await expect(nav.locator('a[href="/blog"]')).toBeVisible();
  });

  test('should open global search modal via CMD+K button', async ({ page }) => {
    const searchBtn = page.getByRole('button', { name: 'Open search' });
    // Make sure we click the desktop search button
    await searchBtn.first().click();
    await expect(page.locator('text="Global Search"').first()).toBeVisible();
  });

  test('should toggle mobile menu overlay', async ({ page }) => {
    // Resize to mobile viewport to interact with the mobile menu button
    await page.setViewportSize({ width: 375, height: 667 });

    const menuBtn = page.getByRole('button', { name: 'Open menu' });
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();

    const closeBtn = page.getByRole('button', { name: 'Close menu' });
    await expect(closeBtn).toBeVisible();

    // Close it
    await closeBtn.click();
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();
  });
});

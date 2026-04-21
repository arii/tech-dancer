import { test, expect } from '@playwright/test';

test.describe('Global Search Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open and close search modal via button', async ({ page }) => {
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).not.toBeVisible();
  });

  test('should close search modal when clicking on backdrop', async ({ page }) => {
    await page.getByRole('button', { name: 'Search' }).click();
    const searchInput = page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR');
    await expect(searchInput).toBeVisible();

    // Use dispatchEvent to simulate a click directly on the backdrop
    const backdrop = page.locator('div.bg-accent\\/40.backdrop-blur-md');
    await backdrop.dispatchEvent('click');
    await expect(searchInput).not.toBeVisible();
  });

  test('should close search modal on route change', async ({ page }) => {
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).toBeVisible();

    // Navigate to another page via sidebar
    await page.getByRole('link', { name: 'Gear' }).click();
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).not.toBeVisible();
    await expect(page).toHaveURL(/.*gear/);
  });

  test('should close search modal when a search result is clicked', async ({ page }) => {
    await page.getByRole('button', { name: 'Search' }).click();
    const input = page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR');
    await input.fill('dancer');

    // Wait for results to appear
    const result = page.getByRole('button').filter({ hasText: 'DANCER' }).first();
    await expect(result).toBeVisible();

    await result.click();
    await expect(page.getByPlaceholder('SEARCH REPOSITORY // FILTER BLOG & GEAR')).not.toBeVisible();
  });
});

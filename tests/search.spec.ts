import { test, expect } from '@playwright/test';

test.describe('Search and Filter URL Persistence', () => {

  test('Global Search parameter should persist after reload', async ({ page }) => {
    await page.goto('./');

    // Open search by clicking navigation button
    const searchButton = page.locator('button').filter({ has: page.locator('svg.lucide-search') }).first();
    await searchButton.click();

    const searchInput = page.getByPlaceholder(/SEARCH REPOSITORY/i);
    await expect(searchInput).toBeVisible();

    await searchInput.fill('swing');

    // Check URL
    await expect(page).toHaveURL(/q=swing/);

    // Reload
    await page.reload();

    // Open search again to verify persistence
    const searchButtonReload = page.locator('button').filter({ has: page.locator('svg.lucide-search') }).first();
    await searchButtonReload.click();

    await expect(page.getByPlaceholder(/SEARCH REPOSITORY/i)).toHaveValue('swing');
    await expect(page.getByText(/RESULTS FOUND/i)).not.toHaveText('0 RESULTS FOUND');
  });

  test('Blog category filter should persist after reload', async ({ page }) => {
    await page.goto('./blog');

    // Use "Tech" category
    const categoryButton = page.getByRole('button', { name: 'Tech', exact: true });
    await categoryButton.click();

    // Check URL
    await expect(page).toHaveURL(/category=Tech/);

    // Reload
    await page.reload();

    // Verify the button is still active (has the accent class)
    await expect(page.getByRole('button', { name: 'Tech', exact: true })).toHaveClass(/bg-accent/);
  });

  test('Blog search term should persist after reload', async ({ page }) => {
    await page.goto('./blog');

    const searchInput = page.getByPlaceholder(/Search articles, guides, or gear/i);
    await searchInput.fill('west');

    // Check URL
    await expect(page).toHaveURL(/search=west/i);

    // Reload
    await page.reload();

    await expect(page.getByPlaceholder(/Search articles, guides, or gear/i)).toHaveValue('west');
  });

  test('Gear search term should persist after reload', async ({ page }) => {
    await page.goto('./gear');

    const searchInput = page.getByPlaceholder(/Search gear/i);
    await searchInput.fill('shoes');

    // Check URL
    await expect(page).toHaveURL(/search=shoes/i);

    // Reload
    await page.reload();

    await expect(page.getByPlaceholder(/Search gear/i)).toHaveValue('shoes');
  });
});

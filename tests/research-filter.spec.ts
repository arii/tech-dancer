import { test, expect } from '@playwright/test';

test.describe('Research Page Filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./research');
  });

  test('should display research tools', async ({ page }) => {
    // Check for any flagship tool which should be visible initially
    const tool = page.locator('text=Flagship').first();
    await expect(tool).toBeVisible();
  });

  test('should filter by category and update URL', async ({ page }) => {
    const aiFilter = page.getByRole('button', { name: 'AI', exact: true });
    await aiFilter.click();

    await expect(page).toHaveURL(/category=AI/);

    // Check that at least one tool is visible
    const tools = page.locator('text=Active');
    expect(await tools.count()).toBeGreaterThan(0);
  });

  test('should show research collections and navigate', async ({ page }) => {
    const collection = page.getByRole('button', { name: /AI Engineering/i });
    await expect(collection).toBeVisible();
    await collection.click();
    await expect(page).toHaveURL(/category=AI/);
  });
});

import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['Pixel 7'] });

test.describe('Global Search Modal - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
  });

  test('should open search modal via mobile menu', async ({ page }) => {
    // Open mobile menu
    await page.getByRole('button', { name: 'Open menu' }).click();

    // Check if the menu is actually visible
    await expect(page.getByRole('dialog', { name: 'Navigation menu' })).toBeVisible();

    // Use text selector to find "Search" button
    const searchButton = page.getByRole('button', { name: 'Search' });
    await searchButton.click();

    // Modal should be visible
    await expect(page.getByPlaceholder('Search BoomTick guides, gear, and posts')).toBeVisible();
  });
});

for (const viewport of [{ width: 390, height: 844 }, { width: 360, height: 740 }, { width: 844, height: 390 }]) {
  test.describe(`Mobile menu keyboard at ${viewport.width}x${viewport.height}`, () => {
    test.use({ viewport });

    for (const dismiss of ['Escape', 'Close menu']) {
      test(`${dismiss} dismisses the menu and restores its opener`, async ({ page }) => {
        await page.goto('./blog');
        const toggle = page.getByRole('button', { name: 'Open menu' });
        await toggle.click();
        const menu = page.getByRole('dialog', { name: 'Navigation menu' });
        await expect(menu.getByRole('button', { name: 'Search' })).toBeFocused();
        if (dismiss === 'Escape') await page.keyboard.press('Escape');
        else await page.getByRole('button', { name: 'Close menu' }).click();
        await expect(menu).not.toBeAttached();
        await expect(toggle).toBeFocused();
        await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      });
    }

    test('menu exit does not steal focus from search', async ({ page }) => {
      await page.goto('./blog?q=travel&modal=false');
      await page.getByRole('button', { name: 'Open menu' }).click();
      const menu = page.getByRole('dialog', { name: 'Navigation menu' });
      await menu.getByRole('button', { name: 'Search' }).click();
      const input = page.getByPlaceholder('Search BoomTick guides, gear, and posts');
      await expect(input).toBeFocused();
      const results = page.getByTestId('search-result');
      await expect(results.first()).toBeVisible();
      await expect(menu).not.toBeAttached();
      await expect(input).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(results.last()).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(input).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByLabel('Close search')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(results.first()).toBeFocused();
      await page.keyboard.press('Escape');
      await expect(page.getByTestId('search-dialog')).not.toBeAttached();
      await page.getByRole('button', { name: 'Open menu' }).click();
      await expect(menu).toBeVisible();
    });
  });
}

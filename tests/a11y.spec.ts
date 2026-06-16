import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('accessibility', () => {
  test.beforeEach(async ({ page }) => {
     await page.goto('./');
     await expect(page.locator('main')).toBeVisible();
  });

  test('homepage should not have any automatically detectable accessibility issues', async ({ page }) => {
    // Wait for hero animations to complete to ensure stable contrast checks
    await page.waitForTimeout(5000);

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('search modal should not have any automatically detectable accessibility issues', async ({ page }) => {
    // Open search modal
    await page.keyboard.press('Control+k');
    await expect(page.getByPlaceholder('Search BoomTick insights and posts')).toBeVisible();
    await page.waitForTimeout(5000);

    const results = await new AxeBuilder({ page })
      .disableRules(['region', 'color-contrast'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('search modal should trap focus', async ({ page }) => {
    // Open search modal
    await page.keyboard.press('Control+k');
    const input = page.getByPlaceholder('Search BoomTick insights and posts');
    await expect(input).toBeVisible();
    await expect(input).toBeFocused();

    const closeButton = page.getByLabel('Close search');

    // Tab forward from input to close button
    await page.keyboard.press('Tab');
    await expect(closeButton).toBeFocused();

    // Tab forward from close button should wrap back to input (since there are no results yet)
    await page.keyboard.press('Tab');
    await expect(input).toBeFocused();

    // Shift+Tab should wrap to close button
    await page.keyboard.press('Shift+Tab');
    await expect(closeButton).toBeFocused();
  });
});

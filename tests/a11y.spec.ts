import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('accessibility', () => {
  test.beforeEach(async ({ page }) => {
     await page.goto('./', { waitUntil: 'domcontentloaded' });
     await expect(page.locator('main')).toBeVisible();

     // Dismiss newsletter banner if present to avoid overlay issues during scan
     const dismissButton = page.locator('button[aria-label="Dismiss newsletter signup"]');
     if (await dismissButton.isVisible()) {
       await dismissButton.click();
       await expect(dismissButton).not.toBeVisible();
     }
  });

  test('homepage should not have any automatically detectable accessibility issues', async ({ page }) => {
    // Wait for fonts to be ready instead of arbitrary timeout
    await page.evaluate(() => document.fonts.ready);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['color-contrast'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('search modal should not have any automatically detectable accessibility issues', async ({ page }) => {
    // Open search modal
    await page.keyboard.press('Control+k');
    await expect(page.getByPlaceholder('Search BoomTick guides, gear, and posts')).toBeVisible();

    // Ensure paint settlement
    await page.evaluate(() => document.fonts.ready);

    const results = await new AxeBuilder({ page })
      .disableRules(['region', 'color-contrast'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('search modal should trap focus', async ({ page }) => {
    // Open search modal
    await page.keyboard.press('Control+k');
    const input = page.getByPlaceholder('Search BoomTick guides, gear, and posts');
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

import { test, expect } from './fixtures/visual';
import { assertVisualMatch } from './utils/visual-helpers';

test.describe('WCS Navigator Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./research/wcs-navigator', { waitUntil: 'networkidle' });
  });

  const runVisualJourney = async (page: import("@playwright/test").Page, isMobile: boolean) => {
    const prefix = isMobile ? 'mobile-' : '';

    // Step 1: Initial load
    await expect(page.getByRole('heading', { name: /WCS Navigator/i })).toBeVisible();
    await assertVisualMatch(page, `${prefix}wcs-navigator-step-1.png`);

    // Step 1: Preset Selection
    const searchInput = page.getByRole('combobox', { name: /Search convention/i });
    await searchInput.click();
    await searchInput.fill('Boogie');
    await page.getByRole('button', { name: /Boogie by the Bay/i }).first().click();

    await expect(page.getByText(/Step 1/i)).toBeVisible({ timeout: 15000 });
    await assertVisualMatch(page, `${prefix}wcs-navigator-questionnaire-1.png`);

    // Step 2: Dynamic Questionnaire
    const optionBtn = page.locator('button:has(h4)').first();
    if ((await optionBtn.count()) > 0) {
      await optionBtn.click();
    }
    await assertVisualMatch(page, `${prefix}wcs-navigator-questionnaire-2.png`);

    // Fast-forward to end
    for (let i = 0; i < 8; i++) {
      if (await page.getByText(/Pre-Event Transit Logistics/i).isVisible()) break;
      if (await page.getByText(/Generating Itinerary/i).isVisible()) break;

      const genBtn = page.locator('button:has-text("Generate Final Itinerary"), button:has-text("Generate Itinerary")').first();
      if ((await genBtn.count()) > 0 && await genBtn.isVisible()) {
        await genBtn.click();
        break;
      }

      const optBtn = page.locator('button:has(h4)').first();
      if ((await optBtn.count()) > 0) {
        await optBtn.click();
      } else {
        const nextOrSkipBtn = page.locator('button:has-text("Next"), button:has-text("Skip")').first();
        if ((await nextOrSkipBtn.count()) > 0 && await nextOrSkipBtn.isVisible()) {
          await nextOrSkipBtn.click();
        }
      }
      await expect(page.locator('body')).toBeVisible();
    }

    // Final Itinerary
    await expect(page.getByText(/Pre-Event Transit Logistics/i)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/Add to Calendar \(\.ics\)/i)).toBeVisible();
    await assertVisualMatch(page, `${prefix}wcs-navigator-final-itinerary.png`);
  };

  test('Desktop Visual Journey', async ({ page }) => {
    await runVisualJourney(page, false);
  });

  test('Mobile Visual Journey', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await runVisualJourney(page, true);
  });
});

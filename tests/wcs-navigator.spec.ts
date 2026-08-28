import { test, expect } from './fixtures/visual';

test.describe('WCS Navigator E2E Workflow', () => {
  test('navigates through search hero, agent discovery, questionnaire, and calendar generation', async ({ page }) => {
    await page.goto('./research/wcs-navigator', { waitUntil: 'networkidle' });

    // 1. Initial Hero View
    await expect(page.getByRole('heading', { name: /WCS Navigator/i })).toBeVisible();

    // 2. Search Omnibox & Select Event Preset
    const searchInput = page.locator('input[type="text"]').first();
    await searchInput.click();
    await searchInput.fill('Boogie');
    await page.waitForTimeout(300);

    const boogieButton = page.getByRole('button', { name: /Boogie by the Bay/i }).first();
    await expect(boogieButton).toBeVisible();
    await boogieButton.click();

    // 3. Observe Discovery Transition & Answer Dynamic Questionnaire
    // Wait for questionnaire to appear (agent pre-scanning → Step 1)
    await expect(page.getByText(/Step 1/i)).toBeVisible({ timeout: 15000 });

    // Loop through all questionnaire steps (up to 8) — click first option each time,
    // break early when we hit the results dashboard.
    for (let i = 0; i < 8; i++) {
      // If results page already rendered, stop
      if (await page.getByText(/Pre-Event Transit Logistics/i).isVisible()) break;

      const optionBtn = page.locator('button:has(h4)').first();
      if (await optionBtn.count() === 0) break;
      await optionBtn.click();
      await page.waitForTimeout(600);
    }

    // 4. Results & Itinerary Dashboard
    await expect(page.getByText(/Pre-Event Transit Logistics/i)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/Add to Calendar \(\.ics\)/i)).toBeVisible();
    await expect(page.getByText(/Markdown \(\.md\)/i)).toBeVisible();

    // 5. Edit Questionnaire Breadcrumb
    const editButton = page.getByRole('button', { name: /Edit Questionnaire/i });
    await expect(editButton).toBeVisible();
    await editButton.click();

    // Back in Questionnaire
    await expect(page.getByText(/Step 1/i)).toBeVisible();
  });
});

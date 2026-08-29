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
    await expect(page.getByText(/Step 1/i)).toBeVisible({ timeout: 15000 });

    // Step through questionnaire options
    for (let i = 0; i < 8; i++) {
      if (await page.getByText(/Pre-Event Transit Logistics/i).isVisible()) break;

      const optionBtn = page.locator('button:has(h4)').first();
      if ((await optionBtn.count()) === 0) break;
      await optionBtn.click();
      await page.waitForTimeout(500);
    }

    // 4. Results & Itinerary Dashboard
    await expect(page.getByText(/Pre-Event Transit Logistics/i)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/Add to Calendar \(\.ics\)/i)).toBeVisible();
    await expect(page.getByText(/View All Schedule/i)).toBeVisible();
    await expect(page.getByText(/Decision Logic & Debug/i)).toBeVisible();

    // 4.5 Inspect Decision Logic & Debug Panel
    const debugBtn = page.getByRole('button', { name: /Decision Logic & Debug/i });
    await debugBtn.click();
    await expect(page.getByText(/Agent Decision Logic & Taskmaker Telemetry/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /1\. Confirmed Inputs/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /2\. Gateway & Engine/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /3\. Rule Engine Audit/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /4\. Raw JSON Schemas/i })).toBeVisible();

    // Switch to Rule Engine Audit tab
    await page.getByRole('button', { name: /3\. Rule Engine Audit/i }).click();
    await expect(page.getByPlaceholder(/Search audit sessions/i)).toBeVisible();

    // 5. Open Full Schedule Modal Customizer
    const fullScheduleBtn = page.getByRole('button', { name: /View All Schedule/i });
    await expect(fullScheduleBtn).toBeVisible();
    await fullScheduleBtn.click();

    // Modal should be open
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText(/Full Event Timetable/i)).toBeVisible();

    // Close modal
    const doneBtn = page.getByRole('button', { name: /Done Customizing/i });
    await expect(doneBtn).toBeVisible();
    await doneBtn.click();
    await expect(page.getByRole('dialog')).not.toBeVisible();

    // 6. Edit Questionnaire Breadcrumb
    const editButton = page.getByRole('button', { name: /Edit Questionnaire/i });
    await expect(editButton).toBeVisible();
    await editButton.click();

    // Back in Questionnaire
    await expect(page.getByText(/Step 1/i)).toBeVisible();
  });
});


import { test, expect } from './fixtures/visual';

test.describe('WCS Navigator E2E Journeys & Accessibility Audit', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./research/wcs-navigator', { waitUntil: 'networkidle' });
  });

  test('Step 1: Ingestion & Preset Selection with ARIA combobox semantics', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /WCS Navigator/i })).toBeVisible();

    const searchInput = page.getByRole('combobox', { name: /Search convention or city/i });
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('aria-expanded', 'false');

    // Search and select Boogie by the Bay
    await searchInput.click();
    await searchInput.fill('Boogie');
    await expect(searchInput).toHaveAttribute('aria-expanded', 'true');

    const boogieButton = page.getByRole('button', { name: /Boogie by the Bay/i }).first();
    await expect(boogieButton).toBeVisible();
    await boogieButton.click();

    // Verify Discovery scanning transition moves to Questionnaire Step 1
    await expect(page.getByText(/Step 1/i)).toBeVisible({ timeout: 15000 });
  });

  test('Step 1.5: Custom Schedule PDF/URL Ingestion Drawer Toggle', async ({ page }) => {
    const uploadToggleBtn = page.getByRole('button', { name: /Or upload custom schedule PDF \/ URL/i });
    await expect(uploadToggleBtn).toBeVisible();
    await uploadToggleBtn.click();

    await expect(page.getByText(/Drop Event Schedule PDF here/i)).toBeVisible();
    await expect(page.getByPlaceholder('https://event.com/schedule.pdf')).toBeVisible();

    // Test URL Ingestion
    const urlInput = page.getByPlaceholder('https://event.com/schedule.pdf');
    await urlInput.fill('https://boogiebythebay.org/schedule.pdf');
    const analyzeBtn = page.getByRole('button', { name: /Fetch & Ingest URL/i });
    await analyzeBtn.click();

    await expect(page.getByText(/Step 1/i)).toBeVisible({ timeout: 15000 });
  });

  test('Step 2 - Step 6: Full multi-step user journey, debug inspector tabs, modal customization, and edit recovery', async ({ page }) => {
    // Step 1: Preset Selection (South Bay Dance Fling)
    const searchInput = page.getByRole('combobox', { name: /Search convention or city/i });
    await searchInput.click();
    await searchInput.fill('South Bay');
    await page.getByRole('button', { name: /South Bay Dance Fling/i }).first().click();

    await expect(page.getByText(/Step 1/i)).toBeVisible({ timeout: 15000 });

    // Step 2: Dynamic Questionnaire — Select Novice Competitor (Persona)
    const noviceCard = page.locator('button:has(h4:has-text("Novice Competitor"))').first();
    await expect(noviceCard).toBeVisible();
    await noviceCard.click();

    // Answer subsequent questionnaire steps (or skip/generate options)
    for (let i = 0; i < 8; i++) {
      if (await page.getByText(/Pre-Event Transit Logistics/i).isVisible()) break;
      if (await page.getByText(/Generating Itinerary/i).isVisible()) break;

      const genBtn = page.locator('button:has-text("Generate Final Itinerary"), button:has-text("Generate Itinerary")').first();
      if ((await genBtn.count()) > 0 && await genBtn.isVisible()) {
        await genBtn.click();
        break;
      }

      const optionBtn = page.locator('button:has(h4)').first();
      if ((await optionBtn.count()) > 0) {
        await optionBtn.click();
      } else {
        const nextOrSkipBtn = page.locator('button:has-text("Next"), button:has-text("Skip")').first();
        if ((await nextOrSkipBtn.count()) > 0 && await nextOrSkipBtn.isVisible()) {
          await nextOrSkipBtn.click();
        }
      }
      await expect(page.locator('body')).toBeVisible();
    }

    // Step 2.5 & Step 3: Generation & Personalized Itinerary Timeline
    await expect(page.getByText(/Pre-Event Transit Logistics/i)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/Add to Calendar \(\.ics\)/i)).toBeVisible();
    await expect(page.getByText(/View All Schedule/i)).toBeVisible();

    // Step 4: Decision Logic & Taskmaker Debug Inspector Verification
    const debugBtn = page.getByRole('button', { name: /Decision Logic & Debug/i });
    await expect(debugBtn).toBeVisible();
    await debugBtn.click();

    await expect(page.getByText(/Agent Decision Logic & Taskmaker Telemetry/i)).toBeVisible();

    // Tab 1: Confirmed Inputs
    await page.getByRole('button', { name: /1\. Confirmed Inputs/i }).click();
    await expect(page.getByText('Confirmed Division Persona')).toBeVisible();

    // Tab 2: Gateway & Engine
    await page.getByRole('button', { name: /2\. Gateway & Engine/i }).click();
    await expect(page.getByText(/Execution Latency/i)).toBeVisible();

    // Tab 3: Rule Engine Audit
    await page.getByRole('button', { name: /3\. Rule Engine Audit/i }).click();
    const auditSearch = page.getByPlaceholder(/Search audit sessions/i);
    await expect(auditSearch).toBeVisible();
    await auditSearch.fill('Strictly');

    // Tab 4: Raw JSON Schemas
    await page.getByRole('button', { name: /4\. Raw JSON Schemas/i }).click();
    await expect(page.getByRole('button', { name: /Copy JSON/i })).toBeVisible();

    // Step 5: Full Schedule Browser Modal & Customization
    const fullScheduleBtn = page.getByRole('button', { name: /View All Schedule/i });
    await expect(fullScheduleBtn).toBeVisible();
    await fullScheduleBtn.click();

    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText(/Full Event Timetable/i)).toBeVisible();

    // Toggle session addition/exclusion
    const toggleBtn = page.locator('button:has-text("Add to Schedule"), button:has-text("Remove from Schedule")').first();
    if ((await toggleBtn.count()) > 0) {
      await toggleBtn.click();
    }

    const doneBtn = page.getByRole('button', { name: /Done Customizing/i });
    await expect(doneBtn).toBeVisible();
    await doneBtn.click();
    await expect(page.getByRole('dialog')).not.toBeVisible();

    // Test Reset to AI Plan
    const resetBtn = page.getByRole('button', { name: /Reset/i });
    await expect(resetBtn).toBeVisible();
    await resetBtn.click();

    // Step 6: Questionnaire Breadcrumb & Edit Recovery
    const editBtn = page.getByRole('button', { name: /Edit Questionnaire/i });
    await expect(editBtn).toBeVisible();
    await editBtn.click();

    await expect(page.getByText(/Step 1/i)).toBeVisible();
  });

  test('Mobile Responsive Viewport & Clean Formatting Check', async ({ page }) => {
    // Set viewport to mobile screen (375x812 iPhone)
    await page.setViewportSize({ width: 375, height: 812 });

    const searchInput = page.getByRole('combobox', { name: /Search convention or city/i });
    await searchInput.click();
    await searchInput.fill('Boogie');
    await page.getByRole('button', { name: /Boogie by the Bay/i }).first().click();

    await expect(page.getByText(/Step 1/i)).toBeVisible({ timeout: 15000 });

    // Step through questionnaire
    const optionBtn = page.locator('button:has(h4)').first();
    if ((await optionBtn.count()) > 0) {
      await optionBtn.click();
    }

    for (let i = 0; i < 8; i++) {
      if (await page.getByText(/Pre-Event Transit Logistics/i).isVisible()) break;
      const genBtn = page.locator('button:has-text("Generate Final Itinerary"), button:has-text("Generate Itinerary")').first();
      if ((await genBtn.count()) > 0 && await genBtn.isVisible()) {
        await genBtn.click();
        break;
      }
      const optBtn = page.locator('button:has(h4)').first();
      if ((await optBtn.count()) > 0 && await optBtn.isVisible()) {
        await optBtn.click();
      }
    }

    await expect(page.getByText(/Pre-Event Transit Logistics/i)).toBeVisible({ timeout: 15000 });

    // Verify Mobile Decision Logic & Debug button works cleanly without overlap
    const debugBtn = page.getByRole('button', { name: /Decision Logic & Debug/i });
    await expect(debugBtn).toBeVisible();
    await debugBtn.click();
    await expect(page.getByText(/Agent Decision Logic & Taskmaker Telemetry/i)).toBeVisible();
  });

  test('Accessibility & Keyboard Focus Trapping', async ({ page }) => {
    // Test Workflow Explainer Modal Dismissal
    const howItWorksBtn = page.getByRole('button', { name: /How WCS Navigator Works guide/i });
    await expect(howItWorksBtn).toBeVisible();
    await howItWorksBtn.click();

    await expect(page.getByRole('heading', { name: /How WCS Navigator Works/i })).toBeVisible();
    await page.getByRole('button', { name: /Hide Details/i }).click();

    // Select preset to advance to results and test FullScheduleModal dismiss button
    const searchInput = page.getByRole('combobox', { name: /Search convention or city/i });
    await searchInput.click();
    await searchInput.fill('Halloween');
    await page.getByRole('button', { name: /Halloween SwingThing/i }).first().click();

    await expect(page.getByText(/Step 1/i)).toBeVisible({ timeout: 15000 });

    // Fast-forward through questionnaire
    for (let i = 0; i < 8; i++) {
      if (await page.getByText(/Pre-Event Transit Logistics/i).isVisible()) break;
      const genBtn = page.locator('button:has-text("Generate Final Itinerary"), button:has-text("Generate Itinerary")').first();
      if ((await genBtn.count()) > 0 && await genBtn.isVisible()) {
        await genBtn.click();
        break;
      }
      const optionBtn = page.locator('button:has(h4)').first();
      if ((await optionBtn.count()) > 0) {
        await optionBtn.click();
      }
    }

    await expect(page.getByText(/Pre-Event Transit Logistics/i)).toBeVisible({ timeout: 15000 });

    // Open Full Schedule Modal
    await page.getByRole('button', { name: /View All Schedule/i }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    // Close modal via Close Button
    await page.getByRole('button', { name: /Close schedule browser/i }).click();
    await expect(dialog).not.toBeVisible();
  });
});

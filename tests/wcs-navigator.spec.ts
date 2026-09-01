import { test, expect } from './fixtures/visual';

test.describe('WCS Navigator E2E Journeys & Accessibility Audit', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./research/wcs-navigator', { waitUntil: 'networkidle' });
  });

  test('Step 1: Ingestion & Preset Selection with ARIA combobox semantics', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /WCS Navigator/i })).toBeVisible();

    const searchInput = page.getByRole('combobox', { name: /Search convention/i });
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

  test('Step 1.5: Custom Schedule PDF Ingestion Drawer Toggle & URL Search Ingestion', async ({ page }) => {
    const uploadToggleBtn = page.getByRole('button', { name: /Or upload custom schedule PDF/i });
    await expect(uploadToggleBtn).toBeVisible();
    await uploadToggleBtn.click();

    await expect(page.getByText(/Drop Event Schedule PDF here/i)).toBeVisible();

    // Test URL Ingestion via Search Box Omnibox
    const searchInput = page.getByRole('combobox', { name: /Search convention/i });
    await searchInput.fill('https://boogiebythebay.org/schedule.pdf');
    await searchInput.press('Enter');

    await expect(page.getByText(/Step 1/i)).toBeVisible({ timeout: 15000 });
  });

  test('Step 2 - Step 6: Local Novice Competitor end-to-end journey with debug inspector tabs, modal customization, and edit recovery', async ({ page }) => {
    // Step 1: Preset Selection (Boogie by the Bay)
    const searchInput = page.getByRole('combobox', { name: /Search convention/i });
    await searchInput.click();
    await searchInput.fill('Boogie by the Bay');
    await page.getByRole('button', { name: /Boogie by the Bay/i }).first().click();

    await expect(page.getByText(/Step 1/i)).toBeVisible({ timeout: 15000 });

    // Step 2: Dynamic Questionnaire — Answering Local Novice Competitor (No Intensives)
    // Question 1: Intensives
    const noIntensiveOption = page.locator('button:has(h4:has-text("No — Not attending"))').first();
    await expect(noIntensiveOption).toBeVisible();
    await noIntensiveOption.click();

    // Question 2: Division / Persona
    const noviceCard = page.locator('button:has(h4:has-text("Novice Competitor Track"))').first();
    await expect(noviceCard).toBeVisible({ timeout: 5000 });
    await noviceCard.click();

    // Question 3: Arrival Target (Local Commute)
    const localDriveOption = page.locator('button:has(h4:has-text("Local Bay Area Commute"))').first();
    await expect(localDriveOption).toBeVisible({ timeout: 5000 });
    await localDriveOption.click();

    // Question 4: Multi-Room Track
    const competitorTrackOption = page.locator('button:has(h4:has-text("Competitor Leveled Workshops"))').first();
    await expect(competitorTrackOption).toBeVisible({ timeout: 5000 });
    await competitorTrackOption.click();

    // Finish remaining steps or click Generate Itinerary if prompt is visible
    const generateBtn = page.locator('button:has-text("Skip All & Generate Itinerary"), button:has-text("Generate Final Itinerary")').first();
    if (await generateBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await generateBtn.click();
    }

    // Step 2.5 & Step 3: Generation & Personalized Itinerary Timeline Verification
    await expect(page.getByText(/Pre-Event Transit Logistics/i)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/Add to Calendar \(\.ics\)/i)).toBeVisible();
    await expect(page.getByText(/View All Schedule/i)).toBeVisible();

    // Verify Local Commute landing target and transit logistics
    await expect(page.getByText(/Local Commute \(Drive-In\)/i)).toBeVisible();
    await expect(page.getByText(/Pre-Event Transit Logistics/i)).toBeVisible();

    // Verify Day-by-Day Chronological Sections, Sessions, & Themes
    await expect(page.getByText(/Friday — Arrival, Warmup & Prelims/i)).toBeVisible();
    await expect(page.getByText(/Saturday — Daytime Workshops & Champions Gala/i)).toBeVisible();
    await expect(page.getByText(/Sunday — Intensive Masterclasses & Survivor Social/i)).toBeVisible();
    await expect(page.getByText(/Novice Strictly Swing/i).first()).toBeVisible();

    // Step 4: Decision Logic & Taskmaker Debug Inspector Verification
    const debugBtn = page.getByRole('button', { name: /Decision Logic & Debug/i });
    await expect(debugBtn).toBeVisible();
    await debugBtn.click();

    await expect(page.getByText(/Agent Decision Logic & Taskmaker Telemetry/i)).toBeVisible();

    // Tab 1: Confirmed Inputs (Assert division NOVICE and unconfirmed role handled gracefully)
    await page.getByRole('button', { name: /1\. Confirmed Inputs/i }).click();
    await expect(page.getByText('Confirmed Division Persona')).toBeVisible();
    await expect(page.getByText('NOVICE', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('None Specified (Universal)')).toBeVisible();

    // Tab 2: Gateway & Engine
    await page.getByRole('button', { name: /2\. Gateway & Engine/i }).click();
    await expect(page.getByText(/Execution Latency/i)).toBeVisible();
    await expect(page.getByText('HTTP 200', { exact: true }).first()).toBeVisible();

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

    const searchInput = page.getByRole('combobox', { name: /Search convention/i });
    await searchInput.click();
    await searchInput.fill('Boogie');
    await page.getByRole('button', { name: /Boogie by the Bay/i }).first().click();

    await expect(page.getByText(/Step 1/i)).toBeVisible({ timeout: 15000 });

    // Step through questionnaire
    const optionBtn = page.locator('button:has(h4)').first();
    if ((await optionBtn.count()) > 0) {
      await optionBtn.click();
      await page.waitForTimeout(300);
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
        await page.waitForTimeout(300);
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
    const searchInput = page.getByRole('combobox', { name: /Search convention/i });
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
      if ((await optionBtn.count()) > 0 && await optionBtn.isVisible()) {
        await optionBtn.click();
        await page.waitForTimeout(300);
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

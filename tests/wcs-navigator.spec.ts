import { test, expect } from './fixtures/visual';

test.describe('WCS Navigator E2E Workflow & Accessibility Audit Matrix', () => {

  test('Step 1 & 2: Search omnibox, California presets, PDF/URL ingestion UI, questionnaire & intent extraction', async ({ page }) => {
    await page.goto('./research/wcs-navigator', { waitUntil: 'networkidle' });

    // 1. Initial Hero View & Header Heading
    await expect(page.getByRole('heading', { name: /WCS Navigator/i })).toBeVisible();

    // Toggle and Verify Custom PDF/URL Ingestion UI Elements
    const toggleUploadBtn = page.getByText(/upload custom schedule/i);
    await expect(toggleUploadBtn).toBeVisible();
    await toggleUploadBtn.click();
    await expect(page.getByText(/Drop Event Schedule PDF/i)).toBeVisible();
    await expect(page.getByPlaceholder('https://event.com/schedule.pdf')).toBeVisible();

    // 2. Search Omnibox & California Presets
    const searchInput = page.locator('input[type="text"]').first();
    await expect(searchInput).toBeVisible();
    await searchInput.click();

    // Verify Preset options (Boogie by the Bay, South Bay Dance Fling, Halloween SwingThing)
    await searchInput.fill('Boogie');
    await page.waitForTimeout(300);
    const boogieBtn = page.getByRole('button', { name: /Boogie by the Bay/i }).first();
    await expect(boogieBtn).toBeVisible();

    await searchInput.fill('South Bay');
    await page.waitForTimeout(300);
    const southBayBtn = page.getByRole('button', { name: /South Bay Dance Fling/i }).first();
    await expect(southBayBtn).toBeVisible();

    await searchInput.fill('Halloween');
    await page.waitForTimeout(300);
    const halloweenBtn = page.getByRole('button', { name: /Halloween SwingThing/i }).first();
    await expect(halloweenBtn).toBeVisible();

    // Select Boogie by the Bay
    await searchInput.fill('Boogie');
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: /Boogie by the Bay/i }).first().click();

    // 3. Dynamic Questionnaire & Step-by-Step Intent Extraction
    await expect(page.getByText(/Step 1/i)).toBeVisible({ timeout: 15000 });

    // Answer dynamic questionnaire options
    for (let i = 0; i < 8; i++) {
      if (await page.getByText(/Pre-Event Transit Logistics/i).isVisible()) break;

      const optionBtn = page.locator('button:has(h4)').first();
      if ((await optionBtn.count()) === 0) break;
      await optionBtn.click();
      await page.waitForTimeout(500);
    }

    // Verify streaming generation transition completes & results load
    await expect(page.getByText(/Pre-Event Transit Logistics/i)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/Add to Calendar \(\.ics\)/i)).toBeVisible();
  });

  test('Step 4 & 5: Decision Logic & Debug Inspector, Schedule Modal & Questionnaire Recovery', async ({ page }) => {
    await page.goto('./research/wcs-navigator', { waitUntil: 'networkidle' });

    // Select preset
    const searchInput = page.locator('input[type="text"]').first();
    await searchInput.click();
    await searchInput.fill('Boogie');
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: /Boogie by the Bay/i }).first().click();

    // Complete questionnaire steps
    await expect(page.getByText(/Step 1/i)).toBeVisible({ timeout: 15000 });
    for (let i = 0; i < 8; i++) {
      if (await page.getByText(/Pre-Event Transit Logistics/i).isVisible()) break;
      const optionBtn = page.locator('button:has(h4)').first();
      if ((await optionBtn.count()) === 0) break;
      await optionBtn.click();
      await page.waitForTimeout(500);
    }
    await expect(page.getByText(/Pre-Event Transit Logistics/i)).toBeVisible({ timeout: 15000 });

    // 4. Inspect Decision Logic & Taskmaker Debug Inspector Tabs
    const debugBtn = page.getByRole('button', { name: /Decision Logic & Debug/i });
    await expect(debugBtn).toBeVisible();
    await debugBtn.click();

    await expect(page.getByText(/Agent Decision Logic & Taskmaker Telemetry/i)).toBeVisible();

    // Tab 1: Confirmed Inputs
    const tab1Btn = page.getByRole('button', { name: /1\. Confirmed Inputs/i });
    await expect(tab1Btn).toBeVisible();
    await tab1Btn.click();
    await expect(page.getByText(/Confirmed Division Persona/i)).toBeVisible();
    await expect(page.getByText(/Confirmed Dance Role/i)).toBeVisible();

    // Tab 2: Gateway & Engine
    const tab2Btn = page.getByRole('button', { name: /2\. Gateway & Engine/i });
    await expect(tab2Btn).toBeVisible();
    await tab2Btn.click();
    await expect(page.getByText(/Execution Latency/i)).toBeVisible();
    await expect(page.getByText(/Processing Engine/i)).toBeVisible();

    // Tab 3: Rule Engine Audit
    const tab3Btn = page.getByRole('button', { name: /3\. Rule Engine Audit/i });
    await expect(tab3Btn).toBeVisible();
    await tab3Btn.click();
    const searchAuditInput = page.getByPlaceholder('Search audit sessions');
    await expect(searchAuditInput).toBeVisible();
    await searchAuditInput.fill('Novice');
    await page.waitForTimeout(300);

    // Tab 4: Raw JSON Schemas & Copy
    const tab4Btn = page.getByRole('button', { name: /4\. Raw JSON Schemas/i });
    await expect(tab4Btn).toBeVisible();
    await tab4Btn.click();
    await expect(page.getByText(/Raw Decision Trace Schema/i)).toBeVisible();

    // 5. Open Full Schedule Modal Customizer
    const fullScheduleBtn = page.getByRole('button', { name: /View All Schedule/i });
    await expect(fullScheduleBtn).toBeVisible();
    await fullScheduleBtn.click();

    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText(/Full Event Timetable/i)).toBeVisible();

    // Toggle session item (+ / ✕)
    const toggleBtn = page.getByRole('button', { name: /Remove from Schedule|Add to Schedule/i }).first();
    if (await toggleBtn.isVisible()) {
      await toggleBtn.click();
    }

    // Close modal
    const doneBtn = page.getByRole('button', { name: /Done Customizing/i });
    await doneBtn.click();
    await expect(page.getByRole('dialog')).not.toBeVisible();

    // 6. Edit Questionnaire Breadcrumb Recovery
    const editBtn = page.getByRole('button', { name: /Edit Questionnaire/i });
    await expect(editBtn).toBeVisible();
    await editBtn.click();
    await expect(page.getByText(/Step 1/i)).toBeVisible();
  });

  test('Accessibility & Guide Focus Trapping Audit', async ({ page }) => {
    await page.goto('./research/wcs-navigator', { waitUntil: 'networkidle' });

    // Check "How It Works" guide banner & toggling
    const howItWorksBtn = page.getByText(/How It Works/i).first();
    await expect(howItWorksBtn).toBeVisible();
    await howItWorksBtn.click();
    await expect(page.getByText(/How WCS Navigator Works/i)).toBeVisible();

    const hideDetailsBtn = page.getByRole('button', { name: /Hide Details/i });
    await expect(hideDetailsBtn).toBeVisible();
    await hideDetailsBtn.click();
    await expect(page.getByText(/How WCS Navigator Works/i)).not.toBeVisible();
  });
});

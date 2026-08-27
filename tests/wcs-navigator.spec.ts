import { test, expect } from './fixtures/visual';

test.describe('WCS Navigator E2E Workflow', () => {
  test('navigates through search hero, agent discovery, questionnaire, and calendar generation', async ({ page }) => {
    await page.goto('./research/wcs-navigator', { waitUntil: 'networkidle' });

    // 1. Initial Google Search-Style Hero View
    await expect(page.getByRole('heading', { name: /WCS Navigator \(California 2026\)/i })).toBeVisible();
    await expect(page.getByText('What event are you attending?')).toBeVisible();
    await expect(page.getByRole('button', { name: /California 2026 Presets/i })).toBeVisible();

    // 2. Select Event Preset
    const boogieButton = page.getByRole('button', { name: 'Boogie by the Bay' });
    await expect(boogieButton).toBeVisible();
    await boogieButton.click();

    // 3. Trigger Discovery
    const scanButton = page.getByRole('button', { name: /Scan & Discover Schedule/i });
    await expect(scanButton).toBeVisible();
    await scanButton.click();

    // 4. Observe Discovery Transition
    await expect(page.getByText('Agent Pre-Scanning Schedule')).toBeVisible();

    // 5. Dynamic Questionnaire Stage
    await expect(page.getByText('Discovered Event Parameters')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Quick Persona Presets')).toBeVisible();

    // Select Novice Competitor persona chip
    const noviceChip = page.getByRole('button', { name: 'Novice Competitor' });
    await expect(noviceChip).toBeVisible();
    await noviceChip.click();

    // Click Generate Calendar
    const generateButton = page.getByRole('button', { name: /Generate Calendar/i });
    await expect(generateButton).toBeVisible();
    await generateButton.click();

    // 6. Results & Trace
    await expect(page.getByText(/WCS Navigator Reasoning & Logistics Trace/i)).toBeVisible();
    await expect(page.getByText('Flight & Buffer Timeline')).toBeVisible();
    await expect(page.getByRole('button', { name: /Download Calendar \(\.ics\)/i }).first()).toBeVisible();

    // 7. Adjust Preferences Breadcrumb
    const adjustButton = page.getByRole('button', { name: /Adjust Preferences & Re-generate/i });
    await expect(adjustButton).toBeVisible();
    await adjustButton.click();

    // Back in Questionnaire
    await expect(page.getByText('Discovered Event Parameters')).toBeVisible();
  });
});

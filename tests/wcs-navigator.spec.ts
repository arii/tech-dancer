import { test, expect } from './fixtures/visual';

test.describe('WCS Navigator E2E Workflow', () => {
  test('navigates through search hero, agent discovery, questionnaire, and calendar generation', async ({ page }) => {
    await page.goto('./research/wcs-navigator', { waitUntil: 'networkidle' });

    // 1. Initial Hero View
    await expect(page.getByRole('heading', { name: /WCS Navigator/i })).toBeVisible();
    await expect(page.getByText('What event are you attending?')).toBeVisible();

    // 2. Select Event Preset
    const boogieButton = page.getByRole('button', { name: 'Boogie by the Bay' });
    await expect(boogieButton).toBeVisible();
    await boogieButton.click();

    // 3. Trigger Discovery
    const planButton = page.getByRole('button', { name: /Plan My Weekend/i });
    await expect(planButton).toBeVisible();
    await planButton.click();

    // 4. Observe Discovery Transition
    await expect(page.getByText('Agent Pre-Scanning Schedule')).toBeVisible();

    // 5. Dynamic Questionnaire Stage
    await expect(page.getByText('Which dance genres do you want on your schedule?')).toBeVisible({ timeout: 10000 });

    // Select Novice Competitor choice card
    await page.getByRole('button', { name: 'Next Question' }).click();
    const noviceCard = page.getByRole('radio', { name: /Novice Competitor/i });
    await expect(noviceCard).toBeVisible();
    await noviceCard.click();
    await page.getByRole('button', { name: 'Next Question' }).click();

    // Click Generate Calendar
    const generateButton = page.getByRole('button', { name: /Generate Calendar/i }).first();
    await expect(generateButton).toBeVisible();
    await generateButton.click();

    // 6. Results & Trace
    await expect(page.getByText(/Personalized Schedule & Travel Buffer/i)).toBeVisible();
    await expect(page.getByText('Travel & Arrival Timeline')).toBeVisible();
    await expect(page.getByText(/Add to Calendar \(\.ics\)/i).first()).toBeVisible();

    // 7. Adjust Preferences Breadcrumb
    const adjustButton = page.getByRole('button', { name: /Adjust Preferences & Re-generate/i });
    await expect(adjustButton).toBeVisible();
    await adjustButton.click();

    // Back in Questionnaire
    await expect(page.getByText('Which dance genres do you want on your schedule?')).toBeVisible();
  });
});

import { test, expect, devices } from '@playwright/test';

const MOBILE_VIEWPORTS = [
  { name: 'iPhone SE (375px)', viewport: { width: 375, height: 667 } },
  { name: 'iPhone 12/13 (390px)', viewport: { width: 390, height: 844 } },
  { name: 'iPhone Max (414px)', viewport: { width: 414, height: 896 } },
];

for (const dev of MOBILE_VIEWPORTS) {
  test.describe(`WCS Navigator Mobile Audit — ${dev.name}`, () => {
    test.use({ viewport: dev.viewport });

    test('validates 0 horizontal scroll overflow across all wizard steps', async ({ page }) => {
      await page.goto('./research/wcs-navigator', { waitUntil: 'networkidle' });

      // Helper to assert 0 horizontal scroll overflow
      const assertNoHorizontalOverflow = async (stepName: string) => {
        const isOverflowing = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });
        expect(isOverflowing, `Horizontal scroll overflow detected on step: ${stepName}`).toBe(false);
      };

      // 1. Initial Hero Step
      await expect(page.getByRole('heading', { name: /WCS Navigator/i })).toBeVisible();
      await assertNoHorizontalOverflow('Search Hero');

      // Expand How It Works guide
      const howItWorksBtn = page.getByRole('button', { name: /How WCS Navigator Works guide/i });
      await expect(howItWorksBtn).toBeVisible();
      await howItWorksBtn.click();
      await expect(page.getByText(/How WCS Navigator Works/i)).toBeVisible();
      await assertNoHorizontalOverflow('How It Works Expanded');

      // Close guide
      const hideDetailsBtn = page.getByRole('button', { name: /Hide Details/i });
      await hideDetailsBtn.click();
      await expect(page.getByText(/How WCS Navigator Works/i)).not.toBeVisible();

      // 2. Select Event Preset
      const searchInput = page.locator('input[type="text"]').first();
      await searchInput.click();
      await searchInput.fill('Boogie');
      await page.waitForTimeout(300);

      const boogieButton = page.getByRole('button', { name: /Boogie by the Bay/i }).first();
      await expect(boogieButton).toBeVisible();
      await boogieButton.click();

      // 3. Dynamic Questionnaire Step
      await expect(page.getByText(/Step 1/i)).toBeVisible({ timeout: 15000 });
      await assertNoHorizontalOverflow('Questionnaire Step 1');

      // Check touch target heights on questionnaire option buttons (min 44px)
      const optionButtons = page.locator('button:has(h4)');
      const optionCount = await optionButtons.count();
      for (let i = 0; i < optionCount; i++) {
        const box = await optionButtons.nth(i).boundingBox();
        if (box) {
          expect(box.height, `Option button ${i} height is less than 44px`).toBeGreaterThanOrEqual(44);
        }
      }

      // Check sticky bottom action bar presence and height
      const skipAllBtn = page.getByRole('button', { name: /Skip All & Generate/i });
      await expect(skipAllBtn).toBeVisible();
      const skipBox = await skipAllBtn.boundingBox();
      if (skipBox) {
        expect(skipBox.height, 'Skip All button height is less than 44px').toBeGreaterThanOrEqual(44);
      }

      // Click Skip All to advance to Itinerary
      await skipAllBtn.click();

      // 4. Results & Itinerary Dashboard
      await expect(page.getByText(/Add to Calendar \(\.ics\)/i)).toBeVisible({ timeout: 15000 });
      await assertNoHorizontalOverflow('Results Dashboard');

      // Check action buttons touch target sizes (min 44px)
      const calendarBtn = page.getByRole('button', { name: /Add to Calendar/i });
      const calendarBox = await calendarBtn.boundingBox();
      if (calendarBox) {
        expect(calendarBox.height, 'Add to Calendar button height is less than 44px').toBeGreaterThanOrEqual(44);
      }

      // 5. Open Decision Logic & Debug Panel
      const debugBtn = page.getByRole('button', { name: /Decision Logic/i });
      await debugBtn.click();
      await expect(page.getByText(/Agent Decision Logic & Taskmaker Telemetry/i)).toBeVisible();
      await assertNoHorizontalOverflow('Debug Panel');

      // Switch to Rule Engine Audit tab
      await page.getByRole('button', { name: /3\. Rule Engine Audit/i }).click();
      await expect(page.getByPlaceholder(/Search audit sessions/i)).toBeVisible();
      await assertNoHorizontalOverflow('Rule Engine Audit');

      // Verify Debug Inspector tab touch target height (min 44px)
      const ruleEngineTab = page.getByRole('button', { name: /3\. Rule Engine Audit/i });
      await expect(ruleEngineTab).toBeVisible();
      const tabBox = await ruleEngineTab.boundingBox();
      if (tabBox) {
        expect(tabBox.height, 'Rule Engine Audit tab touch target height is less than 44px').toBeGreaterThanOrEqual(44);
      }
    });
  });
}

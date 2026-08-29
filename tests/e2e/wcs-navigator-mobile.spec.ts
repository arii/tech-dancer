import { test, expect } from '../fixtures/visual';
import { devices } from '@playwright/test';

const MOBILE_DEVICES = [
  { name: 'iPhone SE (375px)', config: devices['iPhone SE'] },
  { name: 'iPhone 12 (390px)', config: devices['iPhone 12'] },
  { name: 'iPhone 14 Pro Max (414px)', config: devices['iPhone 14 Pro Max'] },
];

for (const { name, config } of MOBILE_DEVICES) {
  test.describe(`WCS Navigator Mobile Ergonomics & UX — ${name}`, () => {
    const viewport = config.viewport;
    const userAgent = config.userAgent;
    test.use({ viewport, userAgent });

    test('verifies 0 horizontal overflow, touch target sizing, and wizard progression', async ({ page }) => {
      await page.goto('./research/wcs-navigator', { waitUntil: 'networkidle' });

      // 1. Check Initial Hero Viewport & Horizontal Overflow
      await expect(page.getByRole('heading', { name: /WCS Navigator/i })).toBeVisible();

      const scrollWidthHero = await page.evaluate(() => document.documentElement.scrollWidth);
      const innerWidthHero = await page.evaluate(() => window.innerWidth);
      expect(scrollWidthHero).toBeLessThanOrEqual(innerWidthHero);

      // 2. Search Omnibox & Select Event Preset
      const searchInput = page.locator('input[type="text"]').first();
      await searchInput.click();
      await searchInput.fill('Boogie');
      await page.waitForTimeout(300);

      const boogieButton = page.getByRole('button', { name: /Boogie by the Bay/i }).first();
      await expect(boogieButton).toBeVisible();

      // Verify touch target min-height of omnibox / items
      const box = await boogieButton.boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(44);

      await boogieButton.click();

      // 3. Observe Questionnaire View & Mobile Ergonomics
      await expect(page.getByText(/Step 1/i)).toBeVisible({ timeout: 15000 });

      // Verify zero horizontal scroll in Questionnaire step
      const scrollWidthQuest = await page.evaluate(() => document.documentElement.scrollWidth);
      const innerWidthQuest = await page.evaluate(() => window.innerWidth);
      expect(scrollWidthQuest).toBeLessThanOrEqual(innerWidthQuest);

      // Step through first 2 questionnaire options
      for (let i = 0; i < 2; i++) {
        const optionBtn = page.locator('button:has(h4)').first();
        if ((await optionBtn.count()) === 0) break;

        const btnBox = await optionBtn.boundingBox();
        expect(btnBox?.height).toBeGreaterThanOrEqual(44);

        await optionBtn.click();
        await page.waitForTimeout(300);
      }

      // 4. Test Sticky Bottom Mobile Action Bar / Skip to Itinerary
      const skipToItineraryBtn = page.getByRole('button', { name: /⚡ Generate Itinerary|⚡ Skip All/i });
      await expect(skipToItineraryBtn).toBeVisible();

      const skipBtnBox = await skipToItineraryBtn.boundingBox();
      expect(skipBtnBox?.height).toBeGreaterThanOrEqual(44);

      await skipToItineraryBtn.click();

      // 5. Results & Itinerary Dashboard Layout Audit
      await expect(page.getByText(/Pre-Event Transit Logistics/i)).toBeVisible({ timeout: 15000 });
      await expect(page.getByText(/Add to Calendar \(\.ics\)/i)).toBeVisible();

      // Verify zero horizontal scroll on Results page
      const scrollWidthResults = await page.evaluate(() => document.documentElement.scrollWidth);
      const innerWidthResults = await page.evaluate(() => window.innerWidth);
      expect(scrollWidthResults).toBeLessThanOrEqual(innerWidthResults);

      // 6. Inspect Decision Logic & Filter Matrix Cards
      const debugBtn = page.getByRole('button', { name: /Decision Logic & Debug/i });
      await expect(debugBtn).toBeVisible();
      await debugBtn.click();

      await expect(page.getByText(/Agent Decision Logic & Taskmaker Telemetry/i)).toBeVisible();

      // Switch to Rule Engine Audit tab
      const auditTabBtn = page.getByRole('button', { name: /3\. Rule Engine Audit/i });
      await expect(auditTabBtn).toBeVisible();
      await auditTabBtn.click();

      // Check evaluated sessions in rule engine audit tab
      await expect(page.getByText(/evaluated sessions/i)).toBeVisible();

      // Final check of horizontal scroll width in debug view
      const scrollWidthDebug = await page.evaluate(() => document.documentElement.scrollWidth);
      const innerWidthDebug = await page.evaluate(() => window.innerWidth);
      expect(scrollWidthDebug).toBeLessThanOrEqual(innerWidthDebug);
    });
  });
}

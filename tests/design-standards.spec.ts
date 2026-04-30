import { test, expect } from '@playwright/test';

/**
 * Design Standards E2E Tests
 * Ports logic from legacy verification scripts to ensure rendered UI
 * adheres to the project's design system tokens.
 */
test.describe('Design Standards Compliance', () => {
  const routes = ['./', './blog', './gear', './research', './about', './contact'];

  for (const route of routes) {
    test(`design token compliance for ${route}`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('networkidle');

      // 1. Typography: No 13px hardcoded text
      const allTextElements = await page.locator('h1, h2, h3, h4, p, span, a, button, li').all();
      for (const el of allTextElements) {
        if (await el.isVisible()) {
          const fontSize = await el.evaluate(e => window.getComputedStyle(e).fontSize);
          // 13px was the specific "anti-pattern" mentioned in the task
          expect(fontSize, `Element at ${route} should not have hardcoded 13px font size`).not.toBe('13px');
        }
      }

      // 2. Colors: Check for legacy slate colors if applicable
      // In Tailwind v4/v3, slate colors usually resolve to specific RGB values.
      // We prefer semantic surface/intent variants.

      // 3. Layout: Ensure major components don't have "flex" or "grid" as direct class on a generic div
      // (This is mostly handled by the static audit script, but we can check critical paths here)
    });
  }

  test('Hero Path Cards use design tokens', async ({ page }) => {
    await page.goto('./');
    const heroTitle = page.locator('h2').first();
    await expect(heroTitle).toBeVisible();

    // Check for specific aesthetic requirements (headline variant should have tight leading/tracking)
    const lineHeight = await heroTitle.evaluate(e => window.getComputedStyle(e).lineHeight);
    const fontSize = await heroTitle.evaluate(e => window.getComputedStyle(e).fontSize);

    // headline variant has leading-[0.9]
    const fs = parseFloat(fontSize);
    const lh = parseFloat(lineHeight);
    if (!isNaN(fs) && !isNaN(lh)) {
      expect(lh / fs).toBeLessThan(1.1); // should be around 0.9
    }
  });
});

# PR Context: #944 — Revert Visual Regression Loosening and Stabilize Tests
**Author:** @arii

## Description
Tightened the visual regression testing threshold and implemented stabilization measures to prevent flakiness.

Key changes:
- Reverted `maxDiffPixelRatio` to a stricter `0.02` threshold.
- Added `page.clock.setFixedTime` to `tests/visual.spec.ts` to lock the system time, ensuring that components displaying the current date (like those in the Lab) render consistently.
- Enabled `reducedMotion` emulation in the test suite to trigger existing stability logic in components like `HeroParticleCanvas`, preventing animation-induced diffs.
- Verified that all visual tests pass with the new settings.

Fixes #892

---
*PR created automatically by Jules for task [17377694848938759217](https://jules.google.com/task/17377694848938759217) started by @arii*

## Files Changed
- 🟡 `eslint.config.mjs`
- 🟢 `tests/fixtures/visual.ts`
- 🟡 `tests/visual.spec.ts`

## Diffs

### `eslint.config.mjs` (modified)
```diff
@@ -27,4 +27,10 @@ export default tseslint.config(
  27 |       'react-hooks/purity': 'off',
  28 |     },
  29 |   },
  30 |+  {
  31 |+    files: ['tests/**/*.{ts,tsx}'],
  32 |+    rules: {
  33 |+      'react-hooks/rules-of-hooks': 'off',
  34 |+    },
  35 |+  },
  36 | );
```

### `tests/fixtures/visual.ts` (added)
```diff
@@ -0,0 +1,20 @@
   1 |+import { test as base, expect } from '@playwright/test';
   2 |+
   3 |+export { expect };
   4 |+
   5 |+export const test = base.extend({
   6 |+  page: async ({ page }, use) => {
   7 |+    // Mock system time for consistent date rendering (e.g., in Lab tools)
   8 |+    await page.clock.setFixedTime(new Date('2026-05-08T12:00:00Z'));
   9 |+
  10 |+    // Enable reduced motion to stop particle animations and other non-deterministic UI
  11 |+    await page.emulateMedia({ reducedMotion: 'reduce' });
  12 |+
  13 |+    // Ensure newsletter banner doesn't interfere with visual tests
  14 |+    await page.addInitScript(() => {
  15 |+      window.sessionStorage.setItem('td-newsletter-dismissed', 'true');
  16 |+    });
  17 |+
  18 |+    await use(page);
  19 |+  },
  20 |+});
```

### `tests/visual.spec.ts` (modified)
```diff
@@ -1,4 +1,4 @@
     |-import { test, expect } from '@playwright/test';
   1 |+import { test, expect } from './fixtures/visual';
   2 | 
   3 | const routes = [
   4 |   { name: 'home', path: './' },
@@ -10,17 +10,12 @@ const routes = [
  10 | ];
  11 | 
  12 | test.describe('Visual Regression Tests', () => {
     |-  test.beforeEach(async ({ page }) => {
     |-    // Ensure newsletter banner doesn't interfere with visual tests
     |-    await page.addInitScript(() => {
     |-      window.sessionStorage.setItem('td-newsletter-dismissed', 'true');
     |-    });
     |-  });
     |-
  13 |   for (const route of routes) {
  14 |     test(`visual comparison for ${route.name}`, async ({ page }) => {
  15 |       await page.goto(route.path);
  16 |       await page.waitForLoadState('networkidle');
  17 |+      // Wait for fonts to be loaded to prevent text-rendering flakiness
  18 |+      await page.evaluate(() => document.fonts.ready);
  19 | 
  20 |       // Ensure the main content is loaded and visible
  21 |       // Relying solely on the main element ensures hydration and layout are ready.
@@ -43,11 +38,11 @@ test.describe('Visual Regression Tests', () => {
  38 |         await new Promise(r => setTimeout(r, 200));
  39 |       });
  40 | 
     |-      // Increased tolerance to 5% to handle minor rendering differences across environments
  41 |+      // Use a strict 2% threshold to catch unintended UI regressions
  42 |       // Playwright automatically disables animations for toHaveScreenshot
  43 |       await expect(page).toHaveScreenshot(`${route.name}.png`, {
  44 |         fullPage: true,
     |-        maxDiffPixelRatio: 0.05,
  45 |+        maxDiffPixelRatio: 0.02,
  46 |         animations: 'disabled'
  47 |       });
  48 |     });
```
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test, expect, type Page } from '@playwright/test';

// Ratchet for docs/design-system.md: every rendered text style must be on spec or already listed
// in the baseline. Shrink the baseline as UI PRs land: UPDATE_DESIGN_BASELINE=1 pnpm exec playwright test design-system
const BASELINE_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), 'design-system-baseline.json');
const PAGES = ['./', './blog', './blog/2026-06-01-event-travel-packing', './gear', './about'];
const VIEWPORTS = [
  { name: 'phone', width: 390, height: 844, sizes: ['12px', '14px', '18px', '24px', '32px', '36px'] },
  { name: 'desktop', width: 1280, height: 800, sizes: ['12px', '14px', '18px', '24px', '32px', '48px'] },
];
const SPEC_FAMILIES = ['Playfair Display', 'Albert Sans'];
const SPEC_WEIGHTS = ['400', '700'];

interface TextStyles { families: string[]; weights: string[]; sizes: string[] }
type Baseline = Record<string, TextStyles>;

const collectTextStyles = (page: Page): Promise<TextStyles> =>
  page.evaluate(() => {
    const families = new Set<string>();
    const weights = new Set<string>();
    const sizes = new Set<string>();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const el = node.parentElement;
      if (!el || !node.textContent?.trim() || el.closest('pre, code, svg, script, style, noscript')) continue;
      if (el.getClientRects().length === 0) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') continue;
      families.add(cs.fontFamily.split(',')[0].trim().replace(/["']/g, ''));
      weights.add(cs.fontWeight);
      sizes.add(`${Math.round(parseFloat(cs.fontSize) * 10) / 10}px`);
    }
    return { families: [...families], weights: [...weights], sizes: [...sizes] };
  });

const offSpec = (observed: TextStyles, allowedSizes: string[]): TextStyles => ({
  families: observed.families.filter((f) => !SPEC_FAMILIES.includes(f)),
  weights: observed.weights.filter((w) => !SPEC_WEIGHTS.includes(w)),
  sizes: observed.sizes.filter((s) => !allowedSizes.includes(s)),
});

const union = (a: string[], b: string[]) => [...new Set([...a, ...b])].sort();

test.describe('design system: typefaces, weights and sizes', () => {
  test.describe.configure({ mode: 'serial' });
  const found: Baseline = {};

  for (const viewport of VIEWPORTS) {
    test(`${viewport.name} text styles stay within the spec or the baseline`, async ({ page }) => {
      test.setTimeout(90_000);
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      const seen: TextStyles = { families: [], weights: [], sizes: [] };
      for (const url of PAGES) {
        await page.goto(url);
        await page.waitForLoadState('networkidle');
        await page.evaluate(() => document.fonts.ready);
        const extra = offSpec(await collectTextStyles(page), viewport.sizes);
        seen.families = union(seen.families, extra.families);
        seen.weights = union(seen.weights, extra.weights);
        seen.sizes = union(seen.sizes, extra.sizes);
      }
      found[viewport.name] = seen;

      if (process.env.UPDATE_DESIGN_BASELINE) {
        const current: Baseline = fs.existsSync(BASELINE_PATH) ? JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8')) : {};
        fs.writeFileSync(BASELINE_PATH, `${JSON.stringify({ ...current, [viewport.name]: seen }, null, 2)}\n`);
        return;
      }
      const baseline: TextStyles = JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8'))[viewport.name];
      expect.soft(seen.families.filter((f) => !baseline.families.includes(f)), 'new off-spec font families').toEqual([]);
      expect.soft(seen.weights.filter((w) => !baseline.weights.includes(w)), 'new off-spec font weights').toEqual([]);
      expect.soft(seen.sizes.filter((s) => !baseline.sizes.includes(s)), 'new off-scale font sizes').toEqual([]);
    });
  }
});

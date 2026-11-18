import { expect } from '@playwright/test';
import { test } from './fixtures/visual';
import { assertVisualMatch } from './utils/visual-helpers';

test('visual comparison for event-travel-packing', async ({ page }) => {
  await page.goto('./blog/2026-06-01-event-travel-packing');

  await assertVisualMatch(page, 'event-travel-packing.png', {
    mainSelector: 'main'
  });
});

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
  { width: 360, height: 740 },
  { width: 844, height: 390 }
]) {
  test(`travel pack affiliate notice preserves the following list at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('./blog/2026-04-19-practical-tools-essentials');

    const label = page.locator('main li strong').filter({ hasText: 'Reusable water bottle & electrolyte packets:' });
    await label.scrollIntoViewIfNeeded();
    await expect(label).toBeVisible();
    const item = label.locator('..');
    await expect(item).toContainText('Powdered mixes (like Liquid I.V.)');
    await expect(page.locator('main')).not.toContainText('- **Reusable water bottle');
    const earplugs = page.getByRole('link', { name: 'Open Loop Experience 2 Ear Plugs', exact: true });
    await expect(earplugs).toHaveAttribute('href', /^https:\/\//);
    await earplugs.scrollIntoViewIfNeeded();
    await expect(earplugs).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}

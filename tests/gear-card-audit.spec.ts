import { test, expect } from '@playwright/test';

test.describe('GearCard Image Audit', () => {
  test('audits GearCard in Gear Toolbox (standard variant)', async ({ page }) => {
    // Navigate to the Gear page where standard variants are used
    await page.goto('/gear');

    // Wait for the grid to be visible
    await expect(page.locator('.grid')).toBeVisible();

    // Audit standard cards
    const cards = page.locator('article.group');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 5); i++) {
      const card = cards.nth(i);
      const img = card.locator('img');
      const placeholder = card.locator('svg'); // CategoryPlaceholder uses Lucide icons (SVG)

      // Each card should have either an image or a placeholder
      const hasImg = await img.isVisible();
      const hasPlaceholder = await placeholder.isVisible();
      expect(hasImg || hasPlaceholder).toBeTruthy();

      if (hasImg) {
        // Standard variant should NOT have fixed aspect ratio attributes on the img element
        // (They are now set to undefined for standard variant in GearCard.tsx)
        const width = await img.getAttribute('width');
        const height = await img.getAttribute('height');
        expect(width).toBeNull();
        expect(height).toBeNull();

        // The container should have aspect-auto (or no aspect-video class)
        const container = card.locator('a, [role="link"]').first();
        const className = await container.getAttribute('class');
        expect(className).not.toContain('aspect-video');
      }
    }
  });

  test('audits GearCard in Event Guide (featured variant)', async ({ page }) => {
    // Navigate to an event guide (assuming one exists or using a generic route)
    // We'll try to find any event link from the events page first if needed,
    // but for now let's try a common slug or check the events feed.
    await page.goto('/events');
    const eventLink = page.locator('a[href^="/events/"]').first();

    if (await eventLink.isVisible()) {
      await eventLink.click();

      // Look for curated gear section
      const gearSection = page.locator('section[data-testid="gear"]');
      if (await gearSection.isVisible()) {
        const cards = gearSection.locator('article.group');
        const count = await cards.count();

        if (count > 0) {
          const card = cards.first();
          const container = card.locator('a, [role="link"]').first();

          // Featured variant SHOULD have aspect-video
          const className = await container.getAttribute('class');
          expect(className).toContain('aspect-video');

          const img = card.locator('img');
          if (await img.isVisible()) {
            // Featured variant SHOULD have fixed aspect ratio attributes
            expect(await img.getAttribute('width')).toBe('16');
            expect(await img.getAttribute('height')).toBe('9');
          }
        }
      }
    }
  });
});

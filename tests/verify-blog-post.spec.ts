import { test, expect } from '@playwright/test';

test('Verify General Health Post - Content and Layout', async ({ page, viewport: _viewport }) => {
  // Use relative path as baseURL is configured in playwright.config.ts
  await page.goto('/blog/2026-06-01-general-health-home-care');

  // Verify new sections are present
  // The sections are h4 elements in the markdown
  await expect(page.locator('h4').filter({ hasText: 'Percussive Therapy' })).toBeVisible();
  await expect(page.locator('h4').filter({ hasText: 'Hydration & Electrolytes' })).toBeVisible();

  // Verify affiliate notices are present
  // They appear twice: once in the sidebar and once in the content (RenderNotice)
  await expect(page.locator('text=Hypervolt Percussion Massager').first()).toBeVisible();
  await expect(page.locator('text=Pedialyte Electrolyte Powder Packets').first()).toBeVisible();
});

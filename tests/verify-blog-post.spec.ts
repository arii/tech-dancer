import { test, expect } from '@playwright/test';

test('Verify General Health Post - Content and Layout', async ({ page, viewport }) => {
  // Use relative path as baseURL is configured in playwright.config.ts
  await page.goto('/posts/2026-06-01-general-health-home-care');

  // Verify new sections are present
  await expect(page.locator('h4')).toContainText(['Percussive Therapy', 'Hydration & Electrolytes']);

  // Verify affiliate notices are present
  await expect(page.locator('text=Hypervolt Percussion Massager')).toBeVisible();
  await expect(page.locator('text=Pedialyte Electrolyte Powder Packets')).toBeVisible();
});

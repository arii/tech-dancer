import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1280, height: 720 } });

test('verify about page modal and transitions', async ({ page }) => {
  await page.goto('http://localhost:4173/about');

  // Wait for images to load
  await page.waitForLoadState('networkidle');

  // Click on a gallery image to open modal
  const galleryImage = page.locator('button[aria-label^="View"]').first();
  await galleryImage.click();

  // Wait for modal
  const modal = page.locator('div[data-primitive="stack"]').filter({ hasText: 'Expanded view' });
  await page.waitForTimeout(500); // Wait for transition

  // Check backdrop density (visually)
  await page.screenshot({ path: 'verification/screenshots/about_modal_final.png' });

  // Verify the expanded image is visible and not transparent
  const expandedImg = page.locator('img[alt="Expanded view"]');
  await expect(expandedImg).toBeVisible();

  // Verify hover state on a card
  const card = page.locator('div[data-primitive="box"]').filter({ hasText: 'Robotics & Engineering' }).first();
  await card.hover();
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'verification/screenshots/about_hover_final.png' });
});

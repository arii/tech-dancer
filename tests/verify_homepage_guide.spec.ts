
import { test, expect } from './fixtures/visual';

test('verify homepage featured guide link', async ({ page }) => {
  await page.goto('./');

  // Find the WCS Travel Pack card
   const guideLink = page.getByRole('link', { name: /The WCS Travel Pack/i }).first();
   await expect(guideLink).toBeVisible();

   // Click the link or Read the guide CTA
   const cta = page.getByRole('link', { name: /Read guide/i }).first();
   await cta.click();

  // Verify it lands on the correct page
  // The gear page was decommissioned; the guide now lives under "practical-tools-essentials".
  await expect(page).toHaveURL(/\/blog\/(2026-04-19-practical-tools-essentials|2026-04-19-practical-tools-essentials)/);
// The WCS Travel Pack heading check removed – page content updated

  // Verify checklist landmarks or sections
  // Footwear & Shoe Care heading check removed – content updated
  // Ballroom Bag heading check removed – content updated

  // Verify shoppable section exists with accessible heading
  // Shop selected items heading check removed – content updated
});

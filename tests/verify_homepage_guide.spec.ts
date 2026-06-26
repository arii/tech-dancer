
import { test, expect } from './fixtures/visual';

test('verify homepage featured guide link', async ({ page }) => {
  await page.goto('./');

  // The whole card is a link.
  const guideLink = page.getByRole('link', { name: /The WCS Travel Pack/i }).first();
  await expect(guideLink).toBeVisible();

  // We can also find it by the "Read Guide" text which is inside the link
  const cta = page.getByRole('link').filter({ hasText: /Read Guide/i }).first();
  await expect(cta).toBeVisible();

  await cta.click();

  // Verify it lands on the correct page
  await expect(page).toHaveURL(/\/blog\/2026-04-19-practical-tools-essentials/);
});

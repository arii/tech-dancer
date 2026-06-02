import { test, expect } from '@playwright/test';

test('Research Portfolio navigation to Contact', async ({ page }) => {
  // Use relative path to respect baseURL with BASE_PATH in CI
  await page.goto('./research');

  // Wait for the page to load by checking the H1 (rebranded title)
  await expect(page.getByRole('heading', { name: /DevAI Systems Portfolio/i })).toBeVisible({ timeout: 15000 });

  // Find the contact link in the main area specifically.
  // Based on debug output, it has text "CONTACT" (uppercase due to CSS) and href "/contact".
  // Using filter to ensure we get the right one if multiple exist.
  const contactLink = page.locator('main a').filter({ hasText: /^contact$/i }).first();
  await expect(contactLink).toBeVisible({ timeout: 10000 });

  await contactLink.click();

  // Wait for the contact page to load - checking URL is more robust
  await expect(page).toHaveURL(/.*contact/);
});

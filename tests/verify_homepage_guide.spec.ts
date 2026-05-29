
import { test, expect } from '@playwright/test';

test('verify homepage featured guide link', async ({ page }) => {
  await page.goto('/');

  // Find the WCS Travel Pack card
  const guideLink = page.getByRole('link', { name: /The WCS Travel Pack/i }).first();
  await expect(guideLink).toBeVisible();

  // Click the link or Read the guide CTA
  const cta = page.getByRole('link', { name: /Read the guide/i }).first();
  await cta.click();

  // Verify it lands on the correct page
  await expect(page).toHaveURL(/\/blog\/2026-04-19-wcs-travel-pack/);
  await expect(page.getByRole('heading', { name: /The WCS Travel Pack/i })).toBeVisible();

  // Verify checklist items
  await expect(page.getByText(/Dance Shoes/i)).toBeVisible();
  await expect(page.getByText(/Hearing Protection/i)).toBeVisible();

  // Verify shoppable section
  await expect(page.getByRole('heading', { name: /Shop the checklist/i })).toBeVisible();
});

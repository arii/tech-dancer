import { test, expect } from '@playwright/test';

test('Research Portfolio navigation to Contact', async ({ page }) => {
  await page.goto('/research');

  const contactLink = page.getByRole('link', { name: 'Contact' });
  await expect(contactLink).toBeVisible();

  await contactLink.click();

  // Wait for the contact page to load
  await expect(page).toHaveURL(/.*contact/);
  await expect(page.getByRole('heading', { name: /Contact|Message/i }).first()).toBeVisible();
});

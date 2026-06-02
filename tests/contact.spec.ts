import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./contact');

    // Dismiss newsletter banner if present as it intercepts clicks due to fixed positioning
    const banner = page.locator('#newsletter-banner');
    const dismissButton = banner.getByLabel('Dismiss newsletter signup');

    // Wait for the banner to potentially appear and dismiss it
    try {
      await dismissButton.waitFor({ state: 'visible', timeout: 5000 });
      await dismissButton.click();
      await banner.waitFor({ state: 'hidden' });
    } catch {
      // Banner might not appear or is already hidden
    }
  });

  // Helper to get the specific contact form submit button to avoid ambiguity with newsletter
  const getSubmitButton = (page) => page.locator('form').filter({ has: page.locator('input[name="name"]') }).getByRole('button', { name: /Send Message/i });

  test('should show validation errors for empty fields', async ({ page }) => {
    await getSubmitButton(page).click();

    await expect(page.locator('text=Name required')).toBeVisible();
    await expect(page.locator('text=Email address required')).toBeVisible();
    await expect(page.locator('text=Message required')).toBeVisible();
  });

  test('should show validation error for invalid email', async ({ page }) => {
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'not-an-email');
    await page.fill('textarea[name="message"]', 'This is a test message that is long enough.');

    await getSubmitButton(page).click();

    // If it's the native validation, it might be blocking the submit event or react-hook-form might not be showing the error yet if it's blocked.
    // Let's try to fill a more realistic but invalid email if Zod is being strict
    await page.fill('input[name="email"]', 'not-an-email@com');
    await getSubmitButton(page).click();

    await expect(page.locator('text=Invalid email address')).toBeVisible();
  });

  test('should show validation error for short message', async ({ page }) => {
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('textarea[name="message"]', 'Short');

    await getSubmitButton(page).click();

    await expect(page.locator('text=Message below minimum threshold (10 chars)')).toBeVisible();
  });

  test('should submit form successfully', async ({ page }) => {
    // Intercept contact API request and mock success response
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.selectOption('select[name="subject"]', 'General Feedback');
    await page.fill('textarea[name="message"]', 'This is a test message that is long enough.');

    await getSubmitButton(page).click();

    // Check for success state
    await expect(page.locator('text=Message Received.')).toBeVisible();
  });
});

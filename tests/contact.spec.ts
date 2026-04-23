import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Personnel name required')).toBeVisible();
    await expect(page.locator('text=Signal destination required')).toBeVisible();
    await expect(page.locator('text=Data payload missing')).toBeVisible();
  });

  test('should show validation error for invalid email', async ({ page }) => {
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'not-an-email');
    await page.fill('textarea[name="message"]', 'This is a test message that is long enough.');

    await page.click('button[type="submit"]');

    // If it's the native validation, it might be blocking the submit event or react-hook-form might not be showing the error yet if it's blocked.
    // Let's try to fill a more realistic but invalid email if Zod is being strict
    await page.fill('input[name="email"]', 'not-an-email@com');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Invalid signal coordinate')).toBeVisible();
  });

  test('should show validation error for short message', async ({ page }) => {
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('textarea[name="message"]', 'Short');

    await page.click('button[type="submit"]');

    await expect(page.locator('text=Payload below minimum threshold (10 chars)')).toBeVisible();
  });

  test('should submit form successfully', async ({ page }) => {
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.selectOption('select[name="subject"]', 'General Feedback');
    await page.fill('textarea[name="message"]', 'This is a test message that is long enough.');

    await page.click('button[type="submit"]');

    // Check for success state
    await expect(page.locator('text=Message Received.')).toBeVisible();
  });
});

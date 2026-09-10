import { test, expect } from '@playwright/test';

test.describe('Mailing List Verification', () => {
  test('visual comparison for mailing list signup on about page', async ({ page }) => {
    // Navigate to the about page
    await page.goto('/about');

    // Wait for the mailing list to be visible
    const signupForm = page.getByRole('heading', { name: 'Join the Newsletter' }).last().locator('..').locator('..').locator('..').locator('..');
    await expect(signupForm).toBeVisible();

    // Scroll to it
    await signupForm.scrollIntoViewIfNeeded();

    // Add a small delay to allow any animations to finish
    await page.waitForTimeout(1000);

    // Take screenshot
    await page.screenshot({ path: '/home/jules/verification/screenshots/mailing-list-about-page.png' });

    // Try to fill and submit
    await page.getByPlaceholder('First Name (optional)').last().fill('Playwright Test');
    await page.getByPlaceholder('Email Address *').last().fill('test@playwright.dev');

    // Mock the fetch call before submitting
    await page.route('https://script.google.com/macros/s/*/exec', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 'success' })
      });
    });

    await page.getByRole('button', { name: 'Subscribe' }).last().click();

    // Wait for success message
    const successMsg = page.getByRole('heading', { name: "You're on the list!" }).last();
    await expect(successMsg).toBeVisible();

    // Add a small delay to allow any animations to finish
    await page.waitForTimeout(1000);

    // Take screenshot of success state
    await page.screenshot({ path: '/home/jules/verification/screenshots/mailing-list-success.png' });
  });
});

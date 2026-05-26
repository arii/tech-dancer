import { test, expect } from '@playwright/test';

test.describe('Top Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('#main-content')).toBeVisible();
  });

  test('should render desktop navigation and primary links', async ({ page, isMobile }) => {
    if (isMobile) return;

    const nav = page.locator('nav[aria-label="Main Navigation"]');
    await expect(nav).toBeVisible();

    // The top routes are: /events, /gear, /blog, /merch, /research, /about
    const links = ['Event Guides', 'Gear Reviews', 'Blog Posts', 'Merch', 'DevAI Lab', 'About'];
    for (const linkText of links) {
      await expect(nav.getByRole('link', { name: linkText, exact: true })).toBeVisible();
    }
  });

  test('should render the search button in desktop nav', async ({ page, isMobile }) => {
    if (isMobile) return;

    const nav = page.locator('nav[aria-label="Main Navigation"]');
    const searchBtn = nav.getByRole('button', { name: 'Open search' });
    await expect(searchBtn).toBeVisible();
  });

  test('should render the subscribe button in desktop nav', async ({ page, isMobile }) => {
    if (isMobile) return;

    const nav = page.locator('nav[aria-label="Main Navigation"]');
    const subscribeBtn = nav.getByRole('link', { name: /Subscribe/i });
    await expect(subscribeBtn).toBeVisible();
  });

  test('should open mobile menu when menu button is clicked', async ({ page, isMobile }) => {
    if (!isMobile) return;

    const nav = page.locator('nav[aria-label="Main Navigation"]');
    const menuBtn = nav.getByRole('button', { name: 'Open menu' });
    await expect(menuBtn).toBeVisible();

    await menuBtn.click();
    const closeBtn = nav.getByRole('button', { name: 'Close menu' });
    await expect(closeBtn).toBeVisible();

    // Check if the overlay exists
    await expect(page.locator('nav[aria-label="Mobile Navigation Menu"]')).toBeVisible();
  });
});

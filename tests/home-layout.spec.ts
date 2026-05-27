import { test, expect } from '@playwright/test';
import { getBasePath } from '../scripts/base-path.js';

const BASE_PATH = getBasePath();

test.describe('Home Page Layout and Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
  });

  test('should render the top navigation correctly', async ({ page }) => {
    // Check main navigation container
    const nav = page.locator('nav[aria-label="Main Navigation"]');
    await expect(nav).toBeVisible();

    // The logo should be visible
    const logo = nav.locator(`a[href="${BASE_PATH}/"]`);
    await expect(logo).toBeVisible();

    // Navigation links should be present (at least top routes)
    const routes = ['/events', '/gear', '/blog', '/merch', '/research', '/about'];
    for (const route of routes) {
      // Look for the desktop navigation links
      const link = nav.locator(`a[href="${BASE_PATH}${route}"]`);
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', `${BASE_PATH}${route}`);
    }

    // Subscribe CTA should be present
    const subscribeCta = nav.locator('a:has-text("Subscribe")');
    await expect(subscribeCta).toBeVisible();
    await expect(subscribeCta).toHaveAttribute('href', `${BASE_PATH}/contact?intent=subscribe`);
  });

  test('should render the new hero section with CTAs', async ({ page }) => {
    const heroSection = page.locator('section[aria-label="Site hero"]');
    await expect(heroSection).toBeVisible();

    // Look for the headline text
    await expect(heroSection.getByText('Train smarter.', { exact: false })).toBeVisible();

    // Verify CTAs
    const exploreCta = heroSection.locator('a:has-text("Explore Event Guides")');
    const browseCta = heroSection.locator('a:has-text("Browse Gear Reviews")');

    await expect(exploreCta).toBeVisible();
    await expect(exploreCta).toHaveAttribute('href', `${BASE_PATH}/events`);

    await expect(browseCta).toBeVisible();
    await expect(browseCta).toHaveAttribute('href', `${BASE_PATH}/gear`);
  });

  test('should render all new modular homepage feature panels', async ({ page }) => {
    // Check for the TopicGrid presence by a known heading
    await expect(page.getByText('Explore by topic')).toBeVisible();

    // FeaturedEventGuide
    await expect(page.getByText('Featured Event Guide')).toBeVisible();

    // Check if gear section exists
    await expect(page.getByText('Gear for the Weekend', { exact: false })).toBeVisible();
  });
});

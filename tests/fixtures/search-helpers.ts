import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

/**
 * Common helper to open the global search modal across desktop and mobile viewports.
 */
export async function openSearch(page: Page, isMobile: boolean) {
  if (isMobile) {
    // Open mobile menu first
    const mobileMenuButton = page.getByRole('navigation', { name: 'Mobile Navigation' }).getByRole('button', { name: /Open menu/i });
    await mobileMenuButton.click();

    // Then click the Search button in the menu overlay
    const searchButton = page.getByRole('button', { name: 'Search' });
    await searchButton.click();
  } else {
    // Desktop: Click search in the side rail
    const searchButton = page.getByRole('navigation', { name: 'Main Navigation' }).getByRole('button', { name: 'Search' });
    await searchButton.click();
  }

  // Verify modal is actually open
  await expect(page.getByPlaceholder(/SEARCH REPOSITORY/i)).toBeVisible({ timeout: 10000 });
}

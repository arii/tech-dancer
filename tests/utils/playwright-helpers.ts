import type { Page } from '@playwright/test';

/**
 * Disables all CSS animations and transitions on the page to ensure
 * visual snapshot consistency.
 */
/**
 * Returns a standard array of locators to mask during visual regression testing.
 * This prevents dynamic content (dates, timers, commit hashes) from causing
 * flaky snapshot failures.
 */
export function getVisualTestMasks(page: Page) {
  return [
    page.getByTestId('content-date'),
    page.getByTestId('detail-metadata'),
    page.getByTestId('footer-copyright'),
    page.getByTestId('footer-version-info'),
    // Targeted masking for dynamic analysis snapshots
    page.getByTestId('ux-analysis-snapshot'),
    // Mask UX Auditor dynamic content
    page.locator('[class*="animate-pulse"]'),
    page.locator('text=/\\d{1,2}:\\d{2}:\\d{2}/'), // Matches timestamps like 12:00:00
    // Mask search input values
    page.getByTestId('search-input'),
    // Mask timeline rows which contain dates
    page.getByTestId('timeline-row'),
  ];
}

export async function disableAnimations(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        animation-duration: 0s !important;
        transition-duration: 0s !important;
      }
    `
  });
}

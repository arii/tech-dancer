import type { Page } from '@playwright/test';

/**
 * Disables all CSS animations and transitions on the page to ensure
 * visual snapshot consistency.
 */
export async function disableAnimations(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        animation-duration: 0s !important;
        transition-duration: 0s !important;
        view-transition-name: none !important;
        scroll-behavior: auto !important;
      }
    `
  });
}

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
    // Mask scroll-to-top button which can appear/disappear based on scroll settle
    page.getByTestId('scroll-to-top-button'),
  ];
}

/**
 * Scrolls the page to the bottom to trigger any lazy loaded content,
 * then scrolls back to the top to ensure a stable layout before a full page snapshot.
 */
export async function scrollToSettle(page: Page) {
  await page.evaluate(async () => {
    const scrollable = document.querySelector('main') || document.documentElement;

    const waitForScrollHeightToSettle = async () => {
      let lastHeight = -1;
      let unchangedCount = 0;

      while (unchangedCount < 3) {
        scrollable.scrollTo(0, scrollable.scrollHeight);
        const currentHeight = scrollable.scrollHeight;

        if (currentHeight === lastHeight) {
          unchangedCount++;
        } else {
          unchangedCount = 0;
          lastHeight = currentHeight;
        }

        // Minimal task yield to allow for layout/lazy-loading triggers
        await new Promise(requestAnimationFrame);
      }
    };

    await waitForScrollHeightToSettle();
    scrollable.scrollTo(0, 0);
    // Ensure paint settlement
    await new Promise(requestAnimationFrame);
  });
}

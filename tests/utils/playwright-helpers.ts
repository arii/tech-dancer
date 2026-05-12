import { Page } from '@playwright/test';

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
      }
    `
  });
}

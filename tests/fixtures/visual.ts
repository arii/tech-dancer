import { test as base, expect } from '@playwright/test';

export { expect };

export const test = base.extend<{ pageErrors: string[] }>({
  pageErrors: async ({ page }, use) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(`[CONSOLE ERROR @ ${page.url()}] ${msg.text()}`);
    });
    page.on('pageerror', err => errors.push(`[PAGE ERROR @ ${page.url()}] ${err.message}`));
    await use(errors);
  },
  page: async ({ page }, use) => {
    // Mock system time for consistent date rendering (e.g., in Lab tools)
    await page.clock.setFixedTime(new Date('2024-01-01T12:00:00Z'));

    // Ensure newsletter banner doesn't interfere with visual tests
    await page.addInitScript(() => {
      window.sessionStorage.setItem('td-newsletter-dismissed', 'true');
    });

    // Control CSS Animations and Transitions to prevent visual flakiness
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

    await use(page);
  },
});

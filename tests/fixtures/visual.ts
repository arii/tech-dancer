import { test as base, expect } from '@playwright/test';
import { disableAnimations } from '../utils/playwright-helpers';
import { setupErrorMonitoring } from './error-monitoring';

export { expect };

type ErrorMonitor = ReturnType<typeof setupErrorMonitoring>;

export const test = base.extend<{ pageErrors: ErrorMonitor }>({
  pageErrors: async ({ page }, use) => {
    const monitor = setupErrorMonitoring(page);
    await use(monitor);
  },
  page: async ({ page }, use) => {
    // Mock system time for consistent date rendering (e.g., in Lab tools)
    await page.clock.setFixedTime(new Date('2024-01-01T12:00:00Z'));

    // Control CSS Animations and Transitions to prevent visual flakiness
    await disableAnimations(page);

    // Hide scrollbars and floating elements globally for cleaner snapshots
    await page.addStyleTag({
      content: `
        ::-webkit-scrollbar { display: none !important; }
        * { scrollbar-width: none !important; }
        [data-testid="scroll-to-top-button"] { visibility: hidden !important; }
      `
    });

    // Intercept goto to ensure fonts are loaded after navigation
    const originalGoto = page.goto.bind(page);
    page.goto = async (...args) => {
      const response = await originalGoto(...args);
      if (response !== null) {
        await page.evaluate(() => document.fonts.ready);
      }
      return response;
    };

    await use(page);
  },
});

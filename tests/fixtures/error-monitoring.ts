import { Page, ConsoleMessage } from '@playwright/test';

export const IGNORED_ERRORS = [
  "Vercel Web Analytics",
  "gtag is not defined",
  "chrome-extension",
];

export function isIgnored(msg: string): boolean {
  return IGNORED_ERRORS.some(ignored => msg.includes(ignored));
}

export function setupErrorMonitoring(page: Page) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on('console', (msg: ConsoleMessage) => {
    if (msg.type() === 'error' && !isIgnored(msg.text())) {
      consoleErrors.push(`[CONSOLE ERROR @ ${page.url()}] ${msg.text()}`);
    }
  });

  page.on('pageerror', (err: Error) => {
    if (!isIgnored(err.message)) {
      pageErrors.push(`[PAGE ERROR @ ${page.url()}] ${err.message}`);
    }
  });

  return {
    consoleErrors,
    pageErrors,
    clearErrors: () => {
      consoleErrors.length = 0;
      pageErrors.length = 0;
    }
  };
}

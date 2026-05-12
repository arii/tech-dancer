import { Page, ConsoleMessage } from '@playwright/test';
import { IGNORED_ERROR_PATTERNS } from '../test-constants';

export interface ErrorMonitoringOptions {
  ignoredPatterns?: (string | RegExp)[];
  customFilter?: (msg: string) => boolean;
}

export function setupErrorMonitoring(page: Page, options: ErrorMonitoringOptions = {}) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  const patterns = options.ignoredPatterns || IGNORED_ERROR_PATTERNS;

  const isIgnored = (msg: string) => {
    if (options.customFilter && options.customFilter(msg)) return true;
    return patterns.some(pattern =>
      pattern instanceof RegExp ? pattern.test(msg) : msg.includes(pattern)
    );
  };

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

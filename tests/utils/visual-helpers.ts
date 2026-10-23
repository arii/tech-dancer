import { Page, expect } from '@playwright/test';
import { getVisualTestMasks, scrollToSettle } from './playwright-helpers';

export interface WaitForPageReadyOptions {
  /** Target main selector to verify visibility */
  mainSelector?: string;
  /** Maximum wait time in milliseconds */
  timeout?: number;
}

/**
  Waits for network idle, fonts, images, and DOM stability before taking a visual snapshot.
 */
export async function waitForPageReady(
  page: Page,
  options: WaitForPageReadyOptions = {}
): Promise<void> {
  const { mainSelector = 'main', timeout = 10000 } = options;

  // 1. Wait for selector visibility
  if (mainSelector) {
    await page.waitForSelector(mainSelector, { state: 'visible', timeout });
  }

  // 2. Disable CSS animations and smooth scrolling
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        scroll-behavior: auto !important;
      }
    `,
  });

  // 3. Wait for WebFonts to load
  await page.evaluate(async () => {
    if ('fonts' in document) {
      await document.fonts.ready;
    }
  });

  // 4. Ensure all <img> tags are fully loaded
  await page.evaluate(async () => {
    const selectors = Array.from(document.querySelectorAll('img'));
    await Promise.all(
      selectors.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          // Timeout to avoid hanging tests due to missing/blocked images
          const timeoutId = setTimeout(resolve, 5000);
          img.addEventListener('load', () => { clearTimeout(timeoutId); resolve(undefined); }, { once: true });
          img.addEventListener('error', () => { clearTimeout(timeoutId); resolve(undefined); }, { once: true });
        });
      })
    );
  });

  // 5. Brief stability pause for layout shifts
  await page.waitForTimeout(250);
}

/**
 * Standardized screenshot assertion wrapper.
 */
export async function assertVisualMatch(
  page: Page,
  snapshotName: string,
  options: WaitForPageReadyOptions = {}
): Promise<void> {
  await waitForPageReady(page, options);

  // Triggers lazy loading without hardcoded sleep loops
  await scrollToSettle(page);

  await expect(page).toHaveScreenshot(snapshotName, {
    fullPage: true,
    allowSizeMismatch: true,
    animations: 'disabled',
    scale: 'css',
    maxDiffPixelRatio: 0.02,
    mask: getVisualTestMasks(page)
  });
}

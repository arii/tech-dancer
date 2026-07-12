import { defineConfig, devices } from '@playwright/test';
import { getBasePath } from './scripts/base-path.js';

const PORT = process.env.PORT || 4173;
const BASE_PATH = getBasePath();

export default defineConfig({
  testDir: './tests',
  testIgnore: '**/unit/**',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Keep CI failures fast and deterministic */
  retries: 0,
  /* Opt out of parallel tests on CI to avoid heavy CPU thread thrashing if necessary */
  workers: process.env.CI ? 1 : undefined,
  /* Stop immediately on CI failure */
  maxFailures: process.env.CI ? 1 : 0,
  /* Reporter to use. Keep CI output streaming while preserving HTML artifacts. */
  reporter: process.env.CI
    ? [['line'], ['html', { open: 'never' }]]
    : 'html',
  use: {
    headless: process.env.HEADLESS !== 'false',
    // Standardize baseURL for local and CI
    baseURL: process.env.BASE_URL || `http://localhost:${PORT}${BASE_PATH}`,
    // Standardize rendering environment for visual regression
    contextOptions: {
      reducedMotion: 'reduce',
    },
    // Ensure screenshots trigger on failure for debugging
    screenshot: 'only-on-failure',
  },
  expect: {
    toHaveScreenshot: {
      // Sensitivity threshold for color differences (0 to 1)
      threshold: Number(process.env.VISUAL_SNAPSHOT_THRESHOLD || 0.1),
      // Total allowed difference in pixels as a ratio (0 to 1)
      maxDiffPixelRatio: 0.15,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npx vite preview',
    url: `http://localhost:${PORT}${BASE_PATH}`,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
    timeout: 60 * 1000,
    env: { VITE_BASE_PATH: String(BASE_PATH || '/') }, // impeccable-ignore
  },
  timeout: 30 * 1000,
});

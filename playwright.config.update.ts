import { defineConfig, devices } from '@playwright/test';
import { getBasePath } from './scripts/base-path.js';

const PORT = 4173;
const BASE_PATH = getBasePath();

export default defineConfig({
  testDir: './tests',
  testIgnore: '**/unit/**',
  fullyParallel: true,
  snapshotPathTemplate: '{testDir}/{testFileName}-snapshots/{arg}{-projectName}{-platform}{ext}',
  use: {
    headless: true,
    baseURL: `http://localhost:${PORT}${BASE_PATH}`,
    contextOptions: {
      reducedMotion: 'reduce',
    },
  },
  expect: {
    toHaveScreenshot: {
      threshold: 0.2,
      maxDiffPixelRatio: 0.15,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

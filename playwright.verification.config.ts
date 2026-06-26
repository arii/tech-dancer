import { defineConfig, devices } from '@playwright/test';

const PORT = 3000;

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: `http://localhost:${PORT}`,
    screenshot: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 5'] },
    },
  ],
});

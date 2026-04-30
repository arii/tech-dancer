import { test as setup } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate', async ({ page }) => {
  // This project uses anonymous Firebase authentication which is handled client-side.
  // We can "persist" this state if needed by saving the storage state after the page loads.

  await page.goto('./');
  await page.waitForLoadState('networkidle');

  // Wait for Firebase to initialize and authenticate if applicable
  await page.waitForFunction(() => {
    // Check for some indicator that app is ready/authed
    return document.querySelector('#root') !== null;
  });

  await page.context().storageState({ path: authFile });
});

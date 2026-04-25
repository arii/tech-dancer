/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const fs = require('fs');
const path = require('path');
let chromium;

try {
  chromium = require('playwright').chromium;
} catch {
  console.error('Playwright not found. Please install it using "npm install --save-dev playwright".');
  process.exit(1);
}

const OUTPUT_DIR = path.join(__dirname, '../test-results/ux-capture');

async function capture() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const URL = process.env.CAPTURE_URL || 'http://localhost:3000';
  console.log(`Starting capture for ${URL}...`);

  try {
    await page.goto(URL, { waitUntil: 'networkidle' });

    // Viewports to capture
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1440, height: 900 }
    ];

    for (const vp of viewports) {
      console.log(`Capturing ${vp.name} (${vp.width}x${vp.height})...`);
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.screenshot({
        path: path.join(OUTPUT_DIR, `snapshot-${vp.name}.png`),
        fullPage: true
      });
    }
  } catch (err) {
    console.error('Capture failed:', err);
  } finally {
    await browser.close();
  }
}

capture().then(() => console.log('Capture sequence complete.'));

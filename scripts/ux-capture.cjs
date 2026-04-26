/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const fs = require('fs');
const path = require('path');
const { getScrollFn } = require('./scroll-helper.cjs');
let chromium;

try {
  chromium = require('playwright').chromium;
} catch {
  console.error('Playwright not found. Please install it using "npm install --save-dev playwright".');
  process.exit(1);
}

const UX_OUTPUT_DIR = path.join(__dirname, '../test-results/ux-capture');
const AUDIT_OUTPUT_DIR = path.join(__dirname, '../design_audit');

const PAGES = {
  "home": "/",
  "blog": "/blog",
  "research": "/research",
  "about": "/about"
};

async function capture() {
  if (!fs.existsSync(UX_OUTPUT_DIR)) {
    fs.mkdirSync(UX_OUTPUT_DIR, { recursive: true });
  }
  if (!fs.existsSync(AUDIT_OUTPUT_DIR)) {
    fs.mkdirSync(AUDIT_OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  let BASE_URL = process.env.CAPTURE_URL || 'http://localhost:3000';
  if (!BASE_URL.endsWith('/')) {
    BASE_URL += '/';
  }
  console.log(`Starting consolidated capture for base URL: ${BASE_URL}`);

  try {
    // 1. Impeccable Design Audit Captures (formerly audit_capture.py)
    for (const [name, pathStr] of Object.entries(PAGES)) {
      console.log(`Auditing page: ${name} (${pathStr})`);
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`${BASE_URL}${pathStr.replace(/^\//, '')}`, { waitUntil: 'networkidle' });

      // Scroll to bottom to trigger lazy loading
      await page.evaluate(getScrollFn());

      // Core captures for Impeccable Audit
      await page.screenshot({
        path: path.join(AUDIT_OUTPUT_DIR, `${name}_full.png`),
        fullPage: true
      });
      await page.screenshot({
        path: path.join(AUDIT_OUTPUT_DIR, `${name}_hero.png`),
        clip: { x: 0, y: 0, width: 1440, height: 600 }
      });

      const gridElement = await page.$(".grid, [class*='Grid'], .cards");
      if (gridElement) {
        await gridElement.screenshot({
          path: path.join(AUDIT_OUTPUT_DIR, `${name}_grid.png`)
        });
      }
    }

    // 2. UX Auditor Viewport Captures (formerly ux-capture.js)
    console.log(`Capturing responsive UX viewports for base URL...`);
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1440, height: 900 }
    ];

    for (const vp of viewports) {
      console.log(`Capturing ${vp.name} (${vp.width}x${vp.height})...`);
      await page.setViewportSize({ width: vp.width, height: vp.height });

      await page.evaluate(getScrollFn());

      await page.screenshot({
        path: path.join(UX_OUTPUT_DIR, `snapshot-${vp.name}.png`),
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

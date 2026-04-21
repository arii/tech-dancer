const { chromium } = require('playwright');
const fs = require('fs');

/**
 * CLI Tool for Agents to capture screenshots for the UX Auditor
 * Usage: node scripts/ux-capture.js <url> <outputDir>
 */

const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 }
];

async function capture() {
  const url = process.argv[2] || 'http://localhost:5173';
  const outputDir = process.argv[3] || './ux-snapshots';

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`🚀 Starting UX Capture for: ${url}`);
  const browser = await chromium.launch();
  const context = await browser.newContext();

  for (const vp of viewports) {
    console.log(`📸 Capturing ${vp.name}...`);
    const page = await context.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });

    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      // Wait for any animations to settle
      await page.waitForTimeout(1000);

      await page.screenshot({
        path: `${outputDir}/${vp.name}.png`,
        fullPage: false
      });
    } catch (e) {
      console.error(`Failed to capture ${vp.name}: ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log(`✅ Done. Snapshots saved to ${outputDir}`);
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});

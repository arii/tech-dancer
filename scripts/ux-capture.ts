import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { disableAnimations } from '../tests/utils/playwright-helpers';

async function capture(url: string, width: number, height: number, outputPath: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width, height }
  });

  try {
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle' });

    // Inject styles to hide common popups or banners if needed
    await disableAnimations(page);

    console.log(`Capturing screenshot (${width}x${height})...`);
    await page.screenshot({ path: outputPath, fullPage: false });
    console.log(`Screenshot saved to ${outputPath}`);
  } catch (error) {
    console.error(`Failed to capture ${url}:`, error);
  } finally {
    await browser.close();
  }
}

const url = process.argv[2] || 'https://boomtick.blog';
const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 }
];

(async () => {
  const outputDir = path.join(process.cwd(), 'public', 'ux-audits');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const vp of viewports) {
    const filename = `audit-${vp.name}.png`;
    const outputPath = path.join(outputDir, filename);
    await capture(url, vp.width, vp.height, outputPath);
  }
})();

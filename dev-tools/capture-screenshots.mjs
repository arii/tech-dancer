import { chromium } from 'playwright';
import { getTargetUrl } from '../scripts/utils/env.mjs';

const routes = [
  { name: 'home', path: '/' },
  { name: 'blog', path: '/blog' },
  { name: 'gear', path: '/gear' },
  { name: 'lab', path: '/lab' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' }
];

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  // Standard desktop viewport, high enough to see most content
  await page.setViewportSize({ width: 1280, height: 1200 });

  const baseUrl = getTargetUrl('http://localhost:3000').replace(/\/$/, '');

  for (const route of routes) {
    try {
      console.log(`📸 Capturing ${route.name} at ${baseUrl}${route.path}...`);
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: 'networkidle', timeout: 30000 });
      // Give some extra time for animations to settle
      await page.waitForTimeout(1000);
      await page.screenshot({ path: `ux_${route.name}.png`, fullPage: true });
      console.log(`✅ Saved ux_${route.name}.png`);
    } catch (err) {
      console.error(`❌ Failed to capture ${route.name}: ${err.message}`);
    }
  }

  await browser.close();
}

capture();

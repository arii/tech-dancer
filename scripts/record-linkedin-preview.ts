import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const PORT = 4173;
  const BASE_URL = `http://localhost:${PORT}`;
  const outputDir = path.resolve(__dirname, '../artifacts/video');
  const tempDir = path.join(outputDir, 'temp-recordings');
  fs.mkdirSync(tempDir, { recursive: true });

  console.log('Starting Vite preview server on root base / ...');
  const server = spawn('pnpm', ['exec', 'vite', 'preview', '--port', String(PORT), '--base', '/'], {
    stdio: 'pipe',
    shell: true,
    env: { ...process.env, VITE_BASE_PATH: '/' }
  });

  server.stdout?.on('data', (d) => process.stdout.write(`[Vite] ${d}`));
  server.stderr?.on('data', (d) => process.stderr.write(`[Vite ERR] ${d}`));

  // Wait for server to boot
  await new Promise((res) => setTimeout(res, 3000));

  console.log('Launching Chromium for smooth LinkedIn video tour...');
  const browser = await chromium.launch({
    headless: true,
  });

  // 1280x720 HD 16:9 for clean LinkedIn playback
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: tempDir,
      size: { width: 1280, height: 720 },
    },
    deviceScaleFactor: 1.25,
  });

  const page = await context.newPage();

  try {
    // 1. Homepage & Hero showcase
    console.log('1. Loading Homepage...');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2200);

    console.log('Showcasing Homepage & Hero Section...');
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let totalHeight = 0;
        const distance = 40;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= 1000) {
            clearInterval(timer);
            resolve();
          }
        }, 45);
      });
    });
    await page.waitForTimeout(1500);

    // 2. Editorial Blog Listing
    console.log('2. Navigating to Editorial Blog...');
    await page.goto(`${BASE_URL}/blog`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.evaluate(() => window.scrollBy({ top: 400, behavior: 'smooth' }));
    await page.waitForTimeout(1600);

    // 3. Featured Article Reading View
    console.log('3. Loading Featured Article...');
    const postLink = page.locator('a[href^="/blog/"]').first();
    if (await postLink.count()) {
      await postLink.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2200);
      await page.evaluate(() => window.scrollBy({ top: 500, behavior: 'smooth' }));
      await page.waitForTimeout(1800);
    }

    // 4. Curated Gear & Merch Catalog
    console.log('4. Navigating to Curated Gear Catalog...');
    await page.goto(`${BASE_URL}/gear`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.evaluate(() => window.scrollBy({ top: 550, behavior: 'smooth' }));
    await page.waitForTimeout(1800);

    // 5. Research & Autonomous AI Lab Experiments
    console.log('5. Navigating to Agentic Research & Lab Experiments...');
    await page.goto(`${BASE_URL}/research`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.evaluate(() => window.scrollBy({ top: 450, behavior: 'smooth' }));
    await page.waitForTimeout(2200);

    console.log('Tour completed successfully.');
  } finally {
    await page.close();
    await context.close();
    await browser.close();
    server.kill();
  }

  // Find generated webm video
  const files = fs.readdirSync(tempDir).filter((f) => f.endsWith('.webm'));
  if (files.length === 0) {
    throw new Error('No recorded video found!');
  }

  const rawVideoPath = path.join(tempDir, files[0]);
  const finalMp4Path = path.join(outputDir, 'boomtick_linkedin_preview.mp4');

  console.log(`Converting ${rawVideoPath} to LinkedIn-ready H.264 MP4 (${finalMp4Path})...`);
  await new Promise<void>((resolve, reject) => {
    const ffmpeg = spawn(
      'ffmpeg',
      [
        '-y',
        '-i',
        rawVideoPath,
        '-c:v',
        'libx264',
        '-preset',
        'slow',
        '-crf',
        '20',
        '-pix_fmt',
        'yuv420p',
        '-r',
        '30',
        '-movflags',
        '+faststart',
        finalMp4Path,
      ],
      { stdio: 'inherit' }
    );
    ffmpeg.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });
  });

  // Clean up temp recordings
  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log(`\n🎉 SUCCESS: High definition LinkedIn MP4 generated at: ${finalMp4Path}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

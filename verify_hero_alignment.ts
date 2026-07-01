import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.goto('http://localhost:4173');

  // Wait for animations and hero
  await page.waitForSelector('.hero-section');
  await page.waitForTimeout(2000); // Wait for animations to finish

  await page.screenshot({ path: '/home/jules/verification/hero_realign_verify.png' });

  const alignment = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const card = document.querySelector('.hero-section').parentElement.nextElementSibling; // This is incorrect based on Grid structure
    // Correct way to find FeaturedGuidePanel sibling
    const grid = document.querySelector('h1').closest('.grid');
    const cardElement = grid.children[1];

    return {
      h1Top: h1?.getBoundingClientRect().top,
      cardTop: cardElement?.getBoundingClientRect().top,
    };
  });

  console.log('Alignment Data:', JSON.stringify(alignment, null, 2));

  await browser.close();
})();

import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  await page.goto('http://localhost:3000');
  await page.waitForSelector('section[role="img"]');
  const classNamesBox1 = await page.$eval('section[role="img"] > div:nth-child(1)', el => el.className);
  console.log('box1 class:', classNamesBox1);
  const classNamesBox2 = await page.$eval('section[role="img"] > div:nth-child(2)', el => el.className);
  console.log('box2 class:', classNamesBox2);
  const box1Style = await page.$eval('section[role="img"] > div:nth-child(1)', el => window.getComputedStyle(el).gridColumn);
  console.log('box1 grid-column:', box1Style);
  const box2Style = await page.$eval('section[role="img"] > div:nth-child(2)', el => window.getComputedStyle(el).gridColumn);
  console.log('box2 grid-column:', box2Style);
  await browser.close();
})();

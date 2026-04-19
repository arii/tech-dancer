import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  console.log('Opening mobile menu...');
  await page.evaluate(() => {
    const menuBtn = Array.from(document.querySelectorAll('button')).find(b => b.querySelector('svg.lucide-menu'));
    if(menuBtn) menuBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  console.log('Clicking mobile search button...');
  await page.evaluate(() => {
    const searchBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Search'));
    if(searchBtn) searchBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  const isSearchOpen = await page.evaluate(() => {
    return !!document.querySelector('input[placeholder="SEARCH REPOSITORY // FILTER BLOG & GEAR"]');
  });
  console.log('Search modal open status:', isSearchOpen);

  await browser.close();
})();

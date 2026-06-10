const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/merch');

  // wait for grid layout to render
  await page.waitForTimeout(2000);

  const items = await page.locator('[data-testid="product-card"]').all();
  for (let i = 0; i < items.length; i++) {
    const images = await items[i].locator('img').all();
    for (let j = 0; j < images.length; j++) {
        const boundingBox = await images[j].boundingBox();
        if (boundingBox) {
            console.log(await images[j].getAttribute('alt'), boundingBox);
        }
    }
  }
  await browser.close();
})();

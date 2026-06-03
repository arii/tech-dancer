
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Navigate to the updated blog post
    await page.goto('http://localhost:3000/blog/2026-06-03-halloween-costumes');

    // Check for the new title
    const title = await page.textContent('h1');
    console.log('Title:', title);

    // Check for the "What You Need" section
    const whatYouNeed = await page.textContent('h3:has-text("What You Need")');
    console.log('What You Need section exists:', !!whatYouNeed);

    // Check for the "Dance-Friendly Costume Checklist" section
    const checklist = await page.textContent('h3:has-text("Dance-Friendly Costume Checklist")');
    console.log('Checklist section exists:', !!checklist);

    // Verify images are present
    const images = await page.$$eval('img', imgs => imgs.map(img => img.src));
    console.log('Images found:', images.length);
    images.forEach(src => console.log('Image src:', src));

    // Verify Mermaid diagram (it should render as an SVG or have a mermaid class)
    const mermaid = await page.$('.mermaid');
    console.log('Mermaid diagram element exists:', !!mermaid);

    // Take a screenshot for visual confirmation
    await page.screenshot({ path: 'updated_pumpkin_post_verification.png', fullPage: true });
    console.log('Screenshot saved to updated_pumpkin_post_verification.png');

  } catch (error) {
    console.error('Verification failed:', error);
  } finally {
    await browser.close();
  }
})();

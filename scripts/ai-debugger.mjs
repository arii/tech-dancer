import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { getTargetUrl } from './utils/env.mjs';

/**
 * Captures a screenshot, converts to Base64, and formats a query for an AI Bot.
 * @param {string} url - The local or remote URL to audit.
 * @param {string} selector - The specific CSS selector to capture (defaults to body).
 */
async function generateAiFixQuery(url, selector = 'body') {
  console.log(`🚀 Auditing ${url} (selector: ${selector})...`);

  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle' });

    // 1. Capture Screenshot as Base64 string
    const element = await page.$(selector);
    if (!element) {
        throw new Error(`Selector "${selector}" not found on page.`);
    }
    const buffer = await element.screenshot();
    const base64Image = buffer.toString('base64');
    const dataUri = `data:image/png;base64,${base64Image}`;

    // 2. Extract context from the page (computed styles / DOM structure)
    const context = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      return {
        html: el.outerHTML.substring(0, 2000), // Increased limit slightly
        computedStyles: {
          fontSize: window.getComputedStyle(el).fontSize,
          color: window.getComputedStyle(el).color,
          backgroundColor: window.getComputedStyle(el).backgroundColor,
          fontFamily: window.getComputedStyle(el).fontFamily,
          padding: window.getComputedStyle(el).padding,
          margin: window.getComputedStyle(el).margin,
          display: window.getComputedStyle(el).display
        }
      };
    }, selector);

    // 3. Format the final "Copy-Paste" output
    const prompt = `
### INSTRUCTIONS for AI Assistant ###
I am using the 'Impeccable' audit tool to fix UI anti-patterns.
Attached is a Base64 representation of a UI component that has failed specific design heuristics.

**Task:** Review the visual layout and the provided HTML/CSS context. Identify issues related to:
1. Typography (Hierarchy, line-height)
2. Spatial Design (Padding, grid-breaking elements)
3. Color & Contrast

**HTML Snippet:**
\`\`\`html
${context.html}
\`\`\`

**Computed Styles:**
${JSON.stringify(context.computedStyles, null, 2)}

**Image Data (Copy/Paste this into the chat or upload the URI):**
${dataUri}

**Please provide the refactored React/TypeScript code and Tailwind/CSS classes to fix these issues.**
    `;

    const outputPath = path.resolve(process.cwd(), 'ai-fix-prompt.txt');
    fs.writeFileSync(outputPath, prompt);
    console.log(`\x1b[32m✔ Success!\x1b[0m AI fix query generated at: ${outputPath}`);
    console.log('You can now copy the contents of that file directly into your AI chat bot.');
  } catch (error) {
    console.error(`\x1b[31m✖ Error during audit:\x1b[0m`, error.message);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
}

// Example usage: node scripts/ai-debugger.js <url> <selector>
const targetUrl = process.argv[2] || getTargetUrl();
const targetSelector = process.argv[3] || 'body';

generateAiFixQuery(targetUrl, targetSelector);

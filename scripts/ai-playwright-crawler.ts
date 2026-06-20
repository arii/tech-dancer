import { chromium, Page } from 'playwright';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage } from '@langchain/core/messages';
import * as fs from 'fs';
import * as path from 'path';

const TMP_DIR = path.join(process.cwd(), '.tmp-crawler');
const SNAPSHOTS_DIR = path.join(TMP_DIR, 'snapshots');

interface InteractiveElement {
  index: number;
  tagName: string;
  text: string;
  selector: string;
  role: string | null;
  location: { x: number; y: number; width: number; height: number };
}

interface Action {
  type: 'click' | 'type' | 'back' | 'scroll';
  selector?: string;
  text?: string;
  reason: string;
}

const MAX_STEPS = 10;

async function getInteractiveElements(page: Page): Promise<InteractiveElement[]> {
  return await page.evaluate(() => {
    const interactiveTags = ['button', 'a', 'input', 'select', 'textarea'];
    const elements: Element[] = [];

    document.querySelectorAll('*').forEach(el => {
      const tagName = el.tagName.toLowerCase();
      const role = el.getAttribute('role');
      const hasClickQuery = el.hasAttribute('onclick');
      const style = window.getComputedStyle(el);
      const isPointer = style.cursor === 'pointer';

      if (interactiveTags.includes(tagName) || role === 'button' || hasClickQuery || isPointer) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden') {
          elements.push(el);
        }
      }
    });

    return elements.map((el, index) => {
      const rect = el.getBoundingClientRect();

      // Add a data attribute for easy selection during the crawl
      el.setAttribute('data-crawler-index', index.toString());

      const inputEl = el as HTMLInputElement;

      return {
        index,
        tagName: el.tagName,
        text: el.textContent?.trim().substring(0, 100) || inputEl.value || inputEl.placeholder || '',
        selector: `[data-crawler-index="${index}"]`,
        role: el.getAttribute('role'),
        location: { x: rect.left, y: rect.top, width: rect.width, height: rect.height }
      };
    });
  });
}

async function runCrawler() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.JULES_API_KEY || '';
  if (!apiKey) {
    console.error('Error: Neither GEMINI_API_KEY nor JULES_API_KEY environment variable is set.');
    process.exit(1);
  }

  const model = new ChatGoogleGenerativeAI({
    model: 'gemini-1.5-flash',
    apiKey,
    maxOutputTokens: 2048,
  });

  // Cleanup old snapshots
  if (fs.existsSync(SNAPSHOTS_DIR)) {
    fs.readdirSync(SNAPSHOTS_DIR).forEach(file => {
      fs.unlinkSync(path.join(SNAPSHOTS_DIR, file));
    });
  } else {
    fs.mkdirSync(SNAPSHOTS_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const visitedStates = new Set<string>();
  const actionHistory: Action[] = [];
  const capturedScreenshots: string[] = [];

  try {
    console.log('Starting AI Crawler...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    for (let step = 0; step < MAX_STEPS; step++) {
      const url = page.url();
      console.log(`\n--- Step ${step + 1}: ${url} ---`);

      const elements = await getInteractiveElements(page);
      const screenshotPath = path.join(SNAPSHOTS_DIR, `step-${step}.png`);
      await page.screenshot({ path: screenshotPath });
      capturedScreenshots.push(screenshotPath);

      const stateHash = `${url}-${elements.length}`;
      if (visitedStates.has(stateHash) && step > 0) {
        console.log('Detected likely loop or repeat state, but continuing exploration.');
      }
      visitedStates.add(stateHash);

      // Decision making with Gemini
      const action = await decideNextAction(model, url, elements, actionHistory, screenshotPath);
      console.log(`Action: ${action.type}${action.selector ? ` on ${action.selector}` : ''} - Reason: ${action.reason}`);

      actionHistory.push(action);

      try {
        if (action.type === 'click' && action.selector) {
          await page.click(action.selector);
        } else if (action.type === 'type' && action.selector && action.text) {
          await page.fill(action.selector, action.text);
          await page.press(action.selector, 'Enter');
        } else if (action.type === 'back') {
          await page.goBack();
        } else if (action.type === 'scroll') {
          await page.mouse.wheel(0, 500);
        }
      } catch (clickError) {
        console.warn(`Failed to execute action ${action.type}:`, (clickError as Error).message);
      }

      await page.waitForTimeout(2000); // Wait for animations/transitions
    }

    console.log('\nExploration complete. Generating final report...');
    const report = await generateVisualReview(model, capturedScreenshots);
    const reportPath = path.join(TMP_DIR, 'report.md');
    fs.writeFileSync(reportPath, report);
    console.log(`✅ Visual review report saved to ${reportPath}`);

  } catch (error) {
    console.error('Crawler failed:', error);
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
}

async function generateVisualReview(model: ChatGoogleGenerativeAI, screenshots: string[]): Promise<string> {
  const prompt = `
You are a senior UI/UX engineer. You have been provided with a series of screenshots captured during an autonomous crawl of a web application.
Your task is to provide a comprehensive visual audit and UX critique based on these discovered states.

Focus on:
1. Visual consistency (colors, fonts, spacing).
2. Layout regressions or edge-case UI states (clipping, overlapping elements).
3. Navigation flow and usability.
4. Professionalism and overall feel.

Format your report in Markdown. Include a summary section and then detail findings for specific screens if relevant.
`;

  const contents: { type: 'text' | 'image_url'; text?: string; image_url?: { url: string } }[] = [{ type: 'text', text: prompt }];

  for (const filePath of screenshots) {
    const buffer = fs.readFileSync(filePath);
    contents.push({
      type: 'image_url',
      image_url: { url: `data:image/png;base64,${buffer.toString('base64')}` }
    });
  }

  const message = new HumanMessage({ content: contents });
  const response = await model.invoke([message]);

  return typeof response.content === 'string' ? response.content : JSON.stringify(response.content);
}

async function decideNextAction(
  model: ChatGoogleGenerativeAI,
  url: string,
  elements: InteractiveElement[],
  history: Action[],
  screenshotPath: string
): Promise<Action> {
  const elementsSummary = elements
    .map(e => `Index ${e.index}: <${e.tagName}> "${e.text}" ${e.role ? `(role: ${e.role})` : ''}`)
    .join('\n');

  const historySummary = history
    .map((a, i) => `Step ${i}: ${a.type} ${a.selector || ''} - ${a.reason}`)
    .join('\n');

  const prompt = `
You are an autonomous web crawler agent. Your goal is to explore as many unique UI states as possible in a web application.
Current URL: ${url}

Interactive elements found on this page:
${elementsSummary}

History of actions taken so far:
${historySummary}

Your task:
1. Analyze the current state and history.
2. Decide on the next best action to discover new components, routes, or interactive states (like modals, dropdowns).
3. Return your decision in JSON format:
{
  "type": "click" | "type" | "back" | "scroll",
  "selector": "[data-crawler-index='X']", (only for click and type)
  "text": "text to type", (only for type)
  "reason": "why you chose this action"
}

Provide ONLY the JSON.
`;

  const screenshotBuffer = fs.readFileSync(screenshotPath);

  const message = new HumanMessage({
    content: [
      { type: 'text', text: prompt },
      {
        type: 'image_url',
        image_url: { url: `data:image/png;base64,${screenshotBuffer.toString('base64')}` }
      }
    ]
  });

  const response = await model.invoke([message]);
  const text = typeof response.content === 'string' ? response.content : JSON.stringify(response.content);

  try {
    // Clean potential markdown blocks
    const jsonStr = text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(jsonStr) as Action;
  } catch (e) {
    console.error('Failed to parse Gemini response:', text, e);
    return { type: 'scroll', reason: 'Failed to parse AI response, falling back to scroll.' };
  }
}

runCrawler().catch(err => {
  console.error(err);
  process.exit(1);
});

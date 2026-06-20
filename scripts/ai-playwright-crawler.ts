import { chromium, Page, Browser } from 'playwright';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage } from '@langchain/core/messages';
import * as fs from 'fs';
import * as path from 'path';
import { pickOptimalGeminiModel } from './lib/modelPicker';

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
const DESTRUCTIVE_KEYWORDS = [
  'delete', 'remove', 'logout', 'signout', 'clear', 'reset', 'destroy',
  'archive', 'trash', 'purge', 'discard', 'quit', 'exit'
];

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
        tagName: el.tagName.toLowerCase(),
        text: el.textContent?.trim().substring(0, 100) || inputEl.value || inputEl.placeholder || '',
        selector: `[data-crawler-index="${index}"]`,
        role: el.getAttribute('role'),
        location: { x: rect.left, y: rect.top, width: rect.width, height: rect.height }
      };
    });
  });
}

function isValidAction(obj: unknown): obj is Action {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false;
  const cast = obj as Record<string, unknown>;

  const allowedKeys = ['type', 'selector', 'text', 'reason'];
  const keys = Object.keys(cast);
  if (keys.some(k => !allowedKeys.includes(k))) return false;

  const validTypes = ['click', 'type', 'back', 'scroll'];

  if (typeof cast.type !== 'string' || !validTypes.includes(cast.type)) return false;
  if (typeof cast.reason !== 'string' || cast.reason.length < 5) return false;

  if (cast.type === 'click' || cast.type === 'type') {
    if (typeof cast.selector !== 'string') return false;
    // Flexible selector check to handle both single and double quotes
    const isDataAttr = cast.selector.startsWith('[data-crawler-index=') && cast.selector.endsWith(']');
    if (!isDataAttr) return false;
  }

  if (cast.type === 'type') {
    if (typeof cast.text !== 'string' || cast.text.length === 0) return false;
  }

  return true;
}

async function cleanupSnapshots() {
  try {
    const dirExists = await fs.promises.access(SNAPSHOTS_DIR).then(() => true).catch(() => false);
    if (dirExists) {
      const files = await fs.promises.readdir(SNAPSHOTS_DIR);
      await Promise.all(files.map(file => fs.promises.unlink(path.join(SNAPSHOTS_DIR, file))));
    } else {
      await fs.promises.mkdir(SNAPSHOTS_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn('Failed to perform initial directory cleanup:', err);
  }
}

async function runCrawler() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.JULES_API_KEY || '';
  if (!apiKey) {
    console.error('Error: Neither GEMINI_API_KEY nor JULES_API_KEY environment variable is set.');
    process.exit(1);
  }

  await cleanupSnapshots();

  let browser: Browser | null = null;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const visitedStates = new Set<string>();
    const actionHistory: Action[] = [];
    const capturedScreenshots: string[] = [];

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
      const modelName = pickOptimalGeminiModel(0);
      const model = new ChatGoogleGenerativeAI({
        model: modelName,
        apiKey,
        maxOutputTokens: 1024,
      });

      const actionObj = await decideNextAction(model, url, elements, actionHistory, screenshotPath);

      if (!isValidAction(actionObj)) {
         console.error('AI returned invalid action, skipping this step:', actionObj);
         continue;
      }
      const action = actionObj;

      console.log(`Action: ${action.type}${action.selector ? ` on ${action.selector}` : ''} - Reason: ${action.reason}`);

      actionHistory.push(action);

      try {
        if ((action.type === 'click' || action.type === 'type') && action.selector) {
          // Robust index extraction handling various quote types
          const indexMatch = action.selector.match(/index=["']?(\d+)["']?/);
          const elementIndex = indexMatch ? parseInt(indexMatch[1], 10) : -1;

          if (isNaN(elementIndex) || elementIndex < 0 || elementIndex >= elements.length) {
             console.warn(`AI selected out-of-bounds or invalid element index: ${elementIndex}. discovered elements: ${elements.length}`);
             continue;
          }

          const targetElementMeta = elements[elementIndex];

          // Safety: Don't click destructive keywords
          const isDestructive = DESTRUCTIVE_KEYWORDS.some(k =>
             targetElementMeta.text.toLowerCase().includes(k) ||
             (targetElementMeta.role || '').toLowerCase().includes(k)
          );

          if (isDestructive && action.type === 'click') {
            console.warn(`Safety check: Skipping click on likely destructive element "${targetElementMeta.text}" (role: ${targetElementMeta.role})`);
            continue;
          }

          const element = await page.$(action.selector);

          if (element && await element.isVisible()) {
            if (action.type === 'click') {
              await page.click(action.selector);
            } else if (action.text) {
              // Verify it's an input-capable element before typing
              const isEditable = await element.evaluate(el => {
                const tag = el.tagName.toLowerCase();
                return tag === 'input' || tag === 'textarea' || (el as HTMLElement).isContentEditable;
              });

              if (isEditable) {
                await page.fill(action.selector, action.text);
                await page.press(action.selector, 'Enter');
              } else {
                console.warn(`Attempted to type into non-editable element <${targetElementMeta.tagName}>. Skipping.`);
              }
            }
          } else {
            console.warn(`Element ${action.selector} not found or not visible. Skipping action.`);
          }
        } else if (action.type === 'back') {
          await page.goBack();
        } else if (action.type === 'scroll') {
          await page.mouse.wheel(0, 500);
        }
      } catch (execError) {
        console.warn(`Failed to execute action ${action.type}:`, (execError as Error).message);
      }

      await page.waitForTimeout(2000); // Wait for animations/transitions
    }

    console.log('\nExploration complete. Generating final report...');
    const estimatedReportTokens = capturedScreenshots.length * 1000;
    const reportModelName = pickOptimalGeminiModel(estimatedReportTokens);
    const reportModel = new ChatGoogleGenerativeAI({
      model: reportModelName,
      apiKey,
      maxOutputTokens: 2048,
    });

    const report = await generateVisualReview(reportModel, capturedScreenshots);
    const reportPath = path.join(TMP_DIR, 'report.md');
    await fs.promises.writeFile(reportPath, report);
    console.log(`✅ Visual review report saved to ${reportPath} (Model: ${reportModelName})`);

  } catch (error) {
    console.error('Crawler failed:', error);
  } finally {
    if (browser) await browser.close();
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
    const buffer = await fs.promises.readFile(filePath);
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
): Promise<unknown> {
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
  "selector": "[data-crawler-index=\\"X\\"]", (strictly use double quotes around X)
  "text": "text to type", (only for type)
  "reason": "why you chose this action"
}

SAFETY RULES:
- DO NOT click on destructive buttons (delete, remove, logout, signout, archive, clear, reset).
- DO NOT navigate to external third-party sites.
- If you reach a state with no new interactive elements, try 'back' or 'scroll'.

Provide ONLY the JSON.
`;

  const screenshotBuffer = await fs.promises.readFile(screenshotPath);

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
    const parsed = JSON.parse(jsonStr);

    if (isValidAction(parsed)) {
      return parsed;
    } else {
      console.warn('AI returned invalid action structure:', parsed);
    }
  } catch (e) {
    console.error('Failed to parse Gemini response:', text, e);
  }

  return { type: 'scroll', reason: 'Fallback to scroll due to invalid or unparseable AI response.' };
}

runCrawler().catch(err => {
  console.error(err);
  process.exit(1);
});

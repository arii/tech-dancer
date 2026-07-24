import { chromium, Page, Browser } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import { pickOptimalGeminiModel } from '../boomtick-pkg/lib/modelPicker';

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
      el.setAttribute('data-crawler-index', index.toString());
      const inputEl = el as HTMLInputElement;

      return {
        index,
        tagName: el.tagName,
        text: el.textContent?.trim().substring(0, 50) || inputEl.value || inputEl.placeholder || '', // Cut to 50 chars max
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
  const validTypes = ['click', 'type', 'back', 'scroll'];
  if (typeof cast.type !== 'string' || !validTypes.includes(cast.type)) return false;
  if (typeof cast.reason !== 'string') return false;
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
  let apiKey: string;
  try {
    apiKey = getApiKey();
    if (!process.env.GEMINI_API_KEY) process.env.GEMINI_API_KEY = apiKey;
  } catch {
    console.error('Error: API Key missing.');
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
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });

    for (let step = 0; step < MAX_STEPS; step++) {
      const url = page.url();
      console.log(`\n--- Step ${step + 1}: ${url} ---`);

      const elements = await getInteractiveElements(page);
      const screenshotPath = path.join(SNAPSHOTS_DIR, `step-${step}.png`);
      await page.screenshot({ path: screenshotPath });
      capturedScreenshots.push(screenshotPath);

      const stateHash = `${url}-${elements.length}`;
      visitedStates.add(stateHash);

      const modelName = await pickOptimalGeminiModel(0);

      const action = await decideNextAction(modelName, url, elements, actionHistory, screenshotPath);
      console.log(`Action: ${action.type}${action.selector ? ` on ${action.selector}` : ''} - Reason: ${action.reason}`);

      actionHistory.push(action);

      try {
        if ((action.type === 'click' || action.type === 'type') && action.selector) {
          const indexMatch = action.selector.match(/index=["']?(\d+)["']?/);
          const elementIndex = indexMatch ? parseInt(indexMatch[1], 10) : -1;

          if (isNaN(elementIndex) || elementIndex < 0 || elementIndex >= elements.length) {
             console.warn(`Invalid index: ${elementIndex}.`);
             continue;
          }

          const targetElementMeta = elements[elementIndex];
          const isDestructive = DESTRUCTIVE_KEYWORDS.some(k =>
             targetElementMeta.text.toLowerCase().includes(k) ||
             (targetElementMeta.role || '').toLowerCase().includes(k)
          );

          if (isDestructive && action.type === 'click') {
            console.warn(`Skipping destructive element "${targetElementMeta.text}"`);
            continue;
          }

          const element = await page.$(action.selector);
          if (element && await element.isVisible()) {
            if (action.type === 'click') {
              await page.click(action.selector);
            } else if (action.text) {
              const isEditable = await element.evaluate(el => {
                const tag = el.tagName.toLowerCase();
                return tag === 'input' || tag === 'textarea' || (el as HTMLElement).isContentEditable;
              });

              if (isEditable) {
                await page.fill(action.selector, action.text);
                await page.press(action.selector, 'Enter');
              }
            }
          }
        } else if (action.type === 'back') {
          await page.goBack();
        } else if (action.type === 'scroll') {
          await page.mouse.wheel(0, 500);
        }
      } catch (execError) {
        console.warn(`Failed to execute action ${action.type}:`, (execError as Error).message);
      }

      await page.waitForTimeout(2000);
    }

    console.log('\nExploration complete. Generating final report...');
    const estimatedReportTokens = capturedScreenshots.length * 1000;
    const reportModelName = await pickOptimalGeminiModel(estimatedReportTokens);

    const report = await generateVisualReview(reportModelName, capturedScreenshots);
    const reportPath = path.join(TMP_DIR, 'report.md');
    await fs.promises.writeFile(reportPath, report);
    console.log(`✅ Visual review report saved to ${reportPath} (Model: ${reportModelName})`);

  } catch (error) {
    console.error('Crawler failed:', error);
  } finally {
    if (browser) await browser.close();
  }
}

interface GeminiContentPart {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
}

interface GeminiPayload {
  contents: {
    parts: GeminiContentPart[];
  }[];
  generationConfig?: Record<string, unknown>;
}

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: {
        text?: string;
      }[];
    };
  }[];
}

function getApiKey(): string {
  const key = process.env.GEMINI_API_KEY || process.env.JULES_API_KEY || '';
  if (!key) {
    throw new Error('GEMINI_API_KEY is not set');
  }
  return key;
}

async function callGeminiAPI(modelName: string, payload: GeminiPayload): Promise<Response> {
  const apiKey = getApiKey();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey
    },
    body: JSON.stringify(payload)
  });
}

async function generateVisualReview(modelName: string, screenshots: string[]): Promise<string> {
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

  const parts: { text?: string; inlineData?: { mimeType: string, data: string } }[] = [{ text: prompt }];

  for (const filePath of screenshots) {
    const buffer = await fs.promises.readFile(filePath);
    parts.push({
      inlineData: {
        mimeType: 'image/png',
        data: buffer.toString('base64')
      }
    });
  }

  const payload = {
    contents: [{ parts }]
  };

  try {
    const apiResponse = await callGeminiAPI(modelName, payload);

    if (!apiResponse.ok) {
      console.error(`Gemini API Error: ${apiResponse.status} ${apiResponse.statusText}`);
      return 'No review generated due to API restriction.';
    }

    const data = await apiResponse.json() as GeminiResponse;
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  } catch (error) {
    console.error(`Gemini API Request failed: ${error}`);
    return 'No review generated due to API request failure.';
  }
}

async function decideNextAction(
  modelName: string,
  url: string,
  elements: InteractiveElement[],
  history: Action[],
  screenshotPath: string
): Promise<Action> {

  // OPTIMIZATION 1: Drastically slice text strings and exclude locations
  const elementsSummary = elements
    .map(e => `[${e.index}] <${e.tagName}> "${e.text}" ${e.role ? `(${e.role})` : ''}`)
    .join('\n');

  // OPTIMIZATION 2: Only show the last 4 actions to prevent ballooning history tokens
  const historySummary = history
    .slice(-4)
    .map(a => `${a.type} ${a.selector || ''}`)
    .join('\n');

  // OPTIMIZATION 3: Shortened systemic tone instruction since JSON mode handles structure constraints
  const prompt = `URL: ${url}
Elements available:
${elementsSummary}

Recent Actions:
${historySummary}

Task: Choose the next action to explore new states. Format selector exactly as "[data-crawler-index="X"]".
Do not select destructive elements.`;

  const screenshotBuffer = await fs.promises.readFile(screenshotPath);

  const payload = {
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: 'image/png',
              data: screenshotBuffer.toString('base64')
            }
          }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          type: { type: "STRING", enum: ["click", "type", "back", "scroll"] },
          selector: { type: "STRING" },
          text: { type: "STRING" },
          reason: { type: "STRING" }
        },
        required: ["type", "reason"]
      }
    }
  };

  try {
    const apiResponse = await callGeminiAPI(modelName, payload);

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error(`Gemini API Error: ${apiResponse.status} ${apiResponse.statusText} - ${errorText}`);
      return { type: 'scroll', reason: 'Fallback due to API error.' };
    }

    const data = await apiResponse.json() as GeminiResponse;
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    try {
      const parsed = JSON.parse(text.trim());
      if (isValidAction(parsed)) return parsed;
    } catch {
      console.error('JSON parse fail', text);
    }
  } catch (error) {
    console.error(`Gemini API Request failed: ${error}`);
  }

  return { type: 'scroll', reason: 'Fallback due to parse error.' };
}

runCrawler().catch(err => {
  console.error(err);
  process.exit(1);
});

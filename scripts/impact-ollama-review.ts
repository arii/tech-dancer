import * as fs from 'fs';
import * as path from 'path';
import { ChatOllama } from '@langchain/ollama';
import { HumanMessage } from '@langchain/core/messages';

// ── Types ──────────────────────────────────────────────────────────────────

interface VisualRouteSummary {
  route: string;
  slug: string;
  differencePercent: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  beforeCroppedPath?: string;
  afterCroppedPath?: string;
  diffCroppedPath?: string;
  beforePath: string;
  afterPath: string;
  diffPath?: string;
}

interface VisualSummary {
  routes: VisualRouteSummary[];
}

interface RouteReview {
  route: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  differencePercent: number;
  feedback: string;
  tokens: number;
  cost: number;
}

// ── Config ─────────────────────────────────────────────────────────────────

const ARTIFACTS_DIR = path.join(process.cwd(), 'artifacts');
const VISUAL_SUMMARY_PATH = path.join(ARTIFACTS_DIR, 'visual-review', 'summary.json');
const DOM_REVIEW_DIR = path.join(ARTIFACTS_DIR, 'dom-review');
const AGENT_REPORT_PATH = path.join(ARTIFACTS_DIR, 'ollama-review.md');

const REVIEW_PROMPT = `You are a strict, senior frontend engineer reviewing a pull request for visual regressions.
You are given three full-page screenshots:
1. BEFORE — the page prior to this PR
2. AFTER — the page after this PR
3. DIFF — a pixel diff highlighting changed regions in red

You are ALSO provided with the exact DOM Text Diff.
YOUR RULES:
- Use the DOM Text Diff as the ABSOLUTE GROUND TRUTH for any text changes. Do not guess or attempt to read blurry text from the screenshots.
- Evaluate the changes (✅ INTENTIONAL or ❌ BUG/REGRESSION).
- Focus on layout shifts, broken spacing, contrast issues, or clipping.
- If the change is intentional, evaluate its visual quality and provide 1-2 actionable recommendations for further design/UI improvement (e.g., 'Consider adding 4px more padding to the new element').

Format your response as a concise, bulleted list. Be direct and actionable. Make sure to include "Recommendations for Improvement" if applicable.`;

// ── Ollama client ──────────────────────────────────────────────────────────

function createModel(): ChatOllama {
  return new ChatOllama({
    model: process.env.OLLAMA_MODEL || 'llava',
    baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
    temperature: 0.1,
  });
}

// ── Image helpers ──────────────────────────────────────────────────────────

function imageToBase64(filePath: string): string {
  return fs.readFileSync(filePath).toString('base64');
}

// ── Per-route review ───────────────────────────────────────────────────────

async function reviewRoute(
  model: ChatOllama,
  summary: VisualRouteSummary
): Promise<RouteReview> {
  const beforePath = summary.beforePath;
  const afterPath = summary.afterPath;
  const diffPath = summary.diffPath;

  // 1. Grab the DOM diff for ground truth
  const domDiffPath = path.join(DOM_REVIEW_DIR, summary.slug, 'diff.txt');
  let domDiffContext = 'No DOM diff available.';
  if (fs.existsSync(domDiffPath)) {
    const diffContent = fs.readFileSync(domDiffPath, 'utf8');
    // Truncate to avoid exploding the context window on massive changes
    domDiffContext = diffContent.length > 3000
      ? diffContent.slice(0, 3000) + '\n...[TRUNCATED]'
      : diffContent;
  }

  // 2. Build the payload
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const baseContent: Array<any> = [
    { type: 'text', text: REVIEW_PROMPT },
    { type: 'text', text: `Route: ${summary.route} | Pixel difference: ${summary.differencePercent.toFixed(2)}% | Severity: ${summary.severity}` },
    { type: 'text', text: `DOM TEXT DIFF:\n\n${domDiffContext}` },
    { type: 'image_url', image_url: `data:image/png;base64,${imageToBase64(beforePath)}` },
    { type: 'image_url', image_url: `data:image/png;base64,${imageToBase64(afterPath)}` },
  ];

  if (diffPath && fs.existsSync(diffPath)) {
    baseContent.push(
      { type: 'image_url', image_url: `data:image/png;base64,${imageToBase64(diffPath)}` }
    );
  }

  const message = new HumanMessage({ content: baseContent });
  const response = await model.invoke([message]);

  const usageMetadata = response.usage_metadata;
  const totalTokens = usageMetadata?.total_tokens ?? 0;

  // Cost is practically zero for local Ollama
  const cost = 0;

  return {
    route: summary.route,
    severity: summary.severity,
    differencePercent: summary.differencePercent,
    feedback: typeof response.content === 'string'
      ? response.content
      : JSON.stringify(response.content),
    tokens: totalTokens,
    cost: cost,
  };
}

// ── Report generation ──────────────────────────────────────────────────────

function severityEmoji(severity: 'LOW' | 'MEDIUM' | 'HIGH'): string {
  if (severity === 'HIGH') return '🔴';
  if (severity === 'MEDIUM') return '🟡';
  return '🟢';
}

function generateMarkdownReport(reviews: RouteReview[]): string {
  const highCount = reviews.filter(r => r.severity === 'HIGH').length;
  const medCount = reviews.filter(r => r.severity === 'MEDIUM').length;
  const lowCount = reviews.filter(r => r.severity === 'LOW').length;

  const prNumber = process.env.PR_NUMBER;
  const prLink = prNumber ? `[PR #${prNumber}](https://github.com/${process.env.GITHUB_REPOSITORY}/pull/${prNumber})` : 'this PR';

  const sections = reviews.map(r => `
### ${severityEmoji(r.severity)} \`${r.route}\`

**Pixel diff:** ${r.differencePercent.toFixed(2)}%

${r.feedback}
`).join('\n---\n');

  return `## 🦙 Ollama Visual Review

> Powered by Ollama Vision + Blast-Radius Analyzer

**Summary:** 🔴 ${highCount} high · 🟡 ${medCount} medium · 🟢 ${lowCount} low
**Reviewing:** ${prLink}

${sections}

---
*Generated by impact-ollama-review — [Blast-Radius Analyzer](https://boomtick.blog/research)*
`;
}

// ── GitHub PR comment ──────────────────────────────────────────────────────

async function postPRComment(body: string): Promise<void> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY;
  const prNumber = process.env.PR_NUMBER;

  if (!token || !repo || !prNumber) {
    console.warn('⚠️  Skipping PR comment — GITHUB_TOKEN, GITHUB_REPOSITORY, or PR_NUMBER not set.');
    return;
  }

  const url = `https://api.github.com/repos/${repo}/issues/${prNumber}/comments`;

  // Check for existing comments from this bot to avoid spamming the PR
  const getCommentsResponse = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
  });

  if (getCommentsResponse.ok) {
    const comments = await getCommentsResponse.json() as Array<{
      id: number;
      body: string;
      user: { type: string };
    }>;
    const existingComment = comments.find(c =>
      c.user.type === 'Bot' && c.body.includes('## 🦙 Ollama Visual Review')
    );

    if (existingComment) {
      const updateUrl = `https://api.github.com/repos/${repo}/issues/comments/${existingComment.id}`;
      const updateResponse = await fetch(updateUrl, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body }),
      });

      if (!updateResponse.ok) {
        const text = await updateResponse.text();
        throw new Error(`GitHub API error ${updateResponse.status}: ${text}`);
      }

      console.log('✅ Updated existing PR comment');
      return;
    }
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ body }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub API error ${response.status}: ${text}`);
  }

  console.log('✅ Posted PR comment');
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  // Assuming Ollama is running locally, no API key required

  if (!fs.existsSync(VISUAL_SUMMARY_PATH)) {
    throw new Error('Missing visual summary. Run pnpm impact:visual-diff first.');
  }

  const summary: VisualSummary = JSON.parse(fs.readFileSync(VISUAL_SUMMARY_PATH, 'utf8'));

  // Only review routes with actual visual changes
  // Limit to top 5 routes by difference percentage to manage costs
  const MAX_ROUTES = 5;
  let routesToReview = summary.routes
    .filter(r => r.differencePercent > 0)
    .sort((a, b) => b.differencePercent - a.differencePercent);

  const totalRoutes = routesToReview.length;
  if (routesToReview.length > MAX_ROUTES) {
    console.log(`⚠️  Too many routes changed (${totalRoutes}). Limiting review to the top ${MAX_ROUTES}.`);
    routesToReview = routesToReview.slice(0, MAX_ROUTES);
  }

  if (routesToReview.length === 0) {
    console.log('✅ No visual changes detected — skipping agent review.');
    fs.writeFileSync(AGENT_REPORT_PATH, '## 🦙 Ollama Visual Review\n\nNo visual changes detected.\n');
    return;
  }

  console.log(`🤖 Reviewing ${routesToReview.length} route(s) with Ollama...`);

  const model = createModel();
  const reviews: RouteReview[] = [];

  for (const route of routesToReview) {
    console.log(`  → ${route.route} (${route.severity}, ${route.differencePercent.toFixed(2)}%)`);
    const review = await reviewRoute(model, route);
    console.log(`    Feedback: ${review.feedback}`);
    reviews.push(review);
  }

  const report = generateMarkdownReport(reviews);

  // Write local report
  fs.writeFileSync(AGENT_REPORT_PATH, report);
  console.log(`✅ Local report written to ${AGENT_REPORT_PATH}`);

  // Post to GitHub PR
  await postPRComment(report);
}

main().catch(error => {
  console.error(`❌ Agent review failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});

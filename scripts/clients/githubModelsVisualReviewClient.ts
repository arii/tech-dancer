import * as fs from 'fs';
import * as path from 'path';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';
import { DOM_REVIEW_DIR, REVIEW_PROMPT } from '../lib/visualReviewConstants';
import { imageToBase64 } from '../lib/visualReviewUtils';
import type { LLMClientStrategy } from '../lib/visualReviewOrchestrator';
import type { RouteReview, VisualRouteSummary } from '../lib/visualReviewTypes';

function createModel(): ChatOpenAI {
  const apiKey = process.env.GITHUB_TOKEN;
  if (!apiKey) throw new Error('Missing GITHUB_TOKEN environment variable');

  return new ChatOpenAI({
    modelName: process.env.GITHUB_MODELS_MODEL || 'gpt-4o',
    apiKey: apiKey,
    configuration: {
      baseURL: 'https://models.inference.ai.azure.com',
    },
    maxTokens: 1024,
    temperature: 0.1,
  });
}

export const githubModelsVisualReviewClient: LLMClientStrategy = {
  botName: 'impact-github-models-review',
  reportTitle: '🐙 GitHub Models Visual Review',
  botTagline: 'Powered by GitHub Models Vision + Blast-Radius Analyzer',
  reportFileName: 'github-models-review.md',

  invokeReview: async (summary: VisualRouteSummary): Promise<RouteReview> => {
    const model = createModel();
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
      { type: 'text', text: 'BEFORE' },
      { type: 'image_url', image_url: { url: `data:image/png;base64,${imageToBase64(beforePath)}` } },
      { type: 'text', text: 'AFTER' },
      { type: 'image_url', image_url: { url: `data:image/png;base64,${imageToBase64(afterPath)}` } },
    ];

    if (diffPath && fs.existsSync(diffPath)) {
      baseContent.push(
        { type: 'text', text: 'VISUAL DIFF' },
        { type: 'image_url', image_url: { url: `data:image/png;base64,${imageToBase64(diffPath)}` } }
      );
    }

    const message = new HumanMessage({ content: baseContent });
    const response = await model.invoke([message]);

    const usageMetadata = response.usage_metadata;
    const totalTokens = usageMetadata?.total_tokens ?? 0;

    // Approximating cost for general OpenAI API usage (e.g. gpt-4o) if used over GitHub models natively
    // GitHub Models are currently free/rate-limited depending on the tier.
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
};

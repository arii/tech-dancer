import * as fs from 'fs';
import * as path from 'path';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage } from '@langchain/core/messages';
import { DOM_REVIEW_DIR, REVIEW_PROMPT } from '../lib/visualReviewConstants';
import { imageToBase64 } from '../lib/visualReviewUtils';
import type { LLMClientStrategy } from '../lib/visualReviewOrchestrator';
import type { RouteReview, VisualRouteSummary } from '../lib/visualReviewTypes';

function createModel(): ChatGoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('Missing GEMINI_API_KEY environment variable');

  return new ChatGoogleGenerativeAI({
    model: 'gemini-3.5-flash',
    apiKey,
    maxOutputTokens: 1024,
  });
}

export const geminiVisualReviewClient: LLMClientStrategy = {
  botName: 'impact-gemini-review',
  reportTitle: '👁️ Visual Review Agent',
  botTagline: 'Powered by Gemini Vision + Blast-Radius Analyzer',
  reportFileName: 'gemini-review.md',

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
    const baseContent: Array<{ type: string; text?: string; image_url?: { url: string } }> = [
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
    const inputTokens = usageMetadata?.input_tokens ?? 0;
    const outputTokens = usageMetadata?.output_tokens ?? 0;
    const totalTokens = usageMetadata?.total_tokens ?? 0;

    // Gemini 3.5 Flash pricing (approx)
    // Input: $0.075 / 1 million tokens
    // Output: $0.30 / 1 million tokens
    const cost = (inputTokens / 1_000_000) * 0.075 + (outputTokens / 1_000_000) * 0.30;

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

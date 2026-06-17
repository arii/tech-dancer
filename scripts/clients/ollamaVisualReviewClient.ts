import * as fs from 'fs';
import * as path from 'path';
import { ChatOllama } from '@langchain/ollama';
import { HumanMessage } from '@langchain/core/messages';
import { DOM_REVIEW_DIR, REVIEW_PROMPT } from '../lib/visualReviewConstants';
import { imageToBase64 } from '../lib/visualReviewUtils';
import type { LLMClientStrategy } from '../lib/visualReviewOrchestrator';
import type { RouteReview, VisualRouteSummary } from '../lib/visualReviewTypes';

function createModel(): ChatOllama {
  // Use baseUrl explicitly as it may be necessary depending on the environment
  return new ChatOllama({
    model: process.env.OLLAMA_MODEL || 'llava',
    baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
    temperature: 0.1,
    maxRetries: 3
  });
}

export const ollamaVisualReviewClient: LLMClientStrategy = {
  botName: 'impact-ollama-review',
  reportTitle: '🦙 Ollama Visual Review',
  botTagline: 'Powered by Ollama Vision + Blast-Radius Analyzer',
  reportFileName: 'ollama-review.md',

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
};

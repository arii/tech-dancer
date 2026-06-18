import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';
import { buildVisualReviewPayload, parseLLMVerdict } from '../lib/visualReviewUtils';
import type { LLMClientStrategy } from '../lib/visualReviewOrchestrator';
import type { RouteReview, VisualRouteSummary } from '../lib/visualReviewTypes';

function createModel(): ChatOpenAI {
  const apiKey = process.env.GITHUB_TOKEN;
  if (!apiKey) {
    throw new Error('Review failed: GITHUB_TOKEN is not set. Ensure the secret is available in your workflow environment.');
  }

  return new ChatOpenAI({
    modelName: process.env.GITHUB_MODELS_MODEL || 'gpt-4o-mini',
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
    const baseContent = buildVisualReviewPayload(summary);
    const message = new HumanMessage({ content: baseContent });
    const response = await model.invoke([message]);

    const usageMetadata = response.usage_metadata;
    const totalTokens = usageMetadata?.total_tokens ?? 0;

    // Approximating cost for general OpenAI API usage (e.g. gpt-4o) if used over GitHub models natively
    // GitHub Models are currently free/rate-limited depending on the tier.
    const cost = 0;

    const feedback = typeof response.content === 'string'
      ? response.content
      : JSON.stringify(response.content);

    return {
      route: summary.route,
      severity: summary.severity,
      differencePercent: summary.differencePercent,
      feedback: feedback,
      tokens: totalTokens,
      cost: cost,
      llmVerdict: parseLLMVerdict(feedback),
    };
  }
};

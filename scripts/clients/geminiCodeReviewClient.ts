import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage } from '@langchain/core/messages';
import {
  parseCodeReviewVerdict,
  parseCodeReviewStateDetailed,
  estimateMaxOutputTokens,
  budgetInputContext,
  buildReviewPayload,
  calculateEstimatedTokens
} from '../lib/codeReviewUtils';

import { buildSystemPrompt } from '../lib/buildCodeReviewPrompt';

import { pickGeminiModel, getGeminiPricing } from '../lib/geminiModelPicker';

import type { CodeReviewSummary, CodeReviewResult } from '../lib/codeReviewTypes';
import type { CodeReviewClientStrategy } from '../lib/codeReviewOrchestrator';

function createModel(modelName: string, maxOutputTokens: number = 1500): ChatGoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('Missing GEMINI_API_KEY environment variable');

  return new ChatGoogleGenerativeAI({
    model: modelName,
    apiKey,
    maxOutputTokens: maxOutputTokens,
  });
}

export const geminiCodeReviewClient: CodeReviewClientStrategy = {
  botName: 'gemini-code-review',
  reportTitle: '👁️ Gemini Code Review Agent',
  botTagline: 'Powered by Gemini 3.x',
  reportFileName: 'gemini-code-review.md',

  invokeReview: async (summary: CodeReviewSummary): Promise<CodeReviewResult> => {
    const systemPrompt = buildSystemPrompt(summary);
    const { diffText, externalText } = budgetInputContext(systemPrompt, summary);

    const estimatedInputTokens = summary.estimatedInputTokens || calculateEstimatedTokens([systemPrompt, diffText, externalText || '']);
    // For code review, we prefer Pro if the diff is complex/large, otherwise Flash.
    const preferredTier = (estimatedInputTokens > 15000 || (summary.previousState?.findings.length ?? 0) > 5) ? 'pro' : 'flash';
    const modelName = pickGeminiModel(preferredTier, estimatedInputTokens);

    const maxOutputTokens = estimateMaxOutputTokens(summary);
    const model = createModel(modelName, maxOutputTokens);
    const baseContent = buildReviewPayload(systemPrompt, diffText, externalText);

    const message = new HumanMessage({ content: baseContent });

    const response = await model.invoke([message]);


    const usageMetadata = response.usage_metadata as any;
    const inputTokens = usageMetadata?.input_tokens ?? 0;
    const outputTokens = usageMetadata?.output_tokens ?? 0;
    const totalTokens = usageMetadata?.total_tokens ?? 0;
    const cacheTokens = usageMetadata?.cache_read_tokens || 0;

    const pricing = getGeminiPricing(modelName);
    const cost = pricing ? (inputTokens / 1_000_000) * pricing.inputCostPerM + (outputTokens / 1_000_000) * pricing.outputCostPerM : 0;

    const finishReason = (response as { response_metadata?: { finish_reason?: string } })
      .response_metadata?.finish_reason;
    const isTruncated = finishReason === 'length';
    if (isTruncated) {
      console.warn(`⚠️  gemini-code-review output truncated (finish_reason: length, tokens: ${totalTokens}).`);
    }

    const feedback = typeof response.content === 'string'
      ? response.content
      : JSON.stringify(response.content);

    const parsedState = parseCodeReviewStateDetailed(feedback);

    return {
      feedback: feedback,
      tokens: totalTokens,
      inputTokens,
      outputTokens,
      cacheTokens,
      cost: cost,
      modelName: modelName,
      llmVerdict: parseCodeReviewVerdict(feedback),
      state: parsedState.state,
      truncated: isTruncated,
      parseError: parsedState.parseError,
    };
  }
};

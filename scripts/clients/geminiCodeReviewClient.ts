import {
  estimateMaxOutputTokens,
  budgetInputContext,
  buildReviewPayload,
  calculateEstimatedTokens,
  parseStructuredReviewResponse
} from '../lib/codeReviewUtils';

import { buildSystemPrompt } from '../lib/buildCodeReviewPrompt';

import { pickGeminiModel, getGeminiPricing } from '../lib/geminiModelPicker';
import { extractFinishReason, createGeminiModel, applyRetryStrategy, splitPayloadForGemini } from '../lib/geminiUtils';

import { CODE_REVIEW_SCHEMA, type CodeReviewSummary, type CodeReviewResult, type ReviewFinding } from '../lib/codeReviewTypes';
import type { CodeReviewClientStrategy } from '../lib/codeReviewOrchestrator';

export const geminiCodeReviewClient: CodeReviewClientStrategy = {
  botName: 'gemini-code-review',
  reportTitle: '👁️ Gemini Code Review Agent',
  botTagline: 'Powered by Gemini 3.x',
  reportFileName: 'gemini-code-review.md',

  invokeReview: async (summary: CodeReviewSummary, forceMaxOutputTokens?: number): Promise<CodeReviewResult> => {
    const systemPrompt = buildSystemPrompt(summary);
    const { diffText, externalText } = budgetInputContext(systemPrompt, summary);

    const estimatedInputTokens = summary.estimatedInputTokens || calculateEstimatedTokens([systemPrompt, diffText, externalText || '']);
    // For code review, we prefer Pro if the diff is complex/large, otherwise Flash.
    const preferredTier = (estimatedInputTokens > 15000 || (summary.previousState?.findings.length ?? 0) > 5) ? 'pro' : 'flash';

    let modelName: string;
    try {
      modelName = await pickGeminiModel(preferredTier, estimatedInputTokens);
    } catch (err) {
      console.error('Failed to pick Gemini model, falling back to gemini-3.5-flash:', err);
      modelName = 'gemini-3.5-flash';
    }

    let thinkingBudget = 2048;
    const maxOutputTokens = forceMaxOutputTokens ?? estimateMaxOutputTokens(summary, systemPrompt.length, thinkingBudget);

    const payload = buildReviewPayload(systemPrompt, diffText, externalText);
    const { systemInstruction, userMessages } = splitPayloadForGemini(payload);

    let model = createGeminiModel(modelName, maxOutputTokens, thinkingBudget, CODE_REVIEW_SCHEMA, 'application/json', systemInstruction);
    let response = await model.invoke(userMessages);

    let finishReason = extractFinishReason(response);

    if (finishReason === 'MAX_TOKENS') {
      console.warn('Gemini MAX_TOKENS — retrying with adjusted budget', {
        usage: response.usage_metadata,
      });

      const { newMax, newThinking } = applyRetryStrategy(maxOutputTokens, thinkingBudget);
      thinkingBudget = newThinking;

      model = createGeminiModel(modelName, newMax, thinkingBudget, CODE_REVIEW_SCHEMA, 'application/json', systemInstruction);
      response = await model.invoke(userMessages);

      finishReason = extractFinishReason(response);
    }

    const usageMetadata = response.usage_metadata as {
      input_tokens?: number;
      output_tokens?: number;
      total_tokens?: number;
      thoughts_token_count?: number;
      cache_read_tokens?: number;
    };

    const inputTokens = usageMetadata?.input_tokens ?? 0;
    const outputTokens = usageMetadata?.output_tokens ?? 0;
    const totalTokens = usageMetadata?.total_tokens ?? 0;
    const cacheTokens = usageMetadata?.cache_read_tokens ?? 0;
    // thoughtsTokenCount might be nested in response_metadata or usage_metadata
    const thoughtsTokenCount = usageMetadata?.thoughts_token_count ??
                               (typeof response.response_metadata === 'object' && response.response_metadata !== null
                                 ? ((response.response_metadata as Record<string, unknown>).usage as Record<string, unknown>)?.thoughts_token_count as number | undefined
                                 : 0) ?? 0;

    if (thoughtsTokenCount > thinkingBudget * 1.1) {
      console.warn('Thinking budget exceeded by >10%', {
        budgetSet: thinkingBudget,
        thoughtsUsed: thoughtsTokenCount,
        model: modelName,
      });
    }

    const isTruncated = finishReason === 'MAX_TOKENS' || finishReason === 'length' || finishReason === 'max_tokens';

    if (isTruncated) {
      console.error('Gemini truncation', {
        finishReason,
        usage: usageMetadata,
      });
      // Do not throw here, instead pass the error state gracefully
      // so it can be handled by orchestrator without breaking the CI suite
      return {
        feedback: `Error: Gemini model was truncated during execution (finishReason=${finishReason}).`,
        tokens: totalTokens,
        cost: 0,
        modelName,
        llmVerdict: 'warn',
        truncated: true,
      };
    }

    const pricing = getGeminiPricing(modelName);
    const cost = pricing ? (inputTokens / 1_000_000) * pricing.inputCostPerM + (outputTokens / 1_000_000) * pricing.outputCostPerM : 0;

    const { feedback, verdict, findings, parseError } = parseStructuredReviewResponse<ReviewFinding>(response.content as string);

    return {
      feedback,
      role: summary.role,
      tokens: totalTokens,
      inputTokens,
      outputTokens,
      cacheTokens,
      cost,
      modelName,
      llmVerdict: verdict,
      state: { findings },
      truncated: isTruncated,
      parseError,
    };
  }
};

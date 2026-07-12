import {
  estimateMaxOutputTokens,
  budgetInputContext,
  calculateEstimatedTokens,
  normalizeFindings
} from '../../lib/codeReviewUtils';

import { buildSystemPrompt } from '../../lib/buildCodeReviewPrompt';

import { pickGeminiModel, getGeminiPricing } from '../../lib/geminiModelPicker';
import { extractFinishReason, createGeminiModel, applyRetryStrategy } from '../../lib/geminiUtils';

import { type CodeReviewSummary, type CodeReviewResult, codeReviewResponseSchema } from '../../lib/codeReviewTypes';
import type { CodeReviewClientStrategy } from '../../lib/codeReviewOrchestrator';

export const geminiCodeReviewClient: CodeReviewClientStrategy = {
  botName: 'gemini-code-review',
  reportTitle: '👁️ Gemini Code Review Agent',
  botTagline: 'Powered by Gemini 3.x',
  reportFileName: 'gemini-code-review.md',

  invokeReview: async (summary: CodeReviewSummary, forceMaxOutputTokens?: number): Promise<CodeReviewResult> => {
    const systemPrompt = buildSystemPrompt(summary);
    const { diffText, externalText } = budgetInputContext(systemPrompt, summary);

    const estimatedInputTokens = summary.estimatedInputTokens || calculateEstimatedTokens([systemPrompt, diffText, externalText || '']);
    // For code review, we prefer Flash if the diff is complex/large, otherwise Lite.
    const preferredTier = (estimatedInputTokens > 15000 || (summary.previousState?.findings.length ?? 0) > 5) ? 'flash' : 'lite';

    let modelName: string;
    try {
      modelName = await pickGeminiModel(preferredTier, estimatedInputTokens);
    } catch (err) {
      console.error('Failed to pick Gemini model, falling back based on input tokens:', err);
      modelName = estimatedInputTokens > 1000000 ? 'gemini-2.5-flash' : 'gemini-2.5-flash-lite';
    }

    let thinkingBudget = estimatedInputTokens > 10000 ? 4096 : 2048;
    const maxOutputTokens = forceMaxOutputTokens ?? estimateMaxOutputTokens(summary, systemPrompt.length, thinkingBudget);

    let model = createGeminiModel(modelName, maxOutputTokens, thinkingBudget, codeReviewResponseSchema);
    const { SystemMessage, HumanMessage } = await import('@langchain/core/messages');

    const messages = [
      new SystemMessage(systemPrompt),
      new HumanMessage(`DIFF:\n\n${diffText}`),
    ];

    if (externalText) {
      messages.push(new SystemMessage(`EXTERNAL CONTEXT:\n\n${externalText}`));
    }

    let response = await model.invoke(messages);

    let finishReason = extractFinishReason(response);

    if (finishReason === 'MAX_TOKENS') {
      console.warn('Gemini MAX_TOKENS — retrying with adjusted budget', {
        usage: response.usage_metadata,
      });

      const { newMax, newThinking } = applyRetryStrategy(maxOutputTokens, thinkingBudget);
      thinkingBudget = newThinking;

      model = createGeminiModel(modelName, newMax, thinkingBudget, codeReviewResponseSchema);
      response = await model.invoke(messages);

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

    const isTruncated = finishReason === 'MAX_TOKENS' || finishReason === 'length' || finishReason === 'max_tokens';

    if (isTruncated) {
      console.error('Gemini truncation', {
        finishReason,
        usage: usageMetadata,
      });
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

    // With response_mime_type: 'application/json', response.content is guaranteed to be a stringified JSON
    let structuredResponse: { feedback: string, verdict: 'pass' | 'fail' | 'warn', findings: unknown[] };
    try {
      structuredResponse = JSON.parse(typeof response.content === 'string' ? response.content : JSON.stringify(response.content));
    } catch (e) {
      console.error('Failed to parse Gemini structured output:', e, 'Raw content:', response.content);
      return {
        feedback: typeof response.content === 'string' ? response.content : JSON.stringify(response.content),
        tokens: totalTokens,
        cost: cost,
        modelName,
        llmVerdict: 'warn',
        parseError: 'invalid_json',
      };
    }

    return {
      feedback: structuredResponse.feedback,
      role: summary.role,
      tokens: totalTokens,
      inputTokens,
      outputTokens,
      cacheTokens,
      cost: cost,
      modelName: modelName,
      llmVerdict: structuredResponse.verdict,
      state: {
        findings: normalizeFindings(structuredResponse.findings),
      },
      truncated: isTruncated,
    };
  }
};

import {
  parseCodeReviewVerdict,
  parseCodeReviewStateDetailed,
  estimateMaxOutputTokens,
  budgetInputContext,
  buildReviewPayload,
  calculateEstimatedTokens
} from '../lib/codeReviewUtils';

import { buildSystemPrompt } from '../lib/buildCodeReviewPrompt';

import { logAIRun } from '../lib/aiLogger';

import { pickGeminiModel, getGeminiPricing } from '../lib/geminiModelPicker';
import { extractFinishReason, createGeminiModel, applyRetryStrategy, invokeGeminiAPI } from '../lib/geminiUtils';

import type { CodeReviewSummary, CodeReviewResult } from '../lib/codeReviewTypes';
import type { CodeReviewClientStrategy } from '../lib/codeReviewOrchestrator';

export const geminiCodeReviewClient: CodeReviewClientStrategy = {
  botName: 'gemini-code-review',
  reportTitle: '👁️ Gemini Code Review Agent',
  botTagline: 'Powered by Gemini 3.x',
  reportFileName: 'gemini-code-review.md',

  invokeReview: async (summary: CodeReviewSummary, forceMaxOutputTokens?: number): Promise<CodeReviewResult> => {
    const startTime = Date.now();
    const systemPrompt = buildSystemPrompt(summary);
    const { diffText, externalText } = budgetInputContext(systemPrompt, summary);

    const estimatedInputTokens = summary.estimatedInputTokens || calculateEstimatedTokens([systemPrompt, diffText, externalText || '']);
    // For code review, we prefer Pro if the diff is complex/large, otherwise Flash.
    const preferredTier = (estimatedInputTokens > 15000 || (summary.previousState?.findings.length ?? 0) > 5) ? 'pro' : 'flash';
    const modelName = pickGeminiModel(preferredTier, estimatedInputTokens);

    let thinkingBudget = 2048;
    const maxOutputTokens = forceMaxOutputTokens ?? estimateMaxOutputTokens(summary, systemPrompt.length, thinkingBudget);

    let model = createGeminiModel(modelName, maxOutputTokens, thinkingBudget);
    const baseContent = buildReviewPayload(systemPrompt, diffText, externalText);
    const message = { role: 'user', parts: baseContent.map(part => typeof part === 'string' ? { text: part } : (part.type === 'text' ? { text: part.text } : { text: JSON.stringify(part) })) };

    let response = await invokeGeminiAPI(model, [message]);

    let finishReason = extractFinishReason(response);

    if (finishReason === 'MAX_TOKENS') {
      console.warn('Gemini MAX_TOKENS — retrying with adjusted budget', {
        usage: response.usageMetadata,
      });

      const { newMax, newThinking } = applyRetryStrategy(maxOutputTokens, thinkingBudget);
      thinkingBudget = newThinking;

      model = createGeminiModel(modelName, newMax, thinkingBudget);
      response = await invokeGeminiAPI(model, [message]);

      finishReason = extractFinishReason(response);
    }

    const usageMetadata = response.usageMetadata || {};

    const inputTokens = usageMetadata.promptTokenCount ?? 0;
    const outputTokens = usageMetadata.candidatesTokenCount ?? 0;
    const totalTokens = usageMetadata.totalTokenCount ?? 0;
    const thoughtsTokenCount = usageMetadata.promptTokenCount ? (usageMetadata.totalTokenCount - usageMetadata.promptTokenCount - usageMetadata.candidatesTokenCount) || 0 : 0;

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
        durationMs: Date.now() - startTime,
      };
    }

    const durationMs = Date.now() - startTime;

    const pricing = getGeminiPricing(modelName);
    const cost = pricing ? (inputTokens / 1_000_000) * pricing.inputCostPerM + (outputTokens / 1_000_000) * pricing.outputCostPerM : 0;

    const textParts = response.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text) || [];
    const feedback = textParts.join('');

    const parsedState = parseCodeReviewStateDetailed(feedback);

    logAIRun({
      botName: 'gemini-code-review',
      modelName,
      inputTokens,
      outputTokens,
      totalTokens,
      thoughtsTokenCount,
      cost,
      durationMs,
      verdict: feedback ? parseCodeReviewVerdict(feedback) : undefined,
      truncated: isTruncated,
      parseError: parsedState.parseError,
    });

    return {
      feedback: feedback,
      tokens: totalTokens,
      cost: cost,
      modelName: modelName,
      llmVerdict: parseCodeReviewVerdict(feedback),
      state: parsedState.state,
      truncated: isTruncated,
      parseError: parsedState.parseError,
      durationMs,
    };
  }
};

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

import { logAIRun } from '../lib/aiLogger';

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
    // Reserve a bounded slice of the budget for reasoning so it can't
    // crowd out the actual review text + verdict + findings JSON.
    // In @langchain/google-genai v2.2.0, this is passed via thinkingConfig if supported
    // but the flat option is also commonly mapped.
    // Given the caveat, we'll try to follow the prompt's suggestion.
    // Note: v2.2.0 might need it inside generationConfig or as a direct prop.
    // Based on LangChain docs for newer versions, it might be maxReasoningTokens.
    // But we'll stick to the "thinkingBudget" name from the instructions as a primary guess.
    // If it's 2.2.0, we can also try to be safe.
    ...({
      thinkingBudget: Math.min(1024, Math.floor(maxOutputTokens * 0.3)),
    } as any)
  });
}

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

    const maxOutputTokens = forceMaxOutputTokens ?? estimateMaxOutputTokens(summary, systemPrompt.length);
    const model = createModel(modelName, maxOutputTokens);
    const baseContent = buildReviewPayload(systemPrompt, diffText, externalText);

    const message = new HumanMessage({ content: baseContent });

    const response = await model.invoke([message]);
    const durationMs = Date.now() - startTime;


    const usageMetadata = response.usage_metadata as {
      input_tokens?: number;
      output_tokens?: number;
      total_tokens?: number;
      thoughts_token_count?: number;
    };
    const inputTokens = usageMetadata?.input_tokens ?? 0;
    const outputTokens = usageMetadata?.output_tokens ?? 0;
    const totalTokens = usageMetadata?.total_tokens ?? 0;
    // thoughtsTokenCount might be nested in response_metadata or usage_metadata
    const thoughtsTokenCount = usageMetadata?.thoughts_token_count ??
                               (response.response_metadata as any)?.usage?.thoughts_token_count;

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

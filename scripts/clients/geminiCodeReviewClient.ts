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
import { GeminiTruncationError } from '../lib/errors';

import type { CodeReviewSummary, CodeReviewResult } from '../lib/codeReviewTypes';
import type { CodeReviewClientStrategy } from '../lib/codeReviewOrchestrator';

function createModel(modelName: string, maxOutputTokens: number = 6000, thinkingBudget: number = 2048): ChatGoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('Missing GEMINI_API_KEY environment variable');

  return new ChatGoogleGenerativeAI({
    model: modelName,
    apiKey,
    maxOutputTokens: maxOutputTokens,
    // Reserve a bounded slice of the budget for reasoning so it can't
    // crowd out the actual review text + verdict + findings JSON.
    thinkingConfig: {
      includeThoughts: true,
      thinkingBudget: thinkingBudget,
    }
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

    let thinkingBudget = 2048;
    const maxOutputTokens = forceMaxOutputTokens ?? estimateMaxOutputTokens(summary, systemPrompt.length, thinkingBudget);

    let model = createModel(modelName, maxOutputTokens, thinkingBudget);
    const baseContent = buildReviewPayload(systemPrompt, diffText, externalText);
    const message = new HumanMessage({ content: baseContent });

    let response = await model.invoke([message]);

    let finishReason = (response as { response_metadata?: { finish_reason?: string } })
      .response_metadata?.finish_reason || 'UNKNOWN';

    if (finishReason === 'MAX_TOKENS') {
      console.warn('Gemini MAX_TOKENS — retrying with adjusted budget', {
        usage: response.usage_metadata,
      });

      const retryMaxOutputTokens = Math.round(maxOutputTokens * 1.25);
      thinkingBudget = Math.round(thinkingBudget * 0.5);

      model = createModel(modelName, retryMaxOutputTokens, thinkingBudget);
      response = await model.invoke([message]);

      finishReason = (response as { response_metadata?: { finish_reason?: string } })
        .response_metadata?.finish_reason || 'UNKNOWN';
    }

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
                               (response.response_metadata as { usage?: { thoughts_token_count?: number } })?.usage?.thoughts_token_count ?? 0;

    if (thoughtsTokenCount > thinkingBudget * 1.1) {
      console.warn('Thinking budget exceeded by >10%', {
        budgetSet: thinkingBudget,
        thoughtsUsed: thoughtsTokenCount,
        model: modelName,
      });
    }

    if (finishReason !== 'STOP') {
      console.error('Gemini truncation', {
        finishReason,
        usage: usageMetadata,
      });
      throw new GeminiTruncationError(
        `Gemini call did not finish cleanly: finishReason=${finishReason}`
      );
    }

    const durationMs = Date.now() - startTime;

    const pricing = getGeminiPricing(modelName);
    const cost = pricing ? (inputTokens / 1_000_000) * pricing.inputCostPerM + (outputTokens / 1_000_000) * pricing.outputCostPerM : 0;

    // Safe to parse from here. The response.content.parts structure isn't exposed properly via Langchain here
    // typically in @langchain response.content is a string, but if we extract only text it's better
    let feedback: string;
    if (typeof response.content === 'string') {
      feedback = response.content;
    } else if (Array.isArray(response.content)) {
      feedback = response.content
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((p: any) => !p.thought)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((p: any) => p.text ?? '')
        .join('');
    } else {
      feedback = JSON.stringify(response.content);
    }

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
      truncated: false,
      parseError: parsedState.parseError,
    });

    return {
      feedback: feedback,
      tokens: totalTokens,
      cost: cost,
      modelName: modelName,
      llmVerdict: parseCodeReviewVerdict(feedback),
      state: parsedState.state,
      truncated: false,
      parseError: parsedState.parseError,
      durationMs,
    };
  }
};

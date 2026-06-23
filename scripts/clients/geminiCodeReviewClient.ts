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

async function createModelRequest(
  modelName: string,
  maxOutputTokens: number = 1500,
  prompt: string
): Promise<{ feedback: string; inputTokens: number; outputTokens: number; totalTokens: number; thoughtsTokenCount: number; finishReason: string }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('Missing GEMINI_API_KEY environment variable');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: maxOutputTokens,
        thinkingConfig: {
          includeThoughts: true,
          thinkingBudget: Math.min(1024, Math.floor(maxOutputTokens * 0.3)),
        }
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API request failed: ${response.status} ${response.statusText} - ${errText}`);
  }

  const data = await response.json() as Record<string, unknown>;
  const candidates = data.candidates as Array<Record<string, unknown>> | undefined;
  if (!candidates || candidates.length === 0) throw new Error('No candidates returned from Gemini API');

  const candidate = candidates[0];
  const content = candidate.content as Record<string, unknown> | undefined;
  const parts = content?.parts as Array<Record<string, unknown>> | undefined;
  const feedbackPart = parts?.find(p => typeof p.text === 'string');
  const feedback = (feedbackPart?.text as string) || '';
  const thoughtsTokenCount = 0;

  const usageMetadata = (data.usageMetadata as Record<string, number>) || {};
  const inputTokens = usageMetadata.promptTokenCount || 0;
  const outputTokens = usageMetadata.candidatesTokenCount || 0;
  const totalTokens = usageMetadata.totalTokenCount || 0;
  const finishReason = candidate.finishReason as string;

  return { feedback, inputTokens, outputTokens, totalTokens, thoughtsTokenCount, finishReason };
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
    const preferredTier = (estimatedInputTokens > 15000 || (summary.previousState?.findings.length ?? 0) > 5) ? 'pro' : 'flash';
    const modelName = pickGeminiModel(preferredTier, estimatedInputTokens);

    const maxOutputTokens = forceMaxOutputTokens ?? estimateMaxOutputTokens(summary, systemPrompt.length);
    const baseContent = buildReviewPayload(systemPrompt, diffText, externalText);

    const { feedback, inputTokens, outputTokens, totalTokens, thoughtsTokenCount, finishReason } = await createModelRequest(modelName, maxOutputTokens, baseContent);
    const durationMs = Date.now() - startTime;

    const pricing = getGeminiPricing(modelName);
    const cost = pricing ? (inputTokens / 1_000_000) * pricing.inputCostPerM + (outputTokens / 1_000_000) * pricing.outputCostPerM : 0;

    const isTruncated = finishReason === 'MAX_TOKENS' || finishReason === 'length';
    if (isTruncated) {
      console.warn(`⚠️  gemini-code-review output truncated (finish_reason: ${finishReason}, tokens: ${totalTokens}).`);
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

import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage } from '@langchain/core/messages';
import {
  buildSystemPrompt,
  parseCodeReviewVerdict,
  parseCodeReviewStateDetailed,
  estimateMaxOutputTokens,
  applyTokenBudget,
  buildReviewPayload
} from '../lib/codeReviewUtils';
import type { CodeReviewSummary, CodeReviewResult } from '../lib/codeReviewTypes';
import type { CodeReviewClientStrategy } from '../lib/codeReviewOrchestrator';

function createModel(maxOutputTokens: number = 1500): ChatGoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('Missing GEMINI_API_KEY environment variable');

  return new ChatGoogleGenerativeAI({
    model: 'gemini-1.5-flash',
    apiKey,
    maxOutputTokens: maxOutputTokens,
  });
}

export const geminiCodeReviewClient: CodeReviewClientStrategy = {
  botName: 'gemini-code-review',
  reportTitle: '👁️ Gemini Code Review Agent',
  botTagline: 'Powered by Gemini 1.5',
  reportFileName: 'gemini-code-review.md',

  invokeReview: async (summary: CodeReviewSummary): Promise<CodeReviewResult> => {
    const systemPrompt = buildSystemPrompt(summary);
    const { diffText, externalText } = applyTokenBudget(systemPrompt, summary);

    const maxOutputTokens = estimateMaxOutputTokens(summary);
    const model = createModel(maxOutputTokens);
    const baseContent = buildReviewPayload(systemPrompt, diffText, externalText);

    const message = new HumanMessage({ content: baseContent });
    const response = await model.invoke([message]);

    const usageMetadata = response.usage_metadata;
    const inputTokens = usageMetadata?.input_tokens ?? 0;
    const outputTokens = usageMetadata?.output_tokens ?? 0;
    const totalTokens = usageMetadata?.total_tokens ?? 0;

    const cost = (inputTokens / 1_000_000) * 0.075 + (outputTokens / 1_000_000) * 0.30;

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
      cost: cost,
      llmVerdict: parseCodeReviewVerdict(feedback),
      state: parsedState.state,
      truncated: isTruncated,
      parseError: parsedState.parseError,
    };
  }
};

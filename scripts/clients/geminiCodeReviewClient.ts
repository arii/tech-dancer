import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage } from '@langchain/core/messages';
import { parseCodeReviewVerdict } from './githubModelsCodeReviewClient';
import type { CodeReviewSummary, CodeReviewResult } from '../lib/codeReviewTypes';
import type { CodeReviewClientStrategy } from '../lib/codeReviewOrchestrator';

const SYSTEM_PROMPT = `You are an expert software engineer reviewing a pull request.
Review the following code diff for bugs, anti-patterns, missing types, and performance issues.
Provide actionable feedback. Focus on HIGH severity issues.

You MUST end your review with exactly one of the following strings indicating your final verdict:
[VERDICT: PASS]
[VERDICT: WARN]
[VERDICT: FAIL]

Use [VERDICT: FAIL] ONLY if there are blocking bugs or severe anti-patterns.
`;

function createModel(): ChatGoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('Missing GEMINI_API_KEY environment variable');

  return new ChatGoogleGenerativeAI({
    model: 'gemini-1.5-flash',
    apiKey,
    maxOutputTokens: 1024,
  });
}

export const geminiCodeReviewClient: CodeReviewClientStrategy = {
  botName: 'gemini-code-review',
  reportTitle: '👁️ Gemini Code Review Agent',
  botTagline: 'Powered by Gemini 1.5',
  reportFileName: 'gemini-code-review.md',

  invokeReview: async (summary: CodeReviewSummary): Promise<CodeReviewResult> => {
    const model = createModel();
    const baseContent = [
      { type: 'text', text: SYSTEM_PROMPT } as const,
      { type: 'text', text: `DIFF:

${summary.diffContext}` } as const,
      { type: 'text', text: `REPO CONTEXT:

${summary.repoContext || ''}` } as const,
    ];

    const message = new HumanMessage({ content: baseContent });
    const response = await model.invoke([message]);

    const usageMetadata = response.usage_metadata;
    const inputTokens = usageMetadata?.input_tokens ?? 0;
    const outputTokens = usageMetadata?.output_tokens ?? 0;
    const totalTokens = usageMetadata?.total_tokens ?? 0;

    const cost = (inputTokens / 1_000_000) * 0.075 + (outputTokens / 1_000_000) * 0.30;

    const feedback = typeof response.content === 'string'
      ? response.content
      : JSON.stringify(response.content);

    return {
      feedback: feedback,
      tokens: totalTokens,
      cost: cost,
      llmVerdict: parseCodeReviewVerdict(feedback),
    };
  }
};

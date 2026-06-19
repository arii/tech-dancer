import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage } from '@langchain/core/messages';
import { parseCodeReviewVerdict } from './githubModelsCodeReviewClient';
import type { CodeReviewSummary, CodeReviewResult } from '../lib/codeReviewTypes';
import type { CodeReviewClientStrategy } from '../lib/codeReviewOrchestrator';

const SYSTEM_PROMPT = `You are an expert software engineer reviewing a pull request.
Review the following code diff for bugs, anti-patterns, missing types, and performance issues.
Provide actionable feedback. Focus on HIGH severity issues.

Severity rules — apply these strictly:
- HIGH / Blocking: you can point to a concrete contradiction in the diff itself — a value
  passed where the type doesn't allow it, a class or function that doesn't exist, a call
  with the wrong arity, a test that would fail. Cite the exact line(s).
- If your concern is phrased with "could," "might," "unless," "if not handled properly,"
  or similar hedging language, it is NOT blocking. Downgrade it to a "Question" or
  "Nitpick" section instead.
- Do not raise a concern you cannot verify against the code you were given. State what
  you'd need to see to verify it, rather than assuming the worst case.

You MUST end your review with exactly one of the following strings indicating your final verdict:
[VERDICT: PASS]
[VERDICT: WARN]
[VERDICT: FAIL]

Use [VERDICT: FAIL] ONLY if there are blocking bugs or severe anti-patterns that you can
demonstrate with evidence from the diff.
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
      { type: 'text', text: `DIFF:\n\n${summary.diffContext}` } as const,
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

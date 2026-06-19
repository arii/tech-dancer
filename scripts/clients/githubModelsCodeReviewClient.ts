import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';
import type { CodeReviewSummary, CodeReviewResult } from '../lib/codeReviewTypes';
import type { CodeReviewClientStrategy } from '../lib/codeReviewOrchestrator';
import { pickOptimalModel } from '../lib/modelPicker';

function buildSystemPrompt(prGoal: string | undefined): string {
  const goalSection = prGoal
    ? `This PR's stated goal:
"${prGoal}"

`
    : '';
  return `You are an expert software engineer reviewing a pull request.
Review the following code diff for bugs, anti-patterns, missing types, and performance issues.
Provide actionable feedback. Focus on HIGH severity issues.

${goalSection}Severity rules — apply these strictly:
- HIGH / Blocking: you can point to a concrete contradiction in the diff itself — a value
  passed where the type doesn't allow it, a class or function that doesn't exist, a call
  with the wrong arity, a test that would fail. Cite the exact line(s).
- If your concern is phrased with "could," "might," "unless," "if not handled properly,"
  or similar hedging language, it is NOT blocking. Downgrade it to a "Question" or
  "Nitpick" section instead.
- Do not raise a concern you cannot verify against the code you were given. State what
  you'd need to see to verify it, rather than assuming the worst case.

Scope and security rules:
- Flag security issues ONLY if this diff introduces a NEW untrusted input path (e.g. new
  user-controlled data flowing somewhere it wasn't before). Do not flag pre-existing patterns.
- Do not introduce review topics unrelated to the PR's stated goal unless you find a
  genuine, evidence-backed regression caused by this diff.

You MUST end your review with exactly one of the following strings indicating your final verdict:
[VERDICT: PASS]
[VERDICT: WARN]
[VERDICT: FAIL]

Use [VERDICT: FAIL] ONLY if there are blocking bugs or severe anti-patterns that you can
demonstrate with evidence from the diff.
`;
}

export function parseCodeReviewVerdict(feedback: string): 'pass' | 'fail' | 'warn' {
  const matches = [...feedback.matchAll(/\[VERDICT:\s*(PASS|WARN|FAIL)\]/gi)];
  if (matches.length > 0) {
    const lastMatch = matches[matches.length - 1][1].toUpperCase();
    if (lastMatch === 'FAIL') return 'fail';
    if (lastMatch === 'WARN') return 'warn';
    return 'pass';
  }

  return 'pass';
}

async function createModel(estimatedInputTokens: number = 0): Promise<ChatOpenAI> {
  const apiKey = process.env.GITHUB_TOKEN;
  if (!apiKey) throw new Error('Missing GITHUB_TOKEN environment variable');

  const fallback = process.env.GITHUB_MODELS_MODEL || 'gpt-4o-mini';
  const modelName = await pickOptimalModel(apiKey, fallback, false, estimatedInputTokens);

  return new ChatOpenAI({
    modelName: modelName,
    apiKey: apiKey,
    configuration: {
      baseURL: 'https://models.inference.ai.azure.com',
    },
    maxTokens: 1024,
    temperature: 0.1,
  });
}

export const githubModelsCodeReviewClient: CodeReviewClientStrategy = {
  botName: 'github-models-code-review',
  reportTitle: '🐙 GitHub Models Code Review',
  botTagline: 'Powered by GitHub Models',
  reportFileName: 'github-models-code-review.md',

  invokeReview: async (summary: CodeReviewSummary): Promise<CodeReviewResult> => {
    const estimatedInputTokens = Math.ceil(summary.diffContext.length / 4);
    const model = await createModel(estimatedInputTokens);
    const baseContent = [
      { type: 'text', text: buildSystemPrompt(summary.prGoal) } as const,
      { type: 'text', text: `DIFF:\n\n${summary.diffContext}` } as const,
    ];

    const message = new HumanMessage({ content: baseContent });

    // To debug why CI AI check is failing, log the verdict/result out temporarily
    // wait I cannot easily log this here because it runs on CI.
    // Instead I will just let it run. Let's see the previous report.
    const response = await model.invoke([message]);

    const usageMetadata = response.usage_metadata;
    const totalTokens = usageMetadata?.total_tokens ?? 0;
    const cost = 0;

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

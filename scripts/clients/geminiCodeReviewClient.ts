import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage } from '@langchain/core/messages';
import { parseCodeReviewVerdict, parseCodeReviewState, estimateMaxOutputTokens } from './githubModelsCodeReviewClient';
import type { CodeReviewSummary, CodeReviewResult } from '../lib/codeReviewTypes';
import type { CodeReviewClientStrategy } from '../lib/codeReviewOrchestrator';

function buildSystemPrompt(summary: CodeReviewSummary): string {
  const goalSection = summary.prGoal
    ? `This PR's stated goal:
"${summary.prGoal}"

`
    : '';

  let priorStateSection = '';
  if (summary.previousState && summary.previousState.findings.length > 0) {
    const findingsStr = summary.previousState.findings
      .map(f => {
        let line = `- [${f.id}] ${f.file}${f.line ? `:${f.line}` : ''}: ${f.issue} (Status: ${f.status})`;
        if (f.fixSummary) {
          line += `\n   → ${f.fixSummary}`;
        }
        return line;
      })
      .join('\n');
    priorStateSection = `
PREVIOUS REVIEW ROUND FINDINGS:
${findingsStr}

Your job:
- Confirm THIS issue is resolved before raising anything new.
- Only raise a NEW issue if it is unrelated to anything already addressed, or if the fix for a previous issue introduced a new problem.
- Do not re-open a resolved issue under a different framing.
`;
  }

  return `You are an expert software engineer reviewing a pull request.
Review the following code diff for bugs, anti-patterns, missing types, and performance issues.
Provide actionable feedback. Focus on HIGH severity issues.

${goalSection}${priorStateSection}

Severity rules — apply these strictly:
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

You MUST also provide a structured JSON summary of the findings (both old and new) at the end of your response, inside a \` <findings>\` tag:
<findings>
{
  "findings": [
    {
      "id": "finding-1",
      "file": "src/App.tsx",
      "line": 10,
      "snippet": "const x = 1;",
      "issue": "Brief description of the issue",
      "status": "resolved",
      "fixSummary": "Brief summary of how it was addressed"
    }
  ]
}
</findings>
Ensure 'snippet' is a unique string from the diff that identifies the issue.
`;
}

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
    const maxOutputTokens = estimateMaxOutputTokens(summary);
    const model = createModel(maxOutputTokens);
    const baseContent = [
      { type: 'text', text: buildSystemPrompt(summary) } as const,
      { type: 'text', text: `DIFF:\n\n${summary.diffContext}` } as const,
    ];

    if (summary.externalContext) {
      baseContent.push({
        type: 'text',
        text: `EXTERNAL CONTEXT (Types/Interfaces/Constants referenced in the diff):\n\n${summary.externalContext}`
      } as const);
    }

    const message = new HumanMessage({ content: baseContent });
    const response = await model.invoke([message]);

    const usageMetadata = response.usage_metadata;
    const inputTokens = usageMetadata?.input_tokens ?? 0;
    const outputTokens = usageMetadata?.output_tokens ?? 0;
    const totalTokens = usageMetadata?.total_tokens ?? 0;

    const cost = (inputTokens / 1_000_000) * 0.075 + (outputTokens / 1_000_000) * 0.30;

    const finishReason = response.response_metadata?.finish_reason;
    const isTruncated = finishReason === 'length';
    if (isTruncated) {
      console.warn('⚠️  Model output was truncated (finish_reason: length) — findings may be incomplete.');
    }

    const feedback = typeof response.content === 'string'
      ? response.content
      : JSON.stringify(response.content);

    return {
      feedback: feedback,
      tokens: totalTokens,
      cost: cost,
      llmVerdict: parseCodeReviewVerdict(feedback),
      state: parseCodeReviewState(feedback),
      truncated: isTruncated,
    };
  }
};

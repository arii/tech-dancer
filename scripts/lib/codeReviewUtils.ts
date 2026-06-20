import type { CodeReviewSummary, CodeReviewState, ParsedFindingsResult } from './codeReviewTypes';

export function buildSystemPrompt(summary: CodeReviewSummary): string {
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
- If parts of the diff or external context are truncated (indicated by "[TRUNCATED]"),
  DO NOT fail the review solely because you cannot see the full implementation of a
  newly introduced module or utility. Instead, provide a WARN or PASS verdict based on
  what you CAN see, and explicitly state what remains unverified due to truncation.

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

export function parseCodeReviewState(feedback: string): CodeReviewState | undefined {
  return parseCodeReviewStateDetailed(feedback).state;
}

export function parseCodeReviewStateDetailed(feedback: string): ParsedFindingsResult {
  const openTag = '<findings>';
  const closeTag = '</findings>';

  const openIdx = feedback.lastIndexOf(openTag);
  const closeIdx = feedback.lastIndexOf(closeTag);

  if (openIdx === -1 || closeIdx === -1 || closeIdx < openIdx) {
    // Did the model even attempt a findings block? If <findings> opened but
    // never closed, that's a strong truncation signal.
    const openedButNeverClosed = openIdx !== -1 && (closeIdx === -1 || closeIdx < openIdx);
    return { state: undefined, parseError: openedButNeverClosed ? 'missing_closing_tag' : undefined };
  }

  const jsonText = feedback.slice(openIdx + openTag.length, closeIdx).trim();

  try {
    return { state: JSON.parse(jsonText) as CodeReviewState };
  } catch (e) {
    console.warn('Failed to parse findings JSON from LLM response:', e);
    return { state: undefined, parseError: 'invalid_json' };
  }
}

export function estimateMaxOutputTokens(summary: CodeReviewSummary): number {
  // Base budget covers prose review + a couple findings.
  let budget = 1500;

  // Each existing finding the model needs to echo back (resolved or not)
  // costs real output tokens. Scale up so large finding sets don't truncate.
  const priorFindingsCount = summary.previousState?.findings.length ?? 0;
  budget += priorFindingsCount * 200;

  // Larger diffs tend to surface more findings worth writing about.
  const diffSizeTokens = Math.ceil(summary.diffContext.length / 4);
  if (diffSizeTokens > 4000) budget += 1000;

  // Hard ceiling — avoid runaway cost/latency on pathological inputs.
  return Math.min(budget, 4096);
}

export function budgetInputContext(
  systemPrompt: string,
  summary: CodeReviewSummary,
  maxInputChars: number = 24000
): { diffText: string; externalText: string } {
  // System prompt is essential. Let's see how much budget is left.
  const remainingBudgetForDiffAndContext = Math.max(0, maxInputChars - systemPrompt.length);

  let diffText = `DIFF:\n\n${summary.diffContext}`;
  let externalText = summary.externalContext
    ? `EXTERNAL CONTEXT (Types/Interfaces/Constants referenced in the diff):\n\n${summary.externalContext}`
    : '';

  if (diffText.length + externalText.length > remainingBudgetForDiffAndContext) {
    // Allocate the remaining budget between diff and external context.
    // Diff gets priority: up to 16,000 characters, capped at remaining budget.
    const maxDiffChars = Math.max(0, Math.min(diffText.length, 16000, remainingBudgetForDiffAndContext));
    if (diffText.length > maxDiffChars) {
      diffText = diffText.slice(0, maxDiffChars) + '\n\n...[TRUNCATED TO FIT TOKEN LIMIT]';
    }

    const remainingForExternal = remainingBudgetForDiffAndContext - diffText.length;
    if (externalText) {
      if (remainingForExternal > 200) {
        if (externalText.length > remainingForExternal) {
          externalText = externalText.slice(0, remainingForExternal - 50) + '\n\n...[TRUNCATED TO FIT TOKEN LIMIT]';
        }
      } else {
        // Harden: ensure we don't just drop the context entirely without notice
        externalText = '...[TRUNCATED EXTERNAL CONTEXT TO FIT TOKEN LIMIT]';
      }
    }
  }

  return { diffText, externalText };
}

/**
 * Heuristic: 1 token is roughly 4 characters.
 */
export function calculateEstimatedTokens(text: string | string[]): number {
  const combined = Array.isArray(text) ? text.join('') : text;
  return Math.ceil(combined.length / 4);
}

export type ReviewPayloadItem = { type: 'text'; text: string };

/**
 * Builds the standard payload for code review models.
 */
export function buildReviewPayload(
  systemPrompt: string,
  diffText: string,
  externalText?: string
): ReviewPayloadItem[] {
  const payload: ReviewPayloadItem[] = [
    { type: 'text', text: systemPrompt },
    { type: 'text', text: diffText },
  ];

  if (externalText) {
    payload.push({ type: 'text', text: externalText });
  }

  return payload;
}

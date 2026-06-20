import type { CodeReviewSummary, CodeReviewState, ParsedFindingsResult } from './codeReviewTypes';

export function buildSystemPrompt(summary: CodeReviewSummary): string {
  const lines: string[] = [];

  lines.push("You are an expert software engineer reviewing a pull request.");
  lines.push("Review the following code diff for bugs, anti-patterns, missing types, and performance issues.");
  lines.push("Provide actionable feedback. Focus on HIGH severity issues.");
  lines.push("");

  if (summary.prGoal) {
    lines.push("This PR's stated goal:");
    lines.push(`"${summary.prGoal}"`);
    lines.push("");
  }

  if (summary.previousState && summary.previousState.findings.length > 0) {
    lines.push("PREVIOUS REVIEW ROUND FINDINGS:");
    for (const f of summary.previousState.findings) {
      let line = `- [${f.id}] ${f.file}${f.line ? `:${f.line}` : ''}: ${f.issue} (Status: ${f.status})`;
      if (f.fixSummary) {
        line += `\n   → ${f.fixSummary}`;
      }
      lines.push(line);
    }
    lines.push("");
    lines.push("Your job:");
    lines.push("- Confirm THIS issue is resolved before raising anything new.");
    lines.push("- Only raise a NEW issue if it is unrelated to anything already addressed, or if the fix for a previous issue introduced a new problem.");
    lines.push("- Do not re-open a resolved issue under a different framing.");
    lines.push("");
  }

  lines.push("UI and Layout Guidelines (MANDATORY):");
  lines.push("- NO RAW TAILWIND in App/Feature layers. Flag any arbitrary values (e.g., `text-[11px]`), direct layout classes (`flex`, `grid`), or direct spacing/color classes.");
  lines.push("- MANDATORY use of layout primitives: All layout MUST use `Box`, `Stack`, `Grid`, or `Text` from `@/layouts/`.");
  lines.push("- TYPOGRAPHY: All text must use the `<Text />` component. Flag raw `text-*` classes.");
  lines.push("- DESIGN TOKENS: Styling must use design tokens (`spacing`, `radius`, `typography`). Flag any bypasses.");
  lines.push("");

  lines.push("Severity rules — apply these strictly:");
  lines.push("- HIGH / Blocking: you can point to a concrete contradiction in the diff itself — a value");
  lines.push("  passed where the type doesn't allow it, a class or function that doesn't exist, a call");
  lines.push("  with the wrong arity, a test that would fail. Cite the exact line(s).");
  lines.push("- If your concern is phrased with \"could,\" \"might,\" \"unless,\" \"if not handled properly,\"");
  lines.push("  or similar hedging language, it is NOT blocking. Downgrade it to a \"Question\" or");
  lines.push("  \"Nitpick\" section instead.");
  lines.push("- Do not raise a concern you cannot verify against the code you were given. State what");
  lines.push("  you'd need to see to verify it, rather than assuming the worst case.");
  lines.push("");

  lines.push("Scope and security rules:");
  lines.push("- Flag security issues ONLY if this diff introduces a NEW untrusted input path (e.g. new");
  lines.push("  user-controlled data flowing somewhere it wasn't before). Do not flag pre-existing patterns.");
  lines.push("- Do not introduce review topics unrelated to the PR's stated goal unless you find a");
  lines.push("  genuine, evidence-backed regression caused by this diff.");
  lines.push("- If parts of the diff or external context are truncated (indicated by \"[TRUNCATED]\"),");
  lines.push("  DO NOT fail the review solely because you cannot see the full implementation of a");
  lines.push("  newly introduced module or utility. Instead, provide a WARN or PASS verdict based on");
  lines.push("  what you CAN see, and explicitly state what remains unverified due to truncation.");
  lines.push("");

  lines.push("You MUST end your review with exactly one of the following strings indicating your final verdict:");
  lines.push("[VERDICT: PASS]");
  lines.push("[VERDICT: WARN]");
  lines.push("[VERDICT: FAIL]");
  lines.push("");

  lines.push("Use [VERDICT: FAIL] ONLY if there are blocking bugs or severe anti-patterns that you can");
  lines.push("demonstrate with evidence from the diff.");
  lines.push("");

  lines.push("You MUST also provide a structured JSON summary of the findings (both old and new) at the end of your response, inside a ` <findings>` tag.");
  lines.push("The JSON must follow this schema:");
  lines.push("<findings>");
  lines.push("{");
  lines.push("  \"findings\": [");
  lines.push("    {");
  lines.push("      \"id\": \"finding-1\",");
  lines.push("      \"file\": \"src/App.tsx\",");
  lines.push("      \"line\": 10,");
  lines.push("      \"snippet\": \"const x = 1;\",");
  lines.push("      \"issue\": \"Brief description of the issue\",");
  lines.push("      \"status\": \"open\",");
  lines.push("      \"fixSummary\": \"Brief summary of how it was addressed\"");
  lines.push("    }");
  lines.push("  ]");
  lines.push("}");
  lines.push("</findings>");
  lines.push("Ensure 'snippet' is a unique string from the diff that identifies the issue.");

  return lines.join('\n');
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

export const EXTERNAL_CONTEXT_TRUNCATED_MESSAGE = '...[TRUNCATED EXTERNAL CONTEXT TO FIT TOKEN LIMIT]';
export const EXTERNAL_CONTEXT_MINIMUM_BUDGET = 200;

export function budgetInputContext(
  systemPrompt: string,
  summary: CodeReviewSummary,
  maxInputChars: number = 24000
): { diffText: string; externalText: string } {
  // System prompt is essential. Let's see how much budget is left.
  const remainingBudgetForDiffAndContext = Math.max(0, maxInputChars - systemPrompt.length);

  let rawDiffText = summary.diffContext;
  let rawExternalText = summary.externalContext || '';

  if (rawDiffText.length + rawExternalText.length > remainingBudgetForDiffAndContext) {
    // Allocate the remaining budget between diff and external context.
    // Diff gets priority: up to 16,000 characters, capped at remaining budget.
    const maxDiffChars = Math.max(0, Math.min(rawDiffText.length, 16000, remainingBudgetForDiffAndContext));
    if (rawDiffText.length > maxDiffChars) {
      rawDiffText = rawDiffText.slice(0, maxDiffChars) + '\n\n...[TRUNCATED TO FIT TOKEN LIMIT]';
    }

    const remainingForExternal = remainingBudgetForDiffAndContext - rawDiffText.length;
    if (rawExternalText) {
      if (remainingForExternal > EXTERNAL_CONTEXT_MINIMUM_BUDGET) {
        if (rawExternalText.length > remainingForExternal) {
          rawExternalText = rawExternalText.slice(0, remainingForExternal - 50) + '\n\n...[TRUNCATED TO FIT TOKEN LIMIT]';
        }
      } else {
        // Harden: ensure we don't just drop the context entirely without notice
        rawExternalText = EXTERNAL_CONTEXT_TRUNCATED_MESSAGE;
      }
    }
  }

  return { diffText: rawDiffText, externalText: rawExternalText };
}

/**
 * Heuristic: 1 token is roughly 4 characters.
 */
export function calculateEstimatedTokens(text: string | string[]): number {
  const combined = Array.isArray(text) ? text.join('') : text;
  return Math.ceil(combined.length / 4);
}

export type ReviewPayloadItem = { type: 'text'; text: string };

export interface PayloadConfig {
  diffPrefix?: string;
  externalPrefix?: string;
}

/**
 * Builds the standard payload for code review models.
 */
export function buildReviewPayload(
  systemPrompt: string,
  diffText: string,
  externalText?: string,
  config: PayloadConfig = {}
): ReviewPayloadItem[] {
  const diffPrefix = config.diffPrefix ?? 'DIFF:\n\n';
  const externalPrefix = config.externalPrefix ?? 'EXTERNAL CONTEXT (Types/Interfaces/Constants referenced in the diff):\n\n';

  const payload: ReviewPayloadItem[] = [
    { type: 'text', text: systemPrompt },
    { type: 'text', text: `${diffPrefix}${diffText}` },
  ];

  if (externalText) {
    const formattedExternal = externalText === EXTERNAL_CONTEXT_TRUNCATED_MESSAGE
      ? externalText
      : `${externalPrefix}${externalText}`;
    payload.push({ type: 'text', text: formattedExternal });
  }

  return payload;
}

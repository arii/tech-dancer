import type { CodeReviewSummary, CodeReviewState, ParsedFindingsResult } from './codeReviewTypes';

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

  let jsonText = feedback.slice(openIdx + openTag.length, closeIdx).trim();

  // Strip markdown code block markers if present
  if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/^```[a-z]*\n/i, '').replace(/\n```$/m, '').trim();
  }

  try {
    return { state: JSON.parse(jsonText) as CodeReviewState };
  } catch (e) {
    console.warn('Failed to parse findings JSON from LLM response:', e);
    // Log a snippet of the failed JSON for debugging
    console.warn('JSON snippet:', jsonText.slice(0, 100) + '...');
    return { state: undefined, parseError: 'invalid_json' };
  }
}

export function estimateMaxOutputTokens(
  summary: CodeReviewSummary,
  systemPromptLength: number = 0
): number {
  // Base budget covers prose review + a couple findings.
  let budget = 1500;

  // Each existing finding the model needs to echo back (resolved or not)
  // costs real output tokens. Scale up so large finding sets don't truncate.
  const priorFindingsCount = summary.previousState?.findings.length ?? 0;
  budget += priorFindingsCount * 200;

  // Larger diffs tend to surface more findings worth writing about.
  const diffSizeTokens = Math.ceil(summary.diffContext.length / 4);
  if (diffSizeTokens > 4000) budget += 1000;

  // NEW: reasoning-capable Gemini models draw "thinking" tokens from the
  // same maxOutputTokens budget as the visible answer. A longer, rule-dense
  // system prompt (design guidelines, multiple matched PROMPT_CATEGORIES
  // blocks) correlates with materially more internal deliberation before
  // the model commits to an answer — give it proportionally more headroom
  // even when the diff itself is small. Thresholds are deliberately coarse;
  // tune against dev-tools/logs/ai/review-run.json once Fix 5's logging is
  // live and you have real thoughtsTokenCount data to calibrate against.
  const systemPromptTokens = Math.ceil(systemPromptLength / 4);
  if (systemPromptTokens > 600) budget += 1500;
  if (systemPromptTokens > 1200) budget += 1500;

  // Hard ceiling — raised to match what the models actually support
  // (gemini-3.5-flash and gemini-3.1-pro-preview both report
  // maxOutputTokens: 8192 in geminiModelPicker.ts). The previous ceiling of
  // 4096 was silently capping the budget below the model's real limit.
  return Math.min(budget, 8192);
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

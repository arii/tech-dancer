import * as crypto from 'crypto';
import type { CodeReviewSummary, CodeReviewState, ParsedFindingsResult, CodeReviewResult } from './codeReviewTypes';

/**
 * Generates a stable SHA-256 hash for a code review batch.
 * Includes diff context, role, goal, and all relevant semantic/external context.
 */
export function calculateReviewHash(summary: CodeReviewSummary): string {
  const hash = crypto.createHash('sha256');
  const data = JSON.stringify({
    role: summary.role,
    diff: summary.diffContext,
    goal: summary.prGoal,
    external: summary.externalContext,
    semantic: summary.impactSemanticContext,
  });
  return hash.update(data).digest('hex');
}

/**
 * prunes a cache object to maintain a maximum number of entries, preventing
 * the serialized state from exceeding GitHub's 65k comment character limit.
 */
export function pruneCache(
  cache: Record<string, CodeReviewResult>,
  maxEntries: number = 15
): Record<string, CodeReviewResult> {
  const keys = Object.keys(cache);
  if (keys.length <= maxEntries) return cache;

  // We don't have timestamps, so we'll just prune the oldest keys (by insertion order)
  const newCache: Record<string, CodeReviewResult> = {};
  keys.slice(-maxEntries).forEach(key => {
    newCache[key] = cache[key];
  });
  return newCache;
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

/**
 * Validates the findings schema to ensure all required fields are present.
 * Performs deep type checking to avoid runtime crashes on malformed LLM output.
 */
function validateFindingsSchema(state: CodeReviewState): boolean {
  if (!state.findings || !Array.isArray(state.findings)) return false;
  return state.findings.every(f =>
    f &&
    typeof f === 'object' &&
    typeof f.id === 'string' && f.id.trim() !== '' &&
    typeof f.file === 'string' && f.file.trim() !== '' &&
    typeof f.issue === 'string' && f.issue.trim() !== '' &&
    (f.status === 'open' || f.status === 'resolved')
  );
}

export function parseCodeReviewStateDetailed(feedback: string): ParsedFindingsResult {
  const openTag = '<findings>';
  const closeTag = '</findings>';

  const openIdx = feedback.lastIndexOf(openTag);
  const closeIdx = feedback.lastIndexOf(closeTag);

  if (openIdx === -1 || closeIdx === -1 || closeIdx < openIdx) {
    const openedButNeverClosed = openIdx !== -1 && (closeIdx === -1 || closeIdx < openIdx);
    return { state: undefined, parseError: openedButNeverClosed ? 'missing_closing_tag' : undefined };
  }

  let jsonText = feedback.slice(openIdx + openTag.length, closeIdx).trim();
  jsonText = jsonText.replace(/^```[a-z]*\s*/gi, '').replace(/\s*```$/g, '').trim();

  try {
    const state = JSON.parse(jsonText) as CodeReviewState;
    if (!validateFindingsSchema(state)) {
      return { state, parseError: 'incomplete_findings' };
    }
    return { state };
  } catch (e) {
    if (process.env.NODE_ENV !== 'test') {
      console.warn('Failed to parse findings JSON:', e, 'JSON snippet:', jsonText.slice(0, 100));
    }
    return { state: undefined, parseError: 'invalid_json' };
  }
}

export function estimateMaxOutputTokens(
  summary: CodeReviewSummary,
  _systemPromptLength: number = 0,
  thinkingBudget: number = 2048,
  outputPadding: number = 256
): number {
  // Thinking tokens consume the same budget as output tokens.
  // Add padding for JSON findings block and verdict line.
  const diffTokens = Math.ceil(summary.diffContext.length / 4);
  const estimatedOutput = Math.min(
    diffTokens * 0.4,  // heuristic: review output ~40% of diff size
    2000,              // cap — reviews shouldn't exceed this
  );

  const priorFindingsCount = summary.previousState?.findings.length ?? 0;
  const priorFindingsBudget = priorFindingsCount * 200;

  const totalBudget = Math.ceil(estimatedOutput + thinkingBudget + outputPadding + priorFindingsBudget);

  // Hard ceiling — raised to match what the models actually support
  return Math.min(totalBudget, 8192);
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

export function extractFeedbackText(content: unknown): string {
  if (content === null || content === undefined) return '';
  let feedback: string;

  if (typeof content === 'string') {
    feedback = content.replace(/^\s*```(?:json|xml)?\s*\n/i, '').replace(/\n\s*```\s*$/i, '');
  } else if (Array.isArray(content)) {
    const textParts = content
      .filter((p: unknown) => {
        if (typeof p === 'object' && p !== null) {
          return !('thought' in p);
        }
        return true;
      })
      .map((p: unknown) => {
        if (typeof p === 'object' && p !== null && 'text' in p) {
          return String((p as Record<string, unknown>).text ?? '');
        }
        return '';
      })
      .filter(p => p !== ''); // Only keep actual text parts

    if (textParts.length > 0) {
      feedback = textParts.join('');
    } else {
      feedback = JSON.stringify(content); // Fallback to full JSON stringification if no text parts
    }
  } else {
    feedback = JSON.stringify(content);
  }

  return feedback;
}

/**
 * Strips machine-readable tags like <findings> and [VERDICT] from the feedback.
 */
export function cleanupFeedback(feedback: string): string {
  let cleaned = feedback.replace(/<findings>[\s\S]*?<\/findings>/gi, '');
  cleaned = cleaned.replace(/\[VERDICT:\s*(PASS|WARN|FAIL)\]/gi, '');
  // Collapse multiple newlines into two and trim
  return cleaned.replace(/\n{3,}/g, '\n\n').trim();
}

/**
 * Split a list of files into batches of a certain size.
 */
export function batchFiles(files: string[], maxBatchSize: number): string[][] {
  const batches: string[][] = [];
  for (let i = 0; i < files.length; i += maxBatchSize) {
    batches.push(files.slice(i, i + maxBatchSize));
  }
  return batches;
}

export type ReviewPayloadItem = { role: string; content: string };

export interface PayloadConfig {
  diffPrefix?: string;
  externalPrefix?: string;
}

/**
 * Builds the standard payload for code review models using direct REST API role structure.
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
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `${diffPrefix}${diffText}` },
  ];

  if (externalText) {
    const formattedExternal = externalText === EXTERNAL_CONTEXT_TRUNCATED_MESSAGE
      ? externalText
      : `${externalPrefix}${externalText}`;
    // Using a separate system message for symbol resolution context ensures it's treated
    // as context mapping rather than part of the user's diff input
    payload.push({ role: 'system', content: formattedExternal });
  }

  return payload;
}

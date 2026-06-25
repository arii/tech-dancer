import type { CodeReviewSummary, CodeReviewState, ParsedFindingsResult, ReviewFinding } from './codeReviewTypes';

/**
 * Normalizes a verdict string from the LLM into a standard 'pass', 'fail', or 'warn' status.
 */
export function normalizeVerdict(verdict?: string): 'pass' | 'fail' | 'warn' {
  const v = verdict?.toLowerCase().trim();
  if (v === 'fail') return 'fail';
  if (v === 'warn') return 'warn';
  return 'pass';
}

/**
 * Shared logic to parse structured JSON responses from review agents.
 */
export function parseStructuredReviewResponse<T extends { id: string; file?: string; route?: string; status: string; issue: string }>(
  rawContent: string,
  findingsKey: string = 'findings'
): {
  feedback: string;
  verdict: 'pass' | 'fail' | 'warn';
  findings: T[];
  parseError?: 'invalid_json' | 'empty_response';
} {
  const rawFeedback = extractFeedbackText(rawContent);

  if (!rawFeedback || rawFeedback.trim() === '') {
    return {
      feedback: 'Error: Empty response from LLM',
      verdict: 'warn',
      findings: [],
      parseError: 'empty_response'
    };
  }

  try {
    const parsed = JSON.parse(rawFeedback);
    const findings = (parsed[findingsKey] || []) as T[];
    const verdict = normalizeVerdict(parsed.verdict);

    const feedback = parsed.feedback || (findings.length > 0
      ? findings.map(f => `### ${f.status === 'open' ? '🔴' : '✅'} [${f.id}] ${f.file || f.route || ''}\n${f.issue}`).join('\n\n')
      : rawFeedback);

    return { feedback, verdict, findings };
  } catch (e) {
    console.warn('Failed to parse structured LLM response:', e, 'Raw content:', rawFeedback.slice(0, 200));
    return {
      feedback: `Error parsing LLM response: ${e instanceof Error ? e.message : String(e)}\n\nOriginal response: ${rawFeedback}`,
      verdict: 'warn',
      findings: [],
      parseError: 'invalid_json'
    };
  }
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
  // If the feedback is already just the Markdown text (new structured output pattern),
  // this will largely be a no-op or just handle spacing.
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

  let combinedSystemPrompt = systemPrompt;

  if (externalText) {
    const formattedExternal = externalText === EXTERNAL_CONTEXT_TRUNCATED_MESSAGE
      ? externalText
      : `${externalPrefix}${externalText}`;

    combinedSystemPrompt += `\n\n${formattedExternal}`;
  }

  return [
    { role: 'system', content: combinedSystemPrompt },
    { role: 'user', content: `${diffPrefix}${diffText}` },
  ];
}

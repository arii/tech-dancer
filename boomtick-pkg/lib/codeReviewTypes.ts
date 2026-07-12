export interface ReviewFinding {
  id: string;
  file: string;
  line?: number;
  snippet?: string;
  issue: string;
  status: 'open' | 'resolved';
  fixSummary?: string;
  confidence?: 'high' | 'medium' | 'low';
  counterexample?: string;
}

export interface CodeReviewState {
  findings: ReviewFinding[];
  cache?: Record<string, CodeReviewResult>;
}

export type CodeReviewRole = 'SECURITY' | 'PERFORMANCE' | 'STYLE' | 'ARCHITECTURE';

export interface CodeReviewSummary {
  diffContext: string;
  role?: CodeReviewRole;
  fullDiff?: string;
  prGoal?: string;
  changedFiles?: string[];
  externalContext?: string;
  impactSemanticContext?: string;
  previousState?: CodeReviewState;
  estimatedInputTokens?: number;
  isTruncated?: boolean;
  diffStat?: string;
}

export type CodeReviewParseError = 'missing_closing_tag' | 'invalid_json' | 'incomplete_findings' | 'truncated_json';

export interface ParsedFindingsResult {
  state?: CodeReviewState;
  parseError?: CodeReviewParseError;
  errors?: CodeReviewParseError[];
}

/**
 * Strict JSON schema for Gemini structured output.
 * Guaranteed to match this structure when response_mime_type is 'application/json'.
 */
export const codeReviewResponseSchema = {
  type: 'object',
  properties: {
    feedback: {
      type: 'string',
      description: 'The narrative feedback and detailed review comments.'
    },
    verdict: {
      type: 'string',
      enum: ['pass', 'fail', 'warn'],
      description: 'The final outcome of the review.'
    },
    findings: {
      type: 'array',
      description: 'List of specific issues found in the code.',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Unique identifier for the finding (e.g., finding-1).' },
          file: { type: 'string', description: 'Path to the file containing the issue.' },
          line: { type: 'number', description: 'Line number where the issue occurs.' },
          snippet: { type: 'string', description: 'The exact line or block of code from the diff.' },
          issue: { type: 'string', description: 'Detailed description of the problem.' },
          status: { type: 'string', enum: ['open', 'resolved'], description: 'Whether the issue is currently active.' },
          confidence: { type: 'string', enum: ['high', 'medium', 'low'], description: 'Certainty level of the finding.' },
          fixSummary: { type: 'string', description: 'Summary of how to fix or how it was fixed.' },
          counterexample: { type: 'string', description: 'Code example showing the failure or preferred solution.' }
        },
        required: ['id', 'file', 'issue', 'status']
      }
    }
  },
  required: ['feedback', 'verdict', 'findings']
};

export interface GeminiStructuredResponse {
  feedback: string;
  verdict: 'pass' | 'fail' | 'warn';
  findings: Array<{
    id: string;
    file: string;
    line?: number;
    snippet?: string;
    issue: string;
    status: 'open' | 'resolved';
    confidence?: 'high' | 'medium' | 'low';
    fixSummary?: string;
    counterexample?: string;
  }>;
}

export interface CodeReviewResult {
  feedback: string;
  role?: CodeReviewRole;
  tokens: number;
  inputTokens?: number;
  outputTokens?: number;
  cacheTokens?: number;
  cost: number;
  llmVerdict?: 'pass' | 'fail' | 'warn';
  state?: CodeReviewState;
  modelName?: string;
  truncated?: boolean;
  parseError?: CodeReviewParseError;
  errors?: CodeReviewParseError[];
}

export interface ReviewFinding {
  id: string;
  file: string;
  line?: number;
  snippet?: string;
  issue: string;
  status: 'open' | 'resolved';
  fixSummary?: string;
}

export interface CodeReviewState {
  findings: ReviewFinding[];
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
}

export interface ParsedFindingsResult {
  state?: CodeReviewState;
  parseError?: 'missing_closing_tag' | 'invalid_json';
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
  parseError?: 'missing_closing_tag' | 'invalid_json';
  durationMs?: number;
}

export interface ReviewHistoryEntry {
  sha: string;
  verdict: 'pass' | 'fail' | 'warn';
  timestamp: string;
}

export interface ReviewState {
  count: number;
  lastSha?: string;
  history: ReviewHistoryEntry[];
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

export interface CodeReviewSummary {
  files: string[];
  diffContext: string;
  incrementalDiff?: string;
  prGoal?: string;
  previousReview?: string;
  history?: ReviewHistoryEntry[];
  fullDiff?: string;
  prGoal?: string;
  previousState?: CodeReviewState;
}

export interface CodeReviewResult {
  feedback: string;
  tokens: number;
  cost: number;
  llmVerdict?: 'pass' | 'fail' | 'warn';
  state?: CodeReviewState;
}

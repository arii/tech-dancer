export interface ReviewHistoryEntry {
  sha: string;
  verdict: 'pass' | 'fail' | 'warn';
  timestamp: string;
}

export interface ReviewState {
  count: number;
  lastSha?: string;
  history: ReviewHistoryEntry[];
}

export interface CodeReviewSummary {
  files: string[];
  diffContext: string;
  incrementalDiff?: string;
  prGoal?: string;
  previousReview?: string;
  history?: ReviewHistoryEntry[];
}

export interface CodeReviewResult {
  feedback: string;
  tokens: number;
  cost: number;
  llmVerdict?: 'pass' | 'fail' | 'warn';
}

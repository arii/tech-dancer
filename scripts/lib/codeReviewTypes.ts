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
  diffContext: string;
  fullDiff?: string;
  prGoal?: string;
  externalContext?: string;
  previousState?: CodeReviewState;
}

export interface CodeReviewResult {
  feedback: string;
  tokens: number;
  cost: number;
  llmVerdict?: 'pass' | 'fail' | 'warn';
  state?: CodeReviewState;
}

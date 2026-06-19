export interface CodeReviewSummary {
  files: string[];
  diffContext: string;
  repoContext: string;
  prGoal?: string;
  previousState?: CodeReviewState;
}

export interface CodeReviewFinding {
  id: string;
  file: string;
  line?: number;
  snippet: string;
  issue: string;
  status: 'open' | 'resolved';
  fixSummary?: string;
}

export interface CodeReviewState {
  findings: CodeReviewFinding[];
}

export interface CodeReviewResult {
  feedback: string;
  tokens: number;
  cost: number;
  llmVerdict?: 'pass' | 'fail' | 'warn';
  state?: CodeReviewState;
}

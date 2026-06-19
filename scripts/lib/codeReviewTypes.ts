export interface CodeReviewSummary {
  files: string[];
  diffContext: string;
  prGoal?: string;
  externalContext?: string;
}

export interface CodeReviewResult {
  feedback: string;
  tokens: number;
  cost: number;
  llmVerdict?: 'pass' | 'fail' | 'warn';
}

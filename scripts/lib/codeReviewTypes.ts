export interface CodeReviewSummary {
  files: string[];
  diffContext: string;
  prGoal?: string;
  isTruncated: boolean;
}

export interface CodeReviewResult {
  feedback: string;
  tokens: number;
  cost: number;
  llmVerdict?: 'pass' | 'fail' | 'warn';
}

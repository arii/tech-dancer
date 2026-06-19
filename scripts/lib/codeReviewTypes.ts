export interface CodeReviewSummary {
  files: string[];
  diffContext: string;
  isTruncated: boolean;
  prGoal?: string;
}

export interface CodeReviewResult {
  feedback: string;
  tokens: number;
  cost: number;
  llmVerdict?: 'pass' | 'fail' | 'warn';
}

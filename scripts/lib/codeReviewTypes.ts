export interface CodeReviewSummary {
  repoContext?: string;
  files: string[];
  diffContext: string;
}

export interface CodeReviewResult {
  feedback: string;
  tokens: number;
  cost: number;
  llmVerdict?: 'pass' | 'fail' | 'warn';
}

export interface CodeReviewSummary {
  repoContext?: string; // Always a JSON stringified object
  files: string[];
  diffContext: string;
}

export interface CodeReviewResult {
  feedback: string;
  tokens: number;
  cost: number;
  llmVerdict?: 'pass' | 'fail' | 'warn';
}

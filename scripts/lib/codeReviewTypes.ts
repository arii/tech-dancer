export interface CodeReviewSummary {
  files: string[];
  diffContext: string;
  /**
   * Stringified JSON object containing all repository schemas.
   * Undefined if no schemas were found or if parsing failed.
   */
  schemasContext?: string;
}

export interface CodeReviewResult {
  feedback: string;
  tokens: number;
  cost: number;
  llmVerdict?: 'pass' | 'fail' | 'warn';
}

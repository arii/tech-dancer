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
  cache?: Record<string, CodeReviewResult>;
}

export type CodeReviewRole = 'SECURITY' | 'PERFORMANCE' | 'STYLE' | 'ARCHITECTURE';

export interface CodeReviewSummary {
  diffContext: string;
  role?: CodeReviewRole;
  fullDiff?: string;
  prGoal?: string;
  changedFiles?: string[];
  externalContext?: string;
  impactSemanticContext?: string;
  previousState?: CodeReviewState;
  estimatedInputTokens?: number;
  isTruncated?: boolean;
  diffStat?: string;
}

export const CODE_REVIEW_SCHEMA = {
  type: "OBJECT",
  properties: {
    verdict: { type: "STRING", enum: ["PASS", "WARN", "FAIL"] },
    feedback: { type: "STRING" },
    findings: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING" },
          file: { type: "STRING" },
          line: { type: "NUMBER" },
          snippet: { type: "STRING" },
          issue: { type: "STRING" },
          status: { type: "STRING", enum: ["open", "resolved"] },
          fixSummary: { type: "STRING" }
        },
        required: ["id", "file", "issue", "status"]
      }
    }
  },
  required: ["verdict", "feedback", "findings"]
};

export interface CodeReviewResult {
  feedback: string;
  role?: CodeReviewRole;
  tokens: number;
  inputTokens?: number;
  outputTokens?: number;
  cacheTokens?: number;
  cost: number;
  llmVerdict?: 'pass' | 'fail' | 'warn';
  state?: CodeReviewState;
  modelName?: string;
  truncated?: boolean;
  parseError?: 'missing_closing_tag' | 'invalid_json' | 'incomplete_findings';
}

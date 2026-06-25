export interface VisualReviewFinding {
  id: string;
  route: string;
  issue: string;
  status: 'open' | 'resolved';
  fixSummary?: string;
}

export interface VisualReviewState {
  findings: VisualReviewFinding[];
}

export interface VisualRouteSummary {
  route: string;
  slug: string;
  differencePercent: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  beforeCroppedPath?: string;
  afterCroppedPath?: string;
  diffCroppedPath?: string;
  beforePath: string;
  afterPath: string;
  diffPath?: string;
  previousFindings?: VisualReviewFinding[];
}

export interface VisualSummary {
  routes: VisualRouteSummary[];
}

export const VISUAL_REVIEW_SCHEMA = {
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
          route: { type: "STRING" },
          issue: { type: "STRING" },
          status: { type: "STRING", enum: ["open", "resolved"] },
          fixSummary: { type: "STRING" }
        },
        required: ["id", "route", "issue", "status"]
      }
    }
  },
  required: ["verdict", "feedback", "findings"]
};

export interface RouteReview {
  route: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  differencePercent: number;
  feedback: string;
  tokens: number;
  inputTokens?: number;
  outputTokens?: number;
  cacheTokens?: number;
  cost: number;
  modelName?: string;
  llmVerdict?: 'pass' | 'fail' | 'warn';
  findings?: VisualReviewFinding[];
  truncated?: boolean;
  role?: string;
  parseError?: 'missing_closing_tag' | 'invalid_json' | 'incomplete_findings';
}

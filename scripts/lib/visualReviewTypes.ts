export interface VisualRouteSummary {
  repoContext?: string;
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
}

export interface VisualSummary {
  routes: VisualRouteSummary[];
}

export interface RouteReview {
  route: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  differencePercent: number;
  feedback: string;
  tokens: number;
  cost: number;
  llmVerdict?: 'pass' | 'fail' | 'warn';
}

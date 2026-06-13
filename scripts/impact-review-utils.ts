import fs from 'fs';
import path from 'path';

export interface ImpactAnalysisArtifact {
  routes?: string[];
  visualReviewRequired?: string[];
  changedFiles?: string[];
  affectedPages?: string[];
  impactLevel?: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface VisualRouteSummary {
  route: string;
  slug: string;
  beforePath: string;
  afterPath: string;
  diffPath: string;
  diffPixels: number;
  totalPixels: number;
  differencePercent: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
}

export const ARTIFACTS_DIR = path.join(process.cwd(), 'artifacts');
export const VISUAL_REVIEW_DIR = path.join(ARTIFACTS_DIR, 'visual-review');
export const DOM_REVIEW_DIR = path.join(ARTIFACTS_DIR, 'dom-review');
export const IMPACT_ANALYSIS_PATH = path.join(ARTIFACTS_DIR, 'impact-analysis.json');
export const VISUAL_SUMMARY_PATH = path.join(VISUAL_REVIEW_DIR, 'summary.json');
export const DOM_SUMMARY_PATH = path.join(DOM_REVIEW_DIR, 'summary.json');

export function ensureDirectory(directory: string): void {
  fs.mkdirSync(directory, { recursive: true });
}

export function routeToSlug(route: string): string {
  if (route === '/') return 'home';

  const withoutQuery = route.split('?')[0] ?? route;
  const slug = withoutQuery
    .replace(/^\/+|\/+$/g, '')
    .replace(/[:*]/g, '')
    .replace(/[^a-zA-Z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

  return slug || 'home';
}

export function readImpactAnalysis(): Required<Pick<ImpactAnalysisArtifact, 'routes'>> & ImpactAnalysisArtifact {
  const candidates = [
    IMPACT_ANALYSIS_PATH,
    path.join(ARTIFACTS_DIR, 'impact-analysis', 'impact.json')
  ];

  const artifactPath = candidates.find(candidate => fs.existsSync(candidate));
  if (!artifactPath) {
    throw new Error('Missing impact analysis artifact. Run `pnpm impact:analysis` first.');
  }

  const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8')) as ImpactAnalysisArtifact;
  const routes = artifact.routes ?? artifact.visualReviewRequired ?? [];

  return { ...artifact, routes };
}

export function visualSeverity(percent: number): 'LOW' | 'MEDIUM' | 'HIGH' {
  if (percent > 5) return 'HIGH';
  if (percent > 1) return 'MEDIUM';
  return 'LOW';
}

export function domSeverity(nodesChanged: number): 'LOW' | 'MEDIUM' | 'HIGH' {
  if (nodesChanged > 20) return 'HIGH';
  if (nodesChanged > 5) return 'MEDIUM';
  return 'LOW';
}

export function combinedSeverity(...severities: Array<'LOW' | 'MEDIUM' | 'HIGH' | undefined>): 'LOW' | 'MEDIUM' | 'HIGH' {
  if (severities.includes('HIGH')) return 'HIGH';
  if (severities.includes('MEDIUM')) return 'MEDIUM';
  return 'LOW';
}

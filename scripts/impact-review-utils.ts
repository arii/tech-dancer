import { spawn, type ChildProcess } from 'child_process';
import fs from 'fs';
import path from 'path';
import { z } from 'zod';

export interface ImpactAnalysisArtifact {
  routes?: string[];
  visualReviewRequired?: string[];
  changedFiles?: string[];
  affectedPages?: string[];
  impactLevel?: 'HIGH' | 'MEDIUM' | 'LOW';
}

export const VisualRouteSummarySchema = z.object({
  route: z.string(),
  metrics: z.object({
    diffPixels: z.number(),
    totalPixels: z.number(),
    differencePercent: z.number(),
  }),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH']),
});

export type VisualRouteSummary = z.infer<typeof VisualRouteSummarySchema>;

export const DomRouteSummarySchema = z.object({
  route: z.string(),
  metrics: z.object({
    nodes: z.tuple([z.number(), z.number()]),
    images: z.tuple([z.number(), z.number()]),
    links: z.tuple([z.number(), z.number()]),
  }),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH']),
});

export type DomRouteSummary = z.infer<typeof DomRouteSummarySchema>;

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

export function startPreview(cwd: string, port: number): ChildProcess {
  const child = spawn('pnpm', ['exec', 'vite', 'preview', '--host', '127.0.0.1', '--port', String(port)], {
    cwd,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: {
      ...process.env,
      VITE_BASE_PATH: '/'
    }
  });

  child.stdout?.on('data', data => process.stdout.write(`[preview:${port}] ${String(data)}`));
  child.stderr?.on('data', data => process.stderr.write(`[preview:${port}] ${String(data)}`));

  return child;
}

export async function waitForServer(url: string, timeoutMs = 30_000): Promise<void> {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok || response.status < 500) return;
    } catch {
      // Retry until timeout.
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  throw new Error(`Timed out waiting for ${url}`);
}

export function stopPreview(child: ChildProcess): void {
  if (!child.killed) {
    child.kill('SIGTERM');
  }
}

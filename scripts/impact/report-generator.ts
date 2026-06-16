import fs from 'fs';
import path from 'path';
import {
  ARTIFACTS_DIR,
  combinedSeverity,
  readImpactAnalysis,
  type VisualRouteSummary,
  type DomRouteSummary
} from '../impact-review-utils';


const deploymentReviewPath = path.join(ARTIFACTS_DIR, 'deployment-review.md');

function formatDomMetrics(metrics: DomRouteSummary['metrics']): string[] {
  const rows = [
    ['Added nodes', metrics.nodesAdded],
    ['Removed nodes', metrics.nodesRemoved],
    ['Added images', metrics.imagesAdded],
    ['Removed images', metrics.imagesRemoved],
    ['Added links', metrics.linksAdded],
    ['Removed links', metrics.linksRemoved]
  ] as const;

  const changed = rows.filter(([, value]) => value > 0);
  return changed.length > 0 ? changed.map(([label, value]) => `- ${label}: ${value}`) : ['None'];
}

export function generateDeploymentReport(domSummaries: DomRouteSummary[], visualSummaries: VisualRouteSummary[]): void {
  const impact = readImpactAnalysis();
  const visualByRoute = new Map(visualSummaries.map(summary => [summary.route, summary]));
  const changedFiles = impact.changedFiles ?? [];

  const routeSections = domSummaries.map(domSummary => {
    const visual = visualByRoute.get(domSummary.route);
    const severity = combinedSeverity(visual?.severity, domSummary.severity);
    const reviewRequired = severity !== 'LOW';

    // Since diffPath etc is no longer in the metric payload, we assume the naming convention or omit them if not specified.
    // However, the visual review does supply diff paths. DOM diffs are still generated in the main loop so we can rebuild the path.
    const routeSlug = domSummary.route === '/' ? 'home' : domSummary.route.split('?')[0].replace(/^\/+|\/+$/g, '').replace(/[^a-zA-Z0-9-]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase() || 'home';
    const _domDiffPath = `dom-review/${routeSlug}/diff.txt`;

    return `### ${domSummary.route}

Visual Difference: ${(visual?.differencePercent ?? 0).toFixed(2)}%

DOM Changes:
${formatDomMetrics(domSummary.metrics).join('\n')}

Severity: ${severity}

Review Required: ${reviewRequired ? 'Yes' : 'No'}

Artifacts:
- Before screenshot: ${visual?.beforePath ?? 'Not captured'}
- After screenshot: ${visual?.afterPath ?? 'Not captured'}
- Visual diff: ${visual?.diffPath ?? 'Not captured'}
- DOM diff: ${domSummary.diffPath}
`;
  });

  const report = `# Deployment Review

## Summary

Impact Level: ${impact.impactLevel ?? 'LOW'}

Changed Files:
${changedFiles.length > 0 ? changedFiles.map(file => `- ${file}`).join('\n') : '- None detected'}

## Routes Reviewed

${routeSections.length > 0 ? routeSections.join('\n---\n\n') : '_No concrete routes required review._'}
`;

  fs.writeFileSync(deploymentReviewPath, report);
}

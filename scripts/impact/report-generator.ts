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
    ['Added nodes', metrics.nodes[0]],
    ['Removed nodes', metrics.nodes[1]],
    ['Added images', metrics.images[0]],
    ['Removed images', metrics.images[1]],
    ['Added links', metrics.links[0]],
    ['Removed links', metrics.links[1]]
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

    const visualArtifacts = [
      `- Before screenshot: ${visual?.beforePath ?? 'Not captured'}`,
      `- After screenshot: ${visual?.afterPath ?? 'Not captured'}`,
      `- Visual diff: ${visual?.diffPath ?? 'Not captured'}`
    ];

    if (visual?.beforeCroppedPath) visualArtifacts.push(`- Before (cropped): ${visual.beforeCroppedPath}`);
    if (visual?.afterCroppedPath) visualArtifacts.push(`- After (cropped): ${visual.afterCroppedPath}`);
    if (visual?.diffCroppedPath) visualArtifacts.push(`- Visual diff (cropped): ${visual.diffCroppedPath}`);

    return `### ${domSummary.route}

Visual Difference: ${(visual?.differencePercent ?? 0).toFixed(2)}%

DOM Changes:
${formatDomMetrics(domSummary.metrics).join('\n')}
- Diff path: ${domSummary.diffPath}

Severity: ${severity}

Review Required: ${reviewRequired ? 'Yes' : 'No'}

Artifacts:
${visualArtifacts.join('\n')}
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

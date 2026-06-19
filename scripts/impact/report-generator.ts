import fs from 'fs';
import path from 'path';
import { ARTIFACTS_DIR, combinedSeverity, readImpactAnalysis, type VisualRouteSummary, type DomRouteSummary } from '../impact-review-utils';

export const deploymentReviewPath = path.join(ARTIFACTS_DIR, 'deployment-review.md');

function formatDomMetrics(metrics: DomRouteSummary['metrics']): string[] {
  const rows = [
    ['Added nodes', metrics.nodesAdded], ['Removed nodes', metrics.nodesRemoved],
    ['Added images', metrics.imagesAdded], ['Removed images', metrics.imagesRemoved],
    ['Added links', metrics.linksAdded], ['Removed links', metrics.linksRemoved],
  ] as const;
  const changed = rows.filter(([, v]) => v > 0);
  return changed.length > 0 ? changed.map(([l, v]) => `- ${l}: ${v}`) : ['None'];
}

export function generateDeploymentReport(domSummaries: DomRouteSummary[], visualSummaries: VisualRouteSummary[]): void {
  const impact = readImpactAnalysis();
  const visualByRoute = new Map(visualSummaries.map(s => [s.route, s]));
  const changedFiles = impact.changedFiles ?? [];

  const routeSections = domSummaries.map(dom => {
    const visual = visualByRoute.get(dom.route);
    const severity = combinedSeverity(visual?.severity, dom.severity);
    const reviewRequired = severity !== 'LOW';

    const visualArtifacts = [
      `- Before screenshot: ${visual?.beforePath ?? 'Not captured'}`,
      `- After screenshot: ${visual?.afterPath ?? 'Not captured'}`,
      `- Visual diff: ${visual?.diffPath ?? 'Not captured'}`
    ];

    if (visual?.beforeCroppedPath) visualArtifacts.push(`- Before (cropped): ${visual.beforeCroppedPath}`);
    if (visual?.afterCroppedPath) visualArtifacts.push(`- After (cropped): ${visual.afterCroppedPath}`);
    if (visual?.diffCroppedPath) visualArtifacts.push(`- Visual diff (cropped): ${visual.diffCroppedPath}`);

    visualArtifacts.push(`- DOM diff: ${dom.diffPath}`);

    return `<details>
<summary><b>${dom.route}</b> (Visual Diff: ${(visual?.differencePercent ?? 0).toFixed(2)}%)</summary>

<br/>

**Severity:** ${severity}
**Review Required:** ${reviewRequired ? 'Yes' : 'No'}

**DOM Changes:**
${formatDomMetrics(dom.metrics).join('\n')}

**Artifacts:**
${visualArtifacts.join('\n')}
</details>`;
  });

  const report = `# Deployment Review

## Summary

Impact Level: ${impact.impactLevel ?? 'LOW'}

<details>
<summary><b>📝 Changed Files (${changedFiles.length})</b></summary>

${changedFiles.length > 0 ? changedFiles.map(file => `- ${file}`).join('\n') : '- None detected'}
</details>

## Routes Reviewed

${routeSections.length > 0 ? routeSections.join('\n\n') : '_No concrete routes required review._'}
`;

  fs.writeFileSync(deploymentReviewPath, report);
}

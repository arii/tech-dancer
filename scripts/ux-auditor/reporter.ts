import fs from 'fs';
import path from 'path';
import type { UXAuditState, UXFinding } from './types';

export function formatTerminalSummary(state: UXAuditState): void {
  console.log('\n' + '='.repeat(70));
  console.log(`🎯 UX AUDIT SUMMARY: ${state.route} (Score: ${state.overallScore}/100)`);
  console.log('='.repeat(70));
  console.log(`📌 Primary Goal: ${state.primaryConversionGoal || 'N/A'}`);
  console.log(`📐 Viewports Audited: ${state.selectedViewports.join(', ')}`);
  console.log(`🔄 Refinement Loops: ${state.iterationCount}/${state.maxIterations}`);
  console.log('-'.repeat(70));

  if (state.finalFindings.length === 0) {
    console.log('✅ No critical UX issues flagged. The page conforms well to design guidelines.');
    return;
  }

  console.log('FINDINGS & RECOMMENDATIONS:');
  state.finalFindings.forEach((f, idx) => {
    const severityBadge = getSeverityBadge(f.severity);
    console.log(`\n${idx + 1}. [${f.category}] ${severityBadge} ${f.title}`);
    if (f.affectedViewport) console.log(`   📱 Viewport: ${f.affectedViewport}`);
    if (f.elementSelector) console.log(`   🎯 Element: ${f.elementSelector}`);
    console.log(`   💡 Issue: ${f.description}`);
    console.log(`   🛠️  Fix: ${f.recommendedFix}`);
    if (f.suggestedTailwindSnippet) {
      console.log(`   🎨 Tailwind: ${f.suggestedTailwindSnippet}`);
    }
  });

  console.log('\n' + '='.repeat(70));
}

function getSeverityBadge(severity: UXFinding['severity']): string {
  switch (severity) {
    case 'CRITICAL': return '🔴 CRITICAL';
    case 'HIGH': return '🟠 HIGH';
    case 'MEDIUM': return '🟡 MEDIUM';
    case 'LOW': return '🟢 LOW';
    case 'POLISH': return '✨ POLISH';
    default: return severity;
  }
}

export function saveAuditArtifacts(state: UXAuditState, outputDir?: string): { reportPath: string; jsonPath: string } {
  const slug = state.slug || 'home';
  const targetDir = outputDir || path.join(process.cwd(), 'artifacts', 'ux-audit', slug);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const reportPath = path.join(targetDir, 'report.md');
  const jsonPath = path.join(targetDir, 'audit.json');

  // Build Markdown report
  const mdLines: string[] = [];
  mdLines.push(`# UX Audit Report: \`${state.route}\``);
  mdLines.push('');
  mdLines.push(`**Overall UX Score**: ${state.overallScore} / 100`);
  mdLines.push(`**Date**: ${new Date().toISOString()}`);
  mdLines.push(`**Viewports Audited**: ${state.selectedViewports.join(', ')}`);
  mdLines.push(`**Refinement Cycles**: ${state.iterationCount}`);
  mdLines.push('');
  mdLines.push('## 📌 Executive Summary');
  mdLines.push(state.summaryMarkdown || state.visualHierarchySummary || 'UX audit completed.');
  mdLines.push('');
  mdLines.push('## 🎯 Primary Conversion Goal & Funnel');
  mdLines.push(state.primaryConversionGoal || 'Conversion goal evaluated.');
  mdLines.push('');
  mdLines.push('## 🔍 Prioritized Findings & Remediation');
  mdLines.push('');

  state.finalFindings.forEach(f => {
    mdLines.push(`### ${getSeverityBadge(f.severity)} ${f.title}`);
    mdLines.push(`- **Category**: \`${f.category}\``);
    if (f.affectedViewport) mdLines.push(`- **Affected Viewport**: \`${f.affectedViewport}\``);
    if (f.elementSelector) mdLines.push(`- **Selector**: \`${f.elementSelector}\``);
    mdLines.push(`- **Problem**: ${f.description}`);
    mdLines.push(`- **Actionable Fix**: ${f.recommendedFix}`);
    if (f.suggestedTailwindSnippet) {
      mdLines.push('');
      mdLines.push('```tsx');
      mdLines.push(`// Suggested Tailwind / Token styling`);
      mdLines.push(f.suggestedTailwindSnippet);
      mdLines.push('```');
    }
    mdLines.push('');
  });

  if (state.baseScan?.axeViolations && state.baseScan.axeViolations.length > 0) {
    mdLines.push('## ♿ Automated Accessibility Violations (Axe-core)');
    state.baseScan.axeViolations.forEach(v => {
      mdLines.push(`- **[${v.impact.toUpperCase()}] ${v.id}**: ${v.description} ([Guidelines](${v.helpUrl}))`);
    });
    mdLines.push('');
  }

  fs.writeFileSync(reportPath, mdLines.join('\n'), 'utf8');

  // Write JSON
  const jsonData = {
    route: state.route,
    slug: state.slug,
    timestamp: new Date().toISOString(),
    overallScore: state.overallScore,
    selectedViewports: state.selectedViewports,
    iterationCount: state.iterationCount,
    primaryConversionGoal: state.primaryConversionGoal,
    visualHierarchySummary: state.visualHierarchySummary,
    summaryMarkdown: state.summaryMarkdown,
    findings: state.finalFindings,
    axeViolations: state.baseScan?.axeViolations || []
  };

  fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), 'utf8');

  return { reportPath, jsonPath };
}

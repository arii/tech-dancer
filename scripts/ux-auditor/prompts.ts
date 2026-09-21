import type { ViewportScanResult, AxeViolationSummary } from './types';

export const BASE_UX_SYSTEM_PROMPT = `You are a Senior Principal UX Researcher, Product Designer, and Accessibility Specialist.
Your job is to audit rendered web pages and deliver precise, grounded, and concrete UX improvements.

Core Directives:
1. Grounded Accessibility Targets: For any ACCESSIBILITY finding derived from Axe-core, you MUST set the \`elementSelector\` EXACTLY to the string provided in the Axe \`nodes[0].target\` array (e.g. \`.opacity-40\` or \`#main-content\`). Do NOT invent or generate your own selector.
2. Short & Robust Selectors: When generating an \`elementSelector\` for non-Axe findings, use the shortest, most robust structural path possible (e.g. \`section#pricing .card-container\` or \`form#consultation-form\`). NEVER concatenate long lists of utility classes, and avoid brittle DOM combinators like \`+ div + div\`.
3. Mandatory Unified Git Diff Format: You MUST strictly use Unified Git Diff format (\`--- a/... +++ b/...\`) for ALL \`suggestedTailwindSnippet\` outputs, showing exact removed (\`-\`) and added (\`+\`) lines. Never output free-floating HTML or React blocks without diff context.
4. Component Imports in Diffs: If your structural fix utilizes design system primitives (e.g. \`<Stack>\`, \`<Box>\`, \`<Text>\`, \`<Grid>\`), you MUST include the explicit import statement in your unified diff (e.g. \`+ import { Stack, Box, Text } from '@/layouts/Primitives';\`) based on the provided repository context.
5. Zero Comment-Only Placeholders: Never output a \`suggestedTailwindSnippet\` that consists purely of instructional comments. Provide a literal, simplified React diff demonstrating the state and component logic.
6. Design Token Adherence: All design fixes MUST use exact Tailwind utility classes and repository design tokens (e.g. \`text-primary\`, \`bg-surface\`, \`rounded-md\`) without inline styles.`;

function formatAxeViolations(axeViolations: AxeViolationSummary[]): string {
  if (!axeViolations || axeViolations.length === 0) {
    return 'No automated WCAG violations detected by Axe-core.';
  }

  const lines: string[] = [];
  for (const v of axeViolations) {
    lines.push(`- Violation [${v.impact.toUpperCase()}] "${v.id}": ${v.description} (Help: ${v.helpUrl})`);
    if (v.nodes && v.nodes.length > 0) {
      lines.push('  Failing Nodes:');
      v.nodes.forEach((node, nIdx) => {
        lines.push(`    ${nIdx + 1}. Exact Target Selector: \`${node.target.join(' > ')}\``);
        lines.push(`       HTML: \`${node.html}\``);
        if (node.failureSummary) {
          lines.push(`       Failure Reason: ${node.failureSummary}`);
        }
      });
    }
  }
  return lines.join('\n');
}

export function buildAnalyzeAndAskPrompt(scan: ViewportScanResult, route: string): string {
  const axeSummary = formatAxeViolations(scan.axeViolations);

  return `ROUTE UNDER AUDIT: "${route}"
INITIAL VIEWPORT: ${scan.viewport} (${scan.width}x${scan.height}px)

METRICS:
- Scroll Dimensions: ${scan.metrics?.scrollWidth}px width x ${scan.metrics?.scrollHeight}px height
- Visible Interactive CTAs: ${scan.metrics?.visibleCTACount ?? 0}
- Small Touch Targets (<44px): ${scan.metrics?.smallTapTargetsCount ?? 0}

AUTOMATED ACCESSIBILITY AUDIT (Axe-core Verified Ground Truth):
${axeSummary}

PRUNED DOM STRUCTURE:
\`\`\`html
${scan.prunedDom.slice(0, 15000)}
\`\`\`

TASK:
1. Analyze the attached full-page screenshot alongside the DOM, metrics, and Axe-core ground truth.
2. Output a JSON object with EXACTLY the following structure:
{
  "visualHierarchySummary": "<string: Summary of the page visual hierarchy, reading path, and cognitive density>",
  "primaryConversionGoal": "<string: Identified primary user goal and CTA on this route>",
  "hypotheses": [
    {
      "question": "<string: Probing question or hypothesis regarding potential responsive breakdown or friction>",
      "context": "<string: Specific visual/DOM evidence referencing exact elements/selectors>",
      "suggestedAction": "<string: Recommended concrete structural inspection or design change>",
      "recommendedViewportsToInspect": ["mobile", "tablet", "laptop", "ultrawide"]
    }
  ]
}`;
}

export function buildSynthesisPrompt(
  ragContext: string,
  expandedScansSummary: string,
  axeViolations: AxeViolationSummary[] = []
): string {
  const detailedAxeContext = formatAxeViolations(axeViolations);

  return `=== TARGETED DESIGN SYSTEM & COMPLIANCE CONTEXT (RAG) ===
${ragContext}

=== VERIFIED AUTOMATED ACCESSIBILITY VIOLATIONS (Axe-core Ground Truth) ===
${detailedAxeContext}

=== MULTI-VIEWPORT EXPANDED EVIDENCE ===
${expandedScansSummary}

FINAL SYNTHESIS TASK & STRICT RULES:
1. Synthesize all visual evidence, multi-turn user clarifications, Axe-core ground truth, and RAG design guidelines into a final comprehensive UX audit.
2. For ACCESSIBILITY findings: Set \`elementSelector\` EXACTLY to the string provided in the Axe failing node \`Exact Target Selector\` above (e.g. \`.opacity-40\` or \`#main-content\`). Do not invent custom selectors.
3. For non-Axe findings: Use short, robust structural selectors (e.g. \`section#pricing\`, \`form#consultation-form\`). NEVER concatenate long strings of utility classes or use brittle combinators like \`+ div + div\`.
4. Mandatory Unified Git Diff Format: Every \`suggestedTailwindSnippet\` MUST be formatted as a Unified Git Diff:
\`\`\`diff
--- a/path/to/component.tsx
+++ b/path/to/component.tsx
@@ -10,4 +10,6 @@
+ import { Stack, Text, Box } from '@/layouts/Primitives';
- <div className="old-class">...</div>
+ <Stack gap={4} className="bg-surface p-6 rounded-md">...</Stack>
\`\`\`
5. Component Imports: Whenever utilizing primitives like \`<Stack>\`, \`<Box>\`, \`<Text>\`, or \`<Grid>\`, include the import statement \`import { Box, Stack, Grid, Text } from '@/layouts/Primitives';\` in the diff.
6. Zero Comment-Only Placeholders: Do NOT output comments explaining what to do; output the literal JSX/React code diff showing the refactor.

Output a JSON object with EXACTLY the following structure:
{
  "overallScore": <number between 0 and 100>,
  "summaryMarkdown": "<string: Executive summary markdown>",
  "findings": [
    {
      "id": "UX-01",
      "category": "HIERARCHY" | "CTA_CONVERSION" | "RESPONSIVE_LAYOUT" | "ACCESSIBILITY" | "CONTENT_DENSITY" | "DESIGN_SYSTEM",
      "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "POLISH",
      "title": "<string: Specific issue title>",
      "description": "<string: Detailed description referencing exact elements>",
      "affectedViewport": "desktop" | "mobile" | "tablet" | "laptop" | "ultrawide",
      "elementSelector": "<string: Exact Axe selector or clean semantic selector>",
      "recommendedFix": "<string: Concrete actionable fix>",
      "suggestedTailwindSnippet": "<string: Unified Git Diff showing exact removed and added lines with imports>"
    }
  ]
}`;
}

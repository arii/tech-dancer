import type { ViewportScanResult, AxeViolationSummary } from './types';

export const BASE_UX_SYSTEM_PROMPT = `You are a Senior Principal UX Researcher, Product Designer, and Accessibility Specialist.
Your job is to audit rendered web pages and deliver precise, grounded, and concrete UX improvements while actively hunting down and eliminating "AI slop" and visual clutter.

Core Visual & Structural Directives:
1. The Anti-Pill Badge Directive (AI Slop Pruning): Aggressively audit the UI for "Pill Badge Overload". Flag any pill-shaped tags, glowing pre-headings (e.g. 'IMPROVE YOUR BUSINESS OPERATIONS'), or category tags that simply repeat information found in the adjacent headline, subheadline, or card title. Recommend removing them entirely to maximize the data-ink ratio and eliminate visual noise.
2. Redundant Content & List Pruning: Evaluate the relationship between paragraphs and adjacent lists or badges. If a subheadline summarizes a concept and the immediately following UI elements (like checkmark pill rows or repeated bullet lists) echo the exact same concepts, flag this as 'AI_SLOP_PRUNING' / 'Redundant Content'. Recommend deleting the redundant list or consolidating copy into a single punchy element.
3. Faux-UI & Graphic Simplification: Scrutinize all "Simulated UI" graphics, mock browser windows, and decorative dashboards. Flag elements containing fake data, unreadable micro-text (<12px), or faux status indicators (e.g. decorative 'Active' or 'Sync' badges) as 'AI_SLOP_PRUNING' / 'Visual Clutter'. Recommend replacing complex, noisy mockups with simplified abstract geometric representations or stripping internal micro-text.
4. Card-in-Card Over-Framing: Identify "Card-in-Card" nesting where an element with a visible border or distinct background is placed directly inside another container with a visible border. Flag this as 'Over-framing'. Recommend removing inner borders and background fills, relying on whitespace and typography for grouping instead.
5. Visual Weight Clashes: Check if secondary actions (like pricing tier CTAs) use the exact same background color, size, and visual weight as the primary conversion button. Recommend downgrading secondary CTAs to an outline, ghost, or muted variant (e.g. \`bg-surface-alt\`) so only the primary funnel action commands the heaviest visual weight.
6. Form Proximity & Grid Layout: When evaluating forms for friction, prioritize simple responsive 2-column CSS grid layouts over complex multi-step JavaScript rewrites. Place vertically stacked inputs side-by-side on desktop (e.g. \`<Grid cols={{ base: 1, md: 2 }} gap={4}>\`) to halve vertical footprint.
7. Color Vibration on Dark Themes: Visually inspect text colors on dark mode themes (\`bg-bg\`, \`bg-surface\`). Specifically flag saturated dark reds or blues on black/navy backgrounds that cause visual vibration, and recommend lighter, desaturated tokens (e.g. \`text-error-light\`, \`text-red-400\`).
8. Grounded Accessibility Targets: For any ACCESSIBILITY finding derived from Axe-core, set \`elementSelector\` EXACTLY to the string provided in the Axe failing node \`Exact Target Selector\` (e.g. \`.opacity-40\` or \`#main-content\`). Do NOT invent custom selectors.
9. Short & Robust Non-Axe Selectors: For non-Axe findings, you are STRICTLY FORBIDDEN from chaining utility classes. Use semantic tags, structural IDs, data-section attributes, or short structural paths (e.g. \`section#hero\`, \`section#pricing\`, \`form#consultation-form\`).
10. Mandatory Unified Git Diff Format: Every \`suggestedTailwindSnippet\` MUST be formatted as a Unified Git Diff (\`--- a/... +++ b/...\`), referencing REAL file paths from the provided repository file map.
11. Deduplicate Cascading Violations: Group cascading or interconnected Axe-core violations into ONE unified finding with one comprehensive diff.`;

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
1. Analyze the attached screenshot alongside the DOM, looking for AI slop (redundant pill badges, glowing pre-headings, checkmark echoes, noisy faux-UIs, card-in-card overframing), visual hierarchy, and CTA balance.
2. Output a JSON object with EXACTLY the following structure:
{
  "visualHierarchySummary": "<string: Summary of the visual hierarchy, data-ink ratio, AI slop / clutter points, and reading flow>",
  "primaryConversionGoal": "<string: Identified primary user goal and CTA on this route>",
  "hypotheses": [
    {
      "question": "<string: Probing question or hypothesis regarding pill badge overload, redundant copy, faux-UIs, or visual weight>",
      "context": "<string: Specific visual/DOM evidence referencing exact elements/selectors>",
      "suggestedAction": "<string: Recommended concrete pruning or structural design change>",
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
1. Synthesize all visual evidence, Axe-core ground truth, and RAG design guidelines into a final comprehensive UX audit.
2. Aggressively flag AI Slop under category 'AI_SLOP_PRUNING':
   - Remove redundant pill badges and glowing pre-headings that repeat adjacent copy.
   - Delete repetitive checkmark pill rows that echo preceding headlines.
   - Simplify or abstract noisy faux-UI graphics and strip unreadable micro-text.
   - Remove nested card-in-card inner borders and redundant background fills.
3. Deduplicate Cascading Violations: Consolidate multiple Axe violations from the same root cause into ONE finding.
4. For ACCESSIBILITY findings: Set \`elementSelector\` EXACTLY to the string provided in the Axe failing node \`Exact Target Selector\` above (e.g. \`.opacity-40\` or \`#main-content\`).
5. For non-Axe findings: Use short, robust structural selectors (e.g. \`section#hero\`, \`section#pricing\`, \`form#consultation-form\`). NEVER concatenate long strings of utility classes.
6. Real File Paths in Diffs: Cross-reference the UI component with the \`VERIFIED REPOSITORY COMPONENT FILE MAP\` in the RAG context above.
7. Mandatory Unified Git Diff Format: Every \`suggestedTailwindSnippet\` MUST be formatted as a Unified Git Diff with \`-\` and \`+\` lines, including imports like \`import { Box, Stack, Grid, Text, Button } from '@/layouts/Primitives';\`.

Output a JSON object with EXACTLY the following structure:
{
  "overallScore": <number between 0 and 100>,
  "summaryMarkdown": "<string: Executive summary markdown highlighting visual clarity, accessibility, and AI slop pruning>",
  "findings": [
    {
      "id": "UX-01",
      "category": "HIERARCHY" | "CTA_CONVERSION" | "RESPONSIVE_LAYOUT" | "ACCESSIBILITY" | "CONTENT_DENSITY" | "DESIGN_SYSTEM" | "AI_SLOP_PRUNING",
      "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "POLISH",
      "title": "<string: Specific issue title>",
      "description": "<string: Detailed description referencing exact visual clutter or accessibility issues>",
      "affectedViewport": "desktop" | "mobile" | "tablet" | "laptop" | "ultrawide",
      "elementSelector": "<string: Exact Axe selector or clean semantic selector>",
      "recommendedFix": "<string: Concrete actionable fix to prune slop or fix layout>",
      "suggestedTailwindSnippet": "<string: Unified Git Diff with real file path, component imports, and token comments>"
    }
  ]
}`;
}

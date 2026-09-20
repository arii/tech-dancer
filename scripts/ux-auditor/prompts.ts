import type { ViewportScanResult } from './types';

export const BASE_UX_SYSTEM_PROMPT = `You are a Senior Principal UX Researcher, Product Designer, and Accessibility Specialist.
Your job is to audit rendered web pages and deliver precise, actionable, and prioritized UX improvements.

Core Principles:
1. Visual Hierarchy & Scanning: Analyze reading paths (F-pattern / Z-pattern), headline clarity, visual weight distribution, and whitespace rhythm.
2. Value Proposition & Conversion (CTAs): Identify the primary user goal and CTA. Evaluate whether secondary actions compete with or clarify the primary conversion funnel.
3. Mobile Ergonomics & Breakpoints: Evaluate touch target sizes (minimum 44x44px), thumb-zone reachability, and clean layout collapse without horizontal clipping.
4. Accessibility & Cognitive Load: Audit typography contrast (WCAG 2.2 AA >= 4.5:1), heading hierarchy (H1->H2->H3), and screen-reader accessibility.
5. Code Grounding: All design fixes MUST use exact Tailwind utility classes and repository design tokens (e.g. text-primary, bg-surface, rounded-md) without inline styles.`;

export function buildAnalyzeAndAskPrompt(scan: ViewportScanResult, route: string): string {
  const axeSummary = scan.axeViolations.length > 0
    ? scan.axeViolations.map(v => `- [${v.impact.toUpperCase()}] ${v.id}: ${v.description} (${v.nodes.length} occurrences)`).join('\n')
    : 'No automated WCAG violations detected by Axe-core.';

  return `ROUTE UNDER AUDIT: "${route}"
INITIAL VIEWPORT: ${scan.viewport} (${scan.width}x${scan.height}px)

METRICS:
- Scroll Dimensions: ${scan.metrics?.scrollWidth}px width x ${scan.metrics?.scrollHeight}px height
- Visible Interactive CTAs: ${scan.metrics?.visibleCTACount ?? 0}
- Small Touch Targets (<44px): ${scan.metrics?.smallTapTargetsCount ?? 0}

AUTOMATED ACCESSIBILITY AUDIT (Axe-core):
${axeSummary}

PRUNED DOM STRUCTURE:
\`\`\`html
${scan.prunedDom.slice(0, 15000)}
\`\`\`

TASK:
1. Analyze the attached full-page screenshot alongside the DOM and metrics.
2. Output a JSON object with EXACTLY the following structure:
{
  "visualHierarchySummary": "<string: Summary of the page visual hierarchy, reading path, and cognitive density>",
  "primaryConversionGoal": "<string: Identified primary user goal and CTA on this route>",
  "hypotheses": [
    {
      "question": "<string: Probing question or hypothesis regarding potential responsive breakdown or friction>",
      "context": "<string: Why this is flagged from the visual screenshot or DOM>",
      "suggestedAction": "<string: Recommended inspection or UX refinement>",
      "recommendedViewportsToInspect": ["mobile", "tablet", "laptop", "ultrawide"]
    }
  ]
}`;
}

export function buildSynthesisPrompt(ragContext: string, expandedScansSummary: string): string {
  return `=== TARGETED DESIGN SYSTEM & COMPLIANCE CONTEXT (RAG) ===
${ragContext}

=== MULTI-VIEWPORT EXPANDED EVIDENCE ===
${expandedScansSummary}

FINAL SYNTHESIS TASK:
Synthesize all visual evidence, multi-turn user clarifications, and RAG design guidelines into a final comprehensive UX audit.
Output a JSON object with EXACTLY the following structure:
{
  "overallScore": <number between 0 and 100>,
  "summaryMarkdown": "<string: Executive summary markdown>",
  "findings": [
    {
      "id": "UX-01",
      "category": "HIERARCHY" | "CTA_CONVERSION" | "RESPONSIVE_LAYOUT" | "ACCESSIBILITY" | "CONTENT_DENSITY" | "DESIGN_SYSTEM",
      "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "POLISH",
      "title": "<string: Brief issue title>",
      "description": "<string: Detailed description of the user experience issue>",
      "affectedViewport": "desktop" | "mobile" | "tablet" | "laptop" | "ultrawide",
      "elementSelector": "<string: CSS selector of the element>",
      "recommendedFix": "<string: Concrete actionable fix>",
      "suggestedTailwindSnippet": "<string: Tailwind code snippet using design tokens like bg-primary, text-surface, rounded-md>"
    }
  ]
}`;
}

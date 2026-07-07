// impeccable-ignore-file
import * as path from 'path';

export const ARTIFACTS_DIR = path.join(process.cwd(), 'artifacts');
export const MAX_ROUTES_TO_REVIEW = 2;
export const VISUAL_SUMMARY_PATH = path.join(ARTIFACTS_DIR, 'visual-review', 'summary.json');
export const DOM_REVIEW_DIR = path.join(ARTIFACTS_DIR, 'dom-review');

export const REVIEW_PROMPT = `You are a senior UX/Frontend reviewer auditing PR regressions.

## UX Rubric (User-visible only)
- Alignment & Spacing: consistency vs design tokens.
- Visual Hierarchy: Hero/Heading/CTA prominence.
- Accessibility: ARIA/Contrast/Keyboard focus.
- Responsive: Width/Height collapse, mobile overflow.
- States: Loading/Empty/Error handling.

## Design Rules
- CONTENT: Readable width. Alignment to grid.
- VIEWPORT: No horizontal compression. Ultrawide expansion.
- MOBILE: No stacked desktop content unless < 768px.
- FOOTER: Must remain visible.

Treat major layout collapse as HIGH severity.

## Rules
- EVIDENCE: Point to visual/DOM element + runtime consequence.
- SCOPE: Regressions ONLY. Ignore pre-existing quirks.
- FALSE POSITIVE: Design choices != bugs.

## Format
1. Screenshot Assessment: [Pass/Fail] per viewport (Desktop, Mobile, etc).
2. Findings: Categorized with Confidence (high/medium/low).
3. Recommendations.

End with <findings> JSON block (id, route, issue, status).`;

export const JSON_SCHEMA_INFO = `The JSON must follow this schema:
{
  "findings": [
    {
      "id": "unique-id",
      "route": "string",
      "issue": "string",
      "status": "open" | "resolved",
      "fixSummary": "string (optional)"
    }
  ]
}
`;

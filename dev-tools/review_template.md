# PR Review: #{pr_num}

## Context

- **Last Commit Tracked (SHA):** {head_sha}

## Audit Checklist

For EVERY changed file, verify against these standards. Mark as `- [x]` when verified.

- [ ] Dead abstractions: No new class, context, or hook that a simpler primitive handles.
- [ ] Unnecessary indirection: No layer of wrapping where a direct function call suffices.
- [ ] Responsibility creep: Component does not take on state/logic belonging in parent/hook.
- [ ] Import bloat: No unnecessary `import React from 'react'` (React 17+).
- [ ] Token compliance: Uses established design tokens (no raw Tailwind values or inline styles).
- [ ] Visual Quality: WCAG AA contrast, proper line lengths (65-75ch), and no banned patterns (gradient text, side-stripes, over-rounded cards).
- [ ] Layout Primitives: No raw Tailwind (flex, grid, px-4) in app layers; uses Stack, Grid, Box primitives.
- [ ] Mobile UX: No horizontal overflow on 390px; minimum 48x48px touch targets for interactive elements.
- [ ] Motion: Transitions respect prefers-reduced-motion; no animation of CSS layout dimensions (width, height).
- [ ] Audit ratio: If > 100 lines added, identified at least 10 lines to refactor/remove.

## CI Log Triage

(Populated if CI failures detected)
- **Failed Checks:**
{failed_checks}
- **Detected Errors:**
{detected_errors}
- **Root Cause Analysis:**
- **Remediation Steps:**

## Output JSON

Provide your findings and inline comments in the JSON block below.
DO NOT REMOVE THE BACKTICKS.

```json
{{
  "body": "## ANTI-AI-SLOP\\n<findings>\\n\\n## FINDINGS\\n<summary>\\n\\n## FINAL RECOMMENDATION\\n<Approved | Approved with Minor Changes | Not Approved>\\n\\n<!-- td-review-manager-comment -->",
  "comments": [
    {{
      "path": "<filename>",
      "line": 1,
      "body": "<feedback>"
    }}
  ]
}}
```

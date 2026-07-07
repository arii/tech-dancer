# Code Review Standards & Instructions

Read `pr-context-<PR_NUMBER>.md` and evaluate the code against these standards. Record findings in `pr-review-<PR_NUMBER>.md`.

## 1. Output Protocol

- **Target File**: Modify the existing `pr-review-{PR}.md`.
- **No New Files**: Do not create temporary or JSON files.
- **Checklist**: Mark every Audit Checklist item to indicate verification.
- **JSON Block**: Fill the JSON block at the bottom of the file with findings.

## 2. Audit Checklist

Mark items as `[x]` (passed) or `[ ]` (failed). Provide detailed feedback for failed items.

### Anti-AI-Slop
- **Dead abstractions**: No new classes/hooks where simpler primitives suffice.
- **Unnecessary indirection**: No wrapping where a direct function call suffices.
- **Responsibility creep**: Components should not manage logic belonging in parents/hooks.
- **Import bloat**: No `import React from 'react'` in React 17+.
- **Token compliance**: No raw Tailwind values or inline styles; use established design tokens.

## 3. Severity Standards

- **High/Blocking**: Concerns must feature concrete code contradictions (e.g., type mismatch, nonexistent call, wrong arity, failing test). Cite exact lines.
- **No Speculation**: If it uses "could" or "might", it is non-blocking. Downgrade to "Approved with Minor Changes".
- **Verification**: Do not raise concerns you cannot verify. State what is needed to verify rather than assuming the worst case.

## 4. CI Failure Handling

If the PR context indicates failing CI checks:
- **Block Approvals**: You MUST NOT recommend "Approved" if there are failing CI checks that are related to the PR changes.
- **Log Triage**: You must complete the "CI Log Triage" section in the review file. Use the "Detected Errors" and "Failure Logs Snippet" from the context file to perform a Root Cause Analysis and provide Remediation Steps.
- **Prioritize Fixes**: Mention the CI failures prominently in your review body and prioritize their resolution.

## 5. Review Status Mapping

### Review Status Mapping:
- **Approved**: Zero violations AND all critical CI checks passing.
- **Approved with Minor Changes**: Minor non-breaking violations (e.g., import bloat, trivial token leakage), or speculative concerns that lack concrete evidence of failure.
- **Not Approved**: Architectural regressions, evidenced breaking changes (see Section 3), major token violations, OR failing CI checks.

## 6. Formatting the Output (Markdown + JSON)

The review file uses a separated format to prevent JSON escaping issues. You must write standard Markdown at the top and a structured JSON block at the very bottom for metadata.

### The Metadata JSON Block:

```json
{
  "body": "## ANTI-AI-SLOP\n- [x] No dead abstractions\n- [x] No unnecessary indirection\n- [x] No responsibility creep\n- [x] No import bloat\n- [x] Token compliance verified\n\n## FINDINGS\n<summary of key findings and observations>\n\n## FINAL RECOMMENDATION\n<Approved | Approved with Minor Changes | Not Approved>",
  "recommendation": "Approved | Approved with Minor Changes | Not Approved",
  "labels": ["lgtm", "needs-changes"],
  "comments": [
    {
      "path": "src/example.tsx",
      "line": 42,
      "body": "This abstraction is unnecessary. Consider passing this as a direct prop."
    }
  ]
}
```

### Output Rules:

- **Standard Markdown Body**: Write your findings, checklist, and triage as standard Markdown at the top of the file.
- **Flattened Schema**: The JSON block must ONLY contain metadata (`recommendation`, `labels`, `comments`). Do NOT nest the review body inside JSON.
- **Always provide at least one comment** in the `comments` array. If no inline issues are found, add a summary comment with path `"SUMMARY"`.
- **Line Numbers**: Every inline comment MUST have a `line` number that exists within the **Valid Comment Ranges** for that file in the diff context.
- **JSON Validity**: Ensure the final submission block remains 100% valid JSON.

## 7. Infrastructure & Component Awareness

Before suggesting an implementation, verify if it already exists:

- **Layout primitives**: `src/layouts/` (Box, Stack, Grid, Text, Button)
- **UI components**: `src/components/ui/`
- **Custom hooks**: `src/hooks/` (useSearchParam, useGlobalSearch, useHotkeys)
- **Utilities**: `src/lib/utils.ts` (cn, safeSearch)
- **Design tokens**: `src/styles/design-tokens.ts` and `tokens.css`

**Do NOT request:**
- Building layout with `div` + flex when `<Stack>` or `<Box>` exists.
- Adding `import React` in React 17+ files.

## 8. Failure Modes (Avoid These)

- **hallucinating PR Numbers**: Always use the PR number provided in the prompt.
- **Out-of-range comments**: Comments on lines not in the diff cause 422 errors.
- **Empty payloads**: Never submit a review with empty findings or placeholders.

## 9. Tooling Guidelines

Agents must not directly use git or gh commands but reuse existing tooling (`td-cli`).

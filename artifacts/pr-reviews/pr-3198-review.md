# PR Review: #3198

## Context

- **Last Commit Tracked (SHA):** dc48aea11daf0558f1d9e6f779ddb525107b36c1

## Audit Checklist

For EVERY changed file, verify against these standards. Mark as `- [x]` when verified.

- [x] Dead abstractions: No new class, context, or hook that a simpler primitive handles.
- [x] Unnecessary indirection: No layer of wrapping where a direct function call suffices.
- [x] Responsibility creep: Component does not take on state/logic belonging in parent/hook.
- [x] Import bloat: No unnecessary `import React from 'react'` (React 17+).
- [x] Token compliance: Uses established design tokens (no raw Tailwind values or inline styles).
- [x] Audit ratio: If > 100 lines added, identified at least 10 lines to refactor/remove.

## CI Log Triage

- **Failed Checks:**
Lint & Type Check (boomtick-mcp)
- **Detected Errors:**
AssertionError: expected [Function] to throw error including 'Failed to create session: PR not found' but got 'td-cli command failed (gh view 999): ...' in `src/tools/jules/create-session.test.ts` and `src/tools/jules/get-pr.test.ts`.
- **Root Cause Analysis:**
The tests in `boomtick-mcp` are failing because the expected error messages and session formats do not match the updated CLI behavior or required formatting (e.g., missing `name: "sessions/<id>"` prefix for Jules sessions).
- **Remediation Steps:**
Update the mock assertions in the failing tests to expect the updated CLI error messages and ensure that mock session objects properly include the `name` field prefixed with `sessions/`.

## Output JSON

```json
{
  "body": "## ANTI-AI-SLOP\n<findings>\nNo slop abstractions detected. The change correctly adds standard jscpd configuration without introducing wrappers or hallucinations.\n\n## FINDINGS\n<summary>\nThis PR successfully introduces duplicate code detection via `jscpd` and updates CI configuration to run it. The `.jscpd.json` and workflow file changes look structurally correct. However, this PR introduces breaking test regressions in `boomtick-mcp` (`create-session.test.ts` and `get-pr.test.ts`) due to mismatched mock expectations surrounding `td-cli` error handling. These test regressions must be fixed to maintain an impeccable system build.\n\n## FINAL RECOMMENDATION\nNot Approved\n\n<!-- td-review-manager-comment -->",
  "comments": [
    {
      "path": "package.json",
      "line": 1,
      "body": "Please ensure you run `pnpm test` locally to verify that any changes to CLI interaction do not break downstream MCP tool mock tests."
    }
  ]
}
```

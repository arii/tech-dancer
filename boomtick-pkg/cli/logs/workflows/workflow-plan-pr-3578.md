# Workflow Plan: PR #3578

## Agent Instructions

- **Environment Check**: Ensure Python dependencies and pnpm 10.28.2 are available.
- setup complete
- validation complete
- context collected (via `td agent plan-review --pr 3578`)
- diagnostics collected

**IMPORTANT: Context collection and audit are COMPLETE. Do NOT run --fetch or --audit again.**
Agent must not repeat these steps. Redundant fetching (`--fetch`) or auditing (`--audit`) is already handled.

---

## Workflow State

[x] Environment Validation
[x] Issue Validation
[x] Conflict Detection
[x] Context Collection & Audit
[x] Impact Analysis
[ ] Review Analysis
[ ] Review Authoring
[ ] Completion Verification

---

## Collected Context

### Validation Output
```text
Runtime OK: node 24.18.0, pnpm 10.28.2
```

### Issue Validation Output
```text
No issue number provided.
```

### Conflict Output
```text
[
  {
    "prs": [
      3578,
      3600,
      3604
    ],
    "files": [
      "boomtick-pkg/cli/dev_tools/config.py",
      "boomtick-pkg/scripts/impact-visual-diff.ts",
      "boomtick-pkg/cli/dev_tools/utils/__init__.py"
    ]
  },
  {
    "prs": [
      3578,
      3589,
      3598,
      3600,
      3604
    ],
    "files": [
      "playwright.config.ts"
    ]
  }
]
```

### PR Summary
Relevant excerpts from:
`/app/.boomtick/logs/reviews/pr-context-3578.md`

```text
# PR Context: #3578 — Systemic CI Metrics Definition: Establish clear measurable targets
**Author:** @google-labs-jules[bot]

## Description
This PR establishes measurable targets for CI pipeline performance, cost (AI tokens), and visual regression stability.

Key changes:
1. **Configuration**: Added default thresholds to `ProjectConfig` in `boomtick-pkg/cli/dev_tools/config.py`:
   - `ai_token_input_limit`: 800,000
   - `ai_token_output_limit`: 200,000
   - `ai_token_total_limit`: 1,000,000
   - `max_ci_duration_minutes`: 15
   - `visual_snapshot_pixel_threshold`: 0.1
2. **Verification Logic**: Updated `verify_ci_metrics` in `boomtick-pkg/cli/dev_tools/utils.py` to:
   - Pull limits from `ProjectConfig` or environment variables.
   - Calculate cumulative CI pipeline duration using the GitHub API and `GITHUB_RUN_ID`.
   - Assert that all metrics are within defined limits.
3. **Visual Stability**:
   - Updated `playwright.config.ts` to use `VISUAL_SNAPSHOT_THRESHOLD` env var.
   - Updated `boomtick-pkg/scripts/impact-visual-diff.ts` to use the same threshold.
   - Updated `Orchestrator` to inject this threshold from configuration during test execution.
4. **Documentation**: Added a "Systemic CI Metrics" section to `docs/github-workflows.md`, explicitly linking these targets to the 19 open issues as their acceptance criteria.

The implementation has been verified with unit tests and mocks for the duration/token enforcement logic.

Fixes #3014

---
*PR created automatically by Jules for task [532604527971653279](https://jules.google.com/task/532604527971653279) started by @arii*
```

### CI Status
Relevant excerpts:
```text
See /app/.boomtick/logs/reviews/pr-context-3578.md
```

### Failure Logs
Relevant excerpts:
```text
See /app/.boomtick/logs/reviews/pr-context-3578.md
```

### Impact Analysis
Relevant excerpts:
```text
💓 Heartbeat: Starting Deployment Impact Analysis
🚀 Running Deployment Impact Analysis...

Found 5 changed files.
💓 Heartbeat: Generating dependency graph
📊 Generating dependency graph...
💓 Heartbeat: Resolving affected URLs

========================================
DEPLOYMENT IMPACT ANALYSIS
========================================

IMPACT LEVEL: LOW

CHANGED FILES:
  - get_diff.py
  - pr_diff_3589.patch
  - pr_diff_3595.patch
  - pr_diff_3596.patch
  - review-status.md

VISUAL REVIEW REQUIRED:
  None detected (code-only changes)

========================================

✅ Reports generated in /app/artifacts/impact-analysis
💓 Heartbeat: Impact Analysis Complete
npm warn Unknown project config "node-linker". This will stop working in the next major version of npm. See `npm help npmrc` for supported config options.

```

### Existing AI Reviews
**Gemini:**
```markdown
None.
```

**GitHub Models:**
```markdown
None.
```

---

## Allowed Files

Agent may read:
`.agents/workflows/REVIEW_INSTRUCTIONS.md`
`boomtick-pkg/cli/logs/reviews/pr-review-3578.md`

---

## Writable Files

Agent may modify:
`boomtick-pkg/cli/logs/reviews/pr-review-3578.md`

---

## Merge & Conflict Guidance

If tasks require merging branches (e.g., during PR consolidation or rebase):
- **Unrelated Histories**: If git fails with `fatal: refusing to merge unrelated histories`, use `git merge <branch> --allow-unrelated-histories`.
- **Heavy Conflicts**: If standard merging is too complex, generate a patch using `git diff base...head` and apply it manually.

---

## Remaining Tasks

### Step 1
Review supplied evidence.

### Step 2
Populate review file.

### Step 3
Verify:
- JSON valid
- checklist complete
- comments reference valid diff lines

---

## Completion Criteria

All checklist items resolved.
No placeholders remain.
No guessed line numbers.
No invented findings.
Every finding must reference supplied evidence.

---

## Final Output

Output exactly:

```bash
td gh audit-pr 3578 --submit --execute
```

Only after successful completion.

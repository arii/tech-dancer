# Workflow Plan: PR #3595

## Agent Instructions

- **Environment Check**: Ensure Python dependencies and pnpm 10.28.2 are available.
- setup complete
- validation complete
- context collected (via `td agent plan-review --pr 3595`)
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
      3595,
      3602
    ],
    "files": [
      "package.json"
    ]
  }
]
```

### PR Summary
Relevant excerpts from:
`/app/.boomtick/logs/reviews/pr-context-3595.md`

```text
# PR Context: #3595 — Document and standardize boomtick-pkg release process
**Author:** @google-labs-jules[bot]

## Description
This PR establishes the official release process for `boomtick-pkg`.

### Key Changes
1. **New Documentation**: Added `docs/release-process.md` which outlines the step-by-step process for releasing new versions, including version bumping, verification, building assets (Wheels, tarballs, zips), and creating GitHub releases.
2. **Version Alignment**: Updated the root `package.json` version from `0.1.0` to `0.2.0` to align with the existing components in `boomtick-pkg/cli` and `boomtick-pkg/mcp`.
3. **Verification**: Confirmed that all verification scripts (`verify:schemas`, `doctor`, `check:runtime-files`) and CLI unit tests pass with the new documentation and aligned versions.

This ensures a consistent and documented baseline for future releases of the developer toolkit.

Fixes #3577

---
*PR created automatically by Jules for task [8827288089628834790](https://jules.google.com/task/8827288089628834790) started by @arii*
```

### CI Status
Relevant excerpts:
```text
See /app/.boomtick/logs/reviews/pr-context-3595.md
```

### Failure Logs
Relevant excerpts:
```text
See /app/.boomtick/logs/reviews/pr-context-3595.md
```

### Impact Analysis
Relevant excerpts:
```text
💓 Heartbeat: Starting Deployment Impact Analysis
🚀 Running Deployment Impact Analysis...

Found 3 changed files.
💓 Heartbeat: Generating dependency graph
📊 Generating dependency graph...
💓 Heartbeat: Resolving affected URLs

========================================
DEPLOYMENT IMPACT ANALYSIS
========================================

IMPACT LEVEL: LOW

CHANGED FILES:
  - get_diff.py
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
`boomtick-pkg/cli/logs/reviews/pr-review-3595.md`

---

## Writable Files

Agent may modify:
`boomtick-pkg/cli/logs/reviews/pr-review-3595.md`

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
td gh audit-pr 3595 --submit --execute
```

Only after successful completion.

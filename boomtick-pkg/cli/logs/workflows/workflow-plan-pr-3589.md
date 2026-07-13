# Workflow Plan: PR #3589

## Agent Instructions

- **Environment Check**: Ensure Python dependencies and pnpm 10.28.2 are available.
- setup complete
- validation complete
- context collected (via `td agent plan-review --pr 3589`)
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
      3589,
      3598,
      3600,
      3604
    ],
    "files": [
      "playwright.config.ts"
    ]
  },
  {
    "prs": [
      3589,
      3603
    ],
    "files": [
      "tests/visual.spec.ts-snapshots/mobile-ux-auditor.png",
      "tests/visual.spec.ts-snapshots/mobile-research-blog-drafter.png",
      "tests/visual.spec.ts-snapshots/mobile-research-wcs-scraper.png"
    ]
  },
  {
    "prs": [
      3589,
      3598,
      3601
    ],
    "files": [
      ".npmrc"
    ]
  },
  {
    "prs": [
      3589,
      3598
    ],
    "files": [
      "tests/visual.spec.ts",
      "tests/research-mobile.spec.ts-snapshots/research-wcs-scraper-mobile-chromium-linux.png",
      "tests/research-mobile.spec.ts",
      "tests/affiliate-mobile.spec.ts",
      "tests/homepage.spec.ts",
      "tests/fixtures/visual.ts",
      "tests/blog-post-mobile.spec.ts",
      "tests/guide.spec.ts",
      "tests/blog-post.spec.ts"
    ]
  }
]
```

### PR Summary
Relevant excerpts from:
`/app/.boomtick/logs/reviews/pr-context-3589.md`

```text
# PR Context: #3589 — Stabilize Mobile Visual Snapshots
**Author:** @google-labs-jules[bot]

## Description
This PR stabilizes mobile visual snapshots by addressing environment inconsistencies and standardizing test implementations. Key changes include aligning font packages in the Docker environment, separating mobile and desktop test projects in Playwright configuration, and ensuring all visual tests use a shared fixture that controls animations and system time.

Fixes #2900

---
*PR created automatically by Jules for task [1033799084429464018](https://jules.google.com/task/1033799084429464018) started by @arii*
```

### CI Status
Relevant excerpts:
```text
See /app/.boomtick/logs/reviews/pr-context-3589.md
```

### Failure Logs
Relevant excerpts:
```text
See /app/.boomtick/logs/reviews/pr-context-3589.md
```

### Impact Analysis
Relevant excerpts:
```text
💓 Heartbeat: Starting Deployment Impact Analysis
🚀 Running Deployment Impact Analysis...

Found 4 changed files.
💓 Heartbeat: Generating dependency graph
📊 Generating dependency graph...
💓 Heartbeat: Resolving affected URLs

========================================
DEPLOYMENT IMPACT ANALYSIS
========================================

IMPACT LEVEL: LOW

CHANGED FILES:
  - get_diff.py
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
`boomtick-pkg/cli/logs/reviews/pr-review-3589.md`

---

## Writable Files

Agent may modify:
`boomtick-pkg/cli/logs/reviews/pr-review-3589.md`

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
td gh audit-pr 3589 --submit --execute
```

Only after successful completion.

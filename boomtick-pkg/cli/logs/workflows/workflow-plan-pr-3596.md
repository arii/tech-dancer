# Workflow Plan: PR #3596

## Agent Instructions

- **Environment Check**: Ensure Python dependencies and pnpm 10.28.2 are available.
- setup complete
- validation complete
- context collected (via `td agent plan-review --pr 3596`)
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
      3596,
      3599,
      3603
    ],
    "files": [
      "boomtick-pkg/mcp/src/mcp/definitions.ts"
    ]
  }
]
```

### PR Summary
Relevant excerpts from:
`/app/.boomtick/logs/reviews/pr-context-3596.md`

```text
# PR Context: #3596 — Establish release process for boomtick-pkg with integrated TypeScript MCP server
**Author:** @google-labs-jules[bot]

## Description
Established the release process for `boomtick-pkg` by integrating the TypeScript MCP server into the Python distribution. This involved updating the build system, adding Python-side integration for the MCP server, and creating a GitHub Actions release workflow that handles the multi-language build dependency chain. Also fixed TypeScript compilation errors in the MCP server related to schema synchronization.

Fixes #3594

---
*PR created automatically by Jules for task [1676237118743388817](https://jules.google.com/task/1676237118743388817) started by @arii*
```

### CI Status
Relevant excerpts:
```text
See /app/.boomtick/logs/reviews/pr-context-3596.md
```

### Failure Logs
Relevant excerpts:
```text
See /app/.boomtick/logs/reviews/pr-context-3596.md
```

### Impact Analysis
Relevant excerpts:
```text
💓 Heartbeat: Starting Deployment Impact Analysis
🚀 Running Deployment Impact Analysis...
✅ No changes detected. Generating empty report.

✅ Reports generated in /app/artifacts/impact-analysis
npm warn Unknown project config "node-linker". This will stop working in the next major version of npm. See `npm help npmrc` for supported config options.
npm notice
npm notice New minor version of npm available! 11.16.0 -> 11.18.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.18.0
npm notice To update run: npm install -g npm@11.18.0
npm notice

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
`boomtick-pkg/cli/logs/reviews/pr-review-3596.md`

---

## Writable Files

Agent may modify:
`boomtick-pkg/cli/logs/reviews/pr-review-3596.md`

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
td gh audit-pr 3596 --submit --execute
```

Only after successful completion.

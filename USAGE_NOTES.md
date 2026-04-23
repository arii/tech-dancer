# PR Review Tooling: USAGE_NOTES

## Overview
The PR review system uses a **Read/Write Decoupled Architecture**.
- **Read Context**: `dev-tools/logs/reviews/pr-context-{PR}.md` (Diffs, stats, and valid line ranges).
- **Write Review**: `dev-tools/logs/reviews/pr-review-{PR}.md` (Checklist and JSON output block).

## Core Commands (Automated Orchestrator)

### 1. Single PR Audit
The recommended way to review a single PR:

```bash
# ONE COMMAND: Fetch + AI-Audit + Submit + Cleanup (Failure-Proof)
./dev-tools/auto-review-pr.sh <PR_NUMBER> --cleanup
```

### 2. Bulk PR Audit (Mass Review)
To audit multiple PRs sequentially with a single command:

```bash
# Orchestrate fleet-wide audits
./dev-tools/auto-mass-audit-pr.sh <PR_NUM1> <PR_NUM2> <PR_NUM3> ...
```

## Advanced Flags
- `--dry-run`: Performs a full audit and draft submission but does NOT hit the GitHub API.
- `--submit-only`: Skips Fetch/Audit and attempts to submit an existing review file.
- `--cleanup`: Deletes logs and context files after a SUCCESSFUL submission.

## Failure Prevention
- **Valid Line Ranges**: The system provides explicit ranges to prevent GitHub API 422 errors.
- **AI Instructions**: Permanent audit rules are stored in `dev-tools/REVIEW_INSTRUCTIONS.md`.

## Verification Log
| Date | PR # | Outcome | Notes |
|------|------|---------|-------|
| 2026-04-22 | 195 | SUCCESS | Hardened line validation test |
| 2026-04-22 | 223 | SUCCESS | Self-audit (tooling refactor test) |
| 2026-04-22 | 188 | SUCCESS | AI protocol compliance test (Direct edit) |
| 2026-04-22 | 154 | SUCCESS | Architectural regression detection test |

# PR Review Tooling: USAGE_NOTES

## Overview
The PR review system uses a **Read/Write Decoupled Architecture**.
- **Read Context**: `dev-tools/logs/reviews/pr-context-{PR}.md` (Diffs, stats, last commit time).
- **Write Review**: `dev-tools/logs/reviews/pr-review-{PR}.md` (Checklist and JSON output block).

## Core Commands (Automated Orchestrator)

The recommended way to review a single PR is via the **End-to-End Orchestrator**:

```bash
# ONE COMMAND: Fetch + AI-Audit + Submit + Cleanup
./dev-tools/auto-review-pr.sh <PR_NUMBER> --auto --cleanup
```

### Manual Stages (Granular Control)
If you need to manually intervene in the review:

```bash
# Stage 1: Fetch PR data and generate templates
./dev-tools/auto-review-pr.sh <PR_NUMBER> --fetch

# Stage 2: AI-Automated Audit (Optional)
./dev-tools/auto-review-pr.sh <PR_NUMBER> --audit

# Stage 3: Submit finalized review
./dev-tools/auto-review-pr.sh <PR_NUMBER> --submit [--cleanup]
```

## Advanced Commands

### 1. Batch Fetch Context
Use the bulk auditor to fetch multiple PR contexts at once for manual review.
```bash
./dev-tools/audit_bulk.sh 222 219 227
```

### 2. Manual Submission
```bash
python3 dev-tools/submit_pr_review_data.py dev-tools/logs/reviews/pr-review-<PR>.md [--event=COMMENT|APPROVE|REQUEST_CHANGES]
```

## Known Issues & Troubleshooting

### 1. "Already have a pending review" (Exit Code 1)
GitHub only allows one "PENDING" review per PR/user. If `submit_pr_review_data.py` fails with this error, manual cleanup is required:
```bash
# Force submit the existing pending review as a COMMENT
python3 dev-tools/gh_collab.py submit <PR_NUMBER> COMMENT
```
After clearing, retry the orchestrator `--submit` command.

### 2. Manual Event Override
If Stage 3 fails due to self-approval restrictions (API 422), use the `--event` flag:
```bash
./dev-tools/auto-review-pr.sh <PR_NUMBER> --submit --event=COMMENT
```

### 3. Automated Fallback
If line numbers are outside the patch, the submission script automatically retries as a body-only comment to avoid feedback loss.

## Verification Log
| Date | PR # | Outcome | Notes |
|------|------|---------|-------|
| 2026-04-22 | 227 | Pending | First verification run |

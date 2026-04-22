# PR Review Tooling: USAGE_NOTES

## Overview
The PR review system uses a **Read/Write Decoupled Architecture**.
- **Read Context**: `dev-tools/logs/reviews/pr-context-{PR}.md` (Diffs, stats, and valid line ranges).
- **Write Review**: `dev-tools/logs/reviews/pr-review-{PR}.md` (Checklist and JSON output block).

## Core Commands (Automated Orchestrator)

The recommended way to review a single PR is via the **End-to-End Orchestrator**:

```bash
# ONE COMMAND: Fetch + AI-Audit + Submit + Cleanup (Failure-Proof)
./dev-tools/auto-review-pr.sh <PR_NUMBER> --cleanup
```

### Granular Flags
The orchestrator now supports advanced flags for deep control:
- `--dry-run`: Performs a full audit and draft submission but does NOT hit the GitHub API.
- `--submit-only`: Skips Fetch/Audit and attempts to submit an existing review file. Use this for re-submission after manual edits.
- `--cleanup`: Deletes logs and context files after a SUCCESSFUL submission.

## Failure Prevention
- **Valid Line Ranges**: The system now provides explicit ranges to prevent GitHub API 422 errors.
- **AI Instructions**: Permanent audit rules are stored in `dev-tools/REVIEW_INSTRUCTIONS.md`.

## Troubleshooting
If you hit a PR state error, ensure you are using the latest scripts in `dev-tools/`. 
Submission errors are now printed to the console (stdout/stderr) for easier debugging.

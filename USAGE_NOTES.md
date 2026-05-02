# PR Review Tooling: USAGE_NOTES

## Overview
<<<<<<< HEAD
The PR review system is centralized in the unified BoomTick.blog CLI.
=======
The PR review system is centralized in the unified boomtick-blog CLI.
>>>>>>> pr-626
- **CLI Entry Point**: `dev-tools/td_cli.py`
- **Read Context**: `dev-tools/logs/reviews/pr-context-{PR}.md` (Diffs, stats, and valid line ranges).
- **Write Review**: `dev-tools/logs/reviews/pr-review-{PR}.md` (Checklist and JSON output block).

## Core Commands

### 1. Single PR Audit
The recommended way to review a single PR:

```bash
# Step 1: Fetch metadata and generate context
python3 dev-tools/td_cli.py audit-pr <PR_NUMBER> --fetch

# Step 2: Run automated audit and (optionally) AI review
python3 dev-tools/td_cli.py audit-pr <PR_NUMBER> --audit

# Step 3: Submit the review to GitHub and clean up logs
python3 dev-tools/td_cli.py audit-pr <PR_NUMBER> --submit --cleanup --execute
```

### 2. Pre-Submission Quality Gate
Before pushing code or opening a PR, run the full suite of local checks:

```bash
python3 dev-tools/td_cli.py pre-submit
```
This includes:
- UI Anti-pattern audit
- TypeScript type-checking
- ESLint linting
- PR Scope validation
- Conflict detection (requires `GITHUB_TOKEN`)

## CI Gate Baselines

Technical debt is tracked using **GitHub Actions Variables** instead of local files. This prevents "lockfile-style" churn on small metric changes.

### Tracked Metrics
- `BUNDLE_BASELINE_KB`: The maximum allowed size of the production JS bundle (in KB).
- `ANY_COUNT_BASELINE`: The maximum allowed number of TypeScript `any` usages.

### How to Update
When a PR intentionally and legitimately increases one of these metrics, an admin must update the baseline in GitHub after the PR is merged:

```bash
# Update bundle size baseline to 1200KB
gh variable set BUNDLE_BASELINE_KB --body 1200

# Update 'any' count baseline to 50
gh variable set ANY_COUNT_BASELINE --body 50
```

## Failure Prevention
- **Valid Line Ranges**: The system provides explicit ranges in the context file to prevent GitHub API 422 errors.
- **Dry Run Default**: Most mutating CLI commands require `--execute` to actually perform actions on GitHub.

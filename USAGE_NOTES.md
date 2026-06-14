# PR Review Tooling: USAGE_NOTES

## Overview

The PR review system is centralized in the unified Tech-Dancer CLI.

- **CLI Entry Point**: `dev-tools/td_cli.py`
- **Read Context**: `dev-tools/logs/reviews/pr-context-{PR}.md` (Diffs, stats, and valid line ranges).
- **Write Review**: `dev-tools/logs/reviews/pr-review-{PR}.md` (Checklist and JSON output block).

## Core Commands

### Environment Setup

Use the consolidated setup script to prepare and verify the environment:

```bash
./setup-agent.sh
```

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

### 2. Local AI Code Reviewer (Ollama) (Optional Utility)

The CLI includes a local, piecemeal AI reviewer that chunk-reviews PR files using Ollama (no Gemini/Copilot fallback by default):

#### Setup
1. Ensure [Ollama](https://ollama.com/) is installed and running.
2. Build the dedicated reviewer model:
   ```bash
   ollama create code-reviewer -f dev-tools/CodeReviewer.mf
   ```

#### Execution
```bash
# Run review sequentially on changed files
PYTHONPATH=dev-tools python3 dev-tools/td_cli.py ai review <PR_NUMBER>

# Bust cache and force fresh review
PYTHONPATH=dev-tools python3 dev-tools/td_cli.py ai review <PR_NUMBER> --no-cache
```

#### Low-Compute / CPU-only Machines
If running on a low-spec CPU machine (e.g., <= 8GB RAM, CPU inference only), the default `qwen2.5-coder:7b` model may cause out-of-memory errors or extreme slowness. 

You can automate pulling the lightweight base model, rebuilding the custom reviewer model using a temporary Modelfile, and running the review with resource overrides using the helper script:

```bash
# Setup environment and run the low-compute review
./dev-tools/low-compute-review.sh <PR_NUMBER>

# Additional options can be passed directly
./dev-tools/low-compute-review.sh <PR_NUMBER> --no-cache
```

Alternatively, to do this manually:
1. Update `dev-tools/project_config.json` to use a lighter model:
   ```json
   "ollama_model": "qwen2.5-coder:1.5b",
   "ollama_synthesis_model": "qwen2.5-coder:1.5b"
   ```
2. Modify the first line of `dev-tools/CodeReviewer.mf` to target the lighter base:
   ```dockerfile
   FROM qwen2.5-coder:1.5b
   ```
3. Re-create the model: `ollama create code-reviewer -f dev-tools/CodeReviewer.mf`.

### 3. Pre-Submission Quality Gate

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
# Update bundle size baseline to 3100KB
gh variable set BUNDLE_BASELINE_KB --body 3080

# Update 'any' count baseline to 50
gh variable set ANY_COUNT_BASELINE --body 50
```

## Failure Prevention

- **Valid Line Ranges**: The system provides explicit ranges in the context file to prevent GitHub API 422 errors.
- **Dry Run Default**: Most mutating CLI commands require `--execute` to actually perform actions on GitHub.

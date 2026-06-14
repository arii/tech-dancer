# Dev Tools & Workflows

This directory contains repository automation scripts and quality gate configurations.

> [!IMPORTANT]
> The Repository CLI requires the `PyGithub` Python library. Install it with: `pip install PyGithub`.
> It also requires the `gh` CLI to be authenticated for many operations.

## 🚀 Repository CLI (`td_cli.py`)

The unified entry point for all repository automation. It supports both human-readable terminal output and structured JSON for tool integration.

### Usage and Context
- **CLI Entry Point**: `dev-tools/td_cli.py`
- **Read Context**: `dev-tools/logs/reviews/pr-context-{PR}.md` (Diffs, stats, and valid line ranges).
- **Write Review**: `dev-tools/logs/reviews/pr-review-{PR}.md` (Checklist and JSON output block).

### Core Commands

#### 1. Single PR Audit
The recommended way to review a single PR:
```bash
# Step 1: Fetch metadata and generate context
python3 dev-tools/td_cli.py audit-pr <PR_NUMBER> --fetch

# Step 2: Run automated audit and (optionally) AI review
python3 dev-tools/td_cli.py audit-pr <PR_NUMBER> --audit

# Step 3: Submit the review to GitHub and clean up logs
python3 dev-tools/td_cli.py audit-pr <PR_NUMBER> --submit --cleanup --execute
```

#### 2. Local AI Code Reviewer (Ollama)
The CLI includes a local AI reviewer that reviews PR files using Ollama. For setup and detailed usage, see [docs/agent/ollama-reviewer.md](../docs/agent/ollama-reviewer.md).

#### 3. Pre-Submission Quality Gate
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

### Global Options
- `--json`: Output results in structured JSON format.

### Commands Details

#### `gh pre-submit`
Runs the full local quality suite.
- **Usage**: `python3 dev-tools/td_cli.py gh pre-submit`

#### `gh audit-pr <PR_NUMBER>`
Orchestrates the PR technical audit lifecycle.
- **Flags**:
  - `--fetch`: Fetch PR metadata and generate context files.
  - `--audit`: Run deterministic checks and invoke AI auditor.
  - `--submit`: Submit the completed review to GitHub (requires `--execute`).
  - `--cleanup`: Remove temporary review files on success.
- **Usage**: `python3 dev-tools/td_cli.py gh audit-pr 368 --fetch --audit`

#### `gh validate-issue <ISSUE_NUMBER>`
Validates GitHub Issues against repo standards.
- **Flags**:
  - `--all-open`: Check all open issues.
  - `--post-comments`: Post findings as comments to the issue (requires `--execute`).
- **Usage**: `python3 dev-tools/td_cli.py gh validate-issue --issue-number 247`

#### `gh conflicts`
Detects potential merge conflicts across all open PRs.
- **Flags**:
  - `--pr <PR_NUMBER>`: Check a specific PR against all other open PRs.
- **Usage**: `python3 dev-tools/td_cli.py gh conflicts`

#### `gh overlaps`
Identify and propose consolidation of PRs with high functional or structural overlap.
- **Usage**: `python3 dev-tools/td_cli.py gh overlaps --limit 20`

#### `jules repair-context`
Generates a high-precision prompt for fixing a specific CI error.
- **Usage**: `python3 dev-tools/td_cli.py jules repair-context --file logs/ci_failure.log`

#### `gh ratchet-any` / `gh bundle-size`
CI gates for tracking technical debt.

#### `ux` command group
Dedicated commands for performing UX/UI audits.

---

## 🧰 One-Step Agent Environment Bootstrap

Use `dev-tools/setup-agent.sh` to fully bootstrap a fresh agent environment.
```bash
./dev-tools/setup-agent.sh
```

### Required / Recommended Environment Variables & Secrets
| Variable | Purpose |
|---|---|
| `CODEX_GH_TOKEN` | Primary secret for agent runs. |
| `GH_TOKEN` | Auth for `gh` and `td_cli.py gh ...` commands. |

### Environment Setup Prerequisites
The project requires **Node >=22.0.0** (as specified in `.nvmrc` and `package.json` engines).

---

## 📊 CI Gate Baselines

Technical debt is tracked using **GitHub Actions Variables** instead of local files.

### Tracked Metrics
- `BUNDLE_BASELINE_KB`: Max allowed size of the production JS bundle (in KB).
- `ANY_COUNT_BASELINE`: Max allowed number of TypeScript `any` usages.

### How to Update
When a PR intentionally increases one of these metrics, an admin must update the baseline in GitHub after merge:
```bash
gh variable set BUNDLE_BASELINE_KB --body 3080
gh variable set ANY_COUNT_BASELINE --body 50
```

---

## 🧱 Design System and Quality Gates
- **UI Anti-Patterns**: Centralized in `scripts/detect-antipatterns.mjs`.
- **Design System Enforcement**: All code must adhere to `AGENTS.md`. Layout primitives in `src/layouts/` must be used.
- **Failure Prevention**: The system provides explicit ranges in context files to prevent GitHub API 422 errors.
- **Dry Run Default**: Most mutating CLI commands require `--execute`.

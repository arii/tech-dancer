# Dev Tools & Workflows

This directory contains repository automation scripts and quality gate configurations.

> [!IMPORTANT]
> The Repository CLI requires the `PyGithub` Python library. Install it with: `pip install PyGithub`.
> It also requires the `gh` CLI to be authenticated for many operations.

## 🚀 Repository CLI (`td_cli.py`)

The unified entry point for all repository automation. It supports both human-readable terminal output and structured JSON for tool integration.

### Global Options
- `--json`: Output results in structured JSON format.

### Standard Error Format (with `--json`)
```json
{
  "status": "error",
  "message": "Description of the error",
  "code": 401,
  "data": null
}
```

### Commands

#### `pre-submit`
Runs the full local quality suite: Anti-pattern audit, TypeScript check, Lint, PR Scope check, and Conflict check.
- **Usage**: `python3 dev-tools/td_cli.py pre-submit`

#### `audit-pr <PR_NUMBER>`
Orchestrates the PR technical audit lifecycle.
- **Flags**:
  - `--fetch`: Fetch PR metadata and generate context files.
  - `--audit`: Run deterministic checks and invoke AI auditor.
  - `--submit`: Submit the completed review to GitHub (requires `--execute`).
  - `--cleanup`: Remove temporary review files on success.
- **Usage**: `python3 dev-tools/td_cli.py audit-pr 368 --fetch --audit`

#### `validate-issue <ISSUE_NUMBER>`
Validates GitHub Issues against repo standards.
- **Flags**:
  - `--all-open`: Check all open issues.
  - `--post-comments`: Post findings as comments to the issue (requires `--execute`).
- **Usage**: `python3 dev-tools/td_cli.py validate-issue --issue-number 247`

#### `conflicts`
Performs guarded local conflict prep (squash + merge + snapshot refresh) with preview-first safety checks.
- **Flags**:
  - `--base <BRANCH>`: Base branch to merge from (default: `main`).
  - `--dry-run` (default): Preview preflight and planned git commands in JSON/human format.
  - `--execute`: Run mutations after preflight checks pass.
  - `--force`: Allow execution even when the working tree is dirty.
- **Usage (safe preview-first flow)**:
  - `python3 dev-tools/td_cli.py conflicts --dry-run --json`
  - `python3 dev-tools/td_cli.py conflicts --execute --json`
  - `python3 dev-tools/td_cli.py conflicts --execute --force --json`

#### `repair-context`
Generates a high-precision prompt for fixing a specific CI error. It maps the error signature to a strategy and provides deterministic code context (±15 lines).
- **Flags**:
  - `--log <LOG_LINE>`: Process a single raw log line.
  - `--file <FILE_PATH>`: Process all errors in a log file.
- **Usage**:
  - `pnpm repair-context --log "/app/src/App.tsx:10:5: 'unused' is defined but never used. [no-unused-vars]"`
  - `python3 dev-tools/td_cli.py repair-context --file logs/ci_failure.log`

#### `repair`
Runs the autonomous local repair workflow and now performs a preflight Ollama health check before attempting AI fixes.
- **Health checks**:
  - Verifies Ollama service is reachable via `/api/tags`.
  - Verifies `OLLAMA_MODEL` exists in the returned model list.
- **Structured diagnostics**:
  - `service_down`: Ollama is unreachable.
  - `model_missing`: configured model not present; remediation includes an exact command, e.g. `ollama pull qwen2.5-coder:1.5b`.
  - `generation_failed`: generation request failed (includes HTTP response body excerpt when available).
- **Deterministic fallback mode**:
  - If Ollama is unavailable, `repair` does **not** fail fast; it emits rule-based recommendations from lint/type-check signatures so engineers still get actionable next steps.
- **Usage**: `python3 dev-tools/td_cli.py repair [--logs <FILE> | --stdin] [--worktree]`

#### `ratchet-any` / `bundle-size`
CI gates for tracking technical debt. These commands compare current metrics against baselines stored in GitHub Actions Variables (`ANY_COUNT_BASELINE`, `BUNDLE_BASELINE_KB`).
- **Usage**: `python3 dev-tools/td_cli.py bundle-size`

---

## 🧪 Quality Gates

- **UI Anti-Patterns**: Centralized in `scripts/detect-antipatterns.mjs` (includes inverse-surface contrast checks for `Text` near `industrial-gradient` treatments).
- **Type Safety**: TypeScript `any` usage ratchet (enforced in CI).
- **Bundle Size**: Automated size regression tracking (enforced in CI).

## 🧱 Design System Enforcement

All code must adhere to the rules in `AGENTS.md`. Layout primitives in `src/layouts/` must be used for all UI composition.

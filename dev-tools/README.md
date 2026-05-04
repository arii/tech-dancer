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
Detects potential merge conflicts across all open PRs.
- **Flags**:
  - `--pr <PR_NUMBER>`: Check a specific PR against all other open PRs.
- **Usage**: `python3 dev-tools/td_cli.py conflicts`

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

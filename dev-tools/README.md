# Dev Tools & Workflows

This directory contains repository automation scripts and quality gate configurations.

> [!IMPORTANT]
> The Repository CLI requires the `PyGithub` Python library. Install it with: `pip install PyGithub`.
> It also requires the `gh` CLI to be authenticated.

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
Runs the full local quality suite: Anti-pattern audit, TypeScript check, Lint, React 17+ import check, Router check, and Conflict check.
- **Usage**: `python3 dev-tools/td_cli.py pre-submit`
- **Output (Success)**:
  ```json
  {
    "status": "success",
    "results": {
      "steps": [{"name": "TypeScript", "status": "success"}, ...],
      "react_imports": [],
      "conflicts": []
    }
  }
  ```

#### `audit-pr <PR_NUMBER>`
Orchestrates the PR technical audit lifecycle.
- **Flags**:
  - `--fetch`: Fetch PR metadata and generate context files.
  - `--audit`: Run deterministic checks and invoke AI auditor.
  - `--submit`: Submit the completed review to GitHub.
  - `--cleanup`: Remove temporary review files on success.
- **Usage**: `python3 dev-tools/td_cli.py audit-pr 368 --fetch --audit`

#### `validate-issue <ISSUE_NUMBER>`
Validates GitHub Issues against repo standards.
- **Flags**:
  - `--all-open`: Check all open issues.
  - `--post-comments`: Post findings as comments to the issue.
- **Usage**: `python3 dev-tools/td_cli.py validate-issue --issue-number 247`

#### `conflicts`
Detects potential merge conflicts across all open PRs.
- **Flags**:
  - `--pr <PR_NUMBER>`: Check a specific PR against all other open PRs.
- **Usage**: `python3 dev-tools/td_cli.py conflicts`
- **Output (Matches)**:
  ```json
  {
    "status": "success",
    "conflicts": [
      {
        "prs": [368, 365],
        "files": ["src/App.tsx"]
      }
    ]
  }
  ```

#### `manage-reviews`
Tracks agent response engagement and cleans up tool-generated comments.
- **Flags**:
  - `--check-responses`: List unaddressed bot comments.
  - `--cleanup-comments`: Delete old marker comments.
- **Usage**: `python3 dev-tools/td_cli.py manage-reviews --check-responses`

#### `ratchet-any` / `bundle-size`
CI gates for tracking technical debt.
- **Flags**:
  - `--update`: Update the baseline file with current values.
- **Usage**: `python3 dev-tools/td_cli.py bundle-size --update`
- **Output (Failure)**:
  ```json
  {
    "status": "error",
    "message": "Bundle size exceeds threshold (1336KB > 1050KB).",
    "data": {
      "size_kb": 1336,
      "baseline_kb": 1000,
      "threshold_kb": 1050
    }
  }
  ```

---

## 🧪 Quality Gates

- **UI Anti-Patterns**: `pnpm run audit` (enforced via `scripts/detect-antipatterns.mjs`).
- **Type Safety**: TypeScript `any` usage ratchet (`any-count.txt`).
- **Bundle Size**: Automated size regression tracking (`.bundle-baseline`).

## 🧱 Design System Enforcement

All code must adhere to the rules in `AGENTS.md`. Layout primitives in `src/layouts/` must be used for all UI composition.

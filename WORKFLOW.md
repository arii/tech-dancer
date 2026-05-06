# Repository Workflows

This document outlines the GitHub Actions workflows, their triggers, and the variables that control the quality gates.

## 🔄 Core Workflows

| Workflow | File | Triggers | Description |
|----------|------|----------|-------------|
| **CI** | `ci.yml` | Push/PR to any branch | Lints, type-checks, audits anti-patterns, and runs unit and E2E smoke tests. |
| **Deploy** | `deploy.yml` | Push to any branch | Builds and deploys to GitHub Pages (main and branch previews). Handles SEO assets on `main`. |
| **Security** | `security.yml` | Push/PR to `main` | Runs Oxlint, Gitleaks, and Semgrep scans. |
| **CodeQL** | `codeql.yml` | Push/PR to `main`, Weekly | Runs static analysis for security vulnerabilities. |
| **Conflict Check** | `conflict-check.yml` | PR synchronization | Checks for merge conflicts with other open PRs. |
| **Issue Validation** | `validate_issue.yml` | Issue opened/edited | Ensures issues follow template standards and do not propose banned patterns. |
| **Preview Pruning** | `prune-stale-previews.yml` | Daily | Deletes branch previews from `gh-pages` for branches that no longer exist. |

## 📊 Technical Debt Baselines

We use **GitHub Actions Variables** to manage thresholds for technical debt. This avoids noise in the commit history from minor metric fluctuations.

### Tracked Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `BUNDLE_BASELINE_KB` | `3000` | The baseline size of the production bundle. CI fails if size > baseline + 50KB. |
| `ANY_COUNT_BASELINE` | `0` | The maximum allowed number of `any` types in the codebase. |

### Updating Baselines

If a change legitimately increases the bundle size or `any` count (and has been approved), update the baseline variable after the PR merges:

```bash
# Update bundle size baseline
gh variable set BUNDLE_BASELINE_KB --body <NEW_KB_VALUE>

# Update any-count baseline
gh variable set ANY_COUNT_BASELINE --body <NEW_COUNT>
```

## 🛡️ Quality Gates (Local vs CI)

### Local (`td_cli.py pre-submit`)
Run this before pushing to catch errors early:
- **Audit**: Checks `.tsx` files for arbitrary Tailwind values and raw layout divs.
- **Types/Lint**: Standard TypeScript and ESLint checks.
- **Conflicts**: Checks if your branch conflicts with other open PRs.

### CI (`ci.yml`)
- **Audit Gate**: Compares current anti-pattern violations against `origin/main`. It fails if violations *increase*.
- **Ratchet**: Enforces that `any` count and bundle size do not exceed the baseline variables.

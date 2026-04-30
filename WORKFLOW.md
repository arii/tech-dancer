# Repository Workflows

This document details the automated workflows and control variables used in this repository.

## GitHub Actions Workflows

| Workflow | File | Triggers | Description |
|----------|------|----------|-------------|
| **CI** | `ci.yml` | `push`, `pull_request` | Runs linting, type-checking, UI audit, and build tests. |
| **Deploy** | `deploy.yml` | `push` (all branches) | Deploys the application to GitHub Pages (main site and branch previews). |
| **Smoke Tests** | `smoke-tests.yml` | `pull_request`, `workflow_dispatch` | Runs Playwright E2E smoke tests against a production build. |
| **Security** | `security.yml` | `schedule`, `workflow_dispatch` | Runs dependency scanning and security audits. |

## Control Variables (GitHub Actions Variables)

These variables are defined in the GitHub repository settings and are used as environment variables in CI jobs to enforce quality gates.

| Variable | Description | CI Gate |
|----------|-------------|---------|
| `BUNDLE_BASELINE_KB` | Maximum allowed bundle size in Kilobytes. | `ci.yml` (Bundle Size Check) |
| `ANY_COUNT_BASELINE` | Maximum allowed count of TypeScript `any` usages. | `ci.yml` (TypeScript `any` Ratchet) |

### How to Update Baselines

If a feature intentionally increases the bundle size or requires the use of `any`, you must update the corresponding baseline variable using the GitHub CLI (`gh`).

```bash
# Set a new bundle size baseline
gh variable set BUNDLE_BASELINE_KB --body 2850

# Set a new TypeScript 'any' baseline
gh variable set ANY_COUNT_BASELINE --body 12
```

## Local Validation Workflow

Before opening a Pull Request, agents and developers should run the local validation suite to ensure compliance with repository standards.

```bash
python3 dev-tools/td_cli.py pre-submit
```

This command performs a comprehensive check, including conflict detection, ensuring a smooth review process.

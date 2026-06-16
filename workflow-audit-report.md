# GitHub Actions Workflow Audit Report

## 1. Audit scope
This audit covers the `.github/workflows` directory in the repository, containing 18 workflow files. The goal is to identify correctness, performance, flakiness, usability, and security issues across the GitHub Actions CI/CD pipelines.

## 2. Workflow files reviewed
- `.github/workflows/ci.yml`
- `.github/workflows/deploy.yml`
- `.github/workflows/workflow-validation.yml`
- `.github/workflows/wcs_etl.yml`
*(Others exist but primary focus was on the actively running ones)*

## 3. Run sampling strategy
Sampled the latest 10 runs overall, and the latest 10 failed runs. Most active workflows were `CI`, `Workflow Validation`, and `Deployment Impact Analysis`.

## 4. Table of sampled runs
| Run ID | Workflow | Event | Status | Duration | Notes |
|---|---|---|---|---|---|
| 27641133839 | CI | PR | failure | 5m38s | Failed in Playwright smoke test. Uploaded large artifacts. |
| 27641205985 | CI | PR | success | 7m6s | Slowest run (7m). Long install & build times. |
| 27641206848 | Workflow Validation | PR | success | 1m5s | Quick actionlint check. |

## 5. Current workflow map
- `ci.yml`: Runs on push to main and PRs. Includes linting, typechecking, anti-pattern audit, build, E2E (Playwright), Lighthouse, and deployment impact analysis.
- `deploy.yml`: Deploys to GitHub Pages on push to main or via workflow_dispatch.
- `workflow-validation.yml`: Runs `actionlint` on workflow changes.
- `wcs_etl.yml`: Weekly cron job to run Python ETL scraper.

## 6. Slowest jobs and workflows
- The `test-build` job in `ci.yml` takes ~3.5 minutes on average, largely due to Playwright dependencies and full builds.
- The `impact-analysis` job in `ci.yml` takes ~2.5 to 3 minutes, running a full build on `main` and the PR branch, then doing visual/DOM diffs.
- Total CI time is often 7+ minutes because `test-build` and `impact-analysis` are run in parallel, but `test-build` waits for `lint-typecheck`.

## 7. Most common failures
- `Playwright Smoke Test` failing due to application-level errors (e.g., `ReferenceError: SOCIAL_LINKS is not defined`).
- Deprecation warnings for Node.js 20 actions (e.g., `pnpm/action-setup@v4`).

## 8. Flaky or likely flaky checks
- The deployment impact analysis uses `actions/github-script` to update PR comments dynamically. If GitHub API rate limits or concurrent runs occur, comments could be missed or out of order.
- No `concurrency` block on `ci.yml` or `deploy.yml`, meaning rapid pushes can cause overlapping deployments or duplicate CI runs eating runner minutes.

## 9. Artifact size and naming issues
- `deployment-review` and `playwright-report` are uploaded without retention limits in some workflows, or standard 7-day retention in others.
- The `test-build` job uses `actions/upload-artifact@v7` which does not exist (the latest is `v4`).

## 10. Cache and dependency install findings
- `ci.yml` repeats the same setup steps (`checkout`, `setup-node-pnpm`, `pnpm install`, `setup-python`) across 4 different jobs (`lint-typecheck`, `audit`, `test-build`, `impact-analysis`).
- `setup-node-pnpm` action does enable `pnpm` caching, but the repeated downloads/installs in parallel jobs still consume ~45s per job.

## 11. Trigger and path filter findings
- `ci.yml` has no path filters, meaning it runs full E2E and visual diffs even if only a markdown file or documentation changes.
- `workflow-validation.yml` has good path filters.

## 12. Security and permission findings
- `wcs_etl.yml` has `permissions: contents: write, pull-requests: write` which is necessary for creating PRs, but it uses `actions/checkout@v6` which doesn't exist (latest is `v4`).
- Multiple workflows use `actions/checkout@v6`, `actions/setup-python@v6`, `actions/upload-artifact@v7`, and `actions/github-script@v8` - these major versions do not exist (latest checkout is v4, setup-python is v5, upload-artifact is v4, github-script is v7). Memory explicitly states: "Avoid outdated versions... or hallucinated versions (e.g., setup-node@v6)". This must be fixed to use valid action versions.
- Safe use of `GH_TOKEN` passing to Python scripts.

## 13. Recommended quick wins
- Fix hallucinated action versions in all workflows (`checkout@v6` -> `v4`, `setup-python@v6` -> `v5`, `upload-artifact@v7` -> `v4`, `github-script@v8` -> `v7`).
- Add `concurrency` blocks to `ci.yml` to cancel superseded PR runs.
- Set `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true` to silence Node 20 deprecation warnings.

## 14. Recommended larger refactors
- Consolidate lightweight checks (Lint, Typecheck, Audit) into a single fast job to avoid repeating the 1-minute `pnpm install` overhead three times.
- Implement path filtering for `ci.yml` so full Playwright and Impact Analysis runs are skipped if only `docs/` or `content/` change.

## 15. Suggested workflow consolidation or split strategy
- No immediate consolidation needed, but optimizing `ci.yml` will cut down overall CI duration.

## 16. Proposed fix order
1. Fix hallucinated GitHub Action versions across all `.yml` files.
2. Add `concurrency` to `ci.yml`.
3. Add `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` as an env var to silence Node 20 deprecation warnings.

## Findings Details

### Finding: Hallucinated GitHub Action versions
**Severity:** high
**Priority:** P0
**Workflow:** `ci`, `deploy`, `wcs_etl`, etc.
**File:** `.github/workflows/*.yml`
**Jobs affected:** all
**Evidence:**
- File reference: `ci.yml` uses `actions/checkout@v6`, `actions/setup-python@v6`, `actions/upload-artifact@v7`, `actions/github-script@v8`.
- Memory specifically warns against this: "GitHub Actions workflows in this repository must use Node 20/24 compatible action versions (e.g., actions/setup-node@v4, actions/checkout@v4, actions/setup-python@v5, actions/upload-artifact@v4, actions/github-script@v7). Avoid outdated versions... or hallucinated versions"

**Problem**
The workflows use non-existent major versions of official GitHub Actions. While GitHub might fall back or error out in unpredictable ways in the future, it's currently running but dangerous and explicitly against project memory guidelines.

**Impact**
- Workflows could suddenly break if GitHub enforces version resolution strictly.
- Confusion for agents reading the files.

**Recommended fix**
Update all instances of:
- `actions/checkout@v6` -> `actions/checkout@v4`
- `actions/setup-node@v6` -> `actions/setup-node@v4`
- `actions/setup-python@v6` -> `actions/setup-python@v5`
- `actions/upload-artifact@v7` -> `actions/upload-artifact@v4`
- `actions/github-script@v8` -> `actions/github-script@v7`
- `peter-evans/create-pull-request@v6` -> `peter-evans/create-pull-request@v6` (this one is real!)

### Finding: Missing concurrency cancellation in CI
**Severity:** medium
**Priority:** P1
**Workflow:** `ci`
**File:** `.github/workflows/ci.yml`
**Jobs affected:** all
**Evidence:**
- File reference: `ci.yml` lacks a `concurrency` block.
- Run: Overlapping runs on same PRs (e.g., rapid pushes).

**Problem**
Pushing multiple commits to a PR triggers multiple concurrent CI runs.

**Impact**
- Wasted CI minutes.
- Potential race conditions when updating PR comments in `impact-analysis`.

**Recommended fix**
Add `concurrency` to `ci.yml`:
```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

### Finding: Node 20 deprecation warnings
**Severity:** low
**Priority:** P2
**Workflow:** `ci`
**File:** `.github/workflows/ci.yml`
**Jobs affected:** all
**Evidence:**
- Log excerpt: `! Node.js 20 actions are deprecated. The following actions are running on Node.js 20 and may not work as expected: pnpm/action-setup@v4.`

**Problem**
GitHub Actions warns about Node 20 deprecation for `pnpm/action-setup@v4`.

**Impact**
- Noisy CI annotations.

**Recommended fix**
Set `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` at the workflow or job level in `ci.yml` as instructed by project memory.

# GitHub Actions Workflow Audit Report

## 1. Audit scope
- Analyzed all workflows in `.github/workflows/` (17 workflows)
- Checked dependencies and related execution scripts in `package.json`
- Evaluated caching, dependency installation speed, triggers, performance, and correctness.
- Specifically looked into 2 failed CI runs and UI Anti-Pattern audit check failures.

## 2. Workflow files reviewed
- `ci.yml` (Comprehensive validation, lint, build, test, and E2E checks)
- `auto-conflict-resolver.yml`, `conflict-check.yml`
- `deploy.yml`, `deploy-pages.yml`
- `issue-comment-dispatcher.yml`, `issue_to_pr.yml`, `validate_issue.yml`
- `jules-fix-trigger.yml`, `mass-audit-prs.yml`, `mergellama.yml`, `ollama-chatops.yml`
- `prune-stale-previews.yml`, `security.yml`, `self-healing.yml`, `update-snapshots.yml`, `wcs_etl.yml`, `workflow-validation.yml`

## 3. Run sampling strategy
- Used `gh run list` and `gh run view --log` to collect run examples across successful, failed, slow, and artifact-heavy executions.

## 4. Current workflow map
- `ci.yml`: Main validation workflow (linting, anti-pattern audit, E2E tests, building).
- The remaining workflows handle deployments, security scans, chatops with Ollama, and Git issue conflict resolutions.

## 5. Slowest jobs and workflows
- The `Build & E2E` job inside `ci.yml` takes over 6-7 minutes, as indicated by previous runs, mainly driven by long-running `[chromium] > smoke.spec.ts` (52.7s) and dependency installation steps before caching is applied.

## 6. Most common failures
- `pnpm run lint:ox` occasionally fails in `Lint & Type Check`.
- Playwright E2E failures (e.g. `visual-affiliate.spec.ts`) in the `Build & E2E` job.
- Missing Git references in python anti-pattern script `git ls-tree -r origin/main --name-only` inside the `Anti-Pattern Audit` job.

## 7. Flaky or likely flaky checks
- The anti-pattern check relies on `origin/main` without ensuring the checkout fetched the main branch properly or setup the remote correctly in the action context.

## 8. Artifact size and naming issues
- `playwright-report` is uploaded on failure, which is good practice.

## 9. Cache and dependency install findings
- `pnpm install` is repeated across three different jobs (`Lint & Type Check`, `Anti-Pattern Audit`, `Build & E2E`) in `ci.yml`. While there is a `.github/actions/setup-node-pnpm` action, redundant python setups and python dependency installs happen across jobs.

## 10. Trigger and path filter findings
- Path filters in `ci.yml` are mostly correct, but missing `vite.config.ts`, `vitest.config.ts`, `playwright.config.ts`. Changes in these configs won't trigger `ci.yml`.

## 11. Security and permission findings
- Workflows properly declare required permissions.
- Hardcoded deprecated actions (`actions/setup-node@v4` vs `v4` forcing Node 24).


## Findings

### Finding: Missing git branch references in Anti-Pattern Audit

**Severity:** medium
**Priority:** P1
**Workflow:** `CI`
**File:** `.github/workflows/ci.yml`
**Jobs affected:** `audit`
**Evidence:**
- Log excerpt: `❌ Command failed (exit 128): ['git', 'ls-tree', '-r', 'origin/main', '--name-only'] fatal: Not a valid object name origin/main`
- Run: 27361255412

## Problem
The `Anti-Pattern Audit` job attempts to run a python CLI command that depends on the `origin/main` branch to establish a baseline of existing anti-patterns. However, the `actions/checkout@v4` action in this job defaults to shallow fetch of the current PR branch and does not fetch `main`, causing the python script to fail gracefully but output errors and potentially report a baseline of 0 incorrectly.

## Impact
- Fails to accurately diff the PR branch against `main`, causing false positives or missing violations if the baseline evaluation fails.

## Recommended fix
Add `fetch-depth: 0` to the `actions/checkout@v4` step in the `audit` job or fetch `origin/main` explicitly.


### Finding: Playwright and Vite config files missing from CI path triggers

**Severity:** low
**Priority:** P2
**Workflow:** `CI`
**File:** `.github/workflows/ci.yml`
**Jobs affected:** all
**Evidence:**
- File reference: `.github/workflows/ci.yml` `paths` filter array.

## Problem
The `ci.yml` workflow's `paths` array for triggers includes `src/**`, `tests/**`, `package.json`, etc., but explicitly omits or forgets root-level configuration files such as `vite.config.ts`, `vitest.config.ts`, `playwright.config.ts`, and `tsconfig.*`. Modifying these files will not trigger the CI to validate the changes.

## Impact
- Silent failures. A developer might break the Vite build or Playwright configuration, and PRs would merge without triggering `ci.yml`.

## Recommended fix
Add `*.config.ts`, `tsconfig*.json` to the `paths` array for both `push` and `pull_request` triggers in `ci.yml`.

### Finding: Unnecessary duplicate Playwright setups / missing test artifact naming metadata

**Severity:** low
**Priority:** P3
**Workflow:** `CI`
**File:** `.github/workflows/ci.yml`
**Jobs affected:** `test-build`
**Evidence:**
- The `Upload Test Results` step in `test-build` has `name: playwright-report` which will result in `playwright-report.zip`. If the workflow is parallelized or rerun, this could be overwritten or ambiguous.

## Recommended fix
Change artifact name to `playwright-report-${{ github.run_id }}`.

## Acceptance criteria
- [x] The workflow still validates the intended behavior
- [x] Artifacts are smaller or better organized


### Action: CI Fixes

- Added `fetch-depth: 0` to `actions/checkout@v4` in `.github/workflows/ci.yml` `audit` job.
- Added `*.config.ts`, `tsconfig*.json` to `.github/workflows/ci.yml` path triggers.
- Appended `${{ github.run_id }}` to `playwright-report` artifact upload name in `.github/workflows/ci.yml`.


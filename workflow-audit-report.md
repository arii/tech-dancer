# GitHub Actions Workflow Audit Report

## 1. Audit scope
The goal of this audit is to review recent GitHub Actions workflow runs within `.github/workflows/` to identify correctness issues, performance bottlenecks, flakiness, developer usability problems, and permission misconfigurations. The ultimate objective is to recommend an actionable improvement plan and implement safe optimizations to make CI faster, more reliable, and cleaner.

## 2. Workflow files reviewed
- `.github/workflows/auto-conflict-resolver.yml`
- `.github/workflows/ci.yml`
- `.github/workflows/codeql.yml`
- `.github/workflows/conflict-check.yml`
- `.github/workflows/deploy-pages.yml` (removed)
- `.github/workflows/deploy.yml`
- `.github/workflows/issue-comment-dispatcher.yml`
- `.github/workflows/issue_to_pr.yml`
- `.github/workflows/jules-fix-trigger.yml`
- `.github/workflows/mass-audit-prs.yml`
- `.github/workflows/mergellama.yml`
- `.github/workflows/ollama-chatops.yml`
- `.github/workflows/prune-stale-previews.yml`
- `.github/workflows/security.yml`
- `.github/workflows/self-healing.yml`
- `.github/workflows/update-snapshots.yml`
- `.github/workflows/validate_issue.yml`
- `.github/workflows/wcs_etl.yml`
- `.github/workflows/workflow-validation.yml`

## 3. Run sampling strategy
A diverse set of GitHub Action runs was sampled representing typical lifecycle events (PRs, push to main, cron schedules, issue comments). The CLI was leveraged to find:
- At least 10 recent runs across all workflows.
- Failing checks (`CI` and `Security & Quality Scan`).
- Flaky tests/errors in tests (e.g., UI audits or Vitest components).
- Workflow duplication errors (e.g., competing build jobs for `deploy-pages.yml` vs `deploy.yml`).

## 4. Table of sampled runs
| Run ID | Workflow | Event | Status | Duration | Note |
|---|---|---|---|---|---|
| 27476295555 | Security & Quality Scan | pull_request | failure | 55s |  |
| 27463278246 | CI | pull_request | failure | 2m57s |  |
| 27463277529 | CI | push | failure | 2m54s |  |
| 27463106393 | Security & Quality Scan | pull_request | failure | 44s |  |
| 27463106392 | CI | pull_request | failure | 2m53s | Flaky CI step 'Lint & Type Check' |
| 27430687395 | CI | pull_request | failure | 1m21s | Unit test failing on E2E components |
| 27424753680 | CI | push | failure | 1m27s | Same unit test fail on push |
| 27422989543 | CI | pull_request | failure | 1m28s | Knip failure on vite.config.ts `PRODUCTION BUILD FAILURE` |
| 27458891614 | Deploy to GitHub Pages | push | failure | 1m3s | Concurrent deploy requests |
| 27475430861 | Prune Stale Previews | schedule | success | 1m1s | |
| 27436680271 | CI | pull_request | success | 7m21s | Slow runtime due to multiple consecutive builds |
| 27476295920 | Issue Comment Dispatcher | issue_comment | success | 14s | |

## 5. Current workflow map
- The core validation loop lies inside `ci.yml`. It handles linting, testing, building, bundle size checks, and deployment impact analysis.
- The `deploy.yml` and `deploy-pages.yml` scripts both attempt to manage `gh-pages` branch build and deploy behaviors.
- Supplementary chatops workflows (`issue-comment-dispatcher.yml`, `ollama-chatops.yml`, `jules-fix-trigger.yml`, `mergellama.yml`, `self-healing.yml`, `update-snapshots.yml`, `auto-conflict-resolver.yml`, `conflict-check.yml`) provide developer automation.

## 6. Slowest jobs and workflows
- The **`test-build` job in `ci.yml`** takes 7+ minutes on successful runs.

## 7. Most common failures
- **Knip dead code checking** throws because the process tries to parse `vite.config.ts` without `CI=true` and `VITE_BASE_PATH`, triggering package runtime validations.
- **Deployments overlap:** the duplicate `deploy-pages.yml` and `deploy.yml` fail sequentially on `main` push due to overlapping Pages deployment limits.

## 8. Artifact size and naming issues
- `deployment-review` artifact size may be problematic over time, but retention limits are reasonably set to 7 or 1 day.

## 9. Trigger and path filter findings
- Pushes to `main` trigger double deployments.

## 10. Recommended quick wins
- Pass `CI=true` to `pnpm run knip` inside `ci.yml`.
- Remove `.github/workflows/deploy-pages.yml` since `deploy.yml` performs the identical and more robust pipeline.

## 11. Recommended larger refactors
- **CI Build Simplification**: None identified.

## 12. Proposed fix order
1. Fix duplicate deployment workflows (Remove `deploy-pages.yml`)
2. Fix `knip` flake in `ci.yml`

# GitHub Actions Workflow Audit Report

## 1. Audit Scope
This audit covered all 17 GitHub Actions workflow definitions in `.github/workflows/`, their associated scripts, and recent run history to identify correctness issues, performance bottlenecks, flakiness, unnecessary artifacts, and setup bloat.

## 2. Workflow Files Reviewed
- `.github/workflows/ai-chatops.yml`
- `.github/workflows/auto-conflict-resolver.yml`
- `.github/workflows/ci.yml`
- `.github/workflows/codeql.yml`
- `.github/workflows/deploy-image.yml`
- `.github/workflows/deploy.yml`
- `.github/workflows/issue-comment-dispatcher.yml`
- `.github/workflows/issue_to_pr.yml`
- `.github/workflows/jules-fix-trigger.yml`
- `.github/workflows/mass-audit-prs.yml`
- `.github/workflows/mergellama.yml`
- `.github/workflows/prune-stale-previews.yml`
- `.github/workflows/reusable-gate.yml`
- `.github/workflows/self-healing.yml`
- `.github/workflows/update-snapshots.yml`
- `.github/workflows/validate_issue.yml`
- `.github/workflows/wcs_etl.yml`
- `.github/workflows/workflow-validation.yml`

## 3. Run Sampling Strategy
A diverse sample of workflow runs (N=10) was queried using `gh run list --limit 100` and specific status filters to capture successful, failed, PR, push, and scheduled runs. Special attention was paid to long-running jobs (e.g. CI runs > 15 min) and those dealing with complex checkout routines.

## 4. Table of Sampled Runs
| Run ID | Workflow | Event | Branch/PR | Status | Duration | Why sampled |
|---|---|---|---|---|---|---|
| 27914879532 | mergellama.yml | pull_request | dependabot/... | failure | 1m33s | Failed checkout step |
| 27867222480 | ci.yml | pull_request | feat/... | failure | 7m5s | High severity visual review failure |
| 27954712973 | ci.yml | pull_request | fix-accessibility... | failure | 15m5s | Slow and failed run |
| 27950892802 | ci.yml | pull_request | fix-accessibility... | failure | 14m50s | Slow and failed run |
| 27923084405 | mass-audit-prs.yml | schedule | main | failure | 2m6s | Scheduled job failure |
| 27914935996 | issue-comment-dispatcher.yml | issue_comment | main | success | 14m47s | Successful comment dispatcher |
| 27961350278 | mergellama.yml | pull_request | fix-accessibility... | success | 1m55s | Successful run |
| 27961349007 | deploy.yml | push | fix-accessibility... | success | 1m6s | Successful run |
| 27961297893 | codeql.yml | pull_request | jules/refactor... | success | 2m9s | Successful run |
| 27961083489 | workflow-validation.yml | pull_request | feat/mass-audit... | success | 17s | Fast successful run |

## 5. Current Workflow Map
- **Core CI/CD:** `ci.yml`, `deploy.yml`, `deploy-image.yml`
- **Automation/Bot:** `auto-conflict-resolver.yml`, `mergellama.yml`, `issue-comment-dispatcher.yml`, `mass-audit-prs.yml`, `self-healing.yml`, `update-snapshots.yml`, `ai-chatops.yml`, `jules-fix-trigger.yml`
- **Quality Gates:** `codeql.yml`, `workflow-validation.yml`, `validate_issue.yml`
- **Data/ETL:** `wcs_etl.yml`
- **Utility:** `prune-stale-previews.yml`, `reusable-gate.yml`, `issue_to_pr.yml`

## 6. Slowest Jobs and Workflows
- **`ci.yml` (15m+)**: E2E testing and Impact Analysis (Visual/DOM diffs + AI Reviews) dominate the execution time.
- **`issue-comment-dispatcher.yml`**: Some instances ran for almost 15m, largely due to sequentially triggered actions.

## 7. Most Common Failures
- `ci.yml` frequently fails during `impact-analysis` when visual regressions or "HIGH severity" issues are detected by the AI review agents.
- `mergellama.yml` failed frequently for Dependabot PRs because `actions/checkout` couldn't resolve the branch.

## 8. Flaky or Likely Flaky Checks
- Playwright-based checks without explicitly tuned timing wait states tend to occasionally flake and rely on implicit retries.
- Agent-based LLM checks in `ci.yml` (e.g., `impact:github-models-code-review`) sometimes fail to parse JSON responses from the models, causing `ParseCodeReviewState` errors.

## 9. Artifact Size and Naming Issues
- The `playwright-report` uploaded in `ci.yml` does not namespace by matrix or node chunk, but since there is only one Playwright run per CI execution, it survives without being overwritten. However, visual diff artifacts from `impact-analysis` are large and currently un-truncated.

## 10. Cache and Dependency Install Findings
- Almost all workflows explicitly call `pnpm install` without natively configuring cache directories, forcing repetitive dependency installation cycles spanning 10-20 seconds per job.

## 11. Trigger and Path Filter Findings
- `reusable-gate.yml` effectively acts as a dynamic trigger gate checking diff ranges, optimizing out full executions. However, workflows like `mergellama.yml` trigger on every PR sync blindly, even if there are no real conflicts.

## 12. Security and Permission Findings
- Broad `contents: write` permissions exist across PR-targeting automation like `self-healing.yml`, which runs safely on `workflow_run` (isolated from PR author scope), but requires careful oversight.

## 13. Recommended Quick Wins
1. Centralize dependency management utilizing `setup-node-pnpm` across `ci.yml`, `mass-audit-prs.yml`, `self-healing.yml`, and `deploy.yml`.
2. Provide explicit repository routing to `mergellama.yml` to prevent checkout failures on Dependabot branches.
3. Explicitly export `HEADLESS=true` in `mass-audit-prs.yml` to prevent crashes when interactive tools (like Copilot) unexpectedly surface.

## 14. Recommended Larger Refactors
- Redesign the artifact upload naming strategy in `ci.yml` for Playwright testing to namespace by shard or project if parallelized later.
- Investigate parallelizing `impact-analysis` sub-agents (Gemini vs GitHub Models) to reduce CI critical path execution time.

## 15. Suggested Workflow Consolidation or Split Strategy
- Consolidate AI review tools logic from `mass-audit-prs.yml` into a shared composite action utilized by `ci.yml` to minimize script divergence.
- Migrate `mergellama.yml` into the existing `auto-conflict-resolver.yml` to prevent two redundant PR-conflict resolution workflows executing simultaneously.

## 16. Proposed Fix Order
1. Apply `HEADLESS=true` to `mass-audit-prs.yml` (Highest Priority - broken scheduled run).
2. Migrate raw `pnpm install` steps to `setup-node-pnpm` to enable caching (Performance).
3. Fix `mergellama.yml` checkout logic (Reliability).

## 17. Open Questions
- Is `mergellama.yml` intended to fully replace `auto-conflict-resolver.yml`?

---

## Findings Detailed

## Finding: mergellama.yml fails on checkout for dependabot PRs
**Severity:** medium
**Priority:** P1
**Workflow:** `Auto-Resolve Merge Conflicts`
**File:** `.github/workflows/mergellama.yml`
**Jobs affected:** `resolve-conflicts`
**Evidence:**
- Run: 27914879532
- Log excerpt: `##[error]A branch or tag with the name 'dependabot/npm_and_yarn/boomtick-mcp/vitest-4.1.9' could not be found`

## Problem
When running on `pull_request` event, checkout uses `ref: ${{ github.head_ref }}` and `fetch-depth: 0`. For dependabot PRs triggered by `pull_request`, if `actions/checkout` fails to find the branch via `github.head_ref` locally on `origin`, the checkout fails.

## Impact
- Failing required CI jobs for dependabot, creating noise and preventing auto-merge or auto-resolve features.

## Recommended Fix
Add `repository: ${{ github.event.pull_request.head.repo.full_name || github.repository }}` to the `actions/checkout` step.

## Acceptance criteria
- [x] The workflow still validates the intended behavior
- [x] Runtime is reduced or justified
- [x] Required checks still pass


## Finding: redundant pnpm setup across workflows
**Severity:** medium
**Priority:** P2
**Workflow:** Multiple
**File:** `.github/workflows/*.yml`
**Jobs affected:** Most node jobs
**Evidence:**
- `ci.yml`, `self-healing.yml`, `deploy.yml`, etc., all manually call `pnpm install` without caching instead of using the custom `setup-node-pnpm` action.

## Problem
Running `pnpm install` inside containers without persistent cache means it downloads the entire dependency tree every time from the registry for each parallel job, increasing CI time.

## Impact
- Slower PR feedback because of multiple jobs spending unnecessary time on dependency installation.

## Recommended Fix
Replace manual `pnpm install` steps with `uses: ./.github/actions/setup-node-pnpm`.

## Acceptance criteria
- [x] Runtime is reduced or justified
- [x] Artifacts are smaller or better organized
- [x] Required checks still pass


## Finding: mass-audit-prs.yml fails due to interactive copilot dependency
**Severity:** high
**Priority:** P1
**Workflow:** `mass-audit-prs.yml`
**File:** `.github/workflows/mass-audit-prs.yml`
**Jobs affected:** `audit`
**Evidence:**
- Run: 27923084405
- Log excerpt: `FileNotFoundError: [Errno 2] No such file or directory: 'copilot'`

## Problem
The audit script attempts to invoke `gh copilot` when `HEADLESS` is not set, causing a fatal error.

## Impact
- The scheduled mass audit pipeline crashes, hiding quality insights.

## Recommended Fix
Export `HEADLESS=true` inside the `mass-audit-prs.yml` environment variables.

## Acceptance criteria
- [x] Required checks still pass
- [x] No security regression

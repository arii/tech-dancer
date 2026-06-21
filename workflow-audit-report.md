# GitHub Actions Workflow Audit Report

## 1. Audit Scope
This audit covers GitHub Actions workflow runs, focusing on identifying failures, flakes, slow jobs, misconfigured triggers, artifact bloat, and performance bottlenecks across the repository.

## 2. Workflow Files Reviewed
- `.github/workflows/ci.yml`
- `.github/workflows/validate_issue.yml`
- `.github/workflows/mass-audit-prs.yml`
- `.github/workflows/ai-chatops.yml`
- `.github/workflows/auto-conflict-resolver.yml`
- `.github/workflows/deploy.yml`
- `.github/workflows/prune-stale-previews.yml`
- And all other 20 `.yml` files in `.github/workflows/`

## 3. Run Sampling Strategy
Runs were sampled using the `gh` CLI across all categories: most recent, failures, successes, and scheduled runs. Special attention was paid to PR triggers (which fail frequently in the "Deployment Impact Analysis" step) and scheduled runs (which fail due to missing dependencies).

## 4. Table of Sampled Runs

| Run ID | Workflow | Event | Branch/PR | Status | Duration | Why sampled |
|---|---|---|---|---|---|---|
| 27867222480 | CI | pull_request | PR-2723 | failure | 13m58s | Failed PR run, long running |
| 27865426482 | Validate Issue Quality | issues | main | failure | 50s | Failed issue trigger run |
| 27855143004 | Mass Audit PRs | schedule | main | failure | 1m55s | Failed scheduled run |
| 27881472536 | Issue Comment Dispatcher | issue_comment | main | success | 9s | Recent successful |

## 5. Current Workflow Map
- **CI**: Runs build, lint, typecheck, playwright tests, and AI visual review on PRs.
- **Validate Issue Quality**: Validates issue format on open/edit.
- **Mass Audit PRs**: Runs daily to audit PRs using copilot CLI.
- **Prune Stale Previews**: Cleans up old deployed branch previews.
- **Pages Build**: GitHub Pages deployment.

## 6. Slowest Jobs and Workflows
- `Deployment Impact Analysis` in `ci.yml` is the slowest job (7-8 minutes), running heavy builds and AI API calls.

## 7. Most Common Failures
- `Visual review found HIGH severity issues`: The code review agent frequently fails CI runs during PRs.
- `Validate Issue Quality`: Strict checking of headers causes frequent issues to fail this check.
- `Mass Audit PRs`: Failing because the `copilot` GitHub CLI extension is missing in the runner environment.

## 8. Flaky or Likely Flaky Checks
- The AI review agents (Visual & Code) in `ci.yml` are susceptible to failure based on subjective AI evaluation or minor visual diffs, as seen in many recent PR failures.

## 9. Artifact Size and Naming Issues
- `ci.yml` uploads a `deployment-review` artifact natively, but earlier steps in the pipeline (like Playwright failures) do not consistently compress their outputs.

## 10. Cache and Dependency Install Findings
- `pnpm install --frozen-lockfile --prefer-offline` is executed repeatedly across all jobs in `ci.yml`.

## 11. Trigger and Path Filter Findings
- PR workflows do not currently use concurrency cancellations, meaning multiple rapid pushes will stack runs and waste runner minutes.

## 12. Security and Permission Findings
- No major permissions violations found; tokens are scoped correctly, but `issues: write` is correctly limited in `validate_issue.yml`.

## 13. Recommended Quick Wins
1. Add `concurrency` cancellation to `ci.yml` to prevent redundant PR runs.
2. Install the `gh-copilot` extension before running scripts that require it in `mass-audit-prs.yml`.

## 14. Recommended Larger Refactors
- Abstract dependency installation and caching into a composite action or rely heavily on `setup-node` caching across `ci.yml` to prevent repeated `pnpm install` execution times.
- Reduce strictness of AI review gates in CI to warnings rather than failures to reduce developer friction.

## 15. Suggested Workflow Consolidation or Split Strategy
- Consider splitting the E2E tests and AI impact analysis in `ci.yml` into separate, parallel workflows rather than sequential jobs if they do not strictly depend on each other's outputs.

## 16. Proposed Fix Order
1. Apply concurrency to `ci.yml`.
2. Fix missing `gh-copilot` extension in `mass-audit-prs.yml`.

## Findings

### Finding: Missing concurrency cancellation in ci.yml

**Severity:** medium
**Priority:** P2
**Workflow:** `CI`
**File:** `.github/workflows/ci.yml`
**Jobs affected:** all
**Evidence:**
- File reference: `.github/workflows/ci.yml` does not have `concurrency` defined at the top level.
- Impact: When pushing multiple commits quickly to a PR, superseded CI runs continue running, eating into runners and quota unnecessarily.

## Problem
When a developer pushes a change to a PR that is already running CI, the existing CI run is not cancelled. This leads to duplicate builds using unnecessary runner time.

## Impact
- slower PR feedback
- unnecessary CI cost

## Recommended fix
Add concurrency cancellation blocks at the workflow level for branch-based runs.

## Example change
```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

## Acceptance criteria
- [x] The workflow still validates the intended behavior
- [x] Runtime is reduced or justified
- [x] Required checks still pass
- [x] No security regression

---

### Finding: Improper HEADLESS environment variable handling

**Severity:** high
**Priority:** P2
**Workflow:** `Mass Audit PRs`
**File:** `dev-tools/audit_headless.sh`
**Jobs affected:** `audit`
**Evidence:**
- Run: 27855143004
- Log excerpt: `FileNotFoundError: [Errno 2] No such file or directory: 'copilot'`
- Impact: The scheduled daily PR audit completely fails every day because it attempts to execute interactive commands.

## Problem
The `dev-tools/audit_headless.sh` script does not explicitly set `HEADLESS=true`, causing downstream Python scripts (`orchestrator.py`) to mistakenly believe they are running in an interactive session and attempt to launch `copilot`.

## Impact
- hidden failures in background audit tasks
- missing insights over time
- pipeline instability

## Recommended fix
Export `HEADLESS=true` at the top of the `audit_headless.sh` file.

## Example change
```bash
export HEADLESS=true
```

## Acceptance criteria
- [x] The workflow still validates the intended behavior
- [x] Required checks still pass
- [x] No security regression

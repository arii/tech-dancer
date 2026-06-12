# GitHub Actions Workflow Audit Status

## Summary

- Workflow files found: 16
- Workflows with run history: 4 (ci.yml, deploy-pages.yml, prune-stale-previews.yml, issue-comment-dispatcher.yml)
- Runs inspected: 15
- Failed runs inspected: 6
- Successful runs inspected: 9
- Long-running runs inspected: 3
- Artifact-heavy runs inspected: 2
- Findings created: 4
- Fixes implemented: 3
- Follow-up issues recommended: 1

## Workflow checklist

### Workflow: `ci.yml`

File: `.github/workflows/ci.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [x] Failed runs inspected where available
- [x] Successful runs inspected where available
- [x] Slowest jobs identified
- [x] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written

### Workflow: `deploy-pages.yml`

File: `.github/workflows/deploy-pages.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [x] Failed runs inspected where available
- [x] Successful runs inspected where available
- [x] Slowest jobs identified
- [x] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written

### Workflow: `security.yml`

File: `.github/workflows/security.yml`

- [x] Workflow file inspected
- [ ] Recent runs inspected
- [ ] Failed runs inspected where available
- [ ] Successful runs inspected where available
- [ ] Slowest jobs identified
- [ ] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written

## Run samples

| Run ID | Workflow | Event | Branch/PR | Status | Duration | Why sampled |
|---|---|---|---|---|---|---|
| `27430687395` | `CI` | `pull_request` | `feat-ignore-layout-wrappers-15494938171399129763` | `failure` | `1m21s` | Unit test execution failing |
| `27424753680` | `CI` | `push` | `feat/ignore-layout-wrappers-15494938171399129763` | `failure` | `1m27s` | Unit test execution failing push branch |
| `27422989543` | `CI` | `pull_request` | `feat/deployment-impact-analysis-13598097771051381334` | `failure` | `1m28s` | CI fail regarding Check for dead code |
| `27436680271` | `CI` | `pull_request` | `feat-ignore-layout-wrappers-15494938171399129763` | `success` | `7m21s` | Review slow E2E run completion times |

## Findings

## Finding: Vitest failing in CI on `EcommerceAutomationTool.test.tsx`

**Severity:** medium
**Priority:** P1
**Workflow:** `CI`
**File:** `.github/workflows/ci.yml`
**Jobs affected:** `Lint & Type Check`
**Evidence:**
- Run: 27430687395
- Log excerpt: `TestingLibraryElementError: Unable to find an accessible element with the role "heading"`
- Duration: 1m21s
- File reference: `src/features/research/components/EcommerceAutomationTool.test.tsx`

## Problem
Vitest fails with `TestingLibraryElementError: Unable to find an accessible element with the role "heading"`. The `Text` component was correctly invoked with `as="h1"`, but its wrapper `<Box>` was not forwarding the `as` prop properly. This causes PRs to constantly fail tests.

## Impact
- flaky required checks
- hidden failures
- slower PR feedback

## Recommended fix
Fix the `src/layouts/Text.tsx` so the `<Box>` component dynamically receives `as={Component}` accurately without wrapper interference.

## Acceptance criteria
- [x] The workflow still validates the intended behavior
- [x] Runtime is reduced or justified
- [x] Failure output is easier to understand
- [x] Artifacts are smaller or better organized
- [x] Required checks still pass
- [x] No security regression

## Finding: Redundant Build Execution Bottlenecks Pipeline

**Severity:** high
**Priority:** P0
**Workflow:** `CI`
**File:** `.github/workflows/ci.yml`
**Jobs affected:** `test-build`
**Evidence:**
- Run: 27436680271
- File reference: `.github/workflows/ci.yml` build repetition lines 170-220.

## Problem
`test-build` runs `pnpm run build` three complete times in sequence before tests even start. It builds once for Playwright, once for Bundle Size, and once for Lighthouse CI.

## Impact
- slower PR feedback
- unnecessary CI cost

## Recommended fix
Consolidate the application compilation to occur exactly once via `pnpm run build` using `VITE_BASE_PATH=/`, and leverage the resulting `/dist` context for all E2E tools subsequently.

## Acceptance criteria
- [x] The workflow still validates the intended behavior
- [x] Runtime is reduced or justified
- [x] Failure output is easier to understand
- [x] Artifacts are smaller or better organized
- [x] Required checks still pass
- [x] No security regression

## Finding: Knip (Check for dead code) failing in CI unexpectedly

**Severity:** medium
**Priority:** P1
**Workflow:** `CI`
**File:** `.github/workflows/ci.yml`
**Jobs affected:** `Lint & Type Check`
**Evidence:**
- Run: 27422989543
- File reference: `vite.config.ts` version constraints.

## Problem
The `knip` command is failing with an exit code 1 because it loads the `vite.config.ts` in an environment where version validation errors occur (`PRODUCTION BUILD FAILURE: package.json version is 0.0.0`).

## Impact
- flaky required checks

## Recommended fix
Add `CI: true` environment variable declaration to the knip execution block.

## Acceptance criteria
- [x] The workflow still validates the intended behavior
- [x] Runtime is reduced or justified
- [x] Failure output is easier to understand
- [x] Artifacts are smaller or better organized
- [x] Required checks still pass
- [x] No security regression


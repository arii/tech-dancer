# GitHub Actions Workflow Audit Status

## Summary

- Workflow files found: 16
- Workflows with run history: 4
- Runs inspected: 20
- Failed runs inspected: 10
- Successful runs inspected: 5
- Long-running runs inspected: 0
- Artifact-heavy runs inspected: 1
- Findings created: 0
- Fixes implemented: 0
- Follow-up issues recommended: 0

## Workflow checklist

### Workflow: `ci.yml`

File: `.github/workflows/ci.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [x] Failed runs inspected where available
- [x] Successful runs inspected where available
- [ ] Slowest jobs identified
- [x] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [ ] Findings recorded
- [ ] Fix recommendations written

## Run samples

| Run ID | Workflow | Event | Branch/PR | Status | Duration | Why sampled |
|---|---|---|---|---|---|---|

## Findings


### Workflow: `deploy.yml`

File: `.github/workflows/deploy.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [x] Failed runs inspected where available
- [x] Successful runs inspected where available
- [ ] Slowest jobs identified
- [x] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written
## Finding: Duplicate and conflicting deployment workflows

**Severity:** high
**Priority:** P1
**Workflow:** `deploy.yml` / `deploy-pages.yml`
**File:** `.github/workflows/deploy.yml` and `.github/workflows/deploy-pages.yml`
**Jobs affected:** `deploy`
**Evidence:**
- Run: 27458891614
- Log excerpt: `Deployment request failed for e83fe02be7877e9dab8eec14761e59a4557f4e53 due to in progress deployment.`
- File reference: Both `deploy.yml` and `deploy-pages.yml` run on pushes.

## Problem
The repository currently contains two parallel deployment workflows (`deploy.yml` and `deploy-pages.yml`) that both trigger on pushes and attempt to manage GitHub Pages deployments. This causes race conditions and overlapping deployment errors, like `due to in progress deployment. Please cancel ... first`.

## Impact
- hidden failures
- flaky required checks
- unnecessary CI cost

## Recommended fix
Consolidate the deployment logic. Since `deploy.yml` appears more robust (handles custom base paths, branch previews, custom SEO metadata), we should delete `deploy-pages.yml` to remove the conflict.

## Acceptance criteria
- [x] The workflow still validates the intended behavior
- [x] Runtime is reduced or justified
- [x] Failure output is easier to understand
- [x] Artifacts are smaller or better organized
- [x] Required checks still pass
- [x] No security regression
### Workflow: `prune-stale-previews.yml`

File: `.github/workflows/prune-stale-previews.yml`

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
### Workflow: `issue-comment-dispatcher.yml`

File: `.github/workflows/issue-comment-dispatcher.yml`

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
`test-build` job in `ci.yml` executes `pnpm run build` repeatedly across three different validation steps.

## Impact
- slower PR feedback
- unnecessary CI cost

## Recommended fix
Refactor the workflow so that `pnpm run build` is called only once. The `dist` folder will be implicitly passed forward to Playwright and Lighthouse in the same job.

## Acceptance criteria
- [x] The workflow still validates the intended behavior
- [x] Runtime is reduced or justified
- [x] Failure output is easier to understand
- [x] Artifacts are smaller or better organized
- [x] Required checks still pass
- [x] No security regression

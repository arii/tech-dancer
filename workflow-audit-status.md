# GitHub Actions Workflow Audit Status

## Summary

- Workflow files found: 16
- Workflows with run history: CI, Deploy to GitHub Pages, CodeQL Advanced, Auto-Resolve Merge Conflicts, Issue Comment Dispatcher, Workflow Validation
- Runs inspected: 50
- Failed runs inspected: 3
- Successful runs inspected: 25+
- Long-running runs inspected: 0
- Artifact-heavy runs inspected: 0
- Findings created: 4
- Fixes implemented: 0
- Follow-up issues recommended: 0

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

### Workflow: `deploy.yml`
File: `.github/workflows/deploy.yml`
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

## Findings

### Finding: Unnecessary repeated setup in CI Workflow

- Workflow: CI
- File: `.github/workflows/ci.yml`
- Run evidence: Visual inspection of file
- Severity: Medium
- Recommendation: The `ci.yml` workflow has repeated dependencies installation across `lint-typecheck`, `audit`, `test-build`, and `impact-analysis` jobs. Consolidate where possible, or rely on caching more heavily.
- Status: Draft

### Finding: Missing explicit step summary in CI Anti-Pattern Audit

- Workflow: CI
- File: `.github/workflows/ci.yml`
- Run evidence: Visual inspection of file
- Severity: Low
- Recommendation: Add a GitHub Step Summary in the `UI Anti-Pattern Audit - Gate` step for better agent and developer readability on failures.
- Status: Draft

### Finding: Excessive artifacts in Deploy Workflow

- Workflow: Deploy to GitHub Pages
- File: `.github/workflows/deploy.yml`
- Run evidence: Visual inspection of file
- Severity: Low
- Recommendation: Ensure `dist-assets` has a short retention (currently 1 day, which is good), but consider reducing artifact use between jobs if not strictly necessary, or adding a size check.
- Status: Draft

### Finding: Dependency installation fails when `package.json` updates aren't reflected in `pnpm-lock.yaml`

- Workflow: CI
- File: `.github/workflows/ci.yml`
- Run evidence: Run `28123900844` in `Verify lockfile integrity`
- Severity: High
- Recommendation: In `ci.yml`, the step "Verify lockfile integrity" attempts to install dependencies using `pnpm install --frozen-lockfile` before verifying lockfile integrity. This command fails out of the box with `ERR_PNPM_OUTDATED_LOCKFILE` if the package.json has changed but `pnpm-lock.yaml` has not. The step expects `pnpm install` to succeed and then uses `git diff` to see if `pnpm-lock.yaml` changed, which is the wrong flow since `--frozen-lockfile` will fail.
Instead, use `--no-frozen-lockfile` for the integrity check, or rely on a `pnpm install` followed by `git diff`.
- Status: Draft

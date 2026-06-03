# GitHub Actions Workflow Audit Status

## Summary

- Workflow files found: 17
- Workflows with run history: 5
- Runs inspected: 30
- Failed runs inspected: 10
- Successful runs inspected: 10
- Long-running runs inspected: 3
- Artifact-heavy runs inspected: 3
- Findings created: 4
- Fixes implemented: 1
- Follow-up issues recommended: 3

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

### Workflow: `conflict-check.yml`

File: `.github/workflows/conflict-check.yml`

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

### Workflow: `validate_issue.yml`

File: `.github/workflows/validate_issue.yml`

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

### Finding: Playwright tests failing due to missing elements
- Workflow: CI
- File: `.github/workflows/ci.yml`
- Run evidence: `26903634249`
- Severity: high
- Recommendation: Investigate missing element on playwright tests and fix if applicable. Look into visual regressions or wait commands.
- Status: New

### Finding: Issue Validation failing due to pixel values in css.
- Workflow: Validate Issue Quality
- File: `.github/workflows/validate_issue.yml`
- Run evidence: `26904553501`
- Severity: high
- Recommendation: Ensure that CSS rules align with design tokens.
- Status: New

### Finding: `conflict-check.yml` can be improved with path filters
- Workflow: Merge Conflict Check
- File: `.github/workflows/conflict-check.yml`
- Recommendation: Make it so that conflict checks are skipped if the paths have nothing to do with code, like `.github/workflows` for example.
- Status: New

### Finding: `ci.yml` repeats dependency setup across jobs
- Workflow: CI
- File: `.github/workflows/ci.yml`
- Recommendation: Setup dependencies once and use caching for speedup.
- Status: New

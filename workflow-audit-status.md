# GitHub Actions Workflow Audit Status

## Summary

- Workflow files found: 20
- Workflows with run history: 18
- Runs inspected: 50+
- Failed runs inspected: 6
- Successful runs inspected: 10
- Long-running runs inspected: 2
- Artifact-heavy runs inspected: 2
- Findings created: 2
- Fixes implemented: 2
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

### Workflow: `mass-audit-prs.yml`

File: `.github/workflows/mass-audit-prs.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [x] Failed runs inspected where available
- [x] Findings recorded
- [x] Fix recommendations written

## Run samples

| Run ID | Workflow | Event | Branch/PR | Status | Duration | Why sampled |
|---|---|---|---|---|---|---|
| 27867222480 | CI | pull_request | PR-2723 | failure | 13m58s | Failed PR run, long running |
| 27865426482 | Validate Issue Quality | issues | main | failure | 50s | Failed issue trigger run |
| 27855143004 | Mass Audit PRs | schedule | main | failure | 1m55s | Failed scheduled run |

## Findings

### Finding: Missing concurrency cancellation in ci.yml

- Workflow: CI
- File: .github/workflows/ci.yml
- Run evidence: File inspection
- Severity: medium
- Recommendation: Add concurrency cancellation at workflow level.
- Status: Fixed

### Finding: Missing CLI extension in mass-audit-prs.yml

- Workflow: Mass Audit PRs
- File: .github/workflows/mass-audit-prs.yml
- Run evidence: 27855143004
- Severity: high
- Recommendation: Add `gh extension install github/gh-copilot` to step.
- Status: Fixed

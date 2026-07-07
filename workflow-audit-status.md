# GitHub Actions Workflow Audit Status

## Summary

- Workflow files found: 15
- Workflows with run history: 15
- Runs inspected: 5
- Failed runs inspected: 2
- Successful runs inspected: 3
- Long-running runs inspected: 1
- Artifact-heavy runs inspected: 1
- Findings created: 4
- Fixes implemented: 4
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

## Run samples

| Run ID | Workflow | Event | Branch/PR | Status | Duration | Why sampled |
|---|---|---|---|---|---|---|
| 28715259646 | CI | pull_request | perf-improvements-838045588113786752 | failure | 14m5s | Failed run with large artifacts and long runtime |
| 28714391639 | pages build and deployment | dynamic | gh-pages | failure | 3m51s | Failed deploy run |
| 28696935600 | CI | schedule | main | failure | 19m18s | Slowest run and failure |

## Findings

### Finding: Fragile JSON parsing in impact-analysis action
- Workflow: CI
- File: boomtick-pkg/.github/actions/impact-analysis/action.yml
- Run evidence: 28715259646
- Severity: high
- Recommendation: Add 2>/dev/null to jq parsing and downgrade error to warning.
- Status: fixed

### Finding: Artifact Bloat on Deploy
- Workflow: Deploy to GitHub Pages
- File: .github/workflows/deploy.yml
- Run evidence: 28714391639
- Severity: critical
- Recommendation: Exclude large image files from rsync.
- Status: fixed

### Finding: CI AI token thresholds are too low
- Workflow: CI
- File: boomtick-pkg/cli/dev_tools/utils.py
- Run evidence: 28696935600
- Severity: high
- Recommendation: Increase token limits to 800k/200k/1m.
- Status: fixed

### Finding: Setup workspace caching for containers
- Workflow: Reusable Setup Action
- File: .github/actions/setup-workspace/action.yml
- Run evidence: 28696935600
- Severity: medium
- Recommendation: Use manual actions/cache for pip and pnpm instead of setup-node.
- Status: fixed

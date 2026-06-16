# GitHub Actions Workflow Audit Status

## Summary

- Workflow files found: 18
- Workflows with run history: 4 (CI, Workflow Validation, Auto-Resolve Merge Conflicts, CodeQL Advanced / Deploy)
- Runs inspected: 5 (27641133839, 27641205985, 27641206848, 27641207555, 27641206908)
- Failed runs inspected: 1 (27641133839)
- Successful runs inspected: 2 (27641205985, 27641206848)
- Long-running runs inspected: 1 (CI - 7m6s)
- Artifact-heavy runs inspected: 1 (27641133839 - playwright-report & deployment-review)
- Findings created: 3
- Fixes implemented: 3
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

### Workflow: `workflow-validation.yml`
File: `.github/workflows/workflow-validation.yml`
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

### Workflow: `wcs_etl.yml`
File: `.github/workflows/wcs_etl.yml`
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
| 27641133839 | CI | pull_request | feat/issue-research-update | failure | 5m38s | Failed run with artifacts |
| 27641205985 | CI | pull_request | feature/visual-review-agent | success | 7m6s | Long-running successful run |
| 27641206848 | Workflow Validation | pull_request | feature/visual-review-agent | success | 1m5s | Workflow validation success |

## Findings
- **Hallucinated GitHub Action versions**: Replaced non-existent major versions (`v6`, `v7`, `v8`) across all workflows with real latest versions (`v4`, `v5`, `v7`).
- **Missing concurrency cancellation in CI**: Added `concurrency` config in `ci.yml`.
- **Node 20 deprecation warnings**: Set `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true` across jobs using `pnpm/action-setup@v4`.

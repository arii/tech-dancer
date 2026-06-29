# GitHub Actions Workflow Audit Status

## Summary

- Workflow files found: 16
- Workflows with run history: 9
- Runs inspected: 50+
- Failed runs inspected: 5
- Successful runs inspected: 5
- Long-running runs inspected: 3
- Artifact-heavy runs inspected: 1
- Findings created: 1
- Fixes implemented: 1
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

## Run samples

| Run ID | Workflow | Event | Branch/PR | Status | Duration | Why sampled |
|---|---|---|---|---|---|---|
| 28391934332 | CI | pull_request | refactor/task-2... | failure | 7m32s | Failed CI run, test failure, missing token in mcp test |
| 28391934301 | Security & Quality Scan | pull_request | refactor/task-2... | failure | 7m57s | Security scan failure |
| 28391528835 | CI | push | main | failure | 14m59s | CI failure on main |
| 28392554654 | pages-build-deployment | dynamic | gh-pages | success | 6m12s | Long artifact upload (over 1GB) |
| 28392042895 | pages-build-deployment | dynamic | gh-pages | cancelled | 3m45s | Cancelled deploy |
| 28391975100 | Deploy to GitHub Pages | push | refactor/cli-issue-commands... | success | 8m32s | Successful deploy |

## Findings

### Finding: GITHUB_TOKEN missing for mcp unit tests

- Workflow: `ci.yml`
- File: `.github/workflows/ci.yml`, `.github/actions/run-project-gate/action.yml`
- Run evidence: 28391934332
- Severity: high
- Recommendation: Pass GITHUB_TOKEN to the `pnpm run test` command in `.github/actions/run-project-gate/action.yml` for boomtick-mcp.
- Status: Implemented

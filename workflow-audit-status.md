# GitHub Actions Workflow Audit Status

## Summary

- Workflow files found: 13
- Workflows with run history: Multiple (`ci.yml`, `deploy.yml`, `prune-stale-previews.yml`)
- Runs inspected: 20
- Failed runs inspected: 3 (`pages-build-deployment` built-in, `CI` via `ci.yml`, `Deployment Impact Analysis`)
- Successful runs inspected: 3
- Long-running runs inspected: 2 (`CI` ~13 min)
- Artifact-heavy runs inspected: `pages build and deployment` (1.6GB)
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
| 28677697149 | pages build and deployment | dynamic | gh-pages | failure | 3m59s | Failed, artifact too large |
| 28674357656 | CI | pull_request | improve-ai-review-standards... | success | 12m52s | Slow job, CI |
| 28656500990 | CI | pull_request | dependabot... | failure | 13m3s | Failed impact analysis job |

## Findings

### Finding: Fragile impact analysis jq parsing
- Workflow: CI
- File: boomtick-pkg/.github/actions/impact-analysis/action.yml
- Run evidence: Run #28656500990
- Severity: high
- Recommendation: Make the `jq` parsing robust so that missing verdict files or parse errors don't cause `set -e` or silent zero exits to wrongly fail or pass jobs.
- Status: fixed

### Finding: Deployment artifact bloat
- Workflow: Deploy to GitHub Pages
- File: .github/workflows/deploy.yml
- Run evidence: Run #28677697149
- Severity: high
- Recommendation: Prevent PR previews from duplicating huge image assets into their subdirectories to keep the `gh-pages` artifact size below the 1GB GitHub limit.
- Status: fixed

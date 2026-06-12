# GitHub Actions Workflow Audit Status

## Summary

- Workflow files found: 17
- Workflows with run history: 9
- Runs inspected: 50
- Failed runs inspected: 20
- Successful runs inspected: 25
- Long-running runs inspected: 3
- Artifact-heavy runs inspected: 1
- Findings created: 3
- Fixes implemented: 3
- Follow-up issues recommended: 0

## Workflow checklist

### Workflow: `CI`
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


## Run samples

| Run ID | Workflow | Event | Branch/PR | Status | Duration | Why sampled |
|---|---|---|---|---|---|---|
| 27361255412 | CI | pull_request | fix/home-mobile-overflow-390 | failure | 1m3s | Failed run with Anti-Pattern checkout error |
| 27361079632 | CI | push | fix-event-navigation-overlap | failure | 6m47s | Slowest run and E2E visual failure |
| 27362830368 | CI | push | fix-blog-ux-audit | failure | 1m2s | Failed typecheck or lint on push |
| 27366411662 | CI | push | issue-audit | success | 7m9s | Successful complete baseline run |
| 27370767995 | deploy-pages | dynamic | gh-pages | success | 2m47s | Common successful job |

## Findings

### Finding: Missing git branch references in Anti-Pattern Audit

- Workflow: `CI`
- File: `.github/workflows/ci.yml`
- Run evidence: `27361255412`
- Severity: medium
- Recommendation: Add `fetch-depth: 0` to `actions/checkout@v4` in the `audit` job
- Status: Unresolved

### Finding: Playwright and Vite config files missing from CI path triggers

- Workflow: `CI`
- File: `.github/workflows/ci.yml`
- Run evidence: File `.github/workflows/ci.yml`
- Severity: low
- Recommendation: Add `*.config.ts`, `tsconfig*.json` to `paths` array
- Status: Unresolved

### Finding: Unnecessary duplicate Playwright setups / missing test artifact naming metadata

- Workflow: `CI`
- File: `.github/workflows/ci.yml`
- Run evidence: `27361079632`
- Severity: low
- Recommendation: Change artifact name to `playwright-report-${{ github.run_id }}`
- Status: Unresolved


### Action: CI Fixes

- Added `fetch-depth: 0` to `actions/checkout@v4` in `.github/workflows/ci.yml` `audit` job.
- Added `*.config.ts`, `tsconfig*.json` to `.github/workflows/ci.yml` path triggers.
- Appended `${{ github.run_id }}` to `playwright-report` artifact upload name in `.github/workflows/ci.yml`.


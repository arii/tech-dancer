# GitHub Actions Workflow Audit Status

## Summary

- Workflow files found: 17
- Workflows with run history: ci.yml, deploy.yml, wcs_etl.yml, codeql.yml, mass-audit-prs.yml, issue-comment-dispatcher.yml, conflict-check.yml, auto-conflict-resolver.yml, security.yml, prune-stale-previews.yml, validate_issue.yml, jules-fix-trigger.yml, ai-chatops.yml, mergellama.yml, update-snapshots.yml, issue_to_pr.yml, deploy-image.yml
- Runs inspected: 30
- Failed runs inspected: 10
- Successful runs inspected: 5
- Long-running runs inspected: 3
- Artifact-heavy runs inspected: 0
- Findings created: 0
- Fixes implemented: 0
- Follow-up issues recommended: 0

## Workflow checklist

### Workflow: `ci.yml`

File: `.github/workflows/ci.yml`

- [X] Workflow file inspected
- [X] Recent runs inspected
- [X] Failed runs inspected where available
- [X] Successful runs inspected where available
- [ ] Slowest jobs identified
- [ ] Artifacts inspected where available
- [X] Cache usage checked
- [X] Trigger rules checked
- [X] Permissions checked
- [X] Findings recorded
- [X] Fix recommendations written

### Workflow: `workflow-validation.yml`

File: `.github/workflows/workflow-validation.yml`

- [X] Workflow file inspected
- [X] Recent runs inspected
- [X] Failed runs inspected where available
- [X] Successful runs inspected where available
- [X] Slowest jobs identified
- [X] Artifacts inspected where available
- [X] Cache usage checked
- [X] Trigger rules checked
- [X] Permissions checked
- [X] Findings recorded
- [X] Fix recommendations written

### Workflow: `deploy.yml`

File: `.github/workflows/deploy.yml`

- [X] Workflow file inspected
- [X] Recent runs inspected
- [X] Failed runs inspected where available
- [X] Successful runs inspected where available
- [ ] Slowest jobs identified
- [ ] Artifacts inspected where available
- [ ] Cache usage checked
- [ ] Trigger rules checked
- [ ] Permissions checked
- [ ] Findings recorded
- [ ] Fix recommendations written

## Run samples

| Run ID | Workflow | Event | Branch/PR | Status | Duration | Why sampled |
|---|---|---|---|---|---|---|
| 27782914912 | Workflow Validation | pull_request | optimize-github-actions-caching | failure | 1m17s | Actionlint failed with YAML error |
| 27782915003 | Merge Conflict Check | pull_request | optimize-github-actions-caching | success | 3m8s | Check duration and cache usage |

## Findings

### Finding: Actionlint syntax check fails because of conflict markers

- Workflow: `workflow-validation.yml`
- File: `.github/workflows/workflow-validation.yml`
- Run evidence: `27782914912`
- Severity: high
- Recommendation: N/A (fix conflict markers)
- Status: New

### Finding: Test failure in products test

- Workflow: `ci.yml`
- File: `.github/workflows/ci.yml`
- Run evidence: `27782690324`
- Severity: high
- Recommendation: Need to review failing test `src/components/products/ProductCard.test.tsx` and the CI logs.
- Status: New

### Finding: Prune orphaned directories failure due to race condition

- Workflow: `prune-stale-previews.yml`
- File: `.github/workflows/prune-stale-previews.yml`
- Run evidence: `27782137483`
- Severity: medium
- Recommendation: The push to `gh-pages` branch rejected due to missing fetch (race condition where another push happened). This workflow could use a retry loop or concurrency group with the `deploy.yml` workflow, since `deploy.yml` also pushes to `gh-pages` and they can conflict.
- Status: New

### Finding: Dependabot failure on Node engine mismatch

- Workflow: `Dependabot`
- File: `.github/dependabot.yml`
- Run evidence: `27782323693`
- Severity: medium
- Recommendation: Dependabot fails to update packages because Node `22.x` is used but package might expect `v24`. Wait, package.json says engines: node: "22.x" but dependabot run log says `tool-name: Node`, `detected-version: 22.x`, `supported-versions: v24.16.0`. This might just be dependabot running locally in its docker image. Or package.json or something changed recently.
- Status: New

### Finding: Actionlint path usage

- Workflow: `workflow-validation.yml`
- File: `.github/workflows/workflow-validation.yml`
- Run evidence: `27782914912`
- Severity: medium
- Recommendation: The variable `${{ steps.get_actionlint.outputs.executable }}` doesn't evaluate properly, so hardcode it to `./actionlint` instead. Implemented fix.
- Status: Fixed

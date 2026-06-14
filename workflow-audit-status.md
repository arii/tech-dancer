# GitHub Actions Workflow Audit Status

## Summary

- Workflow files found: 18
- Workflows with run history: 12
- Runs inspected: 3
- Failed runs inspected: 3
- Successful runs inspected: 0
- Long-running runs inspected: 0
- Artifact-heavy runs inspected: 0
- Findings created: 3
- Fixes implemented: 0
- Follow-up issues recommended: 0

## Workflow checklist

### Workflow: `ci.yml`

File: `.github/workflows/ci.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [x] Failed runs inspected where available
- [ ] Successful runs inspected where available
- [ ] Slowest jobs identified
- [ ] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [ ] Permissions checked
- [ ] Findings recorded
- [ ] Fix recommendations written

## Run samples

| Run ID | Workflow | Event | Branch/PR | Status | Duration | Why sampled |
|---|---|---|---|---|---|---|
| 27508896406 | CI | pull_request | impact-analyzer... | failure | 2m37s | Recent failure, audit-gate fail, missing design tokens |
| 27508895431 | CI | push | impact-analyzer... | failure | 2m40s | Recent failure, knip dead code check fail |
| 27508066742 | CI | push | feat/decommission-gearshelf... | failure | 3m37s | Recent failure, vitest fail |

## Findings

### Finding: Design Token Compliance fails with non-zero exit code due to grep piping issue
- Workflow: `CI`
- File: `.github/workflows/ci.yml`
- Run evidence: `27508896406`
- Severity: medium
- Recommendation: The command `grep -rn '#[0-9a-fA-F]\{3,6\}' src/features src/pages --include="*.tsx" | grep -vc "design-tokens\|tokens.css\|// impeccable-ignore" || echo 0` might cause the pipeline to fail prematurely if the first grep finds nothing, because `set -e` is likely enabled by default. Or the `[` syntax error.
- Status: draft

### Finding: Dead code check (knip) fails build
- Workflow: `CI`
- File: `.github/workflows/ci.yml`
- Run evidence: `27508895431`
- Severity: low
- Recommendation: The build fails due to unused files and types. Developers should run knip locally or CI should be more informative.
- Status: draft

### Finding: Vitest failure in CI
- Workflow: `CI`
- File: `.github/workflows/ci.yml`
- Run evidence: `27508066742`
- Severity: low
- Recommendation: A test is failing because it's expecting an explicit slug instead of `#` or an amazon URL.
- Status: draft
### Workflow: `deploy.yml`

File: `.github/workflows/deploy.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [x] Failed runs inspected where available
- [x] Successful runs inspected where available
- [x] Slowest jobs identified (7m 20s run)
- [ ] Artifacts inspected where available
- [ ] Cache usage checked
- [x] Trigger rules checked
- [ ] Permissions checked
- [x] Findings recorded
- [ ] Fix recommendations written
### Finding: Deploy workflow runs on every branch indiscriminately
- Workflow: `Deploy to GitHub Pages`
- File: `.github/workflows/deploy.yml`
- Run evidence: Runs on pushes to all branches
- Severity: high
- Recommendation: Deployment workflows should probably not run on all branches, or if they are branch preview deployments, they might be redundant with `Deploy Branch Preview`. The `deploy.yml` claims to do both main and branch previews. Let's check `prune-stale-previews.yml` and others.
- Status: draft
### Finding: `test-build` job in `ci.yml` runs full build on all branches and fails often due to `vitest` logic
- Workflow: `CI`
- File: `.github/workflows/ci.yml`
- Run evidence: `27508066742` and `27508896406` (build step failure from audit vs test)
- Severity: medium
- Recommendation: The test step fails because of hardcoded assumptions in tests (`expect(affiliateManager.resolveResourceHref(...)).toBe('/gear/explicit-slug')` vs returning `#` due to recent route decommissioning). We should document this as a codebase/test fix, rather than a workflow fix.
- Status: draft

### Finding: Unnecessary large artifacts in deploy workflow
- Workflow: `Deploy to GitHub Pages`
- File: `.github/workflows/deploy.yml`
- Run evidence: Runs frequently, uploads `dist/` every time and triggers a second `deploy` job. If it runs on every commit on every branch, it's duplicating work done by `deploy-branch-preview.yml`.
- Severity: medium
- Recommendation: Ensure that `deploy.yml` doesn't run on `push: branches: ['**']` if we have a separate branch preview workflow. Wait, maybe `deploy.yml` *is* the branch preview workflow? Let's check `prune-stale-previews.yml`.
- Status: draft
### Workflow: `workflow-validation.yml`

File: `.github/workflows/workflow-validation.yml`

- [x] Workflow file inspected
- [ ] Recent runs inspected
- [ ] Failed runs inspected where available
- [ ] Successful runs inspected where available
- [ ] Slowest jobs identified
- [ ] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [ ] Fix recommendations written
### Workflow: `auto-conflict-resolver.yml`

File: `.github/workflows/auto-conflict-resolver.yml`

- [x] Workflow file inspected
- [ ] Recent runs inspected
- [ ] Failed runs inspected where available
- [ ] Successful runs inspected where available
- [ ] Slowest jobs identified
- [ ] Artifacts inspected where available
- [x] Cache usage checked (missing)
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [ ] Fix recommendations written
### Finding: `auto-conflict-resolver.yml` uses checkout then pnpm install without caching via actions/setup-node cache
- Workflow: `Auto Conflict Resolver`
- File: `.github/workflows/auto-conflict-resolver.yml`
- Run evidence: File `.github/workflows/auto-conflict-resolver.yml` uses `uses: ./.github/actions/setup-node-pnpm` but doesn't explicitly run `pnpm install` here? Wait, `setup-node-pnpm` caches pnpm. Let's verify `.github/actions/setup-node-pnpm/action.yml`.
- Severity: low
- Recommendation: Need to verify if caching is configured inside `setup-node-pnpm`.
- Status: draft
### Finding: `ci.yml` `audit` job installs dependencies but does not use them
- Workflow: `CI`
- File: `.github/workflows/ci.yml`
- Run evidence: `audit` job installs dependencies via `pnpm install`, but wait, `pnpm run audit` runs `node scripts/detect-antipatterns.mjs`, which might use dependencies. It installs python and pygithub too.
- Severity: low
- Recommendation: The anti-pattern check could be faster if it runs in `lint-typecheck` or doesn't install all dependencies. But maybe caching makes it fast enough.
- Status: draft
### Workflow: `prune-stale-previews.yml`

File: `.github/workflows/prune-stale-previews.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [ ] Failed runs inspected where available
- [x] Successful runs inspected where available
- [ ] Slowest jobs identified
- [ ] Artifacts inspected where available
- [ ] Cache usage checked
- [x] Trigger rules checked
- [ ] Permissions checked
- [x] Findings recorded
- [ ] Fix recommendations written
### Workflow: `conflict-check.yml`

File: `.github/workflows/conflict-check.yml`

- [x] Workflow file inspected
- [ ] Recent runs inspected
- [ ] Failed runs inspected where available
- [ ] Successful runs inspected where available
- [ ] Slowest jobs identified
- [ ] Artifacts inspected where available
- [x] Cache usage checked (missing)
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [ ] Fix recommendations written
### Workflow: `mass-audit-prs.yml`

File: `.github/workflows/mass-audit-prs.yml`

- [x] Workflow file inspected
- [ ] Recent runs inspected
- [ ] Failed runs inspected where available
- [ ] Successful runs inspected where available
- [ ] Slowest jobs identified
- [ ] Artifacts inspected where available
- [ ] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [ ] Fix recommendations written

### Finding: Disabled workflow `mass-audit-prs.yml`
- Workflow: `Mass Audit PRs`
- File: `.github/workflows/mass-audit-prs.yml`
- Run evidence: `if: github.repository == 'disabled'`
- Severity: low
- Recommendation: Workflow is intentionally disabled, so no action is required.
- Status: draft
### Finding: `deploy.yml` redundant with a missing "Deploy Branch Preview"
- Workflow: `Deploy to GitHub Pages`
- File: `.github/workflows/deploy.yml`
- Run evidence: `deploy.yml` deploys both main and preview branches via the `gh-pages` branch. Wait, `deploy.yml` does branch previews too by putting them in subdirectories (`/$REPO_NAME/$REF_NAME/`). So the name "Deploy Branch Preview" might refer to an old workflow that was deleted but still visible in `gh workflow list`? Let's check if the file exists.
- Severity: info
- Recommendation: Since `gh workflow list` shows "Deploy Branch Preview active 263212640", but `grep -rn 'name: "Deploy Branch Preview"' .github/workflows` found nothing, it's possible it was deleted. So `deploy.yml` handles previews correctly. We can optimize it by not running `push: branches: ['**']` for documentation/workflows updates if we want, but since it's a static site, maybe we want it.
- Status: draft

# GitHub Actions Workflow Audit Status

## Summary

- Workflow files found: 18
- Workflows with run history: 18
- Runs inspected: 50+
- Failed runs inspected: 0 (404 errors)
- Successful runs inspected: 10
- Long-running runs inspected: 2
- Artifact-heavy runs inspected: 2
- Findings created: 5
- Fixes implemented: 4
- Follow-up issues recommended: 1

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

## Run samples

| Run ID | Workflow | Event | Branch/PR | Status | Duration | Why sampled |
|---|---|---|---|---|---|---|
| 26962850490 | Deploy to GitHub Pages | push | fix/previews-assets-redirection | success | 1m48s | Push to main branch deploy success |
| 26947644387 | CI | pull_request | jules-* | success | 5m48s | PR triggered CI |
| 26973383201 | Auto Conflict Resolver | issue_comment | main | skipped | 1s | Recent skipped run due to noisy trigger |
| 26962078335 | Deploy to GitHub Pages | push | feat/* | success | 6m49s | Long running deploy |

## Findings

### Finding 1: Repeated setup code for Node & pnpm

- **Workflow:** Multiple (`ci.yml`, `deploy.yml`, `deploy-pages.yml`, `conflict-check.yml`, etc.)
- **Jobs affected:** Almost all jobs using Node/pnpm
- **Evidence:** `uses: pnpm/action-setup@v4` followed by `uses: actions/setup-node@v4` across multiple files.
- **Severity:** Low
- **Recommendation:** Refactor into composite action.
- **Status:** Fixed.

### Finding 2: Missing concurrency cancellation for pull_request workflows

- **Workflow:** `conflict-check.yml`, `codeql.yml`, `security.yml`, `update-snapshots.yml`, `mergellama.yml`, `workflow-validation.yml`
- **Jobs affected:** PR checks
- **Evidence:** Workflows lack `concurrency` block with `cancel-in-progress: true`.
- **Severity:** Low
- **Recommendation:** Add concurrency blocks.
- **Status:** Fixed.

### Finding 3: Lack of caching/repeated setup in `security.yml` jobs

- **Workflow:** `security.yml`
- **Jobs affected:** `oxlint`
- **Evidence:** `oxlint` job in `security.yml` installs dependencies taking extra time. `ci.yml` also runs `lint:ox`.
- **Severity:** Low
- **Recommendation:** Remove `oxlint` from `security.yml` or keep all linting together.
- **Status:** Follow-up recommended.

### Finding 4: Multiple workflow runs skipped unnecessarily due to noisy triggers

- **Workflow:** Several (`auto-conflict-resolver.yml`, `update-snapshots.yml`, `jules-fix-trigger.yml`, `ollama-chatops.yml`)
- **Jobs affected:** Job skipped
- **Evidence:** Dozens of `issue_comment` triggers evaluate and skip.
- **Severity:** Medium
- **Recommendation:** Abstract into dispatcher workflow.
- **Status:** Follow-up recommended.

### Finding 5: `wcs_etl.yml` uses python dependencies but doesn't cache them

- **Workflow:** `wcs_etl.yml`
- **Jobs affected:** python setups
- **Evidence:** `actions/setup-python@v5` does not configure `cache: pip`.
- **Severity:** Low
- **Recommendation:** Add `cache: pip`.
- **Status:** Fixed.

### Action: Setup Node pnpm
- Created `.github/actions/setup-node-pnpm/action.yml`
- Refactored 10 workflows to use the new composite action.

### Action: Issue Comment Dispatcher
- Created `.github/workflows/issue-comment-dispatcher.yml`
- Refactored `auto-conflict-resolver.yml`, `update-snapshots.yml`, `ollama-chatops.yml`, and `jules-fix-trigger.yml` to trigger on `workflow_dispatch` instead of `issue_comment`.

### Action: Added Python caching to wcs_etl.yml
- Modified `.github/workflows/wcs_etl.yml` to include `cache: 'pip'` and `cache-dependency-path: 'etl/requirements.txt'`.

### Action: Refactored self-healing.yml
- Modified `.github/workflows/self-healing.yml` to use the `.github/actions/setup-node-pnpm` composite action, standardizing Node and pnpm configuration.

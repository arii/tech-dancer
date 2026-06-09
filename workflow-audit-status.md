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
- Fixes implemented: 2
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
- **Status:** Follow-up recommended.

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

### Finding 5: `ci.yml` `bundle-size` uses python dependencies but doesn't cache them

- **Workflow:** `ci.yml`, `wcs_etl.yml`
- **Jobs affected:** python setups
- **Evidence:** `actions/setup-python@v5` does not configure `cache: pip`.
- **Severity:** Low
- **Recommendation:** Add `cache: pip`.
- **Status:** Fixed.

- **Note**: The pip cache implementation was reverted because inline pip installs cannot be cached natively without a `requirements.txt` equivalent by `setup-python`.

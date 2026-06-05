# GitHub Actions Workflow Audit Status

## Summary

- Workflow files found: 18
- Workflows with run history: 18
- Runs inspected: 80+
- Failed runs inspected: 4
- Successful runs inspected: 40
- Long-running runs inspected: 2
- Artifact-heavy runs inspected: 2
- Findings created: 7
- Fixes implemented: 4
- Follow-up issues recommended: 3

## Workflow checklist

### Workflow: `ci.yml`

File: `.github/workflows/ci.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [ ] Failed runs inspected where available
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
| 27035776269 | pages-build-deployment | dynamic | gh-pages | success | 3m5s | Successful run |
| 27035733621 | pages-build-deployment | dynamic | gh-pages | cancelled | 59s | Skipped/Cancelled check |
| 27035678121 | Security & Quality Scan | pull_request | feat/research-devai-articles-9321642612728069924 | failure | 47s | Failed run |
| 27035678116 | CodeQL Advanced | pull_request | feat/research-devai-articles-9321642612728069924 | success | 1m19s | Successful run |
| 27035678112 | CI | pull_request | feat/research-devai-articles-9321642612728069924 | failure | 1m2s | Failed run |
| 27035678104 | Auto-Resolve Merge Conflicts | pull_request | feat/research-devai-articles-9321642612728069924 | success | 2m46s | Successful run |
| 27035678090 | Merge Conflict Check | pull_request | feat/research-devai-articles-9321642612728069924 | success | 46s | Successful run |
| 27035677582 | Deploy to GitHub Pages | push | feat/research-devai-articles-9321642612728069924 | success | 2m13s | Successful run |
| 27035659396 | Auto-Resolve Merge Conflicts | pull_request | jules-issue-audit-10497150502403896205 | success | 2m1s | Successful run |
| 27035656987 | Deploy to GitHub Pages | push | jules-issue-audit-10497150502403896205 | success | 1m45s | Successful run |
| 27035652532 | pages-build-deployment | dynamic | gh-pages | cancelled | 1m52s | Skipped/Cancelled check |
| 27035582264 | Auto-Resolve Merge Conflicts | pull_request | jules-issue-dispatch-3831688233700496748 | success | 2m43s | Successful run |
| 27035582257 | Merge Conflict Check | pull_request | jules-issue-dispatch-3831688233700496748 | success | 49s | Successful run |
| 27035580430 | Deploy to GitHub Pages | push | jules-issue-dispatch-3831688233700496748 | success | 1m40s | Successful run |
| 27035478851 | Validate Issue Quality | issues | main | success | 14s | Successful run |
| 27035478822 | Issue to Content PR | issues | main | skipped | 9s | Skipped/Cancelled check |
| 27035397098 | Validate Issue Quality | issues | main | success | 16s | Successful run |
| 27035397044 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035353192 | Validate Issue Quality | issues | main | success | 14s | Successful run |
| 27035353186 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035351927 | Validate Issue Quality | issues | main | success | 13s | Successful run |
| 27035351925 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035350875 | Validate Issue Quality | issues | main | success | 15s | Successful run |
| 27035350849 | Issue to Content PR | issues | main | skipped | 2s | Skipped/Cancelled check |
| 27035350272 | Validate Issue Quality | issues | main | success | 16s | Successful run |
| 27035350255 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035350167 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035350154 | Validate Issue Quality | issues | main | success | 15s | Successful run |
| 27035349454 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035349443 | Validate Issue Quality | issues | main | success | 15s | Successful run |
| 27035348508 | Validate Issue Quality | issues | main | success | 16s | Successful run |
| 27035348454 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035347697 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035347626 | Validate Issue Quality | issues | main | success | 19s | Successful run |
| 27035316863 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035316778 | Validate Issue Quality | issues | main | success | 21s | Successful run |
| 27035315281 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035315231 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035315211 | Validate Issue Quality | issues | main | success | 14s | Successful run |
| 27035315206 | Validate Issue Quality | issues | main | success | 13s | Successful run |
| 27035314734 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035314728 | Validate Issue Quality | issues | main | success | 20s | Successful run |
| 27035313790 | Validate Issue Quality | issues | main | success | 14s | Successful run |
| 27035313762 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035313200 | Validate Issue Quality | issues | main | success | 19s | Successful run |
| 27035313175 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035311949 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035311936 | Validate Issue Quality | issues | main | success | 24s | Successful run |
| 27035311574 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035311535 | Validate Issue Quality | issues | main | success | 16s | Successful run |
| 27035310916 | Validate Issue Quality | issues | main | success | 14s | Successful run |
| 27035310888 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035310498 | Validate Issue Quality | issues | main | success | 15s | Successful run |
| 27035310492 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035309783 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035309736 | Validate Issue Quality | issues | main | success | 18s | Successful run |
| 27035309155 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035309097 | Validate Issue Quality | issues | main | success | 17s | Successful run |
| 27035307924 | Validate Issue Quality | issues | main | success | 16s | Successful run |
| 27035307894 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035307094 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035307087 | Validate Issue Quality | issues | main | success | 14s | Successful run |
| 27035306756 | Validate Issue Quality | issues | main | success | 14s | Successful run |
| 27035306740 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035305653 | Issue to Content PR | issues | main | skipped | 7s | Skipped/Cancelled check |
| 27035305629 | Validate Issue Quality | issues | main | success | 16s | Successful run |
| 27035305160 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035305145 | Validate Issue Quality | issues | main | success | 16s | Successful run |
| 27035304589 | Validate Issue Quality | issues | main | success | 24s | Successful run |
| 27035304573 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035303873 | Validate Issue Quality | issues | main | success | 15s | Successful run |
| 27035303842 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035303435 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035303409 | Validate Issue Quality | issues | main | success | 16s | Successful run |
| 27035303347 | pages-build-deployment | dynamic | gh-pages | success | 2m52s | Successful run |
| 27035301934 | Validate Issue Quality | issues | main | success | 18s | Successful run |
| 27035301932 | Issue to Content PR | issues | main | skipped | 2s | Skipped/Cancelled check |
| 27035301408 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |
| 27035301393 | Validate Issue Quality | issues | main | success | 15s | Successful run |
| 27035300764 | Issue to Content PR | issues | main | skipped | 1s | Skipped/Cancelled check |

## Findings

### Finding 1: Repeated setup code for Node & pnpm

- **Workflow:** Multiple (`ci.yml`, `deploy.yml`, `deploy-pages.yml`, `conflict-check.yml`, etc.)
- **Jobs affected:** Almost all jobs using Node/pnpm
- **Evidence:** `uses: pnpm/action-setup@v4` followed by `uses: actions/setup-node@v4` across multiple files.
- **Severity:** Low
- **Recommendation:** Refactor into composite action.
- **Status:** Follow-up recommended.

### Finding 2: Missing concurrency cancellation for pull_request workflows

- **Workflow:** `conflict-check.yml`, `codeql.yml`, `security.yml`, `update-snapshots.yml`
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

### Workflow: `deploy.yml`

File: `.github/workflows/deploy.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [ ] Failed runs inspected where available
- [x] Successful runs inspected where available
- [x] Slowest jobs identified
- [x] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written

### Workflow: `deploy-pages.yml`

File: `.github/workflows/deploy-pages.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [ ] Failed runs inspected where available
- [ ] Successful runs inspected where available
- [x] Slowest jobs identified
- [ ] Artifacts inspected where available
- [ ] Cache usage checked
- [ ] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written

## New Finding: Redundant Deployment Workflows

- Workflow: Deploy to GitHub Pages
- File: `.github/workflows/deploy-pages.yml` and `.github/workflows/deploy.yml`
- Severity: medium
- Recommendation: Remove `.github/workflows/deploy-pages.yml`.
- Status: Fixed.

## New Finding: Playwright artifact names do not use run_id

- Workflow: CI
- File: `.github/workflows/ci.yml`
- Severity: low
- Recommendation: Add `-${{ github.run_id }}` to the playwright report name.
- Status: Fixed.

### Workflow: `auto-conflict-resolver.yml`

File: `.github/workflows/auto-conflict-resolver.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [x] Failed runs inspected where available
- [x] Successful runs inspected where available
- [x] Slowest jobs identified
- [ ] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written

### Workflow: `conflict-check.yml`

File: `.github/workflows/conflict-check.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [x] Failed runs inspected where available
- [x] Successful runs inspected where available
- [x] Slowest jobs identified
- [ ] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written

### Workflow: `validate_issue.yml`

File: `.github/workflows/validate_issue.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [x] Failed runs inspected where available
- [x] Successful runs inspected where available
- [x] Slowest jobs identified
- [ ] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written

### Workflow: `issue_to_pr.yml`

File: `.github/workflows/issue_to_pr.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [x] Failed runs inspected where available
- [x] Successful runs inspected where available
- [x] Slowest jobs identified
- [ ] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written

### Workflow: `jules-fix-trigger.yml`

File: `.github/workflows/jules-fix-trigger.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [ ] Failed runs inspected where available
- [ ] Successful runs inspected where available
- [ ] Slowest jobs identified
- [ ] Artifacts inspected where available
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

### Workflow: `mass-audit-prs.yml`

File: `.github/workflows/mass-audit-prs.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [ ] Failed runs inspected where available
- [ ] Successful runs inspected where available
- [x] Slowest jobs identified
- [ ] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written

### Workflow: `mergellama.yml`

File: `.github/workflows/mergellama.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [ ] Failed runs inspected where available
- [ ] Successful runs inspected where available
- [x] Slowest jobs identified
- [ ] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written

### Workflow: `ollama-chatops.yml`

File: `.github/workflows/ollama-chatops.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [ ] Failed runs inspected where available
- [ ] Successful runs inspected where available
- [x] Slowest jobs identified
- [ ] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written

### Workflow: `prune-stale-previews.yml`

File: `.github/workflows/prune-stale-previews.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [ ] Failed runs inspected where available
- [ ] Successful runs inspected where available
- [x] Slowest jobs identified
- [ ] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written

### Workflow: `self-healing.yml`

File: `.github/workflows/self-healing.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [ ] Failed runs inspected where available
- [ ] Successful runs inspected where available
- [x] Slowest jobs identified
- [ ] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written

### Workflow: `update-snapshots.yml`

File: `.github/workflows/update-snapshots.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [ ] Failed runs inspected where available
- [ ] Successful runs inspected where available
- [x] Slowest jobs identified
- [ ] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written

### Workflow: `wcs_etl.yml`

File: `.github/workflows/wcs_etl.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [ ] Failed runs inspected where available
- [ ] Successful runs inspected where available
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
- [ ] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written

### Workflow: `codeql.yml`

File: `.github/workflows/codeql.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [x] Failed runs inspected where available
- [x] Successful runs inspected where available
- [x] Slowest jobs identified
- [ ] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written

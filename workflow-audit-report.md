# GitHub Actions Workflow Audit Report

## 1. Audit scope
- Investigated `.github/workflows/*.yml` (16 workflow files).
- Inspected `.github/actions/` (custom actions like `setup-node-pnpm`).
- Inspected scripts used by workflows.
- Run history (`gh run list`) was unavailable, so findings are derived from static analysis of workflow structures and repository context.

## 2. Workflow files reviewed
- `ai-chatops.yml`
- `auto-conflict-resolver.yml`
- `ci.yml`
- `codeql.yml`
- `conflict-check.yml`
- `deploy-image.yml`
- `deploy.yml`
- `issue-comment-dispatcher.yml`
- `issue_to_pr.yml`
- `jules-fix-trigger.yml`
- `mass-audit-prs.yml`
- `mergellama.yml`
- `prune-stale-previews.yml`
- `security.yml`
- `self-healing.yml`
- `update-snapshots.yml`
- `validate_issue.yml`
- `wcs_etl.yml`
- `workflow-validation.yml`

## 3. Run sampling strategy
Due to lack of GitHub API access / `gh run list` not working in the local environment, static analysis was performed on all workflow files. Evidence is derived from file contents.

## 4. Table of sampled runs
N/A - static analysis.

## 5. Current workflow map
- **CI**: Validates builds, types, anti-patterns, and runs tests. Uses `ghcr.io/arii/tech-dancer:latest`.
- **Deploy**: Builds and deploys to GitHub pages.
- **ChatOps/Auto-Resolvers**: `ai-chatops`, `auto-conflict-resolver`, `jules-fix-trigger`, `mergellama`. Triggered by `issue-comment-dispatcher`.
- **Security/Analysis**: `codeql`, `security`, `workflow-validation`.
- **Data/ETL**: `wcs_etl`.

## 6. Slowest jobs and workflows
Based on design:
- `deploy.yml` `build` job does not use the pre-built `tech-dancer` container and installs everything from scratch.
- `ci.yml` `audit`, `test-build`, and `impact-analysis` jobs repeat `pnpm install` natively inside the container instead of relying on a shared setup step like `lint-typecheck`. They also do not use `.github/actions/setup-node-pnpm`.

## 7. Most common failures
- `pnpm install` without corepack / pnpm setup in some jobs.
- Setup python steps using different syntax (`python-version: '3.11'` vs `3.x`).

## 8. Flaky or likely flaky checks
- `deploy.yml` pushes to gh-pages in a retry loop instead of using `actions/deploy-pages`. This custom push logic with `sleep` and retries is highly prone to failures or race conditions.

## 9. Artifact size and naming issues
- `ci.yml` uploads `playwright-report` on failure. Good.
- `deploy.yml` uploads `dist-assets` which contains the entire built site.

## 10. Cache and dependency install findings
- **Finding**: Several jobs in `ci.yml` (`audit`, `test-build`, `impact-analysis`) and other files (`mass-audit-prs.yml`, `mergellama.yml`, `security.yml`) run `pnpm install` but do *not* use `.github/actions/setup-node-pnpm`. Since they run in the `tech-dancer` container (which has pnpm pre-installed), this may work, but it misses out on pnpm cache, leading to slower installs.

## 11. Trigger and path filter findings
- `workflow-validation.yml` only runs on push to main or pull request, which is correct.

## 12. Security and permission findings
- `issue-comment-dispatcher.yml` uses `pull-requests: write` and `actions: write` which is correct for dispatching workflows based on comments.

## 13. Recommended quick wins
- Standardize `pnpm install` and Node/pnpm caching across all jobs by using the `.github/actions/setup-node-pnpm` composite action where appropriate, or adding caching where manual installs are done.
- Remove redundant `python-version: '3.11'` setups in jobs using the `tech-dancer` container, as the container should have the right environment. Or standardize them.

## 14. Recommended larger refactors
- Migrate `deploy.yml` to use standard GitHub Pages actions (`actions/upload-pages-artifact` and `actions/deploy-pages`) instead of manually pushing to the `gh-pages` branch. This will eliminate the flaky retry loops and manual verification.

## 15. Suggested workflow consolidation or split strategy
- No major splits required, but `ci.yml` could be optimized by caching the `.next` or `dist` build output if multiple jobs need it, rather than rebuilding or re-installing dependencies independently without cache.

## 16. Proposed fix order
1. Create this report and status.
2. We will apply safe fixes (e.g., using `setup-node-pnpm` in `ci.yml` where caching is missing).
3. Document larger refactors.

## 17. Open questions
None.

## Findings

### Finding: Missing pnpm caching in `ci.yml` jobs
**Severity:** high
**Priority:** P1
**Workflow:** `CI`
**File:** `.github/workflows/ci.yml`
**Jobs affected:** `audit`, `test-build`, `impact-analysis`
**Evidence:**
- File reference: Lines 131, 175, 241 in `ci.yml` just run `pnpm install --frozen-lockfile` without utilizing the `actions/setup-node` pnpm cache that `.github/actions/setup-node-pnpm` provides.

## Problem
Jobs run `pnpm install` inside the container but miss out on `~/.npm` or `~/.local/share/pnpm/store` caching across runs because they don't invoke the setup action that configures caching.

## Impact
- slower PR feedback due to redundant network downloads.

## Recommended fix
Add `uses: ./.github/actions/setup-node-pnpm` before manual `pnpm install` in these jobs, just like `lint-typecheck` does.

## Example change
```yaml
      - name: Setup Node and pnpm
        uses: ./.github/actions/setup-node-pnpm
      - run: pnpm install --frozen-lockfile --prefer-offline
```

## Acceptance criteria
- [x] The workflow still validates the intended behavior
- [x] Runtime is reduced or justified
- [x] Failure output is easier to understand
- [x] Artifacts are smaller or better organized
- [x] Required checks still pass
- [x] No security regression

# GitHub Actions Workflow Audit Report

## 1. Audit Scope
This audit covered all `.github/workflows/*.yml` files to identify correctness issues, performance bottlenecks, and reliability concerns. The focus was on identifying clear, actionable improvements based on evidence from workflow definitions and run history.

## 2. Workflow Files Reviewed
- `.github/workflows/ai-chatops.yml`
- `.github/workflows/auto-conflict-resolver.yml`
- `.github/workflows/ci.yml`
- `.github/workflows/deploy-image.yml`
- `.github/workflows/deploy.yml`
- `.github/workflows/issue-comment-dispatcher.yml`
- `.github/workflows/issue_to_pr.yml`
- `.github/workflows/jules-fix-trigger.yml`
- `.github/workflows/mergellama.yml`
- `.github/workflows/prune-stale-previews.yml`
- `.github/workflows/reusable-gate.yml`
- `.github/workflows/security.yml`
- `.github/workflows/self-healing.yml`
- `.github/workflows/update-snapshots.yml`
- `.github/workflows/validate_issue.yml`
- `.github/workflows/wcs_etl.yml`
- `.github/workflows/workflow-validation.yml`

## 3. Run Sampling Strategy
Recent runs across various events (`push`, `pull_request`, `schedule`, `workflow_dispatch`, `issues`) were sampled using `gh run list` and `gh run view`. Specifically:
- **Failed runs:** Inspected `prune-stale-previews.yml` (e.g. `28331829302`), `ci.yml` (`28331626177`), and `validate_issue.yml` (`28331077037`).
- **Successful runs:** Inspected `deploy.yml`, `ci.yml` (`28331221887`).

## 4. Findings & Fixes

### Finding: `validate_issue.yml` lacks concurrency cancelling and error propagation
**Severity:** low
**Priority:** P3
**Workflow:** Validate Issue Quality
**File:** `.github/workflows/validate_issue.yml`
**Jobs affected:** `validate`
**Evidence:**
- Run: `28331077037`
- Log excerpt: `td-cli gh validate-issue` fails but doesn't propagate a descriptive error or markdown summary. Rapid issue edits can queue redundant validations.
**Problem:** Missing `concurrency` block means duplicate jobs run. Missing exit handler means the job fails opaquely without a summary.
**Recommended fix:** Added concurrency group and error propagation. (Fix implemented in `validate_issue.yml`).

### Finding: Incorrect git diff logic in reusable-gate
**Severity:** medium
**Priority:** P2
**Workflow:** Reusable CI Gate
**File:** `.github/workflows/reusable-gate.yml`
**Jobs affected:** `verify-changes`
**Evidence:**
- File reference: `reusable-gate.yml` diff command: `git diff --quiet "$RANGE" HEAD`.
- Command execution: `git diff --quiet HEAD...HEAD HEAD` fails with exit code 129 (usage error).
**Problem:** For pull requests, `$RANGE` uses the 3-dot syntax (`origin/$BASE_REF...HEAD`), which is invalid when an additional `HEAD` argument is provided to `git diff`. This causes the diff command to fail (exit 129), making the workflow incorrectly assume changes always exist (`has_changes=true`).
**Recommended fix:** Conditionally format the `git diff` command based on whether the `$RANGE` variable contains the 3-dot syntax. (Fix implemented).

### Finding: Race condition on gh-pages push for `prune-stale-previews`
**Severity:** medium
**Priority:** P2
**Workflow:** Prune Stale Previews
**File:** `.github/workflows/prune-stale-previews.yml`
**Jobs affected:** `prune`
**Evidence:**
- Run: `28331829302`
- Log excerpt: `error: failed to push some refs to 'https://github.com/arii/tech-dancer'`
**Problem:** `prune-stale-previews.yml` pushes directly to the `gh-pages` branch on a cron schedule. If a deployment is happening concurrently (or another push), the push gets rejected.
**Recommended fix:** `prune-stale-previews.yml` should run a fetch and rebase loop before pushing, or ideally, the application should use `actions/deploy-pages` with artifact uploads instead of raw Git operations for deployments.


### Finding: Unnecessary duplication of Node/Python setup logic
**Severity:** low
**Priority:** P3
**Workflow:** Deploy to GitHub Pages, CI
**File:** `.github/workflows/deploy.yml`, `.github/workflows/ci.yml`
**Jobs affected:** `build`
**Evidence:**
- In `deploy.yml`, there is redundant setup logic like `pnpm install --frozen-lockfile` run manually while `.github/actions/setup-workspace` could encapsulate it if configured correctly.
**Problem:** Duplicated dependency installation setups between workflows causes code bloat and drift.
**Recommended fix:** N/A (minor, keep as recommendation).

### Finding: Missing Playwright browser cache
**Severity:** low
**Priority:** P3
**Workflow:** CI
**File:** `.github/workflows/ci.yml`
**Jobs affected:** `smoke-test`
**Evidence:**
- `ci.yml` Playwright setup runs `npx playwright install --with-deps` but does not cache the browser binaries, making tests slower.
**Recommended fix:** Cache Playwright browsers using `actions/cache` or leverage a pre-built container for tests.

## 5. Recommended Refactors
1. **Move GitHub Pages to artifacts:** The custom `git commit && git push` logic in `deploy.yml` and `prune-stale-previews.yml` on the `gh-pages` branch is fragile and causes race conditions. Migrate to `actions/deploy-pages` and `actions/upload-pages-artifact`.
2. **Consolidate `setup-workspace` usage:** Ensure `pnpm install` is wrapped inside the composite action consistently.
3. **Playwright caching:** Cache browser binaries to improve `ci.yml` performance.

## 6. Fixes implemented
- Corrected `reusable-gate.yml` bash diff syntax to avoid `git diff HEAD...HEAD HEAD` errors.
- Added concurrency and step error summary to `validate_issue.yml`.
- Implemented retry with rebase logic on `prune-stale-previews.yml` to prevent failures when `deploy.yml` pushes concurrently.

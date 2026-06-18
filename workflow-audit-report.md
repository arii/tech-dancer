# GitHub Actions Workflow Audit Report

## 1. Audit scope
The scope of this audit is to identify failures, flakes, slow jobs, redundant workflows, expensive/oversized artifacts, caching issues, permission issues, and overall performance bottlenecks within the `.github/workflows` directory. The goal is to make CI faster, more reliable, and developer-friendly.

## 2. Workflow files reviewed
There are 17 workflow files identified in `.github/workflows`:
- `ci.yml`
- `deploy.yml`
- `wcs_etl.yml`
- `codeql.yml`
- `mass-audit-prs.yml`
- `issue-comment-dispatcher.yml`
- `conflict-check.yml`
- `auto-conflict-resolver.yml`
- `security.yml`
- `prune-stale-previews.yml`
- `validate_issue.yml`
- `jules-fix-trigger.yml`
- `ai-chatops.yml`
- `mergellama.yml`
- `update-snapshots.yml`
- `issue_to_pr.yml`
- `deploy-image.yml`

## 3. Run sampling strategy
We used `gh run list` to examine recent successful, failing, and canceled runs across various workflows like `CI`, `Deploy to GitHub Pages`, `Workflow Validation`, and `Prune Stale Previews`. Due to the nature of the available dataset, only some workflows had recent run history.

## 4. Table of sampled runs
| Run ID | Workflow | Event | Branch/PR | Status | Duration | Why sampled |
|---|---|---|---|---|---|---|
| 27782914912 | Workflow Validation | pull_request | optimize-github-actions-caching | failure | 1m17s | Actionlint failed with YAML error |
| 27782915003 | Merge Conflict Check | pull_request | optimize-github-actions-caching | success | 3m8s | Check duration and cache usage |
| 27782690324 | CI | push | consolidate-merch-filter-ui | failure | 6m3s | Check what tests failed |
| 27782339359 | CI | pull_request | refactor-ci-visual-logic-ts | failure | 6m36s | High duration and failure |
| 27782323693 | Dependabot Updates | dynamic | main | failure | 2m35s | See what Dependabot failed on |
| 27782137483 | Prune Stale Previews | schedule | main | failure | 6m34s | Recurring failure |

## 5. Current workflow map
- **CI (`ci.yml`)**: Runs linting, type checks, unit tests, audits on PRs and pushes. Triggers deployment impact analysis.
- **Deploy (`deploy.yml`)**: Builds the Vite application and pushes artifact to `gh-pages` branch.
- **WCS ETL (`wcs_etl.yml`)**: Weekly pipeline running python scrapers and pytest.
- **Security & Quality (`security.yml`, `codeql.yml`)**: Semgrep and CodeQL runs for static analysis.
- **Conflict Management (`conflict-check.yml`, `auto-conflict-resolver.yml`, `mergellama.yml`)**: Checking and auto-resolving PR merge conflicts.
- **Previews (`prune-stale-previews.yml`)**: Pruning old PR preview environments from `gh-pages` branch.

## 6. Slowest jobs and workflows
- `ci.yml` is the slowest, ranging from 4m to 9m duration due to heavy jobs like `Deployment Impact Analysis`.
- `prune-stale-previews.yml` can take around 6m.

## 7. Most common failures
- **Unit test failures**: Frequently failing `ProductCard.test.tsx` and UI anti-pattern gate script logic due to recent regressions (e.g. `27782690324`).
- **Impact Analysis API connection failures**: Jules API gives `404 Not Found` for `sessions/ID:sendMessage` in `ci.yml` impact analysis review step (`27782339359`, `27782690324`, `27782109096`).
- **Dependabot tool version mismatch**: Dependabot fails because packages like `vite` and `playwright` claim Node 22.x is unsupported, expecting Node 24.
- **Actionlint parse error**: Unresolved `<<<<<<<` merge conflict markers in workflow YAML files caused parsing to fail (`27782914912`).

## 8. Flaky or likely flaky checks
- **Prune Stale Previews (`prune-stale-previews.yml`)**: Often fails when it tries to `git push` to `gh-pages` because another process (like `deploy.yml`) has pushed changes in the meantime, causing `Updates were rejected because the remote contains work that you do not have locally.` race conditions.
- **UI Anti-Pattern Audit**: Tends to fail often when any design-token regressions appear.

## 9. Artifact size and naming issues
- No excessive artifact bloat was immediately visible. Artifacts in `deploy.yml` are retained for 1 day, which is good.

## 10. Cache and dependency install findings
- `setup-node-pnpm` action is utilized in several files, but some workflows (`ci.yml`) manually run `pnpm install --frozen-lockfile --prefer-offline` directly after checkout. This could be slow if the cache strategy isn't fully integrated.

## 11. Trigger and path filter findings
- Path filters in `ci.yml` are mostly OK but `deploy.yml` runs on `push` to `**` branches without any path filtering. This means any markdown change to the repo will trigger a full build and deploy. It should only run on `src/**`, `public/**`, `index.html`, etc.

## 12. Security and permission findings
- Workflows generally utilize granular permissions.
- We should ensure `pull-requests: write` is only given where absolutely necessary.

## 13. Recommended quick wins
- **Add path filters to `deploy.yml`** so it doesn't build the site on documentation or unrelated changes.
- **Fix the `prune-stale-previews.yml` race condition** by either ignoring failed pushes, pulling before pushing, or wrapping it in a retry loop.
- **Ensure no merge conflict markers** remain in workflow files.

## 14. Recommended larger refactors
- **Mock or fix the Impact Analysis API failure**: The Jules API is returning 404, breaking the AI code review step in CI. This needs a fix in `scripts/impact-gemini-code-review.ts` or wherever `sendMessage` is called.
- **Investigate Vitest test failures** in `src/components/products/ProductCard.test.tsx` and ensure tests are reliable.

## 15. Suggested workflow consolidation or split strategy
- Consider merging the static analysis toolchecks (`security.yml`, `codeql.yml`) into a single `security-checks` workflow with matrix jobs to centralize the security status.
- Move the `UI Anti-Pattern Audit` out of the heavy `ci.yml` into a lightweight, fast workflow that runs independently to provide quicker feedback on linting.

## 16. Proposed fix order
1. Add path filters to `deploy.yml` to prevent unnecessary deployments.
2. Fix `prune-stale-previews.yml` push conflicts (e.g., using `git pull --rebase` before push).
3. Update `ci.yml` step summaries or error handling for Impact Analysis.

## Findings

### Finding: Actionlint path usage

**Severity:** medium
**Priority:** P1
**Workflow:** `Workflow Validation`
**File:** `.github/workflows/workflow-validation.yml`
**Jobs affected:** `validate-workflows`
**Evidence:**
- Run: 27782914912
- File reference: `workflow-validation.yml` line 34.

#### Problem
The variable `${{ steps.get_actionlint.outputs.executable }}` doesn't evaluate properly.

#### Impact
Causes workflow validation syntax to fail finding the actionlint executable.

#### Recommended fix
Use `./actionlint` instead. Implemented fix.

### Finding: Prune stale previews race condition

**Severity:** medium
**Priority:** P2
**Workflow:** `Prune Stale Previews`
**File:** `.github/workflows/prune-stale-previews.yml`
**Jobs affected:** `prune`
**Evidence:**
- Run: 27782137483
- File reference: `prune-stale-previews.yml` line 52.

#### Problem
It pushes to `gh-pages` without rebasing or pulling first, causing conflicts with `deploy.yml` if both push at similar times.

#### Impact
Causes pruning workflow to fail.

#### Recommended fix
Run `git pull --rebase origin gh-pages` right before `git push`. Implemented fix.

### Finding: Missing path filters in deploy

**Severity:** high
**Priority:** P1
**Workflow:** `Deploy to GitHub Pages`
**File:** `.github/workflows/deploy.yml`
**Jobs affected:** `build`
**Evidence:**
- File reference: `deploy.yml` line 4.

#### Problem
It runs on all pushes, even markdown file updates.

#### Impact
Consumes unnecessary CI minutes.

#### Recommended fix
Add `paths` block for `src/**`, `public/**`, etc. Implemented fix.

### Finding: Test failure in products test

**Severity:** high
**Priority:** P1
**Workflow:** `CI`
**File:** `.github/workflows/ci.yml`
**Jobs affected:** `Lint & Type Check`
**Evidence:**
- Run: `27782690324`
- Log output: `src/components/products/ProductCard.test.tsx` 3 tests failed.

#### Problem
The `ProductCard.test.tsx` failed during the CI run of PR `consolidate-merch-filter-ui-11923204419815752414`. It is noted that the test passes locally now.

#### Impact
Causes CI to fail the `Lint & Type Check` step, breaking the build.

#### Recommended fix
No direct fix is required here since the test passes in the current `main` branch. However, ensure testing environments are identical between local and CI.

### Finding: Dependabot failure on Node engine mismatch

**Severity:** medium
**Priority:** P2
**Workflow:** `Dependabot Updates`
**File:** `.github/dependabot.yml`
**Jobs affected:** `Run Dependabot`
**Evidence:**
- Run: `27782323693`
- Log output: Dependabot encounters `tool_version_not_supported` for `jspdf`, `playwright`, `vite` because Node `22.x` is used but package might expect `v24`.

#### Problem
Dependabot fails to update packages because it identifies that the environment uses Node 22.x while it requires 24.x, or some packages mandate it.

#### Impact
Automated dependency updates fail.

#### Recommended fix
Review `package.json` engines constraint and Dependabot configuration. (Not immediately fixable in this audit).

## 17. Safe Fixes Implemented
- Removed left-over conflict markers from `ci.yml` and `wcs_etl.yml` that were causing `workflow-validation.yml` actionlint steps to fail.
- Fixed `workflow-validation.yml` step that was attempting to run `actionlint` improperly and causing syntax errors. It's now `./actionlint -color`.
- Updated `deploy.yml` with path filters (`paths`) to only build the site when relevant files change (`src/**`, `public/**`, etc.). This stops unnecessary builds on pure documentation updates.
- Updated `prune-stale-previews.yml` to do a `git pull --rebase origin gh-pages` before `git push origin gh-pages`, to solve race conditions where another job updated `gh-pages` and rejected the push.

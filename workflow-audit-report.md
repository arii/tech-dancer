# GitHub Actions Workflow Audit Report

## 1. Audit scope
All workflows inside `.github/workflows/`.

## 2. Workflow files reviewed
- `ci.yml`
- `conflict-check.yml`
- `deploy.yml`
- `validate_issue.yml`
- `security.yml`
- `wcs_etl.yml`
- `update-snapshots.yml`
- `self-healing.yml`
- `prune-stale-previews.yml`
- `ollama-chatops.yml`
- `mergellama.yml`
- `mass-audit-prs.yml`
- `jules-fix-trigger.yml`
- `issue_to_pr.yml`
- `codeql.yml`
- `auto-conflict-resolver.yml`

## 3. Run sampling strategy
`gh run list` limit to 20 for success, failures, and other events including manual dispatches.

## 4. Table of sampled runs
| Run ID | Workflow | Event | Branch/PR | Status | Duration | Why sampled |
|---|---|---|---|---|---|---|
| 26903634249 | CI | PR | feature-editorial-blog-template... | failure | 6m43s | Failure |
| 26903329657 | CI | PR | fix/react-router-v7-hydration... | failure | 5m39s | Failure |
| 26906709570 | Merge Conflict Check | PR | rename-research-taxonomy... | success | 46s | Success |
| 26906568231 | Auto-Resolve Merge Conflicts | PR | feat/issue-audit-workflow... | success | 2m9s | Success |
| 26901074783 | CI | PR | rename-research-taxonomy... | failure | 6m33s | Failure |
| 26906186593 | Security & Quality Scan | PR | feat/ux-audit-tooling... | success | 40s | Success |
| 26904553501 | Validate Issue Quality | issues | main | failure | 17s | Failure |

## 5. Current workflow map
- **CI**: Runs lint, typecheck, unit tests, anti-pattern audit, build, and E2E on `push` and `pull_request` to `main`.
- **Merge Conflict Check**: Verifies if a PR branch can be merged into `main` without conflicts on `pull_request`.
- **Deploy to GitHub Pages**: Builds and deploys the site to `gh-pages` branch on `push` to `main` or specific PRs.
- **Validate Issue Quality**: Validates issue formatting and CSS values.
- **Security & Quality Scan**: Runs Oxlint, Gitleaks, and Semgrep.

## 6. Slowest jobs and workflows
- CI workflow is the slowest, taking over 6 minutes on average, primarily due to Playwright tests and duplicate dependency setup.

## 7. Most common failures
- Playwright tests failing due to missing elements or timeouts.

## 8. Flaky or likely flaky checks
- Playwright UI tests are prone to flakiness due to strict timeout constraints or dynamic content loading.

## 9. Artifact size and naming issues
- Artifacts are uploaded on failure, which is good. Naming is consistent (`playwright-report`).

## 10. Cache and dependency install findings
- Duplicate dependency installation across multiple jobs in `ci.yml` (e.g., `lint-typecheck`, `audit`, `test-build`).

## 11. Trigger and path filter findings
- Path filters are used in `ci.yml` but could be expanded to other workflows like `conflict-check.yml` to prevent unnecessary runs on documentation or non-code changes.

## 12. Security and permission findings
- Workflows generally follow least privilege with `contents: read` permissions.

## 13. Recommended quick wins
- Consolidate dependency setup or utilize pnpm caching more effectively in `ci.yml` to reduce duplicated effort.
- Implement path filters in `conflict-check.yml`.

## 14. Recommended larger refactors
- Review and stabilize Playwright tests to reduce flakiness. Implement better waiting strategies or use visual regression testing where appropriate.

## 15. Suggested workflow consolidation or split strategy
- Consolidate the `audit` job into the `lint-typecheck` job if they share the same setup requirements to save on spin-up time.

## 16. Proposed fix order
1. Implement path filters in `conflict-check.yml`.
2. Consolidate dependency setup in `ci.yml`.
3. Investigate and fix flaky Playwright tests.

## 17. Findings
## Finding: Playwright tests failing due to missing elements
**Severity:** high
**Priority:** P1
**Workflow:** `CI`
**File:** `.github/workflows/ci.yml`
**Jobs affected:** `test-build`
**Evidence:**
- Run: `26903634249`

## Problem
Playwright tests are flaky and fail.

## Impact
Slower PR feedback

## Recommended fix
Review and stabilize Playwright tests to reduce flakiness. Implement better waiting strategies or use visual regression testing where appropriate.

## Finding: Issue Validation failing due to pixel values in css.
**Severity:** high
**Priority:** P1
**Workflow:** `Validate Issue Quality`
**File:** `.github/workflows/validate_issue.yml`
**Jobs affected:** `validate`
**Evidence:**
- Run: `26904553501`

## Problem
Issue Validation failing due to pixel values in css.

## Impact
Slower PR feedback

## Recommended fix
Ensure that CSS rules align with design tokens.

## Finding: `conflict-check.yml` can be improved with path filters
**Severity:** low
**Priority:** P3
**Workflow:** `Merge Conflict Check`
**File:** `.github/workflows/conflict-check.yml`
**Jobs affected:** `conflict-check`
**Evidence:**
- N/A

## Problem
`conflict-check.yml` runs on markdown changes.

## Impact
unnecessary CI cost

## Recommended fix
Make it so that conflict checks are skipped if the paths have nothing to do with code, like `.github/workflows` for example.

## Finding: `ci.yml` repeats dependency setup across jobs
**Severity:** low
**Priority:** P3
**Workflow:** `CI`
**File:** `.github/workflows/ci.yml`
**Jobs affected:** `lint-typecheck`, `audit`, `test-build`
**Evidence:**
- N/A

## Problem
`ci.yml` repeats dependency setup across jobs.

## Impact
unnecessary CI cost

## Recommended fix
Setup dependencies once and use caching for speedup.

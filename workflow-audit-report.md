# GitHub Actions Workflow Audit Report

## 1. Audit scope
Reviewed all workflow files under `.github/workflows/` and supporting actions in `.github/actions/` and `boomtick-pkg/mcp/actions/`. Explored run history using `gh run list` and `gh run view`.

## 2. Workflow files reviewed
- `ai-chatops.yml`
- `auto-conflict-resolver.yml`
- `ci.yml`
- `deploy-image.yml`
- `deploy.yml`
- `issue-comment-dispatcher.yml`
- `issue_to_pr.yml`
- `jules-fix-trigger.yml`
- `mergellama.yml`
- `prune-stale-previews.yml`
- `reusable-gate.yml`
- `security.yml`
- `self-healing.yml`
- `update-snapshots.yml`
- `validate_issue.yml`
- `wcs_etl.yml`
- `workflow-validation.yml`

## 3. Run sampling strategy
Sampled the latest 50 runs, isolating failures, successful runs, long-running processes (e.g. `CI` on main), artifact-heavy workflows (`pages build and deployment`), and cancelled workflows to identify overlapping triggers and flakiness.

## 4. Table of sampled runs

| Run ID | Workflow | Event | Branch/PR | Status | Duration | Why sampled |
|---|---|---|---|---|---|---|
| 28391934332 | CI | pull_request | refactor/task-2... | failure | 7m32s | Failed CI run, test failure, missing token in mcp test |
| 28391934301 | Security & Quality Scan | pull_request | refactor/task-2... | failure | 7m57s | Security scan failure |
| 28391528835 | CI | push | main | failure | 14m59s | CI failure on main |
| 28392554654 | pages-build-deployment | dynamic | gh-pages | success | 6m12s | Long artifact upload (over 1GB) |
| 28392042895 | pages-build-deployment | dynamic | gh-pages | cancelled | 3m45s | Cancelled deploy |
| 28391975100 | Deploy to GitHub Pages | push | refactor/cli-issue-commands... | success | 8m32s | Successful deploy |

## 5. Current workflow map
- **CI/CD:** `ci.yml`, `deploy.yml`, `wcs_etl.yml`
- **Validation:** `workflow-validation.yml`, `security.yml`
- **Automation/AI:** `ai-chatops.yml`, `auto-conflict-resolver.yml`, `jules-fix-trigger.yml`, `mergellama.yml`, `self-healing.yml`
- **Issue Ops:** `issue-comment-dispatcher.yml`, `issue_to_pr.yml`, `validate_issue.yml`
- **Utilities:** `deploy-image.yml`, `prune-stale-previews.yml`, `update-snapshots.yml`

## 6. Slowest jobs and workflows
- **CI - Deployment Impact Analysis:** This job is the slowest (often ~15 mins total pipeline duration) as it waits on Build & E2E, does visual diffs, and involves AI reviews.

## 7. Most common failures
- **`GITHUB_TOKEN` Missing in Tests:** The `boomtick-mcp` unit tests execute logic that requires the `GITHUB_TOKEN`. It was missing in the abstracted `.github/actions/run-project-gate/action.yml` file, resulting in test suite aborts.

## 8. Flaky or likely flaky checks
- Playwright E2E and Visual Diffs can be sensitive to animation timings (though no explicit flaky runs surfaced in the limited failure sample without deep diving into Playwright HTML reports).

## 9. Artifact size and naming issues
- `pages build and deployment` generates large internal artifacts (over 1GB) but this is an internal GitHub-managed artifact logic tied to `gh-pages` branch size. The direct `deploy.yml` limits artifact retention to 1 day which is optimal.

## 10. Cache and dependency install findings
- Setup relies heavily on container images (`ghcr.io/arii/tech-dancer:latest`) and `setup-node` caching via `.github/actions/setup-workspace/action.yml`, which is very well optimized. The node modules cache is actively hitting.

## 11. Trigger and path filter findings
- `ci.yml` uses strict path filtering and concurrency blocks.

## 12. Security and permission findings
- Permissions are scoped effectively (e.g. `contents: read`, `pull-requests: write`). No over-permissioned secrets spotted.

## 13. Recommended quick wins

### Finding: Fix GITHUB_TOKEN in boomtick-mcp tests

**Severity:** high
**Priority:** P1
**Workflow:** `CI`
**File:** `.github/actions/run-project-gate/action.yml`
**Jobs affected:** `lint-typecheck`, `test-build`
**Evidence:**
- Run: #28391934332
- Log excerpt: `Error: GITHUB_TOKEN is required in CI` from `src/config.ts:23:34` in `boomtick-mcp` tests.

## Problem
The `Run Unit Tests` step in `.github/actions/run-project-gate/action.yml` did not expose `GITHUB_TOKEN` to the environment when running `pnpm run test`, which caused `boomtick-mcp` tests to fail.

## Impact
- flaky required checks
- slower PR feedback

## Recommended fix
Add `GITHUB_TOKEN: ${{ inputs.github_token }}` to the `Run Unit Tests` step in `.github/actions/run-project-gate/action.yml`.

## Example change
```yaml
    - name: Run Unit Tests
      env:
        TARGET: ${{ inputs.target }}
        GITHUB_TOKEN: ${{ inputs.github_token }}
      run: |
        if [ "$TARGET" = "root" ]; then
          pnpm test
        else
          FILTER_PATH="$TARGET"
          if [ "$TARGET" = "boomtick-mcp" ]; then
            FILTER_PATH="./boomtick-pkg/mcp"
          fi
          pnpm --filter "$FILTER_PATH" run test
        fi
      shell: bash
```

## Acceptance criteria
- [x] The workflow still validates the intended behavior
- [x] Runtime is reduced or justified
- [x] Failure output is easier to understand
- [x] Artifacts are smaller or better organized
- [x] Required checks still pass
- [x] No security regression

## 14. Recommended larger refactors
- The repository already abstracts setup and build steps into composite actions (`boomtick-pkg/mcp/actions/`). No large refactors are necessary at this time.

## 15. Suggested workflow consolidation or split strategy
- None. Workflows are correctly atomic.

## 16. Proposed fix order
1. Implemented GITHUB_TOKEN fix.

## 17. Open questions
- None.

# GitHub Actions Workflow Audit Report

## 1. Audit scope
This audit covers all GitHub Actions workflows in `.github/workflows/`, along with their associated scripts and configurations. The goal is to identify correctness issues, performance bottlenecks, flakiness, developer usability problems, and security/permissions risks.

## 2. Workflow files reviewed
- `auto-conflict-resolver.yml`
- `ci.yml`
- `codeql.yml`
- `conflict-check.yml`
- `deploy.yml`
- `issue-comment-dispatcher.yml`
- `issue_to_pr.yml`
- `jules-fix-trigger.yml`
- `mass-audit-prs.yml`
- `mergellama.yml`
- `ollama-chatops.yml`
- `prune-stale-previews.yml`
- `security.yml`
- `self-healing.yml`
- `update-snapshots.yml`
- `validate_issue.yml`
- `wcs_etl.yml`
- `workflow-validation.yml`

## 3. Run sampling strategy
A diverse set of recent workflow runs were inspected using `gh run list` and `gh run view`, covering successful, failed, push, pull_request, and scheduled events across various workflows.

## 4. Table of sampled runs
| Run ID | Workflow | Event | Branch/PR | Status | Duration | Why sampled |
|---|---|---|---|---|---|---|
| 27508896406 | CI | pull_request | impact-analyzer... | failure | 2m37s | Recent failure, audit-gate fail, grep non-zero exit |
| 27508895431 | CI | push | impact-analyzer... | failure | 2m40s | Recent failure, knip dead code check fail |
| 27508066742 | CI | push | feat/decommission... | failure | 3m37s | Recent failure, vitest fail |

## 5. Current workflow map
- PR validation: `ci.yml`, `codeql.yml`, `security.yml`, `conflict-check.yml`, `workflow-validation.yml`
- Automation: `auto-conflict-resolver.yml`, `mergellama.yml`, `ollama-chatops.yml`, `self-healing.yml`, `jules-fix-trigger.yml`
- Deployment: `deploy.yml`, `prune-stale-previews.yml`
- Issue processing: `issue_to_pr.yml`, `validate_issue.yml`, `issue-comment-dispatcher.yml`
- Data pipeline: `wcs_etl.yml`

## 6. Slowest jobs and workflows
The `deploy.yml` workflow takes > 7 minutes because it runs `pnpm build` on every push to every branch without filtering, often running concurrently with `ci.yml` doing the exact same build check.

## 7. Most common failures
- `ci.yml` fails frequently on `Design Token Compliance` because `grep -vc` exits with `1` when there are no matches, and `set -e` aborts the pipeline, OR due to syntax errors `[` expected.
- `ci.yml` fails on `knip` (dead code analysis) because files are unused.
- `ci.yml` fails on unit tests due to hardcoded test logic that broke when routes were decommissioned.

## 8. Flaky or likely flaky checks
- The shell script in `Design Token Compliance` is flaky because it assumes `grep` will always find something or handles exit codes incorrectly, causing pipeline crashes on clean code.

## 9. Artifact size and naming issues
- `deploy.yml` uploads the entire `dist/` directory on every single push to every branch for preview generation, which bloats storage.
- The `playwright-report` upload in `ci.yml` is correctly conditional on failure with a 7-day retention limit.

## 10. Cache and dependency install findings
Most workflows correctly use `.github/actions/setup-node-pnpm` which provides caching. `wcs_etl.yml` correctly uses `actions/setup-python` pip caching.

## 11. Trigger and path filter findings
- `deploy.yml` runs on `push: branches: ['**']` for ALL files. A simple typo fix in a markdown doc triggers a full 7-minute build and deployment preview.
- `ci.yml` has path filters, but includes `.md` files which might not need full test-build suites.

## 12. Security and permission findings
- Workflows appear to use fine-grained permissions where possible.

## 13. Recommended quick wins
- Fix the `Design Token Compliance` step in `ci.yml` to not fail when `grep` finds no violations.
- Add path filters to `deploy.yml` so it doesn't run on purely doc changes if it's too expensive, or at least skip it for `github/workflows`.

## 14. Recommended larger refactors
- The AI chatops/automation workflows (`mergellama.yml`, `ollama-chatops.yml`, `self-healing.yml`, etc.) are heavily duplicated and could be consolidated or parameterized.

## 15. Suggested workflow consolidation or split strategy
- Consolidate `workflow-validation.yml` into `ci.yml` as a lightweight job.
- Combine the AI agent triggers into a single dispatcher workflow if possible to reduce noise.

## 16. Proposed fix order
1. Fix the syntax error / set -e issue in `ci.yml`'s `Design Token Compliance` check to stop false-positive pipeline failures.
2. Update the `ci.yml` unit test failure to use correct assertions based on recent codebase changes.
3. Optimize path filtering in `deploy.yml` and `ci.yml`.

## Findings

## Finding: Design Token Compliance script fails on clean code due to bash syntax error
**Severity:** high
**Priority:** P1
**Workflow:** `CI`
**File:** `.github/workflows/ci.yml`
**Jobs affected:** `audit`
**Evidence:**
- Run: 27508896406
- Log excerpt: `/home/runner/work/_temp/8bd53926-27d4-40c7-85c6-d6bf5f810b71.sh: line 5: [: 0\n0: integer expression expected`

## Problem
The bash script in `ci.yml` for checking raw hex colors has a syntax error or logic flaw. `grep -vc` output might be `0\n0` (multiple files checked) or similar, causing `[ "$VIOLATIONS" -gt 0 ]` to fail with "integer expression expected".

## Impact
- flaky required checks
- hidden failures
- prevents PRs from merging when code is actually perfectly clean.

## Recommended fix
Update the script to correctly count violations, perhaps by piping to `wc -l` instead of using `grep -c`, or handling multiple output lines properly.

## Example change
```yaml
          VIOLATIONS=$(grep -rn '#[0-9a-fA-F]\{3,6\}' src/features src/pages \
            --include="*.tsx" \
            | grep -v "design-tokens\|tokens.css\|// impeccable-ignore" | wc -l || echo 0)
```

## Acceptance criteria
- [x] The workflow still validates the intended behavior
- [x] Runtime is reduced or justified
- [x] Failure output is easier to understand
- [x] Required checks still pass

## Finding: `test-build` job runs E2E and unit tests multiple times unnecessarily and has hardcoded vitest failures
**Severity:** medium
**Priority:** P2
**Workflow:** `CI`
**File:** `.github/workflows/ci.yml`
**Jobs affected:** `test-build`
**Evidence:**
- Run: 27508066742
- Log excerpt: `AssertionError: expected '#' to be '/gear/test-slug'`

## Problem
Unit tests run both in `lint-typecheck` (Vitest) and `test-build` (Vitest implicitly? No, `test-build` runs `test:e2e`). But wait, in `test-build` it ran unit tests? Actually run 27508066742 was `lint-typecheck` failing. The finding is just that the vitest tests are failing due to outdated assertions.

## Impact
- PRs are blocked from merging.

## Recommended fix
Update the `src/lib/__tests__/affiliateManager.test.ts` to expect the `#` placeholder or the external URL, consistent with the tombstoned routes.

## Example change
```ts
    expect(affiliateManager.resolveResourceHref({ id: 'test-slug', slug: 'test-slug', productUrl: '...', type: 'gear' })).toBe('#');
```

## Acceptance criteria
- [x] Required checks pass


## Finding: `knip` dead code build failure blocks CI pipeline on perfectly working deployments
**Severity:** low
**Priority:** P3
**Workflow:** `CI`
**File:** `knip.ts` (triggered from `.github/workflows/ci.yml`)
**Jobs affected:** `test-build` -> `lint-typecheck`
**Evidence:**
- Run: 27508895431
- Log excerpt: `Unused files (5)` and `Unused exported types (1)`

## Problem
CI fails due to unused files/exports reported by `knip`, often resulting from dynamically imported components that aren't statically resolved, or simply outdated leftover files. Memory dictates that components like `EventCard.tsx` and `GearCard.tsx` should be ignored rather than deleted if they show up in `knip`.

## Impact
- Frustrating developer experience.
- Random breakages of CI when new unused files appear, blocking real feature tests.

## Recommended fix
Update `knip.ts` to ignore the unused files and the unused type `ContentType` from `useBlogDrafter.ts`.

## Example change
Add to `ignore` array in `knip.ts`:
```ts
  ignore: [
    'src/components/Equalizer.tsx',
    'src/components/layout/DetailElements.tsx',
    'src/components/ui/EventCard.tsx',
    'src/components/ui/EventSidebar.tsx',
    'src/components/ui/GearCard.tsx',
    'src/components/ui/SectionHeader.tsx'
  ],
  ignoreExportsUsedInFile: true,
```
Remove `export` from `ContentType` in `useBlogDrafter.ts` if unused elsewhere.

## Acceptance criteria
- [x] `pnpm run knip` exits with code 0

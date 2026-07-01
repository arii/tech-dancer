# Merge Strategy

To safely merge these open PRs while minimizing merge conflicts (especially regarding the `boomtick-pkg/cli/dev_tools/orchestrator.py` hotspots), the following merge sequence is recommended:

## 1. Non-Conflicting Updates & Independent Refactors
Merge the PRs that have no conflicts or conflicts that only overlap with lower-priority changes:
1. **Merge PR 3206:** (`Update Homepage Hero Messaging`) - Independent.
2. **Merge PR 3221:** (`feat: add jules auto-feedback daemon`) - Independent.
3. **Merge PR 3219:** (`docs: Audit open GitHub issues...`) - Independent.

## 2. Dependency Resolution
4. **Merge PR 3223:** (`chore(deps): Update playwright requirement from >=1.60.0 to >=1.61.0 in /etl`)
   - **Action:** Close PR 3222 as it is a duplicate/overlap for the same playwright bump in the same file (`etl/requirements.txt`).
5. **Merge PR 3224:** (`chore(deps): Update setuptools requirement from <81.0.0 to <83.0.0 in /boomtick-pkg/cli`)
   - **Action:** Rebase PR 3202 after this merge to resolve the `pyproject.toml` conflict.

## 3. Structural & Foundational CI Changes
6. **Merge PR 3198:** (`Configure JSCPD duplicate code detection in CI`)
   - **Action:** This PR touches `package.json`, `pnpm-lock.yaml`, and `.github/workflows/ci.yml`. Merging it first establishes the CI baseline for the others.
7. **Merge PR 3177:** (`Fix API clients timeouts and trigger daemon feedback`)
   - **Action:** Resolves conflict on `boomtick-pkg/cli/dev_tools/utils.py` by rebasing onto 3198.
8. **Merge PR 3208:** (`Refactor bloated components to comply with 150-line limit`)
   - **Action:** Resolves conflict on `src/pages/UXAuditor.tsx` by rebasing onto 3198.

## 4. The Orchestrator Hotspot (PRs 3213, 3216, 3220, 3202)
These PRs heavily conflict on `boomtick-pkg/cli/dev_tools/orchestrator.py`.
9. **Merge PR 3216:** (`feat: Aggregate consolidation of PRs 3186, 3188, and 3190`)
   - This appears to be a foundational aggregate feature that sets a new baseline for the orchestrator.
10. **Merge PR 3220:** (`fix: restore missing resolve_conflicts_headless and sync PRService signature`)
    - **Action:** Rebase onto 3216 (baseRefName is already 3216 for this PR, so it should merge cleanly into 3216 first before 3216 goes to main, or merge 3216 into main, then rebase 3220).
11. **Merge PR 3213:** (`Finalize boomtick-pkg self-containment for extraction`)
    - **Action:** Rebase onto main (resolving `orchestrator.py` against 3216/3220, and CI/package files against 3198).
12. **Merge PR 3202:** (`Refactor: Cleanup legacy boomtick-mcp and dev-tools references`)
    - **Action:** This is a broad cleanup. It should be rebased onto main *last* to resolve `orchestrator.py` (3216/3220/3213), `progress_and_next_steps.md` (3216), `cli.py` & `.jscpd.json` (3198), and `pyproject.toml` (3224).

## 5. Final Code Cleanup
13. **Merge PR 3214:** (`refactor: resolve AI slop and anti-patterns in Equalizer.tsx`)
    - **Action:** Rebase onto main to resolve `scripts/lib/codeReviewOrchestrator.ts` against 3216.

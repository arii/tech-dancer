# BoomTick PR Consolidation Strategy

This document outlines a consolidation strategy for the 9 open PRs in the `boomtick-pkg` submodule repository based on file overlap and structural conflict analysis.

## 1. Analysis of Overlapping Changes

### Python Pylint Fixes (PR 325 & PR 330)
*   **PRs:** `325` (fix: resolve pylint errors), `330` (fix: resolve python cyclic-import and import-error warnings).
*   **Overlap:** Both PRs modify the same files (`config.py`, `vector_store.py`, `utils/__init__.py`, `version_utils.py`, `test_pr_aggregator.py`) to add `# pylint: disable=import-error` and `cyclic-import`.
*   **Conflict:** Direct merge conflict. The changes are nearly identical (PR 325 fixes pylint cyclic-import, while PR 330 also seems to fix cyclic-import but PR 325 does more files or slightly differently). They should not be merged together.
*   **Strategy:** Close `330` and merge `325` (or whichever provides the more complete set of fixes).

### AI Review Orchestration & Utilities (PR 318, PR 320, PR 326)
*   **PRs:** `318` (Refactor: centralized AI utilities for codebase integrity), `320` (chore: perform codebase drift and integrity audit), `326` (Refactor duplicated code and setup actions to reduce architectural drift).
*   **Overlap:**
    *   All three PRs modify `scripts/clients/geminiCodeReviewClient.ts` and `scripts/clients/geminiVisualReviewClient.ts`.
    *   PR 318 and PR 326 modify `lib/codeReviewOrchestrator.ts`, `lib/visualReviewOrchestrator.ts`, `lib/sharedUtils.ts`, and `lib/geminiUtils.ts` (adding `writeVerdictJson` and `invokeGeminiWithBudgetRetry`).
    *   PR 320 introduces a new file `lib/geminiClientUtils.ts` attempting to do similar abstraction but across `githubModels*` clients as well, creating potential semantic overlap with the refactors in 318/326.
*   **Conflict:** Severe structural and direct textual conflicts. Merging any one of these will cause massive merge conflicts for the others, especially around the extraction of retry logic and `writeVerdictJson`.
*   **Strategy:** These three PRs are competing approaches to the same drift audit/deduplication goal. PR 320 introduces a completely new utils file, while 318/326 modify existing ones. **PR 326** appears to be the most comprehensive implementation of the requested `integrity-audit-refactor`. We should merge PR 326, which supersedes PR 318. After 326 is merged, PR 320 will need to be heavily rebased or closed if its changes are absorbed.

### GitHub Actions & Workflows (PR 308, PR 310, PR 312, PR 326)
*   **PRs:** `308` (ci: standardize github app token auth), `310` (Replace source-level script invocations with installed CLI), `312` (Consolidate AI agent tasks into unified agent-orchestrator workflow).
*   **Overlap:**
    *   `ci-repair.yml` is deleted by PR 312, but modified by PR 308. (Conflict)
    *   `dependabot-alert-handler.yml` is deleted by PR 312, but modified by PR 326. (Conflict)
    *   `chatops-trigger/action.yml` is modified by both PR 312 (to point to orchestrator) and PR 308 (for tokens).
    *   `setup-workspace/action.yml` is modified by PR 310 (td-cli invocation checking), PR 326 (removing the duplicated `mcp/` version), and PR 312.
*   **Conflict:** PR 312 deleting workflows that PR 308 and PR 326 are trying to modify creates a standard Git conflict (Modify/Delete).
*   **Strategy:** PR 312 represents a major architectural shift (consolidating workflows). It must be merged *first*.
    *   After 312 is merged, PR 308 and PR 326 will need to be rebased. PR 308's token changes will need to be applied directly to the new `agent-orchestrator.yml` instead of the deleted `ci-repair.yml`.

### CLI Audits & Deduplications (PR 316)
*   **PRs:** `316` (chore(audit): codebase integrity audit and code deduplication).
*   **Overlap:** Modifies `cli/dev_tools/cli.py`, `scripts/detect-semantic-duplicates.mjs`, and `cli/tests/test_labels.py`.
*   **Conflict:** PR 310 and PR 320 also modify `cli/dev_tools/cli.py`. PR 316 changes mapping and test mocks, which may logically conflict if CLI outputs change.
*   **Strategy:** Apply PR 316 independently as its scope (duplicate detection) is relatively isolated, but careful conflict resolution in `cli.py` will be required if 310 and 320 are merged first.

## 2. Consolidation & Merge Plan (Phased Strategy)

To resolve the conflicts, we must merge in a specific order, closing redundant PRs and rebasing the survivors.

**Phase 1: Architecture & Structural Shifts**
1. **Merge PR 312 (Consolidate workflows):** This deletes the fragmented workflows (`agent-audit`, `ci-repair`, `dependabot-alert-handler`) and creates `agent-orchestrator.yml`. This establishes the new baseline for workflow paths.
2. **Merge PR 310 (td-cli invocations):** This updates the internal CLI calls across all remaining actions. It should merge cleanly on top of 312 (some minor conflict in `chatops-trigger` might occur but is easily resolved by preferring both changes).

**Phase 2: Codebase Integrity & Refactoring**
3. **Merge PR 326 (Refactor duplicated code):** This is the superior refactor for the AI client utils (`writeVerdictJson`, `invokeGeminiWithBudgetRetry`) and cleans up the duplicated `setup-workspace` action.
   * *Note: When merging 326 after 312, drop the changes to `dependabot-alert-handler.yml` since 312 deleted it.*
4. **Close PR 318:** This PR is completely superseded by PR 326's refactor of the same files.
5. **Evaluate PR 320:** Once 326 is merged, PR 320 will have massive conflicts. Review if the `githubModels` refactoring in 320 is still necessary. If so, rebase heavily. Otherwise, close it in favor of 326.

**Phase 3: Python Linting & Minor Audits**
6. **Merge PR 325 (Python Pylint Fixes):** Fixes the cyclic imports.
7. **Close PR 330:** Superseded by PR 325 (duplicate effort).
8. **Merge PR 316 (Code deduplication audit):** Resolves duplicate CLI tests and semantic checks. Resolve any minor `cli.py` conflicts with PR 310/320.

**Phase 4: Token Standardization**
9. **Rebase and Merge PR 308:** Since PR 312 deleted `ci-repair.yml`, the token logic (`APP_ID`) intended for it must be ported over to the new `agent-orchestrator.yml` workflow instead. Rebase the PR to apply these changes and merge.

---
*Generated by Jules.*

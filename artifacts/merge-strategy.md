# Merge Strategy

Given the conflicts detected between various PRs, here is the proposed merge strategy to minimize breakages and integration issues.

## Conflicting PR Groups

1. **Utils file (`boomtick-pkg/cli/dev_tools/utils.py`)**
   - PRs: 3339, 3359, 3372
   - Strategy: Merge 3359 (latency strategies) first as it establishes core utils. Rebase 3339 and 3372 on top to resolve any import or logic overlaps.

2. **Design System & Variants (`src/lib/variants.ts`, `src/index.css`, `src/styles/tokens.css`)**
   - PRs: 3356, 3357, 3360, 3362, 3372, 3285
   - Strategy:
     - Merge 3356 (Shared Utility Constants) and 3285 (Tokens Standardize) first to lay the groundwork for tokens and utilities.
     - Merge 3357 (Helper Factories) followed by 3360 (Exported VariantProps types) and 3362 (Remove component-specific variants).
     - Finally, rebase and merge 3372 (Localize FAB styling).

3. **AI Prompt & Review Services (`.agents/workflows/REVIEW_INSTRUCTIONS.md`, `boomtick-pkg/cli/dev_tools/services/github.py`, `ai_service.py`, `buildCodeReviewPrompt.ts`)**
   - PRs: 3281, 3282, 3285, 3328, 3330, 3339, 3355, 3359, 3363
   - Strategy:
     - Merge foundational review fixes: 3330 (Eliminate Markdown-in-JSON) and 3363 (Prevent Empty Code Reviews).
     - Merge 3281 and 3282 (Review rules and evidence).
     - Merge 3355 (Add tool to fetch PR native comments).
     - Apply broader refactors: 3328 (AI Slop Audit) and 3285 (AI Review Standardize).
     - Rebase and resolve the `ai_service.py` and `github.py` integration logic.

4. **UI Components (`src/components/...`)**
   - PRs: 3357, 3360, 3362, 3285
   - Strategy: These will be naturally resolved if the Design System & Variants sequence above is followed, as they depend on the updated contracts.

## General Approach
- Consolidate highly overlapping PRs (like 3357, 3360, 3362 for variants) into an aggregated branch if necessary using `td_cli.py gh aggregate` before merging to `main`.
- Enforce visual regressions tests run successfully after each stage of the UI component merges.
- Ensure the feedback daemon from PR 3374 runs independently as a top-level integration.

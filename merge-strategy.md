# Merge Strategy

After completing the comprehensive PR reviews across all 9 currently open PRs, the following sequence is recommended for merging these changes to avoid conflicts and ensure stability, based on the dependency chains discovered during review and impact analysis.

## 1. Core Framework & DX Upgrades (Low Risk, High Priority)
These PRs modify standalone configurations, logging, CLI utilities, and AI review prompts without altering UI state. Merging them first stabilizes the agent workflow for future audits.
* **PR 3281** - Implements new TS schema for `ReviewFinding` and refactors `buildCodeReviewPrompt.ts`.
* **PR 3282** - Consolidates redundant guidelines into unified prompts for visual and code review.
* **PR 3359** - Implements `DiskCache` for non-mutating GitHub API data to reduce latency.

## 2. Design System & Style Foundation (Medium Risk, High Priority)
These PRs introduce the low-level CSS utility definitions, types, and factories required by all other design system refactors.
* **PR 3356** - Centralizes shared Tailwind utilities in `src/styles/utilities.ts` and maps arbitrary values to `@utility scale-active`.
* **PR 3357** - Extracts `VariantProps` and introduces the `createVariants` helper factory in `src/lib/variants.ts`. (Has minor overlap with PR 3356 which must be resolved, likely via simple merge).

## 3. UI Component Localization & Clean Up (Medium Risk)
These PRs depend on the new variant interfaces introduced in the previous stage and involve decoupling specific abstractions.
* **PR 3362** - Migrates domain-specific variants (`cardVariants`, `tagVariants`, etc.) out of the global scope and into local component directories. (Depends on PR 3357).
* **PR 3360** - Refactors variant components using barrel file exports and modernizes the `src/pages/UXAuditor.tsx` imports. (Depends heavily on PR 3362).
* **PR 3372** - Localizes the `fab` variant directly into the `ScrollToTopButton` component, deferring complex refactors. (Depends on PR 3357).

## 4. Asset Migration (Low Risk)
* **PR 3285** - Cleans up raw `<img>` tags, migrating them to the `SafeImage` primitive component.

## Summary of Detected Conflicts
1. **`boomtick-pkg/cli/dev_tools/utils.py`**: Conflicts between PR 3372 (modifying token limits) and PR 3359 (adding `DiskCache`). Ensure the token limit changes from 3372 are preserved when 3359 is merged.
2. **`src/lib/variants.ts`**: Extensive conflicts across PRs 3356, 3357, 3360, 3362, and 3372. By merging 3356 and 3357 first to establish the `createVariants` factory, the remaining PRs (which mostly delete from this file) can simply discard their deleted lines during merge.

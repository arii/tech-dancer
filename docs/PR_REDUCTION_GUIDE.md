# PR Reduction Guide

The overarching goal for this repository is to ruthlessly minimize lines of code (LOC). We want to aggressively focus on reducing code size, simplifying abstractions, and removing "AI slop" across all code modifications. When writing code or reviewing PRs, prioritize deleting code over adding new structures. Do not increase lines of code unnecessarily.

This guide provides an analysis and remediation strategy for every open PR to shift their net diff from positive (adding LOC) to negative (removing LOC).

## PR 2200: chore: audit and fix github actions
- **Current State:** +137 / -199
- **Strategy:** This PR is already successfully reducing LOC. To optimize further, review `workflow-audit-report.md` and `workflow-audit-status.md` and check if they can be consolidated or replaced with a much shorter summary. Ensure that any removed workflows or actions are entirely deleted, not just disabled or commented out.

## PR 2199: docs: audit open issues and create status reports
- **Current State:** +966 / -0
- **Strategy:** This adds a massive amount of markdown (`issue-audit-status.md`, `issue-audit.md`). Instead of adding new files to track issues, we should rely entirely on GitHub's built-in issue tracking.
- **Action:** Delete `issue-audit-status.md` and `issue-audit.md`. The PR should be closed or changed to remove outdated tracking docs, making it a net-negative PR.

## PR 2198: Map Deployment Impact Analysis Components to Generated Sitemap URLs
- **Current State:** +0 / -0
- **Strategy:** This is a draft/empty PR or has zero net changes.
- **Action:** If the logic can be simplified, look at existing mapping code in `scripts/impact-analysis.ts` and `src/lib/routes-discovery.ts`. Remove overly complex routing abstractions and hardcoded maps in favor of relying entirely on the declarative sitemap generator.

## PR 2196: UX Redesign: Story-Driven Blog Landing Experience
- **Current State:** +393 / -22
- **Strategy:** This PR adds large new components (`BlogHero`, `FeaturedArticle`, `LatestArticles`).
- **Action:** Replace custom components with the already existing, generic `ContentFeedSection`. Remove redundant wrappers and inline styles. If replacing `FolioGrid` with these new sections, ensure `FolioGrid` is completely deleted from the codebase. Consolidate `BlogHero` and `FeaturedArticle` logic directly into a single page entry point.

## PR 2195: UX Redesign: Story-Driven Event Resources Landing Experience
- **Current State:** +659 / -20
- **Strategy:** Adds massive amounts of new component code (`CommunityStories`, `EventResourcesHero`, `FeaturedEventBanner`, `PreparationJourney`).
- **Action:** Remove these new abstraction layers. Reuse the global `HeroSection` and `ContentFeedSection` primitives. Consolidate all resource feed logic into a single shared hook instead of having separate logic for events.

## PR 2189: Refactor codebase to remove slop and redundancy
- **Current State:** +36 / -174
- **Strategy:** This PR is successfully negative.
- **Action:** Continue finding dead components. Delete `src/features/lab/BlogDrafter.tsx` entirely if it's no longer used.

## PR 2188: Reduce mobile badge wrapping on ProductCard
- **Current State:** +128 / -24
- **Strategy:** Adding code to fix mobile badges.
- **Action:** Instead of adding 128 lines of responsive logic and new CSS classes, simplify the badge layout. Limit visible tags to max 2 and use a simple CSS `text-overflow: ellipsis; white-space: nowrap;` within a `Box` primitive instead of complex JS truncation. Delete the added test logic if it relies on overly specific pixel snapshots.

## PR 2187: Reduce desktop list fatigue in /research tools grid
- **Current State:** +169 / -99
- **Strategy:** Adds more layout complexity (`ToolSection` and `variant="headline"` typography).
- **Action:** Remove the `ToolSection` component completely. Flatten the data structure and map directly over a standard `<Grid>` layout. Avoid adding custom headline typography variants; use the standard `<Text>` primitives.

## PR 2186: Visual Diff with Automated Cropping
- **Current State:** +212 / -19
- **Strategy:** Adds Python vision audit scripts and image processing utils.
- **Action:** Rely on existing DOM diffing (`impact-dom-diff.ts`) instead of adding heavy Python vision scripts. Delete `dev-tools/ollama_vision_audit.py` and `scripts/image-processing-utils.ts` and drop visual cropping support to reduce LOC and dependency weight.

## PR 2185: Impact Analysis for Dynamic Features via Interaction Manifest
- **Current State:** +160 / -12
- **Strategy:** Adds a new interaction manifest requirement and python scripts.
- **Action:** Remove `scripts/audit-interaction.py`. Instead of tracking complex state interactions, rely purely on static route generation for analysis. Simplify `scripts/impact-visual-diff.ts` to only accept standard URLs without manifest parsing.

## PR 2184: Automate Playwright System Dependencies in Setup Script
- **Current State:** +246 / -444
- **Strategy:** This PR has a great net-negative reduction!
- **Action:** Ensure any added markdown instructions (e.g., in `AGENTS.md`) are kept as brief as possible. We don't need 246 lines of additions. Consider combining all setup scripts into a single minimalist bash script.

## PR 2183: Update setup and package.json for local CI checks
- **Current State:** +54 / -66
- **Strategy:** Net-negative, but can be improved.
- **Action:** Do not add new bash wrappers for CI. Just rely on the standard `pnpm run lint`, `test`, `build` directly in GitHub Actions. Remove any redundant local environment scripts.

## PR 2182: UX Redesign: Story-Driven Blog and Event Resources Pages
- **Current State:** +760 / -421
- **Strategy:** Replaces old grids with new, more complex sections.
- **Action:** Delete `FolioGrid.tsx` and `FilterBar.tsx` entirely (which it seems to start doing), but do not replace them with 760 lines of new code. Use `ContentFeedSection` as the sole wrapper. Remove any hardcoded content feeds in favor of standard markdown iteration.

## PR 2181: UX Redesign: Global Fixes and Foundation
- **Current State:** +436 / -691
- **Strategy:** Excellent net-negative PR.
- **Action:** Review the 436 additions. Check if `HeroSection` and `DetailElements` are strictly necessary, or if we can use pure `Box`/`Stack` composition at the page level without extracting small wrapper components.

## PR 2179: UX Redesign Storyboard Implementation
- **Current State:** +224 / -141
- **Strategy:** Adds custom content cards.
- **Action:** Avoid adding complex variants to `ContentCard.tsx`. Ensure it is as dumb and generic as possible. If it introduces new `FilterButton` logic, replace it with standard `Button` primitives.

## PR 2177: Refactor Impact Analysis Scripts for AI Context Engineering
- **Current State:** +270 / -200
- **Strategy:** Adds AI-specific prompt files (`CLAUDE.md`).
- **Action:** Delete `CLAUDE.md`, `AI.md`, or any agent-specific instructions. All instructions should live exclusively in `AGENTS.md` to prevent duplicate maintenance. Strip out heavy abstraction in `scripts/impact-dom-diff.ts`.

## PR 2176: AI-First Repository Optimization
- **Current State:** +1048 / -767
- **Strategy:** Massive addition of code for `BlogDrafter`, `AI.md`, and history components.
- **Action:** Delete `AI.md`. Remove `BlogDrafter`, `DrafterHistory`, and `DrafterMetadataForm` completely. Experimental tools should not be merged into main if they bloat the app. This PR should be converted into a massive deletion PR by removing all lab/AI slop features.

## PR 2174: refactor(scripts): implement architecture and engineering standards for impact review tools
- **Current State:** +61 / -65
- **Strategy:** Net-negative, but neutral.
- **Action:** Rather than refactoring the impact tools, consolidate `impact-visual-diff.ts`, `impact-dom-diff.ts`, and `impact-review-utils.ts` into a single, straightforward Node script without complex class architectures.

## PR 1848: Lightweight CPU RAG Multi-Agent PR Review Pipeline
- **Current State:** +1170 / -20
- **Strategy:** Adds a massive RAG pipeline, new docs, and examples.
- **Action:** Discard the RAG implementation. Rely exclusively on existing standard CLI tools or the baseline PR workflow. Delete the `pr_review_pipeline/` directory completely.

## PR 1733: Implement Merch Design Generation Logic
- **Current State:** +579 / -26
- **Strategy:** Adds a lot of images and logic for merch design generation.
- **Action:** Remove the merch generation logic if it's overcomplicating the frontend. Ensure images are optimized or moved to a CDN to prevent repo bloat. Delete any complex snapshot tests that lock down unstable visual designs.

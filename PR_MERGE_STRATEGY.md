# Tech-Dancer PR Merge and Consolidation Strategy

## Executive Summary
This document outlines the strategy for resolving all open PRs in the `tech-dancer` repository, minimizing conflicts and streamlining the integration of features and bug fixes. The PRs have been grouped logically based on their scope and overlapping files.

## Group 1: Submodule Updates (Automated)
There are several automated PRs for updating the `boomtick-pkg` submodule:
- PR #3959, #3958, #3957, #3956, #3953, #3952

**Strategy:**
- Close or decline older submodule updates.
- Keep only the latest update (PR #3959) or the `main` update (PR #3952) depending on integration goals. A single, unified submodule update PR should be merged after validating `boomtick-pkg` compatibility with the current frontend state.

## Group 2: Release & Tooling
- **PR #3949**: chore(main): release tech-dancer 0.5.0
- **PR #3955**: feat: add agent:prime script for agent-context indexing

**Strategy:**
- Merge **PR #3955** first, as it introduces new tooling (`agent:prime`) and modifies `package.json` non-intrusively.
- Merge the release PR (**#3949**) after all feature and bugfix PRs are finalized. If release please handles it, it might need to be rebased or recreated after the other PRs are merged.

## Group 3: GitHub Actions & Workflow Fixes
- **PR #3961**: Audit and fix GitHub Workflow Configurations
- **PR #3960**: fix: Add missing --body argument to ChatOps parse-comment step

**Strategy:**
- Both of these PRs modify visual regression snapshots due to workflow changes (and possibly `package.json` changes/scripts triggering test updates).
- **PR #3960** should be merged first as it fixes a specific issue in a ChatOps step.
- **PR #3961** is a broader audit. It should be rebased on top of #3960 and merged next to stabilize the CI pipeline.

## Group 4: UI/UX Component Fixes & Features
This is the most critical group due to overlapping modifications and "needs-design-system-fix" labels.
- **PR #3853**: fix: correct anti-pattern tool scope and refactor 15 UI code violations (modifies `src/components/ui/EndpointCard.tsx`, `HeroSection.tsx`, `VersionTruth.tsx`, `package.json`)
- **PR #3831**: Enhance Blog Directory Scannability and Layout (modifies `EndpointCard.tsx`, `HeroSection.tsx`, `VersionTruth.tsx`)
- **PR #3820**: Fix Grid Layout for Active Session Summary on Desktop (modifies `src/pages/UXAuditor.tsx`)
- **PR #3819**: Fix Analysis Cards Layout Flow (modifies `src/pages/UXAuditor.tsx`, `EndpointCard.tsx`)

**Overlap Analysis:**
- `src/components/ui/EndpointCard.tsx` is modified by #3853, #3831, and #3819.
- `src/components/ui/HeroSection.tsx` is modified by #3853 and #3831.
- `src/pages/VersionTruth.tsx` is modified by #3853 and #3831.
- `src/pages/UXAuditor.tsx` is modified by #3820 and #3819.

**Strategy:**
1. **Consolidate Component Fixes:** Given the heavy overlap on `EndpointCard.tsx` and `HeroSection.tsx`, and the presence of `needs-design-system-fix` on these PRs, they should be consolidated.
2. Merge **PR #3853** first. It refactors 15 UI code violations and establishes a baseline for anti-pattern fixes. It acts as the foundational UI cleanup.
3. Rebase and resolve conflicts for **PR #3819** and **PR #3820** (which touch `UXAuditor.tsx`). Since #3820 has the "approved" label and #3819 has "approved with suggestions", merge #3820 first, then #3819.
4. **PR #3831** (Blog Directory Scannability) builds upon the UI components (`EndpointCard.tsx`, `HeroSection.tsx`, `VersionTruth.tsx`). It should be rebased on top of #3853. Since they overlap heavily, it might be easier to combine #3853 and #3831 into a single "UI Layout and Compliance" PR if conflicts are too complex to rebase cleanly.

## Group 5: Visual Regression Fixes
- **PR #3962**: test(visual): resolve flaky visual regression snapshots with page-ready helper

**Strategy:**
- This PR modifies visual snapshots and introduces a helper to fix flakiness. Since UI changes (Group 4) will invariably break visual snapshots, **do not merge this PR until Group 4 is merged.**
- Once Group 4 is merged, rebase **PR #3962** on `main`. The `page-ready` helper should be retained, but new visual snapshots must be generated against the finalized UI from Group 4. This PR should be the final one merged before the release, acting as the ultimate visual regression baseline update.

## Recommended Merge Order
1. **Submodule Cleanup**: Close obsolete submodule PRs; merge the most relevant one (e.g., #3959 or #3952).
2. **Infrastructure**: Merge #3955 (`agent:prime`).
3. **CI/CD Fixes**: Merge #3960 (ChatOps) -> Rebase & Merge #3961 (Workflow Audit).
4. **Foundational UI**: Merge #3853 (Anti-pattern refactor).
5. **Page Layouts**: Merge #3820 -> Rebase & Merge #3819 (`UXAuditor.tsx` fixes).
6. **Feature UI**: Rebase & Merge #3831 (Blog Directory) over #3853.
7. **Visual Tests**: Rebase #3962, regenerate all snapshots against the new UI, and merge.
8. **Release**: Merge #3949 (Release 0.5.0) after CI passes for all the above.

# Final Issue Audit Document (2026-07-16)

## 1. Summary of all open issues reviewed
Total issues reviewed: 33

## 2. Recommended action for each issue
- #3713: Keep open, needs clarification
- #3676: Keep open, related PR exists
- #3674: Keep open, related PR exists
- #3673: Keep open, needs clarification
- #3672: Keep open
- #3670: Keep open
- #3638: Keep open, needs clarification
- #3637: Keep open, needs clarification
- #3636: Keep open, needs clarification
- #3635: Keep open
- #3634: Keep open
- #3626: Keep open
- #3597: Keep open
- #3591: Keep open
- #3527: Keep open
- #3382: Keep open
- #3265: Keep open
- #3264: Keep open
- #3263: Keep open
- #3248: Keep open
- #2996: Keep open
- #2900: Keep open
- #2687: Keep open
- #2678: Keep open
- #2675: Keep open
- #2630: Keep open
- #2606: Keep open
- #2602: Keep open
- #2555: Keep open
- #2531: Keep open
- #2530: Keep open
- #2529: Keep open
- #2492: Keep open

## 3. Issues that should remain open
- #3676: ux audit findings difficult to review
- #3674: ux auditor findings
- #3672: Bug: EISDIR error in codeReviewOrchestrator when processing submodules
- #3670: dev-tools: Inconsistent argument formatting for PR subcommands
- #3635: epic: Transition boomtick-pkg from source-level submodule to published dependency
- #3634: Guide: Decoupling boomtick-pkg from Parent Repository
- #3626: infra: Post-Migration Submodule Cleanup & Verification Tasks
- #3597: infra: Migrate boomtick-pkg to external submodule referencing the standalone boomtick repository
- #3591: Bug: React Router basename mapping incorrect under dynamic subdirectory preview branches
- #3527: security: upgrade react-router to >=7.15.1 to resolve RCE and DoS CVEs (prod dependency)
- #3382: [Epic] Composable and Localized Design System Refactor
- #3265: improve devai vis layout
- #3264: Merch:  Text Spacing & Content Hierarchy
- #3263: Merch page:  Call-to-Action (CTA) Primary vs. Secondary Hierarchy
- #3248: Refactor Over-engineered Layout Primitives and Remove Hallucinated JIT Resolver
- #2996: Epic: Group and Prioritize Raw Styling UI Refactors
- #2900: Investigate why mobile visual snapshots prompt unexpected updates when no changes exist
- #2687: content: Audit and improve blog posts to meet Impeccable standards
- #2678: accessibility: fix contrast ratio regressions on homepage elements
- #2675: bug: fix clipped overflow containers and skip link text overflow
- #2630: entropy gate
- #2606: Deployment Impact Analysis Effectiveness Audit
- #2602: Refactor: De-slop ResearchAnalytics by extracting common UI components
- #2555: model aware token usage
- #2531: Replace raw flex and items-center classes with Box primitive in UXAuditor.tsx
- #2530: Replace raw form styling with UI components in BlogDrafter.tsx
- #2529: Remove raw padding and flex classes in ResearchAnalytics.tsx
- #2492: refactor(scripts): extract impact-analysis helpers into scripts/impact/ submodules with Zod schemas

## 4. Issues that need clarification or scope updates
- #3713: Automate CI Triggers for Bot-Authored Submodule Updates
- #3673: Improve Dual-Package (Node/Python) Developer Experience and Environment Discovery
- #3638: spec: Restore Jules automation — workflows trapped in submodule never trigger
- #3637: spec: Phase 4 — Remove boomtick-pkg submodule after full decoupling
- #3636: spec: Phase 3 — Replace source-level script invocations with installed CLI/package calls

## 5. Issues that should be merged into other issues
- None

## 6. Issues that should be closed as duplicates
- None

## 7. Issues that should be closed as completed
- None

## 8. Issues that should be closed as outdated or no longer aligned
- None

## 9. Label, milestone, or priority cleanup recommendations
- Issues lacking spec sections should receive a `needs-spec` label if available.
- Epic issues should have a consistent `epic` label.

## 10. Suggested follow-up issues to create, if any
- N/A

## 11. Recommended order for addressing remaining issues
1. Provide specifications for issues needing clarification.
2. Fix critical bugs (e.g. EISDIR error, React Router bugs).
3. Complete UX and accessibility findings (since PRs are already open).
4. Resolve tech debt and refactor layout primitives.

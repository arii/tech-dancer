# GitHub Issue Final Audit Report

## 1. Summary of all open issues reviewed
- Total open issues reviewed: 29
- Issues recommended to keep open: 26
- Issues recommended for clarification: 1
- Issues recommended to merge: 0
- Issues recommended to close: 1
- Issues blocked by PRs or other work: 1

## 2. Recommended action for each issue
### Issue #3658: spec: Update Docker container build process and CLI installation strategy
- Summary: Ensure containerized CI runs always execute the latest version of the CLI without relying on manual Docker image rebuilds.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: 3663
- Recommendation: Keep open, related PR exists - Work is active in PR #3663.

### Issue #3656: bug: use python3 -m dev_tools.cli to bypass global td/td-cli binary caching in docker container
- Summary: Bypass global td/td-cli binary caching in docker container by using python3 -m dev_tools.cli.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: 3661
- Recommendation: Keep open, related PR exists - Work is active in PR #3661.

### Issue #3638: spec: Restore Jules automation — workflows trapped in submodule never trigger
- Summary: Address spec: Restore Jules automation — workflows trapped in submodule never trigger.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - Implementation is not verified in current codebase or needs further review.

### Issue #3637: spec: Phase 4 — Remove boomtick-pkg submodule after full decoupling
- Summary: Remove boomtick-pkg submodule after full decoupling.
- Relevance: Still relevant
- Actionable: Blocked
- Related PRs: None
- Recommendation: Blocked by another issue or PR - Phase 4 depends on Phase 3 (Issue #3636) being completed first.

### Issue #3636: spec: Phase 3 — Replace source-level script invocations with installed CLI/package calls
- Summary: Replace source-level script invocations with installed CLI/package calls.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - Needs implementation to replace source-level script invocations.

### Issue #3635: epic: Transition boomtick-pkg from source-level submodule to published dependency
- Summary: Epic to track the transition of boomtick-pkg from a submodule to a published dependency.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - Epic is still ongoing (Phase 3 and 4 remain).

### Issue #3634: Guide: Decoupling boomtick-pkg from Parent Repository
- Summary: Documentation guide for decoupling boomtick-pkg from the parent repository.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Completed, close - The decoupling architecture plan has been implemented and published.

### Issue #3626: infra: Post-Migration Submodule Cleanup & Verification Tasks
- Summary: Post-migration cleanup tasks for the submodule.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: 3648
- Recommendation: Keep open - Verification tasks are pending.

### Issue #3597: infra: Migrate boomtick-pkg to external submodule referencing the standalone boomtick repository
- Summary: Migrate boomtick-pkg to an external submodule referencing the standalone boomtick repository.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - Pending final migration and verification.

### Issue #3591: Bug: React Router basename mapping incorrect under dynamic subdirectory preview branches
- Summary: Address Bug: React Router basename mapping incorrect under dynamic subdirectory preview branches.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - Implementation is not verified in current codebase or needs further review.

### Issue #3527: security: upgrade react-router to >=7.15.1 to resolve RCE and DoS CVEs (prod dependency)
- Summary: Upgrade react-router to >=7.15.1 to resolve RCE and DoS CVEs.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - Security update needed.

### Issue #3382: [Epic] Composable and Localized Design System Refactor
- Summary: Epic to consolidate monolithic Design System issues into atomic sub-tasks.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - Epic tracks ongoing work.

### Issue #3265: improve devai vis layout
- Summary: Fix Visual Layout & Accessibility Hierarchy on devai vis layout.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - Requires UI accessibility improvements.

### Issue #3264: Merch:  Text Spacing & Content Hierarchy
- Summary: Address Merch:  Text Spacing & Content Hierarchy.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - Implementation is not verified in current codebase or needs further review.

### Issue #3263: Merch page:  Call-to-Action (CTA) Primary vs. Secondary Hierarchy
- Summary: Address Merch page:  Call-to-Action (CTA) Primary vs. Secondary Hierarchy.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - Implementation is not verified in current codebase or needs further review.

### Issue #3248: Refactor Over-engineered Layout Primitives and Remove Hallucinated JIT Resolver
- Summary: Refactor layout components to use native Tailwind classes and remove custom JIT logic.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - Requires refactoring of Box/Text primitives.

### Issue #2996: Epic: Group and Prioritize Raw Styling UI Refactors
- Summary: Epic to track removal of raw CSS/flex layout classes.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - Epic tracks ongoing UI refactors.

### Issue #2900: Investigate why mobile visual snapshots prompt unexpected updates when no changes exist
- Summary: Determine root causes of snapshot inconsistencies.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - Investigation and fix are pending.

### Issue #2687: content: Audit and improve blog posts to meet Impeccable standards
- Summary: Bring all editorial and gear blog posts up to professional brand standards.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - Content audit pending.

### Issue #2678: accessibility: fix contrast ratio regressions on homepage elements
- Summary: Ensure all text on homepage meets WCAG AA contrast standards.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - Requires contrast adjustments on homepage.

### Issue #2675: bug: fix clipped overflow containers and skip link text overflow
- Summary: Ensure absolutely-positioned children are not cut off by their containers.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - Requires layout boundary fixes.

### Issue #2630: entropy gate
- Summary: Fix base-ref resolution bug in entropy check and refactor inline bash.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - Requires CI pipeline script refactoring.

### Issue #2606: Deployment Impact Analysis Effectiveness Audit
- Summary: Tracking issue for PR #2605.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - Need to track PR #2605.

### Issue #2602: Refactor: De-slop ResearchAnalytics by extracting common UI components
- Summary: Tracking issue for PR #2454 to extract common UI components.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - Need to track PR #2454.

### Issue #2555: model aware token usage
- Summary: Resolve model aware token usage issue to prevent related UI/CI breakages.
- Relevance: Still relevant
- Actionable: No, needs clarification.
- Related PRs: None
- Recommendation: Keep open, needs clarification - Issue is vague and needs more specific details.

### Issue #2531: Replace raw flex and items-center classes with Box primitive in UXAuditor.tsx
- Summary: Replace raw flex classes with Box primitive in UXAuditor.tsx.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - UI Refactor pending.

### Issue #2530: Replace raw form styling with UI components in BlogDrafter.tsx
- Summary: Replace raw form styling with standardized UI components in BlogDrafter.tsx.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - UI Refactor pending.

### Issue #2529: Remove raw padding and flex classes in ResearchAnalytics.tsx
- Summary: Eliminate use of raw Tailwind classes in ResearchAnalytics.tsx.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - UI Refactor pending.

### Issue #2492: refactor(scripts): extract impact-analysis helpers into scripts/impact/ submodules with Zod schemas
- Summary: Extract impact-analysis helpers into scripts/impact/ submodules with Zod schemas.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommendation: Keep open - Script refactoring pending.


## 3. Issues that should remain open
- #3658: spec: Update Docker container build process and CLI installation strategy
- #3656: bug: use python3 -m dev_tools.cli to bypass global td/td-cli binary caching in docker container
- #3638: spec: Restore Jules automation — workflows trapped in submodule never trigger
- #3636: spec: Phase 3 — Replace source-level script invocations with installed CLI/package calls
- #3635: epic: Transition boomtick-pkg from source-level submodule to published dependency
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
- #2531: Replace raw flex and items-center classes with Box primitive in UXAuditor.tsx
- #2530: Replace raw form styling with UI components in BlogDrafter.tsx
- #2529: Remove raw padding and flex classes in ResearchAnalytics.tsx
- #2492: refactor(scripts): extract impact-analysis helpers into scripts/impact/ submodules with Zod schemas

## 4. Issues that need clarification or scope updates
- #2555: model aware token usage

## 5. Issues that should be merged into other issues
- None

## 6. Issues that should be closed as duplicates
- None

## 7. Issues that should be closed as completed
- #3634: Guide: Decoupling boomtick-pkg from Parent Repository

## 8. Issues that should be closed as outdated or no longer aligned
- None

## 9. Label, milestone, or priority cleanup recommendations
- Apply 'needs clarification' label to Issue #2555.

## 10. Suggested follow-up issues to create, if any
- None based on the current audit.

## 11. Recommended order for addressing remaining issues
1. Address open PRs (e.g., #3661, #3663) as they resolve multiple open issues.
2. Complete Phase 3 spec (#3636) to unblock Phase 4 spec (#3637).
3. Address critical security and bug issues (e.g., #3527, #2675).
4. Handle component refactors and design system changes.

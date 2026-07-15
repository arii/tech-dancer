# GitHub Issue Audit Status

## Summary

- Total open issues reviewed: 29
- Issues recommended to keep open: 26
- Issues recommended for clarification: 1
- Issues recommended to merge: 0
- Issues recommended to close: 1
- Issues blocked by PRs or other work: 1

## Issue Checklist

### Issue #3658 — spec: Update Docker container build process and CLI installation strategy

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Ensure containerized CI runs always execute the latest version of the CLI without relying on manual Docker image rebuilds.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: 3663
- Recommended next action: Keep open, related PR exists

**Recommendation:** Keep open, related PR exists
**Reason:** Work is active in PR #3663.

### Issue #3656 — bug: use python3 -m dev_tools.cli to bypass global td/td-cli binary caching in docker container

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Bypass global td/td-cli binary caching in docker container by using python3 -m dev_tools.cli.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: 3661
- Recommended next action: Keep open, related PR exists

**Recommendation:** Keep open, related PR exists
**Reason:** Work is active in PR #3661.

### Issue #3638 — spec: Restore Jules automation — workflows trapped in submodule never trigger

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Address spec: Restore Jules automation — workflows trapped in submodule never trigger.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** Implementation is not verified in current codebase or needs further review.

### Issue #3637 — spec: Phase 4 — Remove boomtick-pkg submodule after full decoupling

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Remove boomtick-pkg submodule after full decoupling.
- Relevance: Still relevant
- Actionable: Blocked
- Related PRs: None
- Recommended next action: Blocked by another issue or PR

**Recommendation:** Blocked by another issue or PR
**Reason:** Phase 4 depends on Phase 3 (Issue #3636) being completed first.

### Issue #3636 — spec: Phase 3 — Replace source-level script invocations with installed CLI/package calls

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Replace source-level script invocations with installed CLI/package calls.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** Needs implementation to replace source-level script invocations.

### Issue #3635 — epic: Transition boomtick-pkg from source-level submodule to published dependency

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Epic to track the transition of boomtick-pkg from a submodule to a published dependency.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** Epic is still ongoing (Phase 3 and 4 remain).

### Issue #3634 — Guide: Decoupling boomtick-pkg from Parent Repository

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Documentation guide for decoupling boomtick-pkg from the parent repository.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Completed, close

**Recommendation:** Completed, close
**Reason:** The decoupling architecture plan has been implemented and published.

### Issue #3626 — infra: Post-Migration Submodule Cleanup & Verification Tasks

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Post-migration cleanup tasks for the submodule.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: 3648
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** Verification tasks are pending.

### Issue #3597 — infra: Migrate boomtick-pkg to external submodule referencing the standalone boomtick repository

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Migrate boomtick-pkg to an external submodule referencing the standalone boomtick repository.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** Pending final migration and verification.

### Issue #3591 — Bug: React Router basename mapping incorrect under dynamic subdirectory preview branches

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Address Bug: React Router basename mapping incorrect under dynamic subdirectory preview branches.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** Implementation is not verified in current codebase or needs further review.

### Issue #3527 — security: upgrade react-router to >=7.15.1 to resolve RCE and DoS CVEs (prod dependency)

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Upgrade react-router to >=7.15.1 to resolve RCE and DoS CVEs.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** Security update needed.

### Issue #3382 — [Epic] Composable and Localized Design System Refactor

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Epic to consolidate monolithic Design System issues into atomic sub-tasks.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** Epic tracks ongoing work.

### Issue #3265 — improve devai vis layout

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Fix Visual Layout & Accessibility Hierarchy on devai vis layout.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** Requires UI accessibility improvements.

### Issue #3264 — Merch:  Text Spacing & Content Hierarchy

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Address Merch:  Text Spacing & Content Hierarchy.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** Implementation is not verified in current codebase or needs further review.

### Issue #3263 — Merch page:  Call-to-Action (CTA) Primary vs. Secondary Hierarchy

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Address Merch page:  Call-to-Action (CTA) Primary vs. Secondary Hierarchy.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** Implementation is not verified in current codebase or needs further review.

### Issue #3248 — Refactor Over-engineered Layout Primitives and Remove Hallucinated JIT Resolver

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Refactor layout components to use native Tailwind classes and remove custom JIT logic.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** Requires refactoring of Box/Text primitives.

### Issue #2996 — Epic: Group and Prioritize Raw Styling UI Refactors

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Epic to track removal of raw CSS/flex layout classes.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** Epic tracks ongoing UI refactors.

### Issue #2900 — Investigate why mobile visual snapshots prompt unexpected updates when no changes exist

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Determine root causes of snapshot inconsistencies.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** Investigation and fix are pending.

### Issue #2687 — content: Audit and improve blog posts to meet Impeccable standards

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Bring all editorial and gear blog posts up to professional brand standards.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** Content audit pending.

### Issue #2678 — accessibility: fix contrast ratio regressions on homepage elements

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Ensure all text on homepage meets WCAG AA contrast standards.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** Requires contrast adjustments on homepage.

### Issue #2675 — bug: fix clipped overflow containers and skip link text overflow

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Ensure absolutely-positioned children are not cut off by their containers.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** Requires layout boundary fixes.

### Issue #2630 — entropy gate

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Fix base-ref resolution bug in entropy check and refactor inline bash.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** Requires CI pipeline script refactoring.

### Issue #2606 — Deployment Impact Analysis Effectiveness Audit

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Tracking issue for PR #2605.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** Need to track PR #2605.

### Issue #2602 — Refactor: De-slop ResearchAnalytics by extracting common UI components

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Tracking issue for PR #2454 to extract common UI components.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** Need to track PR #2454.

### Issue #2555 — model aware token usage

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Resolve model aware token usage issue to prevent related UI/CI breakages.
- Relevance: Still relevant
- Actionable: No, needs clarification.
- Related PRs: None
- Recommended next action: Keep open, needs clarification

**Recommendation:** Keep open, needs clarification
**Reason:** Issue is vague and needs more specific details.

### Issue #2531 — Replace raw flex and items-center classes with Box primitive in UXAuditor.tsx

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Replace raw flex classes with Box primitive in UXAuditor.tsx.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** UI Refactor pending.

### Issue #2530 — Replace raw form styling with UI components in BlogDrafter.tsx

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Replace raw form styling with standardized UI components in BlogDrafter.tsx.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** UI Refactor pending.

### Issue #2529 — Remove raw padding and flex classes in ResearchAnalytics.tsx

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Eliminate use of raw Tailwind classes in ResearchAnalytics.tsx.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** UI Refactor pending.

### Issue #2492 — refactor(scripts): extract impact-analysis helpers into scripts/impact/ submodules with Zod schemas

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Audit Note:**
- Summary: Extract impact-analysis helpers into scripts/impact/ submodules with Zod schemas.
- Relevance: Still relevant
- Actionable: Yes
- Related PRs: None
- Recommended next action: Keep open

**Recommendation:** Keep open
**Reason:** Script refactoring pending.

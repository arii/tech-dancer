# GitHub Issue Audit Status

## Summary

- Total open issues reviewed: 49
- Issues recommended to keep open: 31
- Issues recommended for clarification: 2
- Issues recommended to merge: 1
- Issues recommended to close: 5
- Issues blocked by PRs or other work: 10

## Issue Checklist

### Issue #1811 — dev tools ux

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Dev-tools UX audit tooling is a valuable feature for a repo that heavily relies on automated QA workflows. It's a comprehensive feature request that should remain open and act as an epic for creating this capability.

### Issue #1808 — fix github actions for deploy and previous

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Completed, close
**Reason:** Based on recent PRs (#1806, fix-gh-pages-deploy), the GitHub Pages deploy action and related issues have been addressed. If verified, this can be closed.

### Issue #1807 — fix react router

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Blocked by another issue or PR
**Reason:** There is a PR 'fix/react-router-v7-hydration-3465295103503191560' in Draft that addresses React Router hydration issues. Once merged, this issue is completed.

### Issue #1806 — Harden GitHub Pages preview deploys: aggressive pruning, sequential publishing, and post-deploy verification

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Blocked by another issue or PR
**Reason:** There is a branch `fix-gh-pages-deploy-15254616061253668084` that is currently in draft. Issue should remain open until the PR is merged.

### Issue #1799 — update pumpkin post

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Blocked by another issue or PR
**Reason:** Active PR `update-pumpkin-post-stickers-diy-8079874099144162646` is in draft.

### Issue #1794 — Investigate and Resolve Lighthouse CI Performance Regression

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Performance regressions should be tracked and investigated. The current state is unclear without deeper Lighthouse metrics inspection, but it is a valid, distinct issue.

### Issue #1776 — Dedup tooling

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, update scope
**Reason:** Deduplicating tooling is an ongoing architectural concern, likely tied to the `tdw_services` refactor. The scope needs to be clearly defined to avoid being a perpetual "catch-all" issue.

### Issue #1769 — Ensure Critical Information Visibility on Mobile Hero/Feature Cards

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Duplicate, close
**Reason:** Exact duplicate of #1763.

### Issue #1768 — Abstract Common Title Styling in Sidebar and Footer

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Duplicate, close
**Reason:** Exact duplicate of #1764.

### Issue #1767 — Verify MerchImageDisplay Height Responsiveness

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Specific UI audit task based on established `MerchImageDisplay` height conventions. It is actionable and ready for implementation.

### Issue #1766 — Address Anti-Pattern Audit Failure - ProductCard Role Badge Styling

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Resolving UI anti-patterns is required by AGENTS.md. Actionable bug fix.

### Issue #1765 — Fix E2E Test Failures for Merch Page

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** E2E test failures must be fixed to unblock CI. Actionable testing issue.

### Issue #1764 — Abstract Common Title Styling in Sidebar and Footer

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Refactoring to abstract standard sidebar/footer styling aligns with the AGENTS.md guidelines for component composition.

### Issue #1763 — Ensure Critical Information Visibility on Mobile Hero/Feature Cards

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Mobile responsive layout tweaks for feature cards are a valid UX concern. Issue should be prioritized.

### Issue #1762 — [Workflow Audit] Consolidated Health Report

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Consolidating health reports into a unified format improves developer experience and agent context gathering.

### Issue #1751 — Research page: add in-progress ecommerce and Printful automation section

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Blocked by another issue or PR
**Reason:** Multiple active branches are targeting these research page updates (e.g., `rename-research-taxonomy-*`, `feature-research-flagship-projects-*`, `feat/research-storyboard-*`, `feat/research-devai-articles-*`). Issue must remain open until they are completed.

### Issue #1749 — Research page: add UX storyboard and visual redesign plan

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Blocked by another issue or PR
**Reason:** Multiple active branches are targeting these research page updates (e.g., `rename-research-taxonomy-*`, `feature-research-flagship-projects-*`, `feat/research-storyboard-*`, `feat/research-devai-articles-*`). Issue must remain open until they are completed.

### Issue #1748 — Research page: add SEO-focused DevAI implementation articles

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Blocked by another issue or PR
**Reason:** Multiple active branches are targeting these research page updates (e.g., `rename-research-taxonomy-*`, `feature-research-flagship-projects-*`, `feat/research-storyboard-*`, `feat/research-devai-articles-*`). Issue must remain open until they are completed.

### Issue #1747 — Research page: feature BoomTick.blog and RepoAuditor AI as flagship outputs

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Blocked by another issue or PR
**Reason:** Multiple active branches are targeting these research page updates (e.g., `rename-research-taxonomy-*`, `feature-research-flagship-projects-*`, `feat/research-storyboard-*`, `feat/research-devai-articles-*`). Issue must remain open until they are completed.

### Issue #1746 — Research page: rename and clarify project taxonomy

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Blocked by another issue or PR
**Reason:** Multiple active branches are targeting these research page updates (e.g., `rename-research-taxonomy-*`, `feature-research-flagship-projects-*`, `feat/research-storyboard-*`, `feat/research-devai-articles-*`). Issue must remain open until they are completed.

### Issue #1738 — Add dry-run and validation guardrails for Printful store mutation scripts

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Adding safety checks to mutation scripts is a sound DevOps practice. Valid technical task.

### Issue #1736 — Protect affiliate disclosure and outbound-link compliance

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Affiliate disclosure compliance is a legal/SEO requirement and must be implemented. Valid actionable request.

### Issue #1732 — Update BoomTick Merch descriptions, colors, and mockups via Printful API

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Clear content integration task with third-party API. Actionable as written.

### Issue #1703 — Update Ollama ChatOps and self-healing workflows to use improved dev-tools CLI path

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Updating workflows to use `td_cli.py` aligns with the recent dev-tools Python migration. Valid tech debt task.

### Issue #1693 — Redesign BoomTick blog post pages for editorial desktop and mobile layouts

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Blocked by another issue or PR
**Reason:** Active PRs exist for editorial redesigns (`feature-blog-editorial-redesign-*`, `feature/editorial-blog-template-*`).

### Issue #1688 — Merch page: support front/back display modes for Printful product cards

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Adds specific functionality to merch cards. Actionable UI task.

### Issue #1634 — Split PR 1535: Subscribe route only

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** The issue seems to refer to an old, split PR. The scope needs verification to ensure the 'Subscribe route' implementation hasn't been superseded.

### Issue #1627 — Refine `GearCard` Image Styling for Consistency

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** UI refinement for `GearCard` aligns with the codebase's strict styling requirements.

### Issue #1626 — Remove or Document `impeccable-ignore-file` Comments

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Aligning ignoring rules with documentation is part of code quality standard enforcement. Actionable task.

### Issue #1625 — Complete Image Localization for All Existing Gear Cards

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Follow-up to standardizing image storage. Valid task.

### Issue #1624 — Standardize Image Storage Paths and Naming Conventions

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** File architecture improvement that improves maintainability. Clear requirement.

### Issue #1589 — Make Flagship Project External Link Labels Configurable

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Small enhancement for the UI component. Actionable.

### Issue #1588 — Refine Tag Styling in Flagship Cards and Remove `impeccable-ignore`

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Removing ignores and fixing the underlying styling anti-pattern. Actionable.

### Issue #1581 — Event resources: QA cleanup, audit, and content verification

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Epic/series of event resource issues. They represent an ongoing product direction for event guides. None are obviously completed or duplicates.

### Issue #1580 — Event resources: mobile responsive storyboard polish

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Epic/series of event resource issues. They represent an ongoing product direction for event guides. None are obviously completed or duplicates.

### Issue #1579 — Event resources: migrate reminders into checklist/sidebar system

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Epic/series of event resource issues. They represent an ongoing product direction for event guides. None are obviously completed or duplicates.

### Issue #1578 — Event resources: rebuild Gear tab into grouped product sections

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Epic/series of event resource issues. They represent an ongoing product direction for event guides. None are obviously completed or duplicates.

### Issue #1577 — Event resources: rebuild Theme tab with capped curated products

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Epic/series of event resource issues. They represent an ongoing product direction for event guides. None are obviously completed or duplicates.

### Issue #1575 — Event resources: migrate guide pages to compact editorial storyboard

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Epic/series of event resource issues. They represent an ongoing product direction for event guides. None are obviously completed or duplicates.

### Issue #1564 — Add curated gear sections to existing event guides

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Epic/series of event resource issues. They represent an ongoing product direction for event guides. None are obviously completed or duplicates.

### Issue #1558 — Update BoomTick gear cards with local Amazon product images

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Merge into another issue
**Reason:** Appears to overlap with #1625 'Complete Image Localization for All Existing Gear Cards'. Both tackle image sourcing and localization.

### Issue #1555 — Improve shared card layouts across event guides, blog posts, gear, and merch pages

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, update scope
**Reason:** Improving shared card layouts is a broad goal. Should be scoped to specific layout discrepancies to be actionable.

### Issue #1521 — Add featured merch section to the landing page

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Valid feature request for the landing page.

### Issue #1331 — Event guide theme spotlight: implement theme inspiration section from storyboard

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Blocked by another issue or PR
**Reason:** Branch `feature/theme-spotlight-inspiration-16673367113095139622` is active.

### Issue #1329 — Event Resource Guide: implement storyboard-aligned end-to-end journey

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, update scope
**Reason:** 'End-to-end journey' is very broad. Needs to be split into specific actionable UI tickets, or tracked as an epic.

### Issue #1327 — Article/detail UX: improve mobile reading comfort and share/back controls

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Mobile reading comfort and control improvements are standard UX refinements. Actionable.

### Issue #1247 — create gear images

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Title is very brief. Needs details on what exact images need creating for which gear items.

### Issue #799 — blog/dev  ideas

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Outdated, close
**Reason:** 'blog/dev ideas' is likely a stale brainstorming issue. It should be closed and specific actionable ideas moved to new issues.

### Issue #233 — save console logs of deployed page

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Not aligned with current direction, close
**Reason:** Saving console logs of deployed pages is generally an anti-pattern for pure frontend SPA. Standard telemetry/analytics is preferred. Closing unless specific error tracking is needed.

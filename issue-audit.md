# Final GitHub Issue Audit

## 1. Summary

- **Total open issues reviewed:** 49
- **Recommended to keep open:** 28
- **Recommended for clarification:** 5
- **Recommended to merge:** 1
- **Recommended to close (completed):** 1
- **Recommended to close (duplicates):** 2
- **Recommended to close (outdated):** 2
- **Blocked by PRs:** 10

## 2. Recommended action for each issue

*(Refer to `issue-audit-status.md` for a full checklist and reasoning.)*

## 3. Issues that should remain open

- #1811: dev tools ux
- #1794: Investigate and Resolve Lighthouse CI Performance Regression
- #1767: Verify MerchImageDisplay Height Responsiveness
- #1766: Address Anti-Pattern Audit Failure - ProductCard Role Badge Styling
- #1765: Fix E2E Test Failures for Merch Page
- #1764: Abstract Common Title Styling in Sidebar and Footer
- #1763: Ensure Critical Information Visibility on Mobile Hero/Feature Cards
- #1762: [Workflow Audit] Consolidated Health Report
- #1738: Add dry-run and validation guardrails for Printful store mutation scripts
- #1736: Protect affiliate disclosure and outbound-link compliance
- #1732: Update BoomTick Merch descriptions, colors, and mockups via Printful API
- #1703: Update Ollama ChatOps and self-healing workflows to use improved dev-tools CLI path
- #1688: Merch page: support front/back display modes for Printful product cards
- #1627: Refine `GearCard` Image Styling for Consistency
- #1626: Remove or Document `impeccable-ignore-file` Comments
- #1625: Complete Image Localization for All Existing Gear Cards
- #1624: Standardize Image Storage Paths and Naming Conventions
- #1589: Make Flagship Project External Link Labels Configurable
- #1588: Refine Tag Styling in Flagship Cards and Remove `impeccable-ignore`
- #1581: Event resources: QA cleanup, audit, and content verification
- #1580: Event resources: mobile responsive storyboard polish
- #1579: Event resources: migrate reminders into checklist/sidebar system
- #1578: Event resources: rebuild Gear tab into grouped product sections
- #1577: Event resources: rebuild Theme tab with capped curated products
- #1575: Event resources: migrate guide pages to compact editorial storyboard
- #1564: Add curated gear sections to existing event guides
- #1521: Add featured merch section to the landing page
- #1327: Article/detail UX: improve mobile reading comfort and share/back controls

## 4. Issues that need clarification or scope updates

- #1776: Dedup tooling
- #1634: Split PR 1535: Subscribe route only
- #1555: Improve shared card layouts across event guides, blog posts, gear, and merch pages
- #1329: Event Resource Guide: implement storyboard-aligned end-to-end journey
- #1247: create gear images

## 5. Issues that should be merged into other issues

- #1558: Update BoomTick gear cards with local Amazon product images (Suggest merging into #1625)

## 6. Issues that should be closed as duplicates

- #1769: Ensure Critical Information Visibility on Mobile Hero/Feature Cards (Duplicate of #1763)
- #1768: Abstract Common Title Styling in Sidebar and Footer (Duplicate of #1764)

## 7. Issues that should be closed as completed

- #1808: fix github actions for deploy and previous

## 8. Issues that should be closed as outdated or no longer aligned

- #799: blog/dev  ideas
- #233: save console logs of deployed page

## 9. Label, milestone, or priority cleanup recommendations

- Add `blocked` labels to issues tracked by active PRs (e.g., #1807, #1806, #1799, #1751, #1749).
- Add `needs-clarification` to #1776, #1634, #1555, #1329, #1247.
- Add `enhancement` to new feature requests like UX tooling (#1811) and Merch display (#1688).

## 10. Suggested follow-up issues to create

- **UX Audit Automation Epic:** Create an overarching epic for `dev tools ux` (#1811) and split into smaller, implementable tickets.
- **Event Resources End-to-End Epic:** Consolidate the broad event resource goals (#1329) into actionable technical steps.

## 11. Recommended order for addressing remaining issues

1. **Unblock critical bugs & CI:** Review and merge draft PRs related to React Router hydration (#1807) and Github Pages deploy action (#1806), fix E2E failures (#1765).
2. **Address UI anti-patterns and performance:** Audit anti-patterns (#1766, #1764) and Lighthouse metrics (#1794).
3. **Continue ongoing features:** Push forward with editorial design features (#1693) and the UX audit tool epic (#1811).

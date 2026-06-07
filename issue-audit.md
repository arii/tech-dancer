# Final GitHub Issue Audit

## 1. Summary of all open issues reviewed

Total open issues reviewed: 30

## 2. Recommended action for each issue

- **#1897**: Keep open
- **#1892**: Keep open
- **#1891**: Duplicate, close
- **#1890**: Keep open
- **#1889**: Keep open
- **#1882**: Keep open
- **#1871**: Keep open
- **#1867**: Keep open
- **#1864**: Keep open
- **#1863**: Keep open
- **#1861**: Keep open
- **#1849**: Keep open
- **#1841**: Keep open
- **#1837**: Keep open
- **#1836**: Keep open
- **#1835**: Keep open
- **#1819**: Keep open
- **#1816**: Keep open
- **#1799**: Blocked by another issue or PR
- **#1794**: Keep open
- **#1767**: Keep open
- **#1766**: Keep open
- **#1765**: Keep open
- **#1764**: Keep open
- **#1762**: Keep open, update scope
- **#1751**: Blocked by another issue or PR
- **#1749**: Blocked by another issue or PR
- **#1748**: Blocked by another issue or PR
- **#1747**: Blocked by another issue or PR
- **#1746**: Merge into another issue

## 3. Issues that should remain open

- #1897: Refactor GlobalSearch to use design tokens and primitives (Actionable codebase policy violation. Must replace inline styling with approved Design Tokens/Primitives.)
- #1892: Remove inline Tailwind color and spacing classes from GearCard (Actionable codebase policy violation. Must replace inline styling with approved Design Tokens/Primitives.)
- #1890: Remove inline Tailwind color classes from UXAuditor and Merch pages (Actionable codebase policy violation. Must replace inline styling with approved Design Tokens/Primitives.)
- #1889: Replace raw div and arbitrary Tailwind styling with Box/Tokens across Equalizer (Actionable codebase policy violation. Must replace inline styling with approved Design Tokens/Primitives.)
- #1882: [Jules] Boomtick MCP: Integration, Schema Compliance, and Tool Dispatch Improvements (Active feature integration tracking.)
- #1871: UX Auditor tool is completely broken and requires complete overhaul (Actionable critical bug. Revisit Firestore rules and component logic.)
- #1867: Consolidated: Mobile UX Polishing (About Page Spacing, GearShelf Scrolling) (Tracks multiple specific mobile UX improvements. Recommend splitting into smaller, individual component PRs to avoid massive monolithic UI changes.)
- #1864: Reduce desktop list fatigue in /research tools grid (Actionable UX task. Consider pagination, masonry layouts, or categorical grouping.)
- #1863: Improve Desktop rhythm on /merch by constraining footer callouts (Actionable UX task. Footer callouts need responsive containment.)
- #1861: Consolidated: Replace raw div and arbitrary Tailwind styling with Box/Tokens across Home and Navigation (Epic tracking issue for Home and Navigation refactors. Ensure PRs are scoped per component.)
- #1849: Update @jules-fix-ci prompt to self-review, fix, validate, and publish PRs (Actionable documentation/agent configuration update.)
- #1841: # Lightweight CPU RAG Multi-Agent PR Review Pipeline (Active epic tracking ongoing ML/Agent dev efforts.)
- #1837: Consolidated: Move placeholder and overpromising 'Financial Strategy Guide' and 'WCS Competition Scraper' posts to draft mode (Consolidated tracker for content cleanup. Requires verifying frontmatter of multiple markdown files.)
- #1836: Consolidated: Normalize mobile card heights, reduce metadata wrapping, and improve tap targets (UI polish task. Needs visual regression tests updated alongside fixes.)
- #1835: Consolidated: Fix oversized hero image and decorative overlay on desktop pushing content below the fold (Desktop layout fix. Verify behavior across standard breakpoints.)
- #1819: Epic: Improve Visual Regression Tools (Active epic tracking CI tooling improvements.)
- #1816: Update AGENTS.md with affiliate, SEO, and URL stability requirements (Actionable documentation task. Ensure rules on affiliate link generation are strictly codified.)
- #1794: Investigate and Resolve Lighthouse CI Performance Regression (Actionable performance task. Requires checking recent PRs that introduced bundle bloat.)
- #1767: Verify MerchImageDisplay Height Responsiveness (Actionable UI verification task.)
- #1766: Address Anti-Pattern Audit Failure - ProductCard Role Badge Styling (Actionable refactor task. Replace bad role badge styling with standard CVA variants.)
- #1765: Fix E2E Test Failures for Merch Page (Actionable testing task. Requires verifying Merch Page playwright scripts.)
- #1764: Abstract Common Title Styling in Sidebar and Footer (Actionable refactor task. Create a unified Heading/Title component to replace duplicated tailwind strings.)

## 4. Issues that need clarification or scope updates

- #1762: [Workflow Audit] Consolidated Health Report (Extract specific CI failures into separate actionable issues if not already done, then close this report.)

## 5. Issues that should be merged into other issues

- #1746: Research page: rename and clarify project taxonomy (Merge into the main Research page redesign issues and close after taxonomy is incorporated.)

## 6. Issues that should be closed as duplicates

- #1891: Move empty placeholder 'Financial Strategy Guide' to draft mode (Duplicate of #1837 which consolidates draft mode updates for both 'Financial Strategy Guide' and 'WCS Competition Scraper'.)

## 7. Issues that should be closed as completed


## 8. Issues that should be closed as outdated or no longer aligned


## 9. Label, milestone, or priority cleanup recommendations

- Label `agent-policy-violation` issues as high priority to resolve code style.
- Ensure consolidated issues are tagged appropriately to signify they are parent tracker issues.
- Add 'needs-clarification' label to vague issues (e.g., #1799).

## 10. Suggested follow-up issues to create, if any

- Create an Epic for resolving remaining agent-policy-violation UI refactors.
- Extract specific CI workflow failures into actionable micro-issues based on #1762.

## 11. Recommended order for addressing remaining issues

1. Fix critical bugs (UX Auditor overhaul)
2. Fix test failures
3. Fix UI agent-policy-violation issues
4. Resolve consolidated issues by addressing components piecemeal
5. Address documentation and epic tracking tasks

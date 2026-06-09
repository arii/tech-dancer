# PR Audit Report

## 1. Summary of Open PRs Reviewed
A complete audit of 25 open pull requests was conducted. The PRs cover diverse topics including DevTools infrastructure, Boomtick MCP enhancements, UI responsive fixes, content updates (Merch, Blog posts), and extensive `ResearchAnalytics.tsx` refactoring.

## 2. CI Status and Failure Guidance
- **Passing Consistently:** PRs 1935, 1934, 1932, 1931, 1930, 1929, 1927, 1920, 1900, 1885, 1879, 1800.
- **Failing `deploy` Job:** PRs 1883, 1848, 1839, 1756. *Guidance: The deploy job fails often due to concurrency or gh-pages fallback issues. Consolidate these branches or ensure they are rebased against the fixes merged in 1935/1934.*
- **Failing `vitest` in `boomtick-mcp`:** PRs 1918, 1917. *Guidance: Mocking and schema tests broke when prompts and tool payloads were updated. Fix the mock inputs in `.test.ts` files.*
- **Missing or Incomplete Checks:** PRs 1933, 1921, 1919, 1791, 1759, 1754, 1753. *Guidance: Rebase against `main` and push to trigger workflows.*

## 3. UX Concerns
- **PR 1921 (Merch Storefront):** Contains a logic bug in `ReferralBanner.tsx` where the `isCompact` flag applies the `expanded` UI styling, breaking the layout.
- **PR 1879 (Research Analytics):** Addressed horizontal scrolling with safe gap scaling (`gap={{ base: 8, lg: 12 }}`).
- **PR 1854, 1759, 1753 (ResearchAnalytics):** Multiple PRs touch the exact same DOM nesting and Layout components. There is a high risk of breaking the strict UX Anti-Pattern checker if these are merged incorrectly.

## 4. Conflict or Overlap Notes
- **High Overlap - ResearchAnalytics.tsx:** PRs 1854, 1933, 1759, and 1753 all touch `src/features/research/ResearchAnalytics.tsx`.
- **High Overlap - Previews Infrastructure:** PR 1935 and 1934 are exact duplicates.
- **Content Overlap:** PR 1756 and PR 1755 both introduce `content/studies/ai-devops-pipeline.md`.
- **Docs Overlap:** PR 1929 documents the migration already implemented in PR 1931.

## 5. Recommended Fix-Before-Merge Items
- **PR 1921:** Fix the `ReferralBanner.tsx` logic inversion.
- **PR 1918 & 1917:** Fix the failing `vitest` suites in `boomtick-mcp`.
- **PR 1754:** Revert the changes to `dev-tools/tdw_services/orchestrator.py` that loosen the strict Node 22.22.2 check. It violates `CODEX.md`.

## 6. Recommended Merge Order
To avoid catastrophic merge conflicts, the following merge order is required:
1. **Infrastructure & Tooling (Safe):** 1900, 1932, 1931, 1930, 1885, 1800.
2. **Preview Consolidation:** Merge 1935 (Close 1934, 1870 as duplicates/superseded).
3. **Content Updates (Safe):** 1920.
4. **Merch Refactor (Safe):** 1927.

## 7. Final Merge / Defer / Abandon Strategy

### Merge Immediately
- **1935:** feat(previews): consolidate github pages preview infrastructure
- **1932:** fix(lint): fix duplicate code key in MarkdownRenderer
- **1931:** refactor(dev-tools): decommission jules module
- **1930:** Update @jules-fix-ci prompt
- **1927:** refactor(merch): simplify DOM nesting in MerchImageDisplay
- **1920:** Merch Content, Affiliate Links, and Image WebP Conversion Updates
- **1900:** chore: audit and optimize github actions workflows
- **1885:** chore: clarify set -e intent in manage-previews.sh
- **1879:** Responsive design improvements for Research Analytics page
- **1800:** Simplify pumpkin costume tutorial to sticker-based assembly

### Defer (Requires Fixes or Rebase)
- **1921:** Needs `ReferralBanner` logic fix and snapshots.
- **1919:** Needs rebase for CI.
- **1918, 1917:** Needs vitest mock fixes.
- **1883:** Needs prompt revert to preserve deterministic behavior.
- **1854:** Defer until we resolve which ResearchAnalytics PR takes precedence.
- **1848:** Needs `.env.example` fix (append, don't overwrite).
- **1839:** Needs conflict resolution.
- **1791:** Needs conflict resolution and artifact cleanup.
- **1759, 1756, 1755, 1754, 1753:** All have conflicts or severe overlap. Defer and require coordination/consolidation.

### Abandon / Close
- **1934:** Close as duplicate of 1935.
- **1933:** Close as duplicate/superseded by 1854 or 1759.
- **1929:** Close. Strategy docs are already implemented in 1931.
- **1880:** Close. Diff is completely empty.
- **1870:** Close. Superseded by the consolidation in 1935.

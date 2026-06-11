# Issue Dispatch Report

## 1. Summary of Review Coverage

- Checked `AGENTS.md` rules and applied them to source code.
- Reviewed UI component files in `src/components/ui/` for anti-pattern violations (`GearCard.tsx`).
- Reviewed UI component code for desktop UX issues (`FolioGrid.tsx`).
- Reviewed UI component code for mobile UX issues (`EventSidebar.tsx`).
- Audited `content/posts/` for placeholder/vaporware content (`2026-04-18-competition-metrics.md`, `2026-04-18-financial-literacy-dancers.md`).

## 2. List of New Issues Created

- `issue-agent-policy.md`: Replace raw styling in `GearCard.tsx` with primitive design tokens.
- `issue-desktop-ux.md`: Replace hardcoded sizing on the empty state `Search` icon in `FolioGrid.tsx` with standard `Icon` sizing.
- `issue-mobile-ux.md`: Fix mobile tap targets and raw sticky positioning classes in `EventSidebar.tsx`.
- `issue-ai-slop.md`: Address overpromising placeholder announcements in `2026-04-18-competition-metrics.md` and `2026-04-18-financial-literacy-dancers.md`.

## 3. Existing Issues Updated Instead of Duplicated

- None. (Unable to reliably fetch existing issues via standard GitHub API due to CLI token configurations, but based on local state, these are new specific findings).

## 4. Candidates Skipped and Why

- No major candidates skipped. Selected the most glaring issues from each category to ensure high-quality actionable dispatches.

## 5. Most Common `AGENTS.md` Violations Found

- Bypassing the layout and design primitives (`Box`, `Stack`) in favor of direct Tailwind utility classes in `className` props (e.g., `bg-black/15 pointer-events-none`).

## 6. Most Common Desktop UX Problems Found

- Hardcoding specific pixel/rem values for elements instead of using design system scale tokens, potentially leading to visual inconsistencies on varying desktop resolutions.

## 7. Most Common Mobile UX Problems Found

- Small interactive targets (less than 44px) and reliance on non-tokenized sticky positioning that may conflict with mobile native behaviors or sticky navigation.

## 8. Content Quality / AI Slop Risks Found

- "Vaporware" posts that hype up tools ("WCS Competition Data Scraper") or guides ("Comprehensive Financial Strategy Guide") that do not exist, lowering the practical value and trust of the blog.

## 9. Recommended Fix Order

1. Fix AI Slop Content (P0) - Immediate trust/SEO impact.
2. Fix Agent Policy Violations in `GearCard.tsx` (P1) - Ensures future work builds on correct tokens.
3. Fix Mobile UX Tap Targets in `EventSidebar.tsx` (P1) - Direct accessibility/usability impact.
4. Fix Desktop UX in `FolioGrid.tsx` (P2) - Visual polish.

## 10. Recommended Labels or Milestones

- **AI Slop:** `content-quality`, `high-priority`
- **Agent Policy:** `agent-policy-violation`, `tech-debt`
- **Mobile UX:** `mobile-ux-review`, `accessibility`
- **Desktop UX:** `desktop-ux-review`, `design-system`

## 11. Any Follow-Up Audits Needed

- A full scan of `content/gear/` pages to ensure affiliate disclosures are present.
- Visual regression testing using Playwright across all generated SPA stubs to confirm layout stability.
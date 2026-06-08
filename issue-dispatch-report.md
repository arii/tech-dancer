# Issue Dispatch Report

## 1. Summary of review coverage
The repository was audited across the following areas:
- `AGENTS.md` and repository guidelines compliance for front-end architecture.
- Desktop and Mobile UX analysis via code inspection (`Home.tsx`, `FeaturedGuidePanel.tsx`, `ProductCard.tsx`).
- Content quality and authenticity checks across the `/content/posts` directory.
- Existing open/closed issues to avoid duplicates.

## 2. List of new issues created
- **#1901**: Fix Agent Policy Violations: Raw Tailwind Layouts in Home.tsx and FeaturedGuidePanel.tsx (`agent-policy-violation`)
- **#1902**: Fix low-contrast text in FeaturedGuidePanel due to incorrect gradient direction (`desktop-ux-review`)
- **#1903**: Reduce mobile badge wrapping on ProductCard (`mobile-ux-review`)
- **#1905**: Rewrite generic 'Make any shoe a dance shoe' post to include actual tutorial steps or move to draft (`ai-slop-content-review`)

## 3. Existing issues updated instead of duplicated
- The "WCS Competition Data Scraper" post issue was originally created as #1904, but instantly closed as it was a duplicate of existing issue **#1837**. The status tracker was updated to reflect this duplication check.

## 4. Candidates skipped and why
- Minor issues in `EventCard.tsx` wrapping on mobile were skipped as the ProductCard issue was more pressing and had clear evidence of dense data wrapping across multiple items. Horizontal scrolling on `Merch.tsx` was skipped because it uses intentional `overflow-x-auto` to preserve screen real estate.

## 5. Most common `AGENTS.md` violations found
- Use of raw `className` logic with hardcoded layout attributes (e.g., `lg:grid-cols-[...]`) rather than structural components from `src/layouts/Primitives.tsx` (like `Grid`).
- Explicit disabling of checks via `// impeccable-ignore-file` without sufficient architectural justification.

## 6. Most common desktop UX problems found
- Contrast failures on dark-text-on-light-images due to incorrect gradient blending overlays (e.g., in `FeaturedGuidePanel.tsx`).

## 7. Most common mobile UX problems found
- High data density leading to wrapped badge lists consuming vital vertical space above primary CTAs on small viewports (`ProductCard.tsx`).

## 8. Content quality / AI slop risks found
- Posts featuring "placeholder-style" structures (overpromising tools without linking them, announcing hacks without instructions) that hurt domain authority and user experience.

## 9. Recommended fix order
1. **P0**: #1901 (Agent Policy Violations) — Resolving the underlying code structures ensures UI refactoring in downstream issues builds on standard primitives.
2. **P1**: #1902 (Desktop UX) — Immediate accessibility win.
3. **P2**: #1903 (Mobile UX) — Refines the store checkout experience.
4. **P3**: #1905 (AI Slop) — Editorial updates that do not block deployment but need attention before marketing the blog.

## 10. Recommended labels or milestones
- Issues have been correctly labeled with `agent-policy-violation`, `desktop-ux-review`, `mobile-ux-review`, and `ai-slop-content-review`. They should be grouped into a `UI/UX Polish` milestone.

## 11. Any follow-up audits needed
- An audit of all remaining `// impeccable-ignore` tags across `src/features/` to eliminate technical debt.
- A comprehensive manual check on the physical rendering of `ProductCard.tsx` on real mobile devices to verify badge configurations.

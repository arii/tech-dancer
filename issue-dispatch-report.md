# Issue Dispatch Final Report

## Summary of review coverage
- Reviewed `AGENTS.md` and repository guidelines.
- Executed `dev-tools/td_cli.py gh audit` and `audit-gate` to find programmatic policy violations (Current=0, Baseline=0).
- Generated desktop and mobile UI screenshots via Playwright scripts for `/` and `/gear`.
- Verified existing open issues using `gh issue list --limit 100` to prevent duplicate issue creation.
- Inspected multiple markdown files in `content/posts/` and `content/events/` for low-quality or "AI Slop" content.

## List of new issues created
- 0 new issues were created.

## Existing issues updated instead of duplicated
- #1832: Replace raw div and arbitrary styling in Equalizer component with standard primitives
- #1833: Remove arbitrary max-width Tailwind class from Home layout
- #1834: Fix raw background and alpha channel utility classes in Navigation components
- #1861: Replace raw div with Box primitive in FeaturedEventGuide
- #1835: Fix oversized hero image on desktop pushing content below the fold
- #1862: Adjust desktop hero decorative image overlay sizing
- #1863: Improve Desktop rhythm on /merch by constraining footer callouts
- #1864: Reduce desktop list fatigue in /research tools grid
- #1836: Reduce mobile metadata wrapping and improve tap targets on cards
- #1865: Normalize mobile grid card heights in TopicGrid
- #1866: Replace horizontal scrolling in GearShelf mobile view
- #1867: Reduce excessive stack gap spacing in About page mobile view
- #1837: Move placeholder 'Financial Strategy Guide' to draft mode until content is added
- #1868: Move generic WCS Competition Scraper post back to draft

## Candidates skipped and why
- **All identified candidates were skipped** because identical issues targeting the exact files and UX/content problems were already filed on the project board. Creating them again would duplicate effort.

## Most common `AGENTS.md` violations found
- Use of raw `div` tags instead of standard `Box`/`Stack` primitives (e.g. `FeaturedEventGuide.tsx`, `Equalizer.tsx`).
- Inline Tailwind spacing and sizing bypasses (e.g., `Home.tsx` max-width, `Navigation.tsx` alpha classes).

## Most common desktop UX problems found
- Oversized hero images pushing the main site purpose/CTAs below the fold (e.g., on `/`).
- List and visual fatigue when displaying many grid cards (e.g. `/research`).

## Most common mobile UX problems found
- Elements forcing horizontal scrolling or breaking layouts on narrow screens (e.g., `GearShelf`).
- Dense metadata sections on cards cramping text readability and minimizing tap targets.
- Over-spacing (stack gaps) creating disconnected content rhythms on vertical screens (e.g. `/about`).

## Content quality / AI slop risks found
- Posts announcing tools or guides that don't exist yet ("WCS Competition Data Scraper", "Comprehensive Financial Strategy Guide") resulting in hollow or overpromising content.

## Recommended fix order
1. P0: Ensure `AGENTS.md` violations are corrected (specifically removing raw layout elements) so standard primitives can enforce consistency.
2. P1: Resolve mobile UX horizontal scrolling to restore basic mobile accessibility.
3. P1: Move AI slop/overpromising content to draft to protect site trust.
4. P2: Fix desktop UX rhythm and oversized images.

## Recommended labels or milestones
- `agent-policy-violation` for anti-patterns and raw div replacements.
- `desktop-ux-review` and `mobile-ux-review` for layout optimizations.
- `ai-slop-content-review` for draft content.
- Consider a `UX-Polish` milestone to group the above.

## Any follow-up audits needed
- Re-run `python3 dev-tools/td_cli.py gh audit` once the `// impeccable-ignore` exceptions are removed.
- Conduct a deeper accessibility scan focusing specifically on the re-implemented component tap targets.

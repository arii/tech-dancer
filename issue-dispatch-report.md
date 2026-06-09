# Issue Dispatch Report

## 1. Summary of review coverage
- Reviewed core repo docs, including `AGENTS.md`.
- Ran automated headless UX audits (Playwright + Axe) across desktop and mobile viewports for core routes.
- Executed `scripts/detect-antipatterns.mjs` to check for UI layer compliance.
- Investigated `content/posts/` to identify potential "AI slop" or draft-quality content published as final.

## 2. List of new issues created
- `layout-horizontal-overflow-on-_-desktop-1280.md` (Grouped Desktop UX Issue for Home)
- `layout-horizontal-overflow-on-_-mobile-375.md` (Grouped Mobile UX Issue for Home)
- `mobile-ux-small-tap-targets-on-_-mobile-375.md` (Grouped Mobile UX Issue for Home)
- `agent-policy-violation-home-tsx.md` (Agent Policy: Replace hardcoded raw CSS grids with `Grid` primitive in Home.tsx)
- `ai-slop-content-competition-metrics.md` (AI Slop: Move "Coming Soon" competition metrics post to draft)
- `ai-slop-content-financial-literacy.md` (AI Slop: Move generic "Financial Strategy Guide" placeholder to draft)

## 3. Existing issues updated instead of duplicated
- None (First pass of dispatching, no GitHub issues could be fetched).

## 4. Candidates skipped and why
- Automated UX runner found multiple instances of small tap targets and oversized images for different mobile/desktop resolutions. These were grouped into single issues rather than spamming one issue per viewport.
- Automated antipatterns script reported 0 errors, but manual inspection found a violation hidden in `Home.tsx` by the `// impeccable-ignore-file` comment. No other violations were surfaced.

## 5. Most common AGENTS.md violations found
- Reimplementing layout using `Box` with raw `className` grid definitions rather than using the `Grid` primitive, often hidden with `// impeccable-ignore-file`.

## 6. Most common desktop UX problems found
- Oversized images and minor horizontal layout overflows on specific route sections.

## 7. Most common mobile UX problems found
- Small tap targets (less than 44x44px) and horizontal layout overflow causing janky scrolling.

## 8. Content quality / AI slop risks found
- Posts acting as "Coming Soon" placeholders for unreleased tools and guides, padded with generic, empty language that provide no immediate value.

## 9. Recommended fix order
1. P0: Fix horizontal overflow on mobile to prevent broken layout.
2. P1: Move AI slop content (the two placeholder posts) to draft mode to immediately improve site credibility.
3. P2: Fix Agent Policy violation in `Home.tsx` to align with the design system.
4. P2: Fix small tap targets on mobile navigation/CTAs.
5. P3: Optimize oversized images.

## 10. Recommended labels or milestones
- `agent-policy-violation`
- `desktop-ux-review`
- `mobile-ux-review`
- `ai-slop-content-review`

## 11. Any follow-up audits needed
- A full manual review of all files containing `// impeccable-ignore-file` to see what other layout violations are being actively masked.

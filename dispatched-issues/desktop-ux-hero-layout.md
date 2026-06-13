## Problem

The desktop Home page hero section's headline typography and layout consume too much vertical space, pushing critical content down and leaving awkward empty space before the Featured Guide grid component.

## Route / viewport

- Route: `/`
- Viewport: desktop (Tested at ~1280px wide based on Playwright desktop defaults)

## Evidence

In the desktop `screenshot.png` observation, the text "Built for dancers. Train smarter. Travel better." uses massive typography that dominates the left half of the viewport. The accompanying subtext ("Training notes, event guides...") is small and pushed far down. The `FeaturedGuidePanel` exists on the right side, but the vertical scale of the headline pushes the subsequent grid components (`FeaturedEventGuide`, `GearShelf`) below the immediate visual fold.

## User impact

The primary page purpose is visible, but the reading experience is unbalanced. The excessive typography scaling on desktop leads to an unoptimized scan path, forcing users to scroll further to reach the actual substantive content clusters (Event Guides, Gear, Topics).

## Recommended fix

- Reduce the hero typography scaling token for desktop (e.g., in `HeroSection.tsx`, reduce `size={{ base: "...", md: "..." }}` to a tighter size).
- Tighten the vertical `gap` and `marginTop` values in `src/pages/Home.tsx` to pull the `FeaturedEventGuide` and `GearShelf` components higher up.
- Constrain the maximum paragraph width of the hero subtext to improve readability and visual grouping with the headline.

## Acceptance criteria

- [ ] Desktop layout is visually stable at common viewport widths
- [ ] Primary page purpose is clear above the fold
- [ ] Text is readable and well spaced
- [ ] CTAs are clear and consistently styled
- [ ] Images are appropriately sized and optimized
- [ ] Lighthouse issue is resolved or documented
- [ ] No new mobile regressions

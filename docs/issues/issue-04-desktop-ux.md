## Problem

Hero image and layout are too large on the home page, pushing useful content below the fold.

## Route / viewport

- Route: `/` (Home)
- Viewport: desktop, 1280px

## Evidence

Based on visual verification of the desktop layout (e.g. using `playwright` rendering), the `HeroSection` components or main header hero images consume so much vertical space that subsequent content (like featured topics or latest posts) requires scrolling to be seen.

## User impact

The visitor cannot immediately see the most important actionable content or understand the page hierarchy without scrolling. First-time visitors might bounce if the site's primary purpose is not visible above the fold.

## Recommended fix

- Reduce the hero media height.
- Set a bounded `max-height` for the main hero.
- Ensure the headline, summary, and primary CTA are visible on a 1280x800 desktop layout.
- Use `aspectRatio` constraints where appropriate to shrink the hero image proportionally.

## Acceptance criteria

- [ ] Desktop layout is visually stable at common viewport widths
- [ ] Primary page purpose is clear above the fold
- [ ] Primary CTA appears above the fold
- [ ] No new mobile regressions

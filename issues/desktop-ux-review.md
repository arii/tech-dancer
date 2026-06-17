## Problem
Hero image and waveform visualization consume excessive vertical space on desktop without offering a clear, primary Call to Action (CTA). The actual content is pushed below the fold.

## Route / viewport
- Route: `/`
- Viewport: desktop, 1440px wide

## Evidence
Screenshot `home-desktop.png` shows the HeroSection pushing the "Latest from BoomTick" section completely out of the viewport.

## User impact
Users must scroll past mostly empty decorative space just to discover the primary content of the site.

## Recommended fix
Reduce the hero media height and tighten vertical padding within `HeroSection`. Move the content higher so that "Latest Posts" or a clear CTA are visible above the fold on desktop.

## Acceptance criteria
- [ ] Desktop layout is visually stable at common viewport widths
- [ ] Primary page purpose is clear above the fold
- [ ] No new mobile regressions

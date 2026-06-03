## Problem

Mobile navigation is difficult to scan due to overlapping elements, and secondary metadata blocks wrap into noisy multi-line segments causing poor mobile flow.

## Route / viewport

- Route: `/blog`, `/gear`
- Viewport: mobile, 390px (iPhone 12)

## Evidence

In mobile layout (`mobile-blog.png` and `mobile-gear.png`), product cards and blog post cards have cramped text. Dense metadata (like event tags, multiple affiliate badges, or category pills) wrap awkwardly when the viewport narrows, creating multi-line blocks that reduce scannability.

## User impact

Visitors on mobile devices experience visual fatigue and horizontal cramping, making it harder to discern primary action buttons or read content quickly.

## Recommended fix

- Collapse secondary metadata into a single concise row using horizontal scrolling or truncating where necessary.
- Reduce badge count on mobile cards.
- Ensure all tap targets are at least 44px tall.
- Convert multi-column grids or side-by-side elements on narrow screens into single-column stacks using established layout primitives like `<Stack direction={{ base: 'col', md: 'row' }}>`.

## Acceptance criteria

- [ ] Tap targets are usable and >44px
- [ ] No horizontal scrolling on the main page body
- [ ] Badges and pills do not awkwardly wrap to >2 lines on mobile
- [ ] Primary CTA appears clearly separated
- [ ] No new desktop regressions

## Problem
Horizontal Overflow on `/` (desktop-1440) causes janky scrolling and potential content cut-off.

## Route / viewport
- Route: /
- Viewport: desktop-1440

## Evidence
- Detected 1 elements overflowing viewport.
- Screenshot: `/app/artifacts/ux-audit/screenshots/home-desktop-1440.png`

## Recommended fix
Replace raw HTML structural elements with our primitive `Stack` or `Grid` layouts. Make sure widths are token-driven (e.g., `maxWidth={{ base: "full", md: "2xl" }}`) and avoid fixed pixel widths. For long content blocks, apply `overflow="x-auto"` to the wrapping primitive to contain scrolling locally.

## Acceptance criteria
- [ ] No horizontal scrolling at tested width
- [ ] All elements are contained within the viewport
- [ ] No new mobile regressions

## Severity
High

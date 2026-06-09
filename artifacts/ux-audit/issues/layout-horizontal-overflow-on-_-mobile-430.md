## Problem
Horizontal Overflow on `/` (mobile-430)

## Route / viewport
- Route: /
- Viewport: mobile-430

## Evidence
- Detected 3 elements overflowing viewport.
- Screenshot: `/app/artifacts/ux-audit/screenshots/home-mobile-430.png`

## User impact
Causes janky scrolling and potential content cut-off.

## Recommended fix
Ensure all elements use responsive widths and handle long content with word-wrap or overflow-x: auto.

## Acceptance criteria
- [ ] No horizontal scrolling at tested width
- [ ] All elements are contained within the viewport
- [ ] No new desktop regressions

## Severity
High

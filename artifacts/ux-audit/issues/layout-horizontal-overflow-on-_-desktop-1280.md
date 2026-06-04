## Problem
Horizontal Overflow on `/` (desktop-1280)

## Route / viewport
- Route: /
- Viewport: desktop-1280

## Evidence
- Detected 1 elements overflowing viewport.
- Screenshot: `/home/ari/tech-dancer/artifacts/ux-audit/screenshots/home-desktop-1280.png`

## User impact
Causes janky scrolling and potential content cut-off.

## Recommended fix
Ensure all elements use responsive widths and handle long content with word-wrap or overflow-x: auto.

## Acceptance criteria
- [ ] No horizontal scrolling at tested width
- [ ] All elements are contained within the viewport
- [ ] No new mobile regressions

## Severity
High

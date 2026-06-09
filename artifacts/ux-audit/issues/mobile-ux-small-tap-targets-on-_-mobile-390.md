## Problem
Small Tap Targets on `/` (mobile-390)

## Route / viewport
- Route: /
- Viewport: mobile-390

## Evidence
- Found 26 interactive elements smaller than 44x44px.
- Screenshot: `/app/artifacts/ux-audit/screenshots/home-mobile-390.png`

## User impact
Makes interactive elements difficult to tap on a phone, leading to user frustration.

## Recommended fix
Increase padding or dimensions of interactive elements to at least 44x44px for better mobile usability.

## Acceptance criteria
- [ ] All interactive elements meet the 44x44px minimum target size
- [ ] Adequate spacing between adjacent links/buttons
- [ ] No new desktop regressions

## Severity
Medium

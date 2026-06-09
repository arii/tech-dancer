## Problem
Small Tap Targets on `/` (mobile-375) makes interactive elements difficult to tap on a phone, leading to user frustration.

## Route / viewport
- Route: /
- Viewport: mobile-375

## Evidence
- Found 26 interactive elements smaller than 44x44px.
- Screenshot: `/app/artifacts/ux-audit/screenshots/home-mobile-375.png`

## Recommended fix
Ensure all interactive elements (buttons, links) are either utilizing our primary `ActionButton` variants or are wrapped in primitive layout components with explicit `padding={{ base: 4, md: 2 }}` spacing tokens to ensure a minimum touch area of 44x44px on mobile.

## Acceptance criteria
- [ ] All interactive elements meet the 44x44px minimum target size
- [ ] Adequate spacing between adjacent links/buttons
- [ ] No new desktop regressions

## Severity
Medium

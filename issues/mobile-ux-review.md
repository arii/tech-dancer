## Problem
The `DevLabCallout` "View Portfolio ->" CTA appears misaligned or pushed away from standard mobile touch targets, with potential layout spacing issues.

## Route / viewport
- Route: `/`
- Viewport: mobile, 375px wide

## Evidence
In `home-mobile.png`, the DevLab Callout has generic styling. Code inspection shows `paddingY={{ base: 4, sm: 0 }}`.

## User impact
Tap target might be confusing, and visually it creates inconsistent vertical rhythm.

## Recommended fix
Increase tap target height to at least 44px consistently using a standard `Button` or uniform `padding` rather than specific responsive removal of padding on `sm`.

## Acceptance criteria
- [ ] Tap targets are usable (min 44px)
- [ ] No new desktop regressions

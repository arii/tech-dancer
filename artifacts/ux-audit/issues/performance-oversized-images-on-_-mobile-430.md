## Problem
Oversized Images on `/` (mobile-430)

## Route / viewport
- Route: /
- Viewport: mobile-430

## Evidence
- Found 3 images where natural size is significantly larger than rendered size.
- Screenshot: `/app/artifacts/ux-audit/screenshots/home-mobile-430.png`

## User impact
Increases page load time and consumes excessive bandwidth.

## Recommended fix
Use responsive image sets (srcset) or serve optimized crops for smaller viewports.

## Acceptance criteria
- [ ] Images are appropriately sized for the viewport
- [ ] Lighthouse performance score is maintained or improved
- [ ] No new desktop regressions

## Severity
Medium

## Problem
Oversized Images on `/` (desktop-1280)

## Route / viewport
- Route: /
- Viewport: desktop-1280

## Evidence
- Found 3 images where natural size is significantly larger than rendered size.
- Screenshot: `/app/artifacts/ux-audit/screenshots/home-desktop-1280.png`

## User impact
Increases page load time and consumes excessive bandwidth.

## Recommended fix
Use responsive image sets (srcset) or serve optimized crops for smaller viewports.

## Acceptance criteria
- [ ] Images are appropriately sized for the viewport
- [ ] Lighthouse performance score is maintained or improved
- [ ] No new mobile regressions

## Severity
Medium

## Problem
Oversized Images on `/` (mobile-430) increases page load time and consumes excessive bandwidth.

## Route / viewport
- Route: /
- Viewport: mobile-430

## Evidence
- Found 3 images where natural size is significantly larger than rendered size.
- Screenshot: `/app/artifacts/ux-audit/screenshots/home-mobile-430.png`

## Recommended fix
Refactor raw `<img>` tags to utilize responsive sizing. Alternatively, ensure the image asset is pre-optimized (WebP) and wrap it within an `AspectRatio` or `Box` primitive to enforce strict width constraints rather than relying on natural dimensions.

## Acceptance criteria
- [ ] Images are appropriately sized for the viewport
- [ ] Lighthouse performance score is maintained or improved
- [ ] No new desktop regressions

## Severity
Medium

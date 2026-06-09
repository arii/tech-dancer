## Problem
Oversized Images on `/` (desktop-1440) increases page load time and consumes excessive bandwidth.

## Route / viewport
- Route: /
- Viewport: desktop-1440

## Evidence
- Found 3 images where natural size is significantly larger than rendered size.
- Screenshot: `/app/artifacts/ux-audit/screenshots/home-desktop-1440.png`

## Recommended fix
Refactor raw `<img>` tags to utilize responsive sizing. Alternatively, ensure the image asset is pre-optimized (WebP) and wrap it within an `AspectRatio` or `Box` primitive to enforce strict width constraints rather than relying on natural dimensions.

## Acceptance criteria
- [ ] Images are appropriately sized for the viewport
- [ ] Lighthouse performance score is maintained or improved
- [ ] No new mobile regressions

## Severity
Medium

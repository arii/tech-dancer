# Fix CLS shifts and unoptimized resource blocking on /merch mobile view to improve Speed Index

**Labels:** `mobile-ux-review`
**Severity:** `high`
**Priority:** `P1`

## Problem

The Merch storefront mobile view experiences high Cumulative Layout Shift (CLS) and severe Total Blocking Time, resulting in poor perceived performance and unpredictable tap targets while content loads.

## Route / viewport

- Route: `/merch`
- Viewport: mobile, 375px/390px

## Evidence

Lighthouse audits on the `/merch` route returned layout shift flags, notably:
- `cumulative-layout-shift`
- `layout-shifts` - Avoid large layout shifts
- `interactive` - Time to Interactive drops due to blocking resources

## User impact

On smaller phone screens, shifting layouts make interactive elements difficult to tap. The unpredictable rendering of product cards pushes buttons down or shifts them mid-touch, frustrating users who are trying to navigate the storefront or claim the referral discount.

## Recommended fix

- Add explicit image dimensions and responsive sizing to all product grid media to reserve vertical space before images load.
- Avoid dynamic layout updates that don't depend on user interaction.
- Optimize the `ReferralBanner` rendering to ensure it doesn't cause a layout push when mounting.

## Acceptance criteria

- [ ] No horizontal scrolling at tested mobile widths
- [ ] Tap targets are usable
- [ ] Primary CTA appears early enough
- [ ] Text is readable without zooming
- [ ] Images are sized appropriately
- [ ] Mobile nav works clearly
- [ ] Lighthouse mobile issues are resolved or documented
- [ ] No new desktop regressions

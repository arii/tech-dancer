# Fix missing title/meta description and address LCP delays on /merch desktop view

**Labels:** `desktop-ux-review`
**Severity:** `critical`
**Priority:** `P0`

## Problem

The Merch storefront desktop layout suffers from severe performance bottlenecks, specifically lagging on First Contentful Paint and Largest Contentful Paint. Furthermore, the page lacks necessary metadata attributes such as `<title>` and `meta description`.

## Route / viewport

- Route: `/merch`
- Viewport: desktop, 1280px+

## Evidence

Lighthouse scores consistently report performance metrics under 0.80. Specific failed audits include:
- `first-contentful-paint` - Score: ~0.34
- `largest-contentful-paint` - Score: ~0.53
- `total-blocking-time` - Score: 0.99
- `document-title` - Document doesn't have a `<title>` element
- `meta-description` - Document does not have a meta description

## User impact

Desktop users experience sluggish interactions and a visually jarring loading state on the storefront. A missing title tag and meta description also heavily penalizes organic SEO, making it harder for visitors to discover the Merch page via search engines.

## Recommended fix

- Investigate the critical rendering path to optimize the Largest Contentful Paint element (likely the hero components or first product row images).
- Lazy-load non-critical images or off-screen products.
- Eliminate or defer any render-blocking Javascript on this route.
- Ensure the `<SEO>` component is properly initialized with a `title` and `description` string inside `src/pages/Merch.tsx`.

## Acceptance criteria

- [ ] Desktop layout is visually stable at common viewport widths
- [ ] Primary page purpose is clear above the fold
- [ ] Text is readable and well spaced
- [ ] CTAs are clear and consistently styled
- [ ] Images are appropriately sized and optimized
- [ ] Lighthouse issues are resolved or documented
- [ ] No new mobile regressions

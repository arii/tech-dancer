## Problem

The share action button in the `EditorialHeader` component fails to meet the required 48x48px minimum touch target size for mobile accessibility.

## Route / viewport

- Route: `/blog/*` and `/events/*` (Pages using `EditorialHeader`)
- Viewport: mobile

## Evidence

In `src/components/editorial/EditorialHeader.tsx` (around line 65), the share action is rendered using a small icon and micro text:
```tsx
<Stack as="button" direction="row" align="center" gap={1.5} onClick={onShare} className={journalVariants.shareAction()}>
  <Share2 className="w-3.5 h-3.5" />
  <Text variant="mono" size="micro" weight="font-black" color={isShared ? "accent" : "inherit"}>
    {isShared ? "COPIED!" : "SHARE"}
  </Text>
</Stack>
```
Without the `.tap-target` utility class or additional padding, this renders a clickable area much smaller than the 48x48px minimum specified in the repository memory directives.

## User impact

On a phone, tap targets that are too small cause usability frustration. Users may miss the button, accidentally tap nearby tags or author names, or require multiple precise attempts to copy the share link.

## Recommended fix

- Add the global `.tap-target` utility class to the `<Stack as="button">` element in `EditorialHeader.tsx`.
- Ensure the `journalVariants.shareAction()` base styles (if applicable) do not override or conflict with the touch target expansion padding.

## Acceptance criteria

- [ ] No horizontal scrolling at tested mobile widths
- [ ] Tap targets are usable (at least 48x48px clickable area)
- [ ] Primary CTA appears early enough
- [ ] Text is readable without zooming
- [ ] Images are sized appropriately
- [ ] Mobile nav works clearly
- [ ] Lighthouse mobile issues are resolved or documented
- [ ] No new desktop regressions

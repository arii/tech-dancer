## Problem

The `EventSidebar` component uses raw layout utility classes (`className="sticky top-24"`) and its interactive toggle header (`as="button"`) does not meet mobile accessibility requirements for tap targets. Furthermore, applying `sticky` without the design system primitives creates layout inconsistency.

## Route / viewport

- Route: `/events/:slug` (Event detail pages)
- Viewport: mobile, e.g., 375px

## Evidence

```tsx
src/components/ui/EventSidebar.tsx:30:      <Stack gap={8} className="sticky top-24">
src/components/ui/EventSidebar.tsx:41:                className="lg:pointer-events-none"
```

## User impact

1. **Tap targets:** The toggle button for the "Event Insights" accordion may be difficult to tap accurately on small mobile screens if the touch target area is too small, leading to frustration.
2. **Sticky layout:** Hardcoded sticky positioning might conflict with mobile navigation or headers, potentially overlapping content and causing scrolling issues.

## Recommended fix

- Replace the raw `className="sticky top-24"` with appropriate layout primitive props (e.g., `<Box position="sticky" top={24}>` or the corresponding `Box` token configuration).
- Ensure the button wrapping "Event Insights" has adequate padding (e.g., `paddingY={4}`) to provide a minimum 44px tap target height on mobile viewports.
- Remove the `className="lg:pointer-events-none"` in favor of explicit interaction constraints if necessary, or conditionally render the button tag itself.

## Acceptance criteria

- [ ] No horizontal scrolling at tested mobile widths.
- [ ] Tap targets for the accordion are usable (minimum 44px high).
- [ ] Sticky positioning is handled via layout primitive props, not `className`.
- [ ] Mobile nav and sticky sidebar do not visually collide.
- [ ] No new desktop regressions.
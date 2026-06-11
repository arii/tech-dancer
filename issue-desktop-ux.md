## Problem

The `FolioGrid.tsx` empty state uses a Lucide React icon (`<Search>`) with raw styling classes for sizing rather than utilizing the project's standard `Icon` primitive.

## Route / viewport

- Route: `/gear`, `/events`, `/blog` (or any route using `FolioGrid` that returns empty search results).
- Viewport: desktop, applicable to all widths.

## Evidence

```tsx
src/components/ui/FolioGrid.tsx:80:            icon={<Search className="w-12 h-12" />}
```

## User impact

While the immediate user impact is minor (an oversized icon might render correctly if Tailwind purges the unused classes properly or if JIT is enabled), hardcoded pixel values can lead to unexpected UI scaling issues across devices and resolutions. It also violates the internal consistency of the design system, causing visual mismatches with other standard icons in the application.

## Recommended fix

- Replace the raw `<Search className="w-12 h-12" />` implementation with the established `Icon` component.
- Map the width/height to the correct project icon size tokens defined in `src/styles/design-tokens.ts` (e.g., using `size="xl"` or similar mapped prop).

## Acceptance criteria

- [ ] Desktop layout is visually stable when rendering the empty state.
- [ ] The raw `w-12 h-12` class is replaced.
- [ ] `pnpm run audit` passes without flagging the icon sizing.
- [ ] No new mobile regressions are introduced.
## Problem

`GearCard.tsx` contains raw styling via Tailwind utility classes (e.g., `bg-black/15`, `pointer-events-none`, `backdrop-blur-md`) directly applied to the `className` prop, bypassing the project's design system tokens and primitive component structure.

## File(s)

- `src/components/ui/GearCard.tsx`

## Evidence

```tsx
src/components/ui/GearCard.tsx:155:            className="bg-black/15 pointer-events-none"
src/components/ui/GearCard.tsx:167:            className="bg-accent text-bg backdrop-blur-md shadow-sm"
```

## Why this violates repo policy

According to `AGENTS.md` (Rules 1 & 2): "No Raw Tailwind in App/Feature Layers" and "Only Use Approved Styling Sources". UI development should use the existing design system primitives (`Box`, `Stack`, `Grid`) and design tokens (e.g., colors mapped to `accent`, surfaces mapped to `bg`), rather than one-off inline utility classes.

## Impact

- Harder maintenance when design tokens change.
- Inconsistent UI as these one-off strings aren't linked to the central theme.
- Clutters TSX markup with CSS concerns, reducing readability.

## Recommended fix

- Replace `<div className="bg-black/15 pointer-events-none">` with `<Box pointerEvents="none" surface="inverse" opacityVariant="medium">` (or map to the closest matching tokens).
- Replace `<div className="bg-accent text-bg backdrop-blur-md shadow-sm">` with `<Box surface="accent" shadow="sm">` (and create/use an appropriate CVA variant or token for the blur effect if necessary, or use the `// impeccable-ignore` comment if the blur cannot be tokenized).

## Acceptance criteria

- [ ] File no longer violates the referenced policy.
- [ ] Existing design tokens / primitives are used to replace the raw string values.
- [ ] UI remains visually equivalent.
- [ ] `pnpm run audit` passes.
- [ ] Lint/typecheck/build pass.
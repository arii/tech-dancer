## Problem

Multiple components violate the AGENTS.md policy by using raw Tailwind color utility classes (`bg-`, `text-`) and layout classes in `className` instead of using tokenized variables via system props.

## File(s)

- `src/components/Navigation.tsx`
- `src/components/MobileBottomNav.tsx`
- `src/components/navigation/MobileMenuOverlay.tsx`

## Evidence

In `src/components/Navigation.tsx`, line 29:
```tsx
      <Box as="nav" aria-label="Main Navigation" className="fixed inset-x-0 top-0 z-50 h-16 w-full max-w-full border-b border-line bg-bg/95 backdrop-blur-xl">
```

In `src/components/MobileBottomNav.tsx`, line 18:
```tsx
      className="bg-surface/90 backdrop-blur-xl safe-bottom"
```

In `src/components/navigation/MobileMenuOverlay.tsx`, line 68:
```tsx
      className="top-16 left-0 right-0 bottom-0 z-top bg-bg lg:hidden"
```

## Why this violates repo policy

According to `AGENTS.md` (Rules #1, #2), the app must only use approved styling sources such as Design tokens and Primitives. Mixing utility classes like `bg-bg`, `bg-surface/90`, and positioning utilities breaks the convention of using Box primitive surface tokens and layout props.

## Impact

- styling approaches become mixed and unpredictable.
- future updates to tokens will not automatically propagate safely if raw alpha channels (`/95`, `/90`) are appended to utility strings.

## Recommended fix

- Use the `surface` prop on `Box` components for setting backgrounds (e.g., `surface="bg"` or `surface="surface"`).
- Handle alpha variants via explicitly defined utility classes in global CSS or proper design token mapping, avoiding raw strings appended to token classes (like `bg-bg/95`).

## Acceptance criteria

- [ ] File no longer violates the referenced policy
- [ ] Existing design tokens / primitives are used
- [ ] UI remains visually equivalent or improves
- [ ] Lint/typecheck/build pass

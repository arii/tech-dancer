## Problem

`src/pages/Home.tsx` uses raw arbitrary Tailwind classes like `max-w-[1240px]` instead of using the provided design system layout components and token definitions.

## File(s)

- `src/pages/Home.tsx`

## Evidence

In `src/pages/Home.tsx`, line 15:
```tsx
    <Box as="section" aria-label="Home content" className="mx-auto w-full max-w-[1240px] min-w-0 overflow-x-clip px-4 sm:px-6 lg:px-8 pb-safe-bottom">
```

## Why this violates repo policy

According to `AGENTS.md` (Rules #1, #3), UI code must not use arbitrary values (`max-w-[1240px]`). Instead, layout parameters should rely on system-defined container widths (like `maxWidth="7xl"` or standard token classes like `max-w-7xl` if absolutely necessary and not provided via props).

## Impact

- inconsistent UI width constraints across different pages.
- broken visual consistency when the design system tokens are updated.
- harder future refactors

## Recommended fix

- Change `max-w-[1240px]` to standard token like `max-w-7xl` or equivalent via the `Box` `maxWidth` property (e.g., `<Box maxWidth="7xl" ...>`).

## Acceptance criteria

- [ ] File no longer violates the referenced policy
- [ ] Existing design tokens / primitives are used
- [ ] Duplicate code is reduced or removed
- [ ] UI remains visually equivalent or improves
- [ ] Lint/typecheck/build pass

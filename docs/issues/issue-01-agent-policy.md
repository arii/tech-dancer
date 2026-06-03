## Problem

`src/components/Equalizer.tsx` violates the AGENTS.md policy by using a raw `div` with direct layout and arbitrary Tailwind class names instead of utilizing the established `Box` or `Stack` primitives, and arbitrary values such as `gap-[4px]`, `pb-[18px]`, `opacity-[.22]`, `max-w-[4px]`.

## File(s)

- `src/components/Equalizer.tsx`

## Evidence

In `src/components/Equalizer.tsx`, line 26:
```tsx
    <div className="pointer-events-none relative flex h-full w-full items-end justify-center gap-[4px] overflow-hidden px-4 pb-[18px]">
```

Line 29:
```tsx
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/15 via-secondary/8 to-transparent blur-2xl opacity-[.22]"
```

Line 43:
```tsx
          className="w-full max-w-[4px] rounded-full"
```

## Why this violates repo policy

According to `AGENTS.md` (Rules #1, #3), UI code must not use raw Tailwind layout utility classes or arbitrary values. Components should use the standard `Box` and `Stack` primitives for layout and spacing. The use of `<div className="...">` bypasses the system's design tokens and layout composition rules.

## Impact

- harder maintenance
- broken visual consistency
- harder future refactors
- violates established UI anti-patterns rules

## Recommended fix

- Replace the outer raw `div` with a `Stack` or `Box` primitive.
- Replace arbitrary gap (`gap-[4px]`) and padding (`pb-[18px]`) with standardized design tokens (e.g. `gap={1}`, `paddingBottom={4}` if appropriate).
- Replace `max-w-[4px]` with standard width parameters if available, or update component API to manage equalizer bar widths correctly.
- Remove raw `opacity-[.22]` and use standard Tailwind opacity classes like `opacity-20` or define a token.

## Acceptance criteria

- [ ] File no longer violates the referenced policy
- [ ] Existing design tokens / primitives are used
- [ ] Duplicate code is reduced or removed
- [ ] UI remains visually equivalent or improves
- [ ] Lint/typecheck/build pass

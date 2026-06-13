## Problem

The `Equalizer` component violates architectural guidelines by using raw Tailwind layout classes (`flex`, `h-full`, `w-full`, `items-end`, `justify-center`, `gap-[4px]`, `px-4`, `pb-[18px]`) instead of the required design system primitives (`Stack`, `Box`).

## File(s)

- `src/components/Equalizer.tsx`

## Evidence

```tsx
// src/components/Equalizer.tsx
return (
  <div className="pointer-events-none relative flex h-full w-full items-end justify-center gap-[4px] overflow-hidden px-4 pb-[18px]">
    <motion.div ... />
    ...
  </div>
);
```

## Why this violates repo policy

According to `AGENTS.md`:
- **Rule 1 (No Raw Tailwind)**: No arbitrary values or direct layout classes (`flex`, `px-*`, `pb-*`).
- **Rule 3 (Primitives Must Be Used for Layout)**: Layout must use `Stack`, `Grid`, or `Box`. No manual flex usage.
- **Rule 11 (No Inline Styles or Magic Numbers)**: Arbitrary values like `gap-[4px]` and `pb-[18px]` are forbidden.

## Impact

- inconsistent UI spacing that bypasses token constraints
- harder maintenance and difficulty enforcing global layout shifts
- breaks visual consistency with the rest of the application

## Recommended fix

- Replace the raw `div` with the `Stack` primitive.
- Map the raw arbitrary spacing to the closest standard design tokens (e.g., `gap={1}` instead of `gap-[4px]`).
- Use standard layout props on `Stack` (e.g., `direction="row"`, `align="end"`, `justify="center"`, `width="full"`, `height="full"`).

## Acceptance criteria

- [ ] File no longer violates the referenced policy
- [ ] Existing design tokens / primitives are used
- [ ] Duplicate code is reduced or removed
- [ ] UI remains visually equivalent or improves
- [ ] Lint/typecheck/build pass

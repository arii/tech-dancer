# Replace raw tailwind layout classes in src/components/Equalizer.tsx with layout primitives

**Labels:** `agent-policy-violation`
**Severity:** `high`
**Priority:** `P1`

## Problem

The `Equalizer` component violates the agent policy by using raw Tailwind layout, spacing, and styling classes directly on a `div` element rather than using established system primitives and design tokens.

## File(s)

- `src/components/Equalizer.tsx`

## Evidence

Lines 26-29:
```tsx
    <div className="pointer-events-none relative flex h-full w-full items-end justify-center gap-[4px] overflow-hidden px-4 pb-[18px]">
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/15 via-secondary/8 to-transparent blur-2xl opacity-[.22]"
      />
```

## Why this violates repo policy

AGENTS.md explicitly states: "No direct layout classes (flex, grid, items-center)", "No direct spacing (px-*, py-*)", and "Layout uses Stack, Grid, Box, etc. No manual flex/grid usage".

## Impact

- Inconsistent UI spacing and styling.
- Broken visual consistency across the app.
- Harder maintenance because style parameters bypass global token configurations.

## Recommended fix

- Replace local `div` markup with the shared `Box` or `Stack` primitive.
- Use `display="flex"`, `align="end"`, `justify="center"` and the appropriate primitive layout props to replace the raw layout classes.
- Remove inline `className` additions for arbitrary values like `pb-[18px]` and replace them with standard `paddingBottom` spacing tokens.

## Acceptance criteria

- [ ] File no longer violates the referenced policy
- [ ] Existing design tokens / primitives are used
- [ ] Duplicate code is reduced or removed
- [ ] UI remains visually equivalent or improves
- [ ] Lint/typecheck/build pass

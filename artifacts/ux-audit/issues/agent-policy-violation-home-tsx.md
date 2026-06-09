## Problem
Violating DRY by reimplementing grid layout with raw Tailwind classes instead of using primitive components.

## File(s)
- `src/pages/Home.tsx`

## Evidence
```tsx
        <Box
          display="grid"
          className="w-full max-w-full min-w-0 gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]"
        >
```

## Why this violates repo policy
Rule 1: No Raw Tailwind in App/Feature Layers. Rule 3: Primitives Must Be Used for Layout. `Grid` primitive should be used instead of `Box` with `display="grid"` and raw classes like `gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]`.

## Impact
- harder maintenance
- inconsistent UI
- broken visual consistency

## Recommended fix
Replace the `Box` configured as a grid with the `Grid` primitive, passing standard token-based props for gap and columns.

## Acceptance criteria
- [ ] File no longer violates the referenced policy
- [ ] Existing design tokens / primitives are used
- [ ] Lint/typecheck/build pass

## Severity
High

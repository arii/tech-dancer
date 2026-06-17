## Problem
The `FeaturedGuidePanel` component bypasses the layout system by hardcoding `width={420}` and `height={600}` on a raw `img` element instead of using layout primitives and responsive styling tokens.

## File(s)
- `src/features/home/FeaturedGuidePanel.tsx`

## Evidence
```tsx
      <img
        src={`${ASSET_PREFIX}${FEATURED.image}`}
        alt={FEATURED.imageAlt}
        width={420}
        height={600}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-dim transition-opacity duration-500 group-hover:opacity-high"
        aria-hidden="true"
      />
```

## Why this violates repo policy
`AGENTS.md` and `cli-schema.json` specify strict layout and design token usage (e.g. `Box`, `Stack`). Hardcoding dimensions on absolute-positioned elements bypasses these tokens.

## Impact
- harder maintenance
- inconsistent UI (potential layout shift or fixed aspect ratio issues)
- broken visual consistency on varying viewport sizes

## Recommended fix
Remove the hardcoded `width={420}` and `height={600}`. Let the existing `absolute inset-0 h-full w-full object-cover` handle responsive sizing or wrap it in a `Box` that uses responsive layout tokens.

## Acceptance criteria
- [ ] File no longer violates the referenced policy
- [ ] Existing design tokens / primitives are used
- [ ] UI remains visually equivalent or improves
- [ ] Lint/typecheck/build pass

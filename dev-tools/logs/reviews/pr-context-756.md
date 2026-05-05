# PR Context: #756 — Cleanup unused imports and dead code
**Author:** @arii

## Description
I have performed a cleanup of unused code and imports across several files.

Key changes:
1.  **Dashboard & useHome**: Removed unused imports (`PageHeader`, `PathSelector`, `MapPin`) and removed dead props (`aspect`, `compact`) from the `ContentCard` usage that were triggering linter warnings or were simply no longer needed.
2.  **ContentCard & GearCard**: Added `readingTime` (and other unused data props like `aspect` and `compact` for `ContentCard`) to the prop destructuring block that filters out props before spreading them to the underlying DOM elements. This prevents these props from bleeding into the HTML as invalid attributes, while keeping the component signatures flexible for data-mapped items.
3.  **PageHeader**: Removed a duplicate `SectionHeader` export that was flagged as unused by `knip`.
4.  **Verification**:
    - Ran `oxlint` to ensure no unused imports remain.
    - Ran `tsc --noEmit` to verify type safety.
    - Performed codebase-wide searches for `CardImagePlaceholder` and `readingTime` to ensure all dead references were handled.
    - Verified that `Navigation.tsx` only imports `Search` from `lucide-react`, which is actively used in the component.

All tests passed and linter warnings for the modified files have been resolved.

Fixes #752

---
*PR created automatically by Jules for task [10340639259356833398](https://jules.google.com/task/10340639259356833398) started by @arii*

## Files Changed
- 🟡 `src/components/ui/ContentCard.tsx`
- 🟡 `src/components/ui/GearCard.tsx`
- 🟡 `src/components/ui/PageHeader.tsx`
- 🟡 `src/features/dashboard/Dashboard.tsx`
- 🟡 `src/features/dashboard/useHome.ts`

## Diffs

### `src/components/ui/ContentCard.tsx` (modified)
```diff
@@ -24,6 +24,7 @@ export function ContentCard({
  24 |     // @ts-expect-error - ignoring unused data props
  25 |     type: _type, date: _date, author: _author, authorAvatar: _authorAvatar,
  26 |     content: _content, image: _image, tags: _tags, affiliateIds: _affiliateIds,
  27 |+    readingTime: _readingTime, aspect: _aspect, compact: _compact,
  28 |     ...cleanMotionProps
  29 |   } = motionProps as Record<string, unknown>;
  30 |
```

### `src/components/ui/GearCard.tsx` (modified)
```diff
@@ -29,6 +29,7 @@ export function GearCard({
  29 |     image: _image, tags: _tags, affiliateIds: _affiliateIds,
  30 |     priceCategory: _priceCategory, updatedDate: _updatedDate,
  31 |     durability: _durability, value: _value, specs: _specs,
  32 |+    readingTime: _readingTime,
  33 |     ...cleanProps
  34 |   } = rest as Record<string, unknown>;
  35 |
```

### `src/components/ui/PageHeader.tsx` (modified)
```diff
@@ -59,14 +59,3 @@ export function PageHeader({
  59 |   );
  60 | }
  61 |
     |-export function SectionHeader({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
     |-  return (
     |-    <Box display="flex" justify="between" align="end" border="b" paddingBottom={4}>
     |-      <Stack gap={1}>
     |-        <Text variant="mono" size="xs" color="brand" weight="font-semibold" tracking="widest" uppercase>{label}</Text>
     |-        <Text variant="headline" size="3xl" weight="font-black">{title}</Text>
     |-      </Stack>
     |-      {children}
     |-    </Box>
     |-  );
     |-}
```

### `src/features/dashboard/Dashboard.tsx` (modified)
```diff
@@ -6,8 +6,6 @@ import { useHome } from './useHome';
   6 | import { SEO } from '@/components/SEO';
   7 | import { STATIC_SCHEMAS } from '@/config/constants';
   8 | import { SectionHeader } from '@/components/ui/SectionHeader';
     |-import { PageHeader } from '@/components/ui/PageHeader';
     |-import PathSelector from '@/components/ui/PathSelector';
   9 | import { ContentCard } from '@/components/ui/ContentCard';
  10 | import { EventCard } from '@/components/ui/EventCard';
  11 | import { motionTokens } from '@/styles/motion';
@@ -146,9 +144,7 @@ export default function Home() {
 144 |                 key={post.slug}
 145 |                 {...post}
 146 |                 basePath="/blog"
     |-                aspect="video"
 147 |                 variants={motionTokens.staggerItem}
     |-                compact={true}
 148 |               />
 149 |             ))}
 150 |           </Grid>
```

### `src/features/dashboard/useHome.ts` (modified)
```diff
@@ -1,7 +1,6 @@
   1 | import { useNavigate } from 'react-router-dom';
   2 | import { useQuery } from '@tanstack/react-query';
   3 | import { getPosts, getEvents } from '@/lib/content';
     |-import { MapPin } from 'lucide-react';
   4 |
   5 | /** Matches `artifacts/boomtick/index.html` “Where Dancers Go” cards (venue + location + cadence). */
   6 | export function useHome() {
```
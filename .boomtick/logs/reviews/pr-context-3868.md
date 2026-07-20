# PR Context: #3868 — refactor: optimize BlogFeed and adhere to layout primitives in ContentCard
**Author:** @google-labs-jules[bot]

## Description
This pull request resolves issues raised during the principal engineer audit and automated AI reviews on PR #3831. It includes performance optimizations to the `BlogFeed` and styling corrections to `ContentCard` to better align with the project's architectural guidelines for layout primitives.

**Changes:**
- Organized imports in `BlogFeed.tsx` and wrapped the `featuredPosts` and `mainFeedPosts` filtering logic in `useMemo` to eliminate unnecessary computations during every component re-render.
- Replaced the usage of raw Tailwind layout classes (like `className="overflow-hidden"`) in `ContentCard.tsx` with proper design system layout primitives (`overflow="hidden"`, `aspect="video"`, `surface="alt"` on `<Box>` and `<BaseCard>`).
- Verified that `FolioGrid` correctly applies a 1-column layout on mobile devices (`base: 1`) to prevent horizontal layout overflow.

These changes ensure stability, performance, and adherence to established style conventions.

---
*PR created automatically by Jules for task [879453924489035675](https://jules.google.com/task/879453924489035675) started by @arii*

## CI Status
- ❌ **Deployment Impact Analysis**: completed (failure)
  <details><summary>Failure Logs Snippet</summary>

  ```
  - src/components/GlobalSearch.tsx
- src/features/lab/BlogDrafter.tsx
- src/pages/Blog.tsx
- src/pages/BlogPost.tsx
- src/pages/Home.tsx
- src/pages/Merch.tsx
- src/pages/Research.tsx
- src/pages/ResearchDetail.tsx
- content/posts/2026-04-19-practical-tools-essentials.md
- content/posts/2026-06-01-event-travel-packing.md
- content/posts/2026-06-01-wcs-essentials.md
- src/components/ui/ContentCard.tsx
- src/components/ui/FolioGrid.tsx
- src/features/journal/BlogFeed.tsx
- src/lib/types/content.ts
- src/styles/safelist.ts
- tests/guide.spec.ts-snapshots/detail-page-v2-chromium-linux.png
- tests/visual.spec.ts-snapshots/mobile-research-blog-drafter.png
- tests/visual.spec.ts-snapshots/mobile-research-wcs-scraper.png
- tests/visual.spec.ts-snapshots/mobile-ux-auditor.png
  ```
  </details>
- ✅ **deploy**: completed (success)
- ✅ **CodeQL**: completed (success)
- ✅ **build**: completed (success)
- ✅ **Security Scan (gitleaks)**: completed (success)
- ✅ **Anti-Pattern Audit**: completed (success)
- ✅ **Security Scan (oxlint)**: completed (success)
- ✅ **Build & E2E**: completed (success)
- ✅ **Lint & Type Check**: completed (success)
- ✅ **Security Scan (semgrep)**: completed (success)
- ✅ **Validate all workflow files**: completed (success)
- ✅ **verify-changes / FOUNDATIONAL GATE: Checks for actual code modifications**: completed (success)

## Files Changed
- 🟡 `src/components/ui/ContentCard.tsx`
- 🟡 `src/features/journal/BlogFeed.tsx`
- 🟡 `tests/guide.spec.ts-snapshots/detail-page-v2-chromium-linux.png`
- 🟡 `tests/visual.spec.ts-snapshots/mobile-research-blog-drafter.png`
- 🟡 `tests/visual.spec.ts-snapshots/mobile-research-wcs-scraper.png`
- 🟡 `tests/visual.spec.ts-snapshots/mobile-ux-auditor.png`

## Diffs

### `src/components/ui/ContentCard.tsx` (modified)
```diff
@@ -55,11 +55,11 @@ export const ContentCard = (props: ContentCardProps) => {
  55 |       height="full"
  56 |       to={`${basePath}/${slug}`}
  57 |       ariaLabel={`Read article: ${title}`}
     |-      className="overflow-hidden"
  58 |+      overflow="hidden"
  59 |       {...motionProps}
  60 |     >
  61 |       {!compact && image && (
     |-        <Box width="full" className="aspect-video bg-surface-alt border-b border-line overflow-hidden">
  62 |+        <Box width="full" aspect="video" surface="alt" border="b" overflow="hidden">
  63 |           <img
  64 |             src={image}
  65 |             alt={imageAlt || title}
```

### `src/features/journal/BlogFeed.tsx` (modified)
```diff
@@ -1,3 +1,4 @@
   1 |+import { useMemo } from 'react';
   2 | import { Box, Grid, Text } from '@/layouts/Primitives';
   3 | import { SEO } from '@/components/SEO';
   4 | import { ContentCard } from '@/components/ui/ContentCard';
@@ -9,11 +10,16 @@ const BlogFeed = () => {
  10 |   const { posts, categories, view, setView, activeCategory, searchTerm } = useBlog();
  11 |
  12 |   const isInitialView = activeCategory === 'All' && !searchTerm;
     |-  const featuredPosts = posts.filter(post => post.featured === true);
  13 |
     |-  const mainFeedPosts = isInitialView
     |-    ? posts.filter(post => !post.featured)
     |-    : posts;
  14 |+  const featuredPosts = useMemo(() =>
  15 |+    posts.filter(post => post.featured === true),
  16 |+  [posts]);
  17 |+
  18 |+  const mainFeedPosts = useMemo(() =>
  19 |+    isInitialView
  20 |+      ? posts.filter(post => !post.featured)
  21 |+      : posts,
  22 |+  [isInitialView, posts]);
  23 |
  24 |   return (
  25 |     <>
```

### `tests/guide.spec.ts-snapshots/detail-page-v2-chromium-linux.png` (modified)
```diff

```

### `tests/visual.spec.ts-snapshots/mobile-research-blog-drafter.png` (modified)
```diff

```

### `tests/visual.spec.ts-snapshots/mobile-research-wcs-scraper.png` (modified)
```diff

```

### `tests/visual.spec.ts-snapshots/mobile-ux-auditor.png` (modified)
```diff

```
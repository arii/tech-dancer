# PR Context: #3831 — Enhance Blog Directory Scannability and Layout
**Author:** @google-labs-jules[bot]

## Description
This pull request introduces the 'Featured Essentials' pinned section at the top of the blog page and refactors the chronological list into a highly scannable compact multi-column card grid, preventing excessive vertical scrolling and keeping evergreen guides easily discoverable.

Fixes #3804

---
*PR created automatically by Jules for task [6386545577436537631](https://jules.google.com/task/6386545577436537631) started by @arii*

## CI Status
- ❌ **Deployment Impact Analysis**: completed (failure)
  <details><summary>Failure Logs Snippet</summary>

  ```
  echo "CI Metrics verification failed."
shell: bash --noprofile --norc -e -o pipefail {0}
<summary><b>ð¦ Dynamic Imports Affected (8)</b></summary>
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
"message": "AI Token usage is within limits.",
  ```
  </details>
- ⏳ **CodeQL**: completed (neutral)
- ✅ **deploy**: completed (success)
- ✅ **build**: completed (success)
- ✅ **Security Scan (oxlint)**: completed (success)
- ✅ **Build & E2E**: completed (success)
- ✅ **Lint & Type Check**: completed (success)
- ✅ **Validate all workflow files**: completed (success)
- ✅ **Security Scan (semgrep)**: completed (success)
- ✅ **Anti-Pattern Audit**: completed (success)
- ✅ **Security Scan (gitleaks)**: completed (success)
- ✅ **verify-changes / FOUNDATIONAL GATE: Checks for actual code modifications**: completed (success)

## Files Changed
- 🟡 `content/posts/2026-04-19-practical-tools-essentials.md`
- 🟡 `content/posts/2026-06-01-event-travel-packing.md`
- 🟡 `content/posts/2026-06-01-wcs-essentials.md`
- 🟡 `src/components/ui/ContentCard.tsx`
- 🟡 `src/components/ui/FolioGrid.tsx`
- 🟡 `src/features/journal/BlogFeed.tsx`
- 🟡 `src/lib/types/content.ts`
- 🟡 `src/styles/safelist.ts`

## Diffs

### `content/posts/2026-04-19-practical-tools-essentials.md` (modified)
```diff
@@ -10,6 +10,7 @@ image: "/assets/home/wcs-travel-pack.webp"
  10 | imageAlt: "A flat-lay of WCS travel essentials including dance shoes, earplugs, and a travel steamer."
  11 | imageFit: contain
  12 | author: "Ariel Anders, PhD"
  13 |+featured: true
  14 | affiliateIds:
  15 |   - "loop-experience"
  16 |   - "portable-steamer"
```

### `content/posts/2026-06-01-event-travel-packing.md` (modified)
```diff
@@ -4,6 +4,7 @@ title: "Event Travel & Packing"
   4 | date: "2026-06-01"
   5 | author: "Ariel Anders, PhD"
   6 | category: "Travel"
   7 |+featured: true
   8 | excerpt: "Packing organizers and garment care items for out-of-town events."
   9 | image: "/images/gear/sketches/compression-cubes.webp"
  10 | imageAlt: "A set of navy blue compression packing cubes with mesh tops and double-zipper systems, shown compressing stacked clothing to minimize suitcase volume."
```

### `content/posts/2026-06-01-wcs-essentials.md` (modified)
```diff
@@ -4,6 +4,7 @@ title: "WCS Essentials (Local & Travel)"
   4 | date: "2026-06-01"
   5 | author: "Ariel Anders, PhD"
   6 | category: "Gear"
   7 |+featured: true
   8 | excerpt: "High-priority essentials to bring to any West Coast Swing event, whether local or out-of-town."
   9 | image: "/images/gear/sketches/loop-earplugs.webp"
  10 | imageAlt: "A hand-drawn sketch of a pair of blue Loop earplugs on a sketchbook page, showing their circular design and silicone tips."
```

### `src/components/ui/ContentCard.tsx` (modified)
```diff
@@ -4,7 +4,7 @@ import { BaseCard } from './BaseCard';
   4 | import { pickRest } from '@/lib/utils';
   5 | import { CONTENT_METADATA_KEYS } from '@/lib/constants';
   6 |
     |-interface ContentCardProps extends BaseProps, Partial<HTMLMotionProps<"a">> {
   7 |+export interface ContentCardProps extends BaseProps, Partial<HTMLMotionProps<"a">> {
   8 |   slug: string;
   9 |   title: string;
  10 |   category: string;
@@ -14,12 +14,13 @@ interface ContentCardProps extends BaseProps, Partial<HTMLMotionProps<"a">> {
  14 |   readingTime?: string;
  15 |   image?: string;
  16 |   imageAlt?: string;
  17 |+  compact?: boolean;
  18 |   [key: string]: unknown;
  19 | }
  20 |
  21 | const MotionArticle = motion.article;
  22 |
     |-export function ContentCard(props: ContentCardProps) {
  23 |+export const ContentCard = (props: ContentCardProps) => {
  24 |   const {
  25 |     slug,
  26 |     title,
@@ -30,6 +31,7 @@ export function ContentCard(props: ContentCardProps) {
  31 |     readingTime,
  32 |     image,
  33 |     imageAlt,
  34 |+    compact = false,
  35 |   } = props;
  36 |
  37 |   const motionProps = pickRest(props, [
@@ -56,7 +58,7 @@ export function ContentCard(props: ContentCardProps) {
  58 |       className="overflow-hidden"
  59 |       {...motionProps}
  60 |     >
     |-      {image && (
  61 |+      {!compact && image && (
  62 |         <Box width="full" className="aspect-video bg-surface-alt border-b border-line overflow-hidden">
  63 |           <img
  64 |             src={image}
@@ -67,52 +69,52 @@ export function ContentCard(props: ContentCardProps) {
  69 |         </Box>
  70 |       )}
  71 |
     |-      <Stack gap={4} padding={6} height="full">
  72 |+      <Stack gap={compact ? 2 : 4} padding={compact ? 4 : 6} height="full">
  73 |         <Box
  74 |           paddingX={2}
     |-          paddingY={1}
  75 |+          paddingY={compact ? 0.5 : 1}
  76 |           radius="full"
  77 |           border
  78 |           className="border-line w-fit"
  79 |         >
     |-        <Text
     |-          variant="mono"
     |-          size="xs"
     |-          weight="font-black"
     |-          tracking="wide"
     |-          className={getTagColorClass(category)}
     |-        >
     |-          {category}
     |-        </Text>
     |-      </Box>
  80 |+          <Text
  81 |+            variant="mono"
  82 |+            size={compact ? "micro" : "xs"}
  83 |+            weight="font-black"
  84 |+            tracking="wide"
  85 |+            className={getTagColorClass(category)}
  86 |+          >
  87 |+            {category}
  88 |+          </Text>
  89 |+        </Box>
  90 |
     |-      <Stack gap={2}>
     |-        <Text
     |-          as="h2"
     |-          variant="body"
     |-          size="lg"
     |-          weight="font-bold"
  91 |+        <Stack gap={compact ? 1 : 2}>
  92 |+          <Text
  93 |+            as="h2"
  94 |+            variant="body"
  95 |+            size={compact ? "base" : "lg"}
  96 |+            weight="font-bold"
  97 |             color="main"
  98 |             leading="tight"
  99 |             className="group-hover:text-accent transition-colors line-clamp-2"
     |-        >
     |-          {title}
     |-        </Text>
 100 |+          >
 101 |+            {title}
 102 |+          </Text>
 103 |
     |-        <Text variant="body" size="sm" color="dim" leading="relaxed" className="line-clamp-3" maxWidth="prose">
     |-           {excerpt}
     |-        </Text>
     |-      </Stack>
 104 |+          <Text variant="body" size="sm" color="dim" leading="relaxed" className={compact ? "line-clamp-2" : "line-clamp-3"} maxWidth="prose">
 105 |+            {excerpt}
 106 |+          </Text>
 107 |+        </Stack>
 108 |
     |-        <Box display="flex" align="center" justify="between" marginTop="auto">
 109 |+        <Box display="flex" align="center" justify="between" marginTop="auto" paddingTop={compact ? 1 : 0}>
 110 |           <Text variant="mono" size="xs" color="dim" data-testid="content-date">
 111 |             {[date, readingTime].filter(Boolean).join(' • ') || category}
 112 |           </Text>
     |-          <Text variant="mono" size="sm" weight="font-bold" color="accent" tracking="wide">
     |-            Read article
 113 |+          <Text variant="mono" size={compact ? "xs" : "sm"} weight="font-bold" color="accent" tracking="wide">
 114 |+            {compact ? "Read" : "Read article"}
 115 |           </Text>
 116 |         </Box>
 117 |       </Stack>
 118 |     </BaseCard>
 119 |   );
     |-}
 120 |+};
```

### `src/components/ui/FolioGrid.tsx` (modified)
```diff
@@ -23,6 +23,7 @@ interface FolioGridProps {
  23 |   as?: keyof JSX.IntrinsicElements;
  24 |   renderItem?: (item: ContentItem) => ReactNode;
  25 |   searchPlaceholder?: string;
  26 |+  compact?: boolean;
  27 | }
  28 |
  29 | export default function FolioGrid({
@@ -36,7 +37,8 @@ export default function FolioGrid({
  37 |   onViewChange,
  38 |   as,
  39 |   renderItem,
     |-  searchPlaceholder: propsSearchPlaceholder
  40 |+  searchPlaceholder: propsSearchPlaceholder,
  41 |+  compact = false
  42 | }: FolioGridProps) {
  43 |   const [search, setSearch] = useSearchParam('search');
  44 |
@@ -82,7 +84,7 @@ export default function FolioGrid({
  84 |             description={search ? `No matches for "${search}" in ${categoryTitle}.` : `No items found in ${categoryTitle}.`}
  85 |           />
  86 |         ) : view === 'card' ? (
     |-          <Grid cols={{ base: 1, md: 2, xl: 3, "2xl": 4 }} gap={4}>
  87 |+          <Grid cols={compact ? { base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 } : { base: 1, md: 2, xl: 3, "2xl": 4 }} gap={4}>
  88 |             {filteredItems.map((item) => (
  89 |               <Box
  90 |                 key={item.slug}
@@ -96,6 +98,7 @@ export default function FolioGrid({
  98 |                   <ContentCard
  99 |                     {...item}
 100 |                     basePath={basePath}
 101 |+                    compact={compact}
 102 |                   />
 103 |                 )}
 104 |               </Box>
```

### `src/features/journal/BlogFeed.tsx` (modified)
```diff
@@ -1,11 +1,19 @@
     |-import { Box } from '@/layouts/Primitives';
     |-import { useBlog } from './useBlog';
   1 |+import { Box, Grid, Text } from '@/layouts/Primitives';
   2 | import { SEO } from '@/components/SEO';
   3 |+import { ContentCard } from '@/components/ui/ContentCard';
   4 | import FolioGrid from '@/components/ui/FolioGrid';
   5 | import { FilterBar } from '@/components/ui/FilterBar';
   6 |+import { useBlog } from './useBlog';
   7 |+
   8 |+const BlogFeed = () => {
   9 |+  const { posts, categories, view, setView, activeCategory, searchTerm } = useBlog();
  10 |
     |-export default function BlogFeed() {
     |-  const { posts, categories, view, setView } = useBlog();
  11 |+  const isInitialView = activeCategory === 'All' && !searchTerm;
  12 |+  const featuredPosts = posts.filter(post => post.featured === true);
  13 |+
  14 |+  const mainFeedPosts = isInitialView
  15 |+    ? posts.filter(post => !post.featured)
  16 |+    : posts;
  17 |
  18 |   return (
  19 |     <>
@@ -14,7 +22,7 @@ export default function BlogFeed() {
  22 |         description="A searchable, categorized folio of posts covering travel, lifestyle, practical tools, technical portfolio pieces, and everything about West Coast Swing."
  23 |       />
  24 |       <FolioGrid
     |-        items={posts}
  25 |+        items={mainFeedPosts}
  26 |         categoryTitle="Blog Posts"
  27 |         as="h1"
  28 |         label="INSIGHTS"
@@ -23,13 +31,39 @@ export default function BlogFeed() {
  31 |         searchPlaceholder="Search posts..."
  32 |         view={view}
  33 |         onViewChange={setView}
  34 |+        compact={true}
  35 |       >
  36 |         <Box marginTop={8}>
  37 |           <FilterBar
  38 |             categories={categories}
  39 |           />
  40 |         </Box>
  41 |+
  42 |+        {isInitialView && featuredPosts.length > 0 && (
  43 |+          <Box marginTop={12} marginBottom={8} border="b" className="border-line pb-12">
  44 |+            <Box marginBottom={6}>
  45 |+              <Text variant="mono" size="xs" weight="font-bold" color="accent" tracking="widest" className="uppercase mb-2 block">
  46 |+                CURATED GUIDES
  47 |+              </Text>
  48 |+              <Text as="h2" variant="display" size="2xl" weight="font-black" color="main" tracking="tight">
  49 |+                Featured Essentials
  50 |+              </Text>
  51 |+              <Text variant="body" size="base" color="dim" className="mt-2">
  52 |+                Handpicked, high-priority evergreen advice for local and travel events.
  53 |+              </Text>
  54 |+            </Box>
  55 |+            <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
  56 |+              {featuredPosts.map((post) => (
  57 |+                <Box key={`featured-${post.slug}`} height="full">
  58 |+                  <ContentCard {...post} basePath="/blog" />
  59 |+                </Box>
  60 |+              ))}
  61 |+            </Grid>
  62 |+          </Box>
  63 |+        )}
  64 |       </FolioGrid>
  65 |     </>
  66 |   );
     |-}
  67 |+};
  68 |+
  69 |+export default BlogFeed;
```

### `src/lib/types/content.ts` (modified)
```diff
@@ -21,6 +21,7 @@ export interface Post {
  21 |   tags?: string[];
  22 |   affiliateIds?: string[];
  23 |   imageFit?: 'cover' | 'contain';
  24 |+  featured?: boolean;
  25 | }
  26 |
  27 | export interface Resource {
```

### `src/styles/safelist.ts` (modified)
```diff
@@ -116,7 +116,9 @@ export const tailwindSafelist = [
 116 |   'lg:grid-cols-4',
 117 |   'lg:grid-cols-12',
 118 |   'xl:grid-cols-3',
 119 |+  'xl:grid-cols-4',
 120 |   '2xl:grid-cols-4',
 121 |+  '2xl:grid-cols-5',
 122 |   'col-span-1',
 123 |   'lg:col-span-7',
 124 |   'lg:col-span-5',
```
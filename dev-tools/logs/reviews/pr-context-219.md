# PR Context: #219 — Implement UX Consistency Playbook
**Stats:** +472/-502 across 38 files
**Author:** @arii
**Last Commit:** 2026-04-23T14:55:15Z

## Description
Implementing the UX Consistency Playbook to ensure design system compliance across the portfolio. This change standardizes layouts, card components, typography, and data validation.

Fixes #214

---
*PR created automatically by Jules for task [4119873548618327680](https://jules.google.com/task/4119873548618327680) started by @arii*

## Files Changed
- 🟢 `blog_detail.png` (+0/-0)
- 🟢 `blog_feed.png` (+0/-0)
- 🟢 `gear_feed.png` (+0/-0)
- 🟡 `package.json` (+2/-1)
- 🟢 `research_page.png` (+0/-0)
- 🟡 `src/components/layout/DetailElements.tsx` (+4/-4)
- 🟢 `src/components/ui/CardImage.tsx` (+46/-0)
- 🔴 `src/components/ui/CardImagePlaceholder.tsx` (+0/-62)
- 🟡 `src/components/ui/ContentCard.tsx` (+34/-88)
- 🟡 `src/components/ui/FilterBar.tsx` (+1/-1)
- 🟡 `src/components/ui/HeroPathCard.tsx` (+3/-3)
- 🟡 `src/components/ui/ListRow.tsx` (+3/-3)
- 🟡 `src/components/ui/PageHeader.tsx` (+6/-20)
- 🟡 `src/components/ui/Skeleton.tsx` (+1/-8)
- 🟡 `src/features/contact/components/ContactFormView.tsx` (+9/-8)
- 🟡 `src/features/contact/components/FormField.tsx` (+1/-1)
- 🟡 `src/features/contact/components/SuccessState.tsx` (+1/-1)
- 🟡 `src/features/dashboard/EventCard.tsx` (+11/-4)
- 🟡 `src/features/email-capture/EmailForm.tsx` (+12/-5)
- 🟡 `src/features/email-capture/NewsletterBanner.tsx` (+9/-6)
- 🟡 `src/features/journal/BlogPost.tsx` (+2/-2)
- 🟡 `src/features/journal/components/BlogPostDetail.tsx` (+7/-17)
- 🟡 `src/features/lab/BlogDrafter.tsx` (+19/-18)
- 🟡 `src/features/lab/GearCard.tsx` (+55/-54)
- 🟡 `src/features/lab/GearPost.tsx` (+2/-2)
- 🟡 `src/features/lab/Toolbox.tsx` (+19/-11)
- 🟡 `src/features/lab/components/GearPostDetail.tsx` (+15/-10)
- 🟡 `src/features/profile/BioContent.tsx` (+1/-1)
- 🟡 `src/features/profile/ProfileSidebar.tsx` (+6/-5)
- 🟡 `src/features/research/ResearchAnalytics.tsx` (+19/-18)

## Diffs

### `blog_detail.png` (added)
**Valid Comment Ranges (New File):** None (Binary or too large)
```diff
_No textual diff available._
```

### `blog_feed.png` (added)
**Valid Comment Ranges (New File):** None (Binary or too large)
```diff
_No textual diff available._
```

### `gear_feed.png` (added)
**Valid Comment Ranges (New File):** None (Binary or too large)
```diff
_No textual diff available._
```

### `package.json` (modified)
**Valid Comment Ranges (New File):** 10-17
```diff
@@ -10,7 +10,8 @@
  10 |     "preview": "vite preview",
  11 |     "test:e2e": "playwright test",
  12 |     "clean": "rm -rf dist",
     |-    "lint": "tsc --noEmit",
  13 |+    "audit:ui": "node dev-tools/detect-antipatterns.mjs",
  14 |+    "lint": "tsc --noEmit && pnpm run audit:ui",
  15 |     "type-check": "tsc --noEmit"
  16 |   },
  17 |   "dependencies": {
```

### `research_page.png` (added)
**Valid Comment Ranges (New File):** None (Binary or too large)
```diff
_No textual diff available._
```

### `src/components/layout/DetailElements.tsx` (modified)
**Valid Comment Ranges (New File):** 15-21, 45-51, 61-67, 79-85
```diff
@@ -15,7 +15,7 @@ export function ScoreItem({ label, value, icon: Icon, color, intent }: ScoreItem
  15 |       <Text variant="mono" size="tiny" color="dim" uppercase>{label}</Text>
  16 |       <Box display="flex" align="center" gap={1} intent={intent} className={color || ''}>
  17 |         {Icon && <Icon className="w-4 h-4" />}
     |-        <Text variant="display" size="xl" weight="font-bold">{value}</Text>
  18 |+        <Text variant="displayLower" size="xl" weight="font-bold">{value}</Text>
  19 |       </Box>
  20 |     </Stack>
  21 |   );
@@ -45,7 +45,7 @@ export function SpecsTable({ specs }: { specs?: Record<string, string> }) {
  45 | 
  46 |   return (
  47 |     <Stack gap={4}>
     |-      <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase className="tracking-widest border-b border-line pb-2">Technical Specs</Text>
  48 |+      <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase tracking="widest" className=" border-b border-line pb-2">Technical Specs</Text>
  49 |       <Stack gap={3}>
  50 |         {Object.entries(specs).map(([key, value]) => (
  51 |           <Stack key={key} gap={1}>
@@ -61,7 +61,7 @@ export function SpecsTable({ specs }: { specs?: Record<string, string> }) {
  61 | export function TOC({ headings }: { headings: string[] }) {
  62 |   return (
  63 |     <Stack gap={4}>
     |-      <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase className="tracking-widest border-b border-line pb-2">In this post</Text>
  64 |+      <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase tracking="widest" className=" border-b border-line pb-2">In this post</Text>
  65 |       <Stack gap={2}>
  66 |         {headings.map((h, i) => (
  67 |           <Text key={i} variant="mono" size="tiny" className="cursor-pointer hover:text-accent transition-colors">
@@ -79,7 +79,7 @@ export function VerdictCallout({ verdict }: { verdict: string }) {
  79 |        <Stack gap={3}>
  80 |           <Box display="flex" align="center" gap={3}>
  81 |              <Shield className="w-6 h-6 text-emerald-600" />
     |-             <Text variant="display" size="2xl" weight="font-black" intent="success">THE VERDICT</Text>
  82 |+             <Text variant="displayLower" size="2xl" weight="font-black" intent="success" uppercase={true}>THE VERDICT</Text>
  83 |           </Box>
  84 |           <Text variant="body" size="lg" intent="success" italic className="leading-relaxed font-medium">
  85 |             "{verdict}"
```

### `src/components/ui/CardImage.tsx` (added)
**Valid Comment Ranges (New File):** 1-46
```diff
@@ -0,0 +1,46 @@
   1 |+import { Box, Text } from '@/layouts/Primitives';
   2 |+import { CategoryPlaceholder } from '@/components/ui/CategoryPlaceholder';
   3 |+
   4 |+interface CardImageProps {
   5 |+  image?: string;
   6 |+  title: string;
   7 |+  category: string;
   8 |+  children?: React.ReactNode;
   9 |+}
  10 |+
  11 |+export function CardImage({ image, title, category, children }: CardImageProps) {
  12 |+  return (
  13 |+    <Box
  14 |+      position="relative"
  15 |+      overflow="hidden"
  16 |+      border="b"
  17 |+      surface="bg"
  18 |+      className="border-line group"
  19 |+      aspect="video"
  20 |+      maxHeight="160px"
  21 |+    >
  22 |+      {image ? (
  23 |+        <Box width="full" height="full" className="object-cover group-hover:scale-105 transition-transform duration-700">
  24 |+          <img
  25 |+            src={image}
  26 |+            alt={title}
  27 |+            className="w-full h-full object-cover"
  28 |+          />
  29 |+        </Box>
  30 |+      ) : (
  31 |+        <CategoryPlaceholder category={category} />
  32 |+      )}
  33 |+
  34 |+      {/* Category Badge - Standard for all cards */}
  35 |+      <Box position="absolute" className="top-4 left-4">
  36 |+        <Box paddingX={3} paddingY={1} surface="default" opacity={90} border={true} radius="none" className="backdrop-blur-sm">
  37 |+          <Text variant="mono" size="micro" weight="font-bold" color="brand" uppercase={true} tracking="wider">
  38 |+            {category}
  39 |+          </Text>
  40 |+        </Box>
  41 |+      </Box>
  42 |+
  43 |+      {children}
  44 |+    </Box>
  45 |+  );
  46 |+}
```

### `src/components/ui/CardImagePlaceholder.tsx` (removed)
**Valid Comment Ranges (New File):** 0--1
```diff
@@ -1,62 +0,0 @@
     |-import { Box, Text } from '@/layouts/Primitives';
     |-import { cn } from '@/lib/utils';
     |-
     |-interface CardImagePlaceholderProps {
     |-  image?: string;
     |-  category: string;
     |-  date?: string;
     |-  title: string;
     |-}
     |-
     |-export function CardImagePlaceholder({ image, category, date, title }: CardImagePlaceholderProps) {
     |-  const norm = (category || '').toLowerCase();
     |-
     |-  let surfaceVariant: "brand" | "accent" | "warning" | "danger" | "muted" = 'muted';
     |-  if (norm.includes('tech')) surfaceVariant = 'brand';
     |-  else if (norm.includes('travel') || norm.includes('wcs')) surfaceVariant = 'accent';
     |-  else if (norm.includes('gear')) surfaceVariant = 'warning';
     |-  else if (norm.includes('lifestyle')) surfaceVariant = 'danger';
     |-
     |-  if (image) {
     |-    return (
     |-      <Box className="relative w-full aspect-video max-h-[160px] overflow-hidden border-b border-line bg-bg">
     |-        <img
     |-          src={image}
     |-          alt={title}
     |-          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
     |-        />
     |-        <Box className="absolute top-3 left-3">
     |-          <Box surface={surfaceVariant} className="px-2 py-0.5 border border-line/20 backdrop-blur-sm bg-opacity-90">
     |-            <Text variant="mono" size="micro" weight="font-bold" uppercase className="tracking-wider">
     |-              {category}
     |-            </Text>
     |-          </Box>
     |-        </Box>
     |-      </Box>
     |-    );
     |-  }
     |-
     |-  return (
     |-    <Box
     |-      surface={surfaceVariant}
     |-      className={cn(
     |-        "w-full h-10 flex items-center px-4 border-b border-line/10",
     |-        "bg-opacity-10" // subtle background
     |-      )}
     |-    >
     |-      <Box display="flex" align="center" gap={2}>
     |-        <Text variant="mono" size="micro" weight="font-bold" uppercase className="tracking-widest opacity-80">
     |-          {category}
     |-        </Text>
     |-        {date && (
     |-          <>
     |-            <Box className="w-1 h-1 rounded-full bg-current opacity-30" />
     |-            <Text variant="mono" size="micro" uppercase className="tracking-widest opacity-60">
     |-              {date}
     |-            </Text>
     |-          </>
     |-        )}
     |-      </Box>
     |-    </Box>
     |-  );
     |-}
```

### `src/components/ui/ContentCard.tsx` (modified)
**Valid Comment Ranges (New File):** 1-8, 18-83
```diff
@@ -1,9 +1,8 @@
   1 | import { NavLink } from 'react-router-dom';
   2 |+import { motion } from 'motion/react';
   3 | import { Box, Stack, Text } from '@/layouts/Primitives';
   4 | import { readingTime } from '@/lib/content';
     |-import { CardImagePlaceholder } from '@/components/ui/CardImagePlaceholder';
     |-import { Skeleton } from '@/components/ui/Skeleton';
     |-import { CategoryPlaceholder } from '@/components/ui/CategoryPlaceholder';
   5 |+import { CardImage } from '@/components/ui/CardImage';
   6 | 
   7 | interface ContentCardProps {
   8 |   slug: string;
@@ -19,119 +18,66 @@ interface ContentCardProps {
  18 | 
  19 | export function ContentCardSkeleton() {
  20 |   return (
     |-    <Box className="flex flex-col h-full bg-surface border border-line rounded-none overflow-hidden">
     |-      <Skeleton className="w-full aspect-video max-h-[160px] rounded-none" />
     |-      <Stack gap={4} className="p-5" flex={1} justify="between">
     |-        <Stack gap={3}>
     |-          <Skeleton className="h-3 w-24" />
     |-          <Skeleton className="h-6 w-3/4" />
  21 |+    <Box className="flex flex-col h-full bg-surface border border-line rounded-none overflow-hidden animate-pulse">
  22 |+      <Box className="relative aspect-video bg-line/50" />
  23 |+      <Stack gap={5} className="p-6 lg:p-8" flex={1} justify="between">
  24 |+        <Stack gap={4}>
  25 |+          <Box className="h-4 w-24 bg-line/50 rounded" />
  26 |+          <Box className="h-8 w-3/4 bg-line/50 rounded" />
  27 |           <Stack gap={2}>
     |-            <Skeleton className="h-3 w-full" />
     |-            <Skeleton className="h-3 w-5/6" />
  28 |+            <Box className="h-4 w-full bg-line/50 rounded" />
  29 |+            <Box className="h-4 w-5/6 bg-line/50 rounded" />
  30 |           </Stack>
  31 |         </Stack>
     |-        <Skeleton className="h-3 w-20 mt-auto" />
  32 |+        <Box className="h-4 w-20 bg-line/50 rounded mt-auto" />
  33 |       </Stack>
  34 |     </Box>
  35 |   );
  36 | }
  37 | 
     |-export function ContentCard({ slug, title, category, excerpt, date, image, basePath, content }: ContentCardProps) {
  38 |+export function ContentCard({ slug, title, category, excerpt, date, image, basePath, content, aspect = "video" }: ContentCardProps) {
  39 |   const rt = readingTime(content, excerpt);
  40 | 
  41 |   return (
  42 |     <Box 
  43 |       as={NavLink}
  44 |       to={`${basePath}/${slug}`}
     |-      className="group flex flex-col h-full bg-surface border border-line hover:border-accent transition-all duration-300 rounded-none overflow-hidden"
  45 |+      className="group cursor-pointer flex flex-col h-full bg-surface border border-line hover:border-accent transition-all duration-300 rounded-none overflow-hidden"
  46 |     >
  47 |       {/* Visual Thumbnail */}
     |-      <Box className="relative aspect-video overflow-hidden border-b border-line bg-bg max-h-[160px]">
     |-        {image ? (
     |-          <img 
     |-            src={image} 
     |-            alt={title} 
     |-            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
     |-          />
     |-        ) : (
     |-          <Box className="w-full h-full flex flex-col">
     |-            <Box className="h-4 w-full" surface={
     |-              (category || '').toLowerCase().includes('tech') ? 'brand' :
     |-              (category || '').toLowerCase().includes('travel') || (category || '').toLowerCase().includes('wcs') ? 'accent' :
     |-              (category || '').toLowerCase().includes('gear') ? 'warning' :
     |-              (category || '').toLowerCase().includes('lifestyle') ? 'danger' : 'muted'
     |-            } />
     |-            <Box className="flex-1 flex items-center justify-center bg-muted/10">
     |-              <CategoryPlaceholder category={category} size="md" />
     |-            </Box>
     |-          </Box>
     |-        )}
     |-        <Box className="absolute top-4 left-4">
     |-          <Box className="px-3 py-1 bg-surface/90 backdrop-blur-sm border border-line rounded-none">
     |-            <Text variant="mono" size="micro" weight="font-bold" className="text-accent-navy uppercase tracking-wider">
     |-              {category}
     |-            </Text>
     |-          </Box>
     |-        </Box>
     |-      </Box>
     |-      <CardImagePlaceholder
     |-        image={image}
     |-        category={category}
     |-        date={date}
     |-        title={title}
     |-      />
  48 |+      <CardImage image={image} title={title} category={category} />
  49 | 
  50 |       {/* Content Area */}
     |-      <Stack gap={4} padding={5} flex={1} justify="between">
     |-        <Stack gap={3}>
     |-          {/* Only show meta row if we have an image (since no-image uses compact header) */}
     |-          {image && (
     |-            <Box display="flex" align="center" gap={3}>
     |-              <Text variant="mono" size="xs" color="dim" uppercase className="tracking-widest">
     |-                {date}
     |-              </Text>
     |-              <Box className="w-1 h-1 rounded-full bg-line" />
     |-              <Text variant="mono" size="xs" color="dim" uppercase className="tracking-widest flex items-center gap-1">
     |-                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
     |-                {rt} min
     |-              </Text>
     |-            </Box>
     |-          )}
     |-
     |-          {/* If no image, we still want to show reading time somewhere if possible,
     |-              but let's keep it clean as requested. The audit says "compact header strip"
     |-              and "footer row" for card structure. */}
     |-
     |-          {!image && (
     |-             <Box display="flex" align="center" gap={3}>
     |-                <Text variant="mono" size="xs" color="dim" uppercase className="tracking-widest flex items-center gap-1">
     |-                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-30"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
     |-                  {rt} min
     |-                </Text>
     |-             </Box>
     |-          )}
     |-
  51 |+      <Stack gap={5} padding={6} flex={1} justify="between">
  52 |+        <Stack gap={4}>
  53 |+          <Box display="flex" align="center" gap={3}>
  54 |+            <Text variant="mono" size="xs" color="dim" uppercase className="tracking-widest">
  55 |+              {date}
  56 |+            </Text>
  57 |+            <Box className="w-1 h-1 rounded-full bg-line" />
  58 |+            <Text variant="mono" size="xs" color="dim" uppercase className="tracking-widest flex items-center gap-1">
  59 |+              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
  60 |+              {rt} min read
  61 |+            </Text>
  62 |+          </Box>
  63 |           <Text 
  64 |             variant="body"
     |-            size="lg"
  65 |+            size="xl"
  66 |             weight="font-bold"
     |-            className="text-accent-navy leading-tight group-hover:text-accent transition-colors line-clamp-2"
  67 |+            className="text-accent-navy leading-snug group-hover:text-accent transition-colors"
  68 |           >
  69 |             {title}
  70 |           </Text>
     |-          <Text variant="body" size="sm" color="dim" className="line-clamp-2 leading-relaxed opacity-80">
     |-             {excerpt || `Discover technical insights in ${category.toLowerCase()} methodology.`}
  71 |+          <Text variant="body" size="base" color="dim" className="line-clamp-2 leading-relaxed">
  72 |+             {excerpt || `Discover the technical intersections of robotics and dance in this deep dive into ${category.toLowerCase()} methodology and engineering principles.`}
  73 |           </Text>
  74 |         </Stack>
  75 | 
     |-        <Box display="flex" align="center" gap={2} paddingTop={4} className="border-t border-line/50 mt-auto">
     |-          <Text variant="mono" size="xs" weight="font-bold" className="text-accent tracking-wider">
     |-            Read Article
     |-          </Text>
     |-          <Box className="w-0 h-[1px] bg-accent group-hover:w-6 transition-all duration-500" />
     |-          <Text variant="mono" size="xs" className="text-accent ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
     |-            →
  76 |+        <Box display="flex" align="center" gap={2} paddingTop={6} className="border-t border-line mt-auto">
  77 |+          <Text variant="mono" size="xs" className="text-accent font-semibold uppercase tracking-[0.15em]">
  78 |+            Read {title}
  79 |           </Text>
  80 |+          <Box className="w-0 h-[1.5px] bg-accent group-hover:w-8 transition-all duration-500" />
  81 |         </Box>
  82 |       </Stack>
  83 |     </Box>
```

### `src/components/ui/FilterBar.tsx` (modified)
**Valid Comment Ranges (New File):** 21-27
```diff
@@ -21,7 +21,7 @@ export function FilterBar({ categories }: FilterBarProps) {
  21 |             paddingY={2}
  22 |             radius="none"
  23 |             className={cn(
     |-              "transition-all duration-300 border text-sm font-bold",
  24 |+              "transition-all duration-300 border text-sm font-bold uppercase tracking-widest",
  25 |               activeCategory === cat
  26 |                 ? "bg-text-main text-bg border-text-main"
  27 |                 : "bg-bg text-text-dim border-line hover:border-accent hover:text-accent"
```

### `src/components/ui/HeroPathCard.tsx` (modified)
**Valid Comment Ranges (New File):** 27-40, 65-71
```diff
@@ -27,14 +27,14 @@ export function HeroPathCard({ label, title, paths, tag, image, span = 1, icon:
  27 |         <Stack gap={8}>
  28 |           <Box display="flex" align="center" gap={3}>
  29 |             <Icon className="w-5 h-5 text-accent" />
     |-            <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-widest uppercase">
  30 |+            <Text variant="mono" size="xs" color="dim" weight="font-semibold" tracking="widest" className=" uppercase">
  31 |               {tag.split(' // ')[0]}
  32 |             </Text>
  33 |           </Box>
  34 |           
  35 |           <Stack gap={6}>
  36 |             <Text 
     |-              variant="display" 
  37 |+              variant="displayLower"
  38 |               size="4xl" 
  39 |               weight="font-black" 
  40 |               className="tracking-tight leading-tight text-accent-navy transition-colors"
@@ -65,7 +65,7 @@ export function HeroPathCard({ label, title, paths, tag, image, span = 1, icon:
  65 |         </Stack>
  66 | 
  67 |         <Box display="flex" justify="between" align="center" paddingTop={8} className="border-t border-slate-200">
     |-          <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-widest uppercase">
  68 |+          <Text variant="mono" size="xs" color="dim" weight="font-semibold" tracking="widest" className=" uppercase">
  69 |             {tag}
  70 |           </Text>
  71 |           <Box className="w-8 h-[2px] bg-accent/20 group-hover:w-16 group-hover:bg-accent transition-all duration-500 rounded-none" />
```

### `src/components/ui/ListRow.tsx` (modified)
**Valid Comment Ranges (New File):** 23-37
```diff
@@ -23,15 +23,15 @@ export function ListRow({ slug, title, category, excerpt, date, basePath, conten
  23 |       className="group hover:bg-surface/50 transition-colors"
  24 |     >
  25 |       <Box className="w-1 self-stretch bg-accent shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
     |-      <Box className="w-12 h-12 m-3 shrink-0 rounded-none overflow-hidden flex items-center justify-center">
  26 |+      <Box className="w-12 h-12 m-3 shrink-0 rounded-none overflow-hidden">
  27 |         <CategoryPlaceholder category={category} size="md" />
  28 |       </Box>
  29 |       <Stack gap={1} flex className="py-3 min-w-0">
  30 |         <Box display="flex" align="center" gap={3}>
     |-          <Text variant="mono" size="micro" color="brand" className="uppercase shrink-0">{category}</Text>
  31 |+          <Text variant="mono" size="micro" color="brand" uppercase={true} className="shrink-0">{category}</Text>
  32 |           <Text variant="mono" size="micro" color="dim">{date}</Text>
  33 |         </Box>
     |-        <Text variant="display" size="sm" weight="font-bold" className="line-clamp-1">{title}</Text>
  34 |+        <Text variant="display" size="sm" weight="font-bold" className="line-clamp-2">{title}</Text>
  35 |         <Text variant="body" size="xs" color="dim" className="truncate">{excerpt}</Text>
  36 |       </Stack>
  37 |       <Box display="flex" align="center" gap={3} padding={4} className="shrink-0 text-text-dim">
```

### `src/components/ui/PageHeader.tsx` (modified)
**Valid Comment Ranges (New File):** 1-24, 31-38
```diff
@@ -1,38 +1,24 @@
   1 | import { Box, Stack, Text } from '@/layouts/Primitives';
     |-import type { BaseProps } from '@/layouts/Box';
   2 | 
   3 | interface PageHeaderProps {
   4 |   label: string;
   5 |   title: string;
   6 |   description?: string;
   7 |   as?: keyof JSX.IntrinsicElements;
     |-  paddingBottom?: BaseProps['paddingBottom'];
     |-  border?: BaseProps['border'];
     |-  descriptionMaxWidth?: BaseProps['maxWidth'];
   8 | }
   9 | 
     |-export function PageHeader({ label, title, description, as = "h1", paddingBottom = 12, border = "b", descriptionMaxWidth = "prose" }: PageHeaderProps) {
  10 |+export function PageHeader({ label, title, description, as = "h1" }: PageHeaderProps) {
  11 |   return (
     |-    <Box
     |-      paddingBottom={paddingBottom}
     |-      border={border}
     |-    >
  12 |+    <Box paddingBottom={10} className="border-b border-slate-200">
  13 |       <Stack gap={4}>
     |-        <Text variant="mono" size="xs" color="dim" weight="font-semibold" tracking="widest" uppercase>
  14 |+        <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase={true} >
  15 |           {label}
  16 |         </Text>
  17 |         <Text as={as} variant="headline" size="fluid-7" weight="font-black" className="text-accent-navy leading-tight tracking-tight text-balance">
  18 |           {title}
  19 |         </Text>
  20 |         {description && (
     |-          <Text
     |-            variant="body"
     |-            size={{ base: "lg", lg: "xl" }}
     |-            color="dim"
     |-            maxWidth={descriptionMaxWidth}
     |-            marginTop={4}
     |-            className="leading-relaxed"
     |-          >
  21 |+          <Text variant="sans" size="lg" color="dim" maxWidth="3xl" marginTop={4} weight="font-medium" className="leading-relaxed">
  22 |             {description}
  23 |           </Text>
  24 |         )}
@@ -45,8 +31,8 @@ export function SectionHeader({ label, title, children }: { label: string; title
  31 |   return (
  32 |     <Box display="flex" justify="between" align="end" border="b" paddingBottom={4} className="border-slate-200">
  33 |       <Stack gap={1}>
     |-        <Text variant="mono" size="xs" color="dim" weight="font-semibold" tracking="widest" uppercase>{label}</Text>
     |-        <Text variant="display" size="3xl" weight="font-black" className="text-accent-navy">{title}</Text>
  34 |+        <Text variant="mono" size="xs" color="dim" weight="font-semibold" >{label}</Text>
  35 |+        <Text variant="displayLower" size="3xl" weight="font-black" className="text-accent-navy">{title}</Text>
  36 |       </Stack>
  37 |       {children}
  38 |     </Box>
```

### `src/components/ui/Skeleton.tsx` (modified)
**Valid Comment Ranges (New File):** 2-7
```diff
@@ -2,13 +2,6 @@ import { cn } from '@/lib/utils';
   2 | 
   3 | export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
   4 |   return (
     |-    <div
     |-      className={cn(
     |-        'relative overflow-hidden bg-line/10',
     |-        'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
     |-        className
     |-      )}
     |-      {...props}
     |-    />
   5 |+    <div className={cn('animate-pulse rounded-md bg-line/20', className)} {...props} />
   6 |   );
   7 | }
```

### `src/features/contact/components/ContactFormView.tsx` (modified)
**Valid Comment Ranges (New File):** 23-29, 40-46, 54-65, 78-84, 93-99, 123-129, 135-142
```diff
@@ -23,7 +23,7 @@ interface ContactFormViewProps {
  23 |   onSubmit: (e: FormEvent) => void;
  24 | }
  25 | 
     |-const inputClasses = "w-full bg-bg border px-4 py-3 text-base sm:text-sm font-sans rounded-lg transition-all focus:outline-none focus:border-accent-brand focus:ring-2 focus:ring-accent-brand/20 placeholder:text-text-dim/50";
  26 |+const inputClasses = "w-full bg-bg border px-4 py-3 text-base sm:text-sm font-sans rounded-lg transition-all focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 placeholder:text-text-dim/50";
  27 | 
  28 | export function ContactFormView({ formData, errors, isSubmitting, onChange, onSubmit }: ContactFormViewProps) {
  29 |   return (
@@ -40,7 +40,7 @@ export function ContactFormView({ formData, errors, isSubmitting, onChange, onSu
  40 |             <Stack gap={12}>
  41 |               <Stack gap={6}>
  42 |                 <Box paddingBottom={4} className="border-b border-slate-200">
     |-                  <Text as="h3" variant="display" size="2xl" weight="font-black" className="text-accent-navy">Inquiries</Text>
  43 |+                  <Text as="h3" variant="displayLower" size="2xl" weight="font-black" className="text-accent-navy">Inquiries</Text>
  44 |                 </Box>
  45 |                 <Text variant="body" size="base" maxWidth="md" color="dim">
  46 |                   I&apos;m always open to new ideas, questions about my reviews, or just chat about the dance scene.
@@ -54,12 +54,12 @@ export function ContactFormView({ formData, errors, isSubmitting, onChange, onSu
  54 |                   { label: 'General', channel: 'Discussion', icon: MessageSquare },
  55 |                 ].map((item) => (
  56 |                   <Box key={item.label} display="flex" align="center" gap={6} className="group">
     |-                    <Box width={12} height={12} border surface="muted" display="flex" align="center" justify="center" color="dim" className="group-hover:border-accent-brand group-hover:bg-accent-brand/5 transition-colors" radius="lg">
  57 |+                    <Box width={12} height={12} border={true} surface="muted" display="flex" align="center" justify="center" color="dim" className="group-hover:border-accent group-hover:bg-accent/5 transition-colors" radius="lg">
  58 |                       <item.icon className="w-6 h-6 stroke-1" />
  59 |                     </Box>
  60 |                     <Stack gap={1}>
  61 |                       <Text variant="sans" size="base" weight="font-bold" className="text-accent-navy">{item.label}</Text>
     |-                      <Text variant="mono" color="dim" size="xs" weight="font-semibold" className="tracking-widest uppercase">{item.channel}</Text>
  62 |+                      <Text variant="mono" color="dim" size="xs" weight="font-semibold" tracking="widest" className=" uppercase">{item.channel}</Text>
  63 |                     </Stack>
  64 |                   </Box>
  65 |                 ))}
@@ -78,7 +78,7 @@ export function ContactFormView({ formData, errors, isSubmitting, onChange, onSu
  78 |                     aria-required="true"
  79 |                     className={cn(
  80 |                       inputClasses,
     |-                      errors.name ? 'border-accent-brand' : 'border-line'
  81 |+                      errors.name ? 'border-accent' : 'border-line'
  82 |                     )}
  83 |                     value={formData.name}
  84 |                     onChange={onChange}
@@ -93,7 +93,7 @@ export function ContactFormView({ formData, errors, isSubmitting, onChange, onSu
  93 |                     aria-required="true"
  94 |                     className={cn(
  95 |                       inputClasses,
     |-                      errors.email ? 'border-accent-brand' : 'border-line'
  96 |+                      errors.email ? 'border-accent' : 'border-line'
  97 |                     )}
  98 |                     value={formData.email}
  99 |                     onChange={onChange}
@@ -123,7 +123,7 @@ export function ContactFormView({ formData, errors, isSubmitting, onChange, onSu
 123 |                     className={cn(
 124 |                       inputClasses,
 125 |                       "resize-none",
     |-                      errors.message ? 'border-accent-brand' : 'border-line'
 126 |+                      errors.message ? 'border-accent' : 'border-line'
 127 |                     )}
 128 |                     value={formData.message}
 129 |                     onChange={onChange}
@@ -135,7 +135,8 @@ export function ContactFormView({ formData, errors, isSubmitting, onChange, onSu
 135 |                   variant="professional"
 136 |                   disabled={isSubmitting}
 137 |                   fullWidth
     |-                  className="py-4 font-semibold text-base"
 138 |+                  paddingY={4}
 139 |+                  className="font-semibold text-base"
 140 |                 >
 141 |                   {isSubmitting ? (
 142 |                     <Stack direction="row" align="center" gap={3}>
```

### `src/features/contact/components/FormField.tsx` (modified)
**Valid Comment Ranges (New File):** 14-20
```diff
@@ -14,7 +14,7 @@ export function FormField({ label, error, children }: FormFieldProps) {
  14 |   return (
  15 |     <Stack gap={2} marginBottom={6}>
  16 |       <Box display="flex" justify="between" align="center">
     |-        <Text as="label" htmlFor={id} variant="mono" size="xs" weight="font-semibold" color="dim" className="tracking-widest uppercase">
  17 |+        <Text as="label" htmlFor={id} variant="mono" size="xs" weight="font-semibold" color="dim" tracking="widest" className=" uppercase">
  18 |           {label}
  19 |         </Text>
  20 |         {error && (
```

### `src/features/contact/components/SuccessState.tsx` (modified)
**Valid Comment Ranges (New File):** 33-39
```diff
@@ -33,7 +33,7 @@ export function SuccessState({ onReset }: SuccessStateProps) {
  33 |           paddingY={4}
  34 |           color="accent"
  35 |           cursor="pointer"
     |-          className="hover:bg-accent-brand/5 transition-colors"
  36 |+          className="hover:bg-accent/5 transition-colors"
  37 |         >
  38 |           Send Another Message
  39 |         </Box>
```

### `src/features/dashboard/EventCard.tsx` (modified)
**Valid Comment Ranges (New File):** 11-33
```diff
@@ -11,16 +11,23 @@ interface EventCardProps {
  11 | export function EventCard({ name, date, status, icon: Icon }: EventCardProps) {
  12 |   return (
  13 |     <Box
     |-      className="flex flex-col h-full bg-surface/50 border border-line p-6 lg:p-8"
  14 |+      display="flex"
  15 |+      direction="col"
  16 |+      height="full"
  17 |+      surface="default"
  18 |+      opacity={50}
  19 |+      border={true}
  20 |+      padding={6}
  21 |+      paddingLarge={8}
  22 |     >
  23 |       <Stack gap={4}>
     |-        <Box className="flex items-center gap-3">
  24 |+        <Box display="flex" align="center" gap={3}>
  25 |           <Icon className="w-5 h-5 text-accent" />
     |-          <Text variant="mono" size="xs" color="dim" uppercase className="tracking-widest">
  26 |+          <Text variant="mono" size="xs" color="dim" uppercase >
  27 |             {status}
  28 |           </Text>
  29 |         </Box>
     |-        <Text variant="display" size="xl" weight="font-black" className="text-accent-navy leading-snug">
  30 |+        <Text variant="displayLower" size="xl" weight="font-black" className="text-accent-navy leading-snug">
  31 |           {name}
  32 |         </Text>
  33 |         <Text variant="body" size="base" color="dim">
```

### `src/features/email-capture/EmailForm.tsx` (modified)
**Valid Comment Ranges (New File):** 22-50, 64-70
```diff
@@ -22,22 +22,29 @@ export function EmailForm() {
  22 |           onChange={(e) => setEmail(e.target.value)}
  23 |           required
  24 |           disabled={status === 'loading' || status === 'success'}
     |-          className={`${inputs.base} min-h-[44px] w-full`}
  25 |+          className={`${inputs.base} min-h-12 w-full`}
  26 |         />
  27 |         <Button
  28 |           type="submit"
  29 |           variant="primary"
  30 |           disabled={status === 'loading' || status === 'success'}
     |-          className="min-h-[44px] w-auto min-w-[140px] sm:min-w-[180px] px-6"
  31 |+          minHeight={12}
  32 |+          width="auto"
  33 |+          minWidth={{ base: 36, sm: 44 }}
  34 |+          paddingX={6}
  35 |         >
  36 |           <AnimatePresence mode="wait">
     |-            <motion.div
  37 |+            <Box
  38 |+              as={motion.div}
  39 |               key={status}
  40 |               initial={{ opacity: 0, y: 5 }}
  41 |               animate={{ opacity: 1, y: 0 }}
  42 |               exit={{ opacity: 0, y: -5 }}
  43 |               transition={{ duration: 0.2 }}
     |-              className="flex items-center justify-center gap-2"
  44 |+              display="flex"
  45 |+              align="center"
  46 |+              justify="center"
  47 |+              gap={2}
  48 |             >
  49 |               {status === 'loading' && (
  50 |                 <>
@@ -57,7 +64,7 @@ export function EmailForm() {
  64 |                   <ArrowRight className="w-4 h-4 text-bg" />
  65 |                 </>
  66 |               )}
     |-            </motion.div>
  67 |+            </Box>
  68 |           </AnimatePresence>
  69 |         </Button>
  70 |       </Stack>
```

### `src/features/email-capture/NewsletterBanner.tsx` (modified)
**Valid Comment Ranges (New File):** 16-23, 29-37, 42-55
```diff
@@ -16,7 +16,8 @@ export function NewsletterBanner() {
  16 |       animate={motionTokens.overlay.animate}
  17 |       exit={motionTokens.overlay.exit}
  18 |       transition={motionTokens.overlay.transition}
     |-      className="bg-white/80 backdrop-blur-xl border border-line/50 rounded-none mx-auto"
  19 |+      className="bg-white/80 backdrop-blur-xl border border-line/50 rounded-none"
  20 |+      marginX="auto"
  21 |       padding="emailBar"
  22 |       position="fixed"
  23 |       style={{ bottom: 0, left: '1rem', right: '1rem', width: 'calc(100% - 2rem)' }}
@@ -28,7 +29,9 @@ export function NewsletterBanner() {
  29 |           size="sm"
  30 |           onClick={hideBar}
  31 |           aria-label="Dismiss"
     |-          className="p-1 min-h-0 min-w-0"
  32 |+          padding={1}
  33 |+          minHeight={0}
  34 |+          minWidth={0}
  35 |         >
  36 |           <X className="w-4 h-4 text-text-dim hover:text-accent transition-colors" />
  37 |         </Button>
@@ -39,14 +42,14 @@ export function NewsletterBanner() {
  42 |         align="center" 
  43 |         justify="between" 
  44 |         gap={{ base: 4, md: 8 }}
     |-        className="w-full"
  45 |+        width="full"
  46 |       >
     |-        <Stack direction="row" align="center" gap={4} className="w-full md:w-auto">
  47 |+        <Stack direction="row" align="center" gap={4} width={{ base: "full", md: "auto" }}>
  48 |           <Box padding="compact" surface="accent" opacity={5} display={{ base: 'none', sm: 'block' }}>
     |-            <Mail className="w-5 h-5 text-accent-brand" />
  49 |+            <Mail className="w-5 h-5 text-accent" />
  50 |           </Box>
  51 |           <Stack gap={0}>
     |-            <Text variant="display" size="base" uppercase tracking="tight">
  52 |+            <Text variant="display" size="base" tracking="tight">
  53 |               Weekly Insights
  54 |             </Text>
  55 |             <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">
```

### `src/features/journal/BlogPost.tsx` (modified)
**Valid Comment Ranges (New File):** 27-34
```diff
@@ -27,8 +27,8 @@ export default function BlogPost() {
  27 |     return (
  28 |       <Box padding="panel" textAlign="center">
  29 |         <Stack gap={8} align="center">
     |-          <Text variant="display" size="2xl">Post Not Found</Text>
     |-          <Box as="button" onClick={() => navigate('/blog')} className="hover:text-accent-brand transition-colors">
  30 |+          <Text variant="displayLower" size="2xl">Post Not Found</Text>
  31 |+          <Box as="button" onClick={() => navigate('/blog')} cursor="pointer" className="hover:text-accent transition-colors">
  32 |             <Text variant="mono" size="xs">Back to Journal</Text>
  33 |           </Box>
  34 |         </Stack>
```

### `src/features/journal/components/BlogPostDetail.tsx` (modified)
**Valid Comment Ranges (New File):** 1-6, 29-48, 51-57, 72-78
```diff
@@ -1,5 +1,6 @@
   1 | import { User, Share2 } from 'lucide-react';
   2 | import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
   3 |+import { contentWidth } from '@/styles/design-tokens';
   4 | import { Post, getPosts } from '@/lib/content';
   5 | import { ContentCard } from '@/components/ui/ContentCard';
   6 | import { useMemo } from 'react';
@@ -28,32 +29,20 @@ export function BlogPostDetail({ post, onBack, backLabel }: BlogPostDetailProps)
  29 |       .slice(0, 2);
  30 |   }, [post.category, post.slug]);
  31 | 
     |-  const sidebar = headings.length > 0 ? <TOC headings={headings} /> : undefined;
  32 |+  const sidebar = <TOC headings={headings} />;
  33 | 
  34 |   const headerExtras = (
  35 |     <Box display="flex" align="center" justify="between" border="y" paddingY={6} className="border-line/50">
  36 |       <Box display="flex" align="center" gap={4}>
     |-        <Box className="relative w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white overflow-hidden border border-line/20">
     |-          <Text variant="mono" size="xs" weight="font-bold">
     |-            {post.author ? post.author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'AA'}
     |-          </Text>
     |-          {post.authorAvatar ? (
     |-            <img
     |-              src={post.authorAvatar}
     |-              alt={post.author}
     |-              className="absolute inset-0 w-full h-full object-cover bg-accent"
     |-              onError={(e) => {
     |-                (e.target as HTMLImageElement).style.display = 'none';
     |-              }}
     |-            />
     |-          ) : null}
  37 |+        <Box width={10} height={10} radius="none" surface="accent" display="flex" align="center" justify="center" color="white">
  38 |+          <Text variant="mono" size="xs" weight="font-bold">AA</Text>
  39 |         </Box>
  40 |         <Stack gap={0}>
  41 |           <Text variant="mono" size="xs" weight="font-bold">{post.author || 'Ariel Anders, PhD'}</Text>
  42 |           <Text variant="mono" size="tiny" color="dim">Author & Engineer</Text>
  43 |         </Stack>
  44 |       </Box>
     |-      <Box as="button" display="flex" align="center" gap={2} color="dim" className="hover:text-accent-brand transition-colors">
  45 |+      <Box as="button" display="flex" align="center" gap={2} color="dim" cursor="pointer" className="hover:text-accent transition-colors">
  46 |         <Share2 className="w-4 h-4" />
  47 |         <Text variant="mono" size="xs">Share</Text>
  48 |       </Box>
@@ -62,7 +51,7 @@ export function BlogPostDetail({ post, onBack, backLabel }: BlogPostDetailProps)
  51 | 
  52 |   const relatedContent = relatedPosts.length > 0 && (
  53 |     <Box border="t" paddingTop={12} marginTop={12}>
     |-      <Text variant="mono" size="xs" weight="font-bold" className="mb-8 block uppercase tracking-widest">Related Posts</Text>
  54 |+      <Text as="span" variant="mono" size="xs" weight="font-bold" display="block" marginBottom={8} uppercase={true} >Related Posts</Text>
  55 |       <Grid cols={{ base: 1, md: 2 }} gap={8}>
  56 |         {relatedPosts.map(p => (
  57 |           <ContentCard key={p.slug} {...p} basePath="/blog" />
@@ -83,6 +72,7 @@ export function BlogPostDetail({ post, onBack, backLabel }: BlogPostDetailProps)
  72 |       sidebar={sidebar}
  73 |       headerExtras={headerExtras}
  74 |       relatedContent={relatedContent}
  75 |+      proseWidth={contentWidth.article}
  76 |     />
  77 |   );
  78 | }
```

### `src/features/lab/BlogDrafter.tsx` (modified)
**Valid Comment Ranges (New File):** 23-34, 59-65, 72-82, 92-102, 111-121, 129-139, 147-157, 207-219
```diff
@@ -23,12 +23,12 @@ export function BlogDrafter() {
  23 |     <Stack gap={10} height="full">
  24 |       <Stack gap={4}>
  25 |         <Box display="flex" align="center" gap={3}>
     |-           <Terminal className="w-5 h-5 text-accent-brand" />
     |-           <Text variant="display" size="2xl">CONTENT PIPELINE</Text>
  26 |+           <Terminal className="w-5 h-5 text-accent" />
  27 |+           <Text variant="display" size="2xl" color="brand" uppercase={true}>CONTENT PIPELINE</Text>
  28 |         </Box>
     |-        <Box border surface="accent" padding="compact" opacity={5} className="bg-accent/5">
  29 |+        <Box border={true} surface="accent" padding="compact" opacity={5}>
  30 |            <Stack gap={2} display="flex" align="start" direction="row">
     |-              <Info className="w-4 h-4 text-accent-brand shrink-0 mt-1" />
  31 |+              <Info className="w-4 h-4 text-accent shrink-0" />
  32 |               <Text variant="body" size="xs">
  33 |                 This tool prepares your blog post for the Tech-Dancer automated pipeline.
  34 |                 Complete the form below to generate a pre-formatted GitHub Issue link.
@@ -59,7 +59,7 @@ export function BlogDrafter() {
  59 |                 padding={3}
  60 |                 variant="mono"
  61 |                 size="sm"
     |-                className="focus:border-accent-brand outline-none"
  62 |+                className="focus:border-accent outline-none"
  63 |               />
  64 |             </Stack>
  65 | 
@@ -72,11 +72,11 @@ export function BlogDrafter() {
  72 |                   onChange={(e: any) => updateField('category', e.target.value)}
  73 |                   width="full"
  74 |                   surface="default"
     |-                  border
  75 |+                  border={true}
  76 |                   padding={3}
  77 |                   variant="mono"
  78 |                   size="sm"
     |-                  className="focus:border-accent-brand outline-none appearance-none"
  79 |+                  className="focus:border-accent outline-none appearance-none"
  80 |                 >
  81 |                   {CONTENT_CATEGORIES.map(cat => (
  82 |                     <option key={cat.id} value={cat.id}>{cat.label}</option>
@@ -92,11 +92,11 @@ export function BlogDrafter() {
  92 |                   onChange={(e: any) => updateField('date', e.target.value)}
  93 |                   width="full"
  94 |                   surface="default"
     |-                  border
  95 |+                  border={true}
  96 |                   padding={3}
  97 |                   variant="mono"
  98 |                   size="sm"
     |-                  className="focus:border-accent-brand outline-none"
  99 |+                  className="focus:border-accent outline-none"
 100 |                 />
 101 |               </Stack>
 102 |             </Grid>
@@ -111,11 +111,11 @@ export function BlogDrafter() {
 111 |                 width="full"
 112 |                 height={20}
 113 |                 surface="default"
     |-                border
 114 |+                border={true}
 115 |                 padding={3}
 116 |                 variant="mono"
 117 |                 size="sm"
     |-                className="focus:border-accent-brand outline-none resize-none"
 118 |+                className="focus:border-accent outline-none resize-none"
 119 |               />
 120 |             </Stack>
 121 | 
@@ -129,11 +129,11 @@ export function BlogDrafter() {
 129 |                 placeholder="https://amazon.com/..."
 130 |                 width="full"
 131 |                 surface="default"
     |-                border
 132 |+                border={true}
 133 |                 padding={3}
 134 |                 variant="mono"
 135 |                 size="sm"
     |-                className="focus:border-accent-brand outline-none"
 136 |+                className="focus:border-accent outline-none"
 137 |               />
 138 |             </Stack>
 139 | 
@@ -147,11 +147,11 @@ export function BlogDrafter() {
 147 |                 width="full"
 148 |                 height={40}
 149 |                 surface="default"
     |-                border
 150 |+                border={true}
 151 |                 padding={3}
 152 |                 variant="mono"
 153 |                 size="sm"
     |-                className="focus:border-accent-brand outline-none resize-none"
 154 |+                className="focus:border-accent outline-none resize-none"
 155 |               />
 156 |             </Stack>
 157 |           </Stack>
@@ -207,12 +207,13 @@ export function BlogDrafter() {
 207 |               align="center"
 208 |               justify="center"
 209 |               gap={3}
     |-              surface="accent"
 210 |               padding={4}
     |-              className="bg-accent text-bg hover:bg-accent-brand transition-all cursor-pointer group"
 211 |+              surface="default"
 212 |+              cursor="pointer"
 213 |+              className="bg-text-main text-bg hover:bg-accent transition-all group"
 214 |             >
 215 |               <Github className="w-5 h-5" />
     |-              <Text variant="display" size="base" weight="font-bold">SUBMIT DRAFT</Text>
 216 |+              <Text variant="display" size="base" weight="font-bold" uppercase={true}>SUBMIT DRAFT</Text>
 217 |               <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
 218 |             </Box>
 219 |           </Grid>
```

### `src/features/lab/GearCard.tsx` (modified)
**Valid Comment Ranges (New File):** 1-7, 20-98, 107-112
```diff
@@ -1,7 +1,7 @@
   1 | import { NavLink } from 'react-router-dom';
   2 | import { Box, Stack, Text } from '@/layouts/Primitives';
   3 | import { Resource } from '@/lib/content';
     |-import { CardImagePlaceholder } from '@/components/ui/CardImagePlaceholder';
   4 |+import { CardImage } from '@/components/ui/CardImage';
   5 | 
   6 | interface GearCardProps extends Resource {
   7 |   basePath: string;
@@ -20,78 +20,79 @@ export function GearCard({
  20 |   updatedDate
  21 | }: GearCardProps) {
  22 |   return (
     |-    <Box
  23 |+    <Stack
  24 |       as={NavLink}
  25 |+      direction="col"
  26 |       to={`${basePath}/${slug}`}
     |-      className="group flex flex-col h-full bg-surface border border-line hover:border-accent transition-all duration-300 rounded-none overflow-hidden"
  27 |+      display="flex"
  28 |+      direction="col"
  29 |+      surface="default"
  30 |+      border={true}
  31 |+      className="group transition-all duration-300 overflow-hidden"
  32 |     >
     |-      <CardImagePlaceholder
     |-        image={image}
     |-        category={category}
     |-        date={updatedDate}
     |-        title={title}
     |-      />
  33 |+      {/* Image Wrapper */}
  34 |+      <CardImage image={image} title={title} category={category}>
  35 |+        {verdict && (
  36 |+          <Box position="absolute" className="top-4 right-4">
  37 |+            <Box paddingX={2} paddingY={1} radius="none" className="bg-accent">
  38 |+              <Text variant="mono" size="micro" weight="font-bold" color="white" uppercase={true}>
  39 |+                {verdict}
  40 |+              </Text>
  41 |+            </Box>
  42 |+          </Box>
  43 |+        )}
  44 |+      </CardImage>
  45 | 
  46 |       {/* Content Area */}
     |-      <Stack gap={4} padding={5} flex={1} justify="between">
     |-        <Stack gap={3}>
     |-          <Box display="flex" align="center" justify="between" wrap>
     |-            {rating && (
     |-              <Box display="flex" align="center" gap={1}>
     |-                <span className="text-amber-500 text-xs">
     |-                  {'★'.repeat(Math.floor(rating))}
     |-                  {rating % 1 !== 0 ? '½' : ''}
     |-                </span>
     |-                <Text variant="mono" size="micro" color="dim">
     |-                  ({rating}/5)
     |-                </Text>
     |-              </Box>
     |-            )}
     |-
     |-            {verdict && (
     |-              <Box surface="brand" className="px-1.5 py-0.5 rounded-none border border-line/10">
     |-                <Text variant="mono" size="micro" weight="font-bold" className="uppercase">
     |-                  {verdict}
     |-                </Text>
     |-              </Box>
     |-            )}
     |-          </Box>
  47 |+      <Stack gap={4} padding={6} flex={1}>
  48 |+        <Stack gap={2}>
  49 |+          {rating && (
  50 |+            <Box display="flex" align="center" gap={1} marginBottom={1}>
  51 |+              <span className="text-yellow-400 drop-shadow-sm">
  52 |+                {'★'.repeat(Math.floor(rating))}
  53 |+                {rating % 1 !== 0 ? '½' : ''}
  54 |+              </span>
  55 |+              <Text variant="mono" size="micro" color="dim" emphasis="low">
  56 |+                ({rating}/5)
  57 |+              </Text>
  58 |+            </Box>
  59 |+          )}
  60 | 
     |-          <Text
     |-            variant="body"
     |-            size="lg"
     |-            weight="font-bold"
     |-            className="text-accent-navy leading-tight group-hover:text-accent transition-colors line-clamp-2"
     |-          >
  61 |+          <Text as="h3" variant="headline" size="xl" color="brand" className="group-hover:text-accent transition-colors">
  62 |             {title}
  63 |           </Text>
  64 | 
     |-          <Text variant="body" size="sm" color="dim" className="line-clamp-2 leading-relaxed opacity-80">
  65 |+          <Text variant="body" size="sm" color="dim" className="line-clamp-2">
  66 |              {excerpt}
  67 |           </Text>
  68 | 
     |-          {priceCategory && (
     |-             <Box border className="bg-amber-50/50 px-2 py-0.5 border-amber-200/50 w-fit">
     |-               <Text variant="mono" size="micro" weight="font-bold" className="text-amber-700">{priceCategory}</Text>
     |-             </Box>
  69 |+          {(priceCategory || updatedDate) && (
  70 |+            <Box display="flex" wrap="wrap" align="center" gap={3} marginTop={2}>
  71 |+               {priceCategory && (
  72 |+                 <Box border={true} paddingX={2} paddingY={0.5} className="bg-accent/10 border-accent/20">
  73 |+                   <Text variant="mono" size="tiny" weight="font-bold" color="brand">{priceCategory}</Text>
  74 |+                 </Box>
  75 |+               )}
  76 |+               {updatedDate && (
  77 |+                 <Text variant="mono" size="tiny" color="dim">Updated {updatedDate}</Text>
  78 |+               )}
  79 |+            </Box>
  80 |           )}
  81 |         </Stack>
  82 | 
  83 |         <Stack gap={3} marginTop="auto">
     |-          <Text variant="mono" size="micro" color="dim" className="leading-tight opacity-70 italic">
     |-            * Affiliate links — commission earned at no cost to you.
  84 |+          <Text variant="mono" size="xs" color="dim" className="leading-tight" marginBottom={2}>
  85 |+            * This post contains affiliate links. I may earn a commission at no extra cost to you.
  86 |           </Text>
     |-
     |-          <Box display="flex" align="center" gap={2} paddingTop={4} className="border-t border-line/50">
     |-            <Text variant="mono" size="xs" weight="font-bold" className="text-accent tracking-wider">
     |-              Read Review
  87 |+          <Box display="flex" align="center" justify="between" paddingTop={4} border="t" className="border-line/50">
  88 |+            <Text variant="mono" size="xs" color="brand" weight="font-bold">
  89 |+              Read {title} Review
  90 |             </Text>
     |-            <Box className="w-0 h-[1px] bg-accent group-hover:w-6 transition-all duration-500" />
     |-            <Box className="group-hover:translate-x-1 transition-transform duration-300 ml-auto">
  91 |+            <Box className="group-hover:translate-x-1 transition-transform duration-300">
  92 |               <svg
  93 |                 xmlns="http://www.w3.org/2000/svg"
     |-                width="14"
     |-                height="14"
  94 |+                width="16"
  95 |+                height="16"
  96 |                 viewBox="0 0 24 24"
  97 |                 fill="none"
  98 |                 stroke="currentColor"
@@ -106,6 +107,6 @@ export function GearCard({
 107 |           </Box>
 108 |         </Stack>
 109 |       </Stack>
     |-    </Box>
 110 |+    </Stack>
 111 |   );
 112 | }
```

### `src/features/lab/GearPost.tsx` (modified)
**Valid Comment Ranges (New File):** 34-41
```diff
@@ -34,8 +34,8 @@ export default function GearPost() {
  34 |     return (
  35 |       <Box padding="panel" textAlign="center">
  36 |         <Stack gap={8} align="center">
     |-          <Text variant="display" size="2xl">Review Not Found</Text>
     |-          <Box as="button" onClick={() => navigate('/gear')} className="hover:text-accent-brand transition-colors">
  37 |+          <Text variant="displayLower" size="2xl">Review Not Found</Text>
  38 |+          <Box as="button" onClick={() => navigate('/gear')} cursor="pointer" className="hover:text-accent transition-colors">
  39 |             <Text variant="mono" size="xs">Back to Toolbox</Text>
  40 |           </Box>
  41 |         </Stack>
```

### `src/features/lab/Toolbox.tsx` (modified)
**Valid Comment Ranges (New File):** 20-54, 64-73
```diff
@@ -20,27 +20,35 @@ export default function Toolbox() {
  20 |         description="Rigorous testing and honest takes on the gear that keeps you moving. Gear reviews for West Coast Swing dancers."
  21 |       />
  22 |       {/* Header section with modern design */}
     |-      <header className="mb-12 border-b border-line/50 pb-12">
  23 |+      <Box as="header" marginBottom={12} border="b" paddingBottom={12} className="border-line/50">
  24 |         <Box marginBottom={4}>
     |-          <Box as="span" radius="full" paddingX={3} paddingY={1} className="inline-block bg-accent/10">
  25 |+          <Box as="span" radius="full" paddingX={3} paddingY={1} display="inline-block" className="bg-accent/10">
  26 |             <Text variant="mono" size="tiny" color="brand" weight="font-bold">THE TOOLBOX</Text>
  27 |           </Box>
  28 |         </Box>
     |-        <Text as="h1" variant="display" size="4xl" weight="font-black" className="text-accent-navy mb-4 block">
  29 |+        <Text as="h1" variant="displayLower" size="4xl" weight="font-black" marginBottom={4} display="block" color="main">
  30 |           Gear Reviews
  31 |         </Text>
     |-        <Text as="p" variant="sans" size="lg" color="dim" className="max-w-2xl mb-8 font-medium block">
  32 |+        <Text as="p" variant="sans" size="lg" color="dim" maxWidth="2xl" marginBottom={8} weight="font-medium" display="block">
  33 |           Rigorous testing and honest takes on the gear that keeps you moving.
  34 |         </Text>
  35 | 
  36 |         {/* Modern Search Bar & Toggle */}
     |-        <Box display="flex" align="center" justify="between" gap={4} flexWrap="wrap">
     |-          <div className="relative max-w-md flex-1">
     |-            <input
  37 |+        <Box display="flex" align="center" justify="between" gap={4} wrap="wrap">
  38 |+          <Box position="relative" maxWidth="md" flex={1}>
  39 |+            <Box
  40 |+              as="input"
  41 |               type="text"
  42 |               placeholder="Search gear (e.g. earplugs, shoes)..."
     |-              className="w-full pl-10 pr-4 py-3 bg-surface border border-line rounded-none focus:ring-4 focus:ring-accent/10 outline-none transition-all text-base md:text-sm"
     |-              onChange={(e) => setSearchTerm(e.target.value)}
  43 |+              paddingLeft={10}
  44 |+              paddingRight={4}
  45 |+              paddingY={3}
  46 |+              width="full"
  47 |+              surface="default"
  48 |+              border={true}
  49 |+              radius="none"
  50 |+              className="focus:ring-4 focus:ring-accent/10 outline-none transition-all text-base md:text-sm"
  51 |+              onChange={(e: any) => setSearchTerm(e.target.value)}
  52 |               value={searchTerm}
  53 |             />
  54 |             <svg
@@ -56,10 +64,10 @@ export default function Toolbox() {
  64 |               <circle cx="11" cy="11" r="8"></circle>
  65 |               <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  66 |             </svg>
     |-          </div>
  67 |+          </Box>
  68 |           <ViewToggle view={view} onChange={setView} />
  69 |         </Box>
     |-      </header>
  70 |+      </Box>
  71 | 
  72 |       {/* Grid: Mobile-first stacking */}
  73 |       {view === 'card' ? (
```

### `src/features/lab/components/GearPostDetail.tsx` (modified)
**Valid Comment Ranges (New File):** 18-43, 53-59, 63-69
```diff
@@ -18,21 +18,26 @@ export function GearPostDetail({ post, onBack, backLabel }: GearPostDetailProps)
  18 | 
  19 |   const headerExtras = (
  20 |     <ScoreGrid>
     |-      <ScoreItem label="Overall" value={post.rating ?? 'N/A'} icon={Star} intent="warning" />
     |-      {post.durability !== undefined && post.durability > 0 && <ScoreItem label="Durability" value={`${post.durability}/5`} />}
     |-      {post.value !== undefined && post.value > 0 && <ScoreItem label="Value" value={`${post.value}/5`} />}
     |-      <ScoreItem label="Price" value={post.priceCategory || '$$'} intent="warning" />
     |-      <ScoreItem label="Updated" value={post.updatedDate || post.date} />
  21 |+      <ScoreItem label="Overall" value={post.rating || 'N/A'} icon={Star} color="text-yellow-500" />
  22 |+      <ScoreItem label="Durability" value={post.durability ? `${post.durability}/5` : '—'} />
  23 |+      <ScoreItem label="Value" value={post.value ? `${post.value}/5` : '—'} />
  24 |+      <ScoreItem label="Price" value={post.priceCategory || '$$'} color="text-amber-600" />
  25 |+      <Stack gap={1} align="center" display={{ base: "none", md: "flex" }}>
  26 |+        <Text variant="mono" size="tiny" color="dim" uppercase={true}>Updated</Text>
  27 |+        <Text variant="mono" size="tiny" weight="font-bold" uppercase={true}>{post.updatedDate || post.date}</Text>
  28 |+      </Stack>
  29 |     </ScoreGrid>
  30 |   );
  31 | 
     |-  const sidebar = (post.specs && Object.keys(post.specs).length > 0) || affiliateLinks.length > 0 ? (
  32 |+  const sidebar = (
  33 |     <>
     |-      {post.specs && Object.keys(post.specs).length > 0 && <SpecsTable specs={post.specs} />}
  34 |+      {post.specs && Object.keys(post.specs).length > 0 && (
  35 |+        <SpecsTable specs={post.specs} />
  36 |+      )}
  37 | 
  38 |       {affiliateLinks.length > 0 && (
  39 |         <Stack gap={4} marginTop={8}>
     |-          <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase className="tracking-widest border-b border-line pb-2">Where to Buy</Text>
  40 |+          <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase={true} paddingBottom={2} border="b" tracking="widest" className=" border-line">Where to Buy</Text>
  41 |           {affiliateLinks.map(link => (
  42 |             <Box
  43 |               key={link.id}
@@ -48,7 +53,7 @@ export function GearPostDetail({ post, onBack, backLabel }: GearPostDetailProps)
  53 |               border
  54 |               className="hover:border-accent group transition-all"
  55 |             >
     |-              <Text variant="mono" size="xs" weight="font-bold">{link.name || link.label || link.url}</Text>
  56 |+              <Text variant="mono" size="xs" weight="font-bold">{link.label}</Text>
  57 |               <ExternalLink className="w-4 h-4 text-accent opacity-30 group-hover:opacity-100" />
  58 |             </Box>
  59 |           ))}
@@ -58,7 +63,7 @@ export function GearPostDetail({ post, onBack, backLabel }: GearPostDetailProps)
  63 |         </Stack>
  64 |       )}
  65 |     </>
     |-  ) : undefined;
  66 |+  );
  67 | 
  68 |   return (
  69 |     <DetailLayout
```

### `src/features/profile/BioContent.tsx` (modified)
**Valid Comment Ranges (New File):** 12-18
```diff
@@ -12,7 +12,7 @@ export default function BioContent({ data }: BioContentProps) {
  12 |         <Stack key={section.id} gap={4}>
  13 |           <Box paddingBottom={4} border="b">
  14 |             <Text
     |-              variant="display"
  15 |+              variant="displayLower"
  16 |               size="2xl"
  17 |               weight="font-black"
  18 |               className="text-accent-navy"
```

### `src/features/profile/ProfileSidebar.tsx` (modified)
**Valid Comment Ranges (New File):** 30-36, 43-55, 63-69, 98-104
```diff
@@ -30,7 +30,7 @@ export default function ProfileSidebar({ data }: ProfileSidebarProps) {
  30 |         maxWidth={{ base: 'full', md: imageSizes.profile }}
  31 |         shrink={0}
  32 |       >
     |-        <User className="w-24 h-24 text-line stroke-[0.5]" />
  33 |+        <User className="w-24 h-24 text-line stroke-1" />
  34 |       </Box>
  35 | 
  36 |       <Box flex={1} className="space-y-8" minWidth={0}>
@@ -43,12 +43,13 @@ export default function ProfileSidebar({ data }: ProfileSidebarProps) {
  43 |                 color="dim"
  44 |                 weight="font-semibold"
  45 |                 display="block"
     |-                className="tracking-[0.15em] uppercase"
  46 |+                tracking="widest"
  47 |+                uppercase={true}
  48 |               >
  49 |                 {detail.label}
  50 |               </Text>
  51 |               <Text
     |-                variant="display"
  52 |+                variant="displayLower"
  53 |                 size="lg"
  54 |                 marginTop={1}
  55 |                 weight="font-bold"
@@ -62,7 +63,7 @@ export default function ProfileSidebar({ data }: ProfileSidebarProps) {
  63 | 
  64 |         <Stack gap={6}>
  65 |           <Stack gap={3}>
     |-            <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-[0.15em] uppercase">Connect</Text>
  66 |+            <Text variant="mono" size="xs" color="dim" weight="font-semibold" tracking="widest" uppercase={true}>Connect</Text>
  67 |             <Box display="flex" gap={5}>
  68 |               {data.socialLinks.map((link) => {
  69 |                 const Icon = platformIcons[link.platform];
@@ -97,7 +98,7 @@ export default function ProfileSidebar({ data }: ProfileSidebarProps) {
  98 |                 className="group text-accent-navy hover:text-accent transition-colors"
  99 |               >
 100 |                 <item.icon className="w-4 h-4" />
     |-                <Text variant="mono" size="xs" weight="font-semibold" className="tracking-[0.15em] uppercase">{item.label}</Text>
 101 |+                <Text variant="mono" size="xs" weight="font-semibold" tracking="widest" uppercase={true}>{item.label}</Text>
 102 |               </Box>
 103 |             ))}
 104 |           </Box>
```

### `src/features/research/ResearchAnalytics.tsx` (modified)
**Valid Comment Ranges (New File):** 5-18, 27-34, 40-61, 66-74, 77-86, 93-99, 103-114
```diff
@@ -5,13 +5,14 @@ import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
   5 | import { SEO } from '@/components/SEO';
   6 | import { PageHeader } from '@/components/ui/PageHeader';
   7 | import { useResearch } from './useResearch';
   8 |+import { contentWidth } from '@/styles/design-tokens';
   9 | 
  10 | export default function ResearchAnalytics() {
  11 |   const navigate = useNavigate();
  12 |   const { studies, tools } = useResearch();
  13 | 
  14 |   return (
     |-    <Box as="section">
  15 |+    <Box as="section" className={`${contentWidth.tool} w-full mx-auto`}>
  16 |       <SEO
  17 |         title="Research"
  18 |         description="Technical studies and data analysis at the intersection of robotics and West Coast Swing. Exploring kinematics, competition data, and biomechanics."
@@ -26,8 +27,8 @@ export default function ResearchAnalytics() {
  27 | 
  28 |         <Stack gap={8}>
  29 |           <Box paddingBottom={4} display="flex" justify="between" align="end" className="border-b border-slate-200">
     |-            <Text variant="display" size="2xl" weight="font-black" className="text-accent-navy">Tools Ecosystem</Text>
     |-            <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-widest">{tools.length} TOOLS</Text>
  30 |+            <Text variant="displayLower" size="2xl" weight="font-black" className="text-accent-navy">Tools Ecosystem</Text>
  31 |+            <Text variant="mono" size="xs" color="dim" weight="font-semibold" >{tools.length} TOOLS</Text>
  32 |           </Box>
  33 |           <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={8}>
  34 |             {tools.map((tool) => (
@@ -39,22 +40,22 @@ export default function ResearchAnalytics() {
  40 |                 border
  41 |                 padding="card"
  42 |                 cursor="pointer"
     |-                className="group hover:border-accent-brand transition-all text-left"
  43 |+                className="group hover:border-accent transition-all text-left"
  44 |               >
  45 |                 <Stack gap={6} height="full" justify="between">
  46 |                   <Stack gap={4}>
  47 |                     <Box display="flex" justify="between" align="start">
     |-                      <Box width={10} height={10} surface="muted" border display="flex" align="center" justify="center" color="dim" className="group-hover:text-accent-brand transition-colors">
  48 |+                      <Box width={10} height={10} surface="muted" border={true} display="flex" align="center" justify="center" color="dim" className="group-hover:text-accent transition-colors">
  49 |                         <Search className="w-5 h-5" />
  50 |                       </Box>
  51 |                       <Text variant="mono" size="micro" color="brand" weight="font-bold">{tool.status.toUpperCase()}</Text>
  52 |                     </Box>
  53 |                     <Stack gap={2}>
     |-                      <Text variant="display" size="xl" className="group-hover:text-accent-brand transition-colors">{tool.name}</Text>
  54 |+                      <Text variant="displayLower" size="xl" color="brand" className="group-hover:text-accent transition-colors">{tool.name}</Text>
  55 |                       <Text variant="body" size="sm" color="dim" className="line-clamp-2">{tool.layman}</Text>
  56 |                     </Stack>
  57 |                   </Stack>
     |-                  <Box display="flex" align="center" gap={2} color="dim" className="group-hover:text-accent-brand transition-colors">
  58 |+                  <Box display="flex" align="center" gap={2} color="dim" className="group-hover:text-accent transition-colors">
  59 |                     <Text variant="mono" size="micro" weight="font-bold">Launch Console</Text>
  60 |                     <ArrowRight className="w-3 h-3" />
  61 |                   </Box>
@@ -65,9 +66,9 @@ export default function ResearchAnalytics() {
  66 |         </Stack>
  67 | 
  68 |         <Stack gap={8}>
     |-          <Box paddingBottom={4} display="flex" justify="between" align="end" className="border-b border-slate-200">
     |-            <Text variant="display" size="2xl" weight="font-black" className="text-accent-navy">Studies</Text>
     |-            <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-widest">{studies.length} ARTICLES</Text>
  69 |+          <Box paddingBottom={4} display="flex" justify="between" align="end" border="b" className="border-slate-200">
  70 |+            <Text variant="displayLower" size="2xl" weight="font-black" color="brand">Studies</Text>
  71 |+            <Text variant="mono" size="xs" color="dim" weight="font-semibold" >{studies.length} ARTICLES</Text>
  72 |           </Box>
  73 | 
  74 |           {studies.length > 0 ? (
@@ -76,10 +77,10 @@ export default function ResearchAnalytics() {
  77 |                 <Box key={study.slug} className="group">
  78 |                   <Stack gap={4}>
  79 |                     <Box display="flex" justify="between" align="center">
     |-                      <Text variant="mono" size="micro" color="brand" uppercase>{study.category}</Text>
  80 |+                      <Text variant="mono" size="micro" color="brand" uppercase={true}>{study.category}</Text>
  81 |                       <Text variant="mono" size="micro" color="dim">{study.date}</Text>
  82 |                     </Box>
     |-                    <Text variant="display" size="2xl" className="group-hover:text-accent-brand transition-colors">
  83 |+                    <Text variant="displayLower" size="2xl" color="brand" className="group-hover:text-accent transition-colors">
  84 |                       {study.title}
  85 |                     </Text>
  86 |                     <Text variant="body" size="sm" color="dim" className="line-clamp-3">
@@ -92,7 +93,7 @@ export default function ResearchAnalytics() {
  93 |                       align="center"
  94 |                       gap={2}
  95 |                       color="dim"
     |-                      className="group-hover:text-accent-brand transition-colors"
  96 |+                      className="group-hover:text-accent transition-colors"
  97 |                     >
  98 |                       <Text variant="mono" size="xs" weight="font-bold">Read Study</Text>
  99 |                       <FileText className="w-4 h-4" />
@@ -102,12 +103,12 @@ export default function ResearchAnalytics() {
 103 |               ))}
 104 |             </Grid>
 105 |           ) : (
     |-            <Box border padding={12} surface="muted" emphasis="low">
     |-              <Stack align="center" gap={4} className="text-center">
     |-                <Database className="w-12 h-12 text-slate-300" />
 106 |+            <Box border={true} padding={12} surface="muted" emphasis="low">
 107 |+              <Stack align="center" gap={4} textAlign="center">
 108 |+                <Database className="w-12 h-12 text-line" />
 109 |                 <Stack gap={2}>
     |-                  <Text variant="display" size="xl">Pipeline Synchronizing...</Text>
     |-                  <Text variant="body" size="sm" color="dim" className="max-w-[40ch]">
 110 |+                  <Text variant="displayLower" size="xl">Pipeline Synchronizing...</Text>
 111 |+                  <Text variant="body" size="sm" color="dim" maxWidth="md">
 112 |                     Research studies are automatically ingested via the ETL pipeline.
 113 |                     New analysis runs weekly—check back soon for recent data.
 114 |                   </Text>
```
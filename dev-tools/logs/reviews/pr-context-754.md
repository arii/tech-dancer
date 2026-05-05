# PR Context: #754 — Resolve CSS class duplication and centralize patterns
**Author:** @arii

## Description
Centralized common CSS patterns (`group-hover:text-accent` and `border-line`) into shared Tailwind 4 utilities. Refactored multiple components to use these utilities, ensuring a more maintainable and consistent styling system. Verified changes with automated tests and visual inspection.

Fixes #753

---
*PR created automatically by Jules for task [12440525774187673552](https://jules.google.com/task/12440525774187673552) started by @arii*

## Files Changed
- 🟡 `src/components/GlobalErrorBoundary.tsx`
- 🟡 `src/components/GlobalSearch.tsx`
- 🟡 `src/components/Navigation.tsx`
- 🟡 `src/components/layout/DetailElements.tsx`
- 🟡 `src/components/ui/ContentCard.tsx`
- 🟡 `src/components/ui/GearCard.tsx`
- 🟡 `src/components/ui/ListRow.tsx`
- 🟡 `src/components/ui/PageHeader.tsx`
- 🟡 `src/components/ui/SectionHeader.tsx`
- 🟡 `src/components/ui/ViewToggle.tsx`
- 🟡 `src/features/dashboard/Dashboard.tsx`
- 🟡 `src/features/dashboard/useHome.ts`
- 🟡 `src/features/email-capture/NewsletterBanner.tsx`
- 🟡 `src/features/lab/components/GearPostDetail.tsx`
- 🟡 `src/features/profile/components/ProfileComponents.tsx`
- 🟡 `src/features/research/ResearchAnalytics.tsx`
- 🟡 `src/features/research/ResearchDetail.tsx`
- 🟡 `src/features/research/components/WCSScraperTool.tsx`
- 🟡 `src/index.css`
- 🟡 `src/layouts/Box.tsx`
- 🟡 `src/lib/variants.ts`
- 🟡 `src/pages/UXAuditor.tsx`
- 🟡 `src/styles/design-tokens.ts`

## Diffs

### `src/components/GlobalErrorBoundary.tsx` (modified)
```diff
@@ -53,7 +53,8 @@ export function GlobalErrorBoundary() {
  53 |           radius="lg"
  54 |           surface="sunken"
  55 |           width="full"
     |-          className="text-left border border-line/50 overflow-auto max-h-[300px]"
  56 |+          border
  57 |+          className="text-left border-line/50 overflow-auto max-h-[300px]"
  58 |         >
  59 |           <Text weight="bold" color="error" className="mb-2 block">
  60 |             {errorMessage}
```

### `src/components/GlobalSearch.tsx` (modified)
```diff
@@ -141,7 +141,7 @@ export function GlobalSearch() {
 141 |               border
 142 |               className="group hover:bg-accent/10 transition-colors border-line/50"
 143 |             >
     |-              <X className="w-4 h-4 text-text-dim group-hover:text-accent" />
 144 |+              <X className="w-4 h-4 text-text-dim interactive-accent" />
 145 |             </Box>
 146 |           </Box>
 147 |
@@ -167,7 +167,7 @@ export function GlobalSearch() {
 167 |                   >
 168 |                      <Stack gap={0.5} flex className="min-w-0">
 169 |                         <Box display="flex" align="center" gap={3}>
     |-                           <Text size="base" weight="font-bold" className="group-hover:text-accent truncate">{highlight(res.title)}</Text>
 170 |+                           <Text size="base" weight="font-bold" className="interactive-accent truncate">{highlight(res.title)}</Text>
 171 |                            <Box border paddingX={2} paddingY={0.5} radius="none" className="border-accent/20 bg-accent/10 shrink-0">
 172 |                               <Text variant="mono" size="micro" color="accent" uppercase weight="font-bold">{res.type}</Text>
 173 |                            </Box>
@@ -193,13 +193,13 @@ export function GlobalSearch() {
 193 |           <Box border="t" paddingX={5} paddingY={3} surface="alt" display="flex" justify="between" align="center">
 194 |              <Box display="flex" align="center" gap={6}>
 195 |                 <Box display="flex" align="center" gap={2}>
     |-                   <Box border paddingX={1.5} paddingY={0.5} radius="industrial" surface="default" display="flex" align="center" justify="center" className="border-line">
 196 |+                   <Box border paddingX={1.5} paddingY={0.5} radius="industrial" surface="default" display="flex" align="center" justify="center">
 197 |                       <Text variant="mono" size="tiny" color="dim" className="leading-none">ESC</Text>
 198 |                    </Box>
 199 |                    <Text variant="mono" size="micro" color="dim" className="leading-none opacity-70">CLOSE</Text>
 200 |                 </Box>
 201 |                 <Box display="flex" align="center" gap={2}>
     |-                   <Box border paddingX={1.5} paddingY={0.5} radius="industrial" surface="default" display="flex" align="center" justify="center" className="border-line">
 202 |+                   <Box border paddingX={1.5} paddingY={0.5} radius="industrial" surface="default" display="flex" align="center" justify="center">
 203 |                       <Text variant="mono" size="tiny" color="dim" className="leading-none font-bold">↵</Text>
 204 |                    </Box>
 205 |                    <Text variant="mono" size="micro" color="dim" className="leading-none opacity-70">SELECT</Text>
```

### `src/components/Navigation.tsx` (modified)
```diff
@@ -71,7 +71,7 @@ export default function Navigation() {
  71 |         aria-label="Main Navigation"
  72 |         layout="navRail"
  73 |         className={cn(
     |-          "transition-[background-color,backdrop-filter] duration-300 border-r border-line bg-surface",
  74 |+          "transition-[background-color,backdrop-filter] duration-300 border-r-standard bg-surface",
  75 |           scrolled ? "backdrop-blur-xl bg-surface/90" : ""
  76 |         )}
  77 |       >
@@ -86,7 +86,8 @@ export default function Navigation() {
  86 |             display="block"
  87 |             paddingX={4}
  88 |             paddingY={6}
     |-            className="group border-b border-line"
  89 |+            border="b"
  90 |+            className="group"
  91 |           >
  92 |             <Logo className="h-16 w-full transition-opacity group-hover:opacity-80" />
  93 |           </Box>
@@ -116,7 +117,7 @@ export default function Navigation() {
 117 |             ))}
 118 |           </Stack>
 119 |
     |-          <Box paddingX={6} paddingY={5} className="border-t border-line bg-surface">
 120 |+          <Box paddingX={6} paddingY={5} border="t" className="bg-surface">
 121 |             <Text variant="sans" size="xs" color="dim" className="mb-1 leading-normal">
 122 |               Written by <strong className="text-accent">Tech Dancer</strong>
 123 |             </Text>
```

### `src/components/layout/DetailElements.tsx` (modified)
```diff
@@ -48,7 +48,7 @@ export function SpecsTable({ specs }: { specs?: Record<string, string> }) {
  48 |
  49 |   return (
  50 |     <Stack gap={4}>
     |-      <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase className="tracking-widest border-b border-line pb-2">Technical Specs</Text>
  51 |+      <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase className="tracking-widest border-b-standard pb-2">Technical Specs</Text>
  52 |       <Stack gap={3}>
  53 |         {Object.entries(specs).map(([key, value]) => (
  54 |           <Stack key={key} gap={1}>
```

### `src/components/ui/ContentCard.tsx` (modified)
```diff
@@ -65,7 +65,7 @@ export function ContentCard({
  65 |           variant="body"
  66 |           size="lg"
  67 |           weight="font-bold"
     |-          className="text-text-main leading-tight group-hover:text-accent transition-colors line-clamp-2"
  68 |+          className="text-text-main leading-tight interactive-accent line-clamp-2"
  69 |         >
  70 |           {title}
  71 |         </Text>
```

### `src/components/ui/GearCard.tsx` (modified)
```diff
@@ -51,7 +51,6 @@ export function GearCard({
  51 |           paddingY={1}
  52 |           radius="full"
  53 |           border
     |-          className="border-line"
  54 |         >
  55 |           <Text size="tiny" weight="font-black" uppercase tracking="widest" color="accent">
  56 |             {category}
@@ -68,7 +67,7 @@ export function GearCard({
  67 |           variant="body"
  68 |           size="lg"
  69 |           weight="font-bold"
     |-          className="text-text-main leading-tight group-hover:text-accent transition-colors line-clamp-2"
  70 |+          className="text-text-main leading-tight interactive-accent line-clamp-2"
  71 |         >
  72 |           {title}
  73 |         </Text>
```

### `src/components/ui/ListRow.tsx` (modified)
```diff
@@ -23,7 +23,7 @@ export function ListRow({ slug, title, category, excerpt, date, basePath, conten
  23 |       className="group hover:bg-surface/50 transition-colors"
  24 |     >
  25 |       <Box shrink={0} className="w-1 self-stretch bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
     |-      <Box width={12} height={12} margin={4} shrink={0} radius="md" overflow="hidden" display="flex" align="center" justify="center" className="bg-surface-alt/30 border border-line/30">
  26 |+      <Box width={12} height={12} margin={4} shrink={0} radius="md" overflow="hidden" display="flex" align="center" justify="center" border className="bg-surface-alt/30 border-line/30">
  27 |         <CategoryPlaceholder category={category} size="md" />
  28 |       </Box>
  29 |       <Stack gap={1} flex className="py-3 min-w-0">
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

### `src/components/ui/SectionHeader.tsx` (modified)
```diff
@@ -1,34 +1,43 @@
   1 |+import { ReactNode } from 'react';
   2 | import { Link } from 'react-router-dom';
     |-import { Stack, Text } from '@/layouts/Primitives';
   3 |+import { Box, Stack, Text } from '@/layouts/Primitives';
   4 |
   5 | interface SectionHeaderProps {
     |-  eyebrow: string;
   6 |+  label?: string;
   7 |+  eyebrow?: string;
   8 |   title: string;
   9 |+  children?: ReactNode;
  10 |   link?: {
  11 |     text: string;
  12 |     to: string;
  13 |   };
  14 | }
  15 |
     |-export function SectionHeader({ eyebrow, title, link }: SectionHeaderProps) {
  16 |+export function SectionHeader({ label, eyebrow, title, children, link }: SectionHeaderProps) {
  17 |+  const displayEyebrow = label || eyebrow;
  18 |   return (
     |-    <Stack direction="row" align="end" justify="between" marginBottom={4}>
  19 |+    <Box display="flex" justify="between" align="end" border="b" paddingBottom={4} marginBottom={4}>
  20 |       <Stack direction="col" gap={1}>
     |-        <Text variant="mono" size="xs" color="dim" uppercase tracking="widest">
     |-          {eyebrow}
     |-        </Text>
     |-        <Text as="h3" size="3xl" weight="font-black" className="text-accent-navy">
  21 |+        {displayEyebrow && (
  22 |+          <Text variant="mono" size="xs" color="brand" weight="font-semibold" tracking="widest" uppercase>
  23 |+            {displayEyebrow}
  24 |+          </Text>
  25 |+        )}
  26 |+        <Text as="h3" variant="headline" size="3xl" weight="font-black">
  27 |           {title}
  28 |         </Text>
  29 |       </Stack>
     |-      {link && (
     |-        <Link
     |-          to={link.to}
     |-          className="text-xs font-black uppercase tracking-widest text-text-dim hover:text-accent transition-colors"
     |-        >
     |-          {link.text}
     |-        </Link>
     |-      )}
     |-    </Stack>
  30 |+      <Box display="flex" align="center" gap={4}>
  31 |+        {children}
  32 |+        {link && (
  33 |+          <Link
  34 |+            to={link.to}
  35 |+            className="text-xs font-black uppercase tracking-widest text-text-dim hover:text-accent transition-colors"
  36 |+          >
  37 |+            {link.text}
  38 |+          </Link>
  39 |+        )}
  40 |+      </Box>
  41 |+    </Box>
  42 |   );
  43 | }
```

### `src/components/ui/ViewToggle.tsx` (modified)
```diff
@@ -18,7 +18,7 @@ export function ViewToggle({ view, onChange }: ViewToggleProps) {
  18 |           onClick={() => onChange(v)}
  19 |           className={cn(
  20 |             'p-2 transition-colors cursor-pointer',
     |-            v === 'card' ? 'border-r border-line' : '',
  21 |+            v === 'card' ? 'border-r-standard' : '',
  22 |             view === v
  23 |               ? 'bg-accent-navy text-bg shadow-inner'
  24 |               : 'bg-bg text-text-dim hover:text-text-main hover:bg-surface transition-colors'
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

### `src/features/email-capture/NewsletterBanner.tsx` (modified)
```diff
@@ -18,7 +18,8 @@ export function NewsletterBanner() {
  18 |       transition={motionTokens.overlay.transition}
  19 |       surface="alt"
  20 |       opacity={0.9}
     |-      className="backdrop-blur-xl border border-line/50"
  21 |+      border
  22 |+      className="backdrop-blur-xl border-line/50"
  23 |       shadow="topOverlay"
  24 |       padding="emailBar"
  25 |       radius="none"
```

### `src/features/lab/components/GearPostDetail.tsx` (modified)
```diff
@@ -28,7 +28,7 @@ export function GearPostDetail({ post, onBack, backLabel }: GearPostDetailProps)
  28 |
  29 |   const affiliateLinksView = affiliateLinks.length > 0 && (
  30 |     <Stack gap={4} marginTop={8}>
     |-      <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase className="tracking-widest border-b border-line" paddingBottom={2}>Where to Buy</Text>
  31 |+      <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase className="tracking-widest border-b-standard" paddingBottom={2}>Where to Buy</Text>
  32 |       <Box display="grid" gap={3} gridCols={{ base: 1, sm: 2, lg: 1 }}>
  33 |         {affiliateLinks.map(link => (
  34 |           <Box
```

### `src/features/profile/components/ProfileComponents.tsx` (modified)
```diff
@@ -46,7 +46,7 @@ export function ExperienceCards({ cards }: { cards: ProfileCard[] }) {
  46 |                 </Box>
  47 |               )}
  48 |               <Stack gap={2} flex={1}>
     |-                <Text as="h3" variant="headline" size="lg" weight="font-bold" color="main" className="leading-tight group-hover:text-accent transition-colors">
  49 |+                <Text as="h3" variant="headline" size="lg" weight="font-bold" color="main" className="leading-tight interactive-accent">
  50 |                   {card.title}
  51 |                 </Text>
  52 |                 <Text variant="body" size="base" color="dim" className="leading-relaxed opacity-90">
@@ -160,7 +160,7 @@ export function ProfileLinks({ links }: { links: ProfileLink[] }) {
 160 |           radius="full"
 161 |           className="hover:border-accent hover:bg-accent/5 transition-all group active:scale-95 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
 162 |         >
     |-          <Text variant="mono" size="xs" weight="font-bold" className="group-hover:text-accent">
 163 |+          <Text variant="mono" size="xs" weight="font-bold" className="interactive-accent">
 164 |             {link.label}
 165 |           </Text>
 166 |         </Box>
```

### `src/features/research/ResearchAnalytics.tsx` (modified)
```diff
@@ -45,15 +45,15 @@ export default function ResearchAnalytics() {
  45 |               >
  46 |                 <Stack gap={4}>
  47 |                   <Box display="flex" justify="between" align="start">
     |-                    <Box width={10} height={10} surface="muted" border radius="md" display="flex" align="center" justify="center" color="dim" className="group-hover:text-accent transition-colors">
  48 |+                    <Box width={10} height={10} surface="muted" border radius="md" display="flex" align="center" justify="center" color="dim" className="interactive-accent">
  49 |                       <Search className="w-5 h-5" />
  50 |                     </Box>
  51 |                     <Text size="micro" weight="font-bold" uppercase tracking="widest" color="accent">
  52 |                       {tool.status}
  53 |                     </Text>
  54 |                   </Box>
  55 |                   <Stack gap={2}>
     |-                    <Text variant="display" size="xl" weight="font-black" className="group-hover:text-accent transition-colors">
  56 |+                    <Text variant="display" size="xl" weight="font-black" className="interactive-accent">
  57 |                       {tool.name}
  58 |                     </Text>
  59 |                     <Text size="sm" color="dim" className="leading-relaxed line-clamp-2">
@@ -95,7 +95,7 @@ export default function ResearchAnalytics() {
  95 |                     <Text variant="mono" size="micro" color="dim">{study.date}</Text>
  96 |                   </Box>
  97 |                   <Stack gap={2}>
     |-                    <Text variant="display" size="2xl" weight="font-black" className="group-hover:text-accent transition-colors">
  98 |+                    <Text variant="display" size="2xl" weight="font-black" className="interactive-accent">
  99 |                       {study.title}
 100 |                     </Text>
 101 |                     <Text variant="body" size="sm" color="dim" className="line-clamp-3 leading-relaxed">
```

### `src/features/research/ResearchDetail.tsx` (modified)
```diff
@@ -111,7 +111,7 @@ export default function ResearchDetail() {
 111 |           cursor="pointer"
 112 |         >
 113 |           <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
     |-          <Text variant="mono" size="xs" weight="font-bold" color="dim" className="group-hover:text-accent">Back to Lab</Text>
 114 |+          <Text variant="mono" size="xs" weight="font-bold" color="dim" className="interactive-accent">Back to Lab</Text>
 115 |         </Box>
 116 |
 117 |         <Box border surface="surface" radius="lg" padding={{ base: 8, md: 12 }}>
```

### `src/features/research/components/WCSScraperTool.tsx` (modified)
```diff
@@ -28,7 +28,7 @@ function WCSDataTable({ data }: { data: WCSRecord[] }) {
  28 |       <Box className="overflow-x-auto">
  29 |         <table className="w-full text-left border-collapse">
  30 |           <thead>
     |-            <tr className="border-b border-line">
  31 |+            <tr className="border-b-standard">
  32 |               <Box as="th" padding={4} className="text-xs font-mono text-dim uppercase font-normal">Date</Box>
  33 |               <Box as="th" padding={4} className="text-xs font-mono text-dim uppercase font-normal">Competitor</Box>
  34 |               <Box as="th" padding={4} className="text-xs font-mono text-dim uppercase font-normal">Event</Box>
```

### `src/index.css` (modified)
```diff
@@ -3,6 +3,7 @@
   3 |
   4 | @theme {
   5 |   /* Colors */
   6 |+  --color-border-standard: var(--raw-color-line);
   7 |   --color-bg: var(--raw-color-bg);
   8 |   --color-surface: var(--raw-color-surface);
   9 |   --color-surface-alt: var(--raw-color-surface-alt);
@@ -79,6 +80,39 @@
  80 |   --text-tiny: 10px;
  81 | }
  82 |
  83 |+@utility interactive-accent {
  84 |+  @apply group-hover:text-accent transition-colors;
  85 |+}
  86 |+
  87 |+@utility border-standard {
  88 |+  @apply border border-border-standard;
  89 |+}
  90 |+
  91 |+@utility border-t-standard {
  92 |+  @apply border-t border-border-standard;
  93 |+}
  94 |+
  95 |+@utility border-b-standard {
  96 |+  @apply border-b border-border-standard;
  97 |+}
  98 |+
  99 |+@utility border-l-standard {
 100 |+  @apply border-l border-border-standard;
 101 |+}
 102 |+
 103 |+@utility border-r-standard {
 104 |+  @apply border-r border-border-standard;
 105 |+}
 106 |+
 107 |+@utility border-x-standard {
 108 |+  @apply border-x border-border-standard;
 109 |+}
 110 |+
 111 |+@utility border-y-standard {
 112 |+  @apply border-y border-border-standard;
 113 |+}
 114 |+
 115 |+
 116 | @layer utilities {
 117 |   @keyframes scanline {
 118 |     0% { transform: translateY(-100%); }
@@ -107,6 +141,7 @@
 141 |   .industrial-gradient { background: linear-gradient(135deg, var(--raw-color-bg) 0%, var(--raw-color-surface) 100%); }
 142 |   .text-glow { text-shadow: 0 0 20px rgba(8, 145, 178, 0.4); }
 143 |   .gold-accent { @apply border-line hover:border-accent transition-colors; }
 144 |+
 145 |   .scanline-hover { @apply relative overflow-hidden; }
 146 |   .scanline-hover::after {
 147 |     content: "";
@@ -137,13 +172,13 @@
 172 |
 173 | .panel { @apply bg-bg p-4 sm:p-6 md:p-12 relative overflow-hidden w-full; }
 174 | .nav-rail {
     |-  @apply hidden lg:flex w-[280px] border-r border-line flex-col p-8 justify-between min-h-screen sticky top-0 bg-surface z-50;
 175 |+  @apply hidden lg:flex w-[280px] border-r-standard flex-col p-8 justify-between min-h-screen sticky top-0 bg-surface z-50;
 176 | }
 177 | .main-grid { @apply flex-1 grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-line w-full; }
     |-.stats-widget { @apply bg-surface p-6 border border-line shadow-none rounded-none; }
     |-.tech-specs-code { @apply font-mono text-xs bg-bg p-4 text-accent border border-line rounded-none; }
 178 |+.stats-widget { @apply bg-surface p-6 border-standard shadow-none rounded-none; }
 179 |+.tech-specs-code { @apply font-mono text-xs bg-bg p-4 text-accent border-standard rounded-none; }
 180 | .experience-chip {
     |-  @apply text-tiny border border-line px-3 py-1 rounded-none text-text-dim bg-surface tracking-wider font-bold;
 181 |+  @apply text-tiny border-standard px-3 py-1 rounded-none text-text-dim bg-surface tracking-wider font-bold;
 182 | }
     |-.product-card { @apply bg-surface border border-line p-6 rounded-none transition-all duration-300; }
     |-.content-card { @apply bg-surface p-8 rounded-none border border-line; }
 183 |+.product-card { @apply bg-surface border-standard p-6 rounded-none transition-all duration-300; }
 184 |+.content-card { @apply bg-surface p-8 rounded-none border-standard; }
```

### `src/layouts/Box.tsx` (modified)
```diff
@@ -112,13 +112,13 @@ export const Box = forwardRef<HTMLDivElement, BoxProps>(
 112 |     }
 113 |
 114 |     const borderClasses = cn(
     |-      border === true && "border border-line",
     |-      border === "t" && "border-t border-line",
     |-      border === "b" && "border-b border-line",
     |-      border === "l" && "border-l border-line",
     |-      border === "r" && "border-r border-line",
     |-      border === "x" && "border-x border-line",
     |-      border === "y" && "border-y border-line",
 115 |+      border === true && "border-standard",
 116 |+      border === "t" && "border-t-standard",
 117 |+      border === "b" && "border-b-standard",
 118 |+      border === "l" && "border-l-standard",
 119 |+      border === "r" && "border-r-standard",
 120 |+      border === "x" && "border-x-standard",
 121 |+      border === "y" && "border-y-standard",
 122 |       getResponsiveClasses(smBorder, "sm:border-"),
 123 |       getResponsiveClasses(mdBorder, "md:border-"),
 124 |       getResponsiveClasses(lgBorder, "lg:border-"),
```

### `src/lib/variants.ts` (modified)
```diff
@@ -25,7 +25,7 @@ export const variants = {
  25 |   },
  26 |   emphasis: {
  27 |     solid: "bg-text-main text-bg border-transparent",
     |-    outline: "border border-line bg-transparent",
  28 |+    outline: "border-standard bg-transparent",
  29 |     ghost: "bg-transparent hover:bg-line/10",
  30 |     primary: "bg-accent text-white font-mono tracking-widest text-xs px-8 hover:bg-text-main active:translate-y-[0px] hover:translate-y-[-2px] hover:shadow-[0_4px_12px_var(--color-accent-shadow)] relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white/50 after:transition-all after:duration-500",
  31 |     professional: "bg-text-main text-white font-sans rounded-lg hover:bg-text-main/90 transition-all shadow-sm active:scale-[0.98] normal-case tracking-normal",
```

### `src/pages/UXAuditor.tsx` (modified)
```diff
@@ -124,7 +124,8 @@ export default function UXAuditor() {
 124 |           direction="row"
 125 |           align="center"
 126 |           gap={3}
     |-          className="bg-surface p-2 rounded-lg shadow-sm border border-line"
 127 |+          border
 128 |+          className="bg-surface p-2 rounded-lg shadow-sm"
 129 |         >
 130 |           <Box
 131 |             as="input"
@@ -164,7 +165,7 @@ export default function UXAuditor() {
 165 |           <Text variant="sans" size="xs" weight="font-bold" uppercase tracking="widest" color="dim" paddingX={1}>
 166 |             Audit History
 167 |           </Text>
     |-          <Stack className="bg-surface rounded-lg shadow-sm border border-line overflow-hidden divide-y divide-line">
 168 |+          <Stack border className="bg-surface rounded-lg shadow-sm overflow-hidden divide-y divide-line">
 169 |             {reports.length === 0 && (
 170 |               <EmptyState
 171 |                 compact
@@ -211,7 +212,8 @@ export default function UXAuditor() {
 212 |           {activeReport ? (
 213 |             <>
 214 |               <Stack
     |-                className="bg-surface p-6 rounded-lg shadow-sm border border-line"
 215 |+                border
 216 |+                className="bg-surface p-6 rounded-lg shadow-sm"
 217 |                 justify="between" align={{ base: "start", md: "center" }}
 218 |                 gap={6} direction={{ base: "col", md: "row" }}
 219 |               >
@@ -264,7 +266,7 @@ export default function UXAuditor() {
 266 |                   const imgUrl = activeReport[`image_${vp.name.toLowerCase()}`];
 267 |
 268 |                   return (
     |-                    <Box className="bg-surface rounded-lg shadow-sm border border-line overflow-hidden">
 269 |+                    <Box border className="bg-surface rounded-lg shadow-sm overflow-hidden">
 270 |                       <Stack padding={4} border="b" direction="row" align="center" justify="between" surface="muted">
 271 |                         <Stack direction="row" align="center" gap={3}>
 272 |                           <Box padding={2} surface="default" radius="lg" shadow="sm" color="accent">
@@ -304,7 +306,7 @@ export default function UXAuditor() {
 306 |                         <Stack gap={6} padding={8} flex={1} minWidth="0" overflow="hidden">
 307 |                           {data ? (
 308 |                             <>
     |-                              <Box className="bg-surface-alt border border-line p-5 rounded-lg">
 309 |+                              <Box border className="bg-surface-alt p-5 rounded-lg">
 310 |                                 <Box marginBottom={3}>
 311 |                                   <Text variant="sans" size="xs" weight="font-black" color="accent" uppercase display="block" tracking="widest">
 312 |                                     Analysis Summary
@@ -316,7 +318,7 @@ export default function UXAuditor() {
 318 |                               </Box>
 319 |                               <Stack gap={4}>
 320 |                                 {data.improvements?.map((imp, idx) => (
     |-                                  <Box key={idx} className="bg-surface p-4 rounded-lg border border-line shadow-sm hover:border-accent transition-all">
 321 |+                                  <Box key={idx} border className="bg-surface p-4 rounded-lg shadow-sm hover:border-accent transition-all">
 322 |                                     <Box display="flex" justify="between" align="start" marginBottom={2}>
 323 |                                       <Stack direction="row" align="center" gap={2}>
 324 |                                         <Box width={2} height={2} radius="full" className={imp.severity > 7 ? 'bg-error shadow-sm' : 'bg-accent-purple shadow-sm'} />
```

### `src/styles/design-tokens.ts` (modified)
```diff
@@ -32,19 +32,19 @@ export const animation = {
  32 | export const layout = {
  33 |   root: "flex min-h-screen bg-bg",
  34 |   navRail: "nav-rail hidden lg:flex flex-col justify-between min-h-screen sticky top-0",
     |-  mobileHeader: "lg:hidden fixed top-0 left-0 right-0 h-16 bg-surface z-[110] flex items-center justify-between px-6 border-b border-line w-full",
  35 |+  mobileHeader: "lg:hidden fixed top-0 left-0 right-0 h-16 bg-surface z-[110] flex items-center justify-between px-6 border-b-standard w-full",
  36 |   panel: "panel h-full overflow-y-auto w-full",
     |-  card: "bg-surface border border-line rounded-none transition-all duration-300 w-full",
  37 |+  card: "bg-surface border-standard rounded-none transition-all duration-300 w-full",
  38 |   interactive: "cursor-pointer",
  39 |   grid: "grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 w-full",
  40 |   section: "mt-24 space-y-8",
     |-  divider: "border-b border-line pb-4 flex items-end justify-between",
  41 |+  divider: "border-b-standard pb-4 flex items-end justify-between",
  42 | };
  43 |
  44 | export const inputs = {
     |-  base: "w-full bg-bg border border-line px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent transition-all",
  45 |+  base: "w-full bg-bg border-standard px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent transition-all",
  46 |   label: "text-tiny font-mono font-bold uppercase tracking-widest text-text-dim block mb-2",
     |-  select: "bg-bg border border-line px-3 py-1 text-tiny font-mono font-bold uppercase tracking-widest text-accent focus:outline-none focus:border-accent",
  47 |+  select: "bg-bg border-standard px-3 py-1 text-tiny font-mono font-bold uppercase tracking-widest text-accent focus:outline-none focus:border-accent",
  48 |   error: "border-error focus:border-error focus:ring-error/20",
  49 | };
  50 |
```
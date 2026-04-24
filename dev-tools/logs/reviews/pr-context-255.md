# PR Context: #255 — PageHeader Standardization
**Stats:** +42/-15 across 7 files
**Author:** @arii
**Last Commit:** 2026-04-23T15:04:48Z

## Description
This PR centralizes the architectural improvements to the PageHeader component. It standardizes the props (paddingBottom, border, descriptionMaxWidth, titleAs) and styling across the application, ensuring a consistent visual language for all page headers. Dependent components like FolioGrid and pages like ResearchAnalytics have been updated to match the new component signature.

Fixes #172

---
*PR created automatically by Jules for task [5756109416038041320](https://jules.google.com/task/5756109416038041320) started by @arii*

## Files Changed
- 🟡 `src/components/ui/FolioGrid.tsx` (+3/-3)
- 🟡 `src/components/ui/MarkdownRenderer.tsx` (+2/-1)
- 🟡 `src/components/ui/PageHeader.tsx` (+30/-6)
- 🟡 `src/features/journal/BlogFeed.tsx` (+1/-1)
- 🟡 `src/features/profile/ProfileSidebar.tsx` (+4/-3)
- 🟡 `src/features/research/ResearchAnalytics.tsx` (+1/-1)
- 🟡 `src/styles/design-tokens.ts` (+1/-0)

## Diffs

### `src/components/ui/FolioGrid.tsx` (modified)
**Valid Comment Ranges (New File):** 17-23, 29-35, 50-56
```diff
@@ -17,7 +17,7 @@ interface FolioGridProps {
  17 |   children?: React.ReactNode;
  18 |   view?: ViewMode;
  19 |   onViewChange?: (v: ViewMode) => void;
     |-  as?: keyof JSX.IntrinsicElements;
  20 |+  titleAs?: "h1" | "h2" | "h3";
  21 | }
  22 |
  23 | export default function FolioGrid({
@@ -29,7 +29,7 @@ export default function FolioGrid({
  29 |   children,
  30 |   view = 'card',
  31 |   onViewChange,
     |-  as
  32 |+  titleAs
  33 | }: FolioGridProps) {
  34 |   const [search, setSearch] = useSearchParam('search');
  35 |
@@ -50,7 +50,7 @@ export default function FolioGrid({
  50 |           label={label || "FOLIO"}
  51 |           title={categoryTitle}
  52 |           description={description}
     |-          as={as}
  53 |+          titleAs={titleAs}
  54 |         />
  55 |         {children}
  56 |         <Box display="flex" align="center" justify="between" gap={4} marginTop={8} flexWrap="wrap">
```

### `src/components/ui/MarkdownRenderer.tsx` (modified)
**Valid Comment Ranges (New File):** 24-31
```diff
@@ -24,7 +24,8 @@ export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  24 |                 size="tiny"
  25 |                 color="accent"
  26 |                 weight="font-bold"
     |-                className="block mb-2 opacity-50 tracking-[0.2em] before:content-[counter(section,decimal-leading-zero)] before:mr-2"
  27 |+                tracking="wide-editorial"
  28 |+                className="block mb-2 opacity-50 before:content-[counter(section,decimal-leading-zero)] before:mr-2"
  29 |               />
  30 |               <Text as="h2" variant="display" size="3xl" weight="font-bold" className="normal-case tracking-tight m-0" {...props} />
  31 |               <Box className="h-px w-12 bg-accent mt-4" />
```

### `src/components/ui/PageHeader.tsx` (modified)
**Valid Comment Ranges (New File):** 5-51, 67-75
```diff
@@ -5,23 +5,47 @@ interface PageHeaderProps {
   5 |   label: string;
   6 |   title: string;
   7 |   description?: string;
     |-  as?: keyof JSX.IntrinsicElements;
   8 |   paddingBottom?: BaseProps['paddingBottom'];
   9 |   border?: BaseProps['border'];
  10 |   descriptionMaxWidth?: BaseProps['maxWidth'];
  11 |+  titleAs?: "h1" | "h2" | "h3";
  12 | }
  13 |
     |-export function PageHeader({ label, title, description, as = "h1", paddingBottom = 12, border = "b", descriptionMaxWidth = "prose" }: PageHeaderProps) {
  14 |+export function PageHeader({
  15 |+  label,
  16 |+  title,
  17 |+  description,
  18 |+  paddingBottom = 12,
  19 |+  border = "b",
  20 |+  descriptionMaxWidth = "65ch",
  21 |+  titleAs = "h1"
  22 |+}: PageHeaderProps) {
  23 |   return (
  24 |     <Box
  25 |       paddingBottom={paddingBottom}
  26 |       border={border}
  27 |     >
  28 |       <Stack gap={4}>
     |-        <Text variant="mono" size="xs" color="dim" weight="font-semibold" tracking="widest" uppercase>
  29 |+        <Text
  30 |+          variant="mono"
  31 |+          size="xs"
  32 |+          color="dim"
  33 |+          weight="font-semibold"
  34 |+          uppercase
  35 |+          tracking="wide-editorial"
  36 |+        >
  37 |           {label}
  38 |         </Text>
     |-        <Text as={as} variant="headline" size="fluid-7" weight="font-black" className="text-accent-navy leading-tight tracking-tight text-balance">
  39 |+        <Text
  40 |+          as={titleAs}
  41 |+          variant="headline"
  42 |+          size={{ base: "4xl", lg: "6xl" }}
  43 |+          weight="font-black"
  44 |+          tracking="tighter"
  45 |+          color="main"
  46 |+          uppercase
  47 |+          className="leading-tight"
  48 |+        >
  49 |           {title}
  50 |         </Text>
  51 |         {description && (
@@ -43,9 +67,9 @@ export function PageHeader({ label, title, description, as = "h1", paddingBottom
  67 |
  68 | export function SectionHeader({ label, title, children }: { label: string; title: string; children?: React.ReactNode }) {
  69 |   return (
     |-    <Box display="flex" justify="between" align="end" border="b" paddingBottom={4} className="border-slate-200">
  70 |+    <Box display="flex" justify="between" align="end" border="b" paddingBottom={4}>
  71 |       <Stack gap={1}>
     |-        <Text variant="mono" size="xs" color="dim" weight="font-semibold" tracking="widest" uppercase>{label}</Text>
  72 |+        <Text variant="mono" size="xs" color="dim" weight="font-semibold" tracking="wide-editorial" uppercase>{label}</Text>
  73 |         <Text variant="display" size="3xl" weight="font-black" className="text-accent-navy">{title}</Text>
  74 |       </Stack>
  75 |       {children}
```

### `src/features/journal/BlogFeed.tsx` (modified)
**Valid Comment Ranges (New File):** 16-22
```diff
@@ -16,7 +16,7 @@ export default function BlogFeed() {
  16 |       <FolioGrid
  17 |         items={posts}
  18 |         categoryTitle="Blog Posts"
     |-        as="h1"
  19 |+        titleAs="h1"
  20 |         label="INSIGHTS"
  21 |         description="A searchable, categorized folio of posts covering travel, lifestyle, gear reviews, technical portfolio pieces, and everything about West Coast Swing."
  22 |         basePath="/blog"
```

### `src/features/profile/ProfileSidebar.tsx` (modified)
**Valid Comment Ranges (New File):** 43-50, 63-69, 98-104
```diff
@@ -43,7 +43,8 @@ export default function ProfileSidebar({ data }: ProfileSidebarProps) {
  43 |                 color="dim"
  44 |                 weight="font-semibold"
  45 |                 display="block"
     |-                className="tracking-[0.15em] uppercase"
  46 |+                tracking="editorial-tight"
  47 |+                uppercase
  48 |               >
  49 |                 {detail.label}
  50 |               </Text>
@@ -62,7 +63,7 @@ export default function ProfileSidebar({ data }: ProfileSidebarProps) {
  63 |
  64 |         <Stack gap={6}>
  65 |           <Stack gap={3}>
     |-            <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-[0.15em] uppercase">Connect</Text>
  66 |+            <Text variant="mono" size="xs" color="dim" weight="font-semibold" tracking="editorial-tight" uppercase>Connect</Text>
  67 |             <Box display="flex" gap={5}>
  68 |               {data.socialLinks.map((link) => {
  69 |                 const Icon = platformIcons[link.platform];
@@ -97,7 +98,7 @@ export default function ProfileSidebar({ data }: ProfileSidebarProps) {
  98 |                 className="group text-accent-navy hover:text-accent transition-colors"
  99 |               >
 100 |                 <item.icon className="w-4 h-4" />
     |-                <Text variant="mono" size="xs" weight="font-semibold" className="tracking-[0.15em] uppercase">{item.label}</Text>
 101 |+                <Text variant="mono" size="xs" weight="font-semibold" tracking="editorial-tight" uppercase>{item.label}</Text>
 102 |               </Box>
 103 |             ))}
 104 |           </Box>
```

### `src/features/research/ResearchAnalytics.tsx` (modified)
**Valid Comment Ranges (New File):** 21-27
```diff
@@ -21,7 +21,7 @@ export default function ResearchAnalytics() {
  21 |           label="TECHNICAL PORTFOLIO"
  22 |           title="Data & Development Lab"
  23 |           description="Sophisticated pages for interactive data science, software development, and specialized tools to optimize the WCS lifestyle."
     |-          as="h1"
  24 |+          titleAs="h1"
  25 |         />
  26 |
  27 |         <Stack gap={8}>
```

### `src/styles/design-tokens.ts` (modified)
**Valid Comment Ranges (New File):** 120-126
```diff
@@ -120,6 +120,7 @@ export const tracking = {
 120 |   wider: "tracking-wider",
 121 |   widest: "tracking-widest",
 122 |   "wide-editorial": "tracking-[0.2em]",
 123 |+  "editorial-tight": "tracking-[0.15em]",
 124 | };
 125 |
 126 | export const typeSizes = {
```
# PR Review Plan: #159 — Improve Gear and Blog Post Formats

<!-- PR_NUMBER: 159 -->

**Repo:** arii/tech-dancer — https://github.com/arii/tech-dancer/pull/159
**Stats:** +868/-447 across 41 file(s)

---

<!-- AGENT INSTRUCTIONS — READ BEFORE DOING ANYTHING ELSE

RULES:
1. Work ONLY from the diff content in this document. Do NOT fetch external data.
2. Do NOT alter the document structure, headings, or fenced code blocks.
3. Keep all ```json blocks intact and properly fenced — the parser depends on them.
4. Do NOT mark Step 3 verification items complete until Step 2 is fully done.

STEPS (in order):
  Step 1: Read the Description and Stats. If additions > 100 lines, you MUST find 10+ lines to cut.
  Step 2: For every file block in "Per-File Audit":
    - Read the diff.
    - Mark each checklist item [x] if clean, or write the violation inline.
    - Replace the "body" value in the Proposed inline comment JSON blocks with specific feedback.
    - Update "line" to the actual diff line number where the issue occurs.
    - You MUST leave a comment for every file, even if just confirming it is clean.
  Step 3: Verify all items below are complete, then mark each [x].
    [ ] Every audit checklist item is marked [x] or has a violation noted.
    [ ] Every Proposed inline comment has a real line number (not 1) and a real body (not a placeholder).
    [ ] The Submission body is filled in with ANTI-AI-SLOP, FINDINGS, and FINAL RECOMMENDATION.
  Step 4: Submit using the command in the Submission section at the bottom.
-->

## Description

This PR introduces significant improvements to the formatting of Gear and Blog posts, including:
- Added a list view mode for both blog and gear feeds, with persistence via URL search parameters.
- Redesigned Gear cards with a flat aesthetic, category-derived gradients, and visibility for ratings and verdicts.
- Enhanced Blog cards with reading time calculation and category gradients.
- Created specialized detail layouts for Gear (`GearPostDetail`) and Blog posts (`BlogPostDetail`) featuring score grids, specs tables, tables of contents, and 'Key Takeaway' callouts.
- Updated content models and hooks to support new metadata and instantaneous updates.

Fixes #151

---
*PR created automatically by Jules for task [9976994344996190162](https://jules.google.com/task/9976994344996190162) started by @arii*

---

## Review Standards

You are a Principal Software Engineer performing a deep technical audit.
Evaluate EVERY changed file against the following criteria:

1. Dead abstractions — new class/context/hook that a simpler primitive already handles?
2. Unnecessary indirection — adds a layer where a direct call would do?
3. Responsibility creep — component taking on logic that belongs in a hook or parent?
4. Import bloat — `import React` added unnecessarily? (Not needed in React 17+)
5. Token compliance — raw Tailwind classes or magic pixel values bypassing `design-tokens.ts`?
6. No arbitrary Tailwind — values like `text-[11px]`, `max-w-[1400px]` are explicitly banned.
7. Audit ratio — if additions > 100 lines, find at least 10 lines to cut.

Mandatory response sections (fill these in the Submission body below):
- ANTI-AI-SLOP: verbose/over-engineered patterns found, or confirmed absent
- FINDINGS: per-file critical feedback with specific line numbers
- FINAL RECOMMENDATION: Approved | Approved with Minor Changes | Not Approved

---

## Files Changed

- `[M]` [src/App.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+0/-2`
- `[M]` [src/components/GlobalSearch.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+2/-2`
- `[M]` [src/components/Navigation.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+4/-3`
- `[A]` [src/components/layout/DetailElements.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+80/-0`
- `[A]` [src/components/layout/DetailLayout.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+128/-0`
- `[M]` [src/components/ui/ContentCard.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+25/-10`
- `[M]` [src/components/ui/FilterBar.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+8/-6`
- `[M]` [src/components/ui/FolioGrid.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+86/-48`
- `[M]` [src/components/ui/HeroPathCard.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+4/-4`
- `[A]` [src/components/ui/ListRow.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+42/-0`
- `[M]` [src/components/ui/PageHeader.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+2/-2`
- `[M]` [src/components/ui/PathSelector.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+1/-0`
- `[A]` [src/components/ui/ViewToggle.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+31/-0`
- `[M]` [src/config/content.ts](https://github.com/arii/tech-dancer/pull/159/files) `+12/-0`
- `[M]` [src/features/dashboard/EventCard.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+1/-1`
- `[M]` [src/features/email-capture/NewsletterBanner.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+1/-1`
- `[M]` [src/features/journal/BlogFeed.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+3/-1`
- `[M]` [src/features/journal/BlogPost.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+2/-2`
- `[A]` [src/features/journal/components/BlogPostDetail.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+76/-0`
- `[M]` [src/features/journal/useBlog.ts](https://github.com/arii/tech-dancer/pull/159/files) `+11/-9`
- `[M]` [src/features/lab/BlogDrafter.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+19/-12`
- `[M]` [src/features/lab/GearCard.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+49/-33`
- `[M]` [src/features/lab/GearPost.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+3/-38`
- `[M]` [src/features/lab/Toolbox.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+50/-37`
- `[A]` [src/features/lab/components/GearPostDetail.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+81/-0`
- `[M]` [src/features/lab/useToolbox.ts](https://github.com/arii/tech-dancer/pull/159/files) `+12/-1`
- `[M]` [src/features/profile/ArielProfile.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+3/-3`
- `[M]` [src/features/profile/ContactConsole.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+5/-5`
- `[M]` [src/features/research/ResearchAnalytics.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+46/-30`
- `[M]` [src/features/research/ResearchDetail.tsx](https://github.com/arii/tech-dancer/pull/159/files) `+19/-3`

---

## Per-File Audit

Note: Do NOT skip any file. Leave a comment for every file, even if clean.


<!-- BEGIN_FILE_AUDIT: src/App.tsx -->
---

### File: `src/App.tsx` +0/-2 (modified)

Diff:
```diff
@@ -22,7 +22,6 @@ const Research = lazy(() => import('./pages/Research'));
 const ResearchDetail = lazy(() => import('./pages/ResearchDetail'));
 const Blog = lazy(() => import('./pages/Blog'));
 const BlogPost = lazy(() => import('./pages/BlogPost'));
-const Resources = lazy(() => import('./pages/Resources'));
 const About = lazy(() => import('./pages/About'));
 const Contact = lazy(() => import('./pages/Contact'));
 
@@ -68,7 +67,6 @@ export const routes = [
       { path: 'research/:id', element: <ResearchDetail /> },
       { path: 'blog', element: <Blog /> },
       { path: 'blog/:slug', element: <BlogPost /> },
-      { path: 'resources', element: <Resources /> },
       { path: 'about', element: <About /> },
       { path: 'contact', element: <Contact /> },
       { path: '*', element: <Home /> },
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/App.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/App.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/App.tsx -->


<!-- BEGIN_FILE_AUDIT: src/components/GlobalSearch.tsx -->
---

### File: `src/components/GlobalSearch.tsx` +2/-2 (modified)

Diff:
```diff
@@ -32,8 +32,8 @@ export function GlobalSearch() {
     setIsOpen(false);
     setQuery('');
     if (result.type === 'post') navigate(`/blog/${result.slug}`);
-    else if (result.type === 'resource') navigate(`/gear`);
-    else if (result.type === 'study') navigate(`/research`);
+    else if (result.type === 'resource') navigate(`/gear/${result.slug}`);
+    else if (result.type === 'study') navigate(`/research/${result.slug}`);
   };
 
   return (
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/components/GlobalSearch.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/components/GlobalSearch.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/components/GlobalSearch.tsx -->


<!-- BEGIN_FILE_AUDIT: src/components/Navigation.tsx -->
---

### File: `src/components/Navigation.tsx` +4/-3 (modified)

Diff:
```diff
@@ -1,20 +1,21 @@
-import { ShoppingBag, Database, BookOpen, User, Home, Menu, X, Terminal, Search } from 'lucide-react';
+import { ShoppingBag, Database, BookOpen, User, Home, Menu, X, Terminal, Search, Send, LucideIcon } from 'lucide-react';
 import { useState } from 'react';
 import { NavLink } from 'react-router-dom';
 import { motion, AnimatePresence } from 'motion/react';
 import { Box, Stack, Text } from '@/layouts/Primitives';
 import { cn } from '@/lib/utils';
 import { routes } from '@/config/routes';
 
-const iconMap: Record<string, any> = {
+const iconMap: Record<string, LucideIcon> = {
   '/': Home,
   '/gear': ShoppingBag,
   '/blog': BookOpen,
   '/research': Database,
   '/about': User,
+  '/contact': Send,
 };
 
-function NavItem({ to, label, icon: Icon, onClick, isMobile }: { to: string, label: string, icon: any, onClick?: () => void, isMobile?: boolean }) {
+function NavItem({ to, label, icon: Icon, onClick, isMobile }: { to: string, label: string, icon: LucideIcon, onClick?: () => void, isMobile?: boolean }) {
   return (
     <Box as="li" position="relative" className="group">
       <NavLink
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/components/Navigation.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/components/Navigation.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/components/Navigation.tsx -->


<!-- BEGIN_FILE_AUDIT: src/components/layout/DetailElements.tsx -->
---

### File: `src/components/layout/DetailElements.tsx` +80/-0 (added)

Diff:
```diff
@@ -0,0 +1,80 @@
+import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
+import { LucideIcon, Star, DollarSign, Shield, ExternalLink } from 'lucide-react';
+
+interface ScoreItemProps {
+  label: string;
+  value: string | number;
+  icon?: LucideIcon;
+  color?: string;
+}
+
+export function ScoreItem({ label, value, icon: Icon, color }: ScoreItemProps) {
+  return (
+    <Stack gap={1} align="center" className="sm:border-r border-line/30 last:border-0">
+      <Text variant="mono" size="tiny" color="dim" uppercase>{label}</Text>
+      <Box display="flex" align="center" gap={1} className={color}>
+        {Icon && <Icon className="w-4 h-4" />}
+        <Text variant="display" size="xl" weight="font-bold">{value}</Text>
+      </Box>
+    </Stack>
+  );
+}
+
+export function ScoreGrid({ children }: { children: React.ReactNode }) {
+  return (
+    <Box border="y" paddingY={8} surface="muted" emphasis="low" className="border-line/50">
+      <Grid cols={{ base: 1, sm: 2, md: 5 }} gap={8}>
+        {children}
+      </Grid>
+    </Box>
+  );
+}
+
+export function SpecsTable({ specs }: { specs?: Record<string, string> }) {
+  return (
+    <Stack gap={4}>
+      <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase className="tracking-widest border-b border-line pb-2">Technical Specs</Text>
+      <Stack gap={3}>
+        {specs ? Object.entries(specs).map(([key, value]) => (
+          <Stack key={key} gap={1}>
+            <Text variant="mono" size="tiny" color="dim" className="uppercase opacity-50">{key}</Text>
+            <Text variant="mono" size="xs" weight="font-bold">{value}</Text>
+          </Stack>
+        )) : (
+          <Text variant="mono" size="xs" color="dim">No specs provided.</Text>
+        )}
+      </Stack>
+    </Stack>
+  );
+}
+
+export function TOC({ headings }: { headings: string[] }) {
+  return (
+    <Stack gap={4}>
+      <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase className="tracking-widest border-b border-line pb-2">In this post</Text>
+      <Stack gap={2}>
+        {headings.map((h, i) => (
+          <Text key={i} variant="mono" size="tiny" className="cursor-pointer hover:text-accent transition-colors">
+            <span className="opacity-30 mr-2">0{i+1}</span> {h}
+          </Text>
+        ))}
+      </Stack>
+    </Stack>
+  );
+}
+
+export function VerdictCallout({ verdict }: { verdict: string }) {
+  return (
+    <Box border padding={8} surface="success" marginBottom={12}>
+       <Stack gap={3}>
+          <Box display="flex" align="center" gap={3}>
+             <Shield className="w-6 h-6 text-emerald-600" />
+             <Text variant="display" size="2xl" weight="font-black" intent="success">THE VERDICT</Text>
+          </Box>
+          <Text variant="body" size="lg" intent="success" italic className="leading-relaxed font-medium">
+            "{verdict}"
+          </Text>
+       </Stack>
+    </Box>
+  );
+}
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/components/layout/DetailElements.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/components/layout/DetailElements.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/components/layout/DetailElements.tsx -->


<!-- BEGIN_FILE_AUDIT: src/components/layout/DetailLayout.tsx -->
---

### File: `src/components/layout/DetailLayout.tsx` +128/-0 (added)

Diff:
```diff
@@ -0,0 +1,128 @@
+import { motion } from 'motion/react';
+import { ArrowLeft } from 'lucide-react';
+import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
+import ReactMarkdown from 'react-markdown';
+import { readingTime } from '@/lib/content';
+
+interface DetailLayoutProps {
+  title: string;
+  category: string;
+  date: string;
+  content: string;
+  image?: string;
+  onBack: () => void;
+  backLabel: string;
+  sidebar?: React.ReactNode;
+  children?: React.ReactNode;
+  headerExtras?: React.ReactNode;
+  relatedContent?: React.ReactNode;
+}
+
+export function DetailLayout({
+  title,
+  category,
+  date,
+  content,
+  image,
+  onBack,
+  backLabel,
+  sidebar,
+  children,
+  headerExtras,
+  relatedContent
+}: DetailLayoutProps) {
+  const rt = readingTime(content);
+
+  return (
+    <Box as="article" padding="panel">
+      <Stack gap={12} maxWidth="5xl" marginX="auto" className="w-full">
+        {/* Navigation */}
+        <Box
+          as="button"
+          onClick={onBack}
+          display="flex"
+          align="center"
+          gap={2}
+          color="dim"
+          className="hover:text-accent-brand transition-colors"
+          cursor="pointer"
+        >
+          <ArrowLeft className="w-4 h-4" />
+          <Text variant="mono" size="xs" weight="font-bold">{backLabel}</Text>
+        </Box>
+
+        <Stack gap={10}>
+          {/* Header */}
+          <Stack gap={6}>
+            <Box display="flex" align="center" gap={4}>
+              <Box className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-none">
+                <Text variant="mono" size="micro" weight="font-bold" color="brand" className="uppercase">
+                  {category}
+                </Text>
+              </Box>
+              <Text variant="mono" size="micro" color="dim">{date} • {rt} min read</Text>
+            </Box>
+
+            <Text variant="headline" size="fluid-8" className="tracking-tighter leading-none">
+              {title}
+            </Text>
+
+            {headerExtras}
+          </Stack>
+
+          {/* Hero Image */}
+          {image && (
+            <Box
+              as={motion.div}
+              initial={{ opacity: 0, y: 20 }}
+              animate={{ opacity: 1, y: 0 }}
+              aspect="video"
+              overflow="hidden"
+              border
+              className="bg-muted"
+            >
+              <img
+                src={image}
+                alt={title}
+                className="w-full h-full object-cover"
+              />
+            </Box>
+          )}
+
+          <Grid cols={{ base: 1, lg: sidebar ? 4 : 1 }} gap={12}>
+            {/* Sidebar */}
+            {sidebar && (
+              <Box className="hidden lg:block">
+                <Stack gap={4} className="sticky top-32">
+                   {sidebar}
+                </Stack>
+              </Box>
+            )}
+
+            {/* Content */}
+            <Box className={sidebar ? "lg:col-span-3" : ""}>
+              {children}
+              <Box className="prose prose-slate prose-headings:font-display prose-p:font-sans prose-p:text-text-dim prose-strong:text-text-main" maxWidth="prose">
+                <ReactMarkdown
+                  components={{
+                    a: ({node, ...props}) => <a {...props} rel="noopener noreferrer" target="_blank" />,
+                    blockquote: ({node, ...props}) => (
+                      <Box border surface="warning" padding={6} marginY={8} radius="none">
+                         <Text variant="mono" size="tiny" weight="font-bold" intent="warning" className="mb-2 block tracking-widest">Key Takeaway</Text>
+                         <blockquote className="m-0 p-0 font-medium italic" {...props} />
+                      </Box>
+                    )
+                  }}
+                >
+                  {content}
+                </ReactMarkdown>
+              </Box>
+            </Box>
+          </Grid>
+
+          {relatedContent}
+        </Stack>
+      </Stack>
+    </Box>
+  );
+}
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/components/layout/DetailLayout.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/components/layout/DetailLayout.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/components/layout/DetailLayout.tsx -->


<!-- BEGIN_FILE_AUDIT: src/components/ui/ContentCard.tsx -->
---

### File: `src/components/ui/ContentCard.tsx` +25/-10 (modified)

Diff:
```diff
@@ -1,6 +1,8 @@
 import { NavLink } from 'react-router-dom';
 import { motion } from 'motion/react';
 import { Box, Stack, Text } from '@/layouts/Primitives';
+import { readingTime } from '@/lib/content';
+import { CATEGORY_GRADIENTS } from '@/config/content';
 
 interface ContentCardProps {
   slug: string;
@@ -11,11 +13,12 @@ interface ContentCardProps {
   image?: string;
   basePath: string;
   aspect?: "square" | "video";
+  content?: string;
 }
 
 export function ContentCardSkeleton() {
   return (
-    <Box className="flex flex-col h-full bg-surface border border-line shadow-sm rounded-lg overflow-hidden animate-pulse">
+    <Box className="flex flex-col h-full bg-surface border border-line rounded-none overflow-hidden animate-pulse">
       <Box className="relative aspect-video bg-line/50" />
       <Stack gap={5} className="p-6 lg:p-8" flex={1} justify="between">
         <Stack gap={4}>
@@ -32,7 +35,10 @@ export function ContentCardSkeleton() {
   );
 }
 
-export function ContentCard({ slug, title, category, excerpt, date, image, basePath, aspect = "video" }: ContentCardProps) {
+export function ContentCard({ slug, title, category, excerpt, date, image, basePath, content, aspect = "video" }: ContentCardProps) {
+  const gradient = CATEGORY_GRADIENTS[category] || 'from-slate-800 to-slate-900';
+  const rt = readingTime(content, excerpt);
+
   return (
     <Box 
       as={NavLink}
@@ -48,12 +54,14 @@ export function ContentCard({ slug, title, category, excerpt, date, image, baseP
             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
           />
         ) : (
-          <Box className="w-full h-full flex items-center justify-center opacity-10 bg-accent-navy">
-             <Text variant="display" size="3xl">TD</Text>
+          <Box className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient}`}>
+             <Text variant="display" size="4xl" className="text-white/20">
+               {category.slice(0, 2).toUpperCase()}
+             </Text>
           </Box>
         )}
         <Box className="absolute top-4 left-4">
-          <Box className="px-3 py-1 bg-surface/90 backdrop-blur-sm border border-line rounded-[2px]">
+          <Box className="px-3 py-1 bg-surface/90 backdrop-blur-sm border border-line rounded-none">
             <Text variant="mono" size="micro" weight="font-bold" className="text-accent-navy uppercase tracking-wider">
               {category}
             </Text>
@@ -64,9 +72,16 @@ export function ContentCard({ slug, title, category, excerpt, date, image, baseP
       {/* Content Area */}
       <Stack gap={5} className="p-6 lg:p-8" flex={1} justify="between">
         <Stack gap={4}>
-          <Text variant="mono" size="xs" color="dim" uppercase className="tracking-[0.15em]">
-            {date}
-          </Text>
+          <Box display="flex" align="center" gap={3}>
+            <Text variant="mono" size="xs" color="dim" uppercase className="tracking-widest">
+              {date}
+            </Text>
+            <Box className="w-1 h-1 rounded-full bg-line" />
+            <Text variant="mono" size="xs" color="dim" uppercase className="tracking-widest flex items-center gap-1">
+              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
+              {rt} min read
+            </Text>
+          </Box>
           <Text 
             variant="display" 
             size="xl" 
@@ -80,8 +95,8 @@ export function ContentCard({ slug, title, category, excerpt, date, image, baseP
           </Text>
         </Stack>
 
-        <Box display="flex" align="center" gap={2} paddingTop={6} className="border-t border-slate-100 mt-auto">
-          <Text variant="mono" size="xs" className="text-accent font-semibold uppercase tracking-[0.15em]">
+        <Box display="flex" align="center" gap={2} paddingTop={6} className="border-t border-line mt-auto">
+          <Text variant="mono" size="xs" className="text-accent font-semibold uppercase tracking-widest">
             Read More
           </Text>
           <Box className="w-0 h-[1.5px] bg-accent group-hover:w-8 transition-all duration-500" />
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/components/ui/ContentCard.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/components/ui/ContentCard.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/components/ui/ContentCard.tsx -->


<!-- BEGIN_FILE_AUDIT: src/components/ui/FilterBar.tsx -->
---

### File: `src/components/ui/FilterBar.tsx` +8/-6 (modified)

Diff:
```diff
@@ -9,24 +9,26 @@ interface FilterBarProps {
 
 export function FilterBar({ activeCategory, categories, onSelect }: FilterBarProps) {
   return (
-    <Box className="w-full border-b border-slate-200 bg-surface/80 backdrop-blur-md sticky top-0 z-40 overflow-x-auto no-scrollbar" paddingY={5}>
+    <Box border="b" className="w-full bg-surface/80 backdrop-blur-md sticky top-0 z-40 overflow-x-auto no-scrollbar" paddingY={5}>
       <Stack direction="row" gap={4} className="min-w-max">
         {categories.map((cat) => (
           <Box
             key={cat}
             as="button"
             onClick={() => onSelect(cat)}
             paddingX={6}
-            paddingY={2.5}
-            radius="full"
+            paddingY={2}
+            radius="none"
             className={cn(
-              "transition-all duration-300 border text-sm font-bold tracking-tight",
+              "transition-all duration-300 border text-sm font-bold",
               activeCategory === cat
-                ? "bg-accent text-white border-accent shadow-sm"
+                ? "bg-text-main text-bg border-text-main"
                 : "bg-bg text-text-dim border-line hover:border-accent hover:text-accent"
             )}
           >
-            {cat === 'all' ? 'All Posts' : cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
+            <Text variant="mono" size="xs" weight="font-bold">
+              {cat === 'All' ? 'All Posts' : cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
+            </Text>
           </Box>
         ))}
       </Stack>
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/components/ui/FilterBar.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/components/ui/FilterBar.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/components/ui/FilterBar.tsx -->


<!-- BEGIN_FILE_AUDIT: src/components/ui/FolioGrid.tsx -->
---

### File: `src/components/ui/FolioGrid.tsx` +86/-48 (modified)

Diff:
```diff
@@ -1,10 +1,35 @@
 import { useState } from 'react';
 import { ContentCard, ContentCardSkeleton } from '@/components/ui/ContentCard';
 import { PageHeader } from '@/components/ui/PageHeader';
-import { Box, Grid } from '@/layouts/Primitives';
+import { Box, Grid, Stack } from '@/layouts/Primitives';
 import { safeSearch } from '@/lib/utils';
+import { ViewToggle, ViewMode } from '@/components/ui/ViewToggle';
+import { ListRow } from '@/components/ui/ListRow';
+import { ContentItem } from '@/lib/content';
 
-export default function FolioGrid({ items, categoryTitle, basePath, label, description, children, loading }: { items: any[], categoryTitle: string, basePath: string, label?: string, description?: string, children?: React.ReactNode, loading?: boolean }) {
+interface FolioGridProps {
+  items: ContentItem[];
+  categoryTitle: string;
+  basePath: string;
+  label?: string;
+  description?: string;
+  children?: React.ReactNode;
+  loading?: boolean;
+  view?: ViewMode;
+  onViewChange?: (v: ViewMode) => void;
+}
+
+export default function FolioGrid({
+  items,
+  categoryTitle,
+  basePath,
+  label,
+  description,
+  children,
+  loading,
+  view = 'card',
+  onViewChange
+}: FolioGridProps) {
   const [search, setSearch] = useState('');
 
   const filteredItems = items.filter(item => {
@@ -25,55 +50,68 @@ export default function FolioGrid({ items, categoryTitle, basePath, label, descr
           description={description}
         />
         {children}
-        <Box marginTop={8} position="relative" maxWidth="2xl">
-          <Box
-            as="input"
-            type="text"
-            placeholder="SEARCH_THE_ENGINE..."
-            width="full"
-            surface="default"
-            border
-            paddingX={6}
-            paddingY={4}
-            variant="mono"
-            size="sm"
-            className="focus:border-accent-brand outline-none focus:ring-0"
-            onChange={(e: any) => setSearch(e.target.value)}
-          />
+        <Box display="flex" align="center" justify="between" gap={4} marginTop={8} flexWrap="wrap">
+          <Box position="relative" maxWidth="2xl" flex={1}>
+            <Box
+              as="input"
+              type="text"
+              placeholder="SEARCH_THE_ENGINE..."
+              width="full"
+              surface="default"
+              border
+              paddingX={6}
+              paddingY={4}
+              variant="mono"
+              size="sm"
+              className="focus:border-accent-brand outline-none focus:ring-0"
+              onChange={(e: any) => setSearch(e.target.value)}
+            />
+          </Box>
+          {onViewChange && (
+            <ViewToggle view={view} onChange={onViewChange} />
+          )}
         </Box>
       </Box>
 
-      <Grid cols={{ base: 1, md: 2, xl: 3 }} gap={0} border="t" className="border-l border-line mt-8">
-        {loading ? (
-          Array.from({ length: 6 }).map((_, index) => (
-            <Box
-              key={index}
-              border="r"
-              borderBottom={true}
-              padding={8}
-              className={`transition-colors group ${index === 0 ? "col-span-full xl:col-span-2" : ""}`}
-            >
-              <ContentCardSkeleton />
-            </Box>
-          ))
-        ) : (
-          filteredItems.map((item, index) => (
-            <Box
-              key={item.slug}
-              border="r"
-              borderBottom={true}
-              padding={8}
-              className={`hover:bg-card-bg transition-colors group ${index === 0 ? "col-span-full xl:col-span-2" : ""}`}
-            >
-              <ContentCard
-                {...item}
-                basePath={basePath}
-                aspect="video"
-              />
-            </Box>
-          ))
-        )}
-      </Grid>
+      {view === 'card' ? (
+        <Grid cols={{ base: 1, md: 2 }} gap={0} border="t" className="border-l border-line mt-8">
+          {loading ? (
+            Array.from({ length: 6 }).map((_, index) => (
+              <Box
+                key={index}
+                border="r"
+                borderBottom={true}
+                padding={8}
+                className={`transition-colors group ${index === 0 ? "md:col-span-full" : ""}`}
+              >
+                <ContentCardSkeleton />
+              </Box>
+            ))
+          ) : (
+            filteredItems.map((item, index) => (
+              <Box
+                key={item.slug}
+                border="r"
+                borderBottom={true}
+                padding={8}
+                className={`hover:bg-card-bg transition-colors group ${index === 0 ? "md:col-span-full" : ""}`}
+              >
+                <ContentCard
+                  {...item}
+                  basePath={basePath}
+                  aspect="video"
+                />
+              </Box>
+            ))
+          )}
+        </Grid>
+      ) : (
+        <Stack gap={0} border="t" className="border-line mt-8">
+          {filteredItems.map((item) => (
+            <ListRow key={item.slug} {...item} basePath={basePath} />
+          ))}
+        </Stack>
+      )}
     </Box>
   );
 }
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/components/ui/FolioGrid.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/components/ui/FolioGrid.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/components/ui/FolioGrid.tsx -->


<!-- BEGIN_FILE_AUDIT: src/components/ui/HeroPathCard.tsx -->
---

### File: `src/components/ui/HeroPathCard.tsx` +4/-4 (modified)

Diff:
```diff
@@ -27,7 +27,7 @@ export function HeroPathCard({ label, title, paths, tag, image, span = 1, icon:
         <Stack gap={8}>
           <Box display="flex" align="center" gap={3}>
             <Icon className="w-5 h-5 text-accent" />
-            <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-[0.15em] uppercase">
+            <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-widest uppercase">
               {tag.split(' // ')[0]}
             </Text>
           </Box>
@@ -54,7 +54,7 @@ export function HeroPathCard({ label, title, paths, tag, image, span = 1, icon:
                   className="flex items-center gap-4 bg-bg/50 hover:bg-accent/5 border border-slate-200 hover:border-accent rounded-[2px] transition-all group/link"
                 >
                   {/* MECHANICAL_NOTE: Physics of the hover expansion */}
-                  <Box className="w-2 h-2 bg-accent/20 group-hover/link:bg-accent rounded-[2px] transition-colors flex-shrink-0" />
+                  <Box className="w-2 h-2 bg-accent/20 group-hover/link:bg-accent rounded-none transition-colors flex-shrink-0" />
                   <Text variant="sans" size="base" weight="font-bold" className="text-text-main group-hover/link:text-accent">
                     {item.label}
                   </Text>
@@ -65,10 +65,10 @@ export function HeroPathCard({ label, title, paths, tag, image, span = 1, icon:
         </Stack>
 
         <Box display="flex" justify="between" align="center" paddingTop={8} className="border-t border-slate-200">
-          <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-[0.15em] uppercase">
+          <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-widest uppercase">
             {tag}
           </Text>
-          <Box className="w-8 h-[2px] bg-accent/20 group-hover:w-16 group-hover:bg-accent transition-all duration-500 rounded-[2px]" />
+          <Box className="w-8 h-[2px] bg-accent/20 group-hover:w-16 group-hover:bg-accent transition-all duration-500 rounded-none" />
         </Box>
       </Stack>
     </Box>
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/components/ui/HeroPathCard.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/components/ui/HeroPathCard.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/components/ui/HeroPathCard.tsx -->


<!-- BEGIN_FILE_AUDIT: src/components/ui/ListRow.tsx -->
---

### File: `src/components/ui/ListRow.tsx` +42/-0 (added)

Diff:
```diff
@@ -0,0 +1,42 @@
+import { NavLink } from 'react-router-dom';
+import { ChevronRight } from 'lucide-react';
+import { Box, Stack, Text } from '@/layouts/Primitives';
+import { readingTime } from '@/lib/content';
+
+interface ListRowProps {
+  slug: string;
+  title: string;
+  category: string;
+  excerpt?: string;
+  date?: string;
+  basePath: string;
+  content?: string;
+}
+
+export function ListRow({ slug, title, category, excerpt, date, basePath, content }: ListRowProps) {
+  const rt = readingTime(content, excerpt);
+
+  return (
+    <Box as={NavLink} to={`${basePath}/${slug}`}
+      display="flex" align="center" border="b"
+      className="group hover:bg-surface/50 transition-colors"
+    >
+      <Box className="w-1 self-stretch bg-accent shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
+      <Box className="w-12 h-12 m-3 shrink-0 rounded-none overflow-hidden bg-accent-navy/10 flex items-center justify-center">
+        <Text variant="mono" size="micro" className="opacity-20 text-center leading-none">{category.slice(0,4).toUpperCase()}</Text>
+      </Box>
+      <Stack gap={1} flex className="py-3 min-w-0">
+        <Box display="flex" align="center" gap={3}>
+          <Text variant="mono" size="micro" color="brand" className="uppercase shrink-0">{category}</Text>
+          <Text variant="mono" size="micro" color="dim">{date}</Text>
+        </Box>
+        <Text variant="display" size="sm" weight="font-bold" className="truncate">{title}</Text>
+        <Text variant="body" size="xs" color="dim" className="truncate">{excerpt}</Text>
+      </Stack>
+      <Box display="flex" align="center" gap={3} padding={4} className="shrink-0 text-text-dim">
+        <Text variant="mono" size="micro">{rt} min</Text>
+        <ChevronRight className="w-3.5 h-3.5 opacity-30 group-hover:opacity-100 transition-opacity" />
+      </Box>
+    </Box>
+  );
+}
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/components/ui/ListRow.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/components/ui/ListRow.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/components/ui/ListRow.tsx -->


<!-- BEGIN_FILE_AUDIT: src/components/ui/PageHeader.tsx -->
---

### File: `src/components/ui/PageHeader.tsx` +2/-2 (modified)

Diff:
```diff
@@ -10,7 +10,7 @@ export function PageHeader({ label, title, description }: PageHeaderProps) {
   return (
     <Box paddingBottom={10} className="border-b border-slate-200">
       <Stack gap={4}>
-        <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase className="tracking-[0.15em]">
+        <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase className="tracking-widest">
           {label}
         </Text>
         <Text variant="headline" size="fluid-7" weight="font-black" className="text-accent-navy leading-tight tracking-tight text-balance">
@@ -30,7 +30,7 @@ export function SectionHeader({ label, title, children }: { label: string; title
   return (
     <Box display="flex" justify="between" align="end" border="b" paddingBottom={4} className="border-slate-200">
       <Stack gap={1}>
-        <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-[0.15em]">{label}</Text>
+        <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-widest">{label}</Text>
         <Text variant="display" size="3xl" weight="font-black" className="text-accent-navy">{title}</Text>
       </Stack>
       {children}
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/components/ui/PageHeader.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/components/ui/PageHeader.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/components/ui/PageHeader.tsx -->


<!-- BEGIN_FILE_AUDIT: src/components/ui/PathSelector.tsx -->
---

### File: `src/components/ui/PathSelector.tsx` +1/-0 (modified)

Diff:
```diff
@@ -44,6 +44,7 @@ export default function PathSelector() {
             className={`${path.wrapperClass} relative group overflow-hidden cursor-pointer`}
             onMouseEnter={() => setHoveredPath(path.id)}
             onMouseLeave={() => setHoveredPath(null)}
+            onClick={() => setHoveredPath(isHovered ? null : path.id)}
           >
             {/* Background */}
             <div
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/components/ui/PathSelector.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/components/ui/PathSelector.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/components/ui/PathSelector.tsx -->


<!-- BEGIN_FILE_AUDIT: src/components/ui/ViewToggle.tsx -->
---

### File: `src/components/ui/ViewToggle.tsx` +31/-0 (added)

Diff:
```diff
@@ -0,0 +1,31 @@
+import { LayoutGrid, List } from 'lucide-react';
+import { cn } from '@/lib/utils';
+
+export type ViewMode = 'card' | 'list';
+
+interface ViewToggleProps {
+  view: ViewMode;
+  onChange: (v: ViewMode) => void;
+}
+
+export function ViewToggle({ view, onChange }: ViewToggleProps) {
+  return (
+    <div className="flex border border-line rounded-none overflow-hidden">
+      {(['card', 'list'] as ViewMode[]).map((v) => (
+        <button
+          key={v}
+          onClick={() => onChange(v)}
+          className={cn(
+            'p-2 transition-colors',
+            v === 'card' ? 'border-r border-line' : '',
+            view === v ? 'bg-surface text-text-main' : 'bg-bg text-text-dim hover:text-text-main'
+          )}
+          aria-label={v === 'card' ? 'Card view' : 'List view'}
+          aria-pressed={view === v}
+        >
+          {v === 'card' ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
+        </button>
+      ))}
+    </div>
+  );
+}
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/components/ui/ViewToggle.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/components/ui/ViewToggle.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/components/ui/ViewToggle.tsx -->


<!-- BEGIN_FILE_AUDIT: src/config/content.ts -->
---

### File: `src/config/content.ts` +12/-0 (modified)

Diff:
```diff
@@ -7,6 +7,18 @@ export const CONTENT_CATEGORIES = [
 
 export type CategoryId = typeof CONTENT_CATEGORIES[number]['id'];
 
+export const CATEGORY_GRADIENTS: Record<string, string> = {
+  'Data & Dev Lab': 'from-[#1A2B3C] to-[#185FA5]',
+  'Tech': 'from-[#1A2B3C] to-[#185FA5]',
+  'All about WCS':  'from-[#1A2B3C] to-[#3B6D11]',
+  'Travel/Lifestyle': 'from-[#993C1D] to-[#BA7517]',
+  'Lifestyle': 'from-[#993C1D] to-[#BA7517]',
+  'Gear Reviews':   'from-[#534AB7] to-[#1D9E75]',
+  'Gear': 'from-[#534AB7] to-[#1D9E75]',
+  'Dance Gear': 'from-[#534AB7] to-[#1D9E75]',
+  'General': 'from-[#1A2B3C] to-[#185FA5]',
+};
+
 export const SITE_METADATA = {
   title: 'Tech-Dancer',
   author: 'Ariel Anders, PhD',
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/config/content.ts",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/config/content.ts",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/config/content.ts -->


<!-- BEGIN_FILE_AUDIT: src/features/dashboard/EventCard.tsx -->
---

### File: `src/features/dashboard/EventCard.tsx` +1/-1 (modified)

Diff:
```diff
@@ -16,7 +16,7 @@ export function EventCard({ name, date, status, icon: Icon }: EventCardProps) {
       <Stack gap={4}>
         <Box className="flex items-center gap-3">
           <Icon className="w-5 h-5 text-accent" />
-          <Text variant="mono" size="xs" color="dim" uppercase className="tracking-[0.15em]">
+          <Text variant="mono" size="xs" color="dim" uppercase className="tracking-widest">
             {status}
           </Text>
         </Box>
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/features/dashboard/EventCard.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/dashboard/EventCard.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/dashboard/EventCard.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/email-capture/NewsletterBanner.tsx -->
---

### File: `src/features/email-capture/NewsletterBanner.tsx` +1/-1 (modified)

Diff:
```diff
@@ -16,7 +16,7 @@ export function NewsletterBanner() {
       animate={motionTokens.overlay.animate}
       exit={motionTokens.overlay.exit}
       transition={motionTokens.overlay.transition}
-      className="bg-white/80 backdrop-blur-xl border-t border-line/50 rounded-t-3xl shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05),0_-8px_10px_-6px_rgba(0,0,0,0.05)] mx-auto"
+      className="bg-white/80 backdrop-blur-xl border border-line/50 rounded-none mx-auto"
       padding="emailBar"
       position="fixed"
       style={{ bottom: 0, left: '1rem', right: '1rem', width: 'calc(100% - 2rem)' }}
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/features/email-capture/NewsletterBanner.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/email-capture/NewsletterBanner.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/email-capture/NewsletterBanner.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/journal/BlogFeed.tsx -->
---

### File: `src/features/journal/BlogFeed.tsx` +3/-1 (modified)

Diff:
```diff
@@ -4,7 +4,7 @@ import FolioGrid from '@/components/ui/FolioGrid';
 import { FilterBar } from '@/components/ui/FilterBar';
 
 export default function BlogFeed() {
-  const { posts, categories, activeCategory, setActiveCategory, isLoading } = useBlog();
+  const { posts, categories, activeCategory, setActiveCategory, view, setView, isLoading } = useBlog();
 
   return (
     <Box as="section">
@@ -15,6 +15,8 @@ export default function BlogFeed() {
         label="INSIGHTS"
         description="A searchable, categorized folio of posts covering travel, lifestyle, gear reviews, technical portfolio pieces, and everything about West Coast Swing."
         basePath="/blog"
+        view={view}
+        onViewChange={setView}
       >
         <Box marginTop={8}>
           <FilterBar
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/features/journal/BlogFeed.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/journal/BlogFeed.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/journal/BlogFeed.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/journal/BlogPost.tsx -->
---

### File: `src/features/journal/BlogPost.tsx` +2/-2 (modified)

Diff:
```diff
@@ -1,8 +1,8 @@
 import { useMemo } from 'react';
 import { useParams, useNavigate } from 'react-router-dom';
 import { getPostBySlug } from '@/lib/content';
-import { ContentDetail } from '@/layouts/ContentDetail';
 import { Box, Stack, Text } from '@/layouts/Primitives';
+import { BlogPostDetail } from './components/BlogPostDetail';
 
 export default function BlogPost() {
   const { slug } = useParams();
@@ -23,7 +23,7 @@ export default function BlogPost() {
   }
 
   return (
-    <ContentDetail
+    <BlogPostDetail
       post={post}
       onBack={() => navigate('/blog')}
       backLabel="Back to Folio"
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/features/journal/BlogPost.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/journal/BlogPost.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/journal/BlogPost.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/journal/components/BlogPostDetail.tsx -->
---

### File: `src/features/journal/components/BlogPostDetail.tsx` +76/-0 (added)

Diff:
```diff
@@ -0,0 +1,76 @@
+import { User, Share2 } from 'lucide-react';
+import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
+import { Post, getPosts } from '@/lib/content';
+import { ContentCard } from '@/components/ui/ContentCard';
+import { useMemo } from 'react';
+import { DetailLayout } from '@/components/layout/DetailLayout';
+import { TOC } from '@/components/layout/DetailElements';
+
+interface BlogPostDetailProps {
+  post: Post;
+  onBack: () => void;
+  backLabel: string;
+}
+
+export function BlogPostDetail({ post, onBack, backLabel }: BlogPostDetailProps) {
+  // Extract Headings for TOC
+  const headings = useMemo(() => {
+    const lines = post.content.split('\n');
+    return lines
+      .filter(line => line.startsWith('## '))
+      .map(line => line.replace('## ', '').trim());
+  }, [post.content]);
+
+  // Related Posts
+  const relatedPosts = useMemo(() => {
+    return getPosts()
+      .filter(p => p.category === post.category && p.slug !== post.slug)
+      .slice(0, 2);
+  }, [post.category, post.slug]);
+
+  const sidebar = <TOC headings={headings} />;
+
+  const headerExtras = (
+    <Box display="flex" align="center" justify="between" border="y" paddingY={6} className="border-line/50">
+      <Box display="flex" align="center" gap={4}>
+        <Box className="w-10 h-10 rounded-none bg-accent-navy flex items-center justify-center text-white">
+          <Text variant="mono" size="xs" weight="font-bold">AA</Text>
+        </Box>
+        <Stack gap={0}>
+          <Text variant="mono" size="xs" weight="font-bold">{post.author || 'Ariel Anders, PhD'}</Text>
+          <Text variant="mono" size="tiny" color="dim">Author & Engineer</Text>
+        </Stack>
+      </Box>
+      <Box as="button" display="flex" align="center" gap={2} color="dim" className="hover:text-accent-brand transition-colors">
+        <Share2 className="w-4 h-4" />
+        <Text variant="mono" size="xs">Share</Text>
+      </Box>
+    </Box>
+  );
+
+  const relatedContent = relatedPosts.length > 0 && (
+    <Box border="t" paddingTop={12} marginTop={12}>
+      <Text variant="mono" size="xs" weight="font-bold" className="mb-8 block uppercase tracking-widest">Related Posts</Text>
+      <Grid cols={{ base: 1, md: 2 }} gap={8}>
+        {relatedPosts.map(p => (
+          <ContentCard key={p.slug} {...p} basePath="/blog" />
+        ))}
+      </Grid>
+    </Box>
+  );
+
+  return (
+    <DetailLayout
+      title={post.title}
+      category={post.category}
+      date={post.date}
+      content={post.content}
+      image={post.image}
+      onBack={onBack}
+      backLabel={backLabel}
+      sidebar={sidebar}
+      headerExtras={headerExtras}
+      relatedContent={relatedContent}
+    />
+  );
+}
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/features/journal/components/BlogPostDetail.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/journal/components/BlogPostDetail.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/journal/components/BlogPostDetail.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/journal/useBlog.ts -->
---

### File: `src/features/journal/useBlog.ts` +11/-9 (modified)

Diff:
```diff
@@ -2,27 +2,22 @@ import { useState, useEffect, useMemo } from 'react';
 import { useSearchParams } from 'react-router-dom';
 import { getPosts, Post } from '@/lib/content';
 import { safeSearch } from '@/lib/utils';
+import { ViewMode } from '@/components/ui/ViewToggle';
 
 export function useBlog() {
   const [posts, setPosts] = useState<Post[]>([]);
   const [searchParams, setSearchParams] = useSearchParams();
   const activeCategory = searchParams.get('category') || 'All';
+  const view = (searchParams.get('view') as ViewMode) || 'card';
   const [searchTerm, setSearchTerm] = useState<string>('');
   const [isLoading, setIsLoading] = useState(true);
 
   useEffect(() => {
-    setIsLoading(true);
-    // Simulate a brief loading state to show the skeleton and avoid jump
-    const timer = setTimeout(() => {
-      setPosts(getPosts());
-      setIsLoading(false);
-    }, 500);
-    return () => clearTimeout(timer);
+    setPosts(getPosts());
+    setIsLoading(false);
   }, []);
 
   const setActiveCategory = (category: string) => {
-    setIsLoading(true);
-    setTimeout(() => setIsLoading(false), 300);
     if (category === 'All') {
       searchParams.delete('category');
     } else {
@@ -31,6 +26,11 @@ export function useBlog() {
     setSearchParams(searchParams);
   };
 
+  const setView = (v: ViewMode) => {
+    searchParams.set('view', v);
+    setSearchParams(searchParams);
+  };
+
   const categories = useMemo(() => {
     const cats = posts.map(p => p.category);
     return ['All', ...new Set(cats)];
@@ -59,6 +59,8 @@ export function useBlog() {
     categories,
     activeCategory,
     setActiveCategory,
+    view,
+    setView,
     searchTerm,
     setSearchTerm,
     isLoading
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/features/journal/useBlog.ts",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/journal/useBlog.ts",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/journal/useBlog.ts -->


<!-- BEGIN_FILE_AUDIT: src/features/lab/BlogDrafter.tsx -->
---

### File: `src/features/lab/BlogDrafter.tsx` +19/-12 (modified)

Diff:
```diff
@@ -1,12 +1,23 @@
 import { motion } from 'motion/react';
-import { Github, FileText, Send, Terminal, ExternalLink, Info } from 'lucide-react';
+import { useState } from 'react';
+import { Github, FileText, Send, Terminal, ExternalLink, Info, Check } from 'lucide-react';
 import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
 import { useBlogDrafter } from './useBlogDrafter';
 import ReactMarkdown from 'react-markdown';
 import { CONTENT_CATEGORIES } from '@/config/content';
 
 export function BlogDrafter() {
   const { data, updateField, markdownPreview, githubIssueUrl } = useBlogDrafter();
+  const [copied, setCopied] = useState(false);
+
+  const handleCopyPrompt = () => {
+    const prompt = `Task: Review and expand this blog post draft for Tech-Dancer.
+      Current Data: ${JSON.stringify(data, null, 2)}
+      Respond ONLY with a valid JSON object matching the keys above. Ensure the 'commentary' field is a full, high-quality Markdown post.`;
+    navigator.clipboard.writeText(prompt);
+    setCopied(true);
+    setTimeout(() => setCopied(false), 2000);
+  };
 
   return (
     <Stack gap={10} height="full">
@@ -171,24 +182,20 @@ export function BlogDrafter() {
           <Grid cols={2} gap={4}>
             <Box
               as="button"
-              onClick={() => {
-                const prompt = `Task: Review and expand this blog post draft for Tech-Dancer.
-                  Current Data: ${JSON.stringify(data, null, 2)}
-                  Respond ONLY with a valid JSON object matching the keys above. Ensure the 'commentary' field is a full, high-quality Markdown post.`;
-                navigator.clipboard.writeText(prompt);
-                alert("AI Prompt Copied! Use Gemini or Claude to expand.");
-              }}
+              onClick={handleCopyPrompt}
               display="flex"
               align="center"
               justify="center"
               gap={3}
-              surface="muted"
+              surface={copied ? "accent" : "muted"}
               border
               padding={4}
-              className="hover:bg-line transition-all cursor-pointer group"
+              className={`hover:bg-line transition-all cursor-pointer group ${copied ? 'bg-accent/10 border-accent text-accent' : ''}`}
             >
-              <Terminal className="w-5 h-5" />
-              <Text variant="mono" size="xs" weight="font-bold">COPY AI PROMPT</Text>
+              {copied ? <Check className="w-5 h-5" /> : <Terminal className="w-5 h-5" />}
+              <Text variant="mono" size="xs" weight="font-bold">
+                {copied ? 'PROMPT COPIED ✓' : 'COPY AI PROMPT'}
+              </Text>
             </Box>
 
             <Box
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/features/lab/BlogDrafter.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/lab/BlogDrafter.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/lab/BlogDrafter.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/lab/GearCard.tsx -->
---

### File: `src/features/lab/GearCard.tsx` +49/-33 (modified)

Diff:
```diff
@@ -1,6 +1,7 @@
 import { NavLink } from 'react-router-dom';
 import { Box, Stack, Text } from '@/layouts/Primitives';
 import { Resource } from '@/lib/content';
+import { CATEGORY_GRADIENTS } from '@/config/content';
 
 interface GearCardProps extends Resource {
   basePath: string;
@@ -18,10 +19,12 @@ export function GearCard({
   priceCategory,
   updatedDate
 }: GearCardProps) {
+  const gradient = CATEGORY_GRADIENTS[category] || 'from-slate-800 to-slate-900';
+
   return (
     <NavLink
       to={`${basePath}/${slug}`}
-      className="group flex flex-col bg-surface rounded-2xl border border-line shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
+      className="group flex flex-col bg-surface border border-line transition-all duration-300 overflow-hidden"
     >
       {/* Image Wrapper */}
       <div className="aspect-square md:aspect-video relative overflow-hidden bg-bg">
@@ -32,17 +35,28 @@ export function GearCard({
             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
           />
         ) : (
-          <div className="w-full h-full flex items-center justify-center opacity-10 bg-accent-navy text-accent-navy">
-             <span className="font-display font-bold uppercase tracking-tight leading-none text-3xl">TD</span>
+          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient}`}>
+             <span className="font-display font-bold uppercase tracking-tight leading-none text-3xl text-white/20">
+               {category.slice(0, 2).toUpperCase()}
+             </span>
           </div>
         )}
         <div className="absolute top-4 left-4">
-          <div className="bg-surface/90 backdrop-blur px-3 py-1 rounded-full border border-line">
+          <div className="bg-surface/90 backdrop-blur px-3 py-1 rounded-none border border-line">
             <Text variant="mono" size="micro" weight="font-bold" className="text-accent-navy uppercase">
               {category}
             </Text>
           </div>
         </div>
+        {verdict && (
+          <div className="absolute top-4 right-4">
+            <div className="bg-accent-brand px-2 py-1 rounded-none">
+              <Text variant="mono" size="micro" weight="font-bold" className="text-white uppercase">
+                {verdict}
+              </Text>
+            </div>
+          </div>
+        )}
       </div>
 
       {/* Content Area */}
@@ -54,9 +68,9 @@ export function GearCard({
                 {'★'.repeat(Math.floor(rating))}
                 {rating % 1 !== 0 ? '½' : ''}
               </span>
-              <span className="text-[8px] text-text-dim font-medium">
+              <Text variant="mono" size="micro" color="dim" emphasis="low">
                 ({rating}/5)
-              </span>
+              </Text>
             </div>
           )}
 
@@ -68,43 +82,45 @@ export function GearCard({
              {excerpt}
           </p>
 
-          {(verdict || priceCategory || updatedDate) && (
+          {(priceCategory || updatedDate) && (
             <div className="flex flex-wrap items-center gap-3 mt-2">
-               {verdict && (
-                 <div className="bg-accent/10 px-2 py-0.5 rounded-md">
-                   <span className="text-[8px] font-mono uppercase text-accent font-bold">{verdict}</span>
-                 </div>
-               )}
                {priceCategory && (
-                 <span className="text-[8px] font-mono uppercase text-text-dim font-bold">{priceCategory}</span>
+                 <Box border className="bg-amber-50 px-2 py-0.5 border-amber-200">
+                   <Text variant="mono" size="tiny" weight="font-bold" className="text-amber-700">{priceCategory}</Text>
+                 </Box>
                )}
                {updatedDate && (
-                 <span className="text-[8px] font-mono uppercase text-text-dim">Updated {updatedDate}</span>
+                 <Text variant="mono" size="tiny" color="dim">Updated {updatedDate}</Text>
                )}
             </div>
           )}
         </div>
 
-        <div className="flex items-center justify-between pt-4 border-t border-line/50 mt-auto">
-          <span className="font-mono tracking-wider uppercase text-accent font-bold text-xs">
-            Read Review
-          </span>
-          <div className="group-hover:translate-x-1 transition-transform duration-300">
-            <svg
-              xmlns="http://www.w3.org/2000/svg"
-              width="16"
-              height="16"
-              viewBox="0 0 24 24"
-              fill="none"
-              stroke="currentColor"
-              strokeWidth="3"
-              strokeLinecap="round"
-              strokeLinejoin="round"
-              className="text-accent"
-            >
-              <polyline points="9 18 15 12 9 6"></polyline>
-            </svg>
+        <div className="flex flex-col gap-3 mt-auto">
+          <div className="flex items-center justify-between pt-4 border-t border-line/50">
+            <Text variant="mono" size="xs" color="brand" weight="font-bold">
+              Read Review
+            </Text>
+            <div className="group-hover:translate-x-1 transition-transform duration-300">
+              <svg
+                xmlns="http://www.w3.org/2000/svg"
+                width="16"
+                height="16"
+                viewBox="0 0 24 24"
+                fill="none"
+                stroke="currentColor"
+                strokeWidth="3"
+                strokeLinecap="round"
+                strokeLinejoin="round"
+                className="text-accent"
+              >
+                <polyline points="9 18 15 12 9 6"></polyline>
+              </svg>
+            </div>
           </div>
+          <Text variant="mono" size="micro" color="dim" emphasis="low" italic className="leading-tight">
+            * This post contains affiliate links. I may earn a commission at no extra cost to you.
+          </Text>
         </div>
       </div>
     </NavLink>
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/features/lab/GearCard.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/lab/GearCard.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/lab/GearCard.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/lab/GearPost.tsx -->
---

### File: `src/features/lab/GearPost.tsx` +3/-38 (modified)

Diff:
```diff
@@ -1,23 +1,14 @@
 import { useMemo } from 'react';
 import { useParams, useNavigate } from 'react-router-dom';
-import { ExternalLink } from 'lucide-react';
 import { Box, Stack, Text } from '@/layouts/Primitives';
 import { getResourceBySlug } from '@/lib/content';
-import { affiliateManager } from '@/lib/affiliateManager';
-import { ContentDetail } from '@/layouts/ContentDetail';
+import { GearPostDetail } from './components/GearPostDetail';
 
 export default function GearPost() {
   const { slug } = useParams();
   const navigate = useNavigate();
   const resource = useMemo(() => slug ? getResourceBySlug(slug) : undefined, [slug]);
 
-  const affiliateLinks = useMemo(() =>
-    (resource?.affiliateIds || [])
-      .map(id => affiliateManager.getLink(id))
-      .filter((link): link is NonNullable<typeof link> => !!link),
-    [resource]
-  );
-
   if (!resource) {
     return (
       <Box padding="panel" textAlign="center">
@@ -32,36 +23,10 @@ export default function GearPost() {
   }
 
   return (
-    <ContentDetail
+    <GearPostDetail
       post={resource}
       onBack={() => navigate('/gear')}
       backLabel="Back to Toolbox"
-    >
-      {affiliateLinks.length > 0 && (
-        <Box border padding={6} className="bg-surface/50 border-accent/20">
-          <Stack gap={4}>
-            <Text variant="mono" size="xs" weight="font-bold" color="brand">FEATURED GEAR</Text>
-            <Box display="flex" flexWrap="wrap" gap={4}>
-              {affiliateLinks.map((link) => (
-                <Box
-                  key={link.id}
-                  as="a"
-                  href={affiliateManager.resolveUrl(link.id)}
-                  target="_blank"
-                  rel="noopener noreferrer"
-                  className="flex items-center gap-3 px-4 py-2 bg-surface border border-line hover:border-accent transition-colors"
-                >
-                  <Stack gap={1}>
-                    <Text variant="mono" size="xs" weight="font-bold">{link.name}</Text>
-                    <Text variant="mono" size="micro" color="dim" className="max-w-xs line-clamp-1">{link.description}</Text>
-                  </Stack>
-                  <ExternalLink className="w-3 h-3 text-accent" />
-                </Box>
-              ))}
-            </Box>
-          </Stack>
-        </Box>
-      )}
-    </ContentDetail>
+    />
   );
 }
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/features/lab/GearPost.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/lab/GearPost.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/lab/GearPost.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/lab/Toolbox.tsx -->
---

### File: `src/features/lab/Toolbox.tsx` +50/-37 (modified)

Diff:
```diff
@@ -1,10 +1,12 @@
 import { useMemo } from 'react';
-import { Box, Grid, Text } from '@/layouts/Primitives';
+import { Box, Grid, Text, Stack } from '@/layouts/Primitives';
 import { useToolbox } from './useToolbox';
 import { GearCard } from './GearCard';
+import { ViewToggle } from '@/components/ui/ViewToggle';
+import { ListRow } from '@/components/ui/ListRow';
 
 export default function Toolbox() {
-  const { filteredCategories, searchTerm, setSearchTerm } = useToolbox();
+  const { filteredCategories, searchTerm, setSearchTerm, view, setView } = useToolbox();
 
   const allFilteredItems = useMemo(() =>
     filteredCategories.flatMap(cat => cat.items),
@@ -15,9 +17,9 @@ export default function Toolbox() {
       {/* Header section with modern design */}
       <header className="mb-12 border-b border-line/50 pb-12">
         <Box marginBottom={4}>
-          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider">
-            THE TOOLBOX
-          </span>
+          <Box as="span" radius="full" paddingX={3} paddingY={1} className="inline-block bg-accent/10">
+            <Text variant="mono" size="tiny" color="brand" weight="font-bold">THE TOOLBOX</Text>
+          </Box>
         </Box>
         <Text as="h1" variant="display" size="4xl" weight="font-black" className="text-accent-navy mb-4 block">
           Gear Reviews
@@ -26,41 +28,52 @@ export default function Toolbox() {
           Rigorous testing and honest takes on the gear that keeps you moving.
         </Text>
 
-        {/* Modern Search Bar */}
-        <div className="relative max-w-md">
-          <input
-            type="text"
-            placeholder="Search gear (e.g. earplugs, shoes)..."
-            className="w-full pl-10 pr-4 py-3 bg-surface border border-line rounded-xl focus:ring-4 focus:ring-accent/10 outline-none transition-all text-base md:text-sm"
-            onChange={(e) => setSearchTerm(e.target.value)}
-            value={searchTerm}
-          />
-          <svg
-            className="absolute left-3 top-3.5 h-5 w-5 text-text-dim"
-            xmlns="http://www.w3.org/2000/svg"
-            viewBox="0 0 24 24"
-            fill="none"
-            stroke="currentColor"
-            strokeWidth="2"
-            strokeLinecap="round"
-            strokeLinejoin="round"
-          >
-            <circle cx="11" cy="11" r="8"></circle>
-            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
-          </svg>
-        </div>
+        {/* Modern Search Bar & Toggle */}
+        <Box display="flex" align="center" justify="between" gap={4} flexWrap="wrap">
+          <div className="relative max-w-md flex-1">
+            <input
+              type="text"
+              placeholder="Search gear (e.g. earplugs, shoes)..."
+              className="w-full pl-10 pr-4 py-3 bg-surface border border-line rounded-none focus:ring-4 focus:ring-accent/10 outline-none transition-all text-base md:text-sm"
+              onChange={(e) => setSearchTerm(e.target.value)}
+              value={searchTerm}
+            />
+            <svg
+              className="absolute left-3 top-3.5 h-5 w-5 text-text-dim"
+              xmlns="http://www.w3.org/2000/svg"
+              viewBox="0 0 24 24"
+              fill="none"
+              stroke="currentColor"
+              strokeWidth="2"
+              strokeLinecap="round"
+              strokeLinejoin="round"
+            >
+              <circle cx="11" cy="11" r="8"></circle>
+              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
+            </svg>
+          </div>
+          <ViewToggle view={view} onChange={setView} />
+        </Box>
       </header>
 
       {/* Grid: Mobile-first stacking */}
-      <Grid cols={{ base: 1, md: 2, xl: 3 }} gap={{ base: 6, md: 8 }}>
-        {allFilteredItems.map((item) => (
-          <GearCard
-            key={item.slug}
-            {...item}
-            basePath="/gear"
-          />
-        ))}
-      </Grid>
+      {view === 'card' ? (
+        <Grid cols={{ base: 1, md: 2, xl: 3 }} gap={{ base: 6, md: 8 }}>
+          {allFilteredItems.map((item) => (
+            <GearCard
+              key={item.slug}
+              {...item}
+              basePath="/gear"
+            />
+          ))}
+        </Grid>
+      ) : (
+        <Stack gap={0} border="t" className="border-line">
+          {allFilteredItems.map((item) => (
+            <ListRow key={item.slug} {...item} basePath="/gear" />
+          ))}
+        </Stack>
+      )}
 
       {allFilteredItems.length === 0 && (
         <Box paddingY={20} className="text-center">
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/features/lab/Toolbox.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/lab/Toolbox.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/lab/Toolbox.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/lab/components/GearPostDetail.tsx -->
---

### File: `src/features/lab/components/GearPostDetail.tsx` +81/-0 (added)

Diff:
```diff
@@ -0,0 +1,81 @@
+import { ExternalLink, Star, Shield } from 'lucide-react';
+import { Box, Stack, Text } from '@/layouts/Primitives';
+import { Resource } from '@/lib/content';
+import { affiliateManager } from '@/lib/affiliateManager';
+import { DetailLayout } from '@/components/layout/DetailLayout';
+import { ScoreGrid, ScoreItem, SpecsTable, VerdictCallout } from '@/components/layout/DetailElements';
+
+interface GearPostDetailProps {
+  post: Resource;
+  onBack: () => void;
+  backLabel: string;
+}
+
+export function GearPostDetail({ post, onBack, backLabel }: GearPostDetailProps) {
+  const affiliateLinks = (post.affiliateIds || [])
+    .map(id => affiliateManager.getLink(id))
+    .filter((link): link is NonNullable<typeof link> => !!link);
+
+  const headerExtras = (
+    <ScoreGrid>
+      <ScoreItem label="Overall" value={post.rating || 'N/A'} icon={Star} color="text-yellow-500" />
+      <ScoreItem label="Durability" value={post.durability ? `${post.durability}/5` : '—'} />
+      <ScoreItem label="Value" value={post.value ? `${post.value}/5` : '—'} />
+      <ScoreItem label="Price" value={post.priceCategory || '$$'} color="text-amber-600" />
+      <Stack gap={1} align="center" className="hidden md:flex">
+        <Text variant="mono" size="tiny" color="dim" uppercase>Updated</Text>
+        <Text variant="mono" size="tiny" weight="font-bold" className="uppercase">{post.updatedDate || post.date}</Text>
+      </Stack>
+    </ScoreGrid>
+  );
+
+  const sidebar = (
+    <>
+      <SpecsTable specs={post.specs} />
+
+      {affiliateLinks.length > 0 && (
+        <Stack gap={4} marginTop={8}>
+          <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase className="tracking-widest border-b border-line pb-2">Where to Buy</Text>
+          {affiliateLinks.map(link => (
+            <Box
+              key={link.id}
+              as="a"
+              href={link.url}
+              target="_blank"
+              rel="noopener noreferrer"
+              display="flex"
+              align="center"
+              justify="between"
+              padding={4}
+              surface="default"
+              border
+              className="hover:border-accent group transition-all"
+            >
+              <Text variant="mono" size="xs" weight="font-bold">{link.label}</Text>
+              <ExternalLink className="w-4 h-4 text-accent opacity-30 group-hover:opacity-100" />
+            </Box>
+          ))}
+          <Text variant="mono" size="micro" color="dim" emphasis="low" className="leading-tight italic">
+            * Affiliate link support helps maintain this repository.
+          </Text>
+        </Stack>
+      )}
+    </>
+  );
+
+  return (
+    <DetailLayout
+      title={post.title}
+      category={post.category}
+      date={post.date}
+      content={post.content}
+      image={post.image}
+      onBack={onBack}
+      backLabel={backLabel}
+      sidebar={sidebar}
+      headerExtras={headerExtras}
+    >
+      {post.verdict && <VerdictCallout verdict={post.verdict} />}
+    </DetailLayout>
+  );
+}
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/features/lab/components/GearPostDetail.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/lab/components/GearPostDetail.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/lab/components/GearPostDetail.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/lab/useToolbox.ts -->
---

### File: `src/features/lab/useToolbox.ts` +12/-1 (modified)

Diff:
```diff
@@ -1,9 +1,13 @@
 import { getResources, Resource } from '@/lib/content';
 import { useMemo, useState } from 'react';
+import { useSearchParams } from 'react-router-dom';
 import { safeSearch } from '@/lib/utils';
+import { ViewMode } from '@/components/ui/ViewToggle';
 
 export function useToolbox() {
   const resources = getResources();
+  const [searchParams, setSearchParams] = useSearchParams();
+  const view = (searchParams.get('view') as ViewMode) || 'card';
   const [searchTerm, setSearchTerm] = useState('');
 
   const categories = [
@@ -32,9 +36,16 @@ export function useToolbox() {
     })).filter(cat => cat.items.length > 0);
   }, [groupedResources, searchTerm]);
 
+  const setView = (v: ViewMode) => {
+    searchParams.set('view', v);
+    setSearchParams(searchParams);
+  };
+
   return {
     searchTerm,
     setSearchTerm,
-    filteredCategories
+    filteredCategories,
+    view,
+    setView
   };
 }
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/features/lab/useToolbox.ts",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/lab/useToolbox.ts",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/lab/useToolbox.ts -->


<!-- BEGIN_FILE_AUDIT: src/features/profile/ArielProfile.tsx -->
---

### File: `src/features/profile/ArielProfile.tsx` +3/-3 (modified)

Diff:
```diff
@@ -26,7 +26,7 @@ export default function ArielProfile() {
               <Grid cols={1} gap={6}>
                 {bio.details.map((detail) => (
                   <Box key={detail.label} paddingBottom={4} className="border-b border-slate-200">
-                    <Text variant="mono" size="xs" color="dim" weight="font-semibold" display="block" className="tracking-[0.15em] uppercase">{detail.label}</Text>
+                    <Text variant="mono" size="xs" color="dim" weight="font-semibold" display="block" className="tracking-widest uppercase">{detail.label}</Text>
                     <Text variant="display" size="lg" marginTop={1} weight="font-bold" className="text-accent-navy">{detail.value}</Text>
                   </Box>
                 ))}
@@ -37,7 +37,7 @@ export default function ArielProfile() {
                 href="#" 
                 className="hover:text-accent transition-colors flex items-center gap-2 text-accent-navy"
               >
-                <Text variant="mono" size="xs" weight="font-semibold" className="tracking-[0.15em]">VIEW FULL BACKGROUND</Text>
+                <Text variant="mono" size="xs" weight="font-semibold" className="tracking-widest">VIEW FULL BACKGROUND</Text>
                 <ArrowRight className="w-4 h-4" />
               </Box>
             </Stack>
@@ -76,7 +76,7 @@ export default function ArielProfile() {
                     className="group hover:border-accent-brand transition-all"
                   >
                     <item.icon className="w-5 h-5 text-accent-navy group-hover:text-accent transition-colors" />
-                    <Text variant="mono" size="xs" weight="font-semibold" className="tracking-[0.15em]">{item.label}</Text>
+                    <Text variant="mono" size="xs" weight="font-semibold" className="tracking-widest">{item.label}</Text>
                   </Box>
                 ))}
               </Grid>
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/features/profile/ArielProfile.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/profile/ArielProfile.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/profile/ArielProfile.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/profile/ContactConsole.tsx -->
---

### File: `src/features/profile/ContactConsole.tsx` +5/-5 (modified)

Diff:
```diff
@@ -113,7 +113,7 @@ function ContactForm({ formData, errors, isSubmitting, onChange, onSubmit }: Con
                   </Box>
                   <Stack gap={1}>
                     <Text variant="sans" size="base" weight="font-bold" className="text-accent-navy">{item.label}</Text>
-                    <Text variant="mono" color="dim" size="xs" weight="font-semibold" className="tracking-[0.15em] uppercase">{item.channel}</Text>
+                    <Text variant="mono" color="dim" size="xs" weight="font-semibold" className="tracking-widest uppercase">{item.channel}</Text>
                   </Stack>
                 </Box>
               ))}
@@ -125,7 +125,7 @@ function ContactForm({ formData, errors, isSubmitting, onChange, onSubmit }: Con
           <Box as="form" onSubmit={onSubmit} className="space-y-8">
             <Stack gap={3}>
               <Box display="flex" justify="between" align="center">
-                <Text as="label" htmlFor="contact-name" variant="mono" size="xs" weight="font-semibold" color="dim" className="tracking-[0.15em] uppercase">Your Name</Text>
+                <Text as="label" htmlFor="contact-name" variant="mono" size="xs" weight="font-semibold" color="dim" className="tracking-widest uppercase">Your Name</Text>
                 {errors.name && <Text id="name-error" variant="mono" weight="font-semibold" color="brand" size="xs" role="alert">{errors.name}</Text>}
               </Box>
               <Box as="input" 
@@ -145,7 +145,7 @@ function ContactForm({ formData, errors, isSubmitting, onChange, onSubmit }: Con
             </Stack>
             <Stack gap={3}>
               <Box display="flex" justify="between" align="center">
-                <Text as="label" htmlFor="contact-email" variant="mono" size="xs" weight="font-semibold" color="dim" className="tracking-[0.15em] uppercase">Your Email</Text>
+                <Text as="label" htmlFor="contact-email" variant="mono" size="xs" weight="font-semibold" color="dim" className="tracking-widest uppercase">Your Email</Text>
                 {errors.email && <Text id="email-error" variant="mono" weight="font-semibold" color="brand" size="xs" role="alert">{errors.email}</Text>}
               </Box>
               <Box as="input" 
@@ -164,7 +164,7 @@ function ContactForm({ formData, errors, isSubmitting, onChange, onSubmit }: Con
               />
             </Stack>
             <Stack gap={3}>
-              <Text as="label" htmlFor="contact-subject" variant="mono" size="xs" weight="font-semibold" color="dim" className="tracking-[0.15em] uppercase">Subject</Text>
+              <Text as="label" htmlFor="contact-subject" variant="mono" size="xs" weight="font-semibold" color="dim" className="tracking-widest uppercase">Subject</Text>
               <Box as="select" 
                 id="contact-subject"
                 name="subject"
@@ -180,7 +180,7 @@ function ContactForm({ formData, errors, isSubmitting, onChange, onSubmit }: Con
             </Stack>
             <Stack gap={3}>
               <Box display="flex" justify="between" align="center">
-                <Text as="label" htmlFor="contact-message" variant="mono" size="xs" weight="font-semibold" color="dim" className="tracking-[0.15em] uppercase">Message</Text>
+                <Text as="label" htmlFor="contact-message" variant="mono" size="xs" weight="font-semibold" color="dim" className="tracking-widest uppercase">Message</Text>
                 {errors.message && <Text id="message-error" variant="mono" weight="font-semibold" color="brand" size="xs" role="alert">{errors.message}</Text>}
               </Box>
               <Box as="textarea" 
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/features/profile/ContactConsole.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/profile/ContactConsole.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/profile/ContactConsole.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/research/ResearchAnalytics.tsx -->
---

### File: `src/features/research/ResearchAnalytics.tsx` +46/-30 (modified)

Diff:
```diff
@@ -21,7 +21,7 @@ export default function ResearchAnalytics() {
         <Stack gap={8}>
           <Box paddingBottom={4} display="flex" justify="between" align="end" className="border-b border-slate-200">
             <Text variant="display" size="2xl" weight="font-black" className="text-accent-navy">Tools Ecosystem</Text>
-            <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-[0.15em]">{tools.length} TOOLS</Text>
+            <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-widest">{tools.length} TOOLS</Text>
           </Box>
           <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={8}>
             {tools.map((tool) => (
@@ -61,38 +61,54 @@ export default function ResearchAnalytics() {
         <Stack gap={8}>
           <Box paddingBottom={4} display="flex" justify="between" align="end" className="border-b border-slate-200">
             <Text variant="display" size="2xl" weight="font-black" className="text-accent-navy">Studies</Text>
-            <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-[0.15em]">{studies.length} ARTICLES</Text>
+            <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-widest">{studies.length} ARTICLES</Text>
           </Box>
-          <Grid cols={{ base: 1, md: 2 }} gap={12}>
-            {studies.map((study) => (
-              <Box key={study.slug} className="group">
-                <Stack gap={4}>
-                  <Box display="flex" justify="between" align="center">
-                    <Text variant="mono" size="micro" color="brand" uppercase>{study.category}</Text>
-                    <Text variant="mono" size="micro" color="dim">{study.date}</Text>
-                  </Box>
-                  <Text variant="display" size="2xl" className="group-hover:text-accent-brand transition-colors">
-                    {study.title}
-                  </Text>
-                  <Text variant="body" size="sm" color="dim" className="line-clamp-3">
-                    {study.excerpt}
+
+          {studies.length > 0 ? (
+            <Grid cols={{ base: 1, md: 2 }} gap={12}>
+              {studies.map((study) => (
+                <Box key={study.slug} className="group">
+                  <Stack gap={4}>
+                    <Box display="flex" justify="between" align="center">
+                      <Text variant="mono" size="micro" color="brand" uppercase>{study.category}</Text>
+                      <Text variant="mono" size="micro" color="dim">{study.date}</Text>
+                    </Box>
+                    <Text variant="display" size="2xl" className="group-hover:text-accent-brand transition-colors">
+                      {study.title}
+                    </Text>
+                    <Text variant="body" size="sm" color="dim" className="line-clamp-3">
+                      {study.excerpt}
+                    </Text>
+                    <Box
+                      as={motion.div}
+                      whileHover={{ x: 5 }}
+                      display="flex"
+                      align="center"
+                      gap={2}
+                      color="dim"
+                      className="group-hover:text-accent-brand transition-colors"
+                    >
+                      <Text variant="mono" size="xs" weight="font-bold">Read Study</Text>
+                      <FileText className="w-4 h-4" />
+                    </Box>
+                  </Stack>
+                </Box>
+              ))}
+            </Grid>
+          ) : (
+            <Box border padding={12} surface="muted" emphasis="low">
+              <Stack align="center" gap={4} className="text-center">
+                <Database className="w-12 h-12 text-slate-300" />
+                <Stack gap={2}>
+                  <Text variant="display" size="xl">Pipeline Synchronizing...</Text>
+                  <Text variant="body" size="sm" color="dim" className="max-w-[40ch]">
+                    Research studies are automatically ingested via the ETL pipeline.
+                    New analysis runs weekly—check back soon for recent data.
                   </Text>
-                  <Box 
-                    as={motion.div}
-                    whileHover={{ x: 5 }}
-                    display="flex" 
-                    align="center" 
-                    gap={2} 
-                    color="dim" 
-                    className="group-hover:text-accent-brand transition-colors"
-                  >
-                    <Text variant="mono" size="xs" weight="font-bold">Read Study</Text>
-                    <FileText className="w-4 h-4" />
-                  </Box>
                 </Stack>
-              </Box>
-            ))}
-          </Grid>
+              </Stack>
+            </Box>
+          )}
         </Stack>
       </Stack>
     </Box>
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/features/research/ResearchAnalytics.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/research/ResearchAnalytics.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/research/ResearchAnalytics.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/research/ResearchDetail.tsx -->
---

### File: `src/features/research/ResearchDetail.tsx` +19/-3 (modified)

Diff:
```diff
@@ -5,19 +5,35 @@ import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
 import { useResearch } from './useResearch';
 import { BlogDrafter } from '@/features/lab/BlogDrafter';
 
+import { DetailLayout } from '@/components/layout/DetailLayout';
+
 export default function ResearchDetail() {
   const { id } = useParams();
   const navigate = useNavigate();
-  const { getTool } = useResearch();
+  const { getTool, getStudy } = useResearch();
   
   const tool = id ? getTool(id) : null;
+  const study = !tool && id ? getStudy(id) : null;
+
+  if (study) {
+    return (
+      <DetailLayout
+        title={study.title}
+        category={study.category}
+        date={study.date}
+        content={study.content}
+        onBack={() => navigate('/research')}
+        backLabel="Back to Lab"
+      />
+    );
+  }
 
   if (!tool) {
     return (
       <Box padding="panel" textAlign="center">
         <Stack gap={8} align="center">
           <Search className="w-12 h-12 opacity-20" />
-          <Text variant="display" size="2xl">Tool Not Found</Text>
+          <Text variant="display" size="2xl">Content Not Found</Text>
           <Box as="button" onClick={() => navigate('/research')} className="hover:text-accent-brand transition-colors">
             <Text variant="mono" size="xs">Back to Laboratory</Text>
           </Box>
@@ -43,7 +59,7 @@ export default function ResearchDetail() {
           <Text variant="mono" size="xs" weight="font-bold">Back to Lab</Text>
         </Box>
 
-        <Box border surface="default" padding={{ base: 8, md: 12 }}>
+        <Box border surface="default" padding={{ base: 8, md: 12 }} className="rounded-none">
           <Stack gap={12}>
             {tool.id === 'blog-drafter' ? (
               <BlogDrafter />
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "src/features/research/ResearchDetail.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/research/ResearchDetail.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/research/ResearchDetail.tsx -->


---

## Submission

After completing every file block above, fill in the body below and run the command.

<!-- BEGIN_SUBMISSION_JSON -->
```json
{
  "body": "## ANTI-AI-SLOP\n<findings or confirmed absent>\n\n## FINDINGS\n<per-file summary with line references>\n\n## FINAL RECOMMENDATION\n<!-- Approved | Approved with Minor Changes | Not Approved -->",
  "comments": [
    { "path": "src/example.tsx", "line": 10, "body": "Inline feedback here" }
  ]
}
```
<!-- END_SUBMISSION_JSON -->

Command:
```bash
python3 dev-tools/submit_pr_review_data.py plan-pr-review-159.md
```

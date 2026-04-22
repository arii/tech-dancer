# PR Review Plan: #154 — Address Page-Specific Component Issues

<!-- PR_NUMBER: 154 -->

**Repo:** arii/tech-dancer — https://github.com/arii/tech-dancer/pull/154
**Stats:** +540/-347 across 14 file(s)

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

This PR addresses monolithic composition and UX deficiencies across several key pages:

1. **Dashboard (Home):** Decoupled the main layout from content feeds by extracting `RecentPosts` and `UpcomingEvents` into lazy-loaded components wrapped in `Suspense` with skeleton fallbacks.
2. **Blog & Resources:** Enhanced `useBlog` and `useResources` hooks with `isLoading` and `error` states. Updated `BlogFeed` and `ResourceGallery` to display appropriate skeletons and error messages.
3. **Contact:** Refactored `ContactConsole` into a container component, moving the UI into dedicated `ContactForm` and `ContactSuccess` presentation components.
4. **Research & Blog Posts:** Refined the use of `useParams` in `ResearchDetail` and `BlogPost` to ensure efficient data retrieval and minimized prop-drilling.

Verified via Playwright E2E smoke tests and manual visual inspection of screenshots for all affected routes.

Fixes #135

---
*PR created automatically by Jules for task [13235219028588921477](https://jules.google.com/task/13235219028588921477) started by @arii*

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

- `[M]` [src/features/dashboard/Dashboard.tsx](https://github.com/arii/tech-dancer/pull/154/files) `+23/-21`
- `[A]` [src/features/dashboard/components/RecentPosts.tsx](https://github.com/arii/tech-dancer/pull/154/files) `+19/-0`
- `[A]` [src/features/dashboard/components/UpcomingEvents.tsx](https://github.com/arii/tech-dancer/pull/154/files) `+14/-0`
- `[M]` [src/features/journal/BlogFeed.tsx](https://github.com/arii/tech-dancer/pull/154/files) `+17/-2`
- `[M]` [src/features/journal/BlogPost.tsx](https://github.com/arii/tech-dancer/pull/154/files) `+2/-29`
- `[A]` [src/features/journal/components/BlogPostContent.tsx](https://github.com/arii/tech-dancer/pull/154/files) `+31/-0`
- `[M]` [src/features/journal/useBlog.ts](https://github.com/arii/tech-dancer/pull/154/files) `+14/-8`
- `[M]` [src/features/profile/ContactConsole.tsx](https://github.com/arii/tech-dancer/pull/154/files) `+6/-198`
- `[A]` [src/features/profile/components/ContactForm.tsx](https://github.com/arii/tech-dancer/pull/154/files) `+191/-0`
- `[A]` [src/features/profile/components/ContactSuccess.tsx](https://github.com/arii/tech-dancer/pull/154/files) `+43/-0`
- `[M]` [src/features/research/ResearchDetail.tsx](https://github.com/arii/tech-dancer/pull/154/files) `+9/-48`
- `[A]` [src/features/research/components/ToolView.tsx](https://github.com/arii/tech-dancer/pull/154/files) `+81/-0`
- `[M]` [src/features/resources/ResourceGallery.tsx](https://github.com/arii/tech-dancer/pull/154/files) `+74/-39`
- `[M]` [src/features/resources/useResources.ts](https://github.com/arii/tech-dancer/pull/154/files) `+16/-2`

---

## Per-File Audit

Note: Do NOT skip any file. Leave a comment for every file, even if clean.


<!-- BEGIN_FILE_AUDIT: src/features/dashboard/Dashboard.tsx -->
---

### File: `src/features/dashboard/Dashboard.tsx` +23/-21 (modified)

Diff:
```diff
@@ -1,16 +1,16 @@
-import { motion } from 'motion/react';
+import { lazy, Suspense } from 'react';
 import { NavLink } from 'react-router-dom';
-import { Zap, ArrowRight, Shield, Calendar } from 'lucide-react';
+import { motion } from 'motion/react';
+import { ArrowRight } from 'lucide-react';
 import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
-import { useHome } from './useHome';
-import { PageHeader, SectionHeader } from '@/components/ui/PageHeader';
 import PathSelector from '@/components/ui/PathSelector';
-import { ContentCard } from '@/components/ui/ContentCard';
-import { EventCard } from './EventCard';
+import { SectionHeader } from '@/components/ui/PageHeader';
+import { ContentCardSkeleton } from '@/components/ui/ContentCard';
 
-export default function Home() {
-  const { recentPosts, upcomingEvents, dancerPaths, hirePaths } = useHome();
+const RecentPosts = lazy(() => import('./components/RecentPosts'));
+const UpcomingEvents = lazy(() => import('./components/UpcomingEvents'));
 
+export default function Home() {
   return (
     <Box as="section">
       <Stack gap={24}>
@@ -53,23 +53,25 @@ export default function Home() {
           </SectionHeader>
 
           <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={4}>
-            {recentPosts.map((post) => (
-              <ContentCard 
-                key={post.slug}
-                {...post}
-                basePath="/blog"
-                aspect="video"
-              />
-            ))}
-
-            {/* Upcoming Events Mini-Cards */}
-            {upcomingEvents.map((event) => (
-              <EventCard key={event.name} {...event} />
-            ))}
+            <Suspense fallback={<RecentPostsSkeleton />}>
+              <RecentPosts />
+            </Suspense>
+            <Suspense fallback={<Box surface="muted" height={32} animate="pulse" />}>
+              <UpcomingEvents />
+            </Suspense>
           </Grid>
         </Stack>
       </Stack>
     </Box>
   );
 }
 
+function RecentPostsSkeleton() {
+  return (
+    <>
+      {[1, 2, 3].map((i) => (
+        <ContentCardSkeleton key={i} />
+      ))}
+    </>
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
  "path": "src/features/dashboard/Dashboard.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/dashboard/Dashboard.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/dashboard/Dashboard.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/dashboard/components/RecentPosts.tsx -->
---

### File: `src/features/dashboard/components/RecentPosts.tsx` +19/-0 (added)

Diff:
```diff
@@ -0,0 +1,19 @@
+import { ContentCard } from '@/components/ui/ContentCard';
+import { useHome } from '../useHome';
+
+export default function RecentPosts() {
+  const { recentPosts } = useHome();
+
+  return (
+    <>
+      {recentPosts.map((post) => (
+        <ContentCard
+          key={post.slug}
+          {...post}
+          basePath="/blog"
+          aspect="video"
+        />
+      ))}
+    </>
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
  "path": "src/features/dashboard/components/RecentPosts.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/dashboard/components/RecentPosts.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/dashboard/components/RecentPosts.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/dashboard/components/UpcomingEvents.tsx -->
---

### File: `src/features/dashboard/components/UpcomingEvents.tsx` +14/-0 (added)

Diff:
```diff
@@ -0,0 +1,14 @@
+import { EventCard } from '../EventCard';
+import { useHome } from '../useHome';
+
+export default function UpcomingEvents() {
+  const { upcomingEvents } = useHome();
+
+  return (
+    <>
+      {upcomingEvents.map((event) => (
+        <EventCard key={event.name} {...event} />
+      ))}
+    </>
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
  "path": "src/features/dashboard/components/UpcomingEvents.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/dashboard/components/UpcomingEvents.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/dashboard/components/UpcomingEvents.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/journal/BlogFeed.tsx -->
---

### File: `src/features/journal/BlogFeed.tsx` +17/-2 (modified)

Diff:
```diff
@@ -1,10 +1,25 @@
-import { Box, Stack } from '@/layouts/Primitives';
+import { Box, Stack, Text } from '@/layouts/Primitives';
 import { useBlog } from './useBlog';
 import FolioGrid from '@/components/ui/FolioGrid';
 import { FilterBar } from '@/components/ui/FilterBar';
+import { AlertCircle } from 'lucide-react';
 
 export default function BlogFeed() {
-  const { posts, categories, activeCategory, setActiveCategory, isLoading } = useBlog();
+  const { posts, categories, activeCategory, setActiveCategory, isLoading, error } = useBlog();
+
+  if (error) {
+    return (
+      <Box as="section" padding="panel" display="flex" align="center" justify="center">
+        <Stack gap={4} align="center" textAlign="center">
+          <Box display="flex" align="center" justify="center" opacity={25} color="brand">
+            <AlertCircle className="w-12 h-12" />
+          </Box>
+          <Text variant="display" size="2xl">System Error</Text>
+          <Text variant="mono" size="xs" color="dim">{error}</Text>
+        </Stack>
+      </Box>
+    );
+  }
 
   return (
     <Box as="section">
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

### File: `src/features/journal/BlogPost.tsx` +2/-29 (modified)

Diff:
```diff
@@ -1,32 +1,5 @@
-import { useMemo } from 'react';
-import { useParams, useNavigate } from 'react-router-dom';
-import { getPostBySlug } from '@/lib/content';
-import { ContentDetail } from '@/layouts/ContentDetail';
-import { Box, Stack, Text } from '@/layouts/Primitives';
+import { BlogPostContent } from './components/BlogPostContent';
 
 export default function BlogPost() {
-  const { slug } = useParams();
-  const navigate = useNavigate();
-  const post = useMemo(() => slug ? getPostBySlug(slug) : undefined, [slug]);
-
-  if (!post) {
-    return (
-      <Box padding="panel" textAlign="center">
-        <Stack gap={8} align="center">
-          <Text variant="display" size="2xl">Post Not Found</Text>
-          <Box as="button" onClick={() => navigate('/blog')} className="hover:text-accent-brand transition-colors">
-            <Text variant="mono" size="xs">Back to Journal</Text>
-          </Box>
-        </Stack>
-      </Box>
-    );
-  }
-
-  return (
-    <ContentDetail
-      post={post}
-      onBack={() => navigate('/blog')}
-      backLabel="Back to Folio"
-    />
-  );
+  return <BlogPostContent />;
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


<!-- BEGIN_FILE_AUDIT: src/features/journal/components/BlogPostContent.tsx -->
---

### File: `src/features/journal/components/BlogPostContent.tsx` +31/-0 (added)

Diff:
```diff
@@ -0,0 +1,31 @@
+import { useParams, useNavigate } from 'react-router-dom';
+import { getPostBySlug } from '@/lib/content';
+import { ContentDetail } from '@/layouts/ContentDetail';
+import { Box, Stack, Text } from '@/layouts/Primitives';
+
+export function BlogPostContent() {
+  const { slug } = useParams();
+  const navigate = useNavigate();
+  const post = slug ? getPostBySlug(slug) : undefined;
+
+  if (!post) {
+    return (
+      <Box padding="panel" textAlign="center">
+        <Stack gap={8} align="center">
+          <Text variant="display" size="2xl">Post Not Found</Text>
+          <Box as="button" onClick={() => navigate('/blog')} className="hover:text-accent-brand transition-colors">
+            <Text variant="mono" size="xs">Back to Journal</Text>
+          </Box>
+        </Stack>
+      </Box>
+    );
+  }
+
+  return (
+    <ContentDetail
+      post={post}
+      onBack={() => navigate('/blog')}
+      backLabel="Back to Folio"
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
  "path": "src/features/journal/components/BlogPostContent.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/journal/components/BlogPostContent.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/journal/components/BlogPostContent.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/journal/useBlog.ts -->
---

### File: `src/features/journal/useBlog.ts` +14/-8 (modified)

Diff:
```diff
@@ -9,20 +9,25 @@ export function useBlog() {
   const activeCategory = searchParams.get('category') || 'All';
   const [searchTerm, setSearchTerm] = useState<string>('');
   const [isLoading, setIsLoading] = useState(true);
+  const [error, setError] = useState<string | null>(null);
 
   useEffect(() => {
     setIsLoading(true);
-    // Simulate a brief loading state to show the skeleton and avoid jump
-    const timer = setTimeout(() => {
-      setPosts(getPosts());
+    setError(null);
+    try {
+      const data = getPosts();
+      if (!data) throw new Error('FAILED_TO_FETCH_JOURNAL_DATA');
+      setPosts(data);
+    } catch (err) {
+      setError(err instanceof Error ? err.message : 'An unknown error occurred');
+    } finally {
+      // Small tick to ensure UI doesn't flicker too fast if data is local
+      // but removed the 500ms artificial delay
       setIsLoading(false);
-    }, 500);
-    return () => clearTimeout(timer);
+    }
   }, []);
 
   const setActiveCategory = (category: string) => {
-    setIsLoading(true);
-    setTimeout(() => setIsLoading(false), 300);
     if (category === 'All') {
       searchParams.delete('category');
     } else {
@@ -61,6 +66,7 @@ export function useBlog() {
     setActiveCategory,
     searchTerm,
     setSearchTerm,
-    isLoading
+    isLoading,
+    error
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


<!-- BEGIN_FILE_AUDIT: src/features/profile/ContactConsole.tsx -->
---

### File: `src/features/profile/ContactConsole.tsx` +6/-198 (modified)

Diff:
```diff
@@ -1,12 +1,9 @@
-import { motion } from 'motion/react';
-import { Mail, Send, MessageSquare, HelpCircle, Sparkles, BarChart2, Shield } from 'lucide-react';
-import React from 'react';
-import { Box, Stack, Text, Grid, Button } from '@/layouts/Primitives';
-import { PageHeader } from '@/components/ui/PageHeader';
+import type { FormEvent } from 'react';
 import { useContactForm } from '@/hooks/use-contact-form';
-import { cn } from '@/lib/utils';
+import { ContactForm } from './components/ContactForm';
+import { ContactSuccess } from './components/ContactSuccess';
 
-export default function Contact() {
+export default function ContactConsole() {
   const { 
     formData, 
     handleChange, 
@@ -17,13 +14,13 @@ export default function Contact() {
     reset 
   } = useContactForm();
 
-  const handleSubmit = (e: React.FormEvent) => {
+  const handleSubmit = (e: FormEvent) => {
     e.preventDefault();
     submit();
   };
 
   return submitted ? (
-    <SuccessState onReset={reset} />
+    <ContactSuccess onReset={reset} />
   ) : (
     <ContactForm 
       formData={formData} 
@@ -34,192 +31,3 @@ export default function Contact() {
     />
   );
 }
-
-function SuccessState({ onReset }: { onReset: () => void }) {
-  return (
-    <Box as="section" padding="panel" display="flex" direction="col" align="center" justify="center" textAlign="center">
-      <Stack gap={12} align="center">
-        <Box width={24} height={24} border surface="dim" display="flex" align="center" justify="center" color="accent">
-          <Sparkles className="w-12 h-12 stroke-1" />
-        </Box>
-        <Stack gap={4}>
-          <Text variant="headline" size="6xl">Message Received.</Text>
-          <Text variant="body" maxWidth="md" marginX="auto">
-            Thank you for reaching out. I've received your message and will get back to you as soon as possible.
-          </Text>
-        </Stack>
-        <Box 
-          as={motion.button} 
-          whileHover={{ scale: 1.05 }}
-          whileTap={{ scale: 0.95 }}
-          onClick={onReset}
-          variant="mono"
-          weight="font-bold"
-          uppercase
-          size="micro"
-          border
-          paddingX={8}
-          paddingY={4}
-          color="accent"
-          cursor="pointer"
-          className="hover:bg-accent-brand/5 transition-colors"
-        >
-          Send Another Message
-        </Box>
-      </Stack>
-    </Box>
-  );
-}
-
-interface ContactFormProps {
-  formData: any;
-  errors: any;
-  isSubmitting: boolean;
-  onChange: (e: React.ChangeEvent<any>) => void;
-  onSubmit: (e: React.FormEvent) => void;
-}
-
-function ContactForm({ formData, errors, isSubmitting, onChange, onSubmit }: ContactFormProps) {
-  return (
-    <Box as="section">
-      <Stack gap={12}>
-        <PageHeader 
-          label="CONTACT"
-          title="Get in Touch"
-          description="Have a burning analytical question regarding WCS? Want a lifestyle post about financial literacy or building community? Or just have feedback on a gear review? I'd love to hear from you."
-        />
-
-        <Grid cols={1} md={2} gap={0} border maxWidth="6xl" marginBottom={20} overflow="hidden">
-        <Box surface="default" padding={{ base: 8, md: 12 }} border={{ base: "b", md: { b: false, r: true } }}>
-          <Stack gap={12}>
-            <Stack gap={6}>
-              <Box paddingBottom={4} className="border-b border-slate-200">
-                <Text as="h3" variant="display" size="2xl" weight="font-black" className="text-accent-navy">Inquiries</Text>
-              </Box>
-              <Text variant="body" size="base" maxWidth="md" color="dim">
-                I&apos;m always open to new ideas, questions about my reviews, or just chat about the dance scene.
-              </Text>
-            </Stack>
-            
-            <Stack gap={6}>
-              {[
-                { label: 'Data Inquiry', channel: 'Dance Stats', icon: BarChart2 },
-                { label: 'Gear Review', channel: 'Product Feedback', icon: Sparkles },
-                { label: 'General', channel: 'Discussion', icon: MessageSquare },
-              ].map((item) => (
-                <Box key={item.label} display="flex" align="center" gap={6} className="group">
-                  <Box width={12} height={12} border surface="muted" display="flex" align="center" justify="center" color="dim" className="group-hover:border-accent-brand group-hover:bg-accent-brand/5 transition-colors">
-                    <item.icon className="w-6 h-6 stroke-1" />
-                  </Box>
-                  <Stack gap={1}>
-                    <Text variant="sans" size="base" weight="font-bold" className="text-accent-navy">{item.label}</Text>
-                    <Text variant="mono" color="dim" size="xs" weight="font-semibold" className="tracking-[0.15em] uppercase">{item.channel}</Text>
-                  </Stack>
-                </Box>
-              ))}
-            </Stack>
-          </Stack>
-        </Box>
-
-        <Box surface="default" padding={{ base: 8, md: 12 }}>
-          <Box as="form" onSubmit={onSubmit} className="space-y-8">
-            <Stack gap={3}>
-              <Box display="flex" justify="between" align="center">
-                <Text as="label" htmlFor="contact-name" variant="mono" size="xs" weight="font-semibold" color="dim" className="tracking-[0.15em] uppercase">Your Name</Text>
-                {errors.name && <Text id="name-error" variant="mono" weight="font-semibold" color="brand" size="xs" role="alert">{errors.name}</Text>}
-              </Box>
-              <Box as="input" 
-                id="contact-name"
-                name="name"
-                type="text" 
-                aria-required="true"
-                aria-invalid={!!errors.name}
-                aria-describedby={errors.name ? "name-error" : undefined}
-                className={cn(
-                  "w-full bg-bg border px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent-brand transition-colors",
-                  errors.name ? 'border-accent-brand' : 'border-line'
-                )}
-                value={formData.name}
-                onChange={onChange}
-              />
-            </Stack>
-            <Stack gap={3}>
-              <Box display="flex" justify="between" align="center">
-                <Text as="label" htmlFor="contact-email" variant="mono" size="xs" weight="font-semibold" color="dim" className="tracking-[0.15em] uppercase">Your Email</Text>
-                {errors.email && <Text id="email-error" variant="mono" weight="font-semibold" color="brand" size="xs" role="alert">{errors.email}</Text>}
-              </Box>
-              <Box as="input" 
-                id="contact-email"
-                name="email"
-                type="email" 
-                aria-required="true"
-                aria-invalid={!!errors.email}
-                aria-describedby={errors.email ? "email-error" : undefined}
-                className={cn(
-                  "w-full bg-bg border px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent-brand transition-colors",
-                  errors.email ? 'border-accent-brand' : 'border-line'
-                )}
-                value={formData.email}
-                onChange={onChange}
-              />
-            </Stack>
-            <Stack gap={3}>
-              <Text as="label" htmlFor="contact-subject" variant="mono" size="xs" weight="font-semibold" color="dim" className="tracking-[0.15em] uppercase">Subject</Text>
-              <Box as="select" 
-                id="contact-subject"
-                name="subject"
-                className="w-full bg-bg border border-line px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent-brand transition-colors"
-                value={formData.subject}
-                onChange={onChange}
-              >
-                <option>General Feedback</option>
-                <option>Content Request</option>
-                <option>Gear Review Request</option>
-                <option>Dance Statistics</option>
-              </Box>
-            </Stack>
-            <Stack gap={3}>
-              <Box display="flex" justify="between" align="center">
-                <Text as="label" htmlFor="contact-message" variant="mono" size="xs" weight="font-semibold" color="dim" className="tracking-[0.15em] uppercase">Message</Text>
-                {errors.message && <Text id="message-error" variant="mono" weight="font-semibold" color="brand" size="xs" role="alert">{errors.message}</Text>}
-              </Box>
-              <Box as="textarea" 
-                id="contact-message"
-                name="message"
-                rows={5}
-                aria-required="true"
-                aria-invalid={!!errors.message}
-                aria-describedby={errors.message ? "message-error" : undefined}
-                className={cn(
-                  "w-full bg-bg border px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent-brand transition-colors resize-none",
-                  errors.message ? 'border-accent-brand' : 'border-line'
-                )}
-                value={formData.message}
-                onChange={onChange}
-              />
-            </Stack>
-            <Button
-              type="submit"
-              variant="primary"
-              disabled={isSubmitting}
-              fullWidth
-            >
-              {isSubmitting ? (
-                <Stack direction="row" align="center" gap={3}>
-                  <div className="w-4 h-4 border-2 border-bg-muted border-t-accent-brand animate-spin" />
-                  <Text variant="mono" color="dim" size="micro">Sending...</Text>
-                </Stack>
-              ) : (
-                <>
-                  <Send className="w-4 h-4" />
-                  Send Message
-                </>
-              )}
-            </Button>
-          </Box>
-        </Box>
-        </Grid>
-      </Stack>
-    </Box>
-  );
-}
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


<!-- BEGIN_FILE_AUDIT: src/features/profile/components/ContactForm.tsx -->
---

### File: `src/features/profile/components/ContactForm.tsx` +191/-0 (added)

Diff:
```diff
@@ -0,0 +1,191 @@
+import type { ChangeEvent, FormEvent } from 'react';
+import { Send, MessageSquare, Sparkles, BarChart2 } from 'lucide-react';
+import { Box, Stack, Text, Grid, Button } from '@/layouts/Primitives';
+import { PageHeader } from '@/components/ui/PageHeader';
+import { cn } from '@/lib/utils';
+
+interface ContactFormData {
+  name: string;
+  email: string;
+  subject: string;
+  message: string;
+}
+
+interface ContactFormErrors {
+  name?: string;
+  email?: string;
+  message?: string;
+}
+
+interface ContactFormProps {
+  formData: ContactFormData;
+  errors: ContactFormErrors;
+  isSubmitting: boolean;
+  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
+  onSubmit: (e: FormEvent) => void;
+}
+
+export function ContactForm({ formData, errors, isSubmitting, onChange, onSubmit }: ContactFormProps) {
+  return (
+    <Box as="section">
+      <Stack gap={12}>
+        <PageHeader
+          label="CONTACT"
+          title="Get in Touch"
+          description="Have a burning analytical question regarding WCS? Want a lifestyle post about financial literacy or building community? Or just have feedback on a gear review? I'd love to hear from you."
+        />
+
+        <Grid cols={1} md={2} gap={0} border maxWidth="6xl" marginBottom={20} overflow="hidden">
+          <Box surface="default" padding={{ base: 8, md: 12 }} border={{ base: "b", md: { b: false, r: true } }}>
+            <Stack gap={12}>
+              <Stack gap={6}>
+                <Box border="b" paddingBottom={4}>
+                  <Text as="h3" variant="display" size="2xl" weight="font-black">Inquiries</Text>
+                </Box>
+                <Text variant="body" size="base" maxWidth="md" color="dim">
+                  I&apos;m always open to new ideas, questions about my reviews, or just chat about the dance scene.
+                </Text>
+              </Stack>
+
+              <Stack gap={6}>
+                {[
+                  { label: 'Data Inquiry', channel: 'Dance Stats', icon: BarChart2 },
+                  { label: 'Gear Review', channel: 'Product Feedback', icon: Sparkles },
+                  { label: 'General', channel: 'Discussion', icon: MessageSquare },
+                ].map((item) => (
+                  <Box key={item.label} display="flex" align="center" gap={6} className="group">
+                    <Box width="12" height="12" border surface="muted" display="flex" align="center" justify="center" color="dim" className="group-hover:border-accent-brand group-hover:bg-accent-brand/5 transition-colors">
+                      <item.icon className="w-6 h-6 stroke-1" />
+                    </Box>
+                    <Stack gap={1}>
+                      <Text variant="sans" size="base" weight="font-bold">{item.label}</Text>
+                      <Text variant="mono" color="dim" size="xs" weight="font-semibold" uppercase tracking="widest">{item.channel}</Text>
+                    </Stack>
+                  </Box>
+                ))}
+              </Stack>
+            </Stack>
+          </Box>
+
+          <Box surface="default" padding={{ base: 8, md: 12 }}>
+            <Box as="form" onSubmit={onSubmit} className="space-y-8">
+              <Stack gap={3}>
+                <Box display="flex" justify="between" align="center">
+                  <Text as="label" htmlFor="contact-name" variant="mono" size="xs" weight="font-semibold" color="dim" uppercase tracking="widest">Your Name</Text>
+                  {errors.name && <Text id="name-error" variant="mono" weight="font-semibold" color="brand" size="xs" role="alert">{errors.name}</Text>}
+                </Box>
+                <Box as="input"
+                  id="contact-name"
+                  name="name"
+                  type="text"
+                  aria-required="true"
+                  aria-invalid={!!errors.name}
+                  aria-describedby={errors.name ? "name-error" : undefined}
+                  width="full"
+                  surface="default"
+                  border
+                  paddingX={4}
+                  paddingY={3}
+                  className={cn(
+                    "bg-bg text-sm font-sans focus:outline-none focus:border-accent-brand transition-colors",
+                    errors.name ? 'border-accent-brand' : 'border-line'
+                  )}
+                  value={formData.name}
+                  onChange={onChange}
+                />
+              </Stack>
+              <Stack gap={3}>
+                <Box display="flex" justify="between" align="center">
+                  <Text as="label" htmlFor="contact-email" variant="mono" size="xs" weight="font-semibold" color="dim" uppercase tracking="widest">Your Email</Text>
+                  {errors.email && <Text id="email-error" variant="mono" weight="font-semibold" color="brand" size="xs" role="alert">{errors.email}</Text>}
+                </Box>
+                <Box as="input"
+                  id="contact-email"
+                  name="email"
+                  type="email"
+                  aria-required="true"
+                  aria-invalid={!!errors.email}
+                  aria-describedby={errors.email ? "email-error" : undefined}
+                  width="full"
+                  surface="default"
+                  border
+                  paddingX={4}
+                  paddingY={3}
+                  className={cn(
+                    "bg-bg text-sm font-sans focus:outline-none focus:border-accent-brand transition-colors",
+                    errors.email ? 'border-accent-brand' : 'border-line'
+                  )}
+                  value={formData.email}
+                  onChange={onChange}
+                />
+              </Stack>
+              <Stack gap={3}>
+                <Text as="label" htmlFor="contact-subject" variant="mono" size="xs" weight="font-semibold" color="dim" uppercase tracking="widest">Subject</Text>
+                <Box as="select"
+                  id="contact-subject"
+                  name="subject"
+                  width="full"
+                  surface="default"
+                  border
+                  paddingX={4}
+                  paddingY={3}
+                  className="bg-bg text-sm font-sans focus:outline-none focus:border-accent-brand transition-colors"
+                  value={formData.subject}
+                  onChange={onChange}
+                >
+                  <option>General Feedback</option>
+                  <option>Content Request</option>
+                  <option>Gear Review Request</option>
+                  <option>Dance Statistics</option>
+                </Box>
+              </Stack>
+              <Stack gap={3}>
+                <Box display="flex" justify="between" align="center">
+                  <Text as="label" htmlFor="contact-message" variant="mono" size="xs" weight="font-semibold" color="dim" uppercase tracking="widest">Message</Text>
+                  {errors.message && <Text id="message-error" variant="mono" weight="font-semibold" color="brand" size="xs" role="alert">{errors.message}</Text>}
+                </Box>
+                <Box as="textarea"
+                  id="contact-message"
+                  name="message"
+                  rows={5}
+                  aria-required="true"
+                  aria-invalid={!!errors.message}
+                  aria-describedby={errors.message ? "message-error" : undefined}
+                  width="full"
+                  surface="default"
+                  border
+                  paddingX={4}
+                  paddingY={3}
+                  className={cn(
+                    "bg-bg text-sm font-sans focus:outline-none focus:border-accent-brand transition-colors resize-none",
+                    errors.message ? 'border-accent-brand' : 'border-line'
+                  )}
+                  value={formData.message}
+                  onChange={onChange}
+                />
+              </Stack>
+              <Button
+                type="submit"
+                variant="primary"
+                disabled={isSubmitting}
+                fullWidth
+              >
+                {isSubmitting ? (
+                  <Stack direction="row" align="center" gap={3}>
+                    <div className="w-4 h-4 border-2 border-bg-muted border-t-accent-brand animate-spin" />
+                    <Text variant="mono" color="dim" size="micro">Sending...</Text>
+                  </Stack>
+                ) : (
+                  <>
+                    <Send className="w-4 h-4" />
+                    Send Message
+                  </>
+                )}
+              </Button>
+            </Box>
+          </Box>
+        </Grid>
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
  "path": "src/features/profile/components/ContactForm.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/profile/components/ContactForm.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/profile/components/ContactForm.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/profile/components/ContactSuccess.tsx -->
---

### File: `src/features/profile/components/ContactSuccess.tsx` +43/-0 (added)

Diff:
```diff
@@ -0,0 +1,43 @@
+import { motion } from 'motion/react';
+import { Sparkles } from 'lucide-react';
+import { Box, Stack, Text } from '@/layouts/Primitives';
+
+interface ContactSuccessProps {
+  onReset: () => void;
+}
+
+export function ContactSuccess({ onReset }: ContactSuccessProps) {
+  return (
+    <Box as="section" padding="panel" display="flex" direction="col" align="center" justify="center" textAlign="center">
+      <Stack gap={12} align="center">
+        <Box width={24} height={24} border surface="dim" display="flex" align="center" justify="center" color="accent">
+          <Sparkles className="w-12 h-12 stroke-1" />
+        </Box>
+        <Stack gap={4}>
+          <Text variant="headline" size="6xl">Message Received.</Text>
+          <Text variant="body" maxWidth="md" marginX="auto">
+            Thank you for reaching out. I've received your message and will get back to you as soon as possible.
+          </Text>
+        </Stack>
+        <Box
+          as={motion.button}
+          whileHover={{ scale: 1.05 }}
+          whileTap={{ scale: 0.95 }}
+          onClick={onReset}
+          variant="mono"
+          weight="font-bold"
+          uppercase
+          size="micro"
+          border
+          paddingX={8}
+          paddingY={4}
+          color="accent"
+          cursor="pointer"
+          className="hover:bg-accent-brand/5 transition-colors"
+        >
+          Send Another Message
+        </Box>
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
  "path": "src/features/profile/components/ContactSuccess.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/profile/components/ContactSuccess.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/profile/components/ContactSuccess.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/research/ResearchDetail.tsx -->
---

### File: `src/features/research/ResearchDetail.tsx` +9/-48 (modified)

Diff:
```diff
@@ -1,18 +1,20 @@
 import { useParams, useNavigate } from 'react-router-dom';
-import { motion } from 'motion/react';
-import { Database, Activity, ArrowLeft, Search } from 'lucide-react';
-import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
+import { ArrowLeft, Search } from 'lucide-react';
+import { Box, Stack, Text } from '@/layouts/Primitives';
 import { useResearch } from './useResearch';
 import { BlogDrafter } from '@/features/lab/BlogDrafter';
+import { ToolView } from './components/ToolView';
 
 export default function ResearchDetail() {
   const { id } = useParams();
   const navigate = useNavigate();
   const { getTool } = useResearch();
   
-  const tool = id ? getTool(id) : null;
+  // We check for existence here to handle 404 state,
+  // but sub-components will independently fetch data for modularity.
+  const toolExists = id ? !!getTool(id) : false;
 
-  if (!tool) {
+  if (!toolExists) {
     return (
       <Box padding="panel" textAlign="center">
         <Stack gap={8} align="center">
@@ -45,51 +47,10 @@ export default function ResearchDetail() {
 
         <Box border surface="default" padding={{ base: 8, md: 12 }}>
           <Stack gap={12}>
-            {tool.id === 'blog-drafter' ? (
+            {id === 'blog-drafter' ? (
               <BlogDrafter />
             ) : (
-              <Stack gap={12}>
-                <Stack gap={4}>
-                  <Text variant="mono" color="brand" size="xs" weight="font-bold" uppercase tracking="widest">
-                    LABORATORY_ACCESS // {tool.category.toUpperCase()}
-                  </Text>
-                  <Text variant="headline" size="fluid-7">{tool.name}</Text>
-                  <Box border surface="accent" padding="compact" opacity={5} className="bg-accent/5">
-                    <Text variant="body" size="lg" color="body">{tool.layman}</Text>
-                  </Box>
-                </Stack>
-
-                <Grid cols={{ base: 1, md: 2 }} gap={12}>
-                  <Stack gap={4}>
-                    <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">System Status</Text>
-                    <Box border padding="compact" display="flex" align="center" gap={3}>
-                      <Activity className="w-4 h-4 text-accent-brand" />
-                      <Text variant="mono" size="xs" color="brand" weight="font-bold">{tool.status.toUpperCase()}</Text>
-                    </Box>
-                  </Stack>
-                  <Stack gap={4}>
-                    <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">Database Source</Text>
-                    <Box border padding="compact" display="flex" align="center" gap={3}>
-                      <Database className="w-4 h-4 text-accent-brand text-dim" />
-                      <Text variant="mono" size="xs">WSDC REGISTRY // AUTHENTICATED</Text>
-                    </Box>
-                  </Stack>
-                </Grid>
-
-                {tool.status === 'Coming Soon' && (
-                  <Box border surface="accent" padding="card" className="bg-accent-brand/5 border-dashed">
-                    <Stack gap={4} align="center" textAlign="center">
-                      <Search className="w-8 h-8 text-accent-brand opacity-50" />
-                      <Stack gap={2}>
-                        <Text variant="display" size="xl">Work in Progress</Text>
-                        <Text variant="body" size="sm" color="dim" maxWidth="md">
-                          This specialized module is currently being integrated into the Tech-Dancer platform. We are finalizing the analysis models and UI components.
-                        </Text>
-                      </Stack>
-                    </Stack>
-                  </Box>
-                )}
-              </Stack>
+              <ToolView />
             )}
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


<!-- BEGIN_FILE_AUDIT: src/features/research/components/ToolView.tsx -->
---

### File: `src/features/research/components/ToolView.tsx` +81/-0 (added)

Diff:
```diff
@@ -0,0 +1,81 @@
+import { useParams } from 'react-router-dom';
+import { Database, Activity, Search } from 'lucide-react';
+import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
+import { useResearch } from '../useResearch';
+
+interface Tool {
+  id: string;
+  name: string;
+  category: string;
+  status: string;
+  layman: string;
+}
+
+export function ToolHeader({ tool }: { tool: Tool }) {
+  return (
+    <Stack gap={4}>
+      <Text variant="mono" color="brand" size="xs" weight="font-bold" uppercase tracking="widest">
+        LABORATORY_ACCESS // {tool.category.toUpperCase()}
+      </Text>
+      <Text variant="headline" size="fluid-7">{tool.name}</Text>
+      <Box border surface="accent" padding="compact" opacity={10} className="bg-accent/5">
+        <Text variant="body" size="lg" color="body">{tool.layman}</Text>
+      </Box>
+    </Stack>
+  );
+}
+
+export function ToolStatus({ tool }: { tool: Tool }) {
+  return (
+    <Grid cols={{ base: 1, md: 2 }} gap={12}>
+      <Stack gap={4}>
+        <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">System Status</Text>
+        <Box border padding="compact" display="flex" align="center" gap={3}>
+          <Activity className="w-4 h-4 text-accent-brand" />
+          <Text variant="mono" size="xs" color="brand" weight="font-bold">{tool.status.toUpperCase()}</Text>
+        </Box>
+      </Stack>
+      <Stack gap={4}>
+        <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">Database Source</Text>
+        <Box border padding="compact" display="flex" align="center" gap={3}>
+          <Database className="w-4 h-4 text-accent-brand text-dim" />
+          <Text variant="mono" size="xs">WSDC REGISTRY // AUTHENTICATED</Text>
+        </Box>
+      </Stack>
+    </Grid>
+  );
+}
+
+export function ToolWipMessage({ tool }: { tool: Tool }) {
+  if (tool.status !== 'Coming Soon') return null;
+
+  return (
+    <Box border surface="accent" padding="card" className="bg-accent-brand/5 border-dashed">
+      <Stack gap={4} align="center" textAlign="center">
+        <Search className="w-8 h-8 text-accent-brand opacity-50" />
+        <Stack gap={2}>
+          <Text variant="display" size="xl">Work in Progress</Text>
+          <Text variant="body" size="sm" color="dim" maxWidth="md">
+            This specialized module is currently being integrated into the Tech-Dancer platform. We are finalizing the analysis models and UI components.
+          </Text>
+        </Stack>
+      </Stack>
+    </Box>
+  );
+}
+
+export function ToolView() {
+  const { id } = useParams();
+  const { getTool } = useResearch();
+  const tool = id ? getTool(id) : null;
+
+  if (!tool) return null;
+
+  return (
+    <Stack gap={12}>
+      <ToolHeader tool={tool} />
+      <ToolStatus tool={tool} />
+      <ToolWipMessage tool={tool} />
+    </Stack>
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
  "path": "src/features/research/components/ToolView.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/research/components/ToolView.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/research/components/ToolView.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/resources/ResourceGallery.tsx -->
---

### File: `src/features/resources/ResourceGallery.tsx` +74/-39 (modified)

Diff:
```diff
@@ -1,12 +1,24 @@
 import { motion, AnimatePresence } from 'motion/react';
-import { BookOpen, ArrowRight, Database, Plane, Scissors, Calendar, ArrowLeft, Activity, Shield } from 'lucide-react';
+import { BookOpen, ArrowRight, Database, Plane, Scissors, Calendar, ArrowLeft, Activity, Shield, AlertCircle } from 'lucide-react';
 import Markdown from 'react-markdown';
 import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
 import { Resource } from '@/lib/content';
 import { useResources } from './useResources';
 
 export default function ResourceGallery() {
-  const { resources, selectedResource, handleSelect, handleClear } = useResources();
+  const { resources, selectedResource, handleSelect, handleClear, isLoading, error } = useResources();
+
+  if (error) {
+    return (
+      <Box as="section" padding="panel" display="flex" align="center" justify="center">
+        <Stack gap={4} align="center" textAlign="center">
+          <AlertCircle className="w-12 h-12 text-accent-brand opacity-20" />
+          <Text variant="display" size="2xl">Resource Access Failed</Text>
+          <Text variant="mono" size="xs" color="dim">{error}</Text>
+        </Stack>
+      </Box>
+    );
+  }
 
   return (
     <Box as="section" padding="panel">
@@ -21,7 +33,8 @@ export default function ResourceGallery() {
           <ResourceList 
             key="list" 
             resources={resources} 
-            onSelect={handleSelect} 
+            onSelect={handleSelect}
+            isLoading={isLoading}
           />
         )}
       </AnimatePresence>
@@ -70,7 +83,7 @@ function ResourceDetails({ resource, onBack }: { resource: Resource; onBack: ()
   );
 }
 
-function ResourceList({ resources, onSelect }: { resources: Resource[]; onSelect: (resource: Resource) => void }) {
+function ResourceList({ resources, onSelect, isLoading }: { resources: Resource[]; onSelect: (resource: Resource) => void; isLoading: boolean }) {
   const getIcon = (category: string) => {
     switch (category) {
       case 'Travel': return Plane;
@@ -108,51 +121,73 @@ function ResourceList({ resources, onSelect }: { resources: Resource[]; onSelect
       </Stack>
 
       <Grid cols={{ base: 1, md: 12 }} border className="bg-line">
-        {resources.map((resource, i) => {
-          const Icon = getIcon(resource.category);
-          const isWide = i % 2 === 0;
-          return (
+        {isLoading ? (
+          Array.from({ length: 4 }).map((_, i) => (
             <Box 
-              key={resource.slug}
-              span={{ base: 12, md: isWide ? 7 : 5 }}
-              as={motion.div}
-              whileHover={{ x: 2, scale: 1.002 }}
-              onClick={() => onSelect(resource)}
+              key={i}
+              span={{ base: 12, md: i % 2 === 0 ? 7 : 5 }}
               surface="default"
               padding="nav"
               border
-              cursor="pointer"
-              className="group hover:bg-surface transition-colors"
+              className="animate-pulse"
             >
               <Stack gap={12} height="full">
-                <Box display="flex" justify="between" align="start">
-                  <Icon className="w-8 h-8 stroke-1 text-accent-brand group-hover:scale-110 transition-transform" />
-                  <Text variant="mono" size="micro" color="dim">REVIEW</Text>
-                </Box>
+                <Box width={8} height={8} surface="muted" />
                 <Stack gap={6}>
-                  <Stack direction="row" align="center" gap={3}>
-                    <Text variant="mono" color="brand" weight="font-bold">{resource.category}</Text>
-                    <Box border className="border-accent-brand/30 px-2 py-0.5">
-                      <Text variant="mono" color="brand" weight="font-bold" size="micro">REVIEW</Text>
-                    </Box>
-                  </Stack>
-                  <Stack gap={2}>
-                    <Text variant="display" size="2xl" className="group-hover:text-accent-brand transition-colors">
-                      {resource.title}
-                    </Text>
-                    <Text variant="body" size="sm" color="dim" className="line-clamp-3">
-                      {resource.excerpt}
-                    </Text>
-                  </Stack>
+                   <Box width={20} height={4} surface="muted" />
+                   <Box width="full" height={8} surface="muted" />
+                   <Box width="3/4" height={4} surface="muted" />
                 </Stack>
-                <Box display="flex" align="center" gap={3} marginTop="auto" color="dim" className="group-hover:text-accent-brand transition-colors">
-                  <Text variant="mono" size="xs" weight="font-bold">Read Review</Text>
-                  <ArrowRight className="w-4 h-4" />
-                </Box>
               </Stack>
             </Box>
-          );
-        })}
+          ))
+        ) : (
+          resources.map((resource, i) => {
+            const Icon = getIcon(resource.category);
+            const isWide = i % 2 === 0;
+            return (
+              <Box
+                key={resource.slug}
+                span={{ base: 12, md: isWide ? 7 : 5 }}
+                as={motion.div}
+                whileHover={{ x: 2, scale: 1.002 }}
+                onClick={() => onSelect(resource)}
+                surface="default"
+                padding="nav"
+                border
+                cursor="pointer"
+                className="group hover:bg-surface transition-colors"
+              >
+                <Stack gap={12} height="full">
+                  <Box display="flex" justify="between" align="start">
+                    <Icon className="w-8 h-8 stroke-1 text-accent-brand group-hover:scale-110 transition-transform" />
+                    <Text variant="mono" size="micro" color="dim">REVIEW</Text>
+                  </Box>
+                  <Stack gap={6}>
+                    <Stack direction="row" align="center" gap={3}>
+                      <Text variant="mono" color="brand" weight="font-bold">{resource.category}</Text>
+                      <Box border className="border-accent-brand/30 px-2 py-0.5">
+                        <Text variant="mono" color="brand" weight="font-bold" size="micro">REVIEW</Text>
+                      </Box>
+                    </Stack>
+                    <Stack gap={2}>
+                      <Text variant="display" size="2xl" className="group-hover:text-accent-brand transition-colors">
+                        {resource.title}
+                      </Text>
+                      <Text variant="body" size="sm" color="dim" className="line-clamp-3">
+                        {resource.excerpt}
+                      </Text>
+                    </Stack>
+                  </Stack>
+                  <Box display="flex" align="center" gap={3} marginTop="auto" color="dim" className="group-hover:text-accent-brand transition-colors">
+                    <Text variant="mono" size="xs" weight="font-bold">Read Review</Text>
+                    <ArrowRight className="w-4 h-4" />
+                  </Box>
+                </Stack>
+              </Box>
+            );
+          })
+        )}
       </Grid>
     </Box>
   );
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
  "path": "src/features/resources/ResourceGallery.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/resources/ResourceGallery.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/resources/ResourceGallery.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/resources/useResources.ts -->
---

### File: `src/features/resources/useResources.ts` +16/-2 (modified)

Diff:
```diff
@@ -4,9 +4,21 @@ import { getResources, Resource } from '@/lib/content';
 export function useResources() {
   const [resources, setResources] = useState<Resource[]>([]);
   const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
+  const [isLoading, setIsLoading] = useState(true);
+  const [error, setError] = useState<string | null>(null);
 
   useEffect(() => {
-    setResources(getResources());
+    setIsLoading(true);
+    setError(null);
+    try {
+      const data = getResources();
+      if (!data) throw new Error('FAILED_TO_LOAD_RESOURCES');
+      setResources(data);
+    } catch (err) {
+      setError(err instanceof Error ? err.message : 'Unknown resource error');
+    } finally {
+      setIsLoading(false);
+    }
   }, []);
 
   const handleSelect = (resource: Resource) => setSelectedResource(resource);
@@ -16,6 +28,8 @@ export function useResources() {
     resources,
     selectedResource,
     handleSelect,
-    handleClear
+    handleClear,
+    isLoading,
+    error
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
  "path": "src/features/resources/useResources.ts",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/resources/useResources.ts",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/resources/useResources.ts -->


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
python3 dev-tools/submit_pr_review_data.py plan-pr-review-154.md
```

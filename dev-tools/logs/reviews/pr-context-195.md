# PR Context: #195 — reintroduce #137:  "Implement UI Anti-Pattern Detection and AI Debugger Utilities""
**Stats:** +559/-85 across 34 files
**Author:** @arii
**Last Commit:** 2026-04-23T01:54:47Z

## Description
reintroduce #137 

## Files Changed
- 🟡 `.gitignore` (+5/-0)
- 🟢 `REVIEW_TRACKING.md.bak` (+28/-0)
- 🟢 `UX_REVIEW_NOTES.md` (+171/-0)
- 🟢 `image-1.png` (+0/-0)
- 🟢 `image-2.png` (+0/-0)
- 🟢 `image-3.png` (+0/-0)
- 🟢 `image-4.png` (+0/-0)
- 🟢 `image-5.png` (+0/-0)
- 🟢 `image-6.png` (+0/-0)
- 🟢 `image.png` (+0/-0)
- 🟡 `package.json` (+5/-0)
- 🟡 `plan.md` (+28/-1)
- 🟡 `pnpm-lock.yaml` (+16/-0)
- 🟡 `src/components/GlobalSearch.tsx` (+45/-14)
- 🟡 `src/components/Navigation.tsx` (+45/-16)
- 🟡 `src/components/ui/FolioGrid.tsx` (+3/-2)
- 🟡 `src/features/dashboard/Dashboard.tsx` (+19/-8)
- 🟡 `src/features/email-capture/EmailForm.tsx` (+25/-6)
- 🟡 `src/features/email-capture/NewsletterBanner.tsx` (+6/-2)
- 🟡 `src/features/lab/BlogDrafter.tsx` (+29/-5)
- 🟡 `src/index.css` (+19/-5)
- 🟡 `src/layouts/ContentDetail.tsx` (+5/-2)
- 🟡 `src/layouts/Text.tsx` (+3/-1)
- 🟡 `src/lib/variants.ts` (+16/-2)
- 🟡 `src/main.tsx` (+2/-0)
- 🟡 `src/styles/design-tokens.ts` (+22/-0)
- 🟡 `src/styles/motion.ts` (+64/-21)
- 🟡 `tailwind.config.js` (+3/-0)
- 🟢 `ux_about.png` (+0/-0)
- 🟢 `ux_blog.png` (+0/-0)

## Diffs

### `.gitignore` (modified)
**Valid Comment Ranges (New File):** 12-22
```diff
@@ -12,6 +12,11 @@ coverage/
  12 | playwright-report/
  13 | test-results/
  14 | 
  15 |+# AI Debugger
  16 |+ai-fix-prompt.txt
  17 |+antipattern-report.txt
  18 |+TODO_ANTIPATTERNS.md
  19 |+
  20 | # Python / ETL
  21 | __pycache__/
  22 | *.py[cod]
```

### `REVIEW_TRACKING.md.bak` (added)
**Valid Comment Ranges (New File):** 1-28
```diff
@@ -0,0 +1,28 @@
   1 |+# PR Review Tracking
   2 |+
   3 |+| #237 | resolve UX consistency playbook... | Reviewed | 2026-04-22 | Not Approved |
   4 |+| #236 | address architectural inconsistencies | Reviewed | 2026-04-22 | Approved (Minor Changes) |
   5 |+| #235 | address code quality concerns in UI...| Reviewed | 2026-04-22 | Approved (Minor Changes) |
   6 |+| #232 | Fix token violations in GlobalSearch... | Reviewed | 2026-04-22 | Approved |
   7 |+| #230 | UI Refinement: Detail Pages... | Reviewed | 2026-04-22 | Approved (Minor Changes) |
   8 |+| #229 | Fix PR 137 Feedback... | Reviewed | 2026-04-22 | Approved (Minor Changes) |
   9 |+| #227 | Automated Preview Index... | Reviewed | 2026-04-22 | Approved (Minor Changes) |
  10 |+| #224 | Scroll Restoration Implementation | Reviewed | 2026-04-22 | Approved (Minor Changes) |
  11 |+| #223 | Update PR Review Workflows | Reviewed | 2026-04-22 | Approved |
  12 |+| #222 | UX Audit: Fix individual layout bugs | Reviewed | 2026-04-22 | Approved (Minor Changes) |
  13 |+| #219 | Implement UX Playbook | Reviewed | 2026-04-22 | Approved (Minor Changes) |
  14 |+| #217 | Fix PathSelector vertical stacking | Reviewed | 2026-04-22 | Not Approved |
  15 |+| #215 | Fix missing gap-6 in contact form | Reviewed | 2026-04-22 | Approved (Minor Changes) |
  16 |+| #213 | fix(layouts): Safelist Box tokens | Reviewed | 2026-04-22 | Approved |
  17 |+| #195 | reintroduce #137 (Foundation) | Reviewed | 2026-04-22 | Approved (Minor Changes) |
  18 |+| #191 | Implement Dead Code Detection | Reviewed | 2026-04-22 | Approved (Minor Changes) |
  19 |+| #188 | Vite+ Tooling Improvements | Reviewed | 2026-04-22 | Approved (Minor Changes) |
  20 |+| #157 | Vite Best Practices & Performance | Reviewed | 2026-04-22 | Approved (Minor Changes) |
  21 |+| #154 | Address Page-Specific Layout Debt | Reviewed | 2026-04-22 | Approved (Minor Changes) |
  22 |+| #148 | Contact Page Refactor | Reviewed | 2026-04-22 | Approved (Minor Changes) |
  23 |+| #147 | Home Page UX Consolidation | Reviewed | 2026-04-22 | Approved (Minor Changes) |
  24 |+| #146 | Fix Global Search & Sidebar Refinement| Reviewed | 2026-04-22 | Approved (Minor Changes) |
  25 |+
  26 |+## Audit History
  27 |+- **2026-04-22 (23:30Z)**: Comprehensive fleet re-review of 19 updated PRs completed. 100% audit coverage achieved. #217 Not Approved (Core token regression). Baseline stabilized for foundations-first merge.
  28 |+- **2026-04-22 (19:30Z)**: Mass audit of 12 PRs completed. Critical regression found in #148 (Box layout). Missing scripts flagged in #195. Baseline infrastructure audited for sequential merge readiness.
```

### `UX_REVIEW_NOTES.md` (added)
**Valid Comment Ranges (New File):** 1-171
```diff
@@ -0,0 +1,171 @@
   1 |+PR 215 -- REJECT gap between svg and icons is not fixed
   2 |+![alt text](image.png)
   3 |+
   4 |+
   5 |+PR 217 -- REJECT still vertical stacked
   6 |+![alt text](image-1.png)
   7 |+
   8 |+
   9 |+
  10 |+PR 218 -- Needs improvements
  11 |+Gear reviews heading ![alt text](image-2.png) is different from all other headings ![alt text](image-3.png), ![alt text](image-4.png), ![alt text](image-5.png)
  12 |+Need to address cramped top level description ":techincal portfiolio" followed by  massive heading ![alt text](image-6.png) that eprsists on msot pagess
  13 |+
  14 |+
  15 |+
  16 |+PR 222
  17 |+Looking at both screenshots, there are three distinct layout bugs. Here are the targeted fixes:
  18 |+
  19 |+---
  20 |+
  21 |+## Bug 1: Score Bar — Items Clustered Right with Empty Left Space
  22 |+
  23 |+The `ScoreGrid` uses a 5-column CSS grid but the grid container has no explicit width, so it shrinks to content width and gets pulled right. Also, 2 of 5 items show `—` (invisible), leaving dead columns.
  24 |+
  25 |+**Fix in `src/components/layout/DetailElements.tsx`:**
  26 |+
  27 |+```tsx
  28 |+// REPLACE ScoreGrid entirely:
  29 |+export function ScoreGrid({ children }: { children: React.ReactNode }) {
  30 |+  return (
  31 |+    <Box
  32 |+      border="y"
  33 |+      paddingY={6}
  34 |+      surface="muted"
  35 |+      className="border-line/50 w-full"
  36 |+    >
  37 |+      <Box className="flex flex-row w-full divide-x divide-line/30">
  38 |+        {children}
  39 |+      </Box>
  40 |+    </Box>
  41 |+  );
  42 |+}
  43 |+
  44 |+// REPLACE ScoreItem — remove the border-r class, use flex-1:
  45 |+export function ScoreItem({ label, value, icon: Icon, color }: ScoreItemProps) {
  46 |+  return (
  47 |+    <Stack gap={1} align="center" className="flex-1 px-4 py-2">
  48 |+      <Text variant="mono" size="tiny" color="dim" uppercase>{label}</Text>
  49 |+      <Box display="flex" align="center" gap={1} className={color || ''}>
  50 |+        {Icon && <Icon className="w-4 h-4" />}
  51 |+        <Text variant="display" size="xl" weight="font-bold">{value}</Text>
  52 |+      </Box>
  53 |+    </Stack>
  54 |+  );
  55 |+}
  56 |+```
  57 |+
  58 |+---
  59 |+
  60 |+## Bug 2: DURABILITY and VALUE Render as "—" (Invisible Dead Columns)
  61 |+
  62 |+The data fields `durability` and `value` aren't set in the resource markdown files, so they silently occupy grid space. Guard them at the render site.
  63 |+
  64 |+**Fix in `src/features/lab/components/GearPostDetail.tsx`:**
  65 |+
  66 |+```tsx
  67 |+const headerExtras = (
  68 |+  <ScoreGrid>
  69 |+    <ScoreItem label="Overall" value={post.rating ?? 'N/A'}
  70 |+               icon={Star} color="text-yellow-500" />
  71 |+    {post.durability && (
  72 |+      <ScoreItem label="Durability"
  73 |+                 value={`${post.durability}/5`} />
  74 |+    )}
  75 |+    {post.value && (
  76 |+      <ScoreItem label="Value"
  77 |+                 value={`${post.value}/5`} />
  78 |+    )}
  79 |+    <ScoreItem label="Price"
  80 |+               value={post.priceCategory || '$$'}
  81 |+               color="text-amber-600" />
  82 |+    <ScoreItem label="Updated"
  83 |+               value={post.updatedDate || post.date} />
  84 |+  </ScoreGrid>
  85 |+);
  86 |+```
  87 |+
  88 |+This means the bar will show 3 evenly-spaced items instead of 5 items with 2 invisible holes.
  89 |+
  90 |+---
  91 |+
  92 |+## Bug 3: Content Column Too Narrow on Desktop
  93 |+
  94 |+The `DetailLayout` uses `maxWidth="5xl"` on the outer wrapper and then `Grid cols={{ base: 1, lg: 4 }}` for sidebar+content. The sidebar takes 1 column, content takes 3, but with `gap={12}` the reading column ends up around 500px.
  95 |+
  96 |+**Fix in `src/components/layout/DetailLayout.tsx`:**
  97 |+
  98 |+```tsx
  99 |+// Change the outer container width:
 100 |+// Before:
 101 |+<Stack gap={12} maxWidth="5xl" marginX="auto" className="w-full">
 102 |+
 103 |+// After:
 104 |+<Stack gap={12} className="max-w-4xl mx-auto w-full">
 105 |+```
 106 |+
 107 |+```tsx
 108 |+// Change the sidebar/content split from 4-col to 3-col:
 109 |+// Before:
 110 |+<Grid cols={{ base: 1, lg: sidebar ? 4 : 1 }} gap={12}>
 111 |+
 112 |+// After:
 113 |+<Grid cols={{ base: 1, lg: sidebar ? 3 : 1 }} gap={10}>
 114 |+```
 115 |+
 116 |+```tsx
 117 |+// And update the content span to match:
 118 |+// Before:
 119 |+<Box className={sidebar ? "lg:col-span-3" : ""}>
 120 |+
 121 |+// After:
 122 |+<Box className={sidebar ? "lg:col-span-2" : ""}>
 123 |+```
 124 |+
 125 |+This gives sidebar 1 column and content 2 columns in a 3-col grid — roughly 33%/66% split, which at `max-w-4xl` (896px) gives a ~580px reading column.
 126 |+
 127 |+---
 128 |+
 129 |+## Bug 4: Title Shows ALL CAPS in Header Breadcrumb
 130 |+
 131 |+The page-level breadcrumb `LOOP EXPERIENCE EARPLUGS` is uppercased because `typography.display` token includes `uppercase`. Fix the token so casing is opt-in.
 132 |+
 133 |+**Fix in `src/styles/design-tokens.ts`:**
 134 |+
 135 |+```ts
 136 |+// Before:
 137 |+display: "font-display font-bold uppercase tracking-tight leading-none",
 138 |+
 139 |+// After:
 140 |+display: "font-display font-bold tracking-tight leading-none",
 141 |+```
 142 |+
 143 |+Then add `uppercase` back explicitly only where short labels need it — category badges, `FilterBar`, `PageHeader` eyebrow label — not on full titles.
 144 |+
 145 |+---
 146 |+
 147 |+## Result
 148 |+
 149 |+After these four fixes the gear review page should look like:
 150 |+
 151 |+```
 152 |+← BACK TO TOOLBOX
 153 |+[DANCE GEAR]  · 1 MIN READ
 154 |+Loop Experience Earplugs
 155 |+
 156 |+┌──────────────────────────────────────────┐
 157 |+│  OVERALL  │   PRICE   │    UPDATED       │  ← even flex row, full width
 158 |+│   ★ 5     │   $$      │   Oct 2023       │
 159 |+└──────────────────────────────────────────┘
 160 |+
 161 |+ Sidebar (sticky)   │  Article content at readable width
 162 |+ ─ Where to Buy     │  Why Dancers Need Hearing Protection
 163 |+ ─ Affiliate link   │  Body text with comfortable line length...
 164 |+```
 165 |+
 166 |+<img width="907" height="919" alt="image" src="https://github.com/user-attachments/assets/3d89eebc-c8a9-4167-8b87-f1e985fc53a8" />
 167 |+<img width="919" height="938" alt="image" src="https://github.com/user-attachments/assets/dd2a9454-c55a-4ce0-9ca1-8e9e75f34db1" />
 168 |+
 169 |+------
 170 |+
 171 |+
```

### `image-1.png` (added)
**Valid Comment Ranges (New File):** None (Binary or too large)
```diff
_No textual diff available._
```

### `image-2.png` (added)
**Valid Comment Ranges (New File):** None (Binary or too large)
```diff
_No textual diff available._
```

### `image-3.png` (added)
**Valid Comment Ranges (New File):** None (Binary or too large)
```diff
_No textual diff available._
```

### `image-4.png` (added)
**Valid Comment Ranges (New File):** None (Binary or too large)
```diff
_No textual diff available._
```

### `image-5.png` (added)
**Valid Comment Ranges (New File):** None (Binary or too large)
```diff
_No textual diff available._
```

### `image-6.png` (added)
**Valid Comment Ranges (New File):** None (Binary or too large)
```diff
_No textual diff available._
```

### `image.png` (added)
**Valid Comment Ranges (New File):** None (Binary or too large)
```diff
_No textual diff available._
```

### `package.json` (modified)
**Valid Comment Ranges (New File):** 11-26
```diff
@@ -11,11 +11,16 @@
  11 |     "test:e2e": "playwright test",
  12 |     "clean": "rm -rf dist",
  13 |     "lint": "tsc --noEmit",
  14 |+    "audit": "node scripts/detect-antipatterns.mjs > antipattern-report.txt 2>&1 || true && node scripts/generate-todo.mjs",
  15 |+    "audit:fix": "node scripts/ai-debugger.mjs",
  16 |+    "audit:fix:gallery": "node scripts/ai-debugger.mjs http://localhost:3000/public/antipattern-examples/cardocalypse.html '.card'",
  17 |     "type-check": "tsc --noEmit"
  18 |   },
  19 |   "dependencies": {
  20 |     "@base-ui/react": "^1.4.0",
  21 |     "@fontsource-variable/geist": "^5.2.8",
  22 |+    "@fontsource-variable/inter": "^5.2.8",
  23 |+    "@fontsource/fraunces": "^5.2.9",
  24 |     "@google/genai": "^1.29.0",
  25 |     "@tailwindcss/vite": "^4.2.2",
  26 |     "@vitejs/plugin-react": "^5.0.4",
```

### `plan.md` (modified)
**Valid Comment Ranges (New File):** 218-248
```diff
@@ -218,4 +218,31 @@ Repo Name: For the Vite base path.
 218 | 
 219 | State: Is this local useState or should it be in the Zustand store?
 220 | 
     |-Follow these rules strictly to maintain project integrity.
 221 |\ No newline at end of file
 222 |+Follow these rules strictly to maintain project integrity.
 223 |+
 224 |+---
 225 |+
 226 |+## Technical Audit & UX Roadmap (Updated 2026-04-21)
 227 |+
 228 |+### 1. Aesthetic & Visual Polish
 229 |+- [x] **Typography & Hierarchy**: Implemented Inter (Sans) and Fraunces (Serif) pairing.
 230 |+- [x] **Optical Sizing**: Applied -0.02em tracking for display headings.
 231 |+- [x] **Color & Depth**: Integrated layered shadows and glassmorphism.
 232 |+- [x] **Consistency**: Standardized `rounded-xl` radii across the system.
 233 |+
 234 |+### 2. Interaction & Motion
 235 |+- [x] **Sticky Headers**: Scroll-aware transitions for mobile and desktop navigation.
 236 |+- [x] **Micro-interactions**: Tactile button scaling and card lift effects.
 237 |+- [x] **Staggered Reveals**: Entrance animations for grid items.
 238 |+- [x] **Mobile Transitions**: Right-to-Left spring animation for menu.
 239 |+
 240 |+### 3. Usability & Functional Excellence
 241 |+- [x] **Global Search**: CMD+K support and results highlighting.
 242 |+- [x] **Form Feedback**: Inline validation for email capture.
 243 |+- [x] **Category Empty States**: "Coming soon" placeholders for empty content feeds.
 244 |+- [x] **Large Viewport Optimization**: Max-width constraints for 4K displays.
 245 |+
 246 |+### 4. Automation Suite
 247 |+- [x] **Linter**: `npm run audit` for design system adherence.
 248 |+- [x] **TODO Generator**: Automated task derivation from audit reports.
 249 |+- [x] **AI Debugger**: Context-aware prompt generation for UI fixes.
 250 |\ No newline at end of file
```

### `pnpm-lock.yaml` (modified)
**Valid Comment Ranges (New File):** 14-25, 856-867, 4404-4413
```diff
@@ -14,6 +14,12 @@ importers:
  14 |       '@fontsource-variable/geist':
  15 |         specifier: ^5.2.8
  16 |         version: 5.2.8
  17 |+      '@fontsource-variable/inter':
  18 |+        specifier: ^5.2.8
  19 |+        version: 5.2.8
  20 |+      '@fontsource/fraunces':
  21 |+        specifier: ^5.2.9
  22 |+        version: 5.2.9
  23 |       '@google/genai':
  24 |         specifier: ^1.29.0
  25 |         version: 1.50.1(@modelcontextprotocol/sdk@1.29.0(zod@3.25.76))
@@ -850,6 +856,12 @@ packages:
 856 |   '@fontsource-variable/geist@5.2.8':
 857 |     resolution: {integrity: sha512-cJ6m9e+8MQ5dCYJsLylfZrgBh6KkG4bOLckB35Tr9J/EqdkEM6QllH5PxqP1dhTvFup+HtMRPuz9xOjxXJggxw==}
 858 | 
 859 |+  '@fontsource-variable/inter@5.2.8':
 860 |+    resolution: {integrity: sha512-kOfP2D+ykbcX/P3IFnokOhVRNoTozo5/JxhAIVYLpea/UBmCQ/YWPBfWIDuBImXX/15KH+eKh4xpEUyS2sQQGQ==}
 861 |+
 862 |+  '@fontsource/fraunces@5.2.9':
 863 |+    resolution: {integrity: sha512-XDzuddBtoC7BZgZdBn6b7hsFZY2+V1hgN7yca5fBTKuHjb/lOd45a0Ji8dTUgFhPoL7RdGupo+bC2BFSt6UH8Q==}
 864 |+
 865 |   '@google/genai@1.50.1':
 866 |     resolution: {integrity: sha512-YbkX7H9+1Pt8wOt7DDREy8XSoiL6fRDzZQRyaVBarFf8MR3zHGqVdvM4cLbDXqPhxqvegZShgfxb8kw9C7YhAQ==}
 867 |     engines: {node: '>=20.0.0'}
@@ -4392,6 +4404,10 @@ snapshots:
4404 | 
4405 |   '@fontsource-variable/geist@5.2.8': {}
4406 | 
4407 |+  '@fontsource-variable/inter@5.2.8': {}
4408 |+
4409 |+  '@fontsource/fraunces@5.2.9': {}
4410 |+
4411 |   '@google/genai@1.50.1(@modelcontextprotocol/sdk@1.29.0(zod@3.25.76))':
4412 |     dependencies:
4413 |       google-auth-library: 10.6.2
```

### `src/components/GlobalSearch.tsx` (modified)
**Valid Comment Ranges (New File):** 1-17, 32-48, 126-170
```diff
@@ -1,20 +1,17 @@
     |-import { Search, X, Hash, CornerDownLeft } from 'lucide-react';
     |-import { Box, Stack, Text } from '@/layouts/Primitives';
   1 |+import { motion, AnimatePresence } from 'motion/react';
   2 |+import { Search, X, Hash, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
   3 |+import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
   4 | import { useGlobalSearch } from '@/hooks/useGlobalSearch';
     |-import { useRef } from 'react';
   5 |+import { useRef, useEffect } from 'react';
   6 | import { useNavigate } from 'react-router-dom';
   7 |+import { highlightVariants } from '@/lib/variants';
   8 | import { useHotkeys, useCommandKey } from '@/hooks/useHotkeys';
   9 | 
  10 | export function GlobalSearch() {
  11 |   const { query, setQuery, results, isOpen, open, close } = useGlobalSearch();
  12 |   const inputRef = useRef<HTMLInputElement>(null);
  13 |   const navigate = useNavigate();
  14 | 
     |-  // 1. The Context Reset: Close on route change
     |-  // Note: Since isOpen is now derived from URL search params ('search=true'),
     |-  // navigation to a new URL without the 'search' param will automatically
     |-  // "close" the modal (isOpen will become false).
     |-
  15 |   // 3. The Keyboard Escape Hatch: Close on ESC key
  16 |   useHotkeys('Escape', () => {
  17 |     if (isOpen) close();
@@ -35,6 +32,17 @@ export function GlobalSearch() {
  32 |     else if (result.type === 'study') navigate(`/research/${result.slug}`);
  33 |   };
  34 | 
  35 |+  const highlight = (text: string) => {
  36 |+    if (!query) return text;
  37 |+    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  38 |+    const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));
  39 |+    return parts.map((part, i) =>
  40 |+      part.toLowerCase() === query.toLowerCase()
  41 |+        ? <span key={i} className={highlightVariants({ intent: 'default' })}>{part}</span>
  42 |+        : part
  43 |+    );
  44 |+  };
  45 |+
  46 |   if (!isOpen) return null;
  47 | 
  48 |   return (
@@ -118,22 +126,45 @@ export function GlobalSearch() {
 126 |                    </Box>
 127 |                    <Stack gap={1} flex className="min-w-0">
 128 |                       <Box display="flex" align="center" justify="between" gap={3}>
     |-                         <Text variant="display" size="lg" className="group-hover:text-accent truncate">{res.title}</Text>
 129 |+                         <Text variant="display" size="lg" className="group-hover:text-accent truncate">
 130 |+                           {highlight(res.title)}
 131 |+                         </Text>
 132 |                          <Box border paddingX={2} paddingY={0.5} radius="none" className="bg-accent/5 shrink-0">
 133 |                             <Text variant="mono" size="micro" color="brand">{res.type.toUpperCase()}</Text>
 134 |                           </Box>
 135 |                       </Box>
     |-                      <Text variant="body" size="xs" color="dim" className="line-clamp-1 truncate">{res.excerpt}</Text>
 136 |+                      <Text variant="body" size="xs" color="dim" className="line-clamp-1 truncate">
 137 |+                        {highlight(res.excerpt)}
 138 |+                      </Text>
 139 |                    </Stack>
 140 |                    <CornerDownLeft className="w-4 h-4 opacity-0 group-hover:opacity-30 transition-opacity" />
 141 |                 </Box>
 142 |               ))}
 143 |             </Stack>
 144 |           ) : (
     |-            <Box padding={12} display="flex" align="center" justify="center" opacity={30}>
     |-              <Stack align="center" gap={4}>
     |-                <Search className="w-12 h-12 opacity-20" />
     |-                <Text variant="mono" size="xs" color="dim">Calibrating Variance...</Text>
 145 |+            <Box paddingY={20} display="flex" align="center" justify="center">
 146 |+              <Stack align="center" gap={6} className="text-center">
 147 |+                <Box className="relative">
 148 |+                  <Search className="w-16 h-16 text-line" strokeWidth={1} />
 149 |+                  <Sparkles className="w-6 h-6 text-accent absolute -top-2 -right-2 animate-pulse" />
 150 |+                </Box>
 151 |+                <Stack gap={2}>
 152 |+                  <Text variant="display" size="xl">No Matches Found</Text>
 153 |+                  <Text variant="body" size="sm" color="dim" className="max-w-xs">
 154 |+                    Your query did not return any components from the tech-dancer repository.
 155 |+                  </Text>
 156 |+                </Stack>
 157 |+                <Box 
 158 |+                  as="button"
 159 |+                  onClick={() => setQuery('')}
 160 |+                  paddingX={4}
 161 |+                  paddingY={2}
 162 |+                  radius="md"
 163 |+                  border
 164 |+                  className="text-xs font-mono font-bold hover:bg-bg transition-colors"
 165 |+                >
 166 |+                  RESET FILTERS
 167 |+                </Box>
 168 |               </Stack>
 169 |             </Box>
 170 |           )}
```

### `src/components/Navigation.tsx` (modified)
**Valid Comment Ranges (New File):** 1-10, 19-52, 55-69, 75-89, 107-116, 160-171
```diff
@@ -1,9 +1,10 @@
     |-import { Menu, X, Terminal, Search, LucideIcon } from 'lucide-react';
     |-import { useState } from 'react';
   1 |+import { ShoppingBag, Database, BookOpen, User, Home, Menu, X, Terminal, Search, Send, LucideIcon } from 'lucide-react';
   2 |+import { useState, useEffect } from 'react';
   3 | import { NavLink } from 'react-router-dom';
   4 | import { motion, AnimatePresence } from 'motion/react';
   5 | import { Box, Stack, Text } from '@/layouts/Primitives';
   6 | import { cn } from '@/lib/utils';
   7 |+import { motionTokens } from '@/styles/motion';
   8 | import { routes } from '@/config/routes';
   9 | import { useGlobalSearch } from '@/hooks/useGlobalSearch';
  10 | 
@@ -18,25 +19,34 @@ function NavItem({ to, label, icon, onClick, isMobile }: { to: string, label: st
  19 |         to={to}
  20 |         onClick={onClick}
  21 |         className={({ isActive }) => cn(
     |-          "transition-all relative z-10 rounded-md block",
  22 |+          "flex items-center gap-4 transition-all relative z-10 rounded-md",
  23 |+          isMobile ? "py-6 border-b border-line/50 text-xl" : "py-4 px-4",
  24 |           isActive 
     |-            ? "text-accent bg-bg" 
  25 |+            ? "text-accent bg-accent/5"
  26 |             : "text-text-dim hover:text-accent hover:bg-bg/50"
  27 |         )}
  28 |       >
  29 |         <Box
  30 |           display="flex"
  31 |           align="center"
  32 |           gap={4}
     |-          paddingY={6}
     |-          paddingX={isMobile ? undefined : 4}
     |-          border={isMobile ? "b" : undefined}
     |-          className={isMobile ? "border-line/50" : undefined}
  33 |+          flex
  34 |         >
  35 |           <Icon className={cn("w-5 h-5 stroke-[1.5] flex-shrink-0", isMobile ? "w-6 h-6" : "")} />
     |-          <Text variant="sans" size={isMobile ? "lg" : "base"} weight="font-bold" className="leading-none">
     |-            {label}
     |-          </Text>
  36 |+          <Box display="flex" align="center" gap={3} flex>
  37 |+            <Text variant="sans" size={isMobile ? "lg" : "base"} weight="font-bold" className="leading-none">
  38 |+              {label}
  39 |+            </Text>
  40 |+            <NavLink to={to}>
  41 |+              {({ isActive }) => isActive && (
  42 |+                <motion.div
  43 |+                  layoutId="active-nav-indicator"
  44 |+                  className="w-1.5 h-1.5 rounded-full bg-accent"
  45 |+                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
  46 |+                />
  47 |+              )}
  48 |+            </NavLink>
  49 |+          </Box>
  50 |         </Box>
  51 |       </NavLink>
  52 |     </Box>
@@ -45,8 +55,15 @@ function NavItem({ to, label, icon, onClick, isMobile }: { to: string, label: st
  55 | 
  56 | export default function Navigation() {
  57 |   const [isOpen, setIsOpen] = useState(false);
  58 |+  const [scrolled, setScrolled] = useState(false);
  59 |   const { open: openSearch, close: closeSearch, isOpen: isSearchOpen } = useGlobalSearch();
  60 | 
  61 |+  useEffect(() => {
  62 |+    const handleScroll = () => setScrolled(window.scrollY > 20);
  63 |+    window.addEventListener('scroll', handleScroll);
  64 |+    return () => window.removeEventListener('scroll', handleScroll);
  65 |+  }, []);
  66 |+
  67 |   const handleSearchClick = () => {
  68 |     if (isSearchOpen) {
  69 |       closeSearch();
@@ -58,7 +75,15 @@ export default function Navigation() {
  75 |   return (
  76 |     <>
  77 |       {/* Mobile Header */}
     |-      <Box as="nav" aria-label="Mobile Navigation" layout="mobileHeader">
  78 |+      <Box
  79 |+        as="nav"
  80 |+        aria-label="Mobile Navigation"
  81 |+        layout="mobileHeader"
  82 |+        className={cn(
  83 |+          "transition-all duration-300",
  84 |+          scrolled ? "bg-surface/90 backdrop-blur-xl border-b border-line" : "bg-transparent border-transparent"
  85 |+        )}
  86 |+      >
  87 |         <Box as={NavLink} to="/" onClick={() => setIsOpen(false)}>
  88 |           <Text variant="mono" size="sm" weight="font-bold" className="text-accent-navy tracking-wider uppercase">TECH-DANCER</Text>
  89 |         </Box>
@@ -82,9 +107,10 @@ export default function Navigation() {
 107 |         {isOpen && (
 108 |           <Box 
 109 |             as={motion.div} 
     |-            initial={{ x: '-100%' }}
 110 |+            initial={{ x: '100%' }}
 111 |             animate={{ x: 0 }}
     |-            exit={{ x: '-100%' }}
 112 |+            exit={{ x: '100%' }}
 113 |+            transition={motionTokens.arielTransition}
 114 |             position="fixed"
 115 |             className="top-16 left-0 right-0 bottom-0 z-[100] bg-bg lg:hidden w-full"
 116 |             padding={8}
@@ -134,9 +160,12 @@ export default function Navigation() {
 160 |         as="nav"
 161 |         aria-label="Main Navigation"
 162 |         layout="navRail" 
     |-        className="w-[280px] bg-surface border-r border-line hidden lg:flex flex-col min-h-screen sticky top-0"
 163 |+        className={cn(
 164 |+          "w-[280px] bg-surface border-r border-line hidden lg:flex flex-col min-h-screen sticky top-0 transition-all duration-300",
 165 |+          scrolled ? "backdrop-blur-xl bg-surface/90" : ""
 166 |+        )}
 167 |       >
     |-        <Stack padding={8} gap={10} flex={1}>
 168 |+        <Stack padding={8} gap={10} flex={1} className={cn("transition-all duration-500", scrolled && "gap-6 pt-6")}>
 169 |           <Box as={NavLink} to="/" className="group block mb-4">
 170 |             <Text 
 171 |               variant="mono" 
```

### `src/components/ui/FolioGrid.tsx` (modified)
**Valid Comment Ranges (New File):** 1-5, 8-21
```diff
@@ -1,3 +1,5 @@
   1 |+import { useState, ReactNode } from 'react';
   2 |+import { motion, AnimatePresence } from 'motion/react';
   3 | import { useSearchParam } from '@/hooks/useSearchParam';
   4 | import { ContentCard } from '@/components/ui/ContentCard';
   5 | import { PageHeader } from '@/components/ui/PageHeader';
@@ -6,15 +8,14 @@ import { safeSearch } from '@/lib/utils';
   8 | import { ViewToggle, ViewMode } from '@/components/ui/ViewToggle';
   9 | import { ListRow } from '@/components/ui/ListRow';
  10 | import { ContentItem } from '@/lib/content';
     |-import { motion, AnimatePresence } from 'motion/react';
  11 | 
  12 | interface FolioGridProps {
  13 |   items: ContentItem[];
  14 |   categoryTitle: string;
  15 |   basePath: string;
  16 |   label?: string;
  17 |   description?: string;
     |-  children?: React.ReactNode;
  18 |+  children?: ReactNode;
  19 |   view?: ViewMode;
  20 |   onViewChange?: (v: ViewMode) => void;
  21 |   as?: keyof JSX.IntrinsicElements;
```

### `src/features/dashboard/Dashboard.tsx` (modified)
**Valid Comment Ranges (New File):** 3-9, 58-86
```diff
@@ -3,6 +3,7 @@ import { NavLink } from 'react-router-dom';
   3 | import { Zap, ArrowRight, Shield, Calendar } from 'lucide-react';
   4 | import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
   5 | import { useHome } from './useHome';
   6 |+import { motionTokens } from '@/styles/motion';
   7 | import { SEO } from '@/components/SEO';
   8 | import { PageHeader, SectionHeader } from '@/components/ui/PageHeader';
   9 | import PathSelector from '@/components/ui/PathSelector';
@@ -57,19 +58,29 @@ export default function Home() {
  58 |             </Box>
  59 |           </SectionHeader>
  60 | 
     |-          <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={4}>
  61 |+          <Grid
  62 |+            as={motion.div}
  63 |+            variants={motionTokens.staggerContainer}
  64 |+            initial="initial"
  65 |+            animate="animate"
  66 |+            cols={{ base: 1, sm: 2, lg: 4 }}
  67 |+            gap={4}
  68 |+          >
  69 |             {recentPosts.map((post) => (
     |-              <ContentCard 
     |-                key={post.slug}
     |-                {...post}
     |-                basePath="/blog"
     |-                aspect="video"
     |-              />
  70 |+              <Box as={motion.div} variants={motionTokens.fadeInUp} key={post.slug}>
  71 |+                <ContentCard
  72 |+                  {...post}
  73 |+                  basePath="/blog"
  74 |+                  aspect="video"
  75 |+                />
  76 |+              </Box>
  77 |             ))}
  78 | 
  79 |             {/* Upcoming Events Mini-Cards */}
  80 |             {upcomingEvents.map((event) => (
     |-              <EventCard key={event.name} {...event} />
  81 |+              <Box as={motion.div} variants={motionTokens.fadeInUp} key={event.name}>
  82 |+                <EventCard {...event} />
  83 |+              </Box>
  84 |             ))}
  85 |           </Grid>
  86 |         </Stack>
```

### `src/features/email-capture/EmailForm.tsx` (modified)
**Valid Comment Ranges (New File):** 1-48
```diff
@@ -1,29 +1,48 @@
   1 |+import { useState, FormEvent, ChangeEvent } from 'react';
   2 | import { Stack, Box, Text, Button } from '@/layouts/Primitives';
   3 | import { useEmailCaptureContext } from './EmailCaptureContext';
   4 | import { motion, AnimatePresence } from 'motion/react';
     |-import { ArrowRight, Loader2, Check } from 'lucide-react';
     |-import { inputs } from '@/styles/design-tokens';
   5 |+import { ArrowRight, Loader2, Check, AlertCircle } from 'lucide-react';
   6 |+import { inputs, colors } from '@/styles/design-tokens';
   7 | 
   8 | export function EmailForm() {
   9 |   const { status, submitForm, email, setEmail } = useEmailCaptureContext();
  10 | 
     |-  const handleSubmit = (e: React.FormEvent) => {
  11 |+  const handleSubmit = (e: FormEvent) => {
  12 |     e.preventDefault();
  13 |     submitForm(email);
  14 |   };
  15 | 
  16 |+  const [isValid, setIsValid] = useState(true);
  17 |+
  18 |+  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
  19 |+    const val = e.target.value;
  20 |+    setEmail(val);
  21 |+    if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
  22 |+      setIsValid(false);
  23 |+    } else {
  24 |+      setIsValid(true);
  25 |+    }
  26 |+  };
  27 |+
  28 |   return (
     |-    <Box as="form" onSubmit={handleSubmit} width="full" maxWidth="md" className="w-full md:w-auto">
  29 |+    <Box as="form" onSubmit={handleSubmit} width="full" maxWidth="md" className="w-full md:w-auto group">
  30 |       <Stack direction="row" gap={0} position="relative" className="w-full">
  31 |         <input
  32 |           type="email"
  33 |           placeholder="Email Address"
  34 |           value={email}
     |-          onChange={(e) => setEmail(e.target.value)}
  35 |+          onChange={handleEmailChange}
  36 |           required
  37 |           disabled={status === 'loading' || status === 'success'}
     |-          className={`${inputs.base} min-h-[44px] w-full`}
  38 |+          className={`${inputs.base} min-h-[44px] w-full ${!isValid ? inputs.error : ''}`}
  39 |         />
  40 |+        {!isValid && email && (
  41 |+          <Stack direction="row" align="center" gap={1} position="absolute" className={`-bottom-6 left-0 ${colors.text.danger}`}>
  42 |+             <AlertCircle className="w-3 h-3" />
  43 |+             <Text variant="mono" size="micro">INVALID_ENCODING</Text>
  44 |+          </Stack>
  45 |+        )}
  46 |         <Button
  47 |           type="submit"
  48 |           variant="primary"
```

### `src/features/email-capture/NewsletterBanner.tsx` (modified)
**Valid Comment Ranges (New File):** 19-32
```diff
@@ -19,10 +19,14 @@ export function NewsletterBanner() {
  19 |       className="bg-white/80 backdrop-blur-xl border border-line/50 rounded-none mx-auto"
  20 |       padding="emailBar"
  21 |       position="fixed"
     |-      style={{ bottom: 0, left: '1rem', right: '1rem', width: 'calc(100% - 2rem)' }}
  22 |+      inset="bottom"
  23 |+      marginX={4}
  24 |+      marginBottom={4}
  25 |+      radius="2xl"
  26 |+      shadow="topOverlay"
  27 |       zIndex="toast"
  28 |     >
     |-      <Box position="absolute" className="top-2 right-2" zIndex="docked">
  29 |+      <Box position="absolute" inset="right" padding={2} zIndex="docked">
  30 |         <Button
  31 |           variant="ghost"
  32 |           size="sm"
```

### `src/features/lab/BlogDrafter.tsx` (modified)
**Valid Comment Ranges (New File):** 1-6, 10-23, 146-155, 172-193
```diff
@@ -1,6 +1,6 @@
   1 | import { motion } from 'motion/react';
   2 | import { useState } from 'react';
     |-import { Github, FileText, Send, Terminal, ExternalLink, Info, Check } from 'lucide-react';
   3 |+import { Github, FileText, Send, Terminal, ExternalLink, Info, Copy, Check } from 'lucide-react';
   4 | import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
   5 | import { useBlogDrafter } from './useBlogDrafter';
   6 | import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
@@ -10,6 +10,14 @@ export function BlogDrafter() {
  10 |   const { data, updateField, markdownPreview, githubIssueUrl } = useBlogDrafter();
  11 |   const [copied, setCopied] = useState(false);
  12 | 
  13 |+  const wordCount = data.commentary.trim().split(/\s+/).filter(Boolean).length;
  14 |+
  15 |+  const handleCopyMarkdown = () => {
  16 |+    navigator.clipboard.writeText(markdownPreview);
  17 |+    setCopied(true);
  18 |+    setTimeout(() => setCopied(false), 2000);
  19 |+  };
  20 |+
  21 |   const handleCopyPrompt = () => {
  22 |     const prompt = `Task: Review and expand this blog post draft for Tech-Dancer.
  23 |       Current Data: ${JSON.stringify(data, null, 2)}
@@ -138,7 +146,10 @@ export function BlogDrafter() {
 146 |             </Stack>
 147 | 
 148 |             <Stack gap={2}>
     |-              <Text variant="mono" size="micro" color="dim">BODY_COMMENTARY</Text>
 149 |+              <Box display="flex" justify="between">
 150 |+                <Text variant="mono" size="micro" color="dim">BODY_COMMENTARY</Text>
 151 |+                <Text variant="mono" size="micro" color="dim">{wordCount} WORDS</Text>
 152 |+              </Box>
 153 |               <Box
 154 |                 as="textarea"
 155 |                 value={data.commentary}
@@ -161,9 +172,22 @@ export function BlogDrafter() {
 172 |         <Stack gap={8}>
 173 |           <Box border="b" paddingBottom={2} display="flex" justify="between" align="center">
 174 |              <Text variant="mono" size="micro" color="brand">MARKDOWN_PREVIEW</Text>
     |-             <Box display="flex" align="center" gap={2} color="dim">
     |-                <FileText className="w-3 h-3" />
     |-                <Text variant="mono" size="micro">v1.2.0</Text>
 175 |+             <Box display="flex" align="center" gap={4}>
 176 |+                <Box
 177 |+                  as="button"
 178 |+                  onClick={handleCopyMarkdown}
 179 |+                  display="flex"
 180 |+                  align="center"
 181 |+                  gap={1}
 182 |+                  className="hover:text-accent-brand transition-colors"
 183 |+                >
 184 |+                   {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
 185 |+                   <Text variant="mono" size="micro">{copied ? 'COPIED' : 'COPY MD'}</Text>
 186 |+                </Box>
 187 |+                <Box display="flex" align="center" gap={2} color="dim">
 188 |+                  <FileText className="w-3 h-3" />
 189 |+                  <Text variant="mono" size="micro">v1.2.0</Text>
 190 |+                </Box>
 191 |              </Box>
 192 |           </Box>
 193 | 
```

### `src/index.css` (modified)
**Valid Comment Ranges (New File):** 12-19, 68-77, 82-97, 116-128
```diff
@@ -12,8 +12,8 @@
  12 |   --safelist-py: py-0 py-1 py-2 py-3 py-4 py-5 py-6 py-8 py-10 py-12 py-16 py-20 py-24 py-32;
  13 | 
  14 |   /* Modern Typography Identity */
     |-  --font-sans: "Albert Sans", ui-sans-serif, system-ui, sans-serif;
     |-  --font-display: "Bricolage Grotesque", sans-serif;
  15 |+  --font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
  16 |+  --font-display: "Fraunces", serif;
  17 |   --font-mono: "Space Mono", monospace;
  18 | 
  19 |   /* Clean Content Palette (60-30-10 Rule) */
@@ -68,7 +68,10 @@
  68 | 
  69 |   /* Premium Industrial Utilities */
  70 |   .glass-panel {
     |-    @apply bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)];
  71 |+    @apply bg-white/70 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)];
  72 |+  }
  73 |+  .glass-card {
  74 |+    @apply bg-white/40 backdrop-blur-md border border-white/20 rounded-xl shadow-sm transition-all duration-300;
  75 |   }
  76 |   .industrial-gradient {
  77 |     background: linear-gradient(135deg, #001f3f 0%, #000c19 100%);
@@ -79,6 +82,16 @@
  82 |   .gold-accent {
  83 |     @apply border-accent/30 hover:border-accent transition-colors;
  84 |   }
  85 |+  .animated-underline {
  86 |+    @apply relative no-underline;
  87 |+  }
  88 |+  .animated-underline::after {
  89 |+    content: "";
  90 |+    @apply absolute bottom-0 left-1/2 w-0 h-[1px] bg-current transition-all duration-300 -translate-x-1/2;
  91 |+  }
  92 |+  .animated-underline:hover::after {
  93 |+    @apply w-full;
  94 |+  }
  95 |   .scanline-hover {
  96 |     @apply relative overflow-hidden;
  97 |   }
@@ -103,12 +116,13 @@
 116 |   body {
 117 |     @apply bg-bg text-text-body font-sans antialiased overflow-x-hidden w-full;
 118 |     line-height: 1.6;
 119 |+    letter-spacing: 0.01em;
 120 |   }
 121 | 
 122 |   h1, h2, h3, h4 {
 123 |     font-family: var(--font-display);
     |-    @apply text-accent-navy font-bold tracking-tight;
     |-    line-height: 1.2;
 124 |+    @apply text-accent-navy font-bold tracking-[-0.02em];
 125 |+    line-height: 1.1;
 126 |   }
 127 | 
 128 |   h1 { font-size: clamp(2.5rem, 8vw, 6rem); }
```

### `src/layouts/ContentDetail.tsx` (modified)
**Valid Comment Ranges (New File):** 1-4, 9-19, 59-65, 72-78
```diff
@@ -1,3 +1,4 @@
   1 |+import { useState, ReactNode } from 'react';
   2 | import { motion } from 'motion/react';
   3 | import { ArrowLeft, Clock, Tag, Share2 } from 'lucide-react';
   4 | import ReactMarkdown from 'react-markdown';
@@ -8,10 +9,11 @@ interface ContentDetailProps {
   9 |   post: ContentItem;
  10 |   onBack: () => void;
  11 |   backLabel: string;
     |-  children?: React.ReactNode;
  12 |+  children?: ReactNode;
  13 | }
  14 | 
  15 | export function ContentDetail({ post, onBack, backLabel, children }: ContentDetailProps) {
  16 |+  const [imgError, setImgError] = useState(false);
  17 |   const title = post.title;
  18 |   const content = post.content;
  19 | 
@@ -57,7 +59,7 @@ export function ContentDetail({ post, onBack, backLabel, children }: ContentDeta
  59 |             {title}
  60 |           </Text>
  61 | 
     |-          {image && (
  62 |+          {image && !imgError && (
  63 |             <Box
  64 |               as={motion.div}
  65 |               initial={{ opacity: 0, y: 20 }}
@@ -70,6 +72,7 @@ export function ContentDetail({ post, onBack, backLabel, children }: ContentDeta
  72 |               <img
  73 |                 src={image}
  74 |                 alt={title}
  75 |+                onError={() => setImgError(true)}
  76 |                 className="w-full h-full object-cover"
  77 |               />
  78 |             </Box>
```

### `src/layouts/Text.tsx` (modified)
**Valid Comment Ranges (New File):** 18-32, 50-56
```diff
@@ -18,14 +18,15 @@ export interface TextProps extends Omit<BaseProps, "align">, Omit<React.HTMLAttr
  18 |   uppercase?: boolean
  19 |   lowercase?: boolean
  20 |   capitalize?: boolean
  21 |+  italic?: boolean
  22 |   [key: string]: any
  23 | }
  24 | 
  25 | export const Text = React.forwardRef<HTMLElement, TextProps>(
  26 |   ({ 
  27 |     className, as: Component = "span", 
  28 |     variant, intent, color = "main", size, weight, align, tracking, 
     |-    uppercase, lowercase, capitalize,
  29 |+    uppercase, lowercase, capitalize, italic,
  30 |     ...props 
  31 |   }, ref) => {
  32 |     return (
@@ -49,6 +50,7 @@ export const Text = React.forwardRef<HTMLElement, TextProps>(
  50 |           uppercase && "uppercase",
  51 |           lowercase && "lowercase",
  52 |           capitalize && "capitalize",
  53 |+          italic && "italic",
  54 |           className
  55 |         )}
  56 |         {...props}
```

### `src/lib/variants.ts` (modified)
**Valid Comment Ranges (New File):** 1-4, 39-45, 67-86
```diff
@@ -1,4 +1,4 @@
     |-import { typography } from "@/styles/design-tokens";
   1 |+import { typography, colors } from "@/styles/design-tokens";
   2 | import { cva } from "class-variance-authority";
   3 | 
   4 | /**
@@ -39,7 +39,7 @@ export const variants = {
  39 | };
  40 | 
  41 | export const buttonVariants = cva(
     |-  "inline-flex items-center justify-center font-mono tracking-widest uppercase transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
  42 |+  "inline-flex items-center justify-center font-mono tracking-widest uppercase transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95",
  43 |   {
  44 |     variants: {
  45 |       variant: variants.emphasis,
@@ -67,6 +67,20 @@ export const buttonVariants = cva(
  67 |   }
  68 | );
  69 | 
  70 |+export const highlightVariants = cva("inline text-accent bg-accent/10 rounded-sm px-0.5", {
  71 |+  variants: {
  72 |+    intent: {
  73 |+      default: "text-accent bg-accent/10",
  74 |+      success: "text-accent-brand bg-accent-brand/10",
  75 |+      danger: `${colors.text.danger} ${colors.bg.danger}`,
  76 |+      warning: `${colors.text.warning} ${colors.bg.warning}`,
  77 |+    },
  78 |+  },
  79 |+  defaultVariants: {
  80 |+    intent: "default",
  81 |+  },
  82 |+});
  83 |+
  84 | export const badgeVariants = cva(
  85 |   "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border px-2 py-0.5 text-xs font-mono font-bold uppercase tracking-widest whitespace-nowrap transition-all rounded-[2px]",
  86 |   {
```

### `src/main.tsx` (modified)
**Valid Comment Ranges (New File):** 8-15
```diff
@@ -8,6 +8,8 @@ import { createRoot } from 'react-dom/client';
   8 | import { createBrowserRouter, RouterProvider } from 'react-router-dom';
   9 | import { HelmetProvider } from 'react-helmet-async';
  10 | import { routes } from './App.tsx';
  11 |+import "@fontsource-variable/inter";
  12 |+import "@fontsource/fraunces/index.css";
  13 | import './index.css';
  14 | 
  15 | /**
```

### `src/styles/design-tokens.ts` (modified)
**Valid Comment Ranges (New File):** 44-61, 70-76, 84-96, 158-163
```diff
@@ -44,6 +44,18 @@ export const animation = {
  44 | /**
  45 |  * Common Layout Primitives (encoded as Tailwind fragments)
  46 |  */
  47 |+export const colors = {
  48 |+  text: {
  49 |+    danger: "text-red-500",
  50 |+    warning: "text-amber-500",
  51 |+    success: "text-accent-brand",
  52 |+  },
  53 |+  bg: {
  54 |+    danger: "bg-red-500/10",
  55 |+    warning: "bg-amber-500/10",
  56 |+  }
  57 |+};
  58 |+
  59 | export const layout = {
  60 |   root: "flex min-h-screen bg-bg",
  61 |   navRail: "nav-rail hidden lg:flex flex-col justify-between min-h-screen sticky top-0",
@@ -58,6 +70,7 @@ export const layout = {
  70 | 
  71 | export const inputs = {
  72 |   base: "w-full bg-bg border border-line px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent transition-all",
  73 |+  error: "border-red-500 focus:border-red-500",
  74 |   label: "text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim block mb-2",
  75 |   select: "bg-bg border border-line px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-accent focus:outline-none focus:border-accent",
  76 | };
@@ -71,6 +84,13 @@ export const buttons = {
  84 | export const shadows = {
  85 |   topOverlay: "shadow-[0_-10px_40px_rgba(0,0,0,0.1)]",
  86 |   standard: "shadow-sm",
  87 |+  md: "shadow-md",
  88 |+  lg: "shadow-lg",
  89 |+  xl: "shadow-xl",
  90 |+  "2xl": "shadow-2xl",
  91 |+  // Layered shadows for depth
  92 |+  layered: "shadow-[0_1px_1px_rgba(0,0,0,0.05),0_2px_2px_rgba(0,0,0,0.05),0_4px_4px_rgba(0,0,0,0.05),0_8px_8px_rgba(0,0,0,0.05)]",
  93 |+  premium: "shadow-[0_20px_50px_rgba(0,0,0,0.1)]",
  94 | };
  95 | 
  96 | export const imageSizes = {
@@ -138,4 +158,6 @@ export const typeSizes = {
 158 |   "7xl": "text-5xl md:text-7xl",
 159 |   "8xl": "text-6xl md:text-8xl",
 160 |   "9xl": "text-7xl md:text-9xl",
 161 |+  "fluid-7": "text-4xl md:text-5xl lg:text-7xl",
 162 |+  "fluid-8": "text-5xl md:text-6xl lg:text-8xl",
 163 | };
```

### `src/styles/motion.ts` (modified)
**Valid Comment Ranges (New File):** 1-68
```diff
@@ -1,25 +1,68 @@
   1 | /**
     |- * Standardized Motion Tokens.
     |- * Ensures consistent transitions across the entire application shell.
   2 |+ * Centralized Motion Variants for tech-dancer.
   3 |+ * Defines "The Ariel Motion" - a high-end, bespoke feel for transitions.
   4 |  */
     |-export const motionTokens = {
     |-  page: {
     |-    initial: { opacity: 0, y: 8 },
     |-    animate: { opacity: 1, y: 0 },
     |-    exit: { opacity: 0 },
     |-    transition: { 
     |-      duration: 0.3, 
     |-      ease: [0.22, 1, 0.36, 1] as [number, number, number, number] 
     |-    }
     |-  },
     |-  overlay: {
     |-    initial: { y: 100 },
     |-    animate: { y: 0 },
     |-    exit: { y: 100 },
     |-    transition: { duration: 0.4, ease: "easeOut" }
   5 |+
   6 |+export const arielTransition = {
   7 |+  type: "spring",
   8 |+  damping: 25,
   9 |+  stiffness: 120,
  10 |+  mass: 0.8,
  11 |+};
  12 |+
  13 |+export const arielEase = [0.16, 1, 0.3, 1]; // easeOutExpo
  14 |+
  15 |+export const fadeIn = {
  16 |+  initial: { opacity: 0 },
  17 |+  animate: { opacity: 1 },
  18 |+  exit: { opacity: 0 },
  19 |+  transition: { duration: 0.4, ease: arielEase },
  20 |+};
  21 |+
  22 |+export const fadeInUp = {
  23 |+  initial: { opacity: 0, y: 20 },
  24 |+  animate: { opacity: 1, y: 0 },
  25 |+  exit: { opacity: 0, y: 20 },
  26 |+  transition: { duration: 0.5, ease: arielEase },
  27 |+};
  28 |+
  29 |+export const staggerContainer = {
  30 |+  animate: {
  31 |+    transition: {
  32 |+      staggerChildren: 0.05,
  33 |+    },
  34 |   },
     |-  hover: {
     |-    scale: 1.02,
     |-    transition: { duration: 0.2 }
     |-  }
  35 |+};
  36 |+
  37 |+export const scaleUp = {
  38 |+  initial: { opacity: 0, scale: 0.95 },
  39 |+  animate: { opacity: 1, scale: 1 },
  40 |+  exit: { opacity: 0, scale: 0.95 },
  41 |+  transition: { duration: 0.4, ease: arielEase },
  42 |+};
  43 |+
  44 |+export const slideInRight = {
  45 |+  initial: { opacity: 0, x: 30 },
  46 |+  animate: { opacity: 1, x: 0 },
  47 |+  exit: { opacity: 0, x: 30 },
  48 |+  transition: { duration: 0.5, ease: arielEase },
  49 |+};
  50 |+
  51 |+export const hoverLift = {
  52 |+  whileHover: { y: -4, transition: { duration: 0.2, ease: "easeOut" } },
  53 |+  whileTap: { scale: 0.98 },
  54 |+};
  55 |+
  56 |+export const motionTokens = {
  57 |+  arielTransition,
  58 |+  arielEase,
  59 |+  fadeIn,
  60 |+  fadeInUp,
  61 |+  staggerContainer,
  62 |+  scaleUp,
  63 |+  slideInRight,
  64 |+  hoverLift,
  65 |+  // Existing tokens expected by components
  66 |+  page: fadeInUp,
  67 |+  overlay: fadeInUp,
  68 | };
```

### `tailwind.config.js` (modified)
**Valid Comment Ranges (New File):** 26-34
```diff
@@ -26,6 +26,9 @@ export default {
  26 |         gradient: {
  27 |           '0%, 100%': { backgroundPosition: '0% 50%' },
  28 |           '50%': { backgroundPosition: '100% 50%' },
  29 |+        },
  30 |+        shimmer: {
  31 |+          '100%': { transform: 'translateX(100%)' },
  32 |         }
  33 |       },
  34 |       animation: {
```

### `ux_about.png` (added)
**Valid Comment Ranges (New File):** None (Binary or too large)
```diff
_No textual diff available._
```

### `ux_blog.png` (added)
**Valid Comment Ranges (New File):** None (Binary or too large)
```diff
_No textual diff available._
```
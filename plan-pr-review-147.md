# PR Review Plan: #147 — Home Page Densification and UX Improvements

<!-- PR_NUMBER: 147 -->

**Repo:** arii/tech-dancer — https://github.com/arii/tech-dancer/pull/147
**Stats:** +312/-329 across 20 file(s)

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

This PR implements a comprehensive redesign of the home page to improve information density and reduce scrolling friction, as per the Impeccable UX guidelines.

Key improvements:
- **Hero Section:** Reduced `min-h` from 60vh to 40vh and tightened padding to prevent viewport monopolization.
- **Welcome Text:** Relocated from a standalone block to a compact `py-2` banner.
- **Blog Feed:** Switched from oversized cards to a dense horizontal layout with small thumbnails and truncated text for better scannability.
- **Components/Tools:** Introduced a 'Featured Tools' section that displays only the top 6 items, linking to the full research page to avoid 'Cardocalypse'.

Verified via E2E tests, build checks, and visual screenshot audits.

Fixes #144

---
*PR created automatically by Jules for task [4810714947161146801](https://jules.google.com/task/4810714947161146801) started by @arii*

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

- `[R]` [plan.md](https://github.com/arii/tech-dancer/pull/147/files) `+0/-221`
- `[M]` [src/components/Navigation.tsx](https://github.com/arii/tech-dancer/pull/147/files) `+1/-1`
- `[M]` [src/components/ui/ContentCard.tsx](https://github.com/arii/tech-dancer/pull/147/files) `+11/-9`
- `[M]` [src/components/ui/FilterBar.tsx](https://github.com/arii/tech-dancer/pull/147/files) `+2/-2`
- `[M]` [src/components/ui/FolioGrid.tsx](https://github.com/arii/tech-dancer/pull/147/files) `+23/-15`
- `[M]` [src/components/ui/PageHeader.tsx](https://github.com/arii/tech-dancer/pull/147/files) `+1/-1`
- `[M]` [src/components/ui/PathSelector.tsx](https://github.com/arii/tech-dancer/pull/147/files) `+83/-28`
- `[M]` [src/components/ui/card.tsx](https://github.com/arii/tech-dancer/pull/147/files) `+1/-2`
- `[M]` [src/features/dashboard/Dashboard.tsx](https://github.com/arii/tech-dancer/pull/147/files) `+87/-20`
- `[M]` [src/features/dashboard/useHome.ts](https://github.com/arii/tech-dancer/pull/147/files) `+3/-13`
- `[M]` [src/features/research/ResearchDetail.tsx](https://github.com/arii/tech-dancer/pull/147/files) `+1/-1`
- `[M]` [src/index.css](https://github.com/arii/tech-dancer/pull/147/files) `+7/-0`
- `[M]` [src/layouts/ContentDetail.tsx](https://github.com/arii/tech-dancer/pull/147/files) `+1/-1`
- `[M]` [src/layouts/Grid.tsx](https://github.com/arii/tech-dancer/pull/147/files) `+13/-2`
- `[M]` [src/layouts/MainLayout.tsx](https://github.com/arii/tech-dancer/pull/147/files) `+6/-5`
- `[M]` [src/lib/variants.ts](https://github.com/arii/tech-dancer/pull/147/files) `+6/-6`
- `[M]` [src/styles/motion.ts](https://github.com/arii/tech-dancer/pull/147/files) `+6/-2`
- `[A]` [src/styles/tokens.css](https://github.com/arii/tech-dancer/pull/147/files) `+8/-0`
- `[M]` [tailwind.config.js](https://github.com/arii/tech-dancer/pull/147/files) `+38/-0`
- `[A]` [tests/verify_final.spec.ts](https://github.com/arii/tech-dancer/pull/147/files) `+14/-0`

---

## Per-File Audit

Note: Do NOT skip any file. Leave a comment for every file, even if clean.


<!-- BEGIN_FILE_AUDIT: plan.md -->
---

### File: `plan.md` +0/-221 (removed)

Diff:
```diff
@@ -1,221 +0,0 @@
-Desired website content:
-Website format and content
-Home page: 
-The Roboticist's Guide to the West Coast Swing
-Tools, travel hacks, and comp data to maximize your WCS weekends. Providing the systems, travel hacks, and informed competition analysis you need to maximize your WCS (West Coast Swing) lifestyle.
-Welcome to tech-dancer.   Enjoy the west coast swing content or dive into the technical details. (can use an asymmetrical feature grid to separate these paths transitions to color on hover with a "scanning" scanline effect)
-Are you a dancer? 
-→ Lifestyle blog posts
-→ Gear reviews 
-Are you looking to hire a roboticist or AI expert?
-→ Tech blog posts 
-→ Data and Development Lab
-—> About/Contact page
-Highlight some recent blog posts as cards
-Blog Posts
-The page is organized into a searchable, categorized "Folio" layout. It prioritizes high-contrast headers and a clean grid, removing non-functional decorative elements like "system status" widgets.
-Global Search Hub: A prominent search box at the top of the page allowing users to filter by keywords across all categories.
-Primary Navigation Sections
-Gear reviews:  every gear review card expands to an actual blog post. This section is only for sharing products people can purchase (affiliate link items)
-Travel/Lifestyle: mental health, financial literacy
-Credit card analysis for different WCS events 
-Post: Why I have the Amex Platninum and Hyatt card
-Financial literacy
-Note this a post for dancers to remove liability of financial feedback, make sure people use credit cards as debit cards.  Recommend signing up for a Roth IRA and get rid of FOMO. Dont attend events outside your means etc.  I don’t want to share any credit card referral links without adding this post 
-All about west coast swing
-Post: ignore competition scores and focus on your results – set granular measurable metrics for competitions, record comp videos, and objective analysis 
-Post: the majority of above average dancers don’t make it to finals  (this likely lists to an item in the data and development section) 
-Post: Why  I am attending Jack & Jill O’Rama 
-Include links to gear reviews since Nor Cal competes as a team with a rainbow them
-Post: Halloween costumes you can dance in
-Pumpkin outf	it with links to gear reviews that includes the headband and jack o lantern stickers
-Post: Make any shoe a dance shoe 
-Suede your dance shoes 
-Potential options and analysis:
-split the sticker to  have some on the ball of foot and some on the heel
-Just ball of the foot sticker placement
-Entire sticker coverage  (I like this best)
-
-Tech: portfolio posts that are for a technical audience .  These should inspire tech people to hire me for consultant or project based work.
-Every data lab item will have a corresponding post that is layman description 
-how I used github actions to power this site
-May include a review of personal thoughts regarding some tech aspect of the industry
-Eg the role of AI in Dance (could be cross listed in all about west coast swing)
-Eg Pivoting to consulting and project based work (pun intended)
-Ai powered content creation and development: 
- Data analytics, blog posts, etc are generated using AI with human feedback in the loop
-How I use Jules
-Gear Reviews
-An easy searchable format for looking up products I recommend see Affiliate links to create 3 stock gear reviews posts
-Card based grids (search item) with different rows
-Dance equipment
-Fashion
-Travel Related
-Other
-
-Data & Development Lab
-These are sophisticated pages for interactive data science, software development,  etc. You can add these initial pages:
-[coming soon] SEO analysis and engagement of tech-dancer 
-Drafter tool to generate blog posts
-[coming soon] WCS prelim scoring data scraper
-Flight finder for WCS events
-About / Contact
-
-About tech-dancer
-Ariel Anders, PhD
-MIT Roboticist // WCS Tech-Dancer
-My Dance Journey
-I started my journey into partner dance in 2019 with Lindy Hop and Fusion. After a pause from 2020 through 2022, I moved to San Francisco and got back into the swing of things at Lindy in the Park. Seeking a new challenge, I signed up for a series at Mission City Swing—and realized it wasn't Lindy Hop! The music, like 'In Da Club' by 50 Cent, was so much fun that I started dancing both styles. Attending West Coast Swing (WCS) events became a fantastic way for me to travel again after the pandemic. WCS gradually became my primary focus, but you can still find me Lindy Hopping to live Swing music in SF. I'm a competitive Intermediate-level follow (and an occasional lead!) who loves the unique conversation and connection WCS offers.
-Why My PhD Matters
-I build reliable systems, both in tech and for my dance travel.
-Why I Built This Site
-People often ask me, 'Where did you get that outfit?' and 'How can you afford to travel to so many events?' I am fortunate to have a strong career, but I have always focused on making my lifestyle as financially efficient as possible. This site is how I share the 'stacks' I've built—everything from curated gear reviews to my travel-hacking systems.
-Financial Strategies for WCS
-I love maximizing credit card perks and hotel benefits, which helps me make the convention circuit lifestyle both high-end and entirely feasible. I'm known for my bright, fun outfits and my 'bougie on a budget' travel philosophy.
-View Full Professional Background
-Contact Page
-Have a burning analytical question regarding WCt? Want a lifestyle post about financial literacy or building community t? Or just have feedback on a gear review? I'd love to hear from you.
-
-
-
-----
-
-checklist:
-
-Agent Guidelines: The Gold Standard Vite App
-
-This document serves as the primary instruction set for building and maintaining projects within this ecosystem. All code generated or refactored must adhere to these standards.
-
-1. Project Role & Architecture
-
-You are the Coding partner for tech-dancer. Your goal is to produce high-quality, production-ready Vite + React + TypeScript applications that are performant, accessible, and aesthetically superior.
-
-Feature-Based Structure
-
-For apps larger than a few pages, use a feature-based folder structure:
-
-src/assets/: Static files.
-
-src/components/: Shared/reusable UI components.
-
-src/features/: Feature modules (components, hooks, types per feature).
-
-src/hooks/: Global custom hooks.
-
-src/lib/: Utilities, API clients (TanStack Query setup).
-
-src/pages/: Route-level page components.
-
-src/store/: Global state (Zustand).
-
-src/styles/: Global CSS and tokens.css.
-
-src/types/: Shared TypeScript interfaces.
-
-2. Styling & Design Standards (Prevention of "Tailwind Everywhere")
-
-To prevent unmaintainable "class soup" and ensure visual consistency, follow this strict styling hierarchy:
-
-Rule 1: Design Tokens First
-
-Never use arbitrary values in Tailwind (e.g., bg-[#1a1a2e]).
-
-All core design values (colors, spacing, shadows, typography) must be defined as CSS variables in src/styles/tokens.css.
-
-Map these variables in tailwind.config.ts so they are accessible via semantic names (e.g., bg-primary, text-accent).
-
-Rule 2: Componentize Repeated Styles
-
-If a set of Tailwind classes is repeated more than twice, it must be extracted:
-
-Small primitives: Create a dedicated UI component (e.g., Button.tsx, Badge.tsx).
-
-Complex variants: Use cva (Class Variance Authority) to manage state-based styling (hover, active, disabled) instead of long conditional strings.
-
-Rule 3: Tailwind vs. CSS Modules
-
-Use Tailwind for: Layout (flex, grid), spacing (margin, padding), and simple atomic changes.
-
-Use CSS Modules for: Complex animations, Complex CSS (::before, ::after), or when a component requires more than 10-15 utility classes.
-
-Strict Prohibition: No more than 3 levels of nested divs with heavy Tailwind classes in a single file. Break them into sub-components.
-
-Rule 4: Aesthetic Principles
-
-Typography: Pair a high-character Display font with a neutral Body font.
-
-Spatial Layout: Avoid rigid grids. Use intentional asymmetry and generous whitespace (min p-6 or p-8 for containers).
-
-Refinement: Use subtle borders (border-white/10) and layered shadows over solid colors.
-
-3. Technical Stack Standards
-
-TypeScript
-
-Strict Mode: Always enabled.
-
-Typing: No any. Explicitly type props and API responses.
-
-Pattern: Use satisfies for type safety; prefer interface for objects and type for unions.
-
-State & Data
-
-Global: Zustand.
-
-Server: TanStack Query (React Query). Use lib/api/ for fetch functions.
-
-URL: useSearchParams for shareable UI states (filters, tabs).
-
-4. Component Design Patterns
-
-Single Responsibility: One component = one job.
-
-Logic Extraction: Side effects and complex logic belong in custom hooks, not the component body.
-
-Performance: Use lazy + Suspense for routes. Avoid premature useMemo.
-
-Assets: SVGs as React components; lazy load all images.
-
-5. Deployment: GitHub Pages & Actions
-
-Vite Config
-
-// vite.config.ts
-export default defineConfig({
-  base: process.env.VITE_BASE_PATH ?? '/', // Must match repo name in prod
-  plugins: [react()],
-  resolve: { alias: { '@': path.resolve(__dirname, './src') } }
-})
-
-
-Critical Files
-
-public/.nojekyll: Mandatory.
-
-Routing: Use Hash Routing (createHashRouter) for zero-config compatibility. If using History API, public/404.html is required.
-
-CI/CD
-
-ci.yml: Run on PRs. Steps: npm ci, lint, type-check (tsc --noEmit), test.
-
-deploy.yml: Use actions/deploy-pages@v4.
-
-6. Testing Protocol
-
-Runner: Vitest.
-
-Pattern: Test user behavior (roles/labels), not implementation details (classes).
-
-Location: Co-locate .test.tsx files.
-
-7. Clarification Protocol
-
-Before starting, confirm:
-
-Styling: Tailwind primitives or CSS Modules for this specific complexity?
-
-Repo Name: For the Vite base path.
-
-State: Is this local useState or should it be in the Zustand store?
-
-Follow these rules strictly to maintain project integrity.
\ No newline at end of file
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
  "path": "plan.md",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "plan.md",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: plan.md -->


<!-- BEGIN_FILE_AUDIT: src/components/Navigation.tsx -->
---

### File: `src/components/Navigation.tsx` +1/-1 (modified)

Diff:
```diff
@@ -51,7 +51,7 @@ export default function Navigation() {
           as="button"
           onClick={() => setIsOpen(!isOpen)}
           padding={2}
-          className="min-h-[44px] min-w-[44px] flex items-center justify-center"
+          className="min-h-[48px] min-w-[48px] flex items-center justify-center"
           aria-label={isOpen ? "Close menu" : "Open menu"}
           aria-expanded={isOpen}
         >
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


<!-- BEGIN_FILE_AUDIT: src/components/ui/ContentCard.tsx -->
---

### File: `src/components/ui/ContentCard.tsx` +11/-9 (modified)

Diff:
```diff
@@ -62,26 +62,28 @@ export function ContentCard({ slug, title, category, excerpt, date, image, baseP
       </Box>
 
       {/* Content Area */}
-      <Stack gap={5} className="p-6 lg:p-8" flex={1} justify="between">
-        <Stack gap={4}>
-          <Text variant="mono" size="xs" color="dim" uppercase className="tracking-[0.15em]">
-            {date}
-          </Text>
+      <Stack gap={4} className="p-5 lg:p-6" flex={1} justify="between">
+        <Stack gap={2}>
+          {date && (
+            <Text variant="mono" size="micro" color="dim" uppercase className="tracking-[0.15em]">
+              {date}
+            </Text>
+          )}
           <Text 
             variant="display" 
-            size="xl" 
+            size="lg"
             weight="font-black" 
             className="text-accent-navy leading-snug group-hover:text-accent transition-colors"
           >
             {title}
           </Text>
-          <Text variant="body" size="base" color="dim" className="line-clamp-2 leading-relaxed">
+          <Text variant="body" size="sm" color="dim" className="line-clamp-2 leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              {excerpt || `Discover the technical intersections of robotics and dance in this deep dive into ${category.toLowerCase()} methodology and engineering principles.`}
           </Text>
         </Stack>
 
-        <Box display="flex" align="center" gap={2} paddingTop={6} className="border-t border-slate-100 mt-auto">
-          <Text variant="mono" size="xs" className="text-accent font-semibold uppercase tracking-[0.15em]">
+        <Box display="flex" align="center" gap={2} paddingTop={4} className="border-t border-line mt-auto">
+          <Text variant="mono" size="micro" className="text-accent font-semibold uppercase tracking-[0.15em]">
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

### File: `src/components/ui/FilterBar.tsx` +2/-2 (modified)

Diff:
```diff
@@ -17,10 +17,10 @@ export function FilterBar({ activeCategory, categories, onSelect }: FilterBarPro
             as="button"
             onClick={() => onSelect(cat)}
             paddingX={6}
-            paddingY={2.5}
+            height={12}
             radius="full"
             className={cn(
-              "transition-all duration-300 border text-sm font-bold tracking-tight",
+              "transition-all duration-300 border text-sm font-bold tracking-tight flex items-center justify-center",
               activeCategory === cat
                 ? "bg-accent text-white border-accent shadow-sm"
                 : "bg-bg text-text-dim border-line hover:border-accent hover:text-accent"
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

### File: `src/components/ui/FolioGrid.tsx` +23/-15 (modified)

Diff:
```diff
@@ -57,21 +57,29 @@ export default function FolioGrid({ items, categoryTitle, basePath, label, descr
             </Box>
           ))
         ) : (
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
+          filteredItems.map((item, index) => {
+            // Implement asymmetric grid logic: every 3rd or 4th item spans two columns on large screens
+            const isAsymmetric = index % 3 === 0 || index % 4 === 0;
+            const spanClass = index === 0
+              ? "col-span-full xl:col-span-2"
+              : (isAsymmetric ? "lg:col-span-2" : "lg:col-span-1");
+
+            return (
+              <Box
+                key={item.slug}
+                border="r"
+                borderBottom={true}
+                padding={8}
+                className={`hover:bg-card-bg transition-colors group ${spanClass}`}
+              >
+                <ContentCard
+                  {...item}
+                  basePath={basePath}
+                  aspect="video"
+                />
+              </Box>
+            );
+          })
         )}
       </Grid>
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


<!-- BEGIN_FILE_AUDIT: src/components/ui/PageHeader.tsx -->
---

### File: `src/components/ui/PageHeader.tsx` +1/-1 (modified)

Diff:
```diff
@@ -13,7 +13,7 @@ export function PageHeader({ label, title, description }: PageHeaderProps) {
         <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase className="tracking-[0.15em]">
           {label}
         </Text>
-        <Text variant="headline" size="fluid-7" weight="font-black" className="text-accent-navy leading-tight tracking-tight text-balance">
+        <Text as="h1" variant="headline" size={{ base: '5xl', md: '7xl' }} weight="font-black" className="text-accent-navy leading-tight tracking-tight text-balance">
           {title}
         </Text>
         {description && (
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

### File: `src/components/ui/PathSelector.tsx` +83/-28 (modified)

Diff:
```diff
@@ -1,15 +1,18 @@
 import { useState } from 'react';
 import { NavLink } from 'react-router-dom';
+import { Box, Grid, Stack, Text } from '@/layouts/Primitives';
+import { cn } from '@/lib/utils';
 
 type PathID = 'dancer' | 'roboticist';
 
 const PATH_DATA = [
   {
     id: 'dancer' as PathID,
     title: 'ARE YOU A DANCER?',
-    wrapperClass: 'lg:col-span-7 border-r border-line/20',
+    span: { base: 1, lg: 7 } as const,
+    lgBorder: { r: true } as const,
     bgGradient: 'bg-gradient-to-br',
-    titleClass: 'text-4xl md:text-6xl',
+    titleSize: { base: '3xl', lg: '5xl' } as const,
     links: [
       { text: 'Lifestyle blog posts', to: '/blog?category=Lifestyle' },
       { text: 'Gear reviews', to: '/gear' },
@@ -18,9 +21,9 @@ const PATH_DATA = [
   {
     id: 'roboticist' as PathID,
     title: 'HIRING A ROBOTICIST?',
-    wrapperClass: 'lg:col-span-5',
+    span: { base: 1, lg: 5 } as const,
     bgGradient: 'bg-gradient-to-bl',
-    titleClass: 'text-3xl md:text-5xl',
+    titleSize: { base: '2xl', lg: '4xl' } as const,
     scanlineDelay: 'delay-100',
     links: [
       { text: 'Tech blog posts', to: '/blog?category=Tech' },
@@ -32,59 +35,111 @@ const PATH_DATA = [
 export default function PathSelector() {
   const [hoveredPath, setHoveredPath] = useState<PathID | null>(null);
 
+  const handleVibrate = () => {
+    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
+      navigator.vibrate(15);
+    }
+  };
+
   return (
-    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-y border-line min-h-[60vh] w-full bg-black">
+    <Grid
+      as="section"
+      role="img"
+      aria-label="Interactive generative tech-dancer visualization: Choose between Dancer and Roboticist paths"
+      cols={{ base: 1, lg: 12 }}
+      gap={0}
+      border="y"
+      minHeight="30vh"
+      width="full"
+      className="bg-black touch-manipulation"
+    >
       {PATH_DATA.map((path) => {
         const isHovered = hoveredPath === path.id;
         const isOtherHovered = hoveredPath !== null && !isHovered;
 
         return (
-          <div
+          <Box
             key={path.id}
-            className={`${path.wrapperClass} relative group overflow-hidden cursor-pointer`}
+            span={path.span}
+            lgBorder={path.lgBorder as any}
+            position="relative"
+            overflow="hidden"
+            cursor="pointer"
+            className="group touch-manipulation"
             onMouseEnter={() => setHoveredPath(path.id)}
             onMouseLeave={() => setHoveredPath(null)}
+            onClick={handleVibrate}
           >
             {/* Background */}
-            <div
-              className={`absolute inset-0 ${path.bgGradient} from-accent/30 to-black transition-all duration-700 ease-in-out ${
+            <Box
+              position="absolute"
+              inset
+              className={cn(
+                path.bgGradient,
+                "from-accent/30 to-black transition-all duration-700 ease-in-out",
                 isOtherHovered ? 'grayscale opacity-60' : 'opacity-100'
-              }`}
-            ></div>
+              )}
+            />
 
             {/* Scanline */}
-            <div
-              className={`absolute left-0 top-0 w-full h-[2px] bg-accent shadow-[0_0_15px_#FF7F50] z-10 pointer-events-none transition-opacity duration-500 ${
-                path.scanlineDelay || ''
-              } ${isHovered ? 'opacity-100 animate-scanline' : 'opacity-0'}`}
-            ></div>
+            <Box
+              position="absolute"
+              inset="top"
+              height="[2px]"
+              zIndex={10}
+              className={cn(
+                "bg-accent shadow-[0_0_15px_#FF7F50] pointer-events-none transition-opacity duration-500",
+                path.scanlineDelay,
+                isHovered ? 'opacity-100 motion-safe:animate-scanline' : 'opacity-0'
+              )}
+            />
 
             {/* Content Container */}
-            <div className="relative z-20 p-12 h-full flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
-              <h2
-                className={`${path.titleClass} font-display font-black mb-4 text-white transition-transform duration-500 group-hover:translate-x-2`}
+            <Stack
+              position="relative"
+              zIndex={20}
+              padding={{ base: 6, md: 8 }}
+              height="full"
+              justify="end"
+              className="bg-gradient-to-t from-black/80 via-black/20 to-transparent"
+            >
+              <Text
+                as="h2"
+                variant="display"
+                size={path.titleSize}
+                weight="font-black"
+                color="white"
+                className="transition-transform duration-500 group-hover:translate-x-2 mb-3"
               >
                 {path.title}
-              </h2>
-              <ul className="space-y-4 mb-6 font-mono text-sm tracking-widest uppercase text-white font-bold opacity-80 group-hover:opacity-100 transition-opacity duration-500 delay-75">
+              </Text>
+
+              <Box as="ul" className="space-y-2 mb-2">
                 {path.links.map((link) => (
                   <li key={link.text}>
-                    <NavLink
-                      className="hover:text-accent transition-colors flex items-center gap-2"
+                    <Text
+                      as={NavLink}
                       to={link.to}
+                      variant="mono"
+                      size={{ base: 'xs', md: 'sm' }}
+                      tracking="widest"
+                      uppercase
+                      weight="font-bold"
+                      color="white"
+                      className="opacity-80 group-hover:opacity-100 transition-opacity hover:text-accent flex items-center gap-2"
                     >
                       <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">
                         →
                       </span>{' '}
                       {link.text}
-                    </NavLink>
+                    </Text>
                   </li>
                 ))}
-              </ul>
-            </div>
-          </div>
+              </Box>
+            </Stack>
+          </Box>
         );
       })}
-    </div>
+    </Grid>
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


<!-- BEGIN_FILE_AUDIT: src/components/ui/card.tsx -->
---

### File: `src/components/ui/card.tsx` +1/-2 (modified)

Diff:
```diff
@@ -9,11 +9,10 @@ function Card({
 }: React.ComponentProps<typeof Box> & { size?: "default" | "sm" }) {
   return (
     <Box
-      border
       radius="none"
       surface="default"
       className={cn(
-        "group/card flex flex-col overflow-hidden text-sm",
+        "group/card flex flex-col overflow-hidden text-sm border border-line/30 shadow-sm transition-shadow hover:shadow-md",
         size === "default" ? "gap-4 p-8" : "gap-3 p-4",
         className
       )}
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
  "path": "src/components/ui/card.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/components/ui/card.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/components/ui/card.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/dashboard/Dashboard.tsx -->
---

### File: `src/features/dashboard/Dashboard.tsx` +87/-20 (modified)

Diff:
```diff
@@ -1,6 +1,6 @@
 import { motion } from 'motion/react';
 import { NavLink } from 'react-router-dom';
-import { Zap, ArrowRight, Shield, Calendar } from 'lucide-react';
+import { ArrowRight } from 'lucide-react';
 import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
 import { useHome } from './useHome';
 import { PageHeader, SectionHeader } from '@/components/ui/PageHeader';
@@ -9,35 +9,38 @@ import { ContentCard } from '@/components/ui/ContentCard';
 import { EventCard } from './EventCard';
 
 export default function Home() {
-  const { recentPosts, upcomingEvents, dancerPaths, hirePaths } = useHome();
+  const { recentPosts, upcomingEvents, tools } = useHome();
 
   return (
     <Box as="section">
-      <Stack gap={24}>
-        <Stack gap={12} paddingTop={12}>
+      <Stack gap={8}>
+        <Stack gap={6} paddingTop={12}>
           <Stack gap={4}>
             <Text 
               as={motion.h1}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               variant="headline" 
-              size="fluid-7"
+              size={{ base: '5xl', md: '7xl' }}
               className="text-accent-navy leading-tight tracking-tight max-w-4xl"
             >
               The Roboticist&apos;s Guide to the West Coast Swing
             </Text>
             <Text variant="sans" size="xl" color="dim" maxWidth="3xl" className="leading-relaxed">
               Tools, travel hacks, and comp data to maximize your WCS weekends. Providing the systems, travel hacks, and informed competition analysis you need to maximize your WCS (West Coast Swing) lifestyle.
             </Text>
-            <Text variant="sans" size="base" color="dim" maxWidth="2xl" marginTop={2} className="leading-relaxed">
-              Welcome to tech-dancer. Enjoy the west coast swing content or dive into the technical details.
-            </Text>
           </Stack>
         </Stack>
 
         <PathSelector />
 
-        <Stack gap={12}>
+        <Box paddingY={2} border="b" className="bg-surface-alt/30">
+          <Text variant="sans" size="sm" color="dim" align="center" className="block">
+            Welcome to tech-dancer. Enjoy the west coast swing content or dive into the technical details.
+          </Text>
+        </Box>
+
+        <Stack gap={6}>
           <SectionHeader label="LATEST UPDATES" title="Recent Blog Posts">
             <Box 
               as={NavLink} 
@@ -52,21 +55,85 @@ export default function Home() {
             </Box>
           </SectionHeader>
 
-          <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={4}>
+          <Stack gap={0}>
             {recentPosts.map((post) => (
-              <ContentCard 
+              <Box
                 key={post.slug}
-                {...post}
-                basePath="/blog"
-                aspect="video"
-              />
+                as={NavLink}
+                to={`/blog/${post.slug}`}
+                display="flex"
+                gap={4}
+                align="center"
+                paddingY={4}
+                border="b"
+                className="group transition-all"
+              >
+                {/* Small, fixed-size thumbnail */}
+                <Box width={{ base: 20, md: 24 }} height={{ base: 20, md: 24 }} shrink={0} radius="industrial" className="bg-surface-alt border border-line overflow-hidden">
+                   {post.image ? (
+                     <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
+                   ) : (
+                     <Box height="full" width="full" display="flex" align="center" justify="center" opacity={10}>
+                       <Text variant="display" size="lg">TD</Text>
+                     </Box>
+                   )}
+                </Box>
+                {/* Compact textual information */}
+                <Box flex className="min-w-0">
+                  <Stack gap={1}>
+                    <Box display="flex" align="center" gap={2}>
+                      <Text variant="mono" size="micro" color="brand" opacity={60} uppercase weight="font-bold">{post.category}</Text>
+                      <Text variant="mono" size="micro" color="dim" opacity={60}>• {post.date}</Text>
+                    </Box>
+                    <Text size="base" weight="font-bold" className="group-hover:text-accent transition-colors truncate">{post.title}</Text>
+                    <Text variant="sans" size="sm" color="dim" className="truncate opacity-60">{post.excerpt}</Text>
+                  </Stack>
+                </Box>
+                <ArrowRight className="w-4 h-4 text-text-dim group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
+              </Box>
             ))}
+          </Stack>
+
+          {/* Featured Tools Grid */}
+          <Stack gap={6}>
+            <SectionHeader label="LABORATORY" title="Featured Tools">
+              <Box
+                as={NavLink}
+                to="/research"
+                display="flex"
+                align="center"
+                gap={3}
+                className="text-text-dim hover:text-accent transition-colors"
+              >
+                <Text variant="mono" size="xs" weight="font-bold">Explore Lab</Text>
+                <ArrowRight className="w-4 h-4" />
+              </Box>
+            </SectionHeader>
+            <Grid cols={{ base: 1, sm: 2, md: 3 }} gap={4}>
+              {tools.slice(0, 6).map((tool: any) => (
+                <ContentCard
+                  key={tool.id}
+                  slug={tool.id}
+                  title={tool.name}
+                  category={tool.category}
+                  excerpt={tool.layman}
+                  basePath="/research"
+                  aspect="square"
+                />
+              ))}
+            </Grid>
+          </Stack>
+
+          {/* Upcoming Events Section - Now more distinct */}
+          <Stack gap={6}>
+            <SectionHeader label="ON THE CALENDAR" title="Upcoming Events" />
+            <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={4}>
+              {upcomingEvents.map((event) => (
+                <EventCard key={event.name} {...event} />
+              ))}
+            </Grid>
+          </Stack>
 
-            {/* Upcoming Events Mini-Cards */}
-            {upcomingEvents.map((event) => (
-              <EventCard key={event.name} {...event} />
-            ))}
-          </Grid>
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


<!-- BEGIN_FILE_AUDIT: src/features/dashboard/useHome.ts -->
---

### File: `src/features/dashboard/useHome.ts` +3/-13 (modified)

Diff:
```diff
@@ -2,6 +2,7 @@ import { useNavigate } from 'react-router-dom';
 import { useState, useEffect } from 'react';
 import { getPosts, Post } from '@/lib/content';
 import { Home as HomeIcon } from 'lucide-react';
+import { useResearch } from '../research/useResearch';
 
 export const upcomingEvents = [
   { name: 'Mission City Swing', date: 'Every Wednesday', status: 'Local Regular', icon: HomeIcon },
@@ -10,32 +11,21 @@ export const upcomingEvents = [
 export function useHome() {
   const navigate = useNavigate();
   const [recentPosts, setRecentPosts] = useState<Post[]>([]);
+  const { tools } = useResearch();
 
   useEffect(() => {
     const allPosts = getPosts();
     setRecentPosts(allPosts.slice(0, 3));
   }, []);
 
-  const dancerPaths = [
-    { label: "Lifestyle blog posts", path: "/blog?category=Travel/Lifestyle" },
-    { label: "Gear reviews", path: "/gear" }
-  ];
-
-  const hirePaths = [
-    { label: "Tech blog posts", path: "/blog?category=Tech" },
-    { label: "Data and Development Lab", path: "/research" },
-    { label: "About/Contact page", path: "/about" }
-  ];
-
   const handleNavigateToBlog = () => navigate('/blog');
   const handleNavigateToPost = (slug: string) => navigate(`/blog/${slug}`);
   const handleNavigate = (path: string) => navigate(path);
 
   return { 
     recentPosts, 
     upcomingEvents,
-    dancerPaths,
-    hirePaths,
+    tools: tools.slice(0, 6),
     handleNavigateToBlog,
     handleNavigateToPost,
     handleNavigate
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
  "path": "src/features/dashboard/useHome.ts",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/dashboard/useHome.ts",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/dashboard/useHome.ts -->


<!-- BEGIN_FILE_AUDIT: src/features/research/ResearchDetail.tsx -->
---

### File: `src/features/research/ResearchDetail.tsx` +1/-1 (modified)

Diff:
```diff
@@ -53,7 +53,7 @@ export default function ResearchDetail() {
                   <Text variant="mono" color="brand" size="xs" weight="font-bold" uppercase tracking="widest">
                     LABORATORY_ACCESS // {tool.category.toUpperCase()}
                   </Text>
-                  <Text variant="headline" size="fluid-7">{tool.name}</Text>
+                  <Text variant="headline" size={{ base: '5xl', md: '7xl' }}>{tool.name}</Text>
                   <Box border surface="accent" padding="compact" opacity={5} className="bg-accent/5">
                     <Text variant="body" size="lg" color="body">{tool.layman}</Text>
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


<!-- BEGIN_FILE_AUDIT: src/index.css -->
---

### File: `src/index.css` +7/-0 (modified)

Diff:
```diff
@@ -1,4 +1,5 @@
 @import "tailwindcss";
+@import "./styles/tokens.css";
 
 @theme {
   /* Modern Typography Identity */
@@ -97,6 +98,12 @@
     max-width: 65ch;
     @apply text-text-body break-words;
   }
+
+  /* Global Focus Styles for Accessibility */
+  :focus-visible {
+    outline: 2px solid var(--color-accent);
+    outline-offset: 2px;
+  }
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
  "path": "src/index.css",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/index.css",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/index.css -->


<!-- BEGIN_FILE_AUDIT: src/layouts/ContentDetail.tsx -->
---

### File: `src/layouts/ContentDetail.tsx` +1/-1 (modified)

Diff:
```diff
@@ -53,7 +53,7 @@ export function ContentDetail({ post, onBack, backLabel, children }: ContentDeta
             )}
           </Box>
 
-          <Text variant="headline" size="fluid-8" className="tracking-tighter leading-none">
+          <Text as="h1" variant="headline" size="fluid-8" className="tracking-tighter leading-none">
             {title}
           </Text>
 
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
  "path": "src/layouts/ContentDetail.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/layouts/ContentDetail.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/layouts/ContentDetail.tsx -->


<!-- BEGIN_FILE_AUDIT: src/layouts/Grid.tsx -->
---

### File: `src/layouts/Grid.tsx` +13/-2 (modified)

Diff:
```diff
@@ -10,13 +10,24 @@ interface GridProps extends BoxProps {
 
 export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
   ({ className, cols = 12, rows, ...props }, ref) => {
+    const colMapper = (v: any) => {
+      if (typeof v === 'number' && v <= 12) return v
+      if (typeof v === 'number') return `[repeat(${v},minmax(0,1fr))]`
+      return v
+    }
+    const rowMapper = (v: any) => {
+      if (typeof v === 'number' && v <= 12) return v
+      if (typeof v === 'number') return `[repeat(${v},minmax(0,1fr))]`
+      return v
+    }
+
     return (
       <Box
         ref={ref}
         className={composeStyles(
           "grid",
-          getResponsiveClasses(cols, "grid-cols-"),
-          getResponsiveClasses(rows, "grid-rows-"),
+          getResponsiveClasses(cols, "grid-cols-", colMapper),
+          getResponsiveClasses(rows, "grid-rows-", rowMapper),
           className
         )}
         {...props}
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
  "path": "src/layouts/Grid.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/layouts/Grid.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/layouts/Grid.tsx -->


<!-- BEGIN_FILE_AUDIT: src/layouts/MainLayout.tsx -->
---

### File: `src/layouts/MainLayout.tsx` +6/-5 (modified)

Diff:
```diff
@@ -14,12 +14,13 @@ export function MainLayout({ children }: { children: React.ReactNode }) {
       
       <Box display="flex" className="min-h-screen w-full">
         <Navigation />
-        <Box as="main" flex={1} position="relative" overflow="y-auto" className="bg-bg pt-16 lg:pt-0 max-w-full w-full flex flex-col" style={{ viewTransitionName: 'main-content' }}>
+        <Box as="div" flex={1} position="relative" overflow="y-auto" className="bg-bg pt-16 lg:pt-0 max-w-full w-full flex flex-col" style={{ viewTransitionName: 'main-content' }}>
           <Box
-            paddingX={{ base: 4, md: 6, lg: 12 }}
-            paddingTop={12}
-            paddingBottom={showEmailBar ? { base: 48, md: 64 } : 12}
-            className="mx-auto min-h-full max-w-7xl w-full transition-all duration-300"
+            as="main"
+            paddingX={{ base: 8, md: 16 }}
+            paddingTop={32}
+            paddingBottom={showEmailBar ? { base: 48, md: 32 } : 20}
+            className="mx-auto min-h-full max-w-[1400px] w-full transition-all duration-300"
           >
             <Box flex={1} className="w-full flex flex-col">
               <Box flex={1} className="w-full">
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
  "path": "src/layouts/MainLayout.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/layouts/MainLayout.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/layouts/MainLayout.tsx -->


<!-- BEGIN_FILE_AUDIT: src/lib/variants.ts -->
---

### File: `src/lib/variants.ts` +6/-6 (modified)

Diff:
```diff
@@ -44,11 +44,11 @@ export const buttonVariants = cva(
         warning: "text-accent",
       },
       size: {
-        default: "h-[40px] px-6 text-xs",
-        sm: "h-8 px-4 text-[10px]",
-        md: "h-[40px] px-6 text-xs",
+        default: "h-[48px] px-6 text-xs",
+        sm: "h-[48px] px-4 text-[10px]",
+        md: "h-[48px] px-6 text-xs",
         lg: "h-12 px-8 text-sm",
-        icon: "h-[40px] w-[40px]",
+        icon: "h-[48px] w-[48px]",
       },
       fullWidth: {
         true: "w-full",
@@ -62,14 +62,14 @@ export const buttonVariants = cva(
 );
 
 export const badgeVariants = cva(
-  "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest whitespace-nowrap transition-all rounded-[2px]",
+  "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest whitespace-nowrap transition-all rounded-[2px] opacity-80",
   {
     variants: {
       emphasis: variants.emphasis,
       intent: variants.intent,
     },
     defaultVariants: {
-      emphasis: "solid",
+      emphasis: "outline",
       intent: "default",
     },
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
  "path": "src/lib/variants.ts",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/lib/variants.ts",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/lib/variants.ts -->


<!-- BEGIN_FILE_AUDIT: src/styles/motion.ts -->
---

### File: `src/styles/motion.ts` +6/-2 (modified)

Diff:
```diff
@@ -2,13 +2,17 @@
  * Standardized Motion Tokens.
  * Ensures consistent transitions across the entire application shell.
  */
+const shouldReduceMotion = typeof window !== 'undefined'
+  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
+  : false;
+
 export const motionTokens = {
   page: {
-    initial: { opacity: 0, y: 8 },
+    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 },
     animate: { opacity: 1, y: 0 },
     exit: { opacity: 0 },
     transition: { 
-      duration: 0.3, 
+      duration: shouldReduceMotion ? 0.1 : 0.3,
       ease: [0.22, 1, 0.36, 1] as [number, number, number, number] 
     }
   },
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
  "path": "src/styles/motion.ts",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/styles/motion.ts",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/styles/motion.ts -->


<!-- BEGIN_FILE_AUDIT: src/styles/tokens.css -->
---

### File: `src/styles/tokens.css` +8/-0 (added)

Diff:
```diff
@@ -0,0 +1,8 @@
+/* src/styles/tokens.css */
+:root {
+  /* Use a 4px or 8px base unit (The 'Golden' scale) */
+  --space-unit: 4px;
+  --section-gap: calc(var(--space-unit) * 32); /* 128px */
+  --content-gap: calc(var(--space-unit) * 8);  /* 32px */
+  --component-padding: calc(var(--space-unit) * 6); /* 24px */
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
  "path": "src/styles/tokens.css",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/styles/tokens.css",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/styles/tokens.css -->


<!-- BEGIN_FILE_AUDIT: tailwind.config.js -->
---

### File: `tailwind.config.js` +38/-0 (modified)

Diff:
```diff
@@ -32,6 +32,44 @@ export default {
       }
     },
   },
+  safelist: [
+    {
+      pattern: /grid-cols-/,
+      variants: ['sm', 'md', 'lg', 'xl'],
+    },
+    {
+      pattern: /col-span-/,
+      variants: ['sm', 'md', 'lg', 'xl'],
+    },
+    {
+      pattern: /gap-/,
+      variants: ['sm', 'md', 'lg', 'xl'],
+    },
+    {
+      pattern: /p-/,
+      variants: ['sm', 'md', 'lg', 'xl'],
+    },
+    {
+      pattern: /px-/,
+      variants: ['sm', 'md', 'lg', 'xl'],
+    },
+    {
+      pattern: /py-/,
+      variants: ['sm', 'md', 'lg', 'xl'],
+    },
+    {
+      pattern: /m-/,
+      variants: ['sm', 'md', 'lg', 'xl'],
+    },
+    {
+      pattern: /mx-/,
+      variants: ['sm', 'md', 'lg', 'xl'],
+    },
+    {
+      pattern: /my-/,
+      variants: ['sm', 'md', 'lg', 'xl'],
+    },
+  ],
   plugins: [
     require('@tailwindcss/typography'),
   ],
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
  "path": "tailwind.config.js",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "tailwind.config.js",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: tailwind.config.js -->


<!-- BEGIN_FILE_AUDIT: tests/verify_final.spec.ts -->
---

### File: `tests/verify_final.spec.ts` +14/-0 (added)

Diff:
```diff
@@ -0,0 +1,14 @@
+import { test, expect } from '@playwright/test';
+
+test('capture home redesign final', async ({ page }) => {
+  await page.goto('http://localhost:4173/tech-dancer/');
+  await page.waitForLoadState('networkidle');
+
+  // Set viewport to a common desktop size to verify 3-column layout
+  await page.setViewportSize({ width: 1440, height: 900 });
+
+  // Give it a moment for any animations to settle
+  await page.waitForTimeout(2000);
+
+  await page.screenshot({ path: '/home/jules/verification/home_redesign_final.png', fullPage: true });
+});
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
  "path": "tests/verify_final.spec.ts",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "tests/verify_final.spec.ts",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: tests/verify_final.spec.ts -->


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
python3 dev-tools/submit_pr_review_data.py plan-pr-review-147.md
```

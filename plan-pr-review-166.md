# PR Review Plan: #166 — feat: add Visual UX Auditor page and capture script

<!-- PR_NUMBER: 166 -->

**Repo:** arii/tech-dancer — https://github.com/arii/tech-dancer/pull/166
**Stats:** +1288/-222 across 9 file(s)

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

Integrates a new Visual UX Auditor feature into the application. It includes a frontend page (`/ux-auditor`) conforming to the project's styling guidelines (layout primitives, tokens), a custom hook for Firebase logic, and a companion CLI script (`scripts/ux-capture.js`) using Playwright to capture screenshots across viewports.

---
*PR created automatically by Jules for task [7862938856229691670](https://jules.google.com/task/7862938856229691670) started by @arii*

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

- `[M]` [package.json](https://github.com/arii/tech-dancer/pull/166/files) `+2/-0`
- `[M]` [plan.md](https://github.com/arii/tech-dancer/pull/166/files) `+16/-221`
- `[M]` [pnpm-lock.yaml](https://github.com/arii/tech-dancer/pull/166/files) `+637/-0`
- `[A]` [scripts/ux-capture.js](https://github.com/arii/tech-dancer/pull/166/files) `+67/-0`
- `[M]` [src/App.tsx](https://github.com/arii/tech-dancer/pull/166/files) `+2/-0`
- `[M]` [src/features/research/ResearchAnalytics.tsx](https://github.com/arii/tech-dancer/pull/166/files) `+1/-1`
- `[M]` [src/features/research/useResearch.ts](https://github.com/arii/tech-dancer/pull/166/files) `+7/-0`
- `[A]` [src/features/ux-auditor/useUXAuditor.ts](https://github.com/arii/tech-dancer/pull/166/files) `+290/-0`
- `[A]` [src/pages/UXAuditor.tsx](https://github.com/arii/tech-dancer/pull/166/files) `+266/-0`

---

## Per-File Audit

Note: Do NOT skip any file. Leave a comment for every file, even if clean.


<!-- BEGIN_FILE_AUDIT: package.json -->
---

### File: `package.json` +2/-0 (modified)

Diff:
```diff
@@ -23,6 +23,7 @@
     "clsx": "^2.1.1",
     "dotenv": "^17.2.3",
     "express": "^4.21.2",
+    "firebase": "^12.12.1",
     "lucide-react": "^0.546.0",
     "motion": "^12.23.24",
     "react": "^19.0.0",
@@ -41,6 +42,7 @@
     "@types/express": "^4.17.21",
     "@types/node": "^22.14.0",
     "autoprefixer": "^10.5.0",
+    "playwright": "^1.59.1",
     "postcss": "^8.5.10",
     "rollup-plugin-visualizer": "^7.0.1",
     "sharp": "^0.34.5",
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
  "path": "package.json",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "package.json",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: package.json -->


<!-- BEGIN_FILE_AUDIT: plan.md -->
---

### File: `plan.md` +16/-221 (modified)

Diff:
```diff
@@ -1,221 +1,16 @@
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
+1. **Add `firebase` dependency**
+   - Run `npm install firebase` to install the required dependency.
+2. **Add `playwright` dependency for `ux-capture.js` tool (if not present)**
+   - Check if `playwright` is installed. The script uses `const { chromium } = require('playwright');`.
+3. **Create the UX Auditor Page**
+   - Add `src/pages/UXAuditor.tsx` representing the page, wrapped in the layout primitives (`Box`, `Grid`, `Stack`, `Text`) and adhering to `AGENTS.md` guidelines.
+   - We will need to adapt the provided React code which uses raw Tailwind (`bg-white p-6 rounded-2xl` etc) to use layout primitives (`<Box className="bg-surface rounded-xl shadow-sm border border-line p-6">`).
+   - Move complex logic/hooks into a `src/features/ux-auditor/useUXAuditor.ts` file if necessary, or keep it in the component if it's small, though separating logic is usually better (`AGENTS.md` rule 6).
+4. **Update Routing Configuration**
+   - Edit `src/config/routes.ts` to include `{ path: '/ux-auditor', label: 'UX Auditor' }`.
+   - Ensure the new route is lazy-loaded in `src/App.tsx`.
+   - Update `src/components/Navigation.tsx` to include an icon for `/ux-auditor` (e.g. `Eye` or `Camera`).
+5. **Add `ux-capture.js`**
+   - Place `ux-capture.js` in a `scripts/` directory at the project root.
+6. **Pre-commit and Tests**
+   - Call `pre_commit_instructions` to ensure we cover all required checks.
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


<!-- BEGIN_FILE_AUDIT: pnpm-lock.yaml -->
---

### File: `pnpm-lock.yaml` +637/-0 (modified)

Diff:
```diff
@@ -38,6 +38,9 @@ importers:
       express:
         specifier: ^4.21.2
         version: 4.22.1
+      firebase:
+        specifier: ^12.12.1
+        version: 12.12.1
       lucide-react:
         specifier: ^0.546.0
         version: 0.546.0(react@19.2.5)
@@ -87,6 +90,9 @@ importers:
       autoprefixer:
         specifier: ^10.5.0
         version: 10.5.0(postcss@8.5.10)
+      playwright:
+        specifier: ^1.59.1
+        version: 1.59.1
       postcss:
         specifier: ^8.5.10
         version: 8.5.10
@@ -610,6 +616,216 @@ packages:
     cpu: [x64]
     os: [win32]
 
+  '@firebase/ai@2.11.1':
+    resolution: {integrity: sha512-WGTF81W3WBKJY+c7xqTzO15OGAkCAs8cpADqflAI0skhTZjIkhF0qyf55rq4Ctt6jKygkv99rPfMrjAHTgXaVQ==}
+    engines: {node: '>=20.0.0'}
+    peerDependencies:
+      '@firebase/app': 0.x
+      '@firebase/app-types': 0.x
+
+  '@firebase/analytics-compat@0.2.27':
+    resolution: {integrity: sha512-ZObpYpAxL6JfgH7GnvlDD0sbzGZ0o4nijV8skatV9ZX49hJtCYbFqaEcPYptT94rgX1KUoKEderC7/fa7hybtw==}
+    peerDependencies:
+      '@firebase/app-compat': 0.x
+
+  '@firebase/analytics-types@0.8.3':
+    resolution: {integrity: sha512-VrIp/d8iq2g501qO46uGz3hjbDb8xzYMrbu8Tp0ovzIzrvJZ2fvmj649gTjge/b7cCCcjT0H37g1gVtlNhnkbg==}
+
+  '@firebase/analytics@0.10.21':
+    resolution: {integrity: sha512-j2y2q65BlgLGB5Pwjhv/Jopw2X/TBTzvAtI5z/DSp56U4wBj7LfhBfzbdCtFPges+Wz0g55GdoawXibOH5jGng==}
+    peerDependencies:
+      '@firebase/app': 0.x
+
+  '@firebase/app-check-compat@0.4.2':
+    resolution: {integrity: sha512-M91NhxqbSkI0ChkJWy69blC+rPr6HEgaeRllddSaU1pQ/7IiegeCQM9pPDIgvWnwnBSzKhUHpe6ro/jhJ+cvzw==}
+    engines: {node: '>=20.0.0'}
+    peerDependencies:
+      '@firebase/app-compat': 0.x
+
+  '@firebase/app-check-interop-types@0.3.3':
+    resolution: {integrity: sha512-gAlxfPLT2j8bTI/qfe3ahl2I2YcBQ8cFIBdhAQA4I2f3TndcO+22YizyGYuttLHPQEpWkhmpFW60VCFEPg4g5A==}
+
+  '@firebase/app-check-types@0.5.3':
+    resolution: {integrity: sha512-hyl5rKSj0QmwPdsAxrI5x1otDlByQ7bvNvVt8G/XPO2CSwE++rmSVf3VEhaeOR4J8ZFaF0Z0NDSmLejPweZ3ng==}
+
+  '@firebase/app-check@0.11.2':
+    resolution: {integrity: sha512-jcXQVMHAQ5AEKzVD5C7s5fmAYeFOuN6lAJeNTgZK2B9aLnofWaJt8u1A8Idm8gpsBBYSaY3cVyeH5SWMOVPBLQ==}
+    engines: {node: '>=20.0.0'}
+    peerDependencies:
+      '@firebase/app': 0.x
+
+  '@firebase/app-compat@0.5.11':
+    resolution: {integrity: sha512-KaACDjXkK5VLpI01vEs592R7/8s5DjFdIXfKoR385ly1SmK3Tu+jMHCIB4MsiY5jsez6v7VlEX/3rJ90dVkHyA==}
+    engines: {node: '>=20.0.0'}
+
+  '@firebase/app-types@0.9.4':
+    resolution: {integrity: sha512-crX9TA5SVYZwLPG7/R16IsH8FLlgkPXjJUVhsVpHVDSqJiq3D/NuFTM5ctxGTExXAOeIn//69tQw47CPerM8MQ==}
+
+  '@firebase/app@0.14.11':
+    resolution: {integrity: sha512-yxADFW35LYkP8oSGobGsYIrI42I+GPCvKTNHx4meT9Yq3C950IVz1eANoBk822I9tbKv1wyv9P4Bv1G5TpucFw==}
+    engines: {node: '>=20.0.0'}
+
+  '@firebase/auth-compat@0.6.5':
+    resolution: {integrity: sha512-IfVsafZ3QiXbsydXTP/XMI0wVYbJLI1rkb8Qqf03/h5FnL+upbbPOb+6Yj3RpcX+Y1iP5Uh18lxTHlXfbiyAow==}
+    engines: {node: '>=20.0.0'}
+    peerDependencies:
+      '@firebase/app-compat': 0.x
+
+  '@firebase/auth-interop-types@0.2.4':
+    resolution: {integrity: sha512-JPgcXKCuO+CWqGDnigBtvo09HeBs5u/Ktc2GaFj2m01hLarbxthLNm7Fk8iOP1aqAtXV+fnnGj7U28xmk7IwVA==}
+
+  '@firebase/auth-types@0.13.0':
+    resolution: {integrity: sha512-S/PuIjni0AQRLF+l9ck0YpsMOdE8GO2KU6ubmBB7P+7TJUCQDa3R1dlgYm9UzGbbePMZsp0xzB93f2b/CgxMOg==}
+    peerDependencies:
+      '@firebase/app-types': 0.x
+      '@firebase/util': 1.x
+
+  '@firebase/auth@1.13.0':
+    resolution: {integrity: sha512-mKkSLNym3UbnnZ06dAmtqzp5EpPGCANGCZDJbkoR135aoUdKG6Aizwcnp29RzsQpwH0nmy5nay17Sfbsh9oY8A==}
+    engines: {node: '>=20.0.0'}
+    peerDependencies:
+      '@firebase/app': 0.x
+      '@react-native-async-storage/async-storage': ^2.2.0 || ^3.0.0
+    peerDependenciesMeta:
+      '@react-native-async-storage/async-storage':
+        optional: true
+
+  '@firebase/component@0.7.2':
+    resolution: {integrity: sha512-iyVDGc6Vjx7Rm0cAdccLH/NG6fADsgJak/XW9IA2lPf8AjIlsemOpFGKczYyPHxm4rnKdR8z6sK4+KEC7NwmEg==}
+    engines: {node: '>=20.0.0'}
+
+  '@firebase/data-connect@0.6.0':
+    resolution: {integrity: sha512-OiugPRcdlhqXF97oR9CjVObILmsWU0dFUS0gXNYEe4bDfpW8pZmQ5GqhIPPtLWbT/0W2lMJJD7VILFMk+xuHPg==}
+    peerDependencies:
+      '@firebase/app': 0.x
+
+  '@firebase/database-compat@2.1.3':
+    resolution: {integrity: sha512-GMyfWjD8mehjg/QpNkY/tl9G/MoeugPeg91n9D0atggxbWuKF/2KhVPHZDH+XmoP0EKYqMWYTtKxBsaBaNKLYQ==}
+    engines: {node: '>=20.0.0'}
+
+  '@firebase/database-types@1.0.19':
+    resolution: {integrity: sha512-FqewjUZmV9LqFfuEnmgdcUpiOUz7qwLXxnm/H8BcMFEzQXtd1yyUDm8ex5VRad2nuTE+ahOuCjUAM/cyDncO+g==}
+
+  '@firebase/database@1.1.2':
+    resolution: {integrity: sha512-lP96CMjMPy/+d1d9qaaHjHHdzdwvEOuyyLq9ehX89e2XMKwS1jHNzYBO+42bdSumuj5ukPbmnFtViZu8YOMT+w==}
+    engines: {node: '>=20.0.0'}
+
+  '@firebase/firestore-compat@0.4.8':
+    resolution: {integrity: sha512-WK9NJRpnosGD2nuyjdr7K+Ht7AxRYJlTF62myI4rRA7ibJOosbecvjacR5oirJ7s1BgNS6qzcBw7n4fD3a5w1w==}
+    engines: {node: '>=20.0.0'}
+    peerDependencies:
+      '@firebase/app-compat': 0.x
+
+  '@firebase/firestore-types@3.0.3':
+    resolution: {integrity: sha512-hD2jGdiWRxB/eZWF89xcK9gF8wvENDJkzpVFb4aGkzfEaKxVRD1kjz1t1Wj8VZEp2LCB53Yx1zD8mrhQu87R6Q==}
+    peerDependencies:
+      '@firebase/app-types': 0.x
+      '@firebase/util': 1.x
+
+  '@firebase/firestore@4.14.0':
+    resolution: {integrity: sha512-bZc6YOjRkMBVA16527tgzi6iN9n//xRB3Mmx/R+Gr6UAP/+xrIKOejQIcn1hh+tCzNT8jO0jI+kWox5J4tB/qQ==}
+    engines: {node: '>=20.0.0'}
+    peerDependencies:
+      '@firebase/app': 0.x
+
+  '@firebase/functions-compat@0.4.3':
+    resolution: {integrity: sha512-BxkEwWgx1of0tKaao/r2VR6WBLk/RAiyztatiONPrPE8gkitFkOnOCxf8i9cUyA5hX5RGt5H30uNn25Q6QNEmQ==}
+    engines: {node: '>=20.0.0'}
+    peerDependencies:
+      '@firebase/app-compat': 0.x
+
+  '@firebase/functions-types@0.6.3':
+    resolution: {integrity: sha512-EZoDKQLUHFKNx6VLipQwrSMh01A1SaL3Wg6Hpi//x6/fJ6Ee4hrAeswK99I5Ht8roiniKHw4iO0B1Oxj5I4plg==}
+
+  '@firebase/functions@0.13.3':
+    resolution: {integrity: sha512-csO7ckK3SSs+NUZW1nms9EK7ckHe/1QOjiP8uAkCYa7ND18s44vjE9g3KxEeIUpyEPqZaX1EhJuFyZjHigAcYw==}
+    engines: {node: '>=20.0.0'}
+    peerDependencies:
+      '@firebase/app': 0.x
+
+  '@firebase/installations-compat@0.2.21':
+    resolution: {integrity: sha512-zahIUkaVKbR8zmTeBHkdfaVl6JGWlhVoSjF7CVH33nFqD3SlPEpEEegn2GNT5iAfsVdtlCyJJ9GW4YKjq+RJKQ==}
+    peerDependencies:
+      '@firebase/app-compat': 0.x
+
+  '@firebase/installations-types@0.5.3':
+    resolution: {integrity: sha512-2FJI7gkLqIE0iYsNQ1P751lO3hER+Umykel+TkLwHj6plzWVxqvfclPUZhcKFVQObqloEBTmpi2Ozn7EkCABAA==}
+    peerDependencies:
+      '@firebase/app-types': 0.x
+
+  '@firebase/installations@0.6.21':
+    resolution: {integrity: sha512-xGFGTeICJZ5vhrmmDukeczIcFULFXybojML2+QSDFoKj5A7zbGN7KzFGSKNhDkIxpjzsYG9IleJyUebuAcmqWA==}
+    peerDependencies:
+      '@firebase/app': 0.x
+
+  '@firebase/logger@0.5.0':
+    resolution: {integrity: sha512-cGskaAvkrnh42b3BA3doDWeBmuHFO/Mx5A83rbRDYakPjO9bJtRL3dX7javzc2Rr/JHZf4HlterTW2lUkfeN4g==}
+    engines: {node: '>=20.0.0'}
+
+  '@firebase/messaging-compat@0.2.25':
+    resolution: {integrity: sha512-eoOQqGLtRlseTdiemTN44LlHZpltK5gnhq8XVUuLgtIOG+odtDzrz2UoTpcJWSzaJQVxNLb/x9f39tHdDM4N4w==}
+    peerDependencies:
+      '@firebase/app-compat': 0.x
+
+  '@firebase/messaging-interop-types@0.2.3':
+    resolution: {integrity: sha512-xfzFaJpzcmtDjycpDeCUj0Ge10ATFi/VHVIvEEjDNc3hodVBQADZ7BWQU7CuFpjSHE+eLuBI13z5F/9xOoGX8Q==}
+
+  '@firebase/messaging@0.12.25':
+    resolution: {integrity: sha512-7RhDwoDHlOK1/ou0/LeubxmjcngsTjDdrY/ssg2vwAVpUuVAhQzQvuCAOYxcX5wNC1zCgQ54AP1vdngBwbCmOQ==}
+    peerDependencies:
+      '@firebase/app': 0.x
+
+  '@firebase/performance-compat@0.2.24':
+    resolution: {integrity: sha512-YRlejH8wLt7ThWao+HXoKUHUrZKGYq+otxkPS+8nuE5PeN1cBXX7NAJl9ueuUkBwMIrnKdnDqL/voHXxDAAt3g==}
+    peerDependencies:
+      '@firebase/app-compat': 0.x
+
+  '@firebase/performance-types@0.2.3':
+    resolution: {integrity: sha512-IgkyTz6QZVPAq8GSkLYJvwSLr3LS9+V6vNPQr0x4YozZJiLF5jYixj0amDtATf1X0EtYHqoPO48a9ija8GocxQ==}
+
+  '@firebase/performance@0.7.11':
+    resolution: {integrity: sha512-V3uAhrz7IYJuji+OgT3qYTGKxpek/TViXti9OSsUJ4AexZ3jQjYH5Yrn7JvBxk8MGiSLsC872hh+BxQiPZsm7g==}
+    peerDependencies:
+      '@firebase/app': 0.x
+
+  '@firebase/remote-config-compat@0.2.23':
+    resolution: {integrity: sha512-4+KqRRHEUUmKT6tFmnpWATOsaFfmSuBs1jXH8JzVtMLEYqq/WS9IDM92OdefFDSrAA2xGd0WN004z8mKeIIscw==}
+    peerDependencies:
+      '@firebase/app-compat': 0.x
+
+  '@firebase/remote-config-types@0.5.0':
+    resolution: {integrity: sha512-vI3bqLoF14L/GchtgayMiFpZJF+Ao3uR8WCde0XpYNkSokDpAKca2DxvcfeZv7lZUqkUwQPL2wD83d3vQ4vvrg==}
+
+  '@firebase/remote-config@0.8.2':
+    resolution: {integrity: sha512-5EXqOThV4upjK9D38d/qOSVwOqRhemlaOFk9vCkMNNALeIlwr+4pLjtLNo4qoY8etQmU/1q4aIATE9N8PFqg0g==}
+    peerDependencies:
+      '@firebase/app': 0.x
+
+  '@firebase/storage-compat@0.4.2':
+    resolution: {integrity: sha512-R+aB38wxCH5zjIO/xu9KznI7fgiPuZAG98uVm1NcidHyyupGgIDLKigGmRGBZMnxibe/m2oxNKoZpfEbUX2aQQ==}
+    engines: {node: '>=20.0.0'}
+    peerDependencies:
+      '@firebase/app-compat': 0.x
+
+  '@firebase/storage-types@0.8.3':
+    resolution: {integrity: sha512-+Muk7g9uwngTpd8xn9OdF/D48uiQ7I1Fae7ULsWPuKoCH3HU7bfFPhxtJYzyhjdniowhuDpQcfPmuNRAqZEfvg==}
+    peerDependencies:
+      '@firebase/app-types': 0.x
+      '@firebase/util': 1.x
+
+  '@firebase/storage@0.14.2':
+    resolution: {integrity: sha512-o/culaTeJ8GRpKXRJov21rux/n9dRaSOWLebyatFP2sqEdCxQPjVA1H9Z2fzYwQxMIU0JVmC7SPPmU11v7L6vQ==}
+    engines: {node: '>=20.0.0'}
+    peerDependencies:
+      '@firebase/app': 0.x
+
+  '@firebase/util@1.15.0':
+    resolution: {integrity: sha512-AmWf3cHAOMbrCPG4xdPKQaj5iHnyYfyLKZxwz+Xf55bqKbpAmcYifB4jQinT2W9XhDRHISOoPyBOariJpCG6FA==}
+    engines: {node: '>=20.0.0'}
+
+  '@firebase/webchannel-wrapper@1.0.5':
+    resolution: {integrity: sha512-+uGNN7rkfn41HLO0vekTFhTxk61eKa8mTpRGLO0QSqlQdKvIoGAvLp3ppdVIWbTGYJWM6Kp0iN+PjMIOcnVqTw==}
+
   '@floating-ui/core@1.7.5':
     resolution: {integrity: sha512-1Ih4WTWyw0+lKyFMcBHGbb5U5FtuHJuujoyyr5zTaWS5EYMeT6Jb2AuDeftsCsEuchO+mM2ij5+q9crhydzLhQ==}
 
@@ -637,6 +853,15 @@ packages:
       '@modelcontextprotocol/sdk':
         optional: true
 
+  '@grpc/grpc-js@1.9.15':
+    resolution: {integrity: sha512-nqE7Hc0AzI+euzUwDAy0aY5hCp10r734gMGRdU+qOPX0XSceI2ULrcXB5U2xSc5VkWwalCj4M7GzCAygZl2KoQ==}
+    engines: {node: ^8.13.0 || >=10.10.0}
+
+  '@grpc/proto-loader@0.7.15':
+    resolution: {integrity: sha512-tMXdRCfYVixjuFK+Hk0Q1s38gV9zDiDJfWL3h1rv4Qc39oILCu1TRTDt7+fGUI8K4G1Fj125Hx/ru3azECWTyQ==}
+    engines: {node: '>=6'}
+    hasBin: true
+
   '@hapi/address@5.1.1':
     resolution: {integrity: sha512-A+po2d/dVoY7cYajycYI43ZbYMXukuopIsqCjh5QzsBCipDtdofHntljDlpccMjIfTy6UOkg+5KPriwYch2bXA==}
     engines: {node: '>=14.0.0'}
@@ -1878,6 +2103,10 @@ packages:
   fastq@1.20.1:
     resolution: {integrity: sha512-GGToxJ/w1x32s/D2EKND7kTil4n8OVk/9mycTc4VDza13lOvpUZTGX3mFSCtV9ksdGBVzvsyAVLM6mHFThxXxw==}
 
+  faye-websocket@0.11.4:
+    resolution: {integrity: sha512-CzbClwlXAuiRQAlUyfqPgvPoNKTckTPGfwZV4ZdAhVcP2lh9KUxJg2b5GkE7XbjKQ3YJnQ9z6D9ntLAlB+tP8g==}
+    engines: {node: '>=0.8.0'}
+
   fdir@6.5.0:
     resolution: {integrity: sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==}
     engines: {node: '>=12.0.0'}
@@ -1907,6 +2136,9 @@ packages:
     resolution: {integrity: sha512-S8KoZgRZN+a5rNwqTxlZZePjT/4cnm0ROV70LedRHZ0p8u9fRID0hJUZQpkKLzro8LfmC8sx23bY6tVNxv8pQA==}
     engines: {node: '>= 18.0.0'}
 
+  firebase@12.12.1:
+    resolution: {integrity: sha512-ee7xA+bTJLfjB9BP/8FQr3EkxmpAAGc1lNc5QkWgTDpUw24HYXFPm7FEWRdLtGnygxIdYpFmepSc5VjkI6NHhw==}
+
   follow-redirects@1.16.0:
     resolution: {integrity: sha512-y5rN/uOsadFT/JfYwhxRS5R7Qce+g3zG97+JrtFZlC9klX/W5hD7iiLzScI4nZqUS7DNUdhPgw4xI8W2LuXlUw==}
     engines: {node: '>=4.0'}
@@ -2071,6 +2303,9 @@ packages:
     resolution: {integrity: sha512-4FbRdAX+bSdmo4AUFuS0WNiPz8NgFt+r8ThgNWmlrjQjt1Q7ZR9+zTlce2859x4KSXrwIsaeTqDoKQmtP8pLmQ==}
     engines: {node: '>= 0.8'}
 
+  http-parser-js@0.5.10:
+    resolution: {integrity: sha512-Pysuw9XpUq5dVc/2SMHpuTY01RFl8fttgcyunjL7eEMhGM3cI4eOmiCycJDVCo/7O7ClfQD3SaI6ftDzqOXYMA==}
+
   https-proxy-agent@7.0.6:
     resolution: {integrity: sha512-vK9P5/iUfdl95AI+JVyUuIcVtd4ofvtrOr3HNtM2yxC9bnMbEdp3x01OhQNnjb8IJYi38VlTE3mBXwcfvywuSw==}
     engines: {node: '>= 14'}
@@ -2091,6 +2326,9 @@ packages:
     resolution: {integrity: sha512-im9DjEDQ55s9fL4EYzOAv0yMqmMBSZp6G0VvFyTMPKWxiSBHUj9NW/qqLmXUwXrrM7AvqSlTCfvqRb0cM8yYqw==}
     engines: {node: '>=0.10.0'}
 
+  idb@7.1.1:
+    resolution: {integrity: sha512-gchesWBzyvGHRO9W8tzUWFDycow5gwjvFKfyV9FF32Y7F50yZMp7mP+T2mJIWFx49zicqyC4uefHM17o6xKIVQ==}
+
   ieee754@1.2.1:
     resolution: {integrity: sha512-dcyqhDvX1C46lXZcVqCpK+FtMRQVdIMN6/Df5js2zouUsqG7I6sFxitIC+7KYK29KdXOLHdu9zL4sFnoVQnqaA==}
 
@@ -2354,6 +2592,9 @@ packages:
   lines-and-columns@1.2.4:
     resolution: {integrity: sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==}
 
+  lodash.camelcase@4.3.0:
+    resolution: {integrity: sha512-TwuEnCnxbc3rAvhf/LbG7tJUDzhqXyFnv3dtzLOPgCG/hODL7WFnsbwktkD7yUV0RrreP/l1PALq/YSg6VvjlA==}
+
   lodash@4.18.1:
     resolution: {integrity: sha512-dMInicTPVE8d1e5otfwmmjlxkZoUpiVLwyeTdUsi/Caj/gfzzblBcCE5sRHV/AsjuCmxWrte2TNGSYuCeCq+0Q==}
 
@@ -3290,6 +3531,17 @@ packages:
     resolution: {integrity: sha512-d2JWLCivmZYTSIoge9MsgFCZrt571BikcWGYkjC1khllbTeDlGqZ2D8vD8E/lJa8WGWbb7Plm8/XJYV7IJHZZw==}
     engines: {node: '>= 8'}
 
+  web-vitals@4.2.4:
+    resolution: {integrity: sha512-r4DIlprAGwJ7YM11VZp4R884m0Vmgr6EAKe3P+kO0PPj3Unqyvv59rczf6UiGcb9Z8QxZVcqKNwv/g0WNdWwsw==}
+
+  websocket-driver@0.7.4:
+    resolution: {integrity: sha512-b17KeDIQVjvb0ssuSDF2cYXSg2iztliJ4B9WdsuB6J952qCPKmnVq4DyW5motImXHDC1cBT/1UezrJVsKw5zjg==}
+    engines: {node: '>=0.8.0'}
+
+  websocket-extensions@0.1.4:
+    resolution: {integrity: sha512-OqedPIGOfsDlo31UNwYbCFMSaO9m9G/0faIHj5/dZFDMFqPTcx6UwqyOy3COEaEOg/9VsGIpdqn62W5KhoKSpg==}
+    engines: {node: '>=0.8.0'}
+
   which@2.0.2:
     resolution: {integrity: sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==}
     engines: {node: '>= 8'}
@@ -3774,6 +4026,326 @@ snapshots:
   '@esbuild/win32-x64@0.27.7':
     optional: true
 
+  '@firebase/ai@2.11.1(@firebase/app-types@0.9.4)(@firebase/app@0.14.11)':
+    dependencies:
+      '@firebase/app': 0.14.11
+      '@firebase/app-check-interop-types': 0.3.3
+      '@firebase/app-types': 0.9.4
+      '@firebase/component': 0.7.2
+      '@firebase/logger': 0.5.0
+      '@firebase/util': 1.15.0
+      tslib: 2.8.1
+
+  '@firebase/analytics-compat@0.2.27(@firebase/app-compat@0.5.11)(@firebase/app@0.14.11)':
+    dependencies:
+      '@firebase/analytics': 0.10.21(@firebase/app@0.14.11)
+      '@firebase/analytics-types': 0.8.3
+      '@firebase/app-compat': 0.5.11
+      '@firebase/component': 0.7.2
+      '@firebase/util': 1.15.0
+      tslib: 2.8.1
+    transitivePeerDependencies:
+      - '@firebase/app'
+
+  '@firebase/analytics-types@0.8.3': {}
+
+  '@firebase/analytics@0.10.21(@firebase/app@0.14.11)':
+    dependencies:
+      '@firebase/app': 0.14.11
+      '@firebase/component': 0.7.2
+      '@firebase/installations': 0.6.21(@firebase/app@0.14.11)
+      '@firebase/logger': 0.5.0
+      '@firebase/util': 1.15.0
+      tslib: 2.8.1
+
+  '@firebase/app-check-compat@0.4.2(@firebase/app-compat@0.5.11)(@firebase/app@0.14.11)':
+    dependencies:
+      '@firebase/app-check': 0.11.2(@firebase/app@0.14.11)
+      '@firebase/app-check-types': 0.5.3
+      '@firebase/app-compat': 0.5.11
+      '@firebase/component': 0.7.2
+      '@firebase/logger': 0.5.0
+      '@firebase/util': 1.15.0
+      tslib: 2.8.1
+    transitivePeerDependencies:
+      - '@firebase/app'
+
+  '@firebase/app-check-interop-types@0.3.3': {}
+
+  '@firebase/app-check-types@0.5.3': {}
+
+  '@firebase/app-check@0.11.2(@firebase/app@0.14.11)':
+    dependencies:
+      '@firebase/app': 0.14.11
+      '@firebase/component': 0.7.2
+      '@firebase/logger': 0.5.0
+      '@firebase/util': 1.15.0
+      tslib: 2.8.1
+
+  '@firebase/app-compat@0.5.11':
+    dependencies:
+      '@firebase/app': 0.14.11
+      '@firebase/component': 0.7.2
+      '@firebase/logger': 0.5.0
+      '@firebase/util': 1.15.0
+      tslib: 2.8.1
+
+  '@firebase/app-types@0.9.4':
+    dependencies:
+      '@firebase/logger': 0.5.0
+
+  '@firebase/app@0.14.11':
+    dependencies:
+      '@firebase/component': 0.7.2
+      '@firebase/logger': 0.5.0
+      '@firebase/util': 1.15.0
+      idb: 7.1.1
+      tslib: 2.8.1
+
+  '@firebase/auth-compat@0.6.5(@firebase/app-compat@0.5.11)(@firebase/app-types@0.9.4)(@firebase/app@0.14.11)':
+    dependencies:
+      '@firebase/app-compat': 0.5.11
+      '@firebase/auth': 1.13.0(@firebase/app@0.14.11)
+      '@firebase/auth-types': 0.13.0(@firebase/app-types@0.9.4)(@firebase/util@1.15.0)
+      '@firebase/component': 0.7.2
+      '@firebase/util': 1.15.0
+      tslib: 2.8.1
+    transitivePeerDependencies:
+      - '@firebase/app'
+      - '@firebase/app-types'
+      - '@react-native-async-storage/async-storage'
+
+  '@firebase/auth-interop-types@0.2.4': {}
+
+  '@firebase/auth-types@0.13.0(@firebase/app-types@0.9.4)(@firebase/util@1.15.0)':
+    dependencies:
+      '@firebase/app-types': 0.9.4
+      '@firebase/util': 1.15.0
+
+  '@firebase/auth@1.13.0(@firebase/app@0.14.11)':
+    dependencies:
+      '@firebase/app': 0.14.11
+      '@firebase/component': 0.7.2
+      '@firebase/logger': 0.5.0
+      '@firebase/util': 1.15.0
+      tslib: 2.8.1
+
+  '@firebase/component@0.7.2':
+    dependencies:
+      '@firebase/util': 1.15.0
+      tslib: 2.8.1
+
+  '@firebase/data-connect@0.6.0(@firebase/app@0.14.11)':
+    dependencies:
+      '@firebase/app': 0.14.11
+      '@firebase/auth-interop-types': 0.2.4
+      '@firebase/component': 0.7.2
+      '@firebase/logger': 0.5.0
+      '@firebase/util': 1.15.0
+      tslib: 2.8.1
+
+  '@firebase/database-compat@2.1.3':
+    dependencies:
+      '@firebase/component': 0.7.2
+      '@firebase/database': 1.1.2
+      '@firebase/database-types': 1.0.19
+      '@firebase/logger': 0.5.0
+      '@firebase/util': 1.15.0
+      tslib: 2.8.1
+
+  '@firebase/database-types@1.0.19':
+    dependencies:
+      '@firebase/app-types': 0.9.4
+      '@firebase/util': 1.15.0
+
+  '@firebase/database@1.1.2':
+    dependencies:
+      '@firebase/app-check-interop-types': 0.3.3
+      '@firebase/auth-interop-types': 0.2.4
+      '@firebase/component': 0.7.2
+      '@firebase/logger': 0.5.0
+      '@firebase/util': 1.15.0
+      faye-websocket: 0.11.4
+      tslib: 2.8.1
+
+  '@firebase/firestore-compat@0.4.8(@firebase/app-compat@0.5.11)(@firebase/app-types@0.9.4)(@firebase/app@0.14.11)':
+    dependencies:
+      '@firebase/app-compat': 0.5.11
+      '@firebase/component': 0.7.2
+      '@firebase/firestore': 4.14.0(@firebase/app@0.14.11)
+      '@firebase/firestore-types': 3.0.3(@firebase/app-types@0.9.4)(@firebase/util@1.15.0)
+      '@firebase/util': 1.15.0
+      tslib: 2.8.1
+    transitivePeerDependencies:
+      - '@firebase/app'
+      - '@firebase/app-types'
+
+  '@firebase/firestore-types@3.0.3(@firebase/app-types@0.9.4)(@firebase/util@1.15.0)':
+    dependencies:
+      '@firebase/app-types': 0.9.4
+      '@firebase/util': 1.15.0
+
+  '@firebase/firestore@4.14.0(@firebase/app@0.14.11)':
+    dependencies:
+      '@firebase/app': 0.14.11
+      '@firebase/component': 0.7.2
+      '@firebase/logger': 0.5.0
+      '@firebase/util': 1.15.0
+      '@firebase/webchannel-wrapper': 1.0.5
+      '@grpc/grpc-js': 1.9.15
+      '@grpc/proto-loader': 0.7.15
+      tslib: 2.8.1
+
+  '@firebase/functions-compat@0.4.3(@firebase/app-compat@0.5.11)(@firebase/app@0.14.11)':
+    dependencies:
+      '@firebase/app-compat': 0.5.11
+      '@firebase/component': 0.7.2
+      '@firebase/functions': 0.13.3(@firebase/app@0.14.11)
+      '@firebase/functions-types': 0.6.3
+      '@firebase/util': 1.15.0
+      tslib: 2.8.1
+    transitivePeerDependencies:
+      - '@firebase/app'
+
+  '@firebase/functions-types@0.6.3': {}
+
+  '@firebase/functions@0.13.3(@firebase/app@0.14.11)':
+    dependencies:
+      '@firebase/app': 0.14.11
+      '@firebase/app-check-interop-types': 0.3.3
+      '@firebase/auth-interop-types': 0.2.4
+      '@firebase/component': 0.7.2
+      '@firebase/messaging-interop-types': 0.2.3
+      '@firebase/util': 1.15.0
+      tslib: 2.8.1
+
+  '@firebase/installations-compat@0.2.21(@firebase/app-compat@0.5.11)(@firebase/app-types@0.9.4)(@firebase/app@0.14.11)':
+    dependencies:
+      '@firebase/app-compat': 0.5.11
+      '@firebase/component': 0.7.2
+      '@firebase/installations': 0.6.21(@firebase/app@0.14.11)
+      '@firebase/installations-types': 0.5.3(@firebase/app-types@0.9.4)
+      '@firebase/util': 1.15.0
+      tslib: 2.8.1
+    transitivePeerDependencies:
+      - '@firebase/app'
+      - '@firebase/app-types'
+
+  '@firebase/installations-types@0.5.3(@firebase/app-types@0.9.4)':
+    dependencies:
+      '@firebase/app-types': 0.9.4
+
+  '@firebase/installations@0.6.21(@firebase/app@0.14.11)':
+    dependencies:
+      '@firebase/app': 0.14.11
+      '@firebase/component': 0.7.2
+      '@firebase/util': 1.15.0
+      idb: 7.1.1
+      tslib: 2.8.1
+
+  '@firebase/logger@0.5.0':
+    dependencies:
+      tslib: 2.8.1
+
+  '@firebase/messaging-compat@0.2.25(@firebase/app-compat@0.5.11)(@firebase/app@0.14.11)':
+    dependencies:
+      '@firebase/app-compat': 0.5.11
+      '@firebase/component': 0.7.2
+      '@firebase/messaging': 0.12.25(@firebase/app@0.14.11)
+      '@firebase/util': 1.15.0
+      tslib: 2.8.1
+    transitivePeerDependencies:
+      - '@firebase/app'
+
+  '@firebase/messaging-interop-types@0.2.3': {}
+
+  '@firebase/messaging@0.12.25(@firebase/app@0.14.11)':
+    dependencies:
+      '@firebase/app': 0.14.11
+      '@firebase/component': 0.7.2
+      '@firebase/installations': 0.6.21(@firebase/app@0.14.11)
+      '@firebase/messaging-interop-types': 0.2.3
+      '@firebase/util': 1.15.0
+      idb: 7.1.1
+      tslib: 2.8.1
+
+  '@firebase/performance-compat@0.2.24(@firebase/app-compat@0.5.11)(@firebase/app@0.14.11)':
+    dependencies:
+      '@firebase/app-compat': 0.5.11
+      '@firebase/component': 0.7.2
+      '@firebase/logger': 0.5.0
+      '@firebase/performance': 0.7.11(@firebase/app@0.14.11)
+      '@firebase/performance-types': 0.2.3
+      '@firebase/util': 1.15.0
+      tslib: 2.8.1
+    transitivePeerDependencies:
+      - '@firebase/app'
+
+  '@firebase/performance-types@0.2.3': {}
+
+  '@firebase/performance@0.7.11(@firebase/app@0.14.11)':
+    dependencies:
+      '@firebase/app': 0.14.11
+      '@firebase/component': 0.7.2
+      '@firebase/installations': 0.6.21(@firebase/app@0.14.11)
+      '@firebase/logger': 0.5.0
+      '@firebase/util': 1.15.0
+      tslib: 2.8.1
+      web-vitals: 4.2.4
+
+  '@firebase/remote-config-compat@0.2.23(@firebase/app-compat@0.5.11)(@firebase/app@0.14.11)':
+    dependencies:
+      '@firebase/app-compat': 0.5.11
+      '@firebase/component': 0.7.2
+      '@firebase/logger': 0.5.0
+      '@firebase/remote-config': 0.8.2(@firebase/app@0.14.11)
+      '@firebase/remote-config-types': 0.5.0
+      '@firebase/util': 1.15.0
+      tslib: 2.8.1
+    transitivePeerDependencies:
+      - '@firebase/app'
+
+  '@firebase/remote-config-types@0.5.0': {}
+
+  '@firebase/remote-config@0.8.2(@firebase/app@0.14.11)':
+    dependencies:
+      '@firebase/app': 0.14.11
+      '@firebase/component': 0.7.2
+      '@firebase/installations': 0.6.21(@firebase/app@0.14.11)
+      '@firebase/logger': 0.5.0
+      '@firebase/util': 1.15.0
+      tslib: 2.8.1
+
+  '@firebase/storage-compat@0.4.2(@firebase/app-compat@0.5.11)(@firebase/app-types@0.9.4)(@firebase/app@0.14.11)':
+    dependencies:
+      '@firebase/app-compat': 0.5.11
+      '@firebase/component': 0.7.2
+      '@firebase/storage': 0.14.2(@firebase/app@0.14.11)
+      '@firebase/storage-types': 0.8.3(@firebase/app-types@0.9.4)(@firebase/util@1.15.0)
+      '@firebase/util': 1.15.0
+      tslib: 2.8.1
+    transitivePeerDependencies:
+      - '@firebase/app'
+      - '@firebase/app-types'
+
+  '@firebase/storage-types@0.8.3(@firebase/app-types@0.9.4)(@firebase/util@1.15.0)':
+    dependencies:
+      '@firebase/app-types': 0.9.4
+      '@firebase/util': 1.15.0
+
+  '@firebase/storage@0.14.2(@firebase/app@0.14.11)':
+    dependencies:
+      '@firebase/app': 0.14.11
+      '@firebase/component': 0.7.2
+      '@firebase/util': 1.15.0
+      tslib: 2.8.1
+
+  '@firebase/util@1.15.0':
+    dependencies:
+      tslib: 2.8.1
+
+  '@firebase/webchannel-wrapper@1.0.5': {}
+
   '@floating-ui/core@1.7.5':
     dependencies:
       '@floating-ui/utils': 0.2.11
@@ -3806,6 +4378,18 @@ snapshots:
       - supports-color
       - utf-8-validate
 
+  '@grpc/grpc-js@1.9.15':
+    dependencies:
+      '@grpc/proto-loader': 0.7.15
+      '@types/node': 22.19.17
+
+  '@grpc/proto-loader@0.7.15':
+    dependencies:
+      lodash.camelcase: 4.3.0
+      long: 5.3.2
+      protobufjs: 7.5.5
+      yargs: 17.7.2
+
   '@hapi/address@5.1.1':
     dependencies:
       '@hapi/hoek': 11.0.7
@@ -4973,6 +5557,10 @@ snapshots:
     dependencies:
       reusify: 1.1.0
 
+  faye-websocket@0.11.4:
+    dependencies:
+      websocket-driver: 0.7.4
+
   fdir@6.5.0(picomatch@4.0.4):
     optionalDependencies:
       picomatch: 4.0.4
@@ -5013,6 +5601,39 @@ snapshots:
     transitivePeerDependencies:
       - supports-color
 
+  firebase@12.12.1:
+    dependencies:
+      '@firebase/ai': 2.11.1(@firebase/app-types@0.9.4)(@firebase/app@0.14.11)
+      '@firebase/analytics': 0.10.21(@firebase/app@0.14.11)
+      '@firebase/analytics-compat': 0.2.27(@firebase/app-compat@0.5.11)(@firebase/app@0.14.11)
+      '@firebase/app': 0.14.11
+      '@firebase/app-check': 0.11.2(@firebase/app@0.14.11)
+      '@firebase/app-check-compat': 0.4.2(@firebase/app-compat@0.5.11)(@firebase/app@0.14.11)
+      '@firebase/app-compat': 0.5.11
+      '@firebase/app-types': 0.9.4
+      '@firebase/auth': 1.13.0(@firebase/app@0.14.11)
+      '@firebase/auth-compat': 0.6.5(@firebase/app-compat@0.5.11)(@firebase/app-types@0.9.4)(@firebase/app@0.14.11)
+      '@firebase/data-connect': 0.6.0(@firebase/app@0.14.11)
+      '@firebase/database': 1.1.2
+      '@firebase/database-compat': 2.1.3
+      '@firebase/firestore': 4.14.0(@firebase/app@0.14.11)
+      '@firebase/firestore-compat': 0.4.8(@firebase/app-compat@0.5.11)(@firebase/app-types@0.9.4)(@firebase/app@0.14.11)
+      '@firebase/functions': 0.13.3(@firebase/app@0.14.11)
+      '@firebase/functions-compat': 0.4.3(@firebase/app-compat@0.5.11)(@firebase/app@0.14.11)
+      '@firebase/installations': 0.6.21(@firebase/app@0.14.11)
+      '@firebase/installations-compat': 0.2.21(@firebase/app-compat@0.5.11)(@firebase/app-types@0.9.4)(@firebase/app@0.14.11)
+      '@firebase/messaging': 0.12.25(@firebase/app@0.14.11)
+      '@firebase/messaging-compat': 0.2.25(@firebase/app-compat@0.5.11)(@firebase/app@0.14.11)
+      '@firebase/performance': 0.7.11(@firebase/app@0.14.11)
+      '@firebase/performance-compat': 0.2.24(@firebase/app-compat@0.5.11)(@firebase/app@0.14.11)
+      '@firebase/remote-config': 0.8.2(@firebase/app@0.14.11)
+      '@firebase/remote-config-compat': 0.2.23(@firebase/app-compat@0.5.11)(@firebase/app@0.14.11)
+      '@firebase/storage': 0.14.2(@firebase/app@0.14.11)
+      '@firebase/storage-compat': 0.4.2(@firebase/app-compat@0.5.11)(@firebase/app-types@0.9.4)(@firebase/app@0.14.11)
+      '@firebase/util': 1.15.0
+    transitivePeerDependencies:
+      - '@react-native-async-storage/async-storage'
+
   follow-redirects@1.16.0: {}
 
   form-data@4.0.5:
@@ -5187,6 +5808,8 @@ snapshots:
       statuses: 2.0.2
       toidentifier: 1.0.1
 
+  http-parser-js@0.5.10: {}
+
   https-proxy-agent@7.0.6:
     dependencies:
       agent-base: 7.1.4
@@ -5206,6 +5829,8 @@ snapshots:
     dependencies:
       safer-buffer: 2.1.2
 
+  idb@7.1.1: {}
+
   ieee754@1.2.1: {}
 
   ignore@5.3.2: {}
@@ -5394,6 +6019,8 @@ snapshots:
 
   lines-and-columns@1.2.4: {}
 
+  lodash.camelcase@4.3.0: {}
+
   lodash@4.18.1: {}
 
   log-symbols@6.0.0:
@@ -6560,6 +7187,16 @@ snapshots:
 
   web-streams-polyfill@3.3.3: {}
 
+  web-vitals@4.2.4: {}
+
+  websocket-driver@0.7.4:
+    dependencies:
+      http-parser-js: 0.5.10
+      safe-buffer: 5.2.1
+      websocket-extensions: 0.1.4
+
+  websocket-extensions@0.1.4: {}
+
   which@2.0.2:
     dependencies:
       isexe: 2.0.0
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
  "path": "pnpm-lock.yaml",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "pnpm-lock.yaml",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: pnpm-lock.yaml -->


<!-- BEGIN_FILE_AUDIT: scripts/ux-capture.js -->
---

### File: `scripts/ux-capture.js` +67/-0 (added)

Diff:
```diff
@@ -0,0 +1,67 @@
+const fs = require('fs');
+
+/**
+ * CLI Tool for Agents to capture screenshots for the UX Auditor
+ * Usage: node scripts/ux-capture.js <url> <outputDir>
+ */
+
+let chromium;
+try {
+  chromium = require('playwright').chromium;
+} catch (err) {
+  console.error('Playwright not found. Please install it using "npm install --save-dev playwright".');
+  process.exit(1);
+}
+
+const viewports = [
+  { name: 'mobile', width: 375, height: 667 },
+  { name: 'tablet', width: 768, height: 1024 },
+  { name: 'desktop', width: 1440, height: 900 }
+];
+
+async function capture() {
+  const url = process.argv[2];
+  if (!url) {
+    console.error('Usage: node scripts/ux-capture.js <url> [outputDir]');
+    process.exit(1);
+  }
+
+  const outputDir = process.argv[3] || './ux-snapshots';
+
+  if (!fs.existsSync(outputDir)) {
+    fs.mkdirSync(outputDir, { recursive: true });
+  }
+
+  console.log(`🚀 Starting UX Capture for: ${url}`);
+  const browser = await chromium.launch();
+  const context = await browser.newContext();
+
+  for (const vp of viewports) {
+    console.log(`📸 Capturing ${vp.name}...`);
+    const page = await context.newPage();
+    await page.setViewportSize({ width: vp.width, height: vp.height });
+
+    try {
+      await page.goto(url, { waitUntil: 'networkidle' });
+      // Wait for any animations to settle
+      await page.waitForTimeout(1000);
+
+      await page.screenshot({
+        path: `${outputDir}/${vp.name}.png`,
+        fullPage: false
+      });
+    } catch (e) {
+      console.error(`Failed to capture ${vp.name}: ${e.message}`);
+    } finally {
+      await page.close();
+    }
+  }
+
+  await browser.close();
+  console.log(`✅ Done. Snapshots saved to ${outputDir}`);
+}
+
+capture().catch(err => {
+  console.error(err);
+  process.exit(1);
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
  "path": "scripts/ux-capture.js",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "scripts/ux-capture.js",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: scripts/ux-capture.js -->


<!-- BEGIN_FILE_AUDIT: src/App.tsx -->
---

### File: `src/App.tsx` +2/-0 (modified)

Diff:
```diff
@@ -20,6 +20,7 @@ const GearReviews = lazy(() => import('./pages/Gear'));
 const GearPost = lazy(() => import('./features/lab/GearPost'));
 const Research = lazy(() => import('./pages/Research'));
 const ResearchDetail = lazy(() => import('./pages/ResearchDetail'));
+const UXAuditor = lazy(() => import('./pages/UXAuditor'));
 const Blog = lazy(() => import('./pages/Blog'));
 const BlogPost = lazy(() => import('./pages/BlogPost'));
 const Resources = lazy(() => import('./pages/Resources'));
@@ -66,6 +67,7 @@ export const routes = [
       { path: 'gear/:slug', element: <GearPost /> },
       { path: 'research', element: <Research /> },
       { path: 'research/:id', element: <ResearchDetail /> },
+      { path: 'ux-auditor', element: <UXAuditor /> },
       { path: 'blog', element: <Blog /> },
       { path: 'blog/:slug', element: <BlogPost /> },
       { path: 'resources', element: <Resources /> },
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


<!-- BEGIN_FILE_AUDIT: src/features/research/ResearchAnalytics.tsx -->
---

### File: `src/features/research/ResearchAnalytics.tsx` +1/-1 (modified)

Diff:
```diff
@@ -28,7 +28,7 @@ export default function ResearchAnalytics() {
               <Box 
                 key={tool.id}
                 as="button"
-                onClick={() => navigate(`/research/${tool.id}`)}
+                onClick={() => navigate(tool.id === 'ux-auditor' ? '/ux-auditor' : `/research/${tool.id}`)}
                 surface="default"
                 border
                 padding="card"
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


<!-- BEGIN_FILE_AUDIT: src/features/research/useResearch.ts -->
---

### File: `src/features/research/useResearch.ts` +7/-0 (modified)

Diff:
```diff
@@ -30,6 +30,13 @@ export function useResearch() {
       category: 'Logistics',
       status: 'Active',
       layman: 'Flight finder for WCS events - optimizing travel routes and finding the best deals.'
+    },
+    {
+      id: 'ux-auditor',
+      name: 'Visual UX Auditor',
+      category: 'Development Tool',
+      status: 'Active',
+      layman: 'Automated visual regression and UX improvement suggestions across viewports.'
     }
   ];
 
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
  "path": "src/features/research/useResearch.ts",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/research/useResearch.ts",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/research/useResearch.ts -->


<!-- BEGIN_FILE_AUDIT: src/features/ux-auditor/useUXAuditor.ts -->
---

### File: `src/features/ux-auditor/useUXAuditor.ts` +290/-0 (added)

Diff:
```diff
@@ -0,0 +1,290 @@
+import { useState, useEffect } from 'react';
+import { initializeApp, getApps, getApp } from 'firebase/app';
+import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, User } from 'firebase/auth';
+import { getFirestore, collection, addDoc, onSnapshot, doc, updateDoc } from 'firebase/firestore';
+
+// --- Configuration & Constants ---
+const apiKey = ""; // Provided by environment
+declare const __app_id: string | undefined;
+declare const __firebase_config: string | undefined;
+declare const __initial_auth_token: string | undefined;
+
+const appId = typeof __app_id !== 'undefined' ? __app_id : 'ux-auditor-v2';
+const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
+
+export const VIEWPORTS = [
+  { name: 'Mobile', width: 375, height: 667 },
+  { name: 'Tablet', width: 768, height: 1024 },
+  { name: 'Desktop', width: 1440, height: 900 }
+];
+
+export interface Improvement {
+  element: string;
+  issue: string;
+  suggestion: string;
+  severity: number;
+}
+
+export interface ViewportAnalysis {
+  summary: string;
+  improvements: Improvement[];
+}
+
+export interface UXReport {
+  id: string;
+  url: string;
+  timestamp: number;
+  status: 'processing' | 'completed';
+  [key: string]: string | number | ViewportAnalysis | undefined; // Allow dynamic keys like findings_mobile, image_mobile
+}
+
+export function useUXAuditor() {
+  const [user, setUser] = useState<User | null>(null);
+  const [reports, setReports] = useState<UXReport[]>([]);
+  const [isAnalyzing, setIsAnalyzing] = useState(false);
+  const [activeReport, setActiveReport] = useState<UXReport | null>(null);
+  const [url, setUrl] = useState('https://arii.github.io/tech-dancer/');
+  const [isExporting, setIsExporting] = useState(false);
+
+  // Firebase Init
+  useEffect(() => {
+    if (!firebaseConfig) return;
+    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
+    const auth = getAuth(app);
+    // getFirestore(app);
+
+    const initAuth = async () => {
+      try {
+        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
+          await signInWithCustomToken(auth, __initial_auth_token);
+        } else {
+          await signInAnonymously(auth);
+        }
+      } catch (err) {
+        console.error("Firebase auth error:", err);
+      }
+    };
+    initAuth();
+
+    const unsubscribeAuth = onAuthStateChanged(auth, setUser);
+    return () => unsubscribeAuth();
+  }, []);
+
+  // Fetch Reports
+  useEffect(() => {
+    if (!user || !firebaseConfig) return;
+    const db = getFirestore();
+    const q = collection(db, 'artifacts', appId, 'users', user.uid, 'ux_reports');
+
+    const unsubscribe = onSnapshot(q, (snapshot) => {
+      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UXReport));
+      setReports(data.sort((a, b) => b.timestamp - a.timestamp));
+    }, (err) => console.error("Firestore error:", err));
+
+    return () => unsubscribe();
+  }, [user]);
+
+  const runUXAudit = async () => {
+    if (!url) return;
+    setIsAnalyzing(true);
+
+    try {
+      let reportId = Date.now().toString();
+
+      const newReport: UXReport = {
+        id: reportId,
+        url,
+        timestamp: Date.now(),
+        status: 'processing',
+      };
+
+      // Add to local state immediately for optimistic UI
+      setReports(prev => [newReport, ...prev].sort((a, b) => b.timestamp - a.timestamp));
+      setActiveReport(newReport);
+
+      if (user && firebaseConfig) {
+        const db = getFirestore();
+        const newReportRef = await addDoc(collection(db, 'artifacts', appId, 'users', user.uid, 'ux_reports'), newReport);
+        reportId = newReportRef.id;
+        newReport.id = reportId;
+      }
+
+      for (const vp of VIEWPORTS) {
+        // Attempt to fetch a real snapshot using a free public proxy API
+        // This is a best effort. If it fails due to CORS, we will handle it.
+        let mockImg = `https://placehold.co/${vp.width}x${vp.height}/6366f1/ffffff?text=${vp.name}+Analysis+Pending`;
+        let base64DataUri = "";
+
+        try {
+          // A simple way to get a snapshot (mshots API from WP is free and fast for public URLs)
+          // Reduce the dimensions by 50% to save base64 character count
+          const scaledW = Math.floor(vp.width * 0.5);
+          const scaledH = Math.floor(vp.height * 0.5);
+          const snapshotUrl = `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=${scaledW}&h=${scaledH}`;
+          const res = await fetch(snapshotUrl);
+          if (res.ok) {
+            const blob = await res.blob();
+            // Convert to base64 Data URI
+            base64DataUri = await new Promise<string>((resolve) => {
+              const reader = new FileReader();
+              reader.onloadend = () => resolve(reader.result as string);
+              reader.readAsDataURL(blob);
+            });
+            mockImg = base64DataUri;
+          }
+        } catch (e) {
+          console.error("Failed to fetch realistic snapshot, using placeholder", e);
+        }
+
+        const analysis = await analyzeViewport(vp, url, base64DataUri);
+
+        newReport[`findings_${vp.name.toLowerCase()}`] = analysis;
+        newReport[`image_${vp.name.toLowerCase()}`] = mockImg;
+
+        setReports(prev => prev.map(r => r.id === reportId ? { ...newReport } : r));
+
+        if (user && firebaseConfig) {
+          const db = getFirestore();
+          await updateDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'ux_reports', reportId), {
+            [`findings_${vp.name.toLowerCase()}`]: analysis,
+            [`image_${vp.name.toLowerCase()}`]: mockImg
+          });
+        }
+      }
+
+      newReport.status = 'completed';
+      setReports(prev => prev.map(r => r.id === reportId ? { ...newReport } : r));
+      setActiveReport({ ...newReport });
+
+      if (user && firebaseConfig) {
+        const db = getFirestore();
+        await updateDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'ux_reports', reportId), {
+          status: 'completed'
+        });
+      }
+    } catch (error) {
+      console.error("Audit failed", error);
+    } finally {
+      setIsAnalyzing(false);
+    }
+  };
+
+  const analyzeViewport = async (viewport: { name: string, width: number, height: number }, targetUrl: string, base64DataUri?: string) => {
+    const systemPrompt = `You are a Senior UX Auditor. Analyze the UI for ${viewport.name}. Focus on specific elements, accessibility, and visual bugs. Output JSON.`;
+    const userQuery = `Analyze ${targetUrl} on ${viewport.name}.`;
+
+    try {
+      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
+        method: 'POST',
+        headers: { 'Content-Type': 'application/json' },
+        body: JSON.stringify({
+          contents: [{ parts: [{ text: userQuery }] }],
+          systemInstruction: { parts: [{ text: systemPrompt }] },
+          generationConfig: {
+            responseMimeType: "application/json",
+            responseSchema: {
+              type: "OBJECT",
+              properties: {
+                summary: { type: "STRING" },
+                improvements: {
+                  type: "ARRAY",
+                  items: {
+                    type: "OBJECT",
+                    properties: {
+                      element: { type: "STRING" },
+                      issue: { type: "STRING" },
+                      suggestion: { type: "STRING" },
+                      severity: { type: "NUMBER" }
+                    }
+                  }
+                }
+              }
+            }
+          }
+        })
+      });
+      const result = await response.json();
+      return JSON.parse(result.candidates[0].content.parts[0].text) as ViewportAnalysis;
+    } catch (err) {
+      // Provide a populated prompt if API fails, as requested
+      const imgContext = base64DataUri
+        ? `Here is the base64 encoded snapshot:\n${base64DataUri}`
+        : `[Please attach the image from scripts/ux-capture.js here]`;
+
+      return {
+        summary: "API Key missing or fetch failed. Manual analysis required. Copy the prompt below.",
+        improvements: [
+          {
+            element: "Manual Audit Required",
+            issue: "No automated analysis generated.",
+            suggestion: `Prompt: You are a Senior UX Auditor. Analyze the UI for ${viewport.name}. Focus on specific elements, accessibility, and visual bugs. Identify 'Cardocalypse', 'Centering Sickness', and violations of flat design principles. Provide recommendations.\n\n${imgContext}`,
+            severity: 5
+          }
+        ]
+      } as ViewportAnalysis;
+    }
+  };
+
+  const getMarkdown = () => {
+    if (!activeReport) return "";
+    let md = `# Visual UX Audit for ${activeReport.url}\n\n`;
+    VIEWPORTS.forEach(vp => {
+      const data = activeReport[`findings_${vp.name.toLowerCase()}`] as ViewportAnalysis;
+      if (data) {
+        md += `## ${vp.name} Analysis\n${data.summary}\n\n`;
+        md += `| Element | Issue | Suggestion | Severity |\n|---|---|---|---|\n`;
+        data.improvements?.forEach(i => {
+          md += `| ${i.element} | ${i.issue} | ${i.suggestion} | ${i.severity}/10 |\n`;
+        });
+        md += `\n`;
+      }
+    });
+    return md;
+  };
+
+  const exportToGithub = () => {
+    if (!activeReport) return;
+    const body = encodeURIComponent(getMarkdown());
+    const title = encodeURIComponent(`UX Audit Findings: ${activeReport.url}`);
+
+    // Attempt to parse repository from URL
+    let repoBase = "https://github.com/new";
+    try {
+      const urlObj = new URL(activeReport.url);
+      if (urlObj.hostname.endsWith('.github.io')) {
+        const userPart = urlObj.hostname.split('.')[0];
+        const repo = urlObj.pathname.split('/')[1];
+        if (userPart && repo) repoBase = `https://github.com/${userPart}/${repo}/issues/new`;
+      }
+    } catch (e) {}
+
+    window.open(`${repoBase}?title=${title}&body=${body}`, '_blank');
+  };
+
+  const copyMarkdown = () => {
+    const md = getMarkdown();
+    const el = document.createElement('textarea');
+    el.value = md;
+    document.body.appendChild(el);
+    el.select();
+    document.execCommand('copy');
+    document.body.removeChild(el);
+    setIsExporting(true);
+    setTimeout(() => setIsExporting(false), 2000);
+  };
+
+  return {
+    user,
+    reports,
+    isAnalyzing,
+    activeReport,
+    setActiveReport,
+    url,
+    setUrl,
+    isExporting,
+    runUXAudit,
+    exportToGithub,
+    copyMarkdown,
+    firebaseConfig // Exported just to check if it's initialized in the UI if needed
+  };
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
  "path": "src/features/ux-auditor/useUXAuditor.ts",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/ux-auditor/useUXAuditor.ts",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/ux-auditor/useUXAuditor.ts -->


<!-- BEGIN_FILE_AUDIT: src/pages/UXAuditor.tsx -->
---

### File: `src/pages/UXAuditor.tsx` +266/-0 (added)

Diff:
```diff
@@ -0,0 +1,266 @@
+import {
+  Camera, CheckCircle, RefreshCw,
+  Smartphone, Monitor, Tablet, Copy, Image as ImageIcon,
+  ChevronRight, Github
+} from 'lucide-react';
+import { useUXAuditor, VIEWPORTS, ViewportAnalysis } from '@/features/ux-auditor/useUXAuditor';
+import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
+import { PageHeader } from '@/components/ui/PageHeader';
+
+const viewportIcons = {
+  Mobile: <Smartphone className="w-5 h-5" />,
+  Tablet: <Tablet className="w-5 h-5" />,
+  Desktop: <Monitor className="w-5 h-5" />
+};
+
+export default function UXAuditor() {
+  const {
+    reports,
+    isAnalyzing,
+    activeReport,
+    setActiveReport,
+    url,
+    setUrl,
+    isExporting,
+    runUXAudit,
+    exportToGithub,
+    copyMarkdown,
+  } = useUXAuditor();
+
+  return (
+    <Stack gap={8} className="w-full">
+      <Stack
+        direction={{ base: 'col', md: 'row' }}
+        align={{ base: 'start', md: 'center' }}
+        justify="between"
+        gap={6}
+        className="border-b border-line pb-6"
+      >
+        <Box>
+          <PageHeader
+            label="Visual UX Auditor"
+            title="Multimodal AI Analysis"
+            description="Automated visual regression and UX improvement suggestions across viewports."
+          />
+        </Box>
+
+        <Box
+          display="flex"
+          align="center"
+          gap={3}
+          className="bg-surface p-2 rounded-xl shadow-sm border border-line"
+        >
+          <input
+            type="text"
+            value={url}
+            onChange={(e) => setUrl(e.target.value)}
+            className="px-4 py-2 rounded-lg bg-bg border-none focus:ring-2 focus:ring-accent outline-none w-64 text-sm font-mono text-text"
+            placeholder="https://..."
+          />
+          <button
+            onClick={runUXAudit}
+            disabled={isAnalyzing}
+            className="bg-accent hover:opacity-90 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all disabled:opacity-50"
+          >
+            {isAnalyzing ? <RefreshCw className="animate-spin w-4 h-4" /> : <Camera className="w-4 h-4" />}
+            {isAnalyzing ? 'Auditing...' : 'Start Audit'}
+          </button>
+        </Box>
+      </Stack>
+
+      <Grid cols={{ base: 1, lg: 4 }} gap={8}>
+        {/* Reports List */}
+        <Stack gap={4} className="lg:col-span-1">
+          <Text variant="sans" size="xs" weight="font-bold" className="uppercase tracking-widest text-text-dim px-1">
+            Audit History
+          </Text>
+          <Box className="bg-surface rounded-2xl shadow-sm border border-line overflow-hidden divide-y divide-line">
+            {reports.length === 0 && (
+              <Box padding={10} className="text-center text-text-dim italic text-sm">
+                No snapshots recorded
+              </Box>
+            )}
+            {reports.map((report) => (
+              <button
+                key={report.id}
+                onClick={() => setActiveReport(report)}
+                className={`w-full text-left p-4 hover:bg-bg transition-all flex items-center gap-3 ${
+                  activeReport?.id === report.id ? 'bg-bg border-l-4 border-accent' : 'border-l-4 border-transparent'
+                }`}
+              >
+                <Box
+                  padding={2}
+                  radius="full"
+                  className={report.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600 animate-pulse'}
+                >
+                  {report.status === 'completed' ? <CheckCircle className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
+                </Box>
+                <Box flex={1} className="min-w-0">
+                  <Text variant="sans" size="sm" weight="font-bold" className="text-text truncate">
+                    {report.url.replace('https://', '')}
+                  </Text>
+                  <Text variant="mono" size="xs" weight="font-medium" className="text-text-dim uppercase">
+                    {new Date(report.timestamp).toLocaleTimeString()}
+                  </Text>
+                </Box>
+                <ChevronRight className="w-4 h-4 text-text-dim opacity-50" />
+              </button>
+            ))}
+          </Box>
+        </Stack>
+
+        {/* Detailed View */}
+        <Stack gap={6} className="lg:col-span-3">
+          {activeReport ? (
+            <>
+              <Box
+                className="bg-surface p-6 rounded-2xl shadow-sm border border-line flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
+              >
+                <Box>
+                  <Text variant="sans" size="xs" weight="font-bold" className="text-accent mb-1 uppercase tracking-tighter">
+                    Current Session
+                  </Text>
+                  <Text variant="sans" size="xl" weight="font-black" className="text-text">
+                    {activeReport.url}
+                  </Text>
+                </Box>
+                <Box display="flex" gap={2}>
+                  <button
+                    onClick={copyMarkdown}
+                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold bg-bg text-text-dim hover:text-text transition-all text-sm"
+                  >
+                    {isExporting ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
+                    {isExporting ? 'Copied' : 'Copy MD'}
+                  </button>
+                  <button
+                    onClick={exportToGithub}
+                    disabled={activeReport.status !== 'completed'}
+                    className="flex items-center gap-2 px-6 py-2 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-lg text-sm transition-all disabled:opacity-50"
+                  >
+                    <Github className="w-4 h-4" />
+                    Export to GitHub Issue
+                  </button>
+                </Box>
+              </Box>
+
+              <Stack gap={8}>
+                {VIEWPORTS.map(vp => {
+                  const data = activeReport[`findings_${vp.name.toLowerCase()}`] as ViewportAnalysis;
+                  const imgUrl = activeReport[`image_${vp.name.toLowerCase()}`];
+
+                  return (
+                    <Box key={vp.name} className="bg-surface rounded-2xl shadow-sm border border-line overflow-hidden">
+                      <Box className="p-4 border-b border-line flex items-center justify-between bg-bg">
+                        <Box display="flex" align="center" gap={3}>
+                          <Box className="p-2 bg-surface rounded-lg shadow-sm text-accent">
+                            {viewportIcons[vp.name as keyof typeof viewportIcons]}
+                          </Box>
+                          <Text variant="sans" size="base" weight="font-bold" className="text-text">
+                            {vp.name} Analysis
+                          </Text>
+                        </Box>
+                        <Text variant="mono" size="xs" weight="font-bold" className="text-text-dim uppercase tracking-widest">
+                          {vp.width}w × {vp.height}h
+                        </Text>
+                      </Box>
+
+                      <Grid cols={{ base: 1, md: 2 }}>
+                        <Box className="p-8 bg-bg flex items-center justify-center border-r border-line min-h-[400px]">
+                          {imgUrl ? (
+                            <img
+                              src={imgUrl}
+                              alt={`${vp.name} snapshot`}
+                              className="w-full h-auto rounded-xl shadow-2xl border border-surface object-contain bg-surface"
+                              style={{ maxHeight: '450px' }}
+                              onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/${vp.width}x${vp.height}/e2e8f0/64748b?text=Snapshot+Unavailable`; }}
+                            />
+                          ) : (
+                            <Box className="text-center text-text-dim">
+                              <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-20" />
+                              <Text variant="sans" size="xs" weight="font-bold" className="uppercase tracking-wider">
+                                Awaiting Frame...
+                              </Text>
+                            </Box>
+                          )}
+                        </Box>
+
+                        <Stack gap={6} padding={8}>
+                          {data ? (
+                            <>
+                              <Box className="bg-bg border border-line p-5 rounded-2xl">
+                                <Text variant="sans" size="xs" weight="font-black" className="text-accent uppercase mb-2 tracking-widest">
+                                  Analysis Summary
+                                </Text>
+                                <Text variant="sans" size="sm" weight="font-medium" className="text-text leading-relaxed">
+                                  "{data.summary}"
+                                </Text>
+                              </Box>
+                              <Stack gap={4}>
+                                {data.improvements?.map((imp, idx) => (
+                                  <Box key={idx} className="p-4 rounded-xl border border-line hover:border-accent/30 transition-all bg-surface shadow-sm">
+                                    <Box display="flex" justify="between" align="start" className="mb-2">
+                                      <Text variant="sans" size="sm" weight="font-black" className="text-text flex items-center gap-2">
+                                        <div className={`h-2 w-2 rounded-full ${imp.severity > 7 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' : 'bg-amber-500'}`} />
+                                        {imp.element}
+                                      </Text>
+                                      <Text variant="mono" size="xs" weight="font-black" className="px-2 py-0.5 rounded-full bg-bg text-text-dim uppercase">
+                                        LVL {imp.severity}
+                                      </Text>
+                                    </Box>
+                                    <Text variant="sans" size="xs" className="text-text-dim mb-3">
+                                      {imp.issue}
+                                    </Text>
+                                    <Box className="bg-bg p-3 rounded-lg border border-line flex items-start gap-2">
+                                      <Text variant="sans" size="xs" weight="font-bold" className="text-accent mt-0.5">FIX</Text>
+                                      <Box className="flex-1 min-w-0">
+                                        <Text variant="sans" size="xs" weight="font-bold" className="text-text break-words whitespace-pre-wrap line-clamp-4">
+                                          {imp.suggestion}
+                                        </Text>
+                                        {imp.element === "Manual Audit Required" && (
+                                          <button
+                                            onClick={() => navigator.clipboard.writeText(imp.suggestion)}
+                                            className="mt-2 flex items-center gap-1 px-3 py-1 rounded bg-surface border border-line hover:border-accent transition-colors text-xs font-bold text-text-dim hover:text-accent"
+                                          >
+                                            <Copy className="w-3 h-3" />
+                                            Copy Prompt
+                                          </button>
+                                        )}
+                                      </Box>
+                                    </Box>
+                                  </Box>
+                                ))}
+                              </Stack>
+                            </>
+                          ) : (
+                            <Box className="flex flex-col items-center justify-center py-20 text-text-dim">
+                              <RefreshCw className="animate-spin mb-3 w-6 h-6" />
+                              <Text variant="sans" size="xs" weight="font-bold" className="tracking-widest uppercase">
+                                Agent Processing...
+                              </Text>
+                            </Box>
+                          )}
+                        </Stack>
+                      </Grid>
+                    </Box>
+                  );
+                })}
+              </Stack>
+            </>
+          ) : (
+            <Box className="h-full flex flex-col items-center justify-center bg-surface rounded-3xl border-2 border-dashed border-line p-20 text-center min-h-[500px]">
+              <Box className="bg-bg p-6 rounded-full mb-6 text-text-dim/50">
+                <Camera className="w-16 h-16" />
+              </Box>
+              <Text variant="sans" size="xl" weight="font-black" className="text-text mb-2">
+                Ready to Audit
+              </Text>
+              <Text variant="sans" size="sm" weight="font-medium" className="text-text-dim max-w-sm mx-auto">
+                Enter a URL above to start the visual analysis across Mobile, Tablet, and Desktop.
+              </Text>
+            </Box>
+          )}
+        </Stack>
+      </Grid>
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
  "path": "src/pages/UXAuditor.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/pages/UXAuditor.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/pages/UXAuditor.tsx -->


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
python3 dev-tools/submit_pr_review_data.py plan-pr-review-166.md
```

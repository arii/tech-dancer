# PR Context: #453 — Add Documentation Style Guide
**Author:** @arii

## Description
This commit adds a new style guide, DOCS_STYLE_GUIDE.md, to the root directory. The guide provides instructions for converting passive voice to active voice and identifies redundant technical jargon to avoid, ensuring a direct and energetic tone in the project's documentation and UI text.

Fixes #452

---
*PR created automatically by Jules for task [16999980170407982477](https://jules.google.com/task/16999980170407982477) started by @arii*

## Files Changed
- 🟢 `DOCS_STYLE_GUIDE.md`
- 🟡 `README.md`
- 🟡 `content/posts/2026-04-18-ai-role-dance.md`
- 🟡 `content/posts/2026-04-18-competition-metrics.md`
- 🟡 `content/posts/2026-04-18-github-actions.md`
- 🟡 `content/posts/2026-04-18-make-shoe-dance.md`
- 🟡 `content/posts/2026-04-18-pivoting-consultant.md`
- 🟡 `content/posts/2026-04-19-gear-essentials.md`
- 🟡 `content/resources/2026-04-12-suede-shoe-diy.md`
- 🟡 `src/config/constants.ts`
- 🟡 `src/data/affiliates.json`
- 🟡 `src/features/dashboard/Dashboard.tsx`
- 🟡 `src/features/lab/useToolbox.ts`
- 🟡 `src/features/profile/ArielProfile.tsx`
- 🟡 `src/features/profile/useProfile.ts`
- 🟡 `src/features/research/ResearchDetail.tsx`
- 🟡 `src/lib/variants.ts`
- 🟡 `tests/visual.spec.ts-snapshots/about-chromium-linux.png`

## Diffs

### `DOCS_STYLE_GUIDE.md` (added)
```diff
@@ -0,0 +1,61 @@
   1 |+# Style Guide: Active Voice & Jargon Reduction
   2 |+
   3 |+Use these instructions to audit and refine READMEs, blog posts, and UI text. This ensures our content feels like it was written by a human expert, not an automated generator.
   4 |+
   5 |+## 1. Converting Passive Voice to Active Voice
   6 |+
   7 |+Passive voice often hides the "actor" and makes sentences feel heavy or clinical. Active voice is shorter and more engaging.
   8 |+
   9 |+### Identification
  10 |+Look for variations of the verb **"to be"** (am, is, are, was, were, be, being, been) combined with a **past participle** (verbs ending in -ed or -en).
  11 |+
  12 |+### Transformation Rules
  13 |+1. **Identify the Actor:** Who is performing the action?
  14 |+2. **Move the Actor to the Front:** Make them the subject of the sentence.
  15 |+3. **Use a Strong Verb:** Replace the "to be" construction with the action itself.
  16 |+
  17 |+| Passive Voice (Avoid) | Active Voice (Prefer) |
  18 |+| :--- | :--- |
  19 |+| The dance floor **is being swept** by the crew. | The crew **sweeps** the dance floor. |
  20 |+| The component **was optimized** for performance. | We **tuned** the component for speed. |
  21 |+| Data **is fetched** by the hook. | The hook **fetches** data. |
  22 |+| The "Physics" engine **is utilized** for movement. | Our engine **powers** the movement. |
  23 |+
  24 |+---
  25 |+
  26 |+## 2. Redundant "Techy" Jargon Audit
  27 |+
  28 |+Avoid words that sound "smart" but add no specific meaning. If you can remove the word without changing the meaning of the sentence, it is redundant.
  29 |+
  30 |+### The "Empty Word" Watch List
  31 |+Avoid using these words as "padding" or fillers.
  32 |+
  33 |+* **"Systems"**: Usually unnecessary.
  34 |+    * *Bad:* "Our movement systems are ready."
  35 |+    * *Good:* "The movements are ready."
  36 |+* **"Optimized"**: Often a buzzword for "fast" or "fixed."
  37 |+    * *Bad:* "An optimized workflow for dancers."
  38 |+    * *Good:* "A faster workflow for dancers."
  39 |+* **"Physics"**: Frequently used to describe simple math or logic.
  40 |+    * *Bad:* "We used physics to calculate the spin."
  41 |+    * *Good:* "We calculated the spin."
  42 |+* **"Utilize"**: Just use **"Use."**
  43 |+* **"Framework"**: Unless referring to a specific library (like React), it’s often fluff.
  44 |+* **"Functionality"**: Just use **"Feature"** or **"Behavior."**
  45 |+* **"Solution"**: Usually vague. Specify what the tool actually *is*.
  46 |+* **"Robust"**: A classic filler word for "it works well."
  47 |+
  48 |+---
  49 |+
  50 |+## 3. The "So What?" Test
  51 |+
  52 |+For every sentence, ask: **"Can I say this more simply?"**
  53 |+
  54 |+* **Wordy:** "The implementation of the search functionality was executed to facilitate user discovery."
  55 |+* **Direct:** "We built the search bar to help users find content."
  56 |+
  57 |+## 4. Implementation Steps
  58 |+
  59 |+1. **Scan:** Use `CTRL+F` for "is", "was", "been", and the jargon words listed above.
  60 |+2. **Rewrite:** Apply the transformation rules.
  61 |+3. **Verify:** Read the new sentence aloud. Does it sound like a person talking to a partner? If yes, keep it.
```

### `README.md` (modified)
```diff
@@ -3,7 +3,7 @@
   3 | The Roboticist's Guide to the West Coast Swing.
   4 | 
   5 | ## Overview
     |-A gear, tech, and travel guide for West Coast Swing dancers. Built with Next.js to provide real-time comp data and travel logistics.
   6 |+A gear, tech, and travel guide for West Coast Swing dancers. We use Next.js to provide real-time comp data and travel logistics.
   7 | 
   8 | ## Features
   9 | - **Folio Journal**: Deep dives into technique, engineering, and lifestyle.
@@ -12,7 +12,7 @@ A gear, tech, and travel guide for West Coast Swing dancers. Built with Next.js
  12 | - **Real-time Hub**: WebSocket-driven dashboard for live event monitoring.
  13 | 
  14 | ## Account Context
     |-- **GitHub**: All submissions and issue tracking are handled via the [arii](https://github.com/arii) account.
  15 |+- **GitHub**: We handle all submissions and issue tracking via the [arii](https://github.com/arii) account.
  16 | 
  17 | ## Development
  18 | ```bash
```

### `content/posts/2026-04-18-ai-role-dance.md` (modified)
```diff
@@ -14,7 +14,7 @@ tags:
  14 | 
  15 | ## AI in the Ballroom
  16 | 
     |-Artificial Intelligence is often seen as a cold, analytical tool, but in the context of dance, it can be deeply clarifying. 
  17 |+Dancers often see Artificial Intelligence as a cold, analytical tool, but it can deeply clarify movement.
  18 | 
  19 | ### Computer Vision & Frame Analysis
  20 | 
```

### `content/posts/2026-04-18-competition-metrics.md` (modified)
```diff
@@ -29,4 +29,4 @@ The majority of above-average dancers don’t make it to finals occasionally. Th
  29 | 
  30 | By recording your videos and analyzing them objectively, you can track your *actual* improvement regardless of the final scores. Objective analysis, such as reviewing your video footage to check connection, timing, and footwork, is vastly superior to relying on placement scores which carry high variance.
  31 | 
     |-Focus on the systems and the video review process; let the scores be the noise.
  32 |+Focus on the workflows and the video review process; let the scores be the noise.
```

### `content/posts/2026-04-18-github-actions.md` (modified)
```diff
@@ -14,7 +14,7 @@ tags:
  14 | 
  15 | ## Reliable Deployments
  16 | 
     |-Building a "living portfolio" requires a system that handles the mundane tasks of deployment. I use **GitHub Actions** to automate the build, test, and release cycles of this platform.
  17 |+Building a "living portfolio" requires a workflow that handles the mundane tasks of deployment. I use **GitHub Actions** to automate the build, test, and release cycles of this platform.
  18 | 
  19 | ### The Pipeline
  20 | 
```

### `content/posts/2026-04-18-make-shoe-dance.md` (modified)
```diff
@@ -14,7 +14,7 @@ tags:
  14 | 
  15 | ## Suede Your Dance Shoes
  16 | 
     |-Buying dedicated dance shoes can be expensive and often limited in style. My preferred system is to "upgrade" high-comfort sneakers or flats using adhesive suede.
  17 |+Buying dedicated dance shoes can be expensive and often limited in style. My preferred workflow is to "upgrade" high-comfort sneakers or flats using adhesive suede.
  18 | 
  19 | ### Potential Options and Analysis
  20 | 
```

### `content/posts/2026-04-18-pivoting-consultant.md` (modified)
```diff
@@ -18,6 +18,6 @@ In WCS, a pivot requires a clear axis and controlled momentum. In tech, a pivot
  18 | 
  19 | ### specialized Project Work
  20 | 
     |-I've shifted my focus towards **project-based work** as a roboticist and AI expert. This allows me to apply specialized solutions to unique problems without the drag of traditional 9-to-5s.
  21 |+I've shifted my focus towards **project-based work** as a roboticist and AI expert. This allows me to apply specialized fixes to unique problems without the drag of traditional 9-to-5s.
  22 | 
     |-If you're looking for an expert to architect a complex system or audit your data pipelines, this living portfolio is my proof-of-work.
  23 |+If you're looking for an expert to architect a complex workflow or audit your data pipelines, this living portfolio is my proof-of-work.
```

### `content/posts/2026-04-19-gear-essentials.md` (modified)
```diff
@@ -6,7 +6,7 @@ author: "Ariel Anders, PhD"
   6 | category: "Travel"
   7 | excerpt: "Loop earplugs, industrial travel steamers, and portable sound. Why these three Pieces of gear are the secret to a better dance weekend."
   8 | image: ""
     |-tags: ["travel", "gear", "systems"]
   9 |+tags: ["travel", "gear", "workflows"]
  10 | ---
  11 | 
  12 | ## Elevating Your Dance Weekend
```

### `content/resources/2026-04-12-suede-shoe-diy.md` (modified)
```diff
@@ -22,7 +22,7 @@ updatedDate: "Mar 2024"
  22 | 
  23 | There is nothing worse than arriving at a major WSDC convention only to find that the hotel ballroom floor is either a "slip-and-slide" or effectively a sheet of flypaper. When your equipment fails to provide predictable friction, your technique—and your knee health—takes the hit.
  24 | 
     |-## The Solution: How to Suede Your Shoes
  25 |+## The Fix: How to Suede Your Shoes
  26 | 
  27 | Instead of paying the $180 "dance shoe tax" for flimsy professional shoes, I use a $15 DIY approach to convert my favorite comfortable sneakers into dance shoes.
  28 | 
@@ -40,9 +40,9 @@ Instead of paying the $180 "dance shoe tax" for flimsy professional shoes, I use
  40 | 2.  **Glue it**: Apply a thin layer of Barge Cement to both the shoe and the suede. Wait for it to become tacky.
  41 | 3.  **Let it dry**: Press the surfaces together and let cure for 24 hours. They will hold up on any social floor.
  42 | 
     |-## Suede Coverage Analysis Diagram
  43 |+## Suede Coverage Diagram
  44 | 
     |-A key to effective traction is selecting the right coverage pattern for your movement style. Here is a comparison:
  45 |+We select the right coverage pattern for the movement style to ensure effective traction. Here is a comparison:
  46 | 
  47 | - **Ball Only:** Offers great spinning capability but minimal breaking control. Slippery on high-speed moves.
  48 | - **Split (Ball and Heel separated):** Adds braking power but can catch the edge of the suede during rolling steps.
@@ -52,7 +52,7 @@ A key to effective traction is selecting the right coverage pattern for your mov
  52 | These modification have survived 8+ hour social sets at major conventions. The bond is permanent and the friction is highly consistent.
  53 | 
  54 | ## Verdict
     |-Suede your own shoes. It's the only way to get a truly robust connection on unpredictable ballroom floors.
  55 |+Suede your own shoes. It's the only way to get a truly reliable connection on unpredictable ballroom floors.
  56 | 
  57 | ---
  58 | 
```

### `src/config/constants.ts` (modified)
```diff
@@ -1,6 +1,6 @@
   1 | export const BASE_URL = import.meta.env.VITE_APP_URL || 'https://arii.github.io/tech-dancer';
   2 | export const SITE_NAME = 'TechDancer';
     |-const DEFAULT_DESCRIPTION = "The Roboticist's Guide to the West Coast Swing. Exploring the intersection of dance, physics, and engineering.";
   3 |+const DEFAULT_DESCRIPTION = "The Roboticist's Guide to the West Coast Swing. We explore the intersection of dance, movement math, and engineering.";
   4 | 
   5 | export const STATIC_SCHEMAS = {
   6 |   HOME: {
```

### `src/data/affiliates.json` (modified)
```diff
@@ -67,7 +67,7 @@
  67 |     "name": "OLV Neck Fan",
  68 |     "url": "https://amazon.com",
  69 |     "category": "gear",
     |-    "description": "Hands-free cooling solution for hot events."
  70 |+    "description": "Hands-free cooling tool for hot events."
  71 |   },
  72 |   "hanging-toiletry-bag": {
  73 |     "id": "hanging-toiletry-bag",
```

### `src/features/dashboard/Dashboard.tsx` (modified)
```diff
@@ -18,15 +18,15 @@ export default function Home() {
  18 |     <Box as="section">
  19 |       <SEO
  20 |         title="Home"
     |-        description="TechDancer: Exploring the intersection of dance, physics, and engineering through interactive studies and resources. The Roboticist's Guide to West Coast Swing."
  21 |+        description="TechDancer: We explore the intersection of dance, movement math, and engineering through interactive studies and resources. The Roboticist's Guide to West Coast Swing."
  22 |         schema={STATIC_SCHEMAS.HOME}
  23 |       />
  24 |       <Stack gap={8}>
  25 |         <Box paddingLeft={{ base: 4, md: 16, lg: 20 }}>
  26 |           <PageHeader
  27 |             label="WELCOME"
  28 |             title="The Roboticist's Guide to West Coast Swing"
     |-            description="Technical systems and travel hacks for the modern competitive dancer."
  29 |+            description="Technical tools and travel hacks for the modern competitive dancer."
  30 |             border="none"
  31 |             paddingBottom={0}
  32 |             titleSize="fluid-7"
```

### `src/features/lab/useToolbox.ts` (modified)
```diff
@@ -19,7 +19,7 @@ export function useToolbox() {
  19 |   const categories = [
  20 |     { id: 'dance', label: 'Row 1: Dance Equipment', description: 'Technical reviews of competitive social dance footwear and accessories.' },
  21 |     { id: 'fashion', label: 'Row 2: Fashion', description: 'Bright, fun outfits curated for movement, comfort, and style on the dance floor.' },
     |-    { id: 'travel', label: 'Row 3: Travel Related', description: 'Optimized logistics gear for the convention circuit and bougie-on-a-budget travel.' }
  22 |+    { id: 'travel', label: 'Row 3: Travel Related', description: 'Efficient logistics gear for the convention circuit and bougie-on-a-budget travel.' }
  23 |   ];
  24 | 
  25 |   const groupedResources = useMemo(() => {
```

### `src/features/profile/ArielProfile.tsx` (modified)
```diff
@@ -11,7 +11,7 @@ export default function ArielProfile() {
  11 |     <Box as="section" height="full">
  12 |       <SEO
  13 |         title="About"
     |-        description="Ariel Anders, PhD: Roboticist, Dancer, and Engineer. Exploring the intersection of technical systems and creative movement."
  14 |+        description="Ariel Anders, PhD: Roboticist, Dancer, and Engineer. We explore the intersection of technical tools and creative movement."
  15 |       />
  16 |       
  17 |       <PageHeader
```

### `src/features/profile/useProfile.ts` (modified)
```diff
@@ -12,17 +12,17 @@ const PROFILE_DATA: ProfileData = {
  12 |       {
  13 |         id: "phd-matters",
  14 |         title: "Why My PhD Matters",
     |-        content: "I believe in building things that actually work. Since 2010, I have dedicated myself to creating robotic systems that stay reliable even in complex situations. From my PhD at MIT to my industry experience, I don't just study data—I engineer real-world systems that deliver results. I consider myself a pragmatic roboticist: I use machine learning, traditional AI, and solid software design to build systems that are functional, robust, and ready to complete the task at hand."
  15 |+        content: "I believe in building things that actually work. Since 2010, I have dedicated myself to creating robots that stay reliable even in complex situations. From my PhD at MIT to my industry experience, I don't just study data—I engineer real-world tools that deliver results. I consider myself a pragmatic roboticist: I use machine learning, traditional AI, and solid software design to build reliable tools that are ready to complete the task at hand."
  16 |       },
  17 |       {
  18 |         id: "why-built",
  19 |         title: "Why I Built This Site",
     |-        content: "People often ask me, 'Where did you get that outfit?' and 'How can you afford to travel to so many events?' I am fortunate to have a strong career, but I have always focused on making my lifestyle as financially efficient as possible. This site is how I share the 'stacks' I've built—everything from curated gear reviews to my travel-hacking systems."
  20 |+        content: "People often ask me, 'Where did you get that outfit?' and 'How can you afford to travel to so many events?' I am fortunate to have a strong career, but I have always focused on making my lifestyle as financially efficient as possible. This site is how I share the 'stacks' I've built—everything from curated gear reviews to my travel-hacking workflows."
  21 |       },
  22 |       {
  23 |         id: "financial-strategies",
  24 |         title: "Financial Strategies for WCS",
     |-        content: "I love maximizing credit card perks and hotel benefits, which helps me make the WCS Events lifestyle both high-end and entirely feasible. I'm known for my bright, fun outfits and my optimized travel philosophy."
  25 |+        content: "I love maximizing credit card perks and hotel benefits, which helps me make the WCS Events lifestyle both high-end and entirely feasible. I'm known for my bright, fun outfits and my efficient travel philosophy."
  26 |       }
  27 |     ],
  28 |     details: [
```

### `src/features/research/ResearchDetail.tsx` (modified)
```diff
@@ -148,7 +148,7 @@ export default function ResearchDetail() {
 148 |                       <Stack gap={2}>
 149 |                         <Text variant="display" size="xl">Work in Progress</Text>
 150 |                         <Text variant="body" size="sm" color="dim" maxWidth="md">
     |-                          This specialized module is currently being integrated into the Tech-Dancer platform. We are finalizing the analysis models and UI components.
 151 |+                          We are currently integrating this specialized module into the Tech-Dancer platform. We are finalizing the analysis models and UI components.
 152 |                         </Text>
 153 |                       </Stack>
 154 |                     </Stack>
```

### `src/lib/variants.ts` (modified)
```diff
@@ -1,7 +1,7 @@
   1 | import { cva } from "class-variance-authority";
   2 | 
   3 | /**
     |- * Standardized Variant Contracts for the Systems Console.
   4 |+ * Standardized Variant Contracts for the Console.
   5 |  * Ensures all components share a common mental model for intent, surface, and emphasis.
   6 |  */
   7 | export const variants = {
```

### `tests/visual.spec.ts-snapshots/about-chromium-linux.png` (modified)
```diff

```
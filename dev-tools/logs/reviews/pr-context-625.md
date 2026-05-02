# PR Context: #625 — chore: rebrand site to BoomTick.blog and update persona
**Author:** @arii

## Description
This PR implements the site-wide rebranding to `BoomTick.blog`.

Changes include:
- Renaming the package in `package.json` to `boomtick-blog`.
- Updating the author persona from "Ariel Anders, PhD" to "Tech Dancer" across content files and configuration.
- Adjusting the professional role to "West Coast Swing Blogger // Data Science Consultant".
- Changing the site's tagline to "The West Coast Swing Lifestyle Blog".
- Updating configuration files (`manifest.webmanifest`, `404.html`, etc.) to use the new "BoomTick.blog" brand and updated routing paths.

---
*PR created automatically by Jules for task [1770114126300875003](https://jules.google.com/task/1770114126300875003) started by @arii*

## Files Changed
- 🟡 `USAGE_NOTES.md`
- 🟡 `content/events/weekly.md`
- 🟡 `content/posts/2026-04-18-ai-content-creation.md`
- 🟡 `content/posts/2026-04-18-ai-role-dance.md`
- 🟡 `content/posts/2026-04-18-competition-metrics.md`
- 🟡 `content/posts/2026-04-18-financial-literacy-dancers.md`
- 🟡 `content/posts/2026-04-18-github-actions.md`
- 🟡 `content/posts/2026-04-18-halloween-costumes.md`
- 🟡 `content/posts/2026-04-18-make-shoe-dance.md`
- 🟡 `content/posts/2026-04-18-pivoting-consultant.md`
- 🟡 `content/posts/2026-04-18-why-finals-are-hard.md`
- 🟡 `content/posts/2026-04-19-gear-essentials.md`
- 🟡 `content/posts/2026-04-20-stop-wasting-vercel-credits-deploy-every-branch-to-github-pages.md`
- 🟡 `content/resources/2023-10-01-loop-earplugs.md`
- 🟡 `content/resources/2023-11-01-travel-steamer.md`
- 🟡 `content/resources/2024-01-01-portable-speaker.md`
- 🟡 `content/resources/2026-04-12-suede-shoe-diy.md`
- 🟡 `dev-tools/td_cli.py`
- 🟡 `package.json`
- 🟡 `public/404.html`
- 🟡 `public/manifest.webmanifest`
- 🟡 `src/config/constants.ts`
- 🟡 `src/config/content.ts`
- 🟡 `src/features/journal/BlogPost.tsx`
- 🟡 `src/features/lab/BlogDrafter.tsx`
- 🟡 `src/features/lab/GearPost.tsx`
- 🟡 `src/features/lab/useBlogDrafter.ts`
- 🟡 `src/features/profile/PersonaProfile.tsx`
- 🟡 `src/features/profile/useProfile.ts`
- 🟡 `src/features/research/ResearchDetail.tsx`
- 🟡 `src/pages/About.tsx`
- 🟡 `src/pages/Contact.tsx`

## Diffs

### `USAGE_NOTES.md` (modified)
```diff
@@ -1,7 +1,7 @@
   1 | # PR Review Tooling: USAGE_NOTES
   2 | 
   3 | ## Overview
     |-The PR review system is centralized in the unified Tech-Dancer CLI.
   4 |+The PR review system is centralized in the unified BoomTick.blog CLI.
   5 | - **CLI Entry Point**: `dev-tools/td_cli.py`
   6 | - **Read Context**: `dev-tools/logs/reviews/pr-context-{PR}.md` (Diffs, stats, and valid line ranges).
   7 | - **Write Review**: `dev-tools/logs/reviews/pr-review-{PR}.md` (Checklist and JSON output block).
```

### `content/events/weekly.md` (modified)
```diff
@@ -2,7 +2,7 @@
   2 | type: event
   3 | title: "Weekly Class"
   4 | date: "2024-01-01"
     |-author: "Ariel Anders, PhD"
   5 |+author: "Tech Dancer"
   6 | category: "Dance"
   7 | excerpt: "Weekly social dance and classes at Mission City Swing in San Francisco."
   8 | location: "Mission City Swing"
```

### `content/posts/2026-04-18-ai-content-creation.md` (modified)
```diff
@@ -2,7 +2,7 @@
   2 | type: post
   3 | title: "AI powered content creation and development"
   4 | date: "2026-04-18"
     |-author: "Ariel Anders, PhD"
   5 |+author: "Tech Dancer"
   6 | category: "Tech Portfolio"
   7 | excerpt: "How I use Jules and other AI tools to generate data analytics and blog posts with a human in the loop."
   8 | image: ""
```

### `content/posts/2026-04-18-ai-role-dance.md` (modified)
```diff
@@ -2,7 +2,7 @@
   2 | type: post
   3 | title: "The role of AI in Dance"
   4 | date: "2026-04-18"
     |-author: "Ariel Anders, PhD"
   5 |+author: "Tech Dancer"
   6 | category: "Tech"
   7 | excerpt: "Exploring how video analysis helps lead-follow connection. AI can check your frame during a whip or your response time. It's about getting objective video feedback to fix your mechanics."
   8 | image: ""
```

### `content/posts/2026-04-18-competition-metrics.md` (modified)
```diff
@@ -2,7 +2,7 @@
   2 | type: post
   3 | title: "Ignore scores and focus on your results"
   4 | date: "2026-04-18"
     |-author: "Ariel Anders, PhD"
   5 |+author: "Tech Dancer"
   6 | category: "All about WCS"
   7 | excerpt: "Setting granular measurable metrics for competitions, recording comp videos, and objective analysis."
   8 | image: ""
```

### `content/posts/2026-04-18-financial-literacy-dancers.md` (modified)
```diff
@@ -2,7 +2,7 @@
   2 | type: post
   3 | title: "Why I have the Amex Platinum and Hyatt card"
   4 | date: "2026-04-18"
     |-author: "Ariel Anders, PhD"
   5 |+author: "Tech Dancer"
   6 | category: "Travel/Lifestyle"
   7 | excerpt: "A deep dive into financial literacy for dancers: maximizing travel perks while maintaining a responsible credit-as-debit philosophy."
   8 | image: ""
```

### `content/posts/2026-04-18-github-actions.md` (modified)
```diff
@@ -2,7 +2,7 @@
   2 | type: post
   3 | title: "How I used GitHub Actions to power this site"
   4 | date: "2026-04-18"
     |-author: "Ariel Anders, PhD"
   5 |+author: "Tech Dancer"
   6 | category: "Tech"
   7 | excerpt: "Automated deployments and CI/CD pipelines for a roboticist's living portfolio."
   8 | image: ""
```

### `content/posts/2026-04-18-halloween-costumes.md` (modified)
```diff
@@ -2,7 +2,7 @@
   2 | type: post
   3 | title: "Halloween costumes you can dance in"
   4 | date: "2026-04-18"
     |-author: "Ariel Anders, PhD"
   5 |+author: "Tech Dancer"
   6 | category: "Gear Reviews"
   7 | excerpt: "How to stay thematic without sacrificing your spin or frame. Featuring the pumpkin outfit stress-test."
   8 | image: ""
```

### `content/posts/2026-04-18-make-shoe-dance.md` (modified)
```diff
@@ -2,7 +2,7 @@
   2 | type: post
   3 | title: "Make any shoe a dance shoe"
   4 | date: "2026-04-18"
     |-author: "Ariel Anders, PhD"
   5 |+author: "Tech Dancer"
   6 | category: "Gear Reviews"
   7 | excerpt: "Suede your dance shoes with a $15 DIY hack. A comparison of sticker coverage and traction response."
   8 | image: ""
```

### `content/posts/2026-04-18-pivoting-consultant.md` (modified)
```diff
@@ -2,7 +2,7 @@
   2 | type: post
   3 | title: "Pivoting to consulting and project based work"
   4 | date: "2026-04-18"
     |-author: "Ariel Anders, PhD"
   5 |+author: "Tech Dancer"
   6 | category: "Tech Portfolio"
   7 | excerpt: "A pun-intended look at moving from fixed industry roles to highly specialized project-based consultancy."
   8 | image: ""
```

### `content/posts/2026-04-18-why-finals-are-hard.md` (modified)
```diff
@@ -2,7 +2,7 @@
   2 | type: post
   3 | title: "The majority of above average dancers don’t make it to finals"
   4 | date: "2026-04-18"
     |-author: "Ariel Anders, PhD"
   5 |+author: "Tech Dancer"
   6 | category: "Data & Dev Lab"
   7 | excerpt: "A statistical look at competition heat density and judge variance, explaining why placement is a poor metric for progress."
   8 | image: ""
```

### `content/posts/2026-04-19-gear-essentials.md` (modified)
```diff
@@ -2,7 +2,7 @@
   2 | type: post
   3 | title: "The WCS Travel Pack: 3 Essentials You’re Forgetting"
   4 | date: "2026-04-19"
     |-author: "Ariel Anders, PhD"
   5 |+author: "Tech Dancer"
   6 | category: "Travel"
   7 | excerpt: "Loop earplugs, industrial travel steamers, and portable sound. Why these three Pieces of gear are the secret to a better dance weekend."
   8 | image: ""
```

### `content/posts/2026-04-20-stop-wasting-vercel-credits-deploy-every-branch-to-github-pages.md` (modified)
```diff
@@ -2,7 +2,7 @@
   2 | type: post
   3 | title: Stop Wasting Vercel Credits: Deploy Every Branch to GitHub Pages
   4 | date: "2026-04-20"
     |-author: "Ariel Anders, PhD"
   5 |+author: "Tech Dancer"
   6 | category: Tech
   7 | excerpt: Time is your most precious commodity. Narrow the gap between coding and seeing your changes by deploying every branch to GitHub Pages.
   8 | ---
```

### `content/resources/2023-10-01-loop-earplugs.md` (modified)
```diff
@@ -2,7 +2,7 @@
   2 | type: resource
   3 | title: "Loop Experience Earplugs"
   4 | date: "2023-10-01"
     |-author: "Ariel Anders, PhD"
   5 |+author: "Tech Dancer"
   6 | category: "Dance Gear"
   7 | excerpt: "A must-have for protecting your hearing in loud ballroom and social dance settings without sacrificing sound quality."
   8 | affiliateIds: ["loop-experience"]
```

### `content/resources/2023-11-01-travel-steamer.md` (modified)
```diff
@@ -2,7 +2,7 @@
   2 | type: resource
   3 | title: "Travel Steamer Pro"
   4 | date: "2023-11-01"
     |-author: "Ariel Anders, PhD"
   5 |+author: "Tech Dancer"
   6 | category: "Travel"
   7 | excerpt: "Compact, efficient, and dual-voltage. Keep your competition shirts and skirts wrinkle-free on the road."
   8 | affiliateIds: ["amazon"]
```

### `content/resources/2024-01-01-portable-speaker.md` (modified)
```diff
@@ -2,7 +2,7 @@
   2 | type: resource
   3 | title: "Portable Bluetooth Speaker (UE Wonderboom 4)"
   4 | date: "2024-01-01"
     |-author: "Ariel Anders, PhD"
   5 |+author: "Tech Dancer"
   6 | category: "Dance Gear"
   7 | excerpt: "Rugged, waterproof, and surprisingly loud. Perfect for hotel practice sessions or outdoor social gatherings."
   8 | affiliateIds: ["amazon"]
```

### `content/resources/2026-04-12-suede-shoe-diy.md` (modified)
```diff
@@ -2,7 +2,7 @@
   2 | type: resource
   3 | title: "How to Suede Your Own Dance Shoes for $15"
   4 | date: "2026-04-12"
     |-author: "Ariel Anders, PhD"
   5 |+author: "Tech Dancer"
   6 | category: "Gear"
   7 | excerpt: "The $15 DIY hack for perfect traction on any ballroom floor."
   8 | affiliateIds:
```

### `dev-tools/td_cli.py` (modified)
```diff
@@ -1,6 +1,6 @@
   1 | #!/usr/bin/env python3
   2 | """
     |-td_cli.py - Unified Tech-Dancer Developer CLI
   3 |+td_cli.py - Unified BoomTick.blog Developer CLI
   4 | 
   5 | Consolidates multiple fragmented scripts into a single entry point for repo automation.
   6 | Supports structured JSON output for tool integration.
@@ -526,7 +526,7 @@ def handle_manage_reviews(args):
 526 |     if args.json: print(json.dumps({"status": "success", "prs": prs_data}, indent=2))
 527 | 
 528 | def main():
     |-    parser = argparse.ArgumentParser(description="Tech-Dancer Repository CLI")
 529 |+    parser = argparse.ArgumentParser(description="BoomTick.blog Repository CLI")
 530 |     parser.add_argument("--json", action="store_true", help="Output results in JSON format")
 531 |     subparsers = parser.add_subparsers(dest="command", help="Command to run")
 532 | 
```

### `package.json` (modified)
```diff
@@ -1,5 +1,5 @@
   1 | {
     |-  "name": "react-example",
   2 |+  "name": "boomtick-blog",
   3 |   "private": true,
   4 |   "version": "0.0.0",
   5 |   "type": "module",
```

### `public/404.html` (modified)
```diff
@@ -2,11 +2,11 @@
   2 | <html>
   3 |   <head>
   4 |     <meta charset="utf-8">
     |-    <title>Tech-Dancer // Redirecting...</title>
   5 |+    <title>BoomTick.blog // Redirecting...</title>
   6 |     <script type="text/javascript">
   7 |       // SPA redirect for GitHub Pages.
     |-      // This script handles redirects for both the main deployment (/tech-dancer/)
     |-      // and branch preview deployments (/tech-dancer/<branch>/).
   8 |+      // This script handles redirects for both the main deployment (/boomtick-blog/)
   9 |+      // and branch preview deployments (/boomtick-blog/<branch>/).
  10 |       // It probes the path hierarchy to find the deepest index.html.
  11 |       (function () {
  12 |         var l = window.location;
```

### `public/manifest.webmanifest` (modified)
```diff
@@ -1,7 +1,7 @@
   1 | {
     |-  "name": "Tech-Dancer",
     |-  "short_name": "TechDancer",
     |-  "description": "The Roboticist's Guide to WCS",
   2 |+  "name": "BoomTick.blog",
   3 |+  "short_name": "BoomTick",
   4 |+  "description": "The West Coast Swing Lifestyle Blog",
   5 |   "theme_color": "#1A2B3C",
   6 |   "background_color": "#ffffff",
   7 |   "display": "standalone",
```

### `src/config/constants.ts` (modified)
```diff
@@ -1,8 +1,9 @@
     |-export const BASE_URL = (import.meta.env.VITE_APP_URL || 'https://arii.github.io/tech-dancer').replace(/\/$/, '');
   1 |+import { SITE_METADATA } from "@/config/content";
   2 |+export const BASE_URL = (import.meta.env.VITE_APP_URL || 'https://arii.github.io/boomtick-blog').replace(/\/$/, '');
   3 | export const SITE_NAME = 'BoomTick.blog';
   4 | export const GA_MEASUREMENT_ID = 'G-W9W73FV2K1';
   5 | export const GOOGLE_SITE_VERIFICATION = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || 'FGbpuhF_c3YUFon1LzrzqmW1jvVPFygugss24n0wn5k';
     |-const DEFAULT_DESCRIPTION = "The West Coast Swing Lifestyle Blog by Tech Dancer. Exploring the intersection of dance, physics, and engineering.";
   6 |+const DEFAULT_DESCRIPTION = `The West Coast Swing Lifestyle Blog by ${SITE_METADATA.author}. Exploring the intersection of dance, physics, and engineering.`;
   7 | 
   8 | export const STATIC_SCHEMAS = {
   9 |   HOME: {
@@ -13,7 +14,7 @@ export const STATIC_SCHEMAS = {
  14 |     "description": DEFAULT_DESCRIPTION,
  15 |     "publisher": {
  16 |       "@type": "Person",
     |-      "name": "Ariel Anders"
  17 |+      "name": SITE_METADATA.author
  18 |     }
  19 |   },
  20 |   ABOUT: (bioName: string, bioRole: string) => ({
```

### `src/config/content.ts` (modified)
```diff
@@ -6,11 +6,11 @@ export const CONTENT_CATEGORIES = [
   6 | ] as const;
   7 | 
   8 | export const SITE_METADATA = {
     |-  title: 'Tech-Dancer',
     |-  author: 'Ariel Anders, PhD',
     |-  description: 'The Roboticist\'s Guide to the West Coast Swing',
   9 |+  title: 'BoomTick.blog',
  10 |+  author: 'Tech Dancer',
  11 |+  description: 'The West Coast Swing Lifestyle Blog',
  12 |   repo: {
  13 |     owner: 'arii',
     |-    name: 'tech-dancer'
  14 |+    name: 'boomtick-blog'
  15 |   }
  16 | };
```

### `src/features/journal/BlogPost.tsx` (modified)
```diff
@@ -25,7 +25,7 @@ export default function BlogPost() {
  25 |       "description": post.excerpt,
  26 |       "author": {
  27 |         "@type": "Person",
     |-        "name": post.author || "Ariel Anders",
  28 |+        "name": post.author || SITE_METADATA.author,
  29 |         "url": `${BASE_URL}/about`
  30 |       },
  31 |       "datePublished": post.date,
```

### `src/features/lab/BlogDrafter.tsx` (modified)
```diff
@@ -41,7 +41,7 @@ export function BlogDrafter() {
  41 |   };
  42 | 
  43 |   const handleCopyPrompt = () => {
     |-    const prompt = `Objective: Expand the following blog post draft JSON for Tech-Dancer.
  44 |+    const prompt = `Objective: Expand the following blog post draft JSON for BoomTick.blog.
  45 | Requirements:
  46 | 1. Respond ONLY with a valid JSON object.
  47 | 2. DO NOT include any explanatory text, commentary, or markdown markers outside or inside the JSON values.
@@ -95,7 +95,7 @@ Draft Data: ${JSON.stringify(data, null, 2)}`;
  95 |                 <Info className="w-4 h-4 text-accent" />
  96 |               </Box>
  97 |               <Text variant="body" size="xs">
     |-                This tool prepares your blog post for the Tech-Dancer automated pipeline.
  98 |+                This tool prepares your blog post for the BoomTick.blog automated pipeline.
  99 |                 Complete the form below to generate a pre-formatted GitHub Issue link.
 100 |               </Text>
 101 |            </Stack>
```

### `src/features/lab/GearPost.tsx` (modified)
```diff
@@ -37,7 +37,7 @@ export default function GearPost() {
  37 |         },
  38 |         "author": {
  39 |           "@type": "Person",
     |-          "name": "Ariel Anders",
  40 |+          "name": SITE_METADATA.author,
  41 |           "url": `${BASE_URL}/about`
  42 |         },
  43 |         "datePublished": resource.date
```

### `src/features/lab/useBlogDrafter.ts` (modified)
```diff
@@ -18,8 +18,8 @@ export interface HistoryEntry {
  18 |   data: DraftData;
  19 | }
  20 | 
     |-const STORAGE_KEY = 'tech-dancer-blog-draft';
     |-const HISTORY_KEY = 'tech-dancer-blog-history';
  21 |+const STORAGE_KEY = 'boomtick-blog-draft';
  22 |+const HISTORY_KEY = 'boomtick-blog-history';
  23 | const DEBOUNCE_WAIT = 1000; // 1 second
  24 | 
  25 | // Safe ID generator with fallback for legacy browsers
```

### `src/features/profile/PersonaProfile.tsx` (renamed)
```diff
@@ -1,17 +1,18 @@
   1 |+import { SITE_METADATA } from "@/config/content";
   2 | import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
   3 | import { SEO } from '@/components/SEO';
   4 | import { PageHeader } from '@/components/ui/PageHeader';
   5 | import { Reveal } from '@/components/ui/Reveal';
   6 | import { useProfile } from './useProfile';
   7 | 
     |-export default function ArielProfile() {
   8 |+export default function PersonaProfile() {
   9 |   const { bio } = useProfile();
  10 | 
  11 |   return (
  12 |     <Box as="section" height="full">
  13 |       <SEO
  14 |         title="About"
     |-        description="Ariel Anders, PhD: Roboticist, Dancer, and Engineer. Exploring the intersection of technical systems and creative movement."
  15 |+        description={`${SITE_METADATA.author}: West Coast Swing Blogger // Data Science Consultant. Exploring the intersection of dance, physics, and engineering.`}
  16 |       />
  17 |       
  18 |       <PageHeader
```

### `src/features/profile/useProfile.ts` (modified)
```diff
@@ -1,8 +1,9 @@
   1 |+import { SITE_METADATA } from "@/config/content";
   2 | import { ProfileData } from './types';
   3 | 
   4 | const PROFILE_DATA: ProfileData = {
     |-    name: "Ariel Anders, PhD",
     |-    role: "MIT Roboticist // WCS Tech-Dancer",
   5 |+    name: SITE_METADATA.author,
   6 |+    role: "West Coast Swing Blogger // Data Science Consultant",
   7 |     sections: [
   8 |       {
   9 |         id: "dance-background",
```

### `src/features/research/ResearchDetail.tsx` (modified)
```diff
@@ -37,7 +37,7 @@ export default function ResearchDetail() {
  37 |         "description": study.excerpt,
  38 |         "author": {
  39 |           "@type": "Person",
     |-          "name": study.author || "Ariel Anders",
  40 |+          "name": study.author || SITE_METADATA.author,
  41 |           "url": `${BASE_URL}/about`
  42 |         },
  43 |         "datePublished": study.date,
@@ -152,7 +152,7 @@ export default function ResearchDetail() {
 152 |                       <Stack gap={2}>
 153 |                         <Text variant="display" size="xl">Work in Progress</Text>
 154 |                         <Text variant="body" size="sm" color="dim" maxWidth="md">
     |-                          This specialized module is currently being integrated into the Tech-Dancer platform. We are finalizing the analysis models and UI components.
 155 |+                          This specialized module is currently being integrated into the BoomTick.blog platform. We are finalizing the analysis models and UI components.
 156 |                         </Text>
 157 |                       </Stack>
 158 |                     </Stack>
```

### `src/pages/About.tsx` (modified)
```diff
@@ -1,2 +1,2 @@
     |-import About from '@/features/profile/ArielProfile';
   1 |+import About from '@/features/profile/PersonaProfile';
   2 | export default About;
```

### `src/pages/Contact.tsx` (modified)
```diff
@@ -74,7 +74,7 @@ export default function Contact() {
  74 |     <>
  75 |       <SEO
  76 |         title="Contact"
     |-        description="Get in touch with tech-dancer. Send your feedback, inquiries, or collaboration proposals regarding West Coast Swing and robotics."
  77 |+        description="Get in touch with boomtick-blog. Send your feedback, inquiries, or collaboration proposals regarding West Coast Swing and robotics."
  78 |       />
  79 |       <ContactFormView
  80 |         register={register}
```
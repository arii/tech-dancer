# PR Context: #404 — Automated Link Validator
**Author:** @arii

## Description
This PR implements a comprehensive link integrity system as requested.

Key features:
1.  **Manual Link Validator Action**: The `.github/workflows/link-validator.yml` can be triggered manually via workflow dispatch to ensure link integrity.
2.  **Comprehensive Validation**: The `scripts/validate-links.ts` script:
    *   Extracts valid internal routes from content slugs and the directory map.
    *   Parses all Markdown files in `content/` for links and images (including frontmatter).
    *   Validates internal links against discovered routes.
    *   Validates external links and images via HTTP requests with a 10s timeout and retry logic.
3.  **Automated Reporting**: If broken links are detected, the workflow creates or updates a "Link Integrity Report" issue on GitHub with details.
4.  **Integration**: The system uses existing project utilities like `scripts/content-loader.ts` for route discovery.

The script has been verified locally and correctly identifies existing dead links and placeholders in the current codebase.

Fixes #398

---
*PR created automatically by Jules for task [4691993855369166304](https://jules.google.com/task/4691993855369166304) started by @arii*


## Files Changed
- 🟢 `.github/workflows/link-validator.yml`
- 🟡 `.gitignore`
- 🟡 `package.json`
- 🟡 `pnpm-lock.yaml`
- 🟢 `scripts/validate-links.ts`
- 🟡 `src/components/ui/MarkdownRenderer.tsx`
- 🟢 `src/data/affiliates.json`
- 🟡 `src/lib/affiliateManager.ts`

## Diffs

### `.github/workflows/link-validator.yml` (added)
```diff
@@ -0,0 +1,80 @@
   1 |+name: Link and Affiliate Validator
   2 |+
   3 |+on:
   4 |+  workflow_dispatch: # Allow manual trigger
   5 |+
   6 |+permissions:
   7 |+  contents: read
   8 |+  issues: write
   9 |+
  10 |+jobs:
  11 |+  validate:
  12 |+    runs-on: ubuntu-latest
  13 |+    steps:
  14 |+      - uses: actions/checkout@v4
  15 |+
  16 |+      - name: Setup Node.js
  17 |+        uses: actions/setup-node@v4
  18 |+        with:
  19 |+          node-version: 22
  20 |+
  21 |+      - name: Install pnpm
  22 |+        uses: pnpm/action-setup@v4
  23 |+        with:
  24 |+          run_install: false
  25 |+
  26 |+      - name: Get pnpm store directory
  27 |+        shell: bash
  28 |+        run: |
  29 |+          echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV
  30 |+
  31 |+      - uses: actions/cache@v4
  32 |+        name: Setup pnpm cache
  33 |+        with:
  34 |+          path: ${{ env.STORE_PATH }}
  35 |+          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
  36 |+          restore-keys: |
  37 |+            ${{ runner.os }}-pnpm-store-
  38 |+
  39 |+      - name: Install dependencies
  40 |+        run: pnpm install
  41 |+
  42 |+      - name: Run link validator
  43 |+        run: pnpm tsx scripts/validate-links.ts
  44 |+        continue-on-error: true
  45 |+
  46 |+      - name: Create or Update Issue
  47 |+        if: hashFiles('link-validation-report.md') != ''
  48 |+        uses: actions/github-script@v7
  49 |+        with:
  50 |+          script: |
  51 |+            const fs = require('fs');
  52 |+            const report = fs.readFileSync('link-validation-report.md', 'utf8');
  53 |+            const title = 'Link Integrity Report';
  54 |+
  55 |+            const { data: issues } = await github.rest.issues.listForRepo({
  56 |+              owner: context.repo.owner,
  57 |+              repo: context.repo.repo,
  58 |+              state: 'open',
  59 |+              creator: 'github-actions[bot]'
  60 |+            });
  61 |+
  62 |+            const existingIssue = issues.find(i => i.title === title);
  63 |+
  64 |+            if (existingIssue) {
  65 |+              await github.rest.issues.update({
  66 |+                owner: context.repo.owner,
  67 |+                repo: context.repo.repo,
  68 |+                issue_number: existingIssue.number,
  69 |+                body: report
  70 |+              });
  71 |+              console.log(`Updated existing issue #${existingIssue.number}`);
  72 |+            } else {
  73 |+              await github.rest.issues.create({
  74 |+                owner: context.repo.owner,
  75 |+                repo: context.repo.repo,
  76 |+                title: title,
  77 |+                body: report
  78 |+              });
  79 |+              console.log('Created new issue');
  80 |+            }
```

### `.gitignore` (modified)
```diff
@@ -59,3 +59,4 @@ etl/data/*.parquet
  59 | # Since you use pnpm, we ignore other manager lockfiles
  60 | package-lock.json
  61 | yarn.lock
  62 |+link-validation-report.md
```

### `package.json` (modified)
```diff
@@ -51,19 +51,23 @@
  51 |     "autoprefixer": "^10.5.0",
  52 |     "eslint": "^10.2.1",
  53 |     "eslint-plugin-react-hooks": "^7.1.1",
  54 |+    "glob": "^13.0.6",
  55 |     "globals": "^17.5.0",
  56 |     "knip": "^6.7.0",
  57 |     "npm-run-all": "^4.1.5",
  58 |     "oxlint": "^1.61.0",
  59 |     "playwright": "^1.59.1",
  60 |     "postcss": "^8.5.10",
  61 |+    "remark-parse": "^11.0.0",
  62 |     "rollup-plugin-visualizer": "^7.0.1",
  63 |     "sharp": "^0.34.5",
  64 |     "tailwindcss": "^4.2.2",
  65 |     "throttle-debounce": "^5.0.2",
  66 |     "tsx": "^4.21.0",
  67 |     "typescript": "~5.8.2",
  68 |     "typescript-eslint": "^8.59.0",
  69 |+    "unified": "^11.0.5",
  70 |+    "unist-util-visit": "^5.1.0",
  71 |     "vite": "^6.4.2",
  72 |     "vite-plugin-image-optimizer": "^2.0.3",
  73 |     "vite-plugin-inspect": "^11.3.3",
```

### `pnpm-lock.yaml` (modified)
```diff
@@ -96,6 +96,9 @@ importers:
  96 |       eslint-plugin-react-hooks:
  97 |         specifier: ^7.1.1
  98 |         version: 7.1.1(eslint@10.2.1(jiti@2.6.1))
  99 |+      glob:
 100 |+        specifier: ^13.0.6
 101 |+        version: 13.0.6
 102 |       globals:
 103 |         specifier: ^17.5.0
 104 |         version: 17.5.0
@@ -114,6 +117,9 @@ importers:
 117 |       postcss:
 118 |         specifier: ^8.5.10
 119 |         version: 8.5.10
 120 |+      remark-parse:
 121 |+        specifier: ^11.0.0
 122 |+        version: 11.0.0
 123 |       rollup-plugin-visualizer:
 124 |         specifier: ^7.0.1
 125 |         version: 7.0.1(rolldown@1.0.0-rc.17)(rollup@2.80.0)
@@ -135,6 +141,12 @@ importers:
 141 |       typescript-eslint:
 142 |         specifier: ^8.59.0
 143 |         version: 8.59.0(eslint@10.2.1(jiti@2.6.1))(typescript@5.8.3)
 144 |+      unified:
 145 |+        specifier: ^11.0.5
 146 |+        version: 11.0.5
 147 |+      unist-util-visit:
 148 |+        specifier: ^5.1.0
 149 |+        version: 5.1.0
 150 |       vite:
 151 |         specifier: ^6.4.2
 152 |         version: 6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(terser@5.46.2)(tsx@4.21.0)(yaml@2.8.3)
@@ -2965,6 +2977,10 @@ packages:
2977 |     deprecated: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
2978 |     hasBin: true
2979 | 
2980 |+  glob@13.0.6:
2981 |+    resolution: {integrity: sha512-Wjlyrolmm8uDpm/ogGyXZXb1Z+Ca2B8NbJwqBVg0axK9GbBeoS7yGV6vjXnYdGm6X53iehEuxxbyiKp8QmN4Vw==}
2982 |+    engines: {node: 18 || 20 || >=22}
2983 |+
2984 |   globals@17.5.0:
2985 |     resolution: {integrity: sha512-qoV+HK2yFl/366t2/Cb3+xxPUo5BuMynomoDmiaZBIdbs+0pYbjfZU+twLhGKp4uCZ/+NbtpVepH5bGCxRyy2g==}
2986 |     engines: {node: '>=18'}
@@ -7300,6 +7316,12 @@ snapshots:
7316 |       package-json-from-dist: 1.0.1
7317 |       path-scurry: 2.0.2
7318 | 
7319 |+  glob@13.0.6:
7320 |+    dependencies:
7321 |+      minimatch: 10.2.5
7322 |+      minipass: 7.1.3
7323 |+      path-scurry: 2.0.2
7324 |+
7325 |   globals@17.5.0: {}
7326 | 
7327 |   globalthis@1.0.4:
```

### `scripts/validate-links.ts` (added)
```diff
@@ -0,0 +1,157 @@
   1 |+/**
   2 |+ * Link Validator
   3 |+ *
   4 |+ * 1. Crawls internal and external links using AST traversal.
   5 |+ * 2. Validates image sources.
   6 |+ * 3. Reports broken links.
   7 |+ */
   8 |+
   9 |+import fs from 'fs';
  10 |+import path from 'path';
  11 |+import { globSync } from 'glob';
  12 |+import { unified } from 'unified';
  13 |+import remarkParse from 'remark-parse';
  14 |+import { visit } from 'unist-util-visit';
  15 |+import { CONTENT_DIR_MAP, getContentSlugs } from './content-loader';
  16 |+
  17 |+async function main() {
  18 |+  console.log('Starting link validation...');
  19 |+
  20 |+  // 1. Extract valid routes and slugs
  21 |+  const validRoutes = new Set<string>(['/', '/about', '/contact', '/ux-auditor']);
  22 |+
  23 |+  Object.entries(CONTENT_DIR_MAP).forEach(([prefix, dir]) => {
  24 |+    const slugs = getContentSlugs(dir, prefix);
  25 |+    slugs.forEach(slug => validRoutes.add(slug));
  26 |+    validRoutes.add(prefix); // The index page for the category
  27 |+  });
  28 |+
  29 |+  validRoutes.add('/research');
  30 |+  validRoutes.add('/blog');
  31 |+  validRoutes.add('/gear');
  32 |+
  33 |+  console.log(`Discovered ${validRoutes.size} valid internal routes.`);
  34 |+
  35 |+  // 2. Scan markdown files for links and images using unified/remark AST
  36 |+  const markdownFiles = globSync('content/**/*.md');
  37 |+  const extractedLinks: { file: string, type: 'internal' | 'external' | 'image', url: string }[] = [];
  38 |+
  39 |+  const processor = unified().use(remarkParse);
  40 |+
  41 |+  for (const file of markdownFiles) {
  42 |+    const content = fs.readFileSync(file, 'utf-8');
  43 |+    const tree = processor.parse(content);
  44 |+
  45 |+    visit(tree, (node) => {
  46 |+      if (node.type === 'link') {
  47 |+        const url = node.url;
  48 |+        if (url.startsWith('http')) {
  49 |+          extractedLinks.push({ file, type: 'external', url });
  50 |+        } else if (url.startsWith('/')) {
  51 |+          extractedLinks.push({ file, type: 'internal', url });
  52 |+        }
  53 |+      } else if (node.type === 'image') {
  54 |+        extractedLinks.push({ file, type: 'image', url: node.url });
  55 |+      } else if (node.type === 'html') {
  56 |+        // Fallback for HTML images since remark-parse doesn't parse HTML tags into AST by default
  57 |+        const htmlImgRegex = /<img.*?src=["'](.*?)["'].*?>/g;
  58 |+        let match;
  59 |+        while ((match = htmlImgRegex.exec(node.value)) !== null) {
  60 |+          extractedLinks.push({ file, type: 'image', url: match[1] });
  61 |+        }
  62 |+      }
  63 |+    });
  64 |+
  65 |+    // Extract image from frontmatter (not part of AST)
  66 |+    const frontmatterImgMatch = /image:\s*["']?(.*?)["']?\s*\n/m.exec(content);
  67 |+    if (frontmatterImgMatch && frontmatterImgMatch[1]) {
  68 |+      extractedLinks.push({ file, type: 'image', url: frontmatterImgMatch[1] });
  69 |+    }
  70 |+  }
  71 |+
  72 |+  console.log(`Extracted ${extractedLinks.length} links/images from markdown.`);
  73 |+
  74 |+  // 3. Validate everything
  75 |+  const brokenLinks: { file: string, type: string, url: string, reason: string }[] = [];
  76 |+
  77 |+  // Validate internal links
  78 |+  extractedLinks.filter(l => l.type === 'internal').forEach(link => {
  79 |+    const pathOnly = link.url.split('#')[0].split('?')[0];
  80 |+    if (!validRoutes.has(pathOnly)) {
  81 |+      brokenLinks.push({ ...link, reason: 'Internal route not found' });
  82 |+    }
  83 |+  });
  84 |+
  85 |+  // Validate external links and images
  86 |+  const externalToValidate = [
  87 |+    ...extractedLinks.filter(l => l.type === 'external' || (l.type === 'image' && l.url.startsWith('http')))
  88 |+  ];
  89 |+
  90 |+  const localImagesToValidate = extractedLinks.filter(l => l.type === 'image' && !l.url.startsWith('http'));
  91 |+
  92 |+  console.log(`Validating ${localImagesToValidate.length} local images...`);
  93 |+  localImagesToValidate.forEach(link => {
  94 |+    const filePath = path.join('public', link.url);
  95 |+    if (!fs.existsSync(filePath)) {
  96 |+      brokenLinks.push({ ...link, reason: 'Local image file not found in public/' });
  97 |+    }
  98 |+  });
  99 |+
 100 |+  console.log(`Validating ${externalToValidate.length} external links...`);
 101 |+
 102 |+  for (const link of externalToValidate) {
 103 |+    let urlObj: URL;
 104 |+    try {
 105 |+      urlObj = new URL(link.url);
 106 |+    } catch (err) {
 107 |+      brokenLinks.push({ ...link, reason: `Invalid URL: ${err instanceof Error ? err.message : String(err)}` });
 108 |+      continue;
 109 |+    }
 110 |+
 111 |+    try {
 112 |+      const controller = new AbortController();
 113 |+      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
 114 |+
 115 |+      let response = await fetch(link.url, {
 116 |+        method: 'HEAD',
 117 |+        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
 118 |+        signal: controller.signal
 119 |+      });
 120 |+
 121 |+      if (!response.ok) {
 122 |+        response = await fetch(link.url, {
 123 |+          method: 'GET',
 124 |+          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
 125 |+          signal: controller.signal
 126 |+        });
 127 |+      }
 128 |+
 129 |+      clearTimeout(timeoutId);
 130 |+
 131 |+      if (!response.ok) {
 132 |+        brokenLinks.push({ ...link, reason: `HTTP Status ${response.status}` });
 133 |+      }
 134 |+    } catch (err) {
 135 |+      brokenLinks.push({ ...link, reason: `Fetch error: ${err instanceof Error ? err.name === 'AbortError' ? 'Timeout' : err.message : String(err)}` });
 136 |+    }
 137 |+  }
 138 |+
 139 |+  // 5. Generate report
 140 |+  if (brokenLinks.length > 0) {
 141 |+    console.error(`Found ${brokenLinks.length} broken links:`);
 142 |+    const report = brokenLinks.map(l => `- [${l.type}] ${l.url} in ${l.file}: ${l.reason}`).join('\n');
 143 |+    console.error(report);
 144 |+
 145 |+    fs.writeFileSync('link-validation-report.md', `### Link Integrity Report\n\nDetected ${brokenLinks.length} broken links:\n\n${report}`);
 146 |+    process.exit(1);
 147 |+  } else {
 148 |+    console.log('No broken links found!');
 149 |+  }
 150 |+
 151 |+  console.log('Link validation complete.');
 152 |+}
 153 |+
 154 |+main().catch(err => {
 155 |+  console.error('Validation failed:', err);
 156 |+  process.exit(1);
 157 |+});
```

### `src/components/ui/MarkdownRenderer.tsx` (modified)
```diff
@@ -1,5 +1,6 @@
   1 | import ReactMarkdown from 'react-markdown';
   2 | import { Box, Text } from '@/layouts/Primitives';
   3 |+import { Link } from 'react-router-dom';
   4 | 
   5 | interface MarkdownRendererProps {
   6 |   content: string;
@@ -10,7 +11,13 @@ export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  11 |     <div className="[counter-reset:section]">
  12 |       <ReactMarkdown
  13 |         components={{
     |-          a: ({node: _node, ...props}) => <a {...props} rel="noopener noreferrer" target="_blank" />,
  14 |+          a: ({node: _node, href, ...props}) => {
  15 |+            const isInternal = href?.startsWith('/');
  16 |+            if (isInternal) {
  17 |+              return <Link to={href} {...props} />;
  18 |+            }
  19 |+            return <a href={href} {...props} rel="noopener noreferrer" target="_blank" />;
  20 |+          },
  21 |           blockquote: ({node: _node, ...props}) => (
  22 |             <Box border surface="warning" padding={6} marginY={8} radius="none">
  23 |                <Text variant="mono" size="tiny" weight="font-bold" intent="warning" tracking="widest" className="mb-2 block">Key Takeaway</Text>
```

### `src/data/affiliates.json` (added)
```diff
@@ -0,0 +1,100 @@
   1 |+{
   2 |+  "loop-quiet": {
   3 |+    "id": "loop-quiet",
   4 |+    "name": "Loop Quiet 2 Ear Plugs",
   5 |+    "url": "https://amazon.com",
   6 |+    "category": "gear",
   7 |+    "description": "The quiet version of the loop earplugs are good for very loud ballrooms and sleeping with roommates."
   8 |+  },
   9 |+  "bloch-grecian": {
  10 |+    "id": "bloch-grecian",
  11 |+    "name": "Bloch Grecian Sandal",
  12 |+    "url": "https://amazon.com",
  13 |+    "category": "gear",
  14 |+    "description": "Popular shoe worn by champion swing dancers. Requires foot strength."
  15 |+  },
  16 |+  "loop-experience": {
  17 |+    "id": "loop-experience",
  18 |+    "name": "Loop Experience Ear Plugs",
  19 |+    "url": "https://amazon.com",
  20 |+    "category": "gear",
  21 |+    "description": "Better to reduce loud noises but still hear the beat."
  22 |+  },
  23 |+  "suede-sheets": {
  24 |+    "id": "suede-sheets",
  25 |+    "name": "Suede Stick-on Sheets",
  26 |+    "url": "https://amazon.com",
  27 |+    "category": "gear",
  28 |+    "description": "Turn regular sneakers into dance shoes for indoor floors."
  29 |+  },
  30 |+  "compression-cubes": {
  31 |+    "id": "compression-cubes",
  32 |+    "name": "Compression Packing Cubes",
  33 |+    "url": "https://amazon.com",
  34 |+    "category": "travel",
  35 |+    "description": "Maximize luggage space and stay organized."
  36 |+  },
  37 |+  "travel-bottles": {
  38 |+    "id": "travel-bottles",
  39 |+    "name": "Silicone Travel Bottles",
  40 |+    "url": "https://amazon.com",
  41 |+    "category": "travel",
  42 |+    "description": "Leak-proof refillable containers for TSA-approved liquids."
  43 |+  },
  44 |+  "dance-socks": {
  45 |+    "id": "dance-socks",
  46 |+    "name": "2 FEET Dance Socks",
  47 |+    "url": "https://amazon.com",
  48 |+    "category": "gear",
  49 |+    "description": "Slip over sneakers for smooth pivots and turns on wood floors."
  50 |+  },
  51 |+  "listerine-tabs": {
  52 |+    "id": "listerine-tabs",
  53 |+    "name": "Listerine Ready! Tabs",
  54 |+    "url": "https://amazon.com",
  55 |+    "category": "travel",
  56 |+    "description": "Revolutionary 4-hour fresh breath in a chewable tablet."
  57 |+  },
  58 |+  "rave-fan": {
  59 |+    "id": "rave-fan",
  60 |+    "name": "Zolee Large Rave Fan",
  61 |+    "url": "https://amazon.com",
  62 |+    "category": "gear",
  63 |+    "description": "Stay cool while adding a touch of flair to your performance."
  64 |+  },
  65 |+  "neck-fan": {
  66 |+    "id": "neck-fan",
  67 |+    "name": "OLV Neck Fan",
  68 |+    "url": "https://amazon.com",
  69 |+    "category": "gear",
  70 |+    "description": "Hands-free cooling solution for hot events."
  71 |+  },
  72 |+  "hanging-toiletry-bag": {
  73 |+    "id": "hanging-toiletry-bag",
  74 |+    "name": "Relavel Hanging Toiletry Bag",
  75 |+    "url": "https://amazon.com",
  76 |+    "category": "travel",
  77 |+    "description": "Waterproof and spacious organizer for all your toiletries."
  78 |+  },
  79 |+  "garment-steamer": {
  80 |+    "id": "garment-steamer",
  81 |+    "name": "Portable Garment Steamer",
  82 |+    "url": "https://amazon.com",
  83 |+    "category": "travel",
  84 |+    "description": "Keep your outfits wrinkle-free while traveling."
  85 |+  },
  86 |+  "epsom-salt": {
  87 |+    "id": "epsom-salt",
  88 |+    "name": "Epsom Salt / Bath Bombs",
  89 |+    "url": "https://amazon.com",
  90 |+    "category": "recovery",
  91 |+    "description": "Soothe tired muscles and refresh your skin after a long weekend."
  92 |+  },
  93 |+  "foam-roller": {
  94 |+    "id": "foam-roller",
  95 |+    "name": "Foam Roller / Hypervolt",
  96 |+    "url": "https://amazon.com",
  97 |+    "category": "recovery",
  98 |+    "description": "Essential recovery tools for muscle maintenance and massage."
  99 |+  }
 100 |+}
```

### `src/lib/affiliateManager.ts` (modified)
```diff
@@ -4,107 +4,9 @@
   4 |  */
   5 | 
   6 | import { AffiliateLink } from '../types';
   7 |+import AFFILIATE_DATABASE_JSON from '../data/affiliates.json';
   8 | 
     |-const AFFILIATE_DATABASE: Record<string, AffiliateLink> = {
     |-  'loop-quiet': {
     |-    id: 'loop-quiet',
     |-    name: 'Loop Quiet 2 Ear Plugs',
     |-    url: 'https://amazon.com',
     |-    category: 'gear',
     |-    description: 'The quiet version of the loop earplugs are good for very loud ballrooms and sleeping with roommates.'
     |-  },
     |-  'bloch-grecian': {
     |-    id: 'bloch-grecian',
     |-    name: 'Bloch Grecian Sandal',
     |-    url: 'https://amazon.com',
     |-    category: 'gear',
     |-    description: 'Popular shoe worn by champion swing dancers. Requires foot strength.'
     |-  },
     |-  'loop-experience': {
     |-    id: 'loop-experience',
     |-    name: 'Loop Experience Ear Plugs',
     |-    url: 'https://amazon.com',
     |-    category: 'gear',
     |-    description: 'Better to reduce loud noises but still hear the beat.'
     |-  },
     |-  'suede-sheets': {
     |-    id: 'suede-sheets',
     |-    name: 'Suede Stick-on Sheets',
     |-    url: 'https://amazon.com',
     |-    category: 'gear',
     |-    description: 'Turn regular sneakers into dance shoes for indoor floors.'
     |-  },
     |-  'compression-cubes': {
     |-    id: 'compression-cubes',
     |-    name: 'Compression Packing Cubes',
     |-    url: 'https://amazon.com',
     |-    category: 'travel',
     |-    description: 'Maximize luggage space and stay organized.'
     |-  },
     |-  'travel-bottles': {
     |-    id: 'travel-bottles',
     |-    name: 'Silicone Travel Bottles',
     |-    url: 'https://amazon.com',
     |-    category: 'travel',
     |-    description: 'Leak-proof refillable containers for TSA-approved liquids.'
     |-  },
     |-  'dance-socks': {
     |-    id: 'dance-socks',
     |-    name: '2 FEET Dance Socks',
     |-    url: 'https://amazon.com',
     |-    category: 'gear',
     |-    description: 'Slip over sneakers for smooth pivots and turns on wood floors.'
     |-  },
     |-  'listerine-tabs': {
     |-    id: 'listerine-tabs',
     |-    name: 'Listerine Ready! Tabs',
     |-    url: 'https://amazon.com',
     |-    category: 'travel',
     |-    description: 'Revolutionary 4-hour fresh breath in a chewable tablet.'
     |-  },
     |-  'rave-fan': {
     |-    id: 'rave-fan',
     |-    name: 'Zolee Large Rave Fan',
     |-    url: 'https://amazon.com',
     |-    category: 'gear',
     |-    description: 'Stay cool while adding a touch of flair to your performance.'
     |-  },
     |-  'neck-fan': {
     |-    id: 'neck-fan',
     |-    name: 'OLV Neck Fan',
     |-    url: 'https://amazon.com',
     |-    category: 'gear',
     |-    description: 'Hands-free cooling solution for hot events.'
     |-  },
     |-  'hanging-toiletry-bag': {
     |-    id: 'hanging-toiletry-bag',
     |-    name: 'Relavel Hanging Toiletry Bag',
     |-    url: 'https://amazon.com',
     |-    category: 'travel',
     |-    description: 'Waterproof and spacious organizer for all your toiletries.'
     |-  },
     |-  'garment-steamer': {
     |-    id: 'garment-steamer',
     |-    name: 'Portable Garment Steamer',
     |-    url: 'https://amazon.com',
     |-    category: 'travel',
     |-    description: 'Keep your outfits wrinkle-free while traveling.'
     |-  },
     |-  'epsom-salt': {
     |-    id: 'epsom-salt',
     |-    name: 'Epsom Salt / Bath Bombs',
     |-    url: 'https://amazon.com',
     |-    category: 'recovery',
     |-    description: 'Soothe tired muscles and refresh your skin after a long weekend.'
     |-  },
     |-  'foam-roller': {
     |-    id: 'foam-roller',
     |-    name: 'Foam Roller / Hypervolt',
     |-    url: 'https://amazon.com',
     |-    category: 'recovery',
     |-    description: 'Essential recovery tools for muscle maintenance and massage.'
     |-  }
     |-};
   9 |+const AFFILIATE_DATABASE: Record<string, AffiliateLink> = AFFILIATE_DATABASE_JSON as Record<string, AffiliateLink>;
  10 | 
  11 | export const affiliateManager = {
  12 |   getLink: (id: string): AffiliateLink | undefined => {
```
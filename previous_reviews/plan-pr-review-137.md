# PR Review Plan: #137 — Implement UI Anti-Pattern Detection and AI Debugger Utilities

<!-- PR_NUMBER: 137 -->

**Repo:** arii/tech-dancer — https://github.com/arii/tech-dancer/pull/137
**Stats:** +754/-137 across 35 file(s)

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

Implemented a suite of tools to maintain UI quality and facilitate AI-assisted fixes:
1. **Linter (`npm run audit`)**: Scans the codebase for raw Tailwind classes, arbitrary values, and non-primitive layout usage, ensuring adherence to the project's 'TSX File System Checklist'.
2. **AI Debugger (`npm run audit:fix`)**: Captures screenshots and computed CSS/HTML context of components to generate structured prompts for AI assistants, streamlining the remediation of design anti-patterns.
3. **Integration**: Added scripts to `package.json` and updated `.gitignore`.
4. **Flexibility**: Added support for granular ignore comments to handle legitimate exceptions in the UI layer.

Fixes #125

---
*PR created automatically by Jules for task [3016062823793574920](https://jules.google.com/task/3016062823793574920) started by @arii*

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

- `[M]` [.gitignore](https://github.com/arii/tech-dancer/pull/137/files) `+5/-0`
- `[M]` [package.json](https://github.com/arii/tech-dancer/pull/137/files) `+7/-1`
- `[M]` [plan.md](https://github.com/arii/tech-dancer/pull/137/files) `+28/-1`
- `[M]` [pnpm-lock.yaml](https://github.com/arii/tech-dancer/pull/137/files) `+19/-0`
- `[A]` [scripts/ai-debugger.mjs](https://github.com/arii/tech-dancer/pull/137/files) `+87/-0`
- `[A]` [scripts/capture-screenshots.mjs](https://github.com/arii/tech-dancer/pull/137/files) `+35/-0`
- `[A]` [scripts/detect-antipatterns.mjs](https://github.com/arii/tech-dancer/pull/137/files) `+142/-0`
- `[A]` [scripts/generate-todo.mjs](https://github.com/arii/tech-dancer/pull/137/files) `+37/-0`
- `[M]` [src/components/GlobalSearch.tsx](https://github.com/arii/tech-dancer/pull/137/files) `+68/-32`
- `[M]` [src/components/Navigation.tsx](https://github.com/arii/tech-dancer/pull/137/files) `+41/-11`
- `[M]` [src/components/ui/ContentCard.tsx](https://github.com/arii/tech-dancer/pull/137/files) `+6/-2`
- `[M]` [src/components/ui/FolioGrid.tsx](https://github.com/arii/tech-dancer/pull/137/files) `+28/-2`
- `[M]` [src/components/ui/Skeleton.tsx](https://github.com/arii/tech-dancer/pull/137/files) `+8/-1`
- `[M]` [src/features/dashboard/Dashboard.tsx](https://github.com/arii/tech-dancer/pull/137/files) `+19/-8`
- `[M]` [src/features/email-capture/EmailForm.tsx](https://github.com/arii/tech-dancer/pull/137/files) `+23/-4`
- `[M]` [src/features/email-capture/NewsletterBanner.tsx](https://github.com/arii/tech-dancer/pull/137/files) `+7/-3`
- `[M]` [src/features/lab/BlogDrafter.tsx](https://github.com/arii/tech-dancer/pull/137/files) `+31/-5`
- `[M]` [src/features/lab/GearCard.tsx](https://github.com/arii/tech-dancer/pull/137/files) `+37/-32`
- `[M]` [src/features/resources/ResourceGallery.tsx](https://github.com/arii/tech-dancer/pull/137/files) `+13/-3`
- `[M]` [src/index.css](https://github.com/arii/tech-dancer/pull/137/files) `+19/-5`
- `[M]` [src/layouts/ContentDetail.tsx](https://github.com/arii/tech-dancer/pull/137/files) `+4/-1`
- `[M]` [src/layouts/MainLayout.tsx](https://github.com/arii/tech-dancer/pull/137/files) `+3/-2`
- `[M]` [src/layouts/Text.tsx](https://github.com/arii/tech-dancer/pull/137/files) `+3/-1`
- `[M]` [src/lib/variants.ts](https://github.com/arii/tech-dancer/pull/137/files) `+1/-1`
- `[M]` [src/main.tsx](https://github.com/arii/tech-dancer/pull/137/files) `+2/-0`
- `[M]` [src/styles/design-tokens.ts](https://github.com/arii/tech-dancer/pull/137/files) `+13/-0`
- `[M]` [src/styles/motion.ts](https://github.com/arii/tech-dancer/pull/137/files) `+64/-21`
- `[M]` [tailwind.config.js](https://github.com/arii/tech-dancer/pull/137/files) `+3/-0`
- `[M]` [tests/smoke.spec.ts](https://github.com/arii/tech-dancer/pull/137/files) `+1/-1`
- `[A]` [ux_about.png](https://github.com/arii/tech-dancer/pull/137/files) `+0/-0`

---

## Per-File Audit

Note: Do NOT skip any file. Leave a comment for every file, even if clean.


<!-- BEGIN_FILE_AUDIT: .gitignore -->
---

### File: `.gitignore` +5/-0 (modified)

Diff:
```diff
@@ -12,6 +12,11 @@ coverage/
 playwright-report/
 test-results/
 
+# AI Debugger
+ai-fix-prompt.txt
+antipattern-report.txt
+TODO_ANTIPATTERNS.md
+
 # Python / ETL
 __pycache__/
 *.py[cod]
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
  "path": ".gitignore",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": ".gitignore",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: .gitignore -->


<!-- BEGIN_FILE_AUDIT: package.json -->
---

### File: `package.json` +7/-1 (modified)

Diff:
```diff
@@ -10,11 +10,16 @@
     "preview": "vite preview",
     "test:e2e": "playwright test",
     "clean": "rm -rf dist",
-    "lint": "tsc --noEmit"
+    "lint": "tsc --noEmit",
+    "audit": "node scripts/detect-antipatterns.mjs > antipattern-report.txt 2>&1 || true && node scripts/generate-todo.mjs",
+    "audit:fix": "node scripts/ai-debugger.mjs",
+    "audit:fix:gallery": "node scripts/ai-debugger.mjs http://localhost:3000/public/antipattern-examples/cardocalypse.html '.card'"
   },
   "dependencies": {
     "@base-ui/react": "^1.4.0",
     "@fontsource-variable/geist": "^5.2.8",
+    "@fontsource-variable/inter": "^5.2.8",
+    "@fontsource/fraunces": "^5.2.9",
     "@google/genai": "^1.29.0",
     "@tailwindcss/vite": "^4.2.2",
     "@vitejs/plugin-react": "^5.0.4",
@@ -41,6 +46,7 @@
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

### File: `plan.md` +28/-1 (modified)

Diff:
```diff
@@ -218,4 +218,31 @@ Repo Name: For the Vite base path.
 
 State: Is this local useState or should it be in the Zustand store?
 
-Follow these rules strictly to maintain project integrity.
\ No newline at end of file
+Follow these rules strictly to maintain project integrity.
+
+---
+
+## Technical Audit & UX Roadmap (Updated 2026-04-21)
+
+### 1. Aesthetic & Visual Polish
+- [x] **Typography & Hierarchy**: Implemented Inter (Sans) and Fraunces (Serif) pairing.
+- [x] **Optical Sizing**: Applied -0.02em tracking for display headings.
+- [x] **Color & Depth**: Integrated layered shadows and glassmorphism.
+- [x] **Consistency**: Standardized `rounded-xl` radii across the system.
+
+### 2. Interaction & Motion
+- [x] **Sticky Headers**: Scroll-aware transitions for mobile and desktop navigation.
+- [x] **Micro-interactions**: Tactile button scaling and card lift effects.
+- [x] **Staggered Reveals**: Entrance animations for grid items.
+- [x] **Mobile Transitions**: Right-to-Left spring animation for menu.
+
+### 3. Usability & Functional Excellence
+- [x] **Global Search**: CMD+K support and results highlighting.
+- [x] **Form Feedback**: Inline validation for email capture.
+- [x] **Category Empty States**: "Coming soon" placeholders for empty content feeds.
+- [x] **Large Viewport Optimization**: Max-width constraints for 4K displays.
+
+### 4. Automation Suite
+- [x] **Linter**: `npm run audit` for design system adherence.
+- [x] **TODO Generator**: Automated task derivation from audit reports.
+- [x] **AI Debugger**: Context-aware prompt generation for UI fixes.
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


<!-- BEGIN_FILE_AUDIT: pnpm-lock.yaml -->
---

### File: `pnpm-lock.yaml` +19/-0 (modified)

Diff:
```diff
@@ -14,6 +14,12 @@ importers:
       '@fontsource-variable/geist':
         specifier: ^5.2.8
         version: 5.2.8
+      '@fontsource-variable/inter':
+        specifier: ^5.2.8
+        version: 5.2.8
+      '@fontsource/fraunces':
+        specifier: ^5.2.9
+        version: 5.2.9
       '@google/genai':
         specifier: ^1.29.0
         version: 1.50.1(@modelcontextprotocol/sdk@1.29.0(zod@3.25.76))
@@ -87,6 +93,9 @@ importers:
       autoprefixer:
         specifier: ^10.5.0
         version: 10.5.0(postcss@8.5.10)
+      playwright:
+        specifier: ^1.59.1
+        version: 1.59.1
       postcss:
         specifier: ^8.5.10
         version: 8.5.10
@@ -628,6 +637,12 @@ packages:
   '@fontsource-variable/geist@5.2.8':
     resolution: {integrity: sha512-cJ6m9e+8MQ5dCYJsLylfZrgBh6KkG4bOLckB35Tr9J/EqdkEM6QllH5PxqP1dhTvFup+HtMRPuz9xOjxXJggxw==}
 
+  '@fontsource-variable/inter@5.2.8':
+    resolution: {integrity: sha512-kOfP2D+ykbcX/P3IFnokOhVRNoTozo5/JxhAIVYLpea/UBmCQ/YWPBfWIDuBImXX/15KH+eKh4xpEUyS2sQQGQ==}
+
+  '@fontsource/fraunces@5.2.9':
+    resolution: {integrity: sha512-XDzuddBtoC7BZgZdBn6b7hsFZY2+V1hgN7yca5fBTKuHjb/lOd45a0Ji8dTUgFhPoL7RdGupo+bC2BFSt6UH8Q==}
+
   '@google/genai@1.50.1':
     resolution: {integrity: sha512-YbkX7H9+1Pt8wOt7DDREy8XSoiL6fRDzZQRyaVBarFf8MR3zHGqVdvM4cLbDXqPhxqvegZShgfxb8kw9C7YhAQ==}
     engines: {node: '>=20.0.0'}
@@ -3793,6 +3808,10 @@ snapshots:
 
   '@fontsource-variable/geist@5.2.8': {}
 
+  '@fontsource-variable/inter@5.2.8': {}
+
+  '@fontsource/fraunces@5.2.9': {}
+
   '@google/genai@1.50.1(@modelcontextprotocol/sdk@1.29.0(zod@3.25.76))':
     dependencies:
       google-auth-library: 10.6.2
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


<!-- BEGIN_FILE_AUDIT: scripts/ai-debugger.mjs -->
---

### File: `scripts/ai-debugger.mjs` +87/-0 (added)

Diff:
```diff
@@ -0,0 +1,87 @@
+import { chromium } from 'playwright';
+import fs from 'fs';
+import path from 'path';
+
+/**
+ * Captures a screenshot, converts to Base64, and formats a query for an AI Bot.
+ * @param {string} url - The local or remote URL to audit.
+ * @param {string} selector - The specific CSS selector to capture (defaults to body).
+ */
+async function generateAiFixQuery(url, selector = 'body') {
+  console.log(`🚀 Auditing ${url} (selector: ${selector})...`);
+
+  let browser;
+  try {
+    browser = await chromium.launch();
+    const page = await browser.newPage();
+
+    await page.goto(url, { waitUntil: 'networkidle' });
+
+    // 1. Capture Screenshot as Base64 string
+    const element = await page.$(selector);
+    if (!element) {
+        throw new Error(`Selector "${selector}" not found on page.`);
+    }
+    const buffer = await element.screenshot();
+    const base64Image = buffer.toString('base64');
+    const dataUri = `data:image/png;base64,${base64Image}`;
+
+    // 2. Extract context from the page (computed styles / DOM structure)
+    const context = await page.evaluate((sel) => {
+      const el = document.querySelector(sel);
+      return {
+        html: el.outerHTML.substring(0, 2000), // Increased limit slightly
+        computedStyles: {
+          fontSize: window.getComputedStyle(el).fontSize,
+          color: window.getComputedStyle(el).color,
+          backgroundColor: window.getComputedStyle(el).backgroundColor,
+          fontFamily: window.getComputedStyle(el).fontFamily,
+          padding: window.getComputedStyle(el).padding,
+          margin: window.getComputedStyle(el).margin,
+          display: window.getComputedStyle(el).display
+        }
+      };
+    }, selector);
+
+    // 3. Format the final "Copy-Paste" output
+    const prompt = `
+### INSTRUCTIONS for AI Assistant ###
+I am using the 'Impeccable' audit tool to fix UI anti-patterns.
+Attached is a Base64 representation of a UI component that has failed specific design heuristics.
+
+**Task:** Review the visual layout and the provided HTML/CSS context. Identify issues related to:
+1. Typography (Hierarchy, line-height)
+2. Spatial Design (Padding, grid-breaking elements)
+3. Color & Contrast
+
+**HTML Snippet:**
+\`\`\`html
+${context.html}
+\`\`\`
+
+**Computed Styles:**
+${JSON.stringify(context.computedStyles, null, 2)}
+
+**Image Data (Copy/Paste this into the chat or upload the URI):**
+${dataUri}
+
+**Please provide the refactored React/TypeScript code and Tailwind/CSS classes to fix these issues.**
+    `;
+
+    const outputPath = path.resolve(process.cwd(), 'ai-fix-prompt.txt');
+    fs.writeFileSync(outputPath, prompt);
+    console.log(`\x1b[32m✔ Success!\x1b[0m AI fix query generated at: ${outputPath}`);
+    console.log('You can now copy the contents of that file directly into your AI chat bot.');
+  } catch (error) {
+    console.error(`\x1b[31m✖ Error during audit:\x1b[0m`, error.message);
+    process.exit(1);
+  } finally {
+    if (browser) await browser.close();
+  }
+}
+
+// Example usage: node scripts/ai-debugger.js <url> <selector>
+const targetUrl = process.argv[2] || 'http://localhost:3000/';
+const targetSelector = process.argv[3] || 'body';
+
+generateAiFixQuery(targetUrl, targetSelector);
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
  "path": "scripts/ai-debugger.mjs",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "scripts/ai-debugger.mjs",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: scripts/ai-debugger.mjs -->


<!-- BEGIN_FILE_AUDIT: scripts/capture-screenshots.mjs -->
---

### File: `scripts/capture-screenshots.mjs` +35/-0 (added)

Diff:
```diff
@@ -0,0 +1,35 @@
+import { chromium } from 'playwright';
+import path from 'path';
+
+const routes = [
+  { name: 'home', path: '/' },
+  { name: 'blog', path: '/blog' },
+  { name: 'gear', path: '/gear' },
+  { name: 'lab', path: '/lab' },
+  { name: 'about', path: '/about' },
+  { name: 'contact', path: '/contact' }
+];
+
+async function capture() {
+  const browser = await chromium.launch();
+  const page = await browser.newPage();
+  // Standard desktop viewport, high enough to see most content
+  await page.setViewportSize({ width: 1280, height: 1200 });
+
+  for (const route of routes) {
+    try {
+      console.log(`📸 Capturing ${route.name} at http://localhost:3000${route.path}...`);
+      await page.goto(`http://localhost:3000${route.path}`, { waitUntil: 'networkidle', timeout: 30000 });
+      // Give some extra time for animations to settle
+      await page.waitForTimeout(1000);
+      await page.screenshot({ path: `ux_${route.name}.png`, fullPage: true });
+      console.log(`✅ Saved ux_${route.name}.png`);
+    } catch (err) {
+      console.error(`❌ Failed to capture ${route.name}: ${err.message}`);
+    }
+  }
+
+  await browser.close();
+}
+
+capture();
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
  "path": "scripts/capture-screenshots.mjs",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "scripts/capture-screenshots.mjs",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: scripts/capture-screenshots.mjs -->


<!-- BEGIN_FILE_AUDIT: scripts/detect-antipatterns.mjs -->
---

### File: `scripts/detect-antipatterns.mjs` +142/-0 (added)

Diff:
```diff
@@ -0,0 +1,142 @@
+import fs from 'fs';
+import path from 'path';
+import { fileURLToPath } from 'url';
+
+const __dirname = path.dirname(fileURLToPath(import.meta.url));
+const ROOT = path.resolve(__dirname, '..');
+
+const CHECK_DIRS = ['src/features', 'src/pages', 'src/App.tsx'];
+
+// Allowed tokens or patterns that look like Tailwind but are safe
+const ALLOWED_COLORS = ['bg', 'surface', 'accent', 'accent-navy', 'text-main', 'text-body', 'text-dim', 'line', 'white', 'black', 'transparent', 'current', 'yellow-400'];
+const ALLOWED_TEXT_UTILS = ['left', 'right', 'center', 'justify', 'uppercase', 'lowercase', 'capitalize', 'normal-case', 'italic', 'not-italic'];
+const ALLOWED_TEXT_SIZES = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
+
+function checkFile(filepath) {
+  const content = fs.readFileSync(filepath, 'utf8');
+  const lines = content.split('\n');
+  const violations = [];
+
+  if (content.includes('// impeccable-ignore-file')) {
+    return [];
+  }
+
+  // 1. Check for arbitrary values -[...]
+  const arbitraryRegex = /-\[.*?\]/g;
+  let match;
+  while ((match = arbitraryRegex.exec(content)) !== null) {
+    const lineNum = getLineNumber(content, match.index);
+    if (lines[lineNum - 1].includes('// impeccable-ignore')) continue;
+
+    violations.push({
+      line: lineNum,
+      pattern: 'Arbitrary Value',
+      value: match[0],
+      message: 'Avoid arbitrary values like -[...]. Use design tokens instead.'
+    });
+  }
+
+  // 2. Check for raw Tailwind classes in className
+  const classNameRegex = /className=["'](.*?)["']/g;
+  while ((match = classNameRegex.exec(content)) !== null) {
+    const lineNum = getLineNumber(content, match.index);
+    if (lines[lineNum - 1].includes('// impeccable-ignore')) continue;
+
+    const classStr = match[1];
+    const classes = classStr.split(/\s+/);
+
+    classes.forEach(cls => {
+      // Layout & Spacing
+      if (/\b(flex|grid|items-|justify-|p[xytrbl]?-|m[xytrbl]?-|gap-)\b/.test(cls)) {
+        violations.push({
+          line: lineNum,
+          pattern: 'Raw Layout/Spacing',
+          value: cls,
+          message: 'Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.'
+        });
+      }
+
+      // Colors
+      if (/\b(bg-|text-)\b/.test(cls)) {
+        const colorMatch = cls.match(/\b(?:[a-z-]+:)?(bg|text)-([a-z0-9/-]+)\b/);
+        if (colorMatch) {
+          const baseColor = colorMatch[2].split('/')[0];
+          const isAllowed = ALLOWED_COLORS.includes(baseColor) ||
+                            ALLOWED_TEXT_UTILS.includes(baseColor) ||
+                            ALLOWED_TEXT_SIZES.includes(baseColor);
+
+          if (!isAllowed) {
+            violations.push({
+              line: lineNum,
+              pattern: 'Non-token Color/Size',
+              value: cls,
+              message: `Class '${cls}' uses a value that is not a recognized design token.`
+            });
+          }
+        }
+      }
+    });
+  }
+
+  // 3. Check for <div> with layout classes (Rule 3 & 21)
+  const divRegex = /<div\s+[^>]*?className=["'](.*?(?:flex|grid|p-|m-|gap-).*?)["']/g;
+  while ((match = divRegex.exec(content)) !== null) {
+      const lineNum = getLineNumber(content, match.index);
+      if (lines[lineNum - 1].includes('// impeccable-ignore')) continue;
+
+      violations.push({
+          line: lineNum,
+          pattern: 'div Layout',
+          value: '<div> with layout classes',
+          message: 'Avoid using <div> for layout. Use layout primitives from src/layouts/.'
+      });
+  }
+
+  return violations;
+}
+
+function getLineNumber(content, index) {
+  return content.substring(0, index).split('\n').length;
+}
+
+function walk(dir, callback) {
+    if (!fs.existsSync(dir)) return;
+    if (fs.statSync(dir).isFile()) {
+        callback(dir);
+        return;
+    }
+    fs.readdirSync(dir).forEach( f => {
+        let dirPath = path.join(dir, f);
+        let isDirectory = fs.statSync(dirPath).isDirectory();
+        isDirectory ? walk(dirPath, callback) : callback(dirPath);
+    });
+}
+
+console.log('\x1b[34m🔍 Scanning for UI anti-patterns...\x1b[0m\n');
+
+const allViolations = {};
+CHECK_DIRS.forEach(dir => {
+    const fullPath = path.resolve(ROOT, dir);
+    walk(fullPath, (filepath) => {
+        if (filepath.endsWith('.tsx')) {
+            const violations = checkFile(filepath);
+            if (violations.length > 0) {
+                allViolations[path.relative(ROOT, filepath)] = violations;
+            }
+        }
+    });
+});
+
+if (Object.keys(allViolations).length === 0) {
+  console.log('\x1b[32m✔ No anti-patterns detected!\x1b[0m');
+} else {
+  console.log('\x1b[31m✖ Anti-patterns detected:\x1b[0m\n');
+  for (const [file, violations] of Object.entries(allViolations)) {
+    console.log(`\x1b[36m${file}\x1b[0m`);
+    violations.forEach(v => {
+      console.log(`  \x1b[90mLine ${v.line}:\x1b[0m [${v.pattern}] \x1b[33m${v.value}\x1b[0m - ${v.message}`);
+    });
+    console.log();
+  }
+  process.exit(1);
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
  "path": "scripts/detect-antipatterns.mjs",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "scripts/detect-antipatterns.mjs",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: scripts/detect-antipatterns.mjs -->


<!-- BEGIN_FILE_AUDIT: scripts/generate-todo.mjs -->
---

### File: `scripts/generate-todo.mjs` +37/-0 (added)

Diff:
```diff
@@ -0,0 +1,37 @@
+import fs from 'fs';
+
+const generateTodo = () => {
+  const reportPath = 'antipattern-report.txt';
+  if (!fs.existsSync(reportPath)) {
+    console.error(`Error: ${reportPath} not found.`);
+    return;
+  }
+
+  const lines = fs.readFileSync(reportPath, 'utf8').split('\n');
+  let todoContent = "# UI Anti-Pattern TODO List\n\n";
+  todoContent += "This list is automatically generated from the `npm run audit` report. Fix these anti-patterns to adhere to the project design system.\n\n";
+
+  let currentFile = null;
+
+  for (let line of lines) {
+    line = line.trim();
+    if (!line || line.startsWith('>') || line.includes('Scanning') || line.includes('Anti-patterns detected')) {
+      continue;
+    }
+
+    // Clean ANSI escape sequences
+    const cleanLine = line.replace(/\x1b\[[0-9;]*m/g, '');
+
+    if (cleanLine.startsWith('src/')) {
+      currentFile = cleanLine;
+      todoContent += `## ${currentFile}\n`;
+    } else if (currentFile && cleanLine.startsWith('Line')) {
+      todoContent += `- [ ] ${cleanLine}\n`;
+    }
+  }
+
+  fs.writeFileSync('TODO_ANTIPATTERNS.md', todoContent);
+  console.log("Successfully generated TODO_ANTIPATTERNS.md");
+}
+
+generateTodo();
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
  "path": "scripts/generate-todo.mjs",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "scripts/generate-todo.mjs",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: scripts/generate-todo.mjs -->


<!-- BEGIN_FILE_AUDIT: src/components/GlobalSearch.tsx -->
---

### File: `src/components/GlobalSearch.tsx` +68/-32 (modified)

Diff:
```diff
@@ -1,5 +1,5 @@
 import { motion, AnimatePresence } from 'motion/react';
-import { Search, X, Hash, ArrowRight, CornerDownLeft } from 'lucide-react';
+import { Search, X, Hash, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
 import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
 import { useGlobalSearch } from '@/hooks/useGlobalSearch';
 import { useState, useEffect, useRef } from 'react';
@@ -15,7 +15,7 @@ export function GlobalSearch() {
     const handleOpenSearch = () => setIsOpen(true);
     const handleKeyDown = (e: KeyboardEvent) => {
       if (e.key === 'Escape') setIsOpen(false);
-      if (e.ctrlKey && e.key === 'k') {
+      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
         e.preventDefault();
         setIsOpen(true);
       }
@@ -97,41 +97,77 @@ export function GlobalSearch() {
               <Box padding={3} overflow="y-auto" maxHeight="60vh" className="bg-white">
                 {results.length > 0 ? (
                   <Stack gap={2}>
-                    {results.map((res: any) => (
+                    {results.map((res: any) => {
+                      const highlight = (text: string) => {
+                        if (!query) return text;
+                        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
+                        const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));
+                        return parts.map((part, i) =>
+                          part.toLowerCase() === query.toLowerCase()
+                            ? <span key={i} className="text-accent bg-accent/10 rounded-sm px-0.5">{part}</span>
+                            : part
+                        );
+                      };
+
+                      return (
+                        <Box
+                          key={`${res.type}-${res.slug}`}
+                          as="button"
+                          onClick={() => handleSelect(res)}
+                          width="full"
+                          padding={3}
+                          display="flex"
+                          align="center"
+                          gap={4}
+                          surface="default"
+                          border
+                          className="hover:bg-accent/5 group transition-colors text-left"
+                        >
+                          <Box border padding={2} surface="muted" radius="sm" className="shrink-0">
+                              <Hash className="w-4 h-4 text-accent-brand opacity-50" />
+                          </Box>
+                          <Stack gap={1} flex className="min-w-0">
+                              <Box display="flex" align="center" justify="between" gap={3}>
+                                <Text variant="display" size="lg" className="group-hover:text-accent-brand truncate">
+                                  {highlight(res.title)}
+                                </Text>
+                                <Box border paddingX={2} paddingY={0.5} radius="none" className="bg-accent/5 shrink-0">
+                                    <Text variant="mono" size="micro" color="brand">{res.type.toUpperCase()}</Text>
+                                </Box>
+                              </Box>
+                              <Text variant="body" size="xs" color="dim" className="line-clamp-1 truncate">
+                                {highlight(res.excerpt)}
+                              </Text>
+                          </Stack>
+                          <CornerDownLeft className="w-4 h-4 opacity-0 group-hover:opacity-30 transition-opacity" />
+                        </Box>
+                      );
+                    })}
+                  </Stack>
+                ) : (
+                  <Box paddingY={20} display="flex" align="center" justify="center">
+                    <Stack align="center" gap={6} className="text-center">
+                      <Box className="relative">
+                        <Search className="w-16 h-16 text-line" strokeWidth={1} />
+                        <Sparkles className="w-6 h-6 text-accent-brand absolute -top-2 -right-2 animate-pulse" />
+                      </Box>
+                      <Stack gap={2}>
+                        <Text variant="display" size="xl">No Matches Found</Text>
+                        <Text variant="body" size="sm" color="dim" className="max-w-xs">
+                          Your query did not return any components from the tech-dancer repository.
+                        </Text>
+                      </Stack>
                       <Box 
-                        key={`${res.type}-${res.slug}`}
                         as="button"
-                        onClick={() => handleSelect(res)}
-                        width="full"
-                        padding={3}
-                        display="flex"
-                        align="center"
-                        gap={4}
-                        surface="default"
+                        onClick={() => setQuery('')}
+                        paddingX={4}
+                        paddingY={2}
+                        radius="md"
                         border
-                        className="hover:bg-accent/5 group transition-colors text-left"
+                        className="text-xs font-mono font-bold hover:bg-bg transition-colors"
                       >
-                         <Box border padding={2} surface="muted" radius="sm" className="shrink-0">
-                            <Hash className="w-4 h-4 text-accent-brand opacity-50" />
-                         </Box>
-                         <Stack gap={1} flex className="min-w-0">
-                            <Box display="flex" align="center" justify="between" gap={3}>
-                               <Text variant="display" size="lg" className="group-hover:text-accent-brand truncate">{res.title}</Text>
-                               <Box border paddingX={2} paddingY={0.5} radius="none" className="bg-accent/5 shrink-0">
-                                  <Text variant="mono" size="micro" color="brand">{res.type.toUpperCase()}</Text>
-                               </Box>
-                            </Box>
-                            <Text variant="body" size="xs" color="dim" className="line-clamp-1 truncate">{res.excerpt}</Text>
-                         </Stack>
-                         <CornerDownLeft className="w-4 h-4 opacity-0 group-hover:opacity-30 transition-opacity" />
+                        RESET FILTERS
                       </Box>
-                    ))}
-                  </Stack>
-                ) : (
-                  <Box padding={12} display="flex" align="center" justify="center" opacity={30}>
-                    <Stack align="center" gap={4}>
-                      <Search className="w-12 h-12 opacity-20" />
-                      <Text variant="mono" size="xs" color="dim">Calibrating Variance...</Text>
                     </Stack>
                   </Box>
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

### File: `src/components/Navigation.tsx` +41/-11 (modified)

Diff:
```diff
@@ -1,5 +1,5 @@
 import { ShoppingBag, Database, BookOpen, User, Home, Menu, X, Terminal, Search } from 'lucide-react';
-import { useState } from 'react';
+import { useState, useEffect } from 'react';
 import { NavLink } from 'react-router-dom';
 import { motion, AnimatePresence } from 'motion/react';
 import { Box, Stack, Text } from '@/layouts/Primitives';
@@ -22,28 +22,54 @@ function NavItem({ to, label, icon: Icon, onClick, isMobile }: { to: string, lab
         onClick={onClick}
         className={({ isActive }) => cn(
           "flex items-center gap-4 transition-all relative z-10 rounded-md",
-          isMobile ? "py-6 border-b border-line/50 text-xl" : "py-6 px-4",
+          isMobile ? "py-6 border-b border-line/50 text-xl" : "py-4 px-4",
           isActive 
-            ? "text-accent bg-bg" 
+            ? "text-accent bg-accent/5"
             : "text-text-dim hover:text-accent hover:bg-bg/50"
         )}
       >
         <Icon className={cn("w-5 h-5 stroke-[1.5] flex-shrink-0", isMobile ? "w-6 h-6" : "")} />
-        <Text variant="sans" size={isMobile ? "lg" : "base"} weight="font-bold" className="leading-none">
-          {label}
-        </Text>
+        <Box display="flex" align="center" gap={3} flex>
+          <Text variant="sans" size={isMobile ? "lg" : "base"} weight="font-bold" className="leading-none">
+            {label}
+          </Text>
+          <NavLink to={to}>
+            {({ isActive }) => isActive && (
+              <motion.div
+                layoutId="active-nav-indicator"
+                className="w-1.5 h-1.5 rounded-full bg-accent"
+                transition={{ type: "spring", stiffness: 300, damping: 30 }}
+              />
+            )}
+          </NavLink>
+        </Box>
       </NavLink>
     </Box>
   );
 }
 
 export default function Navigation() {
   const [isOpen, setIsOpen] = useState(false);
+  const [scrolled, setScrolled] = useState(false);
+
+  useEffect(() => {
+    const handleScroll = () => setScrolled(window.scrollY > 20);
+    window.addEventListener('scroll', handleScroll);
+    return () => window.removeEventListener('scroll', handleScroll);
+  }, []);
 
   return (
     <>
       {/* Mobile Header */}
-      <Box as="nav" aria-label="Mobile Navigation" layout="mobileHeader">
+      <Box
+        as="nav"
+        aria-label="Mobile Navigation"
+        layout="mobileHeader"
+        className={cn(
+          "transition-all duration-300",
+          scrolled ? "bg-surface/90 backdrop-blur-xl border-b border-line" : "bg-transparent border-transparent"
+        )}
+      >
         <Box as={NavLink} to="/" onClick={() => setIsOpen(false)}>
           <Text variant="mono" size="sm" weight="font-bold" className="text-accent-navy tracking-wider uppercase">TECH-DANCER</Text>
         </Box>
@@ -64,9 +90,10 @@ export default function Navigation() {
         {isOpen && (
           <Box 
             as={motion.div} 
-            initial={{ x: '-100%' }}
+            initial={{ x: '100%' }}
             animate={{ x: 0 }}
-            exit={{ x: '-100%' }}
+            exit={{ x: '100%' }}
+            transition={motionTokens.arielTransition}
             position="fixed"
             className="top-16 left-0 right-0 bottom-0 z-[100] bg-bg lg:hidden w-full"
             padding={8}
@@ -93,9 +120,12 @@ export default function Navigation() {
         as="nav"
         aria-label="Main Navigation"
         layout="navRail" 
-        className="w-[280px] bg-surface border-r border-line hidden lg:flex flex-col min-h-screen sticky top-0"
+        className={cn(
+          "w-[280px] bg-surface border-r border-line hidden lg:flex flex-col min-h-screen sticky top-0 transition-all duration-300",
+          scrolled ? "backdrop-blur-xl bg-surface/90" : ""
+        )}
       >
-        <Stack padding={8} gap={10} flex={1}>
+        <Stack padding={8} gap={10} flex={1} className={cn("transition-all duration-500", scrolled && "gap-6 pt-6")}>
           <Box as={NavLink} to="/" className="group block mb-4">
             <Text 
               variant="mono" 
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

### File: `src/components/ui/ContentCard.tsx` +6/-2 (modified)

Diff:
```diff
@@ -1,3 +1,4 @@
+import React from 'react';
 import { NavLink } from 'react-router-dom';
 import { motion } from 'motion/react';
 import { Box, Stack, Text } from '@/layouts/Primitives';
@@ -33,18 +34,21 @@ export function ContentCardSkeleton() {
 }
 
 export function ContentCard({ slug, title, category, excerpt, date, image, basePath, aspect = "video" }: ContentCardProps) {
+  const [imgError, setImgError] = React.useState(false);
+
   return (
     <Box 
       as={NavLink}
       to={`${basePath}/${slug}`}
-      className="group cursor-pointer flex flex-col h-full bg-surface border border-line hover:border-accent transition-all duration-300 rounded-none overflow-hidden"
+      className="group cursor-pointer flex flex-col h-full bg-surface border border-line hover:border-accent hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl overflow-hidden shadow-sm"
     >
       {/* Visual Thumbnail */}
       <Box className="relative aspect-video overflow-hidden bg-bg">
-        {image ? (
+        {image && !imgError ? (
           <img 
             src={image} 
             alt={title} 
+            onError={() => setImgError(true)}
             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
           />
         ) : (
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


<!-- BEGIN_FILE_AUDIT: src/components/ui/FolioGrid.tsx -->
---

### File: `src/components/ui/FolioGrid.tsx` +28/-2 (modified)

Diff:
```diff
@@ -1,8 +1,11 @@
 import { useState } from 'react';
+import { motion } from 'motion/react';
+import { Sparkles } from 'lucide-react';
 import { ContentCard, ContentCardSkeleton } from '@/components/ui/ContentCard';
 import { PageHeader } from '@/components/ui/PageHeader';
 import { Box, Grid } from '@/layouts/Primitives';
 import { safeSearch } from '@/lib/utils';
+import { motionTokens } from '@/styles/motion';
 
 export default function FolioGrid({ items, categoryTitle, basePath, label, description, children, loading }: { items: any[], categoryTitle: string, basePath: string, label?: string, description?: string, children?: React.ReactNode, loading?: boolean }) {
   const [search, setSearch] = useState('');
@@ -43,10 +46,21 @@ export default function FolioGrid({ items, categoryTitle, basePath, label, descr
         </Box>
       </Box>
 
-      <Grid cols={{ base: 1, md: 2, xl: 3 }} gap={0} border="t" className="border-l border-line mt-8">
+      <Grid
+        as={motion.div}
+        variants={motionTokens.staggerContainer}
+        initial="initial"
+        animate="animate"
+        cols={{ base: 1, md: 2, xl: 3 }}
+        gap={0}
+        border="t"
+        className="border-l border-line mt-8"
+      >
         {loading ? (
           Array.from({ length: 6 }).map((_, index) => (
             <Box
+              as={motion.div}
+              variants={motionTokens.fadeInUp}
               key={index}
               border="r"
               borderBottom={true}
@@ -56,9 +70,11 @@ export default function FolioGrid({ items, categoryTitle, basePath, label, descr
               <ContentCardSkeleton />
             </Box>
           ))
-        ) : (
+        ) : filteredItems.length > 0 ? (
           filteredItems.map((item, index) => (
             <Box
+              as={motion.div}
+              variants={motionTokens.fadeInUp}
               key={item.slug}
               border="r"
               borderBottom={true}
@@ -72,6 +88,16 @@ export default function FolioGrid({ items, categoryTitle, basePath, label, descr
               />
             </Box>
           ))
+        ) : (
+          <Box span="full" paddingY={32} display="flex" align="center" justify="center" className="bg-surface/50">
+            <Stack align="center" gap={6} className="text-center opacity-40">
+              <Sparkles className="w-12 h-12 text-accent-brand animate-pulse" />
+              <Stack gap={2}>
+                <Text variant="display" size="2xl">STATION_OFFLINE</Text>
+                <Text variant="body" size="base">The repository is currently empty for this sector.</Text>
+              </Stack>
+            </Stack>
+          </Box>
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


<!-- BEGIN_FILE_AUDIT: src/components/ui/Skeleton.tsx -->
---

### File: `src/components/ui/Skeleton.tsx` +8/-1 (modified)

Diff:
```diff
@@ -2,6 +2,13 @@ import { cn } from '@/lib/utils';
 
 export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
   return (
-    <div className={cn('animate-pulse rounded-md bg-line/20', className)} {...props} />
+    <div
+      className={cn(
+        'animate-pulse rounded-md bg-line/10 relative overflow-hidden',
+        'after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_2s_infinite] after:bg-gradient-to-r after:from-transparent after:via-accent/5 after:to-transparent',
+        className
+      )}
+      {...props}
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
  "path": "src/components/ui/Skeleton.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/components/ui/Skeleton.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/components/ui/Skeleton.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/dashboard/Dashboard.tsx -->
---

### File: `src/features/dashboard/Dashboard.tsx` +19/-8 (modified)

Diff:
```diff
@@ -3,6 +3,7 @@ import { NavLink } from 'react-router-dom';
 import { Zap, ArrowRight, Shield, Calendar } from 'lucide-react';
 import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
 import { useHome } from './useHome';
+import { motionTokens } from '@/styles/motion';
 import { PageHeader, SectionHeader } from '@/components/ui/PageHeader';
 import PathSelector from '@/components/ui/PathSelector';
 import { ContentCard } from '@/components/ui/ContentCard';
@@ -52,19 +53,29 @@ export default function Home() {
             </Box>
           </SectionHeader>
 
-          <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={4}>
+          <Grid
+            as={motion.div}
+            variants={motionTokens.staggerContainer}
+            initial="initial"
+            animate="animate"
+            cols={{ base: 1, sm: 2, lg: 4 }}
+            gap={4}
+          >
             {recentPosts.map((post) => (
-              <ContentCard 
-                key={post.slug}
-                {...post}
-                basePath="/blog"
-                aspect="video"
-              />
+              <Box as={motion.div} variants={motionTokens.fadeInUp} key={post.slug}>
+                <ContentCard
+                  {...post}
+                  basePath="/blog"
+                  aspect="video"
+                />
+              </Box>
             ))}
 
             {/* Upcoming Events Mini-Cards */}
             {upcomingEvents.map((event) => (
-              <EventCard key={event.name} {...event} />
+              <Box as={motion.div} variants={motionTokens.fadeInUp} key={event.name}>
+                <EventCard {...event} />
+              </Box>
             ))}
           </Grid>
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


<!-- BEGIN_FILE_AUDIT: src/features/email-capture/EmailForm.tsx -->
---

### File: `src/features/email-capture/EmailForm.tsx` +23/-4 (modified)

Diff:
```diff
@@ -1,8 +1,9 @@
 import { Stack, Box, Text, Button } from '@/layouts/Primitives';
 import { useEmailCaptureContext } from './EmailCaptureContext';
 import { motion, AnimatePresence } from 'motion/react';
-import { ArrowRight, Loader2, Check } from 'lucide-react';
+import { ArrowRight, Loader2, Check, AlertCircle } from 'lucide-react';
 import { inputs } from '@/styles/design-tokens';
+import React from 'react';
 
 export function EmailForm() {
   const { status, submitForm, email, setEmail } = useEmailCaptureContext();
@@ -12,18 +13,36 @@ export function EmailForm() {
     submitForm(email);
   };
 
+  const [isValid, setIsValid] = React.useState(true);
+
+  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
+    const val = e.target.value;
+    setEmail(val);
+    if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
+      setIsValid(false);
+    } else {
+      setIsValid(true);
+    }
+  };
+
   return (
-    <Box as="form" onSubmit={handleSubmit} width="full" maxWidth="md" className="w-full md:w-auto">
+    <Box as="form" onSubmit={handleSubmit} width="full" maxWidth="md" className="w-full md:w-auto group">
       <Stack direction="row" gap={0} position="relative" className="w-full">
         <input
           type="email"
           placeholder="Email Address"
           value={email}
-          onChange={(e) => setEmail(e.target.value)}
+          onChange={handleEmailChange}
           required
           disabled={status === 'loading' || status === 'success'}
-          className={`${inputs.base} min-h-[44px] w-full`}
+          className={`${inputs.base} min-h-[44px] w-full ${!isValid ? 'border-red-500 focus:border-red-500' : ''}`}
         />
+        {!isValid && email && (
+          <Box position="absolute" className="-bottom-6 left-0 flex items-center gap-1 text-red-500">
+             <AlertCircle className="w-3 h-3" />
+             <Text variant="mono" size="micro">INVALID_ENCODING</Text>
+          </Box>
+        )}
         <Button
           type="submit"
           variant="primary"
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
  "path": "src/features/email-capture/EmailForm.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/features/email-capture/EmailForm.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/features/email-capture/EmailForm.tsx -->


<!-- BEGIN_FILE_AUDIT: src/features/email-capture/NewsletterBanner.tsx -->
---

### File: `src/features/email-capture/NewsletterBanner.tsx` +7/-3 (modified)

Diff:
```diff
@@ -16,13 +16,17 @@ export function NewsletterBanner() {
       animate={motionTokens.overlay.animate}
       exit={motionTokens.overlay.exit}
       transition={motionTokens.overlay.transition}
-      className="bg-white/80 backdrop-blur-xl border-t border-line/50 rounded-t-3xl shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05),0_-8px_10px_-6px_rgba(0,0,0,0.05)] mx-auto"
+      className="bg-white/80 backdrop-blur-xl border-t border-line/50 mx-auto"
       padding="emailBar"
       position="fixed"
-      style={{ bottom: 0, left: '1rem', right: '1rem', width: 'calc(100% - 2rem)' }}
+      inset="bottom"
+      marginX={4}
+      marginBottom={4}
+      radius="2xl"
+      shadow="topOverlay"
       zIndex="toast"
     >
-      <Box position="absolute" className="top-2 right-2" zIndex="docked">
+      <Box position="absolute" inset="right" padding={2} zIndex="docked">
         <Button
           variant="ghost"
           size="sm"
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


<!-- BEGIN_FILE_AUDIT: src/features/lab/BlogDrafter.tsx -->
---

### File: `src/features/lab/BlogDrafter.tsx` +31/-5 (modified)

Diff:
```diff
@@ -1,12 +1,22 @@
+import React from 'react';
 import { motion } from 'motion/react';
-import { Github, FileText, Send, Terminal, ExternalLink, Info } from 'lucide-react';
+import { Github, FileText, Send, Terminal, ExternalLink, Info, Copy, Check } from 'lucide-react';
 import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
 import { useBlogDrafter } from './useBlogDrafter';
 import ReactMarkdown from 'react-markdown';
 import { CONTENT_CATEGORIES } from '@/config/content';
 
 export function BlogDrafter() {
   const { data, updateField, markdownPreview, githubIssueUrl } = useBlogDrafter();
+  const [copied, setCopied] = React.useState(false);
+
+  const wordCount = data.commentary.trim().split(/\s+/).filter(Boolean).length;
+
+  const handleCopyMarkdown = () => {
+    navigator.clipboard.writeText(markdownPreview);
+    setCopied(true);
+    setTimeout(() => setCopied(false), 2000);
+  };
 
   return (
     <Stack gap={10} height="full">
@@ -127,7 +137,10 @@ export function BlogDrafter() {
             </Stack>
 
             <Stack gap={2}>
-              <Text variant="mono" size="micro" color="dim">BODY_COMMENTARY</Text>
+              <Box display="flex" justify="between">
+                <Text variant="mono" size="micro" color="dim">BODY_COMMENTARY</Text>
+                <Text variant="mono" size="micro" color="dim">{wordCount} WORDS</Text>
+              </Box>
               <Box
                 as="textarea"
                 value={data.commentary}
@@ -150,9 +163,22 @@ export function BlogDrafter() {
         <Stack gap={8}>
           <Box border="b" paddingBottom={2} display="flex" justify="between" align="center">
              <Text variant="mono" size="micro" color="brand">MARKDOWN_PREVIEW</Text>
-             <Box display="flex" align="center" gap={2} color="dim">
-                <FileText className="w-3 h-3" />
-                <Text variant="mono" size="micro">v1.2.0</Text>
+             <Box display="flex" align="center" gap={4}>
+                <Box
+                  as="button"
+                  onClick={handleCopyMarkdown}
+                  display="flex"
+                  align="center"
+                  gap={1}
+                  className="hover:text-accent-brand transition-colors"
+                >
+                   {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
+                   <Text variant="mono" size="micro">{copied ? 'COPIED' : 'COPY MD'}</Text>
+                </Box>
+                <Box display="flex" align="center" gap={2} color="dim">
+                  <FileText className="w-3 h-3" />
+                  <Text variant="mono" size="micro">v1.2.0</Text>
+                </Box>
              </Box>
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

### File: `src/features/lab/GearCard.tsx` +37/-32 (modified)

Diff:
```diff
@@ -1,3 +1,4 @@
+import React from 'react';
 import { NavLink } from 'react-router-dom';
 import { Box, Stack, Text } from '@/layouts/Primitives';
 import { Resource } from '@/lib/content';
@@ -18,78 +19,82 @@ export function GearCard({
   priceCategory,
   updatedDate
 }: GearCardProps) {
+  const [imgError, setImgError] = React.useState(false);
+
   return (
-    <NavLink
+    <Box
+      as={NavLink}
       to={`${basePath}/${slug}`}
-      className="group flex flex-col bg-surface rounded-2xl border border-line shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
+      className="group flex flex-col bg-surface rounded-xl border border-line shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
     >
       {/* Image Wrapper */}
-      <div className="aspect-square md:aspect-video relative overflow-hidden bg-bg">
-        {image ? (
+      <Box className="aspect-square md:aspect-video relative overflow-hidden bg-bg">
+        {image && !imgError ? (
           <img
             src={image}
             alt={title}
+            onError={() => setImgError(true)}
             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
           />
         ) : (
-          <div className="w-full h-full flex items-center justify-center opacity-10 bg-accent-navy text-accent-navy">
+          <Box className="w-full h-full flex items-center justify-center opacity-10 bg-accent-navy text-accent-navy">
              <span className="font-display font-bold uppercase tracking-tight leading-none text-3xl">TD</span>
-          </div>
+          </Box>
         )}
-        <div className="absolute top-4 left-4">
-          <div className="bg-surface/90 backdrop-blur px-3 py-1 rounded-full border border-line">
+        <Box position="absolute" className="top-4 left-4">
+          <Box paddingX={3} paddingY={1} radius="full" border className="bg-surface/90 backdrop-blur">
             <Text variant="mono" size="micro" weight="font-bold" className="text-accent-navy uppercase">
               {category}
             </Text>
-          </div>
-        </div>
-      </div>
+          </Box>
+        </Box>
+      </Box>
 
       {/* Content Area */}
-      <div className="flex flex-col gap-4 p-6 flex-1">
-        <div className="flex flex-col gap-2">
+      <Stack gap={4} padding={6} flex={1}>
+        <Stack gap={2}>
           {rating && (
-            <div className="flex items-center gap-1 mb-1">
+            <Box display="flex" align="center" gap={1} marginBottom={1}>
               <span className="text-yellow-400">
                 {'★'.repeat(Math.floor(rating))}
                 {rating % 1 !== 0 ? '½' : ''}
               </span>
               <span className="text-[8px] text-text-dim font-medium">
                 ({rating}/5)
               </span>
-            </div>
+            </Box>
           )}
 
-          <h3 className="font-display font-bold uppercase tracking-tight leading-tight text-xl text-accent-navy group-hover:text-accent transition-colors">
+          <Text variant="display" weight="font-bold" size="xl" className="text-accent-navy group-hover:text-accent transition-colors leading-tight">
             {title}
-          </h3>
+          </Text>
 
-          <p className="font-sans leading-relaxed text-text-body text-sm line-clamp-2">
+          <Text variant="body" size="sm" className="line-clamp-2">
              {excerpt}
-          </p>
+          </Text>
 
           {(verdict || priceCategory || updatedDate) && (
-            <div className="flex flex-wrap items-center gap-3 mt-2">
+            <Box display="flex" wrap align="center" gap={3} marginTop={2}>
                {verdict && (
-                 <div className="bg-accent/10 px-2 py-0.5 rounded-md">
+                 <Box radius="md" paddingX={2} paddingY={0.5} className="bg-accent/10">
                    <span className="text-[8px] font-mono uppercase text-accent font-bold">{verdict}</span>
-                 </div>
+                 </Box>
                )}
                {priceCategory && (
                  <span className="text-[8px] font-mono uppercase text-text-dim font-bold">{priceCategory}</span>
                )}
                {updatedDate && (
                  <span className="text-[8px] font-mono uppercase text-text-dim">Updated {updatedDate}</span>
                )}
-            </div>
+            </Box>
           )}
-        </div>
+        </Stack>
 
-        <div className="flex items-center justify-between pt-4 border-t border-line/50 mt-auto">
-          <span className="font-mono tracking-wider uppercase text-accent font-bold text-xs">
+        <Box display="flex" align="center" justify="between" paddingTop={4} border="t" className="border-line/50 mt-auto">
+          <Text variant="mono" size="xs" weight="font-bold" className="text-accent">
             Read Review
-          </span>
-          <div className="group-hover:translate-x-1 transition-transform duration-300">
+          </Text>
+          <Box className="group-hover:translate-x-1 transition-transform duration-300">
             <svg
               xmlns="http://www.w3.org/2000/svg"
               width="16"
@@ -104,9 +109,9 @@ export function GearCard({
             >
               <polyline points="9 18 15 12 9 6"></polyline>
             </svg>
-          </div>
-        </div>
-      </div>
-    </NavLink>
+          </Box>
+        </Box>
+      </Stack>
+    </Box>
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


<!-- BEGIN_FILE_AUDIT: src/features/resources/ResourceGallery.tsx -->
---

### File: `src/features/resources/ResourceGallery.tsx` +13/-3 (modified)

Diff:
```diff
@@ -1,5 +1,5 @@
 import { motion, AnimatePresence } from 'motion/react';
-import { BookOpen, ArrowRight, Database, Plane, Scissors, Calendar, ArrowLeft, Activity, Shield } from 'lucide-react';
+import { BookOpen, ArrowRight, Database, Plane, Scissors, Calendar, ArrowLeft, Activity, Shield, Sparkles } from 'lucide-react';
 import Markdown from 'react-markdown';
 import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
 import { Resource } from '@/lib/content';
@@ -108,7 +108,7 @@ function ResourceList({ resources, onSelect }: { resources: Resource[]; onSelect
       </Stack>
 
       <Grid cols={{ base: 1, md: 12 }} border className="bg-line">
-        {resources.map((resource, i) => {
+        {resources.length > 0 ? resources.map((resource, i) => {
           const Icon = getIcon(resource.category);
           const isWide = i % 2 === 0;
           return (
@@ -152,7 +152,17 @@ function ResourceList({ resources, onSelect }: { resources: Resource[]; onSelect
               </Stack>
             </Box>
           );
-        })}
+        }) : (
+          <Box span="full" paddingY={32} display="flex" align="center" justify="center" surface="default">
+             <Stack align="center" gap={6} className="text-center opacity-40">
+               <Sparkles className="w-12 h-12 text-accent-brand animate-pulse" />
+               <Stack gap={2}>
+                 <Text variant="display" size="2xl">STATION_OFFLINE</Text>
+                 <Text variant="body" size="base">No reviews match your current tactical filters.</Text>
+               </Stack>
+             </Stack>
+          </Box>
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


<!-- BEGIN_FILE_AUDIT: src/index.css -->
---

### File: `src/index.css` +19/-5 (modified)

Diff:
```diff
@@ -2,8 +2,8 @@
 
 @theme {
   /* Modern Typography Identity */
-  --font-sans: "Albert Sans", ui-sans-serif, system-ui, sans-serif;
-  --font-display: "Bricolage Grotesque", sans-serif;
+  --font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
+  --font-display: "Fraunces", serif;
   --font-mono: "Space Mono", monospace;
 
   /* Clean Content Palette (60-30-10 Rule) */
@@ -38,7 +38,10 @@
 @layer utilities {
   /* Premium Industrial Utilities */
   .glass-panel {
-    @apply bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)];
+    @apply bg-white/70 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)];
+  }
+  .glass-card {
+    @apply bg-white/40 backdrop-blur-md border border-white/20 rounded-xl shadow-sm transition-all duration-300;
   }
   .industrial-gradient {
     background: linear-gradient(135deg, #001f3f 0%, #000c19 100%);
@@ -49,6 +52,16 @@
   .gold-accent {
     @apply border-accent/30 hover:border-accent transition-colors;
   }
+  .animated-underline {
+    @apply relative no-underline;
+  }
+  .animated-underline::after {
+    content: "";
+    @apply absolute bottom-0 left-1/2 w-0 h-[1px] bg-current transition-all duration-300 -translate-x-1/2;
+  }
+  .animated-underline:hover::after {
+    @apply w-full;
+  }
   .scanline-hover {
     @apply relative overflow-hidden;
   }
@@ -72,12 +85,13 @@
   body {
     @apply bg-bg text-text-body font-sans antialiased overflow-x-hidden w-full;
     line-height: 1.6;
+    letter-spacing: 0.01em;
   }
 
   h1, h2, h3, h4 {
     font-family: var(--font-display);
-    @apply text-accent-navy font-bold tracking-tight;
-    line-height: 1.2;
+    @apply text-accent-navy font-bold tracking-[-0.02em];
+    line-height: 1.1;
   }
 
   h1 { font-size: clamp(2.5rem, 5vw, 4rem); }
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

### File: `src/layouts/ContentDetail.tsx` +4/-1 (modified)

Diff:
```diff
@@ -1,3 +1,4 @@
+import React from 'react';
 import { motion } from 'motion/react';
 import { ArrowLeft, Clock, Tag, Share2 } from 'lucide-react';
 import ReactMarkdown from 'react-markdown';
@@ -12,6 +13,7 @@ interface ContentDetailProps {
 }
 
 export function ContentDetail({ post, onBack, backLabel, children }: ContentDetailProps) {
+  const [imgError, setImgError] = React.useState(false);
   const title = post.title;
   const content = post.content;
 
@@ -57,7 +59,7 @@ export function ContentDetail({ post, onBack, backLabel, children }: ContentDeta
             {title}
           </Text>
 
-          {image && (
+          {image && !imgError && (
             <Box
               as={motion.div}
               initial={{ opacity: 0, y: 20 }}
@@ -70,6 +72,7 @@ export function ContentDetail({ post, onBack, backLabel, children }: ContentDeta
               <img
                 src={image}
                 alt={title}
+                onError={() => setImgError(true)}
                 className="w-full h-full object-cover"
               />
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


<!-- BEGIN_FILE_AUDIT: src/layouts/MainLayout.tsx -->
---

### File: `src/layouts/MainLayout.tsx` +3/-2 (modified)

Diff:
```diff
@@ -18,8 +18,9 @@ export function MainLayout({ children }: { children: React.ReactNode }) {
           <Box
             paddingX={{ base: 4, md: 6, lg: 12 }}
             paddingTop={12}
-            paddingBottom={showEmailBar ? { base: 48, md: 64 } : 12}
-            className="mx-auto min-h-full max-w-7xl w-full transition-all duration-300"
+            paddingBottom={showEmailBar ? { base: 48, md: 40 } : 12}
+            marginX="auto"
+            className="min-h-full max-w-screen-2xl w-full transition-all duration-300"
           >
             <Stack gap={12} className="w-full">
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


<!-- BEGIN_FILE_AUDIT: src/layouts/Text.tsx -->
---

### File: `src/layouts/Text.tsx` +3/-1 (modified)

Diff:
```diff
@@ -18,14 +18,15 @@ export interface TextProps extends Omit<BaseProps, "align">, Omit<React.HTMLAttr
   uppercase?: boolean
   lowercase?: boolean
   capitalize?: boolean
+  italic?: boolean
   [key: string]: any
 }
 
 export const Text = React.forwardRef<HTMLElement, TextProps>(
   ({ 
     className, as: Component = "span", 
     variant, intent, color = "main", size, weight, align, tracking, 
-    uppercase, lowercase, capitalize,
+    uppercase, lowercase, capitalize, italic,
     ...props 
   }, ref) => {
     return (
@@ -49,6 +50,7 @@ export const Text = React.forwardRef<HTMLElement, TextProps>(
           uppercase && "uppercase",
           lowercase && "lowercase",
           capitalize && "capitalize",
+          italic && "italic",
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
  "path": "src/layouts/Text.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/layouts/Text.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/layouts/Text.tsx -->


<!-- BEGIN_FILE_AUDIT: src/lib/variants.ts -->
---

### File: `src/lib/variants.ts` +1/-1 (modified)

Diff:
```diff
@@ -33,7 +33,7 @@ export const variants = {
 };
 
 export const buttonVariants = cva(
-  "inline-flex items-center justify-center font-mono tracking-widest uppercase transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
+  "inline-flex items-center justify-center font-sans font-semibold tracking-tight transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95",
   {
     variants: {
       variant: variants.emphasis,
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


<!-- BEGIN_FILE_AUDIT: src/main.tsx -->
---

### File: `src/main.tsx` +2/-0 (modified)

Diff:
```diff
@@ -7,6 +7,8 @@ import { StrictMode } from 'react';
 import { createRoot } from 'react-dom/client';
 import { createBrowserRouter, RouterProvider } from 'react-router-dom';
 import { routes } from './App.tsx';
+import "@fontsource-variable/inter";
+import "@fontsource/fraunces/index.css";
 import './index.css';
 
 const router = createBrowserRouter(routes, {
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
  "path": "src/main.tsx",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/main.tsx",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/main.tsx -->


<!-- BEGIN_FILE_AUDIT: src/styles/design-tokens.ts -->
---

### File: `src/styles/design-tokens.ts` +13/-0 (modified)

Diff:
```diff
@@ -9,6 +9,10 @@ export const radius = {
   subtle: "rounded-[2px]", // Subtle 2px radius
   sm: "rounded-sm",
   md: "rounded-md",
+  lg: "rounded-lg",
+  xl: "rounded-xl",
+  "2xl": "rounded-2xl",
+  full: "rounded-full",
 };
 
 export const borders = {
@@ -65,6 +69,13 @@ export const buttons = {
 export const shadows = {
   topOverlay: "shadow-[0_-10px_40px_rgba(0,0,0,0.1)]",
   standard: "shadow-sm",
+  md: "shadow-md",
+  lg: "shadow-lg",
+  xl: "shadow-xl",
+  "2xl": "shadow-2xl",
+  // Layered shadows for depth
+  layered: "shadow-[0_1px_1px_rgba(0,0,0,0.05),0_2px_2px_rgba(0,0,0,0.05),0_4px_4px_rgba(0,0,0,0.05),0_8px_8px_rgba(0,0,0,0.05)]",
+  premium: "shadow-[0_20px_50px_rgba(0,0,0,0.1)]",
 };
 
 export const zIndex = {
@@ -107,4 +118,6 @@ export const typeSizes = {
   "7xl": "text-5xl md:text-7xl",
   "8xl": "text-6xl md:text-8xl",
   "9xl": "text-7xl md:text-9xl",
+  "fluid-7": "text-4xl md:text-5xl lg:text-7xl",
+  "fluid-8": "text-5xl md:text-6xl lg:text-8xl",
 };
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
  "path": "src/styles/design-tokens.ts",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "src/styles/design-tokens.ts",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: src/styles/design-tokens.ts -->


<!-- BEGIN_FILE_AUDIT: src/styles/motion.ts -->
---

### File: `src/styles/motion.ts` +64/-21 (modified)

Diff:
```diff
@@ -1,25 +1,68 @@
 /**
- * Standardized Motion Tokens.
- * Ensures consistent transitions across the entire application shell.
+ * Centralized Motion Variants for tech-dancer.
+ * Defines "The Ariel Motion" - a high-end, bespoke feel for transitions.
  */
-export const motionTokens = {
-  page: {
-    initial: { opacity: 0, y: 8 },
-    animate: { opacity: 1, y: 0 },
-    exit: { opacity: 0 },
-    transition: { 
-      duration: 0.3, 
-      ease: [0.22, 1, 0.36, 1] as [number, number, number, number] 
-    }
-  },
-  overlay: {
-    initial: { y: 100 },
-    animate: { y: 0 },
-    exit: { y: 100 },
-    transition: { duration: 0.4, ease: "easeOut" }
+
+export const arielTransition = {
+  type: "spring",
+  damping: 25,
+  stiffness: 120,
+  mass: 0.8,
+};
+
+export const arielEase = [0.16, 1, 0.3, 1]; // easeOutExpo
+
+export const fadeIn = {
+  initial: { opacity: 0 },
+  animate: { opacity: 1 },
+  exit: { opacity: 0 },
+  transition: { duration: 0.4, ease: arielEase },
+};
+
+export const fadeInUp = {
+  initial: { opacity: 0, y: 20 },
+  animate: { opacity: 1, y: 0 },
+  exit: { opacity: 0, y: 20 },
+  transition: { duration: 0.5, ease: arielEase },
+};
+
+export const staggerContainer = {
+  animate: {
+    transition: {
+      staggerChildren: 0.05,
+    },
   },
-  hover: {
-    scale: 1.02,
-    transition: { duration: 0.2 }
-  }
+};
+
+export const scaleUp = {
+  initial: { opacity: 0, scale: 0.95 },
+  animate: { opacity: 1, scale: 1 },
+  exit: { opacity: 0, scale: 0.95 },
+  transition: { duration: 0.4, ease: arielEase },
+};
+
+export const slideInRight = {
+  initial: { opacity: 0, x: 30 },
+  animate: { opacity: 1, x: 0 },
+  exit: { opacity: 0, x: 30 },
+  transition: { duration: 0.5, ease: arielEase },
+};
+
+export const hoverLift = {
+  whileHover: { y: -4, transition: { duration: 0.2, ease: "easeOut" } },
+  whileTap: { scale: 0.98 },
+};
+
+export const motionTokens = {
+  arielTransition,
+  arielEase,
+  fadeIn,
+  fadeInUp,
+  staggerContainer,
+  scaleUp,
+  slideInRight,
+  hoverLift,
+  // Existing tokens expected by components
+  page: fadeInUp,
+  overlay: fadeInUp,
 };
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


<!-- BEGIN_FILE_AUDIT: tailwind.config.js -->
---

### File: `tailwind.config.js` +3/-0 (modified)

Diff:
```diff
@@ -25,6 +25,9 @@ export default {
         gradient: {
           '0%, 100%': { backgroundPosition: '0% 50%' },
           '50%': { backgroundPosition: '100% 50%' },
+        },
+        shimmer: {
+          '100%': { transform: 'translateX(100%)' },
         }
       },
       animation: {
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


<!-- BEGIN_FILE_AUDIT: tests/smoke.spec.ts -->
---

### File: `tests/smoke.spec.ts` +1/-1 (modified)

Diff:
```diff
@@ -36,7 +36,7 @@ test('landing page should load without console errors or 404s', async ({ page })
 
   // Verify the main heading or a specific element exists
   await expect(page.locator('#root')).toBeVisible({ timeout: 15000 });
-  await expect(page.getByText(/The Roboticist's Guide to the West Coast Swing/i)).toBeVisible();
+  await expect(page.getByText(/The Roboticist's Guide to the West Coast Swing/i)).toBeVisible({ timeout: 15000 });
 
   // Assert that no 404s or console errors occurred
   expect(failedResources, `Failed to load resources:\n${failedResources.join('\n')}`).toHaveLength(0);
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
  "path": "tests/smoke.spec.ts",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "tests/smoke.spec.ts",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: tests/smoke.spec.ts -->


<!-- BEGIN_FILE_AUDIT: ux_about.png -->
---

### File: `ux_about.png` +0/-0 (added)

Diff:
```diff
_Binary file or no textual diff available._
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
  "path": "ux_about.png",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "ux_about.png",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: ux_about.png -->


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
python3 dev-tools/submit_pr_review_data.py plan-pr-review-137.md
```

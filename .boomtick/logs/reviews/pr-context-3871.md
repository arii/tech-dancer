# PR Context: #3871 — Refactor border props to adhere to design tokens and sanitize external URLs
**Author:** @google-labs-jules[bot]

## Description
This PR resolves the final architectural findings and security vulnerabilities from the Principal Engineer feedback.

**Changes:**
1. Refactored the `border` property inside `Box.tsx` to support the `ResponsiveProp` pattern. This enables passing responsive borders natively via the primitive components (`border={{ base: 'b', lg: 'r' }}`), effectively eliminating the need for raw Tailwind layout CSS overrides (like `className="lg:border-b-0 lg:border-r"`), aligning with strict design system guidelines.
2. Implemented `isValidUrl` validation on `activeReportUrl` inside the `UXAuditor` feature to securely handle untrusted input, plugging a potential XSS/Open Redirect vulnerability reported during security code review.
3. Re-ran full integration verification suite, verifying responsiveness and updating visual regression snapshot boundaries where minor layout pixel shifts occurred as a result of the structural refactor.

---
*PR created automatically by Jules for task [11873687007751501583](https://jules.google.com/task/11873687007751501583) started by @arii*

## CI Status
- ✅ **CodeQL**: completed (success)
- ❌ **Deployment Impact Analysis**: completed (failure)
  <details><summary>Failure Logs Snippet</summary>

  ```
  - After screenshot: artifacts/visual-review/about/after-laptop.png
- Visual diff: artifacts/visual-review/about/diff-laptop.png
- Before (cropped): artifacts/visual-review/about/cropped-laptop/before.png
- After (cropped): artifacts/visual-review/about/cropped-laptop/after.png
- Visual diff (cropped): artifacts/visual-review/about/cropped-laptop/diff.png
- DOM diff: artifacts/dom-review/about-laptop/diff-laptop.txt
**Artifacts:**
- Before screenshot: artifacts/visual-review/about/before-tablet.png
- After screenshot: artifacts/visual-review/about/after-tablet.png
- Visual diff: artifacts/visual-review/about/diff-tablet.png
- Before (cropped): artifacts/visual-review/about/cropped-tablet/before.png
- After (cropped): artifacts/visual-review/about/cropped-tablet/after.png
- Visual diff (cropped): artifacts/visual-review/about/cropped-tablet/diff.png
- DOM diff: artifacts/dom-review/about-tablet/diff-tablet.txt
**Artifacts:**
- Before screenshot: artifacts/visual-review/about/before-ultrawide.png
- After screenshot: artifacts/visual-review/about/after-ultrawide.png
- Visual diff: artifacts/visual-review/about/diff-ultrawide.png
- DOM diff: artifacts/dom-review/about-ultrawide/diff-ultrawide.txt
"message": "AI Token usage is within limits.",
  ```
  </details>
- ✅ **deploy**: completed (success)
- ✅ **build**: completed (success)
- ✅ **Validate all workflow files**: completed (success)
- ✅ **Security Scan (oxlint)**: completed (success)
- ✅ **Security Scan (semgrep)**: completed (success)
- ❌ **Security Scan (gitleaks)**: completed (failure)
  <details><summary>Failure Logs Snippet</summary>

  ```
  ##[group]Initialize Schemas and Contracts
##[group]Run sync-contracts in mcp
Scope: all 2 workspace projects
+ tsx 4.23.1
+ vitest 4.1.10
.. preinstall$ node scripts/check-runtime-files.mjs
â   Ignored build scripts: esbuild@0.28.1.                                     â
â   to run scripts.                                                            â
No projects matched the filters in "/home/runner/work/tech-dancer/tech-dancer"
shell: /usr/bin/bash --noprofile --norc -e -o pipefail {0}
. postinstall$ python3 scripts/sync-python-deps.py
. postinstall: ð Syncing Python dependencies from /home/runner/work/tech-dancer/tech-dancer/boomtick-pkg/cli/requirements.txt...
â   Ignored build scripts: @firebase/util@1.15.0, @google/genai@2.8.0,         â
â   to run scripts.                                                            â
(node:3087) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
const error = new requestError.RequestError(toErrorMessage(data), status, {
RequestError [HttpError]: No server is currently available to service your request. Sorry about that. Please try resubmitting your request and contact us if the problem persists.
url: 'https://api.github.com/repos/arii/tech-dancer/pulls/3871/commits',
message: 'No server is currently available to service your request. Sorry about that. Please try resubmitting your request and contact us if the problem persists.'
url: 'https://api.github.com/repos/arii/tech-dancer/pulls/3871/commits',
  ```
  </details>
- ✅ **Anti-Pattern Audit**: completed (success)
- ✅ **Lint & Type Check**: completed (success)
- ✅ **Build & E2E**: completed (success)
- ✅ **verify-changes / FOUNDATIONAL GATE: Checks for actual code modifications**: completed (success)

## Files Changed
- 🟡 `src/layouts/Box.tsx`
- 🟡 `src/pages/UXAuditor.tsx`
- 🟡 `tests/blog-post-mobile.spec.ts-snapshots/event-travel-packing-mobile-chromium-linux.png`
- 🟡 `tests/blog-post.spec.ts-snapshots/event-travel-packing-chromium-linux.png`
- 🟡 `tests/guide.spec.ts-snapshots/detail-page-v2-chromium-linux.png`
- 🟡 `tests/visual.spec.ts-snapshots/halloween-costumes-mobile-chromium-linux.png`
- 🟡 `tests/visual.spec.ts-snapshots/merch-chromium-linux.png`
- 🟡 `tests/visual.spec.ts-snapshots/mobile-research-blog-drafter.png`
- 🟡 `tests/visual.spec.ts-snapshots/ux-auditor-chromium-linux.png`

## Diffs

### `src/layouts/Box.tsx` (modified)
```diff
@@ -24,7 +24,7 @@ export interface BaseProps {
  24 |   gap?: ResponsiveProp<number | string>
  25 |   gapX?: ResponsiveProp<number | string>
  26 |   gapY?: ResponsiveProp<number | string>
     |-  border?: boolean | "t" | "b" | "l" | "r" | "x" | "y"
  27 |+  border?: ResponsiveProp<boolean | "t" | "b" | "l" | "r" | "x" | "y">
  28 |   borderColor?: string
  29 |   smBorder?: boolean | "t" | "b" | "l" | "r" | "x" | "y" | { t?: boolean, b?: boolean, l?: boolean, r?: boolean }
  30 |   mdBorder?: boolean | "t" | "b" | "l" | "r" | "x" | "y" | { t?: boolean, b?: boolean, l?: boolean, r?: boolean }
@@ -154,19 +154,19 @@ export const Box = forwardRef<HTMLDivElement, BoxProps>(
 154 |       });
 155 |     }
 156 |
 157 |+    const mapBorder = (v: boolean | "t" | "b" | "l" | "r" | "x" | "y") => {
 158 |+      if (v === true) return "border border-line"
 159 |+      if (v) return `border-${v} border-line`
 160 |+      return ""
 161 |+    }
 162 |+
 163 |     const borderClasses = cn(
     |-      border === true && "border border-line",
     |-      border === "t" && "border-t border-line",
     |-      border === "b" && "border-b border-line",
     |-      border === "l" && "border-l border-line",
     |-      border === "r" && "border-r border-line",
     |-      border === "x" && "border-x border-line",
     |-      border === "y" && "border-y border-line",
 164 |+      applyResponsive(border, mapBorder),
 165 |       borderColor && resolveJIT(borderColor, "border"),
     |-      smBorder && `sm:border-${smBorder}`,
     |-      mdBorder && `md:border-${mdBorder}`,
     |-      lgBorder && `lg:border-${lgBorder}`,
     |-      xlBorder && `xl:border-${xlBorder}`
 166 |+      smBorder && (typeof smBorder === "boolean" ? `sm:border${smBorder === true ? "" : "-0"}` : (typeof smBorder === "string" ? `sm:border-${smBorder}` : "")),
 167 |+      mdBorder && (typeof mdBorder === "boolean" ? `md:border${mdBorder === true ? "" : "-0"}` : (typeof mdBorder === "string" ? `md:border-${mdBorder}` : "")),
 168 |+      lgBorder && (typeof lgBorder === "boolean" ? `lg:border${lgBorder === true ? "" : "-0"}` : (typeof lgBorder === "string" ? `lg:border-${lgBorder}` : "")),
 169 |+      xlBorder && (typeof xlBorder === "boolean" ? `xl:border${xlBorder === true ? "" : "-0"}` : (typeof xlBorder === "string" ? `xl:border-${xlBorder}` : ""))
 170 |     )
 171 |
 172 |     // Remove props that shouldn't be spread to DOM elements
```

### `src/pages/UXAuditor.tsx` (modified)
```diff
@@ -7,6 +7,7 @@ import {
   7 | } from 'lucide-react';
   8 | import { useUXAuditor, VIEWPORTS, ViewportAnalysis } from '@/features/ux-auditor/useUXAuditor';
   9 | import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
  10 |+import { isValidUrl } from '@/utils/url';
  11 | import { PageHeader } from '@/components/ui/PageHeader';
  12 | import { SEO } from '@/components/SEO';
  13 | import { BASE_URL } from '@/config/constants';
@@ -248,14 +249,13 @@ function ViewportAnalysisCard({ vp, data, activeReportUrl }: { vp: typeof VIEWPO
 249 |           surface="muted"
 250 |           align="center"
 251 |           justify="center"
     |-          border="b"
     |-          className="lg:border-b-0 lg:border-r"
 252 |+          border={{ base: "b", lg: "r" }}
 253 |           minHeight={{ base: 250, lg: 400 }}
 254 |         >
 255 |           {activeReportUrl ? (
 256 |             <ViewportFrame
 257 |               key={`${vp.name}-${activeReportUrl}`}
     |-              url={activeReportUrl}
 258 |+              url={isValidUrl(activeReportUrl) ? activeReportUrl : "about:blank"}
 259 |               width={vp.width}
 260 |               height={vp.height}
 261 |             />
```

### `tests/blog-post-mobile.spec.ts-snapshots/event-travel-packing-mobile-chromium-linux.png` (modified)
```diff

```

### `tests/blog-post.spec.ts-snapshots/event-travel-packing-chromium-linux.png` (modified)
```diff

```

### `tests/guide.spec.ts-snapshots/detail-page-v2-chromium-linux.png` (modified)
```diff

```

### `tests/visual.spec.ts-snapshots/halloween-costumes-mobile-chromium-linux.png` (modified)
```diff

```

### `tests/visual.spec.ts-snapshots/merch-chromium-linux.png` (modified)
```diff

```

### `tests/visual.spec.ts-snapshots/mobile-research-blog-drafter.png` (modified)
```diff

```

### `tests/visual.spec.ts-snapshots/ux-auditor-chromium-linux.png` (modified)
```diff

```
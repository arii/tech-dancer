# PR Context: #3865 — refactor: extract sanitizeUrlForDisplay utility
**Author:** @google-labs-jules[bot]

## Description
Implemented the required architectural improvement identified in the AI Audit Feedback by moving the `sanitizeUrlForDisplay` utility to a shared module.

- Moved `sanitizeUrlForDisplay` from `src/pages/UXAuditor.tsx` to `src/utils/url.ts`.
- Exported the function and imported it correctly into the UI component.
- Verified test suite and checked for anti-patterns. No new regressions were found.

This resolves the separation of concerns violation while preserving the exact intended behavior of the previous changes.

---
*PR created automatically by Jules for task [7396953018489743677](https://jules.google.com/task/7396953018489743677) started by @arii*

## CI Status
- ❌ **Deployment Impact Analysis**: completed (failure)
  <details><summary>Failure Logs Snippet</summary>

  ```
  - Before (cropped): artifacts/visual-review/ux-auditor/cropped-mobile/before.png
- After (cropped): artifacts/visual-review/ux-auditor/cropped-mobile/after.png
- Visual diff (cropped): artifacts/visual-review/ux-auditor/cropped-mobile/diff.png
- DOM diff: artifacts/dom-review/ux-auditor-mobile/diff-mobile.txt
**Artifacts:**
- Before screenshot: artifacts/visual-review/ux-auditor/before-tablet.png
- After screenshot: artifacts/visual-review/ux-auditor/after-tablet.png
- Visual diff: artifacts/visual-review/ux-auditor/diff-tablet.png
- Before (cropped): artifacts/visual-review/ux-auditor/cropped-tablet/before.png
- After (cropped): artifacts/visual-review/ux-auditor/cropped-tablet/after.png
- Visual diff (cropped): artifacts/visual-review/ux-auditor/cropped-tablet/diff.png
- DOM diff: artifacts/dom-review/ux-auditor-tablet/diff-tablet.txt
**Artifacts:**
- Before screenshot: artifacts/visual-review/ux-auditor/before-ultrawide.png
- After screenshot: artifacts/visual-review/ux-auditor/after-ultrawide.png
- Visual diff: artifacts/visual-review/ux-auditor/diff-ultrawide.png
- Before (cropped): artifacts/visual-review/ux-auditor/cropped-ultrawide/before.png
- After (cropped): artifacts/visual-review/ux-auditor/cropped-ultrawide/after.png
- Visual diff (cropped): artifacts/visual-review/ux-auditor/cropped-ultrawide/diff.png
- DOM diff: artifacts/dom-review/ux-auditor-ultrawide/diff-ultrawide.txt
  ```
  </details>
- ✅ **CodeQL**: completed (success)
- ⏳ **deploy**: completed (skipped)
- ⏳ **build**: completed (skipped)
- ✅ **Security Scan (oxlint)**: completed (success)
- ✅ **Validate all workflow files**: completed (success)
- ✅ **Security Scan (gitleaks)**: completed (success)
- ✅ **Anti-Pattern Audit**: completed (success)
- ✅ **Security Scan (semgrep)**: completed (success)
- ✅ **Build & E2E**: completed (success)
- ✅ **Lint & Type Check**: completed (success)
- ✅ **verify-changes / FOUNDATIONAL GATE: Checks for actual code modifications**: completed (success)

## Files Changed
- 🟡 `src/pages/UXAuditor.tsx`
- 🟡 `src/utils/url.ts`

## Diffs

### `src/pages/UXAuditor.tsx` (modified)
```diff
@@ -14,18 +14,7 @@ import { RESEARCH_TOOLS } from '@/config/research-tools';
  14 | import { EmptyState } from '@/components/ui/EmptyState';
  15 | import { Skeleton } from '@/components/ui/Skeleton';
  16 | import { actionButtonVariants, cardVariants, listRowVariants } from '@/lib/variants';
     |-import { isValidUrl } from '@/utils/url';
     |-
     |-// A simple sanitizer helper to prevent XSS / script-injection inside title and display attributes
     |-const sanitizeUrlForDisplay = (urlStr: string | null | undefined): string => {
     |-  if (!urlStr) return '';
     |-  const trimmed = urlStr.trim();
     |-  if (isValidUrl(trimmed)) {
     |-    return trimmed;
     |-  }
     |-  // Safe fallback if protocol is malicious (like javascript:)
     |-  return 'about:blank';
     |-};
  17 |+import { sanitizeUrlForDisplay } from '@/utils/url';
  18 |
  19 | const viewportIcons = {
  20 |   Mobile: <Icon icon={Smartphone} size="md" />,
```

### `src/utils/url.ts` (modified)
```diff
@@ -22,3 +22,16 @@ export const isValidUrl = (url: string | null | undefined): boolean => {
  22 |     return false;
  23 |   }
  24 | };
  25 |+
  26 |+/**
  27 |+ * A simple sanitizer helper to prevent XSS / script-injection inside title and display attributes
  28 |+ */
  29 |+export const sanitizeUrlForDisplay = (urlStr: string | null | undefined): string => {
  30 |+  if (!urlStr) return '';
  31 |+  const trimmed = urlStr.trim();
  32 |+  if (isValidUrl(trimmed)) {
  33 |+    return trimmed;
  34 |+  }
  35 |+  // Safe fallback if protocol is malicious (like javascript:)
  36 |+  return 'about:blank';
  37 |+};
```
# PR Context: #3819 — Fix Analysis Cards Layout Flow
**Author:** @google-labs-jules[bot]

## Description
Align UX auditor viewport cards layout and width constraint to design primitive standards to improve responsiveness.

Fixes #3774

---
*PR created automatically by Jules for task [2358150386942076189](https://jules.google.com/task/2358150386942076189) started by @arii*

## CI Status
- ❌ **Deployment Impact Analysis**: completed (failure)
  <details><summary>Failure Logs Snippet</summary>

  ```
  - After (cropped): artifacts/visual-review/ux-auditor/cropped-laptop/after.png
- Visual diff (cropped): artifacts/visual-review/ux-auditor/cropped-laptop/diff.png
- DOM diff: artifacts/dom-review/ux-auditor-laptop/diff-laptop.txt
**Artifacts:**
- Before screenshot: artifacts/visual-review/ux-auditor/before-mobile.png
- After screenshot: artifacts/visual-review/ux-auditor/after-mobile.png
- Visual diff: artifacts/visual-review/ux-auditor/diff-mobile.png
- Before (cropped): artifacts/visual-review/ux-auditor/cropped-mobile/before.png
- After (cropped): artifacts/visual-review/ux-auditor/cropped-mobile/after.png
- Visual diff (cropped): artifacts/visual-review/ux-auditor/cropped-mobile/diff.png
- DOM diff: artifacts/dom-review/ux-auditor-mobile/diff-mobile.txt
**Artifacts:**
- Before screenshot: artifacts/visual-review/ux-auditor/before-ultrawide.png
- After screenshot: artifacts/visual-review/ux-auditor/after-ultrawide.png
- Visual diff: artifacts/visual-review/ux-auditor/diff-ultrawide.png
- Before (cropped): artifacts/visual-review/ux-auditor/cropped-ultrawide/before.png
- After (cropped): artifacts/visual-review/ux-auditor/cropped-ultrawide/after.png
- Visual diff (cropped): artifacts/visual-review/ux-auditor/cropped-ultrawide/diff.png
- DOM diff: artifacts/dom-review/ux-auditor-ultrawide/diff-ultrawide.txt
"message": "AI Token usage is within limits.",
  ```
  </details>
- ✅ **deploy**: completed (success)
- ⏳ **CodeQL**: completed (neutral)
- ✅ **build**: completed (success)
- ✅ **Security Scan (oxlint)**: completed (success)
- ✅ **Security Scan (semgrep)**: completed (success)
- ✅ **Security Scan (gitleaks)**: completed (success)
- ✅ **Build & E2E**: completed (success)
- ✅ **Validate all workflow files**: completed (success)
- ✅ **Anti-Pattern Audit**: completed (success)
- ✅ **Lint & Type Check**: completed (success)
- ✅ **verify-changes / FOUNDATIONAL GATE: Checks for actual code modifications**: completed (success)

## Files Changed
- 🟡 `src/pages/UXAuditor.tsx`

## Diffs

### `src/pages/UXAuditor.tsx` (modified)
```diff
@@ -241,8 +241,17 @@ function ViewportAnalysisCard({ vp, data, activeReportUrl }: { vp: typeof VIEWPO
 241 |         </Text>
 242 |       </Stack>
 243 |
     |-      <Stack direction={{ base: 'col', md: 'row' }} width="full">
     |-        <Box padding={8} surface="muted" display="flex" align="center" justify="center" border={{ base: 'b', md: 'r' }} minHeight={400} width={{ base: 'full', md: '41.666%' }}>
 244 |+      <Grid cols={{ base: 1, lg: 2 }} width="full">
 245 |+        {/* Frame / Preview Side */}
 246 |+        <Stack
 247 |+          padding={8}
 248 |+          surface="muted"
 249 |+          align="center"
 250 |+          justify="center"
 251 |+          border="b"
 252 |+          className="lg:border-b-0 lg:border-r"
 253 |+          minHeight={{ base: 250, lg: 400 }}
 254 |+        >
 255 |           {activeReportUrl ? (
 256 |             <ViewportFrame
 257 |               key={`${vp.name}-${activeReportUrl}`}
@@ -260,9 +269,10 @@ function ViewportAnalysisCard({ vp, data, activeReportUrl }: { vp: typeof VIEWPO
 269 |               </Text>
 270 |             </Stack>
 271 |           )}
     |-        </Box>
 272 |+        </Stack>
 273 |
     |-        <Stack gap={6} padding={8} flex={1} minWidth="0" overflow="hidden">
 274 |+        {/* Findings / Suggestions Side */}
 275 |+        <Stack gap={6} padding={8} minWidth="0" overflow="hidden">
 276 |           {data ? (
 277 |             <>
 278 |               <Box surface="alt" padding={5} className="border border-line rounded-lg">
@@ -322,7 +332,7 @@ function ViewportAnalysisCard({ vp, data, activeReportUrl }: { vp: typeof VIEWPO
 332 |             </Stack>
 333 |           )}
 334 |         </Stack>
     |-      </Stack>
 335 |+      </Grid>
 336 |     </Box>
 337 |   );
 338 | }
```
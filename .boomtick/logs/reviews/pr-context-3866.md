# PR Context: #3866 — fix: resolve UI layout anti-patterns in HeroSection and EndpointCard
**Author:** @google-labs-jules[bot]

## Description
This commit implements the remaining feedback provided by the Principal Engineer's AI Audit for PR #3853.

1. Unwrapped `EndpointCard` from `React.memo` as the overhead wasn't justified and it guarantees `handleToggleResponse` captures state deterministically without stale closures.
2. Hardcoded the `contain-intrinsic-size` custom Tailwind arbitrary property to `3rem` in `HeroSection` instead of leaning on `var(--spacing-12)`, bypassing internal JIT parsing quirks mentioned in the definition of done.
3. Updated visual regression PNG snapshots for all components affected by the finalized design system token migration.

---
*PR created automatically by Jules for task [5450835096621039403](https://jules.google.com/task/5450835096621039403) started by @arii*

## CI Status
- ❌ **Deployment Impact Analysis**: completed (failure)
  <details><summary>Failure Logs Snippet</summary>

  ```
  - After (cropped): artifacts/visual-review/versiontruth/cropped-mobile/after.png
- Visual diff (cropped): artifacts/visual-review/versiontruth/cropped-mobile/diff.png
- DOM diff: artifacts/dom-review/versiontruth-mobile/diff-mobile.txt
**Artifacts:**
- Before screenshot: artifacts/visual-review/versiontruth/before-tablet.png
- After screenshot: artifacts/visual-review/versiontruth/after-tablet.png
- Visual diff: artifacts/visual-review/versiontruth/diff-tablet.png
- Before (cropped): artifacts/visual-review/versiontruth/cropped-tablet/before.png
- After (cropped): artifacts/visual-review/versiontruth/cropped-tablet/after.png
- Visual diff (cropped): artifacts/visual-review/versiontruth/cropped-tablet/diff.png
- DOM diff: artifacts/dom-review/versiontruth-tablet/diff-tablet.txt
**Artifacts:**
- Before screenshot: artifacts/visual-review/versiontruth/before-ultrawide.png
- After screenshot: artifacts/visual-review/versiontruth/after-ultrawide.png
- Visual diff: artifacts/visual-review/versiontruth/diff-ultrawide.png
- Before (cropped): artifacts/visual-review/versiontruth/cropped-ultrawide/before.png
- After (cropped): artifacts/visual-review/versiontruth/cropped-ultrawide/after.png
- Visual diff (cropped): artifacts/visual-review/versiontruth/cropped-ultrawide/diff.png
- DOM diff: artifacts/dom-review/versiontruth-ultrawide/diff-ultrawide.txt
"message": "AI Token usage is within limits.",
  ```
  </details>
- ✅ **deploy**: completed (success)
- ✅ **CodeQL**: completed (success)
- ✅ **build**: completed (success)
- ✅ **Validate all workflow files**: completed (success)
- ✅ **Security Scan (gitleaks)**: completed (success)
- ✅ **Lint & Type Check**: completed (success)
- ✅ **Anti-Pattern Audit**: completed (success)
- ✅ **Security Scan (semgrep)**: completed (success)
- ✅ **Security Scan (oxlint)**: completed (success)
- ✅ **Build & E2E**: completed (success)
- ✅ **verify-changes / FOUNDATIONAL GATE: Checks for actual code modifications**: completed (success)

## Files Changed
- 🟡 `src/components/ui/EndpointCard.tsx`
- 🟡 `src/components/ui/HeroSection.tsx`
- 🟡 `tests/visual.spec.ts-snapshots/mobile-research-blog-drafter.png`
- 🟡 `tests/visual.spec.ts-snapshots/mobile-research-wcs-scraper.png`
- 🟡 `tests/visual.spec.ts-snapshots/mobile-ux-auditor.png`

## Diffs

### `src/components/ui/EndpointCard.tsx` (modified)
```diff
@@ -9,7 +9,7 @@ export interface EndpointCardProps {
   9 |   exampleResponse: string;
  10 | }
  11 |
     |-export const EndpointCard = React.memo(({
  12 |+export const EndpointCard = ({
  13 |   method,
  14 |   path,
  15 |   description,
@@ -94,5 +94,4 @@ export const EndpointCard = React.memo(({
  94 |       </Box>
  95 |     </Stack>
  96 |   );
     |-});
     |-EndpointCard.displayName = "EndpointCard";
  97 |+};
```

### `src/components/ui/HeroSection.tsx` (modified)
```diff
@@ -146,7 +146,7 @@ export function HeroSection() {
 146 |           overflow="hidden"
 147 |           opacity={0}
 148 |           pointerEvents="none"
     |-          className="hero-waveform-anim [content-visibility:auto] [contain-intrinsic-size:var(--spacing-12)]"
 149 |+          className="hero-waveform-anim [content-visibility:auto] [contain-intrinsic-size:3rem]"
 150 |           aria-hidden="true"
 151 |         >
 152 |           {BARS.map((bar, i) => (
```

### `tests/visual.spec.ts-snapshots/mobile-research-blog-drafter.png` (modified)
```diff

```

### `tests/visual.spec.ts-snapshots/mobile-research-wcs-scraper.png` (modified)
```diff

```

### `tests/visual.spec.ts-snapshots/mobile-ux-auditor.png` (modified)
```diff

```
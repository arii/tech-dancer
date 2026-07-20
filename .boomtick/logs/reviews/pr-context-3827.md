# PR Context: #3827 — Differentiate Inline Metadata from Action Links
**Author:** @google-labs-jules[bot]

## Description
Update the editorial blog header to render static tags using a borderless, muted text design instead of button-like pills, preventing visual confusion with interactive elements.

Fixes #3808

---
*PR created automatically by Jules for task [17597077457335403445](https://jules.google.com/task/17597077457335403445) started by @arii*

## CI Status
- ❌ **Deployment Impact Analysis**: completed (failure)
  <details><summary>Failure Logs Snippet</summary>

  ```
  - tests/visual.spec.ts-snapshots/halloween-costumes-mobile-chromium-linux.png
- tests/visual.spec.ts-snapshots/merch-chromium-linux.png
- tests/visual.spec.ts-snapshots/mobile-research-blog-drafter.png
- tests/visual.spec.ts-snapshots/ux-auditor-chromium-linux.png
Artifact download URL: https://github.com/arii/tech-dancer/actions/runs/29707787162/artifacts/8448495047
echo "CI Metrics verification failed."
shell: bash --noprofile --norc -e -o pipefail {0}
<summary><b>ð¦ Dynamic Imports Affected (3)</b></summary>
- src/features/lab/BlogDrafter.tsx
- src/pages/BlogPost.tsx
- src/pages/ResearchDetail.tsx
- src/components/editorial/EditorialHeader.tsx
- tests/blog-post-mobile.spec.ts-snapshots/event-travel-packing-mobile-chromium-linux.png
- tests/blog-post.spec.ts-snapshots/event-travel-packing-chromium-linux.png
- tests/guide.spec.ts-snapshots/detail-page-v2-chromium-linux.png
- tests/visual.spec.ts-snapshots/halloween-costumes-mobile-chromium-linux.png
- tests/visual.spec.ts-snapshots/merch-chromium-linux.png
- tests/visual.spec.ts-snapshots/mobile-research-blog-drafter.png
- tests/visual.spec.ts-snapshots/ux-auditor-chromium-linux.png
"message": "AI Token usage is within limits.",
  ```
  </details>
- ⏳ **CodeQL**: completed (neutral)
- ✅ **deploy**: completed (success)
- ✅ **build**: completed (success)
- ✅ **Lint & Type Check**: completed (success)
- ✅ **Validate all workflow files**: completed (success)
- ✅ **Anti-Pattern Audit**: completed (success)
- ✅ **Security Scan (semgrep)**: completed (success)
- ✅ **Security Scan (gitleaks)**: completed (success)
- ✅ **Build & E2E**: completed (success)
- ✅ **Security Scan (oxlint)**: completed (success)
- ✅ **verify-changes / FOUNDATIONAL GATE: Checks for actual code modifications**: completed (success)

## Files Changed
- 🟡 `src/components/editorial/EditorialHeader.tsx`
- 🟡 `tests/blog-post-mobile.spec.ts-snapshots/event-travel-packing-mobile-chromium-linux.png`
- 🟡 `tests/blog-post.spec.ts-snapshots/event-travel-packing-chromium-linux.png`
- 🟡 `tests/guide.spec.ts-snapshots/detail-page-v2-chromium-linux.png`
- 🟡 `tests/visual.spec.ts-snapshots/halloween-costumes-mobile-chromium-linux.png`
- 🟡 `tests/visual.spec.ts-snapshots/merch-chromium-linux.png`
- 🟡 `tests/visual.spec.ts-snapshots/mobile-research-blog-drafter.png`
- 🟡 `tests/visual.spec.ts-snapshots/ux-auditor-chromium-linux.png`

## Diffs

### `src/components/editorial/EditorialHeader.tsx` (modified)
```diff
@@ -73,23 +73,11 @@ export function EditorialHeader({
  73 |
  74 |         {tags && tags.length > 0 && (
  75 |           <Stack direction="row" align="center" gap={2} wrap>
     |-            <Text variant="mono" size="micro" color="dim" weight="font-bold">TAGS:</Text>
     |-            {tags.map(tag => (
     |-              <Box
     |-                key={tag}
     |-                paddingX={{ base: 4, sm: 2 }}
     |-                paddingY={{ base: 3, sm: 0.5 }}
     |-                minWidth={{ base: 11, sm: "auto" }}
     |-                minHeight={{ base: 11, sm: "auto" }}
     |-                display="flex"
     |-                align="center"
     |-                justify="center"
     |-                border
     |-                radius="sm"
     |-                className={journalVariants.tag()}
     |-              >
     |-                <Text variant="mono" size="micro" color="dim">{tag.toUpperCase()}</Text>
     |-              </Box>
  76 |+            <Text variant="mono" size="micro" color="dim" weight="font-medium">TAGS:</Text>
  77 |+            {tags.map((tag, index) => (
  78 |+              <Text key={tag} variant="mono" size="micro" color="dim">
  79 |+                {tag.toUpperCase()}{index < tags.length - 1 && ","}
  80 |+              </Text>
  81 |             ))}
  82 |           </Stack>
  83 |         )}
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
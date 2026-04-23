# PR Context: #191 — Implement Dead Code Detection in CI
**Stats:** +1424/-631 across 35 files
**Author:** @arii
**Last Commit:** 2026-04-23T07:13:40Z

## Description
This change introduces automated dead code detection and linting to the CI pipeline using ESLint and Knip. It includes configuration for both tools, updates to the CI workflow, and an initial cleanup of identified dead code.

Fixes #182

---
*PR created automatically by Jules for task [4325571347357972030](https://jules.google.com/task/4325571347357972030) started by @arii*

## Files Changed
- 🟢 `eslint.config.js` (+30/-0)
- 🟢 `knip.json` (+19/-0)
- 🟡 `package.json` (+9/-1)
- 🟡 `pnpm-lock.yaml` (+1303/-70)
- 🟡 `src/components/layout/DetailElements.tsx` (+2/-2)
- 🟡 `src/components/ui/CategoryPlaceholder.tsx` (+1/-1)
- 🟡 `src/components/ui/ContentCard.tsx` (+0/-20)
- 🔴 `src/components/ui/HeroPathCard.tsx` (+0/-76)
- 🟡 `src/components/ui/MarkdownRenderer.tsx` (+3/-3)
- 🔴 `src/components/ui/Skeleton.tsx` (+0/-14)
- 🔴 `src/components/ui/badge.tsx` (+0/-25)
- 🔴 `src/components/ui/card.tsx` (+0/-103)
- 🔴 `src/components/ui/tabs.tsx` (+0/-61)
- 🟡 `src/config/content.ts` (+0/-2)
- 🟡 `src/features/dashboard/Dashboard.tsx` (+3/-3)
- 🟡 `src/features/journal/components/BlogPostDetail.tsx` (+1/-1)
- 🟡 `src/features/lab/BlogDrafter.tsx` (+1/-2)
- 🟡 `src/features/lab/GearCard.tsx` (+1/-1)
- 🟡 `src/features/lab/components/GearPostDetail.tsx` (+1/-1)
- 🟡 `src/features/lab/useToolbox.ts` (+5/-6)
- 🟡 `src/features/research/ResearchAnalytics.tsx` (+1/-1)
- 🟡 `src/features/research/ResearchDetail.tsx` (+11/-12)
- 🟡 `src/features/research/useResearch.ts` (+0/-1)
- 🟡 `src/features/ux-auditor/useUXAuditor.ts` (+22/-19)
- 🟡 `src/hooks/use-contact-form.ts` (+1/-1)
- 🔴 `src/hooks/use-form.ts` (+0/-31)
- 🟡 `src/layouts/Button.tsx` (+2/-2)
- 🔴 `src/layouts/ContentDetail.tsx` (+0/-104)
- 🟡 `src/layouts/MainLayout.tsx` (+3/-6)
- 🟡 `src/lib/content.ts` (+0/-6)

## Diffs

### `eslint.config.js` (added)
**Valid Comment Ranges (New File):** 1-30
```diff
@@ -0,0 +1,30 @@
   1 |+import js from '@eslint/js';
   2 |+import tseslint from 'typescript-eslint';
   3 |+import reactHooks from 'eslint-plugin-react-hooks';
   4 |+
   5 |+export default tseslint.config(
   6 |+  {
   7 |+    ignores: ['dist', 'node_modules', 'coverage', 'playwright-report', 'scripts', 'dev-tools'],
   8 |+  },
   9 |+  js.configs.recommended,
  10 |+  ...tseslint.configs.recommended,
  11 |+  {
  12 |+    plugins: {
  13 |+      'react-hooks': reactHooks,
  14 |+    },
  15 |+    rules: {
  16 |+      ...reactHooks.configs.recommended.rules,
  17 |+      'no-unused-vars': 'off',
  18 |+      '@typescript-eslint/no-unused-vars': [
  19 |+        'error',
  20 |+        {
  21 |+          argsIgnorePattern: '^_',
  22 |+          varsIgnorePattern: '^_',
  23 |+          caughtErrorsIgnorePattern: '^_',
  24 |+        },
  25 |+      ],
  26 |+      '@typescript-eslint/no-explicit-any': 'off',
  27 |+      'react-hooks/set-state-in-effect': 'off',
  28 |+    },
  29 |+  },
  30 |+);
```

### `knip.json` (added)
**Valid Comment Ranges (New File):** 1-19
```diff
@@ -0,0 +1,19 @@
   1 |+{
   2 |+  "$schema": "https://unpkg.com/knip@latest/schema.json",
   3 |+  "project": ["src/**/*.{ts,tsx}"],
   4 |+  "ignoreExportsUsedInFile": true,
   5 |+  "ignoreDependencies": [
   6 |+    "express",
   7 |+    "dotenv",
   8 |+    "@google/genai",
   9 |+    "recharts",
  10 |+    "shadcn",
  11 |+    "tw-animate-css",
  12 |+    "@base-ui/react",
  13 |+    "@fontsource-variable/geist",
  14 |+    "buffer",
  15 |+    "@types/express",
  16 |+    "wait-on",
  17 |+    "vite"
  18 |+  ]
  19 |+}
```

### `package.json` (modified)
**Valid Comment Ranges (New File):** 10-19, 42-64
```diff
@@ -10,7 +10,10 @@
  10 |     "preview": "vite preview",
  11 |     "test:e2e": "playwright test",
  12 |     "clean": "rm -rf dist",
     |-    "lint": "tsc --noEmit",
  13 |+    "lint": "pnpm run lint:eslint && pnpm run lint:tsc && pnpm run knip",
  14 |+    "lint:eslint": "eslint . --max-warnings 0",
  15 |+    "lint:tsc": "tsc --noEmit",
  16 |+    "knip": "knip",
  17 |     "type-check": "tsc --noEmit"
  18 |   },
  19 |   "dependencies": {
@@ -39,18 +42,23 @@
  42 |     "vite": "^6.2.0"
  43 |   },
  44 |   "devDependencies": {
  45 |+    "@eslint/js": "^10.0.1",
  46 |     "@playwright/test": "^1.59.1",
  47 |     "@tailwindcss/typography": "^0.5.19",
  48 |     "@types/express": "^4.17.21",
  49 |     "@types/node": "^22.14.0",
  50 |     "autoprefixer": "^10.5.0",
  51 |+    "eslint": "^10.2.1",
  52 |+    "eslint-plugin-react-hooks": "^7.1.1",
  53 |+    "knip": "^6.6.1",
  54 |     "playwright": "^1.59.1",
  55 |     "postcss": "^8.5.10",
  56 |     "rollup-plugin-visualizer": "^7.0.1",
  57 |     "sharp": "^0.34.5",
  58 |     "tailwindcss": "^4.2.2",
  59 |     "tsx": "^4.21.0",
  60 |     "typescript": "~5.8.2",
  61 |+    "typescript-eslint": "^8.59.0",
  62 |     "vite": "^6.2.0",
  63 |     "vite-plugin-image-optimizer": "^2.0.3",
  64 |     "vite-plugin-sitemap": "^0.8.2",
```

### `pnpm-lock.yaml` (modified)
**Valid Comment Ranges (New File):** 19-28, 76-86, 96-110, 126-137, 322-339, 646-690, 957-982, 1195-1206, 1237-1480, 1777-1785, 1828-1836, 1849-1857, 1903-1967, 1979-1994, 2001-2009, 2326-2334, 2450-2515, 2557-2568, 2582-2590, 2602-2611, 2618-2637, 2645-2655, 2750-2759, 2794-2805, 2844-2853, 2858-2867, 3003-3026, 3035-3043, 3046-3060, 3132-3141, 3369-3377, 3431-3462, 3483-3492, 3551-3560, 3578-3587, 3843-3852, 3908-3917, 3964-3975, 3988-3997, 4004-4025, 4062-4070, 4155-4164, 4184-4193, 4222-4232, 4243-4252, 4260-4277, 4519-4545, 4696-4735, 5114-5135, 5258-5483, 5669-5692, 5745-5752, 5773-5780, 5826-5933, 5941-5965, 6246-6253, 6394-6482, 6600-6609, 6624-6633, 6641-6650, 6672-6682, 6710-6722, 6727-6736, 6825-6834, 6887-6898, 6932-6939, 6943-6950, 7044-7061, 7075-7113, 7159-7168, 7506-7513, 7562-7576, 7585-7649, 7676-7683, 7726-7733, 7761-7768, 8166-8173, 8219-8226, 8264-8273, 8290-8299, 8309-8329, 8373-8382, 8416-8432, 8440-8446, 8452-8459, 8474-8481, 8501-8508, 8526-8533, 8538-8549
```diff
@@ -19,10 +19,10 @@ importers:
  19 |         version: 1.50.1(@modelcontextprotocol/sdk@1.29.0(zod@3.25.76))
  20 |       '@tailwindcss/vite':
  21 |         specifier: ^4.2.2
     |-        version: 4.2.2(vite@6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0))
  22 |+        version: 4.2.2(vite@6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0)(yaml@2.8.3))
  23 |       '@vitejs/plugin-react':
  24 |         specifier: ^5.0.4
     |-        version: 5.2.0(vite@6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0))
  25 |+        version: 5.2.0(vite@6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0)(yaml@2.8.3))
  26 |       buffer:
  27 |         specifier: ^6.0.3
  28 |         version: 6.0.3
@@ -76,8 +76,11 @@ importers:
  76 |         version: 1.4.0
  77 |       vite:
  78 |         specifier: ^6.2.0
     |-        version: 6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0)
  79 |+        version: 6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0)(yaml@2.8.3)
  80 |     devDependencies:
  81 |+      '@eslint/js':
  82 |+        specifier: ^10.0.1
  83 |+        version: 10.0.1(eslint@10.2.1(jiti@2.6.1))
  84 |       '@playwright/test':
  85 |         specifier: ^1.59.1
  86 |         version: 1.59.1
@@ -93,6 +96,15 @@ importers:
  96 |       autoprefixer:
  97 |         specifier: ^10.5.0
  98 |         version: 10.5.0(postcss@8.5.10)
  99 |+      eslint:
 100 |+        specifier: ^10.2.1
 101 |+        version: 10.2.1(jiti@2.6.1)
 102 |+      eslint-plugin-react-hooks:
 103 |+        specifier: ^7.1.1
 104 |+        version: 7.1.1(eslint@10.2.1(jiti@2.6.1))
 105 |+      knip:
 106 |+        specifier: ^6.6.1
 107 |+        version: 6.6.1(@emnapi/core@1.9.2)(@emnapi/runtime@1.10.0)
 108 |       playwright:
 109 |         specifier: ^1.59.1
 110 |         version: 1.59.1
@@ -114,9 +126,12 @@ importers:
 126 |       typescript:
 127 |         specifier: ~5.8.2
 128 |         version: 5.8.3
 129 |+      typescript-eslint:
 130 |+        specifier: ^8.59.0
 131 |+        version: 8.59.0(eslint@10.2.1(jiti@2.6.1))(typescript@5.8.3)
 132 |       vite-plugin-image-optimizer:
 133 |         specifier: ^2.0.3
     |-        version: 2.0.3(sharp@0.34.5)(vite@6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0))
 134 |+        version: 2.0.3(sharp@0.34.5)(vite@6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0)(yaml@2.8.3))
 135 |       vite-plugin-sitemap:
 136 |         specifier: ^0.8.2
 137 |         version: 0.8.2
@@ -307,9 +322,18 @@ packages:
 322 |     peerDependencies:
 323 |       '@noble/ciphers': ^1.0.0
 324 | 
 325 |+  '@emnapi/core@1.9.2':
 326 |+    resolution: {integrity: sha512-UC+ZhH3XtczQYfOlu3lNEkdW/p4dsJ1r/bP7H8+rhao3TTTMO1ATq/4DdIi23XuGoFY+Cz0JmCbdVl0hz9jZcA==}
 327 |+
 328 |   '@emnapi/runtime@1.10.0':
 329 |     resolution: {integrity: sha512-ewvYlk86xUoGI0zQRNq/mC+16R1QeDlKQy21Ki3oSYXNgLb45GV1P6A0M+/s6nyCuNDqe5VpaY84BzXGwVbwFA==}
 330 | 
 331 |+  '@emnapi/runtime@1.9.2':
 332 |+    resolution: {integrity: sha512-3U4+MIWHImeyu1wnmVygh5WlgfYDtyf0k8AbLhMFxOipihf6nrWC4syIm/SwEeec0mNSafiiNnMJwbza/Is6Lw==}
 333 |+
 334 |+  '@emnapi/wasi-threads@1.2.1':
 335 |+    resolution: {integrity: sha512-uTII7OYF+/Mes/MrcIOYp5yOtSMLBWSIoLPpcgwipoiKbli6k322tcoFsxoIIxPDqW01SQGAgko4EzZi2BNv2w==}
 336 |+
 337 |   '@esbuild/aix-ppc64@0.25.12':
 338 |     resolution: {integrity: sha512-Hhmwd6CInZ3dwpuGTF8fJG6yoWmsToE+vYgD4nytZVxcu1ulHpUQRAB1UJ8+N1Am3Mz4+xOByoQoSZf4D+CpkA==}
 339 |     engines: {node: '>=18'}
@@ -622,6 +646,45 @@ packages:
 646 |     cpu: [x64]
 647 |     os: [win32]
 648 | 
 649 |+  '@eslint-community/eslint-utils@4.9.1':
 650 |+    resolution: {integrity: sha512-phrYmNiYppR7znFEdqgfWHXR6NCkZEK7hwWDHZUjit/2/U0r6XvkDl0SYnoM51Hq7FhCGdLDT6zxCCOY1hexsQ==}
 651 |+    engines: {node: ^12.22.0 || ^14.17.0 || >=16.0.0}
 652 |+    peerDependencies:
 653 |+      eslint: ^6.0.0 || ^7.0.0 || >=8.0.0
 654 |+
 655 |+  '@eslint-community/regexpp@4.12.2':
 656 |+    resolution: {integrity: sha512-EriSTlt5OC9/7SXkRSCAhfSxxoSUgBm33OH+IkwbdpgoqsSsUg7y3uh+IICI/Qg4BBWr3U2i39RpmycbxMq4ew==}
 657 |+    engines: {node: ^12.0.0 || ^14.0.0 || >=16.0.0}
 658 |+
 659 |+  '@eslint/config-array@0.23.5':
 660 |+    resolution: {integrity: sha512-Y3kKLvC1dvTOT+oGlqNQ1XLqK6D1HU2YXPc52NmAlJZbMMWDzGYXMiPRJ8TYD39muD/OTjlZmNJ4ib7dvSrMBA==}
 661 |+    engines: {node: ^20.19.0 || ^22.13.0 || >=24}
 662 |+
 663 |+  '@eslint/config-helpers@0.5.5':
 664 |+    resolution: {integrity: sha512-eIJYKTCECbP/nsKaaruF6LW967mtbQbsw4JTtSVkUQc9MneSkbrgPJAbKl9nWr0ZeowV8BfsarBmPpBzGelA2w==}
 665 |+    engines: {node: ^20.19.0 || ^22.13.0 || >=24}
 666 |+
 667 |+  '@eslint/core@1.2.1':
 668 |+    resolution: {integrity: sha512-MwcE1P+AZ4C6DWlpin/OmOA54mmIZ/+xZuJiQd4SyB29oAJjN30UW9wkKNptW2ctp4cEsvhlLY/CsQ1uoHDloQ==}
 669 |+    engines: {node: ^20.19.0 || ^22.13.0 || >=24}
 670 |+
 671 |+  '@eslint/js@10.0.1':
 672 |+    resolution: {integrity: sha512-zeR9k5pd4gxjZ0abRoIaxdc7I3nDktoXZk2qOv9gCNWx3mVwEn32VRhyLaRsDiJjTs0xq/T8mfPtyuXu7GWBcA==}
 673 |+    engines: {node: ^20.19.0 || ^22.13.0 || >=24}
 674 |+    peerDependencies:
 675 |+      eslint: ^10.0.0
 676 |+    peerDependenciesMeta:
 677 |+      eslint:
 678 |+        optional: true
 679 |+
 680 |+  '@eslint/object-schema@3.0.5':
 681 |+    resolution: {integrity: sha512-vqTaUEgxzm+YDSdElad6PiRoX4t8VGDjCtt05zn4nU810UIx/uNEV7/lZJ6KwFThKZOzOxzXy48da+No7HZaMw==}
 682 |+    engines: {node: ^20.19.0 || ^22.13.0 || >=24}
 683 |+
 684 |+  '@eslint/plugin-kit@0.7.1':
 685 |+    resolution: {integrity: sha512-rZAP3aVgB9ds9KOeUSL+zZ21hPmo8dh6fnIFwRQj5EAZl9gzR7wxYbYXYysAM8CTqGmUGyp2S4kUdV17MnGuWQ==}
 686 |+    engines: {node: ^20.19.0 || ^22.13.0 || >=24}
 687 |+
 688 |   '@firebase/ai@2.11.1':
 689 |     resolution: {integrity: sha512-WGTF81W3WBKJY+c7xqTzO15OGAkCAs8cpADqflAI0skhTZjIkhF0qyf55rq4Ctt6jKygkv99rPfMrjAHTgXaVQ==}
 690 |     engines: {node: '>=20.0.0'}
@@ -894,6 +957,26 @@ packages:
 957 |     peerDependencies:
 958 |       hono: ^4
 959 | 
 960 |+  '@humanfs/core@0.19.2':
 961 |+    resolution: {integrity: sha512-UhXNm+CFMWcbChXywFwkmhqjs3PRCmcSa/hfBgLIb7oQ5HNb1wS0icWsGtSAUNgefHeI+eBrA8I1fxmbHsGdvA==}
 962 |+    engines: {node: '>=18.18.0'}
 963 |+
 964 |+  '@humanfs/node@0.16.8':
 965 |+    resolution: {integrity: sha512-gE1eQNZ3R++kTzFUpdGlpmy8kDZD/MLyHqDwqjkVQI0JMdI1D51sy1H958PNXYkM2rAac7e5/CnIKZrHtPh3BQ==}
 966 |+    engines: {node: '>=18.18.0'}
 967 |+
 968 |+  '@humanfs/types@0.15.0':
 969 |+    resolution: {integrity: sha512-ZZ1w0aoQkwuUuC7Yf+7sdeaNfqQiiLcSRbfI08oAxqLtpXQr9AIVX7Ay7HLDuiLYAaFPu8oBYNq/QIi9URHJ3Q==}
 970 |+    engines: {node: '>=18.18.0'}
 971 |+
 972 |+  '@humanwhocodes/module-importer@1.0.1':
 973 |+    resolution: {integrity: sha512-bxveV4V8v5Yb4ncFTT3rPSgZBOpCkjfK0y4oVVVJwIuDVBRMDXrPyXRL988i5ap9m9bnyEEjWfm5WkBmtffLfA==}
 974 |+    engines: {node: '>=12.22'}
 975 |+
 976 |+  '@humanwhocodes/retry@0.4.3':
 977 |+    resolution: {integrity: sha512-bV0Tgo9K4hfPCek+aMAn81RppFKv2ySDQeMoSZuvTASywNTnVJCArCZE2FWqpvIatKu7VMRLWlR1EazvVhDyhQ==}
 978 |+    engines: {node: '>=18.18'}
 979 |+
 980 |   '@img/colour@1.1.0':
 981 |     resolution: {integrity: sha512-Td76q7j57o/tLVdgS746cYARfSyxk8iEfRxewL9h4OMzYhbW4TAcppl0mT4eyqXddh6L/jwoM75mo7ixa/pCeQ==}
 982 |     engines: {node: '>=18'}
@@ -1112,6 +1195,12 @@ packages:
1195 |     resolution: {integrity: sha512-3B9EinUkrdOUGYzHRzRWSXunQ4YFGboJnyLNRwEJWEde+j8fNhPUHvrN1E3g1DU/iS/s8JQrMNVe+S7AHHVs0w==}
1196 |     engines: {node: '>=18'}
1197 | 
1198 |+  '@napi-rs/wasm-runtime@1.1.4':
1199 |+    resolution: {integrity: sha512-3NQNNgA1YSlJb/kMH1ildASP9HW7/7kYnRI2szWJaofaS1hWmbGI4H+d3+22aGzXXN9IJ+n+GiFVcGipJP18ow==}
1200 |+    peerDependencies:
1201 |+      '@emnapi/core': ^1.7.1
1202 |+      '@emnapi/runtime': ^1.7.1
1203 |+
1204 |   '@noble/ciphers@1.3.0':
1205 |     resolution: {integrity: sha512-2I0gnIVPtfnMw9ee9h1dJG7tp81+8Ob3OJb3Mv37rx5L40/b0i7djjCVvGOVqc9AEIQyvyu1i6ypKdFw8R8gQw==}
1206 |     engines: {node: ^14.21.3 || >=16}
@@ -1148,6 +1237,244 @@ packages:
1237 |   '@open-draft/until@2.1.0':
1238 |     resolution: {integrity: sha512-U69T3ItWHvLwGg5eJ0n3I62nWuE6ilHlmz7zM0npLBRvPRd7e6NYmg54vvRtP5mZG7kZqZCFVdsTWo7BPtBujg==}
1239 | 
1240 |+  '@oxc-parser/binding-android-arm-eabi@0.126.0':
1241 |+    resolution: {integrity: sha512-svyoHt25J4741QJ5aa4R+h0iiBeSRt63Lr3aAZcxy2c/NeSE1IfDeMnSij6rIg7EjxkdlXzz613wUjeCeilBNA==}
1242 |+    engines: {node: ^20.19.0 || >=22.12.0}
1243 |+    cpu: [arm]
1244 |+    os: [android]
1245 |+
1246 |+  '@oxc-parser/binding-android-arm64@0.126.0':
1247 |+    resolution: {integrity: sha512-hPEBRKgplp1mG9GkINFsr4JVMDNrGJLOqfDaadTWpAoTnzYR5Rmv8RMvB3hJZpiNvbk1aacopdHUP1pggMQ/cw==}
1248 |+    engines: {node: ^20.19.0 || >=22.12.0}
1249 |+    cpu: [arm64]
1250 |+    os: [android]
1251 |+
1252 |+  '@oxc-parser/binding-darwin-arm64@0.126.0':
1253 |+    resolution: {integrity: sha512-ccRpu9sdYmznePJQG5halhs0FW5tw5a8zRSoZXOzM1OjoeZ4jiRRruFiPclsD59edoVAK1l83dvfjWz1nQi6lg==}
1254 |+    engines: {node: ^20.19.0 || >=22.12.0}
1255 |+    cpu: [arm64]
1256 |+    os: [darwin]
1257 |+
1258 |+  '@oxc-parser/binding-darwin-x64@0.126.0':
1259 |+    resolution: {integrity: sha512-CHB4zVjNSKqx8Fw9pHowzQQnjjuq04i4Ng0Avj+DixlwhwAoMYqlFbocYIlbg+q3zOLGlm7vEHm83jqEMitnyg==}
1260 |+    engines: {node: ^20.19.0 || >=22.12.0}
1261 |+    cpu: [x64]
1262 |+    os: [darwin]
1263 |+
1264 |+  '@oxc-parser/binding-freebsd-x64@0.126.0':
1265 |+    resolution: {integrity: sha512-RQ3nEJdcDKBfBjmLJ3Vl1d0KQERPV1P8eUrnBm7+VTYyoaJSPLVFuPg1mlD1hk3n0/879VLFMfusFkBal4ssWQ==}
1266 |+    engines: {node: ^20.19.0 || >=22.12.0}
1267 |+    cpu: [x64]
1268 |+    os: [freebsd]
1269 |+
1270 |+  '@oxc-parser/binding-linux-arm-gnueabihf@0.126.0':
1271 |+    resolution: {integrity: sha512-onipc2wCDA7Bauzb4KK1mab0GsEDf4ujiIfWECdnmY/2LlzAoX3xdQRLAUyEDB1kn3yilHBrkmXDdHluyHXxiw==}
1272 |+    engines: {node: ^20.19.0 || >=22.12.0}
1273 |+    cpu: [arm]
1274 |+    os: [linux]
1275 |+
1276 |+  '@oxc-parser/binding-linux-arm-musleabihf@0.126.0':
1277 |+    resolution: {integrity: sha512-5BuJJPohrV5NJ8lmcYOMbfRCUGoYH5J9HZHeuqOLwkHXWAuPMN3X1h8bC/2mWjmosdbfTtmyIdX3spS/TkqKNg==}
1278 |+    engines: {node: ^20.19.0 || >=22.12.0}
1279 |+    cpu: [arm]
1280 |+    os: [linux]
1281 |+
1282 |+  '@oxc-parser/binding-linux-arm64-gnu@0.126.0':
1283 |+    resolution: {integrity: sha512-r2KApRgm2pOJaduRm6GOT8x0whcr67AyejNkSdzPt34GJ+Y3axcXN2mwlTs+8lfO/SSmpO5ZJGYiHYnxEE0jkw==}
1284 |+    engines: {node: ^20.19.0 || >=22.12.0}
1285 |+    cpu: [arm64]
1286 |+    os: [linux]
1287 |+    libc: [glibc]
1288 |+
1289 |+  '@oxc-parser/binding-linux-arm64-musl@0.126.0':
1290 |+    resolution: {integrity: sha512-FQ+MMh7MT0Dr/u8+RWmWKlfoeWPQyHDbhhxJShJlYtROXXPHsRs9EvmQOZZ3sx4Nn7JU8NX+oyw2YzQ7anBJcA==}
1291 |+    engines: {node: ^20.19.0 || >=22.12.0}
1292 |+    cpu: [arm64]
1293 |+    os: [linux]
1294 |+    libc: [musl]
1295 |+
1296 |+  '@oxc-parser/binding-linux-ppc64-gnu@0.126.0':
1297 |+    resolution: {integrity: sha512-Wv/T8C98hRQhGTlx2XFyLn5raRMp9U1lOQD+YnXNgAr7wHbJJpZ8mDBU7Rw+M3WytGcGTFcr6kqgfyQeHVtLbQ==}
1298 |+    engines: {node: ^20.19.0 || >=22.12.0}
1299 |+    cpu: [ppc64]
1300 |+    os: [linux]
1301 |+    libc: [glibc]
1302 |+
1303 |+  '@oxc-parser/binding-linux-riscv64-gnu@0.126.0':
1304 |+    resolution: {integrity: sha512-DHx1rT1zauW0ZbLHOiQh5AC9Xs3UkWx2XmfZHs+7nnWYr3sagrufoUQC+/XPwwjMIlCFXiFGM0sFh3TyOCZwqA==}
1305 |+    engines: {node: ^20.19.0 || >=22.12.0}
1306 |+    cpu: [riscv64]
1307 |+    os: [linux]
1308 |+    libc: [glibc]
1309 |+
1310 |+  '@oxc-parser/binding-linux-riscv64-musl@0.126.0':
1311 |+    resolution: {integrity: sha512-umDc2mTShH0U2zcEYf8mIJ163seLJNn54ZUZYeI5jD4qlg9izPwoLrC2aNPKlMJTu6u/ysmQWiEvIiaAG+INkw==}
1312 |+    engines: {node: ^20.19.0 || >=22.12.0}
1313 |+    cpu: [riscv64]
1314 |+    os: [linux]
1315 |+    libc: [musl]
1316 |+
1317 |+  '@oxc-parser/binding-linux-s390x-gnu@0.126.0':
1318 |+    resolution: {integrity: sha512-PXXeWayclRtO1pxQEeCpiqIglQdhK2mAI2VX5xnsWdImzSB5GpoQ8TNw7vTCKk2k+GZuxl+q1knncidjCyUP9w==}
1319 |+    engines: {node: ^20.19.0 || >=22.12.0}
1320 |+    cpu: [s390x]
1321 |+    os: [linux]
1322 |+    libc: [glibc]
1323 |+
1324 |+  '@oxc-parser/binding-linux-x64-gnu@0.126.0':
1325 |+    resolution: {integrity: sha512-wzocjxm34TbB3bFlqG65JiLtvf6ZDg2ZxRkLLbgXwDQUNU+0MPjQN8zy/0jBKNA5fnPLk3XeVdZ7Uin+7+CVkg==}
1326 |+    engines: {node: ^20.19.0 || >=22.12.0}
1327 |+    cpu: [x64]
1328 |+    os: [linux]
1329 |+    libc: [glibc]
1330 |+
1331 |+  '@oxc-parser/binding-linux-x64-musl@0.126.0':
1332 |+    resolution: {integrity: sha512-e83uftP60jmkPs2+CW6T6A1GYzN2H6IumDAiTntv9WyHR73PI3ImHNBkYqnA3ukeKI3xjcCbhSh9QeJWmufxGQ==}
1333 |+    engines: {node: ^20.19.0 || >=22.12.0}
1334 |+    cpu: [x64]
1335 |+    os: [linux]
1336 |+    libc: [musl]
1337 |+
1338 |+  '@oxc-parser/binding-openharmony-arm64@0.126.0':
1339 |+    resolution: {integrity: sha512-4WiOILHnPrTDY2/L4mE6PZCYwLN1d3ghma6BuTJ452CCgzRMt3uFplCtR+o3r9zdUWJYb370UizpI9CUcWXr1A==}
1340 |+    engines: {node: ^20.19.0 || >=22.12.0}
1341 |+    cpu: [arm64]
1342 |+    os: [openharmony]
1343 |+
1344 |+  '@oxc-parser/binding-wasm32-wasi@0.126.0':
1345 |+    resolution: {integrity: sha512-Y17hhnrQTrxgAxAyAq401vnN9URsAL4s5AjqpG1NDsXSlhe1yBNnns+rC2P6xcMoitgX5nKH2ryYt9oiFRlzLw==}
1346 |+    engines: {node: '>=14.0.0'}
1347 |+    cpu: [wasm32]
1348 |+
1349 |+  '@oxc-parser/binding-win32-arm64-msvc@0.126.0':
1350 |+    resolution: {integrity: sha512-Znug1u1iRvT4VC3jANz6nhGBHsFwEFMxuimYpJFwMtsB6H5FcEoZRMmH26tHkSTD03JvDmG+gB65W3ajLjPcSw==}
1351 |+    engines: {node: ^20.19.0 || >=22.12.0}
1352 |+    cpu: [arm64]
1353 |+    os: [win32]
1354 |+
1355 |+  '@oxc-parser/binding-win32-ia32-msvc@0.126.0':
1356 |+    resolution: {integrity: sha512-qrw7mx5hFFTxVSXToOA40hpnjgNB/DJprZchtB4rDKNLKqkD3F26HbzaQeH1nxAKej0efSZfJd5Sw3qdtOLGhw==}
1357 |+    engines: {node: ^20.19.0 || >=22.12.0}
1358 |+    cpu: [ia32]
1359 |+    os: [win32]
1360 |+
1361 |+  '@oxc-parser/binding-win32-x64-msvc@0.126.0':
1362 |+    resolution: {integrity: sha512-ibB1s+mPUFXvS7MFJO2jpw/aCNs/P6ifnWlRyTYB+WYBpniOiCcHQQskZneJtwcjQMDRol3RGG3ihoYnzXSY4w==}
1363 |+    engines: {node: ^20.19.0 || >=22.12.0}
1364 |+    cpu: [x64]
1365 |+    os: [win32]
1366 |+
1367 |+  '@oxc-project/types@0.126.0':
1368 |+    resolution: {integrity: sha512-oGfVtjAgwQVVpfBrbtk4e1XDyWHRFta6BS3GWVzrF8xYBT2VGQAk39yJS/wFSMrZqoiCU4oghT3Ch0HaHGIHcQ==}
1369 |+
1370 |+  '@oxc-resolver/binding-android-arm-eabi@11.19.1':
1371 |+    resolution: {integrity: sha512-aUs47y+xyXHUKlbhqHUjBABjvycq6YSD7bpxSW7vplUmdzAlJ93yXY6ZR0c1o1x5A/QKbENCvs3+NlY8IpIVzg==}
1372 |+    cpu: [arm]
1373 |+    os: [android]
1374 |+
1375 |+  '@oxc-resolver/binding-android-arm64@11.19.1':
1376 |+    resolution: {integrity: sha512-oolbkRX+m7Pq2LNjr/kKgYeC7bRDMVTWPgxBGMjSpZi/+UskVo4jsMU3MLheZV55jL6c3rNelPl4oD60ggYmqA==}
1377 |+    cpu: [arm64]
1378 |+    os: [android]
1379 |+
1380 |+  '@oxc-resolver/binding-darwin-arm64@11.19.1':
1381 |+    resolution: {integrity: sha512-nUC6d2i3R5B12sUW4O646qD5cnMXf2oBGPLIIeaRfU9doJRORAbE2SGv4eW6rMqhD+G7nf2Y8TTJTLiiO3Q/dQ==}
1382 |+    cpu: [arm64]
1383 |+    os: [darwin]
1384 |+
1385 |+  '@oxc-resolver/binding-darwin-x64@11.19.1':
1386 |+    resolution: {integrity: sha512-cV50vE5+uAgNcFa3QY1JOeKDSkM/9ReIcc/9wn4TavhW/itkDGrXhw9jaKnkQnGbjJ198Yh5nbX/Gr2mr4Z5jQ==}
1387 |+    cpu: [x64]
1388 |+    os: [darwin]
1389 |+
1390 |+  '@oxc-resolver/binding-freebsd-x64@11.19.1':
1391 |+    resolution: {integrity: sha512-xZOQiYGFxtk48PBKff+Zwoym7ScPAIVp4c14lfLxizO2LTTTJe5sx9vQNGrBymrf/vatSPNMD4FgsaaRigPkqw==}
1392 |+    cpu: [x64]
1393 |+    os: [freebsd]
1394 |+
1395 |+  '@oxc-resolver/binding-linux-arm-gnueabihf@11.19.1':
1396 |+    resolution: {integrity: sha512-lXZYWAC6kaGe/ky2su94e9jN9t6M0/6c+GrSlCqL//XO1cxi5lpAhnJYdyrKfm0ZEr/c7RNyAx3P7FSBcBd5+A==}
1397 |+    cpu: [arm]
1398 |+    os: [linux]
1399 |+
1400 |+  '@oxc-resolver/binding-linux-arm-musleabihf@11.19.1':
1401 |+    resolution: {integrity: sha512-veG1kKsuK5+t2IsO9q0DErYVSw2azvCVvWHnfTOS73WE0STdLLB7Q1bB9WR+yHPQM76ASkFyRbogWo1GR1+WbQ==}
1402 |+    cpu: [arm]
1403 |+    os: [linux]
1404 |+
1405 |+  '@oxc-resolver/binding-linux-arm64-gnu@11.19.1':
1406 |+    resolution: {integrity: sha512-heV2+jmXyYnUrpUXSPugqWDRpnsQcDm2AX4wzTuvgdlZfoNYO0O3W2AVpJYaDn9AG4JdM6Kxom8+foE7/BcSig==}
1407 |+    cpu: [arm64]
1408 |+    os: [linux]
1409 |+    libc: [glibc]
1410 |+
1411 |+  '@oxc-resolver/binding-linux-arm64-musl@11.19.1':
1412 |+    resolution: {integrity: sha512-jvo2Pjs1c9KPxMuMPIeQsgu0mOJF9rEb3y3TdpsrqwxRM+AN6/nDDwv45n5ZrUnQMsdBy5gIabioMKnQfWo9ew==}
1413 |+    cpu: [arm64]
1414 |+    os: [linux]
1415 |+    libc: [musl]
1416 |+
1417 |+  '@oxc-resolver/binding-linux-ppc64-gnu@11.19.1':
1418 |+    resolution: {integrity: sha512-vLmdNxWCdN7Uo5suays6A/+ywBby2PWBBPXctWPg5V0+eVuzsJxgAn6MMB4mPlshskYbppjpN2Zg83ArHze9gQ==}
1419 |+    cpu: [ppc64]
1420 |+    os: [linux]
1421 |+    libc: [glibc]
1422 |+
1423 |+  '@oxc-resolver/binding-linux-riscv64-gnu@11.19.1':
1424 |+    resolution: {integrity: sha512-/b+WgR+VTSBxzgOhDO7TlMXC1ufPIMR6Vj1zN+/x+MnyXGW7prTLzU9eW85Aj7Th7CCEG9ArCbTeqxCzFWdg2w==}
1425 |+    cpu: [riscv64]
1426 |+    os: [linux]
1427 |+    libc: [glibc]
1428 |+
1429 |+  '@oxc-resolver/binding-linux-riscv64-musl@11.19.1':
1430 |+    resolution: {integrity: sha512-YlRdeWb9j42p29ROh+h4eg/OQ3dTJlpHSa+84pUM9+p6i3djtPz1q55yLJhgW9XfDch7FN1pQ/Vd6YP+xfRIuw==}
1431 |+    cpu: [riscv64]
1432 |+    os: [linux]
1433 |+    libc: [musl]
1434 |+
1435 |+  '@oxc-resolver/binding-linux-s390x-gnu@11.19.1':
1436 |+    resolution: {integrity: sha512-EDpafVOQWF8/MJynsjOGFThcqhRHy417sRyLfQmeiamJ8qVhSKAn2Dn2VVKUGCjVB9C46VGjhNo7nOPUi1x6uA==}
1437 |+    cpu: [s390x]
1438 |+    os: [linux]
1439 |+    libc: [glibc]
1440 |+
1441 |+  '@oxc-resolver/binding-linux-x64-gnu@11.19.1':
1442 |+    resolution: {integrity: sha512-NxjZe+rqWhr+RT8/Ik+5ptA3oz7tUw361Wa5RWQXKnfqwSSHdHyrw6IdcTfYuml9dM856AlKWZIUXDmA9kkiBQ==}
1443 |+    cpu: [x64]
1444 |+    os: [linux]
1445 |+    libc: [glibc]
1446 |+
1447 |+  '@oxc-resolver/binding-linux-x64-musl@11.19.1':
1448 |+    resolution: {integrity: sha512-cM/hQwsO3ReJg5kR+SpI69DMfvNCp+A/eVR4b4YClE5bVZwz8rh2Nh05InhwI5HR/9cArbEkzMjcKgTHS6UaNw==}
1449 |+    cpu: [x64]
1450 |+    os: [linux]
1451 |+    libc: [musl]
1452 |+
1453 |+  '@oxc-resolver/binding-openharmony-arm64@11.19.1':
1454 |+    resolution: {integrity: sha512-QF080IowFB0+9Rh6RcD19bdgh49BpQHUW5TajG1qvWHvmrQznTZZjYlgE2ltLXyKY+qs4F/v5xuX1XS7Is+3qA==}
1455 |+    cpu: [arm64]
1456 |+    os: [openharmony]
1457 |+
1458 |+  '@oxc-resolver/binding-wasm32-wasi@11.19.1':
1459 |+    resolution: {integrity: sha512-w8UCKhX826cP/ZLokXDS6+milN8y4X7zidsAttEdWlVoamTNf6lhBJldaWr3ukTDiye7s4HRcuPEPOXNC432Vg==}
1460 |+    engines: {node: '>=14.0.0'}
1461 |+    cpu: [wasm32]
1462 |+
1463 |+  '@oxc-resolver/binding-win32-arm64-msvc@11.19.1':
1464 |+    resolution: {integrity: sha512-nJ4AsUVZrVKwnU/QRdzPCCrO0TrabBqgJ8pJhXITdZGYOV28TIYystV1VFLbQ7DtAcaBHpocT5/ZJnF78YJPtQ==}
1465 |+    cpu: [arm64]
1466 |+    os: [win32]
1467 |+
1468 |+  '@oxc-resolver/binding-win32-ia32-msvc@11.19.1':
1469 |+    resolution: {integrity: sha512-EW+ND5q2Tl+a3pH81l1QbfgbF3HmqgwLfDfVithRFheac8OTcnbXt/JxqD2GbDkb7xYEqy1zNaVFRr3oeG8npA==}
1470 |+    cpu: [ia32]
1471 |+    os: [win32]
1472 |+
1473 |+  '@oxc-resolver/binding-win32-x64-msvc@11.19.1':
1474 |+    resolution: {integrity: sha512-6hIU3RQu45B+VNTY4Ru8ppFwjVS/S5qwYyGhBotmjxfEKk41I2DlGtRfGJndZ5+6lneE2pwloqunlOyZuX/XAw==}
1475 |+    cpu: [x64]
1476 |+    os: [win32]
1477 |+
1478 |   '@playwright/test@1.59.1':
1479 |     resolution: {integrity: sha512-PG6q63nQg5c9rIi4/Z5lR5IVF7yU5MqmKaPOe0HSc0O2cX1fPi96sUQu5j7eo4gKCkB2AnNGoWt7y4/Xx3Kcqg==}
1480 |     engines: {node: '>=18'}
@@ -1450,6 +1777,9 @@ packages:
1777 |   '@ts-morph/common@0.27.0':
1778 |     resolution: {integrity: sha512-Wf29UqxWDpc+i61k3oIOzcUfQt79PIT9y/MWfAGlrkjg6lBC1hwDECLXPVJAhWjiGbfBCxZd65F/LIZF3+jeJQ==}
1779 | 
1780 |+  '@tybys/wasm-util@0.10.1':
1781 |+    resolution: {integrity: sha512-9tTaPJLSiejZKx+Bmog4uSubteqTvFrVrURwkmHixBo0G4seD0zUxp98E1DzUBJxLQ3NPwXrGKDiVjwx/DpPsg==}
1782 |+
1783 |   '@types/babel__core@7.20.5':
1784 |     resolution: {integrity: sha512-qoQprZvz5wQFJwMDqeseRXWv3rqMvhgpbXFfVyWhbx9X47POIA6i/+dXefEmZKoAgOaTdaIgNSMqMIU61yRyzA==}
1785 | 
@@ -1498,6 +1828,9 @@ packages:
1828 |   '@types/debug@4.1.13':
1829 |     resolution: {integrity: sha512-KSVgmQmzMwPlmtljOomayoR89W4FynCAi3E8PPs7vmDVPe84hT+vGPKkJfThkmXs0x0jAaa9U8uW8bbfyS2fWw==}
1830 | 
1831 |+  '@types/esrecurse@4.3.1':
1832 |+    resolution: {integrity: sha512-xJBAbDifo5hpffDBuHl0Y8ywswbiAp/Wi7Y/GtAgSlZyIABppyurxVueOPE8LUQOxdlgi6Zqce7uoEpqNTeiUw==}
1833 |+
1834 |   '@types/estree-jsx@1.0.5':
1835 |     resolution: {integrity: sha512-52CcUVNFyfb1A2ALocQw/Dd1BQFNmSdkuC3BkZ6iqhdMfQz7JWOFRuJFloOzjk+6WijU56m9oKXFAXc7o3Towg==}
1836 | 
@@ -1516,6 +1849,9 @@ packages:
1849 |   '@types/http-errors@2.0.5':
1850 |     resolution: {integrity: sha512-r8Tayk8HJnX0FztbZN7oVqGccWgw98T/0neJphO91KkmOzug1KkofZURD4UaD5uH8AqcFLfdPErnBod0u71/qg==}
1851 | 
1852 |+  '@types/json-schema@7.0.15':
1853 |+    resolution: {integrity: sha512-5+fP8P8MFNC+AyZCDxrB2pkZFPGzqQWUzpSeuuVLvm8VMcorNYavBqoFcxK8bQz4Qsbn4oUEEem4wDLfcysGHA==}
1854 |+
1855 |   '@types/mdast@4.0.4':
1856 |     resolution: {integrity: sha512-kGaNbPh1k7AFzgpud/gMdvIm5xuECykRR+JnWKQno9TAXVa6WIVCGTPvYGekIDL4uwCZQSYbUxNBSb1aUo79oA==}
1857 | 
@@ -1567,6 +1903,65 @@ packages:
1903 |   '@types/validate-npm-package-name@4.0.2':
1904 |     resolution: {integrity: sha512-lrpDziQipxCEeK5kWxvljWYhUvOiB2A9izZd9B2AFarYAkqZshb4lPbRs7zKEic6eGtH8V/2qJW+dPp9OtF6bw==}
1905 | 
1906 |+  '@typescript-eslint/eslint-plugin@8.59.0':
1907 |+    resolution: {integrity: sha512-HyAZtpdkgZwpq8Sz3FSUvCR4c+ScbuWa9AksK2Jweub7w4M3yTz4O11AqVJzLYjy/B9ZWPyc81I+mOdJU/bDQw==}
1908 |+    engines: {node: ^18.18.0 || ^20.9.0 || >=21.1.0}
1909 |+    peerDependencies:
1910 |+      '@typescript-eslint/parser': ^8.59.0
1911 |+      eslint: ^8.57.0 || ^9.0.0 || ^10.0.0
1912 |+      typescript: '>=4.8.4 <6.1.0'
1913 |+
1914 |+  '@typescript-eslint/parser@8.59.0':
1915 |+    resolution: {integrity: sha512-TI1XGwKbDpo9tRW8UDIXCOeLk55qe9ZFGs8MTKU6/M08HWTw52DD/IYhfQtOEhEdPhLMT26Ka/x7p70nd3dzDg==}
1916 |+    engines: {node: ^18.18.0 || ^20.9.0 || >=21.1.0}
1917 |+    peerDependencies:
1918 |+      eslint: ^8.57.0 || ^9.0.0 || ^10.0.0
1919 |+      typescript: '>=4.8.4 <6.1.0'
1920 |+
1921 |+  '@typescript-eslint/project-service@8.59.0':
1922 |+    resolution: {integrity: sha512-Lw5ITrR5s5TbC19YSvlr63ZfLaJoU6vtKTHyB0GQOpX0W7d5/Ir6vUahWi/8Sps/nOukZQ0IB3SmlxZnjaKVnw==}
1923 |+    engines: {node: ^18.18.0 || ^20.9.0 || >=21.1.0}
1924 |+    peerDependencies:
1925 |+      typescript: '>=4.8.4 <6.1.0'
1926 |+
1927 |+  '@typescript-eslint/scope-manager@8.59.0':
1928 |+    resolution: {integrity: sha512-UzR16Ut8IpA3Mc4DbgAShlPPkVm8xXMWafXxB0BocaVRHs8ZGakAxGRskF7FId3sdk9lgGD73GSFaWmWFDE4dg==}
1929 |+    engines: {node: ^18.18.0 || ^20.9.0 || >=21.1.0}
1930 |+
1931 |+  '@typescript-eslint/tsconfig-utils@8.59.0':
1932 |+    resolution: {integrity: sha512-91Sbl3s4Kb3SybliIY6muFBmHVv+pYXfybC4Oolp3dvk8BvIE3wOPc+403CWIT7mJNkfQRGtdqghzs2+Z91Tqg==}
1933 |+    engines: {node: ^18.18.0 || ^20.9.0 || >=21.1.0}
1934 |+    peerDependencies:
1935 |+      typescript: '>=4.8.4 <6.1.0'
1936 |+
1937 |+  '@typescript-eslint/type-utils@8.59.0':
1938 |+    resolution: {integrity: sha512-3TRiZaQSltGqGeNrJzzr1+8YcEobKH9rHnqIp/1psfKFmhRQDNMGP5hBufanYTGznwShzVLs3Mz+gDN7HkWfXg==}
1939 |+    engines: {node: ^18.18.0 || ^20.9.0 || >=21.1.0}
1940 |+    peerDependencies:
1941 |+      eslint: ^8.57.0 || ^9.0.0 || ^10.0.0
1942 |+      typescript: '>=4.8.4 <6.1.0'
1943 |+
1944 |+  '@typescript-eslint/types@8.59.0':
1945 |+    resolution: {integrity: sha512-nLzdsT1gdOgFxxxwrlNVUBzSNBEEHJ86bblmk4QAS6stfig7rcJzWKqCyxFy3YRRHXDWEkb2NralA1nOYkkm/A==}
1946 |+    engines: {node: ^18.18.0 || ^20.9.0 || >=21.1.0}
1947 |+
1948 |+  '@typescript-eslint/typescript-estree@8.59.0':
1949 |+    resolution: {integrity: sha512-O9Re9P1BmBLFJyikRbQpLku/QA3/AueZNO9WePLBwQrvkixTmDe8u76B6CYUAITRl/rHawggEqUGn5QIkVRLMw==}
1950 |+    engines: {node: ^18.18.0 || ^20.9.0 || >=21.1.0}
1951 |+    peerDependencies:
1952 |+      typescript: '>=4.8.4 <6.1.0'
1953 |+
1954 |+  '@typescript-eslint/utils@8.59.0':
1955 |+    resolution: {integrity: sha512-I1R/K7V07XsMJ12Oaxg/O9GfrysGTmCRhvZJBv0RE0NcULMzjqVpR5kRRQjHsz3J/bElU7HwCO7zkqL+MSUz+g==}
1956 |+    engines: {node: ^18.18.0 || ^20.9.0 || >=21.1.0}
1957 |+    peerDependencies:
1958 |+      eslint: ^8.57.0 || ^9.0.0 || ^10.0.0
1959 |+      typescript: '>=4.8.4 <6.1.0'
1960 |+
1961 |+  '@typescript-eslint/visitor-keys@8.59.0':
1962 |+    resolution: {integrity: sha512-/uejZt4dSere1bx12WLlPfv8GktzcaDtuJ7s42/HEZ5zGj9oxRaD4bj7qwSunXkf+pbAhFt2zjpHYUiT5lHf0Q==}
1963 |+    engines: {node: ^18.18.0 || ^20.9.0 || >=21.1.0}
1964 |+
1965 |   '@ungap/structured-clone@1.3.0':
1966 |     resolution: {integrity: sha512-WmoN8qaIAo7WTYWbAZuG8PYEhn5fkz7dZrqTBZ7dtt//lL2Gwms1IcnQ5yHqjDfX8Ft5j4YzDM23f87zBfDe9g==}
1967 | 
@@ -1584,6 +1979,16 @@ packages:
1979 |     resolution: {integrity: sha512-5cvg6CtKwfgdmVqY1WIiXKc3Q1bkRqGLi+2W/6ao+6Y7gu/RCwRuAhGEzh5B4KlszSuTLgZYuqFqo5bImjNKng==}
1980 |     engines: {node: '>= 0.6'}
1981 | 
1982 |+  acorn-jsx@5.3.2:
1983 |+    resolution: {integrity: sha512-rq9s+JNhf0IChjtDXxllJ7g41oZk5SlXtp0LHwyA5cejwn7vKmKp4pPri6YEePv2PU65sAsegbXtIinmDFDXgQ==}
1984 |+    peerDependencies:
1985 |+      acorn: ^6.0.0 || ^7.0.0 || ^8.0.0
1986 |+
1987 |+  acorn@8.16.0:
1988 |+    resolution: {integrity: sha512-UVJyE9MttOsBQIDKw1skb9nAwQuR5wuGD3+82K6JgJlm/Y+KI92oNsMNGZCYdDsVtRHSak0pcV5Dno5+4jh9sw==}
1989 |+    engines: {node: '>=0.4.0'}
1990 |+    hasBin: true
1991 |+
1992 |   agent-base@7.1.4:
1993 |     resolution: {integrity: sha512-MnA+YT8fwfJPgBx3m60MNqakm30XOkyIoH1y6huTQvC0PwZG7ki8NacLBcrPbNoo8vEZy7Jpuk7+jMO+CUovTQ==}
1994 |     engines: {node: '>= 14'}
@@ -1596,6 +2001,9 @@ packages:
2001 |       ajv:
2002 |         optional: true
2003 | 
2004 |+  ajv@6.14.0:
2005 |+    resolution: {integrity: sha512-IWrosm/yrn43eiKqkfkHis7QioDleaXQHdDVPKg0FSwwd/DuvyX79TZnFOnYpB7dcsFAMmtFztZuXPDvSePkFw==}
2006 |+
2007 |   ajv@8.18.0:
2008 |     resolution: {integrity: sha512-PlXPeEWMXMZ7sPYOHqmDyCJzcfNrUr3fGNKtezX14ykXOEIvyK81d+qydx89KY5O71FKMPaQ2vBfBFI5NHR63A==}
2009 | 
@@ -1918,6 +2326,9 @@ packages:
2326 |       babel-plugin-macros:
2327 |         optional: true
2328 | 
2329 |+  deep-is@0.1.4:
2330 |+    resolution: {integrity: sha512-oIPzksmTg4/MriiaYGO+okXDT7ztn/w3Eptv/+gSIdMdKsJo0u4CfYNFJPy+4SKMuCqGw2wxnA+URMg3t8a/bQ==}
2331 |+
2332 |   deepmerge@4.3.1:
2333 |     resolution: {integrity: sha512-3sUqbMEc77XqpdNO7FRyRog+eW3ph+GYCbj+rK+uYyRMuwsVy0rMiVtPn+QJlKFvWP/1PYpapqYn0Me2knFn+A==}
2334 |     engines: {node: '>=0.10.0'}
@@ -2039,14 +2450,66 @@ packages:
2450 |   escape-html@1.0.3:
2451 |     resolution: {integrity: sha512-NiSupZ4OeuGwr68lGIeym/ksIZMJodUGOSCZ/FSnTxcrekbvqrgdUxlJOMpijaKZVjAJrWrGs/6Jy8OMuyj9ow==}
2452 | 
2453 |+  escape-string-regexp@4.0.0:
2454 |+    resolution: {integrity: sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA==}
2455 |+    engines: {node: '>=10'}
2456 |+
2457 |+  eslint-plugin-react-hooks@7.1.1:
2458 |+    resolution: {integrity: sha512-f2I7Gw6JbvCexzIInuSbZpfdQ44D7iqdWX01FKLvrPgqxoE7oMj8clOfto8U6vYiz4yd5oKu39rRSVOe1zRu0g==}
2459 |+    engines: {node: '>=18'}
2460 |+    peerDependencies:
2461 |+      eslint: ^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0-0 || ^9.0.0 || ^10.0.0
2462 |+
2463 |+  eslint-scope@9.1.2:
2464 |+    resolution: {integrity: sha512-xS90H51cKw0jltxmvmHy2Iai1LIqrfbw57b79w/J7MfvDfkIkFZ+kj6zC3BjtUwh150HsSSdxXZcsuv72miDFQ==}
2465 |+    engines: {node: ^20.19.0 || ^22.13.0 || >=24}
2466 |+
2467 |+  eslint-visitor-keys@3.4.3:
2468 |+    resolution: {integrity: sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==}
2469 |+    engines: {node: ^12.22.0 || ^14.17.0 || >=16.0.0}
2470 |+
2471 |+  eslint-visitor-keys@5.0.1:
2472 |+    resolution: {integrity: sha512-tD40eHxA35h0PEIZNeIjkHoDR4YjjJp34biM0mDvplBe//mB+IHCqHDGV7pxF+7MklTvighcCPPZC7ynWyjdTA==}
2473 |+    engines: {node: ^20.19.0 || ^22.13.0 || >=24}
2474 |+
2475 |+  eslint@10.2.1:
2476 |+    resolution: {integrity: sha512-wiyGaKsDgqXvF40P8mDwiUp/KQjE1FdrIEJsM8PZ3XCiniTMXS3OHWWUe5FI5agoCnr8x4xPrTDZuxsBlNHl+Q==}
2477 |+    engines: {node: ^20.19.0 || ^22.13.0 || >=24}
2478 |+    hasBin: true
2479 |+    peerDependencies:
2480 |+      jiti: '*'
2481 |+    peerDependenciesMeta:
2482 |+      jiti:
2483 |+        optional: true
2484 |+
2485 |+  espree@11.2.0:
2486 |+    resolution: {integrity: sha512-7p3DrVEIopW1B1avAGLuCSh1jubc01H2JHc8B4qqGblmg5gI9yumBgACjWo4JlIc04ufug4xJ3SQI8HkS/Rgzw==}
2487 |+    engines: {node: ^20.19.0 || ^22.13.0 || >=24}
2488 |+
2489 |   esprima@4.0.1:
2490 |     resolution: {integrity: sha512-eGuFFw7Upda+g4p+QHvnW0RyTX/SVeJBDM/gCtMARO0cLuT2HcEKnTPvhjV6aGeqrCB/sbNop0Kszm0jsaWU4A==}
2491 |     engines: {node: '>=4'}
2492 |     hasBin: true
2493 | 
2494 |+  esquery@1.7.0:
2495 |+    resolution: {integrity: sha512-Ap6G0WQwcU/LHsvLwON1fAQX9Zp0A2Y6Y/cJBl9r/JbW90Zyg4/zbG6zzKa2OTALELarYHmKu0GhpM5EO+7T0g==}
2496 |+    engines: {node: '>=0.10'}
2497 |+
2498 |+  esrecurse@4.3.0:
2499 |+    resolution: {integrity: sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag==}
2500 |+    engines: {node: '>=4.0'}
2501 |+
2502 |+  estraverse@5.3.0:
2503 |+    resolution: {integrity: sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA==}
2504 |+    engines: {node: '>=4.0'}
2505 |+
2506 |   estree-util-is-identifier-name@3.0.0:
2507 |     resolution: {integrity: sha512-hFtqIDZTIUZ9BXLb8y4pYGyk6+wekIivNVTcmvk8NoOh+VeRn5y6cEHzbURrWbfp1fIqdVipilzj+lfaadNZmg==}
2508 | 
2509 |+  esutils@2.0.3:
2510 |+    resolution: {integrity: sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==}
2511 |+    engines: {node: '>=0.10.0'}
2512 |+
2513 |   etag@1.8.1:
2514 |     resolution: {integrity: sha512-aIL5Fx7mawVa300al2BnEE4iNvo1qETxLrPI/o05L7z6go7fCw1J6EQmbK4FmJ2AS7kgVF/KEZWufBfdClMcPg==}
2515 |     engines: {node: '>= 0.6'}
@@ -2094,6 +2557,12 @@ packages:
2557 |     resolution: {integrity: sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg==}
2558 |     engines: {node: '>=8.6.0'}
2559 | 
2560 |+  fast-json-stable-stringify@2.1.0:
2561 |+    resolution: {integrity: sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw==}
2562 |+
2563 |+  fast-levenshtein@2.0.6:
2564 |+    resolution: {integrity: sha512-DCXu6Ifhqcks7TZKY3Hxp3y6qphY5SJZmrWMDrKcERSOXWQdMhU9Ig/PYrzyw/ul9jOIyh0N4M0tbC5hodg8dw==}
2565 |+
2566 |   fast-string-truncated-width@3.0.3:
2567 |     resolution: {integrity: sha512-0jjjIEL6+0jag3l2XWWizO64/aZVtpiGE3t0Zgqxv0DPuxiMjvB3M24fCyhZUO4KomJQPj3LTSUnDP3GpdwC0g==}
2568 | 
@@ -2113,6 +2582,9 @@ packages:
2582 |     resolution: {integrity: sha512-CzbClwlXAuiRQAlUyfqPgvPoNKTckTPGfwZV4ZdAhVcP2lh9KUxJg2b5GkE7XbjKQ3YJnQ9z6D9ntLAlB+tP8g==}
2583 |     engines: {node: '>=0.8.0'}
2584 | 
2585 |+  fd-package-json@2.0.0:
2586 |+    resolution: {integrity: sha512-jKmm9YtsNXN789RS/0mSzOC1NUq9mkVd65vbSSVsKdjGvYXBuE4oWe2QOEoFeRmJg+lPuZxpmrfFclNhoRMneQ==}
2587 |+
2588 |   fdir@6.5.0:
2589 |     resolution: {integrity: sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==}
2590 |     engines: {node: '>=12.0.0'}
@@ -2130,6 +2602,10 @@ packages:
2602 |     resolution: {integrity: sha512-d+l3qxjSesT4V7v2fh+QnmFnUWv9lSpjarhShNTgBOfA0ttejbQUAlHLitbjkoRiDulW0OPoQPYIGhIC8ohejg==}
2603 |     engines: {node: '>=18'}
2604 | 
2605 |+  file-entry-cache@8.0.0:
2606 |+    resolution: {integrity: sha512-XXTUwCvisa5oacNGRP9SfNtYBNAMi+RPwBFmblZEF7N7swHYQS6/Zfk7SRwx4D5j3CH211YNRco1DEMNVfZCnQ==}
2607 |+    engines: {node: '>=16.0.0'}
2608 |+
2609 |   fill-range@7.1.1:
2610 |     resolution: {integrity: sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==}
2611 |     engines: {node: '>=8'}
@@ -2142,9 +2618,20 @@ packages:
2618 |     resolution: {integrity: sha512-S8KoZgRZN+a5rNwqTxlZZePjT/4cnm0ROV70LedRHZ0p8u9fRID0hJUZQpkKLzro8LfmC8sx23bY6tVNxv8pQA==}
2619 |     engines: {node: '>= 18.0.0'}
2620 | 
2621 |+  find-up@5.0.0:
2622 |+    resolution: {integrity: sha512-78/PXT1wlLLDgTzDs7sjq9hzz0vXD+zn+7wypEe4fXQxCmdmqfGsEPQxmiCSQI3ajFV91bVSsvNtrJRiW6nGng==}
2623 |+    engines: {node: '>=10'}
2624 |+
2625 |   firebase@12.12.1:
2626 |     resolution: {integrity: sha512-ee7xA+bTJLfjB9BP/8FQr3EkxmpAAGc1lNc5QkWgTDpUw24HYXFPm7FEWRdLtGnygxIdYpFmepSc5VjkI6NHhw==}
2627 | 
2628 |+  flat-cache@4.0.1:
2629 |+    resolution: {integrity: sha512-f7ccFPK3SXFHpx15UIGyRJ/FJQctuKZ0zVuN3frBo4HnK3cay9VEW0R6yPYFHC0AgqhukPzKjq22t5DmAyqGyw==}
2630 |+    engines: {node: '>=16'}
2631 |+
2632 |+  flatted@3.4.2:
2633 |+    resolution: {integrity: sha512-PjDse7RzhcPkIJwy5t7KPWQSZ9cAbzQXcafsetQoD7sOJRQlGikNbx7yZp2OotDnJyrDcbyRq3Ttb18iYOqkxA==}
2634 |+
2635 |   follow-redirects@1.16.0:
2636 |     resolution: {integrity: sha512-y5rN/uOsadFT/JfYwhxRS5R7Qce+g3zG97+JrtFZlC9klX/W5hD7iiLzScI4nZqUS7DNUdhPgw4xI8W2LuXlUw==}
2637 |     engines: {node: '>=4.0'}
@@ -2158,6 +2645,11 @@ packages:
2645 |     resolution: {integrity: sha512-8RipRLol37bNs2bhoV67fiTEvdTrbMUYcFTiy3+wuuOnUog2QBHCZWXDRijWQfAkhBj2Uf5UnVaiWwA5vdd82w==}
2646 |     engines: {node: '>= 6'}
2647 | 
2648 |+  formatly@0.3.0:
2649 |+    resolution: {integrity: sha512-9XNj/o4wrRFyhSMJOvsuyMwy8aUfBaZ1VrqHVfohyXf0Sw0e+yfKG+xZaY3arGCOMdwFsqObtzVOc1gU9KiT9w==}
2650 |+    engines: {node: '>=18.3.0'}
2651 |+    hasBin: true
2652 |+
2653 |   formdata-polyfill@4.0.10:
2654 |     resolution: {integrity: sha512-buewHzMvYL29jdeQTVILecSaZKnt/RJWjoZCF5OW60Z67/GmSLBkOFM7qh1PI3zFNtJbaZL5eQu1vLfazOwj4g==}
2655 |     engines: {node: '>=12.20.0'}
@@ -2258,6 +2750,10 @@ packages:
2750 |     resolution: {integrity: sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==}
2751 |     engines: {node: '>= 6'}
2752 | 
2753 |+  glob-parent@6.0.2:
2754 |+    resolution: {integrity: sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==}
2755 |+    engines: {node: '>=10.13.0'}
2756 |+
2757 |   google-auth-library@10.6.2:
2758 |     resolution: {integrity: sha512-e27Z6EThmVNNvtYASwQxose/G57rkRuaRbQyxM2bvYLLX/GqWZ5chWq2EBoUchJbCc57eC9ArzO5wMsEmWftCw==}
2759 |     engines: {node: '>=18'}
@@ -2298,6 +2794,12 @@ packages:
2794 |   headers-polyfill@5.0.1:
2795 |     resolution: {integrity: sha512-1TJ6Fih/b8h5TIcv+1+Hw0PDQWJTKDKzFZzcKOiW1wJza3XoAQlkCuXLbymPYB8+ZQyw8mHvdw560e8zVFIWyA==}
2796 | 
2797 |+  hermes-estree@0.25.1:
2798 |+    resolution: {integrity: sha512-0wUoCcLp+5Ev5pDW2OriHC2MJCbwLwuRx+gAqMTOkGKJJiBCLjtrvy4PWUGn6MIVefecRpzoOZ/UV6iGdOr+Cw==}
2799 |+
2800 |+  hermes-parser@0.25.1:
2801 |+    resolution: {integrity: sha512-6pEjquH3rqaI6cYAXYPcz9MS4rY6R4ngRgrgfDshRptUZIc3lw0MCIJIGDj9++mfySOuPTHB4nrSW99BCvOPIA==}
2802 |+
2803 |   hono@4.12.14:
2804 |     resolution: {integrity: sha512-am5zfg3yu6sqn5yjKBNqhnTX7Cv+m00ox+7jbaKkrLMRJ4rAdldd1xPd/JzbBWspqaQv6RSTrgFN95EsfhC+7w==}
2805 |     engines: {node: '>=16.9.0'}
@@ -2342,6 +2844,10 @@ packages:
2844 |     resolution: {integrity: sha512-hsBTNUqQTDwkWtcdYI2i06Y/nUBEsNEDJKjWdigLvegy8kDuJAS8uRlpkkcQpyEXL0Z/pjDy5HBmMjRCJ2gq+g==}
2845 |     engines: {node: '>= 4'}
2846 | 
2847 |+  ignore@7.0.5:
2848 |+    resolution: {integrity: sha512-Hs59xBNfUIunMFgWAbGX5cq6893IbWg4KnrjbYwX3tx0ztorVgTDA6B2sxf8ejHJ4wz8BqGUMYlnzNBer5NvGg==}
2849 |+    engines: {node: '>= 4'}
2850 |+
2851 |   immer@10.2.0:
2852 |     resolution: {integrity: sha512-d/+XTN3zfODyjr89gM3mPq1WNX2B8pYsu7eORitdwyA2sBubnTl3laYlBk4sXY5FUa5qTZGBDPJICVbvqzjlbw==}
2853 | 
@@ -2352,6 +2858,10 @@ packages:
2858 |     resolution: {integrity: sha512-TR3KfrTZTYLPB6jUjfx6MF9WcWrHL9su5TObK4ZkYgBdWKPOFoSoQIdEuTuR82pmtxH2spWG9h6etwfr1pLBqQ==}
2859 |     engines: {node: '>=6'}
2860 | 
2861 |+  imurmurhash@0.1.4:
2862 |+    resolution: {integrity: sha512-JmXMZ6wuvDmLiHEml9ykzqO6lwFbof0GG4IkcGaENdCRDDmMVnny7s5HsIgHCbaq0w2MyPhDqkhTUgS2LU2PHA==}
2863 |+    engines: {node: '>=0.8.19'}
2864 |+
2865 |   inherits@2.0.4:
2866 |     resolution: {integrity: sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==}
2867 | 
@@ -2493,15 +3003,24 @@ packages:
3003 |   json-bigint@1.0.0:
3004 |     resolution: {integrity: sha512-SiPv/8VpZuWbvLSMtTDU8hEfrZWg/mH/nV/b4o0CYbSxu1UIQPLdwKOCIyLQX+VIPO5vrLX3i8qtqFyhdPSUSQ==}
3005 | 
3006 |+  json-buffer@3.0.1:
3007 |+    resolution: {integrity: sha512-4bV5BfR2mqfQTJm+V5tPPdf+ZpuhiIvTuAB5g8kcrXOZpTT/QwwVRWBywX1ozr6lEuPdbHxwaJlm9G6mI2sfSQ==}
3008 |+
3009 |   json-parse-even-better-errors@2.3.1:
3010 |     resolution: {integrity: sha512-xyFwyhro/JEof6Ghe2iz2NcXoj2sloNsWr/XsERDK/oiPCfaNhl5ONfp+jQdAZRQQ0IJWNzH9zIZF7li91kh2w==}
3011 | 
3012 |+  json-schema-traverse@0.4.1:
3013 |+    resolution: {integrity: sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==}
3014 |+
3015 |   json-schema-traverse@1.0.0:
3016 |     resolution: {integrity: sha512-NM8/P9n3XjXhIZn1lLhkFaACTOURQXjWhV4BA/RnOv8xvgqtqpAX9IO4mRQxSx1Rlo4tqzeqb0sOlruaOy3dug==}
3017 | 
3018 |   json-schema-typed@8.0.2:
3019 |     resolution: {integrity: sha512-fQhoXdcvc3V28x7C7BMs4P5+kNlgUURe2jmUT1T//oBRMDrqy1QPelJimwZGo7Hg9VPV3EQV5Bnq4hbFy2vetA==}
3020 | 
3021 |+  json-stable-stringify-without-jsonify@1.0.1:
3022 |+    resolution: {integrity: sha512-Bdboy+l7tA3OGW6FjyFHWkP5LuByj1Tk33Ljyq0axyzdk9//JSi2u3fP1QSmd1KNwq6VOKYGlAu87CisVir6Pw==}
3023 |+
3024 |   json5@2.2.3:
3025 |     resolution: {integrity: sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==}
3026 |     engines: {node: '>=6'}
@@ -2516,6 +3035,9 @@ packages:
3035 |   jws@4.0.1:
3036 |     resolution: {integrity: sha512-EKI/M/yqPncGUUh44xz0PxSidXFr/+r0pA70+gIYhjv+et7yxM+s29Y+VGDkovRofQem0fs7Uvf4+YmAdyRduA==}
3037 | 
3038 |+  keyv@4.5.4:
3039 |+    resolution: {integrity: sha512-oxVHkHR/EJf2CNXnWxRLW6mg7JyCCUcG0DtEGmL2ctUo1PNTin1PUil+r/+4r5MpVgC/fn1kjsx7mjSujKqIpw==}
3040 |+
3041 |   kleur@3.0.3:
3042 |     resolution: {integrity: sha512-eTIzlVOSUR+JxdDFepEYcBMtZ9Qqdef+rnzWdRZuMbOywu5tO2w2N7rqjoANZ5k9vywhL6Br1VRjUIgTQx4E8w==}
3043 |     engines: {node: '>=6'}
@@ -2524,6 +3046,15 @@ packages:
3046 |     resolution: {integrity: sha512-o+NO+8WrRiQEE4/7nwRJhN1HWpVmJm511pBHUxPLtp0BUISzlBplORYSmTclCnJvQq2tKu/sgl3xVpkc7ZWuQQ==}
3047 |     engines: {node: '>=6'}
3048 | 
3049 |+  knip@6.6.1:
3050 |+    resolution: {integrity: sha512-SOmqh25vuAfdynGoDr/kMCxIuD5+PkMIfMSGQeMqfrxwuPTANvJKcVttLgGZjjkATALqukSe/hhDVqcwNkf92g==}
3051 |+    engines: {node: ^20.19.0 || >=22.12.0}
3052 |+    hasBin: true
3053 |+
3054 |+  levn@0.4.1:
3055 |+    resolution: {integrity: sha512-+bT2uH4E5LGE7h/n3evcS/sQlJXCpIp6ym8OWJ5eV6+67Dsql/LaaT7qJBAt2rzfoa/5QBGBhxDix1dMt2kQKQ==}
3056 |+    engines: {node: '>= 0.8.0'}
3057 |+
3058 |   lightningcss-android-arm64@1.32.0:
3059 |     resolution: {integrity: sha512-YK7/ClTt4kAK0vo6w3X+Pnm0D2cf2vPHbhOXdoNti1Ga0al1P4TBZhwjATvjNwLEBCnKvjJc2jQgHXH0NEwlAg==}
3060 |     engines: {node: '>= 12.0.0'}
@@ -2601,6 +3132,10 @@ packages:
3132 |   lines-and-columns@1.2.4:
3133 |     resolution: {integrity: sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==}
3134 | 
3135 |+  locate-path@6.0.0:
3136 |+    resolution: {integrity: sha512-iPZK6eYjbxRu3uB4/WZ3EsEIMJFMqAoopl3R+zuq0UjcAm/MO6KCweDgPfP3elTztoKP3KtnVHxTn2NHBSDVUw==}
3137 |+    engines: {node: '>=10'}
3138 |+
3139 |   lodash.camelcase@4.3.0:
3140 |     resolution: {integrity: sha512-TwuEnCnxbc3rAvhf/LbG7tJUDzhqXyFnv3dtzLOPgCG/hODL7WFnsbwktkD7yUV0RrreP/l1PALq/YSg6VvjlA==}
3141 | 
@@ -2834,6 +3369,9 @@ packages:
3369 |     engines: {node: ^10 || ^12 || ^13.7 || ^14 || >=15.0.1}
3370 |     hasBin: true
3371 | 
3372 |+  natural-compare@1.4.0:
3373 |+    resolution: {integrity: sha512-OWND8ei3VtNC9h7V60qff3SVobHr996CTwgxubgyQYEpg290h9J0buyECNNJexkFm5sOajh5G116RYA1c8ZMSw==}
3374 |+
3375 |   negotiator@0.6.3:
3376 |     resolution: {integrity: sha512-+EUsqGPLsM+j/zdChZjsnX51g4XrHFOIXwfnCVPGlQk/k5giakcKsuxCObBRu6DSm9opw/O6slWbJdghQM4bBg==}
3377 |     engines: {node: '>= 0.6'}
@@ -2893,13 +3431,32 @@ packages:
3431 |     resolution: {integrity: sha512-smsWv2LzFjP03xmvFoJ331ss6h+jixfA4UUV/Bsiyuu4YJPfN+FIQGOIiv4w9/+MoHkfkJ22UIaQWRVFRfH6Vw==}
3432 |     engines: {node: '>=20'}
3433 | 
3434 |+  optionator@0.9.4:
3435 |+    resolution: {integrity: sha512-6IpQ7mKUxRcZNLIObR0hz7lxsapSSIYNZJwXPGeF0mTVqGKFIXj1DQcMoT22S3ROcLyY/rz0PWaWZ9ayWmad9g==}
3436 |+    engines: {node: '>= 0.8.0'}
3437 |+
3438 |   ora@8.2.0:
3439 |     resolution: {integrity: sha512-weP+BZ8MVNnlCm8c0Qdc1WSWq4Qn7I+9CJGm7Qali6g44e/PUzbjNqJX5NJ9ljlNMosfJvg1fKEGILklK9cwnw==}
3440 |     engines: {node: '>=18'}
3441 | 
3442 |   outvariant@1.4.3:
3443 |     resolution: {integrity: sha512-+Sl2UErvtsoajRDKCE5/dBz4DIvHXQQnAxtQTF04OJxY0+DyZXSo5P5Bb7XYWOh81syohlYL24hbDwxedPUJCA==}
3444 | 
3445 |+  oxc-parser@0.126.0:
3446 |+    resolution: {integrity: sha512-FktCvLby/mOHyuijZt22+nOt10dS24gGUZE3XwIbUg7Kf4+rer3/5T7RgwzazlNuVsCjPloZ3p8E+4ONT3A8Kw==}
3447 |+    engines: {node: ^20.19.0 || >=22.12.0}
3448 |+
3449 |+  oxc-resolver@11.19.1:
3450 |+    resolution: {integrity: sha512-qE/CIg/spwrTBFt5aKmwe3ifeDdLfA2NESN30E42X/lII5ClF8V7Wt6WIJhcGZjp0/Q+nQ+9vgxGk//xZNX2hg==}
3451 |+
3452 |+  p-limit@3.1.0:
3453 |+    resolution: {integrity: sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ==}
3454 |+    engines: {node: '>=10'}
3455 |+
3456 |+  p-locate@5.0.0:
3457 |+    resolution: {integrity: sha512-LaNjtRWUBY++zB5nE/NwcaoMylSPk+S+ZHNB1TzdbMJMny6dynpAGt7X/tl/QYq3TIeE6nxHppbo2LGymrG5Pw==}
3458 |+    engines: {node: '>=10'}
3459 |+
3460 |   p-retry@4.6.2:
3461 |     resolution: {integrity: sha512-312Id396EbJdvRONlngUx0NydfrIQ5lsYu0znKVUzVvArzEIt08V1qhtyESbGVd1FGX7UKtiFp5uwKZdM8wIuQ==}
3462 |     engines: {node: '>=8'}
@@ -2926,6 +3483,10 @@ packages:
3483 |   path-browserify@1.0.1:
3484 |     resolution: {integrity: sha512-b7uo2UCUOYZcnF/3ID0lulOJi/bafxa1xPe7ZPsammBSpjSWQkjNxlt635YGS2MiR9GjvuXCtz2emr3jbsz98g==}
3485 | 
3486 |+  path-exists@4.0.0:
3487 |+    resolution: {integrity: sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==}
3488 |+    engines: {node: '>=8'}
3489 |+
3490 |   path-key@3.1.1:
3491 |     resolution: {integrity: sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==}
3492 |     engines: {node: '>=8'}
@@ -2990,6 +3551,10 @@ packages:
3551 |     resolution: {integrity: sha512-dM0jVuXJPsDN6DvRpea484tCUaMiXWjuCn++HGTqUWzGDjv5tZkEZldAJ/UMlqRYGFrD/etByo4/xOuC/snX2A==}
3552 |     engines: {node: '>=20'}
3553 | 
3554 |+  prelude-ls@1.2.1:
3555 |+    resolution: {integrity: sha512-vkcDPrRZo1QZLbn5RLGPpg/WmIQ65qoWWhcGKf/b5eplkkarX0m9z8ppCat4mlOqUsWpyNuYgO3VRyrYHSzX5g==}
3556 |+    engines: {node: '>= 0.8.0'}
3557 |+
3558 |   pretty-ms@9.3.0:
3559 |     resolution: {integrity: sha512-gjVS5hOP+M3wMm5nmNOucbIrqudzs9v/57bWRHQWLYklXqoXKrVfYW2W9+glfGsqtPgpiz5WwyEEB+ksXIx3gQ==}
3560 |     engines: {node: '>=18'}
@@ -3013,6 +3578,10 @@ packages:
3578 |     resolution: {integrity: sha512-cJ+oHTW1VAEa8cJslgmUZrc+sjRKgAKl3Zyse6+PV38hZe/V6Z14TbCuXcan9F9ghlz4QrFr2c92TNF82UkYHA==}
3579 |     engines: {node: '>=10'}
3580 | 
3581 |+  punycode@2.3.1:
3582 |+    resolution: {integrity: sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==}
3583 |+    engines: {node: '>=6'}
3584 |+
3585 |   qs@6.14.2:
3586 |     resolution: {integrity: sha512-V/yCWTTF7VJ9hIh18Ugr2zhJMP01MY7c5kh4J870L7imm6/DIzBsNLTXzMwUA3yZ5b/KBqLx8Kp3uRvd7xSe3Q==}
3587 |     engines: {node: '>=0.6'}
@@ -3274,6 +3843,10 @@ packages:
3843 |   sisteransi@1.0.5:
3844 |     resolution: {integrity: sha512-bLGGlR1QxBcynn2d5YmDX4MGjlZvy2MRBDRNHLJ8VI6l6+9FUiyTFNJ0IveOSP0bcXgVDPRcfGqA0pjaqUpfVg==}
3845 | 
3846 |+  smol-toml@1.6.1:
3847 |+    resolution: {integrity: sha512-dWUG8F5sIIARXih1DTaQAX4SsiTXhInKf1buxdY9DIg4ZYPZK5nGM1VRIYmEbDbsHt7USo99xSLFu5Q1IqTmsg==}
3848 |+    engines: {node: '>= 18'}
3849 |+
3850 |   source-map-js@1.2.1:
3851 |     resolution: {integrity: sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==}
3852 |     engines: {node: '>=0.10.0'}
@@ -3335,6 +3908,10 @@ packages:
3908 |     resolution: {integrity: sha512-aulFJcD6YK8V1G7iRB5tigAP4TsHBZZrOV8pjV++zdUwmeV8uzbY7yn6h9MswN62adStNZFuCIx4haBnRuMDaw==}
3909 |     engines: {node: '>=18'}
3910 | 
3911 |+  strip-json-comments@5.0.3:
3912 |+    resolution: {integrity: sha512-1tB5mhVo7U+ETBKNf92xT4hrQa3pm0MZ0PQvuDnWgAAGHDsfp4lPSpiS6psrSiet87wyGPh9ft6wmhOMQ0hDiw==}
3913 |+    engines: {node: '>=14.16'}
3914 |+
3915 |   style-to-js@1.1.21:
3916 |     resolution: {integrity: sha512-RjQetxJrrUJLQPHbLku6U/ocGtzyjbJMP9lCNK7Ag0CNh690nSH8woqWH9u16nMjYBAok+i7JO1NP2pOy8IsPQ==}
3917 | 
@@ -3387,6 +3964,12 @@ packages:
3964 |   trough@2.2.0:
3965 |     resolution: {integrity: sha512-tmMpK00BjZiUyVyvrBK7knerNgmgvcV/KLVyuma/SC+TQN167GrMRciANTz09+k3zW8L8t60jWO1GpfkZdjTaw==}
3966 | 
3967 |+  ts-api-utils@2.5.0:
3968 |+    resolution: {integrity: sha512-OJ/ibxhPlqrMM0UiNHJ/0CKQkoKF243/AEmplt3qpRgkW8VG7IfOS41h7V8TjITqdByHzrjcS/2si+y4lIh8NA==}
3969 |+    engines: {node: '>=18.12'}
3970 |+    peerDependencies:
3971 |+      typescript: '>=4.8.4'
3972 |+
3973 |   ts-morph@26.0.0:
3974 |     resolution: {integrity: sha512-ztMO++owQnz8c/gIENcM9XfCEzgoGphTv+nKpYNM1bgsdOVC/jRZuEBf6N+mLLDNg68Kl+GgUZfOySaRiG1/Ug==}
3975 | 
@@ -3405,6 +3988,10 @@ packages:
3988 |   tw-animate-css@1.4.0:
3989 |     resolution: {integrity: sha512-7bziOlRqH0hJx80h/3mbicLW7o8qLsH5+RaLR2t+OHM3D0JlWGODQKQ4cxbK7WlvmUxpcj6Kgu6EKqjrGFe3QQ==}
3990 | 
3991 |+  type-check@0.4.0:
3992 |+    resolution: {integrity: sha512-XleUoc9uwGXqjWwXaUTZAmzMcFZ5858QA2vvx1Ur5xIcixXIP+8LnFDgRplU30us6teqdlskFfu+ae4K79Ooew==}
3993 |+    engines: {node: '>= 0.8.0'}
3994 |+
3995 |   type-fest@5.6.0:
3996 |     resolution: {integrity: sha512-8ZiHFm91orbSAe2PSAiSVBVko18pbhbiB3U9GglSzF/zCGkR+rxpHx6sEMCUm4kxY4LjDIUGgCfUMtwfZfjfUA==}
3997 |     engines: {node: '>=20'}
@@ -3417,11 +4004,22 @@ packages:
4004 |     resolution: {integrity: sha512-OZs6gsjF4vMp32qrCbiVSkrFmXtG/AZhY3t0iAMrMBiAZyV9oALtXO8hsrHbMXF9x6L3grlFuwW2oAz7cav+Gw==}
4005 |     engines: {node: '>= 0.6'}
4006 | 
4007 |+  typescript-eslint@8.59.0:
4008 |+    resolution: {integrity: sha512-BU3ONW9X+v90EcCH9ZS6LMackcVtxRLlI3XrYyqZIwVSHIk7Qf7bFw1z0M9Q0IUxhTMZCf8piY9hTYaNEIASrw==}
4009 |+    engines: {node: ^18.18.0 || ^20.9.0 || >=21.1.0}
4010 |+    peerDependencies:
4011 |+      eslint: ^8.57.0 || ^9.0.0 || ^10.0.0
4012 |+      typescript: '>=4.8.4 <6.1.0'
4013 |+
4014 |   typescript@5.8.3:
4015 |     resolution: {integrity: sha512-p1diW6TqL9L07nNxvRMM7hMMw4c5XOo/1ibL4aAIGmSAt9slTE1Xgw5KWuof2uTOvCg9BY7ZRi+GaF+7sfgPeQ==}
4016 |     engines: {node: '>=14.17'}
4017 |     hasBin: true
4018 | 
4019 |+  unbash@2.2.0:
4020 |+    resolution: {integrity: sha512-X2wH19RAPZE3+ldGicOkoj/SIA83OIxcJ6Cuaw23hf8Xc6fQpvZXY0SftE2JgS0QhYLUG4uwodSI3R53keyh7w==}
4021 |+    engines: {node: '>=14'}
4022 |+
4023 |   undici-types@6.21.0:
4024 |     resolution: {integrity: sha512-iwDZqg0QAGrg9Rav5H4n0M64c3mkR59cJ6wQp+7C4nI0gsmExaedaYLNO44eT4AtBBwjbTiGPMlt2Md0T9H9JQ==}
4025 | 
@@ -3464,6 +4062,9 @@ packages:
4062 |     peerDependencies:
4063 |       browserslist: '>= 4.21.0'
4064 | 
4065 |+  uri-js@4.4.1:
4066 |+    resolution: {integrity: sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==}
4067 |+
4068 |   use-sync-external-store@1.6.0:
4069 |     resolution: {integrity: sha512-Pp6GSwGP/NrPIrxVFAIkOQeyw8lFenOHijQWkUTrDvrF4ALqylP2C/KCkeS9dpUM3KvYRQhna5vt7IL95+ZQ9w==}
4070 |     peerDependencies:
@@ -3554,6 +4155,10 @@ packages:
4155 |     engines: {node: '>=20.0.0'}
4156 |     hasBin: true
4157 | 
4158 |+  walk-up-path@4.0.0:
4159 |+    resolution: {integrity: sha512-3hu+tD8YzSLGuFYtPRb48vdhKMi0KQV5sn+uWr8+7dMEq/2G/dtLrdDinkLjqq5TIbIBjYJ4Ax/n3YiaW7QM8A==}
4160 |+    engines: {node: 20 || >=22}
4161 |+
4162 |   web-streams-polyfill@3.3.3:
4163 |     resolution: {integrity: sha512-d2JWLCivmZYTSIoge9MsgFCZrt571BikcWGYkjC1khllbTeDlGqZ2D8vD8E/lJa8WGWbb7Plm8/XJYV7IJHZZw==}
4164 |     engines: {node: '>= 8'}
@@ -3579,6 +4184,10 @@ packages:
4184 |     engines: {node: ^16.13.0 || >=18.0.0}
4185 |     hasBin: true
4186 | 
4187 |+  word-wrap@1.2.5:
4188 |+    resolution: {integrity: sha512-BN22B5eaMMI9UMtjrGd5g5eCYPpCPDUy0FJXbYsaT5zYxjFOckS53SQDE3pWkVoWpHXVb3BrYcEN4Twa55B5cA==}
4189 |+    engines: {node: '>=0.10.0'}
4190 |+
4191 |   wrap-ansi@7.0.0:
4192 |     resolution: {integrity: sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==}
4193 |     engines: {node: '>=10'}
@@ -3613,6 +4222,11 @@ packages:
4222 |   yallist@3.1.1:
4223 |     resolution: {integrity: sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==}
4224 | 
4225 |+  yaml@2.8.3:
4226 |+    resolution: {integrity: sha512-AvbaCLOO2Otw/lW5bmh9d/WEdcDFdQp2Z2ZUH3pX9U2ihyUY0nvLv7J6TrWowklRGPYbB/IuIMfYgxaCPg5Bpg==}
4227 |+    engines: {node: '>= 14.6'}
4228 |+    hasBin: true
4229 |+
4230 |   yargs-parser@21.1.1:
4231 |     resolution: {integrity: sha512-tVpsJW7DdjecAiFpbIB1e3qxIQsE6NoPc5/eTdrbbIC4h0LVsWhnoa3g+m2HclBIujHzsxZ4VJVA+GUuc2/LBw==}
4232 |     engines: {node: '>=12'}
@@ -3629,6 +4243,10 @@ packages:
4243 |     resolution: {integrity: sha512-4UEqdc2RYGHZc7Doyqkrqiln3p9X2DZVxaGbwhn2pi7MrRagKaOcIKe8L3OxYcbhXLgLFUS3zAYuQjKBQgmuNg==}
4244 |     engines: {node: ^20.19.0 || ^22.12.0 || >=23}
4245 | 
4246 |+  yocto-queue@0.1.0:
4247 |+    resolution: {integrity: sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==}
4248 |+    engines: {node: '>=10'}
4249 |+
4250 |   yocto-spinner@1.1.0:
4251 |     resolution: {integrity: sha512-/BY0AUXnS7IKO354uLLA2eRcWiqDifEbd6unXCsOxkFDAkhgUL3PH9X2bFoaU0YchnDXsF+iKleeTLJGckbXfA==}
4252 |     engines: {node: '>=18.19'}
@@ -3642,9 +4260,18 @@ packages:
4260 |     peerDependencies:
4261 |       zod: ^3.25.28 || ^4
4262 | 
4263 |+  zod-validation-error@4.0.2:
4264 |+    resolution: {integrity: sha512-Q6/nZLe6jxuU80qb/4uJ4t5v2VEZ44lzQjPDhYJNztRQ4wyWc6VF3D3Kb/fAuPetZQnhS3hnajCf9CsWesghLQ==}
4265 |+    engines: {node: '>=18.0.0'}
4266 |+    peerDependencies:
4267 |+      zod: ^3.25.0 || ^4.0.0
4268 |+
4269 |   zod@3.25.76:
4270 |     resolution: {integrity: sha512-gzUt/qt81nXsFGKIFcC3YnfEAx5NkunCfnDlvuBSSFS02bcXu4Lmea0AFIUwbLWxWPx3d9p8S5QoaujKcNQxcQ==}
4271 | 
4272 |+  zod@4.3.6:
4273 |+    resolution: {integrity: sha512-rftlrkhHZOcjDwkGlnUtZZkvaPHCsDATp4pGpuOOMDaTdDDXF91wuVDJoWoPsKX/3YPQ5fHuF3STjcYyKr+Qhg==}
4274 |+
4275 |   zwitch@2.0.4:
4276 |     resolution: {integrity: sha512-bXE4cR/kVZhKZX/RjPEflHaKVhUVl85noU3v6b8apfQEc1x4A+zBxjZ4lN8LqGd6WZ3dl98pY4o717VFmoPp+A==}
4277 | 
@@ -3892,11 +4519,27 @@ snapshots:
4519 |     dependencies:
4520 |       '@noble/ciphers': 1.3.0
4521 | 
4522 |+  '@emnapi/core@1.9.2':
4523 |+    dependencies:
4524 |+      '@emnapi/wasi-threads': 1.2.1
4525 |+      tslib: 2.8.1
4526 |+    optional: true
4527 |+
4528 |   '@emnapi/runtime@1.10.0':
4529 |     dependencies:
4530 |       tslib: 2.8.1
4531 |     optional: true
4532 | 
4533 |+  '@emnapi/runtime@1.9.2':
4534 |+    dependencies:
4535 |+      tslib: 2.8.1
4536 |+    optional: true
4537 |+
4538 |+  '@emnapi/wasi-threads@1.2.1':
4539 |+    dependencies:
4540 |+      tslib: 2.8.1
4541 |+    optional: true
4542 |+
4543 |   '@esbuild/aix-ppc64@0.25.12':
4544 |     optional: true
4545 | 
@@ -4053,6 +4696,40 @@ snapshots:
4696 |   '@esbuild/win32-x64@0.27.7':
4697 |     optional: true
4698 | 
4699 |+  '@eslint-community/eslint-utils@4.9.1(eslint@10.2.1(jiti@2.6.1))':
4700 |+    dependencies:
4701 |+      eslint: 10.2.1(jiti@2.6.1)
4702 |+      eslint-visitor-keys: 3.4.3
4703 |+
4704 |+  '@eslint-community/regexpp@4.12.2': {}
4705 |+
4706 |+  '@eslint/config-array@0.23.5':
4707 |+    dependencies:
4708 |+      '@eslint/object-schema': 3.0.5
4709 |+      debug: 4.4.3
4710 |+      minimatch: 10.2.5
4711 |+    transitivePeerDependencies:
4712 |+      - supports-color
4713 |+
4714 |+  '@eslint/config-helpers@0.5.5':
4715 |+    dependencies:
4716 |+      '@eslint/core': 1.2.1
4717 |+
4718 |+  '@eslint/core@1.2.1':
4719 |+    dependencies:
4720 |+      '@types/json-schema': 7.0.15
4721 |+
4722 |+  '@eslint/js@10.0.1(eslint@10.2.1(jiti@2.6.1))':
4723 |+    optionalDependencies:
4724 |+      eslint: 10.2.1(jiti@2.6.1)
4725 |+
4726 |+  '@eslint/object-schema@3.0.5': {}
4727 |+
4728 |+  '@eslint/plugin-kit@0.7.1':
4729 |+    dependencies:
4730 |+      '@eslint/core': 1.2.1
4731 |+      levn: 0.4.1
4732 |+
4733 |   '@firebase/ai@2.11.1(@firebase/app-types@0.9.4)(@firebase/app@0.14.11)':
4734 |     dependencies:
4735 |       '@firebase/app': 0.14.11
@@ -4437,6 +5114,22 @@ snapshots:
5114 |     dependencies:
5115 |       hono: 4.12.14
5116 | 
5117 |+  '@humanfs/core@0.19.2':
5118 |+    dependencies:
5119 |+      '@humanfs/types': 0.15.0
5120 |+
5121 |+  '@humanfs/node@0.16.8':
5122 |+    dependencies:
5123 |+      '@humanfs/core': 0.19.2
5124 |+      '@humanfs/types': 0.15.0
5125 |+      '@humanwhocodes/retry': 0.4.3
5126 |+
5127 |+  '@humanfs/types@0.15.0': {}
5128 |+
5129 |+  '@humanwhocodes/module-importer@1.0.1': {}
5130 |+
5131 |+  '@humanwhocodes/retry@0.4.3': {}
5132 |+
5133 |   '@img/colour@1.1.0': {}
5134 | 
5135 |   '@img/sharp-darwin-arm64@0.34.5':
@@ -4565,81 +5258,226 @@ snapshots:
5258 |       '@jridgewell/sourcemap-codec': 1.5.5
5259 |       '@jridgewell/trace-mapping': 0.3.31
5260 | 
     |-  '@jridgewell/remapping@2.3.5':
     |-    dependencies:
     |-      '@jridgewell/gen-mapping': 0.3.13
     |-      '@jridgewell/trace-mapping': 0.3.31
5261 |+  '@jridgewell/remapping@2.3.5':
5262 |+    dependencies:
5263 |+      '@jridgewell/gen-mapping': 0.3.13
5264 |+      '@jridgewell/trace-mapping': 0.3.31
5265 |+
5266 |+  '@jridgewell/resolve-uri@3.1.2': {}
5267 |+
5268 |+  '@jridgewell/sourcemap-codec@1.5.5': {}
5269 |+
5270 |+  '@jridgewell/trace-mapping@0.3.31':
5271 |+    dependencies:
5272 |+      '@jridgewell/resolve-uri': 3.1.2
5273 |+      '@jridgewell/sourcemap-codec': 1.5.5
5274 |+
5275 |+  '@modelcontextprotocol/sdk@1.29.0(zod@3.25.76)':
5276 |+    dependencies:
5277 |+      '@hono/node-server': 1.19.14(hono@4.12.14)
5278 |+      ajv: 8.18.0
5279 |+      ajv-formats: 3.0.1(ajv@8.18.0)
5280 |+      content-type: 1.0.5
5281 |+      cors: 2.8.6
5282 |+      cross-spawn: 7.0.6
5283 |+      eventsource: 3.0.7
5284 |+      eventsource-parser: 3.0.8
5285 |+      express: 5.2.1
5286 |+      express-rate-limit: 8.3.2(express@5.2.1)
5287 |+      hono: 4.12.14
5288 |+      jose: 6.2.2
5289 |+      json-schema-typed: 8.0.2
5290 |+      pkce-challenge: 5.0.1
5291 |+      raw-body: 3.0.2
5292 |+      zod: 3.25.76
5293 |+      zod-to-json-schema: 3.25.2(zod@3.25.76)
5294 |+    transitivePeerDependencies:
5295 |+      - supports-color
5296 |+
5297 |+  '@mswjs/interceptors@0.41.4':
5298 |+    dependencies:
5299 |+      '@open-draft/deferred-promise': 2.2.0
5300 |+      '@open-draft/logger': 0.3.0
5301 |+      '@open-draft/until': 2.1.0
5302 |+      is-node-process: 1.2.0
5303 |+      outvariant: 1.4.3
5304 |+      strict-event-emitter: 0.5.1
5305 |+
5306 |+  '@napi-rs/wasm-runtime@1.1.4(@emnapi/core@1.9.2)(@emnapi/runtime@1.10.0)':
5307 |+    dependencies:
5308 |+      '@emnapi/core': 1.9.2
5309 |+      '@emnapi/runtime': 1.10.0
5310 |+      '@tybys/wasm-util': 0.10.1
5311 |+    optional: true
5312 |+
5313 |+  '@napi-rs/wasm-runtime@1.1.4(@emnapi/core@1.9.2)(@emnapi/runtime@1.9.2)':
5314 |+    dependencies:
5315 |+      '@emnapi/core': 1.9.2
5316 |+      '@emnapi/runtime': 1.9.2
5317 |+      '@tybys/wasm-util': 0.10.1
5318 |+    optional: true
5319 |+
5320 |+  '@noble/ciphers@1.3.0': {}
5321 |+
5322 |+  '@noble/curves@1.9.7':
5323 |+    dependencies:
5324 |+      '@noble/hashes': 1.8.0
5325 |+
5326 |+  '@noble/hashes@1.8.0': {}
5327 |+
5328 |+  '@nodelib/fs.scandir@2.1.5':
5329 |+    dependencies:
5330 |+      '@nodelib/fs.stat': 2.0.5
5331 |+      run-parallel: 1.2.0
5332 |+
5333 |+  '@nodelib/fs.stat@2.0.5': {}
5334 |+
5335 |+  '@nodelib/fs.walk@1.2.8':
5336 |+    dependencies:
5337 |+      '@nodelib/fs.scandir': 2.1.5
5338 |+      fastq: 1.20.1
5339 |+
5340 |+  '@open-draft/deferred-promise@2.2.0': {}
5341 |+
5342 |+  '@open-draft/deferred-promise@3.0.0': {}
5343 |+
5344 |+  '@open-draft/logger@0.3.0':
5345 |+    dependencies:
5346 |+      is-node-process: 1.2.0
5347 |+      outvariant: 1.4.3
5348 |+
5349 |+  '@open-draft/until@2.1.0': {}
5350 |+
5351 |+  '@oxc-parser/binding-android-arm-eabi@0.126.0':
5352 |+    optional: true
5353 |+
5354 |+  '@oxc-parser/binding-android-arm64@0.126.0':
5355 |+    optional: true
5356 |+
5357 |+  '@oxc-parser/binding-darwin-arm64@0.126.0':
5358 |+    optional: true
5359 |+
5360 |+  '@oxc-parser/binding-darwin-x64@0.126.0':
5361 |+    optional: true
5362 |+
5363 |+  '@oxc-parser/binding-freebsd-x64@0.126.0':
5364 |+    optional: true
5365 |+
5366 |+  '@oxc-parser/binding-linux-arm-gnueabihf@0.126.0':
5367 |+    optional: true
5368 |+
5369 |+  '@oxc-parser/binding-linux-arm-musleabihf@0.126.0':
5370 |+    optional: true
5371 |+
5372 |+  '@oxc-parser/binding-linux-arm64-gnu@0.126.0':
5373 |+    optional: true
5374 |+
5375 |+  '@oxc-parser/binding-linux-arm64-musl@0.126.0':
5376 |+    optional: true
5377 |+
5378 |+  '@oxc-parser/binding-linux-ppc64-gnu@0.126.0':
5379 |+    optional: true
5380 |+
5381 |+  '@oxc-parser/binding-linux-riscv64-gnu@0.126.0':
5382 |+    optional: true
5383 |+
5384 |+  '@oxc-parser/binding-linux-riscv64-musl@0.126.0':
5385 |+    optional: true
5386 |+
5387 |+  '@oxc-parser/binding-linux-s390x-gnu@0.126.0':
5388 |+    optional: true
5389 |+
5390 |+  '@oxc-parser/binding-linux-x64-gnu@0.126.0':
5391 |+    optional: true
5392 |+
5393 |+  '@oxc-parser/binding-linux-x64-musl@0.126.0':
5394 |+    optional: true
5395 |+
5396 |+  '@oxc-parser/binding-openharmony-arm64@0.126.0':
5397 |+    optional: true
5398 |+
5399 |+  '@oxc-parser/binding-wasm32-wasi@0.126.0':
5400 |+    dependencies:
5401 |+      '@emnapi/core': 1.9.2
5402 |+      '@emnapi/runtime': 1.9.2
5403 |+      '@napi-rs/wasm-runtime': 1.1.4(@emnapi/core@1.9.2)(@emnapi/runtime@1.9.2)
5404 |+    optional: true
5405 |+
5406 |+  '@oxc-parser/binding-win32-arm64-msvc@0.126.0':
5407 |+    optional: true
5408 |+
5409 |+  '@oxc-parser/binding-win32-ia32-msvc@0.126.0':
5410 |+    optional: true
5411 |+
5412 |+  '@oxc-parser/binding-win32-x64-msvc@0.126.0':
5413 |+    optional: true
5414 |+
5415 |+  '@oxc-project/types@0.126.0': {}
5416 |+
5417 |+  '@oxc-resolver/binding-android-arm-eabi@11.19.1':
5418 |+    optional: true
5419 |+
5420 |+  '@oxc-resolver/binding-android-arm64@11.19.1':
5421 |+    optional: true
5422 | 
     |-  '@jridgewell/resolve-uri@3.1.2': {}
5423 |+  '@oxc-resolver/binding-darwin-arm64@11.19.1':
5424 |+    optional: true
5425 | 
     |-  '@jridgewell/sourcemap-codec@1.5.5': {}
5426 |+  '@oxc-resolver/binding-darwin-x64@11.19.1':
5427 |+    optional: true
5428 | 
     |-  '@jridgewell/trace-mapping@0.3.31':
     |-    dependencies:
     |-      '@jridgewell/resolve-uri': 3.1.2
     |-      '@jridgewell/sourcemap-codec': 1.5.5
5429 |+  '@oxc-resolver/binding-freebsd-x64@11.19.1':
5430 |+    optional: true
5431 | 
     |-  '@modelcontextprotocol/sdk@1.29.0(zod@3.25.76)':
     |-    dependencies:
     |-      '@hono/node-server': 1.19.14(hono@4.12.14)
     |-      ajv: 8.18.0
     |-      ajv-formats: 3.0.1(ajv@8.18.0)
     |-      content-type: 1.0.5
     |-      cors: 2.8.6
     |-      cross-spawn: 7.0.6
     |-      eventsource: 3.0.7
     |-      eventsource-parser: 3.0.8
     |-      express: 5.2.1
     |-      express-rate-limit: 8.3.2(express@5.2.1)
     |-      hono: 4.12.14
     |-      jose: 6.2.2
     |-      json-schema-typed: 8.0.2
     |-      pkce-challenge: 5.0.1
     |-      raw-body: 3.0.2
     |-      zod: 3.25.76
     |-      zod-to-json-schema: 3.25.2(zod@3.25.76)
     |-    transitivePeerDependencies:
     |-      - supports-color
5432 |+  '@oxc-resolver/binding-linux-arm-gnueabihf@11.19.1':
5433 |+    optional: true
5434 | 
     |-  '@mswjs/interceptors@0.41.4':
     |-    dependencies:
     |-      '@open-draft/deferred-promise': 2.2.0
     |-      '@open-draft/logger': 0.3.0
     |-      '@open-draft/until': 2.1.0
     |-      is-node-process: 1.2.0
     |-      outvariant: 1.4.3
     |-      strict-event-emitter: 0.5.1
5435 |+  '@oxc-resolver/binding-linux-arm-musleabihf@11.19.1':
5436 |+    optional: true
5437 | 
     |-  '@noble/ciphers@1.3.0': {}
5438 |+  '@oxc-resolver/binding-linux-arm64-gnu@11.19.1':
5439 |+    optional: true
5440 | 
     |-  '@noble/curves@1.9.7':
     |-    dependencies:
     |-      '@noble/hashes': 1.8.0
5441 |+  '@oxc-resolver/binding-linux-arm64-musl@11.19.1':
5442 |+    optional: true
5443 | 
     |-  '@noble/hashes@1.8.0': {}
5444 |+  '@oxc-resolver/binding-linux-ppc64-gnu@11.19.1':
5445 |+    optional: true
5446 | 
     |-  '@nodelib/fs.scandir@2.1.5':
     |-    dependencies:
     |-      '@nodelib/fs.stat': 2.0.5
     |-      run-parallel: 1.2.0
5447 |+  '@oxc-resolver/binding-linux-riscv64-gnu@11.19.1':
5448 |+    optional: true
5449 | 
     |-  '@nodelib/fs.stat@2.0.5': {}
5450 |+  '@oxc-resolver/binding-linux-riscv64-musl@11.19.1':
5451 |+    optional: true
5452 | 
     |-  '@nodelib/fs.walk@1.2.8':
     |-    dependencies:
     |-      '@nodelib/fs.scandir': 2.1.5
     |-      fastq: 1.20.1
5453 |+  '@oxc-resolver/binding-linux-s390x-gnu@11.19.1':
5454 |+    optional: true
5455 | 
     |-  '@open-draft/deferred-promise@2.2.0': {}
5456 |+  '@oxc-resolver/binding-linux-x64-gnu@11.19.1':
5457 |+    optional: true
5458 | 
     |-  '@open-draft/deferred-promise@3.0.0': {}
5459 |+  '@oxc-resolver/binding-linux-x64-musl@11.19.1':
5460 |+    optional: true
5461 | 
     |-  '@open-draft/logger@0.3.0':
5462 |+  '@oxc-resolver/binding-openharmony-arm64@11.19.1':
5463 |+    optional: true
5464 |+
5465 |+  '@oxc-resolver/binding-wasm32-wasi@11.19.1(@emnapi/core@1.9.2)(@emnapi/runtime@1.10.0)':
5466 |     dependencies:
     |-      is-node-process: 1.2.0
     |-      outvariant: 1.4.3
5467 |+      '@napi-rs/wasm-runtime': 1.1.4(@emnapi/core@1.9.2)(@emnapi/runtime@1.10.0)
5468 |+    transitivePeerDependencies:
5469 |+      - '@emnapi/core'
5470 |+      - '@emnapi/runtime'
5471 |+    optional: true
5472 | 
     |-  '@open-draft/until@2.1.0': {}
5473 |+  '@oxc-resolver/binding-win32-arm64-msvc@11.19.1':
5474 |+    optional: true
5475 |+
5476 |+  '@oxc-resolver/binding-win32-ia32-msvc@11.19.1':
5477 |+    optional: true
5478 |+
5479 |+  '@oxc-resolver/binding-win32-x64-msvc@11.19.1':
5480 |+    optional: true
5481 | 
5482 |   '@playwright/test@1.59.1':
5483 |     dependencies:
@@ -4831,19 +5669,24 @@ snapshots:
5669 |       postcss-selector-parser: 6.0.10
5670 |       tailwindcss: 4.2.2
5671 | 
     |-  '@tailwindcss/vite@4.2.2(vite@6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0))':
5672 |+  '@tailwindcss/vite@4.2.2(vite@6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0)(yaml@2.8.3))':
5673 |     dependencies:
5674 |       '@tailwindcss/node': 4.2.2
5675 |       '@tailwindcss/oxide': 4.2.2
5676 |       tailwindcss: 4.2.2
     |-      vite: 6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0)
5677 |+      vite: 6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0)(yaml@2.8.3)
5678 | 
5679 |   '@ts-morph/common@0.27.0':
5680 |     dependencies:
5681 |       fast-glob: 3.3.3
5682 |       minimatch: 10.2.5
5683 |       path-browserify: 1.0.1
5684 | 
5685 |+  '@tybys/wasm-util@0.10.1':
5686 |+    dependencies:
5687 |+      tslib: 2.8.1
5688 |+    optional: true
5689 |+
5690 |   '@types/babel__core@7.20.5':
5691 |     dependencies:
5692 |       '@babel/parser': 7.29.2
@@ -4902,6 +5745,8 @@ snapshots:
5745 |     dependencies:
5746 |       '@types/ms': 2.1.0
5747 | 
5748 |+  '@types/esrecurse@4.3.1': {}
5749 |+
5750 |   '@types/estree-jsx@1.0.5':
5751 |     dependencies:
5752 |       '@types/estree': 1.0.8
@@ -4928,6 +5773,8 @@ snapshots:
5773 | 
5774 |   '@types/http-errors@2.0.5': {}
5775 | 
5776 |+  '@types/json-schema@7.0.15': {}
5777 |+
5778 |   '@types/mdast@4.0.4':
5779 |     dependencies:
5780 |       '@types/unist': 3.0.3
@@ -4979,17 +5826,108 @@ snapshots:
5826 | 
5827 |   '@types/validate-npm-package-name@4.0.2': {}
5828 | 
5829 |+  '@typescript-eslint/eslint-plugin@8.59.0(@typescript-eslint/parser@8.59.0(eslint@10.2.1(jiti@2.6.1))(typescript@5.8.3))(eslint@10.2.1(jiti@2.6.1))(typescript@5.8.3)':
5830 |+    dependencies:
5831 |+      '@eslint-community/regexpp': 4.12.2
5832 |+      '@typescript-eslint/parser': 8.59.0(eslint@10.2.1(jiti@2.6.1))(typescript@5.8.3)
5833 |+      '@typescript-eslint/scope-manager': 8.59.0
5834 |+      '@typescript-eslint/type-utils': 8.59.0(eslint@10.2.1(jiti@2.6.1))(typescript@5.8.3)
5835 |+      '@typescript-eslint/utils': 8.59.0(eslint@10.2.1(jiti@2.6.1))(typescript@5.8.3)
5836 |+      '@typescript-eslint/visitor-keys': 8.59.0
5837 |+      eslint: 10.2.1(jiti@2.6.1)
5838 |+      ignore: 7.0.5
5839 |+      natural-compare: 1.4.0
5840 |+      ts-api-utils: 2.5.0(typescript@5.8.3)
5841 |+      typescript: 5.8.3
5842 |+    transitivePeerDependencies:
5843 |+      - supports-color
5844 |+
5845 |+  '@typescript-eslint/parser@8.59.0(eslint@10.2.1(jiti@2.6.1))(typescript@5.8.3)':
5846 |+    dependencies:
5847 |+      '@typescript-eslint/scope-manager': 8.59.0
5848 |+      '@typescript-eslint/types': 8.59.0
5849 |+      '@typescript-eslint/typescript-estree': 8.59.0(typescript@5.8.3)
5850 |+      '@typescript-eslint/visitor-keys': 8.59.0
5851 |+      debug: 4.4.3
5852 |+      eslint: 10.2.1(jiti@2.6.1)
5853 |+      typescript: 5.8.3
5854 |+    transitivePeerDependencies:
5855 |+      - supports-color
5856 |+
5857 |+  '@typescript-eslint/project-service@8.59.0(typescript@5.8.3)':
5858 |+    dependencies:
5859 |+      '@typescript-eslint/tsconfig-utils': 8.59.0(typescript@5.8.3)
5860 |+      '@typescript-eslint/types': 8.59.0
5861 |+      debug: 4.4.3
5862 |+      typescript: 5.8.3
5863 |+    transitivePeerDependencies:
5864 |+      - supports-color
5865 |+
5866 |+  '@typescript-eslint/scope-manager@8.59.0':
5867 |+    dependencies:
5868 |+      '@typescript-eslint/types': 8.59.0
5869 |+      '@typescript-eslint/visitor-keys': 8.59.0
5870 |+
5871 |+  '@typescript-eslint/tsconfig-utils@8.59.0(typescript@5.8.3)':
5872 |+    dependencies:
5873 |+      typescript: 5.8.3
5874 |+
5875 |+  '@typescript-eslint/type-utils@8.59.0(eslint@10.2.1(jiti@2.6.1))(typescript@5.8.3)':
5876 |+    dependencies:
5877 |+      '@typescript-eslint/types': 8.59.0
5878 |+      '@typescript-eslint/typescript-estree': 8.59.0(typescript@5.8.3)
5879 |+      '@typescript-eslint/utils': 8.59.0(eslint@10.2.1(jiti@2.6.1))(typescript@5.8.3)
5880 |+      debug: 4.4.3
5881 |+      eslint: 10.2.1(jiti@2.6.1)
5882 |+      ts-api-utils: 2.5.0(typescript@5.8.3)
5883 |+      typescript: 5.8.3
5884 |+    transitivePeerDependencies:
5885 |+      - supports-color
5886 |+
5887 |+  '@typescript-eslint/types@8.59.0': {}
5888 |+
5889 |+  '@typescript-eslint/typescript-estree@8.59.0(typescript@5.8.3)':
5890 |+    dependencies:
5891 |+      '@typescript-eslint/project-service': 8.59.0(typescript@5.8.3)
5892 |+      '@typescript-eslint/tsconfig-utils': 8.59.0(typescript@5.8.3)
5893 |+      '@typescript-eslint/types': 8.59.0
5894 |+      '@typescript-eslint/visitor-keys': 8.59.0
5895 |+      debug: 4.4.3
5896 |+      minimatch: 10.2.5
5897 |+      semver: 7.7.4
5898 |+      tinyglobby: 0.2.16
5899 |+      ts-api-utils: 2.5.0(typescript@5.8.3)
5900 |+      typescript: 5.8.3
5901 |+    transitivePeerDependencies:
5902 |+      - supports-color
5903 |+
5904 |+  '@typescript-eslint/utils@8.59.0(eslint@10.2.1(jiti@2.6.1))(typescript@5.8.3)':
5905 |+    dependencies:
5906 |+      '@eslint-community/eslint-utils': 4.9.1(eslint@10.2.1(jiti@2.6.1))
5907 |+      '@typescript-eslint/scope-manager': 8.59.0
5908 |+      '@typescript-eslint/types': 8.59.0
5909 |+      '@typescript-eslint/typescript-estree': 8.59.0(typescript@5.8.3)
5910 |+      eslint: 10.2.1(jiti@2.6.1)
5911 |+      typescript: 5.8.3
5912 |+    transitivePeerDependencies:
5913 |+      - supports-color
5914 |+
5915 |+  '@typescript-eslint/visitor-keys@8.59.0':
5916 |+    dependencies:
5917 |+      '@typescript-eslint/types': 8.59.0
5918 |+      eslint-visitor-keys: 5.0.1
5919 |+
5920 |   '@ungap/structured-clone@1.3.0': {}
5921 | 
     |-  '@vitejs/plugin-react@5.2.0(vite@6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0))':
5922 |+  '@vitejs/plugin-react@5.2.0(vite@6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0)(yaml@2.8.3))':
5923 |     dependencies:
5924 |       '@babel/core': 7.29.0
5925 |       '@babel/plugin-transform-react-jsx-self': 7.27.1(@babel/core@7.29.0)
5926 |       '@babel/plugin-transform-react-jsx-source': 7.27.1(@babel/core@7.29.0)
5927 |       '@rolldown/pluginutils': 1.0.0-rc.3
5928 |       '@types/babel__core': 7.20.5
5929 |       react-refresh: 0.18.0
     |-      vite: 6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0)
5930 |+      vite: 6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0)(yaml@2.8.3)
5931 |     transitivePeerDependencies:
5932 |       - supports-color
5933 | 
@@ -5003,12 +5941,25 @@ snapshots:
5941 |       mime-types: 3.0.2
5942 |       negotiator: 1.0.0
5943 | 
5944 |+  acorn-jsx@5.3.2(acorn@8.16.0):
5945 |+    dependencies:
5946 |+      acorn: 8.16.0
5947 |+
5948 |+  acorn@8.16.0: {}
5949 |+
5950 |   agent-base@7.1.4: {}
5951 | 
5952 |   ajv-formats@3.0.1(ajv@8.18.0):
5953 |     optionalDependencies:
5954 |       ajv: 8.18.0
5955 | 
5956 |+  ajv@6.14.0:
5957 |+    dependencies:
5958 |+      fast-deep-equal: 3.1.3
5959 |+      fast-json-stable-stringify: 2.1.0
5960 |+      json-schema-traverse: 0.4.1
5961 |+      uri-js: 4.4.1
5962 |+
5963 |   ajv@8.18.0:
5964 |     dependencies:
5965 |       fast-deep-equal: 3.1.3
@@ -5295,6 +6246,8 @@ snapshots:
6246 | 
6247 |   dedent@1.7.2: {}
6248 | 
6249 |+  deep-is@0.1.4: {}
6250 |+
6251 |   deepmerge@4.3.1: {}
6252 | 
6253 |   default-browser-id@5.0.1: {}
@@ -5441,10 +6394,89 @@ snapshots:
6394 | 
6395 |   escape-html@1.0.3: {}
6396 | 
6397 |+  escape-string-regexp@4.0.0: {}
6398 |+
6399 |+  eslint-plugin-react-hooks@7.1.1(eslint@10.2.1(jiti@2.6.1)):
6400 |+    dependencies:
6401 |+      '@babel/core': 7.29.0
6402 |+      '@babel/parser': 7.29.2
6403 |+      eslint: 10.2.1(jiti@2.6.1)
6404 |+      hermes-parser: 0.25.1
6405 |+      zod: 3.25.76
6406 |+      zod-validation-error: 4.0.2(zod@3.25.76)
6407 |+    transitivePeerDependencies:
6408 |+      - supports-color
6409 |+
6410 |+  eslint-scope@9.1.2:
6411 |+    dependencies:
6412 |+      '@types/esrecurse': 4.3.1
6413 |+      '@types/estree': 1.0.8
6414 |+      esrecurse: 4.3.0
6415 |+      estraverse: 5.3.0
6416 |+
6417 |+  eslint-visitor-keys@3.4.3: {}
6418 |+
6419 |+  eslint-visitor-keys@5.0.1: {}
6420 |+
6421 |+  eslint@10.2.1(jiti@2.6.1):
6422 |+    dependencies:
6423 |+      '@eslint-community/eslint-utils': 4.9.1(eslint@10.2.1(jiti@2.6.1))
6424 |+      '@eslint-community/regexpp': 4.12.2
6425 |+      '@eslint/config-array': 0.23.5
6426 |+      '@eslint/config-helpers': 0.5.5
6427 |+      '@eslint/core': 1.2.1
6428 |+      '@eslint/plugin-kit': 0.7.1
6429 |+      '@humanfs/node': 0.16.8
6430 |+      '@humanwhocodes/module-importer': 1.0.1
6431 |+      '@humanwhocodes/retry': 0.4.3
6432 |+      '@types/estree': 1.0.8
6433 |+      ajv: 6.14.0
6434 |+      cross-spawn: 7.0.6
6435 |+      debug: 4.4.3
6436 |+      escape-string-regexp: 4.0.0
6437 |+      eslint-scope: 9.1.2
6438 |+      eslint-visitor-keys: 5.0.1
6439 |+      espree: 11.2.0
6440 |+      esquery: 1.7.0
6441 |+      esutils: 2.0.3
6442 |+      fast-deep-equal: 3.1.3
6443 |+      file-entry-cache: 8.0.0
6444 |+      find-up: 5.0.0
6445 |+      glob-parent: 6.0.2
6446 |+      ignore: 5.3.2
6447 |+      imurmurhash: 0.1.4
6448 |+      is-glob: 4.0.3
6449 |+      json-stable-stringify-without-jsonify: 1.0.1
6450 |+      minimatch: 10.2.5
6451 |+      natural-compare: 1.4.0
6452 |+      optionator: 0.9.4
6453 |+    optionalDependencies:
6454 |+      jiti: 2.6.1
6455 |+    transitivePeerDependencies:
6456 |+      - supports-color
6457 |+
6458 |+  espree@11.2.0:
6459 |+    dependencies:
6460 |+      acorn: 8.16.0
6461 |+      acorn-jsx: 5.3.2(acorn@8.16.0)
6462 |+      eslint-visitor-keys: 5.0.1
6463 |+
6464 |   esprima@4.0.1: {}
6465 | 
6466 |+  esquery@1.7.0:
6467 |+    dependencies:
6468 |+      estraverse: 5.3.0
6469 |+
6470 |+  esrecurse@4.3.0:
6471 |+    dependencies:
6472 |+      estraverse: 5.3.0
6473 |+
6474 |+  estraverse@5.3.0: {}
6475 |+
6476 |   estree-util-is-identifier-name@3.0.0: {}
6477 | 
6478 |+  esutils@2.0.3: {}
6479 |+
6480 |   etag@1.8.1: {}
6481 | 
6482 |   eventemitter3@5.0.4: {}
@@ -5568,6 +6600,10 @@ snapshots:
6600 |       merge2: 1.4.1
6601 |       micromatch: 4.0.8
6602 | 
6603 |+  fast-json-stable-stringify@2.1.0: {}
6604 |+
6605 |+  fast-levenshtein@2.0.6: {}
6606 |+
6607 |   fast-string-truncated-width@3.0.3: {}
6608 | 
6609 |   fast-string-width@3.0.2:
@@ -5588,6 +6624,10 @@ snapshots:
6624 |     dependencies:
6625 |       websocket-driver: 0.7.4
6626 | 
6627 |+  fd-package-json@2.0.0:
6628 |+    dependencies:
6629 |+      walk-up-path: 4.0.0
6630 |+
6631 |   fdir@6.5.0(picomatch@4.0.4):
6632 |     optionalDependencies:
6633 |       picomatch: 4.0.4
@@ -5601,6 +6641,10 @@ snapshots:
6641 |     dependencies:
6642 |       is-unicode-supported: 2.1.0
6643 | 
6644 |+  file-entry-cache@8.0.0:
6645 |+    dependencies:
6646 |+      flat-cache: 4.0.1
6647 |+
6648 |   fill-range@7.1.1:
6649 |     dependencies:
6650 |       to-regex-range: 5.0.1
@@ -5628,6 +6672,11 @@ snapshots:
6672 |     transitivePeerDependencies:
6673 |       - supports-color
6674 | 
6675 |+  find-up@5.0.0:
6676 |+    dependencies:
6677 |+      locate-path: 6.0.0
6678 |+      path-exists: 4.0.0
6679 |+
6680 |   firebase@12.12.1:
6681 |     dependencies:
6682 |       '@firebase/ai': 2.11.1(@firebase/app-types@0.9.4)(@firebase/app@0.14.11)
@@ -5661,6 +6710,13 @@ snapshots:
6710 |     transitivePeerDependencies:
6711 |       - '@react-native-async-storage/async-storage'
6712 | 
6713 |+  flat-cache@4.0.1:
6714 |+    dependencies:
6715 |+      flatted: 3.4.2
6716 |+      keyv: 4.5.4
6717 |+
6718 |+  flatted@3.4.2: {}
6719 |+
6720 |   follow-redirects@1.16.0: {}
6721 | 
6722 |   form-data@4.0.5:
@@ -5671,6 +6727,10 @@ snapshots:
6727 |       hasown: 2.0.3
6728 |       mime-types: 2.1.35
6729 | 
6730 |+  formatly@0.3.0:
6731 |+    dependencies:
6732 |+      fd-package-json: 2.0.0
6733 |+
6734 |   formdata-polyfill@4.0.10:
6735 |     dependencies:
6736 |       fetch-blob: 3.2.0
@@ -5765,6 +6825,10 @@ snapshots:
6825 |     dependencies:
6826 |       is-glob: 4.0.3
6827 | 
6828 |+  glob-parent@6.0.2:
6829 |+    dependencies:
6830 |+      is-glob: 4.0.3
6831 |+
6832 |   google-auth-library@10.6.2:
6833 |     dependencies:
6834 |       base64-js: 1.5.1
@@ -5823,6 +6887,12 @@ snapshots:
6887 |       '@types/set-cookie-parser': 2.4.10
6888 |       set-cookie-parser: 3.1.0
6889 | 
6890 |+  hermes-estree@0.25.1: {}
6891 |+
6892 |+  hermes-parser@0.25.1:
6893 |+    dependencies:
6894 |+      hermes-estree: 0.25.1
6895 |+
6896 |   hono@4.12.14: {}
6897 | 
6898 |   html-url-attributes@3.0.1: {}
@@ -5862,6 +6932,8 @@ snapshots:
6932 | 
6933 |   ignore@5.3.2: {}
6934 | 
6935 |+  ignore@7.0.5: {}
6936 |+
6937 |   immer@10.2.0: {}
6938 | 
6939 |   immer@11.1.4: {}
@@ -5871,6 +6943,8 @@ snapshots:
6943 |       parent-module: 1.0.1
6944 |       resolve-from: 4.0.0
6945 | 
6946 |+  imurmurhash@0.1.4: {}
6947 |+
6948 |   inherits@2.0.4: {}
6949 | 
6950 |   inline-style-parser@0.2.7: {}
@@ -5970,12 +7044,18 @@ snapshots:
7044 |     dependencies:
7045 |       bignumber.js: 9.3.1
7046 | 
7047 |+  json-buffer@3.0.1: {}
7048 |+
7049 |   json-parse-even-better-errors@2.3.1: {}
7050 | 
7051 |+  json-schema-traverse@0.4.1: {}
7052 |+
7053 |   json-schema-traverse@1.0.0: {}
7054 | 
7055 |   json-schema-typed@8.0.2: {}
7056 | 
7057 |+  json-stable-stringify-without-jsonify@1.0.1: {}
7058 |+
7059 |   json5@2.2.3: {}
7060 | 
7061 |   jsonfile@6.2.0:
@@ -5995,10 +7075,39 @@ snapshots:
7075 |       jwa: 2.0.1
7076 |       safe-buffer: 5.2.1
7077 | 
7078 |+  keyv@4.5.4:
7079 |+    dependencies:
7080 |+      json-buffer: 3.0.1
7081 |+
7082 |   kleur@3.0.3: {}
7083 | 
7084 |   kleur@4.1.5: {}
7085 | 
7086 |+  knip@6.6.1(@emnapi/core@1.9.2)(@emnapi/runtime@1.10.0):
7087 |+    dependencies:
7088 |+      fdir: 6.5.0(picomatch@4.0.4)
7089 |+      formatly: 0.3.0
7090 |+      get-tsconfig: 4.14.0
7091 |+      jiti: 2.6.1
7092 |+      minimist: 1.2.8
7093 |+      oxc-parser: 0.126.0
7094 |+      oxc-resolver: 11.19.1(@emnapi/core@1.9.2)(@emnapi/runtime@1.10.0)
7095 |+      picomatch: 4.0.4
7096 |+      smol-toml: 1.6.1
7097 |+      strip-json-comments: 5.0.3
7098 |+      tinyglobby: 0.2.16
7099 |+      unbash: 2.2.0
7100 |+      yaml: 2.8.3
7101 |+      zod: 4.3.6
7102 |+    transitivePeerDependencies:
7103 |+      - '@emnapi/core'
7104 |+      - '@emnapi/runtime'
7105 |+
7106 |+  levn@0.4.1:
7107 |+    dependencies:
7108 |+      prelude-ls: 1.2.1
7109 |+      type-check: 0.4.0
7110 |+
7111 |   lightningcss-android-arm64@1.32.0:
7112 |     optional: true
7113 | 
@@ -6050,6 +7159,10 @@ snapshots:
7159 | 
7160 |   lines-and-columns@1.2.4: {}
7161 | 
7162 |+  locate-path@6.0.0:
7163 |+    dependencies:
7164 |+      p-locate: 5.0.0
7165 |+
7166 |   lodash.camelcase@4.3.0: {}
7167 | 
7168 |   lodash@4.18.1: {}
@@ -6393,6 +7506,8 @@ snapshots:
7506 | 
7507 |   nanoid@3.3.11: {}
7508 | 
7509 |+  natural-compare@1.4.0: {}
7510 |+
7511 |   negotiator@0.6.3: {}
7512 | 
7513 |   negotiator@1.0.0: {}
@@ -6447,6 +7562,15 @@ snapshots:
7562 |       powershell-utils: 0.1.0
7563 |       wsl-utils: 0.3.1
7564 | 
7565 |+  optionator@0.9.4:
7566 |+    dependencies:
7567 |+      deep-is: 0.1.4
7568 |+      fast-levenshtein: 2.0.6
7569 |+      levn: 0.4.1
7570 |+      prelude-ls: 1.2.1
7571 |+      type-check: 0.4.0
7572 |+      word-wrap: 1.2.5
7573 |+
7574 |   ora@8.2.0:
7575 |     dependencies:
7576 |       chalk: 5.6.2
@@ -6461,6 +7585,65 @@ snapshots:
7585 | 
7586 |   outvariant@1.4.3: {}
7587 | 
7588 |+  oxc-parser@0.126.0:
7589 |+    dependencies:
7590 |+      '@oxc-project/types': 0.126.0
7591 |+    optionalDependencies:
7592 |+      '@oxc-parser/binding-android-arm-eabi': 0.126.0
7593 |+      '@oxc-parser/binding-android-arm64': 0.126.0
7594 |+      '@oxc-parser/binding-darwin-arm64': 0.126.0
7595 |+      '@oxc-parser/binding-darwin-x64': 0.126.0
7596 |+      '@oxc-parser/binding-freebsd-x64': 0.126.0
7597 |+      '@oxc-parser/binding-linux-arm-gnueabihf': 0.126.0
7598 |+      '@oxc-parser/binding-linux-arm-musleabihf': 0.126.0
7599 |+      '@oxc-parser/binding-linux-arm64-gnu': 0.126.0
7600 |+      '@oxc-parser/binding-linux-arm64-musl': 0.126.0
7601 |+      '@oxc-parser/binding-linux-ppc64-gnu': 0.126.0
7602 |+      '@oxc-parser/binding-linux-riscv64-gnu': 0.126.0
7603 |+      '@oxc-parser/binding-linux-riscv64-musl': 0.126.0
7604 |+      '@oxc-parser/binding-linux-s390x-gnu': 0.126.0
7605 |+      '@oxc-parser/binding-linux-x64-gnu': 0.126.0
7606 |+      '@oxc-parser/binding-linux-x64-musl': 0.126.0
7607 |+      '@oxc-parser/binding-openharmony-arm64': 0.126.0
7608 |+      '@oxc-parser/binding-wasm32-wasi': 0.126.0
7609 |+      '@oxc-parser/binding-win32-arm64-msvc': 0.126.0
7610 |+      '@oxc-parser/binding-win32-ia32-msvc': 0.126.0
7611 |+      '@oxc-parser/binding-win32-x64-msvc': 0.126.0
7612 |+
7613 |+  oxc-resolver@11.19.1(@emnapi/core@1.9.2)(@emnapi/runtime@1.10.0):
7614 |+    optionalDependencies:
7615 |+      '@oxc-resolver/binding-android-arm-eabi': 11.19.1
7616 |+      '@oxc-resolver/binding-android-arm64': 11.19.1
7617 |+      '@oxc-resolver/binding-darwin-arm64': 11.19.1
7618 |+      '@oxc-resolver/binding-darwin-x64': 11.19.1
7619 |+      '@oxc-resolver/binding-freebsd-x64': 11.19.1
7620 |+      '@oxc-resolver/binding-linux-arm-gnueabihf': 11.19.1
7621 |+      '@oxc-resolver/binding-linux-arm-musleabihf': 11.19.1
7622 |+      '@oxc-resolver/binding-linux-arm64-gnu': 11.19.1
7623 |+      '@oxc-resolver/binding-linux-arm64-musl': 11.19.1
7624 |+      '@oxc-resolver/binding-linux-ppc64-gnu': 11.19.1
7625 |+      '@oxc-resolver/binding-linux-riscv64-gnu': 11.19.1
7626 |+      '@oxc-resolver/binding-linux-riscv64-musl': 11.19.1
7627 |+      '@oxc-resolver/binding-linux-s390x-gnu': 11.19.1
7628 |+      '@oxc-resolver/binding-linux-x64-gnu': 11.19.1
7629 |+      '@oxc-resolver/binding-linux-x64-musl': 11.19.1
7630 |+      '@oxc-resolver/binding-openharmony-arm64': 11.19.1
7631 |+      '@oxc-resolver/binding-wasm32-wasi': 11.19.1(@emnapi/core@1.9.2)(@emnapi/runtime@1.10.0)
7632 |+      '@oxc-resolver/binding-win32-arm64-msvc': 11.19.1
7633 |+      '@oxc-resolver/binding-win32-ia32-msvc': 11.19.1
7634 |+      '@oxc-resolver/binding-win32-x64-msvc': 11.19.1
7635 |+    transitivePeerDependencies:
7636 |+      - '@emnapi/core'
7637 |+      - '@emnapi/runtime'
7638 |+
7639 |+  p-limit@3.1.0:
7640 |+    dependencies:
7641 |+      yocto-queue: 0.1.0
7642 |+
7643 |+  p-locate@5.0.0:
7644 |+    dependencies:
7645 |+      p-limit: 3.1.0
7646 |+
7647 |   p-retry@4.6.2:
7648 |     dependencies:
7649 |       '@types/retry': 0.12.0
@@ -6493,6 +7676,8 @@ snapshots:
7676 | 
7677 |   path-browserify@1.0.1: {}
7678 | 
7679 |+  path-exists@4.0.0: {}
7680 |+
7681 |   path-key@3.1.1: {}
7682 | 
7683 |   path-key@4.0.0: {}
@@ -6541,6 +7726,8 @@ snapshots:
7726 | 
7727 |   powershell-utils@0.1.0: {}
7728 | 
7729 |+  prelude-ls@1.2.1: {}
7730 |+
7731 |   pretty-ms@9.3.0:
7732 |     dependencies:
7733 |       parse-ms: 4.0.0
@@ -6574,6 +7761,8 @@ snapshots:
7761 | 
7762 |   proxy-from-env@2.1.0: {}
7763 | 
7764 |+  punycode@2.3.1: {}
7765 |+
7766 |   qs@6.14.2:
7767 |     dependencies:
7768 |       side-channel: 1.1.0
@@ -6977,6 +8166,8 @@ snapshots:
8166 | 
8167 |   sisteransi@1.0.5: {}
8168 | 
8169 |+  smol-toml@1.6.1: {}
8170 |+
8171 |   source-map-js@1.2.1: {}
8172 | 
8173 |   source-map@0.6.1: {}
@@ -7028,6 +8219,8 @@ snapshots:
8219 | 
8220 |   strip-final-newline@4.0.0: {}
8221 | 
8222 |+  strip-json-comments@5.0.3: {}
8223 |+
8224 |   style-to-js@1.1.21:
8225 |     dependencies:
8226 |       style-to-object: 1.0.14
@@ -7071,6 +8264,10 @@ snapshots:
8264 | 
8265 |   trough@2.2.0: {}
8266 | 
8267 |+  ts-api-utils@2.5.0(typescript@5.8.3):
8268 |+    dependencies:
8269 |+      typescript: 5.8.3
8270 |+
8271 |   ts-morph@26.0.0:
8272 |     dependencies:
8273 |       '@ts-morph/common': 0.27.0
@@ -7093,6 +8290,10 @@ snapshots:
8290 | 
8291 |   tw-animate-css@1.4.0: {}
8292 | 
8293 |+  type-check@0.4.0:
8294 |+    dependencies:
8295 |+      prelude-ls: 1.2.1
8296 |+
8297 |   type-fest@5.6.0:
8298 |     dependencies:
8299 |       tagged-tag: 1.0.0
@@ -7108,8 +8309,21 @@ snapshots:
8309 |       media-typer: 1.1.0
8310 |       mime-types: 3.0.2
8311 | 
8312 |+  typescript-eslint@8.59.0(eslint@10.2.1(jiti@2.6.1))(typescript@5.8.3):
8313 |+    dependencies:
8314 |+      '@typescript-eslint/eslint-plugin': 8.59.0(@typescript-eslint/parser@8.59.0(eslint@10.2.1(jiti@2.6.1))(typescript@5.8.3))(eslint@10.2.1(jiti@2.6.1))(typescript@5.8.3)
8315 |+      '@typescript-eslint/parser': 8.59.0(eslint@10.2.1(jiti@2.6.1))(typescript@5.8.3)
8316 |+      '@typescript-eslint/typescript-estree': 8.59.0(typescript@5.8.3)
8317 |+      '@typescript-eslint/utils': 8.59.0(eslint@10.2.1(jiti@2.6.1))(typescript@5.8.3)
8318 |+      eslint: 10.2.1(jiti@2.6.1)
8319 |+      typescript: 5.8.3
8320 |+    transitivePeerDependencies:
8321 |+      - supports-color
8322 |+
8323 |   typescript@5.8.3: {}
8324 | 
8325 |+  unbash@2.2.0: {}
8326 |+
8327 |   undici-types@6.21.0: {}
8328 | 
8329 |   unicorn-magic@0.3.0: {}
@@ -7159,6 +8373,10 @@ snapshots:
8373 |       escalade: 3.2.0
8374 |       picocolors: 1.1.1
8375 | 
8376 |+  uri-js@4.4.1:
8377 |+    dependencies:
8378 |+      punycode: 2.3.1
8379 |+
8380 |   use-sync-external-store@1.6.0(react@19.2.5):
8381 |     dependencies:
8382 |       react: 19.2.5
@@ -7198,17 +8416,17 @@ snapshots:
8416 |       d3-time: 3.1.0
8417 |       d3-timer: 3.0.1
8418 | 
     |-  vite-plugin-image-optimizer@2.0.3(sharp@0.34.5)(vite@6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0)):
8419 |+  vite-plugin-image-optimizer@2.0.3(sharp@0.34.5)(vite@6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0)(yaml@2.8.3)):
8420 |     dependencies:
8421 |       ansi-colors: 4.1.3
8422 |       pathe: 2.0.3
     |-      vite: 6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0)
8423 |+      vite: 6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0)(yaml@2.8.3)
8424 |     optionalDependencies:
8425 |       sharp: 0.34.5
8426 | 
8427 |   vite-plugin-sitemap@0.8.2: {}
8428 | 
     |-  vite@6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0):
8429 |+  vite@6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0)(yaml@2.8.3):
8430 |     dependencies:
8431 |       esbuild: 0.25.12
8432 |       fdir: 6.5.0(picomatch@4.0.4)
@@ -7222,6 +8440,7 @@ snapshots:
8440 |       jiti: 2.6.1
8441 |       lightningcss: 1.32.0
8442 |       tsx: 4.21.0
8443 |+      yaml: 2.8.3
8444 | 
8445 |   wait-on@9.0.5:
8446 |     dependencies:
@@ -7233,6 +8452,8 @@ snapshots:
8452 |     transitivePeerDependencies:
8453 |       - debug
8454 | 
8455 |+  walk-up-path@4.0.0: {}
8456 |+
8457 |   web-streams-polyfill@3.3.3: {}
8458 | 
8459 |   web-vitals@4.2.4: {}
@@ -7253,6 +8474,8 @@ snapshots:
8474 |     dependencies:
8475 |       isexe: 3.1.5
8476 | 
8477 |+  word-wrap@1.2.5: {}
8478 |+
8479 |   wrap-ansi@7.0.0:
8480 |     dependencies:
8481 |       ansi-styles: 4.3.0
@@ -7278,6 +8501,8 @@ snapshots:
8501 | 
8502 |   yallist@3.1.1: {}
8503 | 
8504 |+  yaml@2.8.3: {}
8505 |+
8506 |   yargs-parser@21.1.1: {}
8507 | 
8508 |   yargs-parser@22.0.0: {}
@@ -7301,6 +8526,8 @@ snapshots:
8526 |       y18n: 5.0.8
8527 |       yargs-parser: 22.0.0
8528 | 
8529 |+  yocto-queue@0.1.0: {}
8530 |+
8531 |   yocto-spinner@1.1.0:
8532 |     dependencies:
8533 |       yoctocolors: 2.1.2
@@ -7311,6 +8538,12 @@ snapshots:
8538 |     dependencies:
8539 |       zod: 3.25.76
8540 | 
8541 |+  zod-validation-error@4.0.2(zod@3.25.76):
8542 |+    dependencies:
8543 |+      zod: 3.25.76
8544 |+
8545 |   zod@3.25.76: {}
8546 | 
8547 |+  zod@4.3.6: {}
8548 |+
8549 |   zwitch@2.0.4: {}
```

### `src/components/layout/DetailElements.tsx` (modified)
**Valid Comment Ranges (New File):** 1-5
```diff
@@ -1,5 +1,5 @@
     |-import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
     |-import { LucideIcon, Star, DollarSign, Shield, ExternalLink } from 'lucide-react';
   1 |+import { Box, Stack, Text } from '@/layouts/Primitives';
   2 |+import { LucideIcon, Shield } from 'lucide-react';
   3 | 
   4 | interface ScoreItemProps {
   5 |   label: string;
```

### `src/components/ui/CategoryPlaceholder.tsx` (modified)
**Valid Comment Ranges (New File):** 1-4
```diff
@@ -1,4 +1,4 @@
     |-import { Cpu, Globe, Camera, Heart, HelpCircle, LucideIcon, Map } from 'lucide-react';
   1 |+import { Cpu, Globe, Camera, Heart, HelpCircle, LucideIcon } from 'lucide-react';
   2 | import { Box } from '@/layouts/Primitives';
   3 | 
   4 | interface CategoryPlaceholderProps {
```

### `src/components/ui/ContentCard.tsx` (modified)
**Valid Comment Ranges (New File):** 2-7, 16-21
```diff
@@ -2,7 +2,6 @@ import { NavLink } from 'react-router-dom';
   2 | import { Box, Stack, Text } from '@/layouts/Primitives';
   3 | import { readingTime } from '@/lib/content';
   4 | import { CardImagePlaceholder } from '@/components/ui/CardImagePlaceholder';
     |-import { Skeleton } from '@/components/ui/Skeleton';
   5 | import { CategoryPlaceholder } from '@/components/ui/CategoryPlaceholder';
   6 | 
   7 | interface ContentCardProps {
@@ -17,25 +16,6 @@ interface ContentCardProps {
  16 |   content?: string;
  17 | }
  18 | 
     |-export function ContentCardSkeleton() {
     |-  return (
     |-    <Box className="flex flex-col h-full bg-surface border border-line rounded-none overflow-hidden">
     |-      <Skeleton className="w-full aspect-video max-h-[160px] rounded-none" />
     |-      <Stack gap={4} className="p-5" flex={1} justify="between">
     |-        <Stack gap={3}>
     |-          <Skeleton className="h-3 w-24" />
     |-          <Skeleton className="h-6 w-3/4" />
     |-          <Stack gap={2}>
     |-            <Skeleton className="h-3 w-full" />
     |-            <Skeleton className="h-3 w-5/6" />
     |-          </Stack>
     |-        </Stack>
     |-        <Skeleton className="h-3 w-20 mt-auto" />
     |-      </Stack>
     |-    </Box>
     |-  );
     |-}
     |-
  19 | export function ContentCard({ slug, title, category, excerpt, date, image, basePath, content }: ContentCardProps) {
  20 |   const rt = readingTime(content, excerpt);
  21 | 
```

### `src/components/ui/HeroPathCard.tsx` (removed)
**Valid Comment Ranges (New File):** 0--1
```diff
@@ -1,76 +0,0 @@
     |-import { motion } from 'motion/react';
     |-import { NavLink } from 'react-router-dom';
     |-import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
     |-import { Zap, Shield } from 'lucide-react';
     |-
     |-interface HeroPathCardProps {
     |-  label: string;
     |-  title: string;
     |-  paths: { label: string; path: string }[];
     |-  tag: string;
     |-  image: string;
     |-  span?: number;
     |-  icon: any;
     |-}
     |-
     |-export function HeroPathCard({ label, title, paths, tag, image, span = 1, icon: Icon }: HeroPathCardProps) {
     |-  return (
     |-    <Box 
     |-      as={motion.div}
     |-      span={{ base: 1, lg: span }}
     |-      position="relative"
     |-      overflow="hidden"
     |-      padding={8}
     |-      className="group bg-surface border border-slate-200 hover:border-accent transition-all duration-500 rounded-none"
     |-    >
     |-      <Stack gap={10} height="full" justify="between" position="relative" zIndex={10}>
     |-        <Stack gap={8}>
     |-          <Box display="flex" align="center" gap={3}>
     |-            <Icon className="w-5 h-5 text-accent" />
     |-            <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-widest uppercase">
     |-              {tag.split(' // ')[0]}
     |-            </Text>
     |-          </Box>
     |-          
     |-          <Stack gap={6}>
     |-            <Text 
     |-              variant="display" 
     |-              size="4xl" 
     |-              weight="font-black" 
     |-              className="tracking-tight leading-tight text-accent-navy transition-colors"
     |-            >
     |-              {title}
     |-            </Text>
     |-            
     |-            <Grid cols={{ base: 1, sm: span > 2 ? 3 : 1 }} gap={3} maxWidth="4xl">
     |-              {paths.map(item => (
     |-                <Box 
     |-                  key={item.label}
     |-                  as={NavLink}
     |-                  to={item.path}
     |-                  paddingX={5}
     |-                  paddingY={4}
     |-                  radius="md"
     |-                  className="flex items-center gap-4 bg-bg/50 hover:bg-accent/5 border border-slate-200 hover:border-accent rounded-[2px] transition-all group/link"
     |-                >
     |-                  {/* MECHANICAL_NOTE: Physics of the hover expansion */}
     |-                  <Box className="w-2 h-2 bg-accent/20 group-hover/link:bg-accent rounded-none transition-colors flex-shrink-0" />
     |-                  <Text variant="sans" size="base" weight="font-bold" className="text-text-main group-hover/link:text-accent">
     |-                    {item.label}
     |-                  </Text>
     |-                </Box>
     |-              ))}
     |-            </Grid>
     |-          </Stack>
     |-        </Stack>
     |-
     |-        <Box display="flex" justify="between" align="center" paddingTop={8} className="border-t border-slate-200">
     |-          <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-widest uppercase">
     |-            {tag}
     |-          </Text>
     |-          <Box className="w-8 h-[2px] bg-accent/20 group-hover:w-16 group-hover:bg-accent transition-all duration-500 rounded-none" />
     |-        </Box>
     |-      </Stack>
     |-    </Box>
     |-  );
     |-}
```

### `src/components/ui/MarkdownRenderer.tsx` (modified)
**Valid Comment Ranges (New File):** 10-23
```diff
@@ -10,14 +10,14 @@ export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  10 |     <div className="[counter-reset:section]">
  11 |       <ReactMarkdown
  12 |         components={{
     |-          a: ({node, ...props}) => <a {...props} rel="noopener noreferrer" target="_blank" />,
     |-          blockquote: ({node, ...props}) => (
  13 |+          a: ({node: _node, ...props}) => <a {...props} rel="noopener noreferrer" target="_blank" />,
  14 |+          blockquote: ({node: _node, ...props}) => (
  15 |             <Box border surface="warning" padding={6} marginY={8} radius="none">
  16 |                <Text variant="mono" size="tiny" weight="font-bold" intent="warning" tracking="widest" className="mb-2 block">Key Takeaway</Text>
  17 |                <blockquote className="m-0 p-0 font-medium italic" {...props} />
  18 |             </Box>
  19 |           ),
     |-          h2: ({node, ...props}) => (
  20 |+          h2: ({node: _node, ...props}) => (
  21 |             <Box className="mt-12 mb-6 group" style={{ counterIncrement: 'section' }}>
  22 |               <Text
  23 |                 variant="mono"
```

### `src/components/ui/Skeleton.tsx` (removed)
**Valid Comment Ranges (New File):** 0--1
```diff
@@ -1,14 +0,0 @@
     |-import { cn } from '@/lib/utils';
     |-
     |-export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
     |-  return (
     |-    <div
     |-      className={cn(
     |-        'relative overflow-hidden bg-line/10',
     |-        'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
     |-        className
     |-      )}
     |-      {...props}
     |-    />
     |-  );
     |-}
```

### `src/components/ui/badge.tsx` (removed)
**Valid Comment Ranges (New File):** 0--1
```diff
@@ -1,25 +0,0 @@
     |-import * as React from "react"
     |-import { cn } from "@/lib/utils"
     |-import { Text } from "@/layouts/Primitives"
     |-import { badgeVariants } from "@/lib/variants"
     |-import type { VariantProps } from "class-variance-authority"
     |-
     |-export interface BadgeProps
     |-  extends Omit<React.ComponentProps<typeof Text>, "intent">,
     |-    VariantProps<typeof badgeVariants> {}
     |-
     |-function Badge({
     |-  className,
     |-  intent,
     |-  emphasis,
     |-  ...props
     |-}: BadgeProps) {
     |-  return (
     |-    <Text
     |-      className={cn(badgeVariants({ intent, emphasis }), className)}
     |-      {...props}
     |-    />
     |-  )
     |-}
     |-
     |-export { Badge }
```

### `src/components/ui/card.tsx` (removed)
**Valid Comment Ranges (New File):** 0--1
```diff
@@ -1,103 +0,0 @@
     |-import * as React from "react"
     |-import { cn } from "@/lib/utils"
     |-import { Box, Stack, Text } from "@/layouts/Primitives"
     |-
     |-function Card({
     |-  className,
     |-  size = "default",
     |-  ...props
     |-}: React.ComponentProps<typeof Box> & { size?: "default" | "sm" }) {
     |-  return (
     |-    <Box
     |-      border
     |-      radius="none"
     |-      surface="default"
     |-      className={cn(
     |-        "group/card flex flex-col overflow-hidden text-sm",
     |-        size === "default" ? "gap-4 p-8" : "gap-3 p-4",
     |-        className
     |-      )}
     |-      {...props}
     |-    />
     |-  )
     |-}
     |-
     |-function CardHeader({ className, ...props }: React.ComponentProps<typeof Box>) {
     |-  return (
     |-    <Box
     |-      className={cn(
     |-        "group/card-header grid auto-rows-min items-start gap-1",
     |-        className
     |-      )}
     |-      {...props}
     |-    />
     |-  )
     |-}
     |-
     |-function CardTitle({ className, ...props }: React.ComponentProps<typeof Text>) {
     |-  return (
     |-    <Text
     |-      as="div"
     |-      variant="headline"
     |-      size="text-xl"
     |-      className={cn("leading-snug", className)}
     |-      {...props}
     |-    />
     |-  )
     |-}
     |-
     |-function CardDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
     |-  return (
     |-    <Text
     |-      as="p"
     |-      color="dim"
     |-      size="text-xs"
     |-      className={cn("uppercase tracking-wider", className)}
     |-      {...props}
     |-    />
     |-  )
     |-}
     |-
     |-function CardAction({ className, ...props }: React.ComponentProps<typeof Box>) {
     |-  return (
     |-    <Box
     |-      className={cn(
     |-        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
     |-        className
     |-      )}
     |-      {...props}
     |-    />
     |-  )
     |-}
     |-
     |-function CardContent({ className, ...props }: React.ComponentProps<typeof Box>) {
     |-  return (
     |-    <Box
     |-      className={cn("flex-1", className)}
     |-      {...props}
     |-    />
     |-  )
     |-}
     |-
     |-function CardFooter({ className, ...props }: React.ComponentProps<typeof Box>) {
     |-  return (
     |-    <Box
     |-      surface="muted"
     |-      className={cn(
     |-        "flex items-center border-t border-line p-4 -mx-8 -mb-8 mt-4",
     |-        className
     |-      )}
     |-      {...props}
     |-    />
     |-  )
     |-}
     |-
     |-export {
     |-  Card,
     |-  CardHeader,
     |-  CardFooter,
     |-  CardTitle,
     |-  CardAction,
     |-  CardDescription,
     |-  CardContent,
     |-}
```

### `src/components/ui/tabs.tsx` (removed)
**Valid Comment Ranges (New File):** 0--1
```diff
@@ -1,61 +0,0 @@
     |-import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
     |-import { cn } from "@/lib/utils"
     |-import { Box, Stack, Text } from "@/layouts/Primitives"
     |-
     |-function Tabs({
     |-  className,
     |-  orientation = "horizontal",
     |-  ...props
     |-}: TabsPrimitive.Root.Props) {
     |-  return (
     |-    <TabsPrimitive.Root
     |-      data-slot="tabs"
     |-      data-orientation={orientation}
     |-      className={cn(
     |-        "group/tabs flex gap-8 data-horizontal:flex-col",
     |-        className
     |-      )}
     |-      {...props}
     |-    />
     |-  )
     |-}
     |-
     |-function TabsList({
     |-  className,
     |-  ...props
     |-}: TabsPrimitive.List.Props) {
     |-  return (
     |-    <TabsPrimitive.List
     |-      className={cn(
     |-        "group/tabs-list border-b border-line w-full flex flex-row items-stretch gap-0",
     |-        className
     |-      )}
     |-      {...props}
     |-    />
     |-  )
     |-}
     |-
     |-function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
     |-  return (
     |-    <TabsPrimitive.Tab
     |-      className={cn(
     |-        "relative inline-flex h-full items-center justify-center gap-2 px-6 py-4 text-[10px] font-mono font-bold uppercase tracking-widest whitespace-nowrap text-text-dim transition-all hover:text-text-main focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-brand disabled:pointer-events-none disabled:opacity-50",
     |-        "data-active:text-accent-brand data-active:after:content-[''] data-active:after:absolute data-active:after:bottom-0 data-active:after:left-0 data-active:after:w-full data-active:after:h-[2px] data-active:after:bg-accent-brand",
     |-        className
     |-      )}
     |-      {...props}
     |-    />
     |-  )
     |-}
     |-
     |-function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
     |-  return (
     |-    <TabsPrimitive.Panel
     |-      data-slot="tabs-content"
     |-      className={cn("flex-1 text-sm outline-none pt-8", className)}
     |-      {...props}
     |-    />
     |-  )
     |-}
     |-
     |-export { Tabs, TabsList, TabsTrigger, TabsContent }
```

### `src/config/content.ts` (modified)
**Valid Comment Ranges (New File):** 5-10
```diff
@@ -5,8 +5,6 @@ export const CONTENT_CATEGORIES = [
   5 |   { id: 'Travel', label: 'Travel', description: 'WCS event logistics and travel optimization hacks.' }
   6 | ] as const;
   7 | 
     |-export type CategoryId = typeof CONTENT_CATEGORIES[number]['id'];
     |-
   8 | export const SITE_METADATA = {
   9 |   title: 'Tech-Dancer',
  10 |   author: 'Ariel Anders, PhD',
```

### `src/features/dashboard/Dashboard.tsx` (modified)
**Valid Comment Ranges (New File):** 1-16
```diff
@@ -1,16 +1,16 @@
   1 | import { motion } from 'motion/react';
   2 | import { NavLink } from 'react-router-dom';
     |-import { Zap, ArrowRight, Shield, Calendar } from 'lucide-react';
   3 |+import { ArrowRight } from 'lucide-react';
   4 | import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
   5 | import { useHome } from './useHome';
   6 | import { SEO } from '@/components/SEO';
     |-import { PageHeader, SectionHeader } from '@/components/ui/PageHeader';
   7 |+import { SectionHeader } from '@/components/ui/PageHeader';
   8 | import PathSelector from '@/components/ui/PathSelector';
   9 | import { ContentCard } from '@/components/ui/ContentCard';
  10 | import { EventCard } from './EventCard';
  11 | 
  12 | export default function Home() {
     |-  const { recentPosts, upcomingEvents, dancerPaths, hirePaths } = useHome();
  13 |+  const { recentPosts, upcomingEvents, dancerPaths: _dancerPaths, hirePaths: _hirePaths } = useHome();
  14 | 
  15 |   return (
  16 |     <Box as="section">
```

### `src/features/journal/components/BlogPostDetail.tsx` (modified)
**Valid Comment Ranges (New File):** 1-4
```diff
@@ -1,4 +1,4 @@
     |-import { User, Share2 } from 'lucide-react';
   1 |+import { Share2 } from 'lucide-react';
   2 | import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
   3 | import { Post, getPosts } from '@/lib/content';
   4 | import { ContentCard } from '@/components/ui/ContentCard';
```

### `src/features/lab/BlogDrafter.tsx` (modified)
**Valid Comment Ranges (New File):** 1-5
```diff
@@ -1,6 +1,5 @@
     |-import { motion } from 'motion/react';
   1 | import { useState } from 'react';
     |-import { Github, FileText, Send, Terminal, ExternalLink, Info, Check } from 'lucide-react';
   2 |+import { Github, FileText, Terminal, ExternalLink, Info, Check } from 'lucide-react';
   3 | import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
   4 | import { useBlogDrafter } from './useBlogDrafter';
   5 | import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
```

### `src/features/lab/GearCard.tsx` (modified)
**Valid Comment Ranges (New File):** 1-5
```diff
@@ -1,5 +1,5 @@
   1 | import { NavLink } from 'react-router-dom';
     |-import { Box, Stack, Text } from '@/layouts/Primitives';
   2 |+import { Text } from '@/layouts/Primitives';
   3 | import { Resource } from '@/lib/content';
   4 | import { CardImagePlaceholder } from '@/components/ui/CardImagePlaceholder';
   5 | 
```

### `src/features/lab/components/GearPostDetail.tsx` (modified)
**Valid Comment Ranges (New File):** 1-4
```diff
@@ -1,4 +1,4 @@
     |-import { ExternalLink, Star, Shield } from 'lucide-react';
   1 |+import { ExternalLink, Star } from 'lucide-react';
   2 | import { Box, Stack, Text } from '@/layouts/Primitives';
   3 | import { Resource } from '@/lib/content';
   4 | import { affiliateManager } from '@/lib/affiliateManager';
```

### `src/features/lab/useToolbox.ts` (modified)
**Valid Comment Ranges (New File):** 12-23
```diff
@@ -12,13 +12,12 @@ export function useToolbox() {
  12 |   const view = viewParam as ViewMode;
  13 |   const setView = (v: ViewMode) => setViewParam(v);
  14 | 
     |-  const categories = [
     |-    { id: 'dance', label: 'Row 1: Dance Equipment', description: 'Technical reviews of competitive social dance footwear and accessories.' },
     |-    { id: 'fashion', label: 'Row 2: Fashion', description: 'Bright, fun outfits curated for movement, comfort, and style on the dance floor.' },
     |-    { id: 'travel', label: 'Row 3: Travel Related', description: 'Optimized logistics gear for the convention circuit and bougie-on-a-budget travel.' }
     |-  ];
     |-
  15 |   const groupedResources = useMemo(() => {
  16 |+    const categories = [
  17 |+      { id: 'dance', label: 'Row 1: Dance Equipment', description: 'Technical reviews of competitive social dance footwear and accessories.' },
  18 |+      { id: 'fashion', label: 'Row 2: Fashion', description: 'Bright, fun outfits curated for movement, comfort, and style on the dance floor.' },
  19 |+      { id: 'travel', label: 'Row 3: Travel Related', description: 'Optimized logistics gear for the convention circuit and bougie-on-a-budget travel.' }
  20 |+    ];
  21 |     return categories.map(cat => ({
  22 |       ...cat,
  23 |       items: resources.filter(r => safeSearch(r.category, cat.id))
```

### `src/features/research/ResearchAnalytics.tsx` (modified)
**Valid Comment Ranges (New File):** 1-6
```diff
@@ -1,6 +1,6 @@
   1 | import { motion } from 'motion/react';
   2 | import { useNavigate } from 'react-router-dom';
     |-import { Database, FileText, Search, Activity, ArrowRight } from 'lucide-react';
   3 |+import { FileText, Search, ArrowRight } from 'lucide-react';
   4 | import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
   5 | import { SEO } from '@/components/SEO';
   6 | import { PageHeader } from '@/components/ui/PageHeader';
```

### `src/features/research/ResearchDetail.tsx` (modified)
**Valid Comment Ranges (New File):** 1-5, 16-32, 40-45
```diff
@@ -1,6 +1,5 @@
   1 | import { useMemo } from 'react';
   2 | import { useParams, useNavigate } from 'react-router-dom';
     |-import { motion } from 'motion/react';
   3 | import { Database, Activity, ArrowLeft, Search } from 'lucide-react';
   4 | import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
   5 | import { useResearch } from './useResearch';
@@ -17,6 +16,17 @@ export default function ResearchDetail() {
  16 |   const tool = id ? getTool(id) : null;
  17 |   const study = !tool && id ? getStudy(id) : null;
  18 | 
  19 |+  const structuredData = useMemo(() => {
  20 |+    if (!tool) return null;
  21 |+    return {
  22 |+      "@context": "https://schema.org",
  23 |+      "@type": "WebApplication",
  24 |+      "name": tool.name,
  25 |+      "description": tool.layman,
  26 |+      "applicationCategory": "EducationalApplication"
  27 |+    };
  28 |+  }, [tool]);
  29 |+
  30 |   if (study) {
  31 |     return (
  32 |       <DetailLayout
@@ -30,17 +40,6 @@ export default function ResearchDetail() {
  40 |     );
  41 |   }
  42 | 
     |-  const structuredData = useMemo(() => {
     |-    if (!tool) return null;
     |-    return {
     |-      "@context": "https://schema.org",
     |-      "@type": "WebApplication",
     |-      "name": tool.name,
     |-      "description": tool.layman,
     |-      "applicationCategory": "EducationalApplication"
     |-    };
     |-  }, [tool]);
     |-
  43 |   if (!tool) {
  44 |     return (
  45 |       <Box padding="panel" textAlign="center">
```

### `src/features/research/useResearch.ts` (modified)
**Valid Comment Ranges (New File):** 3-8
```diff
@@ -3,7 +3,6 @@ import { getStudies, Study } from '@/lib/content';
   3 | 
   4 | export function useResearch() {
   5 |   const [studies] = useState<Study[]>(() => getStudies());
     |-  const [selectedTool, setSelectedTool] = useState<string | null>(null);
   6 | 
   7 |   const tools = [
   8 |     {
```

### `src/features/ux-auditor/useUXAuditor.ts` (modified)
**Valid Comment Ranges (New File):** 103-129, 149-167, 172-180, 225-231, 276-282
```diff
@@ -103,24 +103,27 @@ export function useUXAuditor() {
 103 |     setIsAnalyzing(true);
 104 | 
 105 |     try {
 106 |+      // eslint-disable-next-line react-hooks/purity
 107 |       let reportId = Date.now().toString();
 108 | 
     |-      const newReport: UXReport = {
 109 |+      let currentReport: UXReport = {
 110 |         id: reportId,
 111 |         url,
 112 |+        // eslint-disable-next-line react-hooks/purity
 113 |         timestamp: Date.now(),
 114 |         status: 'processing',
 115 |       };
 116 | 
 117 |       // Add to local state immediately for optimistic UI
     |-      setReports(prev => [newReport, ...prev].sort((a, b) => b.timestamp - a.timestamp));
     |-      setActiveReport(newReport);
 118 |+      setReports(prev => [currentReport, ...prev].sort((a, b) => b.timestamp - a.timestamp));
 119 |+      setActiveReport(currentReport);
 120 | 
 121 |       if (user && firebaseConfig) {
 122 |         const db = getFirestore();
     |-        const newReportRef = await addDoc(collection(db, 'artifacts', appId, 'users', user.uid, 'ux_reports'), newReport);
 123 |+        const newReportRef = await addDoc(collection(db, 'artifacts', appId, 'users', user.uid, 'ux_reports'), currentReport);
 124 |         reportId = newReportRef.id;
     |-        newReport.id = reportId;
 125 |+        // eslint-disable-next-line react-hooks/immutability
 126 |+        currentReport = { ...currentReport, id: reportId };
 127 |       }
 128 | 
 129 |       for (const vp of VIEWPORTS) {
@@ -146,18 +149,19 @@ export function useUXAuditor() {
 149 |             });
 150 |             mockImg = base64DataUri;
 151 |           }
     |-        } catch (e) {
     |-          console.error("Failed to fetch realistic snapshot, using placeholder", e);
 152 |+        } catch (_e) {
 153 |+          console.error("Failed to fetch realistic snapshot, using placeholder", _e);
 154 |         }
 155 | 
 156 |         const analysis = await analyzeViewport(vp, url, base64DataUri);
 157 | 
     |-        newReport[`findings_${vp.name.toLowerCase()}`] = analysis;
     |-        newReport[`image_${vp.name.toLowerCase()}`] = mockImg;
     |-
     |-        const updatedReport = { ...newReport };
     |-        setReports(prev => prev.map(r => r.id === reportId ? updatedReport : r));
     |-        setActiveReport(updatedReport);
 158 |+        currentReport = {
 159 |+          ...currentReport,
 160 |+          [`findings_${vp.name.toLowerCase()}`]: analysis,
 161 |+          [`image_${vp.name.toLowerCase()}`]: mockImg,
 162 |+        };
 163 |+        setReports(prev => prev.map(r => r.id === reportId ? currentReport : r));
 164 |+        setActiveReport(currentReport);
 165 | 
 166 |         if (user && firebaseConfig) {
 167 |           const db = getFirestore();
@@ -168,9 +172,9 @@ export function useUXAuditor() {
 172 |         }
 173 |       }
 174 | 
     |-      newReport.status = 'completed';
     |-      setReports(prev => prev.map(r => r.id === reportId ? { ...newReport } : r));
     |-      setActiveReport({ ...newReport });
 175 |+      currentReport = { ...currentReport, status: 'completed' };
 176 |+      setReports(prev => prev.map(r => r.id === reportId ? currentReport : r));
 177 |+      setActiveReport(currentReport);
 178 | 
 179 |       if (user && firebaseConfig) {
 180 |         const db = getFirestore();
@@ -221,8 +225,7 @@ export function useUXAuditor() {
 225 |       });
 226 |       const result = await response.json();
 227 |       return JSON.parse(result.candidates[0].content.parts[0].text) as ViewportAnalysis;
     |-    } catch (err) {
     |-      // Provide a populated prompt if API fails, as requested
 228 |+    } catch (_err) {
 229 |       const imgContext = base64DataUri
 230 |         ? `Here is the base64 encoded snapshot:\n${base64DataUri}`
 231 |         : `[Please attach the image from scripts/ux-capture.js here]`;
@@ -273,7 +276,7 @@ export function useUXAuditor() {
 276 |         const repo = urlObj.pathname.split('/')[1];
 277 |         if (userPart && repo) repoBase = `https://github.com/${userPart}/${repo}/issues/new`;
 278 |       }
     |-    } catch (e) {}
 279 |+    } catch (_e) { /* URL parse failed, use default */ }
 280 | 
 281 |     window.open(`${repoBase}?title=${title}&body=${body}`, '_blank');
 282 |   };
```

### `src/hooks/use-contact-form.ts` (modified)
**Valid Comment Ranges (New File):** 82-88
```diff
@@ -82,7 +82,7 @@ export function useContactForm() {
  82 |       setSubmitted(true);
  83 |       setFormData({ name: '', email: '', subject: 'General Feedback', message: '' });
  84 |       return true;
     |-    } catch (err) {
  85 |+    } catch (_err) {
  86 |       setErrors({ message: 'System error: Unable to transmit payload. Please try again later.' });
  87 |       return false;
  88 |     } finally {
```

### `src/hooks/use-form.ts` (removed)
**Valid Comment Ranges (New File):** 0--1
```diff
@@ -1,31 +0,0 @@
     |-import { useState, useCallback } from "react"
     |-
     |-export function useForm<T extends Record<string, any>>(initialValues: T) {
     |-  const [formData, setFormData] = useState<T>(initialValues)
     |-
     |-  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
     |-    const { name, value } = e.target
     |-    setFormData((prev) => ({ ...prev, [name]: value }))
     |-  }, [])
     |-
     |-  const setFieldValue = useCallback((name: keyof T, value: any) => {
     |-    setFormData((prev) => ({ ...prev, [name]: value }))
     |-  }, [])
     |-
     |-  const resetForm = useCallback(() => {
     |-    setFormData(initialValues)
     |-  }, [initialValues])
     |-
     |-  const setValues = useCallback((values: Partial<T>) => {
     |-    setFormData((prev) => ({ ...prev, ...values }))
     |-  }, [])
     |-
     |-  return {
     |-    formData,
     |-    setFormData,
     |-    handleChange,
     |-    setFieldValue,
     |-    resetForm,
     |-    setValues,
     |-  }
     |-}
```

### `src/layouts/Button.tsx` (modified)
**Valid Comment Ranges (New File):** 14-24
```diff
@@ -14,11 +14,11 @@ interface ButtonProps
  14 | }
  15 | 
  16 | export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
     |-  ({ className, as = "button", variant, intent, size, fullWidth, loading, children, ...props }, ref) => {
  17 |+  ({ className, as = "button", variant, intent, size, fullWidth, loading: _loading, children, ...props }, ref) => {
  18 |     return (
  19 |       <Box
  20 |         as={as}
     |-        ref={ref as any}
  21 |+        ref={ref as React.Ref<any>}
  22 |         cursor="pointer"
  23 |         className={cn(buttonVariants({ variant, intent, size, fullWidth }), className)}
  24 |         {...props}
```

### `src/layouts/ContentDetail.tsx` (removed)
**Valid Comment Ranges (New File):** 0--1
```diff
@@ -1,104 +0,0 @@
     |-import { motion } from 'motion/react';
     |-import { ArrowLeft, Clock, Tag, Share2 } from 'lucide-react';
     |-import ReactMarkdown from 'react-markdown';
     |-import { Box, Stack, Text } from '@/layouts/Primitives';
     |-import { ContentItem } from '@/lib/content';
     |-
     |-interface ContentDetailProps {
     |-  post: ContentItem;
     |-  onBack: () => void;
     |-  backLabel: string;
     |-  children?: React.ReactNode;
     |-}
     |-
     |-export function ContentDetail({ post, onBack, backLabel, children }: ContentDetailProps) {
     |-  const title = post.title;
     |-  const content = post.content;
     |-
     |-  const date = 'date' in post ? post.date : '';
     |-  const category = 'category' in post ? post.category : '';
     |-  const image = 'image' in post ? post.image : undefined;
     |-  const author = 'author' in post ? post.author : 'Ariel';
     |-
     |-  return (
     |-    <Box as="article" padding="panel">
     |-      <Stack gap={12} maxWidth="5xl" marginX="auto" className="w-full">
     |-        <Box
     |-          as="button"
     |-          onClick={onBack}
     |-          display="flex"
     |-          align="center"
     |-          gap={2}
     |-          color="dim"
     |-          className="hover:text-accent-brand transition-colors"
     |-          cursor="pointer"
     |-        >
     |-          <ArrowLeft className="w-4 h-4" />
     |-          <Text variant="mono" size="xs" weight="font-bold">{backLabel}</Text>
     |-        </Box>
     |-
     |-        <Stack gap={8}>
     |-          <Box display="flex" align="center" gap={4}>
     |-            {category && (
     |-              <Box display="flex" align="center" gap={2} color="brand">
     |-                <Tag className="w-3 h-3" />
     |-                <Text variant="mono" size="micro" weight="font-bold" className="uppercase">{category}</Text>
     |-              </Box>
     |-            )}
     |-            {date && (
     |-              <Box display="flex" align="center" gap={2} color="dim">
     |-                <Clock className="w-3 h-3" />
     |-                <Text variant="mono" size="micro">{date}</Text>
     |-              </Box>
     |-            )}
     |-          </Box>
     |-
     |-          <Text as="h1" variant="headline" size="fluid-8" className="tracking-tighter leading-none">
     |-            {title}
     |-          </Text>
     |-
     |-          {image && (
     |-            <Box
     |-              as={motion.div}
     |-              initial={{ opacity: 0, y: 20 }}
     |-              animate={{ opacity: 1, y: 0 }}
     |-              aspect="video"
     |-              overflow="hidden"
     |-              border
     |-              className="bg-muted"
     |-            >
     |-              <img
     |-                src={image}
     |-                alt={title}
     |-                className="w-full h-full object-cover"
     |-              />
     |-            </Box>
     |-          )}
     |-
     |-          {children}
     |-
     |-          <Box className="prose prose-sm md:prose-base prose-slate max-w-none w-full overflow-hidden break-words prose-headings:font-display prose-p:font-sans prose-p:text-text-dim prose-strong:text-text-main">
     |-            <ReactMarkdown
     |-              components={{
     |-                a: ({node, ...props}) => <a {...props} rel="noopener noreferrer" target="_blank" />
     |-              }}
     |-            >
     |-              {content}
     |-            </ReactMarkdown>
     |-          </Box>
     |-
     |-          <Box border="t" paddingTop={12} display="flex" justify="between" align="center">
     |-            <Stack gap={2}>
     |-              <Text variant="mono" size="micro" color="dim">PUBLISHED BY</Text>
     |-              <Text variant="mono" size="xs" weight="font-bold">{author}</Text>
     |-            </Stack>
     |-            <Box as="button" display="flex" align="center" gap={2} color="dim" className="hover:text-accent-brand transition-colors">
     |-              <Share2 className="w-4 h-4" />
     |-              <Text variant="mono" size="xs">Share Content</Text>
     |-            </Box>
     |-          </Box>
     |-        </Stack>
     |-      </Stack>
     |-    </Box>
     |-  );
     |-}
```

### `src/layouts/MainLayout.tsx` (modified)
**Valid Comment Ranges (New File):** 71-78, 83-89
```diff
@@ -71,10 +71,8 @@ export function MainLayout({ children }: { children: React.ReactNode }) {
  71 |           direction="col"
  72 |           scrollBehavior="smooth"
  73 |           scrollPaddingTop={64}
     |-          snap="y"
     |-          transitionProp="all"
     |-          duration={300}
     |-          viewTransitionName="main-content"
  74 |+          className="transition-all duration-300"
  75 |+          style={{ viewTransitionName: 'main-content' }}
  76 |         >
  77 |           <Stack
  78 |             paddingX={{ base: 4, md: 6, lg: 12 }}
@@ -85,8 +83,7 @@ export function MainLayout({ children }: { children: React.ReactNode }) {
  83 |             marginX="auto"
  84 |             maxWidth="7xl"
  85 |             width="full"
     |-            transitionProp="all"
     |-            duration={300}
  86 |+            className="transition-all duration-300"
  87 |           >
  88 |             <Box flex={1} width="full">
  89 |               {children}
```

### `src/lib/content.ts` (modified)
**Valid Comment Ranges (New File):** 114-119, 174-182
```diff
@@ -114,7 +114,6 @@ export interface Event {
 114 |   content: string;
 115 | }
 116 | 
     |-export type ContentType = 'posts' | 'resources' | 'studies' | 'events';
 117 | export type ContentItem = Post | Resource | Study | Event;
 118 | 
 119 | interface ContentModule {
@@ -175,14 +174,9 @@ const maps = {
 174 | export const getPosts = () => items.posts;
 175 | export const getResources = () => items.resources;
 176 | export const getStudies = () => items.studies;
     |-export const getEvents = () => items.events;
 177 | 
 178 | export const getPostBySlug = (slug: string) => maps.posts.get(slug);
 179 | export const getResourceBySlug = (slug: string) => maps.resources.get(slug);
     |-export const getStudyBySlug = (slug: string) => maps.studies.get(slug);
     |-export const getEventBySlug = (slug: string) => maps.events.get(slug);
     |-
     |-export const getAllContent = (type: ContentType): ContentItem[] => items[type];
 180 | 
 181 | /**
 182 |  * Calculates estimated reading time in minutes.
```
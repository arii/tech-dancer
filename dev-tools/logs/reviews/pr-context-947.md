# PR Context: #947 — Refactor Wordmark Props to use Enums/Variants
**Author:** @arii

## Description
Refactored the wordmark styling logic into a reusable `Wordmark` component with predefined variants (`default`, `hero`, `navigation`, `mobile`). This improves maintainability and prevents internal component styles from leaking into parent implementations.

Key changes:
- Created `src/components/ui/Wordmark.tsx` which maps variants to specific configurations (classes, styles, sizes).
- Replaced manual wordmark implementations in `src/components/Navigation.tsx`, `src/components/ui/HeroSection.tsx`, and `src/components/navigation/MobileHeader.tsx` with the new component.
- Ensured consistency in branding and animations across all views.
- Verified with production build and architectural audit.

Fixes #893

---
*PR created automatically by Jules for task [3168348631766881578](https://jules.google.com/task/3168348631766881578) started by @arii*

## Files Changed
- 🟢 `dev-tools/tdw_services.egg-info/PKG-INFO`
- 🟢 `dev-tools/tdw_services.egg-info/SOURCES.txt`
- 🟢 `dev-tools/tdw_services.egg-info/dependency_links.txt`
- 🟢 `dev-tools/tdw_services.egg-info/entry_points.txt`
- 🟢 `dev-tools/tdw_services.egg-info/requires.txt`
- 🟢 `dev-tools/tdw_services.egg-info/top_level.txt`
- 🟢 `get_comments.py`
- 🟡 `src/components/Navigation.tsx`
- 🟡 `src/components/navigation/MobileHeader.tsx`
- 🟡 `src/components/ui/HeroSection.tsx`
- 🟢 `src/components/ui/Wordmark.tsx`
- 🟡 `src/index.css`

## Diffs

### `dev-tools/tdw_services.egg-info/PKG-INFO` (added)
```diff
@@ -0,0 +1,12 @@
   1 |+Metadata-Version: 2.4
   2 |+Name: tdw_services
   3 |+Version: 0.1.0
   4 |+Summary: Tech-Dancer DevTools SDK
   5 |+Author: Tech-Dancer Team
   6 |+Requires-Python: >=3.8
   7 |+Requires-Dist: requests>=2.0.0
   8 |+Requires-Dist: google-genai
   9 |+Requires-Dist: python-dotenv
  10 |+Requires-Dist: pydantic
  11 |+Requires-Dist: click
  12 |+Requires-Dist: PyGithub
```

### `dev-tools/tdw_services.egg-info/SOURCES.txt` (added)
```diff
@@ -0,0 +1,15 @@
   1 |+README.md
   2 |+pyproject.toml
   3 |+tdw_services/__init__.py
   4 |+tdw_services/cli.py
   5 |+tdw_services/orchestrator.py
   6 |+tdw_services.egg-info/PKG-INFO
   7 |+tdw_services.egg-info/SOURCES.txt
   8 |+tdw_services.egg-info/dependency_links.txt
   9 |+tdw_services.egg-info/entry_points.txt
  10 |+tdw_services.egg-info/requires.txt
  11 |+tdw_services.egg-info/top_level.txt
  12 |+tdw_services/services/__init__.py
  13 |+tdw_services/services/gemini.py
  14 |+tdw_services/services/github.py
  15 |+tdw_services/services/jules.py
  16 |\ No newline at end of file
```

### `dev-tools/tdw_services.egg-info/dependency_links.txt` (added)
```diff

```

### `dev-tools/tdw_services.egg-info/entry_points.txt` (added)
```diff
@@ -0,0 +1,2 @@
   1 |+[console_scripts]
   2 |+td-cli = tdw_services.cli:cli
```

### `dev-tools/tdw_services.egg-info/requires.txt` (added)
```diff
@@ -0,0 +1,6 @@
   1 |+requests>=2.0.0
   2 |+google-genai
   3 |+python-dotenv
   4 |+pydantic
   5 |+click
   6 |+PyGithub
```

### `dev-tools/tdw_services.egg-info/top_level.txt` (added)
```diff
@@ -0,0 +1 @@
   1 |+tdw_services
```

### `get_comments.py` (added)
```diff
@@ -0,0 +1,32 @@
   1 |+import sys
   2 |+import os
   3 |+sys.path.append('dev-tools')
   4 |+from utils import get_github_client, get_repo_name
   5 |+import subprocess
   6 |+
   7 |+try:
   8 |+    client = get_github_client()
   9 |+    repo_name = get_repo_name()
  10 |+    print(f"Repo: {repo_name}")
  11 |+    repo = client.get_repo(repo_name)
  12 |+    branch = subprocess.check_output(['git', 'branch', '--show-current']).decode().strip()
  13 |+    print(f"Branch: {branch}")
  14 |+    # The head parameter usually needs "owner:branch" or just "branch"
  15 |+    # Try both if needed, but let's try just the branch first or list all open
  16 |+    prs = list(repo.get_pulls(state='open'))
  17 |+    found = False
  18 |+    for pr in prs:
  19 |+        if pr.head.ref == branch:
  20 |+            found = True
  21 |+            print(f"PR #{pr.number}: {pr.title}")
  22 |+            print("\n--- Issue Comments ---")
  23 |+            for comment in pr.get_issue_comments():
  24 |+                print(f"[{comment.user.login}]: {comment.body}")
  25 |+            print("\n--- Review Comments ---")
  26 |+            for comment in pr.get_review_comments():
  27 |+                line = comment.line if comment.line else comment.original_line
  28 |+                print(f"[{comment.user.login}] ({comment.path}:{line}): {comment.body}")
  29 |+    if not found:
  30 |+        print("No open PR found for this branch.")
  31 |+except Exception as e:
  32 |+    print(f"Error: {e}")
```

### `src/components/Navigation.tsx` (modified)
```diff
@@ -2,8 +2,11 @@ import { Search } from 'lucide-react';
   2 | import { useState, useEffect, useRef } from "react";
   3 | import { NavLink } from 'react-router-dom';
   4 | import { AnimatePresence } from 'motion/react';
     |-import { Box, Stack, Text } from '@/layouts/Primitives';
   5 |+import { Box } from '@/layouts/Box';
   6 |+import { Stack } from '@/layouts/Stack';
   7 |+import { Text as Typography } from '@/layouts/Text';
   8 | import { Logo } from '@/components/ui/Logo';
   9 |+import { Wordmark } from '@/components/ui/Wordmark';
  10 | 
  11 | import { routes } from '@/config/routes';
  12 | import { useGlobalSearch } from '@/hooks/useGlobalSearch';
@@ -94,19 +97,7 @@ export default function Navigation() {
  97 |               className="h-8 w-auto text-white transition-opacity group-hover:opacity-80"
  98 |             />
  99 |             {/* Wordmark */}
     |-            <Box paddingY={0} className="mt-0.5 leading-none">
     |-              <Text
     |-                variant="sans"
     |-                size="sm"
     |-                weight="font-extrabold"
     |-                className="leading-none text-white"
     |-                style={{ letterSpacing: '0.05em' }}
     |-              >
     |-                boom
     |-                <span className="text-accent">tick</span>
     |-                <span className="text-white/60 font-light">.blog</span>
     |-              </Text>
     |-            </Box>
 100 |+            <Wordmark variant="navigation" />
 101 |           </Box>
 102 | 
 103 |           <Stack as="ul" gap={1} flex={1} paddingY={4}>
@@ -125,7 +116,7 @@ export default function Navigation() {
 116 |                 className="group text-text-dim hover:text-accent transition-all text-left hover:bg-surface-alt"
 117 |               >
 118 |                 <Search className="w-4 h-4 opacity-70 group-hover:opacity-100 flex-shrink-0" />
     |-                <Text variant="sans" size="sm" weight="font-medium" className="leading-none">Search</Text>
 119 |+                <Typography variant="sans" size="sm" weight="font-medium" className="leading-none">Search</Typography>
 120 |               </Box>
 121 |             </Box>
 122 | 
@@ -135,12 +126,12 @@ export default function Navigation() {
 126 |           </Stack>
 127 | 
 128 |           <Box paddingX={6} paddingY={5} className="border-t border-line bg-surface">
     |-            <Text variant="sans" size="xs" color="dim" className="mb-1 leading-normal">
 129 |+            <Typography variant="sans" size="xs" color="dim" className="mb-1 leading-normal">
 130 |               Written by <strong className="text-accent">Tech Dancer </strong>
     |-            </Text>
     |-            <Text variant="mono" size="tiny" color="dim" uppercase className="tracking-widest opacity-60 leading-none">
 131 |+            </Typography>
 132 |+            <Typography variant="mono" size="tiny" color="dim" uppercase className="tracking-widest opacity-60 leading-none">
 133 |               2026 boomtick.blog
     |-            </Text>
 134 |+            </Typography>
 135 |           </Box>
 136 |         </Stack>
 137 |       </Box>
```

### `src/components/navigation/MobileHeader.tsx` (modified)
```diff
@@ -1,8 +1,9 @@
   1 | import { Menu, X } from 'lucide-react';
   2 | import { NavLink } from 'react-router-dom';
   3 | import { motion } from 'motion/react';
     |-import { Box, Text } from '@/layouts/Primitives';
   4 |+import { Box } from '@/layouts/Box';
   5 | import { Logo } from '@/components/ui/Logo';
   6 |+import { Wordmark } from '@/components/ui/Wordmark';
   7 | 
   8 | interface MobileHeaderProps {
   9 |   isOpen: boolean;
@@ -22,17 +23,7 @@ export function MobileHeader({ isOpen, onToggle, onClose }: MobileHeaderProps) {
  23 |       {/* Logo: B● mark + wordmark — matches sidebar and hero styling */}
  24 |       <Box as={NavLink} to="/" onClick={onClose} display="flex" align="center" gap={2}>
  25 |         <Logo showText={false} className="h-8 w-auto text-white flex-shrink-0" />
     |-        <Text
     |-          variant="sans"
     |-          size="sm"
     |-          weight="font-extrabold"
     |-          className="leading-none text-white"
     |-          style={{ letterSpacing: '0.05em' }}
     |-        >
     |-          boom
     |-          <span className="text-accent">tick</span>
     |-          <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}>.blog</span>
     |-        </Text>
  26 |+        <Wordmark variant="mobile" />
  27 |       </Box>
  28 | 
  29 |       <Box
```

### `src/components/ui/HeroSection.tsx` (modified)
```diff
@@ -2,8 +2,11 @@
   2 | import { useMemo } from 'react';
   3 | 
   4 | import { HeroParticleCanvas } from './HeroParticleCanvas';
     |-import { Stack, Text, Box } from '@/layouts/Primitives';
   5 |+import { Stack } from '@/layouts/Stack';
   6 |+import { Box } from '@/layouts/Box';
   7 |+import { Text as Typography } from '@/layouts/Text';
   8 | import { Logo } from './Logo';
   9 |+import { Wordmark } from './Wordmark';
  10 | import { HERO_CONFIG } from '@/config/hero';
  11 | 
  12 | interface WaveBar {
@@ -68,18 +71,7 @@ export function HeroSection() {
  71 |         </Box>
  72 | 
  73 |         {/* Wordmark: boomtick.blog - matches sidebar styling */}
     |-        <Box
     |-          className="text-white mt-3 opacity-0 translate-y-2.5"
     |-          style={{
     |-            fontSize: 'clamp(18px, 4vw, 28px)',
     |-            letterSpacing: '0.05em',
     |-            animation: 'fadeUp 0.7s ease forwards 0.4s',
     |-            fontWeight: 800,
     |-            fontFamily: '"Bricolage Grotesque", "Albert Sans", sans-serif',
     |-          }}
     |-        >
     |-          boom<span className="text-accent">tick</span><span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>.blog</span>
     |-        </Box>
  74 |+        <Wordmark variant="hero" />
  75 | 
  76 |         {/* Visual-style Headline - Editorial Serif with Balanced Visual Weight */}
  77 |         <Stack
@@ -90,29 +82,29 @@ export function HeroSection() {
  82 |           className="opacity-0 translate-y-2.5"
  83 |           style={{ animation: 'fadeUp 0.7s ease forwards 0.7s' }}
  84 |         >
     |-          <Text
  85 |+          <Typography
  86 |             as="span"
  87 |             variant="hero"
  88 |             color="white"
  89 |             className="text-3xl md:text-5xl lg:text-6xl"
  90 |           >
  91 |             Built for dancers.
     |-          </Text>
     |-          <Text
  92 |+          </Typography>
  93 |+          <Typography
  94 |             as="span"
  95 |             variant="hero"
  96 |             className="text-[2rem] md:text-[3.5rem] lg:text-[4rem]"
  97 |           >
  98 |             <span style={{ color: 'var(--hero-accent)' }}>Train smarter.</span>
     |-          </Text>
     |-          <Text
  99 |+          </Typography>
 100 |+          <Typography
 101 |             as="span"
 102 |             variant="hero"
 103 |             color="white"
 104 |             className="text-[2rem] md:text-[3.5rem] lg:text-[4rem]"
 105 |           >
 106 |             Dance better.
     |-          </Text>
 107 |+          </Typography>
 108 |         </Stack>
 109 | 
 110 |         {/* Gradient Accent Line below headline */}
@@ -147,7 +139,7 @@ export function HeroSection() {
 139 |             className="bg-white/20 shrink-0"
 140 |             aria-hidden="true"
 141 |           />
     |-          <Text
 142 |+          <Typography
 143 |             as="p"
 144 |             variant="body"
 145 |             weight="font-normal"
@@ -160,7 +152,7 @@ export function HeroSection() {
 152 |           >
 153 |             Training tips, travel guides, and gear reviews for competitive West Coast Swing dancers,
 154 |             plus technical deep dives into building the platform with DevAI.
     |-          </Text>
 155 |+          </Typography>
 156 |         </Box>
 157 | 
 158 |         {/* Waveform - Height fixed and overflow-hidden for layout stability. Margin adjusted for breathing room. */}
```

### `src/components/ui/Wordmark.tsx` (added)
```diff
@@ -0,0 +1,35 @@
   1 |+import { cn } from '@/lib/utils';
   2 |+
   3 |+export type WordmarkVariant = 'default' | 'hero' | 'navigation' | 'mobile';
   4 |+
   5 |+interface WordmarkProps {
   6 |+  variant?: WordmarkVariant;
   7 |+  className?: string;
   8 |+}
   9 |+
  10 |+/**
  11 |+ * Wordmark component for "boomtick.blog".
  12 |+ * Uses Tailwind utility classes to ensure consistent styling across navigation, hero, and mobile views.
  13 |+ */
  14 |+export function Wordmark({ variant = 'default', className }: WordmarkProps) {
  15 |+  const isHero = variant === 'hero';
  16 |+  const isNav = variant === 'navigation';
  17 |+  const isMobile = variant === 'mobile';
  18 |+
  19 |+  return (
  20 |+    <div
  21 |+      className={cn(
  22 |+        "wordmark-base",
  23 |+        isHero && "wordmark-hero",
  24 |+        isNav && "wordmark-nav",
  25 |+        isMobile && "wordmark-mobile",
  26 |+        className
  27 |+      )}
  28 |+    >
  29 |+      boom<span className="text-accent">tick</span>
  30 |+      <span className={cn("font-light", isHero ? "text-white/70" : "text-white/60")}>
  31 |+        .blog
  32 |+      </span>
  33 |+    </div>
  34 |+  );
  35 |+}
```

### `src/index.css` (modified)
```diff
@@ -124,6 +124,23 @@
 124 |       linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
 125 |     background-size: 20px 20px;
 126 |   }
 127 |+
 128 |+  /* Wordmark Utilities */
 129 |+  .wordmark-base {
 130 |+    @apply font-extrabold text-white flex items-center tracking-[0.05em];
 131 |+  }
 132 |+  .wordmark-hero {
 133 |+    @apply font-display mt-3 opacity-0;
 134 |+    transform: translateY(10px);
 135 |+    font-size: clamp(18px, 4vw, 28px);
 136 |+    animation: fadeUp 0.7s ease forwards 0.4s;
 137 |+  }
 138 |+  .wordmark-nav {
 139 |+    @apply font-sans text-sm mt-0.5;
 140 |+  }
 141 |+  .wordmark-mobile {
 142 |+    @apply font-sans text-sm;
 143 |+  }
 144 | }
 145 | 
 146 | @layer base {
```
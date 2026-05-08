# PR Context: #922 — chore: Consolidated Branding Improvements
**Author:** @arii

## Description
Consolidates #906 and #910

## Files Changed
- 🟡 `boomtick_logo.svg`
- 🟡 `public/favicon.svg`
- 🟡 `src/components/Navigation.tsx`
- 🟡 `src/components/navigation/MobileHeader.tsx`
- 🟡 `src/components/ui/BrandIcon.tsx`
- 🟡 `src/components/ui/HeroSection.tsx`
- 🟡 `src/components/ui/Logo.tsx`
- 🟢 `src/components/ui/Wordmark.tsx`
- 🟡 `src/styles/design-tokens.ts`
- 🟡 `tests/previews.spec.ts`
- 🟡 `tests/visual.spec.ts-snapshots/home-chromium-linux.png`

## Diffs

### `boomtick_logo.svg` (modified)
```diff
@@ -1,15 +1,8 @@
   1 | <svg viewBox="0 0 450 110" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-full w-auto max-w-none overflow-visible" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
     |-  <style>
     |-    :root {
     |-      --brand-accent: #0891b2;
     |-      --brand-accent-hero: #00CFFF;
     |-      --brand-accent-purple: #8b5cf6;
     |-    }
     |-  </style>
   2 |   <defs>
   3 |     <linearGradient id="logo-grad" x1="0%" y1="0%" x2="0%" y2="100%">
   4 |       <stop offset="0%" stop-color="#00CFFF" />
     |-      <stop offset="100%" stop-color="#8b5cf6" />
   5 |+      <stop offset="100%" stop-color="#8B5CF6" />
   6 |     </linearGradient>
   7 |     <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
   8 |       <feGaussianBlur stdDeviation="3" result="blur" />
```

### `public/favicon.svg` (modified)
```diff
@@ -1,16 +1,9 @@
   1 | <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
     |-  <style>
     |-    :root {
     |-      --brand-bg: #020617;
     |-      --brand-accent: #00CFFF;
     |-      --brand-accent-purple: #8b5cf6;
     |-    }
     |-  </style>
   2 |   <rect width="64" height="64" rx="14" fill="#020617"/>
   3 |   <defs>
   4 |     <linearGradient id="favicon-grad" x1="0%" y1="0%" x2="0%" y2="100%">
   5 |       <stop offset="0%" stop-color="#00CFFF" />
     |-      <stop offset="100%" stop-color="#8b5cf6" />
   6 |+      <stop offset="100%" stop-color="#8B5CF6" />
   7 |     </linearGradient>
   8 |     <filter id="favicon-glow" x="-50%" y="-50%" width="200%" height="200%">
   9 |       <feGaussianBlur stdDeviation="2" result="blur" />
```

### `src/components/Navigation.tsx` (modified)
```diff
@@ -4,6 +4,7 @@ import { NavLink } from 'react-router-dom';
   4 | import { AnimatePresence } from 'motion/react';
   5 | import { Box, Stack, Text } from '@/layouts/Primitives';
   6 | import { Logo } from '@/components/ui/Logo';
   7 |+import { Wordmark } from '@/components/ui/Wordmark';
   8 | 
   9 | import { routes } from '@/config/routes';
  10 | import { useGlobalSearch } from '@/hooks/useGlobalSearch';
@@ -93,19 +94,8 @@ export default function Navigation() {
  94 |               showText={false}
  95 |               className="h-8 w-auto text-white transition-opacity group-hover:opacity-80"
  96 |             />
     |-            {/* Wordmark */}
  97 |             <Box paddingY={0} className="mt-0.5 leading-none">
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
  98 |+              <Wordmark variant="nav" />
  99 |             </Box>
 100 |           </Box>
 101 | 
```

### `src/components/navigation/MobileHeader.tsx` (modified)
```diff
@@ -1,8 +1,9 @@
   1 | import { Menu, X } from 'lucide-react';
   2 | import { NavLink } from 'react-router-dom';
   3 | import { motion } from 'motion/react';
     |-import { Box, Text } from '@/layouts/Primitives';
   4 |+import { Box } from '@/layouts/Primitives';
   5 | import { Logo } from '@/components/ui/Logo';
   6 |+import { Wordmark } from '@/components/ui/Wordmark';
   7 | 
   8 | interface MobileHeaderProps {
   9 |   isOpen: boolean;
@@ -19,20 +20,9 @@ export function MobileHeader({ isOpen, onToggle, onClose }: MobileHeaderProps) {
  20 |       border="b"
  21 |       className="transition-[backdrop-filter] duration-300 bg-surface border-line"
  22 |     >
     |-      {/* Logo: B● mark + wordmark — matches sidebar and hero styling */}
  23 |       <Box as={NavLink} to="/" onClick={onClose} display="flex" align="center" gap={2}>
  24 |         <Logo showText={false} className="h-8 w-auto text-white flex-shrink-0" />
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
  25 |+        <Wordmark variant="nav" />
  26 |       </Box>
  27 | 
  28 |       <Box
```

### `src/components/ui/BrandIcon.tsx` (modified)
```diff
@@ -20,12 +20,12 @@ export function BrandIcon({ className, showBackground = false }: BrandIconProps)
  20 |       fill="none"
  21 |     >
  22 |       <title id={titleId}>BoomTick Icon</title>
     |-      {showBackground && <rect width="64" height="64" rx="12" fill="#0D0E1C" />}
  23 |+      {showBackground && <rect width="64" height="64" rx="12" fill="#020617" />}
  24 | 
  25 |       <defs>
  26 |         <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
     |-          <stop offset="0%" stopColor="#40c4ff" />
     |-          <stop offset="100%" stopColor="#9d27ff" />
  27 |+          <stop offset="0%" stopColor="var(--hero-accent, #00CFFF)" />
  28 |+          <stop offset="100%" stopColor="var(--color-accent-purple, #8B5CF6)" />
  29 |         </linearGradient>
  30 |         <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
  31 |           <feGaussianBlur stdDeviation="2" result="blur" />
@@ -41,7 +41,7 @@ export function BrandIcon({ className, showBackground = false }: BrandIconProps)
  41 |           fontSize="44"
  42 |           fontWeight="700"
  43 |           fontStyle="italic"
     |-          fill="#f1f5f9"
  44 |+          fill="var(--color-text-main, #f1f5f9)"
  45 |           transform="skewX(-8)"
  46 |         >
  47 |           B
```

### `src/components/ui/HeroSection.tsx` (modified)
```diff
@@ -4,6 +4,7 @@ import { useMemo } from 'react';
   4 | import { HeroParticleCanvas } from './HeroParticleCanvas';
   5 | import { Stack, Text, Box } from '@/layouts/Primitives';
   6 | import { Logo } from './Logo';
   7 |+import { Wordmark } from './Wordmark';
   8 | import { HERO_CONFIG } from '@/config/hero';
   9 | 
  10 | interface WaveBar {
@@ -67,27 +68,22 @@ export function HeroSection() {
  68 |           <Logo className="text-white" showText={false} />
  69 |         </Box>
  70 | 
     |-        {/* Wordmark: boomtick.blog - matches sidebar styling */}
     |-        <Box
     |-          className="text-white mt-3 opacity-0 translate-y-2.5"
  71 |+        <Wordmark
  72 |+          variant="hero"
  73 |+          className="mt-3 opacity-0 translate-y-2.5"
  74 |           style={{
  75 |             fontSize: 'clamp(18px, 4vw, 28px)',
     |-            letterSpacing: '0.05em',
  76 |             animation: 'fadeUp 0.7s ease forwards 0.4s',
     |-            fontWeight: 800,
     |-            fontFamily: '"Bricolage Grotesque", "Albert Sans", sans-serif',
  77 |           }}
     |-        >
     |-          boom<span className="text-accent">tick</span><span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>.blog</span>
     |-        </Box>
  78 |+        />
  79 | 
  80 |         {/* Visual-style Headline - Editorial Serif with Balanced Visual Weight */}
  81 |         <Stack
  82 |           as="h1"
  83 |           marginTop={{ base: 5, lg: 6 }}
  84 |           align="start"
  85 |           gap={0}
     |-          className="opacity-0 translate-y-2.5"
  86 |+          className="opacity-0 translate-y-2.5 pointer-events-auto"
  87 |           style={{ animation: 'fadeUp 0.7s ease forwards 0.7s' }}
  88 |         >
  89 |           <Text
```

### `src/components/ui/Logo.tsx` (modified)
```diff
@@ -28,8 +28,8 @@ export function Logo({ className, showText = true }: LogoProps) {
  28 |       <title id={titleId}>BoomTick Logo</title>
  29 |       <defs>
  30 |         <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
     |-          <stop offset="0%" stopColor="#00CFFF" />
     |-          <stop offset="100%" stopColor="#8b5cf6" />
  31 |+          <stop offset="0%" stopColor="var(--hero-accent, #00CFFF)" />
  32 |+          <stop offset="100%" stopColor="var(--color-accent-purple, #8B5CF6)" />
  33 |         </linearGradient>
  34 |         <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
  35 |           <feGaussianBlur stdDeviation="3" result="blur" />
@@ -76,7 +76,7 @@ export function Logo({ className, showText = true }: LogoProps) {
  76 |             letterSpacing: '-1.5px'
  77 |           }}
  78 |         >
     |-          boom<tspan fill="#00CFFF">tick</tspan><tspan fill="rgba(255,255,255,0.6)" fontWeight="300">.blog</tspan>
  79 |+          boom<tspan fill="var(--hero-accent, #00CFFF)">tick</tspan><tspan fill="var(--color-text-dim, rgba(255,255,255,0.6))" fontWeight="300">.blog</tspan>
  80 |         </text>
  81 |       )}
  82 |     </svg>
```

### `src/components/ui/Wordmark.tsx` (added)
```diff
@@ -0,0 +1,44 @@
   1 |+import { Text, TextProps } from '@/layouts/Primitives';
   2 |+import { cn } from '@/lib/utils';
   3 |+
   4 |+export type WordmarkVariant = "nav" | "hero";
   5 |+
   6 |+export interface WordmarkProps extends Omit<TextProps, 'variant'> {
   7 |+  variant?: WordmarkVariant;
   8 |+}
   9 |+
  10 |+const VARIANT_MAP: Record<NonNullable<WordmarkProps["variant"]>, TextProps["variant"]> = {
  11 |+  nav: "wordmark",
  12 |+  hero: "wordmarkHero",
  13 |+};
  14 |+
  15 |+export function Wordmark({
  16 |+  className,
  17 |+  style,
  18 |+  variant = "nav",
  19 |+  size,
  20 |+  weight,
  21 |+  ...props
  22 |+}: WordmarkProps) {
  23 |+  const isHero = variant === "hero";
  24 |+
  25 |+  return (
  26 |+    <Text
  27 |+      variant={VARIANT_MAP[variant]}
  28 |+      size={size || (isHero ? undefined : "sm")}
  29 |+      weight={weight || "font-extrabold"}
  30 |+      className={cn(className)}
  31 |+      style={style}
  32 |+      tracking="wordmark"
  33 |+      {...props}
  34 |+    >
  35 |+      boom
  36 |+      <span className="text-accent">tick</span>
  37 |+      <span
  38 |+        className="text-text-body font-light opacity-70"
  39 |+      >
  40 |+        .blog
  41 |+      </span>
  42 |+    </Text>
  43 |+  );
  44 |+}
```

### `src/styles/design-tokens.ts` (modified)
```diff
@@ -95,6 +95,7 @@ export const tracking = {
  95 |   emphasized: "tracking-[0.15em]",
  96 |   utility: "tracking-[3px]",
  97 |   label: "tracking-[2px]",
  98 |+  wordmark: "tracking-[0.05em]",
  99 | };
 100 | 
 101 | export const typography = {
@@ -112,6 +113,9 @@ export const typography = {
 113 |   tight: "tracking-[0.15em] uppercase",
 114 |   content: "font-sans leading-relaxed text-text-body max-w-[70ch]",
 115 |   headerAccent: `font-mono font-bold ${tracking["wide-editorial"]} uppercase text-accent`,
 116 |+  sans: "font-sans",
 117 |+  wordmark: `font-sans leading-none text-white ${tracking.wordmark}`,
 118 |+  wordmarkHero: `font-display leading-none text-white ${tracking.wordmark}`,
 119 | };
 120 | 
 121 | export const typeSizes = {
```

### `tests/previews.spec.ts` (modified)
```diff
@@ -1,10 +1,16 @@
     |-import { test, expect } from '@playwright/test';
   1 |+import { test, expect, Page } from '@playwright/test';
   2 |+
   3 |+async function gotoPreviewDashboard(page: Page) {
   4 |+  const baseURL = page.context()._options.baseURL || 'http://localhost:4173/';
   5 |+  // We resolve the previews path against the baseURL which includes the necessary VITE_BASE_PATH
   6 |+  const targetUrl = new URL('previews/index.html', baseURL).href;
   7 |+  await page.goto(targetUrl);
   8 |+  await page.waitForLoadState('networkidle');
   9 |+}
  10 | 
  11 | test.describe('Preview Dashboard', () => {
  12 |   test('should load the dashboard and show initial elements', async ({ page }) => {
     |-    // Navigate to the preview dashboard using a relative path to ensure correct resolution against baseURL
     |-    await page.goto(process.env.CI ? './previews/index.html' : '/previews/index.html');
     |-    await page.waitForLoadState('networkidle');
  13 |+    await gotoPreviewDashboard(page);
  14 | 
  15 |     // Check title
  16 |     await expect(page).toHaveTitle(/Preview Environments/);
@@ -23,8 +29,7 @@ test.describe('Preview Dashboard', () => {
  29 |   });
  30 | 
  31 |   test('responsive layout check', async ({ page }) => {
     |-    await page.goto(process.env.CI ? './previews/index.html' : '/previews/index.html');
     |-    await page.waitForLoadState('networkidle');
  32 |+    await gotoPreviewDashboard(page);
  33 | 
  34 |     // Desktop view
  35 |     await page.setViewportSize({ width: 1440, height: 900 });
```

### `tests/visual.spec.ts-snapshots/home-chromium-linux.png` (modified)
```diff

```
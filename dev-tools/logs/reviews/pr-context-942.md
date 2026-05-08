# PR Context: #942 — Refactor HeroSection to remove unused useMemo and optimize static data
**Author:** @arii

## Description
The useMemo hook in src/components/ui/HeroSection.tsx was used to generate a deterministic list of bars for the hero waveform animation. Since this data is derived from static HERO_CONFIG, I moved the generation logic to a module-level constant (BARS) to adhere to project coding standards and avoid unnecessary re-renders. This change makes useMemo truly redundant, so I removed its import and usage.

Fixes #897

---
*PR created automatically by Jules for task [10568282859807385424](https://jules.google.com/task/10568282859807385424) started by @arii*

## Files Changed
- 🟡 `src/components/ui/HeroSection.tsx`

## Diffs

### `src/components/ui/HeroSection.tsx` (modified)
```diff
@@ -1,29 +1,17 @@
   1 | // impeccable-ignore-file
     |-import { useMemo } from 'react';
     |-
   2 | import { HeroParticleCanvas } from './HeroParticleCanvas';
   3 | import { Stack, Text, Box } from '@/layouts/Primitives';
   4 | import { Logo } from './Logo';
   5 | import { HERO_CONFIG } from '@/config/hero';
   6 | 
     |-interface WaveBar {
     |-  height: number;
     |-  dur: string;
     |-  delay: string;
     |-}
   7 |+// Generate deterministic bar data based on index to prevent visual regression flakiness
   8 |+const BARS = Array.from({ length: HERO_CONFIG.BAR_COUNT }, (_, i) => ({
   9 |+  height: 20 + ((i * HERO_CONFIG.SEEDS.BAR_HEIGHT) % 36),
  10 |+  dur: (0.4 + ((i * HERO_CONFIG.SEEDS.BAR_DUR) % 0.8)).toFixed(2) + 's',
  11 |+  delay: ((i * HERO_CONFIG.SEEDS.BAR_DELAY) % 0.8).toFixed(2) + 's',
  12 |+})) as const;
  13 | 
  14 | export function HeroSection() {
     |-  const BAR_COUNT = HERO_CONFIG.BAR_COUNT;
     |-  const SEEDS = HERO_CONFIG.SEEDS;
     |-
     |-  // Generate deterministic bar data based on index to prevent visual regression flakiness
     |-  const bars: WaveBar[] = useMemo(() =>
     |-    Array.from({ length: BAR_COUNT }, (_, i) => ({
     |-      height: 20 + ((i * SEEDS.BAR_HEIGHT) % 36),
     |-      dur: (0.4 + ((i * SEEDS.BAR_DUR) % 0.8)).toFixed(2) + 's',
     |-      delay: ((i * SEEDS.BAR_DELAY) % 0.8).toFixed(2) + 's',
     |-    })),
     |-    [BAR_COUNT, SEEDS]);
  15 | 
  16 |   return (
  17 |     <section
@@ -176,7 +164,7 @@ export function HeroSection() {
 164 |           style={{ animation: 'fadeIn 1s ease forwards 2.0s' }}
 165 |           aria-hidden="true"
 166 |         >
     |-          {bars.map((bar, i) => (
 167 |+          {BARS.map((bar, i) => (
 168 |             <Box
 169 |               key={i}
 170 |               radius="none"
```
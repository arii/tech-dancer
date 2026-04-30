# PR Context: #457 — Fix Mobile UX Audit Findings and Prop Leakage
**Author:** @arii

## Description
This PR addresses the findings from the UX Audit performed on 2026-04-29.

Key changes:
1. **Spacing Fix**: Increased `paddingTop` for the main content stack on mobile in `MainLayout.tsx` to prevent the "BIOGRAPHY" label from being too close to the sticky header.
2. **Prop Leakage Mitigation**: Updated the `Box` primitive in `src/layouts/Box.tsx` to explicitly filter out Framer Motion props when they are undefined or when the underlying component is a standard DOM element. This resolves console warnings about `whileHover` and other motion props leaking to the DOM.
3. **Design System Compliance**: Fixed an API violation in `src/features/profile/ArielProfile.tsx` by replacing `flexWrap="wrap"` with the supported `wrap` prop.
4. **Layout Cleanup**: Removed non-system props (`snap`, `transitionProp`, `duration`, `viewTransitionName`) from `MainLayout.tsx` that were leaking to the DOM.

Verification:
- Build and lint pass.
- Functional E2E tests pass.
- Manual visual verification performed for mobile viewport.

Fixes #451

---
*PR created automatically by Jules for task [10558571366235403707](https://jules.google.com/task/10558571366235403707) started by @arii*

## Files Changed
- 🟡 `src/features/profile/ArielProfile.tsx`
- 🟡 `src/layouts/Box.tsx`
- 🟡 `src/layouts/MainLayout.tsx`
- 🟡 `tests/visual.spec.ts-snapshots/about-chromium-linux.png`
- 🟡 `tests/visual.spec.ts-snapshots/blog-chromium-linux.png`
- 🟡 `tests/visual.spec.ts-snapshots/contact-chromium-linux.png`
- 🟡 `tests/visual.spec.ts-snapshots/gear-chromium-linux.png`
- 🟡 `tests/visual.spec.ts-snapshots/home-chromium-linux.png`
- 🟡 `tests/visual.spec.ts-snapshots/research-chromium-linux.png`

## Diffs

### `src/features/profile/ArielProfile.tsx` (modified)
```diff
@@ -50,7 +50,7 @@ export default function ArielProfile() {
  50 | 
  51 |               <Stack gap={6} border="t" paddingTop={8} className="border-line/20">
  52 |                 <Text variant="mono" size="xs" color="brand" weight="font-bold">CONNECT & NETWORKING</Text>
     |-                <Box display="flex" gap={4} flexWrap="wrap">
  53 |+                <Box display="flex" gap={4} wrap>
  54 |                   {[
  55 |                     { label: 'INSTAGRAM', url: 'https://instagram.com' },
  56 |                     { label: 'LINKEDIN', url: 'https://linkedin.com/in/arianders' },
```

### `src/layouts/Box.tsx` (modified)
```diff
@@ -86,11 +86,28 @@ export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  86 |   }, ref) => {
  87 |     const isMotion = typeof Component !== "string"
  88 |     
     |-    const motionProps = isMotion ? {
     |-      initial, animate, exit, transition, variants: variantsProp, whileHover, whileTap,
     |-      whileFocus, whileDrag, whileInView, viewport, layout: layoutProp,
     |-      layoutId, onAnimationStart, onAnimationComplete, onUpdate, custom
     |-    } : {}
  89 |+    const MOTION_PROPS = [
  90 |+      'initial', 'animate', 'exit', 'transition', 'variants',
  91 |+      'whileHover', 'whileTap', 'whileFocus', 'whileDrag', 'whileInView',
  92 |+      'viewport', 'layout', 'layoutId', 'onAnimationStart',
  93 |+      'onAnimationComplete', 'onUpdate', 'custom'
  94 |+    ];
  95 |+
  96 |+    const motionProps: Record<string, unknown> = {}
  97 |+    if (isMotion) {
  98 |+      const allMotionProps = {
  99 |+        initial, animate, exit, transition, variants: variantsProp,
 100 |+        whileHover, whileTap, whileFocus, whileDrag, whileInView, viewport,
 101 |+        layout: layoutProp, layoutId, onAnimationStart, onAnimationComplete,
 102 |+        onUpdate, custom
 103 |+      };
 104 |+
 105 |+      Object.entries(allMotionProps).forEach(([key, value]) => {
 106 |+        if (value !== undefined && MOTION_PROPS.includes(key)) {
 107 |+          motionProps[key] = value;
 108 |+        }
 109 |+      });
 110 |+    }
 111 | 
 112 |     const borderClasses = cn(
 113 |       border === true && "border border-line",
```

### `src/layouts/MainLayout.tsx` (modified)
```diff
@@ -145,22 +145,16 @@ export function MainLayout({ children }: { children: React.ReactNode }) {
 145 |           direction="col"
 146 |           scrollBehavior="smooth"
 147 |           scrollPaddingTop={64}
     |-          snap="y"
     |-          transitionProp="all"
     |-          duration={300}
     |-          viewTransitionName="main-content"
 148 |         >
 149 |           <Stack
 150 |             paddingX={{ base: 4, md: 6, lg: 12 }}
     |-            paddingTop={12}
 151 |+            paddingTop={{ base: 16, md: 12 }}
 152 |             paddingBottom={showEmailBar ? { base: 64, md: 80 } : { base: 28, md: 12 }}
 153 |             flex={1}
 154 |             direction="col"
 155 |             marginX="auto"
 156 |             maxWidth="7xl"
 157 |             width="full"
     |-            transitionProp="all"
     |-            duration={300}
 158 |           >
 159 |             <Box flex={1} width="full">
 160 |               {children}
```

### `tests/visual.spec.ts-snapshots/about-chromium-linux.png` (modified)
```diff

```

### `tests/visual.spec.ts-snapshots/blog-chromium-linux.png` (modified)
```diff

```

### `tests/visual.spec.ts-snapshots/contact-chromium-linux.png` (modified)
```diff

```

### `tests/visual.spec.ts-snapshots/gear-chromium-linux.png` (modified)
```diff

```

### `tests/visual.spec.ts-snapshots/home-chromium-linux.png` (modified)
```diff

```

### `tests/visual.spec.ts-snapshots/research-chromium-linux.png` (modified)
```diff

```
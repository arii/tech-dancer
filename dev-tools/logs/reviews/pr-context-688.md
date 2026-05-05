# PR Context: #688 — Fix UI/UX, Accessibility and Profile Gallery issues
**Author:** @arii

## Description
Fixes multiple frontend UI/UX and accessibility issues found in the audit report.

---
*PR created automatically by Jules for task [15631158062664361517](https://jules.google.com/task/15631158062664361517) started by @arii*

## Files Changed
- 🟡 `.github/workflows/ci.yml`
- 🟡 `src/components/GlobalSearch.tsx`
- 🔴 `src/components/ui/CardImagePlaceholder.tsx`
- 🟡 `src/components/ui/HeroPathCard.tsx`
- 🟡 `src/components/ui/PageHeader.tsx`
- 🟡 `src/features/email-capture/EmailForm.tsx`
- 🟡 `src/features/email-capture/NewsletterBanner.tsx`
- 🟡 `src/features/profile/ArielProfile.tsx`
- 🟡 `src/features/profile/components/ProfileComponents.tsx`
- 🟡 `src/features/profile/useProfile.ts`
- 🟡 `src/layouts/Footer.tsx`
- 🟡 `tests/visual.spec.ts-snapshots/about-chromium-linux.png`
- 🟡 `tests/visual.spec.ts-snapshots/blog-chromium-linux.png`
- 🟡 `tests/visual.spec.ts-snapshots/contact-chromium-linux.png`
- 🟡 `tests/visual.spec.ts-snapshots/gear-chromium-linux.png`
- 🟡 `tests/visual.spec.ts-snapshots/home-chromium-linux.png`
- 🟡 `tests/visual.spec.ts-snapshots/research-chromium-linux.png`

## Diffs

### `.github/workflows/ci.yml` (modified)
```diff
@@ -50,15 +50,15 @@ jobs:
  50 |     runs-on: ubuntu-latest
  51 |     steps:
  52 |       - name: Checkout
     |-        uses: actions/checkout@v4
  53 |+        uses: actions/checkout@v4.2.2
  54 |         with:
  55 |           fetch-depth: 0
  56 | 
  57 |       - name: Setup pnpm
     |-        uses: pnpm/action-setup@v4
  58 |+        uses: pnpm/action-setup@v4.0.0
  59 | 
  60 |       - name: Setup Node.js
     |-        uses: actions/setup-node@v4
  61 |+        uses: actions/setup-node@v4.1.0
  62 |         with:
  63 |           node-version: 24
  64 |           cache: pnpm
@@ -96,15 +96,15 @@ jobs:
  96 |     runs-on: ubuntu-latest
  97 |     steps:
  98 |       - name: Checkout
     |-        uses: actions/checkout@v4
  99 |+        uses: actions/checkout@v4.2.2
 100 |         with:
 101 |           fetch-depth: 0
 102 | 
 103 |       - name: Setup pnpm
     |-        uses: pnpm/action-setup@v4
 104 |+        uses: pnpm/action-setup@v4.0.0
 105 | 
 106 |       - name: Setup Node.js
     |-        uses: actions/setup-node@v4
 107 |+        uses: actions/setup-node@v4.1.0
 108 |         with:
 109 |           node-version: 24
 110 |           cache: pnpm
@@ -137,13 +137,13 @@ jobs:
 137 |     runs-on: ubuntu-latest
 138 |     steps:
 139 |       - name: Checkout
     |-        uses: actions/checkout@v4
 140 |+        uses: actions/checkout@v4.2.2
 141 | 
 142 |       - name: Setup pnpm
     |-        uses: pnpm/action-setup@v4
 143 |+        uses: pnpm/action-setup@v4.0.0
 144 | 
 145 |       - name: Setup Node.js
     |-        uses: actions/setup-node@v4
 146 |+        uses: actions/setup-node@v4.1.0
 147 |         with:
 148 |           node-version: 24
 149 |           cache: pnpm
```

### `src/components/GlobalSearch.tsx` (modified)
```diff
@@ -80,7 +80,7 @@ export function GlobalSearch() {
  80 |         position="absolute"
  81 |         inset={true}
  82 |         data-testid="search-backdrop"
     |-        className="bg-bg/80 backdrop-blur-md"
  83 |+        className="bg-bg/80 backdrop-blur-md pointer-events-auto"
  84 |         onClick={close}
  85 |       />
  86 | 
@@ -199,7 +199,7 @@ export function GlobalSearch() {
 199 |               </Box>
 200 |            </Box>
 201 |             <Text variant="mono" size="micro" color="dim" weight="font-bold" tracking="widest" className="opacity-70">
     |-              {results.length} RESULTS
 202 |+              {results.length} RESULTS FOUND
 203 |             </Text>
 204 |           </Box>
 205 |         </Box>
```

### `src/components/ui/CardImagePlaceholder.tsx` (removed)
```diff
@@ -1,52 +0,0 @@
     |-import React from 'react';
     |-import { Box, Text, Stack } from '@/layouts/Primitives';
     |-import { CategoryPlaceholder, getCategoryIcon } from '@/components/ui/CategoryPlaceholder';
     |-
     |-interface CardImagePlaceholderProps {
     |-  image?: string;
     |-  category: string;
     |-  date?: string;
     |-  title: string;
     |-}
     |-
     |-export function CardImagePlaceholder({ image, category, title }: CardImagePlaceholderProps) {
     |-  const norm = (category || '').toLowerCase();
     |-
     |-  let surfaceVariant: "brand" | "accent" | "warning" | "danger" | "muted" = 'muted';
     |-  if (norm.includes('tech')) surfaceVariant = 'brand';
     |-  else if (norm.includes('travel') || norm.includes('wcs')) surfaceVariant = 'accent';
     |-  else if (norm.includes('gear')) surfaceVariant = 'warning';
     |-  else if (norm.includes('lifestyle')) surfaceVariant = 'danger';
     |-
     |-  return (
     |-    <Box shrink={false} aspect="video" maxHeight="cardImage" width="full" className="relative overflow-hidden border-b border-line bg-bg">
     |-      {image ? (
     |-        <img
     |-          src={image}
     |-          alt={title}
     |-          loading="lazy"
     |-          decoding="async"
     |-          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
     |-        />
     |-      ) : (
     |-        <Stack height="full" width="full" gap={0}>
     |-          <Box height={4} width="full" surface={surfaceVariant} />
     |-          <Box flex={1} display="flex" align="center" justify="center" className="bg-muted/5">
     |-            <CategoryPlaceholder category={category} size="lg" />
     |-          </Box>
     |-        </Stack>
     |-      )}
     |-      <Box className="absolute top-4 left-4">
     |-        <Box className="flex items-center gap-2 px-3 py-1 bg-surface/95 backdrop-blur-md border border-line rounded-sm shadow-sm">
     |-          {(() => {
     |-            const icon = getCategoryIcon(category);
     |-            return React.createElement(icon, { className: "w-3.5 h-3.5 text-accent", strokeWidth: 2.5 });
     |-          })()}
     |-          <Text variant="mono" size="micro" weight="font-bold" uppercase tracking="wider" className="text-accent-navy">
     |-            {category}
     |-          </Text>
     |-        </Box>
     |-      </Box>
     |-    </Box>
     |-  );
     |-}
```

### `src/components/ui/HeroPathCard.tsx` (modified)
```diff
@@ -102,14 +102,14 @@ export function HeroPathCard({
 102 |             
 103 |             const commonProps = {
 104 |               className: cn(
     |-                "group/link flex items-center gap-3 transition-all duration-300",
 105 |+                "group/link flex items-center gap-3 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none",
 106 |                 isPrimary ? "text-white font-bold" : "text-white/60 hover:text-white"
 107 |               )
 108 |             };
 109 | 
 110 |             const linkContent = (
 111 |               <>
     |-                <span className="relative">
 112 |+                <span className="relative drop-shadow-md">
 113 |                   {link.text}
 114 |                   <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover/link:w-full" />
 115 |                 </span>
```

### `src/components/ui/PageHeader.tsx` (modified)
```diff
@@ -31,7 +31,7 @@ export function PageHeader({
  31 |       border={border}
  32 |     >
  33 |       <Stack gap={4}>
     |-        <Text variant="mono" size="xs" color="brand" weight="font-bold" tracking="wide-editorial" uppercase>
  34 |+        <Text variant="mono" size="base" color="brand" weight="font-black" tracking="wide-editorial" uppercase>
  35 |           {label}
  36 |         </Text>
  37 |         <Text as={as} variant="headline" size={titleSize} weight="font-black" className="text-accent-navy leading-tight tracking-tight">
```

### `src/features/email-capture/EmailForm.tsx` (modified)
```diff
@@ -7,9 +7,13 @@ import { useEmailForm } from './useEmailForm';
   7 | export function EmailForm() {
   8 |   const { status, email, setEmail, submitForm } = useEmailForm();
   9 | 
     |-  const handleSubmit = (e: FormEvent) => {
  10 |+  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  11 |     e.preventDefault();
     |-    submitForm(email);
  12 |+    if (e.currentTarget.checkValidity()) {
  13 |+      submitForm(email);
  14 |+    } else {
  15 |+      e.currentTarget.reportValidity();
  16 |+    }
  17 |   };
  18 | 
  19 |   return (
@@ -20,7 +24,7 @@ export function EmailForm() {
  24 |           type="email"
  25 |           placeholder="Email Address"
  26 |           value={email}
     |-          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
  27 |+          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
  28 |           required
  29 |           disabled={status === 'loading' || status === 'success'}
  30 |           className={inputs.base}
@@ -35,6 +39,7 @@ export function EmailForm() {
  39 |           width="auto"
  40 |           minWidth={{ base: 36, sm: 44 }}
  41 |           paddingX={6}
  42 |+          className="bg-accent-navy hover:bg-accent-navy/90 text-bg"
  43 |         >
  44 |           <AnimatePresence mode="wait">
  45 |             <Stack
```

### `src/features/email-capture/NewsletterBanner.tsx` (modified)
```diff
@@ -1,6 +1,6 @@
   1 | import { Box, Stack, Text } from '@/layouts/Primitives';
   2 | import { EmailForm } from './EmailForm';
     |-import { Mail, X } from 'lucide-react';
   3 |+import { X } from 'lucide-react';
   4 | import { motionTokens } from '@/styles/motion';
   5 | import { motion } from 'motion/react';
   6 | import { useEmailStore } from './emailStore';
@@ -48,8 +48,20 @@ export function NewsletterBanner() {
  48 |         className="w-full"
  49 |       >
  50 |         <Stack direction="row" align="center" gap={4} className="w-full md:w-auto">
     |-          <Box padding="compact" surface="accent" opacity={5} display={{ base: 'none', sm: 'block' }}>
     |-            <Mail className="w-5 h-5 text-accent" />
  51 |+          <Box padding="compact" surface="accent" opacity={5} display={{ base: 'none', sm: 'block' }} width={12} height={12}>
  52 |+            <svg
  53 |+              xmlns="http://www.w3.org/2000/svg"
  54 |+              viewBox="0 0 24 24"
  55 |+              fill="none"
  56 |+              stroke="currentColor"
  57 |+              strokeWidth="2"
  58 |+              strokeLinecap="round"
  59 |+              strokeLinejoin="round"
  60 |+              className="w-5 h-5 text-accent"
  61 |+            >
  62 |+              <rect width="20" height="16" x="2" y="4" rx="2" />
  63 |+              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  64 |+            </svg>
  65 |           </Box>
  66 |           <Stack gap={0}>
  67 |             <Text variant="display" size="base" uppercase tracking="tight">
```

### `src/features/profile/ArielProfile.tsx` (modified)
```diff
@@ -4,6 +4,7 @@ import { PageHeader } from '@/components/ui/PageHeader';
   4 | import { Reveal } from '@/components/ui/Reveal';
   5 | import { useProfile } from './useProfile';
   6 | import { ProfileSection } from './types';
   7 |+import roboticistPhoto from '@/assets/roboticist.jpg';
   8 | import {
   9 |   ExperienceCards,
  10 |   ProfileItems,
@@ -66,6 +67,14 @@ export default function ArielProfile() {
  67 | 
  68 |             <Box className="lg:col-span-4 relative">
  69 |               <Stack gap={8} position="sticky" top={24}>
  70 |+                <Box border radius="xl" overflow="hidden" className="border-line/10 bg-surface/30">
  71 |+                  <img
  72 |+                    src={roboticistPhoto}
  73 |+                    alt="Portrait of Ariel Anders"
  74 |+                    loading="lazy"
  75 |+                    className="w-full h-auto object-cover aspect-square"
  76 |+                  />
  77 |+                </Box>
  78 |                 <Box padding={8} border radius="xl" className="bg-surface/20 border-line/5">
  79 |                   <Stack gap={6}>
  80 |                     <Text variant="mono" size="xs" color="brand" weight="font-bold" className="uppercase tracking-widest">AT A GLANCE</Text>
```

### `src/features/profile/components/ProfileComponents.tsx` (modified)
```diff
@@ -1,3 +1,4 @@
   1 |+import { useState } from 'react';
   2 | import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
   3 | import { Star, Music, MapPin } from 'lucide-react';
   4 | import { ProfileCard, ProfileItem, ProfileGalleryImage, ProfileLink } from '../types';
@@ -68,26 +69,51 @@ export function ProfileItems({ items }: { items: ProfileItem[] }) {
  69 |  * Renders a responsive photo gallery grid.
  70 |  */
  71 | export function ProfileGallery({ images }: { images: ProfileGalleryImage[] }) {
  72 |+  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  73 |+
  74 |   return (
     |-    <Grid cols={{ base: 1, sm: 2, md: 3 }} gap={4} marginTop={6}>
     |-      {images.map((image, index) => (
     |-        <Box
     |-          key={index}
     |-          aspect="4/5"
     |-          overflow="hidden"
     |-          border
     |-          radius="xl"
     |-          className="border-line/10 bg-surface/30 group"
  75 |+    <>
  76 |+      <Grid cols={{ base: 1, sm: 2, md: 3 }} gap={4} marginTop={6}>
  77 |+        {images.map((image, index) => (
  78 |+          <Box
  79 |+            key={index}
  80 |+            aspect="1/1"
  81 |+            overflow="hidden"
  82 |+            border
  83 |+            radius="xl"
  84 |+            className="border-line/10 bg-surface/30 group cursor-pointer"
  85 |+            onClick={() => setSelectedImage(image.src)}
  86 |+          >
  87 |+            <img
  88 |+              src={image.src}
  89 |+              alt={image.alt}
  90 |+              loading="lazy"
  91 |+              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
  92 |+            />
  93 |+          </Box>
  94 |+        ))}
  95 |+      </Grid>
  96 |+
  97 |+      {selectedImage && (
  98 |+        <Stack
  99 |+          position="fixed"
 100 |+          inset={0}
 101 |+          zIndex="modal"
 102 |+          className="bg-black/90 cursor-pointer"
 103 |+          align="center"
 104 |+          justify="center"
 105 |+          onClick={() => setSelectedImage(null)}
 106 |         >
     |-          <img
     |-            src={image.src}
     |-            alt={image.alt}
     |-            loading="lazy"
     |-            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
     |-          />
     |-        </Box>
     |-      ))}
     |-    </Grid>
 107 |+          <Box maxWidth="full" padding={4} height="full" display="flex" align="center" justify="center">
 108 |+            <img
 109 |+              src={selectedImage}
 110 |+              alt="Expanded view"
 111 |+              className="max-w-full max-h-full object-contain"
 112 |+            />
 113 |+          </Box>
 114 |+        </Stack>
 115 |+      )}
 116 |+    </>
 117 |   );
 118 | }
 119 | 
@@ -108,7 +134,7 @@ export function ProfileLinks({ links }: { links: ProfileLink[] }) {
 134 |           paddingY={2}
 135 |           border
 136 |           radius="full"
     |-          className="hover:border-accent hover:bg-accent/5 transition-all group"
 137 |+          className="hover:border-accent hover:bg-accent/5 transition-all group active:scale-95 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
 138 |         >
 139 |           <Text variant="mono" size="xs" weight="font-bold" className="group-hover:text-accent">
 140 |             {link.label}
```

### `src/features/profile/useProfile.ts` (modified)
```diff
@@ -3,7 +3,6 @@ import firstComp from '@/assets/first_comp.jpg';
   3 | import glowBunny from '@/assets/glow_bunny.jpg';
   4 | import madJamAri from '@/assets/mad_jam_ari.jpg';
   5 | import monterey from '@/assets/monterey.jpg';
     |-import roboticist from '@/assets/roboticist.jpg';
   6 | import wwwAri from '@/assets/www_ari.jpg';
   7 | 
   8 | const PROFILE_DATA: ProfileData = {
@@ -87,12 +86,11 @@ const PROFILE_DATA: ProfileData = {
  86 |       eyebrow: "Photo Gallery",
  87 |       title: "WCS Moments",
  88 |       gallery: [
     |-        { src: firstComp, alt: "West Coast Swing competition moment" },
     |-        { src: monterey, alt: "West Coast Swing stage pose" },
     |-        { src: madJamAri, alt: "West Coast Swing social dance" },
     |-        { src: glowBunny, alt: "Glow bunny dance costume" },
     |-        { src: wwwAri, alt: "West Coast Swing floor connection" },
     |-        { src: roboticist, alt: "Portrait photo" }
  89 |+        { src: firstComp, alt: "Ariel Anders performing a West Coast Swing extension at a competition" },
  90 |+        { src: monterey, alt: "Ariel Anders posing playfully on stage at a West Coast Swing event" },
  91 |+        { src: madJamAri, alt: "Ariel Anders social dancing at MADjam West Coast Swing convention" },
  92 |+        { src: glowBunny, alt: "Ariel Anders dancing in a light-up bunny costume at a themed dance" },
  93 |+        { src: wwwAri, alt: "Ariel Anders creating a strong connection on the dance floor" }
  94 |       ]
  95 |     },
  96 |     {
@@ -101,8 +99,7 @@ const PROFILE_DATA: ProfileData = {
  99 |       links: [
 100 |         { label: 'Instagram', url: 'https://instagram.com/' },
 101 |         { label: 'LinkedIn', url: 'https://linkedin.com/in/arianders' },
     |-        { label: 'GitHub', url: 'https://github.com/arii' },
     |-        { label: 'Portfolio', url: 'https://arii.github.io/' }
 102 |+        { label: 'GitHub', url: 'https://github.com/arii' }
 103 |       ]
 104 |     }
 105 |   ],
@@ -114,8 +111,7 @@ const PROFILE_DATA: ProfileData = {
 111 |   links: [
 112 |     { label: 'Instagram', url: 'https://instagram.com/' },
 113 |     { label: 'LinkedIn', url: 'https://linkedin.com/in/arianders' },
     |-    { label: 'GitHub', url: 'https://github.com/arii' },
     |-    { label: 'Portfolio', url: 'https://arii.github.io/' }
 114 |+    { label: 'GitHub', url: 'https://github.com/arii' }
 115 |   ]
 116 | };
 117 | export function useProfile(): { bio: ProfileData } {
```

### `src/layouts/Footer.tsx` (modified)
```diff
@@ -3,8 +3,6 @@ import { BrandIcon } from '@/components/ui/BrandIcon';
   3 | 
   4 | export function Footer() {
   5 |   const legalLinks = [
     |-    { label: 'Privacy', href: '#' },
     |-    { label: 'Terms', href: '#' },
   6 |     { label: 'Contact', href: import.meta.env.BASE_URL + 'contact' },
   7 |   ];
   8 | 
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
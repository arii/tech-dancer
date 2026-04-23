# PR Context: #257 — Optimize Global State Management for Email Capture
**Stats:** +106/-105 across 10 files
**Author:** @arii
**Last Commit:** 2026-04-23T17:33:09Z

## Description
Refactored the email capture feature to use Zustand for global state (banner visibility) and local useState for isolated form state. Removed EmailCaptureContext and useEmailCaptureLogic to reduce boilerplate and improve performance.

Fixes #132

---
*PR created automatically by Jules for task [5607315041239290156](https://jules.google.com/task/5607315041239290156) started by @arii*

## Files Changed
- 🟡 `package.json` (+2/-1)
- 🟡 `pnpm-lock.yaml` (+28/-0)
- 🟡 `src/App.tsx` (+20/-7)
- 🔴 `src/features/email-capture/EmailCaptureContext.tsx` (+0/-34)
- 🟡 `src/features/email-capture/EmailForm.tsx` (+2/-2)
- 🟡 `src/features/email-capture/NewsletterBanner.tsx` (+2/-2)
- 🟢 `src/features/email-capture/emailStore.ts` (+18/-0)
- 🟢 `src/features/email-capture/useEmailForm.ts` (+32/-0)
- 🔴 `src/hooks/useEmailCaptureLogic.ts` (+0/-57)
- 🟡 `src/layouts/MainLayout.tsx` (+2/-2)

## Diffs

### `package.json` (modified)
**Valid Comment Ranges (New File):** 36-43
```diff
@@ -36,7 +36,8 @@
  36 |     "shadcn": "^4.2.0",
  37 |     "tailwind-merge": "^3.5.0",
  38 |     "tw-animate-css": "^1.4.0",
     |-    "vite": "^6.2.0"
  39 |+    "vite": "^6.2.0",
  40 |+    "zustand": "^5.0.12"
  41 |   },
  42 |   "devDependencies": {
  43 |     "@playwright/test": "^1.59.1",
```

### `pnpm-lock.yaml` (modified)
**Valid Comment Ranges (New File):** 77-85, 3648-3671, 7334-7344
```diff
@@ -77,6 +77,9 @@ importers:
  77 |       vite:
  78 |         specifier: ^6.2.0
  79 |         version: 6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0)
  80 |+      zustand:
  81 |+        specifier: ^5.0.12
  82 |+        version: 5.0.12(@types/react@19.2.14)(immer@11.1.4)(react@19.2.5)(use-sync-external-store@1.6.0(react@19.2.5))
  83 |     devDependencies:
  84 |       '@playwright/test':
  85 |         specifier: ^1.59.1
@@ -3645,6 +3648,24 @@ packages:
3648 |   zod@3.25.76:
3649 |     resolution: {integrity: sha512-gzUt/qt81nXsFGKIFcC3YnfEAx5NkunCfnDlvuBSSFS02bcXu4Lmea0AFIUwbLWxWPx3d9p8S5QoaujKcNQxcQ==}
3650 | 
3651 |+  zustand@5.0.12:
3652 |+    resolution: {integrity: sha512-i77ae3aZq4dhMlRhJVCYgMLKuSiZAaUPAct2AksxQ+gOtimhGMdXljRT21P5BNpeT4kXlLIckvkPM029OljD7g==}
3653 |+    engines: {node: '>=12.20.0'}
3654 |+    peerDependencies:
3655 |+      '@types/react': '>=18.0.0'
3656 |+      immer: '>=9.0.6'
3657 |+      react: '>=18.0.0'
3658 |+      use-sync-external-store: '>=1.2.0'
3659 |+    peerDependenciesMeta:
3660 |+      '@types/react':
3661 |+        optional: true
3662 |+      immer:
3663 |+        optional: true
3664 |+      react:
3665 |+        optional: true
3666 |+      use-sync-external-store:
3667 |+        optional: true
3668 |+
3669 |   zwitch@2.0.4:
3670 |     resolution: {integrity: sha512-bXE4cR/kVZhKZX/RjPEflHaKVhUVl85noU3v6b8apfQEc1x4A+zBxjZ4lN8LqGd6WZ3dl98pY4o717VFmoPp+A==}
3671 | 
@@ -7313,4 +7334,11 @@ snapshots:
7334 | 
7335 |   zod@3.25.76: {}
7336 | 
7337 |+  zustand@5.0.12(@types/react@19.2.14)(immer@11.1.4)(react@19.2.5)(use-sync-external-store@1.6.0(react@19.2.5)):
7338 |+    optionalDependencies:
7339 |+      '@types/react': 19.2.14
7340 |+      immer: 11.1.4
7341 |+      react: 19.2.5
7342 |+      use-sync-external-store: 1.6.0(react@19.2.5)
7343 |+
7344 |   zwitch@2.0.4: {}
```

### `src/App.tsx` (modified)
**Valid Comment Ranges (New File):** 3-16, 25-50, 63-71
```diff
@@ -3,15 +3,14 @@
   3 |  * SPDX-License-Identifier: Apache-2.0
   4 |  */
   5 | 
     |-import { lazy, Suspense } from 'react';
   6 |+import { lazy, Suspense, useEffect } from 'react';
   7 | import { Outlet, useLocation } from 'react-router-dom';
   8 | import { AnimatePresence, motion } from 'motion/react';
   9 | import { MainLayout } from './layouts/MainLayout';
  10 | import { motionTokens } from './styles/motion';
  11 | import { PageSkeleton } from './components/ui/PageSkeleton';
     |-import { EmailCaptureProvider } from './features/email-capture/EmailCaptureContext';
  12 | import { NewsletterBanner } from './features/email-capture/NewsletterBanner';
     |-import { useEmailCaptureLogic } from './hooks/useEmailCaptureLogic';
  13 |+import { useEmailStore, STORAGE_KEY } from './features/email-capture/emailStore';
  14 | 
  15 | import { Box } from './layouts/Primitives';
  16 | 
@@ -26,12 +25,26 @@ const BlogPost = lazy(() => import('./pages/BlogPost'));
  25 | const About = lazy(() => import('./pages/About'));
  26 | const Contact = lazy(() => import('./pages/Contact'));
  27 | 
  28 |+const BANNER_DELAY_MS = 30000; // 30s delay
  29 |+
  30 | export function RootLayout() {
  31 |   const location = useLocation();
     |-  const emailLogic = useEmailCaptureLogic();
  32 |+  const showEmailBar = useEmailStore((state) => state.showEmailBar);
  33 |+  const setShowEmailBar = useEmailStore((state) => state.setShowEmailBar);
  34 |+
  35 |+  useEffect(() => {
  36 |+    const isDismissed = sessionStorage.getItem(STORAGE_KEY) === 'true';
  37 |+    if (isDismissed) return;
  38 |+
  39 |+    const timer = setTimeout(() => {
  40 |+      setShowEmailBar(true);
  41 |+    }, BANNER_DELAY_MS);
  42 |+
  43 |+    return () => clearTimeout(timer);
  44 |+  }, [setShowEmailBar]);
  45 | 
  46 |   return (
     |-    <EmailCaptureProvider {...emailLogic}>
  47 |+    <>
  48 |       <MainLayout>
  49 |         <AnimatePresence mode="wait">
  50 |           <Box
@@ -50,9 +63,9 @@ export function RootLayout() {
  63 |         </AnimatePresence>
  64 |       </MainLayout>
  65 |       <AnimatePresence>
     |-        {emailLogic.showEmailBar && <NewsletterBanner />}
  66 |+        {showEmailBar && <NewsletterBanner />}
  67 |       </AnimatePresence>
     |-    </EmailCaptureProvider>
  68 |+    </>
  69 |   );
  70 | }
  71 | 
```

### `src/features/email-capture/EmailCaptureContext.tsx` (removed)
**Valid Comment Ranges (New File):** 0--1
```diff
@@ -1,34 +0,0 @@
     |-import React, { createContext, useContext, ReactNode } from 'react';
     |-import { FormStatus } from '@/hooks/useEmailCaptureLogic';
     |-
     |-interface EmailCaptureContextType {
     |-  status: FormStatus;
     |-  showEmailBar: boolean;
     |-  email: string;
     |-  setEmail: (email: string) => void;
     |-  submitForm: (email: string) => void;
     |-  setShowEmailBar: (show: boolean) => void;
     |-  hideBar: () => void;
     |-}
     |-
     |-const EmailCaptureContext = createContext<EmailCaptureContextType | undefined>(undefined);
     |-
     |-interface EmailCaptureProviderProps extends EmailCaptureContextType {
     |-  children: ReactNode;
     |-}
     |-
     |-export function EmailCaptureProvider({ children, ...value }: EmailCaptureProviderProps) {
     |-  return (
     |-    <EmailCaptureContext.Provider value={value}>
     |-      {children}
     |-    </EmailCaptureContext.Provider>
     |-  );
     |-}
     |-
     |-export function useEmailCaptureContext() {
     |-  const context = useContext(EmailCaptureContext);
     |-  if (context === undefined) {
     |-    throw new Error('useEmailCaptureContext must be used within an EmailCaptureProvider');
     |-  }
     |-  return context;
     |-}
```

### `src/features/email-capture/EmailForm.tsx` (modified)
**Valid Comment Ranges (New File):** 1-11
```diff
@@ -1,11 +1,11 @@
   1 | import { Stack, Box, Text, Button } from '@/layouts/Primitives';
     |-import { useEmailCaptureContext } from './EmailCaptureContext';
   2 | import { motion, AnimatePresence } from 'motion/react';
   3 | import { ArrowRight, Loader2, Check } from 'lucide-react';
   4 | import { inputs } from '@/styles/design-tokens';
   5 |+import { useEmailForm } from './useEmailForm';
   6 | 
   7 | export function EmailForm() {
     |-  const { status, submitForm, email, setEmail } = useEmailCaptureContext();
   8 |+  const { status, email, setEmail, submitForm } = useEmailForm();
   9 | 
  10 |   const handleSubmit = (e: React.FormEvent) => {
  11 |     e.preventDefault();
```

### `src/features/email-capture/NewsletterBanner.tsx` (modified)
**Valid Comment Ranges (New File):** 3-13
```diff
@@ -3,11 +3,11 @@ import { EmailForm } from './EmailForm';
   3 | import { Mail, X } from 'lucide-react';
   4 | import { motionTokens } from '@/styles/motion';
   5 | import { motion } from 'motion/react';
     |-import { useEmailCaptureContext } from './EmailCaptureContext';
   6 |+import { useEmailStore } from './emailStore';
   7 | import { Button } from '@/layouts/Primitives';
   8 | 
   9 | export function NewsletterBanner() {
     |-  const { hideBar } = useEmailCaptureContext();
  10 |+  const hideBar = useEmailStore((state) => state.hideBar);
  11 | 
  12 |   return (
  13 |     <Box 
```

### `src/features/email-capture/emailStore.ts` (added)
**Valid Comment Ranges (New File):** 1-18
```diff
@@ -0,0 +1,18 @@
   1 |+import { create } from 'zustand';
   2 |+
   3 |+interface EmailState {
   4 |+  showEmailBar: boolean;
   5 |+  setShowEmailBar: (show: boolean) => void;
   6 |+  hideBar: () => void;
   7 |+}
   8 |+
   9 |+export const STORAGE_KEY = 'td-newsletter-dismissed';
  10 |+
  11 |+export const useEmailStore = create<EmailState>((set) => ({
  12 |+  showEmailBar: false,
  13 |+  setShowEmailBar: (show: boolean) => set({ showEmailBar: show }),
  14 |+  hideBar: () => {
  15 |+    set({ showEmailBar: false });
  16 |+    sessionStorage.setItem(STORAGE_KEY, 'true');
  17 |+  },
  18 |+}));
```

### `src/features/email-capture/useEmailForm.ts` (added)
**Valid Comment Ranges (New File):** 1-32
```diff
@@ -0,0 +1,32 @@
   1 |+import { useState } from 'react';
   2 |+import { useEmailStore } from './emailStore';
   3 |+
   4 |+export type FormStatus = 'idle' | 'loading' | 'success' | 'error';
   5 |+
   6 |+export function useEmailForm() {
   7 |+  const [status, setStatus] = useState<FormStatus>('idle');
   8 |+  const [email, setEmail] = useState('');
   9 |+  const hideBar = useEmailStore((state) => state.hideBar);
  10 |+
  11 |+  const submitForm = (emailToSubmit: string) => {
  12 |+    if (!emailToSubmit) return;
  13 |+    setStatus('loading');
  14 |+
  15 |+    // Simulate API delay
  16 |+    setTimeout(() => {
  17 |+      setStatus('success');
  18 |+      setEmail('');
  19 |+
  20 |+      // Use the centralized dismissal logic from the store
  21 |+      // Auto hide the bar after success delay
  22 |+      setTimeout(() => hideBar(), 2000);
  23 |+    }, 800);
  24 |+  };
  25 |+
  26 |+  return {
  27 |+    status,
  28 |+    email,
  29 |+    setEmail,
  30 |+    submitForm
  31 |+  };
  32 |+}
```

### `src/hooks/useEmailCaptureLogic.ts` (removed)
**Valid Comment Ranges (New File):** 0--1
```diff
@@ -1,57 +0,0 @@
     |-import { useState, useEffect, useCallback } from 'react';
     |-
     |-export type FormStatus = 'idle' | 'loading' | 'success' | 'error';
     |-
     |-const STORAGE_KEY = 'td-newsletter-dismissed';
     |-const BANNER_DELAY_MS = 30000; // 30s delay
     |-
     |-export function useEmailCaptureLogic() {
     |-  const [status, setStatus] = useState<FormStatus>('idle');
     |-  const [showEmailBar, setShowEmailBar] = useState(false);
     |-  const [email, setEmail] = useState('');
     |-
     |-  const hideBar = useCallback(() => {
     |-    setShowEmailBar(false);
     |-    sessionStorage.setItem(STORAGE_KEY, 'true');
     |-  }, []);
     |-
     |-  const submitForm = useCallback((emailToSubmit: string) => {
     |-    if (!emailToSubmit) return;
     |-    setStatus('loading');
     |-
     |-    // Simulate API delay
     |-    setTimeout(() => {
     |-      setStatus('success');
     |-      setEmail('');
     |-      sessionStorage.setItem(STORAGE_KEY, 'true');
     |-    }, 800);
     |-  }, []);
     |-
     |-  useEffect(() => {
     |-    const isDismissed = sessionStorage.getItem(STORAGE_KEY) === 'true';
     |-    if (isDismissed) return;
     |-
     |-    const timer = setTimeout(() => {
     |-      setShowEmailBar(true);
     |-    }, BANNER_DELAY_MS);
     |-
     |-    return () => clearTimeout(timer);
     |-  }, []);
     |-
     |-  useEffect(() => {
     |-    if (status === 'success') {
     |-      const timer = setTimeout(() => setShowEmailBar(false), 2000);
     |-      return () => clearTimeout(timer);
     |-    }
     |-  }, [status]);
     |-
     |-  return {
     |-    status,
     |-    showEmailBar,
     |-    email,
     |-    setEmail,
     |-    submitForm,
     |-    setShowEmailBar,
     |-    hideBar
     |-  };
     |-}
```

### `src/layouts/MainLayout.tsx` (modified)
**Valid Comment Ranges (New File):** 4-14
```diff
@@ -4,11 +4,11 @@ import { Box, Stack } from '@/layouts/Primitives';
   4 | import Navigation from '@/components/Navigation';
   5 | import { Footer } from '@/layouts/Footer';
   6 | import { GlobalSearch } from '@/components/GlobalSearch';
     |-import { useEmailCaptureContext } from '@/features/email-capture/EmailCaptureContext';
   7 |+import { useEmailStore } from '@/features/email-capture/emailStore';
   8 | import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';
   9 | 
  10 | export function MainLayout({ children }: { children: React.ReactNode }) {
     |-  const { showEmailBar } = useEmailCaptureContext();
  11 |+  const showEmailBar = useEmailStore((state) => state.showEmailBar);
  12 |   const scrollRef = useRef<HTMLElement | null>(null);
  13 |   const { pathname, key } = useLocation();
  14 |   const navType = useNavigationType();
```
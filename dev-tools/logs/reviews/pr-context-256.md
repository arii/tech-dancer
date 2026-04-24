# PR Context: #256 — Implement react-hook-form and Zod for type-safe validation
**Stats:** +208/-197 across 8 files
**Author:** @arii
**Last Commit:** 2026-04-23T17:13:30Z

## Description
Replaced custom form hooks with react-hook-form and zod for improved validation, accessibility, and type-safety. Deleted `src/hooks/use-form.ts` and `src/hooks/use-contact-form.ts`. Added a new E2E test suite for the contact form.

Fixes #131

---
*PR created automatically by Jules for task [2365902486450667482](https://jules.google.com/task/2365902486450667482) started by @arii*

## Files Changed
- 🟡 `package.json` (+4/-1)
- 🟡 `pnpm-lock.yaml` (+65/-3)
- 🟡 `src/features/contact/components/ContactFormView.tsx` (+19/-37)
- 🟢 `src/features/contact/schemas/contact-schema.ts` (+13/-0)
- 🔴 `src/hooks/use-contact-form.ts` (+0/-107)
- 🔴 `src/hooks/use-form.ts` (+0/-31)
- 🟡 `src/pages/Contact.tsx` (+55/-18)
- 🟢 `tests/contact.spec.ts` (+52/-0)

## Diffs

### `package.json` (modified)
**Valid Comment Ranges (New File):** 17-23, 31-45
```diff
@@ -17,6 +17,7 @@
  17 |     "@base-ui/react": "^1.4.0",
  18 |     "@fontsource-variable/geist": "^5.2.8",
  19 |     "@google/genai": "^1.29.0",
  20 |+    "@hookform/resolvers": "^5.2.2",
  21 |     "@tailwindcss/vite": "^4.2.2",
  22 |     "@vitejs/plugin-react": "^5.0.4",
  23 |     "buffer": "^6.0.3",
@@ -30,13 +31,15 @@
  31 |     "react": "^19.0.0",
  32 |     "react-dom": "^19.0.0",
  33 |     "react-helmet-async": "3.0.0",
  34 |+    "react-hook-form": "^7.73.1",
  35 |     "react-markdown": "^10.1.0",
  36 |     "react-router-dom": "^7.14.1",
  37 |     "recharts": "^3.8.1",
  38 |     "shadcn": "^4.2.0",
  39 |     "tailwind-merge": "^3.5.0",
  40 |     "tw-animate-css": "^1.4.0",
     |-    "vite": "^6.2.0"
  41 |+    "vite": "^6.2.0",
  42 |+    "zod": "^4.3.6"
  43 |   },
  44 |   "devDependencies": {
  45 |     "@playwright/test": "^1.59.1",
```

### `pnpm-lock.yaml` (modified)
**Valid Comment Ranges (New File):** 16-25, 59-67, 83-91, 903-913, 3063-3074, 3665-3673, 4415-4428, 4460-4470, 4629-4657, 6665-6674, 7366-7378
```diff
@@ -16,7 +16,10 @@ importers:
  16 |         version: 5.2.8
  17 |       '@google/genai':
  18 |         specifier: ^1.29.0
     |-        version: 1.50.1(@modelcontextprotocol/sdk@1.29.0(zod@3.25.76))
  19 |+        version: 1.50.1(@modelcontextprotocol/sdk@1.29.0(zod@4.3.6))
  20 |+      '@hookform/resolvers':
  21 |+        specifier: ^5.2.2
  22 |+        version: 5.2.2(react-hook-form@7.73.1(react@19.2.5))
  23 |       '@tailwindcss/vite':
  24 |         specifier: ^4.2.2
  25 |         version: 4.2.2(vite@6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0))
@@ -56,6 +59,9 @@ importers:
  59 |       react-helmet-async:
  60 |         specifier: 3.0.0
  61 |         version: 3.0.0(react@19.2.5)
  62 |+      react-hook-form:
  63 |+        specifier: ^7.73.1
  64 |+        version: 7.73.1(react@19.2.5)
  65 |       react-markdown:
  66 |         specifier: ^10.1.0
  67 |         version: 10.1.0(@types/react@19.2.14)(react@19.2.5)
@@ -77,6 +83,9 @@ importers:
  83 |       vite:
  84 |         specifier: ^6.2.0
  85 |         version: 6.4.2(@types/node@22.19.17)(jiti@2.6.1)(lightningcss@1.32.0)(tsx@4.21.0)
  86 |+      zod:
  87 |+        specifier: ^4.3.6
  88 |+        version: 4.3.6
  89 |     devDependencies:
  90 |       '@playwright/test':
  91 |         specifier: ^1.59.1
@@ -894,6 +903,11 @@ packages:
 903 |     peerDependencies:
 904 |       hono: ^4
 905 |
 906 |+  '@hookform/resolvers@5.2.2':
 907 |+    resolution: {integrity: sha512-A/IxlMLShx3KjV/HeTcTfaMxdwy690+L/ZADoeaTltLx+CVuzkeVIPuybK3jrRfw7YZnmdKsVVHAlEPIAEUNlA==}
 908 |+    peerDependencies:
 909 |+      react-hook-form: ^7.55.0
 910 |+
 911 |   '@img/colour@1.1.0':
 912 |     resolution: {integrity: sha512-Td76q7j57o/tLVdgS746cYARfSyxk8iEfRxewL9h4OMzYhbW4TAcppl0mT4eyqXddh6L/jwoM75mo7ixa/pCeQ==}
 913 |     engines: {node: '>=18'}
@@ -3049,6 +3063,12 @@ packages:
3063 |     peerDependencies:
3064 |       react: ^16.6.0 || ^17.0.0 || ^18.0.0 || ^19.0.0
3065 |
3066 |+  react-hook-form@7.73.1:
3067 |+    resolution: {integrity: sha512-VAfVYOPcx3piiEVQy95vyFmBwbVUsP/AUIN+mpFG8h11yshDd444nn0VyfaGWSRnhOLVgiDu7HIuBtAIzxn9dA==}
3068 |+    engines: {node: '>=18.0.0'}
3069 |+    peerDependencies:
3070 |+      react: ^16.8.0 || ^17 || ^18 || ^19
3071 |+
3072 |   react-is@19.2.5:
3073 |     resolution: {integrity: sha512-Dn0t8IQhCmeIT3wu+Apm1/YVsJXsGWi6k4sPdnBIdqMVtHtv0IGi6dcpNpNkNac0zB2uUAqNX3MHzN8c+z2rwQ==}
3074 |
@@ -3645,6 +3665,9 @@ packages:
3665 |   zod@3.25.76:
3666 |     resolution: {integrity: sha512-gzUt/qt81nXsFGKIFcC3YnfEAx5NkunCfnDlvuBSSFS02bcXu4Lmea0AFIUwbLWxWPx3d9p8S5QoaujKcNQxcQ==}
3667 |
3668 |+  zod@4.3.6:
3669 |+    resolution: {integrity: sha512-rftlrkhHZOcjDwkGlnUtZZkvaPHCsDATp4pGpuOOMDaTdDDXF91wuVDJoWoPsKX/3YPQ5fHuF3STjcYyKr+Qhg==}
3670 |+
3671 |   zwitch@2.0.4:
3672 |     resolution: {integrity: sha512-bXE4cR/kVZhKZX/RjPEflHaKVhUVl85noU3v6b8apfQEc1x4A+zBxjZ4lN8LqGd6WZ3dl98pY4o717VFmoPp+A==}
3673 |
@@ -4392,14 +4415,14 @@ snapshots:
4415 |
4416 |   '@fontsource-variable/geist@5.2.8': {}
4417 |
     |-  '@google/genai@1.50.1(@modelcontextprotocol/sdk@1.29.0(zod@3.25.76))':
4418 |+  '@google/genai@1.50.1(@modelcontextprotocol/sdk@1.29.0(zod@4.3.6))':
4419 |     dependencies:
4420 |       google-auth-library: 10.6.2
4421 |       p-retry: 4.6.2
4422 |       protobufjs: 7.5.5
4423 |       ws: 8.20.0
4424 |     optionalDependencies:
     |-      '@modelcontextprotocol/sdk': 1.29.0(zod@3.25.76)
4425 |+      '@modelcontextprotocol/sdk': 1.29.0(zod@4.3.6)
4426 |     transitivePeerDependencies:
4427 |       - bufferutil
4428 |       - supports-color
@@ -4437,6 +4460,11 @@ snapshots:
4460 |     dependencies:
4461 |       hono: 4.12.14
4462 |
4463 |+  '@hookform/resolvers@5.2.2(react-hook-form@7.73.1(react@19.2.5))':
4464 |+    dependencies:
4465 |+      '@standard-schema/utils': 0.3.0
4466 |+      react-hook-form: 7.73.1(react@19.2.5)
4467 |+
4468 |   '@img/colour@1.1.0': {}
4469 |
4470 |   '@img/sharp-darwin-arm64@0.34.5':
@@ -4601,6 +4629,29 @@ snapshots:
4629 |     transitivePeerDependencies:
4630 |       - supports-color
4631 |
4632 |+  '@modelcontextprotocol/sdk@1.29.0(zod@4.3.6)':
4633 |+    dependencies:
4634 |+      '@hono/node-server': 1.19.14(hono@4.12.14)
4635 |+      ajv: 8.18.0
4636 |+      ajv-formats: 3.0.1(ajv@8.18.0)
4637 |+      content-type: 1.0.5
4638 |+      cors: 2.8.6
4639 |+      cross-spawn: 7.0.6
4640 |+      eventsource: 3.0.7
4641 |+      eventsource-parser: 3.0.8
4642 |+      express: 5.2.1
4643 |+      express-rate-limit: 8.3.2(express@5.2.1)
4644 |+      hono: 4.12.14
4645 |+      jose: 6.2.2
4646 |+      json-schema-typed: 8.0.2
4647 |+      pkce-challenge: 5.0.1
4648 |+      raw-body: 3.0.2
4649 |+      zod: 4.3.6
4650 |+      zod-to-json-schema: 3.25.2(zod@4.3.6)
4651 |+    transitivePeerDependencies:
4652 |+      - supports-color
4653 |+    optional: true
4654 |+
4655 |   '@mswjs/interceptors@0.41.4':
4656 |     dependencies:
4657 |       '@open-draft/deferred-promise': 2.2.0
@@ -6614,6 +6665,10 @@ snapshots:
6665 |       react-fast-compare: 3.2.2
6666 |       shallowequal: 1.1.0
6667 |
6668 |+  react-hook-form@7.73.1(react@19.2.5):
6669 |+    dependencies:
6670 |+      react: 19.2.5
6671 |+
6672 |   react-is@19.2.5: {}
6673 |
6674 |   react-markdown@10.1.0(@types/react@19.2.14)(react@19.2.5):
@@ -7311,6 +7366,13 @@ snapshots:
7366 |     dependencies:
7367 |       zod: 3.25.76
7368 |
7369 |+  zod-to-json-schema@3.25.2(zod@4.3.6):
7370 |+    dependencies:
7371 |+      zod: 4.3.6
7372 |+    optional: true
7373 |+
7374 |   zod@3.25.76: {}
7375 |
7376 |+  zod@4.3.6: {}
7377 |+
7378 |   zwitch@2.0.4: {}
```

### `src/features/contact/components/ContactFormView.tsx` (modified)
**Valid Comment Ranges (New File):** 3-21, 59-106, 109-114
```diff
@@ -3,29 +3,19 @@ import { Box, Stack, Text, Grid, Button } from '@/layouts/Primitives';
   3 | import { PageHeader } from '@/components/ui/PageHeader';
   4 | import { FormField } from './FormField';
   5 | import { cn } from '@/lib/utils';
     |-import type { ChangeEvent, FormEvent } from 'react';
   6 |+import type { UseFormRegister, FieldErrors } from 'react-hook-form';
   7 |+import type { ContactFormData } from '../schemas/contact-schema';
   8 |
     |-// Specific types for the data managed by use-contact-form
   9 | interface ContactFormViewProps {
     |-  formData: {
     |-    name: string;
     |-    email: string;
     |-    subject: string;
     |-    message: string;
     |-  };
     |-  errors: {
     |-    name?: string;
     |-    email?: string;
     |-    message?: string;
     |-  };
  10 |+  register: UseFormRegister<ContactFormData>;
  11 |+  errors: FieldErrors<ContactFormData>;
  12 |   isSubmitting: boolean;
     |-  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
     |-  onSubmit: (e: FormEvent) => void;
  13 |+  onSubmit: (e: React.FormEvent) => void;
  14 | }
  15 |
  16 | const inputClasses = "w-full bg-bg border px-4 py-3 text-base sm:text-sm font-sans rounded-lg transition-all focus:outline-none focus:border-accent-brand focus:ring-2 focus:ring-accent-brand/20 placeholder:text-text-dim/50";
  17 |
     |-export function ContactFormView({ formData, errors, isSubmitting, onChange, onSubmit }: ContactFormViewProps) {
  18 |+export function ContactFormView({ register, errors, isSubmitting, onSubmit }: ContactFormViewProps) {
  19 |   return (
  20 |     <Box as="section" minHeight="[calc(100vh-64px)]">
  21 |       <Stack gap={12}>
@@ -69,54 +59,48 @@ export function ContactFormView({ formData, errors, isSubmitting, onChange, onSu
  59 |
  60 |           <Box surface="default" padding={{ base: 8, md: 12 }}>
  61 |             <Box maxWidth="xl" marginX="auto">
     |-              <Box as="form" onSubmit={onSubmit} className="space-y-6">
     |-                <FormField label="Your Name" error={errors.name}>
  62 |+              <Box as="form" onSubmit={onSubmit} noValidate className="space-y-6">
  63 |+                <FormField label="Your Name" error={errors.name?.message}>
  64 |                   <Box as="input"
     |-                    name="name"
  65 |+                    {...register('name')}
  66 |                     type="text"
  67 |                     placeholder="Jane Doe"
  68 |                     aria-required="true"
  69 |                     className={cn(
  70 |                       inputClasses,
  71 |                       errors.name ? 'border-accent-brand' : 'border-line'
  72 |                     )}
     |-                    value={formData.name}
     |-                    onChange={onChange}
  73 |                   />
  74 |                 </FormField>
  75 |
     |-                <FormField label="Your Email" error={errors.email}>
  76 |+                <FormField label="Your Email" error={errors.email?.message}>
  77 |                   <Box as="input"
     |-                    name="email"
  78 |+                    {...register('email')}
  79 |                     type="email"
  80 |                     placeholder="jane@example.com"
  81 |                     aria-required="true"
  82 |                     className={cn(
  83 |                       inputClasses,
  84 |                       errors.email ? 'border-accent-brand' : 'border-line'
  85 |                     )}
     |-                    value={formData.email}
     |-                    onChange={onChange}
  86 |                   />
  87 |                 </FormField>
  88 |
     |-                <FormField label="Subject">
  89 |+                <FormField label="Subject" error={errors.subject?.message}>
  90 |                   <Box as="select"
     |-                    name="subject"
  91 |+                    {...register('subject')}
  92 |                     className={cn(inputClasses, "border-line")}
     |-                    value={formData.subject}
     |-                    onChange={onChange}
  93 |                   >
     |-                    <option>General Feedback</option>
     |-                    <option>Content Request</option>
     |-                    <option>Gear Review Request</option>
     |-                    <option>Dance Statistics</option>
  94 |+                    <option value="General Feedback">General Feedback</option>
  95 |+                    <option value="Content Request">Content Request</option>
  96 |+                    <option value="Gear Review Request">Gear Review Request</option>
  97 |+                    <option value="Dance Statistics">Dance Statistics</option>
  98 |                   </Box>
  99 |                 </FormField>
 100 |
     |-                <FormField label="Message" error={errors.message}>
 101 |+                <FormField label="Message" error={errors.message?.message}>
 102 |                   <Box as="textarea"
     |-                    name="message"
 103 |+                    {...register('message')}
 104 |                     rows={5}
 105 |                     placeholder="How can I help you?"
 106 |                     aria-required="true"
@@ -125,8 +109,6 @@ export function ContactFormView({ formData, errors, isSubmitting, onChange, onSu
 109 |                       "resize-none",
 110 |                       errors.message ? 'border-accent-brand' : 'border-line'
 111 |                     )}
     |-                    value={formData.message}
     |-                    onChange={onChange}
 112 |                   />
 113 |                 </FormField>
 114 |
```

### `src/features/contact/schemas/contact-schema.ts` (added)
**Valid Comment Ranges (New File):** 1-13
```diff
@@ -0,0 +1,13 @@
   1 |+import { z } from 'zod';
   2 |+
   3 |+export const contactSchema = z.object({
   4 |+  name: z.string().min(1, 'Personnel name required'),
   5 |+  email: z.string().min(1, 'Signal destination required').email('Invalid signal coordinate'),
   6 |+  subject: z.string().min(1, 'Subject is required'),
   7 |+  message: z
   8 |+    .string()
   9 |+    .min(1, 'Data payload missing')
  10 |+    .min(10, 'Payload below minimum threshold (10 chars)'),
  11 |+});
  12 |+
  13 |+export type ContactFormData = z.infer<typeof contactSchema>;
```

### `src/hooks/use-contact-form.ts` (removed)
**Valid Comment Ranges (New File):** 0--1
```diff
@@ -1,107 +0,0 @@
     |-import { useState } from 'react';
     |-
     |-interface ContactFormData {
     |-  name: string;
     |-  email: string;
     |-  subject: string;
     |-  message: string;
     |-}
     |-
     |-interface ContactFormErrors {
     |-  name?: string;
     |-  email?: string;
     |-  message?: string;
     |-}
     |-
     |-export function useContactForm() {
     |-  const [formData, setFormData] = useState<ContactFormData>({
     |-    name: '',
     |-    email: '',
     |-    subject: 'General Feedback',
     |-    message: ''
     |-  });
     |-
     |-  const [isSubmitting, setIsSubmitting] = useState(false);
     |-  const [submitted, setSubmitted] = useState(false);
     |-  const [errors, setErrors] = useState<ContactFormErrors>({});
     |-
     |-  const validate = () => {
     |-    const newErrors: ContactFormErrors = {};
     |-    if (!formData.name.trim()) newErrors.name = 'Personnel name required';
     |-
     |-    if (!formData.email.trim()) {
     |-      newErrors.email = 'Signal destination required';
     |-    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
     |-      newErrors.email = 'Invalid signal coordinate';
     |-    }
     |-
     |-    if (!formData.message.trim()) {
     |-      newErrors.message = 'Data payload missing';
     |-    } else if (formData.message.length < 10) {
     |-      newErrors.message = 'Payload below minimum threshold (10 chars)';
     |-    }
     |-
     |-    return newErrors;
     |-  };
     |-
     |-  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
     |-    const { name, value } = e.target;
     |-    setFormData(prev => ({ ...prev, [name]: value }));
     |-    // Clear error for field when changed
     |-    if (errors[name as keyof ContactFormErrors]) {
     |-      setErrors(prev => ({ ...prev, [name]: undefined }));
     |-    }
     |-  };
     |-
     |-  const submit = async () => {
     |-    const newErrors = validate();
     |-    if (Object.keys(newErrors).length > 0) {
     |-      setErrors(newErrors);
     |-      return false;
     |-    }
     |-
     |-    setErrors({});
     |-    setIsSubmitting(true);
     |-
     |-    try {
     |-      const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;
     |-
     |-      if (endpoint) {
     |-        const response = await fetch(endpoint, {
     |-          method: 'POST',
     |-          headers: { 'Content-Type': 'application/json' },
     |-          body: JSON.stringify(formData),
     |-        });
     |-
     |-        if (!response.ok) throw new Error('Submission failed');
     |-      } else {
     |-        // Simulate form submission if no endpoint is configured
     |-        await new Promise(resolve => setTimeout(resolve, 1500));
     |-      }
     |-
     |-      setSubmitted(true);
     |-      setFormData({ name: '', email: '', subject: 'General Feedback', message: '' });
     |-      return true;
     |-    } catch (err) {
     |-      setErrors({ message: 'System error: Unable to transmit payload. Please try again later.' });
     |-      return false;
     |-    } finally {
     |-      setIsSubmitting(false);
     |-    }
     |-  };
     |-
     |-  const reset = () => {
     |-    setSubmitted(false);
     |-    setErrors({});
     |-  };
     |-
     |-  return {
     |-    formData,
     |-    handleChange,
     |-    errors,
     |-    isSubmitting,
     |-    submitted,
     |-    submit,
     |-    reset
     |-  };
     |-}
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

### `src/pages/Contact.tsx` (modified)
**Valid Comment Ranges (New File):** 1-77
```diff
@@ -1,40 +1,77 @@
     |-import type { FormEvent } from 'react';
     |-import { useContactForm } from '@/hooks/use-contact-form';
   1 |+import { useState } from 'react';
   2 |+import { useForm } from 'react-hook-form';
   3 |+import { zodResolver } from '@hookform/resolvers/zod';
   4 | import { SuccessState } from '@/features/contact/components/SuccessState';
   5 | import { ContactFormView } from '@/features/contact/components/ContactFormView';
   6 |+import { contactSchema, type ContactFormData } from '@/features/contact/schemas/contact-schema';
   7 |
   8 | /**
   9 |  * Contact Page Container
  10 |  * Follows separation of concerns by keeping orchestration logic here
  11 |  * and presentation logic in the feature components.
  12 |+ * Now using react-hook-form and zod for type-safe validation.
  13 |  */
  14 | export default function Contact() {
  15 |+  const [submitted, setSubmitted] = useState(false);
  16 |+
  17 |   const {
     |-    formData,
     |-    handleChange,
     |-    errors,
     |-    isSubmitting,
     |-    submitted,
     |-    submit,
     |-    reset
     |-  } = useContactForm();
     |-
     |-  const handleSubmit = (e: FormEvent) => {
     |-    e.preventDefault();
     |-    submit();
  18 |+    register,
  19 |+    handleSubmit,
  20 |+    reset,
  21 |+    setError,
  22 |+    formState: { errors, isSubmitting },
  23 |+  } = useForm<ContactFormData>({
  24 |+    resolver: zodResolver(contactSchema),
  25 |+    defaultValues: {
  26 |+      name: '',
  27 |+      email: '',
  28 |+      subject: 'General Feedback',
  29 |+      message: '',
  30 |+    },
  31 |+  });
  32 |+
  33 |+  const onSubmit = async (data: ContactFormData) => {
  34 |+    try {
  35 |+      const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;
  36 |+
  37 |+      if (endpoint) {
  38 |+        const response = await fetch(endpoint, {
  39 |+          method: 'POST',
  40 |+          headers: { 'Content-Type': 'application/json' },
  41 |+          body: JSON.stringify(data),
  42 |+        });
  43 |+
  44 |+        if (!response.ok) throw new Error('Submission failed');
  45 |+      } else {
  46 |+        // Simulate form submission if no endpoint is configured
  47 |+        await new Promise((resolve) => setTimeout(resolve, 1500));
  48 |+      }
  49 |+
  50 |+      setSubmitted(true);
  51 |+      reset();
  52 |+    } catch (err) {
  53 |+      setError('message', {
  54 |+        type: 'manual',
  55 |+        message: 'System error: Unable to transmit payload. Please try again later.',
  56 |+      });
  57 |+    }
  58 |+  };
  59 |+
  60 |+  const handleReset = () => {
  61 |+    setSubmitted(false);
  62 |+    reset();
  63 |   };
  64 |
  65 |   if (submitted) {
     |-    return <SuccessState onReset={reset} />;
  66 |+    return <SuccessState onReset={handleReset} />;
  67 |   }
  68 |
  69 |   return (
  70 |     <ContactFormView
     |-      formData={formData}
  71 |+      register={register}
  72 |       errors={errors}
  73 |       isSubmitting={isSubmitting}
     |-      onChange={handleChange}
     |-      onSubmit={handleSubmit}
  74 |+      onSubmit={handleSubmit(onSubmit)}
  75 |     />
  76 |   );
  77 | }
```

### `tests/contact.spec.ts` (added)
**Valid Comment Ranges (New File):** 1-52
```diff
@@ -0,0 +1,52 @@
   1 |+import { test, expect } from '@playwright/test';
   2 |+
   3 |+test.describe('Contact Form', () => {
   4 |+  test.beforeEach(async ({ page }) => {
   5 |+    await page.goto('./contact');
   6 |+  });
   7 |+
   8 |+  test('should show validation errors for empty fields', async ({ page }) => {
   9 |+    await page.click('button[type="submit"]');
  10 |+
  11 |+    await expect(page.locator('text=Personnel name required')).toBeVisible();
  12 |+    await expect(page.locator('text=Signal destination required')).toBeVisible();
  13 |+    await expect(page.locator('text=Data payload missing')).toBeVisible();
  14 |+  });
  15 |+
  16 |+  test('should show validation error for invalid email', async ({ page }) => {
  17 |+    await page.fill('input[name="name"]', 'John Doe');
  18 |+    await page.fill('input[name="email"]', 'not-an-email');
  19 |+    await page.fill('textarea[name="message"]', 'This is a test message that is long enough.');
  20 |+
  21 |+    await page.click('button[type="submit"]');
  22 |+
  23 |+    // If it's the native validation, it might be blocking the submit event or react-hook-form might not be showing the error yet if it's blocked.
  24 |+    // Let's try to fill a more realistic but invalid email if Zod is being strict
  25 |+    await page.fill('input[name="email"]', 'not-an-email@com');
  26 |+    await page.click('button[type="submit"]');
  27 |+
  28 |+    await expect(page.locator('text=Invalid signal coordinate')).toBeVisible();
  29 |+  });
  30 |+
  31 |+  test('should show validation error for short message', async ({ page }) => {
  32 |+    await page.fill('input[name="name"]', 'John Doe');
  33 |+    await page.fill('input[name="email"]', 'john@example.com');
  34 |+    await page.fill('textarea[name="message"]', 'Short');
  35 |+
  36 |+    await page.click('button[type="submit"]');
  37 |+
  38 |+    await expect(page.locator('text=Payload below minimum threshold (10 chars)')).toBeVisible();
  39 |+  });
  40 |+
  41 |+  test('should submit form successfully', async ({ page }) => {
  42 |+    await page.fill('input[name="name"]', 'John Doe');
  43 |+    await page.fill('input[name="email"]', 'john@example.com');
  44 |+    await page.selectOption('select[name="subject"]', 'General Feedback');
  45 |+    await page.fill('textarea[name="message"]', 'This is a test message that is long enough.');
  46 |+
  47 |+    await page.click('button[type="submit"]');
  48 |+
  49 |+    // Check for success state
  50 |+    await expect(page.locator('text=Message Received.')).toBeVisible();
  51 |+  });
  52 |+});
```
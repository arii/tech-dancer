# UI Anti-Pattern TODO List

This list is automatically generated from the audit report. Fix these anti-patterns to adhere to the project design system.

## src/features/email-capture/NewsletterBanner.tsx
- [ ] Line 24: [Inline Styles] style={{ - Inline styles are banned. Use design tokens (AGENTS.md §11)

## src/features/research/components/WCSChartContainers.tsx
- [ ] Line 1: [Unnecessary React Import] import React from 'react' - Unnecessary React import — React 17+ (AGENTS.md §4)

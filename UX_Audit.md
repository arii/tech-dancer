# UX Audit: Global UI & Features

**Date:** $(date +%Y-%m-%d)
**Target:** Global Layout, Typography, ContentCards, and Navigation (`/`, `/about`, `/blog`, `/gear`)
**Viewport:** Desktop (1440x900) & Mobile (390x844)

## Overview
This audit systematically reviews the user experience across the primary routes and key components of the Tech-Dancer platform. The review was conducted using `playwright-cli` for visual snapshots and a direct source code review of custom primitives (e.g., `Text.tsx`, `ContentCard.tsx`, `FolioGrid.tsx`).

---

## Findings

### 1. [P1 - High] Contrast ratio failure on ContentCard excerpts
- **Observation:** In the `ContentCard` component, the excerpt text uses a combination of `color="dim"` (from the custom `Text` primitive mapping to `text-text-dim`) and an explicit `opacity-70` Tailwind utility class.
- **Heuristic / Principle Violated:** Accessibility (Color & Contrast).
- **Impact:** The compound effect of a dimmed text color and 70% opacity pushes the contrast ratio below the WCAG AA minimum of 4.5:1. This makes the article excerpts difficult to read, especially for users with visual impairments or those in bright environments.
- **Recommendation:** Remove the `opacity-70` utility class from the excerpt text block in `src/components/ui/ContentCard.tsx` (Line ~89). The `color="dim"` property provides sufficient visual hierarchy on its own.

### 2. [P2 - Medium] Hover-only discovery for "Read Article" action
- **Observation:** In the `ContentCard` footer, the right arrow (`→`) that indicates navigation to the article uses the classes `opacity-0 group-hover:opacity-100`.
- **Heuristic / Principle Violated:** Interaction & Motion (Mobile Affordance / Discoverability).
- **Impact:** While this creates a clean interface on desktop, touch devices (mobile/tablet) do not support hover states natively. Users on mobile may not realize the card is interactive or where the action leads, increasing cognitive load.
- **Recommendation:** Change the classes to `opacity-100 lg:opacity-0 lg:group-hover:opacity-100` in `src/components/ui/ContentCard.tsx` (Line ~100). This ensures the arrow is permanently visible on mobile devices but retains the hover-reveal effect on desktops.

### 3. [P3 - Low/Polish] Custom Typography Hierarchy Consistency
- **Observation:** The application defines a comprehensive custom typography scale in `design-tokens.ts` and wraps it in a robust `Text.tsx` primitive, handling intent, sizing, and color.
- **Heuristic / Principle Violated:** N/A - Positive observation.
- **Impact:** High maintainability and robust design system integration.
- **Recommendation:** Continue enforcing the use of the `Text` primitive and restricting direct Tailwind text color or sizing utilities across feature development.

## Conclusion
Overall, the application demonstrates a strong foundation in spatial design and typography through a well-implemented token system. Addressing the contrast on excerpts and the hover-only arrow interaction will significantly improve the mobile and accessibility experience.
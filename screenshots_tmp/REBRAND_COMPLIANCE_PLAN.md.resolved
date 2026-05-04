# Rebrand Compliance & Visual Fidelity Plan

This document outlines the systematic audit and remediation steps to align the current React application with the high-fidelity design intent documented in `.artifacts/boomtick/*.html`.

## 🎯 Objective
Achieve 100% visual parity with the reference artifacts while maintaining stateful React functionality and design system compliance.

## 🛠️ Audit Checklist

### 1. Global Components
- [x] **Logo (`Logo.tsx`)**: 
  - Ensure the diagonal slash (gradient line) is present.
  - Fix any cropping of the "boomtick" text (extended viewBox).
- [ ] **Main Layout (`MainLayout.tsx`)**:
  - Verify content centering (`marginX="auto"`) on ultra-wide screens.
  - Confirm sidebar width is exactly 56 units (240px).
- [ ] **Mobile Header (`MobileHeader.tsx`)**:
  - Logo must be centered and within bounds.
  - Menu toggle must use high-contrast text ("MENU").
- [ ] **Newsletter Banner (`NewsletterBanner.tsx`)**:
  - Align exactly with the main content area (respect sidebar margin).
  - Center content within the banner.

### 2. Home Page (`Dashboard.tsx`)
- [x] **Equalizer (`Equalizer.tsx`)**:
  - Match 170px height from `index.html`.
  - Use the CSS `@keyframes wave` animation instead of random JS values.
  - Correct bar count (28) and gradient colors.
- [ ] **Hero Typography**:
  - Main title should use `fluid-7` or equivalent massive sizing.
  - Subtext opacity should be `0.75` to match `index.html`.
- [ ] **Dual Path Panels**:
  - Grid should be exactly `1fr 1fr` on desktop.
  - Padding should be `32px` (8 units).

### 3. About Page (`ArielProfile.tsx`)
- [ ] **Content Integrity**:
  - Remove all AI-hallucinated filler text.
  - Focus on **Technical Consulting** and **Digital Execution** services.
- [ ] **Photo Gallery**:
  - Use a clean grid (ideally 3-column or 6-column depending on width).
  - Ensure images have `grayscale` hover effects if intended.
- [ ] **Typography**:
  - Headers must be high-contrast white.

### 4. Blog Index (`FolioGrid.tsx`)
- [ ] **Grid Layout**:
  - Artifact `blog.html` uses 4 columns on desktop. React currently uses 3.
  - **Action**: Update `FolioGrid.tsx` to `xl: 4`.
- [ ] **Cards**:
  - Tags should be high-contrast and pill-shaped.
  - Post titles should use `font-black` weights.

### 5. Gear / Toolbox Page (`GearGrid.tsx`)
- [ ] **Artifact Check**: Review `gear.html` for grid count and categorization.
- [ ] **Empty States**: Ensure high-fidelity icons and text match original intent.

### 6. Research / Data Lab (`ResearchView.tsx`)
- [ ] **Artifact Check**: Review `research.html` for data table styling and visualizations.

## 📈 Execution Progress

| Feature | Status | Artifact Ref | Notes |
| :--- | :--- | :--- | :--- |
| Logo / Branding | ✅ Fixed | `about.html` | Restored slash and fixed cropping. |
| Home Equalizer | ✅ Fixed | `index.html` | Restored CSS animation and height. |
| Dashboard Layout | ⚠️ Partial | `index.html` | Centering restored; typography needs check. |
| About Content | ⚠️ Partial | `about.html` | Hallucinations removed; contrast fixed. |
| Blog Grid | ❌ Pending | `blog.html` | Needs 4-column refactor. |
| Newsletter Bar | ✅ Fixed | N/A | Feature addition; alignment stabilized. |

## 🧪 Verification Protocol
1. Open artifact in browser: `file:///home/ari/tech-dancer/artifacts/boomtick/index.html`
2. Open dev site: `http://localhost:3000/`
3. Toggle between tabs to identify "flicker" discrepancies in layout or sizing.
4. Run `pnpm run audit` to ensure no design system regressions were introduced.

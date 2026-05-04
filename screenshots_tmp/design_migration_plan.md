# Implementation Plan: BoomTick Design Migration

This plan outlines the steps to migrate the new "BoomTick" design from `artifacts/boomtick/` to the main repository.

## 🧠 Decision: Component Migration
We will migrate the **React components** rather than just the styling from the exported HTML. This ensures:
- **Maintainability**: Design changes remain in code, not just static assets.
- **Interactivity**: Preserves the logic built into the new components (e.g., Equalizer, Mobile Nav).
- **Consistency**: Both the artifact and main repo use Tailwind CSS, making component migration straightforward.

---

## 🛠 Phase 1: Design System & Tokens
Update the core styling to match the BoomTick aesthetic.

1.  **Update `src/styles/tokens.css`**:
    - Replace current oklch/hex values with the HSL tokens from `artifacts/boomtick/src/index.css`.
    - Define core colors: `--background`, `--foreground`, `--primary` (electric cyan), `--secondary` (vivid purple), `--accent` (hot magenta).
2.  **Update `src/index.css`**:
    - Synchronize the `@theme` block with the new tokens.
    - Add utility classes like `.text-gradient` and `.bg-gradient-kinetic`.
3.  **Font Integration**:
    - Ensure 'Inter' is properly loaded (it's used as the primary font in the new design).

---

## 🧱 Phase 2: Component Migration
Move the modernized UI components into the main codebase.

1.  **Core UI Primitives**:
    - Copy new/updated Radix-based UI components from `artifacts/boomtick/src/components/ui/` to `src/components/ui/`.
2.  **Brand Components**:
    - Replace `src/components/ui/Logo.tsx` with `artifacts/boomtick/src/components/Logo.tsx`.
    - Add `src/components/Equalizer.tsx`.
3.  **Navigation Overhaul**:
    - Adapt `artifacts/boomtick/src/components/navigation/NavigationShell.tsx` to work within `src/components/Navigation.tsx`.
    - Retain existing `GlobalSearch` and `MobileBottomNav` functionality but update their styling to match the new theme.

---

## 📄 Phase 3: Page Layouts & Content
Update the application pages to use the new design patterns.

1.  **Layout Update**:
    - Modify `src/layouts/MainLayout.tsx` to align with the new sidebar/header structure.
2.  **Page Refactoring**:
    - Update `src/pages/Home.tsx`, `src/pages/About.tsx`, etc., using the content and structure from `artifacts/boomtick/src/pages/`.
    - Ensure features like the newsletter banner and analytics remain integrated.

---

## 🧪 Phase 4: Validation
1.  **Visual Audit**: Run `pnpm run audit` to check for anti-patterns.
2.  **Visual Regression**: Run `npm run test:visual` to see the changes compared to the old design.
3.  **Performance**: Run `npm run lighthouse` to ensure the new design remains fast.

---

## 🚀 Next Steps
1.  [x] Apply the new design tokens to `src/styles/tokens.css`.
2.  [x] Migrate brand components (`Logo`, `Equalizer`).
3.  [x] Update the main layout and navigation.
4.  [x] Refactor pages one by one.

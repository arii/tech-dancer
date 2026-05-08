# Front-End Design Review (May 7, 2026)

## Scope
This review covers routing/composition, design-system compliance, and UX consistency across representative front-end surfaces:

- `src/App.tsx`
- `src/pages/UXAuditor.tsx`
- `src/pages/NotFound.tsx`
- `src/features/research/ResearchAnalytics.tsx`

## Executive Summary
The app has a solid architectural foundation (lazy-loaded routes and `Suspense` fallback are in place), but key UI surfaces still bypass the design system with direct utility classes and mixed styling semantics. The highest-priority work is reducing `className`-based design decisions in TSX and moving repeated visual patterns into shared primitives/composed components.

## What’s Working Well
1. **Route boundary performance baseline is good.**
   - `React.lazy()` and `<Suspense>` with `PageSkeleton` are implemented in the app router composition.
2. **Layout primitives are already adopted in core pages.**
   - `Box`, `Stack`, `Grid`, and `Text` are used widely, so migration effort is focused on class clean-up, not full rewrites.

## Key Findings

### 1) Design-system bypass via `className` is widespread on critical screens (High)
- `UXAuditor` includes many utility-driven classes for colors, spacing, typography, and motion states.
- `NotFound` includes utility classes for focus, hover, border, width/height and transitions.
- `ResearchAnalytics` includes group hover/transition/spacing typography utility classes.

**Impact:** Visual behavior is split across primitive props and ad-hoc Tailwind classes, making token governance difficult and increasing UI drift risk.

**Recommendation:**
- Introduce CVA-driven variants for recurring card/button/list-row patterns used in `UXAuditor` and `ResearchAnalytics`.
- Restrict `className` to state hooks only when no primitive token exists, and codify allowed exceptions.

### 2) Raw icon sizing/color classes create inconsistency risk (Medium)
Multiple Lucide icons use per-instance sizing/color classes (e.g., `w-4 h-4`, `text-*`, `opacity-*`) throughout audit/report views.

**Impact:** Inconsistent visual rhythm and harder global icon tuning.

**Recommendation:**
- Add an `Icon` wrapper (or shared icon props map) that normalizes size tiers (`sm`, `md`, `lg`) and semantic color tokens.

### 3) Mixed typography control (Text component + utility classes) (Medium)
There are `Text` components still paired with utility classes (`truncate`, `tracking-*`, `leading-*`, `line-clamp-*`, etc.).

**Impact:** Tokenized typography is partially bypassed, causing inconsistent type scale and line-height behavior.

**Recommendation:**
- Expand `Text` primitive API for missing needs (clamp, truncate, tracking levels) and remove class-based typography decisions from feature/page TSX.

### 4) Environment setup assumptions block local quality gates (Operational)
The documented setup script currently fails in this environment due to Node engine mismatch (`>=22` required by one dependency, local Node is v20.20.2), and `pre-submit` lint cannot run without successful dependency setup.

**Impact:** Contributors may be unable to execute local gates, reducing confidence in UI quality before PR.

**Recommendation:**
- Add explicit Node version prerequisite in onboarding docs (or `.nvmrc`/Volta) and fail fast with clear guidance before invoking full pre-submit tasks.

## Prioritized Action Plan
1. **Phase 1 (1 PR):** Create shared CVA/composed variants for `UXAuditor` action buttons, report rows, and callout cards.
2. **Phase 2 (1 PR):** Add `Text` primitive enhancements for clamp/truncation/tracking and migrate `NotFound` + `ResearchAnalytics`.
3. **Phase 3 (1 PR):** Add icon normalization helper and remove one-off icon utility classes.
4. **Phase 4 (docs/devx):** Pin Node runtime requirement and make pre-submit prerequisites explicit.

## Acceptance Criteria for Follow-up Refactors
- No net increase in anti-pattern counts for touched TSX files.
- Feature/page TSX files avoid introducing new color/spacing/layout utility classes.
- Repeated patterns move to shared variants/composed components.
- Pre-submit runs successfully in a documented Node environment.

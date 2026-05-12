# Impeccable Ignore Audit (May 12, 2026)

This document captures GitHub-style issues to remove or narrow `impeccable-ignore` workarounds found during audit.

## Audit summary

- `pnpm run audit` currently passes because several files are globally excluded with `impeccable-ignore-file` markers.
- **28 source files** under `src/` currently contain `impeccable-ignore-file`.
- No line-level `impeccable-ignore` markers were found in `src/`; all suppressions are file-level.

---

## Issue 1 — Reduce ignore-file usage in layout/navigation primitives

**Title**: `refactor(audit): remove impeccable-ignore-file from layout and navigation building blocks`

**Problem**
Core structural components are fully excluded from anti-pattern scanning, which can hide token/system violations in highly reused surfaces.

**Files in scope**
- `src/layouts/Box.tsx`
- `src/layouts/Button.tsx`
- `src/components/Navigation.tsx`
- `src/components/MobileBottomNav.tsx`
- `src/components/navigation/MobileHeader.tsx`
- `src/components/navigation/MobileMenuOverlay.tsx`
- `src/components/navigation/NavItem.tsx`

**Acceptance criteria**
- Remove `impeccable-ignore-file` from each scoped file.
- Replace any raw utility styling with primitives/tokens/CVA.
- `pnpm run audit` passes without re-adding file-level ignores.
- If suppression is still necessary, use narrowly scoped line-level `impeccable-ignore` with rationale comments.

---

## Issue 2 — Remove blanket suppressions from shared UI components

**Title**: `refactor(ui): re-enable audit checks for shared ui components`

**Problem**
Many shared `src/components/ui/*` files are exempt from auditing, reducing confidence that design-system rules are enforced.

**Files in scope**
- `src/components/ui/BrandIcon.tsx`
- `src/components/ui/GearCard.tsx`
- `src/components/ui/HeroSection.tsx`
- `src/components/ui/ListRow.tsx`
- `src/components/ui/Logo.tsx`
- `src/components/ui/MarkdownRenderer.tsx`
- `src/components/ui/PageHeader.tsx`
- `src/components/ui/PageSkeleton.tsx`
- `src/components/ui/SearchBox.tsx`
- `src/components/ui/ViewToggle.tsx`
- `src/components/Equalizer.tsx`
- `src/components/GlobalErrorBoundary.tsx`
- `src/components/GlobalSearch.tsx`

**Acceptance criteria**
- Remove global ignores from at least 5 components in the first PR slice.
- Follow-up slices continue until all listed files are unsuppressed.
- All refactored files pass audit and typecheck.

---

## Issue 3 — Unsuppress feature modules and align with primitive-only layout

**Title**: `refactor(features): eliminate impeccable-ignore-file in feature modules`

**Problem**
Feature-level components are excluded from guardrails, which can allow anti-pattern drift where product UI evolves most quickly.

**Files in scope**
- `src/features/email-capture/NewsletterBanner.tsx`
- `src/features/lab/BlogDrafter.tsx`
- `src/features/lab/wsdc-reminders/WSDCReminders.tsx`
- `src/features/research/components/WCSChartContainers.tsx`
- `src/components/layout/DetailElements.tsx`
- `src/components/layout/DetailLayout.tsx`

**Acceptance criteria**
- Remove `impeccable-ignore-file` from all listed files.
- Use `Stack`/`Grid`/`Box` primitives for layout behavior.
- Any unavoidable exception is localized and documented inline.

---

## Issue 4 — Revisit style/token files currently bypassing audit

**Title**: `chore(styles): document and minimize audit bypass for token/style sources`

**Problem**
Global token/style files are fully ignored, which may be intentional but currently undocumented as policy.

**Files in scope**
- `src/index.css`
- `src/styles/tokens.css`
- `src/styles/design-tokens.ts`
- `src/lib/variants.ts`

**Acceptance criteria**
- Add explicit comments documenting why suppression is required (or remove suppression if no longer needed).
- If audit rules should exclude generated/token files, implement path-based exclusions in the audit script instead of file-level markers.
- Keep non-generated files auditable by default.

---

## Issue 5 — Add CI visibility for suppression count regression

**Title**: `chore(audit): add suppression inventory check to prevent ignore-file growth`

**Problem**
Suppression usage can silently grow over time without failing CI.

**Proposed implementation**
- Add a script that counts `impeccable-ignore-file` in `src/`.
- Fail CI when count increases above a tracked baseline.
- Print a per-file suppression inventory in CI logs.

**Acceptance criteria**
- CI fails on suppression count regressions.
- Baseline is versioned in repo and intentionally updated only in dedicated PRs.
- Developer docs include how to run the suppression check locally.

# Impeccable UI Skill

This skill defines the frontend design system and UX auditing rules for the BoomTick repository.

## 🎨 Design System Principles

- **Token-First Styling**: All styles must derive from design tokens (defined in `src/styles/design-tokens.ts` and `src/styles/tokens.css`). Never use raw hex codes or arbitrary pixel values.
- **Primitive Layouts**: Use `<Box />`, `<Stack />`, and `<Grid />` from `@/layouts` for all structural needs. No raw `flex` or `grid` classes.
- **Component Composition**: Build complex UIs by composing existing primitives and components.
- **Declarative UI**: Ensure UI state is predictable and derived from props or hooks.

## 🛠 Required Primitives

Consult `src/layouts/` for canonical implementations:
- `Box`: The base layout component for spacing, borders, and surfaces.
- `Stack`: Handles linear layouts (rows/columns) with consistent gaps.
- `Grid`: For two-dimensional layouts and responsive column spans.
- `Text`: The exclusive way to render typography using design tokens.

## 🔍 UX Auditing Rules

When auditing UI changes, ensure:
1. **No Raw Tailwind**: Check for arbitrary values `-[...]`, layout classes (`flex`, `grid`), or color classes (`bg-blue-500`) that aren't tokens.
2. **Contrast Standards**: Text on industrial gradients or dark surfaces must meet WCAG 4.5:1 standards. Use `intent="inverse"` or `color="white"` tokens.
3. **Touch Targets**: All interactive elements must have a minimum 48x48px hit area.
4. **Responsive Integrity**: No horizontal overflow on mobile viewports (e.g., iPhone 12/13/14 at 390px). Use responsive props on primitives.
5. **Layout Discipline**: Prefer `Stack` over `div className="flex"`.

## 🧪 Verification Commands

- `pnpm run audit`: Scans for design system anti-patterns.
- `pnpm run ux-audit`: Runs Playwright-based visual and accessibility checks.
- `python3 dev-tools/td_cli.py gh pre-submit`: Final quality gate.

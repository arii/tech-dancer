Perform a platform-wide accessibility audit and fix: 
1. Descriptive alt text for all images. 
2. Contrast ratios (4.5:1 minimum). 
3. Full keyboard navigation and visible high-contrast focus indicators. 
4. ARIA landmarks and logical heading hierarchies. 
5. 'Skip to main content' link implementation.

---
### ⚠️ Implementation Constraints & Lessons from PR 414

The previous attempt to solve this (PR #414) was abandoned due to an unmanageable amount of merge conflicts with other layout and performance PRs. To solve this correctly moving forward:

1. **Avoid Monolithic PRs**: Do NOT submit a single giant PR that modifies every core layout and component file (e.g., touching `Navigation.tsx`, `MainLayout.tsx`, `ContentCard.tsx`, and `tokens.css` all at once).
2. **Break it Down**: Split the work into smaller, isolated pull requests. For example:
   - PR 1: Contrast ratio token updates (`tokens.css`, `design-tokens.ts`).
   - PR 2: Image alt-text remediations.
   - PR 3: ARIA landmarks and keyboard navigation across layouts.
3. **Strict Adherence to Design Tokens**: When adding focus indicators or adjusting contrast, strictly use the existing design system tokens. Do not introduce arbitrary CSS classes or raw Tailwind. 
4. **Coordinate with Active Layout Work**: Run `python3 dev-tools/td_cli.py conflicts` before starting to ensure no active PRs are currently modifying the same core layout primitives (`src/layouts/*`).

---
*Priority: High | Effort: Medium to High*

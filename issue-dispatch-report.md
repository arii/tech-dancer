# Issue Dispatch Report

## 1. Summary of review coverage

- Audited `AGENTS.md` and repository requirements.
- Checked existing issues on GitHub (30 open issues).
- Searched codebase for raw Tailwind classes (violations of agent policy).
- Identified that most of the desktop UX, mobile UX, and AI slop content issues from the prompt have already been created as issues by previous runs or users (issues #1835, #1836, #1837, #1861, #1863, #1864, #1867, #1889, #1890, #1891, #1892).

## 2. List of new issues created

- `Refactor GlobalSearch to use design tokens and primitives` (Agent Policy Violation) - Issue #1897

## 3. Existing issues updated instead of duplicated

N/A

## 4. Candidates skipped and why

- `src/components/Equalizer.tsx` - Skipped because issue #1889 already covers it.
- `src/pages/UXAuditor.tsx` - Skipped because issue #1890 already covers it.
- `/` Hero Image Desktop UX - Skipped because issue #1835 already covers it.
- `/merch` Rhythm Desktop UX - Skipped because issue #1863 already covers it.
- `/research` Fatigue Desktop UX - Skipped because issue #1864 already covers it.
- Mobile UX Card Heights - Skipped because issue #1836 already covers it.
- Mobile UX Polishing (`/about`, `/gear`) - Skipped because issue #1867 already covers it.
- AI Slop 'Financial Strategy Guide' - Skipped because issues #1891 and #1837 already cover it.

## 5. Most common `AGENTS.md` violations found

- Extensive use of raw Tailwind layout classes (`flex`, `items-center`) instead of `Box` and `Stack` layout primitives.
- Extensive use of inline tailwind colors (`text-accent`, `bg-accent`, `border-line/50`) instead of semantic tokens.

## 6. Most common desktop UX problems found

- Oversized hero components pushing primary content below the fold.
- List fatigue in dense grids (e.g., `/research`).

## 7. Most common mobile UX problems found

- Inconsistent card heights.
- Metadata and badges wrapping excessively.

## 8. Content quality / AI slop risks found

- Placeholder or overpromising guides that claim functionality not present in the repository.

## 9. Recommended fix order

1. Resolve critical Agent Policy violations first (especially layout primitives) across shared components like `GlobalSearch`.
2. Fix Desktop Hero section to ensure the primary CTA is visible above the fold.
3. Normalize Mobile Card Heights and fix wrapping.
4. Move AI Slop to draft mode to stop leaking unsupported claims to users.

## 10. Recommended labels or milestones

- Labels: `agent-policy-violation`, `desktop-ux-review`, `mobile-ux-review`, `ai-slop-content-review`, `refactor`
- Priority: `P1` for layout agent policy violations.

## 11. Any follow-up audits needed

- A dedicated audit of components within `src/components/editorial/` and `src/components/products/` for inline Tailwind spacing properties once the primary layout issues are addressed.

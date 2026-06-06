# Issue Dispatch Report

## 1. Summary of review coverage

- **AGENTS.md and repo docs:** Reviewed to establish the core guidelines for the repository, focusing specifically on strict `.tsx` file styling guidelines (no raw tailwind, required use of primitives) and issue management.
- **Content:** Found multiple placeholder blog posts that contained no real content or concrete implementation value, directly violating the AI slop rules.
- **Components & Pages:** Found widespread violations of the Tailwind and styling policies in heavily-used generic UI components (`Equalizer.tsx`, `GearCard.tsx`) and application-level pages (`UXAuditor.tsx`, `Merch.tsx`).
- **Desktop/Mobile UX:** Relied on existing open UX issues which appeared appropriately scoped.

## 2. List of new issues created

- `Replace raw div and arbitrary Tailwind styling with Box/Tokens across Equalizer` (agent-policy-violation)
- `Remove inline Tailwind color classes from UXAuditor and Merch pages` (agent-policy-violation)
- `Remove inline Tailwind color and spacing classes from GearCard` (agent-policy-violation)
- `Move empty placeholder 'Financial Strategy Guide' to draft mode` (ai-slop-content-review)

## 3. Existing issues updated instead of duplicated

Numerous issues already exist for UX improvements and policy violations (e.g. `Consolidated: Replace raw div and arbitrary Tailwind styling with Box/Tokens across Home and Navigation`, `UX Auditor tool is completely broken and requires complete overhaul`, `Consolidated: Fix oversized hero image...`). New issues were targeted at files not explicitly covered by the existing consolidated issues.

## 4. Candidates skipped and why

Skipped creating new mobile and desktop UX issues because multiple high-quality UX consolidation issues were already open and tracking specific viewport/spacing changes.

## 5. Most common AGENTS.md violations found

The most persistent violation is the use of raw Tailwind layout classes (`className="flex items-center gap-4..."`) and arbitrary color overrides (`className="bg-bg focus:ring-accent..."`) instead of utilizing the `Box` and `Stack` primitives defined in `src/layouts/`.

## 6. Most common desktop UX problems found

Already tracked in existing issues: oversized hero images pushing content below the fold, unconstrained footer callouts, and list fatigue in grids.

## 7. Most common mobile UX problems found

Already tracked in existing issues: card height normalization, tap target sizes, and metadata wrapping.

## 8. Content quality / AI slop risks found

Several posts read as "coming soon" placeholders with high-level promises but zero concrete facts or step-by-step guidance (e.g., the Financial Strategy Guide for dancers). These provide no user value and must be returned to draft state.

## 9. Recommended fix order

1. **AI Slop / Content:** Easy to fix by toggling `draft: true`. Clean up public presentation immediately (P0).
2. **Component Refactors (`Equalizer`, `GearCard`):** Clean up the primitives before modifying the pages (P1).
3. **Page Level Refactors (`UXAuditor`, `Merch`):** Fix the structural styling on full views once components are compliant (P2).

## 10. Recommended labels or milestones

Ensure labels like `agent-policy-violation`, `refactor`, `ai-slop-content-review`, and `content` are consistently applied to manage priority queues.

## 11. Any follow-up audits needed

A deeper audit of all `src/features/` components is required, as the pattern of bypassing layout primitives is likely prevalent beyond the core shared components.

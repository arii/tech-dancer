# Slop Cleanup Plan

This plan outlines the refactoring steps required to address the issues identified in the [Component Audit](./component-audit.md).

## Phase 1: Card Consolidation
1. **Create `src/components/ui/BaseCard.tsx`**:
   - Move shared styles (bg-surface, border, hover transition) to this component.
   - Implement the "stretched link" pattern correctly in one place.
2. **Refactor existing cards**:
   - Update `ContentCard`, `EventCard`, `GearCard`, `ProductCard`, and `AffiliateCard` to use `BaseCard` as their root element.
   - Remove redundant Tailwind classes and absolute-positioned link wrappers from these cards.

## Phase 2: Naming & Copy Cleanup
1. **Update `src/pages/Contact.tsx`**:
   - Change validation labels to "Email address" and "Message destination".
2. **Refactor Event Sidebar**:
   - Change `quick-intelligence-content` to `event-insights-content`.
3. **Rename "Engines" and "Consoles"**:
   - Rename `timeline-engine.ts` to `timeline-utils.ts`.
   - Update `WCSScraperTool.tsx` labels from "Harvesting" to "Extraction" and "Console" to "Tools".
4. **Brand Voice Review**:
   - Audit `src/features/profile/ArielProfile.tsx` and `src/features/dashboard/Dashboard.tsx` for "AI-generated" sounding copy (e.g., "mission-ready", "agentic").

## Phase 3: Token Refinement
1. **Prune `design-tokens.ts`**:
   - Remove `layout.section` and `layout.divider`.
   - Inline single-use spacing tokens (`hero`, `comfort`, `endPad`) into their respective components.
2. **Standardize Layout Logic**:
   - Update `FolioGrid` to accept a `searchPlaceholder` prop instead of hardcoded branching logic.
   - Ensure `DetailLayout` uses standard `PageHeader` components where possible.

## Verification
- Run `pnpm run audit` to ensure no UI anti-patterns are introduced.
- Run `pnpm test` and `pnpm run test:e2e` to verify functionality.
- Perform visual regression check using Playwright.

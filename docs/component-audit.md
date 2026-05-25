# Component Audit: AI Slop & Duplication Inventory

This document identifies redundant patterns, AI-generated naming conventions, and architectural inconsistencies in the BoomTick codebase.

| Area | File | Issue | Recommendation | Risk |
|---|---|---|---|---|
| Cards | `src/components/ui/ContentCard.tsx` | Duplicated card frame, hover effects, and stretched link pattern. | Extract shared logic into a `BaseCard` or `CardFrame` primitive. | Medium |
| Cards | `src/components/ui/EventCard.tsx` | Duplicated card frame, hover effects, and stretched link pattern. | Extract shared logic into a `BaseCard` or `CardFrame` primitive. | Medium |
| Cards | `src/components/ui/GearCard.tsx` | Duplicated card frame, hover effects, and stretched link pattern. | Extract shared logic into a `BaseCard` or `CardFrame` primitive. | Medium |
| Cards | `src/components/products/ProductCard.tsx` | Duplicated card frame, hover effects, and stretched link pattern. | Extract shared logic into a `BaseCard` or `CardFrame` primitive. | Medium |
| Cards | `src/components/ui/AffiliateCard.tsx` | Duplicated card frame and stretched link pattern. | Extract shared logic into a `BaseCard` or `CardFrame` primitive. | Medium |
| Shells | `src/components/ui/FolioGrid.tsx` | Hardcoded branching for "Search gear..." vs "Search posts...". | Pass search placeholder as a prop or use context. | Low |
| Shells | `src/components/layout/DetailLayout.tsx` | Generic but complex wrapper with hardcoded "Back" button labels. | Consolidate with `PageHeader` patterns. | Low |
| Surfaces | `src/layouts/Box.tsx` | `surface` prop handles boolean and string differently, leading to inconsistent bg classes. | Strict typing for surface tokens and consolidation of `bg-surface` logic. | Low |
| AI-ish | `src/pages/Contact.tsx` | "Signal destination required" / "Invalid signal coordinate" validation messages. | Replace with "Email address" and standard terminology. | Low |
| AI-ish | `src/components/ui/EventSidebar.tsx` | ARIA IDs and attributes using "intelligence" (e.g., `quick-intelligence-content`). | Rename to "insights" or "facts". | Low |
| AI-ish | `src/features/lab/wsdc-reminders/lib/timeline-engine.ts` | "Engine" naming for relatively simple date calculation logic. | Rename to `timeline-utils` or `schedule-logic`. | Low |
| AI-ish | `src/features/research/components/WCSScraperTool.tsx` | "Harvesting & Impact Dashboard" and "Export Console" naming. | Rename to "Data Summary" and "Export Tool". | Low |
| AI-ish | `src/features/lab/BlogDrafter.tsx` | Snake_case uppercase labels: `METADATA_INPUT`, `SNAPSHOT_NOW`, `AI_INTEGRATION`, etc. | Use standard sentence case or Title Case labels. | Low |
| Tokens | `src/styles/design-tokens.ts` | Single-use spacing tokens (`hero`, `comfort`, `endPad`). | Inline these values or move to a specific `layout-tokens` file. | Low |
| Tokens | `src/styles/design-tokens.ts` | Redundant layout tokens (`section`, `divider`) that replicate primitive capabilities. | Remove in favor of `Stack` with `border` props and `gap`. | Low |
| Copy | Multiple | "Technical deep dives", "mission-ready", "agentic workflows" in profile/home. | Review for consistent brand voice (less "AI-startup", more "engineering-dancer"). | Low |

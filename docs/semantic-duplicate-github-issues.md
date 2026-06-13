# Semantic Duplicate GitHub Issue Dispatch Plan

Generated from the expanded semantic duplicate audit (`pnpm run audit:semantic`). The audit reports candidate duplicate structures across feature layout layers, routing structures, and utility logic.

These consolidated issues provide high-level targets to systematically reduce redundancy.

---

## Issue 1 — Consolidate route shells and display component wrappers

**Labels:** `refactor`, `routing`, `content`

**Problem:** The route controller shells for blog entries and gear details duplicate identical fallback, SEO headers, and back navigation flow logic. Additionally, product image renderers duplicate layout structure when rendering single assets.

**Duplicate candidates:**
- `src/features/journal/BlogPost.tsx` ↔ `src/features/lab/GearPost.tsx` (96% similar route shell)
- `src/components/products/MerchImageDisplay.tsx#SingleImage` ↔ `src/components/products/MerchImageDisplay.tsx#ProminentImages` (100% structurally identical wrappers around `<MerchImage>`)

**Suggested fix:** 
- Introduce a generic `ContentPostRouteShell` that manages routing params, React Query fetching hooks, fallback skeleton/error states, and metadata-mapping dynamically.
- Refactor `MerchImageDisplay.tsx` to call `<MerchImage>` directly when no secondary images exist, removing the redundant `SingleImage` component function.

**Acceptance criteria:**
- Common loading and not-found templates are shared across journal and tool routes.
- SEO parameters and schema.org outputs dynamically support both `BlogPosting` and `Product` structures.
- Display behaviors and responsive bounds remain unchanged.

---

## Issue 2 — Unify research tools and scraper panel components

**Labels:** `refactor`, `research`, `layouts`

**Problem:** Research feature tools (`BlastRadiusTool`, `GitOpsReviewerTool`, `EcommerceAutomationTool`) repeat the same frame layout, description card layout, control button states, and data panels. Scraper components also duplicate panels, tables, and statistics cards.

**Duplicate candidates:**
- `src/features/research/components/BlastRadiusTool.tsx` ↔ `src/features/research/components/GitOpsReviewerTool.tsx` (91% similar layout structure)
- `src/features/research/components/WCSScraperTool.tsx#WCSScraperStats` ↔ `WCSExportTools` ↔ `WCSDataTable`

**Suggested fix:**
- Extract a shared `ResearchToolLayout` or `ResearchToolShell` primitive wrapper that takes actions, description copy, and inputs as props.
- Unify WCS subpanels into generic `DataPanel`, `StatsCard`, and `ActionBar` layout components.

**Acceptance criteria:**
- Individual research files contain only their specific domain logic, parameters, and results payload.
- Panel styles, dividers, borders, and headers use shared layout primitives consistently.

---

## Issue 3 — Centralize chart panels, date utility helpers, and shared logic

**Labels:** `refactor`, `analytics`, `utilities`

**Problem:** Recharts container components duplicate identical panel chrome and fallback cards. Additionally, date formatting, relative time calculation, sorting, and ID generation are repeated inline across multiple features.

**Duplicate candidates:**
- `src/features/research/components/WCSChartContainers.tsx#ScoreDistributionChart` ↔ `AvgScoreTrendChart` (100% similar layout wrappers)
- `src/lib/utils.ts#parseDate` / `formatRelativeTime` ↔ `WSDCReminders.tsx` ↔ `UXAuditor.tsx` (redundant date parses/timestamps)
- `src/features/lab/useBlogDrafter.ts#generateId` (duplicate ID string helper)

**Suggested fix:**
- Extract a shared `AnalyticsChartCard` component containing title, description, loading, and layout styles, receiving only the chart node.
- Consolidate all parsing, formatting, relative calculations, and ID generation under a dedicated `src/lib/date-time.ts` utility file.

**Acceptance criteria:**
- Chart panels share container styles, headers, and responsive margins.
- Date sorting and display behavior across routes, reminders, and drafts are fully unit-tested under the unified utility.

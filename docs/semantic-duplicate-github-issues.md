# Semantic Duplicate GitHub Issue Dispatch Plan

Generated from the expanded semantic duplicate audit (`pnpm run audit:semantic`) on 2026-06-11. The audit reports 494 candidate duplicate pairs, 14 semantic role groups, 7 exact structure groups, 14 repeated JSX subtree patterns, 12 repeated class patterns, and 2 duplicate date/formatting logic groups.

Use these as dispatch-ready GitHub issues. Keep each PR focused and avoid mixing unrelated content domains.

### Tool Configuration Updates

- Added a `.jscpd.json` to ignore UI, layouts, editorial, navigation, and providers wrappers and set the minTokens threshold to 100.
- Updated `eslint.config.mjs` to disable SonarJS duplicate detection (`sonarjs/no-duplicate-string`, `sonarjs/no-identical-functions`) for `src/layouts/**/*.tsx`, `src/components/ui/**/*.tsx`, and `src/components/editorial/**/*.tsx`.
- Tuned `scripts/detect-semantic-duplicates.mjs` to ignore layout, UI, and editorial directories during static analysis walk.

These settings reduce false positives from structural layout components during duplicate detection.

---

## Issue 1 — Consolidate blog and gear post route shells

**Labels:** `refactor`, `routing`, `content`

**Problem:** `BlogPost` and `GearPost` scored 96% similar and independently implement the same route state, fallback, SEO, and detail rendering shell.

**Duplicate candidates:**

- `src/features/journal/BlogPost.tsx#BlogPost`
- `src/features/lab/GearPost.tsx#GearPost`

**Suggested fix:** Introduce a shared `ContentPostRoute`/`ArticleRouteShell` that accepts content type, resolver, SEO mapping, and detail renderer.

**Acceptance criteria:**

- Both routes use a shared route shell.
- No article filename/date prefixes are changed.
- Missing-content and SEO behavior remain identical.

---

## Issue 2 — Build a shared research tool shell

**Labels:** `refactor`, `research`, `semantic-duplicate`

**Problem:** Research tool pages repeat tool framing, explanatory copy blocks, control regions, and results surfaces. `BlastRadiusTool` and `GitOpsReviewerTool` scored 91% similar.

**Duplicate candidates:**

- `src/features/research/components/BlastRadiusTool.tsx#BlastRadiusTool`
- `src/features/research/components/GitOpsReviewerTool.tsx#GitOpsReviewerTool`
- `src/features/research/components/EcommerceAutomationTool.tsx#EcommerceAutomationTool`
- `src/features/research/components/WCSScraperTool.tsx#WCSScraperTool`

**Suggested fix:** Introduce `ResearchToolShell` with slots for input controls, summary cards, output panels, and documentation links.

**Acceptance criteria:**

- Tool chrome and layout are shared.
- Individual tools own only domain logic and result content.

---

## Issue 3 — Deduplicate chart container components

**Labels:** `refactor`, `analytics`, `low-risk`

**Problem:** The WCS chart containers scored 100% similar and duplicate chart wrapper semantics.

**Duplicate candidates:**

- `src/features/research/components/WCSChartContainers.tsx#ScoreDistributionChart`
- `src/features/research/components/WCSChartContainers.tsx#AvgScoreTrendChart`

**Suggested fix:** Extract `WCSChartCard`/`AnalyticsChartPanel` with title, description, chart, and empty-state slots.

**Acceptance criteria:**

- Both charts use the same container component.
- Chart-specific data and chart children remain isolated.

---

## Issue 4 — Normalize WCS scraper stats/export/table subpanels

**Labels:** `refactor`, `research`, `analytics`

**Problem:** WCS scraper subcomponents duplicate panel title, action row, table/list, and stats card semantics.

**Duplicate candidates:**

- `src/features/research/components/WCSScraperTool.tsx#WCSScraperStats`
- `src/features/research/components/WCSScraperTool.tsx#WCSExportTools`
- `src/features/research/components/WCSScraperTool.tsx#WCSDataTable`

**Suggested fix:** Extract reusable `DataPanel`, `StatsPanel`, and `ExportActions` components.

**Acceptance criteria:**

- WCS table/panel chrome no longer duplicates specs/table semantics.
- Export buttons and stats summaries use shared panel primitives.

---

## Issue 5 — Consolidate date/time and generated ID logic

**Labels:** `refactor`, `utilities`, `date-time`

**Problem:** Date/time logic appears in route effects, utilities, reminders, UX audit reports, content sorting, and generated IDs. The semantic audit found duplicate `new Date` and `Date.now` signals.

**Duplicate candidates:**

- `src/lib/utils.ts#parseDate`
- `src/lib/utils.ts#formatRelativeTime`
- `src/lib/content.ts` content sorting with `new Date(...).getTime()`
- `src/features/events/components/EventReminders.tsx` reminder date formatting
- `src/pages/UXAuditor.tsx` report timestamp rendering
- `src/features/lab/useBlogDrafter.ts#generateId`

**Suggested fix:** Introduce a `src/lib/date-time.ts` utility module for parse/format/sort/timestamp helpers and move generated draft IDs behind a single helper.

**Acceptance criteria:**

- Date parsing/formatting is centralized and tested.
- No behavior changes for content order, reminder dates, or audit timestamps.

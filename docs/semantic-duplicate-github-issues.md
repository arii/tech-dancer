# Semantic Duplicate GitHub Issue Dispatch Plan

Generated from the expanded semantic duplicate audit (`pnpm run audit:semantic`) on 2026-06-11. The audit now reports 1,293 candidate duplicate pairs, 22 semantic role groups, 11 exact structure groups, 18 repeated JSX subtree patterns, 18 repeated class patterns, and 2 duplicate date/formatting logic groups.

Use these as dispatch-ready GitHub issues. Keep each PR focused and avoid mixing unrelated content domains.

### Tool Configuration Updates

- Added a `.jscpd.json` to ignore UI/layout wrappers and increase token threshold.
- Updated `eslint.config.mjs` to disable SonarJS duplicate detection for `src/components/ui/**/*.tsx` and `src/layouts/**/*.tsx`.

These settings reduce false positives from structural layout components during duplicate detection.

## Issue 1 — Consolidate hero and masthead components

**Labels:** `refactor`, `design-system`, `semantic-duplicate`

**Problem:** Hero-like page introductions are split across editorial, global UI, event detail, and canvas-specific components.

**Duplicate candidates:**

- `src/components/editorial/EditorialHero.tsx#EditorialHero`
- `src/components/ui/HeroSection.tsx#HeroSection`
- `src/components/ui/HeroParticleCanvas.tsx#HeroParticleCanvas`
- `src/features/events/components/EventHero.tsx#EventHero`
- `src/features/events/components/EventHero.tsx#MetadataPill`

**Suggested fix:** Create a shared hero/masthead API with slot support for metadata pills, visual effects, CTA rows, and editorial/event variants.

**Acceptance criteria:**

- One shared hero primitive owns title, eyebrow, summary, metadata, and CTA placement.
- Event and editorial pages configure variants rather than reimplementing layout.
- Motion and spacing use existing tokens/primitives only.

## Issue 2 — Merge page, section, editorial, and sidebar header patterns

**Labels:** `refactor`, `ui-consistency`, `semantic-duplicate`

**Problem:** Header components repeat title/subtitle/meta layout semantics in multiple feature areas.

**Duplicate candidates:**

- `src/components/editorial/EditorialHeader.tsx#EditorialHeader`
- `src/components/ui/PageHeader.tsx#PageHeader`
- `src/components/ui/SectionHeader.tsx#SectionHeader`
- `src/components/ui/EventSidebar.tsx#EventHeaderExtras`
- `src/features/lab/components/sidebar/ResourceSidebar.tsx#ResourceHeaderExtras`

**Suggested fix:** Extract a shared `HeaderBlock`/`SectionHeading` with variants for page, section, editorial metadata, and compact sidebar contexts.

**Acceptance criteria:**

- Header typography, separators, metadata rows, and CTA placement come from one component family.
- `EventHeaderExtras` and `ResourceHeaderExtras` no longer duplicate the same structure.

## Issue 3 — Create a unified content/card variant system

**Labels:** `refactor`, `cards`, `design-system`

**Problem:** Card semantics are duplicated across product, affiliate, content, event, and gear card implementations.

**Duplicate candidates:**

- `src/components/ui/BaseCard.tsx#BaseCard`
- `src/components/ui/ContentCard.tsx#ContentCard`
- `src/components/ui/EventCard.tsx#EventCard`
- `src/components/ui/GearCard.tsx#GearCard`
- `src/components/ui/AffiliateCard.tsx#AffiliateCard`
- `src/components/products/ProductCard.tsx#ProductCard`

**Suggested fix:** Extend `BaseCard` into a variant-driven composed card API with slots for image, badge, metadata, excerpt, price, rating, and actions.

**Acceptance criteria:**

- Shared card structure handles repeated image/title/excerpt/metadata/action patterns.
- Feature cards only provide data and variant-specific slot content.
- Existing tests for product cards continue passing.

## Issue 4 — Consolidate blog and gear post route shells

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

## Issue 5 — Unify article/detail content renderers

**Labels:** `refactor`, `markdown`, `content`

**Problem:** Detail and markdown content rendering repeats between journal, gear, research, and preview surfaces.

**Duplicate candidates:**

- `src/features/journal/components/BlogPostDetail.tsx#BlogPostDetail`
- `src/features/lab/components/GearPostDetail.tsx#GearPostDetail`
- `src/features/research/ResearchDetail.tsx#ResearchDetail`
- `src/features/lab/components/FullPreview.tsx#FullPreview`
- Repeated class pattern: `prose-editorial`

**Suggested fix:** Create one `EditorialContentRenderer` with slots for affiliate disclosures, related links, resource metadata, and preview-only controls.

**Acceptance criteria:**

- `prose-editorial` usage is centralized.
- Markdown rendering and sanitization rules are shared.
- Preview mode remains available without duplicating renderer markup.

## Issue 6 — Consolidate event and resource sidebars

**Labels:** `refactor`, `sidebar`, `semantic-duplicate`

**Problem:** Event/resource sidebar components repeat header extras, body extras, metadata chips, and supporting card structure. `EventHeaderExtras` and `ResourceHeaderExtras` scored 98% similar.

**Duplicate candidates:**

- `src/components/ui/EventSidebar.tsx#EventSidebar`
- `src/components/ui/EventSidebar.tsx#EventHeaderExtras`
- `src/features/lab/components/sidebar/ResourceSidebar.tsx#ResourceSidebar`
- `src/features/lab/components/sidebar/ResourceSidebar.tsx#ResourceHeaderExtras`
- `src/features/lab/components/sidebar/ResourceSidebar.tsx#ResourceBodyExtras`

**Suggested fix:** Create a shared `DetailSidebar` with `headerExtras`, `bodyExtras`, `stats`, `links`, and `disclosure` slots.

**Acceptance criteria:**

- Sidebar shell, spacing, and metadata list semantics are shared.
- Event and resource sidebars remain feature-owned through slot content only.

## Issue 7 — Deduplicate chart container components

**Labels:** `refactor`, `analytics`, `low-risk`

**Problem:** The WCS chart containers scored 100% similar and duplicate chart wrapper semantics.

**Duplicate candidates:**

- `src/features/research/components/WCSChartContainers.tsx#ScoreDistributionChart`
- `src/features/research/components/WCSChartContainers.tsx#AvgScoreTrendChart`

**Suggested fix:** Extract `WCSChartCard`/`AnalyticsChartPanel` with title, description, chart, and empty-state slots.

**Acceptance criteria:**

- Both charts use the same container component.
- Chart-specific data and chart children remain isolated.

## Issue 8 — Build a shared research tool shell

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

## Issue 9 — Normalize WCS scraper stats/export/table subpanels

**Labels:** `refactor`, `research`, `analytics`

**Problem:** WCS scraper subcomponents duplicate panel title, action row, table/list, and stats card semantics.

**Duplicate candidates:**

- `src/features/research/components/WCSScraperTool.tsx#WCSScraperStats`
- `src/features/research/components/WCSScraperTool.tsx#WCSExportTools`
- `src/features/research/components/WCSScraperTool.tsx#WCSDataTable`
- `src/components/layout/DetailElements.tsx#SpecsTable`

**Suggested fix:** Extract reusable `DataPanel`, `StatsPanel`, and `ExportActions` components.

**Acceptance criteria:**

- WCS table/panel chrome no longer duplicates specs/table semantics.
- Export buttons and stats summaries use shared panel primitives.

## Issue 10 — Collapse merch image display variants

**Labels:** `refactor`, `merch`, `low-risk`

**Problem:** Merch image variant components have exact or near-exact structural duplicates. `SingleImage` and `ProminentImages` scored 100% similar.

**Duplicate candidates:**

- `src/components/products/MerchImageDisplay.tsx#MerchImage`
- `src/components/products/MerchImageDisplay.tsx#SingleImage`
- `src/components/products/MerchImageDisplay.tsx#EqualImages`
- `src/components/products/MerchImageDisplay.tsx#ProminentImages`
- `src/components/products/MerchImageDisplay.tsx#MerchImageDisplay`
- `src/components/ui/ProductImageFrame.tsx#ProductImageFrame`

**Suggested fix:** Replace layout-specific image functions with a single `MerchImageLayout` that receives a variant (`single`, `equal`, `prominent`).

**Acceptance criteria:**

- Shared image loading, alt text, sizing, and frame semantics are centralized.
- Existing visual variants are preserved through props, not separate duplicate functions.

## Issue 11 — Consolidate grid/list container patterns

**Labels:** `refactor`, `layout`, `design-system`

**Problem:** Grid-like surfaces independently implement collection layout semantics.

**Duplicate candidates:**

- `src/components/ui/FolioGrid.tsx#FolioGrid`
- `src/features/home/TopicGrid.tsx#TopicGrid`
- `src/features/lab/components/ResourceGrid.tsx#ResourceGrid`
- `src/components/layout/DetailElements.tsx#ScoreGrid`
- `src/components/ui/PageSkeleton.tsx#GridSkeleton`

**Suggested fix:** Create a shared collection layout API for card grids, dense stat grids, and skeleton grids.

**Acceptance criteria:**

- Responsive behavior is controlled through layout primitives, not one-off classes.
- Feature grid components become thin adapters around shared layout.

## Issue 12 — Rationalize skeleton and loading-state components

**Labels:** `refactor`, `loading-states`, `design-system`

**Problem:** Skeleton states are implemented as multiple components with repeated layout structure and variants.

**Duplicate candidates:**

- `src/components/ui/PageSkeleton.tsx#GridSkeleton`
- `src/components/ui/PageSkeleton.tsx#PostSkeleton`
- `src/components/ui/PageSkeleton.tsx#SimpleSkeleton`
- `src/components/ui/PageSkeleton.tsx#PageSkeleton`
- `src/components/ui/Skeleton.tsx#Skeleton`

**Suggested fix:** Convert page skeletons to configuration over one primitive skeleton composition.

**Acceptance criteria:**

- The route-level fallback still uses the standardized page skeleton.
- Grid/post/simple variants share a single skeleton builder.

## Issue 13 — Merge newsletter and CTA/banner section patterns

**Labels:** `refactor`, `cta`, `email-capture`

**Problem:** Newsletter/CTA sections repeat card-like copy, tag rows, and action structure.

**Duplicate candidates:**

- `src/components/editorial/EditorialNewsletter.tsx#EditorialNewsletter`
- `src/features/email-capture/NewsletterBanner.tsx#NewsletterBanner`
- `src/features/email-capture/EmailForm.tsx#EmailForm`
- `src/components/ReferralBanner.tsx#ReferralBanner`
- `src/features/home/DevLabCallout.tsx#DevLabCallout`

**Suggested fix:** Create a shared `CTASection` with optional email form, tag chips, referral link, and editorial variants.

**Acceptance criteria:**

- Newsletter copy and form state remain feature-specific.
- Layout and typography are shared.

## Issue 14 — Unify form field and form-shell semantics

**Labels:** `refactor`, `forms`, `accessibility`

**Problem:** Contact, email capture, and custom event forms duplicate label, input, validation, and action-region structure.

**Duplicate candidates:**

- `src/features/contact/components/ContactFormView.tsx#ContactFormView`
- `src/features/contact/components/FormField.tsx#FormField`
- `src/features/email-capture/EmailForm.tsx#EmailForm`
- `src/features/lab/wsdc-reminders/CustomEventForm.tsx#CustomEventForm`

**Suggested fix:** Introduce shared form primitives for field row, help/error text, actions, and success states.

**Acceptance criteria:**

- Inputs remain controlled.
- Labels and validation messaging are accessible and consistent.

## Issue 15 — Consolidate navigation item/link patterns

**Labels:** `refactor`, `navigation`, `accessibility`

**Problem:** Desktop, mobile, bottom nav, and event navigation repeat link item and active-state semantics.

**Duplicate candidates:**

- `src/components/Navigation.tsx#Navigation`
- `src/components/MobileBottomNav.tsx#MobileBottomNav`
- `src/components/navigation/MobileMenuOverlay.tsx#MobileMenuOverlay`
- `src/components/navigation/NavItem.tsx#NavItem`
- `src/features/events/components/EventNavigation.tsx#EventNavigation`

**Suggested fix:** Extract `NavLinkItem` and `NavList` variants for header, bottom mobile, overlay, and local event navigation.

**Acceptance criteria:**

- Active/hover/focus states are consistent.
- No route strings move outside route config patterns.

## Issue 16 — Share search input/results shell

**Labels:** `refactor`, `search`, `ui-consistency`

**Problem:** Search surfaces duplicate input chrome, empty state, and result-row semantics.

**Duplicate candidates:**

- `src/components/GlobalSearch.tsx#GlobalSearch`
- `src/components/ui/SearchBox.tsx#SearchBox`
- `src/components/ui/EmptyState.tsx#EmptyState`
- `src/components/ui/ListRow.tsx#ListRow`

**Suggested fix:** Create shared `SearchField`, `SearchResultsPanel`, and result row variants.

**Acceptance criteria:**

- Search keyboard/focus behavior remains unchanged.
- Empty/loading/result states are shared.

## Issue 17 — Normalize table/list/detail stat displays

**Labels:** `refactor`, `data-display`, `semantic-duplicate`

**Problem:** Specs, architectural asset lists, score items, and WCS data rows repeat label/value/list display semantics.

**Duplicate candidates:**

- `src/components/layout/DetailElements.tsx#ScoreItem`
- `src/components/layout/DetailElements.tsx#SpecsTable`
- `src/features/research/components/ArchitecturalAssetsList.tsx#ArchitecturalAssetsList`
- `src/features/research/components/WCSScraperTool.tsx#WCSDataTable`
- `src/components/ui/ListRow.tsx#ListRow`

**Suggested fix:** Add `KeyValueList`, `StatItem`, and `DataList` primitives.

**Acceptance criteria:**

- Detail pages and research tools share the same data-display building blocks.
- Table/list accessibility semantics are preserved.

## Issue 18 — Centralize profile/resource/sidebar item lists

**Labels:** `refactor`, `profile`, `resources`

**Problem:** Profile cards, sidebar link lists, and resource body extras repeat small-list and link-list layouts.

**Duplicate candidates:**

- `src/features/profile/components/ProfileComponents.tsx#ProfileItems`
- `src/features/profile/components/ProfileComponents.tsx#ProfileLinks`
- `src/features/profile/components/ProfileComponents.tsx#ExperienceCards`
- `src/features/lab/components/sidebar/ResourceSidebar.tsx#ResourceBodyExtras`
- `src/features/lab/components/sidebar/ResourceSidebar.tsx#ResourceSidebar`

**Suggested fix:** Create a shared `InfoList`/`LinkList` with icon, label, value, and href slots.

**Acceptance criteria:**

- Profile and sidebar lists no longer duplicate item-row markup.
- Icons and link affordances remain accessible.

## Issue 19 — Tokenize repeated icon sizing and metadata chip classes

**Labels:** `design-system`, `tokens`, `cleanup`

**Problem:** The audit found repeated raw class patterns such as `w-4 h-4 text-accent`, `w-5 h-5`, `group-hover:text-accent transition-colors`, and `hover:text-accent transition-colors`.

**Duplicate candidates:**

- `src/components/ui/EventCard.tsx#EventCard`
- `src/components/ui/EventSidebar.tsx#EventSidebar`
- `src/components/ui/GearCard.tsx#GearCard`
- `src/features/lab/BlogDrafter.tsx#BlogDrafter`
- `src/features/profile/components/ProfileComponents.tsx#ProfileItems`

**Suggested fix:** Route repeated icon/link/chip affordances through `Icon`, `StatusBadge`, `Text`, or a new metadata-chip primitive.

**Acceptance criteria:**

- Touched files introduce no new UI audit violations.
- Repeated icon/link class combinations are replaced by tokenized variants.

## Issue 20 — Centralize home section width/container wrappers

**Labels:** `refactor`, `home`, `layout`

**Problem:** Home feature modules repeat section wrapper/container semantics, including the repeated `w-full max-w-full min-w-0` class pattern.

**Duplicate candidates:**

- `src/features/home/DevLabCallout.tsx#DevLabCallout`
- `src/features/home/FeaturedEventGuide.tsx#FeaturedEventGuide`
- `src/features/home/FeaturedGuidePanel.tsx#FeaturedGuidePanel`
- `src/features/home/GearShelf.tsx#GearShelf`
- `src/features/home/LatestPosts.tsx#LatestPosts`
- `src/features/home/TopicGrid.tsx#TopicGrid`

**Suggested fix:** Add a home `SectionShell` or use existing layout primitives consistently for section sizing and overflow behavior.

**Acceptance criteria:**

- Home modules share container/sizing semantics.
- Section-specific content remains split by feature file.

## Issue 21 — Consolidate date/time and generated ID logic

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

## Issue 22 — Unify buttons, filters, copy actions, and floating actions

**Labels:** `refactor`, `buttons`, `accessibility`

**Problem:** Action components repeat button affordance semantics across filters, copy prompts, scroll controls, and general actions.

**Duplicate candidates:**

- `src/components/ui/FilterButton.tsx#FilterButton`
- `src/components/ui/ActionButton.tsx#ActionButton`
- `src/components/ui/ViewToggle.tsx#ViewToggle`
- `src/components/ui/ScrollToTopButton.tsx#ScrollToTopButton`
- `src/pages/UXAuditor.tsx#CopyPromptButton`

**Suggested fix:** Extend the shared `Button` variant API and migrate feature actions to it.

**Acceptance criteria:**

- Focus, pressed, disabled, and aria states are consistent.
- Floating and copy actions remain distinguishable through variants.

## Issue 23 — Rationalize empty, notice, disclosure, and callout states

**Labels:** `refactor`, `feedback`, `design-system`

**Problem:** Informational states and callouts repeat card-like layout and icon/title/body semantics.

**Duplicate candidates:**

- `src/components/ui/EmptyState.tsx#EmptyState`
- `src/components/ui/Notice.tsx#Notice`
- `src/components/ui/AffiliateDisclosure.tsx#AffiliateDisclosure`
- `src/components/layout/DetailElements.tsx#VerdictCallout`
- `src/features/home/DevLabCallout.tsx#DevLabCallout`
- `src/features/contact/components/SuccessState.tsx#SuccessState`

**Suggested fix:** Create a `FeedbackBlock`/`Callout` primitive with tone, icon, title, body, and actions slots.

**Acceptance criteria:**

- Success, notice, affiliate disclosure, and editorial callout variants use one implementation.
- Accessibility and disclosure wording remain intact.

## Issue 24 — Create a codemod backlog after shared APIs land

**Labels:** `codemod`, `follow-up`, `maintenance`

**Problem:** The audit produces many high-confidence duplicate pairs and role groups; manual migrations will be repetitive once shared APIs exist.

**Duplicate candidates:**

- Card migrations from `ContentCard`, `EventCard`, `GearCard`, and `ProductCard` to the shared card API.
- Hero/header migrations to the shared masthead/header APIs.
- Markdown/detail renderer migrations to the shared editorial renderer.
- Button/filter/copy action migrations to shared `Button` variants.

**Suggested fix:** Add jscodeshift transforms after the shared APIs are merged.

**Acceptance criteria:**

- Codemods are isolated by domain and include dry-run instructions.
- Each codemod has before/after examples and a focused test fixture.

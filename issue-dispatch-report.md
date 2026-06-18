# Issue Dispatch Report

**Date:** 2026-06-18  
**Branch reviewed:** `copilot/update-agent-prompts`  
**Agent:** Copilot SWE Agent (issue-dispatch)

---

## 1. Review Coverage Summary

| Area | Coverage |
|------|----------|
| AGENTS.md / repo docs | ✅ Full read |
| Existing open issues (32) | ✅ All checked |
| Recently closed issues | ✅ Checked for Home.tsx (#1901) |
| Routes reviewed | `/`, `/blog`, `/blog/:slug`, `/research`, `/research/:id`, `/merch`, `/about`, `/ux-auditor` |
| Feature files audited | `DevLabCallout.tsx`, `ResearchAnalytics.tsx`, `UXAuditor.tsx`, `ArielProfile.tsx`, `BlogFeed.tsx`, `BlogDrafter.tsx` |
| Content files reviewed | 17 posts, 1 blog post, 2 studies |
| Desktop viewport analysis | Code inspection (1280px+) |
| Mobile viewport analysis | Code inspection (375px+) |

---

## 2. New Issues Ready to File

> GitHub REST API was blocked by DNS proxy in the agent environment. Issues below are fully written and ready to paste into GitHub.

---

### Issue A — `agent-policy-violation` | Severity: medium | P2

**Title:** Consolidate duplicated colored tech-tag markup into shared TechBadge component

**Labels:** `agent-policy-violation`, `design-system`, `refactor`, `tech-debt`

**Body:**

```markdown
## Problem

Seven identical colored tag markup patterns are copy-pasted across `DevLabCallout.tsx` and `ResearchAnalytics.tsx` without a shared component. Each instance manually composes `className="bg-brand-{color}/10 text-brand-{color} border-brand-{color}/20"` directly on `<Text>` elements.

## File(s)

- `src/features/home/DevLabCallout.tsx` (lines 30, 38, 46)
- `src/features/research/ResearchAnalytics.tsx` (lines 324, 335, 343, 351, 359)

## Evidence

**DevLabCallout.tsx (lines 30, 38, 46):**
```tsx
<Text as="span" key={tag} size="micro" weight="font-medium" paddingX={2} paddingY={0.5} radius="sm" border className="bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20">{tag}</Text>
<Text as="span" key={tag} size="micro" weight="font-medium" paddingX={2} paddingY={0.5} radius="sm" border className="bg-brand-amber/10 text-brand-amber border-brand-amber/20">{tag}</Text>
<Text as="span" key={tag} size="micro" weight="font-medium" paddingX={2} paddingY={0.5} radius="sm" border className="bg-brand-green/10 text-brand-green border-brand-green/20">{tag}</Text>
```

**ResearchAnalytics.tsx (lines 335–359):**
```tsx
<Text key={tag} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className="bg-brand-purple/10 text-brand-purple border border-brand-purple/20">{tag}</Text>
<Text key={tag} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className="bg-brand-green/10 text-brand-green border border-brand-green/20">{tag}</Text>
<Text key={tag} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className="bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">{tag}</Text>
<Text key={tag} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className="bg-brand-amber/10 text-brand-amber border border-brand-amber/20">{tag}</Text>
```

The two files disagree on `weight` (`font-medium` vs `font-bold`), creating a subtle visual inconsistency.

## Why this violates repo policy

- **AGENTS.md Rule 12 — Composition Over Configuration**: "Repeated patterns extracted into specialized components." This pattern repeats across two unrelated feature files.
- **AGENTS.md Rule 18 — No System Bypass via `className`**: The `className` prop introduces new color-coded design decisions instead of using a named variant.
- **AGENTS.md Rule 1 — No Raw Tailwind in App/Feature Layers**: Direct color classes (`bg-brand-cyan/10`, `text-brand-purple`) are used in feature-layer components.

## Impact

- Any future change to tag style must be applied in 7 places across 2 files
- Font weight inconsistency between the two sites (`font-medium` vs `font-bold`) creates subtle UI drift
- Color decisions are duplicated in feature code instead of centralized in a shared variant

## Recommended fix

1. Create `src/components/ui/TechBadge.tsx` with a `color` variant prop supporting `cyan | amber | green | purple`
2. Replace all 7 instances with `<TechBadge label={tag} color="cyan" />` etc.
3. Standardize font weight to `font-bold` across both call sites

Example API:
```tsx
<TechBadge label="ROS1/2" color="cyan" />
<TechBadge label="GitHub Actions" color="green" />
```

## Acceptance criteria

- [ ] File no longer violates the referenced policy
- [ ] A shared `TechBadge` (or `CategoryTag`) component exists with color variant props
- [ ] All 7 hardcoded `bg-brand-*` tag instances in both files are replaced
- [ ] Font weight is consistent between call sites
- [ ] UI remains visually equivalent or improves
- [ ] Lint/typecheck/build pass
```

---

### Issue B — `agent-policy-violation` | Severity: medium | P2

**Title:** Extract sub-components from UXAuditor.tsx into src/features/ux-auditor/components/

**Labels:** `agent-policy-violation`, `architecture`, `refactor`, `ui-refactor`

**Body:**

```markdown
## Problem

`src/pages/UXAuditor.tsx` is a 562-line page file that defines three sub-components at the file level — `CopyPromptButton`, `ViewportFrame`, and `ViewportAnalysisCard` — in addition to the main `UXAuditor` export. This violates the "Avoid God Components" rule and the "Feature Isolation Required" rule from AGENTS.md.

Per AGENTS.md rule 8, features belong in `features/<feature-name>/`. The `src/features/ux-auditor/` directory already exists with `useUXAuditor.ts` and `useSnapshotManager.ts`, but no components directory.

## File(s)

- `src/pages/UXAuditor.tsx` (562 lines total)

## Evidence

Internal component definitions at the page level (lines 25–267):

```tsx
// Line 25
function CopyPromptButton({ suggestion }: { suggestion: string }) { ... }

// Line 91
function ViewportFrame({ url, width, height }: { url: string; width: number; height: number }) { ... }

// Line 165
function ViewportAnalysisCard({ vp, data, activeReportUrl }: { ... }) { ... }

// Line 268
export default function UXAuditor() { ... }
```

`ViewportFrame` (lines 91–164) is 73 lines on its own. `ViewportAnalysisCard` (lines 165–267) is 102 lines with its own substate. These are substantial components that would benefit from isolation.

## Why this violates repo policy

- **AGENTS.md Rule 16 — Avoid "God Components"**: "Components are small and focused." A 562-line page file with 3 embedded sub-components is a God Component.
- **AGENTS.md Rule 8 — Feature Isolation Required**: "Features belong in `features/<feature-name>/`." The ux-auditor feature has an existing directory but no components folder.
- **AGENTS.md Rule 15 — App Layer = Composition Only**: Page files should compose, not define presentation logic.

## Impact

- Sub-components are not testable in isolation
- `UXAuditor.tsx` is harder to review and modify — the page and its components are coupled in a single 562-line file
- Future additions to the ux-auditor feature have no clear home for new components

## Recommended fix

1. Create `src/features/ux-auditor/components/` directory
2. Move `CopyPromptButton` → `src/features/ux-auditor/components/CopyPromptButton.tsx`
3. Move `ViewportFrame` → `src/features/ux-auditor/components/ViewportFrame.tsx`
4. Move `ViewportAnalysisCard` → `src/features/ux-auditor/components/ViewportAnalysisCard.tsx`
5. Update imports in `src/pages/UXAuditor.tsx`
6. `UXAuditor.tsx` should reduce to ~100 lines of composition logic

## Acceptance criteria

- [ ] `src/features/ux-auditor/components/` directory exists with the 3 extracted components
- [ ] `src/pages/UXAuditor.tsx` is reduced to composition-only logic (target: <150 lines)
- [ ] All 3 sub-components are individually importable and testable
- [ ] UI behavior is unchanged
- [ ] Lint/typecheck/build pass
```

---

### Issue C — `desktop-ux-review` + content bug | Severity: medium | P2

**Title:** Fix broken /gear/ link in "Make Any Shoe a Dance Shoe" post

**Labels:** `bug`, `content-management`, `desktop-ux-review`, `mobile-ux-review`

**Body:**

```markdown
## Problem

The post `content/posts/2026-04-18-make-shoe-dance.md` contains an inline link to `/gear/2026-04-12-suede-shoe-diy`, but `/gear` routes are now removed and redirect to `RemovedPage`. Clicking the link gives users a "page removed" dead end with no path to buy the referenced product.

## Route / viewport

- Route: `/blog/2026-04-18-make-shoe-dance`
- Viewport: all (desktop and mobile)

## Evidence

File: `content/posts/2026-04-18-make-shoe-dance.md`, line 74:

```markdown
| **[Adhesive suede sheets](/gear/2026-04-12-suede-shoe-diy)** | Creates dance sole |
```

Route config confirms `/gear` routes to `RemovedPage`:
```tsx
// src/config/routes.tsx
{
  path: '/gear',
  lazy: () => import('@/pages/RemovedPage').then(m => ({ Component: m.default })),
  skeleton: 'simple',
  sitemap: false
},
```

## User impact

A visitor following the step-by-step tutorial clicks the suede sheets link to buy the product and lands on a "page removed" screen with no way to complete the purchase. The affiliate conversion is lost and the tutorial feels broken.

The post has `affiliateIds: [suede-sheets]` in frontmatter, so the product already renders in the sidebar affiliate widget. The inline table link is redundant and broken.

## Recommended fix

Remove the hyperlink from the inline table cell, replacing it with plain text:

```markdown
| **Adhesive suede sheets** | Creates dance sole |
```

The product is already promoted in the sidebar affiliate card via `affiliateIds: [suede-sheets]`. Alternatively, update the link to point to the affiliate product URL directly if the suede-sheets affiliate link is available from `affiliateManager`.

## Acceptance criteria

- [ ] No horizontal scrolling at tested mobile widths
- [ ] `/blog/2026-04-18-make-shoe-dance` no longer contains a link to a removed `/gear/` route
- [ ] Affiliate product is still discoverable via sidebar widget
- [ ] No new desktop or mobile regressions
```

---

### Issue D — `ai-slop-content-review` | Severity: high | P1

**Title:** Update wcs-scraper-initial-sync.md study to match actual ETL implementation (scoring.dance, not worldwestcoastswingcouncil.com)

**Labels:** `ai-slop-content-review`, `content-management`, `data-integrity`, `needs-revision`

**Body:**

```markdown
## Problem

The published research study `content/studies/wcs-scraper-initial-sync.md` presents a code walkthrough that does not match the actual `etl/scraper.py` implementation in the repository. Key discrepancies include the scraping target URL, the tech stack used, and a frontend integration path that doesn't exist.

## Location

- File: `content/studies/wcs-scraper-initial-sync.md`
- Route: `/research/wcs-scraper-initial-sync` (published as `status: "published"`)

## Evidence

**Discrepancy 1 — Wrong scraping URL**

The study (line 38) says:
```python
url = "https://worldwestcoastswingcouncil.com/events/"
```

The actual `etl/scraper.py` uses:
```python
BASE_URL = "https://scoring.dance"
# ...
url = f"{self.base_url}/enUS/recent?page={page}"
```

`worldwestcoastswingcouncil.com` is not referenced anywhere in the actual codebase.

**Discrepancy 2 — Wrong tech stack**

The study uses `BeautifulSoup` and `pydantic` for scraping and schema validation (lines 26–27, 109):
```python
from bs4 import BeautifulSoup
from pydantic import BaseModel, ValidationError, Field
run: pip install beautifulsoup4 requests pydantic
```

The actual `etl/scraper.py` uses `playwright.async_api` with `pandas` and `tenacity` for async scraping and retry logic — no `pydantic` at all.

**Discrepancy 3 — Non-existent output path**

The study writes to `public/data/event_queue.json` (lines 77, 118, 131, 153):
```python
with open('public/data/event_queue.json', 'w') as f:
    json.dump(valid_events, f, indent=2)
```

This file does not exist in `public/data/`. There is no `public/data/` directory in the repository.

**Discrepancy 4 — Non-existent frontend integration**

The study shows a React fetch:
```tsx
const response = await fetch('/data/event_queue.json');
```

No such fetch exists in any frontend file in `src/`.

## Why this is a problem

This is a portfolio study representing the author's engineering work. Presenting code that contradicts the actual implementation:

1. **Trust/credibility**: Readers (including potential employers reviewing the DevAI portfolio) will notice the mismatch if they inspect the repository
2. **SEO**: The page is `status: "published"` and indexed; inaccurate technical content creates quality signals that undermine site authority
3. **User value**: Developers trying to follow this tutorial to build something similar will get stuck immediately when they try to run the code

## Recommended action

Rewrite with actual implementation details from `etl/scraper.py`, or mark as `status: "draft"` pending a rewrite.

## Rewrite guidance

- Replace the fictional scraper with a code excerpt from the actual `etl/scraper.py` (lines 35–65 show the real `WCSDataScraper` class using Playwright)
- Show the real `BASE_URL = "https://scoring.dance"` and the async scraping pattern
- Update the CI/CD integration section to reference actual GitHub Actions workflows in `.github/workflows/`
- Remove the `public/data/event_queue.json` frontend integration claim if it isn't implemented
- If the post is intended as aspirational architecture, clearly label each section as "Implemented" / "Planned" (as the `ai-devops-pipeline.md` study does well)

## Acceptance criteria

- [ ] Content no longer overpromises
- [ ] Code examples match actual files in the repository
- [ ] Scraping URL and tech stack reflect `etl/scraper.py`
- [ ] Frontend integration claim is either removed or backed by actual code
- [ ] If a gap between article and reality is intentional, each section is clearly labeled as Implemented / Experimental / Pattern
- [ ] Draft-quality content is moved to draft mode if not yet ready
```

---

## 3. Existing Issues — Not Duplicated

| # | Title | Action |
|---|-------|--------|
| #2534 | Rewrite "The Story Behind the Merch" blog post | Open — no action |
| #2533 | Oversized images in blog posts dominate mobile viewport | Open — no action |
| #2532 | Oversized images in blog posts break desktop reading rhythm | Open — no action |
| #2531 | Replace raw flex and items-center classes in UXAuditor.tsx | Open — Issue B above is separate (structure vs. styling) |
| #2530 | Replace raw form styling in BlogDrafter.tsx | Open — no action |
| #2529 | Remove raw padding and flex classes in ResearchAnalytics.tsx | Open — Issue A above is separate (tag duplication vs. layout classes) |
| #2461 | Move power-charging.md to draft | Open — no action |
| #1836 | Normalize mobile card heights, reduce metadata wrapping, tap targets | Open — no action |
| #1901 | Fix Agent Policy Violations: Raw Tailwind Layouts in Home.tsx | Closed — but violations remain; recommend re-opening |

---

## 4. Candidates Skipped and Why

| Candidate | Reason Skipped |
|-----------|----------------|
| `content/posts/2026-04-18-financial-literacy-dancers.md` | `draft: true` — not publicly visible, no user impact |
| `content/posts/2026-04-18-competition-metrics.md` | `draft: true` — not publicly visible |
| `content/posts/2026-05-06-boomtick-and-b-the-rhythmic-architecture-of-west-coast-swing.md` | `draft: true` — substantive content, just unfinished |
| `src/pages/Home.tsx` arbitrary grid values | Covered by closed #1901; recommend re-open instead of duplicate |
| `src/components/navigation/MobileMenuOverlay.tsx` DOM access | `querySelectorAll` with `useRef` is acceptable accessibility pattern for focus trap; not a true AGENTS violation |
| `src/App.tsx` `document.createElement` | Google Analytics script injection — standard pattern, not a policy violation |

---

## 5. Most Common AGENTS.md Violations Found

1. **Rule 12 (Composition Over Configuration)** — Duplicated tag/badge markup across feature files (Issue A)
2. **Rule 16 (Avoid "God Components")** — Large page files with embedded sub-components (Issue B)
3. **Rule 1 (No Raw Tailwind)** + **Rule 18 (No System Bypass via className)** — Already tracked in #2529, #2531, #2530

---

## 6. Most Common Desktop UX Problems Found

- Existing: Images in blog posts dominate the layout (#2532)
- New: Broken internal link creates dead-end reading experience (Issue C)

---

## 7. Most Common Mobile UX Problems Found

- Existing: Oversized blog post images on mobile (#2533), card heights (#1836)
- No new unique mobile issues found beyond what is already tracked

---

## 8. Content Quality / AI Slop Risks Found

1. **High risk** — `wcs-scraper-initial-sync.md`: published study with fictional code examples that contradict the actual ETL implementation (Issue D)
2. **Existing** — `The Story Behind the Merch` (#2534): informal voice, missing images

---

## 9. Recommended Fix Order

| Priority | Issue | Rationale |
|----------|-------|-----------|
| P1 | Issue D — wcs-scraper study | Published content with factually wrong code examples undermines portfolio credibility |
| P2 | Issue C — broken /gear/ link | Active tutorial post has a dead-end link that breaks the purchase flow |
| P2 | Issue A — TechBadge consolidation | DRY violation + 7 copy-pasted className strings |
| P2 | Issue B — UXAuditor sub-components | Modular architecture violation in the app's most complex page |
| P3 | Re-open #1901 | Home.tsx arbitrary grid values remain despite closure |

---

## 10. Recommended Labels / Milestones

New labels to create if not present:
- `agent-policy-violation` — confirmed present in repo labels ✅
- `ai-slop-content-review` — confirmed present in repo labels ✅  
- `desktop-ux-review` — confirmed present in repo labels ✅
- `mobile-ux-review` — confirmed present in repo labels ✅

---

## 11. Follow-up Audits Needed

1. **Screenshot audit** — Install Playwright (`pnpm run setup:playwright`) and run `python3 dev-tools/td_cli.py gh pre-submit` with viewport screenshots to validate hero layout at 1280px and 375px
2. **Lighthouse audit** — Run Lighthouse on `/research` and `/merch` to check performance scores, particularly for image optimization and LCP
3. **ETL documentation audit** — Review all content in `content/studies/` for accuracy against actual code in `etl/` — the pattern of aspirational code examples is high-risk for a portfolio site
4. **Draft content sweep** — The 4 draft posts from April 2026 are aging without progress; consider setting a release deadline or archiving them permanently

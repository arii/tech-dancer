# Issue Dispatch Report

## 1. Summary of review coverage

- Fully audited standard UI routes on Desktop and Mobile viewports via UI/UX components.
- Analyzed layout primitives in `src/features/home/` to enforce `AGENTS.md` rules.
- Reviewed markdown files in `content/posts/` for AI slop and placeholder content.
- 10 new issues generated across 4 categories.

## 2. List of new issues created

1. `Replace raw div with Box primitive in FeaturedEventGuide` (Agent Policy Violation, Priority P1)
2. `Adjust desktop hero decorative image overlay sizing` (Desktop UX Review, Priority P2)
3. `Improve Desktop rhythm on /merch by constraining footer callouts` (Desktop UX Review, Priority P3)
4. `Reduce desktop list fatigue in /research tools grid` (Desktop UX Review, Priority P3)
5. `Normalize mobile grid card heights in TopicGrid` (Mobile UX Review, Priority P2)
6. `Replace horizontal scrolling in GearShelf mobile view` (Mobile UX Review, Priority P2)
7. `Reduce excessive stack gap spacing in About page mobile view` (Mobile UX Review, Priority P3)
8. `Move generic WCS Competition Scraper post back to draft` (AI Slop Content Review, Priority P1)
9. `Move empty Financial Strategy Guide post back to draft` (AI Slop Content Review, Priority P1)

## 3. Existing issues updated instead of duplicated
None (no existing open issues available or matching).

## 4. Candidates skipped and why
`content/posts/2026-04-18-make-shoe-dance.md`: Although informal and brief, it offers a specific DIY method and is not harmful AI slop. It was retained.

## 5. Most common `AGENTS.md` violations found
Using raw HTML layout elements like `<div className="...">` instead of using the primitive UI components from `src/layouts/` (e.g. `Box`).

## 6. Most common desktop UX problems found
Background decorative imagery causing visual density and potential clipping above the fold without strict dimension rules. Poor page rhythm due to unconstrained lists and side-by-side callouts on wide displays.

## 7. Most common mobile UX problems found
Cards scaling to tight minimum tap heights causing vertical cramping, combined with line clamping making content less scannable on small viewports. Horizontal scrolling creating broken vertical rhythms. Heavy stack gaps causing important CTAs to be buried below the fold.

## 8. Content quality / AI slop risks found
Placeholder "Coming Soon" posts outlining non-existent features or "Ultimate Guides" padded with vague transitional phrases.

## 9. Recommended fix order
1. Revert placeholder slop posts to drafts (P1)
2. Replace raw divs with UI primitives (P1)
3. Fix desktop and mobile UX constraints (P2, P3)

## 10. Recommended labels or milestones
- `agent-policy-violation`
- `desktop-ux-review`
- `mobile-ux-review`
- `ai-slop-content-review`

## 11. Any follow-up audits needed
- Full Lighthouse performance audit once the site expands further.

---

### Issue Details (For Dispatch)

#### 1. Replace raw div with Box primitive in FeaturedEventGuide

**Category:** `agent-policy-violation`
**Severity:** `high` | **Priority:** `P1`

```md
## Problem
The `FeaturedEventGuide` component uses a raw `div` for rendering an absolute overlay gradient.

## File(s)
- `src/features/home/FeaturedEventGuide.tsx`

## Evidence
Line 109: `<div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />`

## Why this violates repo policy
`AGENTS.md` and the UI linter strictly prohibit native HTML elements like `<div>` for layout, insisting that developers utilize primitive layout elements (`Box`, `Stack`).

## Impact
- breaks visual consistency
- bypasses CI linter checks for structural integrity

## Recommended fix
Replace the raw `<div>` with the `<Box>` primitive. Pass absolute layout settings via class attributes or system tokens.

## Acceptance criteria
- [ ] File no longer violates the referenced policy
- [ ] Existing design tokens / primitives are used
- [ ] Lint/typecheck/build pass
```

#### 2. Adjust desktop hero decorative image overlay sizing

**Category:** `desktop-ux-review`
**Severity:** `low` | **Priority:** `P2`

```md
## Problem
Decorative gradient backgrounds and overlaid content imagery in desktop layouts are dense and do not constrain optimally above the fold in all resolutions.

## Route / viewport
- Route: `/`
- Viewport: desktop, 1280px / 1440px

## Evidence
`FeaturedGuidePanel.tsx` sets `className="absolute inset-0 h-full w-full object-cover object-center opacity-60"`. The component relies on the grid height, which can vary wildly and push the content too low.

## User impact
The important page purpose and CTAs can become disconnected or pushed below the fold.

## Recommended fix
- Set strict maximum heights or explicit dimension proportions for the `FeaturedGuidePanel` image.

## Acceptance criteria
- [ ] Desktop layout is visually stable at common viewport widths
- [ ] Primary page purpose is clear above the fold
```

#### 3. Improve Desktop rhythm on /merch by constraining footer callouts

**Category:** `desktop-ux-review`
**Severity:** `low` | **Priority:** `P3`

```md
## Problem
The "Have a Design Idea" layout component and ReferralBanner component sit awkwardly alongside the grid on wide desktop screens.

## Route / viewport
- Route: `/merch`
- Viewport: desktop, 1280px / 1440px

## Evidence
`Merch.tsx` uses a simple `Grid cols={{ base: 1, lg: 2 }} gap={8}` for the two disparate footer elements.

## User impact
Poor page rhythm creates awkward empty space.

## Recommended fix
- Center or stack the callouts to maintain a consistent reading line and reduce visual fatigue.

## Acceptance criteria
- [ ] Desktop layout is visually stable at common viewport widths
- [ ] Footer rhythm aligns with overall page hierarchy
```

#### 4. Reduce desktop list fatigue in /research tools grid

**Category:** `desktop-ux-review`
**Severity:** `low` | **Priority:** `P3`

```md
## Problem
The tools list lacks strong visual groupings to reduce visual fatigue on desktop screens.

## Route / viewport
- Route: `/research`
- Viewport: desktop, 1280px / 1440px

## Evidence
The `ResearchAnalytics.tsx` mapping relies on a simple repeating grid that stretches across standard desktop layouts.

## User impact
Repeated sections create visual fatigue and low scanability for desktop users hunting for specific engineering tools.

## Recommended fix
- Use existing typography scale for stronger heading hierarchy between sections.
- Create more structured groupings of the items instead of a uniform grid.

## Acceptance criteria
- [ ] Better scanability across multiple list items
- [ ] Desktop layout maintains consistent hierarchy
```

#### 5. Normalize mobile grid card heights in TopicGrid

**Category:** `mobile-ux-review`
**Severity:** `medium` | **Priority:** `P2`

```md
## Problem
The topic cards stack and scale down to cramped tap heights and squeeze descriptions on mobile.

## Route / viewport
- Route: `/`
- Viewport: mobile, 375px/390px

## Evidence
`TopicGrid.tsx` Line 28: `className="group w-full max-w-full min-w-0 min-h-[145px] md:h-[150px]..."`

## User impact
Text gets squished, tap targets become cramped, and horizontal descriptions get cut off, making the content hard to scan on a phone.

## Recommended fix
- Remove fixed min-height constraints on mobile and allow the content to pad naturally.
- Increase padding and stack spacing on mobile.

## Acceptance criteria
- [ ] Tap targets are usable and responsive
- [ ] Text is readable without zooming
```

#### 6. Replace horizontal scrolling in GearShelf mobile view

**Category:** `mobile-ux-review`
**Severity:** `medium` | **Priority:** `P2`

```md
## Problem
Horizontal scrolling is used for compact tiles in `GearShelf`.

## Route / viewport
- Route: `/`
- Viewport: mobile, 375px/390px

## Evidence
`GearShelf.tsx` defines a mobile container with `overflow-x-auto` and fixed `w-28` widths.

## User impact
Creates small tap targets and horizontal scrolling that breaks the vertical flow on small viewports.

## Recommended fix
- Replace multi-column card layout with a single-column stack, or increase the tap target width substantially.

## Acceptance criteria
- [ ] No horizontal scrolling at tested mobile widths
- [ ] Tap targets are usable (min 44px)
```

#### 7. Reduce excessive stack gap spacing in About page mobile view

**Category:** `mobile-ux-review`
**Severity:** `low` | **Priority:** `P3`

```md
## Problem
Heavy vertical stacking and deep nesting consume too much vertical space on mobile.

## Route / viewport
- Route: `/about`
- Viewport: mobile, 375px/390px

## Evidence
`ArielProfile.tsx` uses deeply nested `<Stack gap={12}>` constraints which don't scale down properly for small viewports.

## User impact
Buries important page context (like the Connect and Navigation CTAs) after excessive scrolling.

## Recommended fix
- Reduce mobile hero height and spacing limits to shrink the footprint. Move social CTAs higher if possible.

## Acceptance criteria
- [ ] No excessive vertical scrolling
- [ ] Important page context appears without excessive scrolling
```

#### 8. Move generic WCS Competition Scraper post back to draft

**Category:** `ai-slop-content-review`
**Severity:** `high` | **Priority:** `P1`

```md
## Problem
The post contains vague "Coming soon" placeholder text that overpromises capabilities that do not exist.

## Location
- File: `content/posts/2026-04-18-competition-metrics.md`
- Route: `/blog/2026-04-18-competition-metrics`

## Evidence
"I am excited to announce the development of the WCS Competition Data Scraper... The goal of this project isn't to rank dancers..."

## Why this is a problem
Creates a trust and UX issue by claiming functionality and a tool that hasn't actually been provided. It reads like AI filler outlining a potential feature.

## Recommended action
Move to draft mode until rewritten.

## Rewrite guidance
- Put this post in draft mode until the missing tool exists.

## Acceptance criteria
- [ ] Content no longer overpromises
- [ ] Draft-quality content is moved to draft mode
```

#### 9. Move empty Financial Strategy Guide post back to draft

**Category:** `ai-slop-content-review`
**Severity:** `high` | **Priority:** `P1`

```md
## Problem
The post is an empty outline for a "Comprehensive Guide" filled with generic filler.

## Location
- File: `content/posts/2026-04-18-financial-literacy-dancers.md`
- Route: `/blog/2026-04-18-financial-literacy-dancers`

## Evidence
"I am currently drafting a Comprehensive Financial Strategy Guide... This guide will move beyond basic saving tips..."

## Why this is a problem
A classic "Ultimate Guide" style post without substance. It's an empty shell outlining what a post *will* be.

## Recommended action
Move to draft mode until rewritten.

## Rewrite guidance
- Put this post in draft mode until the missing content exists.

## Acceptance criteria
- [ ] Draft-quality content is moved to draft mode
```
#### 10. UX Auditor tool is completely broken and requires complete overhaul

**Category:** `desktop-ux-review`
**Severity:** `critical` | **Priority:** `P0`

```md
## Problem
The UX Auditor tool on the `/research` page is fundamentally broken across multiple interaction layers:
1. **URL Input Field:** The URL input field does not select-all on focus, making it extremely tedious to replace the default URL. Additionally, users report it behaves as if it's protected/locked.
2. **Fake Viewport Rendering:** Pressing different buttons for Mobile/Tablet/Desktop does not actually collect or render those viewport sizes. It merely scales the same generic image differently using an external snapshot service placeholder, rather than embedding an actual iframe or properly fetching responsive snapshots.
3. **Broken Gemini API:** Entering a valid Gemini API key does nothing. The tool is seemingly disconnected from the actual LLM backend, using mocked outputs in the `useUXAuditor` hook instead of processing real visual regression audits.

## File(s)
- `src/pages/UXAuditor.tsx`
- `src/features/ux-auditor/useUXAuditor.ts`

## User impact
Users cannot test actual URLs, cannot visualize responsive breakdowns, and cannot generate valid AI reviews, rendering the flagship tool useless.

## Recommended fix
1. Update the URL `<input>` element to include an `onFocus={(e) => e.target.select()}` handler and ensure it isn't inappropriately typed or styled like a password field.
2. Replace the fake image rendering (which relies on external snapshots or placehold.co) with a legitimate `<iframe>` that scales to the exact width/height of the selected viewport.
3. Connect the `runAnalysis` function in the `useUXAuditor` hook to an actual Gemini Vision API endpoint, replacing the mocked setTimeout responses with real prompt evaluations.
4. Add robust error handling if the Gemini API key is invalid or fails to return a response.

## Acceptance criteria
- [ ] URL field selects all text on focus
- [ ] Viewports correctly embed or render the target URL at the specified dimensions
- [ ] The tool successfully sends the payload to the Gemini API and returns a real review
- [ ] Validated on Desktop and Mobile devices
```

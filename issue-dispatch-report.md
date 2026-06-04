# Issue Dispatch Report

## 1. Summary of review coverage

- Fully audited standard UI routes on Desktop and Mobile viewports via UI/UX components.
- Analyzed layout primitives in `src/features/home/` to enforce `AGENTS.md` rules.
- Reviewed markdown files in `content/posts/` for AI slop and placeholder content.
- 5 new issues generated across 4 categories.

## 2. List of new issues created

1. `Replace raw div with Box primitive in FeaturedEventGuide` (Agent Policy Violation, Priority P1)
2. `Normalize mobile grid card heights in TopicGrid` (Mobile UX Review, Priority P2)
3. `Adjust desktop hero decorative image overlay sizing` (Desktop UX Review, Priority P2)
4. `Move generic WCS Competition Scraper post back to draft` (AI Slop Content Review, Priority P1)
5. `Move empty Financial Strategy Guide post back to draft` (AI Slop Content Review, Priority P1)

## 3. Existing issues updated instead of duplicated
None (no existing open issues available or matching).

## 4. Candidates skipped and why
`content/posts/2026-04-18-make-shoe-dance.md`: Although informal and brief, it offers a specific DIY method and is not harmful AI slop. It was retained.

## 5. Most common `AGENTS.md` violations found
Using raw HTML layout elements like `<div className="...">` instead of using the primitive UI components from `src/layouts/` (e.g. `Box`).

## 6. Most common desktop UX problems found
Background decorative imagery causing visual density and potential clipping above the fold without strict dimension rules.

## 7. Most common mobile UX problems found
Cards scaling to tight minimum tap heights causing vertical cramping, combined with line clamping making content less scannable on small viewports.

## 8. Content quality / AI slop risks found
Placeholder "Coming Soon" posts outlining non-existent features or "Ultimate Guides" padded with vague transitional phrases.

## 9. Recommended fix order
1. Revert placeholder slop posts to drafts (P1)
2. Replace raw divs with UI primitives (P1)
3. Fix desktop and mobile UX constraints (P2)

## 10. Recommended labels or milestones
- `agent-policy-violation`
- `desktop-ux-review`
- `mobile-ux-review`
- `ai-slop-content-review`

## 11. Any follow-up audits needed
- Full Lighthouse performance audit once the site expands further.
- Comprehensive review of the Merch and Event route sub-pages for specific UI anomalies.

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

#### 3. Normalize mobile grid card heights in TopicGrid

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

#### 4. Move generic WCS Competition Scraper post back to draft

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

#### 5. Move empty Financial Strategy Guide post back to draft

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
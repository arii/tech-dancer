# Issue Dispatch Status

## Summary

- Open issues checked: 0
- Existing duplicates found: 0
- New agent policy issues created: 1
- New desktop UX issues created: 3
- New mobile UX issues created: 3
- New AI slop content issues created: 2
- Candidates skipped: 0
- Candidates grouped: 0

## Agent Policy Violations

### Candidate: `src/features/home/FeaturedEventGuide.tsx`

- [x] Checked against `AGENTS.md`
- [x] Checked for existing issues
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** Agent Policy Violation
**Reason:** Component uses a raw `div` instead of the primitive `Box` component for layout, violating AGENTS.md rules against native HTML elements for layout.

## Desktop UX Review

### Route: `/`

- [x] Desktop screenshot reviewed
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** Desktop UX Issue
**Reason:** Decorative background images in `FeaturedGuidePanel` and `HeroSection` can cause visual clutter or overflow without proper sizing, and raw layouts lead to inconsistent visual stability.

### Route: `/research`

- [x] Desktop screenshot reviewed
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** Desktop UX Issue
**Reason:** The Research tools and skills grid list can become visually fatiguing and difficult to scan without better heading hierarchies and grid space adjustments on 1440px widths.

### Route: `/merch`

- [x] Desktop screenshot reviewed
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** Desktop UX Issue
**Reason:** The "Have a Design Idea" layout component and ReferralBanner component sit awkwardly alongside the grid on wide desktop screens, leading to poor page rhythm and awkward empty space.

## Mobile UX Review

### Route: `/`

- [x] Mobile screenshot reviewed
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** Mobile UX Issue
**Reason:** `TopicGrid` tap targets scale down on mobile, leading to potentially cramped vertical tap targets (`min-h-[145px]`).

### Route: `/gear` (Home feature `GearShelf`)

- [x] Mobile screenshot reviewed
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** Mobile UX Issue
**Reason:** Horizontal scrolling mechanism for compact tiles in `GearShelf.tsx` (`w-28`) creates small tap targets and horizontal scrolling that breaks the vertical rhythm flow on small mobile viewports (375px).

### Route: `/about`

- [x] Mobile screenshot reviewed
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** Mobile UX Issue
**Reason:** Heavy vertical stacking and deep nesting (`Stack gap={12}`) in `ArielProfile.tsx` consume too much vertical space, burying important page context such as the "Connect" section after excessive scrolling.

## AI Slop Content Review

### File: `content/posts/2026-04-18-competition-metrics.md`

- [x] Content reviewed
- [x] Claims checked against repo reality
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** AI Slop Content Issue
**Reason:** Post is a placeholder announcing a "WCS Competition Data Scraper" tool which doesn't exist functionally in the site and uses generic AI "Coming Soon" filler.

### File: `content/posts/2026-04-18-financial-literacy-dancers.md`

- [x] Content reviewed
- [x] Claims checked against repo reality
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** AI Slop Content Issue
**Reason:** Post is an empty placeholder for a "Comprehensive Financial Strategy Guide" full of generic filler, "What's Coming", and lacks actionable content.
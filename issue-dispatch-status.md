# Issue Dispatch Status

## Summary

- Open issues checked: 0
- Existing duplicates found: 0
- New agent policy issues created: 1
- New desktop UX issues created: 1
- New mobile UX issues created: 1
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

# Issue Dispatch Status

## Summary

- Open issues checked: Yes
- Existing duplicates found: 1
- New agent policy issues created: 1
- New desktop UX issues created: 1
- New mobile UX issues created: 1
- New AI slop content issues created: 1
- Candidates skipped: 0
- Candidates grouped: 0

## Agent Policy Violations

### Candidate: `src/pages/Home.tsx` and `src/features/home/FeaturedGuidePanel.tsx`

- [x] Checked against `AGENTS.md`
- [x] Checked for existing issues
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #1901
**Reason:** Files bypass layout primitive rules and use hardcoded Tailwind classes, violating strict policy against raw classes in App/Feature layers.

## Desktop UX Review

### Route: `/`

- [x] Desktop layout reviewed
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #1902
**Reason:** The gradient on the FeaturedGuidePanel fades to transparent exactly where the text is placed, causing contrast issues.

## Mobile UX Review

### Route: `/merch`

- [x] Mobile layout reviewed
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #1903
**Reason:** Role and tag badges in ProductCard wrap heavily on mobile, creating dense multi-line blocks that push CTAs down.

## AI Slop Content Review

### File: `content/posts/2026-04-18-make-shoe-dance.md`

- [x] Content reviewed
- [x] Claims checked against repo reality
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #1905
**Reason:** Post promises a DIY hack but provides no instructions, photos, or links, reading like shallow placeholder text.

### File: `content/posts/2026-04-18-competition-metrics.md`

- [x] Content reviewed
- [x] Claims checked against repo reality
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Closed as Duplicate
**Issue:** #1837
**Reason:** Duplicate of #1837. Post announces a "WCS Competition Data Scraper" but only contains generic AI-style filler.

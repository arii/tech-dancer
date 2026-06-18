
# Issue Dispatch Status

## Summary

- Open issues checked: 4
- Existing duplicates found: 0
- New agent policy issues created: 3
- New desktop UX issues created: 1
- New mobile UX issues created: 1
- New AI slop content issues created: 1
- Candidates skipped: 2
- Candidates grouped: 1

## Agent Policy Violations

### Candidate: `src/features/research/ResearchAnalytics.tsx`

- [x] Checked against `AGENTS.md`
- [x] Checked for existing issues
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #2529
**Reason:** Raw layout classes and non-token padding classes detected

### Candidate: `src/features/lab/BlogDrafter.tsx`

- [x] Checked against `AGENTS.md`
- [x] Checked for existing issues
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #2530
**Reason:** Unapproved raw styling directly in className for input and textarea

### Candidate: `src/pages/UXAuditor.tsx`

- [x] Checked against `AGENTS.md`
- [x] Checked for existing issues
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #2531
**Reason:** Contains flex classes instead of utilizing existing layout primitives

## Desktop UX Review

### Route: `/blog/2026-06-14-the-story-behind-the-merch-page`

- [x] Desktop screenshot reviewed
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #2532
**Reason:** The article images are displayed at original size making them incredibly large to scroll past on desktop viewports. They should be constrained.

## Mobile UX Review

### Route: `/blog/2026-06-14-the-story-behind-the-merch-page`

- [x] Mobile screenshot reviewed
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #2533
**Reason:** The article images are displayed at original size making them take up more than the viewport space on mobile, causing jarring scrolling.

## AI Slop Content Review

### File: `content/blog/2026-06-14-the-story-behind-the-merch-page.md`

- [x] Content reviewed
- [x] Claims checked against repo reality
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #2534
**Reason:** Post is poorly written with a conversational informal voice and missing screenshots.

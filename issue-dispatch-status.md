# Issue Dispatch Status

## Summary

- Open issues checked: 30
- Existing duplicates found: 0 (Related issues: #2226, #2230, #2231)
- New agent policy issues created: 3
- New desktop UX issues created: 1
- New mobile UX issues created: 0 (Combined with desktop UX issue)
- New AI slop content issues created: 0
- Candidates skipped: 0
- Candidates grouped: 0

## Agent Policy Violations

### Candidate: `src/features/events/EventsFeed.tsx`
- [x] Checked against `AGENTS.md`
- [x] Checked for existing issues
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #2237
**Reason:** Uses deprecated FolioGrid component instead of standardized ContentFeedSection.

### Candidate: `src/pages/Home.tsx` and `src/features/home/GearShelf.tsx`
- [x] Checked against `AGENTS.md`
- [x] Checked for existing issues
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #2238
**Reason:** Contains references to decommissioned Gear content and uses the deprecated GearShelf component.

### Candidate: `src/pages/Home.tsx` and `src/features/home/FeaturedEventGuide.tsx`
- [x] Checked against `AGENTS.md`
- [x] Checked for existing issues
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #2239
**Reason:** Contains references to decommissioned Event guides and uses the deprecated FeaturedEventGuide component.

## Desktop UX Review

### Route: `/`
- [x] Desktop screenshot reviewed
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created (combined with mobile UX review)
**Issue:** #2240
**Reason:** Hero tagline contains outdated terminology ('event guides', 'gear reviews') which confuses users due to missing site sections.

## Mobile UX Review

### Route: `/`
- [x] Mobile screenshot reviewed
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created (combined with desktop UX review)
**Issue:** #2240
**Reason:** Same outdated tagline issue impacts mobile users.

## AI Slop Content Review
*(No specific AI slop identified during this review pass)*

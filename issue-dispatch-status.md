# Issue Dispatch Status

## Summary

- Open issues checked: 27
- Existing duplicates found: 0
- New agent policy issues created: 6
- New desktop UX issues created: 0 (Skipped due to duplicates)
- New mobile UX issues created: 0 (Skipped due to duplicates)
- New AI slop content issues created: 2
- Candidates skipped: 1 (Plus multiple UX issues tracked by existing issues)
- Candidates grouped: 0

## AI Slop Content Review

### File: `content/posts/2026-04-18-competition-metrics.md`

- [x] Content reviewed
- [x] Claims checked against repo reality
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #2005
**Reason:** Post is a placeholder "coming soon" announcement lacking substantive value.
### File: `content/posts/2026-04-18-financial-literacy-dancers.md`

- [x] Content reviewed
- [x] Claims checked against repo reality
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #2006
**Reason:** Post is an empty "ultimate guide" placeholder.

## Agent Policy Violations

### Candidate: `src/pages/Home.tsx`

- [x] Checked against `AGENTS.md`
- [x] Checked for existing issues
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #2007
**Reason:** Contains raw Tailwind utility classes violating the design system primitives rule.
### Candidate: `src/components/Equalizer.tsx`

- [x] Checked against `AGENTS.md`
- [x] Checked for existing issues
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #2008
**Reason:** Uses raw `div`s and arbitrary tailwind values (`pb-[18px]`, `opacity-[.22]`).
### Candidate: `src/components/editorial/EditorialHero.tsx`

- [x] Checked against `AGENTS.md`
- [x] Checked for existing issues
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #2009
**Reason:** Passes raw Tailwind classes to a child component instead of using primitive properties.
### Candidate: `src/components/editorial/EditorialHeader.tsx`

- [x] Checked against `AGENTS.md`
- [x] Checked for existing issues
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #2010
**Reason:** Component uses arbitrary Tailwind opacity and raw typography classes in the `className` prop.
### Candidate: `src/components/editorial/AuthorAvatar.tsx`

- [x] Checked against `AGENTS.md`
- [x] Checked for existing issues
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #2011
**Reason:** Component uses raw Tailwind border, shadow, and opacity classes.
### Candidate: `src/components/products/ProductCard.tsx`

- [x] Checked against `AGENTS.md`
- [x] Checked for existing issues
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #2012
**Reason:** Component uses raw Tailwind interaction, border, and color classes instead of variants or `Button` primitive.
## Desktop UX Review

### Route: `/`

- [x] Desktop screenshot reviewed (via manual review of existing issues)
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Existing issue updated/skipped
**Issue:** #1965, #1973, #1979
**Reason:** Horizontal overflow and oversized images are already tracked in existing issues. Grouped with existing tracking.

## Mobile UX Review

### Route: `/`

- [x] Mobile screenshot reviewed (via manual review of existing issues)
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Existing issue updated/skipped
**Issue:** #1966, #1970, #1974
**Reason:** Mobile horizontal overflow, small tap targets, and oversized images are already tracked in existing issues. Grouped with existing tracking.

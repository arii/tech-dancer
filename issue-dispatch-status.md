# Issue Dispatch Status

## Summary

- Open issues checked: Yes
- Existing duplicates found: 0
- New agent policy issues created: 1
- New desktop UX issues created: 1
- New mobile UX issues created: 1
- New AI slop content issues created: 1
- Candidates skipped: 0
- Candidates grouped: 2 (AI slop issues grouped into one)

## Agent Policy Violations

### Candidate: `src/components/ui/GearCard.tsx`

- [x] Checked against `AGENTS.md`
- [x] Checked for existing issues
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** Pending creation / issue-agent-policy.md
**Reason:** Contains raw styling strings `className="bg-black/15 pointer-events-none"` violating AGENTS.md rule 1 and 2.

## Desktop UX Review

### Route: `/gear`, `/events`, `/blog` (FolioGrid empty state)

- [x] Desktop screenshot/layout code reviewed
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** Pending creation / issue-desktop-ux.md
**Reason:** Uses `<Search className="w-12 h-12" />` instead of standard `Icon` primitive sizing.

## Mobile UX Review

### Route: `/events/:slug` (EventSidebar)

- [x] Mobile screenshot/layout code reviewed
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** Pending creation / issue-mobile-ux.md
**Reason:** Uses `className="sticky top-24"` and potentially small tap targets on the Event Insights toggle button.

## AI Slop Content Review

### File: `content/posts/2026-04-18-competition-metrics.md`, `content/posts/2026-04-18-financial-literacy-dancers.md`

- [x] Content reviewed
- [x] Claims checked against repo reality
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created (Grouped)
**Issue:** Pending creation / issue-ai-slop.md
**Reason:** Vaporware/placeholder announcements for non-existent tools and guides.
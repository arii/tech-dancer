# Issue Dispatch Status

## Summary

- Open issues checked: 0
- Existing duplicates found: 0
- New agent policy issues created: 3
- New desktop UX issues created: 1
- New mobile UX issues created: 1
- New AI slop content issues created: 1
- Candidates skipped: 1
- Candidates grouped: 1

## Agent Policy Violations

### Candidate: `src/components/Equalizer.tsx`
- [x] Checked against `AGENTS.md`
- [x] Checked for existing issues
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** `issue-01-agent-policy.md`
**Reason:** Contains raw HTML div and arbitrary style values instead of Box primitive

### Candidate: `src/pages/Home.tsx`
- [x] Checked against `AGENTS.md`
- [x] Checked for existing issues
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** `issue-02-agent-policy.md`
**Reason:** Arbitrary max-width value instead of using layout tokens

### Candidate: `src/components/Navigation.tsx` and others
- [x] Checked against `AGENTS.md`
- [x] Checked for existing issues
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** `issue-03-agent-policy.md`
**Reason:** Component using raw background color classes and arbitrary alpha channels instead of primitive props.

## Desktop UX Review

### Route: `/`
- [x] Desktop screenshot reviewed
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** `issue-04-desktop-ux.md`
**Reason:** Hero consumes too much vertical space on desktop.

## Mobile UX Review

### Route: `/blog`, `/gear`
- [x] Mobile screenshot reviewed
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** `issue-05-mobile-ux.md`
**Reason:** Dense metadata wrapping and cramped tap targets on mobile view.

## AI Slop Content Review

### File: `content/posts/2026-04-18-financial-literacy-dancers.md`
- [x] Content reviewed
- [x] Claims checked against repo reality
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** `issue-06-ai-slop.md`
**Reason:** Placeholder/coming soon post published as final.

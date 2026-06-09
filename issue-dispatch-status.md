# Issue Dispatch Status

## Summary

- Open issues checked: 0
- Existing duplicates found: 0
- New agent policy issues created: 1
- New desktop UX issues created: 1
- New mobile UX issues created: 2
- New AI slop content issues created: 2
- Candidates skipped: 0
- Candidates grouped: 2

## Agent Policy Violations

### Candidate: `src/pages/Home.tsx`

- [x] Checked against `AGENTS.md`
- [x] Checked for existing issues
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** `artifacts/ux-audit/issues/agent-policy-violation-home-tsx.md`
**Reason:** Hardcoded grid layout using raw Tailwind classes instead of the `Grid` primitive.

## Desktop UX Review

### Route: `/`
- [x] Desktop screenshot reviewed
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Grouped UX Issue created
**Issue:** `artifacts/ux-audit/issues/layout-horizontal-overflow-on-_-desktop-1280.md`, `artifacts/ux-audit/issues/performance-oversized-images-on-_-desktop-1280.md` into one issue for the route.

## Mobile UX Review

### Route: `/`
- [x] Mobile screenshot reviewed
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Grouped Mobile UX Issue created for layout and tap targets.

## AI Slop Content Review

### File: `content/posts/2026-04-18-competition-metrics.md`
- [x] Content reviewed
- [x] Claims checked against repo reality
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** `artifacts/ux-audit/issues/ai-slop-content-competition-metrics.md`

### File: `content/posts/2026-04-18-financial-literacy-dancers.md`
- [x] Content reviewed
- [x] Claims checked against repo reality
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** `artifacts/ux-audit/issues/ai-slop-content-financial-literacy.md`

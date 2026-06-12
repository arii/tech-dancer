# Issue Dispatch Status

## Summary

- Open issues checked: 0
- Existing duplicates found: 0
- New agent policy issues created: 1
- New desktop UX issues created: 0
- New mobile UX issues created: 2
- New AI slop content issues created: 1
- Candidates skipped: 0
- Candidates grouped: 0

## Agent Policy Violations

### Candidate: `src/pages/UXAuditor.tsx`

- [x] Checked against `AGENTS.md`
- [x] Checked for existing issues
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #1
**Reason:** Contains raw tailwind classes like `bg-surface` and `border-line` inside `className` attributes, violating `AGENTS.md` rules which mandate using primitives (`Box`, `Stack`, etc) and tokens.

## Desktop UX Review

## Mobile UX Review

### Route: `/`

- [x] Mobile screenshot reviewed (Playwright JSON data analyzed)
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #2
**Reason:** Horizontal overflow at 375px viewport. Elements `.gap-3.pr-4.w-fit.flex` and `.group.w-28.min-w-0` exceed viewport width.

### Route: `/`

- [x] Mobile screenshot reviewed (Playwright JSON data analyzed)
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #3
**Reason:** Tap targets are too small. Elements like `boomtick.blog` (32px) and `Skip to Content` (24px) are under the 44px minimum recommendation.

## AI Slop Content Review

### File: `content/posts/2026-04-19-gear-essentials.md`

- [x] Content reviewed
- [x] Claims checked against repo reality
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #4
**Reason:** Content is highly generic "ultimate guide" style filler text with generic suggestions like "10 to 15 shirts", "deodorant", etc, that lack substance or repo-backed references.

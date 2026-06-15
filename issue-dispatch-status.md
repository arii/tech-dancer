# Issue Dispatch Status

## Summary

- Open issues checked: None locally found (assuming no current open issues overlap based on prior check limits)
- Existing duplicates found: 0
- New agent policy issues created: 1
- New desktop UX issues created: 1
- New mobile UX issues created: 1
- New AI slop content issues created: 1
- Candidates skipped: 0
- Candidates grouped: 0

## Agent Policy Violations

### Candidate: `src/components/Equalizer.tsx`

- [x] Checked against `AGENTS.md`
- [x] Checked for existing issues
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #___
**Reason:** The file `src/components/Equalizer.tsx` uses raw tailwind classes in the UI (`flex`, `px-4`, `pb-[18px]`, `w-full`) instead of relying on the layout primitives (`Box`, `Stack`) and design tokens, directly violating `AGENTS.md`.

---
## Desktop UX Review

### Route: `/merch`

- [x] Desktop screenshot reviewed
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #___
**Reason:** Lighthouse audit revealed poor performance (0.76-0.79) due to First Contentful Paint and Largest Contentful Paint delays, along with Total Blocking Time issues, potentially affecting desktop usability with sluggish interactions. Additionally, `<title>` and meta description tags are missing, harming SEO and discovery.

## Mobile UX Review

### Route: `/merch`

- [x] Mobile screenshot reviewed
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #___
**Reason:** Mobile lighthouse checks show Speed Index and Total Blocking Time issues, signifying unoptimized resources on mobile viewports. Cumulative layout shift is flagged (0.79-0.96) indicating unstable element rendering on load, making tap targets frustrating on small screens.

---
## AI Slop Content Review

### File: `content/posts/2026-06-01-power-charging.md`

- [x] Content reviewed
- [x] Claims checked against repo reality
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** #___
**Reason:** The content in `content/posts/2026-06-01-power-charging.md` (and similarly `2026-06-01-practice-review-tech.md`) is generic filler language that reads like AI slop. It states generic facts ("Long days at conventions mean your devices will likely run out of juice") but lacks substantive examples, authentic experience, or repo-specific buying guidance beyond generic affiliate links. Needs to be rewritten or moved to draft.

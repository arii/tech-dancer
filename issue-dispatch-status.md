# Issue Dispatch Status

## Summary

- Open issues checked: 32
- Existing duplicates found: 8 (see deduplication notes)
- New agent policy issues drafted: 2
- New desktop UX issues drafted: 1 (broken content link)
- New mobile UX issues drafted: 0 (covered by #1836)
- New AI slop content issues drafted: 1
- Candidates skipped: 5 (all duplicates or draft-already)
- Candidates grouped: 0

> **Note:** GitHub REST API is blocked by DNS proxy in this agent environment. Issues are documented in `issue-dispatch-report.md` in ready-to-file format.

## Existing Issues (Already Tracked — Do Not Duplicate)

| # | Title | Category |
|---|-------|----------|
| #2534 | Rewrite "The Story Behind the Merch" blog post | ai-slop-content-review |
| #2533 | Oversized images in blog posts dominate mobile viewport | mobile-ux-review |
| #2532 | Oversized images in blog posts break desktop reading rhythm | desktop-ux-review |
| #2531 | Replace raw flex/items-center in UXAuditor.tsx | agent-policy-violation |
| #2530 | Replace raw form styling in BlogDrafter.tsx | agent-policy-violation |
| #2529 | Remove raw padding and flex classes in ResearchAnalytics.tsx | agent-policy-violation |
| #2461 | Move power-charging.md to draft due to generic AI filler | content |
| #1836 | Normalize mobile card heights, reduce metadata wrapping, tap targets | mobile-ux-review |

---

## Agent Policy Violations

### Candidate: `src/features/home/DevLabCallout.tsx` + `src/features/research/ResearchAnalytics.tsx`

- [x] Checked against `AGENTS.md` — violates rules 12 (Composition Over Configuration) and 18 (No System Bypass via className)
- [x] Checked for existing issues — #2529 covers raw padding/flex in ResearchAnalytics but not the duplicated tag pattern
- [x] Evidence collected — 7 occurrences of `bg-brand-{color}/10 text-brand-{color} border-brand-{color}/20` across 2 files
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Drafted (see `issue-dispatch-report.md` → Issue A)
**Issue:** #TBD — ready to file
**Reason:** Duplicate colored tag markup pattern across two unrelated feature files with no shared component.

---

### Candidate: `src/pages/UXAuditor.tsx`

- [x] Checked against `AGENTS.md` — violates rule 16 (Avoid "God Components") and rule 8 (Feature Isolation Required)
- [x] Checked for existing issues — #2531 covers raw Tailwind classes (different issue)
- [x] Evidence collected — 562-line page file contains 3 internally defined components
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Drafted (see `issue-dispatch-report.md` → Issue B)
**Issue:** #TBD — ready to file
**Reason:** Sub-components (CopyPromptButton, ViewportFrame, ViewportAnalysisCard) are defined at page level instead of extracted to `src/features/ux-auditor/components/`.

---

### Candidate: `src/pages/Home.tsx`

- [x] Checked against `AGENTS.md` — violates rules 1 (No Raw Tailwind), 18 (No System Bypass via className)
- [x] Checked for existing issues — no existing issue
- [x] Evidence collected — arbitrary `grid-cols-[minmax(0,1fr)_420px]` and `grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]` bypassed with `impeccable-ignore-file`
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Skipped — closed issue #1901 covered this; file still has violations, recommend re-opening #1901
**Issue:** #1901 (closed — needs re-open)
**Reason:** File uses `impeccable-ignore-file` to suppress audit warnings for arbitrary grid column values. Already reported and closed, but violations remain in current code.

---

## Desktop UX Review

### Route: `/` (Home)

- [x] Desktop layout reviewed via code inspection
- [x] Existing issues checked — #2532 covers images
- [x] Evidence collected — no new unique desktop-specific issues found beyond #2532
- [ ] Issue created or skipped

**Outcome:** Skipped — no new actionable desktop UX issues found for Home beyond existing #2532.

---

### Route: `/blog`

- [x] Desktop layout reviewed via code inspection
- [x] Existing issues checked
- [ ] Issue created or skipped

**Outcome:** Skipped — BlogFeed uses FolioGrid and FilterBar, no standalone issues.

---

### Route: `/research`

- [x] Desktop layout reviewed via code inspection
- [x] Existing issues checked — #2529, #2531 cover raw Tailwind
- [ ] Issue created or skipped

**Outcome:** Skipped — desktop UX layout of ResearchAnalytics is handled by existing issues.

---

### Route: `/merch`

- [x] Desktop layout reviewed via code inspection
- [x] Existing issues checked
- [x] Evidence collected — affiliate disclosure is present via ReferralBanner, layout uses Grid primitive
- [ ] Issue created or skipped

**Outcome:** Skipped — no standalone desktop UX issues found.

---

## Mobile UX Review

### Route: `/blog/:slug`

- [x] Mobile review via code inspection
- [x] Existing issues checked — #2533 covers images; #1836 covers card heights/tap targets
- [ ] Issue created or skipped

**Outcome:** Skipped — covered by existing issues.

---

### Route: `/blog/:slug` — broken `/gear/` link in content

- [x] Checked route config — `/gear` routes to `RemovedPage`
- [x] Checked content — `make-shoe-dance.md` links to `/gear/2026-04-12-suede-shoe-diy`
- [x] Existing issues checked — no existing issue for this broken link
- [x] Issue created

**Outcome:** Drafted (see `issue-dispatch-report.md` → Issue C)
**Issue:** #TBD — ready to file
**Reason:** Inline content link to removed route gives users a dead end on mobile and desktop.

---

## AI Slop Content Review

### File: `content/studies/wcs-scraper-initial-sync.md`

- [x] Content reviewed
- [x] Claims checked against repo reality — scraping URL, tech stack, and output path in article differ from actual `etl/scraper.py`
- [x] Existing issues checked — no existing issue for this study
- [x] Evidence collected — article uses `worldwestcoastswingcouncil.com`, actual scraper uses `scoring.dance`; article implies `public/data/event_queue.json` exists (it doesn't); React fetch code not in actual frontend
- [x] Issue created

**Outcome:** Drafted (see `issue-dispatch-report.md` → Issue D)
**Issue:** #TBD — ready to file
**Reason:** Published study presents fictional code examples that contradict the actual implementation.

---

### File: `content/posts/2026-04-18-financial-literacy-dancers.md`

- [x] Content reviewed
- [x] Claims checked — draft=true, pure "coming soon" placeholder, no actual content
- [x] Existing issues checked — no existing issue
- [ ] Issue created or skipped

**Outcome:** Skipped — post is already marked `draft: true`, so it is not publicly visible. No action needed.

---

### File: `content/posts/2026-04-18-competition-metrics.md`

- [x] Content reviewed — draft=true, "coming soon" placeholder
- [x] Existing issues checked — no existing issue

**Outcome:** Skipped — already `draft: true`, not publicly visible.

---

### File: `content/posts/2026-05-06-boomtick-and-b-the-rhythmic-architecture-of-west-coast-swing.md`

- [x] Content reviewed — draft=true, has substantive content about UUS notation and site design language
- [x] Existing issues checked — no existing issue

**Outcome:** Skipped — already `draft: true`. Content appears thoughtful and specific when finished.

---

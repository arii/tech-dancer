# Issue Dispatch Report

## 1. Summary of review coverage

- **Agent Policy**: Scanned TSX files in `src/pages/` and `src/features/` via `grep` for raw CSS classes (e.g., `className="... bg-..."`).
- **Desktop/Mobile UX**: Executed `scripts/ux-audit-runner.ts` using Playwright on multiple viewport sizes (1280x800, 1440x900, 375x812, 390x844, 430x932) on routes `/` and `/gear`. Analyzed resultant JSON reports for overflow and tap target sizing.
- **AI Slop Content**: Reviewed markdown content in `content/posts/` to identify generic claims and lack of specifics.

## 2. List of new issues created

---

### Issue 1: Replace raw tailwind classes in UXAuditor with design primitives

**Labels:** `agent-policy-violation`, `cleanup`
**Severity:** `high`
**Priority:** `P1`

## Problem
The `UXAuditor` page component uses raw Tailwind CSS utility classes like `bg-surface`, `bg-bg`, `border-line`, and `rounded-xl` for layout styling.

## File(s)
- `src/pages/UXAuditor.tsx`

## Evidence
```tsx
// Line 122
className="bg-surface rounded-xl shadow-2xl border border-line"

// Line 223
className="bg-bg border-none focus:ring-2 focus:ring-accent outline-none font-mono text-text-main text-sm"

// Line 473
<Box width={2} height={2} radius="full" className={imp.severity > 7 ? 'bg-error shadow-sm' : 'bg-accent-purple shadow-sm'} />
```

## Why this violates repo policy
The `AGENTS.md` rules explicitly prohibit arbitrary values (`text-[11px]`, `shadow-[...]`), direct spacing (`px-*`), and color classes (`bg-*`, `text-*`) outside tokens. All UI code should utilize standard primitives (`Box`, `Stack`, `Grid`) with primitive props to ensure token compliance.

## Impact
- harder maintenance
- inconsistent UI
- broken visual consistency
- bypasses design system tokens
- prevents accurate auditing by `scripts/detect-antipatterns.mjs`

## Recommended fix
- Replace all raw `className` usage with primitive prop equivalents on `Box` or `Stack` components (e.g., replace `className="bg-surface"` with `surface="surface"` on `<Box>`).
- Use the `radius` prop instead of `rounded-*`.

## Acceptance criteria
- [ ] File no longer violates the referenced policy
- [ ] Existing design tokens / primitives are used
- [ ] UI remains visually equivalent or improves
- [ ] Lint/typecheck/build pass

---

### Issue 2: Fix horizontal overflow on mobile viewports on the homepage

**Labels:** `mobile-ux-review`, `bug`
**Severity:** `critical`
**Priority:** `P0`

## Problem
The homepage layout overflows horizontally on a standard 375px wide mobile device, creating an unwanted horizontal scroll bar and breaking the page layout.

## Route / viewport
- Route: `/`
- Viewport: mobile, 375px wide

## Evidence
The Playwright `ux-audit-runner.ts` artifact (`artifacts/ux-audit/results/home-mobile-375.json`) lists specific overflow elements extending past the 375px width boundary:
- A `DIV` with `className="gap-3 pr-4 w-fit flex"` has a right bound of `392px`.
- An `A` tag with `className="group w-28 min-w-0"` has a right bound of `392px`.

## User impact
Users on mobile devices experience frustrating horizontal scrolling, text may get cut off, and the application feels broken or unoptimized for small screens.

## Recommended fix
- Ensure the containers wrapping horizontal lists or grids use standard responsive primitives.
- Replace `w-fit` with 100% width, or ensure elements have proper `flex-wrap` or `overflow-x-auto` to allow horizontal scrolling within a bounded container rather than overflowing the page body.

## Acceptance criteria
- [ ] No horizontal scrolling at tested mobile widths
- [ ] Tap targets are usable
- [ ] Primary CTA appears early enough
- [ ] Text is readable without zooming
- [ ] No new desktop regressions

---

### Issue 3: Increase tap target size for primary navigation links on mobile

**Labels:** `mobile-ux-review`, `accessibility`
**Severity:** `high`
**Priority:** `P1`

## Problem
Several key interactive elements on the mobile homepage are significantly smaller than the recommended 44x44 pixel tap target size.

## Route / viewport
- Route: `/`
- Viewport: mobile, 375px wide

## Evidence
Playwright accessibility findings (`artifacts/ux-audit/results/home-mobile-375.json`) indicate small tap targets:
- "boomtick.blog" (Header Link): 104x32 pixels
- "Skip to Content" (Accessibility Link): 48x24 pixels
- "DEV" (Nav element): 19x43 pixels

## User impact
Users on mobile devices will find it difficult to accurately tap navigation links, leading to accidental taps and a frustrating navigation experience.

## Recommended fix
- Increase the padding around text links using spacing tokens to achieve a minimum 44px height and width target.
- For inline header elements like the logo ("boomtick.blog"), adjust vertical padding on the containing `<Box>` or `<a>` element.

## Acceptance criteria
- [ ] Tap targets are usable (at least 44x44 px)
- [ ] No horizontal scrolling at tested mobile widths
- [ ] Text is readable without zooming
- [ ] No new desktop regressions

---

### Issue 4: Rewrite Gear Essentials post to provide concrete, specific packing advice

**Labels:** `ai-slop-content-review`, `content`
**Severity:** `medium`
**Priority:** `P2`

## Problem
The `2026-04-19-gear-essentials.md` post titled "The WCS Travel Pack" reads as an overly generic, "ultimate guide" filled with basic recommendations (e.g., "10 to 15 shirts", "deodorant", "pain relievers") without concrete, repo-backed specifics or nuanced insights.

## Location
- File: `content/posts/2026-04-19-gear-essentials.md`

## Evidence
> "Deodorant / Antiperspirant: WCS is an intimate, close-proximity partner dance. Use a strong combination of both and reapply often. Breath mints or gum: Keep your breath fresh throughout long nights."

## Why this is a problem
The content uses generic filler language that overpromises as an "essential pack" but provides very basic common sense without specific gear recommendations or genuine value beyond a basic checklist. It reads as auto-generated and undermines editorial credibility.

## Recommended action
- Move to draft mode until rewritten
- Rewrite with specific examples
- Replace generic AI-style copy with concrete guidance

## Rewrite guidance
- Put this post in draft mode (`draft: true`).
- To rewrite it, instead of listing basic necessities like "deodorant", focus exclusively on specialized WCS gear. Highlight the exact models, materials, and reasons they are effective.

## Acceptance criteria
- [ ] Content no longer overpromises
- [ ] Public content gives concrete user value
- [ ] Draft-quality content is moved to draft mode

## 3. Existing issues updated instead of duplicated
- None.

## 4. Candidates skipped and why
- **Make Any Shoe a Dance Shoe Post**: Skipped because, while it seemed generic at first, the tutorial *does* mention applying suede sheets and gives a step-by-step breakdown. It is borderline, but the gear essentials list was clearly more egregious.

## 5. Most common AGENTS.md violations found
- Use of raw `className` with Tailwind colors and borders in feature/page level code, bypassing primitive system props.

## 6. Most common desktop UX problems found
- Mostly stable, some potential issues with fixed width scaling in iframes, though not verified enough to make an issue here.

## 7. Most common mobile UX problems found
- Horizontal overflow caused by fixed width elements or containers without flex-wrap. Small tap targets.

## 8. Content quality / AI slop risks found
- Posts using "ultimate guide" formatting but containing basic, generic advice rather than specialized knowledge or specific product reviews.

## 9. Recommended fix order
1. Issue #2: Fix horizontal overflow on mobile viewports on the homepage (P0)
2. Issue #1: Replace raw tailwind classes in UXAuditor with design primitives (P1)
3. Issue #3: Increase tap target size for primary navigation links on mobile (P1)
4. Issue #4: Rewrite Gear Essentials post to provide concrete, specific packing advice (P2)

## 10. Recommended labels or milestones
- Use the `cleanup` milestone for the tech debt/AGENTS.md issues.
- Use a `ux-polish` milestone for mobile regressions.

## 11. Any follow-up audits needed
- Re-run the `scripts/ux-audit-runner.ts` on all routes to check for any more horizontal overflows or tap target issues across the site.

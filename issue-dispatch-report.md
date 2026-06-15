# Issue Dispatch Report

## 1. Summary of Review Coverage
- **Agent Policy Review**: Inspected `src/components/` utilizing grep for structural deviations. Found violations in `Equalizer.tsx`.
- **Desktop UX Review**: Analyzed `pnpm run lighthouse` outputs for `/merch` and `/blog`.
- **Mobile UX Review**: Reviewed Lighthouse and cumulative layout shift logs for mobile views.
- **AI Slop Content**: Reviewed `content/posts/` and found several filler/stub markdown articles with low authenticity.

## 2. List of New Issues Created
1. `agent-policy-violation`: Replace raw tailwind layout classes in `src/components/Equalizer.tsx` with layout primitives.
2. `desktop-ux-review`: Fix missing title/meta description and address LCP delays on `/merch` desktop view.
3. `mobile-ux-review`: Fix CLS shifts and unoptimized resource blocking on `/merch` mobile view to improve Speed Index.
4. `ai-slop-content-review`: Move generic power charging affiliate post back to draft until substantive guidance is added (`content/posts/2026-06-01-power-charging.md`).

## 3. Existing Issues Updated Instead of Duplicated
- None found during this audit.

## 4. Candidates Skipped and Why
- Skipped minor padding variables in other components that are explicitly used for complex animations where `Box` would abstract too much, but only focused on `Equalizer.tsx` where layout structure can directly utilize `Box`.

## 5. Most Common `AGENTS.md` Violations Found
- Using raw layout classes like `flex`, `gap-*`, and spacing directly on native `div` instead of utilizing `Box` or `Stack` primitives.

## 6. Most Common Desktop UX Problems Found
- Sluggish LCP, FCP on the Merch and Gear pages, missing document metadata for SEO.

## 7. Most Common Mobile UX Problems Found
- High Cumulative Layout Shift making tap targets move upon load, and high Total Blocking Time causing unresponsiveness on mobile devices.

## 8. Content Quality / AI Slop Risks Found
- Repetitive, generic affiliate placeholder posts lacking real insights. They often use standard AI "As a [blank]..." intro hooks and lack concrete buying advice.

## 9. Recommended Fix Order
1. **Critical:** Missing Title/Metadata (SEO block)
2. **High:** `Equalizer.tsx` architecture fix (Policy Violation)
3. **Medium:** Merch layout shift and LCP fix (Mobile/Desktop UX)
4. **Medium:** Move generic blog posts to draft (Content Review)

## 10. Recommended Labels or Milestones
- `agent-policy-violation`, `P1`
- `desktop-ux-review`, `P2`
- `mobile-ux-review`, `P2`
- `ai-slop-content-review`, `P3`

## 11. Follow-up Audits Needed
- Run a full Playwright visual regression test to confirm CLS fixes and visual alignment across different viewports.

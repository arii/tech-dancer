# Issue Dispatch Report

## 1. Summary of review coverage

- Scanned TypeScript/TSX code for styling policy violations (Tailwind usage, inline styles).
- Audited Home and other major routes for desktop UI/UX regressions.
- Audited Home and other major routes for mobile UI/UX regressions.
- Scanned blog post content for placeholder language and empty "Coming Soon" drafts.

## 2. List of new issues created

1. `issue-01-agent-policy.md`: Replace raw div and arbitrary styling in Equalizer component with standard primitives
2. `issue-02-agent-policy.md`: Remove arbitrary max-width Tailwind class from Home layout
3. `issue-03-agent-policy.md`: Fix raw background and alpha channel utility classes in Navigation components
4. `issue-04-desktop-ux.md`: Fix oversized hero image on desktop pushing content below the fold
5. `issue-05-mobile-ux.md`: Reduce mobile metadata wrapping and improve tap targets on cards
6. `issue-06-ai-slop.md`: Move placeholder "Financial Strategy Guide" to draft mode until content is added

## 3. Existing issues updated instead of duplicated

None (clean environment).

## 4. Candidates skipped and why

Skipped inline style violations in `ThemeSpotlight.tsx` and `Box.tsx` because they have valid `// impeccable-ignore` comments denoting they are strictly required for motion/dynamic styling logic.

## 5. Most common `AGENTS.md` violations found

- Bypassing the Design System surface/background logic using arbitrary `bg-{color}/{alpha}` classes directly in `className`.
- Using raw layout arbitrary widths `max-w-[...]` instead of `Box` `maxWidth` props.

## 6. Most common desktop UX problems found

- Oversized hero sections causing the primary content to be entirely pushed "below the fold" on standard 1280px laptops.

## 7. Most common mobile UX problems found

- Wrapping of long text in dense metadata tags causing multi-line blockiness and horizontal cramping on narrow devices like the iPhone 12.

## 8. Content quality / AI slop risks found

- Use of blog posts as empty "Coming Soon" announcements full of generic promises rather than actual content.

## 9. Recommended fix order

1. `issue-06-ai-slop.md` (P0) - Trivial change (add draft: true) with immediate user value.
2. `issue-04-desktop-ux.md` (P1) - Core layout issue affecting the home page experience.
3. `issue-05-mobile-ux.md` (P1) - Mobile usability.
4. `issue-01-agent-policy.md` (P2) - Code maintainability.
5. `issue-02-agent-policy.md` (P2) - Code maintainability.
6. `issue-03-agent-policy.md` (P2) - Code maintainability.

## 10. Recommended labels or milestones

- `agent-policy-violation` for 01, 02, 03.
- `desktop-ux-review` for 04.
- `mobile-ux-review` for 05.
- `ai-slop-content-review` for 06.

## 11. Any follow-up audits needed

- Regular audits of the `/content/` directory to ensure newly added files actually contain substantial content and aren't just empty SEO traps.
- Audit of components inside `/features/profile/` and `/features/events/` as they frequently use similar raw Tailwind class approaches.

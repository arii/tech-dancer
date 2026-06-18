
# Issue Dispatch Report

## 1. Summary of review coverage
- Reviewed AGENTS.md and relevant documentation.
- Extracted potential UI anti-patterns.
- Captured and analyzed screenshots for key desktop and mobile routes: `/`, `/blog`, `/research`, `/about`, `/merch`, and a specific blog post.
- Searched codebase for policy violations based on AGENTS.md rules.

## 2. List of new issues created
- [Agent Policy Violation] Remove raw padding and flex classes in `ResearchAnalytics.tsx`
- [Agent Policy Violation] Replace raw form styling with UI components in `BlogDrafter.tsx`
- [Agent Policy Violation] Replace raw `flex` and `items-center` classes with `Box` primitive in `UXAuditor.tsx`
- [Desktop UX] Oversized images in blog posts break desktop reading rhythm
- [Mobile UX] Oversized images in blog posts dominate the mobile viewport
- [AI Slop Content] Rewrite "The Story Behind the Merch" blog post to align with brand voice and fix missing images

## 3. Existing issues updated instead of duplicated
- Checked against open issues: none overlapped directly with these specific findings.

## 4. Candidates skipped and why
- Skipped `Home.tsx` since it had `// impeccable-ignore-file`.
- Skipped `UXAuditor.tsx` grid ignore due to a documented workaround for browser issues.

## 5. Most common `AGENTS.md` violations found
- Use of raw layout classes (`flex`, `items-center`, `flex-col`) instead of primitives (`Stack`, `Box`).
- Use of raw padding/spacing classes (`pt-[14px]`, `px-4`) instead of tokens.
- Raw Tailwind utility classes for interactive states instead of using established CVA variants or components.

## 6. Most common desktop UX problems found
- Oversized images inside Markdown content taking up excessive vertical space.

## 7. Most common mobile UX problems found
- Oversized images breaking the reading flow and requiring excessive scrolling.

## 8. Content quality / AI slop risks found
- Blog posts containing placeholder-like, repetitive text or references to images that are either missing or low-quality. The tone of some posts (e.g., the merch story) feels drafted and not polished.

## 9. Recommended fix order
1. Fix the Agent Policy Violations first, as they represent technical debt and deviation from the design system.
2. Address the Desktop and Mobile UX issues regarding oversized images, as these have a high impact on readability.
3. Rewrite the AI slop content.

## 10. Recommended labels or milestones
- `agent-policy-violation`, `tech-debt`
- `desktop-ux-review`, `mobile-ux-review`, `ux`
- `ai-slop-content-review`, `content`

## 11. Any follow-up audits needed
- A full pass of all Markdown files in `content/blog/` should be conducted to ensure no other oversized images exist.

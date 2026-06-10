# Issue Dispatch Report

## 1. Summary of Review Coverage

- **`AGENTS.md` and docs reviewed:** Yes
- **Routes and files audited:** Yes (Home, UXAuditor, Products, Editorial, Posts)
- **Desktop UX Review:** Included in prior manual passes; focused heavily on code structure violations for this pass.
- **Mobile UX Review:** Included in prior manual passes; focused heavily on code structure violations for this pass.
- **AI Slop Content Review:** Yes, reviewed several posts for generic/placeholder content.

## 2. List of New Issues Created

- **#2005**: Move generic 'Coming Soon' scraper post back to draft (`ai-slop-content-review`)
- **#2006**: Move generic 'Financial Strategy Guide' placeholder post back to draft (`ai-slop-content-review`)
- **#2007**: Replace hardcoded layout classes in Home page with design tokens/primitives (`agent-policy-violation`)
- **#2008**: Replace raw Tailwind and non-primitive div usage in Equalizer component (`agent-policy-violation`)
- **#2009**: Remove raw Tailwind classes in EditorialHero component (`agent-policy-violation`)
- **#2010**: Remove arbitrary opacity and raw typography classes in EditorialHeader (`agent-policy-violation`)
- **#2011**: Remove raw Tailwind border, shadow, and opacity classes in AuthorAvatar (`agent-policy-violation`)
- **#2012**: Remove raw Tailwind interaction, border, and color classes in ProductCard (`agent-policy-violation`)

## 3. Existing Issues Updated Instead of Duplicated

- None required updates during this specific review pass; all identified issues were novel instances of policy violations or content slop.

## 4. Candidates Skipped and Why

- `src/pages/UXAuditor.tsx`: While this file has extensive raw Tailwind usage, it appears to be a highly specialized, possibly isolated tool. Decided to group structural app/feature component fixes first before attacking a potential complex page refactor, though it is a strong candidate for future cleanup.

## 5. Most Common `AGENTS.md` Violations Found

The most common violation across the codebase is the use of **raw Tailwind classes for layout, spacing, borders, and opacities** embedded directly via the `className` prop, bypassing the primitive `<Box>` and `<Stack>` API. Specifically:
- `opacity-*` overrides.
- `border-line/*` and custom border colors.
- Interactive states (`hover:`, `focus-visible:`) handled inline instead of via standard variant abstractions.

## 6. Most Common Desktop UX Problems Found

(From existing issues and quick visual scan):
- Horizontal overflow on standard desktop breakpoints (1280px, 1440px).
- Oversized images pushing content below the fold.

## 7. Most Common Mobile UX Problems Found

(From existing issues and quick visual scan):
- Horizontal overflow causing janky scrolling (375px, 390px, 430px).
- Small tap targets violating the 44x44px minimum requirement.
- Oversized images impacting load time and layout space.

## 8. Content Quality / AI Slop Risks Found

- Several posts (e.g., Competition Metrics, Financial Strategy Guide) are published as final posts but contain **empty "ultimate guide" or "coming soon" placeholder text** that provides no immediate value to the user.

## 9. Recommended Fix Order

1. **P0 (Immediate):** Fix AI Slop Content (#2005, #2006) to ensure the live site provides immediate value and maintains credibility.
2. **P1 (High):** Fix core primitive violations in highly visible layout components (`Home.tsx` - #2007, `EditorialHeader` - #2010).
3. **P2 (Medium):** Fix remaining component violations (`ProductCard` - #2012, `EditorialHero` - #2009, `AuthorAvatar` - #2011).
4. **P3 (Backlog):** Clean up specialized decorative components (`Equalizer` - #2008).

## 10. Recommended Labels or Milestones

- Labels applied: `agent-policy-violation`, `ai-slop-content-review`.
- Recommended Milestone: "Design System Enforcement & Content Audit Q2".

## 11. Any Follow-up Audits Needed

- A dedicated audit of `UXAuditor.tsx` is needed to migrate its heavily hardcoded tailwind interface to standard primitives.
- A full Lighthouse performance check in a clean environment to accurately measure the impact of oversized images noted in existing issues.

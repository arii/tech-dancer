# Issue Dispatch Report

## 1. Summary of Review Coverage
- **Repository Guidelines:** Reviewed `AGENTS.md` and `docs/agent/issue-audit-rules.md` to establish baseline rules for component implementation, PR linkages, and layout primitives.
- **Visual Audits:** Analyzed Desktop and Mobile layout screenshots (`screenshot.png`, `events_mobile_screenshot.png`, etc.) using simulated Playwright viewports for the core application pages (Home, Events).
- **Content Review:** Searched and audited Markdown content inside the `content/posts/`, `content/events/`, and `content/resources/` directories for AI-generated filler, empty placeholders, and duplicate assertions.
- **Codebase Audits:** Conducted targeted text searches on `src/components/` layout definitions for raw Tailwind CSS violations.

## 2. List of New Issues Created
1. `dispatched-issues/agent-policy-violation-equalizer.md`: Fix raw Tailwind layout class violations in `Equalizer.tsx`. (Severity: High, Priority: P1)
2. `dispatched-issues/desktop-ux-hero-layout.md`: Reduce massive desktop typography scaling in the Home hero to pull content above the fold. (Severity: Medium, Priority: P2)
3. `dispatched-issues/mobile-ux-tap-targets.md`: Fix undersized mobile tap targets (Share button) in `EditorialHeader.tsx`. (Severity: Medium, Priority: P1)
4. `dispatched-issues/ai-slop-financial-guide.md`: Remove vague, overpromising "coming soon" boilerplate from the Financial Literacy guide post. (Severity: Low, Priority: P2)

## 3. Existing Issues Updated
*(None - `gh` CLI operations failed due to lack of API tokens; issues were written locally to `dispatched-issues/` directory instead of directly updating GitHub.)*

## 4. Candidates Skipped
- **Skipped Candidate:** `src/components/editorial/EditorialLayout.tsx` raw layout investigation.
  - **Why:** To prevent fragmentation, focus was consolidated on the single clearest `Equalizer.tsx` violation to set the precedent for component tokenization fixes.

## 5. Most Common `AGENTS.md` Violations Found
- **Raw Tailwind Layout Classes:** Using arbitrary spacing (e.g., `gap-[4px]`, `pb-[18px]`) and direct CSS flexible box properties (`flex`, `h-full`) on standard `div` tags instead of utilizing `Box` or `Stack` primitives from the application's strict design system.

## 6. Most Common Desktop UX Problems Found
- **Oversized Typography:** Hero text line heights and font sizes failing to cap effectively on ultra-wide viewports, wasting prime real estate and forcing grid components beneath the initial scroll line.

## 7. Most Common Mobile UX Problems Found
- **Accessibility Constraints:** Failing to hit the 48x48px minimum touch target specification, especially on secondary action row elements (like the 'Share' tag/button in editorial headers).

## 8. Content Quality / AI Slop Risks Found
- **Placeholder Syndrome:** Posts tagged as 'Comprehensive Guides' but containing mostly vague assertions ("We will dive into", "What's coming") and failing to provide tangible examples, code, or actionable WCS community insight.

## 9. Recommended Fix Order
1. **P1: `agent-policy-violation-equalizer.md`** - Fixing architectural component rules limits propagation of bad patterns.
2. **P1: `mobile-ux-tap-targets.md`** - A direct accessibility blocker that causes immediate user frustration.
3. **P2: `desktop-ux-hero-layout.md`** - Standard visual refinement and layout shift improvement.
4. **P2: `ai-slop-financial-guide.md`** - Content refinement that should ideally just be shifted back to `draft: true` until the author finishes the actual research.

## 10. Recommended Labels or Milestones
- **Labels:** `bug`, `design-system`, `mobile-ux`, `desktop-ux`, `content-cleanup`, `a11y`
- **Milestone:** `v1.1-ui-polish`

## 11. Any Follow-up Audits Needed
- Run a full `pnpm run audit` against the entire `src/components/editorial/` tree, as raw class usage appears pervasive there.
- Verify affiliate disclosures across all `content/resources/` items containing commercial product links.

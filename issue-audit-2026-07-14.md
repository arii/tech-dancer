# Final GitHub Issue Audit

**Date:** 2026-07-14

## 1. Summary of all open issues reviewed
Total issues reviewed: 28

## 2. Recommended action for each issue
- #3629: Keep open, related PR exists - This is an open Pull Request. It should remain open until reviewed and merged.
- #3628: Keep open, related PR exists - This is an open Pull Request. It should remain open until reviewed and merged.
- #3627: Keep open, related PR exists - This is an open Pull Request. It should remain open until reviewed and merged.
- #3626: Keep open - Pending submodule cleanup tasks.
- #3597: Keep open - Pending submodule migration follow-ups.
- #3591: Keep open - Bug is still relevant and needs addressing.
- #3528: Completed, close - package.json and pnpm-lock.yaml show shell-quote is >=1.8.4 (actually 1.10.0). Implementation verified.
- #3527: Keep open - package.json shows react-router-dom is ^7.14.1, not >=7.15.1.
- #3382: Keep open - Epic issue tracking multiple subtasks. Keep open.
- #3265: Keep open - Needs layout improvement for devai.
- #3264: Keep open - Needs styling updates.
- #3263: Keep open - Needs styling updates.
- #3248: Keep open - Refactoring work still required.
- #2996: Keep open - Epic tracking styling refactors.
- #2900: Keep open - Investigation still needed.
- #2687: Keep open - Content audit still required.
- #2678: Keep open - Accessibility fixes needed.
- #2675: Keep open - Bug fixes needed.
- #2630: Keep open - CI logic improvements needed.
- #2606: Keep open - Tracking issue for PR.
- #2602: Keep open - Tracking issue for PR.
- #2555: Keep open, needs clarification - Issue is very vague.
- #2553: Outdated, close - The 'UI Anti-Pattern Audit' workflow does not exist in .github/workflows anymore, it has already been handled or removed over time.
- #2552: Outdated, close - Neither security.yml nor codeql.yml exist in .github/workflows anymore.
- #2531: Keep open - Refactoring work still needed.
- #2530: Keep open - Refactoring work still needed.
- #2529: Keep open - Refactoring work still needed.
- #2492: Keep open - Refactoring still needed as scripts/impact does not exist.

## 3. Issues that should remain open
- #3629: fix: update submodule url to https for vercel deployment (Keep open, related PR exists)
- #3628: docs: update PR template description (Keep open, related PR exists)
- #3627: feat: add workflow to automatically update submodule (Keep open, related PR exists)
- #3626: infra: Post-Migration Submodule Cleanup & Verification Tasks (Keep open)
- #3597: infra: Migrate boomtick-pkg to external submodule referencing the standalone boomtick repository (Keep open)
- #3591: Bug: React Router basename mapping incorrect under dynamic subdirectory preview branches (Keep open)
- #3527: security: upgrade react-router to >=7.15.1 to resolve RCE and DoS CVEs (prod dependency) (Keep open)
- #3382: [Epic] Composable and Localized Design System Refactor (Keep open)
- #3265: improve devai vis layout (Keep open)
- #3264: Merch:  Text Spacing & Content Hierarchy (Keep open)
- #3263: Merch page:  Call-to-Action (CTA) Primary vs. Secondary Hierarchy (Keep open)
- #3248: Refactor Over-engineered Layout Primitives and Remove Hallucinated JIT Resolver (Keep open)
- #2996: Epic: Group and Prioritize Raw Styling UI Refactors (Keep open)
- #2900: Investigate why mobile visual snapshots prompt unexpected updates when no changes exist (Keep open)
- #2687: content: Audit and improve blog posts to meet Impeccable standards (Keep open)
- #2678: accessibility: fix contrast ratio regressions on homepage elements (Keep open)
- #2675: bug: fix clipped overflow containers and skip link text overflow (Keep open)
- #2630: entropy gate (Keep open)
- #2606: Deployment Impact Analysis Effectiveness Audit (Keep open)
- #2602: Refactor: De-slop ResearchAnalytics by extracting common UI components (Keep open)
- #2531: Replace raw flex and items-center classes with Box primitive in UXAuditor.tsx (Keep open)
- #2530: Replace raw form styling with UI components in BlogDrafter.tsx (Keep open)
- #2529: Remove raw padding and flex classes in ResearchAnalytics.tsx (Keep open)
- #2492: refactor(scripts): extract impact-analysis helpers into scripts/impact/ submodules with Zod schemas (Keep open)

## 4. Issues that need clarification or scope updates
- #2555: model aware token usage (Keep open, needs clarification)

## 5. Issues that should be merged into other issues
- None

## 6. Issues that should be closed as duplicates
- None

## 7. Issues that should be closed as completed
- #3528: security: upgrade shell-quote to >=1.8.4 — critical newline injection / command injection (GHSA-w7jw-789q-3m8p, CVSS 8.1) (Completed, close)

## 8. Issues that should be closed as outdated or no longer aligned
- #2553: CI: Move UI Anti-Pattern Audit to its own workflow (Outdated, close)
- #2552: CI: Consider merging static analysis toolchecks (Outdated, close)

## 9. Label, milestone, or priority cleanup recommendations
- Issues labeled as Epic (like #3382, #2996) should have milestones assigned to track overall progress.
- Ensure issues blocked by PRs have 'blocked' or 'in-progress' labels.

## 10. Suggested follow-up issues to create, if any
- None currently, we need to focus on resolving the open layout and styling refactors first.

## 11. Recommended order for addressing remaining issues
1. Submodule cleanup tasks (#3626, #3597) to ensure infrastructure stability.
2. Bug fixes like the React Router basename mapping (#3591).
3. UI/UX Refactors (e.g., #2531, #2530, #2529) grouped under the Raw Styling UI Epic (#2996).
4. Feature improvements (e.g., #3265, #3264, #3263).
5. Investigate long-standing bugs and test flakiness (e.g., #2900).

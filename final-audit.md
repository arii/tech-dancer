# Open PR Audit

## 1. Summary of all open PRs reviewed

- **PR #1895**: [Fix visual smoke test for DevAI Systems Portfolio](https://github.com/arii/tech-dancer/pull/1895)
- **PR #1888**: [docs(audit): generate comprehensive github actions workflow audit](https://github.com/arii/tech-dancer/pull/1888)
- **PR #1887**: [docs: audit all open github issues and generate tracking reports](https://github.com/arii/tech-dancer/pull/1887)
- **PR #1886**: [docs: issue dispatch agent report generation](https://github.com/arii/tech-dancer/pull/1886)
- **PR #1885**: [chore: clarify set -e intent in manage-previews.sh (repairs #1860)](https://github.com/arii/tech-dancer/pull/1885)
- **PR #1883**: [Boomtick MCP: Integration, Schema Compliance, and Tool Dispatch Improvements](https://github.com/arii/tech-dancer/pull/1883)
- **PR #1880**: [chore: PR prep and fixes for previews management](https://github.com/arii/tech-dancer/pull/1880)
- **PR #1879**: [Responsive design improvements for Research Analytics page](https://github.com/arii/tech-dancer/pull/1879)
- **PR #1870**: [fix: resolve previews dashboard 404 and redirect loops](https://github.com/arii/tech-dancer/pull/1870)
- **PR #1854**: [Fix build failures and revert incomplete refactor](https://github.com/arii/tech-dancer/pull/1854)
- **PR #1848**: [Lightweight CPU RAG Multi-Agent PR Review Pipeline](https://github.com/arii/tech-dancer/pull/1848)
- **PR #1839**: [Consolidate UX audit tooling in dev-tools](https://github.com/arii/tech-dancer/pull/1839)
- **PR #1800**: [Simplify pumpkin costume tutorial to sticker-based assembly](https://github.com/arii/tech-dancer/pull/1800)
- **PR #1791**: [feat(merch): overhaul merch page and address E2E test issues](https://github.com/arii/tech-dancer/pull/1791)
- **PR #1759**: [Rename and clarify project taxonomy on DevAI Portfolio page](https://github.com/arii/tech-dancer/pull/1759)
- **PR #1756**: [Add Ecommerce Automation section to Research portfolio](https://github.com/arii/tech-dancer/pull/1756)
- **PR #1755**: [Add SEO-focused DevAI implementation articles to Research Portfolio](https://github.com/arii/tech-dancer/pull/1755)
- **PR #1754**: [Add UX storyboard and visual redesign plan for /research](https://github.com/arii/tech-dancer/pull/1754)
- **PR #1753**: [Feature BoomTick.blog and RepoAuditor AI as flagship research outputs](https://github.com/arii/tech-dancer/pull/1753)

## 2. Feedback provided for each PR

### PR #1895: Fix visual smoke test for DevAI Systems Portfolio
- **What is working well**: Correctly identifies the text mismatch (`DevAI Portfolio` vs `DevAI Systems Portfolio`) causing the smoke test timeout.
- **Specific issues**: The E2E timeout persists, suggesting the text fix might not be the only issue or the baseline visual snapshots need updating.
- **Actionable instructions**: Check local `npx playwright test` execution and ensure snapshots match the new text.

### PR #1888: docs(audit): generate comprehensive github actions workflow audit
- **What is working well**: Added comprehensive workflow documentation.
- **Specific issues**: The new file introduces a linting error.
- **Actionable instructions**: Run `pnpm run lint` on the documentation to resolve formatting issues.

### PR #1887: docs: audit all open github issues and generate tracking reports
- **What is working well**: Excellent addition of issue audit tracking reports.
- **Specific issues**: Check that the generated reports align with `docs/agent/issue-audit-rules.md`.
- **Actionable instructions**: Ensure the reports explicitly state completion criteria for the issues.

### PR #1886: docs: issue dispatch agent report generation
- **What is working well**: Dispatch agent tracking added.
- **Specific issues**: None obvious from diff.
- **Actionable instructions**: Ensure the agent tracking respects the repository rules.

### PR #1885: chore: clarify set -e intent in manage-previews.sh (repairs #1860)
- **What is working well**: `manage-previews.sh` `set -e` intent clarified.
- **Specific issues**: The script changes the deployment workflow error handling.
- **Actionable instructions**: Test script execution in a dry-run CI workflow.

### PR #1883: Boomtick MCP: Integration, Schema Compliance, and Tool Dispatch Improvements
- **What is working well**: Good progress on Boomtick MCP integration.
- **Specific issues**: Complex schema compliance updates might break existing tool dispatches.
- **Actionable instructions**: Ensure `pnpm run test` passes for the new schemas.

### PR #1880: chore: PR prep and fixes for previews management
- **What is working well**: Previews management fixes are prepped.
- **Specific issues**: Build and E2E checks fail, likely due to a routing issue in `public/404.html` or the base path script.
- **Actionable instructions**: Validate the GitHub Pages deployment logic locally.

### PR #1879: Responsive design improvements for Research Analytics page
- **What is working well**: Responsive design improvements targeting Analytics.
- **Specific issues**: Modifies UI components. Need to ensure no raw tailwind (`div className='flex'`) was used.
- **Actionable instructions**: Check updated pages against `TODO_ANTIPATTERNS.md`. Use `<Stack>` and `<Grid>`.

### PR #1870: fix: resolve previews dashboard 404 and redirect loops
- **What is working well**: Previews dashboard 404 loops addressed.
- **Specific issues**: E2E tests are failing because of changed routing behavior.
- **Actionable instructions**: Update the Playwright tests that assert on the old redirect behavior.

### PR #1854: Fix build failures and revert incomplete refactor
- **What is working well**: Reverts an incomplete refactor, fixing the build.
- **Specific issues**: Need to ensure the revert didn't lose any critical fixes.
- **Actionable instructions**: Review the reverted files carefully.

### PR #1848: Lightweight CPU RAG Multi-Agent PR Review Pipeline
- **What is working well**: Lightweight CPU RAG PR review pipeline.
- **Specific issues**: Large new feature set.
- **Actionable instructions**: Validate the performance impact and ensure no binary leakage into `.rag/`.

### PR #1839: Consolidate UX audit tooling in dev-tools
- **What is working well**: Consolidates UX audit tooling.
- **Specific issues**: Modifies `dev-tools`.
- **Actionable instructions**: Ensure `td_cli.py` commands are not broken by testing locally.

### PR #1800: Simplify pumpkin costume tutorial to sticker-based assembly
- **What is working well**: Pumpkin costume tutorial simplified.
- **Specific issues**: Documentation and asset changes.
- **Actionable instructions**: Ensure any new images referenced exist and are optimized.

### PR #1791: feat(merch): overhaul merch page and address E2E test issues
- **What is working well**: The merch page layout was comprehensively overhauled.
- **Specific issues**: Semgrep is failing. Conflicts exist with `main` in `src/pages/merch.tsx`.
- **Actionable instructions**: Resolve merge conflicts in the routing logic and remove any arbitrary Tailwind classes to satisfy the `TODO_ANTIPATTERNS.md` rules.

### PR #1759: Rename and clarify project taxonomy on DevAI Portfolio page
- **What is working well**: Project taxonomy clarified on the portfolio page.
- **Specific issues**: Build, Lint, and Oxlint fail. Conflicts with main.
- **Actionable instructions**: Resolve merge conflicts and fix linting errors.

### PR #1756: Add Ecommerce Automation section to Research portfolio
- **What is working well**: Ecommerce Automation section added.
- **Specific issues**: Conflicts with main.
- **Actionable instructions**: Resolve merge conflicts.

### PR #1755: Add SEO-focused DevAI implementation articles to Research Portfolio
- **What is working well**: SEO-focused articles added.
- **Specific issues**: Semgrep, Lint, and Oxlint fail. Conflicts with main.
- **Actionable instructions**: Fix security warnings and lint issues.

### PR #1754: Add UX storyboard and visual redesign plan for /research
- **What is working well**: UX storyboard and visual redesign plan.
- **Specific issues**: Conflicts with main.
- **Actionable instructions**: Rebase the branch and resolve conflicts.

### PR #1753: Feature BoomTick.blog and RepoAuditor AI as flagship research outputs
- **What is working well**: Flagship research outputs featured.
- **Specific issues**: Conflicts with main.
- **Actionable instructions**: Rebase the branch and resolve conflicts.

## 3. CI status and failure guidance for each PR

### PR #1895: Fix visual smoke test for DevAI Systems Portfolio
**CI Status**: Failing (Build & E2E).
**CI Guidance**: E2E tests failed. Run `npx playwright test` locally and check if new snapshots are needed with `--update-snapshots`.

### PR #1888: docs(audit): generate comprehensive github actions workflow audit
**CI Status**: Failing (Lint & Type Check).
**CI Guidance**: Run `pnpm run lint` and address the TypeScript errors.

### PR #1887: docs: audit all open github issues and generate tracking reports
**CI Status**: Passing or unknown.
**CI Guidance**: No CI blockers found.

### PR #1886: docs: issue dispatch agent report generation
**CI Status**: Passing or unknown.
**CI Guidance**: No CI blockers found.

### PR #1885: chore: clarify set -e intent in manage-previews.sh (repairs #1860)
**CI Status**: Passing or unknown.
**CI Guidance**: No CI blockers found.

### PR #1883: Boomtick MCP: Integration, Schema Compliance, and Tool Dispatch Improvements
**CI Status**: Passing or unknown.
**CI Guidance**: No CI blockers found.

### PR #1880: chore: PR prep and fixes for previews management
**CI Status**: Failing (Build & E2E).
**CI Guidance**: E2E tests failed. Run `npx playwright test` locally and check if new snapshots are needed with `--update-snapshots`.

### PR #1879: Responsive design improvements for Research Analytics page
**CI Status**: Passing or unknown.
**CI Guidance**: No CI blockers found.

### PR #1870: fix: resolve previews dashboard 404 and redirect loops
**CI Status**: Failing (Build & E2E).
**CI Guidance**: E2E tests failed. Run `npx playwright test` locally and check if new snapshots are needed with `--update-snapshots`.

### PR #1854: Fix build failures and revert incomplete refactor
**CI Status**: Passing or unknown.
**CI Guidance**: No CI blockers found.

### PR #1848: Lightweight CPU RAG Multi-Agent PR Review Pipeline
**CI Status**: Passing or unknown.
**CI Guidance**: No CI blockers found.

### PR #1839: Consolidate UX audit tooling in dev-tools
**CI Status**: Passing or unknown.
**CI Guidance**: No CI blockers found.

### PR #1800: Simplify pumpkin costume tutorial to sticker-based assembly
**CI Status**: Passing or unknown.
**CI Guidance**: No CI blockers found.

### PR #1791: feat(merch): overhaul merch page and address E2E test issues
**CI Status**: Failing (Semgrep Static Analysis).
**CI Guidance**: Security or anti-pattern check failed. Review code quality guidelines.

### PR #1759: Rename and clarify project taxonomy on DevAI Portfolio page
**CI Status**: Failing (Lint & Type Check, Oxlint Scan, build).
**CI Guidance**: Run `pnpm run lint` and address the TypeScript errors.

### PR #1756: Add Ecommerce Automation section to Research portfolio
**CI Status**: Passing or unknown.
**CI Guidance**: No CI blockers found.

### PR #1755: Add SEO-focused DevAI implementation articles to Research Portfolio
**CI Status**: Failing (Lint & Type Check, Oxlint Scan, Semgrep Static Analysis).
**CI Guidance**: Run `pnpm run lint` and address the TypeScript errors.

### PR #1754: Add UX storyboard and visual redesign plan for /research
**CI Status**: Passing or unknown.
**CI Guidance**: No CI blockers found.

### PR #1753: Feature BoomTick.blog and RepoAuditor AI as flagship research outputs
**CI Status**: Passing or unknown.
**CI Guidance**: No CI blockers found.

## 4. UX concerns by PR

### PR #1895: Fix visual smoke test for DevAI Systems Portfolio
- Modifies `tests/visual.spec.ts`. Requires manual verification of the `DevAI Systems Portfolio` header on mobile viewports.

### PR #1888: docs(audit): generate comprehensive github actions workflow audit
- Pure documentation PR. No UX concerns.

### PR #1887: docs: audit all open github issues and generate tracking reports
- No UX concerns.

### PR #1886: docs: issue dispatch agent report generation
- No UX concerns.

### PR #1885: chore: clarify set -e intent in manage-previews.sh (repairs #1860)
- No UX concerns.

### PR #1883: Boomtick MCP: Integration, Schema Compliance, and Tool Dispatch Improvements
- Backend tool changes. No direct UI impact.

### PR #1880: chore: PR prep and fixes for previews management
- Verify the dashboard loads correctly without 404s.

### PR #1879: Responsive design improvements for Research Analytics page
- Direct UI changes. Must verify the analytics dashboard on mobile and desktop.

### PR #1870: fix: resolve previews dashboard 404 and redirect loops
- Changes routing behavior. Needs testing to ensure no infinite loops.

### PR #1854: Fix build failures and revert incomplete refactor
- Verify that the reverted UI matches the design tokens.

### PR #1848: Lightweight CPU RAG Multi-Agent PR Review Pipeline
- Backend pipeline changes. No direct UI impact.

### PR #1839: Consolidate UX audit tooling in dev-tools
- Tooling changes. No direct UI impact.

### PR #1800: Simplify pumpkin costume tutorial to sticker-based assembly
- Content updates. Verify image layouts on the blog post.

### PR #1791: feat(merch): overhaul merch page and address E2E test issues
- Major layout regression risk. Verify the product grid behaves correctly on small screens (e.g. 320px width).

### PR #1759: Rename and clarify project taxonomy on DevAI Portfolio page
- Content and layout updates. Needs visual verification.

### PR #1756: Add Ecommerce Automation section to Research portfolio
- Content and layout updates. Needs visual verification.

### PR #1755: Add SEO-focused DevAI implementation articles to Research Portfolio
- Content updates. Verify new articles render correctly.

### PR #1754: Add UX storyboard and visual redesign plan for /research
- Visual redesign planning. Review the storyboard for design consistency.

### PR #1753: Feature BoomTick.blog and RepoAuditor AI as flagship research outputs
- Content and layout updates. Needs visual verification.

## 5. Conflict or overlap notes

### PR #1895: Fix visual smoke test for DevAI Systems Portfolio
- **Conflict**: No conflicts detected currently.

### PR #1888: docs(audit): generate comprehensive github actions workflow audit
- **Conflict**: No conflicts detected currently.

### PR #1887: docs: audit all open github issues and generate tracking reports
- **Conflict**: No conflicts detected currently.

### PR #1886: docs: issue dispatch agent report generation
- **Conflict**: No conflicts detected currently.

### PR #1885: chore: clarify set -e intent in manage-previews.sh (repairs #1860)
- **Conflict**: This PR has direct conflicts with `main` that must be resolved locally.

### PR #1883: Boomtick MCP: Integration, Schema Compliance, and Tool Dispatch Improvements
- **Conflict**: No conflicts detected currently.

### PR #1880: chore: PR prep and fixes for previews management
- **Conflict**: No conflicts detected currently.

### PR #1879: Responsive design improvements for Research Analytics page
- **Conflict**: No conflicts detected currently.

### PR #1870: fix: resolve previews dashboard 404 and redirect loops
- **Conflict**: No conflicts detected currently.

### PR #1854: Fix build failures and revert incomplete refactor
- **Conflict**: No conflicts detected currently.

### PR #1848: Lightweight CPU RAG Multi-Agent PR Review Pipeline
- **Conflict**: No conflicts detected currently.

### PR #1839: Consolidate UX audit tooling in dev-tools
- **Conflict**: No conflicts detected currently.

### PR #1800: Simplify pumpkin costume tutorial to sticker-based assembly
- **Conflict**: No conflicts detected currently.

### PR #1791: feat(merch): overhaul merch page and address E2E test issues
- **Conflict**: This PR has direct conflicts with `main` that must be resolved locally.

### PR #1759: Rename and clarify project taxonomy on DevAI Portfolio page
- **Conflict**: This PR has direct conflicts with `main` that must be resolved locally.

### PR #1756: Add Ecommerce Automation section to Research portfolio
- **Conflict**: This PR has direct conflicts with `main` that must be resolved locally.

### PR #1755: Add SEO-focused DevAI implementation articles to Research Portfolio
- **Conflict**: This PR has direct conflicts with `main` that must be resolved locally.

### PR #1754: Add UX storyboard and visual redesign plan for /research
- **Conflict**: This PR has direct conflicts with `main` that must be resolved locally.

### PR #1753: Feature BoomTick.blog and RepoAuditor AI as flagship research outputs
- **Conflict**: This PR has direct conflicts with `main` that must be resolved locally.

## 6. Recommended merge order

1. **Infrastructure/Fixes (PR #1885, #1870, #1854)**: These resolve underlying pipeline, routing, and build issues which could affect other PRs.
2. **Documentation & Tracking (PR #1888, #1887, #1886)**: Merge these once CI passes, as they have low impact on application logic.
3. **Minor Features/Bugfixes (PR #1895, #1879, #1883, #1880, #1839, #1800, #1848)**: Merge after fixing visual tests, UI layouts, and ensuring new tooling doesn't break existing workflows.
4. **Major Overhauls & Conflicting PRs (PR #1791, #1759, #1756, #1755, #1754, #1753)**: These all have conflicts. They must be rebased and merged sequentially to avoid stepping on each other's toes.

## 7. Recommended fix-before-merge items

- **PR #1895**: Fix the E2E timeout by ensuring the visual test assertions correctly match the loaded state.
- **PR #1791, #1759, #1756, #1755, #1754, #1753**: Resolve all merge conflicts.
- **PR #1888, #1759, #1755**: Fix TypeScript, Lint, and Oxlint errors.
- **PR #1870, #1880**: Fix the routing E2E tests and ensure dashboard loads without 404s.
- **PR #1791, #1755**: Resolve Semgrep static analysis failures.

## 8. Final merge / defer / abandon strategy

- **Merge**: PRs #1895, #1870, #1885, #1854 after their respective minor CI fixes. They provide immediate value and stability.
- **Defer**: PR #1791 (Merch Overhaul) and PRs #1753-#1759. These are large, conflicting features that need significant rebase and UX token compliance review before they can be safely introduced.
- **Abandon**: None explicitly recommended for abandonment. However, PRs with extensive conflicts and failing CI (like #1759, #1755) should be re-evaluated if their underlying goals have changed.

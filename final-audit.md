# Comprehensive PR Review Audit

*Compiled autonomously across 3 review cycles.*

## 1. Summary of PRs Reviewed

A total of 23 open Pull Requests were deeply reviewed over multiple cycles, focusing on structural layout, code quality, adherence to `AGENTS.md` guidelines, and CI health.

## 2. Feedback provided for each PR

- **PR #1870:** Fixes dashboard 404 via dynamic probing, but `src/main.tsx` React Router needs updating to consume query params (`?/...`).
- **PR #1869:** Clean git trees logic is fine, but deleting `manage-previews.sh` conflicts structurally with PR #1860.
- **PR #1860:** Good hardening of preview pruning, but fails CI deploy due to bad local file copy path.
- **PR #1857:** Consolidates tools well but fails Gitleaks and Semgrep security CI checks. Dummy tokens need masking.
- **PR #1856:** Issue audits are accurate, but tracking files must be moved to `docs/agent/` or `.gitignore`d.
- **PR #1855:** Visual test snapshot update. Direct overlap with PR 1852. Needs a better title.
- **PR #1854:** Layout refactors (`NavLink`) are clean, but needs local validation to ensure polymorphic `as` tags compile properly since CI is missing.
- **PR #1853:** Comprehensive Boomtick MCP implementation. Needs hardened JSON boundaries in `run_lighthouse`. Supersedes 1843/1844.
- **PR #1852:** Duplicate of PR 1855 (visual test updates).
- **PR #1851:** Helpful MCP comparison, but should be a Github comment rather than a permanent markdown file.
- **PR #1850:** CSS cleanup is good, but must verify `CUSTOM_COMPONENTS` registration before removing `Notice` from standard parser map.
- **PR #1848:** CPU RAG Pipeline is well designed. Needs a `.gitignore` entry for `.rag`. Supersedes 1845.
- **PR #1845:** Early RAG Pipeline draft. Superseded by 1848.
- **PR #1844:** Early MCP draft. Superseded by 1853.
- **PR #1843:** Early MCP shell wrapper. Superseded by 1853.
- **PR #1842:** Valid lint fix. Investigate unassociated `deploy` CI failures.
- **PR #1839:** Dev-tools UI automation is good. `pr-consolidation-report.md` should be removed before merge.
- **PR #1800:** Pumpkin costume images optimized to webp, but new Amazon ASIN must exactly match the graphics.
- **PR #1791:** Merch overhaul is conceptually good but fails lint/build due to duplicate item mapping in the UI loop.
- **PR #1759:** Taxonomy rename breaks the file structure by leaving orphaned JSX tags.
- **PR #1756:** Content type extensions are fine, but broke the E2E visual config by overriding `os.homedir()` with `/tmp/`.
- **PR #1755:** Content logic overhaul fails lint and build due to generic typings. Overlaps with 1756.
- **PR #1754:** Storyboard doc is good planning, but commit changes to runtime check might be failing `deploy` CI.

## 3. Recommended Fix-Before-Merge Items

**Group A: MCP PR Rescue Engine (PRs 1843, 1844, 1853, 1857)**
- **Overlap Note:** PRs 1843 and 1844 are early scaffolds that have been wholly superseded by PR 1853. PR 1857 consolidates them but fails security CI.
- **Fix Items:** Add robust JSON boundary safety parsing in `run_lighthouse.ts` and `run_playwright.ts`. Address the `deploy` CI failures. Ensure mock tokens pass Gitleaks in PR 1857.

**Group B: RAG Code Review Pipeline (PRs 1845, 1848)**
- **Overlap Note:** PR 1848 builds a lightweight vector DB using ChromaDB and supersedes PR 1845.
- **Fix Items:** `.rag` data directories must be added to `.gitignore`. Ensure execution entry points are connected to the central `td_cli.py` or properly documented.

**Group C: Preview Dashboard Infrastructure (PRs 1860, 1869, 1870)**
- **Overlap Note:** Massive conflict. PR 1869 deletes the `manage-previews.sh` script entirely, while PR 1860 relies on it and hardens it.
- **Fix Items:** The maintainers must resolve this architectural split.
- **Fix Items:** While the dynamic routing script handles 404s cleanly, `src/main.tsx` must be updated to consume query params (`?/...`) instead of checking `sessionStorage.getItem('ghpages_redirect')` to avoid breaking the core React application routing.

**Group D: Research & DevAI Redesign (PRs 1753, 1754, 1755, 1756, 1759, 1854)**
- **Overlap Note:** All touch the `ResearchAnalytics.tsx` file and content parsing logic.
- **Fix Items:** Many of these PRs have failing `build` and `Lint & Type Check` CI tasks due to conflicting or mismatched TypeScript additions to the `ContentItem` type (like `type: "tool"` or `readTime`) and orphaned JSX elements in the `ResearchAnalytics` component maps.
- Ensure `verify_ux_consistency.spec.ts` continues to use dynamic file paths (`os.homedir()`) rather than hardcoded `/tmp/` paths which break cross-platform runners.

**Group E: Minor UI & Fixes (PRs 1800, 1839, 1842, 1850)**
- **Fix Items (1800):** Verify Amazon compliance; newly swapped ASINs must strictly match the updated WebP visual assets.
- **Fix Items (1850):** Ensure `Notice` is properly preserved in the `CUSTOM_COMPONENTS` markdown registry before stripping it from standard parsing maps.

## 4. Recommended Merge Order

*When the blocking issues are resolved, PRs should be merged sequentially by domain to avoid cascading rebase failures.*

1. **Bug fixes / Linters**: Merge PR 1842 (GlobalSearch lint) and PR 1850 (Markdown CSS/Bracket).
2. **Infra / Previews**: Resolve the conflict between 1860 and 1869, then merge 1870 (Routing).
3. **Research UI**: Merge 1854 (Research layout refactor), followed by 1755/1756 (Content Type extensions).
4. **Agent Tools**: Merge 1853 (Boomtick MCP) and 1848 (RAG Pipeline).
5. **Content**: Merge 1800 (Pumpkin Costume) and 1791 (Merch).
6. **Cleanup**: Close all superseded PRs across the groups.

## 5. Notes on Blockers and Risks

The primary risk currently facing the repository is the **high volume of overlapping, concurrent PRs** modifying the exact same layout structures (e.g., `/research` and `manage-previews.sh`). This violates the "Parallel Work Protocol" defined in `AGENTS.md` (§20), which dictates staggering feature files and prioritizing conflict checks.

Furthermore, numerous PRs are failing the `deploy` CI check, indicating that recent infrastructural or Base URL changes might be causing Vite builds to fail exclusively during the GH Actions deploy phase.

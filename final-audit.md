# Comprehensive PR Review Audit

*Compiled autonomously across 4 review cycles.*

## 1. Summary of All Open PRs Reviewed

A total of 24 open Pull Requests were deeply reviewed over multiple cycles, focusing on structural layout, code quality, adherence to `AGENTS.md` guidelines, and CI health.

## 2. Feedback Provided for Each PR

- **PR #1873:** Fixes branch preview paths, but missing React Router `src/main.tsx` parsing updates for the `?/...` query string syntax.
- **PR #1870:** Superseded by the broader fix in PR #1873.
- **PR #1869:** Clean git trees logic is fine, but deleting `manage-previews.sh` conflicts structurally with PR #1860 and PR #1873.
- **PR #1860:** Good hardening of preview pruning, but fails CI deploy due to bad local file copy path. Conflicts with #1869.
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

## 3. CI Status and Failure Guidance

- **Failing `deploy` Workflows:** PRs #1860, #1845, #1842, #1800, #1791, #1756, and #1754 all have failing `deploy` checks. Most stem from local pathing errors or incomplete Vite/Pages context bridging.
- **Failing Lint & Build:** PRs #1791, #1759, and #1755 have hard linting, parsing, and type-checking failures in `.tsx` files. Action: Run `pnpm run lint` and `pnpm run build` locally.
- **Failing Security Checks:** PR #1857 fails Gitleaks/Semgrep. Action: Check test files for unredacted mock secret formats.

## 4. UX Concerns By PR

- **PR #1873 / #1870:** The 404 query routing implementation breaks single-page application navigation by failing to instruct React Router to parse the incoming URL state.
- **PR #1869 / #1860:** The removal of `dashboard.js` metadata strips essential lifecycle data (e.g. built time vs. deploy time) from the DevOps preview UI, degrading the internal developer experience.
- **PR #1791:** The `All` filter configuration on the `/merch` page duplicates the rendering of 3 item cards, creating a confusing and crowded interface instead of deduplicating unique IDs.
- **PR #1759:** Leaves disjointed header UI elements and breaks layout structural constraints.

## 5. Conflict or Overlap Notes

- **Preview Scripts:** #1869 completely deletes the scripts that #1860 and #1873 rely heavily on to resolve preview dashboard bugs.
- **MCP Server Tools:** #1843, #1844, and #1853 all try to scaffold the exact same set of AI tools in the same directory.
- **CPU RAG Pipeline:** #1845 and #1848 both introduce localized vector storage architectures that overwrite each other.
- **Research Taxonomy:** #1753, #1754, #1755, #1756, and #1759 all concurrently alter the logic and UI structure of `/research`, triggering massive merge conflict risks and duplicate components.
- **Visual Tests:** #1855 and #1852 both blindly update the same 4 mobile `.png` artifacts.

## 6. Recommended Merge Order

1. **Bug fixes / Linters**: Merge PR 1842 (GlobalSearch lint) and PR 1850 (Markdown CSS/Bracket).
2. **Infra / Previews**: Resolve the conflict between 1860, 1869, and 1873, then merge 1873 (Routing).
3. **Research UI**: Merge 1854 (Research layout refactor), followed by 1755/1756 (Content Type extensions).
4. **Agent Tools**: Merge 1853 (Boomtick MCP) and 1848 (RAG Pipeline).
5. **Content**: Merge 1800 (Pumpkin Costume) and 1791 (Merch).

## 7. Recommended Fix-Before-Merge Items

- Update `src/main.tsx` React Router config to consume the query string (`?/...`) in PR #1873.
- Redact test secrets in PR #1857 to pass Gitleaks.
- Fix broken JSX in `ResearchAnalytics.tsx` in PR #1759.
- Eliminate duplicate mapped item cards in PR #1791.

## 8. Final Merge / Defer / Abandon Strategy

- **Merge:** PRs #1873, #1853, #1848, #1854, #1842, #1850, #1800, #1791 (after fixes).
- **Defer (Needs Consolidation):** PRs #1753, #1754, #1755, #1756, #1759 should be deferred until their authors consolidate their typings and layout changes into a single Research Overhaul branch to prevent merge conflicts. PR #1860 should be deferred until #1873 is verified.
- **Abandon (Superseded/Obsolete):** PR #1870 (Superseded by 1873), PR #1869 (Abandoned architectural path), PR #1855 and #1852 (Squash into the features changing the UI), PR #1857, #1845, #1844, #1843 (Superseded by robust later iterations), PR #1851, #1839 (Tracking files don't belong in repo).

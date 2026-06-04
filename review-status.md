# Review Status Tracker

## PR #1870
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Fixes dashboard 404, but missing src/main.tsx React Router update. Needs fix.

## PR #1869
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Addresses clean git trees. Competes directly with 1860 by deleting `manage-previews.sh`. Needs architectural resolution before merge.

## PR #1860
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Good hardening of preview pruning scripts. CI `deploy` step is failing due to local path structure.

## PR #1857
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Consolidates tools successfully, but fails security and static analysis CI. Hardcoded dummy keys need fixing.

## PR #1856
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Excellent auditing. Need to move tracking reports out of root into `/docs/agent` or ignore them.

## PR #1855
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Visual test snapshot updates. Title is poorly formatted and overlaps with PR 1852.

## PR #1854
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Fixes build and router refs on `/research` cleanly. Needs local validation since latest CI is missing.

## PR #1853
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Comprehensive Boomtick MCP implementation. Supersedes 1843 and 1844. Needs JSON parsing hardening for CLI tools.

## PR #1852
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Test snapshot update. Direct overlap with PR 1855.

## PR #1851
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Comparison doc for MCP PRs. Helpful but should be a comment, not a checked-in file.

## PR #1850
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Cleans up duplicate markdown renderer configs. Risk: Check `CUSTOM_COMPONENTS` registration before full `Notice` deletion.

## PR #1848
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Python RAG pipeline. Looks solid but needs `.gitignore` updates for `.rag` database. Supersedes 1845.

## PR #1845
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Superseded by 1848.

## PR #1844
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Superseded by 1853.

## PR #1843
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Superseded by 1853.

## PR #1842
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** GlobalSearch lint fix. Has weird unassociated `deploy` CI failures. Good to merge otherwise.

## PR #1839
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Useful PR consolidation tooling in dev-tools. `pr-consolidation-report.md` should not be committed to repo root.

## PR #1800
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Pumpkin costume update. Make sure newly linked Amazon ASIN matches the webp graphic to preserve compliance.

## PR #1791
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Overhauls Merch page. Fails lint and build CI due to `products.map` errors and dupes. Needs code fix.

## PR #1759
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Renames portfolio headers but breaks ResearchAnalytics structure. CI build/lint fails. Fix block deletions.

## PR #1756
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Extends ContentType status. Overlaps with 1755. Broke `os.homedir()` e2e visual paths via hardcoded `/tmp/`.

## PR #1755
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Overlaps with 1756. Fails lint and build. Fix TS interfaces.

## PR #1754
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Adds UX Storyboard doc. Ensure Node major version checking script fixes don't cause `deploy` pipeline to fail.


## PR #1873
- [x] Reviewed
- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided
- [x] Merge readiness assessment
- **Notes:** Supersedes 1870. Restores preview metadata variables and dynamic base paths. Fails E2E build. `src/main.tsx` is still not parsing the new 404 query param structure.

# Open PR Audit & Merge Strategy

## 1. Summary of all open PRs reviewed
A total of 28 open Pull Requests were reviewed across various domains of the project including UI/UX enhancements, content updates, GitHub Actions refactoring, accessibility fixes, design token refactoring, and AI Agent / MCP tooling improvements.

## 2. Feedback provided for each PR
Individual PR feedback was posted directly to each PR via `gh pr review`. Detailed feedback can be found in those comments. Key highlights include:
- Praising solid performance improvements, accessibility fixes (44px tap targets, missing alt tags), and architectural refactoring (extracting arbitrary tokens resolver).
- Flagging incomplete implementations, test failures, and misleading PR titles/descriptions.
- Catching scope creep (e.g., mixing CI runtime updates with documentation).
- Flagging repository pollution via agent state files.

## 3. CI status and failure guidance for each PR
- **PR 2015**: Passes all checks.
- **PR 2014**: Safe (Data Sync only, no checks).
- **PR 2013**: Passes all checks.
- **PR 2004**: Passes all checks.
- **PR 2003**: Passes all checks.
- **PR 2002**: Passes all checks.
- **PR 2001**: Passes all checks.
- **PR 2000**: Passes all checks.
- **PR 1999**: Passes all checks.
- **PR 1998**: Passes all checks.
- **PR 1997**: Passes all checks.
- **PR 1996**: Passes all checks.
- **PR 1993**: Passes all checks.
- **PR 1992**: Passes all checks.
- **PR 1991**: Passes all checks.
- **PR 1990**: `FAIL`. Build & E2E fail due to overlapping un-updated test configurations (expecting 19 vs 16 items). Must fix `tests/merch.spec.ts` or close in favor of 1927.
- **PR 1989**: Passes all checks.
- **PR 1988**: Passes all checks. (Note: Diff completely mismatches PR intent).
- **PR 1987**: Passes all checks. (Note: Description is inaccurate).
- **PR 1929**: Passes all checks.
- **PR 1927**: Passes all checks.
- **PR 1921**: `FAIL`. Build & E2E failing due to outdated tests. Superseded by 1927.
- **PR 1919**: Passes all checks.
- **PR 1918**: Passes all checks.
- **PR 1883**: `FAIL`. Deploy failed. Needs rebase to remove duplicate git diff chunks and deploy log investigation.
- **PR 1848**: `FAIL`. Deploy failed. Needs rebase and review of Python project scope.
- **PR 1791**: `FAIL`. Build & E2E failing due to outdated tests. Superseded by 1927.
- **PR 1754**: Passes checks but missing lint/test coverage on CI script edits.

## 4. UX concerns by PR
- **PR 2004 / 2001**: Solid accessibility improvements for hit areas and image parsing.
- **PR 2000**: Perfect execution of mobile horizontal scroll traps.
- **PR 1993 / 1990**: The potential uncaught promise rejection on 404s for `data.json` needs fixing before the preview dashboard can safely deploy.
- **PR 1989**: Beautiful execution of horizontal overflow fixes using `overflow-x: clip`.
- **PR 1921 / 1791 / 1927**: A lot of redundant work around the `/merch` UI layout. PR 1927 solves the DOM nesting issues and fixes the tests effectively.

## 5. Conflict or overlap notes
- **PR 1998 vs PR 1997**: Both attempt to draft the "coming soon" AI slop posts. PR 1997 is correct; PR 1998 mistakenly drafts a real post. PR 1997 should be merged, and PR 1998 abandoned.
- **PR 1993 vs PR 1990**: Both attempt to consolidate preview PRs and edit `dashboard.js`. One must be chosen and the other abandoned.
- **PR 1987 vs PR 1927 vs PR 1921 vs PR 1791**: These are all fighting over the `/merch` redesign, DOM nesting in `MerchImageDisplay`, and E2E test counts. 1927 is the most complete and correct resolution.
- **PR 1754**: Contains scope creep (modifying Node runtime checks alongside documentation).

## 6. Recommended merge order
1. **PR 2015, 2004, 2003, 2001, 2000, 1989** - High-value UI, accessibility, and layout fixes that are clean and pass all tests.
2. **PR 1919** (Lighthouse Performance) - Low risk, high value performance optimizations.
3. **PR 1997, 2014, 2013** - Safe content/data updates mapping AI slop and ETL jobs.
4. **PR 1992** (GitHub Actions refactoring) - Excellent CI cleanup.
5. **PR 1991** (Issue audit status) - Documentation tracking for UI issues.
6. **PR 2002** (Orchestrator Paths) - Fixes relative paths for the MCP server.
7. **PR 1929** (Jules DevTools deprecation) - Once the misleading title is fixed, this cleans up legacy agent code.
8. **PR 1927** (Merch Redesign / DOM nesting) - The definitive fix for the merch page overhaul and failing tests.
9. **PR 1918** (Optimize Boomtick MCP) - Once internal helpers are verified.
10. **PR 1993** (Consolidate previews) - Once the 404 Promise rejection is handled.

## 7. Recommended fix-before-merge items
- **PR 1999**: Restore the asymmetric column grids for `Home.tsx` rather than forcing a 50/50 layout.
- **PR 1993**: Fix the potential uncaught exception when `fetch('./data.json')` returns a 404.
- **PR 1988**: Revert the unrelated feature code and actually add the documentation promised in the title, or rename the PR to reflect the feature work.
- **PR 1929**: Rename PR to reflect deprecation rather than expansion of Jules.
- **PR 1883**: Rebase against main to resolve diff chunk duplication and investigate deploy failure.
- **PR 1848**: Rebase against main, investigate deploy failure, and consolidate Python logic into `dev-tools` instead of a new root project.
- **PR 1754**: Split the Node version CI logic away from the markdown storyboard.

## 8. Final merge / defer / abandon strategy
- **MERGE NOW**: 2015, 2014, 2013, 2004, 2003, 2002, 2001, 2000, 1997, 1989, 1919, 1992, 1991, 1927
- **MERGE AFTER FIXES**: 1999, 1993, 1929, 1918, 1883, 1848, 1754, 1988
- **ABANDON (Superseded/Redundant/Pollution)**:
  - 1998 (Superseded by 1997)
  - 1996 (Pollution)
  - 1990 (Superseded by 1993)
  - 1987 (Superseded by 1927)
  - 1921 (Superseded by 1927)
  - 1791 (Superseded by 1927)

# Merge Strategy

Based on the `td_cli.py gh conflicts` tool output, the following conflicts were identified:

1. **Conflict 1 (ci.yml):** PR 3284 vs PR 3289 in `.github/workflows/ci.yml`.
   *Strategy:* Merge PR 3289 (gitleaks update) first, as it's a minor security/deps bump, then rebase PR 3284 onto main and resolve the CI optimization changes.

2. **Conflict 2 (orchestrator.py):** PR 3243 vs PR 3288 in `boomtick-pkg/cli/dev_tools/orchestrator.py`.
   *Strategy:* Review the specific logic modifications in `orchestrator.py`. Recommend merging PR 3288 (Daemon fix) first if it's high priority, then adapting the self-review fix in PR 3243.

3. **Conflict 3 (definitions.ts):** PR 3277 vs PR 3286 in `boomtick-pkg/mcp/src/mcp/definitions.ts`.
   *Strategy:* Both are adding or modifying tool definitions. Merge the one introducing core capabilities first, then manually resolve the dictionary/list additions in the second.

4. **Conflict 4 (ai_service.py):** PR 3281 vs PR 3282 vs PR 3285 in `boomtick-pkg/cli/dev_tools/services/ai_service.py`.
   *Strategy:* All three touch AI standards/rules. PR 3285 focuses on standards and 3282 focuses on severity rules. We should consolidate these three PRs into a single branch (using `td_cli.py gh aggregate`), resolve the text conflicts manually to form a unified AI service ruleset, and merge that aggregate PR.

## General Merge Order:
1. Low-risk dependabot/chore updates (3289)
2. Standalone features/fixes with no conflicts (3287, 3280, etc.)
3. Priority bug fixes (3288)
4. Consolidated/Rebased conflict resolutions

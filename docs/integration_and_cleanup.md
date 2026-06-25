# Integration and Cleanup Steady State

This document tracks the final state of the `boomtick-mcp` and `dev-tools` decoupling migration.

## Tool Schema Validation

The following table summarizes the cross-validation between Zod schemas in `boomtick-mcp` and their Python implementations in `dev-tools`.

| Tool | Zod Input Schema | Python CLI / SDK Implementation | Status | Notes |
|------|------------------|--------------------------------|--------|-------|
| `github.search_open_prs` | `state`, `includeDrafts`, `maxResults`, `labels` | `gh search-prs --state`, `--limit`, `--include-drafts`, `--labels` | ✅ Matched | `maxResults` maps to `--limit` |
| `repo.read_ci_logs` | `prNumber` | `repo ci-logs <pr_number>` | ✅ Matched | |
| `repo.run_playwright` | `grep`, `worktreePath` | `repo run-playwright --grep`, `--worktree` | ✅ Matched | `worktreePath` maps to `--worktree` |
| `github.get_merge_conflict_files` | `prNumber`, `baseBranch` | `gh merge-conflicts <pr_number> --base` | ✅ Matched | |
| `github.get_pr_diff` | `prNumber` | `gh pr-diff <pr_number>` | ✅ Matched | |
| `repo.get_changed_files` | `base`, `head` | Native `git diff` | ✅ Intentional | Direct shell execution |
| `github.open_replacement_pr` | `originalPrNumber`, `repairBranch`, ... | Native `git push` + `gh pr create` | ✅ Intentional | Direct shell execution |
| `repo.run_tests` | `commands`, `timeoutSeconds`, `worktreePath` | Native `pnpm` commands | ✅ Intentional | Direct shell execution |
| `repo.run_lighthouse` | `route`, `worktreePath` | Native `pnpm lhci` | ✅ Intentional | Direct shell execution |
| `jules.*` | Various (ID, prompt, etc) | Native `fetch` to Jules API | ✅ Intentional | Direct API communication |

## Cleanup Tasks

- [x] **Remove `runSecureTool`**: All references removed and replaced with `runCommand`.
- [x] **Audit Dependencies**: `octokit` and `axios` confirmed absent. `node-fetch` removed in favor of native `fetch`.
- [x] **Standardize Agent Path**: `.agents/` is now the canonical configuration root.
- [x] **Self-Healing Scope**: `self-healing.yml` relationship documented.

## Verified Steady State

- MCP Server starts and lists all tools.
- Python stderr errors surface as clean MCP error responses.
- All tests pass in `boomtick-mcp`.

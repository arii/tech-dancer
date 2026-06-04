# Boomtick MCP Safety Rules

The MCP server has the potential to combine shell, git, and GitHub access. Treat every write-capable tool as privileged.

## Current defaults

- Server starts in read-only mode unless `BOOMTICK_WRITE_MODE=true`.
- Push behavior must remain disabled unless `BOOMTICK_PUSH_MODE=true`.
- `boomtick.health`, `repo.get_package_scripts`, and resources do not mutate state.
- `github.search_open_prs` calls `gh pr list` only.

## Hard rules for future tools

- Never auto-merge.
- Never delete branches automatically.
- Never expose tokens in logs.
- Never run arbitrary shell text from an agent.
- Use isolated git worktrees for branch operations.
- Refuse commits that include files outside an explicit allowlist.
- Open draft replacement PRs by default.

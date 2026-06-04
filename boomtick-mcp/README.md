# Boomtick MCP

Local Model Context Protocol (MCP) server for Boomtick PR rescue and merge-conflict workflows.

## MVP scope

The first milestone focuses on a safe read-only foundation:

- `boomtick.health` reports configuration without touching GitHub or running shell commands.
- `github.search_open_prs` lists candidate PRs with normalized branch, mergeability, and check status metadata.
- `repo.get_package_scripts` reads validation scripts from the configured repository.
- `repo://package-json` and `repo://design-tokens` expose read-only repository context.
- Workflow prompts are registered for scout, context, repair, verifier, and PR writer agents.

Write operations are intentionally disabled by default. Future repair, commit, PR creation, and comment tools must require explicit `BOOMTICK_WRITE_MODE=true` and/or `BOOMTICK_PUSH_MODE=true`.

## Requirements

- Node.js `>=22`
- pnpm `10.28.2`
- git
- GitHub CLI (`gh`) for GitHub-backed tools
- A GitHub token for PR discovery (`CODEX_GH_TOKEN`, `GITHUB_TOKEN`, or `GH_TOKEN`)

## Quickstart

```bash
cd boomtick-mcp
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

To run every registered MVP tool, resource, and prompt through a real MCP stdio client with deterministic mocked GitHub output:

```bash
pnpm verify:tools
```

## MCP Inspector

```bash
cd boomtick-mcp
pnpm build
npx @modelcontextprotocol/inspector node dist/index.js
```

Then call:

```text
boomtick.health
github.search_open_prs
repo.get_package_scripts
```

## Configuration

Copy `.env.example` into your shell or MCP client environment and adjust paths:

```bash
export GITHUB_OWNER=arii
export GITHUB_REPO=tech-dancer
export BOOMTICK_REPO_PATH=/workspace/tech-dancer
export DEFAULT_BASE_BRANCH=main
export VITE_BASE_PATH=/tech-dancer/
export CODEX_GH_TOKEN=<token>
```

Safety flags default to false:

```bash
export BOOMTICK_WRITE_MODE=false
export BOOMTICK_PUSH_MODE=false
```

## Safety model

- Default read-only mode.
- Shell execution goes through an allowlist.
- Token-shaped secrets are redacted from command output.
- GitHub PR discovery uses structured JSON output from `gh`.
- Future write tools should refuse to run unless their explicit mode flag is enabled.

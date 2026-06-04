# Boomtick MCP

Local Model Context Protocol server for Boomtick PR rescue workflows.

The MVP focuses on a **PR Rescue + Merge Conflict Agent** that can inspect GitHub PRs, gather repo context, run deterministic checks, and eventually create draft replacement PRs. The current scaffold is intentionally read-only by default and ships with a health tool plus the safe shell primitives that future GitHub/repo tools must reuse.

## Requirements

- Node.js 22+
- pnpm
- git
- gh
- jq
- Playwright browsers for browser validation tools

## Setup

```bash
cd boomtick-mcp
pnpm install --frozen-lockfile
pnpm build
```

Copy `.env.example` and fill in local values:

```bash
cp .env.example .env
```

Required environment variables:

```bash
GITHUB_TOKEN=
GITHUB_OWNER=arii
GITHUB_REPO=tech-dancer
BOOMTICK_REPO_PATH=/home/ari/code/tech-dancer
DEFAULT_BASE_BRANCH=main
```

Write actions are disabled unless explicitly enabled:

```bash
BOOMTICK_WRITE_MODE=false
BOOMTICK_PUSH_MODE=false
```

## Run with MCP Inspector

```bash
cd boomtick-mcp
pnpm build
npx @modelcontextprotocol/inspector node dist/index.js
```

Call `boomtick.health` to confirm the server responds with structured, non-secret configuration.

You can also verify every registered MCP tool from the command line:

```bash
pnpm run verify:tools
```

The verifier starts `dist/index.js`, lists registered tools through an MCP stdio client, calls each tool, validates the response shape, and prints the called tool list as JSON.

## Current tools

- `boomtick.health` — returns configured owner/repo, repo path, base branch, and safety mode without touching GitHub or the shell.
- `boomtick.echo` — simple structured echo tool for MCP Inspector smoke tests.

## Safety posture

- Read-only by default.
- `writeMode` and `pushMode` are separate gates.
- Shell execution must go through `src/lib/shell.ts`.
- Shell commands are allowlisted.
- GitHub-looking tokens are redacted from command output.
- Future branch, commit, PR, and comment tools should refuse to run unless their explicit mode gate is enabled.

## Next implementation milestones

See [`docs/tracking.md`](docs/tracking.md) for the phase checklist, including GitHub PR search, PR diff retrieval, isolated worktree conflict detection, validation tools, commit safety, draft replacement PR creation, and eval fixtures.

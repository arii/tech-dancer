# Boomtick MCP Testing

## Local checks

```bash
cd boomtick-mcp
pnpm install --frozen-lockfile
pnpm build
pnpm test
pnpm verify:tools
```

`pnpm verify:tools` starts the built MCP server over stdio, calls every registered MVP tool, reads every registered resource, and fetches every workflow prompt. It prepends a temporary mock `gh` executable to `PATH` so `github.search_open_prs` is verified deterministically without requiring live GitHub network/auth.

## MCP Inspector

```bash
cd boomtick-mcp
pnpm build
npx @modelcontextprotocol/inspector node dist/index.js
```

Verify that Inspector lists tools, resources, and prompts. Start with `boomtick.health` because it is side-effect-free.

## Future test layers

1. Unit tests for pure helpers (`result`, shell allowlist, secret redaction).
2. Tool contract tests for valid input, invalid input, empty results, permission failures, and timeouts.
3. Fixture repo integration tests for conflict detection and worktree cleanup.
4. End-to-end dry-run agent tests that never push branches, open PRs, or comment on GitHub.

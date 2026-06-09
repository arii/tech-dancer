# Boomtick MCP: PR Rescue + Merge Conflict Agent

A Model Context Protocol (MCP) server designed to empower AI agents with structured access to GitHub Pull Requests, repository state, CI logs, and validation tools.

## Features

### 🛠 Tools
- **Advanced Analysis**: Server-side PR similarity analysis and deterministic triage workflows.
- **GitHub Ops**: Checkout branches and detect merge conflicts (use official GitHub MCP for search/diff/comment).
- **Repo Ops**: Inspect changed files, extract package scripts, map application routes, and read CI logs.
- **Validation**: Isolated repair branch creation, and running verification suites (Tests, Lighthouse, Playwright).

### 📄 Resources
- `repo://package-json`: Root package manifest.
- `repo://routes`: Application route-to-content mapping.
- `repo://design-tokens`: UI design tokens.
- `repo://diff/{prNumber}`: PR diff text.
- `repo://pr-similarity`: Analysis of file overlaps between open PRs.
- `repo://pr-files/{number}`: List of changed files for a specific PR.
- `repo://ci/{prNumber}`: CI check results and logs.

### 🧠 Prompts
- `prompt://conflict-scout`: Scout for PRs needing rescue.
- `prompt://repo-context`: Gather context before repair.
- `prompt://repair-agent`: Apply minimal safe fixes.
- `prompt://verifier-agent`: Prove the repair works.
- `prompt://pr-writer`: Write professional replacement PR summaries.

## Safety First
- **Isolated Worktrees**: All repair and merge operations happen in temporary git worktrees to prevent mutating your local working directory.
- **Safe Shell**: All commands are restricted via an allowlist with automatic token redaction and timeouts.
- **Write Guards**: Mutating operations (commits, branch creation, PR opening) require explicit `writeMode: true` or `pushMode: true` flags.

## Setup

### Prerequisites
- Node.js >= 22
- pnpm >= 10
- GitHub CLI (`gh`) authenticated and in your PATH.

### Installation
```bash
cd boomtick-mcp
pnpm install
pnpm build
```

### Installation via MCP Client (e.g. Claude Desktop)
Add the following to your MCP client configuration (e.g. `claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "boomtick": {
      "command": "node",
      "args": ["/absolute/path/to/boomtick-mcp/dist/index.js"],
      "env": {
        "GITHUB_TOKEN": "your_pat",
        "GITHUB_OWNER": "arii",
        "GITHUB_REPO": "tech-dancer",
        "BOOMTICK_REPO_PATH": "/absolute/path/to/tech-dancer"
      }
    }
  }
}
```

### Configuration
Create a `.env` file in the `boomtick-mcp` directory:
```env
GITHUB_TOKEN=your_pat
GITHUB_OWNER=arii
GITHUB_REPO=tech-dancer
BOOMTICK_REPO_PATH=/path/to/tech-dancer
```

## Usage
Run the server via stdio:
```bash
node dist/index.js
```

## Release Process
1. Run tests: `pnpm test`
2. Run evals: `pnpm run run-evals`
3. Update version: `pnpm run release:patch` (or `minor`/`major`)
4. Build: `pnpm run build`
5. Push changes and tags.

## Future Roadmap

### ContentOps + Merch Compliance
- `content.validate_affiliate_disclosure`: Ensure Amazon mandatory wording is present.
- `content.check_trademark_risk`: Flag potential trademark issues in blog posts.
- `amazon.validate_affiliate_card`: Verify affiliate links and product names match media.

### UX Regression + Spec-Driven Redesign
- `ux.capture_screenshot`: Capture multi-viewport screenshots.
- `ux.compare_screenshots`: Detect visual regressions using Playwright.
- `ux.run_accessibility_check`: Automated Axe-core audits.

## Development
- **Build**: `pnpm run build`
- **Test**: `pnpm test`
- **Verify**: `pnpm run run-evals`

For detailed verification steps, see [docs/testing.md](./docs/testing.md).

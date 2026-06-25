# Agent Environment Setup & Configuration

This guide details how to bootstrap and configure the agent environment.

## 🧰 One-Step Agent Environment Bootstrap

Use `setup-agent.sh` to fully bootstrap a fresh agent or devcontainer environment.

```bash
./setup-agent.sh
```

This script installs and configures:
- **System tools**: `git`, `curl`, `jq`, `gh`, Python toolchain, Node.js prerequisites.
- **Node.js & pnpm**: Installs `pnpm` via Corepack and runs `pnpm install --frozen-lockfile`.
- **Python**: Installs Python dependencies for `dev-tools`.
- **Playwright**: Installs browser binaries and system dependencies (`npx playwright install --with-deps chromium`).
- **Git Remote**: Automatically configures the `origin` remote.
- **Agent Index**: Initializes `.agent-context.json` via `pnpm run agent:prime`.

## 🤖 Agent Context Freshness

The repository uses an automated indexing system (`.agent-context.json`) to provide agents with high-precision grounding without recursive filesystem crawling.

- **Content**: Contains the project manifest (`package.json`), design tokens, and active project configuration.
- **Automation**: Git hooks in `.githooks/` automatically refresh this file after `git pull`, `git merge`, or `git checkout`.
- **Manual Sync**: If you suspect the index is stale, run:
  ```bash
  pnpm run agent:prime
  ```

## 🔐 Required & Recommended Secrets

| Variable | Required? | Purpose |
|---|---|---|
| `GITHUB_TOKEN` | **Required** | Auth for GitHub CLI and PR audits. |
| `GITHUB_REPOSITORY` | Recommended | Ensures deterministic `origin` remote configuration (e.g., `owner/repo`). |
| `JULES_API_KEY` | Optional | Enables Jules cloud workflows. |
| `GEMINI_API_KEY` | Optional | Enables Gemini-backed audit and review workflows. |

### Secret Handling
- **CI / Agent Runners**: Store these as repository or organization secrets.
- **Local Development**: Export them in your shell before running setup:
  ```bash
  export GITHUB_TOKEN="your_token"
  export GITHUB_REPOSITORY="arii/tech-dancer"
  ```

## ⚙️ Setup Script Toggles

You can customize the `setup-agent.sh` behavior using environment variables:

- `SKIP_APT=1`: Skip OS package installation (useful if already provisioned).
- `SKIP_PLAYWRIGHT=1`: Skip Playwright browser installation.
- `SKIP_VALIDATION=1`: Skip post-install validation checks.
- `SKIP_REMOTE_CONFIG=1`: Skip automatic `origin` remote configuration.
- `PNPM_VERSION`: Override the default pnpm version (pinned to `10.28.2`).
- `NODE_MAJOR`: Override the Node.js major version (defaults to `22`).

## 🚀 Verification

After setup, verify your environment with:

```bash
python3 dev-tools/td_cli.py gh status-board
python3 dev-tools/td_cli.py gh conflicts
```

### Index Verification
Ensure the index is present and valid:
```bash
jq -e '.repo.name' .agent-context.json
```

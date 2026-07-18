# Agent Environment Setup & Configuration

This guide details how to bootstrap and configure the agent environment.

---

## 🧰 One-Step Agent Environment Bootstrap

```bash
./setup-agent.sh
```

This script installs and configures:

- System tools (`git`, `jq`, `gh`, `curl`)
- Node.js (pinned via `.node-version`) + pnpm (pinned via `package.json`)
- Python dependencies (`dev-tools/` package in editable mode)
- Playwright browsers
- Remote `origin` git configuration
- Git hooks (`.githooks/`) for automatic index freshness

---

## 🔑 Required Environment Variables

| Variable | Required | Purpose |
| :--- | :--- | :--- |
| `GITHUB_TOKEN` | **Required** | Auth for GitHub CLI and PR audits. |
| `GITHUB_REPOSITORY` | Recommended | Ensures deterministic `origin` remote configuration (e.g. `owner/repo`). |
| `JULES_API_KEY` | Optional | Enables Jules cloud workflows. |
| `GEMINI_API_KEY` | Optional | Enables Gemini-backed audit and review workflows. |

---

## 🗂️ Agent Context Freshness

`.agent-context.json` is the indexed snapshot of the repository consumed by
`boomtick-mcp` on every tool call. It contains:

- `file_tree` — repository structure, used for role gating in code review
- `cli_schema` — full `td-cli` command/flag reference, used by MCP tools
  to call `td-cli` correctly without guessing flags
- `package_json` — dependency and script metadata

**Automatic refresh** — the git hooks registered by `./setup-agent.sh` keep
the index current:

- `.githooks/post-checkout` — runs after `git checkout` or `git switch`
- `.githooks/post-merge` — runs after `git merge` or `git pull`

**Manual refresh:**

```bash
pnpm run agent:prime
```

Run this before any agent operation if the index may be stale (e.g. after
pulling changes without the hooks installed, or after modifying `src/`,
`content/`, or `boomtick-pkg/scripts/build-repo-context.py`).

If `.agent-context.json` is missing or stale, `boomtick-mcp` falls back to
raw filesystem calls, bypassing the index and significantly increasing token
usage across all review and audit operations.

---

## 🧬 Tool Hierarchy

After setup, all agent operations follow the three-tier tool hierarchy defined
in `.agents/AGENTS.md`:

1. **Tier 1: `boomtick-mcp`** — required first call; auto-injects
   `.agent-context.json` context on every operation
2. **Tier 2: `dev-tools/td-cli`** — fallback when MCP unavailable;
   read `cli_schema` from `.agent-context.json` before calling
3. **Tier 3: raw bash / `gh`** — last resort only

See `.agents/AGENTS.md` for the full tool mapping table.

---

## ✅ Post-Setup Verification

```bash
node --version                          # must match .node-version
pnpm --version                          # must be 10.28.2
td-cli doctor      # runtime contract check & lockfile/config consistency
gh auth status                          # GitHub CLI authentication
cat .agent-context.json | python3 -c \
  "import json,sys; d=json.load(sys.stdin); print('Index OK:', list(d.keys()))"
```

The last command confirms `.agent-context.json` is present and contains the
expected keys (`file_tree`, `cli_schema`, `package_json`).

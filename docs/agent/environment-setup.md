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

`.agent-context.json` is the lightweight submodule tracking and repository version manifest consumed by
`boomtick-mcp` on tool operations. It contains:

- `packageName` — root package name
- `updatedAt` — ISO timestamp of context generation
- `gitCommit` — current HEAD commit SHA
- `submodules` — active submodule commit pointers (e.g. `boomtick-pkg`)
- `version` — context schema version

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
`content/`, or `boomtick-pkg/cli/dev_tools/resources/build-repo-context.py`).

---

## 🧬 Tool Hierarchy

After setup, all agent operations follow the three-tier tool hierarchy defined
in `.agents/AGENTS.md`:

1. **Tier 1: `boomtick-mcp`** — required first call; auto-injects
   submodule tracking and version context on every operation
2. **Tier 2: `dev-tools/td-cli`** — fallback when MCP unavailable;
   query `boomtick-pkg/cli/dev_tools/cli-schema.json` or `td-cli schema <path>` before calling
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
expected keys (`packageName`, `updatedAt`, `gitCommit`, `submodules`, `version`).

# boomtick-pkg Migration Spec

## Summary

Restructure the tech-dancer monorepo so that `boomtick-mcp/` and `dev-tools/`
live under a single `boomtick-pkg/` directory — a self-contained, extractable
package unit that can be installed in any repo via `bash install.sh`. The
monorepo stays as-is; the restructure exercises all real packaging concerns
(entry points, non-hardcoded paths, importable resources) without multi-repo
complexity. Future extraction to `arii/boomtick` is then a single
`git subtree push --prefix=boomtick-pkg`.

## Background

From the Claude conversation (2026-06-25):

> "You're essentially doing a **local package install** within the monorepo,
> which exercises all the same packaging concerns without any multi-repo
> complexity."

> "Within the monorepo this lives at e.g. `boomtick-pkg/` alongside `src/`,
> `.github/`, etc. When you eventually extract, you just move that directory to
> its own repo — nothing else changes."

The coupling between `boomtick-mcp` and `dev-tools` is **subprocess-only**:
`boomtick-mcp/src/config.ts` resolves `BOOMTICK_REPO_PATH` and calls
`td_cli.py` via shell. No Python imports cross the boundary — this is the
loosest possible coupling and packages cleanly together.

---

## Target File Structure

```
tech-dancer/
├── boomtick-pkg/                      ← NEW: single extractable unit
│   ├── cli/                           ← renamed from dev-tools/
│   │   ├── dev_tools/                 ← renamed from flat files → proper Python package
│   │   │   ├── __init__.py            ← NEW
│   │   │   ├── td_cli.py
│   │   │   ├── cli-schema.json        ← package_data (loaded via importlib.resources)
│   │   │   ├── config.json
│   │   │   ├── ai_reviewer.py
│   │   │   ├── repo_utils.py
│   │   │   ├── repair.py
│   │   │   ├── error_rag.py
│   │   │   ├── scope_check.py
│   │   │   ├── pr_overlap.py
│   │   │   ├── jules_feedback_loop.py
│   │   │   ├── review_read_pass.py
│   │   │   ├── collect_ai_reviews.py
│   │   │   └── dev_tools_sdk/
│   │   ├── pyproject.toml             ← updated: entry point + package_data
│   │   └── README.md
│   ├── mcp/                           ← renamed from boomtick-mcp/
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── config.ts              ← fix BOOMTICK_REPO_PATH default + import.meta.url
│   │   │   ├── tools/
│   │   │   ├── lib/
│   │   │   └── mcp/
│   │   ├── actions/                   ← NEW: composite GitHub Actions
│   │   │   ├── setup/
│   │   │   │   └── action.yml
│   │   │   ├── ci-validate/
│   │   │   │   └── action.yml
│   │   │   └── ai-review/
│   │   │       └── action.yml
│   │   ├── package.json               ← update name, engines already set
│   │   ├── tsconfig.json
│   │   └── vitest.config.ts
│   ├── AGENTS.md                      ← agent context for the package
│   ├── .agents/                       ← skills + rules travel with the package
│   ├── install.sh                     ← single entry point (from Claude artifact)
│   ├── workspace.json                 ← package identity + defaults (from Claude artifact)
│   ├── workspace-schema.json          ← JSON Schema validation (from Claude artifact)
│   └── .env.example                   ← required + optional env vars
│
├── project_config.json                ← repo-specific overrides (stays at root)
├── src/                               ← web app — untouched
├── .github/
│   └── workflows/                     ← slimmed to thin triggers only
│       ├── ci.yml                     ← calls ./boomtick-pkg/mcp/actions/...
│       ├── ai-chatops.yml
│       └── self-healing.yml
├── pnpm-workspace.yaml                ← update path: boomtick-mcp → boomtick-pkg/mcp
├── setup-agent.sh                     ← update dev-tools/ refs → boomtick-pkg/cli/
└── package.json                       ← update repair-context + agent:prime scripts
```

---

## Migration Steps

### Step 1 — Create `boomtick-pkg/` skeleton

```bash
mkdir -p tech-dancer/boomtick-pkg/{cli/dev_tools,mcp/actions/{setup,ci-validate,ai-review}}
```

Place the Claude-generated files:
```bash
cp files/install.sh          boomtick-pkg/
cp files/workspace.json      boomtick-pkg/
cp files/workspace-schema.json boomtick-pkg/
cp files/project_config.json boomtick-pkg/   # package-level defaults (NOT root)
```

> **Note:** `project_config.json` at the *root* of tech-dancer is the
> repo-specific override. The one inside `boomtick-pkg/` holds package
> defaults only. Keep them separate.

---

### Step 2 — Move `dev-tools/` → `boomtick-pkg/cli/`

```bash
# Move all contents
git mv dev-tools/* boomtick-pkg/cli/
git mv dev-tools/.* boomtick-pkg/cli/ 2>/dev/null || true
rmdir dev-tools
```

Then restructure flat `.py` files into a proper Python package:

```bash
mkdir -p boomtick-pkg/cli/dev_tools
# Move all .py files into the package subdir
git mv boomtick-pkg/cli/*.py boomtick-pkg/cli/dev_tools/
git mv boomtick-pkg/cli/cli-schema.json boomtick-pkg/cli/dev_tools/
git mv boomtick-pkg/cli/config.json boomtick-pkg/cli/dev_tools/
git mv boomtick-pkg/cli/dev_tools_sdk boomtick-pkg/cli/dev_tools/dev_tools_sdk
touch boomtick-pkg/cli/dev_tools/__init__.py
```

---

### Step 3 — Update `cli/pyproject.toml`

The key changes: add `[project.scripts]`, fix `package_data`, set proper `name`.

```toml
[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"

[project]
name = "boomtick-cli"
version = "0.1.0"
description = "BoomTick CLI — agentic dev-tools for GitHub + AI workflows"
requires-python = ">=3.8"
dependencies = [
    "requests>=2.0.0",
    "google-genai",
    "python-dotenv",
    "pydantic",
    "click",
    "PyGithub",
    "semgrep",
    "chromadb>=1.5.9",
    "sentence-transformers>=5.6.0"
]

[project.scripts]
td = "dev_tools.td_cli:main"        # `td gh status-board` etc.
td-cli = "dev_tools.td_cli:main"    # backward compat alias

[tool.setuptools.packages.find]
where = ["."]
include = ["dev_tools*"]

[tool.setuptools.package-data]
"dev_tools" = ["cli-schema.json", "config.json", "project_config.json", "*.json"]
```

---

### Step 4 — Fix hardcoded path loading in Python (the one that breaks first)

Any file that does `open("dev-tools/cli-schema.json")` or similar must become:

```python
# BEFORE (breaks when installed anywhere)
import json, os
schema = json.load(open(os.path.join(os.path.dirname(__file__), "../cli-schema.json")))

# AFTER (works from any install location)
from importlib.resources import files
schema = json.loads(files("dev_tools").joinpath("cli-schema.json").read_text())
```

Apply to all files that load `cli-schema.json`, `config.json`, or `project_config.json`:
- `td_cli.py`
- `repo_utils.py`
- `ai_reviewer.py`
- Any other file using relative JSON paths

---

### Step 5 — Move `boomtick-mcp/` → `boomtick-pkg/mcp/`

```bash
git mv boomtick-mcp boomtick-pkg/mcp
```

Update `mcp/package.json` name:
```json
{
  "name": "@boomtick/mcp",
  "version": "0.1.0",
  "engines": {
    "node": "24.x",
    "pnpm": "10.28.2"
  }
}
```

---

### Step 6 — Fix TypeScript path references in `mcp/src/config.ts`

```typescript
// BEFORE — assumes boomtick-mcp is 3 levels deep in tech-dancer
repoPath: process.env.BOOMTICK_REPO_PATH || path.resolve(__dirname, "../../../"),

// AFTER — boomtick-pkg/mcp is now one more level deep, but use import.meta.url
// for ESM safety and self-relative resolution
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

repoPath: process.env.BOOMTICK_REPO_PATH || path.resolve(__dirname, "../../../../"),
```

Also audit for any `__dirname`-relative JSON loading in `mcp/src/`:
```typescript
// BEFORE
const config = path.join(__dirname, '../config.json')

// AFTER (ESM-safe)
const config = new URL('../config.json', import.meta.url)
```

---

### Step 7 — Add `boomtick-pkg/mcp/actions/` composite GitHub Actions

**`mcp/actions/setup/action.yml`** — canonical install step used by all workflows:
```yaml
name: BoomTick Setup
description: Installs td CLI and builds MCP server
runs:
  using: composite
  steps:
    - name: Install td CLI
      run: pip install -e ./boomtick-pkg/cli --break-system-packages
      shell: bash
    - name: Build MCP server
      run: pnpm --filter ./boomtick-pkg/mcp build
      shell: bash
    - name: Verify td CLI
      run: td doctor
      shell: bash
```

**`mcp/actions/ci-validate/action.yml`**:
```yaml
name: BoomTick CI Validate
description: Runs pre-submit checks via td CLI
runs:
  using: composite
  steps:
    - uses: ./boomtick-pkg/mcp/actions/setup
    - name: Pre-submit gate
      run: td gh pre-submit
      shell: bash
```

**`mcp/actions/ai-review/action.yml`**:
```yaml
name: BoomTick AI Review
description: Runs AI code review via td CLI
inputs:
  pr_number:
    description: PR number to review
    required: true
runs:
  using: composite
  steps:
    - uses: ./boomtick-pkg/mcp/actions/setup
    - name: AI review
      run: td gh audit-pr ${{ inputs.pr_number }} --fetch --audit
      shell: bash
```

When the package is eventually extracted to `arii/boomtick`, the `uses:` path
changes from `./boomtick-pkg/mcp/actions/setup` to
`arii/boomtick/boomtick-pkg/mcp/actions/setup@main` — nothing else changes.

---

### Step 8 — Slim `.github/workflows/` to thin triggers

**Principle from Claude:**
> "The workflow is just an event trigger + environment setup, not where logic
> lives. The flow becomes: GitHub event → thin `.github/workflows/` YAML →
> composite action → `td` subcommand → Python/MCP logic."

**`ci.yml` before** (inline logic, 150+ lines):
```yaml
jobs:
  validate:
    steps:
      - run: python3 dev-tools/td_cli.py gh pre-submit ...
      # ... many inline steps
```

**`ci.yml` after** (~20 lines):
```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .node-version
      - uses: ./boomtick-pkg/mcp/actions/ci-validate
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Apply same pattern to `ai-chatops.yml` and `self-healing.yml`.

---

### Step 9 — Update `pnpm-workspace.yaml`

```yaml
# BEFORE
packages:
  - "."
  - "boomtick-mcp"

# AFTER
packages:
  - "."
  - "boomtick-pkg/mcp"
```

---

### Step 10 — Update `setup-agent.sh`

```bash
# BEFORE
if [ -f "dev-tools/pyproject.toml" ]; then
    (cd "${REPO_ROOT}/dev-tools" && pip install --editable .)
fi
[ -f "dev-tools/td_cli.py" ] && python3 dev-tools/td_cli.py gh --help

# AFTER
if [ -f "boomtick-pkg/cli/pyproject.toml" ]; then
    (cd "${REPO_ROOT}/boomtick-pkg" && bash install.sh --no-mcp)
fi
command -v td && td gh --help > /dev/null
```

---

### Step 11 — Update root `package.json` scripts

```json
{
  "scripts": {
    "repair-context": "PYTHONPATH=$PYTHONPATH:boomtick-pkg/cli python3 boomtick-pkg/cli/dev_tools/td_cli.py repair-context",
    "agent:prime": "python3 scripts/build-repo-context.py > .agent-context.json"
  }
}
```

> **Better long-term:** Once `td` is installed, `repair-context` becomes just
> `td repair-context` and removes the `PYTHONPATH` hack.

---

### Step 12 — Update `~/.gemini/config/mcp_config.json`

```json
{
  "mcpServers": {
    "browser-mcp": {
      "command": "/home/ari/tech-dancer/boomtick-pkg/mcp/start_browsermcp.sh",
      "args": [],
      "env": {}
    },
    "boomtick-mcp": {
      "command": "node",
      "args": ["/home/ari/tech-dancer/boomtick-pkg/mcp/dist/index.js"],
      "env": {
        "GITHUB_TOKEN": "...",
        "GITHUB_OWNER": "arii",
        "GITHUB_REPO": "tech-dancer",
        "BOOMTICK_REPO_PATH": "/home/ari/tech-dancer"
      }
    }
  }
}
```

---

### Step 13 — Move Claude artifacts into place

```bash
# Already in files/ — move to final locations
cp files/workspace.json        boomtick-pkg/
cp files/workspace-schema.json boomtick-pkg/
cp files/install.sh            boomtick-pkg/
# project_config.json: boomtick-pkg/ version = package defaults
# root project_config.json    = tech-dancer repo overrides (stays at root)
```

Create `.env.example` in `boomtick-pkg/`:
```bash
# Required
GITHUB_TOKEN=

# Optional — for AI review features
GEMINI_API_KEY=
OPENAI_API_KEY=
GOOGLE_JULES_API_KEY=

# Set automatically by install.sh or mcp_config.json
# BOOMTICK_REPO_PATH=
```

---

### Step 14 — Rebuild and verify

```bash
# 1. Install td CLI from new location
cd boomtick-pkg && bash install.sh

# 2. Verify td works
td doctor
td gh --help

# 3. Rebuild MCP
pnpm --filter ./boomtick-pkg/mcp build

# 4. Run existing tests
pnpm --filter ./boomtick-pkg/mcp test
pnpm test  # root vitest

# 5. Verify AGENTS.md / agent context
pnpm run agent:prime
```

---

## Files Changed Summary

| File | Change |
|------|--------|
| `dev-tools/` | Moved → `boomtick-pkg/cli/` |
| `dev-tools/*.py` | Moved → `boomtick-pkg/cli/dev_tools/*.py` |
| `boomtick-mcp/` | Moved → `boomtick-pkg/mcp/` |
| `boomtick-pkg/cli/pyproject.toml` | Add `[project.scripts]`, fix `package_data` |
| `boomtick-pkg/mcp/src/config.ts` | Fix `BOOMTICK_REPO_PATH` default depth + `import.meta.url` |
| `boomtick-pkg/mcp/package.json` | Rename to `@boomtick/mcp` |
| `boomtick-pkg/mcp/actions/` | NEW — composite GitHub Actions |
| `.github/workflows/ci.yml` | Slim to ~20 lines, call composite actions |
| `.github/workflows/ai-chatops.yml` | Slim, call composite actions |
| `.github/workflows/self-healing.yml` | Slim, call composite actions |
| `pnpm-workspace.yaml` | `boomtick-mcp` → `boomtick-pkg/mcp` |
| `setup-agent.sh` | `dev-tools/` refs → `boomtick-pkg/cli/` |
| `package.json` | Update `repair-context` script path |
| `~/.gemini/config/mcp_config.json` | Absolute paths updated |
| `boomtick-pkg/workspace.json` | NEW (from Claude) |
| `boomtick-pkg/workspace-schema.json` | NEW (from Claude) |
| `boomtick-pkg/install.sh` | NEW (from Claude) |
| `boomtick-pkg/.env.example` | NEW |
| `boomtick-pkg/AGENTS.md` | Copy from root (package travels with its context) |
| `boomtick-pkg/.agents/` | Copy from root |
| `project_config.json` (root) | Stays — repo-specific overrides |

---

## Definition of Done

- [ ] `bash boomtick-pkg/install.sh` runs cleanly from scratch
- [ ] `td doctor` passes after install
- [ ] `td gh status-board` returns results (GitHub connectivity verified)
- [ ] `pnpm --filter ./boomtick-pkg/mcp build` succeeds
- [ ] MCP server starts: `node boomtick-pkg/mcp/dist/index.js`
- [ ] Antigravity CLI connects to boomtick-mcp with new paths
- [ ] `pnpm test` (root) passes
- [ ] CI green on a test PR
- [ ] No `dev-tools/` or `boomtick-mcp/` references remain at repo root
- [ ] Future extraction: `git subtree push --prefix=boomtick-pkg https://github.com/arii/boomtick main` works

---

## Future: Extraction to `arii/boomtick`

Once all of the above is done, extraction is a single command:

```bash
git subtree push --prefix=boomtick-pkg https://github.com/arii/boomtick main
```

Other repos then consume it via:
```bash
# Install as a subtree in another repo
git subtree add --prefix=boomtick-pkg https://github.com/arii/boomtick main --squash
cd boomtick-pkg && bash install.sh

# Pull updates later
git subtree pull --prefix=boomtick-pkg https://github.com/arii/boomtick main --squash
```

Workflow `uses:` paths change from:
```yaml
uses: ./boomtick-pkg/mcp/actions/setup
```
to:
```yaml
uses: arii/boomtick/boomtick-pkg/mcp/actions/setup@main
```

No other code changes needed.


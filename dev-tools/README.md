# Dev Tools & Workflows

This directory contains repository automation scripts and quality gate configurations.

> [!IMPORTANT]
> The Repository CLI requires the `PyGithub` Python library. Install it with: `pip install PyGithub`.
> It also requires the `gh` CLI to be authenticated for many operations.


## 🧰 One-Step Agent Environment Bootstrap

Use `dev-tools/setup-agent.sh` to fully bootstrap a fresh agent/devcontainer environment in one command.

```bash
./dev-tools/setup-agent.sh
```

This script installs and configures:
- System tools needed by dev-tools (`git`, `curl`, `jq`, `gh`, Python toolchain, Node prerequisites).
- `pnpm` via Corepack (or fallback global install), then project dependencies via `pnpm install --frozen-lockfile`.
- Python dependencies for `dev-tools` (`pip install -e ./dev-tools`) and ETL (`etl/requirements.txt` when present).
- Playwright CLI browser/runtime dependencies (`npx playwright install --with-deps chromium`).
- Git remote origin (if missing) using `GITHUB_REPOSITORY` or a best-effort repo slug guess.

> [!NOTE]
> For deterministic remote configuration, set `GITHUB_REPOSITORY=<owner>/<repo>` before running the script in brand-new clones.

> [!TIP]
> In CI or secure agent environments, prefer injecting secrets as environment variables rather than hardcoding them.

### Required / Recommended Environment Variables & Secrets

| Variable | Required? | Purpose |
|---|---|---|
| `CODEX_GH_TOKEN` | **Recommended (preferred)** | Primary secret for Codex/Jules agent runs; setup maps it to `GH_TOKEN`/`GITHUB_TOKEN` for `gh` + dev-tools commands. |
| `GITHUB_TOKEN` or `GH_TOKEN` | Required if `CODEX_GH_TOKEN` is not set | Auth for `gh` and `td_cli.py gh ...` commands (PR audits, comments, variables, status checks). |
| `GITHUB_REPOSITORY` (`owner/repo`) | Recommended | Ensures deterministic `origin` remote auto-configuration when missing. |
| `JULES_API_KEY` | Optional | Enables `td_cli.py jules ...` cloud workflows. |
| `GEMINI_API_KEY` | Optional | Enables Gemini-backed review/audit workflows. |
| `OLLAMA_URL` | Optional | Override local Ollama endpoint (default shown by `snapshot.sh`). |
| `OLLAMA_MODEL` | Optional | Override local Ollama model selection. |

**Secret handling guidance**
- GitHub Actions / agent runners: store `CODEX_GH_TOKEN` (preferred), plus `JULES_API_KEY` and `GEMINI_API_KEY` in repository or org Secrets.
- Dev containers/local shells: export secrets before running setup/CLI, for example:

```bash
export CODEX_GH_TOKEN="<token>"
export GITHUB_REPOSITORY="owner/repo"
# optional
export JULES_API_KEY="<key>"
export GEMINI_API_KEY="<key>"
```


### Setup Script Toggles

`dev-tools/setup-agent.sh` supports optional environment toggles:

- `SKIP_APT=1` — skip OS package installation.
- `SKIP_PLAYWRIGHT=1` — skip Playwright browser installation.
- `SKIP_VALIDATION=1` — skip post-install validation checks.
- `SKIP_REMOTE_CONFIG=1` — skip `origin` remote auto-configuration.
- `PNPM_VERSION` — override pnpm version (default `10.28.2`).
- `NODE_MAJOR` — override Node major used for apt installation (default `22`).


### Non-Traditional Workflows (Deploy, Jules, Ollama)

After `./dev-tools/setup-agent.sh`, use the following workflow-specific setup:

#### 1) Deploy / GitHub Automation Workflows
- Ensure GitHub auth is present in env: `GITHUB_TOKEN` or `GH_TOKEN`.
- Verify CLI auth and repo context:
  - `gh auth status`
  - `gh repo view`
- Pre-submit quality gate before push/merge:
  - `python3 dev-tools/td_cli.py gh pre-submit`

#### 2) Jules Workflows
- Required secret: `JULES_API_KEY`.
- Optional context env vars:
  - `JULES_SOURCE_ID` (if your environment already knows the source mapping)
- Typical commands:
  - `python3 dev-tools/td_cli.py jules repair`
  - `python3 dev-tools/td_cli.py jules repair --worktree`

#### 3) Ollama Local Review Workflows
- Optional local runtime vars:
  - `OLLAMA_URL` (default used by tooling: `http://localhost:11434/api/generate`)
  - `OLLAMA_MODEL` (example: `qwen2.5-coder:7b`)
- Verify local service before running Ollama-backed flows:
  - `curl -fsS "$OLLAMA_URL" || true` (endpoint behavior varies by Ollama version)
- Typical command:
  - `python3 dev-tools/td_cli.py gh audit-pr <PR_NUMBER> --fetch --audit`

#### 4) Headless / Bot Auditing
- For batch auditing open PRs:
  - `bash dev-tools/audit_headless.sh`
- Ensure `jq`, `gh`, Python deps, and pnpm deps are installed (handled by setup script).

## 🚀 Repository CLI (`td_cli.py`)

The unified entry point for all repository automation. It supports both human-readable terminal output and structured JSON for tool integration.

### Global Options
- `--json`: Output results in structured JSON format.

### Standard Error Format (with `--json`)
```json
{
  "status": "error",
  "message": "Description of the error",
  "code": 401,
  "data": null
}
```

### Commands

#### `gh pre-submit`
Runs the full local quality suite: Anti-pattern audit, TypeScript check, Lint, PR Scope check, and Conflict check.
- **Usage**: `python3 dev-tools/td_cli.py gh pre-submit`

#### `gh audit-pr <PR_NUMBER>`
Orchestrates the PR technical audit lifecycle.
- **Flags**:
  - `--fetch`: Fetch PR metadata and generate context files.
  - `--audit`: Run deterministic checks and invoke AI auditor.
  - `--submit`: Submit the completed review to GitHub (requires `--execute`).
  - `--cleanup`: Remove temporary review files on success.
- **Usage**: `python3 dev-tools/td_cli.py gh audit-pr 368 --fetch --audit`

#### `gh validate-issue <ISSUE_NUMBER>`
Validates GitHub Issues against repo standards.
- **Flags**:
  - `--all-open`: Check all open issues.
  - `--post-comments`: Post findings as comments to the issue (requires `--execute`).
- **Usage**: `python3 dev-tools/td_cli.py gh validate-issue --issue-number 247`

#### `gh conflicts`
Detects potential merge conflicts across all open PRs.
- **Flags**:
  - `--pr <PR_NUMBER>`: Check a specific PR against all other open PRs.
- **Usage**: `python3 dev-tools/td_cli.py gh conflicts`

#### `jules repair-context`
Generates a high-precision prompt for fixing a specific CI error. It maps the error signature to a strategy and provides deterministic code context (±15 lines).
- **Flags**:
  - `--log <LOG_LINE>`: Process a single raw log line.
  - `--file <FILE_PATH>`: Process all errors in a log file.
- **Usage**:
  - `pnpm repair-context --log "/app/src/App.tsx:10:5: 'unused' is defined but never used. [no-unused-vars]"`
  - `python3 dev-tools/td_cli.py jules repair-context --file logs/ci_failure.log`

#### `gh ratchet-any` / `gh bundle-size`
CI gates for tracking technical debt. These commands compare current metrics against baselines stored in GitHub Actions Variables (`ANY_COUNT_BASELINE`, `BUNDLE_BASELINE_KB`).
- **Usage**: `python3 dev-tools/td_cli.py gh bundle-size`

---

## 🧪 Quality Gates

- **UI Anti-Patterns**: Centralized in `scripts/detect-antipatterns.mjs` (includes inverse-surface contrast checks for `Text` near `industrial-gradient` treatments).
- **Type Safety**: TypeScript `any` usage ratchet (enforced in CI).
- **Bundle Size**: Automated size regression tracking (enforced in CI).

## 🧱 Design System Enforcement

All code must adhere to the rules in `AGENTS.md`. Layout primitives in `src/layouts/` must be used for all UI composition.

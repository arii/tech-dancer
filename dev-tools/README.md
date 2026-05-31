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
| `CODEX_GH_TOKEN` (string) | **Recommended (preferred)** | Primary secret for Codex/Jules/Antigravity agent runs; setup maps it to `GH_TOKEN` for `gh` + dev-tools commands. |
| `GH_TOKEN` (string) | Required if `CODEX_GH_TOKEN` is not set | Auth for `gh` and `td_cli.py gh ...` commands (PR audits, comments, variables, status checks). |
| `GITHUB_REPOSITORY` (`owner/repo`) | Recommended | Ensures deterministic `origin` remote auto-configuration when missing (or falls back to an existing non-origin remote URL). |
| `ANTIGRAVITY_API_KEY` / `JULES_API_KEY` | Optional | Enables `td_cli.py antigravity ...` / `td_cli.py jules ...` cloud workflows. |
| `GEMINI_API_KEY` | Optional | Enables Gemini-backed review/audit workflows. |
| `OLLAMA_URL` | Optional | Override local Ollama endpoint (default shown by `snapshot.sh`). |
| `OLLAMA_MODEL` | Optional | Override local Ollama model selection. |

**Secret handling guidance**
- GitHub Actions / agent runners: store `CODEX_GH_TOKEN` (preferred), plus `ANTIGRAVITY_API_KEY` / `JULES_API_KEY` and `GEMINI_API_KEY` in repository or org Secrets.
- Dev containers/local shells: export secrets before running setup/CLI, for example:

```bash
export CODEX_GH_TOKEN="<token>"
export GITHUB_REPOSITORY="owner/repo"
# optional
export ANTIGRAVITY_API_KEY="<key>"
export GEMINI_API_KEY="<key>"
```


### Setup Script Toggles

`dev-tools/setup-agent.sh` supports optional environment toggles:

- `SKIP_APT=1` — skip OS package installation.
- `SKIP_PLAYWRIGHT=1` — skip Playwright browser installation.
- `SKIP_VALIDATION=1` — skip post-install validation checks.
- `SKIP_REMOTE_CONFIG=1` — skip `origin` remote auto-configuration.
- `PNPM_VERSION` — override pnpm version (default `10.28.2`).
- `NODE_MAJOR` — override Node major used for apt installation (defaults to `22`).


### Non-Traditional Workflows (Deploy, Antigravity, Jules, Ollama)

After `./dev-tools/setup-agent.sh`, use the following workflow-specific setup:

#### 1) Deploy / GitHub Automation Workflows
- Ensure GitHub auth is present in env: `GITHUB_TOKEN` or `GH_TOKEN`.
- Verify CLI auth and repo context:
  - `gh auth status`
  - `gh repo view`
- Pre-submit quality gate before push/merge:
  - `python3 dev-tools/td_cli.py gh pre-submit`

#### 2) Antigravity / Jules Workflows
- Required secret: `ANTIGRAVITY_API_KEY` or `JULES_API_KEY`.
- Optional context env vars:
  - `ANTIGRAVITY_SOURCE_ID` or `JULES_SOURCE_ID` (if your environment already knows the source mapping)
- Typical commands:
  - `python3 dev-tools/td_cli.py antigravity repair`
  - `python3 dev-tools/td_cli.py antigravity repair --worktree`

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


### Codex / Jules GitHub Command Pattern

Prefer repository CLI commands over raw `gh`:

```bash
source ./.agent-env.sh 2>/dev/null || true
python3 dev-tools/td_cli.py gh --help
python3 dev-tools/td_cli.py gh <repo-command>
```

Use raw `gh` only when `td_cli.py` does not expose the needed operation.

If auth fails, do not run `gh auth login`. Instead, set a Codex secret named `CODEX_GH_TOKEN`.


### Verification Commands (Post-Setup)

Run these commands after setup to verify GitHub/dev-tools workflows:

```bash
source ./.agent-env.sh 2>/dev/null || true
python3 dev-tools/td_cli.py gh --help
python3 dev-tools/td_cli.py gh status-board
python3 dev-tools/td_cli.py gh conflicts
```

For PR review flow (example PR number):

```bash
source ./.agent-env.sh 2>/dev/null || true
python3 dev-tools/td_cli.py gh audit-pr 123 --fetch --audit
```

For issue workflow checks:

```bash
source ./.agent-env.sh 2>/dev/null || true
python3 dev-tools/td_cli.py gh validate-issue --issue-number 123
```

If you need to create an issue and the repo CLI does not expose that operation directly, use raw `gh` as fallback:

```bash
gh issue create --title "<title>" --body "<details>"
```

If auth fails, report this exact issue (do not run interactive auth):

> GitHub CLI is not authenticated. Please add a Codex environment secret named `CODEX_GH_TOKEN` with a repo-scoped GitHub token.

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

#### `gh audit-mobile`
Runs a real Chromium browser at 360px and 390px mobile widths, captures full-page screenshots, and fails when the page is missing mobile viewport metadata, visible content extends outside the viewport, or content exceeds an unclipped container. Findings include the affected route, viewport width, selector, and measured overflow so review comments can recommend a specific fix.
- **Flags**:
  - `--url <BASE_URL>`: Required deployed or local URL to inspect.
  - `--route <PATH>`: Route to inspect. Repeat this flag for multiple routes; defaults to `/`.
  - `--output-dir <PATH>`: Directory for `report.json` and screenshots; defaults to `test-results/mobile-ux-audit`.
- **Setup**: Run `pnpm run setup:playwright` once when Chromium is not already provisioned by the environment.
- **Usage**:

  ```bash
  python3 dev-tools/td_cli.py gh audit-mobile --url http://localhost:4173 --route / --route /blog
  python3 dev-tools/td_cli.py gh audit-pr 368 --fetch --audit --mobile-url http://localhost:4173 --mobile-route /blog
  ```

Run this audit for perceptible web-application changes and include its overflow findings in PR feedback. The screenshot artifacts are intentionally written beneath `test-results/`, which is ignored by Git.

#### `gh comment-pr <PR_NUMBER>`
Posts a Markdown comment directly to the PR conversation. The command is safe by default: it previews the action unless `--execute` is provided.
- **Flags**:
  - `--body "<MARKDOWN>"`: Post a short inline Markdown comment.
  - `--body-file <PATH>`: Read a multi-line Markdown comment from a file.
  - `--body-file -`: Read Markdown from stdin, which is convenient for generated review comments.
  - `--execute`: Post the comment to GitHub. Without this flag, the command performs a dry run.
- **Usage**:

  ```bash
  python3 dev-tools/td_cli.py gh comment-pr 368 --body-file review.md
  python3 dev-tools/td_cli.py gh comment-pr 368 --body-file review.md --execute
  cat review.md | python3 dev-tools/td_cli.py gh comment-pr 368 --body-file - --execute
  ```

Use `gh comment-pr` for a normal PR conversation comment. Use `gh audit-pr <PR_NUMBER> --submit --execute` when you need the structured review event and optional inline diff comments from `pr-review-<PR_NUMBER>.md`.

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

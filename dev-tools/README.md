# Dev Tools & Workflows

This directory contains repository automation scripts and quality gate configurations.

> [!IMPORTANT]
> The Repository CLI requires the `PyGithub` Python library. Install it with: `pip install PyGithub`.
> It also requires the `gh` CLI to be authenticated for many operations.

## 🤖 Agent Context Index

The repository maintains an automated index in `.agent-context.json` for agent grounding.
- **Freshness**: Updated automatically via `.githooks/update-env.sh` on merge and branch checkout.
- **Manual Update**: Run `pnpm run agent:prime` to refresh the index manually.

## 🧰 One-Step Agent Environment Bootstrap

Use the root-level `./setup-agent.sh` to fully bootstrap a fresh environment in one command.

```bash
./setup-agent.sh
```

This script (symlinked to `dev-tools/setup-agent.sh`) handles system tools, Node/pnpm activation, Python dependencies, Playwright provisioning, and runtime verification (`pnpm run doctor`).

### Required / Recommended Environment Variables & Secrets

| Variable | Required? | Purpose |
|---|---|---|
| `GITHUB_TOKEN` (string) | **Required** | Auth for `gh` and `td_cli.py gh ...` commands (PR audits, comments, variables, status checks). Standard for GH Actions. |
| `GITHUB_REPOSITORY` (`owner/repo`) | Recommended | Ensures deterministic `origin` remote auto-configuration when missing (or falls back to an existing non-origin remote URL). |
| `JULES_API_KEY` | Optional | Enables `td_cli.py jules ...` cloud workflows. |

**Secret handling guidance**
- GitHub Actions / agent runners: store `GITHUB_TOKEN`, plus `JULES_API_KEY` and `GEMINI_API_KEY` in repository or org Secrets.
- Dev containers/local shells: export secrets before running setup/CLI, for example:

```bash
export GITHUB_TOKEN="<token>"
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
- `NODE_MAJOR` — override Node major used for apt installation (defaults to `22`).


### Non-Traditional Workflows (Deploy, Jules)

After `./dev-tools/setup-agent.sh`, use the following workflow-specific setup:

#### 1) Deploy / GitHub Automation Workflows
- Ensure GitHub auth is present in env: `GITHUB_TOKEN`.
- Verify CLI auth and repo context:
  - `gh auth status`
  - `gh repo view`
- Pre-submit quality gate before push/merge:
  - `python3 dev-tools/td_cli.py gh pre-submit`

#### 2) Jules Workflows
- Required secret: `JULES_API_KEY`.
- Typical commands:
  - `python3 dev-tools/td_cli.py jules repair-context`

#### 3) Headless / Bot Auditing
- For batch auditing open PRs:
  - `python3 dev-tools/td_cli.py gh audit`
- Ensure `jq`, `gh`, Python deps, and pnpm deps are installed (handled by setup script).


### Agent / Jules GitHub Command Pattern

**PRIORITIZE SPECIALIZED TOOLING.** Consult the Tooling and MCP Protocol in `.agents/AGENTS.md` before executing any commands.

1. **Tier 1**: Call Boomtick MCP tools.
2. **Tier 2**: Use `python3 dev-tools/td_cli.py` (refer to `cli-schema.json`).
3. **Tier 3**: Raw `gh` as fallback.

If auth fails, do not run `gh auth login`. Instead, set an environment secret named `GITHUB_TOKEN`.


### Verification Commands (Post-Setup)

Run these commands after setup to verify GitHub/dev-tools workflows:

```bash
python3 dev-tools/td_cli.py gh status-board
python3 dev-tools/td_cli.py gh conflicts
```

For PR review flow (example PR number):

```bash
python3 dev-tools/td_cli.py gh audit-pr 123 --fetch --audit
```

For issue workflow checks:

```bash
python3 dev-tools/td_cli.py gh validate-issue --issue-number 123
```

## 🚀 Repository CLI (`td_cli.py`)

The unified entry point for all repository automation. It supports both human-readable terminal output and structured JSON for tool integration.

### Usage and Context
- **CLI Entry Point**: `dev-tools/td_cli.py`
- **Read Context**: `dev-tools/logs/reviews/pr-context-{PR}.md` (Diffs, stats, and valid line ranges).
- **Write Review**: `dev-tools/logs/reviews/pr-review-{PR}.md` (Checklist and JSON output block).

### Core Commands

#### 1. Single PR Audit
The recommended way to review a single PR:
```bash
# Step 1: Fetch metadata and generate context
python3 dev-tools/td_cli.py audit-pr <PR_NUMBER> --fetch

# Step 2: Run automated audit and (optionally) AI review
python3 dev-tools/td_cli.py audit-pr <PR_NUMBER> --audit

# Step 3: Submit the review to GitHub and clean up logs
python3 dev-tools/td_cli.py audit-pr <PR_NUMBER> --submit --cleanup --execute
```

#### 2. Pre-Submission Quality Gate
Before pushing code or opening a PR, run the full suite of local checks:
```bash
python3 dev-tools/td_cli.py pre-submit
```

### Global Options
- `--json`: Output results in structured JSON format.

---

## 📊 CI Gate Baselines

Technical debt is tracked using **GitHub Actions Variables** instead of local files.

### Tracked Metrics
- `BUNDLE_BASELINE_KB`: Max allowed size of the production JS bundle (in KB).
- `ANY_COUNT_BASELINE`: Max allowed number of TypeScript `any` usages.

### How to Update
When a PR intentionally increases one of these metrics, an admin must update the baseline in GitHub after merge:
```bash
gh variable set BUNDLE_BASELINE_KB --body 3080
gh variable set ANY_COUNT_BASELINE --body 50
```

---

## 🧱 Design System and Quality Gates
- **UI Anti-Patterns**: Centralized in `scripts/detect-antipatterns.mjs`.
- **Design System Enforcement**: All code must adhere to `AGENTS.md`. Layout primitives in `src/layouts/` must be used.
- **Failure Prevention**: The system provides explicit ranges in context files to prevent GitHub API 422 errors.
- **Dry Run Default**: Most mutating CLI commands require `--execute`.

> Follow `.agent/AGENT_CONTRACT.md` before reading anything else.

# DevTools CLI Guide (`td-cli`)

The `dev-tools` directory provides a unified CLI tool called `td-cli` that consolidates multiple repository automation workflows, GitHub integrations, AI reviews, and agent interactions.

## Environment Setup

Before using `td-cli`, you must set up the Python environment:

```bash
# 1. Run the verification and setup script
bash dev-tools/verify.sh

# 2. Activate the virtual environment
source .venv/bin/activate

# 3. Export PYTHONPATH
export PYTHONPATH=$(pwd)/dev-tools
```

Once activated, you can run the `td-cli` command. You can also pass `--json` to any command for structured JSON output.

## Command Groups

### GitHub Operations (`td-cli gh`)

- `td-cli gh view <pr_number>`: View summary and diff stats for a PR.
- `td-cli gh resolve <file>`: Attempt conflict resolution on a file.
- `td-cli gh audit`: Run a headless UI audit.
- `td-cli gh audit-gate`: Check current anti-patterns against the baseline.
- `td-cli gh audit-pr <pr_number>`: Generate PR context (`--fetch`), run AI review (`--audit`), or submit (`--submit`).
- `td-cli gh validate-issue --issue-number <num>`: Validate issue quality, required fields, and anti-patterns.
- `td-cli gh conflicts --base <branch>`: Perform conflict handling and snapshot updates.
- `td-cli gh detect-conflicts --pr <pr_number>`: Detect potential merge conflicts for open PRs.
- `td-cli gh status-board`: Print a summary board of open agent PRs.
- `td-cli gh migrate-tokens --find <token> --migrate <old> <new>`: Search or automatically replace deprecated tokens.
- `td-cli gh update-issues`: Scan open issues and comment regarding deprecated paths/assets or anti-patterns.
- `td-cli gh manage-reviews`: Check PRs that need review or check unaddressed review comments.
- `td-cli gh track-review --pr <pr> --status <status> --auditor <name>`: Update the `REVIEW_TRACKING.md` file.
- `td-cli gh ratchet-any --baseline-file <file> --update`: Check and update the TypeScript 'any' count baseline.
- `td-cli gh bundle-size --baseline-file <file> --update`: Check and update the bundle size baseline.
- `td-cli gh pre-submit`: Run all pre-submission checks (TypeScript, lint, audits, baseline checks, and PR scope).

### AI Operations (`td-cli ai`)

- `td-cli ai review <pr_number>`: Produce an AI code review from a PR diff using templates.
- `td-cli ai analyze <file>`: Focus AI analysis and recommendations on a specific file.

### Agent Operations (`td-cli agent` / `td-cli jules`)

- `td-cli agent dispatch <branch> <task>`: Create an AI agent session and attach context for a specific task. (Note: `jules` and `antigravity` can be used as aliases)
- `td-cli agent sync`: Poll active agent sessions.
- `td-cli agent fix-ci --pr-number <num>`: Automatically initialize an AI repair session to fix CI failures.
- `td-cli agent repair --logs <file> [--worktree]`: Run an autonomous local repair agent based on CI logs. Use `--worktree` to perform repairs in a temporary worktree instead of the current branch.
- `td-cli antigravity repair-context --log <log> --file <file>`: Generate repair prompt context from logs.

## Legacy Compatibility

Some workflows may previously reference `python3 dev-tools/td_cli.py <command>`. The new Typer-based CLI wraps these commands identically using the groups listed above. Use `td-cli --help` or `td-cli <group> --help` to explore all available parameters for a command.

# CLAUDE.md — tech-dancer

> **Authority hierarchy**: See `.agent/INSTRUCTION_LAYERS.md`.
> **CLI authority**: `dev-tools/cli-schema.json` — never use --help flags.
> **Primary rules**: See `AGENTS.md`.

## MCP Server

This repo ships a custom MCP server at `boomtick-mcp/`.
If registered in ~/.claude.json, prefer MCP tools over shell calls:
- Git ops → get_changed_files, get_pr_diff, checkout_branch
- CI logs → read_ci_logs
- Tests → run_tests, run_playwright

## Common Tasks → File Targets

| Task | Read only these files |
|------|----------------------|
| Local impact runner | package.json, scripts/impact-analysis.ts |
| UI component work | .agents/skills/impeccable/SKILL.md, TODO_ANTIPATTERNS.md |
| PR audit | cli-schema.json → gh audit-pr, .agent/workflows/review-pr.md |
| Pre-submit | cli-schema.json → gh pre-submit |
| CI failure | docs/agent/ci-remediation.md |
| Issue audit | docs/agent/issue-audit-rules.md |

**Do NOT read workflow YAML to understand the pipeline — read scripts directly.**
**Do NOT read docs/ to understand CLI commands — read cli-schema.json.**

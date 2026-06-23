# GEMINI.md — tech-dancer

> **Authority hierarchy**: See `.agent/INSTRUCTION_LAYERS.md`.
> **CLI authority**: `dev-tools/cli-schema.json` — never use --help flags.
> **Primary rules**: See `AGENTS.md`.

## MCP Server

Register boomtick-mcp in ~/.gemini/settings.json before use.
Prefer MCP tools over shell calls for git and CI operations.

## Task → File Map

| Task | Read only these files |
|------|----------------------|
| Local impact runner | package.json, scripts/impact-analysis.ts |
| UI component work | .agents/skills/impeccable/SKILL.md, TODO_ANTIPATTERNS.md |
| PR audit | cli-schema.json → gh audit-pr, .agent/workflows/review-pr.md |
| Pre-submit | cli-schema.json → gh pre-submit |
| CI failure | docs/agent/ci-remediation.md |
| Issue audit | docs/agent/issue-audit-rules.md |

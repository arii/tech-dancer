## Instruction Layer Map

| File                             | Responsibility                 | Must NOT do             |
| -------------------------------- | ------------------------------ | ----------------------- |
| .agent/AGENT_CONTRACT.md         | Invariant rules (always wins)  | Specify CLI flags       |
| dev-tools/cli-schema.json        | Canonical CLI authority        | Define UI style rules   |
| AGENTS.md                        | TSX, PR lifecycle, core rules  | Duplicate CLI schema    |
| CODEX.md                         | Runtime contract, pnpm/node    | Duplicate UI rules      |
| .agents/skills/impeccable/SKILL.md| Frontend design system / UX    | Define git workflows    |
| .agent/workflows/                | Task-specific protocols        | Redefine core rules     |
| audit.config.yaml                | Define what is bad             | Suggest fixes or report |
| docs/agent/issue-audit-rules.md  | Issue audit rules              | Implementation details  |
| workflows/ai-slop-audit.md       | Execute + report               | Define new rules        |
| workflows/REVIEW_INSTRUCTIONS.md | AI auditor protocol            | Human review concerns   |

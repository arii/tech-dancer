## Instruction Layer Map

| File                             | Responsibility                 | Must NOT do             |
| -------------------------------- | ------------------------------ | ----------------------- |
| .agents/AGENT_CONTRACT.md        | Invariant rules (always wins)  | Specify CLI flags       |
| .agents/AGENTS.md                | Tooling & MCP Protocol         | Define UI style rules   |
| dev-tools/cli-schema.json        | Canonical CLI authority        | Define UI style rules   |
| AGENTS.md                        | TSX, PR lifecycle, runtime rules| Duplicate CLI schema    |
| .agents/workflows/               | Task-specific protocols        | Redefine core rules     |
| audit.config.yaml                | Define what is bad             | Suggest fixes or report |
| docs/agent/issue-audit-rules.md  | Issue audit rules              | Implementation details  |
| workflows/ai-slop-audit.md       | Execute + report               | Define new rules        |
| workflows/REVIEW_INSTRUCTIONS.md | AI auditor protocol            | Human review concerns   |

### Resolution Order and Hierarchy

When resolving instructions, agents MUST follow this precedence:
1. **AGENT_CONTRACT.md** (Core behavior invariants)
2. **.agents/AGENTS.md** (Specific tool execution protocol)
3. **AGENTS.md** (Domain-specific styling and workflow rules)

### Tool Grounding Chain
1. Read **.agent-context.json** to understand project structure.
2. Read **dev-tools/cli-schema.json** for local tool syntax.
3. Call **Boomtick MCP** tools for repository and GitHub operations.

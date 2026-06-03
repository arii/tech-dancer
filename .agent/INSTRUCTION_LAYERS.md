## Instruction Layer Map

| File                             | Responsibility      | Must NOT do             |
| -------------------------------- | ------------------- | ----------------------- |
| audit.config.yaml                | Define what is bad  | Suggest fixes or report |
| docs/agent/issue-audit-rules.md  | Issue audit rules   | Implementation details  |
| workflows/ai-slop-audit.md       | Execute + report    | Define new rules        |
| workflows/REVIEW_INSTRUCTIONS.md | Code review only    | Language audits         |
| dev-tools/REVIEW_INSTRUCTIONS.md | AI auditor protocol | Human review concerns   |

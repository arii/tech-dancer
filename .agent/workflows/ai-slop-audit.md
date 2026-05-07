> Follow `.agent/AGENT_CONTRACT.md` before reading anything else.

# AI Slop Audit Workflow

This workflow does not hardcode violation examples. Reports are generated from `.agent/audit.config.yaml` at runtime by `.agent/scripts/audit-ai-slop.py`.

## Run

```bash
python3 .agent/scripts/audit-ai-slop.py
```

Use the generated report file in `.agent/workflows/` for current findings and action planning.

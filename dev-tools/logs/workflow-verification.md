# Workflow Verification

Generated: 2026-06-26T01:38:20Z

| Workflow | Command | Result |
|---|---|---|
| shared | `python3 --version` | ✅ pass |
| shared | `pnpm --version` | ✅ pass |
| shared | `python3 dev-tools/td_cli.py gh --help` | ⚠️ warn |
| shared | `python3 dev-tools/td_cli.py jules --help` | ⚠️ warn |
| ai-slop-audit.md | `python3 .agents/scripts/audit-ai-slop.py` | ✅ pass |
| dev-tools-cli-guide.md | `python3 dev-tools/td_cli.py gh pre-submit --help` | ⚠️ warn |
| dev-tools-cli-guide.md | `python3 dev-tools/td_cli.py gh audit-pr --help` | ⚠️ warn |
| dev-tools-cli-guide.md | `python3 dev-tools/td_cli.py gh validate-issue --help` | ⚠️ warn |
| review-pr.md | `python3 dev-tools/td_cli.py gh audit-pr 2821 --fetch` | ✅ pass |
| review-ux.md | `npx playwright --version` | ✅ pass |
| review-ux.md | `node scripts/detect-antipatterns.mjs --help` | ✅ pass |

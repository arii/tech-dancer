# Workflow Verification

Generated: 2026-06-24T06:31:35Z

| Workflow | Command | Result |
|---|---|---|
| shared | `python3 --version` | ✅ pass |
| shared | `pnpm --version` | ✅ pass |
| shared | `python3 dev-tools/td_cli.py gh --help` | ⚠️ warn |
| shared | `python3 dev-tools/td_cli.py jules --help` | ⚠️ warn |
| ai-slop-audit.md | `python3 .agent/scripts/audit-ai-slop.py` | ⚠️ warn |
| dev-tools-cli-guide.md | `python3 dev-tools/td_cli.py gh pre-submit --help` | ⚠️ warn |
| dev-tools-cli-guide.md | `python3 dev-tools/td_cli.py gh audit-pr --help` | ⚠️ warn |
| dev-tools-cli-guide.md | `python3 dev-tools/td_cli.py gh validate-issue --help` | ⚠️ warn |
| mass-audit-prs.md | `python3 dev-tools/td_cli.py gh conflicts` | ⚠️ warn |
| review-pr.md | `python3 dev-tools/td_cli.py gh audit-pr 1 --fetch` | ⚠️ warn |
| mass-audit-issues.md | `python3 dev-tools/td_cli.py gh validate-issue --issue-number 1` | ⚠️ warn |
| mass-audit-issues.md | `gh issue list --limit 1` | ⚠️ warn |
| review-ux.md | `npx playwright --version` | ✅ pass |
| review-ux.md | `pnpm run audit --help` | ✅ pass |

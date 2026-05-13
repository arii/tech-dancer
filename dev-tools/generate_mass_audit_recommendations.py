#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OPEN_PRS = ROOT / "open_prs.jsonl"
OUTPUT = ROOT / "MASS_AUDIT_RECOMMENDATIONS.md"

if not OPEN_PRS.exists():
    raise SystemExit(f"Missing snapshot file: {OPEN_PRS}")

prs = [json.loads(line) for line in OPEN_PRS.read_text().splitlines() if line.strip()]
summary = []
for pr in prs:
    checks = pr.get("statusCheckRollup") or []
    failures = [c for c in checks if c.get("conclusion") in {"FAILURE", "CANCELLED", "TIMED_OUT", "ACTION_REQUIRED"}]
    in_progress = [c for c in checks if c.get("status") == "IN_PROGRESS"]
    summary.append((pr["number"], pr["title"], failures, in_progress))

summary.sort(key=lambda item: (-len(item[2]), -len(item[3]), item[0]))

lines = [
    "# Mass Audit Recommendations",
    "",
    "Generated from local `open_prs.jsonl` snapshot.",
    "",
    "## Open PR Recommendations",
    "",
]
for number, title, failures, in_progress in summary:
    if not failures and not in_progress:
        continue
    lines.append(f"### PR #{number}: {title}")
    if failures:
        failing_names = ", ".join(sorted({c.get('name', 'unknown') for c in failures}))
        lines.append(f"- **Status:** {len(failures)} failing check(s).")
        lines.append(f"- **Failing checks:** {failing_names}.")
        if any(c.get("name") == "Anti-Pattern Audit" for c in failures):
            lines.append("- **Recommendation:** Run `pnpm run audit` and fix new violations in touched `.tsx` files before rerun.")
        if any(c.get("name") == "Lint & Type Check" for c in failures):
            lines.append("- **Recommendation:** Run `pnpm lint` and `pnpm exec tsc --noEmit` locally and push fixes.")
        if any(c.get("name") == "Build & E2E" for c in failures):
            lines.append("- **Recommendation:** Run `pnpm test:e2e` (or CI-equivalent smoke) and stabilize flaky selectors/timeouts.")
    if in_progress:
        lines.append(f"- **Status:** {len(in_progress)} check(s) still in progress.")
        lines.append("- **Recommendation:** Wait for completion before merge decisions.")
    lines.append("")

lines.extend(["## Merge-Ready Candidates", ""])
for number, title, failures, in_progress in summary:
    if failures or in_progress:
        continue
    lines.append(f"- PR #{number} — {title} (all observed checks passing in snapshot).")

lines.extend([
    "",
    "## Open Issue Recommendations",
    "",
    "- Use review tooling to post PR comments directly after fetching context:",
    "  - `python3 dev-tools/td_cli.py gh audit-pr <PR_NUMBER> --fetch --audit --submit --cleanup --execute`",
    "- Run issue validation workflow and post comments:",
    "  - `python3 dev-tools/td_cli.py gh validate-issue --all-open --post-comments --execute`",
    "- Prioritize issues that mention routing, raw Tailwind classes, or anti-pattern debt, because those map directly to enforced gates.",
])

OUTPUT.write_text("\n".join(lines) + "\n")
print(f"Wrote {OUTPUT}")

#!/usr/bin/env bash
# Publish PR/issue review comments from mass-audit recommendations.
# Intended to run in an environment with GitHub auth + gh CLI installed.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -f "open_prs.jsonl" ]]; then
  echo "❌ open_prs.jsonl not found. Run mass audit snapshot first."
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "❌ gh CLI not found. Install GitHub CLI before publishing comments."
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "❌ gh is not authenticated. Run: gh auth login"
  exit 1
fi

MODE="${1:---dry-run}"
if [[ "$MODE" != "--dry-run" && "$MODE" != "--execute" ]]; then
  echo "Usage: $0 [--dry-run|--execute]"
  exit 1
fi

echo "🧾 Generating latest recommendations artifact..."
python3 dev-tools/generate_mass_audit_recommendations.py

echo "🔎 Collecting PRs that need comments..."
mapfile -t failing_prs < <(python3 - <<'PY'
import json
for line in open('open_prs.jsonl'):
    pr = json.loads(line)
    checks = pr.get('statusCheckRollup') or []
    has_fail = any(c.get('conclusion') in {'FAILURE','CANCELLED','TIMED_OUT','ACTION_REQUIRED'} for c in checks)
    has_in_progress = any(c.get('status') == 'IN_PROGRESS' for c in checks)
    if has_fail or has_in_progress:
        print(pr['number'])
PY
)

if [[ ${#failing_prs[@]} -eq 0 ]]; then
  echo "✅ No failing or in-progress PRs found in snapshot."
else
  for pr in "${failing_prs[@]}"; do
    echo "----------------------------------------"
    echo "📝 Processing PR #$pr"

    python3 dev-tools/td_cli.py gh audit-pr "$pr" --fetch
    python3 dev-tools/td_cli.py gh audit-pr "$pr" --audit

    if [[ "$MODE" == "--execute" ]]; then
      python3 dev-tools/td_cli.py gh audit-pr "$pr" --submit --cleanup --execute
      echo "✅ Submitted review comments for PR #$pr"
    else
      echo "⚠️  Dry run: skipping --submit for PR #$pr"
    fi
  done
fi

echo "📌 Running issue validation workflow..."
if [[ "$MODE" == "--execute" ]]; then
  python3 dev-tools/td_cli.py gh validate-issue --all-open --post-comments --execute
  echo "✅ Issue comments published"
else
  python3 dev-tools/td_cli.py gh validate-issue --all-open
  echo "⚠️  Dry run: skipping issue comment publication"
fi

echo "✅ Done. Mode: $MODE"

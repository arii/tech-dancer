#!/bin/bash
# dev-tools/audit_headless.sh
# Headless PR audit workflow for sandbox environments.

set -euo pipefail

# Error trap for diagnostic feedback
trap 'echo "❌ Error occurred on line $LINENO. Exiting." >&2' ERR

# 1. Sync Git State
if [[ "$1" == "--sync" ]]; then
  echo "🔄 Syncing git state with origin/main..."
  git fetch origin main
  git checkout main
  git reset --hard origin/main
else
  echo "⏩ Skipping git sync (use --sync to enable)..."
fi

# 2. Prepare Environment
if [[ ! -d "node_modules" ]]; then
  echo "📦 node_modules missing. Installing..."
  pnpm install --frozen-lockfile
fi

# Check Ollama status for AI-assisted features
if ! curl -s http://localhost:11434/api/tags > /dev/null; then
  echo "⚠️  Ollama is not running. AI-assisted repairs and recommendations will be skipped (using fallbacks)."
fi

# 3. Get Open PRs in JSON format
echo "🔍 Fetching open PRs..."
mkdir -p dev-tools/logs
python3 dev-tools/td_cli.py status-board --json > dev-tools/logs/open_prs.json

# 4. Process each PR
# Using jq to extract PR numbers from the JSON output of status-board
for pr in $(jq -r '.work[].number' dev-tools/logs/open_prs.json); do
  echo "----------------------------------------"
  echo "🚀 Auditing PR #$pr..."

  # Fetch and Audit headlessly
  python3 dev-tools/td_cli.py --yes audit-pr "$pr" --fetch --audit

  # Track status
  python3 dev-tools/td_cli.py track-review --pr "$pr" --status "Audited (Headless)" --auditor "TechDancer-Bot"
done

# 5. Analyze Overlaps
echo "----------------------------------------"
echo "📊 Analyzing file overlaps between PRs..."
./dev-tools/analyze_overlaps.sh

echo "✅ Headless audit complete. See REVIEW_TRACKING.md and pr_overlaps.txt"

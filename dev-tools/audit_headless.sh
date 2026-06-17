#!/bin/bash
# dev-tools/audit_headless.sh
# Headless PR audit workflow for sandbox environments.

set -euo pipefail

# Error trap for diagnostic feedback
trap 'echo "❌ Error occurred on line $LINENO. Exiting." >&2' ERR

# 1. Sync Git State
if [[ "${1:-}" == "--sync" ]]; then
  echo "🔄 Syncing git state with origin/main..."
  if ! git fetch origin main; then
    echo "⚠️  Unable to fetch origin/main. Continuing without sync."
  elif ! git checkout main; then
    echo "⚠️  Unable to checkout main. Continuing without sync."
  elif ! git reset --hard origin/main; then
    echo "⚠️  Unable to reset to origin/main. Continuing without sync."
  fi
else
  echo "⏩ Skipping git sync (use --sync to enable)..."
fi

# 2. Prepare Environment
if [[ ! -d "node_modules" ]]; then
  echo "📦 node_modules missing. Installing..."
  pnpm install --frozen-lockfile
fi


# 3. Get Open PRs in JSON format
echo "🔍 Fetching open PRs..."
mkdir -p dev-tools/logs
python3 dev-tools/td_cli.py --json status-board > dev-tools/logs/open_prs.json

# 4. Process each PR
# Using jq to extract PR numbers from the JSON output of status-board
for pr in $(jq -r '.work[].number // empty' dev-tools/logs/open_prs.json); do
  if [[ -z "$pr" || "$pr" == "null" ]]; then
    echo "⚠️  Skipping invalid PR number: '$pr'" >&2
    continue
  fi
  echo "----------------------------------------"
  echo "🚀 Auditing PR #$pr..."

  # Fetch and Audit headlessly
  python3 dev-tools/td_cli.py audit-pr "$pr" --fetch --audit

  # Log Triage and Failure Analysis
  echo "🔍 Performing CI Log Triage for PR #$pr..."
  python3 dev-tools/td_cli.py jules repair-context --pr "$pr"

  # Track status
  python3 dev-tools/td_cli.py track-review --pr "$pr" --status "Audited (Headless)" --auditor "TechDancer-Bot"
done

# 5. Analyze Overlaps
echo "----------------------------------------"
echo "📊 Analyzing file overlaps between PRs..."
./dev-tools/analyze_overlaps.sh

echo "✅ Headless audit complete. See REVIEW_TRACKING.md and pr_overlaps.txt"

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

# Check Ollama status for AI-assisted features
if ! curl -s http://localhost:11434/api/tags > /dev/null; then
  echo "⚠️  Ollama is not running (http://localhost:11434)."
  echo "    AI-assisted repairs and recommendations will use rule-based fallbacks."
  echo "    To enable AI: ensure Ollama is installed and running ('ollama serve')."
fi

# 3. Get Open PRs in JSON format
echo "🔍 Fetching open PRs..."
mkdir -p dev-tools/logs
if python3 dev-tools/td_cli.py --json gh status-board > dev-tools/logs/open_prs.json; then
  echo "✅ Pulled live PR status from GitHub."
else
  echo "⚠️  Falling back to local open_prs.jsonl snapshot (no GitHub auth/remote)."
  jq -s '{work: .}' open_prs.jsonl > dev-tools/logs/open_prs.json
fi

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
  if python3 dev-tools/td_cli.py gh audit-pr "$pr" --fetch --audit; then
    python3 dev-tools/td_cli.py gh track-review --pr "$pr" --status "Audited (Headless)" --auditor "TechDancer-Bot"
  else
    echo "⚠️  Skipping live PR #$pr audit due missing GitHub auth or API access."
  fi
done

# 5. Analyze Overlaps
echo "----------------------------------------"
echo "📊 Analyzing file overlaps between PRs..."
./dev-tools/analyze_overlaps.sh

echo "📝 Generating mass-audit recommendations..."
python3 dev-tools/generate_mass_audit_recommendations.py

echo "✅ Headless audit complete. See REVIEW_TRACKING.md, pr_overlaps.txt, and MASS_AUDIT_RECOMMENDATIONS.md"

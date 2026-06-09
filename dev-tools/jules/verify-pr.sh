#!/usr/bin/env bash
set -euo pipefail

# Kill all processes before starting to ensure a clean environment
echo "[INFO] Running kill-all script to stop any lingering processes..."
if ! npm run --prefix hrm kill-all; then
    echo "[WARN] 'npm run kill-all' failed. This may be okay if no processes were running."
    echo "[INFO] Continuing with PR verification..."
fi

# Parse flags
SKIP_JULES=false
COMMENT_JULES=false
SKIP_REBASE=false
SKIP_TESTING=false
PR_ARGS=()

while [[ $# -gt 0 ]]; do
  case $1 in
    --skip-jules)
      SKIP_JULES=true
      shift
      ;;
    --comment-jules)
      COMMENT_JULES=true
      shift
      ;;
    --skip-rebase)
      SKIP_REBASE=true
      shift
      ;;
    --skip-testing)
      SKIP_TESTING=true
      shift
      ;;
    *)
      PR_ARGS+=("$1")
      shift
      ;;
  esac
done

# If PR numbers provided as arguments, use those
# Otherwise, fetch all open PRs
if [ "${#PR_ARGS[@]}" -gt 0 ]; then
  PR_NUMBERS=("${PR_ARGS[@]}")
else
  echo "[INFO] No PR numbers provided, fetching open PRs..."
  mapfile -t PR_NUMBERS < <(gh pr list --repo arii/hrm --state open --json number --jq '.[].number')
  
  if [ "${#PR_NUMBERS[@]}" -eq 0 ]; then
    echo "[INFO] No open PRs found."
    exit 0
  fi
  
  echo "[INFO] Found ${#PR_NUMBERS[@]} open PR(s): ${PR_NUMBERS[*]}"
fi

# Process each PR
for PR_NUMBER in "${PR_NUMBERS[@]}"; do
  echo ""
  echo "=========================================="
  echo "[INFO] Processing PR #${PR_NUMBER}..."
  echo "=========================================="
  
  # Build python command
  CMD_ARGS=()
  if [ "$SKIP_TESTING" = true ]; then
    CMD_ARGS+=("--skip-testing")
  fi

  # Build environment variables
  ENV_VARS=""
  if [ "$SKIP_JULES" = true ]; then
    ENV_VARS="SKIP_JULES_INTEGRATION=1"
  fi
  if [ "$COMMENT_JULES" = true ]; then
    if [ -n "$ENV_VARS" ]; then
      ENV_VARS="$ENV_VARS COMMENT_JULES=1"
    else
      ENV_VARS="COMMENT_JULES=1"
    fi
  fi
  if [ "$SKIP_REBASE" = true ]; then
    if [ -n "$ENV_VARS" ]; then
      ENV_VARS="$ENV_VARS SKIP_REBASE_INTEGRATION=1"
    else
      ENV_VARS="SKIP_REBASE_INTEGRATION=1"
    fi
  fi
  
  # Run with environment variables
  if [ -n "$ENV_VARS" ]; then
    env $ENV_VARS python github-ops/process_pr.py "${PR_NUMBER}" "${CMD_ARGS[@]}"
  else
    python github-ops/process_pr.py "${PR_NUMBER}" "${CMD_ARGS[@]}"
  fi
  
  echo "[DONE] PR #${PR_NUMBER} processing complete."
done

echo ""
echo "[DONE] All PRs processed."

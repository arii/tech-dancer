#!/bin/bash
# auto-mass-audit-pr.sh
# Orchestrates end-to-end technical audits for multiple pull requests sequentially.

if [ $# -eq 0 ]; then
    echo "Usage: ./dev-tools/auto-mass-audit-pr.sh <PR_NUM1> <PR_NUM2> ..."
    exit 1
fi

PR_LIST=("$@")
SUCCESS_LIST=()
FAILURE_LIST=()

echo "🚀 Starting technical audit for ${#PR_LIST[@]} pull requests..."
echo "------------------------------------------------------------"

for pr in "${PR_LIST[@]}"; do
    echo ""
    echo "▶️ Processing PR #$pr..."
    ./dev-tools/auto-review-pr.sh "$pr" --cleanup
    
    if [ $? -eq 0 ]; then
        SUCCESS_LIST+=("#$pr")
    else
        FAILURE_LIST+=("#$pr")
    fi
done

echo ""
echo "============================================================"
echo "                MASS PR AUDIT SUMMARY"
echo "============================================================"
echo "Total Processed: ${#PR_LIST[@]}"
echo "✅ Success:      ${#SUCCESS_LIST[@]} (${SUCCESS_LIST[*]})"
echo "❌ Failure:      ${#FAILURE_LIST[@]} (${FAILURE_LIST[*]})"
echo "============================================================"

if [ ${#FAILURE_LIST[@]} -eq 0 ]; then
    echo "✨ All audits completed successfully!"
    exit 0
else
    echo "⚠️ Some audits failed. Check logs in dev-tools/logs/reviews/ (if not cleaned)."
    exit 1
fi

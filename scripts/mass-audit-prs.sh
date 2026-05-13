#!/usr/bin/env bash

# Export GITHUB_TOKEN for the audit tool
TOKEN=$(gh auth token)
if [ -z "$TOKEN" ]; then
    echo "❌ Error: Could not get GitHub token from 'gh auth token'."
    exit 1
fi
export GITHUB_TOKEN="$TOKEN"

echo "### Mass PR Audit Started at $(date)"
echo ""

# Fetch open PRs
PRS=$(gh pr list --state open --limit 50 --json number,title | jq -c '.[]')

echo "| PR # | Title | Status | Review Outcome | Recommendation | Overlap Notes |"
echo "| :--- | :---- | :----- | :------------- | :------------- | :------------ |"

while read -r pr; do
    if [ -z "$pr" ]; then continue; fi
    PR_NUM=$(echo "$pr" | jq -r '.number')
    PR_TITLE=$(echo "$pr" | jq -r '.title')
    
    # Run audit
    RESULT=$(python3 dev-tools/td_cli.py --json gh audit-pr "$PR_NUM" --fetch --audit --execute 2>/dev/null)
    EXIT_CODE=$?
    
    if [ $EXIT_CODE -ne 0 ] || [ -z "$RESULT" ]; then
        echo "| $PR_NUM | $PR_TITLE | 🔴 ERROR | ❌ FAIL | **TBD** | Audit tool failed with code $EXIT_CODE. |"
        continue
    fi
    
    # Parse findings
    FINDINGS_COUNT=$(echo "$RESULT" | jq '.data.auto_findings | length' 2>/dev/null || echo "0")
    MAJOR_FINDINGS=$(echo "$RESULT" | jq '[.data.auto_findings[] | select(.severity == "major")] | length' 2>/dev/null || echo "0")
    
    # Simple logic for Status/Outcome
    if [ "$MAJOR_FINDINGS" -gt 0 ]; then
        STATUS="🔴 FAIL"
        OUTCOME="❌ FAIL"
        REC="**REQUEST CHANGES**"
        NOTES="Found $MAJOR_FINDINGS major violations."
    elif [ "$FINDINGS_COUNT" -gt 0 ]; then
        STATUS="🟡 WARN"
        OUTCOME="⚠️ WARN"
        REC="**COMMENT**"
        NOTES="Found $FINDINGS_COUNT minor violations."
    else
        STATUS="🟢 PASS"
        OUTCOME="✅ PASS"
        REC="**APPROVE**"
        NOTES="Clean audit."
    fi
    
    echo "| $PR_NUM | $PR_TITLE | $STATUS | $OUTCOME | $REC | $NOTES |"
done <<< "$PRS"

echo ""
echo "### Mass PR Audit Completed at $(date)"

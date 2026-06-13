#!/usr/bin/env bash
set -e

TOKEN=$(gh auth token 2>/dev/null || echo $GITHUB_TOKEN)
if [ -z "$TOKEN" ]; then
    echo "❌ Error: Could not get GitHub token. Please set GITHUB_TOKEN."
    # Since 'exit' blocks the sandbox session parsing we use an if/else block
    ERROR_MISSING_TOKEN=1
else
    ERROR_MISSING_TOKEN=0
fi

if [ "$ERROR_MISSING_TOKEN" = "0" ]; then

export GITHUB_TOKEN="$TOKEN"

if [ -n "$GITHUB_REPOSITORY" ]; then
    REPO="$GITHUB_REPOSITORY"
else
    REPO=$(git config --get remote.origin.url | sed 's/.*github.com[:/]\(.*\)\.git/\1/')
    if [ -z "$REPO" ]; then
        REPO="owner/repo"
    fi
fi

echo "### Dispatching Issues to $REPO"

git config user.name "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"

HAS_NEW_ISSUES=false

for file in dispatched-issues/*.md; do
    if [ ! -f "$file" ]; then continue; fi

    BASENAME=$(basename "$file" .md)
    TITLE="chore: fix $BASENAME"

    if grep -q "dispatched-issues/$(basename "$file")" issue-dispatch-status.md; then
        echo "Creating issue: $TITLE"

        ISSUE_URL=$(gh issue create --repo "$REPO" --title "$TITLE" --body-file "$file")

        if [ $? -eq 0 ]; then
            echo "✅ Created issue: $ISSUE_URL"
            sed -i "s|dispatched-issues/$(basename "$file")|$ISSUE_URL|g" issue-dispatch-status.md
            sed -i "s|dispatched-issues/$(basename "$file")|$ISSUE_URL|g" issue-dispatch-report.md
            HAS_NEW_ISSUES=true
        else
            echo "❌ Failed to create issue for $file"
        fi
    else
        echo "⏭️ Skipping $file, already dispatched."
    fi
done

if [ "$HAS_NEW_ISSUES" = "true" ]; then
    echo "Committing updated status files back to repo..."
    git add issue-dispatch-status.md issue-dispatch-report.md
    git commit -m "chore: update dispatch status with github URLs [skip ci]"

    if [ -n "$GITHUB_REF" ]; then
        COMMAND="git push origin HEAD:${GITHUB_REF#refs/heads/}"
        eval $COMMAND || echo "Failed to push"
    fi
else
    echo "No new issues created."
fi

echo "### Issue Dispatch Completed."

fi

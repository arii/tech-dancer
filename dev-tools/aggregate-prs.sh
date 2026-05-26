#!/usr/bin/env bash
set -euo pipefail
# WARNING: Destructive operation - Modifies local git tracking state, pushes upstream branches, and generates remote Pull Requests.
if [ "$#" -lt 2 ]; then echo "Usage: $0 <new-branch-name> <pr1> <pr2> ..."; exit 1; fi
T_BR="$1"; shift; PRs=("$@"); git checkout main && git pull origin main && git checkout -b "$T_BR"
P_BODY=""
for pr in "${PRs[@]}"; do
    DATA=$(gh pr view "$pr" --json headRefName,body,title --jq '.')
    REF=$(echo "$DATA" | jq -r '.headRefName') && TITLE=$(echo "$DATA" | jq -r '.title') && BODY=$(echo "$DATA" | jq -r '.body')
    gh pr checkout "$pr" 2>/dev/null && git checkout "$T_BR"
    if ! git merge "$REF" -m "Merging PR $pr: $TITLE" 2>/dev/null; then
        echo "CRITICAL: Conflict in PR #$pr"; git merge --abort; exit 1
    fi
    P_BODY="${P_BODY}Closes #$pr"$'\n\n'"### Description from PR #$pr ($TITLE):"$'\n'"$BODY"$'\n\n'"---"$'\n'
done
git push -u origin "$T_BR" && gh pr create --title "Aggregated Feature: $T_BR" --body "$P_BODY" --head "$T_BR" --base main

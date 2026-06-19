#!/usr/bin/env bash
set -euo pipefail

PR_NUMBER="${PR_NUMBER:-}"
WORKFLOW_FILE="${WORKFLOW_FILE:-ci.yml}"
COMMENT_PREFIX="<!-- JULES_RETRY_CONTEXT -->### 🔁 Jules Retry Context"

if [[ -z "$PR_NUMBER" ]]; then
  echo "::warning::PR_NUMBER is required to post Jules retry context."
  exit 0
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "::warning::GitHub CLI is required to post Jules retry context."
  exit 0
fi

post_or_update_comment() {
  local body_file="$1"
  local repo="${GITHUB_REPOSITORY:-}"
  local existing_id=""

  if [[ -z "$repo" ]]; then
    repo=$(gh repo view --json nameWithOwner --jq .nameWithOwner 2>/dev/null || true)
  fi

  if [[ -n "$repo" ]]; then
    existing_id=$(gh api "repos/$repo/issues/$PR_NUMBER/comments" \
      --jq ".[] | select(.body | startswith(\"$COMMENT_PREFIX\")) | .id" 2>/dev/null \
      | head -1 || true)
  fi

  if [[ -n "$repo" && -n "$existing_id" ]]; then
    gh api "repos/$repo/issues/comments/$existing_id" \
      -X PATCH \
      -f "body=$(cat "$body_file")" >/dev/null
  else
    gh pr comment "$PR_NUMBER" --body-file "$body_file"
  fi
}

post_skip_comment() {
  local reason="$1"
  local body_file
  body_file=$(mktemp)
  cat > "$body_file" <<EOF_BODY
$COMMENT_PREFIX — Skipped

⚠️ Skipped retry context: $reason
EOF_BODY
  post_or_update_comment "$body_file"
  rm -f "$body_file"
}

if ! command -v jq >/dev/null 2>&1; then
  post_skip_comment "\`jq\` is not available in the runner."
  exit 0
fi

PR_HEAD_BRANCH=$(gh pr view "$PR_NUMBER" --json headRefName --jq .headRefName 2>/dev/null || true)
if [[ -z "$PR_HEAD_BRANCH" ]]; then
  post_skip_comment "could not resolve the PR head branch, so CI runs could not be safely scoped to this PR."
  exit 0
fi

RUNS_JSON=$(gh run list \
  --workflow "$WORKFLOW_FILE" \
  --branch "$PR_HEAD_BRANCH" \
  --json databaseId,conclusion,createdAt,headBranch,event,headSha \
  --limit 50 || true)

if [[ -z "$RUNS_JSON" ]]; then
  post_skip_comment "failed to fetch workflow runs."
  exit 0
fi

RUNS=$(jq -c --arg branch "$PR_HEAD_BRANCH" '[.[] | select(.headBranch == $branch)] | sort_by(.createdAt) | .[-2:]' <<<"$RUNS_JSON")
RUN_COUNT=$(jq 'length' <<<"$RUNS")
if (( RUN_COUNT < 2 )); then
  post_skip_comment "fewer than two \`$WORKFLOW_FILE\` runs were found for branch \`$PR_HEAD_BRANCH\`."
  exit 0
fi

PREV_RUN=$(jq -r '.[0].databaseId' <<<"$RUNS")
CURR_RUN=$(jq -r '.[1].databaseId' <<<"$RUNS")

PREV_JOBS=$(gh run view "$PREV_RUN" --json jobs | jq -r '.jobs[] | [.name, (.conclusion // "in_progress")] | @tsv')
CURR_JOBS=$(gh run view "$CURR_RUN" --json jobs | jq -r '.jobs[] | [.name, (.conclusion // "in_progress")] | @tsv')

FIXED=""
STILL_FAILING=""
NEW_FAILURES=""
UNCHANGED_GREEN=""
OTHER_TRANSITIONS=""

while IFS=$'\t' read -r NAME CURR_STATE; do
  [[ -z "${NAME:-}" ]] && continue
  PREV_STATE=$(awk -F'\t' -v name="$NAME" '$1 == name { print $2; found=1 } END { if (!found) print "" }' <<<"$PREV_JOBS")

  if [[ "$PREV_STATE" == "failure" && "$CURR_STATE" == "success" ]]; then
    FIXED+=$'\n- ✅ '"$NAME"
  elif [[ "$PREV_STATE" == "failure" && "$CURR_STATE" == "failure" ]]; then
    STILL_FAILING+=$'\n- ❌ '"$NAME (still failing)"
  elif [[ "$CURR_STATE" == "failure" && -z "$PREV_STATE" ]]; then
    NEW_FAILURES+=$'\n- 🆕 '"$NAME (new failure)"
  elif [[ "$PREV_STATE" == "success" && "$CURR_STATE" == "failure" ]]; then
    NEW_FAILURES+=$'\n- 🆕 '"$NAME (regressed from success)"
  elif [[ "$PREV_STATE" == "success" && "$CURR_STATE" == "success" ]]; then
    UNCHANGED_GREEN+=$'\n- ✅ '"$NAME (stayed green)"
  elif [[ "$PREV_STATE" != "$CURR_STATE" ]]; then
    OTHER_TRANSITIONS+=$'\n- ℹ️ '"$NAME: ${PREV_STATE:-new} → $CURR_STATE"
  fi
done <<<"$CURR_JOBS"

PREV_COMMIT=$(jq -r '.[0].headSha // empty' <<<"$RUNS")
HEAD_COMMIT=$(jq -r '.[1].headSha // empty' <<<"$RUNS")
COMMITS_APPLIED="unknown"
RELEVANT_TOUCHED="_none_"

if [[ -n "$PREV_COMMIT" && -n "$HEAD_COMMIT" && "$PREV_COMMIT" != "$HEAD_COMMIT" ]]; then
  if git cat-file -e "$PREV_COMMIT^{commit}" 2>/dev/null && git cat-file -e "$HEAD_COMMIT^{commit}" 2>/dev/null; then
    COMMITS_APPLIED=$(git rev-list --count "$PREV_COMMIT..$HEAD_COMMIT" 2>/dev/null || echo "unknown")

    if [[ -n "$STILL_FAILING" ]]; then
      TOUCHED=$(git diff --name-only "$PREV_COMMIT" "$HEAD_COMMIT" || true)
      RELEVANT_TOUCHED=$(grep -E '\.(ts|tsx|js|jsx|py|yml|yaml|json|mjs|cjs|css|scss)$' <<<"$TOUCHED" \
        | sed 's/^/- /' || true)
      RELEVANT_TOUCHED=${RELEVANT_TOUCHED:-_none_}
    fi
  fi
elif [[ -n "$PREV_COMMIT" && "$PREV_COMMIT" == "$HEAD_COMMIT" ]]; then
  COMMITS_APPLIED="0"
fi

BODY_FILE=$(mktemp)

cat > "$BODY_FILE" <<EOF_BODY
$COMMENT_PREFIX — Entropy Check

This comment compares the last two \`$WORKFLOW_FILE\` runs on \`$PR_HEAD_BRANCH\` so the next repair attempt can focus on signal instead of re-reading the same failing state.

**Compared runs:** \`$PREV_RUN\` → \`$CURR_RUN\`
**Commits applied since previous commit:** $COMMITS_APPLIED

**Fixed this attempt:**
${FIXED:-_none_}

**Still failing:**
${STILL_FAILING:-_none_}

**New failures introduced:**
${NEW_FAILURES:-_none_}

**Stayed green:**
${UNCHANGED_GREEN:-_none_}

**Other check transitions:**
${OTHER_TRANSITIONS:-_none_}

**Files touched by the previous attempt while checks are still red:**
$RELEVANT_TOUCHED
EOF_BODY

post_or_update_comment "$BODY_FILE"

rm -f "$BODY_FILE"

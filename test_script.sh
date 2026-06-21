#!/bin/bash
if [ -f artifacts/deployment-review.md ]; then
  cat artifacts/deployment-review.md >> "$GITHUB_STEP_SUMMARY"
  {
    echo "IMPACT_BODY<<EOF"
    cat artifacts/deployment-review.md
    echo "EOF"
  } >> "$GITHUB_ENV"
elif [ -f artifacts/impact-analysis/impact.md ]; then
  cat artifacts/impact-analysis/impact.md >> "$GITHUB_STEP_SUMMARY"
  {
    echo "IMPACT_BODY<<EOF"
    cat artifacts/impact-analysis/impact.md
    echo "EOF"
  } >> "$GITHUB_ENV"
else
  {
    echo "## Deployment Impact Analysis"
    echo "No impact report found."
  } >> "$GITHUB_STEP_SUMMARY"
  {
    echo "IMPACT_BODY<<EOF"
    echo "No impact report found."
    echo "EOF"
  } >> "$GITHUB_ENV"
fi

if [ -f artifacts/gemini-review.md ]; then
  {
    echo ""
    cat artifacts/gemini-review.md
  } >> "$GITHUB_STEP_SUMMARY"
fi

if [ -f artifacts/github-models-review.md ]; then
  {
    echo ""
    cat artifacts/github-models-review.md
  } >> "$GITHUB_STEP_SUMMARY"
fi

if [ -f artifacts/gemini-code-review.md ]; then
  {
    echo ""
    cat artifacts/gemini-code-review.md
  } >> "$GITHUB_STEP_SUMMARY"
fi

if [ -f artifacts/github-models-code-review.md ]; then
  {
    echo ""
    cat artifacts/github-models-code-review.md
  } >> "$GITHUB_STEP_SUMMARY"
fi

# Aggregate verdict — fail the step explicitly if any verdict file says failed
FAILED=0
# Ensure jq is installed
if ! command -v jq >/dev/null 2>&1; then
  if ! sudo apt-get update || ! sudo apt-get install -y jq; then
      echo "❌ Failed to install jq. Cannot parse verdict files." >&2
      FAILED=1
  fi
fi

if [ "$FAILED" -eq 0 ]; then
  for f in artifacts/*-verdict.json; do
    [ -f "$f" ] || continue
    PASSED=$(jq -r '.passed' "$f" || echo "error")
    if [ "$PASSED" = "false" ]; then
      HIGH=$(jq -r '.highCount' "$f" || echo "unknown")
      echo "❌ Review failed: $HIGH HIGH severity issues found ($f)" >&2
      FAILED=1
    elif [ "$PASSED" = "error" ]; then
      echo "❌ Review failed: Could not parse verdict file ($f)" >&2
      FAILED=1
    fi
  done
fi

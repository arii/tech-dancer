#!/bin/bash
# audit_bulk.sh: Batch fetch PR data for review

PR_NUMBERS=$@

if [ -z "$PR_NUMBERS" ]; then
  echo "Usage: ./dev-tools/audit_bulk.sh <PR1> <PR2> ..."
  exit 1
fi

mkdir -p dev-tools/logs/reviews

for PR in $PR_NUMBERS; do
  echo "Fetching PR #$PR..."
  python3 dev-tools/fetch_pr_review_data.py "$PR"
done

echo "✅ Batch fetch complete. Reviews ready in dev-tools/logs/reviews/"

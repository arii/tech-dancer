#!/bin/bash
REVIEWS=(
  "dev-tools/logs/reviews/pr-review-224.md"
  "dev-tools/logs/reviews/pr-review-223.md"
  "dev-tools/logs/reviews/pr-review-188.md"
  "dev-tools/logs/reviews/pr-review-157.md"
  "dev-tools/logs/reviews/pr-review-221.md"
  "dev-tools/logs/reviews/pr-review-154.md"
  "dev-tools/logs/reviews/pr-review-148.md"
  "dev-tools/logs/reviews/pr-review-147.md"
  "dev-tools/logs/reviews/pr-review-146.md"
  "dev-tools/logs/reviews/pr-review-195.md"
  "dev-tools/logs/reviews/pr-review-213.md"
  "dev-tools/logs/reviews/pr-review-191.md"
)

for review in "${REVIEWS[@]}"; do
  echo "Submitting $review..."
  python3 dev-tools/submit_pr_review_data.py "$review" --event=COMMENT
done

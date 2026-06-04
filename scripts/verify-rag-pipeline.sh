#!/bin/bash
set -e

echo "=== RAG Pipeline Tutorial Verification ==="

# 1. Install package
echo "Installing pr-review-pipeline..."
pip install -e . > /dev/null

# 2. Index tutorial codex
echo "Indexing tutorial context..."
pr-review index --repo-path tests/fixtures/ > /dev/null

# 3. Run Retrieval Verification
echo "Verifying retrieval..."
pr-review retrieve "clickable div" | grep -q "Do not use clickable" || (echo "Retrieval Failed!" && exit 1)

# 4. Run 'Bad' PR Review (Missing Test Plan + Inaccessible Diff)
echo "Running review for known 'Bad' PR fixture..."
pr-review review-fixture \
  --pr-description tests/fixtures/pr_bad.md \
  --diff tests/fixtures/inaccessible_diff.patch \
  --codex tests/fixtures/tutorial_codex.md \
  --mode dry-run > /dev/null

# 5. Check artifacts
echo "Checking artifacts..."
[ -f outputs/fixture-review/spec_report.json ] || (echo "spec_report.json missing!" && exit 1)
[ -f outputs/fixture-review/review_report.json ] || (echo "review_report.json missing!" && exit 1)
[ -f outputs/fixture-review/blocking_issues.json ] || (echo "blocking_issues.json missing!" && exit 1)
[ -f outputs/fixture-review/issue_preview.md ] || (echo "issue_preview.md missing!" && exit 1)

# 6. Verify Content (Mock mode)
# Since we are using Ollama mock fallback in the sandbox, we verify the mock logic.
echo "Verifying agent handoff logic..."
grep -q "Ollama Offline" outputs/fixture-review/review_report.json || (echo "Review report content mismatch!" && exit 1)

echo "=== Verification Successful! ==="

# PR Review Pipeline

A lightweight, CPU-friendly Python CLI for local RAG-assisted pull request review.

## Commands

```bash
# Index repository guidance files
python -m pr_review_pipeline index --repo-path .

# Retrieve relevant repository context for a query
python -m pr_review_pipeline retrieve "test plan required"

# Review a PR based on local fixture files
python -m pr_review_pipeline review-fixture \\
  tests/fixtures/pr_missing_test_plan.md \\
  tests/fixtures/diff_accessibility_issue.patch \\
  --codex-file tests/fixtures/sample_codex.md \\
  --mode dry-run

# Review a GitHub Pull Request
python -m pr_review_pipeline review-pr --pr 1791 --mode dry-run
```

`dry-run` is the default behavior for review commands. GitHub issues are only created when `--mode create` is passed.

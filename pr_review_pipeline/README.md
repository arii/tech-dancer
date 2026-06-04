# PR Review Pipeline

A lightweight, CPU-friendly Python CLI for local RAG-assisted pull request review.

## Commands

```bash
python -m pr_review_pipeline index --repo .
python -m pr_review_pipeline retrieve "test plan required" --repo .
python -m pr_review_pipeline review-fixture \
  --pr-description tests/fixtures/pr_missing_test_plan.md \
  --diff tests/fixtures/diff_accessibility_issue.patch \
  --codex tests/fixtures/sample_codex.md \
  --mode dry-run
python -m pr_review_pipeline review-pr --repo . --pr 1791 --mode dry-run
```

`dry-run` is the default behavior for review commands. GitHub issues are only created when `--mode create` is passed.

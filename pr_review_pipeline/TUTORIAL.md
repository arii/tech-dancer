# PR Review Pipeline: End-to-End Tutorial

Welcome to the PR Review Pipeline tutorial! This guide will walk you through setting up and running a local, RAG-powered code review.

## 1. Prerequisites

- **Python 3.11+**
- **Ollama**: [Download and install](https://ollama.com/).
- **GitHub CLI**: `gh auth login`.

## 2. Setup

First, install the pipeline in editable mode:

```bash
pip install -e .
```

Pull the required model for Ollama:

```bash
ollama pull qwen2.5-coder:3b
```

## 3. Step-by-Step Walkthrough

### Step A: Indexing the Repository

The pipeline needs context to know your repository's rules. We'll use the provided tutorial codex.

```bash
pr-review index --repo-path .
```

This command scans files like `CODEX.md` and `README.md`, chunks them, and stores them in a local `.rag/` vector database.

### Step B: Verifying Retrieval

Let's make sure the pipeline can find the relevant rules:

```bash
pr-review retrieve "clickable div"
```

You should see snippets from your codex about accessibility rules.

### Step C: Running a Mock Review (Fixture Mode)

Let's test the pipeline against a PR that we know has issues.

**The "Bad" PR:**
- **Description**: `tests/fixtures/pr_missing_test_plan.md` (Missing the "Test Plan" section).
- **Diff**: `tests/fixtures/diff_accessibility_issue.patch` (Introduces a clickable `<div>` instead of a button).

Run the review:

```bash
pr-review review-fixture \\
  --pr-description tests/fixtures/pr_missing_test_plan.md \\
  --diff tests/fixtures/diff_accessibility_issue.patch \\
  --codex tests/fixtures/sample_codex.md
```

### Step D: Inspecting the Results

The results are saved in `outputs/fixture-review/`.

1. **`spec_report.json`**: Should show a status of `fail` or `warning` because the test plan was missing.
2. **`review_report.json`**: Should contain a finding about the clickable `<div>` being an accessibility regression.
3. **`issue_preview.md`**: Shows the draft GitHub issues that *would* be created if you were in `create` mode.

## 4. Real World Usage

To review a real Pull Request from your repository:

```bash
pr-review review-pr --pr 123 --mode dry-run
```

If you are satisfied with the drafts and want to create the issues:

```bash
pr-review review-pr --pr 123 --mode create
```

## 5. Summary

You've successfully:
1. Set up a local RAG environment.
2. Indexed your project's engineering standards.
3. Automated a multi-agent review that caught both process (missing test plan) and code (accessibility) issues.

# PR Review Pipeline

A lightweight, CPU-friendly Python CLI for local RAG-assisted pull request review.

## Installation

```bash
# Clone the repository
git clone https://github.com/arii/tech-dancer.git
cd tech-dancer

# Create a virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install the package in editable mode
pip install -e .
```

## Setup

1. **Ollama**: Ensure [Ollama](https://ollama.com/) is installed and running.
   ```bash
   ollama pull qwen2.5-coder:3b
   ```
2. **Environment**: Copy `.env.example` to `.env` and configure your settings.
   ```bash
   cp .env.example .env
   ```
3. **GitHub CLI**: Ensure `gh` is installed and authenticated.
   ```bash
   gh auth login
   ```

## Commands

The pipeline is available via the `pr-review` command:

```bash
# Index repository guidance files (CODEX.md, README.md, etc.)
pr-review index --repo-path .

# Retrieve relevant repository context for a query
pr-review retrieve "test plan required"

# Review a PR based on local fixture files (Dry Run)
pr-review review-fixture \\
  --pr-description tests/fixtures/pr_missing_test_plan.md \\
  --diff tests/fixtures/diff_accessibility_issue.patch \\
  --codex tests/fixtures/sample_codex.md

# Review a real GitHub Pull Request
pr-review review-pr --pr 1791 --mode dry-run
```

## Modes

- `dry-run` (Default): Writes reports to `outputs/pr-{number}/` but makes no remote changes.
- `create`: Creates GitHub issues for any blocking findings.

## Development & Testing

```bash
# Run the test suite
pytest tests/test_pipeline.py
```

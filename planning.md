# Automation Pipeline Planning: Persistent Issues & Remedies

This document outlines the persistent technical hurdles encountered during the automated Pull Request review process and provides strategic remedies for ensuring 100% reliability in future iterations.

## 1. Line Resolution Failures (GitHub 422 Errors)

### The Issue
The GitHub API returns a `422 Unprocessable Entity` error when a review comment is submitted for a line that is not part of the PR diff or has moved significantly. Our current scripts sometimes fallback to `line: 1` or use incorrect hunk offsets.

### Remedies
- **Context-Aware Mapping**: Enhance `submit_pr_review_data.py` to parse the `patch` data directly from the PR files API to verify that a target line exists in the diff range before submission.
- **Side Detection**: Ensure `side: RIGHT` (the new code) is always explicitly specified unless reviewing deletions.
- **Defensive Fallback**: If a line cannot be resolved with 100% certainty, automatically convert the comment to a general PR review body comment instead of failing the entire submission.

## 2. JSON Parsing & Extraction Volatility

### The Issue
LLM-generated JSON inside Markdown fences can sometimes include leading/trailing text, invalid escaping, or Markdown bolding (e.g., `**{...}**`) that breaks standard `json.loads()`.

### Remedies
- **Fuzzy JSON Extraction**: Implement a robust regex-based extraction that finds the first `{` and last `}` within a fence and ignores surrounding "slop" or formatting markers.
- **Validation Pass**: Add a pre-submission linting step for generated JSON payloads to catch missing commas or unclosed braces before they hit the API.

## 3. Scope Detection Complexity

### The Issue
Identifying "Scope Creep" programmatically (Rule #137) is difficult because it requires understanding the semantic distance between changed files (e.g., is changing `Navigation.tsx` and `database.ts` related?).

### Remedies
- **Directory Variance Threshold**: Flag any PR that touches more than 3 distinct top-level directories (e.g., `src/features/`, `src/layouts/`, `scripts/`) for manual "Monolith Review".
- **File Counter**: Automatically reject any PR exceeding 200+ additions unless it is flagged as a "Refactor" or "Dependency Update".

## 4. Environment-Specific Auth Issues

### The Issue
Relying on `gh auth token` is robust but can fail in restricted CI environments or when `GITHUB_TOKEN` is shadowed.

### Remedies
- **Explicit Auth Chain**: Standardize a lookup order: `env.GITHUB_TOKEN` -> `gh auth token` -> `.gh_token` file.
- **Token Scoping Check**: Add a startup check to verify the current token has `pull_request` write permissions.

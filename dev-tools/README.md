# GitHub Collaborative Dev Tool

A unified command-line tool for managing GitHub Pull Request reviews and collaborative development. It works across any repository by automatically detecting your Git environment. It seamlessly consolidates offline markdown planning and online API interactions.

## Prerequisites
- Python 3.7+
- `requests` library (`pip install requests`)
- A GitHub Personal Access Token set as `GITHUB_TOKEN` in your environment.

## Installation & Setup (Alias)

To make this tool easily accessible from anywhere in your terminal, set up an alias:

1. Make the script executable:
   ```bash
   chmod +x "dev-tools/gh_collab.py"
   ```

2. Add the alias to your `~/.bashrc`, `~/.zshrc`, or equivalent shell profile (replace `/path/to/` with your actual absolute path):
   ```bash
   alias gh-collab="python3 /path/to/dev-tools/gh_collab.py"
   ```

3. Reload your profile (e.g., `source ~/.zshrc`). Now you can use `gh-collab` directly from any project directory!

## Usage

This tool has three main commands: `plan`, `create`, and `submit`.

### 1. Plan
Generates a markdown document to help you track and strategize responses to PR comments.

```bash
gh-collab plan \
  --pr-info pr.json \
  --inline inline.json \
  --general general.json \
  --reviews reviews.json \
  --output PR_Plan.md
```

### 2. Create
Creates a pending PR review on GitHub. You can pass a simple body string or a JSON file containing structured review data.

```bash
# Using a simple string
gh-collab create 123 --body "Starting my review."

# Using a JSON file
gh-collab create 123 --file review_payload.json
```

### 3. Submit
Submits your pending review with a specific action (`APPROVE`, `REQUEST_CHANGES`, or `COMMENT`).

```bash
gh-collab submit 123 APPROVE
```

## AI Agent Integration (agent.md)

To enable AI agents (like Cursor, Aider, or custom integrations) to use this tool autonomously, add the following to your project's `agent.md` or `.cursorrules` file:

### PR Review & Feedback Workflow
When asked to address PR comments or review code, utilize the `gh-collab` CLI tool (located at `dev-tools/gh_collab.py`):
1. **Plan:** If raw JSON comment data is present, run `python3 dev-tools/gh_collab.py plan ...` to generate a `PR_Plan.md` file. Read this file to understand the requested changes.
2. **Draft Reviews:** As you fix code, use `python3 dev-tools/gh_collab.py create <PR_NUMBER> --body "<Your message>"` to draft your responses.
3. **Submit:** Once code changes are pushed, run `python3 dev-tools/gh_collab.py submit <PR_NUMBER> COMMENT` to finalize the review.
*Ensure `GITHUB_TOKEN` is exported in the environment before running.*

## Global Flags
- `--repo`: Override the auto-detected repository (e.g., `--repo octocat/Hello-World`).
- `--dry-run`: Simulate API requests without making actual changes.

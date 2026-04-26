# Developer Tools (`dev-tools/`)

This directory contains unified scripts and command-line tools for managing development workflows, GitHub Pull Request reviews, test automation, and code planning. It seamlessly consolidates offline markdown planning, test automation, and online API interactions.

## Tool Categories

### 1. Collaborative Dev & PR Reviews (`gh_collab.py`)
A comprehensive tool for managing PR reviews.
* `plan`: Generates a markdown document to strategize responses.
* `create`: Creates a pending PR review on GitHub.
* `submit`: Submits a pending review with `APPROVE`, `REQUEST_CHANGES`, or `COMMENT`.
* Usage: `python3 dev-tools/gh_collab.py [plan|create|submit] ...`

### 2. Planning Tools (`generate_plan.py`)
Uses the `llm` CLI to generate structured implementation plans from GitHub issues.
* Usage: `python3 dev-tools/generate_plan.py <issue_number>`
* Reads prompts from `instructions.txt` and `plan-template.md`.

### 3. Visual UX Auditor (`ux-capture.cjs` & `IMPECCABLE_AUDIT.md`)
Automates visual testing for the Impeccable Design framework.
* `ux-capture.cjs`: Uses Playwright to capture UI screenshots.
* `IMPECCABLE_AUDIT.md`: A structured checklist for verifying screenshots against design anti-patterns (Cardocalypse, Centering Sickness, etc).

### 4. VDev Integration (`vdev.py`)
CLI tool for spinning up isolated development environments automatically.
* Usage: `python3 dev-tools/vdev.py [setup|exec|cleanup] <branch>`

### 5. PR Review Manager (`pr_review_manager.py`)
Principled tool to track PR review states and clean up obsolete comments.
* Features: Commit-aware re-review tracking, CI status monitoring, and automated comment cleanup.
* Usage: `python3 dev-tools/pr_review_manager.py [--execute] [--skip-cleanup]`

## Prerequisites
- Python 3.7+
- `requests`, `playwright`, and `PyGithub` libraries
- A GitHub Personal Access Token set as `GITHUB_TOKEN` in your environment.
- `gh` CLI (for token retrieval) and `llm` CLI installed.

## AI Agent Integration
AI agents are instructed via `AGENTS.md` to use these tools autonomously to:
1. Review PR feedback using `gh_collab.py`.
2. Evaluate visual designs using `ux-capture.cjs`.
3. Plan task execution utilizing `generate_plan.py`.


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


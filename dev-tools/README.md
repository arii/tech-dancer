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

### 3. Visual UX Auditor (`audit_capture.py` & `IMPECCABLE_AUDIT.md`)
Automates visual testing for the Impeccable Design framework.
* `audit_capture.py`: Uses Playwright to capture UI screenshots.
* `IMPECCABLE_AUDIT.md`: A structured checklist for verifying screenshots against design anti-patterns (Cardocalypse, Centering Sickness, etc).

### 4. VDev Integration (`vdev.py`)
CLI tool for spinning up isolated development environments automatically.
* Usage: `python3 dev-tools/vdev.py [setup|exec|cleanup] <branch>`

## Prerequisites
- Python 3.7+
- `requests` and `playwright` libraries
- A GitHub Personal Access Token set as `GITHUB_TOKEN` in your environment (for `gh_collab`).
- `gh` CLI and `llm` CLI installed (for `generate_plan.py`).

## AI Agent Integration
AI agents are instructed via `AGENTS.md` to use these tools autonomously to:
1. Review PR feedback using `gh_collab.py`.
2. Evaluate visual designs using `audit_capture.py`.
3. Plan task execution utilizing `generate_plan.py`.

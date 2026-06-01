---
title: "The Tech-Dancer DevAI Pipeline: Orchestrating Local LLMs"
date: "2024-05-10"
author: "Ariel Anders"
category: "DevAI"
tags: ["DevOps", "AI", "Ollama", "GitHub Actions", "Playwright"]
excerpt: "How I built an automated DevOps pipeline that uses local LLMs to audit code reviews and triage CI logs without third-party API dependency."
readTime: 12
status: "published"
---

Stop relying on expensive third-party LLM APIs for CI/CD. For the Tech-Dancer platform, I built a DevAI pipeline that uses local LLMs (via Ollama) to review pull requests, catch visual regressions, and triage failing logs directly on our runners.

Here is the architecture of the Tech-Dancer automation suite.

## 1. Context Aggregation: Simpler Prompts via Pre-Fetched Data

A common mistake in DevAI is forcing the agent to spend tokens querying the codebase for basic context. Instead, we use **aggregation scripts** like `td-cli gh audit-pr --fetch` and `td-cli gh aggregate`.

These tools pre-process the PR diffs, CI logs, and linked issue descriptions into a single, high-density context file. This allows us to use much simpler, more focused prompts for the LLM because the "heavy lifting" of data collection is already done.

```bash
# Example: Aggregating multiple PRs into a single technical context
python3 dev-tools/td_cli.py gh aggregate --target-branch consolidated-fix --pr-numbers 123 124 125
```

## 2. Local LLM Orchestration with Ollama

The heart of the pipeline is a local model orchestration layer. Instead of sending code to an external provider, we use the `code-reviewer` model (a custom-prompted Qwen2.5 derivative) running via Ollama.

```python
# dev-tools/ollama_reviewer.py
from utils import call_ollama

MODEL = "code-reviewer"

def review_file(file_path):
    with open(file_path, "r") as f:
        content = f.read()

    prompt = f"Please review the following code for design token violations:\n\n```\n{content}\n```"

    # call_ollama handles the local API request to http://localhost:11434
    review = call_ollama(prompt, model=MODEL)
    print(review)
```

## 3. Autonomous Repair with `@jules-fix-ci`

When a CI run fails, we don't just alert the developer; we offer an autonomous fix. By commenting `@jules-fix-ci` on a PR, we trigger a dedicated GitHub Action that initializes an AI repair session using `td-cli agent fix-ci`.

This tool automatically triages the failure logs, maps them to specific lines of code, and generates a proposed fix—often before the developer has even seen the notification.

## 4. Multi-State Review Invocation

Feedback must be actionable. Our `submit_review.py` script handles different comment types—`APPROVE`, `REQUEST_CHANGES`, and `COMMENT`—based on the agent's findings. This "multi-state" invocation ensures that critical design system violations (like raw Tailwind arbitrary values) strictly block the build, while minor suggestions are posted as non-blocking comments.

```python
# dev-tools/submit_review.py logic
event = "REQUEST_CHANGES" if "Not Approved" in payload else "APPROVE"
pr.create_review(body=payload["body"], comments=payload["comments"], event=event)
```

## 5. Playwright Visual Regression Gates

We use Playwright as a visual telemetry system. Any change to the `src/features` layer triggers a visual regression comparison. If a shift is detected, the AI UX Auditor analyzes the screenshot diff to determine if the regression was an intentional design update or an accidental break.

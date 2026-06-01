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

## 1. Local LLM Orchestration with Ollama

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

## 2. CI Log Triage and Automated Debugging

When a build fails, the `triage_failure.py` script parses the raw logs and identifies the root cause using a local synthesis model. This prevents developers from digging through 1,000+ lines of Vite build output.

```python
# dev-tools/triage_failure.py
import sys
from utils import call_ollama

def triage_log(log_data):
    prompt = f"Analyze this CI failure log and identify the failing line and fix:\n\n{log_data}"
    return call_ollama(prompt, model="llama3.2")

if __name__ == "__main__":
    log_data = sys.stdin.read()
    print(triage_log(log_data))
```

## 3. Playwright Visual Regression Gates

We use Playwright not just for functional tests, but as a visual telemetry system. Any change to the `src/features` layer triggers a visual regression comparison to ensure design token consistency across desktop and mobile.

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'Desktop Chrome', use: { ...devices['Desktop Chrome'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],
});
```

## 4. Automated PR Review Submission

The final step is the automated submission of the agent's findings back to GitHub. The `submit_review.py` script integrates with the `gh` CLI to post inline comments, ensuring that AI-driven feedback is as actionable as a human peer review.

```python
# dev-tools/submit_review.py excerpts
from utils import get_github_client, get_repo_name

def submit_review(pr_number, review_payload):
    repo = get_github_client().get_repo(get_repo_name())
    pr = repo.get_pull(int(pr_number))

    # Post review with inline comments extracted from the local model output
    pr.create_review(
        body=review_payload.get("body"),
        comments=review_payload.get("comments"),
        event="COMMENT"
    )
```

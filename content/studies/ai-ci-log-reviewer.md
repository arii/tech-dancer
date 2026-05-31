---
title: "Using AI Agents to Review GitHub Actions CI Logs"
date: "2024-04-11"
category: "DevAI"
excerpt: "Stop digging through thousands of lines of logs. Learn how to use AI to automatically diagnose CI failures and suggest fixes."
tags: ["CI/CD", "GitHub Actions", "AI Debugging", "Automation"]
readTime: 9
status: "published"
author: "Ariel Anders"
---

# Diagnosing CI Failures with AI

CI logs are notoriously verbose. When a test fails in a deep dependency, finding the root cause can take 15-20 minutes of manual scrolling. Our `LogAnalyzer` agent reduces this to seconds.

## The Diagnostic Pipeline

1.  **Failure Detection**: A GitHub Action `workflow_run` triggers on completion of the main CI suite.
2.  **Log Retrieval**: We use the GitHub API to download the `.zip` archive of logs for the failed run.
3.  **Heuristic Filtering**: We strip out successful steps and focus on the `stderr` of the failed step.
4.  **AI Inference**: The filtered log is sent to a specialized model (like Claude 3 Haiku) with a "debugger" system prompt.

## Real-world Example

In a recent failure where `pnpm install` failed due to a peer dependency conflict, the AI agent not only identified the conflicting package but provided the exact `pnpm install --save-exact` command to resolve it.

## Implementation Tip

Don't send the entire log. Use `grep` or custom scripts to extract the last 100 lines of the failed step to stay within token limits and reduce latency.

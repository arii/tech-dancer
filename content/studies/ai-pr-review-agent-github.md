---
title: "How to Build an AI PR Review Agent for GitHub"
date: "2024-04-07"
category: "DevAI"
excerpt: "Automate code reviews using LLMs. Learn how to build an agent that understands your project's coding standards and provides actionable feedback."
tags: ["AI", "Code Review", "LLM", "GitHub Actions"]
readTime: 15
status: "published"
author: "Ariel Anders"
---

# Elevating Code Quality with AI

Code review is a bottleneck. Our AI PR Review Agent uses GPT-4 to perform first-pass reviews, catching common anti-patterns and style violations before a human ever looks at the code.

## System Architecture

1.  **Event Trigger**: `pull_request` event (opened or synchronized).
2.  **Context Gathering**: The agent fetches the PR diff and relevant files.
3.  **Prompt Engineering**: We use a "System Prompt" that defines our project's specific rules (e.g., "Use Tailwind tokens instead of arbitrary values").
4.  **Feedback Loop**: The agent posts comments on specific lines using the GitHub Checks API.

## Case Study: Catching Tailwind Anti-patterns

The agent is trained to spot `-[123px]` arbitrary values in our Tailwind code. When it finds one, it suggests the nearest design token (e.g., `spacing-4`).

## Human-in-the-Loop

AI reviews are meant to *assist*, not replace. Developers can reply to the AI's comment to "discuss" a suggestion, or simply ignore it if the context is missing.

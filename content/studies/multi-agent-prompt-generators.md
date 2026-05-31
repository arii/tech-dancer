---
title: "Designing Multi-Agent Prompt Generators for Code Review"
date: "2024-04-09"
category: "DevAI"
excerpt: "Why one prompt isn't enough. Learn how to orchestrate multiple specialized agents to generate higher-quality code review feedback."
tags: ["Prompt Engineering", "Multi-Agent Systems", "AI"]
readTime: 14
status: "published"
author: "Ariel Anders"
---

# The Multi-Agent Advantage

A single large prompt often suffers from "attention loss." By splitting the review task into multiple agents, we achieve 40% higher accuracy in identifying logic bugs.

## Our Agent Roles

- **The Architect**: Focuses on high-level design, file structure, and dependency management.
- **The Security Specialist**: Scans for SQL injection, XSS, and insecure dependency versions.
- **The Performance Auditor**: Looks for unnecessary re-renders in React and inefficient SQL queries.
- **The Stylist**: Ensures adherence to the `eslint` and `prettier` configurations.

## Orchestration Logic

We use a "Lead Agent" to synthesize the findings from these four specialists into a single, cohesive PR summary. This prevents "notification fatigue" for the developer.

```mermaid
graph TD
    PR[Pull Request Diff] --> Orchestrator
    Orchestrator --> Architect
    Orchestrator --> Security
    Orchestrator --> Performance
    Architect --> Summary
    Security --> Summary
    Performance --> Summary
    Summary --> PR_Comment[Final GitHub Comment]
```

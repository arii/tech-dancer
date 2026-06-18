---
type: post
title: "Moving Beyond AI Assisted Engineering"
date: "2026-06-13"
author: "Ariel Anders, PhD"
category: "Tech"
excerpt: "Discover how I transitioned from manual AI-assisted coding to building a fully automated, deterministic DevAI platform for Tech-Dancer using local LLMs, Playwright, and multimodal visual regression testing."
---

For the past year, I have leaned heavily on AI coding assistants to accelerate the development of complex platforms like my real-time Bluetooth HRM dashboard and Tech-Dancer (BoomTick.blog). However, I quickly hit a wall common to 'AI-assisted engineering': autonomous agents generating massive volumes of code that required tedious manual review, leading to hidden technical debt, semantic duplication, and painful merge conflicts.

To solve this, I transitioned from simple AI assistance to **DevAI**—building autonomous developer tooling that puts rigorous, deterministic guardrails around AI generation. Here is how I evolved my architecture:

### 1. Deterministic Blast Radius Analysis
Instead of asking an LLM to guess what a code change might break, I implemented static dependency graph analysis. By performing an upward traversal from a Git diff using Dependency Cruiser, the CI/CD pipeline deterministically maps changed files directly to specific React page routes and sitemap URLs, identifying the exact 'blast radius'.

### 2. Multimodal Visual Regression Auditing
Once the blast radius is identified, the pipeline dynamically triggers Playwright to capture 'before', 'after', and 'pixel-diff' screenshots of the affected viewports. To run this efficiently on local hardware, these images are cropped to the specific mutation and passed to a minimal-compute vision model (`moondream`). This allows the DevAI agent to verify dynamic state transitions and catch layout regressions without relying on expensive cloud APIs.

### 3. Semantic Code Pruning
AI coders often duplicate business logic in slightly different ways across multiple custom hooks. Standard static linters miss this. By integrating Abstract Syntax Tree (AST) analysis into my RepoAuditor AI pipeline, the system traverses the React component tree to detect semantic similarities and automatically dispatches structured GitHub issues to consolidate duplicate code.

Moving beyond AI-assisted engineering means treating AI not just as a raw code generator, but as a specialized component operating within a highly deterministic, self-healing pipeline.

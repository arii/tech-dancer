---
type: study
title: "Confidently incorrect: The latest stable major version is @v4"
date: "2026-06-20"
author: "Ariel Anders"
category: "DevAI"
tags: ["AI", "GitHub Actions", "Agentic Workflows", "LLM"]
excerpt: "An exploration of AI's out-of-distribution data errors, where models confidently recommend outdated versions of software due to training data cutoffs."
readTime: 2
status: "published"
---

Like everyone else I have been playing around with agentic workflows and wanted to create a targeted code reviewer (read: lower token usage with a smaller model, essential code diffs, minimal external context, etc).

Both my agentic coder and reviewer suggested downgrading my github actions/checkout version to v4. For context v4.1.0 was released Sep 22, 2023 and v5.0.1 was released Nov 17, 2025.

![AI reviewer incorrectly flagging v6 and suggesting a downgrade to v4](/images/studies/ai-incorrect-v4-suggestion.png)

This is a classic out-of-distribution data error. It is illuminating to see how AI-generated outputs remain susceptible to providing dated results based on their training data cutoff. It wasn’t just my minimal reviewer (gpt-4o-mini released July 2024): Even recent larger reasoning models can provide similar responses; for instance, Gemini 3.1 Pro (released Feb 2026) also incorrectly identified v4 as the latest stable version during a brief check.

![GitHub Actions/checkout v7.0.0 release page showing v4 is far from the latest](/images/studies/github-checkout-v7-release.png)

That being said I’m still impressed and excited about AI assistant engineering to increase engineering velocity, but I would also recommend dependbot to keep your version up to date.

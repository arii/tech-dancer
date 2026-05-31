---
title: "Building a Visual Regression Workflow with Playwright and AI Review"
date: "2024-04-13"
category: "Engineering"
excerpt: "Visual regressions are hard to catch. Learn how to combine Playwright screenshots with AI vision models to automate UI testing."
tags: ["Playwright", "Visual Regression", "AI Vision", "Testing"]
readTime: 13
status: "published"
author: "Ariel Anders"
---

# AI-Powered Visual Testing

Standard visual regression tools (like Pixelmatch) are often too sensitive, flagging 1px shifts or anti-aliasing differences as failures. By using AI Vision (GPT-4V), we can distinguish between "broken UI" and "expected rendering variance."

## The Workflow

1.  **Baseline Generation**: Playwright takes screenshots of key routes on the `main` branch.
2.  **Comparison**: On a PR, Playwright takes new screenshots.
3.  **Vision Analysis**: If a diff is detected, both images are sent to the AI agent.
4.  **Semantic Approval**: The agent determines if the change is intentional (e.g., a planned CSS change) or a regression.

## Handling Dynamic Content

One of the biggest challenges in visual testing is dynamic data (like dates). We use Playwright's `mask` feature to hide these elements before screenshotting, ensuring the AI focuses only on the layout and components.

```javascript
await page.screenshot({
  path: 'screenshot.png',
  mask: [page.locator('.dynamic-date')]
});
```

## Results

Since implementing AI review, our false-positive rate for visual regressions has dropped by 85%, allowing developers to trust the CI signals again.

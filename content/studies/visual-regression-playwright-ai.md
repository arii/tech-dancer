---
title: "Building a Visual Regression Workflow with Playwright and AI Review"
date: "2024-04-12"
category: "DevAI"
excerpt: "Automate UI testing and catch visual regressions before they hit production."
tags: ["Playwright", "Visual Testing", "AI", "Frontend"]
readTime: 13
status: "published"
author: "Ariel Anders"
---

# Automated Visual Verification

UI changes are hard to test with unit tests alone. Our visual regression workflow uses Playwright to capture and compare screenshots.

## The Workflow

1.  **Capture**: Capturing desktop and mobile screenshots for every PR.
2.  **Comparison**: Using AI to analyze visual diffs and distinguish between intentional changes and regressions.
3.  **Reporting**: Providing a visual report to reviewers within the GitHub UI.

## Technology Stack

*   **Playwright**: For cross-browser screenshot capture.
*   **Gemini/GPT-4**: For intelligent image analysis.
*   **GitHub Actions**: For orchestrating the entire process.

## Impact

This system has helped us catch several breaking UI changes in our navigation and grid layouts before they reached our users.

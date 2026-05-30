---
title: "Deploying a Vite React App with Vercel and GitHub Actions"
date: "2024-03-25"
category: "DevOps"
excerpt: "Optimize your deployment pipeline by combining the speed of Vercel with the flexibility of GitHub Actions for advanced CI/CD checks."
tags: ["Vercel", "Vite", "GitHub Actions", "Deployment"]
readTime: 6
status: "published"
author: "Ariel Anders"
---

# Deploying Vite with Vercel and GitHub Actions

While Vercel offers seamless GitHub integration, using GitHub Actions as an intermediary allows for more complex CI/CD workflows, such as visual regression testing or custom security audits.

## The Hybrid Approach

By using the Vercel CLI within a GitHub Action, you gain full control over when and how your application is deployed.

## Implementation Guide

1. **Vercel Tokens**: Store your `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` in GitHub Secrets.
2. **Workflow Configuration**: Use the `vercel/actions` or run `vercel build` and `vercel deploy --prebuilt` directly.
3. **Custom Gates**: Add steps for `pnpm run audit`, `pnpm test`, or Playwright E2E tests before the final deployment step.

## Why use this?

This setup ensures that your site is only updated if all your custom quality gates pass, providing a higher level of confidence than the default "deploy on push" behavior.

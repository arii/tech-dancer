---
type: post
draft: true
title: "How I used GitHub Actions to power this site"
date: "2026-04-18"
author: "Ariel Anders"
category: "Tech"
excerpt: "Automated deployments and CI/CD pipelines for a tech-forward dance blog."
image: ""
tags:
  - automation
  - cicd
  - github
---

<Notice type="warning">
**Technical Notes: Dev-Ops**
Automating the "Impeccable" audit gate and bundle size checks to maintain high design standards and performance.
</Notice>

## Reliable Deployments for BoomTick.blog

Building a "living portfolio" requires a way to handle the mundane tasks of deployment. I use **GitHub Actions** to automate the build, test, and release cycles of this platform. This ensures that every update, from a new gear review to a deep-dive research study, is verified before it goes live.

### The CI/CD Setup

My process is split into three primary stages: **Verification**, **Audit**, and **Deployment**.

#### 1. Verification (Lint & Test)

This stage ensures code quality and functional correctness.

```yaml
name: CI
on: [push, pull_request]

jobs:
  lint-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm run lint
      - run: pnpm run type-check
      - run: pnpm test
```

#### 2. Anti-Pattern Audit

To maintain the "Impeccable" design standards of this site, I've integrated a custom audit script.

```yaml
audit:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - run: pnpm install
    - name: UI Anti-Pattern Audit
      run: |
        node boomtick-pkg/scripts/detect-antipatterns.mjs || true
        td-cli audit-gate
```

#### 3. Build & E2E Testing

Before deployment, the application is subjected to end-to-end (E2E) tests.

```yaml
test-build:
  needs: lint-typecheck
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - run: pnpm install
    - name: Build App
      run: pnpm run build
    - name: Run Playwright Smoke Test
      run: pnpm run test:e2e
```

### Troubleshooting Common Issues

Even the best pipelines fail. Here are the most common issues:

- **Stale Lockfile:** If CI fails on the `Verify lockfile integrity` step, run `pnpm install` locally.
- **Visual Regression Failure:** If UI changes are intentional, run `pnpm test:e2e --update-snapshots`.
- **Node Engine Mismatch:** The project pins Node.js to version 22. Use `nvm use` or check `.node-version`.

Automating the boring parts allows me to focus on what matters: analyzing dance data and sharing insights with the WCS community.

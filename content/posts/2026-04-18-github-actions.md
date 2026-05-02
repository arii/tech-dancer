---
type: post
title: "How I used GitHub Actions to power this site"
date: "2026-04-18"
author: "Ariel Anders, PhD"
category: "Tech"
excerpt: "Automated deployments and CI/CD pipelines for a tech-forward dance blog."
image: ""
tags:
  - automation
  - cicd
  - github
---

<Notice type="warning">
**Lab Notes: Dev-Ops Evolution**

- **Current State:** Basic automated build and deploy.
- **Why Improvement is Needed:** Manual checks for design anti-patterns were slow and inconsistent.
- **Action Items:**
  - [x] Implement design pattern audit gate.
  - [x] Automate bundle size regression checks.
  - [ ] Add visual regression testing for mobile viewports.
</Notice>

## Reliable Deployments for the Tech-Dancer

Building a "living portfolio" requires a system that handles the mundane tasks of deployment. I use **GitHub Actions** to automate the build, test, and release cycles of this platform. This ensures that every update, from a new gear review to a deep-dive data study, is verified before it goes live.

### The CI/CD Architecture

My workflow is split into three primary stages: **Verification**, **Audit**, and **Deployment**. This modular approach allows for rapid feedback during development.

#### 1. Verification (Lint & Test)

This stage ensures code quality and functional correctness. It runs on every push and pull request.

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
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm run lint
      - run: pnpm run type-check
      - run: pnpm test
```

#### 2. Anti-Pattern Audit

To maintain the "Impeccable" design standards of this site, I've integrated a custom audit script that checks for design anti-patterns like "Cardocalypse" or "Grid Fatigue".

```yaml
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install
      - name: UI Anti-Pattern Audit
        run: |
          pnpm run audit || true
          python3 dev-tools/td_cli.py audit-gate
```

#### 3. Build & E2E Testing

Before deployment, the application is built for production and subjected to end-to-end (E2E) tests using Playwright and performance audits via Lighthouse.

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
      - name: Run Lighthouse CI
        run: pnpm run lighthouse
```

### Sample Execution Logs

When a workflow runs, GitHub Actions provides detailed output. Here is what a successful `audit` step looks like:

```text
> boomtick-blog@0.1.0 audit /home/runner/work/boomtick-blog
> node scripts/detect-antipatterns.mjs

🔍 Auditing 42 files for Impeccable design anti-patterns...

✅ No major anti-patterns detected.
✅ Layout primitives (Box, Stack, Grid) used in 98% of components.
✅ Design token compliance: 100%

✨ Audit passed!
```

### Troubleshooting Common Issues

Even the best pipelines fail. Here are the most common issues I encounter and how to fix them:

- **Stale Lockfile:** If the CI fails on the `Verify lockfile integrity` step, it means `pnpm-lock.yaml` is out of sync.
  - *Fix:* Run `pnpm install` locally and commit the updated lockfile.
- **Visual Regression Failure:** UI changes may cause Playwright snapshots to mismatch.
  - *Fix:* If the change is intentional, run `pnpm test:e2e --update-snapshots` and commit the new images.
- **Node Engine Mismatch:** The project pins Node.js to version 22. Using a different version locally might cause inconsistencies.
  - *Fix:* Use `nvm use` or check the `.node-version` file.

Automating the boring parts allows me to focus on what matters: analyzing dance data and sharing insights with the WCS community.

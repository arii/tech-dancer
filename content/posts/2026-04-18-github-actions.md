---
type: post
title: "How BoomTick.blog uses CI to keep the site fast and stable"
date: "2026-04-18"
author: "Ariel Anders, PhD"
category: "Tech"
excerpt: "Automated deployments and CI/CD pipelines for a tech-forward dance blog."
image: "/assets/posts/competition-data-thumb.svg"
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

### Why CI matters for a content site

For BoomTick.blog, CI isn't just about code; it's about content integrity. Automated checks ensure that:
- Images aren't missing or oversized.
- Internal links don't break when slugs change.
- Performance remains high (Lighthouse audits).
- The "Impeccable" design standards are met on every page.

### What runs on every PR

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
        pnpm run audit || true
        python3 dev-tools/td_cli.py audit-gate
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

### What agents should not break

As this site uses AI agents for some content management, the CI pipeline acts as a safety net. Agents must not:
- Increase the 'any' count in TypeScript.
- Bypass the bundle size limit.
- Introduce inaccessible UI components.
- Break the structured data schemas used for SEO.

### Lessons learned

- **Automate early:** Even a simple blog benefits from linting and type-checking.
- **Visual tests are key:** Playwright snapshots caught more regressions than unit tests.
- **Audit your artifacts:** Keeping track of bundle sizes prevents gradual slowdowns.

### Troubleshooting Common Issues

Even the best pipelines fail. Here are the most common issues:

- **Stale Lockfile:** If CI fails on the `Verify lockfile integrity` step, run `pnpm install` locally.
- **Visual Regression Failure:** If UI changes are intentional, run `pnpm test:e2e --update-snapshots`.
- **Node Engine Mismatch:** The project pins Node.js to version 22. Use `nvm use` or check `.node-version`.

Automating the boring parts allows me to focus on what matters: analyzing dance data and sharing insights with the WCS community.

## Change Checklist
- [x] Renamed title to be more reader-focused.
- [x] Replaced Tech-Dancer with BoomTick.blog.
- [x] Added hero image path.
- [x] Added sections on CI importance, PR checks, and agent safety.
- [x] Expanded content to be more useful for BoomTick readers.

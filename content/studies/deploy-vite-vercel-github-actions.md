---
title: "Deploying a Vite React App with Vercel and GitHub Actions"
date: "2024-04-05"
category: "Engineering"
excerpt: "Optimize your deployment pipeline with advanced Vercel configurations, preview environment security, and custom CI checks."
tags: ["Vercel", "CI/CD", "Vite", "React"]
readTime: 8
status: "published"
author: "Ariel Anders"
---

# Beyond the Default Vercel Integration

While Vercel's "Connect to GitHub" feature is great, production apps often need more control. We use the Vercel CLI within GitHub Actions to orchestrate complex deployments.

## Why Use GitHub Actions for Vercel?

- **Pre-deployment Checks**: Run Vitest and Playwright tests *before* Vercel starts building.
- **Environment Variable Injection**: Securely inject secrets from GitHub Actions into the Vercel build environment.
- **Conditional Deploys**: Only deploy if specific directories (e.g., `src/`) have changed.

## Workflow Example

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install dependencies
        run: pnpm install
      - name: Build and Test
        run: pnpm run build && pnpm run test
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## Security Considerations

We use Vercel's "Deployment Protection" to ensure that preview URLs are only accessible to team members, preventing leakers or scrapers from seeing unfinished work.

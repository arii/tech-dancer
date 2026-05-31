---
title: "Using GitHub Actions to Sync Scraped Data into a React/Vite Site"
date: "2024-04-03"
category: "DevAI"
excerpt: "A deep dive into the 'Git-as-Database' pattern: how to automate pull requests and data normalization to keep a static site updated with external data."
tags: ["React", "Vite", "GitHub Actions", "Automation"]
readTime: 10
status: "published"
author: "Ariel Anders"
---

# The Git-as-Database Pattern

For many content-heavy sites, a traditional database is overkill. Instead, we use GitHub Actions to fetch data and commit it directly to the repository as JSON or Markdown.

## The Synchronization Loop

1.  **Extraction**: The scraper runs (see our previous article).
2.  **Normalization**: A Python script validates the scraped data against our Zod schema.
3.  **Commit**: The action uses `stefanzweifel/git-auto-commit-action` to push changes.
4.  **Deployment**: Vercel detects the commit and triggers a new static build.

## Handling Conflicts

When multiple scrapers run, we use a dedicated `data-sync` branch. This prevents main branch pollution and allows for manual review if the data looks suspicious (e.g., a 50% drop in event counts).

## Performance Benefits

Because the data is local to the Vite build, there are zero runtime API calls for the user. This results in near-instant page loads and perfect SEO.

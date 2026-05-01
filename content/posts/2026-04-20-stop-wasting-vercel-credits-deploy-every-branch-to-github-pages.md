---
title: "Stop Wasting Vercel Credits: Deploy Every Branch to GitHub Pages"
date: "2026-04-20"
author: "Ariel Anders, PhD"
category: "Tech"
excerpt: "Time is your most precious commodity. Narrow the gap between coding and seeing your changes by deploying every branch to GitHub Pages."
type: "post"
---

### Kill the Vercel Build Grind

Stop paying for preview deployments. Use this setup to see your changes instantly without the point grind of managed hosting limits.

### 1. Stop Vercel from Building

Add this `ignoreCommand` to your `vercel.json`. It forces Vercel to self-select out of non-main branches so you don't waste resources.

* **Main branch:** Returns code 1 to trigger the build.
* **Other branches:** Returns code 0 to cancel immediately.

### 2. Set GitHub to Action Mode

Fix your repository settings to handle the heavy lifting.

* Go to **Settings > Pages**.
* Change **Source** to **GitHub Actions**.

### 3. Build the Multi-Branch Workflow

Your `.github/workflows/deploy.yml` acts as the lead here. It organizes your branches into one cohesive site.

* **Pull Main:** Moves your production code into `site-root`.
* **Map Features:** Maps feature branches to specific subdirectories (e.g., `site-root/feature-name`).
* **Deploy:** Uploads the entire `site-root` to GitHub Pages.

### 4. Get Instant Feedback

Don't follow a broken build off a bridge. The `actions/github-script` posts the direct URL to your Pull Request.

**Next Step:** Check your workflow logs. Is your timing actually on beat, or is your build failing?

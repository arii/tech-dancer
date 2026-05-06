---
type: post
title: Stop Wasting Vercel Credits: Deploy Every Branch to GitHub Pages
date: "2026-04-20"
author: "Ariel Anders, PhD"
category: Tech
excerpt: Time is your most precious commodity. Narrow the gap between coding and seeing your changes by deploying every branch to GitHub Pages.
tags:
  - tech
  - vercel
  - github-pages
  - cicd
---

### Kill the Vercel Build Grind

Stop paying for preview deployments. Use this setup to see your changes instantly without the point grind of managed hosting limits.

### 1. Stop Vercel from Building

Add this `ignoreCommand` to your `vercel.json`. It forces Vercel to self-select out of non-main branches so you don't waste resources.

* **Main branch:** Returns code 1 to trigger the build.
* **Other branches:** Returns code 0 to cancel immediately.

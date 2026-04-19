---
type: post
title: "How I used GitHub Actions to power this site"
date: "2026-04-18"
author: "Ariel Anders, PhD"
category: "Tech"
excerpt: "Automated deployments and CI/CD pipelines for a roboticist's living portfolio."
image: "https://picsum.photos/seed/github/1200/600"
tags:
  - automation
  - cicd
  - github
---

## Reliable Deployments

Building a "living portfolio" requires a system that handles the mundane tasks of deployment. I use **GitHub Actions** to automate the build, test, and release cycles of this platform.

### The Pipeline

Every time I update a gear review or add a data study, the pipeline triggers:
1. **Linter validation:** Ensuring the code remains clean.
2. **Build generation:** Compiling the TypeScript assets.
3. **Synchronous deployment:** Pushing to the edge network.

This is the same philosophy I apply to robotics: automate the repetitive so you can focus on the complex.

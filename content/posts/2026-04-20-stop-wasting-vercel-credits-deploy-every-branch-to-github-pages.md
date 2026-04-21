---
type: 'post'
title: 'Stop Wasting Vercel Credits: Deploy Every Branch to GitHub Pages'
date: '2026-04-20'
author: 'Ariel'
category: 'Engineering'
excerpt: 'How to use GitHub actions to preview deployments without Vercel.'
image: 'https://picsum.photos/seed/deploy/1200/675'
---

## Introduction

Vercel is great for quick deployments, but those credits can disappear fast. If you're hosting on GitHub already, why not use GitHub Actions to deploy every branch for previewing?

In this post, we'll walk through the setup.

## The Problem

Vercel's free tier has limits on build minutes and bandwidth. For a project with many contributors or frequent pushes, these limits can be a bottleneck.

## The Solution

By leveraging GitHub Actions and GitHub Pages, we can create a similar "preview deployment" experience without the Vercel overhead.

1.  **Configure GitHub Pages**: Set up your repository to deploy from GitHub Actions.
2.  **Create a Deployment Workflow**: Use a YAML file to define the build and deploy process.
3.  **Handle Multiple Branches**: Configure the workflow to deploy to different subdirectories or branches for previews.

## Conclusion

It's a powerful and cost-effective way to manage your project's deployments.

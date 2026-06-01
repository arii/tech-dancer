---
draft: true
type: post
title: "Redesigning the Editorial Experience"
dek: "A deep dive into the new BoomTick layout system and how it improves readability across all devices."
category: "Design"
date: "2026-05-10"
author: "Jules"
status: "Published"
tags:
  - design
  - react
  - tailwind
hero:
  type: "editorial-visual"
  title: "The Grid System"
  subtitle: "12-column Editorial Layout"
  caption: "Visualizing the relationship between content and context."
  image: "/assets/comp_analysis_hero.webp"
sidebar:
  snapshot:
    - label: "Layout"
      value: "Editorial"
    - label: "Grid"
      value: "12-Column"
    - label: "Status"
      value: "V2"
related:
  - title: "Why Finals are Hard"
    href: "/blog/why-finals-are-hard"
---

## Introduction

The new editorial experience is designed to put content first. By using a split-column hero on desktop, we provide immediate context through a feature card while keeping the title and summary readable.

## The Component System

We've built a set of reusable components in `src/components/article` that can be adapted for any content type.

### Reusable Blocks

- **ArticleHero**: The core entry point.
- **ArticleLayout**: The structural shell.
- **ArticleSidebar**: Contextual information.

> "Good design is as little design as possible." — Dieter Rams

The goal was to create a "rhythm" that feels polished and professional.

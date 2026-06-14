# BoomTick.blog

The West Coast Swing Lifestyle Blog by Tech Dancer.

## Overview

A gear, tech, and travel guide for West Coast Swing dancers. Built with Vite + React to provide real-time comp data and travel logistics.

## Content Structure

All content lives under `content/` using `YYYY-MM-DD-slug.md` naming. Mandatory frontmatter:

```yaml
type: post | resource | study
title: "string"
date: "YYYY-MM-DD"
author: "string"
category: "string"
excerpt: "string"
```

## Features

- **Folio Journal**: Deep dives into technique, engineering, and lifestyle.
- **The Stacks**: A curated, searchable gear repository with affiliate integrations.
- **Data Lab**: Automated content pipelines and research summaries.
- **Real-time Hub**: WebSocket-driven dashboard for live event monitoring.

## Account Context

- **GitHub**: All submissions and issue tracking are handled via the [arii](https://github.com/arii) account.

## Development

For a comprehensive guide on setting up the agent environment, see [docs/agent/environment-setup.md](docs/agent/environment-setup.md).

```bash
pnpm dev
```

For production:

```bash
pnpm build
pnpm preview
```

## UI System

This project uses a primitive-first layout system located in `src/layouts/`. Components should be built using `Box`, `Stack`, `Grid`, and `Text` to ensure token compliance.

### Primitive Props

Common layout props supported by `Box`, `Stack`, and `Grid`:
- **Spacing**: `padding`, `margin`, `gap` (supports tokens, arbitrary values, and responsive objects).
- **Overflow**: `overflow`, `overflowX`, `overflowY`.
- **Overscroll**: `overscroll` (e.g., `x-contain`, `none`).
- **Scrollbars**: `noScrollbar` (boolean to hide native scrollbars).
- **Interactivity**: `pointerEvents` (e.g., `none`, `auto`).

## Firebase Security Rules

To deploy the Firestore security rules for the UX Auditor, use the Firebase CLI:

```bash
firebase deploy --only firestore:rules
```

The rules are defined in `firestore.rules` and ensure that users can only access their own audit reports.

# Deployment Impact Analysis

The Deployment Impact Analysis tool identifies the potential impact of code changes on the application's routes and visual components. It helps developers understand which areas of the site require visual review after a change.

## Overview

The analysis works by generating a dependency graph of the application and identifying all files affected by a set of changed files. It distinguishes between static and dynamic dependencies to provide a granular view of the impact.

### Key Components

- `scripts/impact-analysis.ts`: The main entry point for running the analysis.
- `scripts/lib/impact-analysis-utils.ts`: Utility functions for dependency graph manipulation and URL resolution.
- `scripts/impact-analysis.config.ts`: Configuration for impact levels, global triggers, and route mappings.

## Dependency Graph

The tool uses `dependency-cruiser` to generate the initial dependency graph. To ensure comprehensive coverage, especially for style changes, the graph incorporates CSS-to-CSS dependencies natively.

### Style Dependency Graph

`dependency-cruiser` is configured to natively resolve and track CSS `@import` statements via its enhanced resolution options. These dependencies are directly included in the main graph, ensuring that changes to low-level style tokens (e.g., `src/styles/tokens.css`) correctly propagate up to the components and pages that depend on them without needing manual graph augmentation.

## Impact Levels

- **HIGH**: Changes to global layouts, base styles (`src/index.css`), or core UI components.
- **MEDIUM**: Changes to feature-specific code.
- **LOW**: Changes to other files.

## Visual Review

The tool identifies "Visual Review Required" routes by mapping affected components to their corresponding URLs based on the router configuration (`src/config/routes.ts`) and sitemap data.

## Usage

To run the impact analysis locally:

```bash
CHANGED_FILES=src/path/to/file.ts pnpm tsx scripts/impact-analysis.ts
```

The report will be generated in `artifacts/impact-analysis/`.

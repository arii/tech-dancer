# Guide: Dynamic Import Impact Analysis

The Deployment Impact Analyzer has been enhanced to support **Dynamic Import Analysis**. This ensures that application routes are accurately identified even when page components are code-split using `React.lazy()` or other dynamic import mechanisms.

## How it Works

1.  **Dependency Graph Generation**: The tool uses `dependency-cruiser` to generate a complete graph of the `src/` directory, specifically tracking which imports are "dynamic".
2.  **Router Configuration Parsing**: The analyzer scans `src/config/routes.ts` to build a mapping between dynamically imported components and their respective route paths (e.g., `src/pages/Blog.tsx` -> `/blog`).
3.  **Global Impact Detection**: Global triggers (like `MainLayout.tsx` or `index.css`) are now evaluated across the entire dependency chain. If a changed file is a dependency of a global trigger, a high-impact "Global Impact" is flagged.
4.  **Affected Route Determination**:
    *   The tool identifies all files affected by a change using reverse dependency mapping.
    *   It checks if any of these affected files are "Root Page Components" (dynamically imported by the router).
    *   It maps these components to URLs using the mapping derived in step 2.

## Benefits

*   **Accuracy**: Prevents "blind spots" where changes to code-split components might have previously been ignored by the impact analyzer.
*   **Precision**: Accurately determines which specific routes need visual review, reducing the need for "blanket" reviews of the entire application.
*   **Global Awareness**: Correctly identifies when a change to a deeply nested component might have a global UI impact.

## Analysis Artifacts

The analysis produces two main artifacts in `artifacts/impact-analysis/`:

*   `impact.json`: A machine-readable JSON file containing changed files, affected pages, affected dynamic imports, and the calculated impact level.
*   `impact.md`: A human-readable Markdown report (designed for GitHub PR comments) summarizing the visual review requirements and providing deep links to affected routes.

# Application Pages

This directory contains the top-level route components for the application.

## Responsibilities

- **Composition**: Pages compose layouts from `src/layouts` and feature components from `src/features`.
- **SEO**: Each page is responsible for providing its own metadata via the `SEO` component.
- **Data Initialization**: Pages often trigger initial data fetching via feature hooks.

## Guidelines

1. **Code Splitting**: All pages should be lazily loaded in the main router configuration to minimize the initial bundle size.
2. **Presentational**: Keep pages relatively thin. Complex logic belongs in features or hooks.
3. **Consistency**: Use `MainLayout` as the outer wrapper for standard pages.

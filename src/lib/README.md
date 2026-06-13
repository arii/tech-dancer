# Core Library

This directory contains the central business logic, utilities, and data transformation services for the application.

## Key Modules

- **content.ts**: The core service for parsing Markdown content with frontmatter and transforming it into typed objects (`Post`, `Event`, `Resource`, etc.).
- **affiliateManager.ts**: Manages external affiliate links, UTM tracking, and canonical URL resolution for products.
- **style-utils.ts**: Helpers for design system compliance and token mapping.
- **types/**: Centralized TypeScript definitions for the domain models.

## Documentation Standard

All public functions in this directory must include JSDoc comments explaining the "WHY" behind their implementation, not just what they do. This helps AI agents understand the intent behind business rules.

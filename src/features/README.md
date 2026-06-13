# Domain Features

This directory houses self-contained domain logic and components.

## Feature Structure

Each feature should be isolated and contain:
- **Components**: Feature-specific UI.
- **Hooks**: Logic extracted into reusable hooks (e.g., `useUXAuditor`).
- **Types**: Domain-specific TypeScript interfaces.
- **Utils**: Helper functions specific to the feature.
- **Config**: Local configuration and constants.

## Isolation Rules

1. **No Cross-Feature Imports**: Features should not import from other features. If logic is shared, move it to `src/lib`, `src/hooks`, or `src/components`.
2. **Public API**: Use a clear structure so pages can import the main feature component or hook.
3. **Styles**: Use the global design system (via `@/layouts/Primitives`) rather than local CSS.

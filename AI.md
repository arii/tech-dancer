# AI System Blueprint: BoomTick.blog

This document provides a single source of truth for AI coding assistants to understand, modify, and refactor the BoomTick codebase.

## Project Overview

BoomTick is a specialized social dancing platform and lifestyle blog for the West Coast Swing (WCS) community. It helps users:
- Discover dance events and track logistics.
- Browse educational content and research studies.
- Access curated gear recommendations via "The Stacks".
- Monitor live event data through specialized dashboards.

**Primary Users:** West Coast Swing dancers, event organizers, and researchers.

## Technology Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS (via @tailwindcss/vite).
- **State Management:** Zustand (standard), React Hook Form (forms).
- **Data Fetching:** TanStack Query (v5).
- **Animation:** Motion.
- **Routing:** React Router 7.
- **Backend/Data:** static content parsed from Markdown/YAML, with some Firebase integration for specialized features (e.g., UX Auditor).

## Architecture Overview

The repository follows a modular, feature-oriented structure:

- `src/layouts/`: Core primitive-first layout system (`Box`, `Stack`, `Grid`, `Text`). All UI must be composed from these.
- `src/features/`: Domain-specific logic and components (e.g., `events`, `ux-auditor`, `lab`).
- `src/pages/`: Page-level route components that compose layouts and features.
- `src/components/`: Shared UI components (ui/, navigation/, layout/).
- `src/lib/`: Core business logic, content parsing, and utility functions.
- `src/hooks/`: Reusable React hooks.
- `src/config/`: Application configuration and constants.
- `content/`: Markdown files (`YYYY-MM-DD-slug.md`) containing the site's content.

## Data Flow

1. **Content Ingestion:** Markdown files in `content/` are parsed at build time (using `import.meta.glob`) and transformed into structured objects by `src/lib/content.ts`.
2. **Feature Execution:** Feature hooks (e.g., `useUXAuditor`) manage local and remote state.
3. **UI Composition:** Pages import feature components and shared UI, wrapping them in `MainLayout` or specific layout primitives.

## Testing & Verification

Run these commands to ensure repository stability:

- **Full Audit:** `pnpm run audit` (checks design system compliance and anti-patterns).
- **Linting:** `pnpm run lint` (runs Oxlint and ESLint).
- **Type Check:** `pnpm run type-check`.
- **Unit Tests:** `pnpm test`.
- **E2E Tests:** `pnpm run test:e2e`.

## Coding Standards

Refer to `AGENTS.md` for the full TSX File System Checklist. Key rules include:

- **No Raw Tailwind:** Do not use `flex`, `grid`, or arbitrary values directly. Use Primitives (`Box`, `Stack`, `Grid`).
- **Typography:** All text must use the `<Text />` component.
- **Design Tokens:** Use tokens for spacing, radius, and colors.
- **Feature Isolation:** New features must live in `src/features/<name>/`.
- **Jules Environment:** Node.js `22.22.2` and pnpm `10.28.2` are strictly enforced.

## Common Workflows

- **Adding Content:** Create a new `.md` file in the appropriate `content/` subdirectory with mandatory frontmatter.
- **Creating UI:** Start with `Box`, `Stack`, or `Grid` from `@/layouts/Primitives`.
- **Refactoring:** Keep components under 300 lines. Extract logic into hooks or sub-components.

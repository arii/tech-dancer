# BoomTick.blog

A West Coast Swing lifestyle blog built with React + Vite. Covers gear reviews, technique deep-dives, travel logistics, and competition data for WCS dancers.

## Architecture

- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **State**: Zustand + TanStack Query
- **Data**: Parquet files via `hyparquet`, Firebase Firestore for UX audit feature
- **Build**: pnpm workspaces (single package)

## Project Structure

```
src/
  App.tsx           # Root app component
  main.tsx          # Entry point
  components/       # Shared UI components
  features/         # Feature-specific modules
  pages/            # Route-level page components
  layouts/          # Layout wrappers
  hooks/            # Custom React hooks
  lib/              # Utilities (routes, content, etc.)
  config/           # App constants and config
  data/             # Static/local data files
  assets/           # Images and static assets

content/            # Markdown blog posts (YYYY-MM-DD-slug.md format)
etl/                # Python ETL pipeline + data files (wcs_prelims.parquet)
public/             # Static public assets
scripts/            # Build helper scripts (robots.txt, SPA stubs)
```

## Dev Setup

- Node.js 22, pnpm 10
- Run: `pnpm dev` (starts Vite on port 5000)
- Build: `pnpm build` (includes type-check, parquet copy, post-build scripts)

## Key Configuration

- **vite.config.ts**: Base path auto-detected (Vercel vs GH Pages vs local). Server binds to `0.0.0.0:5000` with `allowedHosts: true` for Replit proxy compatibility.
- **Firebase**: Firestore rules in `firestore.rules` for UX Auditor feature
- **.env.example**: `VITE_APP_URL`, `VITE_CONTACT_FORM_ENDPOINT`

## Deployment

- Target: `static` (Vite SPA)
- Build command: `pnpm run build`
- Public dir: `dist`

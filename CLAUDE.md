# 📐 Tech-Dancer Architecture & AI Context Contract

## 🎯 Global System Prompt Constraints
- **Voice Context:** Act as "Tech Dancer" — a veteran software engineer and West Coast Swing (WCS) insider.
- **Language Standards:** Active voice only. Use exact domain phrasing: "WCS Events", "WSDC Database", "Connection Delay", "Counterbalance". Strictly prohibit academic fluff ("utilize", "facilitate", "subsequent").
- **Verification Rule:** Never invent features, historical events, or personal anecdotes ("scar tissue") unless explicitly provided in the tracking prompt or issue data.

## 📁 Feature-Based Folder Topology
- `src/assets/`      - Static vectors, compressed WebP layouts, and media arrays.
- `src/components/`  - Shared, primitive, non-visual, or isolated view-agnostic UI items.
- `src/features/`    - Domain modules (e.g., `lab/`, `research/`, `ux-auditor/`) encapsulating views, custom hooks, and strongly validated type matrices.
- `src/layouts/`     - Structural primitives (`Box`, `Stack`, `Grid`) matching design-system constraints.
- `scripts/`          - Local automated tooling vectors (e.g., `impact-*` review system).
- `artifacts/`        - Ephemeral CI execution caches (screenshots, text deltas, summary JSON payloads).

## 🚀 Deterministic Tool Run Commands
- Build Target: `pnpm run build` (Production optimized bundle)
- Build Review Matrix: `DISABLE_MINIFY=true pnpm run build:review` (Unminified pretty-printed layout mapping)
- Execute Pipeline: `pnpm run impact:visual-diff && pnpm pnpm run impact:dom-diff`
- Unit Testing: `pnpm test -- --run` (Disables standard watch mode)
- Type Fencing: `pnpm run type-check` (`tsc --noEmit` validation layer)
- Formatting & Linting: `pnpm run lint`

## 💎 Code Styling & Type Policies
- **TypeScript:** Strict enforcement (`"strict": true`). Absolutely zero use of `any`. Explicitly type all functional signatures and pipeline input records.
- **Pydantic/Zod:** Force structural runtime schema enforcement when reading or writing `.json` telemetry data.
- **Tailwind Merge:** Use `clsx` + `tailwind-merge` exclusively for composite element mutations. Avoid loose dynamic inline string additions.

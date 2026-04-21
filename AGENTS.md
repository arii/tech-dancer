# TSX File System Checklist (For Coding Agents)

These are **Rules for writing clean .tsx files** to ensure every `.tsx` file adheres to your design system, architecture, and modern frontend best practices.

## 🧠 Core Principle

> **A `.tsx` file should Build UI using standard pieces**

## 1. ❌ No Raw Tailwind in App/Feature Layers
- No arbitrary values (`text-[11px]`, `tracking-[3px]`, `shadow-[...]`)
- No direct layout classes (`flex`, `grid`, `items-center`)
- No direct spacing (`px-*`, `py-*`)
- No color classes (`bg-*`, `text-*`) outside tokens

## 2. ✅ Only Use Approved Styling Sources
- Design tokens (`spacing`, `radius`, `typography`, `motion`)
- CVA variants
- Primitives (`Box`, `Stack`, `Text`, `Grid`)
- Composed components (e.g. `Button`, `Card`)

## 3. 🧱 Primitives Must Be Used for Layout
- Layout uses `Stack`, `Grid`, `Box`, etc.
- No manual flex/grid usage
- Responsive behavior handled via primitive props (not className)

## 4. 🎨 Typography Must Be Tokenized
- No raw `text-*` classes
- All text uses `<Text />` or equivalent abstraction

## 5. 🎛 Variants Must Be Standardized
- Variant names match global system (e.g. `default`, `accent`, `ghost`)

## 6. ⚙️ No Business Logic in UI Components
- Logic extracted into hooks (`useX`)
- No DOM querying (`querySelector`, `getElementById`)

## 7. 🧩 Components Must Be Declarative
- UI is predictable and compositional

## 8. 📦 Feature Isolation Required
- Features belong in `features/<feature-name>/`

## 9. 🧭 Routing Is Declarative
- Navigation uses route config (not hardcoded)
- Do NOT use `HashRouter`.

## 23. 🤝 Collaborative GitHub Workflows
When asked to address PR comments or review code, utilize the `gh-collab` CLI tool (located at `Dev tools/gh_collab.py`):
1. **Plan:** If raw JSON comment data is present, run `python3 "Dev tools/gh_collab.py" plan ...` to generate a `PR_Plan.md` file. Read this file to understand the requested changes.
2. **Draft Reviews:** As you fix code, use `python3 "Dev tools/gh_collab.py" create <PR_NUMBER> --body "<Your message>"` to draft your responses.
3. **Submit:** Once code changes are pushed, run `python3 "Dev tools/gh_collab.py" submit <PR_NUMBER> COMMENT` to finalize the review.
*Ensure `GITHUB_TOKEN` is exported in the environment before running.*

## 10. 🎞 Motion Must Use Tokens
- Motion values come from `motionTokens`

## 11. 🧼 No Inline Styles or Magic Numbers
- No inline `style` usage
- Everything mapped to tokens

## 12. 🧱 Composition Over Configuration
- Repeated patterns extracted into specialized components

## 13. 🔌 No Direct DOM Access
- Controlled inputs used

## 14. 🧪 Hooks Are Reusable & Pure
- Side effects properly isolated

## 15. 🧭 App Layer = Composition Only
- App.tsx only composes layout, routes, and global UI.

## 16. 🧩 Avoid “God Components”
- Components are small and focused

## 18. 📐 Responsive Design via System
- Responsive handled via props

## 20. 🚫 No System Bypass via `className`
- `className` should NOT introduce new design decisions

## 21. 🏗 Modular Architecture
- Layout primitives (`Box`, `Grid`, `Stack`) MUST reside in `src/layouts/`
- Page-level compositors MUST reside in `src/pages/`
- Component imports MUST use the `@/layouts/` or `@/pages/` alias

## 22. 🛤 Code Splitting & SPA Routing
- Application routes MUST be code-split using `React.lazy()` or equivalent dynamic imports to keep bundles small.
- Use `<Suspense>` with a standardized fallback (e.g., `<PageSkeleton />`) at route boundaries.
- Ensure the application maintains single-page application (SPA) characteristics with environment-agnostic routing (e.g., handling base URLs cleanly for GitHub Pages).

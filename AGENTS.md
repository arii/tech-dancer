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
- ALL imports for layouts, pages, and shared features MUST use the `@/` alias (e.g., `@/layouts/MainLayout`).

## 22. 🛤 Code Splitting & Routing
- Application routes MUST be code-split using `React.lazy()` or equivalent dynamic imports.
- Routing MUST use `createBrowserRouter` and `RouterProvider` (not `HashRouter`) to support modern SPA characteristics and SEO.
- Use `<Suspense>` with a standardized fallback (e.g., `<PageSkeleton />`) at route boundaries.
- Ensure environment-agnostic routing by handling base URLs via `import.meta.env.BASE_URL`.


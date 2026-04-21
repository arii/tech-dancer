# TSX File System Checklist (For Coding Agents)

These are **Rules for writing clean .tsx files** to ensure every `.tsx` file adheres to your design system, architecture, and modern frontend best practices.

## 🧠 Core Principle

> **A `.tsx` file should Build UI using standard pieces**

## 1. ✅ Direct Tailwind & Semantic HTML
- Use semantic HTML elements (`section`, `article`, `main`, `p`, `span`, etc.)
- Apply Tailwind utility classes directly to elements.
- Maintain consistency by using design tokens via Tailwind classes.

## 2. 🎨 Use Design Tokens
- Design tokens (`spacing`, `radius`, `typography`, `motion`) should be accessed via Tailwind classes where possible.
- Avoid "over-abstracted" UI primitives (like the old `Box`, `Stack`, `Grid`).

## 3. 🧱 Semantic Layout
- Use standard CSS Flexbox and Grid classes (`flex`, `grid`, `flex-col`, `grid-cols-*`) on semantic elements.
- Responsive behavior should be handled via Tailwind prefixes (`sm:`, `md:`, `lg:`).

## 4. 🔠 Standardized Typography
- Use `<Text />` only as a thin wrapper or prefer semantic tags (`h1`-`h6`, `p`).
- Apply typography tokens via Tailwind classes defined in `tailwind.config.js`.

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

## 18. 📐 Responsive Design via Tailwind
- Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) for all layout and styling adjustments.

## 20. 🚫 Clean Class Management
- Use the `cn()` utility for conditional class merging.

## 21. 🏗 Modular Architecture
- Core layout components (like `MainLayout`, `Footer`) MUST reside in `src/layouts/`
- Page-level compositors MUST reside in `src/pages/`
- Component imports MUST use the `@/layouts/` or `@/pages/` alias

## 22. 🛤 Code Splitting & SPA Routing
- Application routes MUST be code-split using `React.lazy()` or equivalent dynamic imports to keep bundles small.
- Use `<Suspense>` with a standardized fallback (e.g., `<PageSkeleton />`) at route boundaries.
- Ensure the application maintains single-page application (SPA) characteristics with environment-agnostic routing (e.g., handling base URLs cleanly for GitHub Pages).

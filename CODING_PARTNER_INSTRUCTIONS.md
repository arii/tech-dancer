## Instructions

### 1. Project Setup & Scaffolding

- Default to **Vite + React + TypeScript** unless the user specifies otherwise.
- Always create `vite.config.ts` (not `.js`) for TypeScript projects.
- Include `tsconfig.json`, `tsconfig.node.json`, and `tsconfig.app.json` where appropriate.
- Set up path aliases (`@/` → `src/`) in both `vite.config.ts` and `tsconfig.json`.
- Add `eslint` and `prettier` config files unless the user says to skip them.

**Recommended base config:**
```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

---

### 2. File & Folder Structure

Use a feature-based folder structure for apps larger than a few pages:

```
src/
  assets/          # Static files (images, fonts, icons)
  components/      # Shared/reusable UI components
  features/        # Feature modules (each with its own components, hooks, types)
  hooks/           # Global custom hooks
  lib/             # Utilities, helpers, API clients
  pages/           # Route-level page components
  store/           # Global state (Zustand, Pinia, etc.)
  styles/          # Global CSS, design tokens
  types/           # Shared TypeScript types/interfaces
  App.tsx
  main.tsx
```

For smaller projects, a flat `components/`, `pages/`, and `hooks/` structure is fine.

---

### 3. TypeScript Standards

- Use TypeScript strictly. Set `"strict": true` in `tsconfig.json`.
- Type all component props with interfaces or type aliases.
- Type API responses explicitly — never use `any`.
- Use `satisfies` operator over type assertions where possible.
- Prefer `type` for unions and mapped types; `interface` for object shapes that may be extended.

---

### 4. Component Design

- Keep components small and single-responsibility.
- Separate concerns: presentation components vs. container/logic components.
- Use custom hooks to extract side effects and business logic from components.
- Co-locate styles, types, and tests with their component when using feature folders.
- Use `React.memo`, `useMemo`, and `useCallback` only where there is a measurable perf need — do not premature-optimize.

**Component file template:**
```tsx
// components/Button/Button.tsx
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'ghost'
  disabled?: boolean
}

export function Button({ label, onClick, variant = 'primary', disabled }: ButtonProps) {
  return (
    <button
      className={`btn btn--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
```

---

### 5. Styling

- Default to **CSS Modules** unless the project uses Tailwind.
- When using Tailwind: apply `clsx` + `tailwind-merge` for conditional class logic.
- Define design tokens as CSS custom properties in a `styles/tokens.css` file.
- Avoid inline styles except for truly dynamic values.
- Use `@layer` in Tailwind configs to control specificity.

**CSS token pattern:**
```css
/* styles/tokens.css */
:root {
  --color-primary: #1a1a2e;
  --color-accent: #e94560;
  --font-display: 'Fraunces', serif;
  --font-body: 'DM Sans', sans-serif;
  --radius-md: 0.5rem;
  --shadow-card: 0 4px 24px rgba(0,0,0,0.08);
}
```

---

### 6. State Management

| Scope | Solution |
|---|---|
| Local UI state | `useState`, `useReducer` |
| Shared global state | Zustand (React) or Pinia (Vue) |
| Server/async state | TanStack Query (React Query) |
| URL state | `useSearchParams` or router primitives |

Avoid prop drilling beyond 2 levels — lift to context or global store.

---

### 7. Data Fetching

- Use **TanStack Query** for all server state in React projects.
- Define API functions in `lib/api/` and import them into query hooks.
- Always handle loading, error, and empty states explicitly in components.
- Use `suspense: true` in TanStack Query configs for Suspense-based UIs when appropriate.

```ts
// lib/api/users.ts
export async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`/api/users/${id}`)
  if (!res.ok) throw new Error('Failed to fetch user')
  return res.json()
}
```

---

### 8. Performance

- Use dynamic `import()` for route-level code splitting:
  ```ts
  const Dashboard = lazy(() => import('@/pages/Dashboard'))
  ```
- Prefer `<img loading="lazy" />` and import SVGs as React components when bundled.
- Use `vite-imagetools` or `@vite/plugin-image-optimizer` for image optimization.
- Analyze bundle with `rollup-plugin-visualizer`:
  ```ts
  import { visualizer } from 'rollup-plugin-visualizer'
  plugins: [react(), visualizer({ open: true })]
  ```

---

### 9. Environment Variables

- Always prefix client-side env vars with `VITE_`.
- Store secrets server-side only — never expose API keys in Vite bundles.
- Create `.env`, `.env.local`, `.env.production` as needed.
- Access via `import.meta.env.VITE_API_URL`.
- Add `.env.local` to `.gitignore`.

---

### 10. Testing

- Use **Vitest** as the test runner (not Jest).
- Use **@testing-library/react** for component tests.
- Test behavior, not implementation: query by role/label, not class names.
- Place test files as `ComponentName.test.tsx` alongside the component.

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

---

### 11. Design Quality

Apply the following aesthetic principles to all UI work:

- **Typography**: Choose distinctive fonts over defaults. Pair a display font with a refined body font. Load via Google Fonts or `fontsource`.
- **Color**: Define a clear palette with CSS variables. Use dominant colors with sharp accent tones.
- **Motion**: Add purposeful micro-interactions (hover states, page transitions, staggered list reveals).
- **Spatial Layout**: Prefer intentional asymmetry, generous whitespace, and grid-breaking elements over rigid uniform grids.
- **Dark Mode**: Support via `prefers-color-scheme` media query or a `data-theme` toggle pattern.

Avoid generic aesthetics: no purple gradient heroes, no default Inter/Roboto everywhere, no cookie-cutter card grids without visual identity.

---

### 12. Vite Plugin Recommendations

| Need | Plugin |
|---|---|
| React support | `@vitejs/plugin-react` or `@vitejs/plugin-react-swc` |
| Vue support | `@vitejs/plugin-vue` |
| SVG as components | `vite-plugin-svgr` |
| Bundle analysis | `rollup-plugin-visualizer` |
| PWA support | `vite-plugin-pwa` |
| Compression | `vite-plugin-compression` |
| Env type safety | `vite-plugin-env-compatible` |
| Mock API / dev server | `vite-plugin-mock` |

---

### 13. GitHub Pages — Vite Configuration

GitHub Pages serves sites from a subdirectory path (`https://<user>.github.io/<repo>/`) unless a custom domain is configured. Vite must be told about this base path or all asset references will break.

**Always set `base` in `vite.config.ts` for GitHub Pages:**
```ts
// vite.config.ts
export default defineConfig({
  base: process.env.NODE_ENV === 'production'
    ? '/your-repo-name/'   // must match the GitHub repo name exactly
    : '/',
  plugins: [react()],
})
```

Or drive it from an env variable so the config stays portable:
```ts
base: process.env.VITE_BASE_PATH ?? '/',
```
Set `VITE_BASE_PATH=/your-repo-name/` as a GitHub Actions environment variable or repository secret.

**SPA routing on GitHub Pages:** GitHub Pages does not support server-side redirects, so client-side routing (React Router, Vue Router) will 404 on hard refresh. Fix with one of:
- Add a `public/404.html` that redirects back to `index.html` with the path encoded as a query param, plus a script in `index.html` that restores it (the [spa-github-pages](https://github.com/rafgraph/spa-github-pages) pattern).
- Use **hash routing** (`createHashRouter` / `createWebHashHistory`) — simpler and zero-config for GitHub Pages.
- Use a custom domain with a proper CDN in front if clean URLs are required.

**Required files in `public/`:**
- `.nojekyll` — prevents GitHub Pages from running Jekyll processing, which strips files and folders starting with `_` (Vite output often uses `_assets/`). Always include this.

```
public/
  .nojekyll
  404.html    # only needed for SPA hash routing workaround
```

---

### 14. GitHub Actions — CI Workflow

Create `.github/workflows/ci.yml` to run on every push and pull request. This workflow lints, type-checks, and tests the app before any deployment.

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  ci:
    name: Lint, Type-check & Test
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm          # or 'yarn' / 'pnpm'

      - name: Install dependencies
        run: npm ci           # always use ci, not install, in pipelines

      - name: Lint
        run: npm run lint

      - name: Type-check
        run: npm run type-check   # add "type-check": "tsc --noEmit" to package.json

      - name: Test
        run: npm run test -- --run  # --run disables watch mode in Vitest

      - name: Build
        run: npm run build
        env:
          VITE_BASE_PATH: /${{ github.event.repository.name }}/
```

**Key rules:**
- Always use `npm ci` (not `npm install`) in CI — it uses the lockfile exactly and is faster.
- Always pin action versions to a major tag (`@v4`) — never use `@latest`.
- Always pass `cache: npm` to `setup-node` to cache `node_modules` between runs.
- Run `tsc --noEmit` as a separate type-check step so TS errors fail the build explicitly.
- Pass `--run` to Vitest to prevent it from entering watch mode and hanging the runner.

---

### 15. GitHub Actions — Deploy Workflow

Use the official `actions/deploy-pages` approach (the modern method — avoids the `gh-pages` npm package and branch management).

**Step 1: Enable Pages in the repo.**
Go to Settings → Pages → Source → select **"GitHub Actions"** (not "Deploy from a branch").

**Step 2: Create the deploy workflow:**
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]    # deploy only from main
  workflow_dispatch:    # allow manual deploys from the Actions tab

# Required permissions for GITHUB_TOKEN to deploy Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment
concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_BASE_PATH: /${{ github.event.repository.name }}/

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist    # Vite's default output folder

  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deploy
        uses: actions/deploy-pages@v4
```

**Why this approach over `gh-pages` npm package:**
- No extra branch to manage (`gh-pages` branch)
- Deployment is tied to a named GitHub Environment with audit trail
- OIDC-based `id-token` permission is more secure than PATs
- `cancel-in-progress: true` prevents race conditions between back-to-back pushes

---

### 16. Branch Strategy & Protection

**Recommended branch model for a Vite + GitHub Pages project:**

```
main          ← production; protected; deploys to GitHub Pages
develop       ← integration branch; CI runs on all PRs targeting this
feature/*     ← short-lived feature branches
fix/*         ← bug fix branches
```

**Branch protection rules to enable on `main`** (Settings → Branches):
- Require status checks to pass before merging (add the CI job name)
- Require pull request reviews (at least 1 for solo or team projects)
- Do not allow force pushes
- Do not allow deletions

**Enforce via code with a `.github/branch-protection.yml`** if using a GitHub App or Terraform for IaC — otherwise configure in the UI.

---

### 17. Secrets & Environment Variables in Actions

| Variable type | Where to store | How to reference |
|---|---|---|
| Public build-time config | `vars` (repository variables) | `${{ vars.VITE_API_URL }}` |
| Sensitive API keys | `secrets` (repository secrets) | `${{ secrets.VITE_API_KEY }}` |
| Per-environment values | Environment secrets/vars | `${{ secrets.PROD_API_KEY }}` |

**Rules:**
- Never hardcode secrets in workflow YAML or source code.
- Prefix all client-side variables with `VITE_` — without this prefix Vite will not expose them to the bundle.
- Be aware: any `VITE_`-prefixed variable is **embedded in the built JS** and visible to end users. Never use `VITE_` for truly secret values like private API keys — those belong on a backend.
- Use GitHub Environments (`github-pages`, `staging`) to scope secrets to specific deployment targets.
- Rotate secrets that are accidentally committed immediately — treat them as compromised.

---

### 18. Workflow Optimization & Caching

Always cache dependencies to minimize billable minutes and speed up PR feedback:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: npm          # built-in npm cache; use 'yarn' or 'pnpm' as appropriate
```

For additional caching (e.g., Vite's build cache or Playwright binaries):
```yaml
- name: Cache Vite build
  uses: actions/cache@v4
  with:
    path: node_modules/.vite
    key: vite-${{ runner.os }}-${{ hashFiles('**/package-lock.json') }}
    restore-keys: vite-${{ runner.os }}-
```

**Cache key rules:**
- Always include `hashFiles('**/package-lock.json')` (or `yarn.lock` / `pnpm-lock.yaml`) so the cache busts when dependencies change.
- Add `runner.os` to prevent cross-platform cache pollution.
- Use `restore-keys` as a fallback to get a partial cache hit when the lockfile changes.

---

### 19. Common GitHub Pages Failure Modes & Fixes

| Symptom | Cause | Fix |
|---|---|---|
| Blank page after deploy | Wrong or missing `base` in `vite.config.ts` | Set `base: '/repo-name/'` |
| 404 on page refresh | SPA routes not handled | Add `public/404.html` redirect or switch to hash routing |
| Assets 404 with `_assets/` paths | Jekyll stripping `_` folders | Add `public/.nojekyll` |
| Deploy workflow fails with 403 | Missing `pages: write` permission | Add `permissions: pages: write` and `id-token: write` to workflow |
| Old version still showing | Browser or CDN cache | Hard refresh; Pages CDN cache can take a few minutes |
| Workflow `npm install` slow | Not using `npm ci` or missing cache | Use `npm ci` + `setup-node cache: npm` |
| `tsc` errors not catching in CI | Build succeeds but types are wrong | Add separate `type-check` step with `tsc --noEmit` |

---

### 20. Recommended `.github/` Folder Structure

```
.github/
  workflows/
    ci.yml          # Lint, type-check, test on push/PR
    deploy.yml      # Build and deploy to GitHub Pages on push to main
  PULL_REQUEST_TEMPLATE.md
  CODEOWNERS        # optional: auto-assign reviewers
```

**Minimal `PULL_REQUEST_TEMPLATE.md`:**
```md
## What does this PR do?

## How to test

## Checklist
- [ ] Tests pass locally
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
```

---

### 21. Output Format

When writing code:
- Always show **complete file contents** unless diffing a specific change.
- Include the **file path as a comment** at the top of each code block.
- Group related files together in the response.
- Explain non-obvious architectural decisions briefly after the code.
- If a task requires multiple files, list them all before showing code.
- For workflow YAML, always include inline comments explaining non-obvious steps.

---

### 22. Clarification Protocol

Before starting any non-trivial task, confirm:

**Frontend**
1. **Framework** — React, Vue, Svelte, or Vanilla?
2. **TypeScript** — yes (default) or no?
3. **Styling** — CSS Modules, Tailwind, or other?
4. **State** — any existing state management, or starting fresh?
5. **Scope** — new file, new feature, or refactoring existing code?

**Deployment & CI**
6. **Repo name** — needed to set the correct `base` path for GitHub Pages (e.g., `/my-app/`)
7. **Custom domain?** — if yes, `base` should be `/` and a `CNAME` file goes in `public/`
8. **Routing mode** — hash routing (simpler for Pages) or HTML5 history (requires 404 workaround)?
9. **Deploy trigger** — push to `main` only, or also allow manual `workflow_dispatch`?
10. **Secrets needed?** — any `VITE_` env vars that need to be set in GitHub repository settings?

For small or unambiguous tasks, proceed with sensible defaults and note assumptions inline.
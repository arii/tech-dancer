# BoomTick.blog — Development & Contribution Guide

This guide explains how to contribute to BoomTick.blog, covering both content and code.

## ✍️ Content Contributions

1. **New Issue**: Title it `Draft: <Your Post Title Here>`.
2. **Body**: Paste a fenced markdown block:
   ```markdown
   <content>
   ```
3. **Checklist**:
   - Issue title starts with `Draft:`
   - Body contains a single `\```markdown` block
   - Frontmatter includes required fields (see root README.md)

---

## 💻 Coding Standards

For detailed UI/UX rules, refer to [AGENTS.md](./AGENTS.md).

### 🛠️ Core Stack
- **Framework**: Vite + React + TypeScript
- **Styling**: Vanilla CSS + Tailwind (Tokens-only, see AGENTS.md)
- **State**: Zustand (Global), TanStack Query (Server)
- **Routing**: React Router (Lazy loaded)

### 🏗️ Architecture
- **Feature-based structure**: `src/features/<feature-name>/` should contain its own components, hooks, and logic.
- **Primitives**: Always use layout primitives (`Box`, `Stack`, `Grid`) from `src/layouts/Primitives`.
- **Logic Isolation**: Extract business logic and side effects into custom hooks.

### TypeScript Requirements
- **Strict Mode**: `any` is strictly prohibited. Use explicit types or interfaces.
- **Props**: Always type component props.
- **API**: Define typed API functions in `src/lib/api/`.

### 🧪 Testing & Quality
- **Unit Tests**: Use **Vitest** + **React Testing Library**.
- **E2E Tests**: Use **Playwright**.
- **Linting**: `pnpm run lint` (ESLint + oxlint).
- **Audit**: `pnpm run audit` must pass before submission.

### 🚀 Deployment (GitHub Pages)
- **Base Path**: Vite is configured to handle the repository sub-path automatically.
- **SPA Routing**: We use a `404.html` redirect strategy (see `public/404.html`) to support clean URLs on refresh.
- **NoJekyll**: A `.nojekyll` file is required in `public/` to prevent asset stripping.

---

## 🤝 Workflow

1. **Conflict Check**: `python3 dev-tools/td_cli.py conflicts`
2. **Pre-Submit**: `python3 dev-tools/td_cli.py pre-submit`
3. **PR Review**: Our automated pipeline audits PRs for token compliance and technical debt baselines.

# TSX File System Checklist (For Coding Agents)

These are **rules for writing clean `.tsx` files** so UI code consistently follows the design system, architecture, and modern frontend best practices.

## 🧠 Core Principle

> **A `.tsx` file should build UI using standard pieces.**

---

## 0) Quick Start

**Before reading any other section:**
1. `dev-tools/cli-schema.json` — canonical CLI reference
2. `.agent/INSTRUCTION_LAYERS.md` — which file owns which domain
3. `.agent-context.json` — repository context snapshot (run `pnpm run agent:prime` to update)

**Then run:**
1. `python3 dev-tools/td_cli.py gh conflicts`
2. `node scripts/detect-antipatterns.mjs`
3. Read `TODO_ANTIPATTERNS.md`
4. Implement changes using primitives/tokens only
5. Re-run `node scripts/detect-antipatterns.mjs`
6. `python3 dev-tools/td_cli.py gh pre-submit`

---


## DevTools CLI command contract

- `dev-tools/td_cli.py` uses grouped commands; for repository/PR checks use the `gh` group.
- Do **not** call top-level `conflicts`/`pre-submit`; use:

```bash
python3 dev-tools/td_cli.py gh conflicts
python3 dev-tools/td_cli.py gh pre-submit
```

- **CLI authority**: Always consult `dev-tools/cli-schema.json` for exact command syntax. Examples in this file are illustrative only. Do not run `--help` flags.

- If a DevTools subcommand is unavailable in a local environment, report it separately and continue core verification with:

```bash
node scripts/detect-antipatterns.mjs
pnpm run -s test -- --runInBand
pnpm build
```

---

## 1) ❌ No Raw Tailwind in App/Feature Layers

- No arbitrary values (`text-[11px]`, `tracking-[3px]`, `shadow-[...]`)
- No direct layout classes (`flex`, `grid`, `items-center`)
- No direct spacing (`px-*`, `py-*`)
- No color classes (`bg-*`, `text-*`) outside tokens

## 2) ✅ Only Use Approved Styling Sources

- Design tokens (`spacing`, `radius`, `typography`, `motion`)
- CVA variants
- Primitives (`Box`, `Stack`, `Text`, `Grid`)
- Composed components (e.g., `Button`, `Card`)

## 3) 🧱 Primitives Must Be Used for Layout

- Layout uses `Stack`, `Grid`, `Box`, etc.
- No manual flex/grid usage
- Responsive behavior handled via primitive props (not `className`)

## 4) 🎨 Typography Must Be Tokenized

- No raw `text-*` classes
- All text uses `<Text />` or equivalent abstraction

## 5) 🎛 Variants Must Be Standardized

- Variant names match global system (e.g., `default`, `accent`, `ghost`)

## 6) ⚙️ No Business Logic in UI Components

- Logic extracted into hooks (`useX`)
- No DOM querying (`querySelector`, `getElementById`)

## 7) 🧩 Components Must Be Declarative

- UI is predictable and compositional

## 8) 📦 Feature Isolation Required

- Features belong in `features/<feature-name>/`

## 9) 🧭 Routing Is Declarative

- Navigation uses route config (not hardcoded)
- Do **not** use `HashRouter`

## 10) 🎞 Motion Must Use Tokens

- Motion values come from `motionTokens`

## 11) 🧼 No Inline Styles or Magic Numbers

- No inline `style` usage
- Everything mapped to tokens

## 12) 🧱 Composition Over Configuration

- Repeated patterns extracted into specialized components

## 13) 🔌 No Direct DOM Access

- Controlled inputs used

## 14) 🧪 Hooks Are Reusable & Pure

- Side effects properly isolated

## 15) 🧭 App Layer = Composition Only

- `App.tsx` only composes layout, routes, and global UI

## 16) 🧩 Avoid “God Components”

- Components are small and focused

## 17) 📐 Responsive Design via System

- Responsive behavior handled via system props

## 18) 🚫 No System Bypass via `className`

- `className` should **not** introduce new design decisions

## 19) 🏗 Modular Architecture

- Layout primitives (`Box`, `Grid`, `Stack`) must reside in `src/layouts/`
- Page-level compositors must reside in `src/pages/`
- Component imports must use the `@/layouts/` or `@/pages/` alias

## 20) 🛤 SPA Routing & Parallel Work Protocol

- Application routes must be code-split using `React.lazy()`
- Use `<Suspense>` with a standardized fallback (e.g., `<PageSkeleton />`) at route boundaries
- Ensure environment-agnostic routing (handle base URLs cleanly for GitHub Pages)

### Parallel Work Protocol

When multiple agents work simultaneously:

1. **Run conflict check first**: `python3 dev-tools/td_cli.py gh conflicts`
2. **Stagger feature files**: Agents should not touch the same component file
3. **Branch naming**: Use `feat/issue-{NUMBER}-{file-scope}` (e.g., `feat/issue-247-gear-card`)
4. **Shared primitives**: Do not modify `src/layouts/*.tsx` in feature branches without coordination

## 21) 🤝 Collaborative GitHub Workflows

`dev-tools/td_cli.py` is the unified entry point for repository automation and PR reviews.

### Issue Lifecycle

All new issues must follow the **Spec-Driven Issue Template** (`.github/ISSUE_TEMPLATE/spec_driven_issue.md`).
The `python3 dev-tools/td_cli.py gh validate-issue --issue-number <ISSUE_NUMBER> --execute` command enforces this structure.

### PR Review Lifecycle

Before auditing GitHub issues, read `docs/agent/issue-audit-rules.md`. Always consult `dev-tools/cli-schema.json` for authoritative usage.

1. **Fetch context**: `python3 dev-tools/td_cli.py gh audit-pr <PR_NUMBER> --fetch --execute`
2. **Perform audit**: `python3 dev-tools/td_cli.py gh audit-pr <PR_NUMBER> --audit --execute`
3. **Submit review**: `python3 dev-tools/td_cli.py gh audit-pr <PR_NUMBER> --submit --cleanup --execute`

### Quality Gates & Submission Protocol

- **Autonomous repair** (for persistent lint/type errors):
  ```bash
  python3 dev-tools/td_cli.py agent repair
  python3 dev-tools/td_cli.py agent repair --worktree
  ```
- **CI Remediation**: For failing CI checks, follow the [CI Failure Remediation Guide](docs/agent/ci-remediation.md) to use targeted testing (e.g., `pnpm run test:e2e:targeted`).
- **Pre-submit check**: Always run `python3 dev-tools/td_cli.py gh pre-submit` before pushing
- **No monolithic PRs**: Keep PRs focused. Ideally modify no more than 3 files in `src/layouts/` or `src/components/`
- **Split Content PRs**: Do not mix content domains. Create separate PRs for:
  - **Event Facts**: Factual corrections (venue, city, dates, URL). Must include source URL.
  - **Gear Assets**: Broken image/path fixes. Mark missing assets as `draft: true`.
  - **Merch Catalog**: Copy or layout updates. List product removals explicitly.
  - **Articles**: Editorial updates. Provide rationale for date changes. **NEVER** change the filename/date-prefix of a published post (e.g., `2026-04-18-post-title.md`) as this alters the URL, breaks SEO, and causes 404 errors.
- **Code review standards**: Evaluate dead abstractions, unnecessary indirection, responsibility creep, and token compliance

### Baseline Maintenance

- CI enforces bundle size and TypeScript `any` count via GitHub Actions variables
- After intentional approved debt increases, update baselines:
  ```bash
  gh variable set BUNDLE_BASELINE_KB --body 3080
  gh variable set ANY_COUNT_BASELINE --body 42
  ```

## 22) Setup (Jules Environment)

To fully bootstrap and verify the environment (Node.js, pnpm, Python, Playwright), run the consolidated setup script:

```bash
./setup-agent.sh
```

This script (symlinked to `dev-tools/setup-agent.sh`) enforces the runtime contract (`Node.js 24.16.0`, `pnpm 10.28.2`) and installs all necessary dependencies. For detailed instructions, see [CODEX.md](./CODEX.md).

# Codex / Agent Runtime Rules

This repository enforces a strict runtime contract (`Node.js 24.16.0`, `pnpm 10.28.2`). For detailed instructions, see [CODEX.md](./CODEX.md). **DO NOT** add `use-node-version` to `.npmrc` as it breaks Vercel deployments.

Before installing, testing, building, or editing dependencies, run:

```bash
corepack enable
corepack prepare pnpm@10.28.2 --activate
pnpm run check:runtime-files
pnpm run doctor
```

Use:

```bash
pnpm install --frozen-lockfile
pnpm run lint
pnpm run build
```

Do not run:

```bash
npm install
npm install -g pnpm
pnpm env use
nvm install
nvm use
volta pin
asdf local nodejs
```

If Node or pnpm mismatches, stop and report the mismatch. Do not change runtime versions unless the user explicitly asks to update the runtime contract.

## GitHub Actions runtime policy

- Do not downgrade GitHub Actions to avoid Node 24 warnings.
- Prefer current major versions of official actions:
  - `actions/checkout@v6`
  - `actions/setup-node@v6`
- Keep `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` at workflow or job level.
- Keep app runtime pinned separately via:
  - `.node-version`
  - `.nvmrc`
  - `package.json#engines`
  - `package.json#packageManager`
- Do not set `ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION` unless explicitly approved as a temporary emergency workaround.

### On-Demand Dependencies

Heavy dependencies are installed only when needed:

**E2E testing / browser automation:**

```bash
pnpm run setup:playwright
```

> [!TIP]
> **Reliable Browser Provisioning**: If downloads fail, set `PLAYWRIGHT_DOWNLOAD_HOST=https://playwright.azureedge.net`. In container environments, use `PLAYWRIGHT_BROWSERS_PATH=/ms-playwright` to utilize pre-baked binaries. To use local system browsers, set `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`.

**Python ETL / data processing:**

```bash
./dev-tools/setup-python.sh
```

## 23) UI Auditing Workflow

The UI Auditing Tool (`scripts/detect-antipatterns.mjs`) identifies arbitrary Tailwind values, raw layout classes, and non-primitive `div` usage.

### Planning Phase

Before starting a UI task:

```bash
node scripts/detect-antipatterns.mjs
cat TODO_ANTIPATTERNS.md
```

Integrate existing anti-pattern cleanup into your implementation plan.

### Pre-Submission Audit Gates

Install local pre-push hook:

```bash
git config core.hooksPath .githooks
```

The hook runs targeted audit on changed `.tsx` files.

Before submitting a PR, run:

```bash
python3 dev-tools/td_cli.py gh pre-submit
```

### Pre-Commit Checklist

Before submitting any PR that modifies `.tsx`, `.ts`, `.css`, or `.scss`:

1. Run `node scripts/detect-antipatterns.mjs`
2. Review `TODO_ANTIPATTERNS.md` for violations introduced by your changes
3. Fix all identified anti-patterns. **DO NOT** use `impeccable-ignore` unless absolutely necessary (e.g., dynamic motion-driven styles that cannot be tokenized).
4. Ensure your changes introduce no new violations in touched files

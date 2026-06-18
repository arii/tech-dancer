# Deployment Impact Analysis & Visual Review Guide

## Purpose

This repository deploys a React + Vite static site to GitHub Pages / boomtick.blog. While automated testing can verify build correctness, it does not determine which pages require visual review.

This guide describes **Deployment Impact Analysis** — a deterministic method for identifying which pages may have been affected by a code change and therefore require visual validation.

The goal is to reduce review effort by auditing only pages that are in the blast radius of a change.

---

## Problem Statement

Traditional deployment pipelines answer:

> Did the build succeed?

They do not answer:

> Which pages might look different now?

Example:

```ts
// Button.tsx was modified
```

A typical pipeline knows:

```
✅ Build passed
✅ Tests passed
```

But it does not know:

```
/          → uses Button (via Hero → Button)
/blog      → uses Button (via PostCard → Button)
/research  → uses Button (via ResearchCard → Button)
```

All three pages should be visually reviewed.

---

## The Core Idea

Most dependency analysis tools traverse **downward**:

```
Page → Component → UI → Token
```

For deployment review we need the **opposite** — traverse **upward**:

```
Token → UI → Component → Page
```

Example:

```
Button.tsx was changed
↓
Who imports Button?
  → Hero.tsx
  → PostCard.tsx
↓
Who imports Hero?
  → Home.tsx   (src/pages/Home.tsx)
Who imports PostCard?
  → BlogIndex.tsx  (src/pages/BlogIndex.tsx)
```

Result:

```json
{
  "routes": ["/", "/blog"],
  "impactLevel": "MEDIUM"
}
```

---

## Why This Matters

- Faster release reviews
- Smaller visual test surface
- More reliable deployments
- Better CI reporting
- Easier multimodal screenshot validation
- Reduced review fatigue

Instead of checking all pages:

```
/ /blog /research /merch /about /gear /blog/:slug ...
```

Review only affected pages:

```
/ /blog
```

---

## Implementation

The full pipeline is implemented in `scripts/` and run via `pnpm` scripts.

### Phase 1 — Collect Changed Files

`scripts/impact-analysis.ts` determines what changed:

```ts
function getChangedFiles(): string[] {
  // Staged + unstaged working changes
  const staged = exec('git diff --name-only --cached');
  const unstaged = exec('git diff --name-only');
  const workingChanges = new Set([...splitAndFilter(staged), ...splitAndFilter(unstaged)]);

  // Compare to origin/main (falls back to HEAD~1 if unavailable)
  let base = 'origin/main';
  try {
    execSync(`git rev-parse ${base}`, { stdio: 'ignore' });
  } catch {
    base = 'HEAD~1';
  }

  const committed = exec(`git diff --name-only ${base} HEAD`);
  const allChanges = new Set([...workingChanges, ...splitAndFilter(committed)]);
  return Array.from(allChanges).filter(Boolean);
}
```

Output example:

```
src/components/ui/Button.tsx
src/styles/tokens.css
```

Stored as:

```json
{
  "changedFiles": ["src/components/ui/Button.tsx", "src/styles/tokens.css"]
}
```

---

### Phase 2 — Build Dependency Graph

The pipeline uses [Dependency Cruiser](https://github.com/sverweij/dependency-cruiser) to generate a full module graph.

```bash
npm install --save-dev dependency-cruiser
```

Generate the graph:

```ts
const graphJson = exec(
  'npx depcruise src --config .dependency-cruiser.config.mjs --ts-config tsconfig.app.json --output-type json'
);
const graph: DependencyGraph = JSON.parse(graphJson);
```

This produces a JSON structure of the form:

```json
{
  "modules": [
    {
      "source": "src/components/ui/Button.tsx",
      "dependencies": [
        { "resolved": "src/styles/tokens.css" }
      ]
    }
  ]
}
```

---

### Why Dependency Cruiser

- TypeScript-aware
- React-aware
- Fast in CI
- JSON output
- Supports reverse dependency traversal
- Works with path aliases (`@/`)

---

### Phase 3 — Build Reverse Map & Traverse Upward

Given a changed file like `src/components/ui/Button.tsx`, find every file that imports it:

```ts
function buildReverseMap(graph: DependencyGraph): Record<string, string[]> {
  const reverseMap: Record<string, string[]> = {};
  graph.modules.forEach(module => {
    module.dependencies.forEach(dep => {
      if (!reverseMap[dep.resolved]) reverseMap[dep.resolved] = [];
      if (!reverseMap[dep.resolved].includes(module.source)) {
        reverseMap[dep.resolved].push(module.source);
      }
    });
  });
  return reverseMap;
}
```

Then recursively walk upward:

```ts
function findAffectedFiles(changedFiles: string[], reverseMap: Record<string, string[]>): string[] {
  const affected = new Set<string>();
  const queue = [...changedFiles];
  while (queue.length > 0) {
    const file = queue.shift()!;
    if (affected.has(file)) continue;
    affected.add(file);
    queue.push(...(reverseMap[file] || []));
  }
  return Array.from(affected);
}
```

Continue recursively until reaching page-level route files.

Graph traversal example:

```
Button.tsx → Hero.tsx → Home.tsx (src/pages/)
           → PostCard.tsx → BlogIndex.tsx (src/pages/)
```

Result:

```
affectedPages: ["src/pages/Home.tsx", "src/pages/BlogIndex.tsx"]
```

---

### Route Discovery

Page entrypoints are defined by the `PAGES_DIR` config:

```ts
PAGES_DIR: 'src/pages'
```

or via dynamic route discovery:

```ts
import { getAllRoutes } from '../src/lib/routes-discovery';
const authoritativeSitemapUrls = getAllRoutes().stubs || [];
```

Matching pages:

```
src/pages/Home.tsx
src/pages/BlogIndex.tsx
src/pages/ResearchPage.tsx
```

These become visual review candidates.

---

### Phase 4 — Map Pages to Public URLs

`scripts/impact-analysis.config.ts` defines the route mapping:

```ts
export const IMPACT_CONFIG = {
  PAGES_DIR: 'src/pages',

  PAGE_ROUTE_OVERRIDES: {
    'Home': '/',
    'UXAuditor': '/ux-auditor',
    'BlogPost': '/blog/:slug',
    'ResearchDetail': '/research/:id',
  },

  CONTENT_MAP: {
    'content/posts/': '/blog/',
    'content/blog/': '/blog/',
    'content/studies/': '/research/',
  },
};
```

`mapPageToUrls()` in `scripts/impact-review-utils.ts` resolves page file → URL slug automatically from the PascalCase component name and override table.

---

### Sitemap Integration

The deployment already generates `public/sitemap.xml`. The analyzer uses `getAllRoutes()` from `src/lib/routes-discovery` to map:

```
src/pages/BlogIndex.tsx → /blog
src/pages/Home.tsx      → /
```

Example impact.md output:

```md
## 🟡 Deployment Impact Analysis

> **Impact Level:** MEDIUM

### 👁️ Visual Review Required
- [/](https://boomtick.blog/)
- [/blog](https://boomtick.blog/blog)
```

---

### Phase 5 — Generate Impact Report

JSON artifact (`artifacts/impact-analysis/impact.json`):

```json
{
  "changedFiles": ["src/components/ui/Button.tsx"],
  "affectedPages": ["src/pages/Home.tsx", "src/pages/BlogIndex.tsx"],
  "routes": ["/", "/blog"],
  "visualReviewRequired": ["/", "/blog"],
  "impactLevel": "MEDIUM"
}
```

Human-readable output (`artifacts/impact-analysis/impact.md`):

```
========================================
DEPLOYMENT IMPACT ANALYSIS
========================================

IMPACT LEVEL: MEDIUM

CHANGED FILES:
  - src/components/ui/Button.tsx

VISUAL REVIEW REQUIRED:
  - /
  - /blog

========================================
```

---

### Phase 6 — Categorize Review Severity

Severity is determined by the paths of the **changed** files, not the affected files.

#### HIGH

Changes to:

```ts
HIGH_IMPACT_PATHS: [
  'src/layouts/',
  'src/styles/',
  'src/components/ui/',
  'src/index.css'
]
```

Example:

```
src/layouts/MainLayout.tsx changed
```

Result:

```
impactLevel: HIGH
routes: [all pages via GLOBAL_TRIGGERS fallback]
```

#### MEDIUM

Changes to:

```ts
MEDIUM_IMPACT_PATHS: [
  'src/features/'
]
```

Example:

```
src/features/gear/GearCard.tsx changed
```

Result:

```
impactLevel: MEDIUM
routes: [pages that import GearCard]
```

#### LOW

Changes to anything else (content, utilities, tests, etc.):

Example:

```
content/posts/2025-01-01-my-post.md changed
```

Result:

```
impactLevel: LOW
routes: [/blog/my-post, /blog]
```

---

### Phase 7 — Screenshot Validation

After determining affected pages, run visual checks only against those URLs.

```bash
# Step 1: Build the base branch (main) for comparison
pnpm run impact:build-main

# Step 2: Pixel-level visual diff (Playwright + pixelmatch)
pnpm run impact:visual-diff
```

`impact:visual-diff` (`scripts/impact-visual-diff.ts`):
- Launches two local preview servers (base branch + current branch)
- Takes Playwright screenshots of each affected route
- Computes pixel difference with `pixelmatch`
- Crops to the bounding box of changes
- Outputs before/after/diff images to `artifacts/visual-review/`

Instead of reviewing all pages:

```
/ /blog /research /merch /about /gear ...
```

Review only:

```
/ /blog
```

---

### Phase 8 — DOM Diff

```bash
pnpm run impact:dom-diff
```

`scripts/impact-dom-diff.ts`:
- Fetches pre-rendered HTML for each affected route from both servers
- Strips technical elements (scripts, styles, meta)
- Computes structural diff (nodes added/removed, images, links)
- Writes per-route diff reports to `artifacts/dom-review/`
- Generates `artifacts/deployment-review.md`

---

### Phase 9 — AI Code Review

```bash
# Gemini visual review (screenshots → Gemini Vision)
pnpm run impact:gemini-review

# GitHub Models visual review
pnpm run impact:github-models-review

# Gemini code review (diff → Gemini)
pnpm run impact:gemini-code-review

# GitHub Models code review
pnpm run impact:github-models-code-review
```

Artifacts written to `artifacts/`:
- `gemini-review.md`
- `github-models-review.md`
- `gemini-code-review.md`
- `github-models-code-review.md`
- `*-verdict.json`

---

### Phase 10 — Send to Jules Agent Session

```bash
TASK_ID=<session_id> python3 scripts/send-jules-impact.py
```

Compiles all artifacts into a structured message and sends it to the active Jules session:
- Deployment impact report
- Visual diff summaries
- AI review findings
- Verdict JSONs

---

## Full Pipeline Run Order

```bash
# 1. Determine affected routes and severity
pnpm run impact:analysis

# 2. Build base-branch worktree for comparison
pnpm run impact:build-main

# 3. Pixel-level visual diff
pnpm run impact:visual-diff

# 4. Structural DOM diff
pnpm run impact:dom-diff

# 5. AI code review (Gemini + GitHub Models)
pnpm run impact:gemini-code-review
pnpm run impact:github-models-code-review

# 6. AI visual review (Gemini + GitHub Models on screenshots)
pnpm run impact:gemini-review
pnpm run impact:github-models-review

# 7. Send all artifacts to Jules session
TASK_ID=<session_id> python3 scripts/send-jules-impact.py
```

---

## Repository Structure

```
scripts/
  impact-analysis.ts           ← Phase 1-5: change detection, dep graph, route mapping
  impact-analysis.config.ts    ← Severity paths, route overrides, content map
  impact-build-main.ts         ← Builds base branch in git worktree (.tmp-main/)
  impact-visual-diff.ts        ← Playwright screenshot comparison (pixelmatch)
  impact-dom-diff.ts           ← Structural HTML diff (jsdom + diff)
  impact-review-utils.ts       ← Shared helpers, types, server management
  impact-gemini-review.ts      ← Gemini visual review
  impact-github-models-review.ts  ← GitHub Models visual review
  impact-gemini-code-review.ts    ← Gemini code review
  impact-github-models-code-review.ts  ← GitHub Models code review
  send-jules-impact.py         ← Send artifacts to Jules agent session
  image-processing-utils.ts    ← PNG helpers for diff images

artifacts/                     ← Generated by pipeline (gitignored)
  impact-analysis/
    impact.json
    impact.md
  visual-review/
    <route-slug>/
      before.png
      after.png
      diff.png
      before-cropped.png
      after-cropped.png
      diff-cropped.png
  dom-review/
    <route-slug>/
      before.html
      after.html
      diff.md
  deployment-review.md
  gemini-review.md
  github-models-review.md
  gemini-code-review.md
  github-models-code-review.md
  *-verdict.json
```

---

## Environment Variables

| Variable | Purpose | Required |
|---|---|---|
| `IMPACT_BASE_REF` | Base branch ref for comparison (default: `origin/main`) | No |
| `IMPACT_BASE_PORT` | Port for base preview server (default: `4173`) | No |
| `IMPACT_HEAD_PORT` | Port for head preview server (default: `4174`) | No |
| `GEMINI_API_KEY` | Gemini AI review | Optional |
| `GITHUB_TOKEN` | GitHub Models review | Optional |
| `TASK_ID` | Jules session ID (without `sessions/` prefix) | For Jules feedback |
| `VITE_APP_URL` | Base URL for impact.md links | No |

---

## CI/CD Integration

The impact pipeline runs automatically in GitHub Actions on every PR:

1. `pnpm run impact:analysis` → determines affected routes
2. `pnpm run impact:build-main` → builds base branch
3. `pnpm run impact:visual-diff` → pixel diff
4. `pnpm run impact:dom-diff` → DOM diff
5. AI reviews → artifact generation
6. `scripts/send-jules-impact.py` → feedback to Jules session

The `dev-tools` CLI also exposes this via:

```bash
python3 dev-tools/td_cli.py gh audit-pr <PR_NUMBER> --fetch
python3 dev-tools/td_cli.py gh audit-pr <PR_NUMBER> --audit
python3 dev-tools/td_cli.py gh audit-pr <PR_NUMBER> --submit --execute
```

---

## Summary

The Deployment Impact Analysis pipeline creates a deterministic, scalable deployment-review process. Reviewers only inspect pages that are actually affected by upstream code changes rather than manually auditing the entire site.

Key principles:
1. Reverse dependency traversal (upward from changed file → pages)
2. Severity scoring based on which paths were changed
3. Automated visual diff via Playwright + pixelmatch
4. Structural DOM diff for content accuracy
5. AI review for code quality and visual regression
6. Automatic feedback delivery to active agent sessions

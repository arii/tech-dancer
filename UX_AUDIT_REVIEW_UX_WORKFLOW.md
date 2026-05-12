# UX Audit: review-ux workflow (2026-05-12)

## Scope
Routes targeted by workflow:
- /
- /about
- /blog
- /gear
- /research
- Search modal

## Execution Summary
- ✅ Dependency install completed (`pnpm install`).
- ✅ UX anti-pattern scan passed (`pnpm run audit`).
- ✅ Dev server started successfully and served local app on port 3000.
- ⚠️ Playwright interactive visual audit could not be executed because browser download was blocked (403 from `cdn.playwright.dev`).
- ✅ Route availability spot-check returned HTTP 200 for all required routes via `curl`.

## Findings

### [P1 / High] Playwright-based UX workflow is blocked in this environment
- **Observation**: `playwright-cli install --skills` repeatedly failed trying to download Chromium with `403 Domain forbidden`.
- **Heuristic / Principle Violated**: Interaction & Motion / Review Process Reliability (tooling should reliably support required UX verification).
- **Impact**: Desktop/mobile visual verification, modal overlap checks, typography consistency checks, and screenshot artifact capture cannot be completed as required by workflow.
- **Recommendation**: Add a fallback path in workflow docs for preinstalled browsers or mirror URL config (e.g., set `PLAYWRIGHT_DOWNLOAD_HOST` or use pre-baked browser binaries in CI/dev containers).

### [P2 / Medium] Workflow step asks to run dev server without log piping, but automated/non-interactive execution requires log capture strategy
- **Observation**: Workflow recommends running `pnpm run dev` without piping to log for manual inspection, which conflicts with non-interactive automation.
- **Heuristic / Principle Violated**: Cognitive Load & UX Writing (instructions should be unambiguous across execution contexts).
- **Impact**: Agents may either block indefinitely or miss startup/runtime errors unless they improvise process management.
- **Recommendation**: Add an explicit “automation-safe” variant in the workflow (e.g., `pnpm run dev` in PTY + bounded health check command), plus a standardized way to stop the process.

## Proposed GitHub Issues

1. **High: Unblock Playwright browser provisioning in agent/container environments**
   - Include failure logs and 403 host details.
   - Acceptance criteria: `playwright-cli install --skills` succeeds in clean environment.

2. **Medium: Add non-interactive execution path to `.agent/workflows/review-ux.md`**
   - Document process lifecycle commands and health checks.
   - Acceptance criteria: workflow can be executed headlessly while still surfacing runtime errors.

## Evidence Commands
- `pnpm install`
- `npm install -g @playwright/cli@latest`
- `playwright-cli install --skills`
- `pnpm run audit`
- `pnpm run dev`
- `curl http://localhost:3000/{route}` for route checks

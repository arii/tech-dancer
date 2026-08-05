**Problem Statement**
Running visual tests locally via `td repo run-playwright` or `pnpm run test:e2e:targeted` fails abruptly with `unknown command 'test'` and subsequently times out when trying to connect to the local Vite preview server, unless a developer manually knows to run `pnpm install`, `pnpm run build`, and `pnpm exec playwright install` beforehand.

**Root Cause Analysis**
The e2e testing commands expect a fully bootstrapped environment and pre-built artifacts in the `dist/` folder but lack integrated dependency or pre-flight checks to ensure the workspace is actually ready for Playwright execution. The `td repo run-playwright` orchestration wrapper delegates execution without validating if the browsers are installed or if the build artifacts exist, leading to confusing timeouts.

**Proposed Spec / Design**
Enhance the `td repo run-playwright` command (and ideally the underlying npm script) to act as a smart orchestrator:
1. Verify `node_modules` exist. If not, automatically trigger `pnpm install`.
2. Check if Playwright browser binaries are installed. If missing, prompt the user or automatically run `pnpm exec playwright install`.
3. Check if the `dist/` directory exists and has recent artifacts. If missing, automatically run `pnpm run build` before starting the tests.

**Acceptance Criteria**
- A clean checkout can run `td repo run-playwright` successfully without manual prerequisite steps.
- The command outputs clear, actionable messages if it detects missing prerequisites it cannot resolve automatically.

**Context**
Encountered significant friction trying to run visual regression tests after refactoring codebase slop during the AI Slop Audit.

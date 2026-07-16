# CI Failure Remediation Guide (For Agents)

This guide provides strategies for autonomous agents to diagnose and fix CI failures efficiently by using targeted testing and log analysis.

## 1. Parse CI Logs for Actionable Info

When a CI check fails, do not immediately run the full test suite. Instead:

1.  **Extract failure details**: Use the `extract_failing_info` helper (via `td agent plan-review --pr <PR>`) or manually search for error patterns:
    - **TypeScript**: `error TS\d+: <message>`
    - **Playwright**: `\d+\) [<project>] › <file>:<line>:<col> › <test_name>`
    - **Vitest**: `FAIL  <file>` followed by `❯ <file>:<line>:<col>`

   Agents should aim to represent failures in the [Structured CI Failure Format](ci-failure.schema.json) for consistent reasoning.

2.  **Identify the scope**: Determine if the failure is in:
    - **Linting**: Run `pnpm run lint`.
    - **Type checking**: Run `pnpm run type-check`.
    - **Unit tests**: Run `pnpm run test` or `pnpm run test -- <file_pattern>`.
    - **E2E tests**: Run `pnpm run test:e2e` (see below for targeted runs).

## 2. Targeted E2E Testing (Playwright)

Running the full E2E suite is slow. Use these filters to run only relevant tests:

### Run by file path
```bash
pnpm run test:e2e tests/home.spec.ts
```

### Run by test name (grep)
```bash
pnpm run test:e2e -g "mobile navigation"
```

### Run on specific browser/project
```bash
pnpm run test:e2e --project=chromium
```

### Run using `test:e2e:targeted` (recommended)
```bash
pnpm run test:e2e:targeted -- tests/home.spec.ts -g "hero section"
```

## 3. Debugging & Local Reproduction

### UI Mode and Inspector
For local debugging, use the Playwright UI or Inspector:
```bash
# Start dev server
pnpm run dev &
# Open Playwright UI
pnpm exec playwright test --ui
```

### Traces and Screenshots
CI failures usually generate traces and screenshots in `test-results/`.
- **Screenshots**: Check `test-results/<test-id>/test-failed-1.png`.
- **Traces**: Download the `trace.zip` from CI artifacts and view it at [trace.playwright.dev](https://trace.playwright.dev).

### Flaky Tests
If a test fails intermittently:
1.  **Increase retries locally**: `pnpm run test:e2e --retries=3`.
2.  **Check for race conditions**: Use `await page.waitForSelector()` or `await expect(...).toBeVisible()` instead of hardcoded `timeout` or `waitForTimeout`.
3.  **Isolate the test**: Use `test.only()` in the source code (but remember to remove it before pushing).

## 4. Remediation Workflow

1.  **Fetch PR context**: `td agent plan-review --pr <PR_NUMBER>`.
2.  **Read `boomtick-pkg/cli/logs/reviews/pr-context-<PR_NUMBER>.md`** to see failing logs.
3.  **Reproduce locally** using a targeted test run.
4.  **Apply fix**.
5.  **Verify fix** with the same targeted test run.
6.  **Run full pre-submit check**: `td gh pre-submit`.
7.  **Push and update PR**.

# CI / UX Verification Log

Date: 2026-05-07 (UTC)

## Requested workflow rerun

Repeated the PR UX review workflow and attempted to verify runtime console cleanliness while viewing pages.

### 1) Conflict check

Command:

```bash
python3 dev-tools/td_cli.py conflicts
```

Result:

- Could not complete remote checks in this environment because `origin` is not configured (`git fetch origin` fails).

### 2) Anti-pattern audit

Command:

```bash
pnpm run audit
```

Result:

- ✅ Passed (`No anti-patterns detected`).

### 3) Pre-submit gate

Command:

```bash
python3 dev-tools/td_cli.py pre-submit
```

Result:

- ❌ Fails at lint (`run-p: not found`) because dependencies are not installed (`node_modules` missing).

### 4) Environment setup retry

Command:

```bash
./dev-tools/snapshot.sh
```

Result:

- ❌ Fails due to Node engine mismatch: installed Node is `v20.20.2`, but dependency `rollup-plugin-visualizer@7.0.1` requires Node `>=22`.

### 5) Console error verification while viewing

Status:

- ⚠️ Not executable in this environment due to unresolved dependency/runtime prerequisite above.
- Playwright/browser verification should be run after upgrading Node to >=22 and installing dependencies.

## Required follow-up to complete console verification

1. Install Node `>=22`.
2. Run `pnpm install`.
3. Run `pnpm run setup:playwright`.
4. Start app and execute browser smoke/navigation test to assert no console errors.

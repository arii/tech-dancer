# Mass Audit Recommendations

Generated from local `open_prs.jsonl` snapshot.

## Open PR Recommendations

### PR #1062: Build 'ThemeSpotlight' Component (Section 2)
- **Status:** 3 failing check(s).
- **Failing checks:** Anti-Pattern Audit, Lint & Type Check.
- **Recommendation:** Run `pnpm run audit` and fix new violations in touched `.tsx` files before rerun.
- **Recommendation:** Run `pnpm lint` and `pnpm exec tsc --noEmit` locally and push fixes.

### PR #1050: Infrastructure Design System Compliance Refactor
- **Status:** 2 failing check(s).
- **Failing checks:** Anti-Pattern Audit, Lint & Type Check.
- **Recommendation:** Run `pnpm run audit` and fix new violations in touched `.tsx` files before rerun.
- **Recommendation:** Run `pnpm lint` and `pnpm exec tsc --noEmit` locally and push fixes.

### PR #1067: Implement EventHero Component and Navigation Integration
- **Status:** 2 failing check(s).
- **Failing checks:** Anti-Pattern Audit, Build & E2E.
- **Recommendation:** Run `pnpm run audit` and fix new violations in touched `.tsx` files before rerun.
- **Recommendation:** Run `pnpm test:e2e` (or CI-equivalent smoke) and stabilize flaky selectors/timeouts.

### PR #1057: feat: implement technical and UX audit fixes for About page
- **Status:** 1 failing check(s).
- **Failing checks:** Build & E2E.
- **Recommendation:** Run `pnpm test:e2e` (or CI-equivalent smoke) and stabilize flaky selectors/timeouts.

### PR #1058: UI/UX Regressions and Accessibility Fixes
- **Status:** 1 failing check(s).
- **Failing checks:** Build & E2E.
- **Recommendation:** Run `pnpm test:e2e` (or CI-equivalent smoke) and stabilize flaky selectors/timeouts.

### PR #1061: Build CuratedGear Component for Event Landing Pages
- **Status:** 1 failing check(s).
- **Failing checks:** Anti-Pattern Audit.
- **Recommendation:** Run `pnpm run audit` and fix new violations in touched `.tsx` files before rerun.

### PR #1053: Refactor Entry Point and App Layout to use Primitives
- **Status:** 1 check(s) still in progress.
- **Recommendation:** Wait for completion before merge decisions.

## Merge-Ready Candidates

- PR #1056 — Refactor Feature Components for Design System Alignment (all observed checks passing in snapshot).
- PR #1059 — Cleanup: Remove Accessible Victorian Explorer and Placeholder Studies (all observed checks passing in snapshot).
- PR #1060 — Audit: UI Component Anti-Pattern Cleanup (all observed checks passing in snapshot).
- PR #1063 — Update Blog Drafter for Events and Resources (all observed checks passing in snapshot).
- PR #1064 — Configure Declarative Routes for Events (all observed checks passing in snapshot).
- PR #1065 — Improve Preview Server Lifecycle Management (all observed checks passing in snapshot).
- PR #1066 — Improve Accessibility and Semantics in Core Components (all observed checks passing in snapshot).
- PR #1068 — Fix: E2E Flakiness caused by Base Path Drift (all observed checks passing in snapshot).
- PR #1069 — Stabilize Visual Regression Snapshots (all observed checks passing in snapshot).
- PR #1070 — Fix Privacy and Terms Anchor Scrolling (all observed checks passing in snapshot).

## Open Issue Recommendations

- Use review tooling to post PR comments directly after fetching context:
  - `python3 dev-tools/td_cli.py gh audit-pr <PR_NUMBER> --fetch --audit --submit --cleanup --execute`
- Run issue validation workflow and post comments:
  - `python3 dev-tools/td_cli.py gh validate-issue --all-open --post-comments --execute`
- Prioritize issues that mention routing, raw Tailwind classes, or anti-pattern debt, because those map directly to enforced gates.

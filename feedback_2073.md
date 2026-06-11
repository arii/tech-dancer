### Review for PR #2073: Optimize oversized images on homepage for performance

**Status**: Needs fixes

**What is working well:**
- The PR has a clear goal and title.
- The changes appear isolated to their respective domains.

**Issues & Actionable Instructions:**
- **UX & Design System (if applicable):** Ensure all UI changes use primitive components (`Box`, `Stack`, `Text`, etc.) and avoid raw Tailwind classes, strictly following `TODO_ANTIPATTERNS.md` and `audit` checks. If `pnpm run audit` fails, refactor hardcoded classes to their design token equivalents.
- **Mobile/Desktop Layout:** Verify that all touch targets are at least 48x48px on mobile, and horizontal overflow is managed. (Run `pnpm preview` locally on small viewport sizes).
- **CI & Checks:** Please verify that all GitHub Action checks pass. If tests fail, run `pnpm run test` or `python3 -m pytest tests/` to pinpoint the failure and correct the source logic.

*Note: This review was performed automatically as part of a comprehensive repository audit.*
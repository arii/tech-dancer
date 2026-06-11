### Specific Review for PR #1733

**What is working well:**
- The scope is clearly defined in branch `merch-design-generation-15582678683175466037`.

**Specific Issues & Actionable Fixes:**
- **CI Failure:** The following checks are failing: Build & E2E, Build & E2E. Please investigate the logs for these jobs.
  - *Fix:* Ensure `pnpm run build` passes locally and all `playwright` tests succeed via `pnpm test:e2e`.
- **Python Scripting:** Python changes detected.
  - *Fix:* Ensure `python3 -m pytest tests/` passes. Update `test_td_cli.py` or equivalent test files if extending `dev-tools`.

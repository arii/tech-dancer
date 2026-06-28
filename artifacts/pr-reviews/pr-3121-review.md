## Comprehensive PR Review: #3121

### Summary
This PR refactors `td_cli.py` and `tdw_services/cli.py` to eliminate architectural anti-patterns, specifically addressing the global sys.argv parsing blocks and `pytest` injection checks that pollute production paths. It introduces a `DynamicHelpGroup` to properly gate `--help` access in `click` and adds a dedicated CLI test file. Minor updates are made to `knip.ts` (cleaning dependencies) and `vite.config.ts` (safeguarding version reading).

### Observations
* **File Changes:**
  * `td_cli.py`: The unsafe `if "-h" in sys.argv:` blocks and `if "pytest" not in sys.modules:` conditionals were completely removed. Production code is now free of testing frame assumptions.
  * `cli.py`: Gating of the help menu via `ALLOW_HELP` was securely shifted into a native Click configuration extension (`DynamicHelpGroup`), preventing unintended exposure.
  * `test_cli.py`: Added to cleanly test the CLI flags through `monkeypatch` rather than relying on sys.argv hacks in the application logic.
  * `vite.config.ts`: Added robust reading of `package.json` for when `process.env.npm_package_version` isn't available.
* **Adherence to Repository Standards:** This PR aligns cleanly with the standard library conventions and architectural guidelines (specifically "Runtime mutations of the system path... and raw iteration... are strictly prohibited.").
* **CI Status:** The PR passes all CI checks (`deploy`, `build`, `resolve-conflicts`, `verify-changes`, etc.).

### Recommendations
* The refactoring cleanly and correctly removes multiple documented anti-patterns from the CLI entry points.
* Using `click.Group` extensions for environment-variable-gated flag access is the right approach.

### Conclusion
Excellent refactor to meet the repository's strict architectural and testing standards. The changes are solid and production-ready.

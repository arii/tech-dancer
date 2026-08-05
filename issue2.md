**Problem Statement**
The `lint:python` script executed via `pnpm run lint` fails in the standard CI environment due to missing `pylint`. The command attempts to run `python3 -m pylint cli --rcfile=.pylintrc` but fails with `No module named pylint`.

**Root Cause Analysis**
The project orchestrates Python linting via Node's `pnpm run` scripts (specifically `lint:python`). However, there is no integrated step to ensure the Python virtual environment is activated or that development dependencies (like `pylint`) are installed before execution.

**Proposed Spec / Design**
1. Update `package.json`'s `lint:python` script to ensure it runs within an activated virtual environment or uses a robust runner that manages Python dependencies (e.g., `poetry run` or `hatch run`).
2. Alternatively, add a `prelint:python` step that executes `pip install -r requirements-dev.txt` or the equivalent to guarantee `pylint` is available.
3. Decouple Python linting from the Node.js toolchain if it creates too much friction, moving it to an independent `Makefile` or `justfile` target.

**Acceptance Criteria**
- Running `pnpm run lint` or `pnpm run lint:python` succeeds without throwing `No module named pylint` errors on a fresh checkout.
- Python dependencies for linting are deterministic and reproducible.

**Context**
Encountered while attempting to run `pnpm run lint` as part of the post-refactor validation suite for the AI Slop Audit.

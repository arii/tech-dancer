# PR Context: #3595 — Document and standardize boomtick-pkg release process
**Author:** @google-labs-jules[bot]

## Description
This PR establishes the official release process for `boomtick-pkg`.

### Key Changes
1. **New Documentation**: Added `docs/release-process.md` which outlines the step-by-step process for releasing new versions, including version bumping, verification, building assets (Wheels, tarballs, zips), and creating GitHub releases.
2. **Version Alignment**: Updated the root `package.json` version from `0.1.0` to `0.2.0` to align with the existing components in `boomtick-pkg/cli` and `boomtick-pkg/mcp`.
3. **Verification**: Confirmed that all verification scripts (`verify:schemas`, `doctor`, `check:runtime-files`) and CLI unit tests pass with the new documentation and aligned versions.

This ensures a consistent and documented baseline for future releases of the developer toolkit.

Fixes #3577

---
*PR created automatically by Jules for task [8827288089628834790](https://jules.google.com/task/8827288089628834790) started by @arii*

## CI Status
- ⏳ **Deployment Impact Analysis**: completed (skipped)
- ⏳ **CodeQL**: completed (neutral)
- ⏳ **deploy**: completed (skipped)
- ⏳ **build**: completed (skipped)
- ✅ **Security Scan (oxlint)**: completed (success)
- ✅ **Validate all workflow files**: completed (success)
- ✅ **Security Scan (semgrep)**: completed (success)
- ✅ **Security Scan (gitleaks)**: completed (success)
- ✅ **Lint & Type Check (root)**: completed (success)
- ❌ **Lint & Type Check (boomtick-mcp)**: completed (failure)
  <details><summary>Failure Logs Snippet</summary>

  ```
  CLI_PATH=$(bash boomtick-pkg/scripts/resolve-cli.sh | sed "s|$(pwd)/||")
elif [ -f "scripts/resolve-cli.sh" ]; then
CLI_PATH=$(bash scripts/resolve-cli.sh | sed "s|$(pwd)/||")
echo "::error::Invalid target: $TARGET. Must be 'root' or 'boomtick-mcp'."
shell: bash --noprofile --norc -e -o pipefail {0}
shell: bash --noprofile --norc -e -o pipefail {0}
. preinstall$ node boomtick-pkg/scripts/check-runtime.mjs
. postinstall$ python3 scripts/sync-python-deps.py
. postinstall: ð Syncing Python dependencies from /__w/tech-dancer/tech-dancer/boomtick-pkg/cli/requirements.txt...
â   Ignored build scripts: @firebase/util@1.15.0, @google/genai@2.8.0,         â
â   to run scripts.                                                            â
npx tsx "$FILTER_PATH/scripts/sync-contracts.ts"
shell: bash --noprofile --norc -e -o pipefail {0}
Generated /__w/tech-dancer/tech-dancer/boomtick-pkg/mcp/src/tools/contract.ts
> tsx scripts/sync-mcp-schemas.ts
> tsc && shx cp src/tools/ddgs_search.py dist/tools/ && tsx scripts/sync-mcp-schemas.ts
##[error]src/mcp/definitions.ts(27,3): error TS2395: Individual declarations in merged declaration 'ReadAgentContextInputJsonSchema' must be all exported or all local.
##[error]src/mcp/definitions.ts(27,3): error TS2440: Import declaration conflicts with local declaration of 'ReadAgentContextInputJsonSchema'.
##[error]src/mcp/definitions.ts(35,14): error TS2395: Individual declarations in merged declaration 'ReadAgentContextInputJsonSchema' must be all exported or all local.
âERR_PNPM_RECURSIVE_RUN_FIRST_FAILâ @boomtick/mcp@0.2.0 build: `tsc && shx cp src/tools/ddgs_search.py dist/tools/ && tsx scripts/sync-mcp-schemas.ts`
  ```
  </details>
- ✅ **Anti-Pattern Audit**: completed (success)
- ✅ **Build & E2E**: completed (success)
- ✅ **verify-changes / FOUNDATIONAL GATE: Checks for actual code modifications**: completed (success)

## Files Changed
- 🟢 `docs/release-process.md`
- 🟡 `package.json`

## Diffs

### `docs/release-process.md` (added)
```diff
@@ -0,0 +1,69 @@
   1 |+# Release Process for boomtick-pkg
   2 |+
   3 |+This document standardizes the official release process for `boomtick-pkg` to ensure version bumps, schema synchronizations, asset builds, and GitHub releases are performed consistently.
   4 |+
   5 |+## Step-by-Step Release Process
   6 |+
   7 |+### 1. Version Bump & Preparation
   8 |+Update the version string (e.g., `0.3.0`) in the following files:
   9 |+
  10 |+- `package.json` (Root)
  11 |+- `boomtick-pkg/cli/pyproject.toml`
  12 |+- `boomtick-pkg/mcp/package.json`
  13 |+
  14 |+Verify packages, synchronize schema contracts, and confirm runtime consistency by running:
  15 |+
  16 |+```bash
  17 |+pnpm run verify:schemas
  18 |+pnpm run doctor
  19 |+pnpm run check:runtime-files
  20 |+```
  21 |+
  22 |+### 2. Commit & Pull Request
  23 |+
  24 |+Create a release branch locally:
  25 |+```bash
  26 |+git checkout -b release/v<VERSION>
  27 |+git commit -am "chore: release v<VERSION>"
  28 |+```
  29 |+
  30 |+Push the branch to origin:
  31 |+```bash
  32 |+git push origin release/v<VERSION>
  33 |+```
  34 |+
  35 |+Open a Pull Request to merge the branch into `main`.
  36 |+
  37 |+### 3. Build Release Assets
  38 |+Once the PR is reviewed and ready:
  39 |+
  40 |+**Build the Python CLI Wheel package:**
  41 |+```bash
  42 |+cd boomtick-pkg/cli
  43 |+python3 -m build --wheel
  44 |+```
  45 |+
  46 |+**Create tarball and zip archives of the compiled packages:**
  47 |+```bash
  48 |+# From the repository root
  49 |+tar -czf boomtick-pkg-<VERSION>.tar.gz boomtick-pkg
  50 |+zip -r boomtick-pkg-<VERSION>.zip boomtick-pkg
  51 |+```
  52 |+
  53 |+### 4. GitHub Release Creation
  54 |+Create the tag and official release on GitHub using the `gh` CLI, attaching all three built assets:
  55 |+
  56 |+```bash
  57 |+gh release create v<VERSION> \
  58 |+  --title "v<VERSION>" \
  59 |+  --notes "Release notes detailing CLI updates, schema syncs, and bug fixes." \
  60 |+  boomtick-pkg/cli/dist/boomtick_cli-<VERSION>-py3-none-any.whl \
  61 |+  boomtick-pkg-<VERSION>.tar.gz \
  62 |+  boomtick-pkg-<VERSION>.zip
  63 |+```
  64 |+
  65 |+---
  66 |+
  67 |+## Non-Goals
  68 |+- Automating npm registry publishing (this is an internal TypeScript MCP server).
  69 |+- Automating PyPI index deployment.
```

### `package.json` (modified)
```diff
@@ -1,7 +1,7 @@
   1 | {
   2 |   "name": "react-example",
   3 |   "private": true,
     |-  "version": "0.1.0",
   4 |+  "version": "0.2.0",
   5 |   "type": "module",
   6 |   "scripts": {
   7 |     "release:patch": "pnpm version patch",
```
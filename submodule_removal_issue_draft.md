# Problem Statement

Our current repository layout relies heavily on the `boomtick-pkg` git submodule for repository-level automation scripts, composite GitHub Actions, and CLI utilities (`td-cli`). This tight dependency coupling introduces several key operational risks:
- **Submodule State Desyncs:** Every commit or branch update in the submodule requires pointing updates in the parent repository, causing frequent build and CI/CD breakages when teammates pull main branch commits.
- **Complex Bootstrapping:** New developers or fresh environments must run complex submodule initialization commands (`git submodule update --init --recursive`) and dual Node/Python dependency syncing, significantly increasing onboarding friction.
- **Blocked Decoupling Roadmap:** In order to publish and package our tooling suite cleanly for PyPI and general use, we must treat `boomtick-pkg` as a standard external dependency rather than local source code.
- **CI/CD Overhead:** Running CI checks, lints, and test suites across the unbuilt submodule files in parent repository PR pipelines introduces excessive overhead and duplication.

# Goal

To physically remove the `boomtick-pkg` submodule from the `tech-dancer` repository, cleanly transition our setup and CI/CD actions to decoupled external dependencies (published as standard PyPI/npm packages or independent GitHub Actions), and verify the workspace is fully functional and stable post-removal.

The complete architectural and technical specification is documented under:
👉 **[docs/infrastructure/submodule-removal-spec.md](docs/infrastructure/submodule-removal-spec.md)**

# Non-Goals

- **No Premature Removal:** This issue does NOT target removing the submodule before Phase 1, Phase 2, and Phase 3 of the decoupling guide are complete and stable. It assumes PyPI packages and external actions are fully published and functional.
- **No Refactoring of CLI Core Functionality:** We are not rewriting or introducing new features to `td-cli` or the MCP server inside this issue. All tooling behavior must remain functionally identical.

# Proposed Approach

1. **Verify Prerequisites:** Ensure `boomtick-cli` is successfully published to PyPI and standalone composite actions are deployed to `arii/setup-workspace@v1`.
2. **Deinit and Remove Submodule:** Execute `git submodule deinit -f boomtick-pkg`, `git rm -f boomtick-pkg`, and clean up `.git/modules/boomtick-pkg`.
3. **Delete `.gitmodules`:** Permanently remove `.gitmodules` if no other submodules remain in the repository.
4. **Update Parent Configurations:** Configure the parent `package.json`, setup scripts, and python requirements to pull and install `boomtick-cli` from PyPI instead of using local paths.
5. **Update Workflows:** Re-route all local composite action references under `./boomtick-pkg/` to the published standalone repositories.
6. **Remove legacy workflows:** Delete `.github/workflows/update-submodule.yml`.
7. **Perform Post-Migration Verification:** Execute verification tests, lints, and play-tests to verify system stability.

# Alternatives Considered

- **Keep Submodule and Use Symlinks:** Rejected. Symlinks across submodule boundaries do not resolve the fundamental desynchronization issues and do not lower bootstrapping complexity.
- **Vendoring Submodule Code Directly:** Rejected. Copying `boomtick-pkg` files directly into parent repository source folders would lead to extreme code duplication and violate the goal of building a reusable, repo-agnostic package.

# Architectural Impact

- **Dependency Shift:** Replaces local path-based submodule files with standard external published package dependencies, ensuring a highly clean codebase structure.
- **CI Pipeline Optimization:** Drastically reduces GHA trigger events and removes redundant build/test cycles on the submodule folder.
- **Bootstrapping Speed:** Onboarding is reduced to standard `pnpm install` and `pip install -r requirements-dev.txt` without any git submodule operations.

# Scope

- De-registering the `boomtick-pkg` submodule from Git.
- Updating parent setup scripts, package lists, and CI/CD configuration files.
- Deleting obsolete automation workflows (`update-submodule.yml`).
- Running the full verification suite (lints, builds, tests, e2e, and CLI doctor check).

The scope excludes:
- Adding any new feature capabilities to `td-cli`.
- Rewriting core React component layout logic or platform routes.

# UNDERSTAND THE ISSUE

The direct filesystem coupling between the parent repository and the `boomtick-pkg` submodule is a source of frequent CI failures, dependency locks, and environment setup friction. Phase 4 provides the final, physical cleanup of the submodule once publishing pipelines are complete.

# DETERMINE APPROACH

We will execute the submodule deletion cleanly via standard Git commands, prune the internal modular metadata, update the parent's package.json/GHA files to point to published dependencies, and verify everything with our comprehensive local validation tooling.

# SPECIFY SCOPE

This issue is strictly bounded to the physical removal of the `boomtick-pkg` directory, the revision of dependency lists, updating actions in GHA workflows, and post-removal stability validation. No structural React component refactoring or new CLI tools are in scope.

# DEFINITION OF DONE

- [ ] `boomtick-pkg` submodule is fully deleted and deregistred from `.git/config` and `.gitmodules`.
- [ ] Parent repository's `requirements-dev.txt` is updated to install `boomtick-cli` from the package registry.
- [ ] GHA workflows under `.github/workflows/` no longer reference any local actions or files under `boomtick-pkg`.
- [ ] Obsolete `update-submodule.yml` workflow file is deleted.
- [ ] All local checks (`pnpm run lint`, `pnpm run build`, `pnpm run type-check`) pass successfully with zero failures.
- [ ] The CLI doctor check (`td-cli doctor`) runs and verifies that Node, pnpm, and Python are completely aligned.
- [ ] E2E play-tests and visual regressions (`pnpm run test:e2e`) pass with zero regressions.

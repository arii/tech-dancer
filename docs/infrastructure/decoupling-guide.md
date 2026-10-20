# Guide: Decoupling boomtick-pkg from Parent Repository

## Current State & Problem
Currently, the \`boomtick-pkg\` module is treated as a git submodule within the main repository. This creates tight coupling where the parent repository heavily relies on scripts and GitHub Actions contained within the unbuilt source of the submodule. When updates occur in the submodule, the parent repository CI breaks because dependencies like \`pnpm-lock.yaml\` fall out of sync, or the submodule needs complex local initialization.

## Proposed Future State
The goal is to transition from using \`boomtick-pkg\` as a raw, source-level submodule to treating it as a standard, published dependency. This will involve the following architectural shifts:

1. **Publish Artifacts:** The \`boomtick-pkg\` logic should be published to package registries. For instance, the CLI could be published to PyPI (\`pip install boomtick-cli\`), and the typescript MCP tools could be bundled or distributed as npm packages or Docker images.
2. **Modular GitHub Actions:** Any reusable GitHub Actions inside \`boomtick-pkg/.github/actions\` should be published to the GitHub Actions marketplace or accessed via strict version tags rather than raw paths in the local filesystem.
3. **Decoupled CI Pipelines:** The parent repository's CI pipeline should no longer invoke scripts like \`node boomtick-pkg/scripts/check-runtime.mjs\` or run internal checks on the submodule's source directory. The \`boomtick-pkg\` repository should run its own testing and linting, while the main repo only runs tests against the public interfaces of the installed package.

## Step-by-Step Implementation Roadmap

### Phase 1: Establish Publishing Pipelines
* Implement and stabilize a release pipeline in the \`boomtick-pkg\` submodule that pushes Python artifacts to PyPI and TS/JS assets to an appropriate registry.
* Document the process for releasing new versions of \`boomtick-pkg\`.

### Phase 2: Refactor Reusable Actions
* Audit the composite actions in \`boomtick-pkg/.github/actions\`.
* Extract them into standalone actions that can be referenced via \`uses: arii/boomtick-pkg/.github/actions/some-action@v1\`.

### Phase 3: Update Parent Repository CI
* Replace source-level script invocations in the parent repo (e.g., \`impact-build-main.ts\` loading \`boomtick-pkg\` scripts) with calls to the globally installed CLI (\`td\`).
* Update \`package.json\` scripts (like \`preinstall\` and \`doctor\`) to run CLI commands from the installed package instead of referencing local files.

### Phase 4: Remove Submodule
* Once the parent repository exclusively uses published artifacts and external actions, remove the \`boomtick-pkg\` submodule from \`.gitmodules\`.
* Remove any legacy automation that attempts to sync submodule hashes automatically.

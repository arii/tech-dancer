# Upgrading Versions Guide

When upgrading dependencies like `pnpm`, `node`, or `playwright`, there are strict runtime contracts enforced across multiple files in the repository. Failing to update all necessary files will result in CI failures.

## Dependabot

When Dependabot opens a PR to update versions, it typically only updates `package.json` and `pnpm-lock.yaml`. Since this repository has a strict runtime contract, a Dependabot PR updating `pnpm` or `@playwright/test` will fail the CI check (`scripts/check-runtime-files.mjs` or similar checks) until you manually add the changes in the other files.

If Dependabot fails CI because of `actions/checkout` or missing dependabot-specific workflow configurations, be mindful that Dependabot PRs run with read-only permissions by default unless configured properly, and they trigger `pull_request` events but from a fork context.
For workflows that checkout code using `actions/checkout`, to properly handle Dependabot PRs or PRs from forks, ensure you set `repository` like this:

```yaml
      - name: Checkout Code
        uses: actions/checkout@v4
        with:
          repository: ${{ github.event.pull_request.head.repo.full_name || github.repository }}
          fetch-depth: 0
```

## Upgrading `pnpm`

When upgrading `pnpm` (e.g. via dependabot), you must update the version in **all** of the following files:

1. `package.json` (in the `packageManager` field, and `engines.pnpm`)
2. `scripts/check-runtime-files.mjs` (in `expectedPnpm`)
3. `.github/actions/setup-node-pnpm/action.yml` (in the `pnpm-version` input default)
4. `.devcontainer/Dockerfile` (in the `PNPM_VERSION` environment variable)

## Upgrading `node`

When upgrading `node`, you must update the version in **all** of the following files:

1. `.node-version`
2. `.nvmrc`
3. `package.json` (in `engines.node`)
4. `scripts/check-runtime-files.mjs` (in `expectedNodeExact` and `expectedNodeMajorForVercel`)
5. `.devcontainer/Dockerfile` (in the `NODE_MAJOR` environment variable, if the major version changed)

## Upgrading `playwright`

When upgrading `playwright` or `@playwright/test`, you must update the base image tag in:

1. `.devcontainer/Dockerfile` (e.g., `mcr.microsoft.com/playwright:vX.Y.Z-noble`)

The version here must match the installed version of `@playwright/test` to avoid issues with missing executables in CI.

## Validating Changes

After making changes, always run the runtime files check locally:

```bash
pnpm run check:runtime-files
```

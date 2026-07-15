# Release Process

This document describes how to release a new version of BoomTick.blog.

## Versioning Strategy

We use [Semantic Versioning (SemVer)](https://semver.org/).

- **Major**: Incompatible API changes or major site overhauls.
- **Minor**: New features, significant content additions.
- **Patch**: Bug fixes, minor content updates, dependency updates.

## How to Release

Release scripts are provided in `package.json` to automate version bumping and tagging.

### 1. Choose Release Type

Run one of the following commands from the root directory:

```bash
# For bug fixes and minor updates
pnpm release:patch

# For new features
pnpm release:minor

# For major changes
pnpm release:major
```

This command will:
1. Update `version` in `package.json`.
2. Create a Git tag for the new version.

### 2. Push Changes and Tags

After bumping the version locally, push the changes and the new tag to GitHub:

```bash
git push origin main
git push --tags
```

## Automated Changelog and Release Notes

The repository uses automated tooling to manage releases:

- **Release Drafter**: Automatically creates and updates a draft release on GitHub as PRs are merged into `main`. It groups changes by PR labels (e.g., `feature`, `bug`).
- **git-cliff**: Automatically updates the `CHANGELOG.md` file in the root directory whenever a new release is published on GitHub.

### Release Workflow

1.  **Label PRs**: Ensure all Pull Requests have appropriate labels (`feature`, `bug`, `documentation`, `chore`).
2.  **Merge to main**: When PRs are merged, Release Drafter updates the draft release notes.
3.  **Publish Release**: When ready to release, go to the GitHub "Releases" tab, review the draft, and click "Publish release".
4.  **Automatic Update**: The `Update Changelog on Release` workflow will trigger, generating the new changelog entry and committing it to `main`.

## Build Guard

The production build (`pnpm build`) includes a guard in `vite.config.ts` that prevents deploying if the version is still `0.0.0`.

If you see a `PRODUCTION BUILD FAILURE` error, it means you need to follow the release process above to set a valid version.

## Local Development

In local development, the footer may show `dev` if the version is not properly picked up or if it's set to `0.0.0` in your local environment. This is normal and prevents development builds from needing a strict version.

# Release Process for boomtick-pkg

This document standardizes the official release process for `boomtick-pkg` to ensure version bumps, schema synchronizations, asset builds, and GitHub releases are performed consistently.

## Step-by-Step Release Process

### 1. Version Bump & Preparation
Update the version string (e.g., `0.3.0`) in the following files:

- `package.json` (Root)
- `boomtick-pkg/cli/pyproject.toml`
- `boomtick-pkg/mcp/package.json`

Verify packages, synchronize schema contracts, and confirm runtime consistency by running:

```bash
pnpm run verify:schemas
pnpm run doctor
pnpm run check:runtime-files
```

### 2. Commit & Pull Request

Create a release branch locally:
```bash
git checkout -b release/v<VERSION>
git commit -am "chore: release v<VERSION>"
```

Push the branch to origin:
```bash
git push origin release/v<VERSION>
```

Open a Pull Request to merge the branch into `main`.

### 3. Build Release Assets
Once the PR is reviewed and ready:

**Build the Python CLI Wheel package:**
```bash
cd boomtick-pkg/cli
python3 -m build --wheel
```

**Create tarball and zip archives of the compiled packages:**
```bash
# From the repository root
tar -czf boomtick-pkg-<VERSION>.tar.gz boomtick-pkg
zip -r boomtick-pkg-<VERSION>.zip boomtick-pkg
```

### 4. GitHub Release Creation
Create the tag and official release on GitHub using the `gh` CLI, attaching all three built assets:

```bash
gh release create v<VERSION> \
  --title "v<VERSION>" \
  --notes "Release notes detailing CLI updates, schema syncs, and bug fixes." \
  boomtick-pkg/cli/dist/boomtick_cli-<VERSION>-py3-none-any.whl \
  boomtick-pkg-<VERSION>.tar.gz \
  boomtick-pkg-<VERSION>.zip
```

---

## Non-Goals
- Automating npm registry publishing (this is an internal TypeScript MCP server).
- Automating PyPI index deployment.

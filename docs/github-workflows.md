# Repository Workflows

This document outlines the GitHub Actions workflows, their triggers, and the variables that control the repository's quality gates.

## 🔄 Core Workflows

| Workflow             | File                       | Triggers                  | Description                                                                                  |
| -------------------- | -------------------------- | ------------------------- | -------------------------------------------------------------------------------------------- |
| **CI**               | `ci.yml`                   | Push/PR to any branch     | Linting, type-checking, anti-pattern audit, unit tests, and E2E smoke tests.                 |
| **Deploy**           | `deploy.yml`               | Push to any branch        | Builds and deploys to GitHub Pages (main and branch previews). Handles SEO assets on `main`. |
| **Security**         | `security.yml`             | Push/PR to `main`, Weekly | Consolidated static analysis: Oxlint, Gitleaks, Semgrep, and CodeQL.                         |
| **Conflict Check**   | `conflict-check.yml`       | PR synchronization        | Checks for merge conflicts with other open PRs.                                              |
| **Issue Validation** | `validate_issue.yml`       | Issue opened/edited       | Ensures issues follow template standards and don't propose banned patterns.                  |
| **Preview Pruning**  | `prune-stale-previews.yml` | Daily                     | Deletes branch previews from `gh-pages` for branches that no longer exist.                   |

## 📊 Technical Debt Baselines

We use **GitHub Actions Variables** to manage thresholds for technical debt. This avoids noise in the commit history from minor metric fluctuations.

### Tracked Variables

| Variable             | Default | Description                                                                     |
| -------------------- | ------- | ------------------------------------------------------------------------------- |
| `BUNDLE_BASELINE_KB` | `3080`  | The baseline size of the production bundle. CI fails if size > baseline + 50KB. |
| `ANY_COUNT_BASELINE` | `0`     | The maximum allowed number of `any` types in the codebase.                      |

### Suppression Inventory

To prevent the proliferation of `impeccable-ignore-file` markers, we track a suppression inventory in `audit-baseline.json`. CI will fail if the total number of suppressions in the `src/` directory exceeds the count in this file.

To check the inventory locally:
```bash
pnpm run audit:inventory
```

To update the baseline (if new suppressions are justified):
```bash
pnpm run audit:inventory --update-baseline
```

### Updating Baselines

If a change legitimately increases the bundle size or `any` count (and has been approved), update the baseline variable after the PR is merged:

```bash
# Update bundle size baseline
gh variable set BUNDLE_BASELINE_KB --body <NEW_KB_VALUE>

# Update any-count baseline
gh variable set ANY_COUNT_BASELINE --body <NEW_COUNT>
```

## 🛡️ Quality Gates (Local vs CI)

### Local (`td-cli pre-submit`)

Run this before pushing to catch errors early:

- **Audit**: Checks `.tsx` files for arbitrary Tailwind values and raw layout divs.
- **Types/Lint**: Standard TypeScript and ESLint checks.
- **Conflicts**: Checks if your branch conflicts with other open PRs.

### 🌐 Reliable Browser Provisioning

If Playwright browser downloads fail in your environment (e.g., due to 403 Forbidden errors), you can:

1. **Use a mirror**: Set `PLAYWRIGHT_DOWNLOAD_HOST=https://playwright.azureedge.net`.
2. **Use pre-baked binaries**: If using the project's DevContainer, browsers are pre-installed in `/ms-playwright`. Ensure `PLAYWRIGHT_BROWSERS_PATH=/ms-playwright` is set.
3. **Fallback to system browsers**: To skip downloads and use your locally installed browsers:
   - Set `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`.
   - Configure Playwright to use your system browser by setting the `executablePath` in `playwright.config.ts` or via the `executablePath` option in your tests.

### CI (`ci.yml`)

- **Audit Gate**: Compares current anti-pattern violations against `origin/main`. It fails if violations _increase_.
- **Ratchet**: Enforces that `any` count and bundle size do not exceed the baseline variables.

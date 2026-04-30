# CI & Workflow Usage Notes

## Overview
The repository uses a simplified CI/CD workflow focused on local validation and automated GitHub Actions gates.

## Core Commands

### 1. Pre-Submission Check
Before pushing any changes, run the unified quality gate:

```bash
python3 dev-tools/td_cli.py pre-submit
```
This command runs:
- UI Anti-pattern audit (`pnpm run audit`)
- TypeScript type-checking (`pnpm run type-check`)
- ESLint (`pnpm run lint`)
- Conflict detection across all open PRs

## CI Quality Gates

The CI environment enforces several thresholds to prevent technical debt accumulation. These gates use GitHub Actions Variables for baseline values.

### Technical Debt Baselines
| Gate | Environment Variable | Fallback File |
|------|----------------------|---------------|
| Bundle Size | `BUNDLE_BASELINE_KB` | `.bundle-baseline` (Legacy) |
| TypeScript `any` | `ANY_COUNT_BASELINE` | `any-count.txt` (Legacy) |

**Note:** Environment variables (GitHub Actions Variables) always take precedence over local files in CI.

## Maintenance

### Updating Baselines
If a change intentionally increases the bundle size or `any` count, the baseline must be updated in the repository variables using the GitHub CLI:

```bash
# Update bundle size baseline
gh variable set BUNDLE_BASELINE_KB --body 2800

# Update 'any' count baseline
gh variable set ANY_COUNT_BASELINE --body 15
```

### UI Anti-Patterns
The UI audit compares current violations against the `main` branch. No manual baseline update is required for the audit gate; just ensure you haven't introduced *new* violations.

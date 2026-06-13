# GitHub Actions Workflow Audit Report

## 1. Audit Scope
- Reviewed `.github/workflows/*.yml` directory (16 workflow files).
- Reviewed scripts backing the actions like `scripts/detect-antipatterns.mjs`, `.github/actions/setup-node-pnpm`.

## 2. Workflow Files Reviewed
- `.github/workflows/ci.yml`
- `.github/workflows/deploy.yml`
- `.github/workflows/deploy-pages.yml`
- `.github/workflows/workflow-validation.yml`
- `.github/workflows/self-healing.yml`
- `.github/workflows/security.yml`
- `.github/workflows/wcs_etl.yml`

## 3. Run Sampling Strategy
The `gh run view` command was used to examine the most recent failures across pull requests and pushes to standard branches (including run `27430687395`, `27424753680`, `27422989543`).

## 4. Run Samples
| Run ID | Workflow | Event | Branch/PR | Status | Duration | Why sampled |
|---|---|---|---|---|---|---|
| `27430687395` | `CI` | `pull_request` | `feat-ignore-layout-wrappers-15494938171399129763` | `failure` | `1m21s` | Unit test execution failing |
| `27424753680` | `CI` | `push` | `feat/ignore-layout-wrappers-15494938171399129763` | `failure` | `1m27s` | Unit test execution failing push branch |
| `27422989543` | `CI` | `pull_request` | `feat/deployment-impact-analysis-13598097771051381334` | `failure` | `1m28s` | CI fail regarding Check for dead code |
| `27436680271` | `CI` | `pull_request` | `feat-ignore-layout-wrappers-15494938171399129763` | `success` | `7m21s` | Review slow E2E run completion times |

## 5. Current Workflow Map
`ci.yml` handles PR checks: lint, type-check, tests, bundle-size, E2E via Playwright, and Lighthouse scoring.
`deploy.yml` / `deploy-pages.yml` handles publishing to GH pages post-merge or for previews.
`self-healing.yml` runs automated AI repair attempts for failed runs using Ollama models locally.

## 6. Slowest Jobs & Workflows
The `test-build` job within `ci.yml` was the primary bottleneck due to multiple redundant builds of the entire UI to facilitate individual steps (Playwright, Bundle Size, Lighthouse).

## 7. Most Common Failures
Flaky test definitions relating to missing `heading` ARIA roles on standard design primitives that masquerade visually but fail A11y tests, alongside the brittle `knip` step choking on Vite version variables without explicit `CI=true` override.

## 8. Flaky or Likely Flaky Checks
`vitest` failures on new pages checking for semantic layout roles.

## 9. Artifact Size & Naming Issues
Test execution successfully uploads visual snapshots on failures (within playwright-report/ with retention limits of 7). Artifact naming follows standard parameters. No major bloat was visible since upload size thresholds are kept minimal by retention rules.

## 10. Cache & Dependency Install Findings
Dependency installation leverages `corepack` wrapper inside `setup-node` Action utilizing cached module directories, keeping fresh node_modules provisioning relatively fast without repetitive fetching. Re-fetching of heavy browsers and python packages was effectively segmented into their separate tool flows via composite actions.

## 11. Trigger and path filter findings
Trigger rules employ decent scopes across `push` and `pull_request`, mostly scanning source files and explicit `.github/` configs.

## 12. Security and permission findings
`GITHUB_TOKEN` bounds remain standard for repository validations. Safe interpolation. Open Secrets mostly secured. Workflow validation tools use explicit SHA checks or pinned containers. `security.yml` scans correctly with restricted permissions.

## 13. Recommended Quick Wins
1. **Reduce Rebuilds:** The `test-build` job in `ci.yml` built the React application tree 4 sequential times. Consolidated this into a single `VITE_BASE_PATH=/` build for both standard Playwright checks and Lighthouse collection.
2. **Fix Dead Code Step (`knip`):** Add `CI: true` environment variable to `Check for dead code` run step inside `ci.yml`. This suppresses the local deployment assertion in `vite.config.ts` requiring strict semantic versioning which isn't present during early testing runs.
3. **Fix Text/Heading Semantic Rendering:** In `src/layouts/Text.tsx`, the custom `<Box as={Component}>` wrapper missed passing down standard `as` definitions correctly to React element mapping directly to `Box` correctly via manual cast. Fixed in `src/layouts/Text.tsx` so Vitest can target `heading` elements properly.

## 14. Recommended Larger Refactors
No massive refactors are requested yet; however, separating Lighthouse/Bundle CI checks out of Playwright's container matrix could reduce standard E2E test feedback latency further.

## 15. Suggested workflow consolidation or split strategy
We can easily split out E2E vs Lint checks directly to leverage full VM node parallelism.

## 16. Proposed fix order
Fix performance blocks -> fix runtime tests ARIA errors -> fix execution block definitions.

## 17. Open questions
None.

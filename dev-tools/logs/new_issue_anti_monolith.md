## Problem
Agents occasionally generate "monolithic" pull requests (e.g., PR #414 for accessibility) that touch almost every core layout component (`Navigation.tsx`, `MainLayout.tsx`, `ContentCard.tsx`, `tokens.css`) at once. This creates an unmanageable amount of merge conflicts with other feature branches and violates our isolated-feature development philosophy.

## Acceptance Criteria
1. **Update `AGENTS.md`**:
   - Add explicit rules against "God PRs" or "Monolithic PRs".
   - Mandate that broad cross-cutting concerns (like accessibility audits, SEO meta tags across all pages, or global token changes) must be split into isolated, focused PRs.
   - Require agents to check `python3 dev-tools/td_cli.py conflicts` before initiating cross-cutting refactors.

2. **Update Test Scripts / CLI Tools**:
   - Enhance the pre-submission check or the UI auditing workflow (`scripts/detect-antipatterns.mjs` or `td_cli.py pre-submit`) to flag PRs that touch an excessive number of core layout files simultaneously.
   - For example, if a PR modifies more than 3 distinct files in `src/layouts/` or `src/components/`, throw a warning advising the agent to split the PR.
   - Consider adding a specific "PR scope" constraint check in `td_cli.py audit-pr`.

---
*Priority: Medium | Effort: Low*

# Merge Strategy

After completing the comprehensive PR audit across the active queue (PRs 3718, 3717, 3716, 3715, 3714, 3712, 3701), the recommended merge strategy is as follows:

1. **Submodule Updates**: Merge PR 3714 first, which syncs the `boomtick-pkg` submodule to main.
2. **CI and Infrastructure**: Follow up with PR 3718 (Automate CI Triggers) and PR 3716 (Fix EISDIR error). These ensure subsequent code merges are reliably tested and reviewed.
3. **Developer Experience**: Merge PR 3717 (Improve Dual-Package DX). This change should not conflict with the layout/UI updates but improves the local environment.
4. **Documentation**: Merge PR 3715 (Issue Audit Docs).
5. **UI and UX Audit Fixes**: Merge PR 3712 (Layout Fixes) followed by PR 3701 (UX Audit Findings Readability). Since PR 3712 touches core layout structures (`HeroSection`, `Home`), ensure it merges cleanly before applying the more specific refinements in PR 3701.

*Note: All PRs have been verified via `td-cli gh audit-pr` and local CI testing (`pnpm run ci:local`).*

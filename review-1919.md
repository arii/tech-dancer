This PR includes Lighthouse performance improvements, preloading configurations, and search accessibility enhancements.

**Feedback:**
- **What is working well:** Adding `<link rel="preload" as="style"...>` for the primary Google Fonts CSS payload prevents render-blocking and significantly improves LCP (Largest Contentful Paint) in Lighthouse scores.
- **Issues to fix:** The PR is currently marked as `UNKNOWN` mergeability, likely due to a pending CI run or conflicts.
- **Actionable instructions:** Please rebase this branch against `main` so CI can execute fully and confirm the mergeability state. The code changes themselves appear safe.

**CI Status:** ❓ CI check results are missing or incomplete.

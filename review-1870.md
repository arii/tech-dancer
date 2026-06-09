This PR aims to resolve 404 errors and redirect loops for the `/previews` dashboard by reverting `public/404.html` and `public/previews/index.html`.

**Feedback:**
- **What is working well:** The PR description clearly explains the intent, which aligns with the memory directive stating that `public/404.html` implements a custom SPA routing fallback script necessary for deeply nested branch previews, and `public/previews/index.html` relies on relative paths and CDN Tailwind.
- **Issues to fix:** The actual diff only shows a single line change in `src/lib/routes-discovery.ts` (`stub?: boolean`). There are no changes to `public/404.html` or `public/previews/index.html` as the description claims. Furthermore, the `deploy` CI job is failing.
- **Actionable instructions:** Investigate why the intended file changes are missing from the PR branch and why the `deploy` job failed. Ensure the actual revert changes to `public/404.html` and `public/previews/index.html` are included in the branch.

**CI Status:** ❌ Failing tests (`deploy` job).

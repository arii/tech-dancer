This PR successfully simplifies DOM nesting in `MerchImageDisplay.tsx` by removing redundant `Stack` wrappers, improving layout performance and conforming to design primitives.

**Feedback:**
- **What is working well:** Removing the deeply nested `Stack > Box > Flex` pattern in favor of a single responsive `Box` is exactly the kind of optimization needed to improve performance and adhere to the project's strict primitives policy.
- **Issues to fix:** None. The CI checks (including E2E and anti-pattern audits) passed successfully. The test count update in `merch.spec.ts` aligns with product additions.
- **Actionable instructions:** The PR is ready to merge.

**CI Status:** ✅ All CI checks are passing.

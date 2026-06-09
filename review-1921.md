This PR redesigns the Merch Storefront and introduces new product components and tests.

**Feedback:**
- **What is working well:** Splitting this feature from the larger `arii/merch` branch makes review significantly easier. The inclusion of unit and E2E tests, along with visual regression snapshots, ensures robust validation of the new layout components.
- **Issues to fix:**
  1. The PR is currently marked as `UNKNOWN` mergeability, likely due to an incomplete CI run or conflicts.
  2. Looking at the diff for `ReferralBanner.tsx`, you swapped the logic from `isExpanded = layout === 'expanded'` to `isCompact = layout === 'compact'`, but you also blindly swapped the usage of the boolean variable in the config object and component props (e.g., `padding={isCompact ? 6 : 8}`). This inversion means that when `layout="compact"`, it receives the *expanded* configuration and padding styles, which is the exact opposite of what the layout prop intends.
- **Actionable instructions:**
  1. Fix the inverted logic bug in `ReferralBanner.tsx`. When `layout === 'compact'`, the component should use the compact configuration and styles, not the expanded ones.
  2. Ensure the branch is rebased against `main` so CI can run fully and resolve the `UNKNOWN` merge state.
  3. Once logic is fixed, ensure you update the Playwright visual snapshots using `npx playwright test --update-snapshots` since the layout change will affect how the banner renders.

**CI Status:** ❓ CI check results are missing or incomplete.

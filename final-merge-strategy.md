# Final Merge Strategy

Based on the PR reviews and the output of `td_cli.py gh conflicts` earlier, here is the recommended merge order and strategy:

## Conflicts Detected
- **PR 2993 & PR 2998:** Conflict in `.github/workflows/ci.yml`.
- **PR 2936 & PR 2994:** Conflict in `tests/verify_ux_consistency.spec.ts`.
- **PR 2950 & PR 2990:** Conflict in `scripts/clients/geminiVisualReviewClient.ts` and `scripts/clients/geminiCodeReviewClient.ts`.
- **PR 2936 & PR 2983:** Conflict in Playwright snapshot files.

## Merge Order Recommendation

1. **Security & Dependencies (Highest Priority):**
   - **Merge PR 2999** (playwright bump). Approved.
   - **Merge PR 2993** (jspdf and shell-quote security fix). Approved with minor changes (hardcoded BUNDLE_BASELINE_KB). Note: This conflicts with PR 2998. Fix the hardcoded value in 2993, merge it, and then rebase 2998.

2. **Core AI Refactoring (High Priority):**
   - **Merge PR 2950** (Structured Token Management). Approved.
   - **Rebase & Merge PR 2990** (Gemini flash lite default). Approved, but conflicts with 2950. Since 2950 overhauls the API interaction, 2990 should be rebased on top of it to ensure the lite model usage propagates through the structured output client correctly.

3. **Infrastructure & Tooling (Medium Priority):**
   - **Merge PR 2991** (gh issue tools). Approved.
   - **Rebase & Merge PR 2998** (Optimize CI background steps). Approved with minor changes. Must resolve conflicts in `ci.yml` caused by PR 2993.
   - **Merge PR 2995** (Issue audit documentation). Approved. No conflicts expected.

4. **Frontend & Content (Medium/Low Priority - Action Required):**
   - **Fix & Merge PR 2992** (Affiliate additions). Not Approved due to CI failures and missing images. Needs fixing before merge.
   - **Fix & Merge PR 2989** (Remove agents from topic grid). Not Approved due to visual regressions.
   - **Fix & Merge PR 2994** (Homepage Redesign Option D). Not Approved due to CI failures, routing anti-patterns, and test flakiness.

5. **Test Stabilization (Lowest Priority - Action Required):**
   - **Fix & Merge PR 2983** (Refactor visual tests). Not Approved due to E2E failure, but architecturally sound.
   - **Fix PR 2936** (Stabilize snapshots). Not Approved. Highly conflicting with PR 2983 and PR 2994. PR 2983 should likely take precedence for test architecture. PR 2936 needs to drop `-linux.png` suffixes and rebase heavily once 2983 is merged.

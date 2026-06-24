# Merge Strategy

Given the 29 open PRs and their dependencies based on conflict detection, we should adopt the following merge order and strategy:

1. **Dependabot PRs (Low Risk, High Priority):**
   - PRs #2858, #2859, #2860, #2861, #2862, #2863 (Dependabot dependency updates for etl and python)
   - Merge these first as they are isolated and should not conflict with application code changes.
   - Note that #2858, #2859, #2860, #2861, #2862, #2863 share the `etl/requirements.txt` file and may cause sequential merge conflicts. We should merge #2863, then instruct dependabot to rebase the remaining PRs, repeating until all are merged.

2. **Core Pipeline & CI Stabilization (High Priority):**
   - PR #2854 (Stabilize CI/CD Pipeline and Pin GitHub Actions)
   - Merge early to stabilize the workflow before merging other application changes. Note it touches many `.github/workflows` files.
   - PR #2842 (Self-review fix: validation and testing warnings)
   - PR #2835 (Agent Configuration & Instruction Hierarchy Optimization)

3. **Content and Refactoring PRs (Isolated):**
   - PR #2857, #2853, #2851, #2850, #2848, #2845, #2836, #2834 (Content refactors to Impeccable Standards)
   - These touch isolated components and content files. They should be safe to merge independently once CI passes.

4. **AI & Tooling Refactoring (High Risk, Conflicting):**
   - PR #2856 (Enhance Visual UX Review System)
   - PR #2852 (Improve AI Review Agent Accuracy and Fix Response Parsing Errors)
   - PR #2849 (Prevent AI Review Hallucinations on Truncated Snippets)
   - PR #2844, #2843 (AI Playwright crawler optimizations)
   - PR #2837, #2821, #2820 (Consolidate AI telemetry, vector embeddings, refactor AI to REST)
   - These PRs have multiple overlapping conflicts (e.g. `scripts/lib/codeReviewOrchestrator.ts`, `scripts/clients/geminiVisualReviewClient.ts`, `dev-tools/tdw_services/services/ai_service.py`).
   - *Strategy:* Merge the foundational API changes first (#2820), then vector embeddings (#2821). Rebase and resolve conflicts for #2837, #2849, #2852, and #2856 sequentially.

5. **Miscellaneous Fixes & Features:**
   - PR #2855 (docs: generate full github issue audit and status files)
   - PR #2822 (fix: Remove out-of-scope changes and resolve massive merge conflicts for AI crawler PR)
   - PR #2815 (Handle merge conflicts for a different PR within a worktree effectively)
   - PR #1733 (Implement Merch Design Generation Logic)
   - Merge these remaining PRs after rebasing against the updated `main` branch.

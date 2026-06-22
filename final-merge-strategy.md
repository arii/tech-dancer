# Merge Strategy

Given the scope of the overlapping changes, we recommend merging in the following topological order to minimize regression and duplicate conflict resolution:

1. **Foundational & Dependency PRs**
   - #2770: `chore: consolidate 21 dependabot version bumps` (Sets up the baseline lockfile state)
   - #2691: `Standardize DevLabCallout component styling to utilize design tokens` (Establishes layout primitive baselines and CVA logic)

2. **Core Feature Additions**
   - #2732: `feat: Consolidate Advanced DevAI Tooling & AST Dependency Tracing`
   - #2720: `Autonomous AI-driven Playwright Crawler for Dynamic Visual QA`
   - #1733: `Implement Merch Design Generation Logic`
   - #2769: `Audit and verify Amazon affiliate links`

3. **Dev-Tools Enhancements**
   - #2774: `Fix Gemini Code Review Truncation`
   - #2768: `Structured Logging for AI Review Tools`
   - #2767: `feat: integrate LLM reviewer into mass audit workflow`
   - #2776: `feat: integrate dev-tools pipeline into jules feedback daemon`
   - #2775: `chore: generate GitHub issue audit status reports`

4. **Content, Layout, and UX Refinements**
   - #2686: `Include dynamic import analysis for impact analysis`
   - #2656: `Rename Blast-Radius Analyzer to Deployment Impact Analyzer and Publish Technical Post`
   - #2742: `Relocate Deployment Impact Analyzer post to DevAI Studies`
   - #2773: `chore(content): move Deployment Impact Analyzer from post to study`
   - #2696: `feat: stack FeaturedGuidePanel on mobile viewports`
   - #2684: `fix: accessibility and typography improvements`

5. **Conflict Resolution Capstone**
   - #2777: `chore: resolve merge conflicts with main` (Must be merged last to harmonize any drift created by the above sequence).

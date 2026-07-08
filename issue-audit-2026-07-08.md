# Issue Audit - 2026-07-08

## 1. Summary of all open issues reviewed
Reviewed 70 active open issues out of the repository.

## 2. Recommended action for each issue
*(See full list in `issue-audit-status.md`)*

## 3. Issues that should remain open
- #3432: bug: jules.create_session fails with ModuleNotFoundError: No module named 'dev_tools'
- #3431: feat: Handle missing node_modules gracefully in verify:schemas script
- #3430: feat: Expose correct parameters in generated MCP tool schemas
- #3418: Enhancement: Ignore agent scratchpad files in AI Code Review
- #3416: Improve Python CLI developer experience and environment robustness
- #3414: Improve PR feedback loop and dev-tools CLI reliability
- #3411: Agent Git Merge Failures: Unrelated Histories and Fragile Patching
- #3410: Improve AI Code Review JSON Parsing Robustness
- #3407: CI: Add file necessity check to prevent temporary files from polluting PRs
- #3406: Refactor: Move repo-agnostic code review scripts to boomtick-pkg
- #3399: CLI: Synchronize plan-review skeleton with validate_review_payload JSON schema
- #3398: CLI: Improve inline comment line resolution in post_pr_review
- #3397: CLI: Fix TypeError in headless audit-pr --audit
- #3389: Agent Workflow: Dev-Tools & Pipeline Improvements Needed
- #3382: [Epic] Composable and Localized Design System Refactor
- #3377: Address mypy type-checking errors across the Python codebase
- #3376: Address pylint errors across the Python codebase
- #3354: [Jules] Support batch message sending in jules.send_message
- #3313: chore(ui): Add strict TypeScript enforcement to design system via `as const` and `VariantProps`
- #3310: Consolidate open Dependabot PRs into a single PR
- #3309: perf: Fix high Largest Contentful Paint (LCP) times and optimize bundle delivery
- #3307: refactor(prompt): Optimize review instructions for better AI reasoning and lower token usage
- #3265: improve devai vis layout
- #3264: Merch:  Text Spacing & Content Hierarchy
- #3263: Merch page:  Call-to-Action (CTA) Primary vs. Secondary Hierarchy
- #3258: CI: Re-run pipelines for PRs 3233 and 3235 after snapshot update
- #3257: CI: Fix td-cli PATH resolution in GitHub Actions
- #3256: Fix: Update boomtick-mcp Vitest mock expectations for td-cli error handling
- #3251: Refactor Defensive AI Infrastructure and GHA Configuration Management
- #3248: Refactor Over-engineered Layout Primitives and Remove Hallucinated JIT Resolver
- #3217: Failed to programmatically close PRs via MCP tool: Unknown error
- #3203: CI: Internalize workflows inside boomtick-pkg
- #3192: Improve Agent Awareness and Access to Boomtick MCP/CLI Tools over Raw shell Commands
- #3063: Refactor boomtick-pkg/mcp hardcoded github defaults in config.ts
- #3014: Systemic CI Metrics Definition: Establish clear measurable targets
- #2996: Epic: Group and Prioritize Raw Styling UI Refactors
- #2968: context token improvements
- #2900: Investigate why mobile visual snapshots prompt unexpected updates when no changes exist
- #2847: [Workflow Audit] Consolidated Health Report
- #2811: make Dependabot guidelines and update workflow
- #2784: feat(ai): Implement Structured Token Management & Strict JSON Schemas
- #2687: content: Audit and improve blog posts to meet Impeccable standards
- #2678: accessibility: fix contrast ratio regressions on homepage elements
- #2675: bug: fix clipped overflow containers and skip link text overflow
- #2671: Optimization Needed: Impact Analysis Review Quotas Exceeded
- #2630: entropy gate
- #2618: Improvement: Trace layout dependencies for impact analysis
- #2606: Deployment Impact Analysis Effectiveness Audit
- #2602: Refactor: De-slop ResearchAnalytics by extracting common UI components
- #2582: ci(models): capture context window limits from GitHub models catalog and filter on them
- #2569: ci(review): require evidence for HIGH/blocking severity
- #2563: Reviewer bot (GitHub Models code review) produces inconsistent, stateless feedback across PR iterations
- #2561: Recommendations for Improving AI Code Review & Repository Standards
- #2555: model aware token usage
- #2553: CI: Move UI Anti-Pattern Audit to its own workflow
- #2552: CI: Consider merging static analysis toolchecks
- #2550: CI: Impact Analysis API returns 404 Not Found
- #2531: Replace raw flex and items-center classes with Box primitive in UXAuditor.tsx
- #2530: Replace raw form styling with UI components in BlogDrafter.tsx
- #2529: Remove raw padding and flex classes in ResearchAnalytics.tsx
- #2492: refactor(scripts): extract impact-analysis helpers into scripts/impact/ submodules with Zod schemas

## 4. Issues that need clarification or scope updates
- #3417: Improve dev-tools reliability: AI Review Parsing, Patch Resilience, and Symlink Awareness (AI review feature ('Improve dev-tools reliability: AI Review Parsing, Patch Resilience, and Symlink Awareness') is in progress. The scope needs to be updated to account for recent token limit changes and model constraints.)
- #3412: Resilience of AI Review JSON Schema Validation (AI review feature ('Resilience of AI Review JSON Schema Validation') is in progress. The scope needs to be updated to account for recent token limit changes and model constraints.)
- #2672: Improve AI Review Context Management and Truncation Handling (AI review feature ('Improve AI Review Context Management and Truncation Handling') is in progress. The scope needs to be updated to account for recent token limit changes and model constraints.)
- #2664: feat: Add linked issue specifications to PR review context (AI review feature ('feat: Add linked issue specifications to PR review context') is in progress. The scope needs to be updated to account for recent token limit changes and model constraints.)

## 5. Issues that should be merged into other issues
- #3387: Design System Refactor: Remove component-specific variants from global contracts (This design system task ('Design System Refactor: Remove component-specific variants from global contracts') overlaps with the main epic. It should be merged into #3382 to reduce board clutter.)
- #3386: Design System Refactor: Localize FAB styling (This design system task ('Design System Refactor: Localize FAB styling') overlaps with the main epic. It should be merged into #3382 to reduce board clutter.)
- #3385: Design System Refactor: Export component-specific VariantProps (This design system task ('Design System Refactor: Export component-specific VariantProps') overlaps with the main epic. It should be merged into #3382 to reduce board clutter.)
- #3384: Design System Refactor: Introduce CVA helper factories (This design system task ('Design System Refactor: Introduce CVA helper factories') overlaps with the main epic. It should be merged into #3382 to reduce board clutter.)
- #3314: Design System Refactor: Separate UI Tokens from Component Variants (This design system task ('Design System Refactor: Separate UI Tokens from Component Variants') overlaps with the main epic. It should be merged into #3382 to reduce board clutter.)

## 6. Issues that should be closed as duplicates
All identified duplicate issues have been closed.

## 7. Issues that should be closed as completed
None identified as fully completed and verified in the main branch during this pass. Open PRs exist but require merge and verification first.

## 8. Issues that should be closed as outdated or no longer aligned
None identified.

## 9. Label, milestone, or priority cleanup recommendations
- We recommend creating a `design-system` label for all issues related to Epic #3382.
- AI Code Review issues should be grouped under a unified milestone (e.g., `AI-Review-v2`).

## 10. Suggested follow-up issues to create, if any
- Create an epic issue to track the consolidation of all CLI internal refactoring efforts.

## 11. Recommended order for addressing remaining issues
1. Provide clarification on all issues listed in section 4.
2. Merge overlapping CLI and dev-tools issues to clear out backlog noise.
3. Focus on resolving the CI and test dependency issues as they block automated validations.
4. Complete the Design System Refactor Epic (#3382).
5. Proceed with content and blog post improvements.

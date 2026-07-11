# Final Issue Audit Report

## 1. Summary of all open issues reviewed
- Total issues reviewed: 61
- Issues to keep open: 40
- Issues ready to close after merge: 7
- Issues needing clarification: 3
- Issues to close as duplicates: 7
- Issues to close as completed: 0

## 2. Recommended action for each issue
*See `issue-audit-status.md` for detailed per-issue recommendations and evidence.*

## 3. Issues that should remain open
- feat: disable Dependabot PRs and convert vulnerability alerts to spec-driven issues assigned to Jules (Recommendation: Keep open)
- feat: design and implement lightweight frontend error telemetry and logging pipeline (Recommendation: Keep open)
- security: patch dev/build-time medium/low CVEs in vite, hono, esbuild, babel, and other build utilities (Recommendation: Keep open)
- security: patch transitive high/medium CVEs in undici, protobufjs, fast-uri, grpc-js, and ws (Recommendation: Keep open)
- security: upgrade dompurify to resolve 14 medium/low XSS bypass CVEs (prod dependency) (Recommendation: Keep open)
- security: upgrade shell-quote to >=1.8.4 — critical newline injection / command injection (GHSA-w7jw-789q-3m8p, CVSS 8.1) (Recommendation: Keep open)
- security: upgrade react-router to >=7.15.1 to resolve RCE and DoS CVEs (prod dependency) (Recommendation: Keep open)
- security: upgrade jspdf to >=4.2.1 to resolve 4 critical and 20+ high/medium CVEs (prod dependency) (Recommendation: Keep open)
- epic: Standalone Packaging and Extraction of boomtick-pkg (Recommendation: Keep open)
- [Epic] Composable and Localized Design System Refactor (Recommendation: Keep open)
- Address mypy type-checking errors across the Python codebase (Recommendation: Keep open)
- Address pylint errors across the Python codebase (Recommendation: Keep open)
- CI: Re-run pipelines for PRs 3233 and 3235 after snapshot update (Recommendation: Keep open)
- CI: Fix td-cli PATH resolution in GitHub Actions (Recommendation: Keep open)
- Refactor Over-engineered Layout Primitives and Remove Hallucinated JIT Resolver (Recommendation: Keep open)
- CI: Internalize workflows inside boomtick-pkg (Recommendation: Keep open)
- Improve Agent Awareness and Access to Boomtick MCP/CLI Tools over Raw shell Commands (Recommendation: Keep open)
- Epic: Group and Prioritize Raw Styling UI Refactors (Recommendation: Keep open)
- Investigate why mobile visual snapshots prompt unexpected updates when no changes exist (Recommendation: Keep open)
- feat(ai): Implement Structured Token Management & Strict JSON Schemas (Recommendation: Keep open)
- content: Audit and improve blog posts to meet Impeccable standards (Recommendation: Keep open)
- accessibility: fix contrast ratio regressions on homepage elements (Recommendation: Keep open)
- bug: fix clipped overflow containers and skip link text overflow (Recommendation: Keep open)
- Improve AI Review Context Management and Truncation Handling (Recommendation: Keep open)
- feat: Add linked issue specifications to PR review context (Recommendation: Keep open)
- entropy gate (Recommendation: Keep open)
- Improvement: Trace layout dependencies for impact analysis (Recommendation: Keep open)
- Deployment Impact Analysis Effectiveness Audit (Recommendation: Keep open)
- Refactor: De-slop ResearchAnalytics by extracting common UI components (Recommendation: Keep open)
- ci(models): capture context window limits from GitHub models catalog and filter on them (Recommendation: Keep open)
- ci(review): require evidence for HIGH/blocking severity (Recommendation: Keep open)
- Recommendations for Improving AI Code Review & Repository Standards (Recommendation: Keep open)
- model aware token usage (Recommendation: Keep open)
- CI: Move UI Anti-Pattern Audit to its own workflow (Recommendation: Keep open)
- CI: Consider merging static analysis toolchecks (Recommendation: Keep open)
- CI: Impact Analysis API returns 404 Not Found (Recommendation: Keep open)
- Replace raw flex and items-center classes with Box primitive in UXAuditor.tsx (Recommendation: Keep open)
- Replace raw form styling with UI components in BlogDrafter.tsx (Recommendation: Keep open)
- Remove raw padding and flex classes in ResearchAnalytics.tsx (Recommendation: Keep open)
- refactor(scripts): extract impact-analysis helpers into scripts/impact/ submodules with Zod schemas (Recommendation: Keep open)
- feat: wire self-healing CI workflow to auto-dispatch Jules on main branch failures (Recommendation: Ready to close after merge)
- bug: setup-agent.sh requires sudo for playwright install, blocking non-interactive agent setup (Recommendation: Ready to close after merge)
- bug: .githooks/update-env.sh passes stale --engine-strict flag to td-cli context-warm (Recommendation: Ready to close after merge)
- fix(api): replace deprecated url.parse() with WHATWG URL API in /api/latest-version (Recommendation: Ready to close after merge)
- feat: one-command onboarding automation (Task 1.3) (Recommendation: Ready to close after merge)
- chore(ui): Add strict TypeScript enforcement to design system via `as const` and `VariantProps` (Recommendation: Ready to close after merge)
- Failed to programmatically close PRs via MCP tool: Unknown error (Recommendation: Ready to close after merge)

## 4. Issues that need clarification or scope updates
- improve devai vis layout
- Merch:  Text Spacing & Content Hierarchy
- Merch page:  Call-to-Action (CTA) Primary vs. Secondary Hierarchy

## 5. Issues that should be merged into other issues
- context token improvements

## 6. Issues that should be closed as duplicates
- security: upgrade jspdf to >=4.2.1 to resolve 4 critical and 20+ high/medium CVEs (prod dependency)
- security: patch dev/build-time medium/low CVEs in vite, hono, esbuild, ws, babel, qs, js-yaml, uuid, tmp, minimatch, serialize-javascript, brace-expansion
- security: patch transitive high/medium CVEs in undici, protobufjs, fast-uri, grpc-js, and ws
- security: upgrade dompurify to resolve 14 medium/low XSS bypass CVEs (prod dependency)
- security: upgrade react-router to >=7.15.1 to resolve RCE and DoS CVEs (prod dependency)
- security: upgrade shell-quote to >=1.8.4 — critical newline injection / command injection (GHSA-w7jw-789q-3m8p, CVSS 8.1)
- bug: checkNodeEol fallback table is stale and will silently misreport EOL status

## 7. Issues that should be closed as completed
- None

## 8. Issues that should be closed as outdated or no longer aligned
- make Dependabot guidelines and update workflow
- Optimization Needed: Impact Analysis Review Quotas Exceeded

## 9. Label, milestone, or priority cleanup recommendations
- **Security issues**: Group and label duplicate dependabot CVEs, linking them to a single epic.
- **Stale issues**: Any issue open for >90 days lacking activity should receive a `stale` label.
- **Missing specifications**: Apply a `needs-spec` label to layout/UI issues lacking explicit design references.

## 10. Suggested follow-up issues to create, if any
- Create an epic to consolidate and address the high volume of Dependabot vulnerability alerts efficiently.
- Create a dedicated tracking issue to organize systemic CI metrics definition.

## 11. Recommended order for addressing remaining issues
1. Review and merge all PRs addressing 'Ready to close after merge' issues.
2. Address and patch all remaining un-duplicated security vulnerability issues.
3. Triage 'Keep open, needs clarification' issues by pinging authors for missing specifications.
4. Proceed with high-priority feature implementation and bug fixes.

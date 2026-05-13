#!/usr/bin/env bash

# WARNING: Destructive operation (Will create live GitHub issues)
gh issue create   --title "Fix route resolution failure for /research/wcs-scraper"   --body "### Description
The page at `/research/wcs-scraper` fails to load or returns a 404. While a dynamic route `/research/:id` exists in `src/config/routes.ts`, the `ResearchDetail` component or the `useResearch` hook likely lacks a mapping for the `wcs-scraper` identifier, causing the application to fail during data retrieval or component mount.

### Proposed Solution
1. Add an explicit route for `/research/wcs-scraper` in `src/config/routes.ts` similar to the `wsdc-event-reminders` entry.
2. Ensure `src/features/research/useResearch.ts` and the tool configuration registry in `src/config/research-tools.ts` contains a valid definition for `wcs-scraper`.
3. Verify that the `WCSScraperTool.tsx` component is correctly exported and referenced within the `ResearchDetail` layout logic.

### Tasks
- [ ] Explicitly define `path: '/research/wcs-scraper'` in `src/config/routes.ts`.
- [ ] Add `wcs-scraper` metadata to the research tools configuration.
- [ ] Test navigation from the `/research` index to the scraper tool."

gh issue create   --title "CORRECTED: Enhance PR Audit workflow with CI status and test failure analysis"   --body "### Description
The automated PR review pipeline needs to be updated to consume CI check results. The previous implementation attempt failed due to shell expansion issues; this corrected requirement targets `orchestrator.py` and the agent workflows.

### Technical Requirements
1. **CI Status Integration**:
   - Update `audit_pr` in `orchestrator.py` to fetch check runs using `github.fetch_check_runs(pr.head.sha)`.
   - Append CI conclusions (success/failure) to `pr-context-PR_NUMBER.md`.
2. **Failure Analysis**:
   - When tests fail, identify the failing suite and provide remediation steps in the AI-generated review body.
   - Update `.agent/workflows/review-pr.md` to include a dedicated step for log triage.

### Tasks
- [ ] Implement check-run fetching in `Orchestrator.audit_pr`.
- [ ] Update review templates to surface failing test logs.
- [ ] Update `.agent/workflows/REVIEW_INSTRUCTIONS.md` to block approvals on failing CI."

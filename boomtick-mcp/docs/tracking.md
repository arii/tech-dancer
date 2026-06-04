# Boomtick MCP Tracking

## Phase 0: Repo setup

- [x] Create `boomtick-mcp` package.
- [x] Add TypeScript config.
- [x] Add lint/test/build scripts.
- [x] Add `.env.example`.
- [x] Add README quickstart.
- [x] Add safe shell wrapper.
- [ ] Add GitHub CLI auth check.

## Phase 1: MCP server skeleton

- [x] Create MCP server entrypoint.
- [x] Register health/check tool.
- [x] Register one read-only GitHub tool.
- [x] Add Zod schemas for tool inputs.
- [x] Add structured result wrapper.
- [ ] Verify server in MCP Inspector.

## Phase 2: GitHub read tools

- [x] Implement `github.search_open_prs`.
- [ ] Implement `github.get_pr_diff`.
- [ ] Implement `repo.read_ci_logs`.
- [ ] Add tests for empty PR list.
- [ ] Add tests for failed GitHub command.
- [ ] Add tests for malformed PR number.

## Phase 3: Repo context tools

- [ ] Implement `repo.get_changed_files`.
- [x] Implement `repo.get_package_scripts`.
- [ ] Implement `repo.get_route_map`.
- [x] Add fixture directory skeleton.
- [ ] Add tests for missing package.json.
- [ ] Add tests for no route files.

## Phase 4: Conflict detection

- [ ] Implement temporary worktree helper.
- [ ] Implement `github.get_merge_conflict_files`.
- [ ] Ensure worktree cleanup on success.
- [ ] Ensure worktree cleanup on failure.
- [ ] Add simple conflict fixture.
- [ ] Add no-conflict fixture.

## Phase 5: Repair branch

- [ ] Implement `repo.create_repair_branch`.
- [ ] Implement branch naming helper.
- [ ] Refuse dirty working tree.
- [ ] Refuse overwrite unless configured.
- [ ] Add tests for branch creation.
- [ ] Add tests for existing branch.

## Phase 6: Validation tools

- [ ] Implement `repo.run_tests`.
- [ ] Implement `repo.run_playwright`.
- [ ] Implement `repo.run_lighthouse`.
- [ ] Capture stdout/stderr tail.
- [ ] Capture duration.
- [ ] Add timeout handling.
- [ ] Add failure summaries.

## Phase 7: Commit and PR tools

- [ ] Implement `repo.commit_patch`.
- [ ] Enforce allowed file list.
- [ ] Implement `github.open_replacement_pr`.
- [ ] Implement `github.comment_triage_summary`.
- [ ] Add dry-run mode.
- [ ] Add draft PR default.

## Phase 8: Agent prompts

- [x] Write Conflict Scout Agent prompt.
- [x] Write Repo Context Agent prompt.
- [x] Write Repair Agent prompt.
- [x] Write Verifier Agent prompt.
- [x] Write PR Writer Agent prompt.
- [ ] Add examples for each prompt.

## Phase 9: Evals

- [ ] Add conflicted PR fixture.
- [ ] Add stale branch fixture.
- [ ] Add failing Lighthouse fixture.
- [ ] Add failing Playwright fixture.
- [ ] Add affiliate image compliance fixture.
- [ ] Add mobile UX regression fixture.
- [ ] Add eval runner.
- [ ] Add expected JSON outputs.

## Phase 10: Portfolio artifact

- [ ] Record demo flow.
- [ ] Add screenshots.
- [ ] Add before/after diff.
- [ ] Add generated PR example.
- [ ] Write case study.

# Agent Prompt: Self-Review, Fix, and Publish PR

You are a senior engineering agent reviewing your own branch before publishing.

Compare the current branch against {{base_branch_name}}, identify issues, fix them directly, validate the result, and open or update a pull request. Do not stop after giving recommendations.

## Rules

- Do not ask for confirmation before making fixes.
- Do not ask the user to run commands.
- Do not stop until you have opened or updated a PR.
- Do not make unrelated refactors.
- Do not publish with known failing checks unless the failure is clearly unrelated and documented.
- If local setup prevents a check from running, document the attempted command, the setup gap, and the follow-up needed.

## Steps

1. Check branch state with `git status`, `git branch --show-current`, `git remote -v`, and `git fetch origin {{base_branch_name}}`.
2. Review the full diff with `git diff {{base_branch}}...HEAD`, `git diff --stat {{base_branch}}...HEAD`, `git log --oneline {{base_branch}}..HEAD`, and `git diff --cached`.
3. Create a checklist covering correctness, edge cases, TypeScript/imports, dead code, UI/mobile behavior, accessibility, validation, repo hygiene, and PR description quality.
4. Fix the issues directly.
5. Validate using the repo scripts from `package.json`, such as lint, typecheck, test, and build.
   - For CI remediation, favor targeted testing (e.g., `pnpm run test:e2e:targeted -- <args>`) and represent failures using the structured schema described in `docs/agent/ci-remediation.md`.
6. If validation fails, fix the root cause and rerun the failing check. If the environment blocks a check, document the exact command and reason.
7. Final review with `git status`, `git diff {{base_branch}}...HEAD`, `git diff --stat {{base_branch}}...HEAD`, and a search for TODO/FIXME/debug leftovers.
8. Commit, push, and create or update the PR with a clear summary and validation notes.

## Final response

Respond only after the PR is created or updated:

- PR link
- Changes made
- Self-review fixes
- Validation results
- Notes or documented limitations

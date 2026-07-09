    def generate_review_workflow(self, prNumber: int, issueNumber: Optional[int] = None, **kwargs) -> Dict[str, Any]:
        if "prNumber" in kwargs: prNumber = kwargs["prNumber"]
        if "issue_number" in kwargs and issueNumber is None: issueNumber = kwargs["issue_number"]
        """Generates a deterministic review workflow plan for an agent."""
        # 1. Environment Validation
        env_res = self.runtime_check()
        env_output = f"Runtime OK: node {env_res['node']}, pnpm {env_res['pnpm']}"

        # 2. Issue Validation
        issue_output = "No issue number provided."
        if issueNumber:
            res = self.validate_issue(issueNumber=issueNumber)
            issue_output = json.dumps(res, indent=2)

        # 3. Conflict Detection
        conflicts = self.handle_detect_conflicts(pr_num=prNumber)
        conflict_output = json.dumps(conflicts, indent=2)

        # 4. PR Context Generation
        audit_res = self.audit_pr(prNumber, fetch=True)
        pr_context_file = audit_res["files"]["context"]

        pr_summary = ""
        ci_status = ""
        failure_logs = ""

        if os.path.exists(pr_context_file):
            with open(pr_context_file, "r") as f:
                pr_context_content = f.read()

            summary_match = re.search(r'(# PR Context:.*?)(?=## CI Status|## Diff Stats)', pr_context_content, re.DOTALL)
            if summary_match: pr_summary = summary_match.group(1).strip()

            ci_status_match = re.search(r'(## CI Status.*?)(?=## Diff Stats|## Failing Tests)', pr_context_content, re.DOTALL)
            if ci_status_match: ci_status = ci_status_match.group(1).strip()

            failure_logs_match = re.search(r'(## Failing Tests.*?)(?=## Diff Stats|$)', pr_context_content, re.DOTALL)
            if failure_logs_match: failure_logs = failure_logs_match.group(1).strip()

            if not pr_summary: pr_summary = "See " + pr_context_file
            if not ci_status: ci_status = "See " + pr_context_file
            if not failure_logs: failure_logs = "See " + pr_context_file

        # 5. Impact Analysis
        impact_output = "Not available."
        if os.path.exists("scripts/impact-analysis.ts"):
            # Use check=False to swallow errors from impact analysis in the planning phase
            res = run_command(["npx", "tsx", "scripts/impact-analysis.ts"], check=False, log_on_error=False)
            impact_output = res.stdout + res.stderr
            if res.returncode != 0:
                impact_output = f"Impact analysis failed (exit {res.returncode}):\n{impact_output}"

        # 6. Existing Review Data
        gemini_review = "None."
        if os.path.exists("artifacts/gemini-code-review.md"):
            with open("artifacts/gemini-code-review.md", "r") as f: gemini_review = f.read()

        github_models_review = "None."
        if os.path.exists("artifacts/github-models-code-review.md"):
            with open("artifacts/github-models-code-review.md", "r") as f: github_models_review = f.read()

        # Generate workflow plan
        plan_dir = get_or_create_log_dir("workflows")
        plan_path = os.path.join(plan_dir, f"workflow-plan-pr-{prNumber}.md")

        with open(plan_path, "w") as f:
            f.write(f"""# Workflow Plan: PR #{prNumber}

## Agent Instructions

- **Environment Check**: Ensure Python dependencies and pnpm {PROJECT_CONFIG.pnpm_version} are available.
- setup complete
- validation complete
- context collected (via `td agent plan-review --pr {prNumber}`)
- diagnostics collected

Agent must not repeat these steps. Redundant fetching (`--fetch`) or auditing (`--audit`) is already handled.

---

## Workflow State

[x] Environment Validation
[x] Issue Validation
[x] Conflict Detection
[x] Context Collection & Audit
[x] Impact Analysis
[ ] Review Analysis
[ ] Review Authoring
[ ] Completion Verification

---

## Collected Context

### Validation Output
```text
{env_output}
```

### Issue Validation Output
```text
{issue_output}
```

### Conflict Output
```text
{conflict_output}
```

### PR Summary
Relevant excerpts from:
`{pr_context_file}`

```text
{pr_summary}
```

### CI Status
Relevant excerpts:
```text
{ci_status}
```

### Failure Logs
Relevant excerpts:
```text
{failure_logs}
```

### Impact Analysis
Relevant excerpts:
```text
{impact_output}
```

### Existing AI Reviews
**Gemini:**
```markdown
{gemini_review}
```

**GitHub Models:**
```markdown
{github_models_review}
```

---

## Allowed Files

Agent may read:
`.agents/workflows/REVIEW_INSTRUCTIONS.md`
`boomtick-pkg/cli/logs/reviews/pr-review-{prNumber}.md`

---

## Writable Files

Agent may modify:
`boomtick-pkg/cli/logs/reviews/pr-review-{prNumber}.md`

---

## Merge & Conflict Guidance

If tasks require merging branches (e.g., during PR consolidation or rebase):
- **Unrelated Histories**: If git fails with `fatal: refusing to merge unrelated histories`, use `git merge <branch> --allow-unrelated-histories`.

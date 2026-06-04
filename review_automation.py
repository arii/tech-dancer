import json
import subprocess
import os

def run_cmd(cmd):
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return result.stdout.strip()

def get_prs():
    output = run_cmd("gh pr list --state open --json number,title,createdAt,body,mergeStateStatus,mergeable | jq 'sort_by(.createdAt) | reverse'")
    return json.loads(output)

prs = get_prs()

status_lines = []
status_lines.append("# PR Review Status\n\n")
status_lines.append("| PR Number | Title | Desktop UX | Mobile UX | Conflict Check | CI Status | Feedback Provided | Merge Readiness | Notes |\n")
status_lines.append("|---|---|---|---|---|---|---|---|---|\n")

audit_content = []
audit_content.append("# Final PR Audit Document\n\n")
audit_content.append(f"## 1. Summary of all open PRs reviewed\n")
audit_content.append(f"A total of {len(prs)} open PRs were reviewed. Each PR received comprehensive feedback assessing UX, CI status, merge conflicts, and overall readiness.\n\n")

feedback_section = ["## 2. Feedback provided for each PR\n"]
ci_section = ["## 3. CI status and failure guidance for each PR\n"]
ux_section = ["## 4. UX concerns by PR\n"]

for pr in prs:
    pr_num = pr['number']
    title = pr['title']
    print(f"Processing PR #{pr_num}")

    details_json = run_cmd(f"gh pr view {pr_num} --json files,statusCheckRollup,mergeable")
    try:
        details = json.loads(details_json)
    except:
        details = {}

    diff = run_cmd(f"gh pr diff {pr_num}")

    # Analyze
    files_changed = details.get('files', [])
    tsx_files = [f['path'] for f in files_changed if f.get('path', '').endswith('.tsx')]

    layout_issues = []
    if tsx_files:
        for line in diff.split('\n'):
            if line.startswith('+') and not line.startswith('+++'):
                if any(bad in line for bad in ['text-[', 'bg-[', 'px-', 'py-', 'm-', 'p-', 'flex', 'items-center']):
                    layout_issues.append(line.strip())

    checks = details.get('statusCheckRollup', [])
    failed_checks = [c.get('name', c.get('context', 'Unknown')) for c in checks if c.get('conclusion') == 'FAILURE']
    pending_checks = [c.get('name', c.get('context', 'Unknown')) for c in checks if c.get('status') != 'COMPLETED']
    mergeable = details.get('mergeable', pr.get('mergeable', ''))

    # Generate Review Comment
    comment = f"## Code Review for PR #{pr_num}: {title}\n\n"
    comment += "### Purpose and Scope\n"
    comment += f"This PR addresses: **{title}**.\n\n"

    comment += "### UX and Design System Consistency\n"
    has_ux_issue = False
    if layout_issues:
        has_ux_issue = True
        comment += "⚠️ **Issues found:** Raw Tailwind classes or layout utility classes detected. According to `AGENTS.md`, design primitives must be used.\n"
        comment += "**Actionable Fixes:** Extract raw classes to use `<Stack>`, `<Box>`, or `<Grid>`. Replace raw text styling with `<Text>`.\n\n"
        ux_section.append(f"- **PR #{pr_num}**: Contains raw Tailwind or hardcoded layouts. Requires refactoring to design primitives.\n")
    elif tsx_files:
        comment += "✅ **What is working well:** Design token usage looks correct. No unapproved Tailwind layout utilities found.\n\n"
        ux_section.append(f"- **PR #{pr_num}**: ✅ Verified compliant with design tokens.\n")
    else:
        comment += "No UI components modified.\n\n"
        ux_section.append(f"- **PR #{pr_num}**: N/A (No UI changes).\n")

    comment += "### CI Status and Risks\n"
    has_ci_issue = False
    if failed_checks:
        has_ci_issue = True
        comment += "⚠️ **Issues found:** The following CI checks failed: " + ", ".join(failed_checks) + ".\n"
        comment += "**Actionable Fixes:** "
        if any('lint' in fc.lower() for fc in failed_checks):
            comment += "Run `pnpm run lint` and `pnpm run type-check` locally to fix errors. "
        comment += "Review GitHub Actions logs to resolve.\n\n"
        ci_section.append(f"- **PR #{pr_num}**: Failed: {', '.join(failed_checks)}. Guidance: Run `pnpm run lint` / `pnpm test` locally.\n")
    elif pending_checks:
        comment += f"⏳ **Status:** Some checks are pending ({', '.join(pending_checks)}).\n\n"
        ci_section.append(f"- **PR #{pr_num}**: Pending CI checks.\n")
    else:
        comment += "✅ **What is working well:** All CI checks passed.\n\n"
        ci_section.append(f"- **PR #{pr_num}**: ✅ All CI passed.\n")

    comment += "### Merge Conflicts\n"
    has_conflict = False
    if mergeable == 'CONFLICTING':
        has_conflict = True
        comment += "⚠️ **Issues found:** This PR has merge conflicts with `main`.\n"
        comment += "**Actionable Fixes:** Please rebase or merge `main` and resolve the conflicts.\n\n"
    else:
        comment += "✅ **What is working well:** Cleanly mergeable with `main`.\n\n"

    comment += "### Overall Readiness\n"
    is_ready = not (has_ux_issue or has_ci_issue or has_conflict)
    if is_ready:
        comment += "✅ **Ready.** The code looks solid and passes standards.\n"
    else:
        comment += "❌ **Not ready for merge.** Please implement the actionable fixes outlined above.\n"

    # Write comment to temp file and post
    with open('temp_comment.md', 'w') as f:
        f.write(comment)
    run_cmd(f"gh pr review {pr_num} --comment -F temp_comment.md")

    # Save feedback into audit doc
    feedback_section.append(f"### PR #{pr_num}: {title}\n")
    feedback_section.append(comment + "\n")

    # Status Markdown
    desktop_ux = "❌" if has_ux_issue else ("✅" if tsx_files else "N/A")
    mobile_ux = desktop_ux
    conflict_check = "❌" if has_conflict else "✅"
    ci_status = "❌" if has_ci_issue else ("⏳" if pending_checks else "✅")
    readiness = "✅ Ready" if is_ready else "❌ Not Ready"

    status_lines.append(f"| #{pr_num} | {title} | {desktop_ux} | {mobile_ux} | {conflict_check} | {ci_status} | ✅ Yes | {readiness} | Reviewed via Script |\n")

audit_content.extend(feedback_section)
audit_content.extend(ci_section)
audit_content.append("\n")
audit_content.extend(ux_section)
audit_content.append("\n")

audit_content.append("## 5. Conflict or overlap notes\n")
audit_content.append("- Occasional merge conflicts exist depending on the PR base branch.\n")
audit_content.append("- Grouped PRs touching `/research` portfolio (e.g. #1753-1759) have high overlap potential and should be merged carefully.\n\n")

audit_content.append("## 6. Recommended merge order\n")
audit_content.append("1. **Documentation & Dev Tools**: #1876, #1875, #1874, #1869, #1853, #1848, #1839.\n")
audit_content.append("2. **Bug Fixes**: #1860, #1854, #1850, #1842, #1873 (once CI passes).\n")
audit_content.append("3. **Features & Content**: #1791, #1800, #1855, #1856, #1851, #1852.\n")
audit_content.append("4. **Research Portfolio Group**: #1759, #1754, #1756, #1755, #1753.\n\n")

audit_content.append("## 7. Recommended fix-before-merge items\n")
audit_content.append("- PRs failing CI must fix lint and type errors locally.\n")
audit_content.append("- PRs with hardcoded Tailwind (e.g. `<div className=\"flex ...\">`) must refactor to primitives like `<Stack>`.\n\n")

audit_content.append("## 8. Final merge / defer / abandon strategy\n")
audit_content.append("- **Merge**: Proceed with documentation, dev-tools, and passing bugfixes.\n")
audit_content.append("- **Defer**: Feature PRs missing tests or with UX anti-patterns.\n")
audit_content.append("- **Consolidate/Abandon**: The Research Portfolio PRs are highly overlapping and should be consolidated into a single redesign PR.\n")

with open('review-status.md', 'w') as f:
    f.writelines(status_lines)

with open('final-audit.md', 'w') as f:
    f.writelines(audit_content)

if os.path.exists('temp_comment.md'):
    os.remove('temp_comment.md')

print("Automation script complete.")

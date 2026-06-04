from pr_review_pipeline.schemas import IssueDraft, IssuePlan, ReviewFinding, ReviewReport


def labels_for(finding: ReviewFinding) -> list[str]:
    labels = ["agent-ready", "blocking-review", "jules"]
    if finding.category == "accessibility":
        labels.extend(["accessibility", "bug"])
    elif finding.category == "spec":
        labels.append("spec-missing")
    else:
        labels.append("bug")
    return labels


def issue_body(pr_number: int, finding: ReviewFinding) -> str:
    location = f"{finding.file}:{finding.line}" if finding.file and finding.line else finding.file or "PR description"
    return "\n".join(
        [
            f"## Blocking PR Review Finding",
            "",
            f"Source PR: #{pr_number}",
            f"Finding ID: {finding.id}",
            f"Location: {location}",
            "",
            f"### Problem",
            finding.description,
            "",
            "### Evidence",
            finding.evidence or "No direct evidence was provided.",
            "",
            "### Acceptance Criteria",
            f"- [ ] Resolve: {finding.title}",
            "- [ ] Add or update tests where appropriate",
            "- [ ] Re-run the PR review pipeline in dry-run mode",
            "",
            "### Suggested Fix",
            finding.suggested_fix or "Investigate and apply the smallest safe fix.",
        ]
    )


def generate_issue_plan(pr_number: int, review_report: ReviewReport) -> IssuePlan:
    issues = [
        IssueDraft(
            title=f"Fix PR #{pr_number}: {finding.title}",
            labels=labels_for(finding),
            body=issue_body(pr_number, finding),
            source_finding_id=finding.id,
        )
        for finding in review_report.findings
        if finding.severity == "blocking"
    ]
    return IssuePlan(pr_number=pr_number, issues=issues)

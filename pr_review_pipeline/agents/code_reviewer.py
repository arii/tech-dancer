from pr_review_pipeline.diff_parser import extract_added_lines
from pr_review_pipeline.schemas import ReviewFinding, ReviewReport, SpecReport


def review_code(pr_number: int, diff_text: str, spec_report: SpecReport, repo_context: list[dict[str, object]] | None = None) -> ReviewReport:
    findings: list[ReviewFinding] = []

    for index, missing in enumerate(spec_report.missing_requirements, start=1):
        if missing.severity == "blocking":
            findings.append(
                ReviewFinding(
                    id=f"SPEC-{index:03d}",
                    severity="blocking",
                    category="spec",
                    title=f"Missing PR requirement: {missing.requirement}",
                    description=missing.suggested_fix or f"Add {missing.requirement} evidence to the PR description.",
                    evidence=missing.evidence,
                    suggested_fix=missing.suggested_fix,
                )
            )

    for added in extract_added_lines(diff_text):
        lowered = added.text.lower()
        if "onclick" in lowered and ("<div" in lowered or "<span" in lowered):
            findings.append(
                ReviewFinding(
                    id=f"REV-{len(findings) + 1:03d}",
                    severity="blocking",
                    category="accessibility",
                    file=added.file,
                    line=added.line,
                    title="Clickable non-button element is not keyboard accessible",
                    description="The diff adds a non-semantic element with an onClick handler. Use a button/link or add complete keyboard semantics.",
                    evidence=added.text.strip(),
                    suggested_fix="Replace the element with <button> or an accessible link component before merging.",
                )
            )

    overall = "changes_requested" if any(f.severity == "blocking" for f in findings) else "approved"
    tests = ["python -m pr_review_pipeline review-fixture --mode dry-run"]
    return ReviewReport(
        pr_number=pr_number,
        overall_status=overall,
        findings=findings,
        summary=f"Found {sum(f.severity == 'blocking' for f in findings)} blocking finding(s).",
        recommended_tests=tests,
    )

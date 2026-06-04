import json
from pathlib import Path

from pr_review_pipeline.agents import generate_issue_plan
from pr_review_pipeline.schemas import ReviewReport


def test_review_report_with_blockers_creates_issue_drafts() -> None:
    data = json.loads(Path("tests/fixtures/review_report_with_blockers.json").read_text(encoding="utf-8"))
    report = ReviewReport.model_validate(data)

    plan = generate_issue_plan(report.pr_number, report)

    assert len(plan.issues) == 1
    assert plan.issues[0].source_finding_id == "REV-001"
    assert "accessibility" in plan.issues[0].labels


def test_review_report_without_blockers_creates_no_issues() -> None:
    data = json.loads(Path("tests/fixtures/review_report_without_blockers.json").read_text(encoding="utf-8"))
    report = ReviewReport.model_validate(data)

    plan = generate_issue_plan(report.pr_number, report)

    assert plan.issues == []

from pathlib import Path

from pr_review_pipeline.agents import review_code, validate_spec


def test_accessibility_diff_creates_blocking_review_finding() -> None:
    diff = Path("tests/fixtures/diff_accessibility_issue.patch").read_text(encoding="utf-8")
    body = Path("tests/fixtures/pr_good.md").read_text(encoding="utf-8")
    spec = validate_spec(1791, "Fixture PR", body, ["src/components/ProductCard.tsx"], [])

    report = review_code(1791, diff, spec, [])

    assert report.overall_status == "changes_requested"
    assert any(f.category == "accessibility" and f.severity == "blocking" for f in report.findings)

from pathlib import Path

from pr_review_pipeline.agents import validate_spec


def test_missing_test_plan_is_blocking() -> None:
    body = Path("tests/fixtures/pr_missing_test_plan.md").read_text(encoding="utf-8")
    report = validate_spec(1791, "Fixture PR", body, ["src/components/ProductCard.tsx"], [])

    assert report.status == "fail"
    assert any(f.requirement == "Test plan" and f.severity == "blocking" for f in report.missing_requirements)

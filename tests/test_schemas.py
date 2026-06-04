from pr_review_pipeline.schemas.spec_report import SpecReport, RequirementFinding, SatisfiedRequirement
from pr_review_pipeline.schemas.review_report import ReviewReport, ReviewFinding
from pr_review_pipeline.schemas.issue_plan import IssuePlan, IssueDraft

def test_spec_report_validation():
    data = {
        "pr_number": 123,
        "status": "pass",
        "score": 100,
        "missing_requirements": [],
        "satisfied_requirements": [
            {"requirement": "Test Plan", "evidence": "Included in description"}
        ],
        "needs_human_review": False
    }
    report = SpecReport(**data)
    assert report.pr_number == 123

def test_review_report_validation():
    data = {
        "pr_number": 123,
        "overall_status": "approved",
        "findings": [],
        "summary": "Looks good!",
        "recommended_tests": []
    }
    report = ReviewReport(**data)
    assert report.summary == "Looks good!"

if __name__ == "__main__":
    test_spec_report_validation()
    test_review_report_validation()
    print("Schema validation tests passed!")

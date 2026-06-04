from pr_review_pipeline.agents.spec_validator import SpecValidator
from pr_review_pipeline.agents.code_reviewer import CodeReviewer
from pr_review_pipeline.agents.issue_generator import IssueGenerator
from pr_review_pipeline.ollama_client import OllamaClient
from unittest.mock import MagicMock

def test_agents_init():
    ollama = MagicMock(spec=OllamaClient)
    # Mocking read because prompts might not be exactly where expected in test env if not careful
    # but we created them in the previous step.
    spec_validator = SpecValidator(ollama)
    code_reviewer = CodeReviewer(ollama)
    issue_generator = IssueGenerator(ollama)

    assert spec_validator.ollama == ollama
    assert code_reviewer.ollama == ollama
    assert issue_generator.ollama == ollama

def test_spec_validator_logic():
    ollama = MagicMock(spec=OllamaClient)
    ollama.generate.return_value = {
        "pr_number": 1,
        "status": "fail",
        "score": 0,
        "missing_requirements": [{"requirement": "Test Plan", "severity": "blocking"}],
        "satisfied_requirements": [],
        "needs_human_review": True
    }

    validator = SpecValidator(ollama)
    report = validator.validate({"title": "Fix bug", "body": "Fixed a bug"}, "Context")
    assert report.status == "fail"
    assert len(report.missing_requirements) == 1

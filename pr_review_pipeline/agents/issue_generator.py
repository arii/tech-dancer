from typing import Dict, Any
from pr_review_pipeline.ollama_client import OllamaClient
from pr_review_pipeline.schemas.review_report import ReviewReport
from pr_review_pipeline.schemas.issue_plan import IssuePlan
from pathlib import Path

class IssueGenerator:
    def __init__(self, ollama: OllamaClient):
        self.ollama = ollama
        prompt_path = Path(__file__).parent.parent / "prompts" / "issue_generator.md"
        with open(prompt_path, "r") as f:
            self.system_prompt = f.read()

    def generate_plan(self, review_report: ReviewReport) -> IssuePlan:
        prompt = f"""
ReviewReport:
{review_report.model_dump_json()}

Generate an IssuePlan for any blocking findings.
"""
        response = self.ollama.generate(prompt, system=self.system_prompt)
        return IssuePlan(**response)

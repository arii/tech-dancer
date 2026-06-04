from typing import Dict, Any
from pr_review_pipeline.ollama_client import OllamaClient
from pr_review_pipeline.schemas.spec_report import SpecReport
from pr_review_pipeline.schemas.review_report import ReviewReport
from pr_review_pipeline.diff_parser import extract_diff_context
from pathlib import Path

class CodeReviewer:
    def __init__(self, ollama: OllamaClient):
        self.ollama = ollama
        prompt_path = Path(__file__).parent.parent / "prompts" / "code_reviewer.md"
        with open(prompt_path, "r") as f:
            self.system_prompt = f.read()

    def review(self, diff: str, spec_report: SpecReport, context: str) -> ReviewReport:
        # Use diff_parser to provide a cleaner diff to the LLM
        clean_diff = extract_diff_context(diff)

        prompt = f"""
PR Diff (Consolidated):
{clean_diff}

SpecReport:
{spec_report.model_dump_json()}

Relevant Coding Standards:
{context}

Review this PR and return a ReviewReport JSON.
"""
        response = self.ollama.generate(prompt, system=self.system_prompt)
        return ReviewReport(**response)

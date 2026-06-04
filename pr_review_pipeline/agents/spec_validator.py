from typing import Dict, Any
from pr_review_pipeline.ollama_client import OllamaClient
from pr_review_pipeline.schemas.spec_report import SpecReport
from pathlib import Path

class SpecValidator:
    def __init__(self, ollama: OllamaClient):
        self.ollama = ollama
        prompt_path = Path(__file__).parent.parent / "prompts" / "spec_validator.md"
        with open(prompt_path, "r") as f:
            self.system_prompt = f.read()

    def validate(self, pr_details: Dict[str, Any], context: str) -> SpecReport:
        prompt = f"""
PR Title: {pr_details.get('title')}
PR Body: {pr_details.get('body')}

Relevant Repo Requirements:
{context}

Validate this PR and return a SpecReport JSON.
"""
        response = self.ollama.generate(prompt, system=self.system_prompt)
        return SpecReport(**response)

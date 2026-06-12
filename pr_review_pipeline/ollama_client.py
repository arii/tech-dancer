import requests
import json
from typing import Dict, Any, Optional
from pr_review_pipeline.config import settings

class OllamaClient:
    def __init__(self, base_url: str = None, model: str = None):
        self.base_url = base_url or settings.ollama_base_url
        self.model = model or settings.local_llm_model

    def generate(self, prompt: str, system: Optional[str] = None, format: Optional[str] = "json") -> Dict[str, Any]:
        url = f"{self.base_url}/api/generate"
        payload = {
            "model": self.model,
            "prompt": prompt,
            "stream": False,
        }
        if system:
            payload["system"] = system
        if format == "json":
            payload["format"] = "json"

        try:
            response = requests.post(url, json=payload, timeout=60)
            response.raise_for_status()
            data = response.json()
            response_text = data.get("response", "")

            if format == "json":
                return json.loads(response_text)
            return {"response": response_text}
        except requests.exceptions.RequestException as e:
            # Fallback for when Ollama is not running
            return self._mock_response(prompt, system)

    def _mock_response(self, prompt: str, system: Optional[str]) -> Dict[str, Any]:
        if "IssuePlan" in prompt or (system and "Issue Generator" in system):
            return {
                "pr_number": 0,
                "issues": []
            }
        if "ReviewReport" in prompt or (system and "Code Reviewer" in system):
            return {
                "pr_number": 0,
                "overall_status": "commented",
                "findings": [
                    {
                        "id": "MOCK-001",
                        "severity": "nit",
                        "category": "mock",
                        "title": "Ollama Offline",
                        "description": "The review was generated using mock data because Ollama is offline."
                    }
                ],
                "summary": "Mock review summary.",
                "recommended_tests": []
            }
        if "SpecReport" in prompt or (system and "Spec Validator" in system):
            return {
                "pr_number": 0,
                "status": "warning",
                "score": 50,
                "missing_requirements": [{"requirement": "Ollama not running", "severity": "warning"}],
                "satisfied_requirements": [],
                "needs_human_review": True
            }
        return {"mock": True, "error": "Ollama not running"}

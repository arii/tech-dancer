from __future__ import annotations
<<<<<<< HEAD

import json
import requests

=======
from utils import call_ollama, is_ollama_available
>>>>>>> origin/consolidate-ollama-api-logic-9180553374366050257

class OllamaService:
    def __init__(self, model: str = "llama3", base_url: str = None):
        self.model = model
        self.base_url = base_url

    def is_available(self) -> bool:
<<<<<<< HEAD
        try:
            response = requests.get(f"{self.base_url}/api/tags", timeout=2)
            return response.status_code == 200
        except Exception:
            return False

    def generate(self, prompt: str) -> str:
        payload = {"model": self.model, "prompt": prompt, "stream": False}
        try:
            response = requests.post(
                f"{self.base_url}/api/generate",
                json=payload,
                timeout=30,
            )
            response.raise_for_status()
            body = response.json()
            return body.get("response", "")
        except Exception as e:
            print(f"⚠️  OllamaService generate failed: {e}")
            return ""
=======
        return is_ollama_available(url=self.base_url)

    def generate(self, prompt: str) -> str:
        return call_ollama(prompt, model=self.model, url=self.base_url) or ""
>>>>>>> origin/consolidate-ollama-api-logic-9180553374366050257

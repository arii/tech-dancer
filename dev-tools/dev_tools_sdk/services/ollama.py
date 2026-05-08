from __future__ import annotations

import json
import requests


class OllamaService:
    def __init__(self, model: str = "llama3", base_url: str = "http://localhost:11434"):
        self.model = model
        self.base_url = base_url.rstrip("/")

    def is_available(self) -> bool:
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

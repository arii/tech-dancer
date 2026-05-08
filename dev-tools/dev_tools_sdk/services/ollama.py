from __future__ import annotations

import json
import urllib.request


class OllamaService:
    def __init__(self, model: str = "llama3", base_url: str = "http://localhost:11434"):
        self.model = model
        self.base_url = base_url.rstrip("/")

    def is_available(self) -> bool:
        try:
            with urllib.request.urlopen(f"{self.base_url}/api/tags", timeout=2):
                return True
        except Exception:
            return False

    def generate(self, prompt: str) -> str:
        payload = json.dumps({"model": self.model, "prompt": prompt, "stream": False}).encode("utf-8")
        req = urllib.request.Request(
            f"{self.base_url}/api/generate",
            data=payload,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=30) as resp:
            body = json.loads(resp.read().decode("utf-8"))
        return body.get("response", "")

import json
from typing import Any

import requests
from pydantic import BaseModel


class OllamaClient:
    def __init__(self, base_url: str, model: str, timeout: int = 120) -> None:
        self.base_url = base_url.rstrip("/")
        self.model = model
        self.timeout = timeout

    def generate_json(self, prompt: str, schema: type[BaseModel]) -> BaseModel:
        response = requests.post(
            f"{self.base_url}/api/generate",
            json={"model": self.model, "prompt": prompt, "stream": False, "format": "json"},
            timeout=self.timeout,
        )
        response.raise_for_status()
        raw = response.json().get("response", "{}")
        data: dict[str, Any] = json.loads(raw)
        return schema.model_validate(data)

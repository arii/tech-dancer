from __future__ import annotations
from utils import call_ai, is_ai_available

class AIService:
    def __init__(self, model: str = "gpt-4o", base_url: str = None):
        self.model = model
        self.base_url = base_url

    def is_available(self) -> bool:
        return is_ai_available()

    def generate(self, prompt: str) -> str:
        return call_ai(prompt, model=self.model, url=self.base_url) or ""

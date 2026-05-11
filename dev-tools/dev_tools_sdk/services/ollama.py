from __future__ import annotations
from utils import call_ollama, is_ollama_available

class OllamaService:
    def __init__(self, model: str = "llama3", base_url: str = None):
        self.model = model
        self.base_url = base_url

    def is_available(self) -> bool:
        return is_ollama_available()

    def generate(self, prompt: str) -> str:
        return call_ollama(prompt, model=self.model, url=self.base_url) or ""

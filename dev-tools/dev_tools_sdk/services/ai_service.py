from __future__ import annotations
import sys
import os

# Add parent dir to path so we can import utils
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from utils import call_ai, get_ai_review_model

class AIService:
    """Cloud review service."""

    def review(self, prompt: str) -> str:
        res = call_ai(prompt, model=get_ai_review_model())
        if res:
             return res
        return "[AI fallback placeholder] " + prompt[:200]

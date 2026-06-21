from __future__ import annotations
import os
import json


def _load_visual_guidelines() -> str:
    """Loads visual guidelines from a shared JSON file."""
    try:
        guidelines_path = os.path.join(os.path.dirname(__file__), "..", "..", "visual_guidelines.json")
        if os.path.exists(guidelines_path):
            with open(guidelines_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                return data.get("VISUAL_DESIGN_GUIDELINES", "")
    except Exception:
        pass
    return "Impeccable design guidelines not available."


VISUAL_GUIDELINES = _load_visual_guidelines()


class ReviewService:
    def build_prompt(self, context: str) -> str:
        return (
            "You are an expert software engineer and UI/UX auditor. "
            "Review the following code for bugs, anti-patterns, and visual quality defects.\n\n"
            f"{VISUAL_GUIDELINES}\n\n"
            "If the diff contains UI files (.tsx, .css), you MUST audit them against the Visual & Design Guidelines above. "
            "Provide actionable fixes for any violations.\n\n"
            f"### Context\n\n{context}"
        )

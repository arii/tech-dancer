from __future__ import annotations
import os


def load_visual_guidelines() -> str:
    """Loads visual guidelines from a shared markdown file."""
    try:
        guidelines_path = os.path.join(os.path.dirname(__file__), "..", "..", "visual_guidelines.md")
        if os.path.exists(guidelines_path):
            with open(guidelines_path, "r", encoding="utf-8") as f:
                return f.read()
    except Exception:
        pass
    return "Impeccable design guidelines not available."


class ReviewService:
    def build_prompt(self, context: str) -> str:
        visual_guidelines = load_visual_guidelines()
        return (
            "You are an expert software engineer and UI/UX auditor. "
            "Review the following code for bugs, anti-patterns, and visual quality defects.\n\n"
            f"{visual_guidelines}\n\n"
            "If the diff contains UI files (.tsx, .css), you MUST audit them against the Visual & Design Guidelines above. "
            "Provide actionable fixes for any violations.\n\n"
            f"### Context\n\n{context}"
        )

import json
from typing import Dict, List, Optional
from tdw_services.services.ai_service import AIClient

RECONCILE_PROMPT = """
You are reviewing two branches that were developed in parallel.
Your job is to find and flag:

1. DUPLICATE DEFINITIONS — same type/function defined in both
2. PHANTOM FIXES — both branches fix the same bug differently
3. CONFLICTING CONVENTIONS — e.g. one uses `ApiError`, other uses `APIError`
4. UNNECESSARY CHANGES — whitespace, comment rewrites, unrelated refactors

Branch A ( {branch_a} ) diff:
<diff_a>{diff_a}</diff_a>

Branch B ( {branch_b} ) diff:
<diff_b>{diff_b}</diff_b>

Return ONLY valid JSON: {{ "duplicates": [], "conflicts": [], "phantom_fixes": [], "verdict": "safe"|"needs_review", "summary": "string" }}
"""

class Reconciler:
    def __init__(self, ai_client: AIClient):
        self.ai = ai_client

    def reconcile(self, branch_a: str, diff_a: str, branch_b: str, diff_b: str) -> Dict:
        prompt = RECONCILE_PROMPT.format(
            branch_a=branch_a,
            diff_a=diff_a,
            branch_b=branch_b,
            diff_b=diff_b
        )

        schema = {
            "type": "object",
            "properties": {
                "duplicates": {"type": "array", "items": {"type": "string"}},
                "conflicts": {"type": "array", "items": {"type": "string"}},
                "phantom_fixes": {"type": "array", "items": {"type": "string"}},
                "verdict": {"type": "string", "enum": ["safe", "needs_review"]},
                "summary": {"type": "string"}
            },
            "required": ["duplicates", "conflicts", "phantom_fixes", "verdict", "summary"]
        }

        raw_response = self.ai.call_ai(prompt, schema=schema)
        try:
            return json.loads(self.ai.clean_llm_output(raw_response))
        except Exception as e:
            return {
                "duplicates": [],
                "conflicts": [],
                "phantom_fixes": [],
                "verdict": "needs_review",
                "summary": f"Error parsing AI response: {str(e)}",
                "raw": raw_response
            }

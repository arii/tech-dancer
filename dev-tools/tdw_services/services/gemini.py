import os
import json
import re
import urllib.request
import urllib.error
from typing import Optional, Dict, Any, List

class LocalAIClient:
    def __init__(self, ollama_url: str = None, ollama_model: str = None, gemini_api_key: str = None):
        self.ollama_url = ollama_url or os.environ.get("OLLAMA_URL", "http://localhost:11434/api/generate")
        self.ollama_model = ollama_model or os.environ.get("OLLAMA_MODEL", "qwen2.5-coder:7b")
        self.gemini_api_key = gemini_api_key or os.environ.get("GEMINI_API_KEY")

    def is_ollama_available(self) -> bool:
        try:
            req = urllib.request.Request(os.environ.get("OLLAMA_URL", "http://localhost:11434/api/tags"), method='GET')
            with urllib.request.urlopen(req, timeout=5) as response:
                return response.status == 200
        except Exception:
            return False

    def call_ollama(self, prompt: str, model: str = None, max_retries: int = 3) -> Optional[str]:
        model = model or self.ollama_model
        data = {
            "model": model,
            "prompt": prompt,
            "stream": False
        }
        req = urllib.request.Request(
            self.ollama_url,
            data=json.dumps(data).encode("utf-8"),
            headers={"Content-Type": "application/json"}
        )
        for attempt in range(1, max_retries + 1):
            try:
                with urllib.request.urlopen(req, timeout=120) as response:
                    res_data = json.loads(response.read().decode("utf-8"))
                    return res_data.get("response")
            except Exception as e:
                import time
                if attempt == max_retries:
                    return None
                time.sleep(2 ** attempt)
        return None

    def call_gemini(self, prompt: str, schema: Optional[Dict] = None) -> Optional[str]:
        if not self.gemini_api_key:
            return None

        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={self.gemini_api_key}"
        headers = {"Content-Type": "application/json"}

        payload = {
            "contents": [{"parts": [{"text": prompt}]}]
        }

        if schema:
            payload["generationConfig"] = {
                "responseMimeType": "application/json",
                "responseSchema": schema
            }

        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers=headers
        )

        try:
            with urllib.request.urlopen(req) as response:
                res_data = json.loads(response.read().decode("utf-8"))
                if "candidates" in res_data and len(res_data["candidates"]) > 0:
                    content = res_data["candidates"][0]["content"]["parts"][0]["text"]
                    return content
                return None
        except Exception as e:
            return None

    def generate(self, prompt: str, schema: Optional[Dict] = None) -> str:
        if self.is_ollama_available():
            # For JSON schema, we just append instruction for Ollama
            if schema:
                prompt += f"\n\nOutput MUST be valid JSON matching this schema: {json.dumps(schema)}"
            res = self.call_ollama(prompt)
            if res:
                return res

        # Fallback to Gemini
        res = self.call_gemini(prompt, schema)
        if res:
            return res

        raise EnvironmentError("No inference engine available.")

    def clean_llm_output(self, text: str) -> str:
        match = re.search(r"```(?:\w+)?\n(.*?)\n```", text, re.DOTALL)
        if match:
            return match.group(1).strip()
        return text.strip()

    def resolve_file_conflicts(self, file_path: str) -> bool:
        if not os.path.exists(file_path):
            return False

        try:
            with open(file_path, 'r') as f:
                content = f.read()

            if "<<<<<<<" not in content:
                return True

            prompt = f"Resolve the Git merge conflicts in this code. Output ONLY the clean, merged code without markers or explanation.\n\nFILE CONTENT:\n{content}\n\nREPAIRED CONTENT:\n"

            raw_response = self.generate(prompt)
            if not raw_response:
                return False

            resolved = self.clean_llm_output(raw_response)

            if "<<<<<<<" in resolved:
                return False

            with open(file_path, 'w') as f:
                f.write(resolved)
                if not resolved.endswith('\n'):
                    f.write('\n')

            return True
        except Exception as e:
            return False

    def generate_code_review(self, pr: Dict, diff: str) -> Dict:
        checks_summary = "\\n".join([f"- {c.get('name')}: {c.get('status')} ({c.get('conclusion', 'Pending')})" for c in pr.get('checkResults', [])]) if pr.get('checkResults') else "No checks found."

        prompt = f"""Perform Code Review for PR #{pr.get('number')} - "{pr.get('title')}".
Description: {pr.get('body', 'No description')}
Checks: {checks_summary}
Diff: {diff[:45000]}"""

        schema = {
            "type": "OBJECT",
            "properties": {
                "reviewComment": {"type": "STRING"},
                "labels": {"type": "ARRAY", "items": {"type": "STRING"}},
                "recommendation": {"type": "STRING", "enum": ["Approved", "Approved with Minor Changes", "Not Approved"]}
            },
            "required": ["reviewComment", "labels", "recommendation"]
        }
        res = self.generate(prompt, schema)
        try:
            # Clean markdown JSON block if Ollama returned it
            res = self.clean_llm_output(res)
            return json.loads(res)
        except Exception:
            return {"reviewComment": "Failed to parse AI review", "labels": [], "recommendation": "Not Approved"}

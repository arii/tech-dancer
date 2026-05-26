import os
import sys
import time
import json
import re
import requests
from typing import Optional, Dict, Any, List
from utils import call_ollama, is_ollama_available, clean_llm_output, get_ollama_model

class LocalAIClient:
    def __init__(self, ollama_url: str = None, ollama_model: str = None, gemini_api_key: str = None):
        # Note: ollama_url is now managed centrally in utils.py via get_ollama_url()
        self.ollama_model = ollama_model or get_ollama_model()
        self.gemini_api_key = gemini_api_key or os.environ.get("GEMINI_API_KEY")
        
        # Check environment or project config JSON for fallback toggle (env var takes precedence)
        env_fallback = os.environ.get("USE_GEMINI_FALLBACK")
        if env_fallback is not None:
            self.use_gemini_fallback = env_fallback.lower() in ("true", "1", "yes")
        else:
            # Default: Ollama-only. Gemini fallback must be explicitly enabled via
            # USE_GEMINI_FALLBACK=true env var or "use_gemini_fallback": true in project_config.json
            self.use_gemini_fallback = False
            try:
                config_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "project_config.json")
                if os.path.exists(config_path):
                    with open(config_path, 'r') as f:
                        cfg = json.load(f)
                        val = cfg.get("use_gemini_fallback")
                        if val is not None:
                            self.use_gemini_fallback = str(val).lower() in ("true", "1", "yes")
            except Exception:
                pass

    def is_ollama_available(self) -> bool:
        return is_ollama_available()

    def call_ollama(self, prompt: str, model: str = None, max_retries: int = 3, schema: Optional[Dict] = None) -> Optional[str]:
        return call_ollama(prompt, model=model or self.ollama_model, max_retries=max_retries, schema=schema)

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

        try:
            response = requests.post(url, headers=headers, json=payload, timeout=30)
            response.raise_for_status()
            res_data = response.json()
            if "candidates" in res_data and len(res_data["candidates"]) > 0:
                content = res_data["candidates"][0]["content"]["parts"][0]["text"]
                return content
            return None
        except Exception as e:
            print(f"⚠️  Gemini API call failed: {e}")
            return None

    def generate(self, prompt: str, schema: Optional[Dict] = None, model: str = None) -> str:
        if self.is_ollama_available():
            # For JSON schema, we just append instruction for Ollama
            if schema:
                prompt += f"\n\nOutput MUST be valid JSON matching this schema: {json.dumps(schema)}"
            res = self.call_ollama(prompt, model=model, schema=schema)
            if res:
                return res

        # Fallback to Gemini only if enabled
        if self.use_gemini_fallback:
            res = self.call_gemini(prompt, schema)
            if res:
                return res
 
        raise EnvironmentError("No inference engine available (Ollama unavailable/failed, Gemini fallback disabled).")

    def clean_llm_output(self, text: str) -> str:
        return clean_llm_output(text)

    def resolve_file_conflicts(self, file_path: str) -> bool:
        if not os.path.exists(file_path):
            return False

        try:
            with open(file_path, 'r') as f:
                content = f.read()

            if "<<<<<<<" not in content:
                return True

            # Backward compatibility for mock mode in tests
            if os.environ.get("MERGELLAMA_MOCK", "false").lower() == "true":
                import re
                mock_pattern = r"<<<<<<<.*?\n(.*?)\n=======.*?\n>>>>>>>.*?\n"
                resolved = re.sub(mock_pattern, r"\1\n", content, flags=re.DOTALL)
                with open(file_path, 'w') as f:
                    f.write(resolved)
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
        pr_num = pr.get('number', 'unknown')
        checks_summary = "\n".join([f"- {c.get('name')}: {c.get('status')} ({c.get('conclusion', 'Pending')})" for c in pr.get('checkResults', [])]) if pr.get('checkResults') else "No checks found."

        failing_context = ""
        if pr.get('checkResults'):
            failures = [c for c in pr.get('checkResults') if c.get('conclusion') == 'failure']
            if failures:
                failing_context = "\nCRITICAL CI FAILURES DETECTED:\n"
                for f in failures:
                    failing_context += f"- {f.get('name')} FAILED\n"

        prompt = f"""Perform Code Review for PR #{pr_num} - "{pr.get('title')}".
Description: {pr.get('body', 'No description')}
Checks: {checks_summary}
{failing_context}

IMPORTANT:
- If ANY critical CI check has failed (conclusion='failure'), you MUST NOT recommend 'Approved'.
- Analyze any failing test logs provided in the description, check results, or failing context to suggest specific fixes.
- Your reviewComment should include actionable feedback for fixing test failures if they exist.
- Output ONLY valid JSON matching the required schema. Do not add markdown, prose, or commentary outside the JSON.

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

        # ── Diagnostics ────────────────────────────────────────────────────────
        ollama_ok = self.is_ollama_available()
        model_name = self.ollama_model
        print(f"\n{'='*60}")
        print(f"🔍 PR #{pr_num} – Code Review Diagnostics")
        print(f"{'='*60}")
        print(f"  Ollama available : {'✅ YES' if ollama_ok else '❌ NO'}")
        print(f"  Model            : {model_name} (requesting 'code-reviewer')")
        print(f"  Gemini fallback  : {'enabled' if self.use_gemini_fallback else 'DISABLED'}")
        print(f"  Diff size        : {len(diff):,} chars")
        print(f"  Prompt size      : {len(prompt):,} chars (capped diff at 45 000)")
        print(f"  Schema           : {list(schema['properties'].keys())}")
        print(f"{'='*60}\n")

        if not ollama_ok and not self.use_gemini_fallback:
            print("❌ ABORT: Ollama is unreachable and Gemini fallback is disabled.", file=sys.stderr)
            return {"reviewComment": "Ollama unavailable and fallback disabled.", "labels": [], "recommendation": "Not Approved"}

        print("🤖 Sending prompt to Ollama (model: 'code-reviewer') …")
        start_time = time.time()
        try:
            res = self.generate(prompt, schema, model="code-reviewer")
        except EnvironmentError as e:
            print(f"❌ generate() raised EnvironmentError: {e}", file=sys.stderr)
            return {"reviewComment": str(e), "labels": [], "recommendation": "Not Approved"}
        except Exception as e:
            print(f"❌ generate() raised unexpected error: {e}", file=sys.stderr)
            return {"reviewComment": str(e), "labels": [], "recommendation": "Not Approved"}
        duration = time.time() - start_time

        if not res:
            print(f"❌ Ollama returned empty response after {duration:.2f}s", file=sys.stderr)
            return {"reviewComment": "Empty response from Ollama.", "labels": [], "recommendation": "Not Approved"}

        print(f"✅ Received response ({len(res):,} chars) in {duration:.2f}s")
        print(f"--- RAW RESPONSE (first 500 chars) ---")
        print(res[:500])
        print(f"--- END RAW RESPONSE ---\n")

        try:
            cleaned = self.clean_llm_output(res)
            review = json.loads(cleaned)

            # Enforce CI status check logic
            has_failures = any(c.get('conclusion') == 'failure' for c in pr.get('checkResults', []))
            if has_failures and review.get('recommendation') == 'Approved':
                review['recommendation'] = 'Not Approved'
                review['reviewComment'] = "CI checks are failing. Review recommendation downgraded to 'Not Approved'.\n\n" + review['reviewComment']

            # ── Write filled review template to disk ───────────────────────
            self._write_review_file(pr_num, pr, review)

            return review
        except Exception as e:
            print(f"❌ Failed to parse AI review JSON: {e}", file=sys.stderr)
            print(f"Full raw response:\n{res}", file=sys.stderr)
            return {"reviewComment": f"Failed to parse AI review: {e}. Raw response (first 1000 chars): {res[:1000]}", "labels": [], "recommendation": "Not Approved"}

    def _write_review_file(self, pr_num: int, pr: Dict, review: Dict) -> None:
        """Populate and persist the review template with AI-generated content."""
        head_sha = pr.get('head', {}).get('sha', 'unknown')
        check_results = pr.get('checkResults', [])
        failed_checks = [c.get('name') for c in check_results if c.get('conclusion') == 'failure']
        detected_errors_raw = pr.get('structuredFailures', [])

        failed_checks_str = '\n'.join(f'  - {c}' for c in failed_checks) if failed_checks else '_None_'
        detected_errors_str = '\n'.join(
            f"  - `{e.get('file','?')}:{e.get('line','?')}` {e.get('message','')}"
            for e in detected_errors_raw
        ) if detected_errors_raw else '_None detected by parser._'

        recommendation = review.get('recommendation', 'Unknown')
        review_comment = review.get('reviewComment', '')
        labels = review.get('labels', [])
        labels_str = ', '.join(labels) if labels else '_None_'

        # Build inline comments JSON block
        inline_comments = review.get('comments', [])
        if not inline_comments:
            inline_comments = [{"path": "<see reviewComment above>", "line": 1, "body": review_comment[:500]}]
        comments_json = json.dumps({"body": review_comment, "comments": inline_comments}, indent=2)

        content = f"""# PR Review: #{pr_num}

## Context

- **Last Commit Tracked (SHA):** {head_sha}
- **Labels:** {labels_str}
- **Recommendation:** {recommendation}

## Audit Checklist

For EVERY changed file, verify against these standards. Mark as `- [x]` when verified.

- [ ] Dead abstractions: No new class, context, or hook that a simpler primitive handles.
- [ ] Unnecessary indirection: No layer of wrapping where a direct function call suffices.
- [ ] Responsibility creep: Component does not take on state/logic belonging in parent/hook.
- [ ] Import bloat: No unnecessary `import React from 'react'` (React 17+).
- [ ] Token compliance: Uses established design tokens (no raw Tailwind values or inline styles).
- [ ] Audit ratio: If > 100 lines added, identified at least 10 lines to refactor/remove.

## CI Log Triage

(Populated if CI failures detected)
- **Failed Checks:**
{failed_checks_str}
- **Detected Errors:**
{detected_errors_str}
- **Root Cause Analysis:**
- **Remediation Steps:**

## AI Review Comment

{review_comment}

## Output JSON

Provide your findings and inline comments in the JSON block below.
DO NOT REMOVE THE BACKTICKS.

```json
{comments_json}
```
"""
        output_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), 'logs', 'reviews')
        os.makedirs(output_dir, exist_ok=True)
        output_path = os.path.join(output_dir, f'pr-review-{pr_num}.md')
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"📝 Review written to: {output_path}")

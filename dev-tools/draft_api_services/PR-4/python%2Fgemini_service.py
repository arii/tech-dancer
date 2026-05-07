import os
import json
import time
from typing import Dict, Any, List, Optional
from google import genai
from google.genai import types

def clean_json_string(s: str) -> str:
    s = s.strip()
    if s.startswith("```json"):
        s = s[7:]
    elif s.startswith("```"):
        s = s[3:]
    if s.endswith("```"):
        s = s[:-3]
    return s.strip()

class GeminiService:
    PRO_MODEL = 'gemini-3.1-pro-preview'
    FLASH_MODEL = 'gemini-3-flash-preview'
    LITE_MODEL = 'gemini-3.1-flash-lite-preview'

    def __init__(self, api_key: str = None, tier: str = "flash"):
        self.api_key = api_key or os.environ.get("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("Gemini API Key is missing.")
        self.client = genai.Client(api_key=self.api_key)
        self.tier = tier

    def _get_model(self) -> str:
        if self.tier == "pro": return self.PRO_MODEL
        if self.tier == "lite": return self.LITE_MODEL
        return self.FLASH_MODEL

    def _get_thinking_config(self, low_thinking: bool = False):
        if self.tier in ["lite", "pro"]:
            return None
        return types.ThinkingConfig(thinking_budget_tokens=1024 if low_thinking else 4096)

    def _with_retry(self, fn, max_retries=3, initial_delay=1.0):
        last_error = None
        for i in range(max_retries + 1):
            try:
                return fn()
            except Exception as e:
                last_error = e
                error_msg = str(e).lower()
                is_transient = '503' in error_msg or 'unavailable' in error_msg or '429' in error_msg
                if not is_transient or i == max_retries:
                    raise e
                delay = initial_delay * (2 ** i)
                time.sleep(delay)
        raise last_error

    def _generate_json(self, prompt: str, schema: Any, system_instruction: str = None, low_thinking: bool = False) -> Dict:
        model = self._get_model()
        config = types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=schema,
            system_instruction=system_instruction,
            # thinking_config=self._get_thinking_config(low_thinking) # Disabled for compatibility
        )

        def _call():
            response = self.client.models.generate_content(
                model=model,
                contents=prompt,
                config=config
            )
            return json.loads(clean_json_string(response.text))

        return self._with_retry(_call)

    def analyze_workflow_batch(self, repo: str, runs: List[Dict]) -> Dict:
        schema = {
            "type": "OBJECT",
            "properties": {
                "healthScore": {"type": "NUMBER"},
                "summary": {"type": "STRING"},
                "technicalFindings": {
                    "type": "ARRAY",
                    "items": {
                        "type": "OBJECT",
                        "properties": {
                            "type": {"type": "STRING", "enum": ["failure", "warning", "info"]},
                            "title": {"type": "STRING"},
                            "description": {"type": "STRING"},
                            "location": {"type": "STRING"},
                            "remediation": {"type": "STRING"}
                        },
                        "required": ["type", "title", "description"]
                    }
                },
                "qualitativeAnalysis": {
                    "type": "OBJECT",
                    "properties": {
                        "efficacy": {"type": "STRING"},
                        "coverage": {"type": "STRING"},
                        "efficiency": {"type": "STRING"},
                        "recommendations": {"type": "ARRAY", "items": {"type": "STRING"}}
                    },
                    "required": ["efficacy", "coverage", "efficiency", "recommendations"]
                }
            },
            "required": ["healthScore", "summary", "technicalFindings", "qualitativeAnalysis"]
        }
        system_instruction = f"You are a DevOps Architect auditing GitHub Workflows for the repository '{repo}'. Provide a comprehensive audit including a health score (0-100), a technical summary, and specific actionable findings. Output MUST be valid JSON."
        prompt = f"Analyze these workflow runs: {json.dumps(runs)}"
        return self._generate_json(prompt, schema, system_instruction, low_thinking=True)

    def analyze_workflow_health(self, run: Dict, jobs: List[Dict], annotations: Dict[int, List[Dict]] = None, workflow_file: Dict = None) -> Dict:
        annotations = annotations or {}

        workflow_section = ""
        if workflow_file:
            workflow_section = f"""
## WORKFLOW DEFINITION (fetched at ref: `{workflow_file.get('ref')}` — this is what GitHub actually executed)
File: `{workflow_file.get('path')}`

```yaml
{workflow_file.get('content')}
```
CRITICAL: Cross-reference the job names and step names in this YAML with the job/step names in the run data.
"""
        else:
            workflow_section = "## WORKFLOW DEFINITION\n(Could not be fetched — proceed with job/step data only.)\n"

        jobs_section = []
        for j in jobs:
            j_id = j.get("id")
            jobs_section.append({
                "id": j_id,
                "name": j.get("name"),
                "conclusion": j.get("conclusion"),
                "status": j.get("status"),
                "steps": [{"name": s.get("name"), "conclusion": s.get("conclusion"), "status": s.get("status")} for s in j.get("steps", [])],
                "annotations": [{"level": a.get("annotation_level"), "message": a.get("message")} for a in annotations.get(j_id, [])]
            })

        prompt = f"""You are a senior DevOps engineer and GitHub Actions specialist. Perform a DEEP TECHNICAL AUDIT.
## RUN METADATA
- Run ID: {run.get('id')}
- Workflow: {run.get('name')}
- Event: {run.get('event')}
- Conclusion: {run.get('conclusion')}

{workflow_section}
## JOB AND STEP DATA
{json.dumps(jobs_section, indent=2)}

Provide ROOT CAUSE ANALYSIS and FIX RECOMMENDATIONS. Output JSON."""

        schema = {
            "type": "OBJECT",
            "properties": {
                "healthScore": {"type": "NUMBER"},
                "summary": {"type": "STRING"},
                "technicalFindings": {
                    "type": "ARRAY",
                    "items": {
                        "type": "OBJECT",
                        "properties": {
                            "type": {"type": "STRING", "enum": ["failure", "warning", "info"]},
                            "title": {"type": "STRING"},
                            "description": {"type": "STRING"},
                            "location": {"type": "STRING"},
                            "remediation": {"type": "STRING"}
                        },
                        "required": ["type", "title", "description"]
                    }
                },
                 "qualitativeAnalysis": {
                    "type": "OBJECT",
                    "properties": {
                        "efficacy": {"type": "STRING"},
                        "coverage": {"type": "STRING"},
                        "efficiency": {"type": "STRING"},
                        "recommendations": {"type": "ARRAY", "items": {"type": "STRING"}}
                    },
                    "required": ["efficacy", "coverage", "efficiency", "recommendations"]
                }
            },
            "required": ["healthScore", "summary", "technicalFindings", "qualitativeAnalysis"]
        }
        return self._generate_json(prompt, schema)

    def analyze_workflow_qualitative(self, workflows: List[Dict], runs: List[Dict], repo_context: Dict) -> Dict:
        prompt = f"""Perform a QUALITATIVE AUDIT of CI/CD Workflows.
DATA PROVIDED:
- Workflows: {json.dumps([{'name': w.get('name'), 'content': w.get('content', '')[:2000]} for w in workflows])}
- Runs: {json.dumps([{'name': r.get('name'), 'status': r.get('status')} for r in runs[:10]])}
- Repo Context: {json.dumps(repo_context)}
"""
        schema = {
            "type": "OBJECT",
            "properties": {
                "summary": {"type": "STRING"},
                "efficacyScore": {"type": "INTEGER"},
                "efficiencyScore": {"type": "INTEGER"},
                "findings": {
                    "type": "ARRAY",
                    "items": {
                        "type": "OBJECT",
                        "properties": {
                            "type": {"type": "STRING", "enum": ["efficacy", "coverage", "duplicate", "inefficient"]},
                            "severity": {"type": "STRING", "enum": ["critical", "moderate", "low"]},
                            "title": {"type": "STRING"},
                            "description": {"type": "STRING"},
                            "recommendation": {"type": "STRING"},
                            "suggestedTitle": {"type": "STRING"},
                            "suggestedBody": {"type": "STRING"}
                        },
                        "required": ["type", "severity", "title", "description", "recommendation", "suggestedTitle", "suggestedBody"]
                    }
                }
            },
            "required": ["summary", "efficacyScore", "efficiencyScore", "findings"]
        }
        return self._generate_json(prompt, schema)

    def analyze_pull_requests(self, prs: List[Dict]) -> Dict:
        summary = [{"number": p.get("number"), "title": p.get("title"), "bodySnippet": str(p.get("body", ""))[:200]} for p in prs]
        prompt = f"Audit PR health: {json.dumps(summary)}. Identify PRs with excessive code addition or AI-generated boilerplate (slop)."
        schema = {
            "type": "OBJECT",
            "properties": {
                "report": {"type": "STRING"},
                "actions": {
                    "type": "ARRAY",
                    "items": {
                        "type": "OBJECT",
                        "properties": {
                            "prNumber": {"type": "INTEGER"},
                            "title": {"type": "STRING"},
                            "action": {"type": "STRING", "enum": ["close", "comment", "label", "publish"]},
                            "label": {"type": "STRING"},
                            "reason": {"type": "STRING"},
                            "suggestedComment": {"type": "STRING"},
                            "confidence": {"type": "STRING", "enum": ["high", "medium", "low"]}
                        },
                        "required": ["prNumber", "title", "action", "reason", "confidence"]
                    }
                }
            },
            "required": ["report", "actions"]
        }
        return self._generate_json(prompt, schema)

    def generate_code_review(self, pr: Dict, diff: str) -> Dict:
        checks_summary = "\\n".join([f"- {c.get('name')}: {c.get('status')} ({c.get('conclusion', 'Pending')})" for c in pr.get('checkResults', [])]) or "No checks found."

        system_instruction = """You are a Principal Software Engineer performing a DEEP Technical Audit.
### ANTI-AI-SLOP DIRECTIVES
Flag: Verbose comments, over-engineering, duplicate patterns, and slop.
### MANDATORY SECTIONS
1. ## ANTI-AI-SLOP
2. ## FINAL RECOMMENDATION (Approved | Approved with Minor Changes | Not Approved)"""

        prompt = f"""Perform Code Review for PR #{pr.get('number')} - "{pr.get('title')}".
Description: {pr.get('body', 'No description')}
Checks: {checks_summary}
Diff: {diff[:45000]}"""

        schema = {
            "type": "OBJECT",
            "properties": {
                "reviewComment": {"type": "STRING"},
                "labels": {"type": "ARRAY", "items": {"type": "STRING"}},
                "recommendation": {"type": "STRING", "enum": ["Approved", "Approved with Minor Changes", "Not Approved"]},
                "suggestedIssues": {
                    "type": "ARRAY",
                    "items": {
                        "type": "OBJECT",
                        "properties": {
                            "title": {"type": "STRING"},
                            "body": {"type": "STRING"},
                            "reason": {"type": "STRING"},
                            "priority": {"type": "STRING", "enum": ["High", "Medium", "Low"]},
                            "effort": {"type": "STRING", "enum": ["Small", "Medium", "Large"]},
                            "labels": {"type": "ARRAY", "items": {"type": "STRING"}}
                        },
                        "required": ["title", "body", "reason", "priority", "effort", "labels"]
                    }
                }
            },
            "required": ["reviewComment", "labels", "recommendation"]
        }
        return self._generate_json(prompt, schema, system_instruction=system_instruction)

    def extract_issues_from_comments(self, comments: List[Dict]) -> List[Dict]:
        prompt = f"Extract follow-up issues from these comments: {json.dumps(comments)}. Each issue's 'body' MUST be a full implementation plan."
        schema = {
            "type": "ARRAY",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "title": {"type": "STRING"},
                    "body": {"type": "STRING"},
                    "reason": {"type": "STRING"},
                    "priority": {"type": "STRING", "enum": ["High", "Medium", "Low"]},
                    "effort": {"type": "STRING", "enum": ["Small", "Medium", "Large"]},
                    "labels": {"type": "ARRAY", "items": {"type": "STRING"}}
                },
                "required": ["title", "body", "reason", "priority", "effort", "labels"]
            }
        }
        return self._generate_json(prompt, schema, low_thinking=True)

    def analyze_pr_for_restart(self, pr: Dict, diff: str) -> Dict:
        prompt = f"Analyze intent for fresh restart: {diff[:40000]}. Identify every line of code in the current PR that is 'slop' and plan to EXCLUDE it. Include a Decommissioning Phase."
        schema = {
            "type": "OBJECT",
            "properties": {
                "plan": {"type": "STRING"},
                "title": {"type": "STRING"}
            },
            "required": ["plan", "title"]
        }
        return self._generate_json(prompt, schema)

    def analyze_pr_for_sync(self, pr: Dict, diff: str) -> Dict:
        prompt = f"""Analyze PR #{pr.get('number')} for synchronization and conflict resolution issues.
Title: {pr.get('title')}
Diff: {diff[:40000]}
"""
        schema = {
            "type": "OBJECT",
            "properties": {
                "syncIssues": {"type": "ARRAY", "items": {"type": "STRING"}}
            },
            "required": ["syncIssues"]
        }
        return self._generate_json(prompt, schema, low_thinking=True)

    def parse_issues_from_text(self, text: str) -> List[Dict]:
        prompt = f"Extract tasks from this text: {text}."
        schema = {
            "type": "ARRAY",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "title": {"type": "STRING"},
                    "body": {"type": "STRING"},
                    "priority": {"type": "STRING", "enum": ["High", "Medium", "Low"]},
                    "effort": {"type": "STRING", "enum": ["Small", "Medium", "Large"]},
                    "labels": {"type": "ARRAY", "items": {"type": "STRING"}}
                },
                "required": ["title", "body", "priority", "effort", "labels"]
            }
        }
        return self._generate_json(prompt, schema, low_thinking=True)

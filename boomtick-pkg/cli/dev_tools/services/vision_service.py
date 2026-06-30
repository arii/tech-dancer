import os
import json
import base64
from typing import Optional, List, Dict
import requests
from dev_tools.config import load_project_config
from dev_tools.utils import log_error



PROJECT_CONFIG = load_project_config()

class VisionService:
    """Vision-based regression audit service via AI API."""

    def __init__(self, model: Optional[str] = None):
        self.model = model or os.environ.get("VISION_MODEL", PROJECT_CONFIG.ai_vision_model)
        self.token = os.getenv("GITHUB_TOKEN")

    def call_ai(self, prompt: str, image_paths: List[str]) -> Optional[str]:
        """Calls the AI model with text prompt and images."""
        images = []
        for p in image_paths:
            if os.path.exists(p):
                with open(p, "rb") as f:
                    images.append(base64.b64encode(f.read()).decode('utf-8'))

        if not images:
            return None

        if not self.token:
            return "No GITHUB_TOKEN found."

        message_content = [{"type": "text", "text": prompt}]
        for img in images:
            message_content.append({
                "type": "image_url",
                "image_url": {"url": f"data:image/jpeg;base64,{img}"}
            })

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.token}"
        }

        data = {
            "model": self.model,
            "messages": [{"role": "user", "content": message_content}],
            "temperature": 0.7,
            "max_tokens": 2048,
        }

        url = "https://models.inference.ai.azure.com/chat/completions"

        try:
            response = requests.post(url, headers=headers, json=data, timeout=60)
            response.raise_for_status()
            return response.json()["choices"][0]["message"]["content"]
        except Exception as e:
            return f"❌ Vision call failed: {e}"

    def analyze_visual_changes(self, summary_path: str, project_root: str) -> Dict[str, str]:
        """Analyzes visual changes based on a summary JSON file."""
        if not os.path.exists(summary_path):
            return {}

        try:
            with open(summary_path, 'r') as f:
                data = json.load(f)
        except FileNotFoundError:
            log_error(f"Visual summary file not found: {summary_path}")
            return {}
        except json.JSONDecodeError as e:
            log_error(f"Malformed visual summary JSON: {e}")
            return {}

        routes = data.get('routes', [])
        results = {}

        for s in routes:
            before, after = s.get('beforeCroppedPath'), s.get('afterCroppedPath')
            if not (before and after):
                continue

            prompt = f"Analyze visual changes for {s['route']}. Describe what changed between BEFORE and AFTER. Identify bugs vs improvements. Be concise."
            res = self.call_ai(prompt, [os.path.join(project_root, before), os.path.join(project_root, after)])
            if res:
                results[s['route']] = res

        return results

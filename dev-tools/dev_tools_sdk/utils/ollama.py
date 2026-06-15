import os
import sys
import json
import urllib.request
import urllib.error
import urllib.parse
import re
import random
from typing import Optional, Union, List

class APIConnectionError(Exception):
    """Custom exception for retriable API connection issues."""
    pass

def get_ollama_url() -> str:
    """Dynamic getter for Ollama API URL."""
    return os.environ.get("OLLAMA_URL", "http://localhost:11434")

def get_ollama_model() -> str:
    """Dynamic getter for Ollama Model."""
    return os.environ.get("OLLAMA_MODEL", "qwen2.5-coder:7b")

def get_ollama_review_model() -> str:
    """Dynamic getter for the dedicated Code Reviewer model.
    'code-reviewer' is a custom alias defined in dev-tools/CodeReviewer.mf which is based on qwen2.5-coder:7b.
    """
    return os.environ.get("OLLAMA_REVIEW_MODEL", "code-reviewer")

def get_ollama_synthesis_model() -> str:
    """Dynamic getter for the Synthesis model, checking env, then config, then fallback."""
    env_val = os.environ.get("OLLAMA_SYNTHESIS_MODEL")
    if env_val:
        return env_val
    try:
        from dev_tools_sdk.config import load_project_config
        config = load_project_config()
        return config.ollama_synthesis_model
    except Exception:
        # Fallback to direct json reading if sdk not available
        try:
            import json
            config_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "dev-tools", "project_config.json")
            if not os.path.exists(config_path):
                config_path = os.path.join(os.path.dirname(__file__), "project_config.json")
            with open(config_path, "r") as f:
                raw = json.load(f)
                return raw.get("ollama_synthesis_model", "llama3.2")
        except Exception:
            return "llama3.2"

def clean_llm_output(text: str) -> str:
    """Removes markdown code blocks if present."""
    match = re.search(r"```(?:\w+)?\n(.*?)\n```", text, re.DOTALL)
    if match:
        return match.group(1).strip()
    return text.strip()

def is_ollama_available() -> bool:
    """Checks if Ollama API is reachable."""
    base_url = get_ollama_url()
    if not base_url.endswith("/"):
        base_url += "/"

    # Use relative path to preserve any sub-path in base_url
    tags_url = urllib.parse.urljoin(base_url, "api/tags")

    try:
        req = urllib.request.Request(tags_url, method='GET')
        with urllib.request.urlopen(req, timeout=5) as response:
            return response.status == 200
    except Exception:
        return False

def to_standard_schema(schema):
    """Recursively converts Gemini-style uppercase types to standard lowercase JSON schema types."""
    if isinstance(schema, dict):
        new_schema = {}
        for k, v in schema.items():
            if k == "type" and isinstance(v, str):
                new_schema[k] = v.lower()
            else:
                new_schema[k] = to_standard_schema(v)
        return new_schema
    elif isinstance(schema, list):
        return [to_standard_schema(item) for item in schema]
    return schema

def call_ollama(prompt: str, model: str = None, url: Optional[str] = None, max_retries: int = 3, schema = None) -> Optional[str]:
    """Unified helper to call local Ollama API with retries using urllib."""
    base_url = url or get_ollama_url()
    if not base_url.endswith("/"):
        base_url += "/"

    # Use relative path to preserve any sub-path in base_url
    target_url = urllib.parse.urljoin(base_url, "api/generate")

    model = model or get_ollama_model()

    data = {
        "model": model,
        "prompt": prompt,
        "stream": False
    }

    if schema:
        data["format"] = to_standard_schema(schema)

    req = urllib.request.Request(
        target_url,
        data=json.dumps(data).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )

    for attempt in range(1, max_retries + 1):
        try:
            try:
                with urllib.request.urlopen(req, timeout=900) as response:
                    res_data = json.loads(response.read().decode("utf-8"))
                    return res_data.get("response")
            except (urllib.error.HTTPError, urllib.error.URLError) as e:
                # Retry on 429 (Too Many Requests), 5xx (Server Error), or network errors
                is_retryable = not isinstance(e, urllib.error.HTTPError) or (e.code == 429 or 500 <= e.code < 600)
                if is_retryable:
                    raise APIConnectionError(str(e)) from e
                # Non-retriable HTTP error
                print(f"API call failed with non-retriable error: {e}", file=sys.stderr)
                return None
        except APIConnectionError as e:
            if attempt == max_retries:
                print(f"API call failed after {attempt} attempts: {e}", file=sys.stderr)
                return None

            # Exponential backoff with jitter
            sleep_time = (2 ** attempt) + random.uniform(0, 1)
            print(f"API call failed ({e}). Retrying in {sleep_time:.2f}s...", file=sys.stderr)
            time.sleep(sleep_time)
        except Exception as e:
            # Non-retryable exceptions (e.g. JSON parse error)
            print(f"Unexpected error during API call: {e}", file=sys.stderr)
            return None
    return None

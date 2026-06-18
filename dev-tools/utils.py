import os
import sys
import subprocess
import json
import time
import urllib.request
import urllib.error
import urllib.parse
import re
import random
from typing import Optional, Union, List, Dict

class CLIError(Exception):
    def __init__(self, message, code=1, data=None):
        self.message = message
        self.code = code
        self.data = data
        super().__init__(self.message)

class APIConnectionError(Exception):
    """Custom exception for retriable API connection issues."""
    pass

def get_ollama_url() -> str:
    """Dynamic getter for Ollama API URL."""
    return os.environ.get("OLLAMA_URL", "http://localhost:11434")

def get_ollama_model() -> str:
    """Dynamic getter for Ollama Model."""
    return os.environ.get("OLLAMA_MODEL", "gpt-4o")

def get_ai_review_model() -> str:
    """Dynamic getter for the dedicated Code Reviewer model.
    'gpt-4o' is a custom alias defined in dev-tools/CodeReviewer.mf which is based on gpt-4o.
    """
    return os.environ.get("OLLAMA_REVIEW_MODEL", "gpt-4o")

def get_ai_synthesis_model() -> str:
    """Dynamic getter for the Synthesis model, checking env, then config, then fallback."""
    env_val = os.environ.get("AI_SYNTHESIS_MODEL") or os.environ.get("OLLAMA_SYNTHESIS_MODEL")
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

def get_ai_model() -> str:
    """Dynamic getter for the primary AI model."""
    return os.environ.get("AI_MODEL") or os.environ.get("GITHUB_MODELS_MODEL") or os.environ.get("OLLAMA_MODEL") or "gpt-4o-mini"

def clean_llm_output(text: str) -> str:
    """Removes markdown code blocks if present."""
    match = re.search(r"```(?:\w+)?\n(.*?)\n```", text, re.DOTALL)
    if match:
        return match.group(1).strip()
    return text.strip()

def is_ai_available() -> bool:
    """Checks if AI API token is present."""
    return bool(os.getenv("GITHUB_TOKEN") or os.getenv("GH_TOKEN"))

def to_standard_schema(schema, uppercase: bool = False):
    """Recursively prepares a standard JSON schema.
    - Ensures top-level 'type: object' if 'properties' is present.
    - Converts type names to uppercase if uppercase=True (Gemini requirement).
    - Otherwise ensures lowercase (Ollama/OpenAI standard).
    """
    if isinstance(schema, dict):
        # Auto-inject object type if properties are defined without a type
        if "type" not in schema and "properties" in schema:
            schema = {"type": "object", **schema}

        new_schema = {}
        for k, v in schema.items():
            if k == "type" and isinstance(v, str):
                new_schema[k] = v.upper() if uppercase else v.lower()
            else:
                new_schema[k] = to_standard_schema(v, uppercase=uppercase)
        return new_schema
    elif isinstance(schema, list):
        return [to_standard_schema(item, uppercase=uppercase) for item in schema]
    return schema

def call_ai(prompt: str, model: str = None, url: Optional[str] = None, max_retries: int = 3, schema = None) -> Optional[str]:
    """Unified helper to call AI API using LangChain ChatOpenAI with retries."""
    try:
        from langchain_openai import ChatOpenAI
        from langchain_core.messages import HumanMessage
    except ImportError:
        print("langchain_openai or langchain_core is not installed.", file=sys.stderr)
        return None

    token = os.getenv("GITHUB_TOKEN") or os.getenv("GH_TOKEN")
    if not token:
        return None

    model = model or get_ollama_model()

    llm = ChatOpenAI(
        base_url="https://models.inference.ai.azure.com",
        api_key=token,
        model=model,
        temperature=0.7,
        max_tokens=2048,
        max_retries=max_retries,
        model_kwargs={"response_format": {"type": "json_object"}} if schema else {}
    )

    try:
        response = llm.invoke([HumanMessage(content=prompt)])
        return response.content
    except Exception as e:
        error_msg = str(e).lower()
        if any(x in error_msg for x in ["authentication", "api_key", "401", "403"]):
            print(f"❌ [AUTH_ERROR] LangChain call failed: {e}", file=sys.stderr)
        elif any(x in error_msg for x in ["not found", "404", "410"]):
            print(f"❌ [MODEL_UNAVAILABLE] LangChain call failed: {e}", file=sys.stderr)
        elif any(x in error_msg for x in ["rate limit", "429"]):
            print(f"⚠️  [RATE_LIMIT] LangChain call failed: {e}", file=sys.stderr)
        elif any(x in error_msg for x in ["timeout", "connection", "network"]):
            print(f"⚠️  [NETWORK_ERROR] LangChain call failed: {e}", file=sys.stderr)
        else:
            print(f"❌ [SERVER_ERROR] LangChain call failed: {e}", file=sys.stderr)
        return None

def _call_api_with_retry(req: urllib.request.Request, max_retries: int = 3, timeout: int = 60) -> Optional[Dict]:
    """
    Standardized API caller with exponential backoff.
    Distinguishes between:
    - [AUTH_ERROR]: 401, 403 (No retry)
    - [MODEL_UNAVAILABLE]: 404, 410 (No retry)
    - [RATE_LIMIT]: 429 (Retry with backoff)
    - [SERVER_ERROR]: 5xx (Retry with backoff)
    """
    retry_delay = 1.0  # initial delay in seconds
    for attempt in range(max_retries + 1):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as response:
                return json.loads(response.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            if e.code in [401, 403]:
                print(f"❌ [AUTH_ERROR] {e.code}: {e.reason}", file=sys.stderr)
                return None
            if e.code in [404, 410]:
                print(f"❌ [MODEL_UNAVAILABLE] {e.code}: {e.reason}", file=sys.stderr)
                return None

            if attempt < max_retries:
                if e.code == 429:
                    print(f"⚠️  [RATE_LIMIT] 429: Retrying in {retry_delay:.1f}s... (Attempt {attempt + 1}/{max_retries})", file=sys.stderr)
                else:
                    print(f"⚠️  [SERVER_ERROR] {e.code}: Retrying in {retry_delay:.1f}s... (Attempt {attempt + 1}/{max_retries})", file=sys.stderr)

                time.sleep(retry_delay)
                retry_delay *= 2  # Exponential backoff
            else:
                print(f"❌ AI API failed after {max_retries} retries: {e}", file=sys.stderr)
                return None
        except (urllib.error.URLError, TimeoutError, ConnectionError) as e:
            if attempt < max_retries:
                print(f"⚠️  [NETWORK_ERROR] {e}: Retrying in {retry_delay:.1f}s... (Attempt {attempt + 1}/{max_retries})", file=sys.stderr)
                time.sleep(retry_delay)
                retry_delay *= 2
            else:
                print(f"❌ AI API Network error: {e}", file=sys.stderr)
                return None
        except Exception as e:
            print(f"❌ [UNKNOWN_ERROR] {e}", file=sys.stderr)
            return None
    return None

def is_ollama_available() -> bool:
    """Checks if Ollama service is reachable."""
    try:
        url = get_ollama_url()
        if not url.endswith("/"): url += "/"
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=2) as response:
            return response.getcode() == 200
    except Exception:
        return False

def call_ollama(prompt: str, model: str = None, url: Optional[str] = None, max_retries: int = 3, schema = None) -> Optional[str]:
    """Unified helper to call local Ollama API."""
    base_url = url or get_ollama_url()
    if not base_url.endswith("/"): base_url += "/"
    target_url = urllib.parse.urljoin(base_url, "api/generate")

    data = {"model": model or get_ollama_model(), "prompt": prompt, "stream": False}
    if schema:
        # Ollama/Qwen expects standard JSON schema with lowercase types
        data["format"] = to_standard_schema(schema, uppercase=False)

    req = urllib.request.Request(target_url, data=json.dumps(data).encode("utf-8"), headers={"Content-Type": "application/json"})
    res = _call_api_with_retry(req, max_retries=max_retries, timeout=900)
    return res.get("response") if res else None

def call_github_models(prompt: str, model: str = None, max_retries: int = 3, schema = None) -> Optional[str]:
    """Unified helper to call GitHub Models API (OpenAI-compatible)."""
    token = get_github_token()
    if not token: return None

    base_url = os.environ.get("GITHUB_MODELS_BASE_URL", "https://models.inference.ai.azure.com")
    if not base_url.endswith("/"): base_url += "/"
    target_url = urllib.parse.urljoin(base_url, "chat/completions")

    data = {"model": model or get_ai_model(), "messages": [{"role": "user", "content": prompt}], "stream": False}
    if schema:
        # OpenAI style: prompt injection + json_object mode
        norm_schema = to_standard_schema(schema, uppercase=False)
        data["response_format"] = {"type": "json_object"}
        data["messages"].insert(0, {
            "role": "system",
            "content": f"Output MUST be valid JSON matching this schema: {json.dumps(norm_schema)}"
        })

    req = urllib.request.Request(target_url, data=json.dumps(data).encode("utf-8"),
                                headers={"Content-Type": "application/json", "Authorization": f"Bearer {token}"})
    res = _call_api_with_retry(req, max_retries=max_retries)
    return res["choices"][0]["message"]["content"] if res and "choices" in res else None

def call_gemini(prompt: str, model: str = None, max_retries: int = 3, schema = None) -> Optional[str]:
    """Unified helper to call Gemini API."""
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key: return None

    target_url = f"https://generativelanguage.googleapis.com/v1beta/models/{model or 'gemini-1.5-flash'}:generateContent?key={api_key}"
    payload = {"contents": [{"parts": [{"text": prompt}]}]}
    if schema:
        # Gemini requires uppercase types in responseSchema
        payload["generationConfig"] = {
            "responseMimeType": "application/json",
            "responseSchema": to_standard_schema(schema, uppercase=True)
        }

    req = urllib.request.Request(target_url, data=json.dumps(payload).encode("utf-8"), headers={"Content-Type": "application/json"})
    res = _call_api_with_retry(req, max_retries=max_retries)
    if res and "candidates" in res and len(res["candidates"]) > 0:
        return res["candidates"][0]["content"]["parts"][0]["text"]
    return None

def call_ai_service(prompt: str, model: str = None, schema = None) -> Optional[str]:
    """
    Orchestrates AI calls: GitHub Models -> Gemini -> Ollama.
    """
    # 1. Try GitHub Models
    res = call_github_models(prompt, model=model, schema=schema)
    if res: return res

    # 2. Try Gemini
    res = call_gemini(prompt, schema=schema) # Gemini model naming is different, let it use default for now
    if res: return res

    # 3. Try Ollama (Fallback)
    if is_ollama_available():
        return call_ollama(prompt, model=model, schema=schema)

    return None

def run_command(cmd: Union[str, List[str]], shell: bool = False, check: bool = True, input_str: Optional[str] = None, log_on_error: bool = True) -> Union[str, subprocess.CompletedProcess]:
    """
    Unified command execution helper.
    - If check=True (default): returns stripped stdout string, raises CLIError on non-zero exit.
    - If check=False: returns CompletedProcess object.
    """
    proc = subprocess.run(
        cmd,
        shell=shell,
        input=input_str,
        capture_output=True,
        text=True,
        check=False
    )
    if proc.returncode != 0 and log_on_error:
        print(f"❌ Command failed (exit {proc.returncode}): {proc.args}", file=sys.stderr)
        if proc.stdout:
            print(f"--- stdout ---\n{proc.stdout.strip()}", file=sys.stderr)
        if proc.stderr:
            print(f"--- stderr ---\n{proc.stderr.strip()}", file=sys.stderr)

    if check:
        if proc.returncode != 0:
            raise CLIError(f"Command failed with exit code {proc.returncode}", code=proc.returncode)
        return proc.stdout.strip()

    return proc

def get_github_token() -> Optional[str]:
    """Retrieves the GitHub token from environment (prioritizing CODEX_GH_TOKEN) or via gh CLI."""
    token = os.getenv("CODEX_GH_TOKEN") or os.getenv("GH_TOKEN") or os.getenv("GITHUB_TOKEN") or os.getenv("PAT_TOKEN")
    if token:
        return token
    try:
        return run_command(["gh", "auth", "token"], log_on_error=False)
    except (CLIError, FileNotFoundError):
        return None

def get_repo_name() -> Optional[str]:
    """Auto-detect repo from environment variables or git remote."""
    repo = os.getenv("GITHUB_REPOSITORY") or os.getenv("GH_REPO")
    if repo:
        return repo

    try:
        # Using check=False here to avoid noisy logs for a common discovery step
        res = run_command(['git', 'config', '--get', 'remote.origin.url'], check=False, log_on_error=False)
        if res.returncode != 0:
            return os.getenv("GH_REPO")
        url = res.stdout.strip()
        if not url:
            return os.getenv("GH_REPO")
        import re
        match = re.search(r'[:/]([^/]+/[^/.]+)(\.git)?$', url)
        return match.group(1) if match else url
    except Exception:
        return None

class GHAConfigManager:
    """Manages GitHub Actions variables with local caching and robust error handling."""
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(GHAConfigManager, cls).__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if getattr(self, "_initialized", False):
            return
        self.config_path = os.path.join(os.path.dirname(__file__), "config.json")
        self.gh_available = None
        self.warned_auth = False
        self.warned_repo = False
        self.cache = self._load_cache()
        self._initialized = True

    def _load_cache(self) -> dict:
        if os.path.exists(self.config_path):
            try:
                with open(self.config_path, "r") as f:
                    return json.load(f)
            except Exception:
                return {}
        return {}

    def _save_cache(self):
        try:
            with open(self.config_path, "w") as f:
                json.dump(self.cache, f, indent=2)
        except Exception:
            pass

    def get_variable(self, name: str) -> Optional[str]:
        """Retrieves a variable, checking local cache first, then the gh CLI."""
        # 1. Check local cache
        if name in self.cache:
            return str(self.cache[name])

        # 2. Check gh CLI availability
        if self.gh_available is None:
            try:
                run_command(["gh", "--version"], log_on_error=False)
                self.gh_available = True
            except (CLIError, FileNotFoundError):
                self.gh_available = False

        if not self.gh_available:
            return None

        # 3. Fetch from gh CLI
        try:
            # First fetch all variables since 'gh variable get' is not a valid command
            result = run_command(
                ["gh", "variable", "list"],
                check=False,
                log_on_error=False
            )

            if result.returncode == 0:
                for line in result.stdout.splitlines():
                    parts = line.split('\t')
                    if len(parts) >= 2 and parts[0] == name:
                        val = parts[1].strip()
                        self.cache[name] = val
                        self._save_cache()
                        return val
                return None

            stderr = result.stderr.lower()
            if "not authenticated" in stderr or "not logged in" in stderr or "gh_token" in stderr:
                if not self.warned_auth:
                    print(f"⚠️  Warning: 'gh' CLI not authenticated. Run 'gh auth login' to fetch baselines.", file=sys.stderr)
                    self.warned_auth = True
            elif "could not find" in stderr:
                return None
            elif "no git repository" in stderr:
                if not self.warned_repo:
                    print(f"⚠️  Warning: Not a git repository or no remote configured for 'gh' CLI.", file=sys.stderr)
                    self.warned_repo = True
            elif "resource not accessible by integration" in stderr:
                print(f"⚠️  Warning: Cannot fetch variable '{name}' due to permissions.", file=sys.stderr)
                return None
            else:
                if result.stderr:
                    print(f"❌ Error fetching GHA variable '{name}': {result.stderr.strip()}", file=sys.stderr)
        except Exception as e:
            print(f"❌ Unexpected error calling 'gh' CLI: {e}", file=sys.stderr)

        return None

    def set_variable(self, name: str, value: str) -> bool:
        """Sets a variable using the gh CLI and updates local cache."""
        # 1. Update local cache
        self.cache[name] = value
        self._save_cache()

        # 2. Check gh CLI availability
        if self.gh_available is None:
            try:
                run_command(["gh", "--version"], log_on_error=False)
                self.gh_available = True
            except (CLIError, FileNotFoundError):
                self.gh_available = False

        if not self.gh_available:
            return False

        # 3. Set via gh CLI
        try:
            run_command(
                ["gh", "variable", "set", name, "--body", str(value)],
                log_on_error=True
            )
            return True
        except Exception as e:
            print(f"❌ Error setting GHA variable '{name}': {e}", file=sys.stderr)
            return False

def get_gha_variable(name: str) -> Optional[str]:
    """Helper function to retrieve a GHA variable via the global manager."""
    return GHAConfigManager().get_variable(name)

def set_gha_variable(name: str, value: str) -> bool:
    """Helper function to set a GHA variable via the global manager."""
    return GHAConfigManager().set_variable(name, value)

def extract_failing_info(logs: str) -> List[dict]:
    """Extracts failing test and build information from logs."""
    findings = []
    # TS Errors
    ts_errors = re.findall(r"([a-zA-Z0-9_\-\./]+\.[tj]sx?):(\d+):(\d+) - error (TS\d+): (.*)", logs)
    for file_path, line, col, code, msg in ts_errors:
        findings.append({"file": file_path, "line": line, "message": f"{code}: {msg}", "type": "typescript"})

    # Vitest Errors (Robust)
    # Matches FAIL followed by the test file, then non-greedily finds the first ❯ trace
    # (?!FAIL) ensures we don't skip over another FAIL block
    vitest_matches = re.finditer(r"FAIL\s+([^\n]+)(?:(?!FAIL).)*?❯\s+([^\n:]+):(\d+):(\d+)", logs, re.DOTALL)
    for m in vitest_matches:
        findings.append({
            "file": m.group(2),
            "line": m.group(3),
            "message": f"Test Failure in {m.group(1)}",
            "type": "vitest"
        })

    # Playwright Errors
    playwright_matches = re.finditer(r"\s*\d+\)\s+\[([^\]]+)\]\s+›\s+([^\s:]+):(\d+):(\d+)\s+›\s+(.*)", logs)
    for m in playwright_matches:
        findings.append({
            "file": m.group(2),
            "line": m.group(3),
            "message": f"Playwright [{m.group(1)}] › {m.group(5)}",
            "type": "playwright"
        })

    return findings

def clean_gha_logs(logs: str) -> str:
    """Removes GitHub Action noise from logs while preserving actual error messages."""
    if not logs:
        return ""

    lines = logs.splitlines()
    cleaned = []

    # Patterns to filter out after timestamp removal
    noise_patterns = [
        r'^\[command\].*',
        r'^##\[command\].*',
        r'^##\[warning\].*',
        r'^##\[error\]Process completed with exit code.*',
        r'^Removing credentials config.*',
        r'^Stop and remove container.*',
        r'^Remove container network.*',
        r'^Cleaning up orphan processes.*',
        r'^/usr/bin/docker.*',
    ]
    combined_noise = re.compile('|'.join(noise_patterns), re.IGNORECASE)

    for line in lines:
        # 1. Strip ANSI escape codes
        line = re.sub(r'\x1b\[[0-9;]*[mGKF]', '', line)

        # 2. Strip GHA timestamps
        line = re.sub(r'^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z\s+', '', line)

        # 3. Filter noise
        if not combined_noise.search(line) and line.strip():
            cleaned.append(line)

    return "\n".join(cleaned)

def get_github_client():
    from github import Github, Auth
    token = get_github_token()
    if not token:
        raise CLIError("GitHub token not found", code=401)
    return Github(auth=Auth.Token(token))

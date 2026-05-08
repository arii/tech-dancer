from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any


@dataclass(frozen=True)
class ProjectConfig:
    github_repo: str | None = None
    github_token_env: str = "GITHUB_TOKEN"
    gh_token_env: str = "GH_TOKEN"
    use_gemini_fallback: bool = True
    ollama_model: str = "llama3"
    ollama_base_url: str = "http://localhost:11434"
    jules_api_url: str | None = None



def _coerce_bool(value: Any, default: bool) -> bool:
    if isinstance(value, bool):
        return value
    if value is None:
        return default
    if isinstance(value, str):
        return value.strip().lower() in {"1", "true", "yes", "on"}
    return bool(value)



def load_project_config(path: str | Path = "dev-tools/project_config.json") -> ProjectConfig:
    p = Path(path)
    if not p.exists():
        return ProjectConfig()

    raw = json.loads(p.read_text(encoding="utf-8"))
    return ProjectConfig(
        github_repo=raw.get("github_repo") or raw.get("repo_name"),
        github_token_env=raw.get("github_token_env", "GITHUB_TOKEN"),
        gh_token_env=raw.get("gh_token_env", "GH_TOKEN"),
        use_gemini_fallback=_coerce_bool(raw.get("use_gemini_fallback"), True),
        ollama_model=raw.get("ollama_model", "llama3"),
        ollama_base_url=raw.get("ollama_base_url", "http://localhost:11434"),
        jules_api_url=raw.get("jules_api_url"),
    )

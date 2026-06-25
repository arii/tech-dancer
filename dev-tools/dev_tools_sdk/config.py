from __future__ import annotations

import json
import os
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Dict, List


@dataclass(frozen=True)
class ProjectConfig:
    github_repo: str | None = None
    github_token_env: str = "GITHUB_TOKEN"
    gh_token_env: str = "GH_TOKEN"
    jules_api_url: str | None = None
    core_dirs: List[str] = field(default_factory=lambda: ["src/layouts/", "src/components/"])
    monolithic_pr_threshold: int = 3
    base_branch: str = "origin/main"
    max_diff_chars: int = 40000
    content_scopes: Dict[str, str] = field(default_factory=lambda: {
        "resources": "content/resources/",
        "posts": "content/posts/",
        "blog": "content/blog/",
        "studies": "content/studies/"
    })
    ai_synthesis_model: str = "gpt-4o-mini"


def load_project_config(path: str | Path = "dev-tools/project_config.json") -> ProjectConfig:
    p = Path(path)

    if not p.exists():
        # Try to find it relative to this file if not found at path
        alt_path = Path(__file__).parent.parent / "project_config.json"
        if alt_path.exists():
            p = alt_path
        else:
            return ProjectConfig()

    try:
        raw = json.loads(p.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, IOError):
        return ProjectConfig()

    def get_list(key: str, default: List[str]) -> List[str]:
        val = raw.get(key, default)
        if isinstance(val, str):
            return [val]
        if isinstance(val, list):
            return [str(item) for item in val]
        return default

    def get_dict(key: str, default: Dict[str, str]) -> Dict[str, str]:
        val = raw.get(key, default)
        if isinstance(val, dict):
            return {str(k): str(v) for k, v in val.items()}
        return default

    return ProjectConfig(
        github_repo=raw.get("github_repo") or raw.get("repo_name"),
        github_token_env=raw.get("github_token_env", "GITHUB_TOKEN"),
        gh_token_env=raw.get("gh_token_env", "GH_TOKEN"),
        jules_api_url=raw.get("jules_api_url"),
        core_dirs=get_list("core_dirs", ["src/layouts/", "src/components/"]),
        monolithic_pr_threshold=int(raw.get("monolithic_pr_threshold", 3)),
        base_branch=raw.get("base_branch", "origin/main"),
        max_diff_chars=int(raw.get("max_diff_chars", 40000)),
        content_scopes=get_dict("content_scopes", {
            "resources": "content/resources/",
            "posts": "content/posts/",
            "blog": "content/blog/",
            "studies": "content/studies/"
        }),
        ai_synthesis_model=raw.get("ai_synthesis_model", "gpt-4o-mini"),
    )

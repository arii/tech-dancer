from __future__ import annotations

import json
import os
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Dict, List, Optional


@dataclass(frozen=True)
class ProjectConfig:
    github_repo: str | None = None
    github_token_env: str = "GITHUB_TOKEN"
    gh_token_env: str = "GH_TOKEN"
    jules_api_url: str | None = None
    core_dirs: List[str] = field(default_factory=list)
    monolithic_pr_threshold: int = 3
    base_branch: str = "origin/main"
    max_diff_chars: int = 40000
    content_scopes: Dict[str, str] = field(default_factory=dict)
    ai_synthesis_model: str = "gpt-4o-mini"
    ai_review_model: str = "gpt-4o"
    ai_vision_model: str = "gpt-4o"
    ui_indicators: List[str] = field(default_factory=list)
    tailwind_indicators: List[str] = field(default_factory=list)
    audit_check_dirs: List[str] = field(default_factory=list)
    allowed_bots: List[str] = field(default_factory=lambda: ["github-actions[bot]"])
    worktree_prefix: str = "bt-repair-"
    spec_sections: List[str] = field(default_factory=list)


    @property
    def base_branch_name(self) -> str:
        """Returns the base branch name without the remote prefix (e.g., 'main' for 'origin/main')."""
        if not self.base_branch:
            return "main"
        return self.base_branch.split('/')[-1]


def load_project_config(path: str | Path = "project_config.json") -> ProjectConfig:
    p = Path(path)

    raw = {}
    if p.exists():
        try:
            raw = json.loads(p.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, IOError):
            pass


    def get_list(key: str) -> Optional[List[str]]:
        val = raw.get(key)
        if val is None:
            return None
        if isinstance(val, str):
            return [val]
        if isinstance(val, list):
            return [str(item) for item in val]
        return None

    def get_dict(key: str) -> Optional[Dict[str, str]]:
        val = raw.get(key)
        if isinstance(val, dict):
            return {str(k): str(v) for k, v in val.items()}
        return None

    kwargs: Dict[str, Any] = {}

    # Critical Field Resolution (Fail-Fast Pattern)
    github_repo = raw.get("github_repo") or raw.get("repo_name") or os.environ.get("GITHUB_REPOSITORY") or os.environ.get("GH_REPO")
    if not github_repo and os.environ.get("CI") == "true":
        raise RuntimeError("Configuration Error: 'github_repo' must be defined in project_config.json or environment (GITHUB_REPOSITORY) in CI.")

    if github_repo:
        kwargs["github_repo"] = github_repo

    if "github_token_env" in raw:
        kwargs["github_token_env"] = raw["github_token_env"]
    if "gh_token_env" in raw:
        kwargs["gh_token_env"] = raw["gh_token_env"]
    if "jules_api_url" in raw:
        kwargs["jules_api_url"] = raw["jules_api_url"]
    if "monolithic_pr_threshold" in raw:
        kwargs["monolithic_pr_threshold"] = int(raw["monolithic_pr_threshold"])
    if "base_branch" in raw:
        kwargs["base_branch"] = raw["base_branch"]
    if "max_diff_chars" in raw:
        kwargs["max_diff_chars"] = int(raw["max_diff_chars"])
    if "ai_synthesis_model" in raw:
        kwargs["ai_synthesis_model"] = raw["ai_synthesis_model"]
    if "ai_review_model" in raw:
        kwargs["ai_review_model"] = raw["ai_review_model"]
    if "ai_vision_model" in raw:
        kwargs["ai_vision_model"] = raw["ai_vision_model"]
    if "worktree_prefix" in raw:
        kwargs["worktree_prefix"] = raw["worktree_prefix"]

    for list_key in [
        "core_dirs", "ui_indicators", "tailwind_indicators",
        "audit_check_dirs", "allowed_bots", "spec_sections"
    ]:
        val = get_list(list_key)
        if val is not None:
            kwargs[list_key] = val

    content_scopes = get_dict("content_scopes")
    if content_scopes is not None:
        kwargs["content_scopes"] = content_scopes

    return ProjectConfig(**kwargs)

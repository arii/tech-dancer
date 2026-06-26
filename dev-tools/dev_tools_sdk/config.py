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
    core_dirs: List[str] = field(default_factory=list)
    monolithic_pr_threshold: int = 3
    base_branch: str = "main"
    max_diff_chars: int = 40000
    content_scopes: Dict[str, str] = field(default_factory=dict)
    ai_synthesis_model: str = "gpt-4o-mini"
    ai_review_model: str = "gpt-4o"
    ai_vision_model: str = "gpt-4o"
    audit_check_dirs: List[str] = field(default_factory=list)
    spec_sections: List[str] = field(default_factory=list)
    worktree_prefix: str = "repair-"
    allowed_bots: List[str] = field(default_factory=lambda: ["github-actions[bot]"])

    def validate_config(self) -> None:
        """Ensures critical configuration fields are present and valid."""
        if not self.base_branch:
            raise ValueError("Configuration Error: 'base_branch' must not be empty.")
        if not isinstance(self.monolithic_pr_threshold, int) or self.monolithic_pr_threshold < 0:
            raise ValueError("Configuration Error: 'monolithic_pr_threshold' must be a non-negative integer.")


def load_project_config(path: str | Path = None) -> ProjectConfig:
    if path is None:
        path = "dev-tools/project_config.json"

    p = Path(path)

    if not p.exists():
        # Only try fallback if we are using the default path and it doesn't exist
        if path == "dev-tools/project_config.json":
            alt_path = Path(__file__).parent.parent / "project_config.json"
            if alt_path.exists():
                p = alt_path
            else:
                return ProjectConfig()
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

    config = ProjectConfig(
        github_repo=raw.get("github_repo") or raw.get("repo_name"),
        github_token_env=raw.get("github_token_env", "GITHUB_TOKEN"),
        gh_token_env=raw.get("gh_token_env", "GH_TOKEN"),
        jules_api_url=raw.get("jules_api_url"),
        core_dirs=get_list("core_dirs", []),
        monolithic_pr_threshold=int(raw.get("monolithic_pr_threshold", 3)),
        base_branch=raw.get("base_branch", "main"),
        max_diff_chars=int(raw.get("max_diff_chars", 40000)),
        content_scopes=get_dict("content_scopes", {}),
        ai_synthesis_model=raw.get("ai_synthesis_model", "gpt-4o-mini"),
        ai_review_model=raw.get("ai_review_model", "gpt-4o"),
        ai_vision_model=raw.get("ai_vision_model", "gpt-4o"),
        audit_check_dirs=get_list("audit_check_dirs", []),
        spec_sections=get_list("spec_sections", []),
        worktree_prefix=raw.get("worktree_prefix", "repair-"),
        allowed_bots=get_list("allowed_bots", ["github-actions[bot]"]),
    )
    config.validate_config()
    return config

# pylint: disable=import-outside-toplevel,line-too-long,missing-docstring,too-many-branches,too-many-instance-attributes,too-many-statements,use-maxsplit-arg
from __future__ import annotations
import subprocess
import re

import functools
import json
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Dict, List, Optional


@dataclass
class ProjectConfig:
    github_repo: str | None = None
    github_token_env: str = "GITHUB_TOKEN"
    jules_api_url: str | None = None
    core_dirs: List[str] = field(default_factory=lambda: ["src/layouts/", "src/components/"])
    monolithic_pr_threshold: int = 3
    base_branch: str = "origin/main"
    vite_base_path: str = "/tech-dancer/"
    gh_path: str = "gh"
    max_diff_chars: int = 40000
    content_scopes: Dict[str, str] = field(
        default_factory=lambda: {
            "resources": "content/resources/",
            "posts": "content/posts/",
            "blog": "content/blog/",
            "studies": "content/studies/",
        }
    )
    ai_synthesis_model: str = "gpt-4o-mini"
    ai_review_model: str = "gpt-4o"
    ai_vision_model: str = "gpt-4o"
    ai_token_input_limit: int = 800000
    ai_token_output_limit: int = 200000
    ai_token_total_limit: int = 1000000
    max_ci_duration_minutes: int = 15
    visual_snapshot_pixel_threshold: float = 0.1
    ui_indicators: List[str] = field(
        default_factory=lambda: [
            "src/components",
            "src/pages",
            "src/layouts",
            "src/index.css",
            "tailwind",
        ]
    )
    tailwind_indicators: List[str] = field(default_factory=lambda: ["px-", "py-", "mt-", "flex", "grid", "text-["])
    audit_check_dirs: List[str] = field(
        default_factory=lambda: [
            "src/features",
            "src/pages",
            "src/components",
            "src/layouts",
            "src/App.tsx",
        ]
    )
    cli_alias: str = "td-cli"
    default_limit: int = 10
    allowed_bots: List[str] = field(default_factory=lambda: ["github-actions[bot]"])
    worktree_prefix: str = "bt-repair-"
    pnpm_version: str = "10.28.2"
    infra_file_paths: List[str] = field(
        default_factory=lambda: [
            "scripts/",
            "boomtick-pkg/cli/",
            ".github/",
            "setup-agent.sh",
            "Dockerfile",
        ]
    )
    infra_feedback: str = (
        "- **Infrastructure/Bootstrap Change:** Low-level script changes detected.\n"
        "  - *Review focus:* Ensure idempotency, portability (avoid bashisms), and robust error handling (`set -e`, `set -u`).\n"
        "  - *Verification:* If full system setup is risky, verify via dry-runs, `bash -n`, or log inspection. Document verification method in the PR.\n"
    )
    temp_file_patterns: List[str] = field(
        default_factory=lambda: [
            r".*\.tmp$",
            r"^[^/]+\.py$",
            r".*audit.*\.md$",
            r".*dump.*\.json$",
            r".*\.jsonl$",
        ]
    )
    temp_file_feedback: str = (
        "- **Stray/Temporary Files:** Suspicious files (scripts, logs, audits) detected. "
        "Verify if these are intended to be committed.\n"
    )
    spec_sections: List[str] = field(
        default_factory=lambda: [
            "Problem Statement",
            "Goal",
            "Non-Goals",
            "Proposed Approach",
            "Alternatives Considered",
            "Architectural Impact",
            "Scope",
            "UNDERSTAND THE ISSUE",
            "DETERMINE APPROACH",
            "SPECIFY SCOPE",
            "DEFINITION OF DONE",
        ]
    )

    def __post_init__(self):
        """Validates configuration parameters after initialization."""
        # Validate visual snapshot threshold range [0.0, 1.0]
        if not 0.0 <= self.visual_snapshot_pixel_threshold <= 1.0:
            self.visual_snapshot_pixel_threshold = max(0.0, min(1.0, self.visual_snapshot_pixel_threshold))

    @property
    def base_branch_name(self) -> str:
        """Returns the base branch name without the remote prefix (e.g., 'main' for 'origin/main')."""
        if not self.base_branch:
            return "main"
        return self.base_branch.split("/")[-1]

    @property
    def context_builder_script(self) -> str:
        """Returns the absolute path to the context builder script."""
        from dev_tools.utils import resolve_resource_path

        return resolve_resource_path("build-repo-context.py")


@functools.lru_cache()
def get_config(path: str | Path = "project_config.json") -> ProjectConfig:
    """Returns a cached singleton instance of ProjectConfig."""
    return load_project_config(path)


@functools.lru_cache()
def _detect_repo_name() -> str | None:
    """Safely detects repository name from git remote."""
    try:
        res = subprocess.run(
            ["git", "config", "--get", "remote.origin.url"],
            capture_output=True,
            text=True,
            check=False,
        )
        if res.returncode != 0:
            return None
        url = res.stdout.strip()
        if not url:
            return None
        match = re.search(r"[:/]([^/]+/[^/.]+)(\.git)?$", url)
        return match.group(1) if match else url
    except Exception:
        return None


def load_project_config(path: str | Path = "project_config.json") -> ProjectConfig:
    p = Path(path)

    raw: Dict[str, Any] = {}
    if p.exists():
        try:
            raw = json.loads(p.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, IOError):
            pass
    elif path != "project_config.json":
        # If a specific path was requested but doesn't exist, return default
        return ProjectConfig()
    else:
        # Check parent directories for project_config.json if not in CWD
        # This helps when running from subdirectories
        current = Path.cwd()
        for parent in [current] + list(current.parents):
            check_path = parent / "project_config.json"
            if check_path.exists():
                try:
                    raw = json.loads(check_path.read_text(encoding="utf-8"))
                    break
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
    from dataclasses import fields

    if "github_repo" in raw or "repo_name" in raw:
        kwargs["github_repo"] = raw.get("github_repo") or raw.get("repo_name")
    else:
        kwargs["github_repo"] = _detect_repo_name() or "arii/tech-dancer"

    for f in fields(ProjectConfig):
        if f.name == "github_repo":
            continue

        if f.name in raw:
            raw_val = raw[f.name]
            # Handle typing dynamically
            if f.type in (int, 'int'):
                try:
                    kwargs[f.name] = int(raw_val)
                except (ValueError, TypeError):
                    pass
            elif f.type in (float, 'float'):
                try:
                    kwargs[f.name] = float(raw_val)
                except (ValueError, TypeError):
                    pass
            elif str(f.type).startswith('typing.List') or 'List[' in str(f.type):
                list_val = get_list(f.name)
                if list_val is not None:
                    kwargs[f.name] = list_val
            elif str(f.type).startswith('typing.Dict') or 'Dict[' in str(f.type):
                dict_val = get_dict(f.name)
                if dict_val is not None:
                    kwargs[f.name] = dict_val
            else:
                kwargs[f.name] = raw_val

    return ProjectConfig(**kwargs)

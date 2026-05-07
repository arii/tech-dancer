from pathlib import Path

from dev_tools_sdk.cli import build_parser
from dev_tools_sdk.config import load_project_config


def test_load_project_config_defaults_for_missing_file(tmp_path: Path):
    cfg = load_project_config(tmp_path / "missing.json")
    assert cfg.github_token_env == "GITHUB_TOKEN"
    assert cfg.gh_token_env == "GH_TOKEN"
    assert cfg.use_gemini_fallback is True


def test_cli_parser_supports_grouped_commands():
    parser = build_parser()
    args = parser.parse_args(["ai", "review", "42"])
    assert args.group == "ai"
    assert args.command == "review"
    assert args.pr == 42


def test_cli_parser_supports_env_verify():
    parser = build_parser()
    args = parser.parse_args(["env", "verify"])
    assert args.group == "env"
    assert args.command == "verify"

import pytest
from dev_tools.td_cli import main
import os
import sys
from unittest.mock import patch

def test_help_disabled_exits_cleanly(monkeypatch, capsys):
    """Ensure the CLI exits when help is called, without editing production files."""
    # Ensure ALLOW_HELP is not set in the environment for this test
    monkeypatch.delenv("ALLOW_HELP", raising=False)

    # Simulate invoking the CLI with the help flag
    monkeypatch.setattr("sys.argv", ["agent-cli", "--help"])

    with pytest.raises(SystemExit) as exit_info:
        main()

    assert exit_info.value.code == 1

    # Note: main() swallows stdout/stderr in the click entry point unless we read from sys directly
    # since we mock sys.argv, click prints its internal exit to stderr if it fails, but here
    # it exits in parse_args so it prints "FATAL: --help is disabled" to stderr
    # HOWEVER, main() in td_cli.py catches BaseException if it fails (not SystemExit usually)
    # Wait, main() catches Exception. SystemExit inherits from BaseException.
    # So SystemExit propagates directly!
    stderr = capsys.readouterr().err
    assert "FATAL: --help is disabled" in stderr

def test_help_enabled_does_not_exit_fatally(monkeypatch, capsys):
    """Ensure the CLI allows help when ALLOW_HELP is set."""
    monkeypatch.setenv("ALLOW_HELP", "1")
    monkeypatch.setattr("sys.argv", ["agent-cli", "--help"])

    # When click prints help, it exits with 0
    with pytest.raises(SystemExit) as exit_info:
        main()

    assert exit_info.value.code == 0
    # Help text gets printed to stdout
    stdout = capsys.readouterr().out
    assert "Usage:" in stdout

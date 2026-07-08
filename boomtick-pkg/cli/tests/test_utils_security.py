import os
import pytest
from dev_tools.utils import sanitize_path

def test_sanitize_path_basic():
    assert sanitize_path("src/features") == "src/features"
    assert sanitize_path("src\\features") == "src/features"
    assert sanitize_path("./src/features") == "src/features"

def test_sanitize_path_traversal():
    assert sanitize_path("../outside") == "outside"
    assert sanitize_path("../../outside") == "outside"
    assert sanitize_path("src/../../outside") == "outside"
    assert sanitize_path("/etc/passwd") == "passwd"
    assert sanitize_path("C:\\Windows\\System32") == "Windows/System32"

def test_sanitize_path_null_byte():
    assert sanitize_path("src/features\0.py") == "src/features"

def test_sanitize_path_characters():
    assert sanitize_path("src/feat ures!") == "src/features"
    assert sanitize_path("src/feat-ures_1.2") == "src/feat-ures_1.2"

def test_sanitize_path_length():
    long_path = "a" * 300
    sanitized = sanitize_path(long_path, max_length=10)
    assert len(sanitized) == 10
    assert sanitized == "a" * 10

def test_sanitize_path_absolute(monkeypatch):
    monkeypatch.setattr(os, "getcwd", lambda: "/app/repo")

    # Path inside repo
    assert sanitize_path("/app/repo/src/features") == "src/features"

    # Path outside repo
    assert sanitize_path("/etc/passwd") == "passwd"

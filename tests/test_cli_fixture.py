import json
import os
import subprocess
import sys
from pathlib import Path


def test_review_fixture_writes_expected_artifacts(tmp_path: Path) -> None:
    cmd = [
        sys.executable,
        "-m",
        "pr_review_pipeline",
        "review-fixture",
        "--pr-description",
        "tests/fixtures/pr_missing_test_plan.md",
        "--diff",
        "tests/fixtures/diff_accessibility_issue.patch",
        "--codex",
        "tests/fixtures/sample_codex.md",
        "--pr",
        "1791",
        "--repo",
        ".",
        "--mode",
        "dry-run",
    ]
    subprocess.run(cmd, check=True, env={**os.environ, "OUTPUT_DIR": str(tmp_path)})

    out = tmp_path / "pr-1791"
    assert (out / "spec_report.json").exists()
    assert (out / "review_report.json").exists()
    assert (out / "blocking_issues.json").exists()
    assert (out / "issue_preview.md").exists()

    spec = json.loads((out / "spec_report.json").read_text(encoding="utf-8"))
    issues = json.loads((out / "blocking_issues.json").read_text(encoding="utf-8"))
    assert any(f["requirement"] == "Test plan" and f["severity"] == "blocking" for f in spec["missing_requirements"])
    assert issues["issues"]

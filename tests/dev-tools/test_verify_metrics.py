# pylint: disable=missing-docstring
import json

from dev_tools.utils import verify_ci_metrics


def test_verify_metrics_no_logs(tmp_path, monkeypatch):
    # Mock current working directory to a temp path
    monkeypatch.chdir(tmp_path)

    # Run verification when logs don't exist
    result = verify_ci_metrics()
    assert result["status"] == "success"
    assert "No AI usage logs found" in result["message"]
    assert result["metrics"]["inputTokens"] == 0


def test_verify_metrics_success(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)

    # Create mock logs
    log_dir = tmp_path / ".boomtick" / "logs" / "ai"
    log_dir.mkdir(parents=True)
    log_file = log_dir / "review-run.jsonl"

    with open(log_file, "w", encoding="utf-8") as f:
        f.write(json.dumps({"inputTokens": 100, "outputTokens": 50}) + "\n")
        f.write(json.dumps({"inputTokens": 200, "outputTokens": 100}) + "\n")

    result = verify_ci_metrics(input_threshold=1000, output_threshold=500, total_threshold=2000)
    assert result["status"] == "success"
    assert result["metrics"]["inputTokens"] == 300
    assert result["metrics"]["outputTokens"] == 150
    assert result["metrics"]["totalTokens"] == 450


def test_verify_metrics_input_exceeded(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)

    log_dir = tmp_path / ".boomtick" / "logs" / "ai"
    log_dir.mkdir(parents=True)
    log_file = log_dir / "review-run.jsonl"

    with open(log_file, "w", encoding="utf-8") as f:
        f.write(json.dumps({"inputTokens": 160000, "outputTokens": 10}) + "\n")

    result = verify_ci_metrics(input_threshold=150000)
    assert result["status"] == "error"
    expected = "AI Token threshold exceeded: Input tokens (160000) exceeded limit (150000)"
    assert result["message"] == expected


def test_verify_metrics_total_exceeded(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)

    log_dir = tmp_path / ".boomtick" / "logs" / "ai"
    log_dir.mkdir(parents=True)
    log_file = log_dir / "review-run.jsonl"

    with open(log_file, "w", encoding="utf-8") as f:
        f.write(json.dumps({"inputTokens": 300, "outputTokens": 300}) + "\n")

    result = verify_ci_metrics(input_threshold=400, output_threshold=400, total_threshold=500)
    assert result["status"] == "error"
    expected = "AI Token threshold exceeded: Total tokens (600) exceeded limit (500)"
    assert result["message"] == expected


def test_verify_metrics_malformed_json(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)

    log_dir = tmp_path / ".boomtick" / "logs" / "ai"
    log_dir.mkdir(parents=True)
    log_file = log_dir / "review-run.jsonl"

    with open(log_file, "w", encoding="utf-8") as f:
        f.write("not json\n")

    result = verify_ci_metrics()
    assert result["status"] == "error"
    assert "Could not verify metrics" in result["message"]

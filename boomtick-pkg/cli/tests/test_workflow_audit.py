import os
import pytest
from dev_tools.orchestrator import Orchestrator

def test_check_workflow_compliance_no_violations(tmp_path):
    workflow_file = tmp_path / "compliant.yml"
    workflow_file.write_text("""
name: Compliant
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v4
        with:
          node-version-file: '.node-version'
      - run: pnpm install
      - run: pnpm test
""")
    orch = Orchestrator()
    violations = orch._check_workflow_compliance(str(workflow_file))
    assert len(violations) == 0

def test_check_workflow_compliance_with_violations(tmp_path):
    workflow_file = tmp_path / "non_compliant.yml"
    workflow_file.write_text("""
name: Non-compliant
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - run: npm install
      - run: npm run build
""")
    orch = Orchestrator()
    violations = orch._check_workflow_compliance(str(workflow_file))
    assert len(violations) == 4
    assert any("node-version:" in v for v in violations)
    assert any("npm" in v for v in violations)
    assert any("checkout@v2" in v for v in violations)
    assert any("setup-node@v3" in v for v in violations)

def test_scan_workflows(tmp_path, monkeypatch):
    workflow_dir = tmp_path / ".github" / "workflows"
    workflow_dir.mkdir(parents=True)
    (workflow_dir / "ci.yml").write_text("name: CI")
    (workflow_dir / "deploy.yaml").write_text("name: Deploy")
    (workflow_dir / "README.md").write_text("Not a workflow")

    real_exists = os.path.exists
    def mock_exists(path):
        if path == ".github/workflows":
            return True
        return real_exists(path)

    real_listdir = os.listdir
    def mock_listdir(path):
        if path == ".github/workflows":
            return real_listdir(str(workflow_dir))
        return real_listdir(path)

    monkeypatch.setattr(os.path, "exists", mock_exists)
    monkeypatch.setattr(os, "listdir", mock_listdir)

    orch = Orchestrator()
    workflows = orch._scan_workflows()
    assert len(workflows) == 2
    assert any("ci.yml" in f for f in workflows)
    assert any("deploy.yaml" in f for f in workflows)

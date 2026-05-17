with open("tests/dev-tools/test_fix_ci.py", "r") as f:
    c = f.read()

c = c.replace(
    "orch = Orchestrator()",
    "orch = Orchestrator()\n        orch._github = mock_client.return_value"
)
c = c.replace(
    "@patch('tdw_services.orchestrator.GitHubClient')",
    "@patch('tdw_services.orchestrator.get_github_client')"
)
c = c.replace(
    "mock_client.return_value.fetch_check_runs.return_value = []",
    "mock_client.return_value.fetch_check_runs.return_value = []\n        orch._github = mock_client.return_value"
)

with open("tests/dev-tools/test_fix_ci.py", "w") as f:
    f.write(c)

with open("tests/dev-tools/test_td_cli.py", "r") as f:
    c2 = f.read()

c2 = c2.replace(
    "orch.github = mock_github",
    "orch._github = mock_github.return_value"
)

with open("tests/dev-tools/test_td_cli.py", "w") as f:
    f.write(c2)

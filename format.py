with open("tests/dev-tools/test_fix_ci.py", "r") as f:
    c = f.read()

c = c.replace(
    "orch = Orchestrator()\n        orch._github = mock_client.return_value\n\n        # We will mock the whole get_github_client",
    "orch = Orchestrator()\n\n        # We will mock the whole get_github_client"
)

with open("tests/dev-tools/test_fix_ci.py", "w") as f:
    f.write(c)

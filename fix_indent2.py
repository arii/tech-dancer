with open("tests/dev-tools/test_fix_ci.py", "r") as f:
    c = f.read()

c = c.replace("            orch = Orchestrator()\n        orch._github = mock_client.return_value", "            orch = Orchestrator()\n            orch._github = mock_client.return_value")

with open("tests/dev-tools/test_fix_ci.py", "w") as f:
    f.write(c)

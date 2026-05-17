with open("tests/dev-tools/test_td_cli.py", "r") as f:
    c = f.read()

c = c.replace("            def test_validate_issue_dry_run_default(self, mock_get_client):", "    def test_validate_issue_dry_run_default(self, mock_get_client):")

with open("tests/dev-tools/test_td_cli.py", "w") as f:
    f.write(c)

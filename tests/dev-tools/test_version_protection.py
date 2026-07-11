# pylint: disable=missing-docstring
import os
import unittest

from dev_tools.verify_versions import compare_versions, parse_diff, verify_changes


class TestVersionProtection(unittest.TestCase):
    def test_compare_versions(self):
        self.assertEqual(compare_versions("1.2.3", "1.2.2"), 1)
        self.assertEqual(compare_versions("1.2.3", "1.2.3"), 0)
        self.assertEqual(compare_versions("1.2.2", "1.2.3"), -1)
        self.assertEqual(compare_versions("v7", "v4"), 1)
        self.assertEqual(compare_versions("24.x", "22.x"), 1)
        self.assertEqual(compare_versions("24.16.0", "24.x"), 1)  # Normalizes 24.x to 24.0

    def test_parse_diff_node(self):
        diff = """--- a/.nvmrc
+++ b/.nvmrc
-24.16.0
+22.0.0"""
        changes = parse_diff(diff)
        self.assertEqual(len(changes), 1)
        self.assertEqual(changes[0]["name"], "node")
        self.assertEqual(changes[0]["old"], "24.16.0")
        self.assertEqual(changes[0]["new"], "22.0.0")

    def test_parse_diff_pnpm(self):
        diff = """--- a/package.json
+++ b/package.json
-    "packageManager": "pnpm@10.28.2"
+    "packageManager": "pnpm@9.0.0" """
        changes = parse_diff(diff)
        self.assertEqual(len(changes), 1)
        self.assertEqual(changes[0]["name"], "pnpm")
        self.assertEqual(changes[0]["new"], "9.0.0")

    def test_parse_diff_action(self):
        diff = """--- a/.github/workflows/ci.yml
+++ b/.github/workflows/ci.yml
-      uses: actions/checkout@v7
+      uses: actions/checkout@v4"""
        changes = parse_diff(diff)
        self.assertEqual(len(changes), 1)
        self.assertEqual(changes[0]["name"], "actions/checkout")
        self.assertEqual(changes[0]["new"], "v4")

    def test_verify_downgrade(self):
        changes = [
            {
                "file": "package.json",
                "type": "dependency",
                "name": "pnpm",
                "old": "10.28.2",
                "new": "9.0.0",
            }
        ]
        findings = verify_changes(changes)
        self.assertTrue(any(f["type"] == "downgrade" for f in findings))
        self.assertTrue(any(f["severity"] == "error" for f in findings))

    def test_verify_node_hard_block(self):
        changes = [
            {
                "file": ".nvmrc",
                "type": "runtime",
                "name": "node",
                "old": "24.16.0",
                "new": "24.17.0",
            }
        ]
        if "ALLOW_NODE_VERSION_CHANGE" in os.environ:
            del os.environ["ALLOW_NODE_VERSION_CHANGE"]

        findings = verify_changes(changes)
        self.assertTrue(any(f["type"] == "hard_block" for f in findings))
        self.assertTrue(any(f["severity"] == "error" for f in findings))

    def test_verify_node_override(self):
        changes = [
            {
                "file": ".nvmrc",
                "type": "runtime",
                "name": "node",
                "old": "24.16.0",
                "new": "24.17.0",
            }
        ]
        os.environ["ALLOW_NODE_VERSION_CHANGE"] = "true"
        findings = verify_changes(changes)
        # Should NOT have hard_block because of override
        self.assertFalse(any(f["type"] == "hard_block" for f in findings))

    def test_skip_non_sensitive_files(self):
        diff = """--- a/src/App.tsx
+++ b/src/App.tsx
-    const version = "1.0.0";
+    const version = "0.9.0";"""
        changes = parse_diff(diff)
        self.assertEqual(len(changes), 0)

    def test_synthesized_diff(self):
        diff = """+++ b/package.json
+ "pnpm": "9.0.0" """
        changes = parse_diff(diff)
        self.assertEqual(len(changes), 1)
        self.assertEqual(changes[0]["name"], "pnpm")
        self.assertEqual(changes[0]["new"], "9.0.0")


if __name__ == "__main__":
    unittest.main()

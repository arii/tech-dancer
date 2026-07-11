# pylint: disable=missing-docstring
import unittest
from unittest.mock import MagicMock

from dev_tools.handlers.command_handler import CommandHandler


class TestCommandHandler(unittest.TestCase):
    def setUp(self):
        self.mock_orchestrator = MagicMock()
        self.handler = CommandHandler(self.mock_orchestrator)

    def test_handle_ai_review(self):
        # Setup
        pr_number = 123
        self.mock_orchestrator.review_pr.return_value = {
            "recommendation": "Approved",
            "reviewComment": "Looks good!",
        }

        # Execute
        result = self.handler.handle(pr_number, "/ai-review")

        # Verify
        self.assertEqual(result["status"], "success")
        self.assertIn("Submitted APPROVE review", result["message"])
        self.mock_orchestrator.review_pr.assert_called_once_with(pr_number)
        self.mock_orchestrator.github.create_review.assert_called_once()
        args, _ = self.mock_orchestrator.github.create_review.call_args
        # args[0]: pr_number, args[1]: body, args[2]: comments, args[3]: event
        self.assertEqual(args[0], pr_number)
        self.assertIn("Looks good!", args[1])
        self.assertEqual(args[3], "APPROVE")

    def test_handle_ai_fix_success(self):
        # Setup
        pr_number = 123
        self.mock_orchestrator.find_conflict_files.return_value = ["file1.ts"]
        self.mock_orchestrator.resolve_conflict.return_value = True

        # Execute
        result = self.handler.handle(pr_number, "/ai-fix")

        # Verify
        self.assertEqual(result["status"], "success")
        self.assertEqual(result["resolved"], ["file1.ts"])
        self.mock_orchestrator.find_conflict_files.assert_called_once()
        self.mock_orchestrator.resolve_conflict.assert_called_once_with("file1.ts")

    def test_handle_ai_fix_no_conflicts(self):
        # Setup
        pr_number = 123
        self.mock_orchestrator.find_conflict_files.return_value = []

        # Execute
        result = self.handler.handle(pr_number, "/ai-fix")

        # Verify
        self.assertEqual(result["status"], "error")
        self.assertIn("No merge conflicts detected", result["message"])

    def test_handle_unknown_command(self):
        # Execute
        result = self.handler.handle(123, "/unknown")

        # Verify
        self.assertEqual(result["status"], "ignored")
        self.assertIn("Unknown command", result["message"])


if __name__ == "__main__":
    unittest.main()

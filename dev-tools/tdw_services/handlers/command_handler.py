from typing import Dict, Any, Optional

class CommandHandler:
    def __init__(self, orchestrator):
        self.orchestrator = orchestrator

    def handle(self, pr_number: int, command_text: str, comment_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Parses and dispatches slash commands.
        """
        command = command_text.strip().lower()

        if command.startswith("/ollama-review"):
            return self.orchestrator._handle_ollama_review(pr_number)
        elif command.startswith("/ollama-fix"):
            return self.orchestrator._handle_ollama_fix(pr_number)

        return {"status": "ignored", "message": f"Unknown command: {command}"}

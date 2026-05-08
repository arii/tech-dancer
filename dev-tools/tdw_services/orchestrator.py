from typing import Dict, Any, List, Optional
import hashlib
import os

from tdw_services.services.github import GitHubClient
from tdw_services.services.gemini import LocalAIClient
from tdw_services.services.jules import JulesClient

class Orchestrator:
    def __init__(self):
        self.github = GitHubClient()
        self.ai = LocalAIClient()
        self.jules = JulesClient()

    def _hash_content(self, content: str) -> str:
        return hashlib.md5(content.encode('utf-8')).hexdigest()

    def review_pr(self, pr_number: int) -> Dict[str, Any]:
        """
        Fetches a PR, its diff, and generates a code review using LocalAI/Gemini.
        """
        pr_details = self.github.fetch_pr_details(pr_number)
        pr_diff = self.github.fetch_pr_diff(pr_number)

        # Basic hashing to simulate caching
        diff_hash = self._hash_content(pr_diff)
        cache_file = f"/tmp/review_cache_{pr_number}_{diff_hash}.json"

        if os.path.exists(cache_file):
            import json
            with open(cache_file, 'r') as f:
                return json.load(f)

        review_result = self.ai.generate_code_review(pr_details, pr_diff)

        import json
        with open(cache_file, 'w') as f:
            json.dump(review_result, f)

        return review_result

    def resolve_conflict(self, file_path: str) -> bool:
        """
        Detects merge conflicts via GitHubClient (implicit local git), analyzes logic with AI.
        """
        return self.ai.resolve_file_conflicts(file_path)

    def dispatch_jules_review(self, branch: str, prompt: str) -> Optional[Dict[str, Any]]:
        """
        Automates the creation of Jules sessions.
        """
        source_id = self.jules.discover_source_id(self.github.repo)
        if not source_id:
            raise ValueError(f"Could not find a Jules source mapping for repository: {self.github.repo}")

        session = self.jules.create_session_from_source(source_id, branch, prompt)
        return session

    def repair_ci(self, file_path: str, errors: List[str]) -> bool:
        """
        Agent loop to fix CI errors using local LLM.
        """
        if not os.path.exists(file_path):
            return False

        with open(file_path, "r") as f:
            content = f.read()

        error_msg = "\n".join(errors)
        prompt = f"""You are an expert software engineer. Fix the following error in {file_path}.
ERROR:
{error_msg}

CURRENT FILE CONTENT ({file_path}):
```typescript
{content}
```

INSTRUCTIONS:
1. Fix the error.
2. Provide ONLY the full corrected version of the file content.
3. Wrap your response in a single markdown code block.
4. No explanations.

REPAIRED CONTENT:
"""
        repaired_content = self.ai.generate(prompt)
        if not repaired_content:
            return False

        clean_content = self.ai.clean_llm_output(repaired_content)
        with open(file_path, "w") as f:
            f.write(clean_content)

        return True

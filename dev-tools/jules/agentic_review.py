#!/usr/bin/env python3
"""
Agentic Code Review Tool using Jules.
Fetches PRs, extracts changed methods/components, and asks Jules for specific reviews.
"""

import argparse
import json
import logging
import os
import re
import sys
import time
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Set, Tuple

# Adjust sys.path to include repo root for imports BEFORE importing common_config
sys.path.insert(0, str(Path(__file__).parent.parent.absolute()))

# Import unified configuration and client
try:
    from common_config import (
        setup_logging, setup_python_path, ensure_workspace,
        HRM_REPO_DIR, JULES_DEFAULT_SOURCE
    )
    from jules_client import get_jules_client
    from github_client import GitHubClient
except ImportError:
    # Fallback if running from root without package structure
    try:
        sys.path.append(os.getcwd())
        from common_config import (
            setup_logging, setup_python_path, ensure_workspace,
            HRM_REPO_DIR, JULES_DEFAULT_SOURCE
        )
        from jules_client import get_jules_client
        from github_client import GitHubClient
    except ImportError as e:
        print(f"Critical Error: Could not import core modules: {e}")
        sys.exit(1)

setup_python_path()
ensure_workspace()
logger = setup_logging("agentic_review", level=logging.INFO)

# --- Configuration ---
STATE_FILE = Path(".jules/review_state.json")
SUPPORTED_EXTENSIONS = {'.ts', '.tsx', '.js', '.jsx'}
IGNORE_FILES = {'package-lock.json', 'pnpm-lock.yaml', 'yarn.lock'}

# --- State Management ---
class ReviewState:
    def __init__(self, filepath: Path):
        self.filepath = filepath
        self.state: Dict[str, str] = {}  # pr_number -> commit_oid
        self.load()

    def load(self):
        if self.filepath.exists():
            try:
                with open(self.filepath, 'r') as f:
                    self.state = json.load(f)
            except json.JSONDecodeError:
                self.state = {}
        else:
            self.filepath.parent.mkdir(parents=True, exist_ok=True)
            self.state = {}

    def save(self):
        with open(self.filepath, 'w') as f:
            json.dump(self.state, f, indent=2)

    def should_review(self, pr_number: str, commit_oid: str) -> bool:
        last_oid = self.state.get(str(pr_number))
        return last_oid != commit_oid

    def mark_reviewed(self, pr_number: str, commit_oid: str):
        self.state[str(pr_number)] = commit_oid
        self.save()

# --- Parsing Logic ---
class BlockInfo:
    def __init__(self, start: int, header: str):
        self.start = start
        self.end = -1
        self.header = header

    @property
    def is_closed(self):
        return self.end != -1

    def __repr__(self):
        return f"Block({self.start}-{self.end}: {self.header})"

class SimpleTSParser:
    """
    Parses TS/JS content to find function/component definitions.
    """
    # Regex to identify lines that look like function/component definitions
    DEF_PATTERN = re.compile(
        r'^\s*(export\s+)?(default\s+)?(async\s+)?(function\s+\w+|const\s+\w+\s*=\s*(\(.*\)|async\s*\(.*\)|[a-zA-Z0-9_]+)\s*=>|class\s+\w+|[a-zA-Z0-9_]+\s*\(.*\)\s*\{?)'
    )

    def __init__(self, content: str):
        self.lines = content.splitlines()
        self.blocks = self._parse_blocks()

    def _parse_blocks(self) -> List[BlockInfo]:
        blocks = []
        stack: List[BlockInfo] = []

        for i, line in enumerate(self.lines):
            # Basic brace counting for the line
            # This is naive and fails on strings/comments containing braces, but sufficient for 80/20
            open_count = line.count('{')
            close_count = line.count('}')

            # Check if this line looks like a definition
            is_def = bool(self.DEF_PATTERN.search(line))

            # If we open more than we close, we are starting a block (or multiple)
            net_change = open_count - close_count

            if net_change > 0:
                for _ in range(net_change):
                    # For nested blocks on same line, only the first "counts" as the definition header usually
                    header = line.strip() if is_def else "BLOCK"
                    blk = BlockInfo(i + 1, header) # 1-based indexing
                    stack.append(blk)
                    if is_def: blocks.append(blk) # Only track "definitions" as meaningful blocks

            elif net_change < 0:
                for _ in range(abs(net_change)):
                    if stack:
                        blk = stack.pop()
                        blk.end = i + 1

        return blocks

    def get_enclosing_block(self, line_number: int) -> Optional[BlockInfo]:
        """Find the smallest definition block containing the line."""
        # blocks are stored in order of appearance (start line)
        # We want the one that starts before (or at) line_number and ends after (or at) line_number
        # and has the largest start line (innermost).

        candidate = None
        for b in self.blocks:
            if b.start <= line_number <= b.end:
                if candidate is None or b.start > candidate.start:
                    candidate = b
        return candidate

    def get_block_content(self, block: BlockInfo) -> str:
        # Convert 1-based to 0-based for slicing
        return "\n".join(self.lines[block.start-1 : block.end])

# --- Review Logic ---
class AgenticReviewer:
    def __init__(self, api_key: Optional[str] = None):
        self.jules = get_jules_client(api_key)
        self.gh = GitHubClient()
        self.state = ReviewState(STATE_FILE)

    def get_context_for_changes(self, file_content: str, changed_lines: List[int]) -> List[Tuple[BlockInfo, str]]:
        """
        Groups changed lines by their enclosing block and extracts content.
        Returns list of (BlockInfo, block_content).
        """
        parser = SimpleTSParser(file_content)
        contexts = {} # Map block_start -> (BlockInfo, set(changed_lines))

        for line in changed_lines:
            block = parser.get_enclosing_block(line)
            if block:
                if block.start not in contexts:
                    contexts[block.start] = (block, set())
                contexts[block.start][1].add(line)
            else:
                # Top-level change or unable to parse block
                pass

        # Return unique blocks
        results = []
        for block, _ in contexts.values():
            content = parser.get_block_content(block)
            results.append((block, content))
        return results

    def parse_diff_changed_lines(self, diff: str) -> List[int]:
        """Parse git diff to find line numbers in the NEW file that changed."""
        changed_lines = []
        current_line = 0

        for line in diff.splitlines():
            if line.startswith('@@'):
                # @@ -old_start,old_len +new_start,new_len @@
                match = re.search(r'\+(\d+)', line)
                if match:
                    current_line = int(match.group(1)) - 1 # We increment before using
            elif line.startswith('+') and not line.startswith('+++'):
                current_line += 1
                changed_lines.append(current_line)
            elif line.startswith('-') and not line.startswith('---'):
                pass # Removed line, doesn't map to new file line directly
            else:
                current_line += 1

        return changed_lines

    def process_pr(self, pr_number: int):
        pr = self.gh.get_pr(pr_number)
        if not pr:
            logger.error(f"Could not fetch PR #{pr_number}")
            return

        head_oid = pr['headRefOid']
        head_branch = pr['headRefName']
        base_branch = pr['baseRefName']

        if not self.state.should_review(str(pr_number), head_oid):
            logger.info(f"PR #{pr_number} already reviewed at {head_oid[:7]}. Skipping.")
            return

        logger.info(f"🔍 Reviewing PR #{pr_number} ({head_branch} -> {base_branch})")

        # Ensure we have the latest refs
        self.gh.fetch()

        # Identify changed files
        changed_files = self.gh.get_changed_files(f"origin/{base_branch}", f"origin/{head_branch}")

        reviews = []

        for filepath in changed_files:
            if filepath in IGNORE_FILES: continue
            _, ext = os.path.splitext(filepath)
            if ext not in SUPPORTED_EXTENSIONS: continue

            logger.info(f"  Analyzing {filepath}...")

            file_content = self.gh.get_file_content(f"origin/{head_branch}", filepath)
            diff = self.gh.get_diff(f"origin/{base_branch}", f"origin/{head_branch}", filepath)

            if not file_content or not diff:
                continue

            changed_lines = self.parse_diff_changed_lines(diff)
            blocks = self.get_context_for_changes(file_content, changed_lines)

            if not blocks:
                logger.info("    No specific method context found for changes (top-level?). Skipping granular review.")
                continue

            for block, method_content in blocks:
                logger.info(f"    🤖 Reviewing block: {block.header[:50]}...")

                suggestion = self.ask_jules(file_content, method_content, diff, filepath)
                if suggestion:
                    reviews.append(f"### {filepath}\n**Method:** `{block.header.strip()}`\n\n{suggestion}")

        if reviews:
            self.post_reviews(pr_number, reviews, head_oid)
            self.state.mark_reviewed(str(pr_number), head_oid)
        else:
            logger.info("  No suggestions generated.")
            self.state.mark_reviewed(str(pr_number), head_oid) # Mark as reviewed even if empty to avoid loops

    def ask_jules(self, full_code: str, method_code: str, change_diff: str, filename: str) -> Optional[str]:
        prompt = f"""
You are a senior React/Next.js developer reviewing pull requests.
Be short and concise. Look for possible bugs, improvements, and consistency issues.

Improve the code.

My entire file ({filename}):
```tsx
{full_code}
```

This is the method/component I'm changing:
```tsx
{method_code}
```

Please focus on this change:
```diff
{change_diff}
```

Add explanations of what you improved.
Use the following coding style:
- Functional components with hooks
- TypeScript best practices
- No defensive coding unless necessary
- Prefer early returns

Return ONLY the modified method/component code block followed by a brief bulleted list of explanation. Do not verify with "Here is the code".
"""
        session_name = self.jules.create_session(
            prompt,
            title=f"Review: {filename}",
            branch="main" # Context branch doesn't matter much as we inject code
        )

        if not session_name:
            return None

        # Monitor with a shorter timeout
        success = self.jules.monitor_session(session_name, timeout_minutes=5)

        if success:
            details = self.jules.get_session(session_name)
            # Extract last response model
            # Assuming the response is in the outputs or we need to fetch messages?
            # The current Client doesn't have "get_messages", but "monitor_session" prints outputs.
            # We need to extract the actual text response from Jules.
            # Let's inspect 'outputs' in the session details.
            if details and 'outputs' in details:
                 # Usually the last output is the response
                 for output in reversed(details['outputs']):
                     if 'text' in output:
                         return output['text']
        return None

    def post_reviews(self, pr_number: int, reviews: List[str], commit_oid: str):
        body = f"## 🤖 Jules Agentic Review\n\n_Reviewing commit {commit_oid[:7]}_\n\n"
        body += "\n---\n".join(reviews)

        body += "\n\n---\n"
        body += "### ✅ Pre-publish Checklist\n"
        body += "- [ ] Fetch latest changes: `git fetch origin`\n"
        body += "- [ ] Resolve merge conflicts if any\n"
        body += "- [ ] Verify build: `pnpm run build`\n"
        body += "- [ ] Verify lint: `pnpm lint`\n"
        body += "- [ ] Verify tests: `pnpm test:all`\n"

        logger.info(f"🚀 Posting comment to PR #{pr_number}")
        self.gh.post_pr_comment(pr_number, body)


def main():
    parser = argparse.ArgumentParser(description="Agentic Code Review")
    parser.add_argument("--pr", type=int, help="Specific PR number to review")
    parser.add_argument("--all", action="store_true", help="Review all open PRs")
    args = parser.parse_args()

    reviewer = AgenticReviewer()

    if args.pr:
        reviewer.process_pr(args.pr)
    else:
        # Default to all open PRs if not specified
        prs = reviewer.gh.list_prs(state="open")
        for pr in prs:
            reviewer.process_pr(pr['number'])

if __name__ == "__main__":
    main()

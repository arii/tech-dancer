#!/usr/bin/env python3
"""
Dispatch AI Agents to audit the HRM codebase and file GitHub issues.
"""

import sys
import re
import os
from pathlib import Path
from typing import List, Dict, Tuple, Optional

# Setup path
sys.path.append(str(Path(__file__).parent.parent))
from common_config import HRM_REPO_DIR, setup_logging
from github_client import GitHubClient

logger = setup_logging("dispatch_agents")

class Auditor:
    def __init__(self, name: str, client: GitHubClient):
        self.name = name
        self.client = client
        self.repo_dir = HRM_REPO_DIR

    def audit(self) -> Tuple[str, str]:
        """Performs the audit and returns (title, body)."""
        raise NotImplementedError

    def run(self):
        title, body = self.audit()
        logger.info(f"Agent {self.name} finished audit. Title: {title}")

        # Check if issue already exists
        existing_issues = self.client.list_issues(state="open", limit=100)
        for issue in existing_issues:
            if issue['title'] == title:
                logger.info(f"Issue '{title}' already exists (#{issue['number']}). Skipping.")
                return

        logger.info(f"Creating issue '{title}'...")
        result = self.client.create_issue(title, body)
        if result:
            logger.info(f"Created issue: {result}")
        else:
            logger.error("Failed to create issue.")

    def _check_file_exists(self, filepath: str) -> bool:
        return (self.repo_dir / filepath).exists()

    def _grep_file(self, filepath: str, pattern: str) -> List[str]:
        if not self._check_file_exists(filepath):
            return []
        found = []
        try:
            with open(self.repo_dir / filepath, 'r', encoding='utf-8') as f:
                for i, line in enumerate(f, 1):
                    if re.search(pattern, line):
                        found.append(f"{filepath}:{i}: {line.strip()}")
        except Exception as e:
            logger.warning(f"Error reading {filepath}: {e}")
        return found

class FrontendAuditor(Auditor):
    def audit(self) -> Tuple[str, str]:
        title = "[Audit] Frontend Architecture & UX Review"

        body_sections = ["## Summary", "This issue lists findings from the automated Frontend Architecture & UX audit."]

        # 1. Rendering Performance
        body_sections.append("## Component Optimization")
        body_sections.append("| Component | Issue | Fix |")
        body_sections.append("| --- | --- | --- |")

        # Check for 'use client' in app/
        client_components = []
        app_dir = self.repo_dir / "app"
        if app_dir.exists():
            for p in app_dir.rglob("*.tsx"):
                try:
                    content = p.read_text(encoding='utf-8')
                    if 'use client' in content:
                        rel_path = p.relative_to(self.repo_dir)
                        client_components.append(str(rel_path))
                except:
                    pass

        if client_components:
            for cc in client_components[:5]: # Limit to 5 examples
                body_sections.append(f"| `{cc}` | Marked as Client Component | Verify if necessary |")
        else:
             body_sections.append("| - | No explicit 'use client' directives found | - |")

        # 2. Material-UI Optimization
        body_sections.append("## Material-UI Optimization")
        sx_usage = []
        components_dir = self.repo_dir / "components"
        if components_dir.exists():
            for p in components_dir.rglob("*.tsx"):
                if "sx={" in p.read_text(encoding='utf-8', errors='ignore'):
                    sx_usage.append(str(p.relative_to(self.repo_dir)))

        if sx_usage:
            body_sections.append(f"Found `sx` prop usage in {len(sx_usage)} files. Consider extracting to styled-components for performance if critical.")
            body_sections.append("Example files:")
            for f in sx_usage[:3]:
                body_sections.append(f"- `{f}`")

        # 3. Accessibility
        body_sections.append("## UX/A11y Violations")
        body_sections.append("- [ ] Check `ControlPanel` for ARIA labels.")
        body_sections.append("- [ ] Check `SpotifyControls` for keyboard navigability.")

        return title, "\n\n".join(body_sections)

class QAAuditor(Auditor):
    def audit(self) -> Tuple[str, str]:
        title = "[Audit] Test Suite Robustness & Coverage"
        body_sections = ["## Summary", "Automated review of test strategy and coverage."]

        # 1. Test Stability
        body_sections.append("## Flakiness & Determinism Report")
        timeouts = []
        random_inputs = []
        isolation_issues = []

        tests_dir = self.repo_dir / "tests"
        if tests_dir.exists():
            for p in tests_dir.rglob("*.ts"):
                rel_path = str(p.relative_to(self.repo_dir))

                # Check for timeouts
                timeouts.extend(self._grep_file(rel_path, r"(page\.waitForTimeout|setTimeout|setInterval)"))

                # Check for random inputs
                random_inputs.extend(self._grep_file(rel_path, r"Math\.random"))

                # Check for serial mode (potential isolation issue)
                isolation_issues.extend(self._grep_file(rel_path, r"test\.describe\.serial"))

        if timeouts:
            body_sections.append("Found potential timing assumptions (waitForTimeout/setTimeout):")
            for t in timeouts:
                body_sections.append(f"- `{t}`")
        else:
            body_sections.append("No hardcoded timeouts found in `tests/`.")

        if random_inputs:
            body_sections.append("Found non-deterministic inputs (`Math.random`):")
            for r in random_inputs:
                body_sections.append(f"- `{r}`")

        if isolation_issues:
            body_sections.append("Found tests running in serial mode (check for isolation):")
            for i in isolation_issues:
                body_sections.append(f"- `{i}`")

        # 2. Coverage Gaps
        body_sections.append("## Coverage Gaps")
        features_md = self.repo_dir / "FEATURES.md"
        if features_md.exists():
            body_sections.append("`FEATURES.md` exists. Please cross-reference with `tests/playwright/` spec files.")
        else:
            body_sections.append("`FEATURES.md` missing. Unable to verify coverage against defined features.")

        # 3. Mocking Strategy
        body_sections.append("## Mocking Strategy Improvements")
        body_sections.append("- Evaluate external service mocking (Spotify API, WebSocket).")
        body_sections.append("- Ensure offline test capability.")

        return title, "\n\n".join(body_sections)

class CodeHygieneAuditor(Auditor):
    def audit(self) -> Tuple[str, str]:
        title = "[Audit] Code Hygiene & Operational Standards"
        body_sections = ["## Summary", "Automated code quality and hygiene check."]

        # 1. TypeScript Strictness
        body_sections.append("## Static Analysis Findings")
        tsconfig = self.repo_dir / "tsconfig.json"
        if tsconfig.exists():
            content = tsconfig.read_text(encoding='utf-8')
            if '"strict": true' in content:
                body_sections.append("- ✅ TypeScript Strict mode is enabled.")
            else:
                body_sections.append("- ❌ TypeScript Strict mode might be disabled or not explicitly set to true.")

        # 2. Server Operations
        body_sections.append("## Server/Security Misconfigurations")
        server_ts = self.repo_dir / "server.ts"
        if server_ts.exists():
             body_sections.append(f"- `server.ts` found. Review for error handling and PM2 integration.")
        else:
             body_sections.append("- `server.ts` not found.")

        # 3. Modern Syntax / Legacy Patterns
        body_sections.append("## Refactoring Targets (Legacy Patterns)")
        vars_found = []
        app_dir = self.repo_dir / "app"
        if app_dir.exists():
            for p in app_dir.rglob("*.ts*"):
                 found = self._grep_file(str(p.relative_to(self.repo_dir)), r"var\s+")
                 vars_found.extend(found)

        if vars_found:
            body_sections.append("Found usage of `var` (prefer `let`/`const`):")
            for v in vars_found[:5]:
                body_sections.append(f"- `{v}`")
        else:
            body_sections.append("No `var` usage found in `app/`.")

        return title, "\n\n".join(body_sections)

class DocumentationAuditor(Auditor):
    def audit(self) -> Tuple[str, str]:
        title = "[Audit] Documentation & Repository Structure"
        body_sections = ["## Summary", "Review of repository documentation and structure."]

        # 1. Structure
        body_sections.append("## Structure Refactoring Proposals")
        body_sections.append("Current top-level directories in `hrm`:")
        dirs = [d.name for d in self.repo_dir.iterdir() if d.is_dir() and not d.name.startswith('.')]
        body_sections.append(", ".join(dirs))
        body_sections.append("- Verify `app/` contains App Router routes.")
        body_sections.append("- Verify `components/` isolates UI logic.")

        # 2. Documentation Drift
        body_sections.append("## Missing Documentation")
        readme = self.repo_dir / "README.md"
        if not readme.exists():
            body_sections.append("- ❌ `README.md` is missing.")
        else:
            body_sections.append("- ✅ `README.md` exists.")

        docs_dir = self.repo_dir / "docs"
        if not docs_dir.exists():
            body_sections.append("- `docs/` directory not found. Consider adding architectural docs.")

        return title, "\n\n".join(body_sections)


def main():
    import argparse
    parser = argparse.ArgumentParser(description="Dispatch AI Agents")
    parser.add_argument("auditor", nargs="?", default="all", help="Specific auditor to run (frontend, qa, hygiene, docs)")
    parser.add_argument("--dry-run", action="store_true", help="Print issue content instead of creating on GitHub")
    args = parser.parse_args()

    try:
        client = GitHubClient()
    except Exception as e:
        logger.error(f"Failed to initialize GitHubClient: {e}")
        sys.exit(1)

    auditors = [
        FrontendAuditor("Frontend", client),
        QAAuditor("QA", client),
        CodeHygieneAuditor("Hygiene", client),
        DocumentationAuditor("Docs", client)
    ]

    for auditor in auditors:
        if args.auditor == "all" or args.auditor.lower() in auditor.name.lower():
            logger.info(f"Running {auditor.name} Auditor...")
            try:
                if args.dry_run:
                    title, body = auditor.audit()
                    print(f"\n--- [DRY RUN] {auditor.name} ---")
                    print(f"TITLE: {title}")
                    print("BODY:")
                    print(body)
                    print("-----------------------------")
                else:
                    auditor.run()
            except Exception as e:
                logger.error(f"Error running {auditor.name}: {e}")

if __name__ == "__main__":
    main()

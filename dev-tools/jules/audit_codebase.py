#!/usr/bin/env python3
"""
Automated Codebase Auditor.
Scans files for specific patterns to enforce frontend guidelines, security best practices, and code hygiene.
Includes optional Gemini LLM auditing if GEMINI_KEY is present.
"""

import argparse
import json
import os
import re
import sys
import time
import requests
from pathlib import Path
from typing import List, Dict, Any, Pattern

# Add parent directory to path to import common modules
current_dir = Path(__file__).resolve().parent
parent_dir = current_dir.parent
sys.path.insert(0, str(parent_dir))

try:
    from common_config import HRM_REPO_DIR, setup_logging, setup_python_path
    setup_python_path()
    logger = setup_logging("audit_codebase")
except ImportError:
    # Fallback if common_config is not found (e.g. running in isolation)
    import logging
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger("audit_codebase")
    HRM_REPO_DIR = Path("hrm")

class BaseAuditor:
    def __init__(self, name: str):
        self.name = name
        self.findings = []

    def audit(self, filepath: str, content: str):
        raise NotImplementedError

    def add_finding(self, filepath: str, message: str, line_num: int = 0):
        self.findings.append({
            "auditor": self.name,
            "file": filepath,
            "line": line_num,
            "message": message
        })

class FrontendAuditor(BaseAuditor):
    def __init__(self):
        super().__init__("Frontend")
        self.use_client_re = re.compile(r'^\s*["\']use client["\']', re.MULTILINE)
        self.sx_prop_re = re.compile(r'\bsx=\{')

    def audit(self, filepath: str, content: str):
        if not filepath.endswith(('.tsx', '.jsx', '.ts', '.js')):
            return

        # Check for 'use client' abuse
        if "utils/" in filepath and self.use_client_re.search(content):
            self.add_finding(filepath, "'use client' found in utils file. Utilities should generally be isomorphic.")

        # Check for 'sx' prop usage (performance)
        lines = content.splitlines()
        for i, line in enumerate(lines):
            if self.sx_prop_re.search(line):
                self.add_finding(filepath, "Avoid using 'sx' prop for performance. Use `styled` components or CSS modules.", i + 1)

class SecurityAuditor(BaseAuditor):
    def __init__(self):
        super().__init__("Security")
        self.unsafe_comparison_re = re.compile(r'===\s*process\.env\.')
        self.timing_safe_re = re.compile(r'crypto\.timingSafeEqual')

    def audit(self, filepath: str, content: str):
        if not filepath.endswith(('.ts', '.js', '.tsx')):
            return

        lines = content.splitlines()
        for i, line in enumerate(lines):
            if self.unsafe_comparison_re.search(line):
                self.add_finding(filepath, "Potential timing attack. Use `crypto.timingSafeEqual` for secret comparisons.", i + 1)

class HygieneAuditor(BaseAuditor):
    def __init__(self):
        super().__init__("Hygiene")
        self.var_re = re.compile(r'\bvar\s+')
        self.console_log_re = re.compile(r'console\.log\(')
        self.todo_re = re.compile(r'//\s*TODO')

    def audit(self, filepath: str, content: str):
        if not filepath.endswith(('.ts', '.js', '.tsx', '.jsx')):
            return

        lines = content.splitlines()
        for i, line in enumerate(lines):
            if self.var_re.search(line):
                self.add_finding(filepath, "Use `let` or `const` instead of `var`.", i + 1)

            if self.console_log_re.search(line):
                if "scripts/" not in filepath and "test" not in filepath:
                     self.add_finding(filepath, "Avoid `console.log` in production code. Use a logger.", i + 1)

            if self.todo_re.search(line):
                pass # TODO: Implement strict TODO checking

class GeminiAuditor(BaseAuditor):
    def __init__(self):
        super().__init__("Gemini")
        self.api_key = os.environ.get("GEMINI_KEY")
        self.model = "gemini-2.0-flash-lite-preview-02-05"
        self.url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent"

    def audit(self, filepath: str, content: str):
        if not self.api_key:
            return

        if not filepath.endswith(('.ts', '.tsx', '.js', '.jsx')):
            return

        logger.info(f"🤖 Gemini auditing {filepath}...")

        prompt = f"""
You are a senior software engineer. Analyze the following code file ({filepath}) for:
1. Critical security vulnerabilities (e.g. injection, secrets, race conditions).
2. Major performance bottlenecks (e.g. redundant calculations in render loops).
3. React/Next.js best practice violations (e.g. 'use client' misuse).

Return ONLY a JSON array of objects. No markdown formatting.
Format:
[
  {{ "line": <number>, "message": "<concise description>" }}
]

Code:
{content}
"""

        try:
            payload = {
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"responseMimeType": "application/json"}
            }

            response = requests.post(
                f"{self.url}?key={self.api_key}",
                json=payload,
                timeout=30
            )
            response.raise_for_status()

            result = response.json()
            if "candidates" in result and result["candidates"]:
                raw_text = result["candidates"][0]["content"]["parts"][0]["text"]
                # Clean up any potential markdown backticks if the model ignored instructions
                raw_text = raw_text.strip().replace("```json", "").replace("```", "")

                issues = json.loads(raw_text)
                for issue in issues:
                    self.add_finding(filepath, issue.get("message", "Issue detected"), issue.get("line", 0))

        except Exception as e:
            logger.warning(f"Gemini audit failed for {filepath}: {e}")


def scan_file(filepath: str, auditors: List[BaseAuditor]):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            for auditor in auditors:
                auditor.audit(filepath, content)
    except Exception as e:
        logger.warning(f"Failed to scan {filepath}: {e}")

def main():
    parser = argparse.ArgumentParser(description="Audit codebase for patterns.")
    parser.add_argument('files', nargs='*', help='Specific files to scan. If empty, scans relevant files in repo.')
    parser.add_argument('--json', action='store_true', help='Output results as JSON')
    parser.add_argument('--no-llm', action='store_true', help='Disable LLM/Gemini audit even if key is present')

    args = parser.parse_args()

    auditors = [
        FrontendAuditor(),
        SecurityAuditor(),
        HygieneAuditor()
    ]

    # Add Gemini Auditor if Key is present and not disabled
    if os.environ.get("GEMINI_KEY") and not args.no_llm:
        auditors.append(GeminiAuditor())
    elif not args.no_llm:
        logger.info("Gemini Auditor skipped (GEMINI_KEY not found)")

    files_to_scan = []
    if args.files:
        files_to_scan = [f for f in args.files if os.path.isfile(f)]
    else:
        # Scan everything in hrm/ (excluding node_modules, etc)
        start_dir = HRM_REPO_DIR
        for root, dirs, files in os.walk(start_dir):
            # Prune directories
            dirs[:] = [d for d in dirs if d not in ['node_modules', '.next', '.git', 'dist', 'build']]
            for file in files:
                if file.endswith(('.ts', '.tsx', '.js', '.jsx')):
                     files_to_scan.append(os.path.join(root, file))

    logger.info(f"Scanning {len(files_to_scan)} files...")

    # If using Gemini, limit the number of files if we are scanning the whole repo to avoid rate limits/costs
    # But if specific files were passed (like from process_pr), we assume it's a small set.
    if any(isinstance(a, GeminiAuditor) for a in auditors) and not args.files:
        logger.warning("Running Gemini on ENTIRE repo. This might be slow and costly. Limiting to first 5 files.")
        files_to_scan = files_to_scan[:5]

    for filepath in files_to_scan:
        # Use relative path for reporting if possible
        try:
            rel_path = os.path.relpath(filepath, os.getcwd())
        except ValueError:
            rel_path = filepath
        scan_file(filepath, auditors)

    all_findings = []
    for auditor in auditors:
        all_findings.extend(auditor.findings)

    if args.json:
        print(json.dumps(all_findings, indent=2))
    else:
        if not all_findings:
            print("✅ No issues found.")
        else:
            print(f"⚠️  Found {len(all_findings)} issues:")
            for f in all_findings:
                print(f"[{f['auditor']}] {f['file']}:{f['line']} - {f['message']}")
            sys.exit(1)

if __name__ == "__main__":
    main()

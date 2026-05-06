#!/usr/bin/env python3
"""
repair.py - Agentic CI Repair via Local LLM (Ollama)
Part of the Tech-Dancer 'Self-Healing' CI pipeline.
"""

import os
import sys
import json
import re
import urllib.request
import urllib.error
from typing import List, Dict, Any
from utils import run_command

OLLAMA_URL = os.environ.get("OLLAMA_URL", "http://localhost:11434/api/generate")
MODEL = os.environ.get("OLLAMA_MODEL", "qwen2.5-coder:1.5b")
MAX_RETRIES = 3

def log(msg):
    print(f"🤖 [Repair Agent] {msg}")

def get_ollama_response(prompt):
    data = {
        "model": MODEL,
        "prompt": prompt,
        "stream": False
    }
    req = urllib.request.Request(
        OLLAMA_URL,
        data=json.dumps(data).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req) as f:
            response = json.loads(f.read().decode("utf-8"))
            return response.get("response", "")
    except urllib.error.URLError as e:
        log(f"Error connecting to Ollama: {e}")
        return None

def extract_imports(content: str) -> List[str]:
    """Basic extraction of local imports to provide context."""
    imports = re.findall(r"import .* from ['\"](\./.*|@/.*)['\"]", content)
    return imports

def get_file_context(file_path: str, seen_files: set) -> str:
    """Recursively (depth=1) gather content of imported files."""
    if not os.path.exists(file_path) or file_path in seen_files:
        return ""

    seen_files.add(file_path)
    try:
        with open(file_path, 'r') as f:
            content = f.read()

        context = f"\n--- Context File: {file_path} ---\n{content}\n"
        # We don't go deeper to avoid prompt bloat
        return context
    except:
        return ""

def parse_eslint_json(json_path: str) -> List[Dict[str, Any]]:
    if not os.path.exists(json_path):
        return []
    try:
        with open(json_path, 'r') as f:
            data = json.load(f)

        findings = []
        for file_entry in data:
            file_path = file_entry['filePath']
            # Convert absolute path to relative if needed
            if file_path.startswith(os.getcwd()):
                file_path = os.path.relpath(file_path, os.getcwd())

            for msg in file_entry.get('messages', []):
                if msg.get('severity') >= 2: # Error
                    findings.append({
                        "file": file_path,
                        "line": msg.get('line'),
                        "message": f"{msg.get('message')} ({msg.get('ruleId')})",
                        "type": "eslint"
                    })
        return findings
    except:
        return []

def parse_audit_json(data: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Parses anti-pattern audit JSON output."""
    findings = []
    violations = data.get("violations", {})
    for file_path, file_violations in violations.items():
        for v in file_violations:
            findings.append({
                "file": file_path,
                "line": v.get('line'),
                "message": f"{v.get('pattern')}: {v.get('message')} (value: {v.get('value', 'N/A')})",
                "type": "anti-pattern"
            })
    return findings

def extract_failing_info(logs):
    findings = []
    # Try parsing as JSON first
    if "{" in logs and "}" in logs:
        try:
            start = logs.find("{")
            end = logs.rfind("}") + 1
            data = json.loads(logs[start:end])
            if "violations" in data:
                return parse_audit_json(data)
        except json.JSONDecodeError:
            pass

    # TS Errors
    ts_errors = re.findall(r"([a-zA-Z0-9_\-\./]+\.[tj]sx?):(\d+):(\d+) - error (TS\d+): (.*)", logs)
    for file_path, line, col, code, msg in ts_errors:
        findings.append({"file": file_path, "line": line, "message": f"{code}: {msg}", "type": "typescript"})

    # Vitest Errors (Basic)
    vitest_matches = re.finditer(r"FAIL\s+(.*?)\n.*?❯ (.*?):(\d+):(\d+)", logs)
    for m in vitest_matches:
        findings.append({
            "file": m.group(2),
            "line": m.group(3),
            "message": f"Test Failure in {m.group(1)}",
            "type": "vitest"
        })

    return findings

def construct_prompt(file_path, file_content, error_msg, context="", attempt=0):
    retry_msg = ""
    if attempt > 0:
        retry_msg = f"\nATTENTION: This is attempt {attempt + 1}. Previous attempts failed to resolve the issue. Please re-examine carefully.\n"

    return f"""
You are an expert software engineer specializing in React, TypeScript, and Tailwind CSS.
Fix the following issues in {file_path}. Pay close attention to design system tokens and layout primitives.

{retry_msg}
ERRORS/VIOLATIONS:
{error_msg}

{f"ADDITIONAL CONTEXT FILES Content:{context}" if context else ""}

CURRENT FILE CONTENT ({file_path}):
```typescript
{file_content}
```

INSTRUCTIONS:
1. Fix the error.
2. Provide ONLY the full corrected version of the file content.
3. Wrap your response in a single markdown code block.
4. No explanations.

REPAIRED CONTENT:
"""

def apply_fix(file_path, new_content):
    match = re.search(r"```(?:typescript|tsx|jsx|javascript|json)?\n(.*?)\n```", new_content, re.DOTALL)
    content_to_write = match.group(1) if match else new_content.strip()
    with open(file_path, "w") as f:
        f.write(content_to_write)

def run_verification():
    """Runs lightweight checks to verify if fixes worked."""
    log("Running verification checks...")
    results = {}
    # Check Oxlint (Fast)
    # Use run_command with check=False to gather both stdout and stderr
    res_ox = run_command(["pnpm", "run", "lint:ox"], check=False)
    results['oxlint'] = res_ox.stdout + res_ox.stderr
    # Check Typescript
    res_tsc = run_command(["pnpm", "run", "type-check"], check=False)
    results['tsc'] = res_tsc.stdout + res_tsc.stderr
    return results

def agent_loop(file_path, initial_errors):
    current_errors = initial_errors
    seen_files_context = {file_path}

    for attempt in range(MAX_RETRIES):
        log(f"Attempt {attempt + 1} for {file_path}")

        with open(file_path, "r") as f:
            content = f.read()

        # Gather context for imports
        context_str = ""
        imports = extract_imports(content)
        base_dir = os.path.dirname(file_path)
        for imp in imports:
            target = ""
            if imp.startswith('.'):
                target = os.path.normpath(os.path.join(base_dir, imp))
            elif imp.startswith('@/'):
                target = os.path.normpath(os.path.join('src', imp[2:]))

            if target:
                for ext in ['.ts', '.tsx', '.js', '.jsx']:
                    if os.path.exists(target + ext):
                        context_str += get_file_context(target + ext, seen_files_context)
                        break

        prompt = construct_prompt(file_path, content, "\n".join(current_errors), context_str, attempt=attempt)
        repaired_content = get_ollama_response(prompt)

        if not repaired_content:
            log(f"Failed to get response from LLM for {file_path}")
            break

        apply_fix(file_path, repaired_content)

        # Verify
        verify_results = run_verification()

        # Extract new errors for this file
        new_findings = extract_failing_info(verify_results['oxlint'] + verify_results['tsc'])
        new_errors = [f["message"] for f in new_findings if f["file"] == file_path]

        if not new_errors:
            log(f"✅ Fixed all identified errors in {file_path}")
            return True
        else:
            log(f"⚠️ Still has {len(new_errors)} errors in {file_path}. Retrying...")
            current_errors = new_errors

    return False

def main():
    json_findings = []
    if "--eslint-json" in sys.argv:
        idx = sys.argv.index("--eslint-json")
        json_findings = parse_eslint_json(sys.argv[idx+1])

    logs = sys.stdin.read() if "--stdin" in sys.argv else ""
    if not logs and len(sys.argv) > 1:
        # Check if the argument is a file or raw JSON
        if os.path.exists(sys.argv[1]):
            with open(sys.argv[1], "r") as f:
                logs = f.read()
        else:
            logs = sys.argv[1]

    findings = json_findings + extract_failing_info(logs)

    if not findings:
        log("No actionable errors found.")
        sys.exit(0)

    files_to_fix = {}
    for f in findings:
        if f["file"] not in files_to_fix:
            files_to_fix[f["file"]] = []
        files_to_fix[f["file"]].append(f["message"])

    for file_path, errors in files_to_fix.items():
        if not os.path.exists(file_path):
            continue
        agent_loop(file_path, errors)

if __name__ == "__main__":
    main()

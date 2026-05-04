#!/usr/bin/env python3
"""
repair.py - Autonomous CI Repair via Local LLM (Ollama)
Part of the Tech-Dancer 'Self-Healing' CI pipeline.
"""

import os
import sys
import json
import re
import subprocess
import urllib.request
import urllib.error

OLLAMA_URL = os.environ.get("OLLAMA_URL", "http://localhost:11434/api/generate")
MODEL = os.environ.get("OLLAMA_MODEL", "qwen2.5-coder:1.5b")

def log(msg):
    print(f"🤖 [Repair] {msg}")

def run_command(cmd, shell=False):
    try:
        result = subprocess.run(cmd, shell=shell, capture_output=True, text=True, check=True)
        return result.stdout
    except subprocess.CalledProcessError as e:
        return e.stdout + e.stderr

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

def extract_failing_info(logs):
    """
    Simple log parser to extract file paths and error messages.
    Focuses on standard lint/type errors for now.
    """
    findings = []
    # Match patterns like: src/path/to/file.tsx:line:col - error TS1234: Message
    ts_errors = re.findall(r"([a-zA-Z0-9_\-\./]+\.[tj]sx?):(\d+):(\d+) - error (TS\d+): (.*)", logs)
    for file_path, line, col, code, msg in ts_errors:
        findings.append({
            "file": file_path,
            "line": line,
            "message": f"{code}: {msg}"
        })

    # ESLint patterns: /path/to/file.tsx\n  line:col  error  Message  rule
    eslint_matches = re.finditer(r"([a-zA-Z0-9_\-\./]+\.[tj]sx?)\n\s+(\d+):(\d+)\s+error\s+(.*?)\s+([\w/-]+)", logs)
    for m in eslint_matches:
        findings.append({
            "file": m.group(1),
            "line": m.group(2),
            "message": f"{m.group(4)} ({m.group(5)})"
        })

    return findings

def construct_prompt(file_path, file_content, error_msg):
    return f"""
You are an expert software engineer specializing in React, TypeScript, and Tailwind CSS.
You are part of an autonomous CI repair loop. Your task is to fix a specific error in a file.

FILE: {file_path}
ERROR: {error_msg}

CURRENT FILE CONTENT:
```typescript
{file_content}
```

INSTRUCTIONS:
1. Identify the cause of the error.
2. Provide ONLY the corrected version of the file content.
3. Wrap your response in a single markdown code block.
4. Do not include any explanations or other text.

REPAIRED CONTENT:
"""

def apply_fix(file_path, new_content):
    # Extract content from markdown code block if present
    match = re.search(r"```(?:typescript|tsx|jsx|javascript|json)?\n(.*?)\n```", new_content, re.DOTALL)
    if match:
        content_to_write = match.group(1)
    else:
        content_to_write = new_content.strip()

    with open(file_path, "w") as f:
        f.write(content_to_write)
    log(f"Applied fix to {file_path}")

def main():
    if len(sys.argv) < 2:
        log("Usage: repair.py <path_to_logs_file> or repair.py --stdin")
        sys.exit(1)

    if sys.argv[1] == "--stdin":
        logs = sys.stdin.read()
    else:
        with open(sys.argv[1], "r") as f:
            logs = f.read()

    findings = extract_failing_info(logs)
    if not findings:
        log("No actionable errors found in logs.")
        # Try a fallback: look for ANY file paths that seem relevant
        sys.exit(0)

    # Dedup findings by file
    files_to_fix = {}
    for f in findings:
        if f["file"] not in files_to_fix:
            files_to_fix[f["file"]] = []
        files_to_fix[f["file"]].append(f["message"])

    for file_path, errors in files_to_fix.items():
        if not os.path.exists(file_path):
            log(f"File not found: {file_path}")
            continue

        log(f"Attempting to fix {file_path} (Errors: {', '.join(errors)})")
        with open(file_path, "r") as f:
            content = f.read()

        prompt = construct_prompt(file_path, content, "\n".join(errors))
        repaired_content = get_ollama_response(prompt)

        if repaired_content:
            apply_fix(file_path, repaired_content)
        else:
            log(f"Failed to get repair for {file_path}")

if __name__ == "__main__":
    main()

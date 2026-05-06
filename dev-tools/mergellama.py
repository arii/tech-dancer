#!/usr/bin/env python3
"""
mergellama.py - Automated Merge Conflict Resolution via Local LLM (Ollama)
Part of the Tech-Dancer 'Self-Healing' CI pipeline.
"""

import os
import sys
import json
import re
import urllib.request
import urllib.error
from typing import Optional

OLLAMA_URL = os.environ.get("OLLAMA_URL", "http://localhost:11434/api/generate")
MODEL = os.environ.get("OLLAMA_MODEL", "qwen2.5-coder:7b")

def log(msg):
    print(f"🦙 [MergeLlama] {msg}")

def get_ollama_response(prompt: str) -> Optional[str]:
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

def clean_llm_output(text: str) -> str:
    """Removes markdown code blocks if present."""
    match = re.search(r"```(?:[a-zA-Z0-9]+)?\n(.*?)\n```", text, re.DOTALL)
    if match:
        return match.group(1).strip()
    return text.strip()

def resolve_file_conflicts(file_path: str) -> bool:
    if not os.path.exists(file_path):
        log(f"File not found: {file_path}")
        return False

    with open(file_path, 'r') as f:
        content = f.read()

    pattern = "<<<" + "<<<" + "<"
    if pattern not in content:
        log(f"No conflict markers found in {file_path}")
        return True

    log(f"Attempting to resolve conflicts in {file_path}...")

    prompt = f"""Resolve the Git merge conflicts in this code. Output ONLY the clean, merged code without markers or explanation.

FILE CONTENT:
{content}

REPAIRED CONTENT:
"""

    resolved = get_ollama_response(prompt)
    if not resolved:
        log(f"Failed to get resolution for {file_path}")
        return False

    cleaned_code = clean_llm_output(resolved)

    if pattern in cleaned_code:
        log(f"LLM failed to remove markers in {file_path}")
        return False

    with open(file_path, 'w') as f:
        f.write(cleaned_code)
        f.write('\n') # Ensure newline at EOF

    log(f"✅ Successfully resolved conflicts in {file_path}")
    return True

def main():
    if len(sys.argv) < 2:
        print("Usage: mergellama.py <file_path1> [file_path2 ...]")
        sys.exit(1)

    success = True
    for file_path in sys.argv[1:]:
        if not resolve_file_conflicts(file_path):
            success = False

    if not success:
        sys.exit(1)

if __name__ == "__main__":
    main()

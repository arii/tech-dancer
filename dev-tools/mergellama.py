#!/usr/bin/env python3
"""
mergellama.py - Automated Merge Conflict Resolution via Local LLM (Ollama)
Part of the Tech-Dancer 'Self-Healing' CI pipeline.
"""

import os
import sys
import re
import json
import time
import urllib.request
import urllib.error
from typing import Optional
from utils import CLIError

MODEL = os.environ.get("OLLAMA_MODEL", "qwen2.5-coder:7b")
MAX_RETRIES = 3

def call_ollama(prompt: str, model: str) -> Optional[str]:
    url = os.environ.get("OLLAMA_URL", "http://localhost:11434/api/generate")
    data = {
        "model": model,
        "prompt": prompt,
        "stream": False
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            with urllib.request.urlopen(req, timeout=120) as response:
                res_data = json.loads(response.read().decode("utf-8"))
                return res_data.get("response")
        except Exception as e:
            if attempt == MAX_RETRIES:
                log(f"API call failed after {MAX_RETRIES} attempts: {e}")
                return None
            sleep_time = 2 ** attempt
            log(f"API call failed ({e}). Retrying in {sleep_time}s...")
            time.sleep(sleep_time)
MOCK_MODE = os.environ.get("MERGELLAMA_MOCK", "false").lower() == "true"
CONFLICT_MARKER = "<<<<<<<"

def log(msg):
    print(f"🦙 [MergeLlama] {msg}")

def clean_llm_output(text: str) -> str:
    """Removes markdown code blocks if present."""
    # Robustly handles fenced blocks with or without language tags
    match = re.search(r"```(?:\w+)?\n(.*?)\n```", text, re.DOTALL)
    if match:
        return match.group(1).strip()
    return text.strip()

def resolve_file_conflicts(file_path: str) -> bool:
    if not os.path.exists(file_path):
        log(f"File not found: {file_path}")
        return False

    try:
        with open(file_path, 'r') as f:
            content = f.read()

        if CONFLICT_MARKER not in content:
            log(f"No conflict markers found in {file_path}")
            return True

        log(f"Attempting to resolve conflicts in {file_path}...")

        if MOCK_MODE:
            # Keep HEAD version in mock mode
            mock_pattern = r"<<<<<<<.*?\n(.*?)\n=======.*?\n>>>>>>>.*?\n"
            resolved = re.sub(mock_pattern, r"\1\n", content, flags=re.DOTALL)
            log("Simulated resolution applied.")
        else:
            prompt = f"""Resolve the Git merge conflicts in this code. Output ONLY the clean, merged code without markers or explanation.

FILE CONTENT:
{content}

REPAIRED CONTENT:
"""
            raw_response = call_ollama(prompt, model=MODEL)
            if not raw_response:
                log(f"Empty response from LLM for {file_path}")
                return False
            resolved = clean_llm_output(raw_response)

        if CONFLICT_MARKER in resolved:
            log(f"LLM failed to remove markers in {file_path}")
            return False

        with open(file_path, 'w') as f:
            f.write(resolved)
            if not resolved.endswith('\n'):
                f.write('\n')

        log(f"✅ Successfully resolved conflicts in {file_path}")
        return True
    except Exception as e:
        log(f"Error resolving {file_path}: {e}")
        return False

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

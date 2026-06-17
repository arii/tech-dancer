#!/usr/bin/env python3
"""
mergellama.py - Automated Merge Conflict Resolution via Local LLM (Ollama)
Part of the Tech-Dancer 'Self-Healing' CI pipeline.
"""

import os
import sys
import re
from typing import Optional
from utils import call_ai, clean_llm_output, get_ollama_model

MODEL = get_ollama_model()
MOCK_MODE = os.environ.get("MERGELLAMA_MOCK", "false").lower() == "true"
CONFLICT_MARKER = "<<<<<<<"

def log(msg):
    print(f"🦙 [MergeLlama] {msg}")

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
            raw_response = call_ai(prompt, model=MODEL)
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

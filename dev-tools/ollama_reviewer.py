#!/usr/bin/env python3
"""
ollama_reviewer.py - Standalone Ollama Code Reviewer CLI
"""

import os
import sys
import json
import urllib.request
import urllib.error
import argparse

OLLAMA_URL = os.environ.get("OLLAMA_URL", "http://localhost:11434/api/generate")
MODEL = "code-reviewer"
DEFAULT_TIMEOUT = 60 # Seconds
MAX_FILE_SIZE_KB = 50

def is_binary(file_path):
    """Simple check to detect binary files."""
    try:
        with open(file_path, 'tr') as f:
            f.read(1024)
            return False
    except UnicodeDecodeError:
        return True

def review_file(file_path, silent=False):
    if not os.path.exists(file_path):
        print(f"Error: File '{file_path}' not found.")
        sys.exit(1)

    # 1. File Size Check
    file_size_kb = os.path.getsize(file_path) / 1024
    if file_size_kb > MAX_FILE_SIZE_KB:
        print(f"Error: File '{file_path}' is too large ({file_size_kb:.1f}KB). Maximum size is {MAX_FILE_SIZE_KB}KB.")
        sys.exit(1)

    # 2. Binary Check
    if is_binary(file_path):
        print(f"Error: File '{file_path}' appears to be binary and cannot be reviewed.")
        sys.exit(1)

    try:
        with open(file_path, "r") as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading file {file_path}: {e}")
        sys.exit(1)

    prompt = f"Please review the following code:\n\n```\n{content}\n```"

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

    if not silent:
        print(f"--- Reviewing {file_path} using model '{MODEL}' ---")

    try:
        with urllib.request.urlopen(req, timeout=DEFAULT_TIMEOUT) as f:
            response_data = json.loads(f.read().decode("utf-8"))
            review = response_data.get("response", "No response from model.")
            print(review)
    except urllib.error.HTTPError as e:
        print(f"HTTP Error {e.code}: {e.reason}")
        sys.exit(1)
    except urllib.error.URLError as e:
        print(f"Error connecting to Ollama at {OLLAMA_URL}: {e.reason}")
        print("Ensure Ollama is running and the model is created.")
        sys.exit(1)
    except TimeoutError:
        print(f"Request timed out after {DEFAULT_TIMEOUT} seconds.")
        sys.exit(1)
    except Exception as e:
        print(f"An unexpected error occurred during review: {e}")
        sys.exit(1)

def main():
    parser = argparse.ArgumentParser(description="Standalone Ollama Code Reviewer CLI")
    parser.add_argument("file", help="Path to the file to review")
    parser.add_argument("--silent", action="store_true", help="Suppress non-review output")
    args = parser.parse_args()

    review_file(args.file, silent=args.silent)

if __name__ == "__main__":
    main()

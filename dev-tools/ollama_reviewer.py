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

def review_file(file_path):
    if not os.path.exists(file_path):
        print(f"Error: File '{file_path}' not found.")
        sys.exit(1)

    try:
        with open(file_path, "r") as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading file: {e}")
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

    print(f"--- Reviewing {file_path} using model '{MODEL}' ---")
    try:
        with urllib.request.urlopen(req) as f:
            response_data = json.loads(f.read().decode("utf-8"))
            review = response_data.get("response", "No response from model.")
            print(review)
    except urllib.error.URLError as e:
        print(f"Error connecting to Ollama at {OLLAMA_URL}: {e}")
        print("Ensure Ollama is running and the model is created.")
        sys.exit(1)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        sys.exit(1)

def main():
    parser = argparse.ArgumentParser(description="Standalone Ollama Code Reviewer CLI")
    parser.add_argument("file", help="Path to the file to review")
    args = parser.parse_args()

    review_file(args.file)

if __name__ == "__main__":
    main()

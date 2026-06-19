import sys
import json
import glob
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def parse_skipped_files(content: str) -> bool:
    lines = [line.strip() for line in content.splitlines() if line.strip()]
    return len(lines) == 2 and lines[1].startswith("Skipped:")

def parse_skipped_verdict(content: str) -> bool:
    try:
        data = json.loads(content)
        return data.get("llmVerdict") == "pass" and data.get("highCount") == 0 and len(data.get("routes", [])) == 0 and data.get("passed") is True
    except json.JSONDecodeError:
        return False

# Tests
assert parse_skipped_files("## Gemini Code Review Agent\n\nSkipped: No GEMINI_API_KEY provided.\n") == True
assert parse_skipped_verdict('{\n  "passed": true,\n  "highCount": 0,\n  "routes": [],\n  "llmVerdict": "pass"\n}') == True

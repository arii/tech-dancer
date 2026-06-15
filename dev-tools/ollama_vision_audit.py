#!/usr/bin/env python3
"""
ollama_vision_audit.py - Vision-based regression audit via local Ollama.
"""

import os
import json
import base64
import argparse
import urllib.request
import urllib.parse
from typing import Optional, List, Dict
from dev_tools_sdk.utils.ollama import get_ollama_url
from dev_tools_sdk.utils.common import run_command

VISION_MODEL = os.environ.get("OLLAMA_VISION_MODEL", "moondream")

def call_ollama_vision(prompt: str, paths: List[str]) -> Optional[str]:
    images = []
    for p in paths:
        if os.path.exists(p):
            with open(p, "rb") as f:
                images.append(base64.b64encode(f.read()).decode('utf-8'))

    if not images: return None

    url = urllib.parse.urljoin(get_ollama_url() + "/", "api/generate")
    data = json.dumps({"model": VISION_MODEL, "prompt": prompt, "images": images, "stream": False}).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})

    try:
        with urllib.request.urlopen(req, timeout=120) as res:
            return json.loads(res.read().decode("utf-8")).get("response")
    except Exception as e:
        print(f"❌ Vision call failed: {e}")
        return None

def get_project_root() -> str:
    curr = os.path.abspath(os.path.dirname(__file__))
    while curr != os.path.dirname(curr):
        if any(os.path.exists(os.path.join(curr, m)) for m in ['package.json', '.git']): return curr
        curr = os.path.dirname(curr)
    return os.getcwd()

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--summary", default="artifacts/visual-review/summary.json")
    parser.add_argument("--project-root")
    args = parser.parse_args()

    root = args.project_root or get_project_root()
    sum_path = os.path.join(root, args.summary) if not os.path.isabs(args.summary) else args.summary

    if not os.path.exists(sum_path):
        print(f"❌ Missing: {sum_path}"); return

    with open(sum_path, 'r') as f: data = json.load(f)
    routes = data.get('routes', [])
    if not routes: return

    run_command(["ollama", "pull", VISION_MODEL], check=False)
    results = {}

    for s in routes:
        before, after = s.get('beforeCroppedPath'), s.get('afterCroppedPath')
        if not (before and after): continue

        prompt = f"Analyze visual changes for {s['route']}. Describe what changed between BEFORE and AFTER. Identify bugs vs improvements. Be concise."
        res = call_ollama_vision(prompt, [os.path.join(root, before), os.path.join(root, after)])
        if res:
            results[s['route']] = res
            print(f"\n--- {s['route']} ---\n{res}\n")

    if results:
        out = os.path.join(root, "artifacts/visual-review/vision_audit.json")
        with open(out, 'w') as f: json.dump(results, f, indent=2)
        print(f"✅ Results: {out}")

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
ollama_vision_audit.py - Vision-based visual regression audit using Ollama (moondream)
"""

import os
import sys
import json
import base64
import argparse
from typing import Optional, List, Dict
from utils import get_ollama_url, run_command

# Default vision model
VISION_MODEL = os.environ.get("OLLAMA_VISION_MODEL", "moondream")

def encode_image(image_path: str) -> str:
    """Encodes an image to a base64 string."""
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def call_ollama_vision(prompt: str, image_paths: List[str], model: str = VISION_MODEL) -> Optional[str]:
    """
    Calls the local Ollama API with a prompt and multiple images.
    """
    base_url = get_ollama_url()
    if not base_url.endswith("/"):
        base_url += "/"

    import urllib.request
    import urllib.parse

    target_url = urllib.parse.urljoin(base_url, "api/generate")

    images_base64 = [encode_image(p) for p in image_paths if os.path.exists(p)]

    if not images_base64:
        print(f"⚠️ No valid images found for paths: {image_paths}")
        return None

    data = {
        "model": model,
        "prompt": prompt,
        "images": images_base64,
        "stream": False
    }

    req = urllib.request.Request(
        target_url,
        data=json.dumps(data).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )

    try:
        with urllib.request.urlopen(req, timeout=120) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            return res_data.get("response")
    except Exception as e:
        print(f"❌ Ollama Vision call failed: {e}")
        return None

def audit_route(summary: Dict) -> Optional[str]:
    """Performs a vision audit for a single route summary."""
    route = summary.get('route')
    before = summary.get('beforeCroppedPath')
    after = summary.get('afterCroppedPath')

    if not before or not after:
        return None

    # Resolve paths relative to project root
    root = os.getcwd()
    before_path = os.path.join(root, before)
    after_path = os.path.join(root, after)

    print(f"🔍 Auditing visual changes for {route}...")

    prompt = (
        f"You are a UI quality assurance agent. I am providing two cropped screenshots of the same region on a webpage: "
        f"the first is 'BEFORE' the change, and the second is 'AFTER' the change.\n\n"
        f"Route: {route}\n\n"
        f"Please analyze these images and describe exactly what changed in the UI. "
        f"Identify if the change is a bug (e.g., layout break, missing content) or an intended improvement. "
        f"Be concise and technical."
    )

    result = call_ollama_vision(prompt, [before_path, after_path])
    return result

def main():
    parser = argparse.ArgumentParser(description="Vision-based visual regression audit using Ollama")
    parser.add_argument("--summary", default="artifacts/visual-review/summary.json", help="Path to visual summary JSON")
    args = parser.parse_args()

    if not os.path.exists(args.summary):
        print(f"❌ Summary file not found: {args.summary}")
        sys.exit(1)

    with open(args.summary, 'r') as f:
        data = json.load(f)

    summaries = data.get('routes', [])
    if not summaries:
        print("✅ No routes to audit.")
        return

    # Check if model is available
    print(f"🤖 Ensuring vision model '{VISION_MODEL}' is available...")
    run_command(["ollama", "pull", VISION_MODEL], check=False)

    audit_results = {}
    for s in summaries:
        if s.get('beforeCroppedPath') and s.get('afterCroppedPath'):
            result = audit_route(s)
            if result:
                audit_results[s['route']] = result
                print(f"\n--- Audit Result for {s['route']} ---\n{result}\n")

    if audit_results:
        output_path = "artifacts/visual-review/vision_audit.json"
        with open(output_path, 'w') as f:
            json.dump(audit_results, f, indent=2)
        print(f"✅ Vision audit complete. Results saved to {output_path}")
    else:
        print("ℹ️ No visual changes were significant enough to crop or audit.")

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
import os
import sys
import json
import time
import re
from pathlib import Path
import requests

PRINTFUL_TOKEN = os.getenv("PRINTFUL_TOKEN")
BASE_URL = "https://api.printful.com"
STORE_ID = 18249113
JSON_PATH = Path("printful_template_agent_packet.json")
IMAGE_DIR = Path("printful_template_images")

if not PRINTFUL_TOKEN:
    print("ERROR: PRINTFUL_TOKEN is not set.")
    sys.exit(1)

headers = {
    "Authorization": f"Bearer {PRINTFUL_TOKEN}",
    "Content-Type": "application/json",
    "X-PF-Store-ID": str(STORE_ID)
}

def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-+", "-", value)
    return value.strip("-") or "untitled"

def download_file(url, local_path):
    try:
        res = requests.get(url, timeout=30, stream=True)
        res.raise_for_status()
        with open(local_path, "wb") as f:
            for chunk in res.iter_content(chunk_size=1024*128):
                f.write(chunk)
        return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

def post_with_rate_limit(url, payload):
    while True:
        res = requests.post(url, headers=headers, json=payload, timeout=30)
        if res.status_code == 200:
            return res
        elif res.status_code == 429:
            # Parse sleep time from response body
            body = res.json()
            error_msg = body.get("result", "")
            wait_seconds = 60 # Default fallback
            match = re.search(r"after (\d+) seconds", error_msg)
            if match:
                wait_seconds = int(match.group(1)) + 2 # Add a tiny buffer

            print(f"Rate limited (429). Sleeping for {wait_seconds} seconds...")
            time.sleep(wait_seconds)
        else:
            print(f"Error {res.status_code}: {res.text}")
            return res

def generate_mockups_for_template(t):
    template_id = t["template_id"]
    product_id = t["product_id"]
    title = t["original_title"]
    variants = t["available_variant_ids"]

    if not variants:
        print(f"No variants for template {template_id}")
        return []

    # Use first variant to fetch mockups
    variant_sample = [variants[0]]

    payload = {
        "variant_ids": variant_sample,
        "format": "jpg",
        "product_template_id": template_id
    }

    url = f"{BASE_URL}/mockup-generator/create-task/{product_id}"
    print(f"\nCreating mockup task for template {template_id} ({title})")

    res = post_with_rate_limit(url, payload)
    if not res or res.status_code != 200:
        return []

    task_key = res.json().get("result", {}).get("task_key")
    if not task_key:
        print("No task key returned")
        return []

    poll_url = f"{BASE_URL}/mockup-generator/task"
    for _ in range(20): # Poll up to 20 times (60s)
        time.sleep(3)
        poll_res = requests.get(poll_url, headers=headers, params={"task_key": task_key}, timeout=30)
        if poll_res.status_code == 200:
            task_data = poll_res.json().get("result", {})
            status = task_data.get("status")
            if status == "completed":
                urls = []
                mockups = task_data.get("mockups", [])
                for m in mockups:
                    main_url = m.get("mockup_url")
                    placement = m.get("placement") or "front"
                    if main_url:
                        urls.append((placement, main_url))

                    for extra in m.get("extra", []):
                        extra_url = extra.get("url")
                        extra_title = extra.get("title") or "extra"
                        if extra_url:
                            urls.append((extra_title.lower(), extra_url))
                return urls
            elif status == "failed":
                print("Mockup task failed:", task_data)
                return []
        elif poll_res.status_code == 429:
            print("Poll request rate limited. Waiting 10s...")
            time.sleep(10)

    return []

def main():
    if not JSON_PATH.exists():
        print(f"Error: {JSON_PATH} not found.")
        return

    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    IMAGE_DIR.mkdir(parents=True, exist_ok=True)

    for idx, t in enumerate(data["templates"], 1):
        template_id = t["template_id"]
        title = t["original_title"]
        safe_title = slugify(title)[:60]

        # Check if we already downloaded multiple mockups for this template
        # (Template 1 (102951840) was already successfully downloaded in the previous attempt)
        existing_mockups = t.get("downloaded_mockups", [])
        if len(existing_mockups) > 1:
            print(f"Template {template_id} already has {len(existing_mockups)} downloaded mockups. Skipping.")
            continue

        mockup_urls = generate_mockups_for_template(t)

        local_paths = []
        for placement, url in mockup_urls:
            local_name = f"{template_id}-{safe_title}-{placement}.jpg"
            local_path = IMAGE_DIR / local_name

            print(f"Downloading {placement} mockup to {local_path}...")
            if download_file(url, local_path):
                local_paths.append(str(local_path))

        if local_paths:
            t["downloaded_mockups"] = local_paths
            t["local_image_path"] = local_paths[0]
            print(f"Downloaded {len(local_paths)} mockups for template {template_id}.")
        else:
            print(f"No mockups downloaded for template {template_id}, keeping default.")
            if "downloaded_mockups" not in t:
                t["downloaded_mockups"] = [t["local_image_path"]] if t.get("local_image_path") else []

        # Write progress incrementally so we don't lose data if interrupted
        with open(JSON_PATH, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

    print("\nSuccessfully finished downloading all mockups and updated JSON.")

if __name__ == "__main__":
    main()

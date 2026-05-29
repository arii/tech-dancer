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

def get_catalog_variants(product_id):
    url = f"{BASE_URL}/products/{product_id}"
    res = requests.get(url, headers=headers, timeout=30)
    if res.status_code == 200:
        return res.json().get("result", {}).get("variants", [])
    return []

def download_file(url, local_path):
    try:
        res = requests.get(url, timeout=30)
        res.raise_for_status()
        with open(local_path, "wb") as f:
            f.write(res.content)
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
            body = res.json()
            error_msg = body.get("result", "")
            wait_seconds = 60
            match = re.search(r"after (\d+) seconds", error_msg)
            if match:
                wait_seconds = int(match.group(1)) + 2
            print(f"Rate limited (429). Sleeping for {wait_seconds} seconds...")
            time.sleep(wait_seconds)
        else:
            print(f"Error {res.status_code}: {res.text}")
            return res

def get_colorway_mockups(t, catalog_variants):
    template_id = t["template_id"]
    product_id = t["product_id"]
    suggested_colors = t["suggested_colors"]
    template_sizes = t["sizes"]

    if not suggested_colors:
        return []

    # Map suggested colors to variant IDs (using first available size in the template, e.g. S or M)
    selected_variants = {}
    sample_size = template_sizes[0] if template_sizes else "S"

    for color in suggested_colors:
        # Find matching variant
        for v in catalog_variants:
            if v.get("color", "").lower() == color.lower() and v.get("size", sample_size) == sample_size:
                selected_variants[color] = v.get("id")
                break

        # Fallback to any size if sample size not found
        if color not in selected_variants:
            for v in catalog_variants:
                if v.get("color", "").lower() == color.lower():
                    selected_variants[color] = v.get("id")
                    break

    variant_ids = list(selected_variants.values())
    if not variant_ids:
        return []

    payload = {
        "variant_ids": variant_ids,
        "format": "jpg",
        "product_template_id": template_id
    }

    url = f"{BASE_URL}/mockup-generator/create-task/{product_id}"
    print(f"\nCreating colorway mockup task for template {template_id} with variants {variant_ids}")

    res = post_with_rate_limit(url, payload)
    if not res or res.status_code != 200:
        return []

    task_key = res.json().get("result", {}).get("task_key")
    if not task_key:
        return []

    poll_url = f"{BASE_URL}/mockup-generator/task"
    for _ in range(25): # Poll up to 25 times
        time.sleep(3)
        poll_res = requests.get(poll_url, headers=headers, params={"task_key": task_key}, timeout=30)
        if poll_res.status_code == 200:
            task_data = poll_res.json().get("result", {})
            status = task_data.get("status")
            if status == "completed":
                # For each color variant, we collect exactly one primary mockup URL
                urls = []
                mockups = task_data.get("mockups", [])
                for m in mockups:
                    color = m.get("color") or "default"
                    url = m.get("mockup_url")
                    if url:
                        urls.append((color, url))
                return urls
            elif status == "failed":
                print("Mockup task failed:", task_data)
                return []
        elif poll_res.status_code == 429:
            time.sleep(10)

    return []

def main():
    if not JSON_PATH.exists():
        return

    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    IMAGE_DIR.mkdir(parents=True, exist_ok=True)

    for idx, t in enumerate(data["templates"], 1):
        template_id = t["template_id"]
        title = t["original_title"]
        safe_title = slugify(title)[:60]

        # Check if we already have downloaded all colorway mockups
        # To avoid duplicating work, we check if we have downloaded mockup files with "colorway" in their name
        downloaded = t.get("downloaded_mockups", [])
        has_colorways = any("colorway" in str(p) for p in downloaded)
        if has_colorways:
            print(f"Template {template_id} already has colorway mockups. Skipping.")
            continue

        print(f"\n[{idx}/15] Fetching catalog variants for Product {t['product_id']}...")
        catalog_variants = get_catalog_variants(t["product_id"])

        mockup_urls = get_colorway_mockups(t, catalog_variants)

        local_paths = []
        for color, url in mockup_urls:
            local_name = f"{template_id}-colorway-{slugify(color)}.jpg"
            local_path = IMAGE_DIR / local_name
            print(f"Downloading {color} colorway mockup...")
            if download_file(url, local_path):
                local_paths.append(str(local_path))

        if local_paths:
            # We overwrite downloaded_mockups with the set of colorway mockups
            t["downloaded_mockups"] = local_paths
            t["local_image_path"] = local_paths[0]
            print(f"Successfully downloaded {len(local_paths)} colorway mockups for template {template_id}.")

        # Write progress incrementally
        with open(JSON_PATH, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

    print("\nSuccessfully finished downloading all colorway mockups!")

if __name__ == "__main__":
    main()

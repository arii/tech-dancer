#!/usr/bin/env python3
import os
import sys
import json
import time
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

def main():
    product_id = 411 # Premium Sweatshirt
    template_id = 102951840

    # We want to generate front mockups for the other colors:
    # Black: 11258, Charcoal Heather: 11263, Forest Green: 16160
    color_variants = {
        "black": 11258,
        "charcoal": 11263,
        "forestgreen": 16160
    }

    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    template = next(t for t in data["templates"] if t["template_id"] == template_id)
    downloaded = template.get("downloaded_mockups", [])

    # Generate mockups for each color
    for color_name, variant_id in color_variants.items():
        payload = {
            "variant_ids": [variant_id],
            "format": "jpg",
            "product_template_id": template_id
        }
        url = f"{BASE_URL}/mockup-generator/create-task/{product_id}"
        print(f"Generating {color_name} mockup for template {template_id}...")

        res = requests.post(url, headers=headers, json=payload, timeout=30)
        if res.status_code != 200:
            print("Error creating task:", res.text)
            continue

        task_key = res.json().get("result", {}).get("task_key")
        poll_url = f"{BASE_URL}/mockup-generator/task"

        while True:
            time.sleep(3)
            poll_res = requests.get(poll_url, headers=headers, params={"task_key": task_key}, timeout=30)
            if poll_res.status_code == 200:
                task_data = poll_res.json().get("result", {})
                status = task_data.get("status")
                if status == "completed":
                    mockups = task_data.get("mockups", [])
                    if mockups:
                        m_url = mockups[0].get("mockup_url")
                        local_name = f"{template_id}-sweatshirt-{color_name}.jpg"
                        local_path = IMAGE_DIR / local_name
                        print(f"Downloading {color_name} mockup to {local_path}...")
                        if download_file(m_url, local_path):
                            downloaded.append(str(local_path))
                    break
                elif status == "failed":
                    print("Task failed:", task_data)
                    break
            else:
                print("Error polling:", poll_res.text)
                break

    template["downloaded_mockups"] = downloaded

    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    print("Done generating extra sweatshirt colors!")

if __name__ == "__main__":
    main()

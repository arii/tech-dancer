import os
import sys
import json
import time
import re
import requests

PRINTFUL_TOKEN = os.getenv("PRINTFUL_TOKEN")
BASE_URL = "https://api.printful.com"
STORE_ID = 18249113
SYNC_PRODUCT_ID = 435662250
CATALOG_PRODUCT_ID = 823  # Stanley/Stella SATU020

if not PRINTFUL_TOKEN:
    print("ERROR: PRINTFUL_TOKEN is not set.")
    sys.exit(1)

headers = {
    "Authorization": f"Bearer {PRINTFUL_TOKEN}",
    "Content-Type": "application/json",
    "X-PF-Store-ID": str(STORE_ID)
}

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

def main():
    # 1. Fetch the synced variants to know their IDs
    print(f"Fetching synced variants for product {SYNC_PRODUCT_ID}...")
    res = requests.get(f"{BASE_URL}/sync/products/{SYNC_PRODUCT_ID}", headers=headers, timeout=30)
    if res.status_code != 200:
        print("Failed to get synced variants:", res.text)
        return

    product_details = res.json().get("result", {})
    sync_variants = product_details.get("sync_variants", [])
    print(f"Found {len(sync_variants)} variants in store.")

    # 2. Trigger Mockup Generator Task
    mockup_payload = {
        "variant_ids": [21000, 21006, 21012, 21018, 21024],
        "format": "jpg",
        "files": [
            {
                "placement": "back",
                "image_url": "https://files.cdn.printful.com/files/6bc/6bcb2338fc0fa3b9b4a7decc94feb1ff_preview.png",
                "position": {
                    "area_width": 3000,
                    "area_height": 3000,
                    "width": 1088,
                    "height": 1449,
                    "top": 316,
                    "left": 964
                }
            }
        ]
    }

    print(f"\nTriggering mockup generation task for catalog product {CATALOG_PRODUCT_ID}...")
    url = f"{BASE_URL}/mockup-generator/create-task/{CATALOG_PRODUCT_ID}"
    task_res = post_with_rate_limit(url, mockup_payload)
    if not task_res or task_res.status_code != 200:
        print("Failed to start mockup task")
        return

    task_key = task_res.json().get("result", {}).get("task_key")
    print(f"Mockup generation task started. Task Key: {task_key}")

    # 3. Poll Mockup Generator Task
    mockup_urls = {}
    print("Waiting for mockup generation to complete...")
    for _ in range(20):
        time.sleep(3)
        poll_res = requests.get(f"{BASE_URL}/mockup-generator/task?task_key={task_key}", headers=headers, timeout=30)
        if poll_res.status_code != 200:
            poll_res = requests.get(f"{BASE_URL}/mockup-generator/lookup-task?task_key={task_key}", headers=headers, timeout=30)

        if poll_res.status_code == 200:
            task_data = poll_res.json().get("result", {})
            status = task_data.get("status")
            print(f"  Status: {status}")

            if status == "completed":
                mockups = task_data.get("mockups", [])
                print(f"  Mockups generated successfully ({len(mockups)} items).")
                for item in mockups:
                    variant_ids = item.get("variant_ids", [])
                    extra_mockups = item.get("extra", []) or item.get("extra_mockups", [])

                    # Look for the back mockup since the print is on the back
                    back_mockup = next((m for m in extra_mockups if "back" in m.get("title", "").lower()), None)
                    target_url = None
                    if back_mockup:
                        target_url = back_mockup.get("url")
                    elif extra_mockups:
                        target_url = extra_mockups[0].get("url")
                    else:
                        target_url = item.get("mockup_url")

                    if target_url:
                        for v_id in variant_ids:
                            mockup_urls[v_id] = target_url
                break
            elif status == "failed":
                print("Mockup task failed:", task_data)
                return

    if not mockup_urls:
        print("Failed to retrieve generated mockup URLs.")
        return

    # 4. Update each sync variant with the new mockup image URL
    for v in sync_variants:
        sync_var_id = v["id"]
        cat_var_id = v["variant_id"]
        v_size = v.get("size")

        mockup_url = mockup_urls.get(cat_var_id)
        if not mockup_url:
            print(f"No mockup found for catalog variant {cat_var_id} (Size {v_size}).")
            continue

        print(f"\nAdding mockup to variant {sync_var_id} (Size {v_size})...")
        update_payload = {
            "files": [
                {
                    "type": "back",
                    "id": 990399734
                },
                {
                    "type": "preview",
                    "url": mockup_url
                }
            ]
        }

        url = f"{BASE_URL}/sync/variant/{sync_var_id}"
        up_res = requests.put(url, headers=headers, json=update_payload, timeout=30)
        print("  Update status:", up_res.status_code)
        if up_res.status_code != 200:
            print("  Failed:", up_res.text)
        else:
            print(f"  Successfully set mockup image for Size {v_size}.")

if __name__ == "__main__":
    main()

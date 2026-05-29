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
    sys.exit(1)

headers = {
    "Authorization": f"Bearer {PRINTFUL_TOKEN}",
    "Content-Type": "application/json",
    "X-PF-Store-ID": str(STORE_ID)
}

def main():
    # Wait a moment to clear any rate limits
    time.sleep(10)
    
    product_id = 411
    template_id = 102951840
    variant_id = 16160 # Forest Green
    
    payload = {
        "variant_ids": [variant_id],
        "format": "jpg",
        "product_template_id": template_id
    }
    url = f"{BASE_URL}/mockup-generator/create-task/{product_id}"
    
    # Retry loop for 429
    for attempt in range(3):
        res = requests.post(url, headers=headers, json=payload, timeout=30)
        if res.status_code == 200:
            task_key = res.json().get("result", {}).get("task_key")
            poll_url = f"{BASE_URL}/mockup-generator/task"
            while True:
                time.sleep(3)
                poll_res = requests.get(poll_url, headers=headers, params={"task_key": task_key}, timeout=30)
                if poll_res.status_code == 200:
                    task_data = poll_res.json().get("result", {})
                    if task_data.get("status") == "completed":
                        mockups = task_data.get("mockups", [])
                        if mockups:
                            m_url = mockups[0].get("mockup_url")
                            local_path = IMAGE_DIR / f"{template_id}-sweatshirt-forestgreen.jpg"
                            
                            # Download
                            img_res = requests.get(m_url, timeout=30)
                            with open(local_path, "wb") as f:
                                f.write(img_res.content)
                                
                            # Update JSON
                            with open(JSON_PATH, "r", encoding="utf-8") as jf:
                                data = json.load(jf)
                            t = next(temp for temp in data["templates"] if temp["template_id"] == template_id)
                            if str(local_path) not in t["downloaded_mockups"]:
                                t["downloaded_mockups"].append(str(local_path))
                            with open(JSON_PATH, "w", encoding="utf-8") as jf:
                                json.dump(data, jf, indent=2)
                            print("Successfully downloaded Forest Green mockup!")
                        return
                else:
                    break
        elif res.status_code == 429:
            print("Rate limit hit, sleeping 30s...")
            time.sleep(30)
        else:
            print("Error:", res.text)
            break

if __name__ == "__main__":
    main()

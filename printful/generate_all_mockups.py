#!/usr/bin/env python3
import os
import sys
import json
import time
import requests

PRINTFUL_TOKEN = os.getenv("PRINTFUL_TOKEN")
BASE_URL = "https://api.printful.com"
STORE_ID = 18249113  # boomtick store id

if not PRINTFUL_TOKEN:
    print("ERROR: PRINTFUL_TOKEN is not set.")
    sys.exit(1)

headers = {
    "Authorization": f"Bearer {PRINTFUL_TOKEN}",
    "Content-Type": "application/json",
    "X-PF-Store-ID": str(STORE_ID)
}

def main():
    product_id = 411 # Premium Sweatshirt
    template_id = 102951840

    # We want to get mockups for some variant IDs (e.g. S, M in Black and White)
    # Let's check available variant IDs in the template
    with open("printful_template_agent_packet.json", "r") as f:
        data = json.load(f)

    template = next(t for t in data["templates"] if t["template_id"] == template_id)
    variants = template["available_variant_ids"][:4]  # Get first 4 variants

    payload = {
        "variant_ids": variants,
        "format": "jpg",
        "product_template_id": template_id
    }

    url = f"{BASE_URL}/mockup-generator/create-task/{product_id}"
    print(f"POST {url}")
    print("Payload:", json.dumps(payload))

    res = requests.post(url, headers=headers, json=payload, timeout=30)
    print(f"Status: {res.status_code}")
    if res.status_code != 200:
        print("Error:", res.text)
        return

    result = res.json().get("result", {})
    task_key = result.get("task_key")
    print(f"Task Key: {task_key}")

    # Poll task status
    poll_url = f"{BASE_URL}/mockup-generator/task"
    while True:
        print("Polling task...")
        poll_res = requests.get(poll_url, headers=headers, params={"task_key": task_key}, timeout=30)
        if poll_res.status_code == 200:
            poll_data = poll_res.json().get("result", {})
            status = poll_data.get("status")
            print(f"Status: {status}")
            if status == "completed":
                with open("mockup_task_completed.json", "w") as f:
                    json.dump(poll_res.json(), f, indent=2)
                mockups = poll_data.get("mockups", [])
                print(f"Success! Generated {len(mockups)} mockups.")
                for m in mockups:
                    print(f"- {m.get('placement')} ({m.get('color')}): {m.get('mockup_url')}")
                break
            elif status == "failed":
                print("Task failed:", poll_data)
                break
        else:
            print("Poll error:", poll_res.text)
            break
        time.sleep(3)

if __name__ == "__main__":
    main()

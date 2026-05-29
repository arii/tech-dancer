#!/usr/bin/env python3
import os
import sys
import json
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
}

def main():
    # Let's test with store_id query param and X-PF-Store-ID header
    url = f"{BASE_URL}/mockup-generator/templates/823"
    params = {"store_id": STORE_ID}
    headers_with_store = {**headers, "X-PF-Store-ID": str(STORE_ID)}

    print(f"GET {url} with params {params}")
    res = requests.get(url, headers=headers_with_store, params=params, timeout=30)
    print(f"Status: {res.status_code}")
    if res.status_code == 200:
        data = res.json()
        with open("mockup_generator_templates_823.json", "w") as f:
            json.dump(data, f, indent=2)
        print("Success! Saved response to mockup_generator_templates_823.json")
    else:
        print("Error:", res.text)

if __name__ == "__main__":
    main()

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
    "X-PF-Store-ID": str(STORE_ID)
}

def main():
    # 1. Fetch synced products list
    url = f"{BASE_URL}/sync/products"
    print("GET /sync/products")
    res = requests.get(url, headers=headers, timeout=30)
    print("Status:", res.status_code)

    if res.status_code != 200:
        print("Error:", res.text)
        return

    products = res.json().get("result", [])
    print(f"Found {len(products)} sync products.")

    if not products:
        print("No sync products found in store.")
        return

    # Get details for the first product
    prod_id = products[0]["id"]
    detail_url = f"{BASE_URL}/sync/products/{prod_id}"
    print(f"GET {detail_url}")
    detail_res = requests.get(detail_url, headers=headers, timeout=30)
    print("Status:", detail_res.status_code)

    if detail_res.status_code == 200:
        detail_data = detail_res.json().get("result", {})
        sync_variants = detail_data.get("sync_variants", [])
        print(f"Found {len(sync_variants)} sync variants.")

        if sync_variants:
            # Check the files in the first sync variant
            files = sync_variants[0].get("files", [])
            print(f"\nFiles in variant {sync_variants[0]['id']}:")
            for f in files:
                print(f"- Type: {f.get('type')}, URL: {f.get('url')}, Status: {f.get('status')}")

            with open("sample_sync_product_details.json", "w") as f:
                json.dump(detail_res.json(), f, indent=2)
            print("\nSaved details to sample_sync_product_details.json")

if __name__ == "__main__":
    main()

import os
import sys
import json
import requests

PRINTFUL_TOKEN = os.getenv("PRINTFUL_TOKEN")
BASE_URL = "https://api.printful.com"
STORE_ID = 18249113
PRODUCT_ID = 435661114

if not PRINTFUL_TOKEN:
    print("ERROR: PRINTFUL_TOKEN is not set.")
    sys.exit(1)

headers = {
    "Authorization": f"Bearer {PRINTFUL_TOKEN}",
    "Content-Type": "application/json",
    "X-PF-Store-ID": str(STORE_ID)
}

def main():
    # 1. Fetch details of the product to get all variants
    print(f"Fetching product details for {PRODUCT_ID}...")
    res = requests.get(f"{BASE_URL}/sync/products/{PRODUCT_ID}", headers=headers, timeout=30)
    if res.status_code != 200:
        print("Failed to get product:", res.text)
        return

    product_details = res.json().get("result", {})
    sync_variants = product_details.get("sync_variants", [])
    print(f"Found {len(sync_variants)} variants to update.")

    # 2. Update the main product title
    print("\nUpdating product title...")
    product_update_payload = {
        "name": "Rainbow War Eagle Unisex Heavyweight Tee"
    }
    prod_up_res = requests.put(f"{BASE_URL}/sync/products/{PRODUCT_ID}", headers=headers, json=product_update_payload, timeout=30)
    print("Product update status:", prod_up_res.status_code)

    # 3. Update each variant's print file and pricing
    # Design file ID: 990399734 (rainbow_eagle.png)
    file_id = 990399734

    for v in sync_variants:
        v_id = v["id"]
        v_size = v.get("size")
        v_name = v.get("name")
        print(f"\nUpdating variant {v_id} ({v_name})...")

        variant_payload = {
            "retail_price": "29.99",
            "files": [
                {
                    "type": "front",
                    "id": file_id
                }
            ]
        }

        v_res = requests.put(f"{BASE_URL}/sync/variants/{v_id}", headers=headers, json=variant_payload, timeout=30)
        print(f"  Status: {v_res.status_code}")
        if v_res.status_code != 200:
            print("  Failed response:", v_res.text)
        else:
            print(f"  Successfully swapped artwork and set price for size {v_size}.")

if __name__ == "__main__":
    main()

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
    
    # 2. Update each variant's print file and pricing using the singular /sync/variant/{v_id} endpoint
    file_id = 990399734  # rainbow_eagle.png
    
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
        
        # Using the correct singular endpoint /sync/variant/{v_id}
        url = f"{BASE_URL}/sync/variant/{v_id}"
        v_res = requests.put(url, headers=headers, json=variant_payload, timeout=30)
        print(f"  Status: {v_res.status_code}")
        if v_res.status_code != 200:
            print("  Failed response:", v_res.text)
        else:
            print(f"  Successfully swapped artwork to rainbow_eagle.png and set price to $29.99 for size {v_size}.")

if __name__ == "__main__":
    main()

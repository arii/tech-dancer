import os
import sys
import json
import requests

PRINTFUL_TOKEN = os.getenv("PRINTFUL_TOKEN")
BASE_URL = "https://api.printful.com"
STORE_ID = 18249113

if not PRINTFUL_TOKEN:
    print("ERROR: PRINTFUL_TOKEN is not set.")
    sys.exit(1)

headers = {
    "Authorization": f"Bearer {PRINTFUL_TOKEN}",
    "Content-Type": "application/json",
    "X-PF-Store-ID": str(STORE_ID)
}

def main():
    # 1. Define the sync product details
    product_payload = {
        "name": "Rainbow War Eagle Oversized High Neck Tee",
        "external_id": "test_rainbow_war_eagle_satu020"
    }
    
    print("POST /sync/products")
    res = requests.post(f"{BASE_URL}/sync/products", headers=headers, json=product_payload, timeout=30)
    print("Status:", res.status_code)
    
    if res.status_code not in [200, 201]:
        print("Failed to create product:", res.text)
        return
        
    product_data = res.json().get("result", {})
    sync_product_id = product_data.get("id")
    print(f"Successfully created product. Sync Product ID: {sync_product_id}")
    
    # 2. Add variants to the product
    # Black variant mapping: S (21000), M (21006), L (21012), XL (21018), 2XL (21024)
    variants = [
        {"size": "S", "variant_id": 21000},
        {"size": "M", "variant_id": 21006},
        {"size": "L", "variant_id": 21012},
        {"size": "XL", "variant_id": 21018},
        {"size": "2XL", "variant_id": 21024}
    ]
    
    # The back print file ID is 990399734 (rainbow_eagle.png)
    file_id = 990399734
    
    for v in variants:
        variant_payload = {
            "variant_id": v["variant_id"],
            "retail_price": "29.99",
            "files": [
                {
                    "type": "back",
                    "id": file_id
                }
            ]
        }
        
        url = f"{BASE_URL}/sync/products/{sync_product_id}/variants"
        print(f"POST /sync/products/{sync_product_id}/variants (Size: {v['size']}, ID: {v['variant_id']})")
        
        v_res = requests.post(url, headers=headers, json=variant_payload, timeout=30)
        print("  Status:", v_res.status_code)
        if v_res.status_code not in [200, 201]:
            print("  Failed to add variant:", v_res.text)
        else:
            v_data = v_res.json().get("result", {})
            print(f"  Added successfully. Sync Variant ID: {v_data.get('id')}")

if __name__ == "__main__":
    main()

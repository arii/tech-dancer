import os
import sys
import json
import requests

PRINTFUL_TOKEN = os.getenv("PRINTFUL_TOKEN")
BASE_URL = "https://api.printful.com"
STORE_ID = 13903119

if not PRINTFUL_TOKEN:
    print("ERROR: PRINTFUL_TOKEN is not set.")
    sys.exit(1)

headers = {
    "Authorization": f"Bearer {PRINTFUL_TOKEN}",
    "Content-Type": "application/json",
    "X-PF-Store-ID": str(STORE_ID)
}

def main():
    product_payload = {
        "name": "Rainbow War Eagle Oversized High Neck Tee (Personal)",
        "external_id": "test_personal_rainbow_war_eagle"
    }
    
    print(f"POST /sync/products to store {STORE_ID}")
    res = requests.post(f"{BASE_URL}/sync/products", headers=headers, json=product_payload, timeout=30)
    print("Status:", res.status_code)
    
    if res.status_code not in [200, 201]:
        print("Failed to create product:", res.text)
        return
        
    product_data = res.json().get("result", {})
    sync_product_id = product_data.get("id")
    print(f"Successfully created product. Sync Product ID: {sync_product_id}")

if __name__ == "__main__":
    main()

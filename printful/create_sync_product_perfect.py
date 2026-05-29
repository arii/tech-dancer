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
    # Use the exact schema from the documentation
    payload = {
        "sync_product": {
            "name": "API product Bella",
            "thumbnail": "https://files.cdn.printful.com/files/6bc/6bcb2338fc0fa3b9b4a7decc94feb1ff_preview.png"
        },
        "sync_variants": [
            {
                "retail_price": "29.99",
                "variant_id": 21000, # S
                "files": [
                    {
                        "type": "front",
                        "id": 990399734 # rainbow_eagle.png
                    }
                ]
            }
        ]
    }
    
    print("POST /sync/products")
    res = requests.post(f"{BASE_URL}/sync/products", headers=headers, json=payload, timeout=30)
    print("Status:", res.status_code)
    print("Response:", json.dumps(res.json(), indent=2) if res.status_code == 200 else res.text)

if __name__ == "__main__":
    main()

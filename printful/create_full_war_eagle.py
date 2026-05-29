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
    # Catalog variant mapping for Stanley/Stella SATU020 (Black):
    # S (21000), M (21006), L (21012), XL (21018), 2XL (21024)
    variants = [
        {"size": "S", "id": 21000},
        {"size": "M", "id": 21006},
        {"size": "L", "id": 21012},
        {"size": "XL", "id": 21018},
        {"size": "2XL", "id": 21024}
    ]

    file_id = 990399734  # rainbow_eagle.png

    sync_variants_payload = []
    for v in variants:
        sync_variants_payload.append({
            "retail_price": "29.99",
            "variant_id": v["id"],
            "files": [
                {
                    "type": "back",
                    "id": file_id
                }
            ]
        })

    payload = {
        "sync_product": {
            "name": "Rainbow War Eagle Oversized High Neck Tee",
            "external_id": "rainbow_war_eagle_satu020"
        },
        "sync_variants": sync_variants_payload
    }

    print("POST /store/products (creating full product)...")
    res = requests.post(f"{BASE_URL}/store/products", headers=headers, json=payload, timeout=30)
    print("Status:", res.status_code)

    if res.status_code in [200, 201]:
        print("Success! Created Product:")
        print(json.dumps(res.json(), indent=2))
    else:
        print("Failed to create product:", res.text)

if __name__ == "__main__":
    main()

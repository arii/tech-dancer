#!/usr/bin/env python3
import os
import sys
import json
import requests

PRINTFUL_TOKEN = os.getenv("PRINTFUL_TOKEN")
SANDBOX_STORE_ID = 13903119
BASE_URL = "https://api.printful.com"

headers = {
    "Authorization": f"Bearer {PRINTFUL_TOKEN}",
    "X-PF-Store-ID": str(SANDBOX_STORE_ID)
}

def create_sandbox_order(sync_variant_id, quantity=1):
    url = f"{BASE_URL}/orders"
    payload = {
        "recipient": {
            "name": "Jules Sandbox Test",
            "address1": "19749 Dearborn St",
            "city": "Chatsworth",
            "state_code": "CA",
            "country_code": "US",
            "zip": "91311"
        },
        "items": [
            {
                "sync_variant_id": sync_variant_id,
                "quantity": quantity
            }
        ]
    }

    print(f"Creating sandbox order for sync variant {sync_variant_id}...")
    res = requests.post(url, headers=headers, json=payload, timeout=30)

    if res.status_code in [200, 201]:
        order_data = res.json().get("result", {})
        print(f"Sandbox order created! ID: {order_data.get('id')}")
        return order_data
    else:
        print(f"Failed to create sandbox order: {res.text}")
        return None

def main():
    if not PRINTFUL_TOKEN:
        print("ERROR: PRINTFUL_TOKEN not set.")
        sys.exit(1)

    # Example usage: requires a valid sync_variant_id from the sandbox store
    if len(sys.argv) < 2:
        print("Usage: python3 create_sandbox_order.py <sync_variant_id>")
        sys.exit(1)

    sv_id = sys.argv[1]
    create_sandbox_order(sv_id)

if __name__ == "__main__":
    main()
